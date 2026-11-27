---
title: "TaskBus - Phân phối task vào executor trong java"
date: 2025-02-25
tags: [ "Java", "Game Server" ]
---

Khi phát triển game server, chúng ta thường sử dụng observer pattern để xử lý các task nhỏ lẻ, vd như các request từ client, event từ server,... khi muốn notify sang nhiều module khác nhau

VD khi user thanh toán thành công, chúng ta cần notify sang module resource để cập nhật tài nguyên user đã mua; module segment để update segment pay mới của user; module metric để ghi log;...

Để tối ưu performance, chúng ta có thể sử dụng thread pool với số thread lớn để có thể xử lý task cùng lúc. Tuy nhiên đôi lúc ta sẽ muốn kiểm soát thứ tự thực thi các task của cùng một user, tránh trường hợp task A chạy trước task B mà task B cần dữ liệu từ task A, hoặc gây khó khăn khi xử lý concurrent data. Bài viết này MiTi sẽ giới thiệu về TaskBus, một cách phân phối task vào executor một cách kiểm soát, đảm bảo thứ tự thực thi các task của một user.

## Các class cơ bản

Đầu tiên chúng ta có `Task` là một interface có method như sau:

```java
public interface Task {

  int hash();

  void execute();
}
```

Và `Bus` là một interface có method như sau:

```java
public interface Bus {

  void submit(Task task);
}
```

### Task implementations

Chúng ta sẽ implement một số class `Task` như sau:

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

Chúng ta sẽ có một test như sau để kiểm tra output của các bus:

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

Thông thường ta sẽ implement một class `NormalBus` như sau:

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

Và đây là 1 output khi chạy test:

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

Có thể thấy các task được thực thi ở nhiều thread khác nhau làm cho task của cùng 1 user không được thực thi theo thứ tự trong output.

**Lưu ý:** Output của test có thể thay đổi mỗi lần chạy do ảnh hưởng của thread pool.

## TaskBus

Để cải thiện, chúng ta sẽ cần phân phối task của từng user vào 1 executor, "chỉ đích danh" executor nào sẽ thực thi task của user đó. Để làm được điều này, chúng ta sẽ cần implement một class `TaskBus` như sau:

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

Và đây là 1 output khi chạy test:

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

Có thể thấy task của cùng 1 user sẽ được thực thi trong cùng 1 thread. Trong output này, thread thực thi task của user 1 là `pool-2-thread-1`, còn của user 2 là `pool-3-thread-1`. Mặc dù thứ tự task của các user khác nhau không được đảm bảo, nhưng thứ tự của các task của cùng 1 user sẽ được thực thi theo đúng thứ tự đã submit.

## Kết luận

Đây chỉ là một implement TaskBus cơ bản, trong thực tế chúng ta còn phải đối mặt nhiều vấn đề khác, vd độ ưu tiên của task, monitor thời gian thực thi task, xử lý khi run task gặp exception,... Ngoài ra cách này cũng đánh đổi thời gian thực thi để đảm bảo thứ tự các task.

Vẫn rất hi vọng bài viết này sẽ hữu ích với bạn trong việc tìm ra một giải pháp khi muốn giữ thứ tự thực thi task của một user.

Toàn bộ source code bạn có thể tìm thấy trên GitHub của mình: [https://github.com/tiennm99/jvm-labs/tree/main/taskbus](https://github.com/tiennm99/jvm-labs/tree/main/taskbus) (trước đây là repo riêng `tiennm99/taskbus`, nay đã gộp vào `jvm-labs`)
