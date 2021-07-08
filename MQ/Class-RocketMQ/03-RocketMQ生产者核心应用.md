# 一、生产者核心参数详解

- producerGroup(组名)：在一个应用中唯一，如果启动两个相同名称的producer会报错。
- createTopic：创建topic，生产中不允许producer直接创建topic
- defaultTopicQueueNums：默认队列数量，默认为4
- sendMsgTimeout：发送超时时间（单位：ms）
- compressMsgBodyOverHowmuch：消息达到多大会进行压缩，以提升性能。默认4096字节
- retryTimesWhenSendFailed：重发次数，可配置
- retryAnotherBrokerWhenNotStoreOK：消息存储失败是否重试其他broker，默认false
- maxMessageSize：消息大小限制

> 生产消费者都可能设置一些限制，那消息是消息在生产者端就不会发出去，还是到了消费者端才拒绝呢？其实是Producer和Consumer启动的时候都会去NameServer拉取元数据信息，保存在本地，在发消息的时候就会已经被拒绝了。

# 二、主从同步机制分析

Master - Slave 主从同步有两个部分，元数据同步 + 消息同步

* 元数据同步：Broker角色识别，为slave则启动同步任务。同步topic的配置信息，消费者offest信息等，启动定时任务同步，非实时。
* 消息数据同步：commitLog数据，实时同步。

> 消息同步相关代码：HAService、HAconnection、WaitNotfiyObject

|          | 元数据同步                                                   | 消息同步                                                     |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 同步内容 | 一些配置信息，如Topic信息，Consumer Offset信息，delay信息，subscribe信息等 | 真实的消息内容，CommitLog                                    |
| 同步时机 | 定时任务同步                                                 | 实时同步                                                     |
| 同步方式 | Broker角色识别，为Slave则启动同步任务                        | 核心思想是不断对比Master和Slave的Offset，Master和Slave不断轮询读写状态位，以判断是否需要同步 |
| 实现机制 | Netty                                                        | 原生Socket                                                   |

# 三、消息发送机制

## 3.1 同步发送和异步发送

|          | 同步发送               | 异步发送                             |
| -------- | ---------------------- | ------------------------------------ |
| 发送方法 | producer.send(Message) | producer.send(Message, SendCallBack) |
| 核心实现 | DefaultMQProducerImpl  | DefaultMQProducerImpl                |

```java
// 同步发送消息
// SendResult result = producer.send(message);
// System.err.println("消息发出：" + result);

// 异步发送消息
producer.send(message, new SendCallback() {
    @Override
    public void onSuccess(SendResult sendResult) {
        System.err.printf("msgId: %s, sendStatus: %s\n", sendResult.getMsgId(), sendResult.getSendStatus());
    }

    @Override
    public void onException(Throwable e) {
        System.err.println("------发送失败------");
    }
});
```

## 3.2 RocketMQ底层Netty解析

RocketMQ中remoting模块基于netty实现，根据下图，介绍其中核心类。

![image-20210615151114105](https://z3.ax1x.com/2021/06/15/2b8Z26.png)

| 接口/类               | 含义                                                         | 方法                                                         |
| --------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| RemotingService       | 客户端服务端上层接口                                         | 启动、关闭、回调                                             |
| RemotingClient        | 客户端接口，继承RemotingService                              | 更新NameServ、发送消息、注册                                 |
| RemotingServer        | 服务端接口，继承RemotingService                              | 注册、获取程序Pair、发送消息                                 |
| NettyRemotingClient   | 客户端实现类，<br/>继承NettyRemotingAbstract，<br/>实现RemotingClient | RemotingClient方法实现，发送消息方法直接调用NettyRemotingAbstract的方法实现 |
| NettyRemotingServer   | 服务端实现类，<br/>继承NettyRemotingAbstract，<br/>实现RemotingServer | RemotingServer方法实现，发送消息方法直接调用NettyRemotingAbstract的方法实现 |
| NettyRemotingAbstract | 抽象类，封装公共具体发消息实现                               | 真正发送消息方法                                             |

RocketMQ中Netty自定义的协议栈结构如下，发送的数据遵循该结构。

![image-20210615160204916](https://z3.ax1x.com/2021/06/15/2bBhPU.png)

## 3.2 消息的返回状态

RocketMQ生产者发送消息会返回SendResult对象，其中sendStatus属性描述了发送状态，有以下4种状态：

* **SEND_OK**：消息发送成功。
* **FLUSH_DISK_TIMEOUT**：消息发送成功，但是刷盘超时。会等下一次刷盘的时候再次刷盘。但是在此期间如果宕机消息会丢失。
* **FLUSH_SLAVE_TIMEOUT**：消息发送成功，但是消息同步到Slave超时。Slave宕机，会丢失消息。
* **SLAVE_NOT_AVAILABLE**：消息发送成功，但是Slave不可用。Master宕机消息丢失。

出现后三种情况，考虑做补偿处理，比如可靠性重投。

# 四、消息延迟投递

- 延迟消息：消息发送到Broker后，要特定的时间后才会被Consumer消费
- 只支持固定精度的延迟消息：内部就是一个定时任务，等到了符合的是将才将消息对Consumer可见
- Message.setDelayTimeLevel：设置延迟级别方法，不同级别表示不同的固定精度

> - 固定精度值得是，内置设定的几个延时时间，不支持随意设置延时时间。因为考虑到定时任务扫描方便，防止排序浪费性能。
> - MessageStoreConfig：配置类，配置里固定精度，messageDelayLevel
> - ScheduleMessageService：任务类，定时任务

```java
Message message = new Message("test_quick_topic", "TagA", "key1", ("Hello RocketMQ " + i).getBytes());
// 设置延迟级别
message.setDelayTimeLevel(1);
SendResult result = producer.send(message);

/*
延迟级别在 MessageStoreConfig 类的 messageDelayLevel 中有规定
private String messageDelayLevel = "1s 5s 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m 9m 10m 20m 30m 1h 2h";
*/
```

对于生产者来说，消息投递成功后马上返回结果；对于消费者，只有等到延迟时间后，才会消费到消息。

# 五、消息自定义投递

默认发送方法，消息会被轮流发送到topic的每个队列中，消费者消费时也会根据负载均衡策略从各个队列中获取消息。

通过以下发送方法的重载，可以发送消息到topic的指定队列。

`sendMessage(Message, MessageQueueSelector, Object)`：参数分别为，消息，队列选择器，投递参数。投递参数会传到队列选择器`select`方法的第三个参数上。

```java
// 自定义投递
SendResult sendResult = producer.send(message, new MessageQueueSelector() {
    // 参数一:队列List, 参数二:消息, 参数三: 发送参数
    // 返回要投递的队列
    @Override
    public MessageQueue select(List<MessageQueue> mqs, Message msg, Object arg) {
        Integer queueNumber = (Integer) arg;
        return mqs.get(queueNumber);
    }
}, 2);  //投递参数2会传到select方法上

System.err.println(sendResult.getMessageQueue().getQueueId());  // 2
```



