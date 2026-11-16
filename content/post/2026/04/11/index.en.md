---
title: "Mocking Time in Java: A Simple Way to Test Time-Dependent Logic"
date: 2026-04-11
tags: ["AI-Assisted", "Java", "Testing", "Clean Code"]
categories: ["Sharing"]
---

Anyone who writes Java has probably run into this situation: business logic that depends on the current time — an order expires after 30 minutes, a voucher is only valid during happy hour, a cron job runs at midnight, a token refreshes after an hour... When writing unit tests for code like that, how do you "fast-forward" or "rewind" time?

In this post, I'm sharing the approach I use in my project [mitisrv](https://github.com/tiennm99/mitisrv) — super simple, with no heavy frameworks required. It was inspired by the article [Mock Java Date/Time for Testing](https://dzone.com/articles/mock-java-datetime-for-testing) on DZone.

## The Problem

Suppose you have a piece of code like this:

```java
public boolean isExpired(Order order) {
  return LocalDateTime.now().isAfter(order.getExpiredAt());
}
```

When writing tests, you have to:

- Create an order with `expiredAt` in the past → expired test case ✓
- Create an order with `expiredAt` in the future → still-valid test case ✓
- But what about the test case "at the exact moment of expiration"? Or testing logic that only runs at 00:00 tomorrow?

Calling `LocalDateTime.now()` directly makes your code **non-deterministic** — a test run at 11:59 PM might pass, while the same test run at 12:01 AM fails. That's a CI/CD nightmare.

## Common Approaches

### 1. Injecting `java.time.Clock`

Java 8+ recommends using `Clock` and injecting it wherever needed:

```java
public class OrderService {
  private final Clock clock;

  public OrderService(Clock clock) {
    this.clock = clock;
  }

  public boolean isExpired(Order order) {
    return LocalDateTime.now(clock).isAfter(order.getExpiredAt());
  }
}
```

In tests, you use `Clock.fixed(...)` to pin the time. **Pros:** clean and idiomatic. **Cons:** you have to touch the entire codebase to inject `Clock` into every class that needs it, which is a pain in a large existing project.

### 2. Static Mocking with PowerMock/Mockito

```java
try (MockedStatic<LocalDateTime> mocked = mockStatic(LocalDateTime.class)) {
  mocked.when(LocalDateTime::now).thenReturn(fixedTime);
  // test code
}
```

**Pros:** no changes to production code. **Cons:** static mocking is slow, easy to leak across tests if you're not careful, and `mockStatic` requires Mockito 3.4+. Plus, if your code mixes `LocalDate.now()`, `Instant.now()`, and `ZonedDateTime.now()`, you have to mock each one separately.

### 3. Custom `Time` Utility with a Delta Offset

This is the approach I chose for mitisrv. The idea: create a `Time` class that replaces all calls to get the current time, and internally store a `deltaMillis` — the offset between "mock time" and the actual system time.

## Implementation in mitisrv

Here is the complete [`Time.java`](https://github.com/tiennm99/mitisrv/blob/main/src/main/java/com/miti99/mitisrv/util/time/Time.java) file:

```java
package com.miti99.mitisrv.util.time;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.TimeZone;

public class Time {
  private static final TimeZone TIME_ZONE = TimeZone.getDefault();
  private static final ZoneId ZONE_ID = TIME_ZONE.toZoneId();
  private static volatile long deltaMillis = 0L;

  public static LocalDate currentDate() {
    return LocalDate.ofInstant(currentInstant(), ZONE_ID);
  }

  public static LocalTime currentTime() {
    return LocalTime.ofInstant(currentInstant(), ZONE_ID);
  }

  public static LocalDateTime currentDateTime() {
    return LocalDateTime.ofInstant(currentInstant(), ZONE_ID);
  }

  public static OffsetDateTime currentOffsetDateTime() {
    return OffsetDateTime.ofInstant(currentInstant(), ZONE_ID);
  }

  public static ZonedDateTime currentZonedDateTime() {
    return ZonedDateTime.ofInstant(currentInstant(), ZONE_ID);
  }

  public static Instant currentInstant() {
    return Instant.ofEpochMilli(currentTimeMillis());
  }

  public static long currentTimeMillis() {
    return System.currentTimeMillis() + deltaMillis;
  }

  public static void useMockTime(LocalDateTime dateTime, ZoneId zoneId) {
    deltaMillis = dateTime.atZone(zoneId).toInstant().toEpochMilli() - System.currentTimeMillis();
  }

  public static void useSystemDefaultZoneClock() {
    deltaMillis = 0L;
  }
}
```

A few notable details:

- **Every time-fetching API** (`currentDate`, `currentDateTime`, `currentInstant`, etc.) funnels through a single method: `currentTimeMillis()`. Mocking that one place keeps the entire system in sync.
- **`deltaMillis` is `volatile`** to ensure changes are immediately visible across threads — important when testing in multi-threaded environments.
- **`useMockTime()` doesn't freeze time** — it **shifts** it. That means if you mock the time to `2026-01-01 00:00:00` and wait 5 real seconds, `Time.currentDateTime()` will return `2026-01-01 00:00:05`. That's an important difference from `Clock.fixed()` — time still flows naturally, just starting from a different point.
- **`useSystemDefaultZoneClock()` resets** back to real system time; call it in `@AfterEach` so test cases don't bleed into one another.

## How to Use It

In production code, instead of calling `LocalDateTime.now()`, call `Time.currentDateTime()`:

```java
public boolean isExpired(Order order) {
  return Time.currentDateTime().isAfter(order.getExpiredAt());
}
```

In your test:

```java
@Test
void orderShouldBeExpiredAfter30Minutes() {
  Order order = new Order();
  order.setExpiredAt(LocalDateTime.of(2026, 1, 1, 12, 30, 0));

  // "Fast-forward" time to 12:31
  Time.useMockTime(
      LocalDateTime.of(2026, 1, 1, 12, 31, 0),
      ZoneId.systemDefault()
  );

  assertTrue(service.isExpired(order));

  Time.useSystemDefaultZoneClock(); // reset
}
```

Use `@AfterEach` to make sure it always resets cleanly:

```java
@AfterEach
void tearDown() {
  Time.useSystemDefaultZoneClock();
}
```

## Comparing the Approaches

| Criterion | `Clock` injection | `mockStatic` | Custom `Time` util |
|---|---|---|---|
| Production code changes | Heavy (inject Clock everywhere) | None | One-off (replace `.now()`) |
| Framework dependency | None | Mockito 3.4+ | None |
| Test speed | Fast | Slow | Fast |
| Time continues flowing | No (`Clock.fixed`) | No | Yes |
| Thread-safe | Yes | Yes (scoped) | Yes (`volatile`) |
| Idiomatic "Java way" | ✓✓✓ | ✓ | ✓ |

## Downsides of the Custom `Time` Util

No approach is perfect, and this one has a few trade-offs too:

- **Global state**: `deltaMillis` is `static`, so if you run tests in parallel within the same JVM, tests will step on each other's toes. If you need parallel execution, you either have to configure your test runner to fork a separate JVM per class, or replace `volatile` with `ThreadLocal`.
- **Requires codebase-wide discipline** not to call `LocalDateTime.now()` directly anymore. And if a third-party library calls `.now()` internally, this utility won't control it.
- **Not standard Java**: newcomers to the project might be surprised to see `Time.currentDateTime()` instead of `LocalDateTime.now()`.

## When Should You Use Which?

- **New or small project, team comfortable with DI**: use `Clock` injection for the clean, standard approach.
- **Legacy project where you want to avoid a big refactor**: use `mockStatic` locally in individual tests and accept the slower execution.
- **Project where you want both simplicity and flowing time, running tests sequentially**: use a custom `Time` util like in mitisrv.

For me, the `Time` utility is simple, easy to understand, easy to maintain, and doesn't require learning another framework. The trade-off is maintaining discipline when writing code — always calling `Time.xxx()` instead of `LocalDateTime.now()`. A simple lint rule or check during PR review is enough to keep that habit intact.

## References

- [Mock Java Date/Time for Testing - DZone](https://dzone.com/articles/mock-java-datetime-for-testing)
- [`Time.java` in mitisrv](https://github.com/tiennm99/mitisrv/blob/main/src/main/java/com/miti99/mitisrv/util/time/Time.java)
- [Java `Clock` documentation](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/Clock.html)
