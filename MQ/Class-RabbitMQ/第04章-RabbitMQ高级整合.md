## 4.1 RabbitMQ整合SpringAMQP

### 4.1.1 RabbitAdmin

```java
@Bean
public RabbitAdmin rabbitAdmin(ConnectionFactory connectionFactory) {
    RabbitAdmin rabbitAdmin = new RabbitAdmin(connectionFactory);
    rabbitAdmin.setAutoStartup(true); 
    return rabbitAdmin;
}
```

> 注意：**autoStartup必须设置为true**，否则Spring容器不会加载RabbitAdmin类

RabbitAdmin底层实现就是从Spring容器中获取Exchange、Banding、RoutingKey以及Queue的@Bean声明。然后使用RabbitTemplate的execute方法执行对应的声明、修改、删除等一系列rabbitMq基础功能操作。

例如：添加一个交换机、删除一个绑定、清空一个队列里的消息等

[示例代码](rabbitmq-spring/src/test/java/com/lucifer/spring/RabbitmqSpringApplicationTests.java) #testAdmin方法

### 4.1.2 SpringAMQP RabbitMQ声明式配置

在RabbitMQ基础API中声明Exchange、Queue、Binding，通过Channel创建

```java
channel.exchangeDeclare(exchangeName, "topic", true, false, null);
channel.queueDeclare(queueName, true, false, false, null);
channel.queueBind(queueName, exchangeName, routingKey);
```

使用SpringAMQP去生命，就需要使用SpringAMQP的如下模式，即声明@Bean方式，由Spring容器创建

```java
// 配置交换机
@Bean
public TopicExchange exchange001() {
    return new TopicExchange("topic001", true, false);
}
// 配置队列
@Bean
public Queue queue001() {
    return new Queue("queue001", true);
}
// 配置绑定
@Bean
public Binding binding001() {
    return BindingBuilder.bind(queue001()).to(exchange001()).with("spring.*");
}
```

[示例代码](rabbitmq-spring/src/main/java/com/lucifer/spring/RabbitMQConfig.java) SpringAMQP RabbitMQ声明式配置

### 4.1.3 SpringAMQP消息模板组件 RabbitTemplate

**RabbitTemplate，即消息模板**，我们在与SpringAMQP整合的时候进行发送消息的关键类

该类提供了丰富的发送消息的方法，包括可靠性投递消息方法、回调监听消息接口ConfirmCallback、返回值确认接口ReturnCallBack等等，只需要注入到Spring容器中，然后直接使用。

在于Spring整合的时候需要实例化，但是在于SpringBoot整合时，在配置文件里添加配置即可。

```java
// Spring配置 RabbitTemplate
    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        return rabbitTemplate;
    }
```

发送消息 [示例代码](rabbitmq-spring/src/test/java/com/lucifer/spring/RabbitmqSpringApplicationTests.java) 各种send方法

### 4.1.4 SpringAMQP消息容器 SimpleMessageListenerContainer

**简单消息监听容器**，我们可以对他进行很多的设置，对于消费者的配置项，这个类都可以满足。

* 监听队列（多个队列）、自动启动、自动声明功能

* 设置事务特性、事务管理器、事务特性、事务容器（并发）、是否开启事务、回滚消息等

* 设置消息确认和自动确认模式、是否重回队列、异常捕获handler函数

* 设置消费者标签生成策略、是否独占模式、消费者属性等

* 设置具体的监听器、消息转换器等

[示例代码](rabbitmq-spring/src/main/java/com/lucifer/spring/RabbitMQConfig.java) #messageContainer方法

> 注意：SimpleMessageListenerContainer可以进行动态设置，比如在运行中的应用可以动态修改其消费者数量的大小、接收消息的模式等
>
>很多基于RabbitMQ的子定制化后端管控台在进行动态设置的时候，也是根据这一特性进行设置。
>
>思考：SimpleMessageListenerContainer为什么能动态感知配置变更？

### 4.1.5 SpringAMQP消息监听适配器 MessageListenerAdapter

另一种设置监听器的方式

```java
SimpleMessageListenerContainer container = new SimpleMessageListenerContainer(connectionFactory);
// 省略container各项配置...
MessageListenerAdapter adapter = new MessageListenerAdapter(new MessageDelegate());  // 传入消息委派对象
// 省略adapter各项配置...
container.setMessageListener(adapter);
```

通过MessageListenerAdapter的代码我们可以看出如下核心属性：

* defaultListenerMethod 默认监听方法名称：用于设置监听方法名称

* Delegate 委派对象：实际真实的委托对象，用于处理消息

* queueOrTagMethodName 队列标识与方法名称组成的映射：
    可以一一进行队列与方法名称的匹配，队列和方法名称绑定，即指定队列里的消息会被绑定的方法所接受处理

[示例代码](rabbitmq-spring/src/main/java/com/lucifer/spring/RabbitMQConfig.java) #messageContainer方法中使用适配器设置监听器部分

### 4.1.6 SpringAMQP消息转换器 MessageConverter

我们在消息发送的时候，正常情况下消息体为二进制的数据方式进行传输，我们希望内部帮我们进行转换，或者指定自定义的转换器，就需要用到MessageConverter

**使用方式**

1. 自定义常用转换器：MessageConverter，一般来讲都需要实现这个接口

2. 重写下面两个方法：
    ```
    toMessage   : Java对象转换为Message
    fromMessage : Message对象转换为Java对象
    ```

**具体实现**

* Json转换器：Jackson2JsonMessageConverter，可以进行java对象的转换功能

* DefaultJackson2JavaTypeMapper映射器：可以进行java对象的映射关系

* 自定义二进制转换器：比如图片类型、pdf、ppt、流媒体

**示例代码:**

[自定义转换器](rabbitmq-spring/src/main/java/com/lucifer/spring/convert)

[配置转换器](rabbitmq-spring/src/main/java/com/lucifer/spring/RabbitMQConfig.java) #messageContainer配置转换器部分

[测试方法](rabbitmq-spring/src/test/java/com/lucifer/spring/RabbitmqSpringApplicationTests.java)

## 4.2 RabbitMQ整合Spring Boot

### 4.2.1 消息生产者

publisher-confirms，实现一个监听器用于监听Broker端给我们返回的确认请求：RabbitTemplate.ConfirmCallBack

publisher-returns，保证消息对Broker端是可达的，如果出现路由键不可达的情况，则使用监听器对不可达消息进行后续处理，保证消息的路由成功：RabbitTemplate.ReturnCallBack

> 注意一点，在发送消息的时候对template进行配置mandatory=true保证监听有效
>
> 生产端还可以配置其他属性。比如发送重试，超时时间、次数、间隔等

**步骤**

1. 配置文件 [application.properties](rabbitmq-springboot-producer/src/main/resources/application.properties)

2. 消息发送方 [RabbitSender](rabbitmq-springboot-producer/src/main/java/com/lucifer/springboot/producer/RabbitSender.java)

3. 发送消息测试 [SendTest](rabbitmq-springboot-producer/src/test/java/com/lucifer/springboot/RabbitmqSpringbootProducerApplicationTests.java)

### 4.2.2 消息消费者

* 首先配置手动ack，这样可以保证消息的可靠性送达，或者在消费端消费失败的时候可以重回到队列，根据业务记录日志等处理

* 可以设置消费端的监听个数和最大监听个数，用于控制消费端的并发情况

* 消费端监听@RabbitListener注解，@RabbitListener是一个组合注解，里面可以注解配置@QueueBinding、@Queue、@Exchange直接通过这个组合注解一次性搞定消费端交换机、队列、绑定、路由、并配置监听功能等

**代码**（可以配合上面的生产者测试）

1. 配置文件 [application.properties](rabbitmq-springboot-consumer/src/main/resources/application.properties)

2. 消息消费者 [RabbitReceiver](rabbitmq-springboot-consumer/src/main/java/com/lucifer/springboot/consumer/RabbitReceiver.java)

## 4.3 RabbitMQ整合Spring Cloud Stream

**Spring Cloud Stream 整体架构核心概念图：**

下图所示，对于中间的应用，消息的接收和发送可以使用不同的消息中间件

![image-20200928104508977](https://s3.ax1x.com/2020/11/24/DYOsE9.png)

如下图，Spring Cloud Stream 在核心应用和MQ中间加入绑定层，作为一个协调者的角色，通过其代理实现消息的通信

![](https://s3.ax1x.com/2020/11/24/DYOq8P.png)

Spring Cloud Stream 在生产端消费端管道前都加了一层插件（下图绿色部分），插件可以用于接受各种不同的消息，并且支持消息中间件的替换（如可将中间的RabbitMQ替换成Kafka）

![image-20200928104956167](https://s3.ax1x.com/2020/11/24/DYOyNR.png)

Barista接口：Barista接口是定义来作为后面类的参数，这一接口定义消息通道类型和通道名称，通道的名称是作为配置用，通道类型则决定了app会使用这一通道进行发送消息还是从中接收消息

> @Output：输出注解，用于定义发送消息接口
>
> @Input：输入注解，用于定义消息的消费者接口
> 
> @StreamListener：用于定义监听方法的注解

使用Spring Cloud Stream 非常简单，只需要使用好这三个注解即可，在实现高性能消息生产和消费场景非常适用，但是使用Spring Cloud Stream框架有一个非常大的问题就是不能实现消息的可靠性投递，也就是没办法保证消息100%的可靠性，会存在少量的消息丢失问题。

这个原因是因为Spring Cloud Stream框架为了兼顾Kafka，所以在实际中作中使用它的目的就是针对高性能的消息通信，这点就是当前版本Spring Cloud Stream的定位。
