## 5.1 RabbitMQ集群架构模式

### 5.1.1 主备模式（Warren）

**主备模式：**实现RabbitMQ的高可用集群，一般在并发和数据量不高的情况下，这种模式非常好用且简单。主备模式也称之为Warren模式。

> 注意：主备不同于主从。主备模式中，备份节点不提供任何服务，仅当主节点挂掉后，备份节点升级为主节点提供服务。

**主备模式架构模型：**

![image-20200929232448526](https://s3.ax1x.com/2020/11/24/DYOg9x.png)

如上图，主备模式中，利用HaProxy实现主备切换。

```
# HaProxy配置
listen rabbitmq_cluster
bind 0.0.0.0:5672
mode tcp    # 配置TCP模式
balance roundrobin  # 简单的轮询
server bhz76 192.168.11.76:5672 check inter 5000 rise 2 fall 2  # 主节点
server bhz77 192.168.11.77:5672 backup check inter 5000 rise 2 fall 2  # 备份节点

# rabbitmq集群节点配置
# inter每隔5秒对mq集群做健康检查，2次证明服务器可用，3次失败证明服务器不可用，并且配置主备机制
```

### 5.1.2 主备模式（Shovel）

**远程模式：**可以实现双活的一种模式，简称Shovel模式，所谓Shovel就是我们可以把消息进行不同数据中心的复制工作，我们可以让两个跨地域的mq集群互联。

**远程模式架构模型：**

![image-20200929233717068](https://s3.ax1x.com/2020/11/24/DYO236.png)

上图示例中，Goleta市有大量订单生成，此处的MQ集群压力过大，可以将消息转到Carpinteria市的MQ中心进行消息处理。在使用Shovel插件后，模型变成了近端同步确认，远端异步确认的方式，大大提高了订单的确认速度，并且还能保证可靠性。

**原理图：**

![image-20200929234547700](https://s3.ax1x.com/2020/11/24/DYOWjO.png)

近端MQ有两个队列，warehouse_goleta和backup_orders，当warehouse_goleta消息过多时，将消息路由到backup_ordre队列，然后将其中的消息复制到远端MQ处理。

**Shovel集群的配置:**

1. 首先启动rabbitmq插件，命令如下：

   ```shell
   rabbitmq-plugins enable amqp_client
   rabbitmq-plugins enable rabbitmq_shovel
   ```

2. 创建rabbitmq.config文件

   ```shell
   touch /etc/rabbitmq/rabbitmq.config
   ```

3. 添加配置

   ![image-20200929235256488](https://s3.ax1x.com/2020/11/24/DYOhuD.png)

4. 最后我们需要源服务器和目的地服务器都是用相同的配置文件（rabbitmq.config）

### 5.1.3 镜像模式（Mirror）

**镜像模式：**集群模式非常经典的就是Mirror镜像模式。保证100%数据不丢失，在实际工作中用的也是最多的。并且实现集群非常简单，一般互联网大肠都会构建这种镜像集群模式。

Mirror镜像队列，目的是为了保证RabbitMQ数据的高可靠性解决方案，主要就是实现数据的同步，一般来讲是2-3个节点实现数据同步（对于100%数据可靠性一般是3节点）。

**集群架构：**

![image-20200929235735708](https://s3.ax1x.com/2020/11/24/DYO4De.png)

### 5.1.4 多活模式（Federation）

**多活模式：**这种模式也是实现异地数据复制的主流模式，因为Shovel模式配置比较复杂，所以一般来说实现异地集群模式都是使用这种双活或者多活模型来实现的。这种模型需要依赖rabbitmq的federation插件，可以实现持续可靠的AMQP数据通信，多活模式在实际配置与应用中非常简单。

RabbitMQ部署架构采用双中心模式（多中心），那么在两套（多套）数据中心中各部署一套RabbitMQ集群，各中心的RabbitMQ服务除了需要为业务提供正常的服务外，中心之间还需要实现部分队列消息共享。

**集群架构：**

![image-20200930000345937](https://s3.ax1x.com/2020/11/24/DYO5HH.png)

> Federation插件是一个不需要构建在Cluster，而在Brokers之间传输消息的高性能插件，Federation插件可以在Brokers或者Cluster之间传输消息，连接的双方使用不同的users和virtual hosts，双方也可以使用版本不同的RabbitMQ和Erlang。Federation插件使用AMQP协议通讯，可以接受不连续的传输。

![image-20200930000831095](https://s3.ax1x.com/2020/11/24/DYOoEd.png)

上官方图所示，Federation Exchanges，可以看成Downstream从Upstream主动拉取消息，但并不是拉取所有消息，必须是在Downstream上已经明确定义Bindings关系的Exchange，也就是有实际的物理Queue来接收消息，才会从Upstream拉去消息到Downstream。使用AMQP协议实施代理见通信，Downstream会将绑定关系组合的在一起，绑定/解除绑定命令将发送到Upstream交换机，因此，Federation Exchange只接收具有订阅的消息。

## 5.2 RabbitMQ集群恢复与故障转移

RabbitMQ镜像队列集群的恢复的解决方案和应用场景：

前提：两个节点A和B组成一个镜像队列

场景1：A先停，B后停 

