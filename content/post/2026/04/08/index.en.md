---
title: "Fixing Gradle Test Crashes Due to Out of Memory: Configuring maxHeapSize"
date: 2026-04-08
tags: ["AI-Assisted", "Gradle", "Java", "Testing"]
categories: ["Sharing"]
---

A quick tip I figured out a long time ago and am finally getting around to sharing.

## Problem

When running `./gradlew test`, tests occasionally crash mid-run with an `OutOfMemoryError` or a message that the worker process "disappeared unexpectedly". Re-running them sometimes passes and sometimes fails — super flaky.

## Cause

Gradle runs tests in a separate JVM worker process whose default heap size is fairly small (usually just 512MB). A heavy test suite (Spring context, H2, lots of test data, etc.) can easily hit that ceiling.

## How to Fix

Add this to `build.gradle`:

```groovy
test {
  maxHeapSize = "1024m"
}
```

Or in `build.gradle.kts`:

```kotlin
tasks.test {
  maxHeapSize = "1024m"
}
```

Done. If it still crashes, bump it up to `"2048m"`.
