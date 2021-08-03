本章内容包括，RabbitMQ的高性能之道是如何做到的？什么是AMPQ高级协议？AMPQ核心概念是什么？RabbitMQ整体架构模型是什么样子的？RabbitMQ消息是如何流转的？RabbitMQ安装与使用命令行与管控台，RabbitMQ消息生产与消费，RabbitMQ交换机详解，RabbitMQ队列、绑定、虚拟主机、消息等...

## 2.1 RabbitMQ高性能的原因

* Erlang语言最初用于交换机领域的架构模式,这样使得RabbitMQ在Broker之间进行数据交互的性能是十分优秀的
* Erlang 的优点：Erlang有着和原生Socket一样的延迟

## 2.2 AMQP高级消息队列协议与模型

### 2.2.1 AMQP定义

AMQP全称：Advanced Message Queuing Protocol（高级消息队列协议）。

AMQP定义：AMQP是具有现代特征的二进制协议。是一个提供统一消息服务的应用层标准高级消息对下列协议，是一个应用层协议的一个开放标准，为面向消息的中间件设计。

### 2.2.2 AMQP协议模型

![image-20200711150958903](https://s3.ax1x.com/2020/11/24/DYOGAs.png)

生产者（Publisher application）将消息投递到Server端，到达Exchange上。消费者（Consumer application）监听Message Queue，拿到消息进行消费。

其中Exchange和Message Queue有一定的绑定关系。

### 2.2.3 AMQP核心概念

* Server：又称Broker，接受客户端的连接，实现AMQP实体服务。
* Connection：连接，应用程序与Broker的网络连接。
* Channel：网络信道，几乎多有的操作都在Channel中进行，Channel是进行消息读写的通道。客户端可以建立多个Channel，每个Channel代表一个会话任务。
* Message：消息，服务器和应用程序之间传送的数据，由Properties和Body组成。Properties可以对消息进行修饰，比如消息的优先级、延迟等高级特征；Body则就是消息的内容。
* Virtual host：虚拟地址，用于进行逻辑隔离，最上层的消息路由。一个Virtual host里面可以有若干个Exchange和Queue，同一个Virtual host里面不能有相同名称的Exchange和Queue。
* Exchange：交换机，接收消息，根据路由键转发消息到绑定的队列。
* Binding：Exchange和Queue之间的虚拟连接，binding中可以包含routing key（路由键）。
* Routing key：一个路由规则，虚拟机可以用它来确定如何路由一个特定的消息。
* Queue：可称为Message Queue，消息队列，保存消息并将它们转发给消费者。

## 2.3 RabbitMQ整体架构与消息流转

* RabbitMQ整体架构

  ![image-20200711152946005](https://s3.ax1x.com/2020/11/24/DYOJNn.png)

  生产者值关注把消息投递到指定的Exchange，消费者只需要监听指定的队列。Exchange和Queue之间有一个绑定的关系。

* RabbitMQ消息流转图

  ![image-20200711153234650](https://s3.ax1x.com/2020/11/24/DYOYhq.png)

  生产者将Message投递到Exchange上，一个Exchange可以绑定多个Message Queue，Exchange根据路由key，将消息路由到指定的队列上，消费者监听指定的队列，进行消息消费。

## 2.4 RabbitMQ快速入门

### 2.4.1 消息生产与消费

* ConnectionFactory：获取连接工厂
* Connection：一个连接
* Channel：数据通信信道，可发送和接收消息
* Queue：具体的消息存储队列
* Producer & Consumer：生产者和消费者

[示例代码](rabbitmq-api/src/main/java/com/lucifer/rabbitmq/quickstart)

## 2.5 Exchange交换机详解

Exchange：接收消息，并根据路由键转发消息到所绑定的队列

### 2.5.1 Exchange概念图解

![img](https://s3.ax1x.com/2020/11/24/DYObCt.jpg)

* 蓝框：Send Message过程，表示Client端将消息投递到Exchange上，通过路由关系路由到指定的队列
* 绿框：Receive Message过程，表示Client跟队列建立的监听，去接收消息
* 红框：Rabbit Server
* 黄框：RoutingKey和绑定关系，Exchange和队列要尽力绑定关系，消息到达Exchange后投递到哪个队列由RoutingKey决定

### 2.5.2 交换机属性

* Name：交换机名称
* Type：交换机类型 direct、topic、fanout、headers
* Durability：是否需要持久化，true为持久化
* Auto Delete：当最后一个绑定到Exchange上的队列删除后，自动删除该Exchange
* Internal：当前Exchange是否用于RabbitMQ内部使用，默认为false
* Arguments：扩展参数，用于扩展AMQP协议自制定化使用

### 2.5.3 交换机类型

#### Direct Exchange

直连方式的Exchange。

所有发送到Direct Exchange的消息被转发到RoutingKey中指定的Queue。

> 注意：Direct模式可以使用RabbitMQ自带的Exchange：default Exchange，所以不需要将Exchange进行任何绑定（binding）操作，消息传递时，RoutingKey必须完全匹配才会被队列接收，否则该消息会被抛弃。

![image-20200711202355004](https://s3.ax1x.com/2020/11/24/DYON90.png)

[示例代码](rabbitmq-api/src/main/java/com/lucifer/rabbitmq/api/exchange/direct)

#### Direct Exchange

所有发送到Topic Exchange的消息被转发到所有关心RoutingKey中指定Topic的Queue上

Exchange将RoutingKey和某Topic进行模糊匹配，此时队列需要绑定一个Topic。

> 注意：模糊匹配可以使用通配符
> 
> “#”  匹配一个或多个词
> “*”  匹配不多不少一个词
> 
> 如："log.#" 能匹配到 "log.info.oa"， "log.*" 只能匹配到 "log.err"

![image-20200711210038672](https://s3.ax1x.com/2020/11/24/DYOU3V.png)

[示例代码](rabbitmq-api/src/main/java/com/lucifer/rabbitmq/api/exchange/topic)

#### Fanout Exchange

不处理路由键，只需要简单地将队列绑定到交换机上；

发送到交换机的消息都会被转发到与交换机绑定的队列上；

Fanout交换机转发消息是最快的。

![image-20200711220646402](https://s3.ax1x.com/2020/11/24/DYOacT.png)

[示例代码](rabbitmq-api/src/main/java/com/lucifer/rabbitmq/api/exchange/fanout)

## 2.6 绑定、队列、消息、虚拟主机详解

### 2.6.1 Binding-绑定

* Exchange和Exchange、Queue之间的连接关系
* Binding中可以半酣RoutingKey或者参数

### 2.6.2 Queue-消息队列

消息队列，实际存储消息数据

* Durability：是否持久化，Durable：是，Transient：否
* Auto delete：如选yes，代表当最后一个监听被移除之后，该Queue会自动被删除

### 2.6.3 Message-消息

服务器和应用程序之间传送的数据

本质上就是一段数据，由Properties和Payload（Body）组成

常用属性：delivery mode（持久化模式）、headers（自定义属性）

> 其他属性：
>
> content_type、content_encoding、priority（优先级）
>
> correlation_id（唯一id）、reply_to、expiration（过期时间）、message_id（消息id）
>
> timestamp、type、user_id、app_id、cluster_id

[示例代码](rabbitmq-api/src/main/java/com/lucifer/rabbitmq/api/message)

### 2.6.4 Virtual host-虚拟主机

虚拟地址，用于进行逻辑隔离，最上层的消息路由

一个Virtual host里面可以有若干个Exchange和Queue

同一个Virtual host里面不能有相同名称的Exchange和Queue
