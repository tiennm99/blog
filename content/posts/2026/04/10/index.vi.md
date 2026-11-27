---
title: "Hibernate merge: lấy ID của entity đúng cách"
date: 2026-04-10
tags: ["AI-Assisted", "Hibernate", "JPA", "Java"]
categories: ["Sharing"]
---

Một lỗi nhỏ mà mình từng mất kha khá thời gian debug.

## Vấn đề

Khi dùng `EntityManager.merge()` để lưu một entity mới, nhiều người có thói quen gọi:

```java
entityManager.merge(entity);
Long id = entity.getId(); // null hoặc giá trị cũ!
```

Và... `id` không có giá trị như mong đợi.

## Nguyên nhân

`merge()` **không update** object bạn truyền vào. Nó copy state từ object đó sang một **managed instance mới** rồi trả về instance đó. Object gốc vẫn ở trạng thái detached, không được Hibernate gán ID.

## Cách đúng

Dùng **object trả về** từ `merge()`:

```java
MyEntity managed = entityManager.merge(entity);
Long id = managed.getId();
```

Đơn giản vậy thôi. Khác với `persist()` — cái đó modify trực tiếp object truyền vào nên không có vấn đề này.
