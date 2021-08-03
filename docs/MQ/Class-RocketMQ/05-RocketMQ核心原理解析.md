# 一、消息的存储结构

消息存储结构图：

![img](https://img-blog.csdn.net/20180628134016153?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5bHk0NDEz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

* CommitLog：实际的消息存储
* ConsumeQueue：存储消息在 CommitLog 中的位置信息，可以直接读到内存中
* CommitLog 是真正的消息物理存储，ConsumeQueue 是消息的逻辑队列，记录消息在 CommitLog 的什么位置，类似数据库的索引文件
* 每一个 Topic 下的每一个 Message Queue（消息队列）都对应一个 ConsumeQueue 文件
* CommitLog 以物理文件的方式存储，每台 broker 上的 CommitLog 被本机的所有 ConsumeQueue 共享
* RocketMQ写盘方式：顺序写，随机读
* CommitLog 不仅存储了消息，还存储了各个 ConsumeQueue 信息，即使 ConsumeQueue 丢失，也能通过 CommitLog 恢复数据

![image-20210617154209365](https://z3.ax1x.com/2021/06/17/2xe2lV.png)

官方文档：[RocketMQ设计](https://github.com/apache/rocketmq/blob/master/docs/cn/design.md)

# 二、同步刷盘与异步刷盘

RocketMQ消息存储：内存+磁盘存储，两种刷盘方式

- 异步刷盘：Producer发送消息写到broker的内存里的PageCache中就立即返回结果，当PageCache中消息堆积到一定程度，就触发一次顺序写机制，将内存中的数据刷到磁盘
- 同步刷盘：Producer将消息发到broker上的PageCache后，阻塞请求线程不立即返回，将内存中的数据刷到磁盘上完成后，再唤醒请求线程，返回结果到Producer

# 三、同步复制与异步复制

同一组Broker有Master-Slave角色，数据刷到master节点的磁盘后，将消息同步给slave的过程称之为复制，有两种复制方式

- 异步复制：消息到达master之后立即返回给producer，由异步复制的任务将消息复制到slave节点，极端情况下master宕机会造成数据丢失。
- 同步复制：消息需要从master同步复制到slave节点后，才返回结果到producer。好处是保证数据不丢失，坏处是master-slave通信影响请求效率。

推荐的方式是 **同步双写，异步刷盘** 的方式，即主从节点之间的数据复制同步进行，数据落到磁盘的过程异步进行。

# 四、高可用机制

Master-Slave 高可用，根据配置文件的`brokerId`区分主从节点，master提供读写功能，slave只读。

当master繁忙或者不用的时候，可以自动切换到slave读取消息。

# 五、NameServer协调者

为什么需要NameServer？

NameServer是整个集群的状态服务器，集群中的各个角色都通过NameServer获取全局的配置信息和状态等，各个角色都需要定时上报状态到NameServer。

NameServer可以单个部署、相互独立。

为什么不使用Zookeeper？

RocketMQ的架构设计决定了只需要一个轻量级的元数据服务器就足够了，只需要保持最终一致，而不需要Zookeeper这样的强一致性解决方案，不需要再依赖另一个中间件，从而减少整体维护成本。

NameServer中维护了以下信息：

```java
private final HashMap<String/* topic */, List<QueueData>> topicQueueTable;
private final HashMap<String/* brokerName */, BrokerData> brokerAddrTable;
private final HashMap<String/* clusterName */, Set<String/* brokerName */>> clusterAddrTable;
private final HashMap<String/* brokerAddr */, BrokerLiveInfo> brokerLiveTable;
private final HashMap<String/* brokerAddr */, List<String>/* Filter Server */> filterServerTable;
```

精品参考：

- [NameServer解析](https://blog.csdn.net/weixin_38003389/article/details/86677175)
- [深入理解NameServer](http://www.tianshouzhi.com/api/tutorials/rocketmq/408)

