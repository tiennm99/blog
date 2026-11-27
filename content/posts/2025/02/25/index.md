---
title: "TaskBus - Dispatching Tasks to Executors in Java"
date: 2025-02-25
tags: [ "Java", "Game Server" ]
---

When developing a game server, we often use the observer pattern to handle small, discrete tasks—such as client requests or server events—when we need to notify multiple modules.

For example, when a user completes a payment, we need to notify the resource module to credit the purchased items, the segment module to update the user's paying segment, the metrics module to log the event, and so on.

To optimize performance, we can use a thread pool with a large number of threads to process tasks concurrently. However, we often want to control the execution order of tasks belonging to the same user—avoiding situations where task A runs after task B when task B depends on data from task A, or preventing race conditions on concurrent user data. In this post, MiTi will introduce TaskBus, a way to dispatch tasks to executors in a controlled manner that guarantees sequential execution order for each user's tasks.

## Core Classes

First, we have the `Task` interface with the following methods:

```java
public interface Task {

  int hash();

  void execute();
}
```

And the `Bus` interface:

```java
public interface Bus {

  void submit(Task task);
}
```

### Task implementations

Let's implement a few `Task` classes as follows:

```java
public interface Event extends Task {
  int userId();

  @Override
  default int hash() {
    return userId();
  }
}
```

```java
@Slf4j
public record UserLoginEvent(int userId) implements Event {

  @Override
  public void execute() {
    log.info("User {} logged in", userId);
  }
}
```

```java
public interface Request extends Task {
  int userId();

  @Override
  default int hash() {
    return userId();
  }
}

```

```java
@Slf4j
public record SendMessageRequest(int userId, String message) implements Request {

  @Override
  public void execute() {
    log.info("User {} sent message: {}", userId, message);
  }
}
```

## Test

We'll use the following test method to inspect the output of different bus implementations:

```java
  void submitTasks(Bus bus) {
    bus.submit(new UserLoginEvent(1));
    bus.submit(new SendMessageRequest(1, "msg1"));
    bus.submit(new SendMessageRequest(1, "msg2"));
    bus.submit(new UserLoginEvent(2));
    bus.submit(new SendMessageRequest(2, "msg1"));
    bus.submit(new SendMessageRequest(2, "msg2"));
    bus.submit(new SendMessageRequest(1, "msg3"));
    bus.submit(new SendMessageRequest(1, "msg4"));
    bus.submit(new SendMessageRequest(2, "msg3"));
    bus.submit(new SendMessageRequest(2, "msg4"));
  }
```

## NormalBus

Typically, we might implement a `NormalBus` class like this:

```java
public class NormalBus implements Bus {
  private final ExecutorService executors =
      Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors());

  @Override
  public void submit(Task task) {
    executors.submit(task::execute);
  }
}
```

Here is a sample output when running the test:

```
[pool-1-thread-1] INFO com.miti99.taskbus.task.event.UserLoginEvent - User 1 logged in
[pool-1-thread-10] INFO com.miti99.taskbus.task.request.SendMessageRequest - User 2 sent message: msg4
[pool-1-thread-9] INFO com.miti99.taskbus.task.request.SendMessageRequest - User 2 sent message: msg3
[pool-1-thread-8] INFO com.miti99.taskbus.task.request.SendMessageRequest - User 1 sent message: msg4
[pool-1-thread-2] INFO com.miti99.taskbus.task.request.SendMessageRequest - User 1 sent message: msg1
[pool-1-thread-6] INFO com.miti99.taskbus.task.request.SendMessageRequest - User 2 sent message: msg2
[pool-1-thread-7] INFO com.miti99.taskbus.task.request.SendMessageRequest - User 1 sent message: msg3
[pool-1-thread-5] INFO com.miti99.taskbus.task.request.SendMessageRequest - User 2 sent message: msg1
[pool-1-thread-3] INFO com.miti99.taskbus.task.request.SendMessageRequest - User 1 sent message: msg2
[pool-1-thread-4] INFO com.miti99.taskbus.task.event.UserLoginEvent - User 2 logged in
```

As you can see, tasks are executed across many different threads, causing tasks belonging to the same user to run out of order in the output.

**Note:** The test output may vary on each run due to thread pool scheduling.

## TaskBus

To improve this, we need to route all tasks for a given user to a single dedicated executor, pinpointing exactly which executor will handle that user's tasks. To achieve this, we can implement `TaskBus` as follows:

```java
public class TaskBus implements Bus {
  private final ExecutorService[] executors;
  private final int poolSize;

  public TaskBus(int poolSize) {
    this.poolSize = poolSize;
    executors = new ExecutorService[poolSize];
    for (int i = 0; i < poolSize; i++) {
      executors[i] = Executors.newSingleThreadExecutor();
    }
  }

  public TaskBus() {
    this(Runtime.getRuntime().availableProcessors());
  }

  @Override
  public void submit(Task task) {
    int executorId = task.hash() % poolSize;
    executors[executorId].submit(task::execute);
  }
}
```

And here is the output when running the test:

```
[pool-3-thread-1] INFO com.miti99.taskbus.task.event.UserLoginEvent - User 2 logged in
[pool-2-thread-1] INFO com.miti99.taskbus.task.event.UserLoginEvent - User 1 logged in
[pool-3-thread-1] INFO com.miti99.taskbus.task.request.SendMessageRequest - User 2 sent message: msg1
[pool-2-thread-1] INFO com.miti99.taskbus.task.request.SendMessageRequest - User 1 sent message: msg1
[pool-3-thread-1] INFO com.miti99.taskbus.task.request.SendMessageRequest - User 2 sent message: msg2
[pool-2-thread-1] INFO com.miti99.taskbus.task.request.SendMessageRequest - User 1 sent message: msg2
[pool-3-thread-1] INFO com.miti99.taskbus.task.request.SendMessageRequest - User 2 sent message: msg3
[pool-2-thread-1] INFO com.miti99.taskbus.task.request.SendMessageRequest - User 1 sent message: msg3
[pool-3-thread-1] INFO com.miti99.taskbus.task.request.SendMessageRequest - User 2 sent message: msg4
[pool-2-thread-1] INFO com.miti99.taskbus.task.request.SendMessageRequest - User 1 sent message: msg4
```

Now we can see that all tasks for the same user are executed on the exact same thread. In this output, user 1's tasks run on `pool-2-thread-1`, while user 2's tasks run on `pool-3-thread-1`. Although the relative order between different users isn't guaranteed, tasks belonging to the same user are strictly executed in the exact order they were submitted.

## Conclusion

This is just a basic TaskBus implementation. In production, we have to deal with many additional concerns, such as task prioritization, execution time monitoring, exception handling during task execution, and so on. This approach also trades off some raw throughput in exchange for per-user ordering guarantees.

Still, I hope this post helps you find a clean solution when you need to preserve the execution order of a user's tasks.

You can find the full source code on my GitHub: [https://github.com/tiennm99/jvm-labs/tree/main/taskbus](https://github.com/tiennm99/jvm-labs/tree/main/taskbus) (previously a standalone `tiennm99/taskbus` repo, now merged into `jvm-labs`).
