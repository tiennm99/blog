---
title: "Fix Gradle test crash do hết RAM: config maxHeapSize"
date: 2026-04-08
tags: ["AI-Assisted", "Gradle", "Java", "Testing"]
categories: ["Sharing"]
---

Một mẹo nhỏ mình tìm ra lâu rồi nhưng giờ mới có dịp chia sẻ lại.

## Vấn đề

Khi chạy `./gradlew test`, thỉnh thoảng test bị crash giữa chừng với `OutOfMemoryError` hoặc worker process "disappeared unexpectedly". Chạy lại thì khi pass khi fail, rất flaky.

## Nguyên nhân

Gradle chạy test trong một JVM worker riêng, và heap size mặc định khá nhỏ (thường chỉ 512MB). Test suite nặng (Spring context, H2, nhiều test data...) sẽ dễ đụng trần.

## Cách fix

Thêm vào `build.gradle`:

```groovy
test {
  maxHeapSize = "1024m"
}
```

Hoặc `build.gradle.kts`:

```kotlin
tasks.test {
  maxHeapSize = "1024m"
}
```

Xong. Nếu vẫn crash thì tăng lên `"2048m"`.
