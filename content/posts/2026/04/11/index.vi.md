---
title: "Mock thời gian trong Java: cách đơn giản để test logic phụ thuộc vào thời gian"
date: 2026-04-11
tags: ["AI-Assisted", "Java", "Testing", "Clean Code"]
categories: ["Sharing"]
---

Khi viết code Java, có lẽ ai cũng từng gặp tình huống: logic nghiệp vụ phụ thuộc vào thời gian hiện tại — đơn hàng hết hạn sau 30 phút, voucher chỉ áp dụng trong giờ vàng, cron job chạy lúc nửa đêm, token refresh sau 1 giờ... Khi viết unit test cho những đoạn code này, bạn làm sao để "tua" thời gian tới trước hay lùi lại?

Bài này mình chia sẻ cách mình đang dùng trong dự án [mitisrv](https://github.com/tiennm99/mitisrv) — cực kỳ đơn giản, không cần framework nặng nề nào. Cảm hứng từ bài viết [Mock Java Date/Time for Testing](https://dzone.com/articles/mock-java-datetime-for-testing) trên DZone.

## Vấn đề

Giả sử bạn có đoạn code như này:

```java
public boolean isExpired(Order order) {
  return LocalDateTime.now().isAfter(order.getExpiredAt());
}
```

Khi test, bạn sẽ phải:

- Tạo order với `expiredAt` là quá khứ → test case expired ✓
- Tạo order với `expiredAt` là tương lai → test case còn hạn ✓
- Nhưng còn test case "đúng thời điểm hết hạn" thì sao? Hoặc test logic chạy vào đúng 00:00 ngày mai?

Việc gọi trực tiếp `LocalDateTime.now()` biến code thành **non-deterministic** — test chạy lúc 11h59 có thể pass, nhưng chạy lúc 00h01 lại fail. Đây là cơn ác mộng của CI/CD.

## Các cách tiếp cận phổ biến

### 1. Inject `java.time.Clock`

Java 8+ khuyến nghị dùng `Clock` và inject vào chỗ cần:

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

Trong test, dùng `Clock.fixed(...)` để cố định thời gian. **Ưu điểm:** sạch sẽ, đúng chuẩn. **Nhược điểm:** phải sửa toàn bộ code base để inject `Clock` vào từng class, rất phiền nếu dự án đã lớn.

### 2. Mock static với PowerMock/Mockito

```java
try (MockedStatic<LocalDateTime> mocked = mockStatic(LocalDateTime.class)) {
  mocked.when(LocalDateTime::now).thenReturn(fixedTime);
  // test code
}
```

**Ưu điểm:** không cần sửa code production. **Nhược điểm:** static mocking chậm, dễ leak giữa các test, và `mockStatic` chỉ support từ Mockito 3.4+. Nếu code gọi `LocalDate.now()`, `Instant.now()`, `ZonedDateTime.now()` xen kẽ thì phải mock từng cái.

### 3. Custom Time utility với delta offset

Đây là cách mà mình chọn cho mitisrv. Ý tưởng: tạo một class `Time` thay thế cho tất cả cách lấy thời gian hiện tại, và bên trong lưu một `deltaMillis` — độ lệch giữa "thời gian giả" và thời gian thật của hệ thống.

## Implementation trong mitisrv

Đây là toàn bộ file [`Time.java`](https://github.com/tiennm99/mitisrv/blob/main/src/main/java/com/miti99/mitisrv/util/time/Time.java):

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

Một vài điểm đáng chú ý:

- **Tất cả các API lấy thời gian** (`currentDate`, `currentDateTime`, `currentInstant`, v.v.) đều chạy qua một hàm duy nhất: `currentTimeMillis()`. Chỉ cần một chỗ "mock" là cả hệ thống đồng bộ.
- **`deltaMillis` là `volatile`** để đảm bảo thay đổi được thấy ngay lập tức giữa các thread — quan trọng khi test trên môi trường multi-thread.
- **`useMockTime()` không đóng băng** thời gian, mà chỉ **dịch chuyển** nó. Nghĩa là sau khi set mock tới `2026-01-01 00:00:00`, nếu chờ 5 giây thật thì `Time.currentDateTime()` sẽ trả về `2026-01-01 00:00:05`. Đây là điểm khác biệt quan trọng so với `Clock.fixed()` — time vẫn "chảy" nhưng từ một điểm bắt đầu khác.
- **`useSystemDefaultZoneClock()` reset** về thời gian thật, gọi ở `@AfterEach` để test case không ảnh hưởng nhau.

## Cách dùng

Trong code production, thay vì gọi `LocalDateTime.now()` thì gọi `Time.currentDateTime()`:

```java
public boolean isExpired(Order order) {
  return Time.currentDateTime().isAfter(order.getExpiredAt());
}
```

Trong test:

```java
@Test
void orderShouldBeExpiredAfter30Minutes() {
  Order order = new Order();
  order.setExpiredAt(LocalDateTime.of(2026, 1, 1, 12, 30, 0));

  // "Tua" thời gian tới 12:31
  Time.useMockTime(
      LocalDateTime.of(2026, 1, 1, 12, 31, 0),
      ZoneId.systemDefault()
  );

  assertTrue(service.isExpired(order));

  Time.useSystemDefaultZoneClock(); // reset
}
```

Dùng `@AfterEach` để đảm bảo reset đúng cách:

```java
@AfterEach
void tearDown() {
  Time.useSystemDefaultZoneClock();
}
```

## So sánh các approach

| Tiêu chí | `Clock` inject | `mockStatic` | Custom `Time` util |
|---|---|---|---|
| Cần sửa code production | Nhiều (inject Clock) | Không | Một lần (replace `.now()`) |
| Phụ thuộc framework | Không | Mockito 3.4+ | Không |
| Test speed | Nhanh | Chậm | Nhanh |
| Hỗ trợ time trôi | Không (Clock.fixed) | Không | Có |
| Thread-safe | Có | Có (trong scope) | Có (volatile) |
| Đúng "Java way" | ✓✓✓ | ✓ | ✓ |

## Nhược điểm của custom `Time` util

Không có cách nào hoàn hảo. Cách này cũng có vài điểm yếu:

- **Global state**: `deltaMillis` là `static`, nên nếu chạy test song song trong cùng JVM (parallel test), các test sẽ "giẫm chân" nhau. Nếu cần parallel, phải cấu hình test framework chạy mỗi class trong JVM riêng, hoặc dùng `ThreadLocal` thay cho `volatile`.
- **Phải sửa toàn bộ code** để không gọi trực tiếp `LocalDateTime.now()` nữa. Nếu lỡ có thư viện bên thứ ba gọi `.now()` thì util này không control được.
- **Không chuẩn Java**: người mới vào dự án có thể ngạc nhiên khi thấy `Time.currentDateTime()` thay vì `LocalDateTime.now()`.

## Khi nào nên dùng cách nào?

- **Dự án mới, nhỏ, team quen DI**: dùng `Clock` inject cho đúng chuẩn.
- **Dự án legacy, không muốn refactor lớn**: dùng `mockStatic` cục bộ cho từng test, chấp nhận chậm.
- **Dự án muốn vừa đơn giản vừa kiểm soát được time flow, chạy test sequential**: dùng custom `Time` util như mitisrv.

Với mình, `Time` util đơn giản, dễ hiểu, dễ maintain, và không cần học thêm framework. Trade-off là phải kỷ luật khi viết code — luôn gọi `Time.xxx()` thay vì `LocalDateTime.now()`. Một lint rule đơn giản trong PR review là đủ để giữ được quy tắc này.

## Tham khảo

- [Mock Java Date/Time for Testing - DZone](https://dzone.com/articles/mock-java-datetime-for-testing)
- [`Time.java` trong mitisrv](https://github.com/tiennm99/mitisrv/blob/main/src/main/java/com/miti99/mitisrv/util/time/Time.java)
- [Java `Clock` documentation](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/Clock.html)
