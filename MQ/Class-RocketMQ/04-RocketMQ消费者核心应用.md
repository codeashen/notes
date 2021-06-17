# 一、消费者核心参数

PushConsumer核心参数详解

- consumeFromWhere：消费位点，有三种，从队列头、队列尾、指定时间点。
- allocateMessageQueueStrategy：消息分配的策略，默认平均分给所有的客户端
- subscription：订阅关系
- offsetStore：存储实际偏移量，有两种实现，LocalFileOffsetStore 和 LocalFileOffsetStore
- consumeThreadMin/consumeThreadMax：线程池自动调整配置
- consumeConcurrentlyMaxSpan/pullThresholdForQueue：第一个参数表示单个队列并行消费最大的跨度是多少；第二个表示一个队列最大消费的个数
- pullinterval/pullBatchSize：消息拉取的时间间隔；拉取数据容量
- consumeMessageBatchMaxSize：批量拉取数据量，默认1条
- maxReconsumeTimes：消息消费重试次数，默认-1，表示重试16次

# 二、消费模式

PushConsumer有两种消费模式，集群模式和广播模式。

```java
DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("test_model_consumer_name");
consumer.setNamesrvAddr("192.168.36.123:9876;192.168.36.133:9876");
consumer.subscribe("test_model_topic", "TagA");
// consumer.setMessageModel(MessageModel.CLUSTERING);   // 设置为集群消费模式（默认）
consumer.setMessageModel(MessageModel.BROADCASTING);    // 设置为广播消费模式
consumer.registerMessageListener(new MessageListenerConcurrently() {
    // 消费逻辑...
});
consumer.start();
```

## 2.1 集群模式

### PushConsumer集群消费模式

集群消费模式是默认的消费模式，的目的是为了做负载均衡。

* Clustering 模式（默认）
* GroupName 用于把多个 Consumer 组织到一起
* 相同 GroupName 的 Consumer 只能消费到所订阅消息的一部分
* 目的：达到天然的负载均衡机制

> 消费者组的负载均衡是针对队列维度的。例如一个topic下有4个队列，消费者组有两个消费者，那么者两个消费者各监听2个队列，消费其中的消息。

### Tag过滤

Consumer可以根据Tag进行消息过滤，过滤行为发生在消费的时候。即所有消息都会被消费者消费，但是消费行为consumeMessage方法，只会执行指定tag的消息。

示例流程如下：

1. 生产者将消息投递到topic的队列中去，如有4个队列
2. 消费者组有2个消费者A、B，分别订阅tagA和tagB的消息，注册后分别监听队列 {0,1} 和 {2,3}
3. 到达队列 {0,1} 的消息，无论是什么tag，都会被消费者接收，但是只有tagA的消息会触发消费行为
4. 集群模式下不清楚每个消息会被投递到哪个队列，所以不能保证tagA的消息都投递到订阅tagA消息的消费者所监听的队列，不符合过滤条件的消息会被丢弃

参考：[官方文档-消息过滤](https://github.com/apache/rocketmq/blob/master/docs/cn/design.md#3-%E6%B6%88%E6%81%AF%E8%BF%87%E6%BB%A4)

> 如果希望消费者订阅不同的tag，且每条消息都能被对应的Consumer消费，需要使用广播模式。

## 2.2 广播模式

* Boradcasting 模式（广播模式）
* 同一个 ConsumerGroup 里的 Consumer 都消费订阅 Topic 的全部消息
* 也就是一条消息会被每一个 Consumer 消费
* setMessageModel 方法设置成广播模式

# 三、偏移量Offset

## 3.1 Offset介绍

* Offset 是消息消费进度的核心
* Offset 指某个 topic 下的一条消息在某个 MessageQueue 里的位置
* 通过 Offset 可以进行定位到这条消息
* Offset 的存储实现分为远程文件类型和本地文件类型两种

## 3.2 远程Offset和本地Offset

### RemoteBrokerOffsetStore(集群模式)

* 默认集群模式 Clustering，采用远程文件存储 Offset
* 本质上因为多消费者，每个 Consumer 消费所订阅主题的一部分
* 这种情况需要 Broker 控制 offset 的值，使用 RemoteBrokerOffsetStore

### LocalFileOffsetStore(广播模式)

* 广播模式下，由于每个 Consumer 都会收到消息且消费
* 各个 Consumer 之间没有任何干扰，独立线程消费
* 所以使用 LocalFileOffsetStore，也就是把Offset存储到本地

> 对于PushConsumer 和 PullConsumer，两者对于 Offset 的维护机制不同
>
> * PushConsumer：无需自己关心 Offset，RocketMQ 会自动维护
> * PullConsumer：需要自己记录 Offset
>
> 所以工作中尽量使用 DefaultPushConsumer

# 四、PushConsumer长轮询模式分析

通常主流消息获取模式有两种：

- Push消息推送模式
- Pull消息拉取模式

DefaultPushConsumer 不是采用上述方式，而是消费者使用 **长轮询机制(long pull)** 实现的

push会加大broker的工作量，而且broker不知道不同消费者的消费能力，推消息的时候不可控。所以RocketMQ没有采用push机制。

长轮询也是Consumer主动向broker发送请求，请求到了broker，如果队列里有消息就返回消息，如果没有消息先不返回，而是阻塞住这个请求。阻塞时间5s，之后之后再检查是否有数据，有的话唤醒对应请求的channel。

> 相关源码在 broker 模块的 PullRequestHoldService 类中的 run 方法。

![image-20210617131952655](https://z3.ax1x.com/2021/06/17/2vlbTS.png)

长轮询机制的主动权还是掌握在Consumer端，即使大量消息堆积，也不会把消息主动推到Consumer客户端。当然长轮询机制也有弊端，在broker阻塞住Consumer的请求的时候，会占用客户端资源，要合理规划客户端线程数，避免很多请求线程被broker阻塞住。

# 五、PullConsumer使用

之前介绍的都是PushConsumer，下面介绍RocketMQ中PullConsumer的使用。采用的是消息拉取方式，具体类是DefaultMQPullConsumer

Pull方式主要做了三件事：

* 消费者维护 Message Queue 并遍历
* 消费者维护 OffsetStore
* 消费者根据不同的消息状态做不同的处理

原生DefaultPullConsumer拉取消息示例：

```java
public class PullConsumer {
    // Map存储每个队列的消费进度，key为指定的队列，value为这个队列拉取数据的最后位置offset
    private static final Map<MessageQueue, Long> offsetTable = new HashMap<MessageQueue, Long>();

    public static void main(String[] args) throws MQClientException {
        DefaultMQPullConsumer consumer = new DefaultMQPullConsumer("test_pull_consumer_name");
        consumer.setNamesrvAddr(Const.NAMESRV_ADDR_MASTER_SLAVE);
        consumer.start();
        System.err.println("consumer start");

        // 从TopicTest这个主题去获取所有的队列（默认会有4个队列）
        Set<MessageQueue> mqs = consumer.fetchSubscribeMessageQueues("test_pull_topic");
        // 遍历每一个队列，进行拉取数据
        for (MessageQueue mq : mqs) {
            System.err.println("Consume from the queue: " + mq);

            SINGLE_MQ:
            while (true) {
                try {
                    // 从queue中获取数据，指定消息位置，单次最多拉取32条记录
                    PullResult pullResult = consumer.pullBlockIfNotFound(mq, null, getMessageQueueOffset(mq), 32);
                    System.out.println(pullResult);
                    // 记录消费进度
                    putMessageQueueOffset(mq, pullResult.getNextBeginOffset());
                    // 根据拉取结果的不同状态，处理消息
                    switch (pullResult.getPullStatus()) {
                        case FOUND:           // 找到消息，进行消费
                            List<MessageExt> list = pullResult.getMsgFoundList();
                            for (MessageExt msg : list) {
                                System.out.println(new String(msg.getBody()));
                            }
                            break;
                        case NO_MATCHED_MSG:  // 过滤结果不匹配
                            break;
                        case NO_NEW_MSG:      // 没有新消息
                            System.out.println("没有新的数据啦...");
                            break SINGLE_MQ;
                        case OFFSET_ILLEGAL:  // 非法偏移量，可能太大或太小
                            break;
                        default:
                            break;
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
        consumer.shutdown();
    }

    // 记录消费进度
    private static void putMessageQueueOffset(MessageQueue mq, long offset) {
        offsetTable.put(mq, offset);
    }

    // 获取消费进度
    private static long getMessageQueueOffset(MessageQueue mq) {
        Long offset = offsetTable.get(mq);
        if (offset != null)
            return offset;
        return 0;
    }
}
```

使用MQPullConsumerScheduleService拉取消息示例：这种方式下，不需要自己维护offset

```java
public class PullScheduleService {
    public static void main(String[] args) throws MQClientException {

        final MQPullConsumerScheduleService scheduleService = new MQPullConsumerScheduleService("test_pull_consumer_name");
        scheduleService.getDefaultMQPullConsumer().setNamesrvAddr(Const.NAMESRV_ADDR_MASTER_SLAVE);
        scheduleService.setMessageModel(MessageModel.CLUSTERING);

        scheduleService.registerPullTaskCallback("test_pull_topic", new PullTaskCallback() {

            @Override
            public void doPullTask(MessageQueue mq, PullTaskContext context) {
                // 从context中拿到consumer
                MQPullConsumer consumer = context.getPullConsumer();
                System.err.println("-------------- queueId: " + mq.getQueueId() + "-------------");
                try {
                    // 获取从哪里拉取
                    long offset = consumer.fetchConsumeOffset(mq, false);
                    if (offset < 0)
                        offset = 0;

                    PullResult pullResult = consumer.pull(mq, "*", offset, 32);
                    System.out.printf("%s%n", offset + "\t" + mq + "\t" + pullResult);
                    switch (pullResult.getPullStatus()) {
                        case FOUND:
                            List<MessageExt> list = pullResult.getMsgFoundList();
                            for (MessageExt msg : list) {
                                //消费数据...
                                System.out.println(new String(msg.getBody()));
                            }
                            break;
                        case NO_MATCHED_MSG:
                            break;
                        case NO_NEW_MSG:
                        case OFFSET_ILLEGAL:
                            break;
                        default:
                            break;
                    }
                    // 更新offset
                    consumer.updateConsumeOffset(mq, pullResult.getNextBeginOffset());
                    // 设置再过3000ms后重新拉取
                    context.setPullNextDelayTimeMillis(3000);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });

        scheduleService.start();
    }
}
```

> DefaultPullConsumer 已经被官方表示为过时，官方推荐使用 DefaultLitePullConsumer，具体实例可以官方github示例。
>
> 参考官方示例：[rocketmq-example](https://github.com/apache/rocketmq/tree/master/example/src/main/java/org/apache/rocketmq/example/simple)