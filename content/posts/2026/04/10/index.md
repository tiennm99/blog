---
title: "Hibernate merge: Getting the Entity ID the Right Way"
date: 2026-04-10
tags: ["AI-Assisted", "Hibernate", "JPA", "Java"]
categories: ["Sharing"]
---

A small pitfall that once cost me a fair bit of debugging time.

## Problem

When using `EntityManager.merge()` to save a new entity, many people are in the habit of writing:

```java
entityManager.merge(entity);
Long id = entity.getId(); // null or stale value!
```

And... `id` doesn't have the value you expected.

## Cause

`merge()` **does not update** the object you pass in. Instead, it copies the state from that object into a **new managed instance** and returns that instance. The original object remains detached and is never assigned an ID by Hibernate.

## The Right Way

Use the **returned object** from `merge()`:

```java
MyEntity managed = entityManager.merge(entity);
Long id = managed.getId();
```

That's all there is to it. Unlike `persist()` — which mutates the passed-in object directly and therefore doesn't have this issue.
