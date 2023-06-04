(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{358:function(a,t,s){"use strict";s.r(t);var n=s(4),e=Object(n.a)({},(function(){var a=this,t=a._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"一、rabbitmq-整合-springamqp"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#一、rabbitmq-整合-springamqp"}},[a._v("#")]),a._v(" 一、RabbitMQ 整合 SpringAMQP")]),a._v(" "),t("h2",{attrs:{id:"_1-1-rabbitadmin"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-rabbitadmin"}},[a._v("#")]),a._v(" 1.1 RabbitAdmin")]),a._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@Bean")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("RabbitAdmin")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("rabbitAdmin")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("ConnectionFactory")]),a._v(" connectionFactory"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("RabbitAdmin")]),a._v(" rabbitAdmin "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("new")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("RabbitAdmin")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("connectionFactory"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n    rabbitAdmin"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("setAutoStartup")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("true")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v(" \n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("return")]),a._v(" rabbitAdmin"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br"),t("span",{staticClass:"line-number"},[a._v("4")]),t("br"),t("span",{staticClass:"line-number"},[a._v("5")]),t("br"),t("span",{staticClass:"line-number"},[a._v("6")]),t("br")])]),t("blockquote",[t("p",[a._v("注意："),t("strong",[a._v("autoStartup 必须设置为 true")]),a._v("，否则 Spring 容器不会加载 RabbitAdmin 类")])]),a._v(" "),t("p",[a._v("RabbitAdmin 底层实现就是从 Spring 容器中获取 Exchange、Banding、RoutingKey 以及 Queue 的 @Bean 声明。然后使用 RabbitTemplate 的 execute 方法执行对应的声明、修改、删除等一系列 rabbitMq 基础功能操作。")]),a._v(" "),t("p",[a._v("例如：添加一个交换机、删除一个绑定、清空一个队列里的消息等")]),a._v(" "),t("p",[t("a",{attrs:{href:"rabbitmq-spring/src/test/java/com/lucifer/spring/RabbitmqSpringApplicationTests.java"}},[a._v("示例代码")]),a._v(" #testAdmin方法")]),a._v(" "),t("h2",{attrs:{id:"_1-2-springamqp-rabbitmq-声明式配置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-springamqp-rabbitmq-声明式配置"}},[a._v("#")]),a._v(" 1.2 SpringAMQP RabbitMQ 声明式配置")]),a._v(" "),t("p",[a._v("在 RabbitMQ 基础 API 中声明 Exchange、Queue、Binding，通过 Channel 创建")]),a._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[a._v("channel"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("exchangeDeclare")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("exchangeName"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"topic"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("true")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("false")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("null")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\nchannel"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("queueDeclare")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("queueName"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("true")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("false")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("false")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("null")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\nchannel"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("queueBind")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("queueName"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" exchangeName"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" routingKey"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br")])]),t("p",[a._v("使用 SpringAMQP 去生命，就需要使用 SpringAMQP 的如下模式，即声明 @Bean 方式，由 Spring 容器创建")]),a._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 配置交换机")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@Bean")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("TopicExchange")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("exchange001")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("return")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("new")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("TopicExchange")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"topic001"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("true")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("false")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 配置队列")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@Bean")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Queue")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("queue001")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("return")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("new")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Queue")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"queue001"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("true")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 配置绑定")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@Bean")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Binding")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("binding001")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("return")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("BindingBuilder")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("bind")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("queue001")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("to")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("exchange001")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("with")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"spring.*"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br"),t("span",{staticClass:"line-number"},[a._v("4")]),t("br"),t("span",{staticClass:"line-number"},[a._v("5")]),t("br"),t("span",{staticClass:"line-number"},[a._v("6")]),t("br"),t("span",{staticClass:"line-number"},[a._v("7")]),t("br"),t("span",{staticClass:"line-number"},[a._v("8")]),t("br"),t("span",{staticClass:"line-number"},[a._v("9")]),t("br"),t("span",{staticClass:"line-number"},[a._v("10")]),t("br"),t("span",{staticClass:"line-number"},[a._v("11")]),t("br"),t("span",{staticClass:"line-number"},[a._v("12")]),t("br"),t("span",{staticClass:"line-number"},[a._v("13")]),t("br"),t("span",{staticClass:"line-number"},[a._v("14")]),t("br"),t("span",{staticClass:"line-number"},[a._v("15")]),t("br")])]),t("p",[t("a",{attrs:{href:"rabbitmq-spring/src/main/java/com/lucifer/spring/RabbitMQConfig.java"}},[a._v("示例代码")]),a._v(" SpringAMQP RabbitMQ 声明式配置")]),a._v(" "),t("h2",{attrs:{id:"_1-3-springamqp-消息模板组件-rabbittemplate"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-springamqp-消息模板组件-rabbittemplate"}},[a._v("#")]),a._v(" 1.3 SpringAMQP 消息模板组件 RabbitTemplate")]),a._v(" "),t("p",[t("strong",[a._v("RabbitTemplate，即消息模板")]),a._v("，我们在与 SpringAMQP 整合的时候进行发送消息的关键类")]),a._v(" "),t("p",[a._v("该类提供了丰富的发送消息的方法，包括可靠性投递消息方法、回调监听消息接口 ConfirmCallback、返回值确认接口 ReturnCallBack 等等，只需要注入到 Spring 容器中，然后直接使用。")]),a._v(" "),t("p",[a._v("在于 Spring 整合的时候需要实例化，但是在于 SpringBoot 整合时，在配置文件里添加配置即可。")]),a._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// Spring配置 RabbitTemplate")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@Bean")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("RabbitTemplate")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("rabbitTemplate")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("ConnectionFactory")]),a._v(" connectionFactory"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n        "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("RabbitTemplate")]),a._v(" rabbitTemplate "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("new")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("RabbitTemplate")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("connectionFactory"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n        "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("return")]),a._v(" rabbitTemplate"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br"),t("span",{staticClass:"line-number"},[a._v("4")]),t("br"),t("span",{staticClass:"line-number"},[a._v("5")]),t("br"),t("span",{staticClass:"line-number"},[a._v("6")]),t("br")])]),t("p",[a._v("发送消息 "),t("a",{attrs:{href:"rabbitmq-spring/src/test/java/com/lucifer/spring/RabbitmqSpringApplicationTests.java"}},[a._v("示例代码")]),a._v(" 各种 send 方法")]),a._v(" "),t("h2",{attrs:{id:"_1-4-springamqp-消息容器-simplemessagelistenercontainer"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-4-springamqp-消息容器-simplemessagelistenercontainer"}},[a._v("#")]),a._v(" 1.4 SpringAMQP 消息容器 SimpleMessageListenerContainer")]),a._v(" "),t("p",[t("strong",[a._v("简单消息监听容器")]),a._v("，我们可以对他进行很多的设置，对于消费者的配置项，这个类都可以满足。")]),a._v(" "),t("ul",[t("li",[t("p",[a._v("监听队列（多个队列）、自动启动、自动声明功能")])]),a._v(" "),t("li",[t("p",[a._v("设置事务特性、事务管理器、事务特性、事务容器（并发）、是否开启事务、回滚消息等")])]),a._v(" "),t("li",[t("p",[a._v("设置消息确认和自动确认模式、是否重回队列、异常捕获 handler 函数")])]),a._v(" "),t("li",[t("p",[a._v("设置消费者标签生成策略、是否独占模式、消费者属性等")])]),a._v(" "),t("li",[t("p",[a._v("设置具体的监听器、消息转换器等")])])]),a._v(" "),t("p",[t("a",{attrs:{href:"rabbitmq-spring/src/main/java/com/lucifer/spring/RabbitMQConfig.java"}},[a._v("示例代码")]),a._v(" #messageContainer 方法")]),a._v(" "),t("blockquote",[t("p",[a._v("注意：SimpleMessageListenerContainer 可以进行动态设置，比如在运行中的应用可以动态修改其消费者数量的大小、接收消息的模式等")]),a._v(" "),t("p",[a._v("很多基于 RabbitMQ 的子定制化后端管控台在进行动态设置的时候，也是根据这一特性进行设置。")]),a._v(" "),t("p",[a._v("思考：SimpleMessageListenerContainer 为什么能动态感知配置变更？")])]),a._v(" "),t("h2",{attrs:{id:"_1-5-springamqp-消息监听适配器-messagelisteneradapter"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-5-springamqp-消息监听适配器-messagelisteneradapter"}},[a._v("#")]),a._v(" 1.5 SpringAMQP 消息监听适配器 MessageListenerAdapter")]),a._v(" "),t("p",[a._v("另一种设置监听器的方式")]),a._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("SimpleMessageListenerContainer")]),a._v(" container "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("new")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("SimpleMessageListenerContainer")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("connectionFactory"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 省略container各项配置...")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("MessageListenerAdapter")]),a._v(" adapter "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("new")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("MessageListenerAdapter")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("new")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("MessageDelegate")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("  "),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 传入消息委派对象")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 省略adapter各项配置...")]),a._v("\ncontainer"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("setMessageListener")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("adapter"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br"),t("span",{staticClass:"line-number"},[a._v("4")]),t("br"),t("span",{staticClass:"line-number"},[a._v("5")]),t("br")])]),t("p",[a._v("通过 MessageListenerAdapter 的代码我们可以看出如下核心属性：")]),a._v(" "),t("ul",[t("li",[t("p",[a._v("defaultListenerMethod 默认监听方法名称：用于设置监听方法名称")])]),a._v(" "),t("li",[t("p",[a._v("Delegate 委派对象：实际真实的委托对象，用于处理消息")])]),a._v(" "),t("li",[t("p",[a._v("queueOrTagMethodName 队列标识与方法名称组成的映射：\n可以一一进行队列与方法名称的匹配，队列和方法名称绑定，即指定队列里的消息会被绑定的方法所接受处理")])])]),a._v(" "),t("p",[t("a",{attrs:{href:"rabbitmq-spring/src/main/java/com/lucifer/spring/RabbitMQConfig.java"}},[a._v("示例代码")]),a._v(" #messageContainer 方法中使用适配器设置监听器部分")]),a._v(" "),t("h2",{attrs:{id:"_1-6-springamqp-消息转换器-messageconverter"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-6-springamqp-消息转换器-messageconverter"}},[a._v("#")]),a._v(" 1.6 SpringAMQP 消息转换器 MessageConverter")]),a._v(" "),t("p",[a._v("我们在消息发送的时候，正常情况下消息体为二进制的数据方式进行传输，我们希望内部帮我们进行转换，或者指定自定义的转换器，就需要用到 MessageConverter")]),a._v(" "),t("p",[t("strong",[a._v("使用方式")])]),a._v(" "),t("ol",[t("li",[t("p",[a._v("自定义常用转换器：MessageConverter，一般来讲都需要实现这个接口")])]),a._v(" "),t("li",[t("p",[a._v("重写下面两个方法：")]),a._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("toMessage   : Java对象转换为Message\nfromMessage : Message对象转换为Java对象\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br")])])])]),a._v(" "),t("p",[t("strong",[a._v("具体实现")])]),a._v(" "),t("ul",[t("li",[t("p",[a._v("Json 转换器：Jackson2JsonMessageConverter，可以进行 java 对象的转换功能")])]),a._v(" "),t("li",[t("p",[a._v("DefaultJackson2JavaTypeMapper 映射器：可以进行 java 对象的映射关系")])]),a._v(" "),t("li",[t("p",[a._v("自定义二进制转换器：比如图片类型、pdf、ppt、流媒体")])])]),a._v(" "),t("p",[t("strong",[a._v("示例代码:")])]),a._v(" "),t("p",[t("a",{attrs:{href:"rabbitmq-spring/src/main/java/com/lucifer/spring/convert"}},[a._v("自定义转换器")])]),a._v(" "),t("p",[t("a",{attrs:{href:"rabbitmq-spring/src/main/java/com/lucifer/spring/RabbitMQConfig.java"}},[a._v("配置转换器")]),a._v(" #messageContainer 配置转换器部分")]),a._v(" "),t("p",[t("a",{attrs:{href:"rabbitmq-spring/src/test/java/com/lucifer/spring/RabbitmqSpringApplicationTests.java"}},[a._v("测试方法")])]),a._v(" "),t("h1",{attrs:{id:"二、rabbitmq-整合-spring-boot"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#二、rabbitmq-整合-spring-boot"}},[a._v("#")]),a._v(" 二、RabbitMQ 整合 Spring Boot")]),a._v(" "),t("h2",{attrs:{id:"_2-1-消息生产者"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-消息生产者"}},[a._v("#")]),a._v(" 2.1 消息生产者")]),a._v(" "),t("p",[a._v("publisher-confirms，实现一个监听器用于监听 Broker 端给我们返回的确认请求：RabbitTemplate.ConfirmCallBack")]),a._v(" "),t("p",[a._v("publisher-returns，保证消息对 Broker 端是可达的，如果出现路由键不可达的情况，则使用监听器对不可达消息进行后续处理，保证消息的路由成功：RabbitTemplate.ReturnCallBack")]),a._v(" "),t("blockquote",[t("p",[a._v("注意一点，在发送消息的时候对 template 进行配置 mandatory=true 保证监听有效")]),a._v(" "),t("p",[a._v("生产端还可以配置其他属性。比如发送重试，超时时间、次数、间隔等")])]),a._v(" "),t("p",[t("strong",[a._v("步骤")])]),a._v(" "),t("ol",[t("li",[t("p",[a._v("配置文件 "),t("a",{attrs:{href:"rabbitmq-springboot-producer/src/main/resources/application.properties"}},[a._v("application.properties")])])]),a._v(" "),t("li",[t("p",[a._v("消息发送方 "),t("a",{attrs:{href:"rabbitmq-springboot-producer/src/main/java/com/lucifer/springboot/producer/RabbitSender.java"}},[a._v("RabbitSender")])])]),a._v(" "),t("li",[t("p",[a._v("发送消息测试 "),t("a",{attrs:{href:"rabbitmq-springboot-producer/src/test/java/com/lucifer/springboot/RabbitmqSpringbootProducerApplicationTests.java"}},[a._v("SendTest")])])])]),a._v(" "),t("h2",{attrs:{id:"_2-2-消息消费者"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-消息消费者"}},[a._v("#")]),a._v(" 2.2 消息消费者")]),a._v(" "),t("ul",[t("li",[t("p",[a._v("首先配置手动 ack，这样可以保证消息的可靠性送达，或者在消费端消费失败的时候可以重回到队列，根据业务记录日志等处理")])]),a._v(" "),t("li",[t("p",[a._v("可以设置消费端的监听个数和最大监听个数，用于控制消费端的并发情况")])]),a._v(" "),t("li",[t("p",[a._v("消费端监听 @RabbitListener 注解，@RabbitListener 是一个组合注解，里面可以注解配置 @QueueBinding、@Queue、@Exchange 直接通过这个组合注解一次性搞定消费端交换机、队列、绑定、路由、并配置监听功能等")])])]),a._v(" "),t("p",[t("strong",[a._v("代码")]),a._v("（可以配合上面的生产者测试）")]),a._v(" "),t("ol",[t("li",[t("p",[a._v("配置文件 "),t("a",{attrs:{href:"rabbitmq-springboot-consumer/src/main/resources/application.properties"}},[a._v("application.properties")])])]),a._v(" "),t("li",[t("p",[a._v("消息消费者 "),t("a",{attrs:{href:"rabbitmq-springboot-consumer/src/main/java/com/lucifer/springboot/consumer/RabbitReceiver.java"}},[a._v("RabbitReceiver")])])])]),a._v(" "),t("h1",{attrs:{id:"三、rabbitmq-整合-spring-cloud-stream"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#三、rabbitmq-整合-spring-cloud-stream"}},[a._v("#")]),a._v(" 三、RabbitMQ 整合 Spring Cloud Stream")]),a._v(" "),t("p",[t("strong",[a._v("Spring Cloud Stream 整体架构核心概念图：")])]),a._v(" "),t("p",[a._v("下图所示，对于中间的应用，消息的接收和发送可以使用不同的消息中间件")]),a._v(" "),t("p",[t("img",{attrs:{src:"https://s3.ax1x.com/2020/11/24/DYOsE9.png",alt:"image-20200928104508977"}})]),a._v(" "),t("p",[a._v("如下图，Spring Cloud Stream 在核心应用和MQ中间加入绑定层，作为一个协调者的角色，通过其代理实现消息的通信")]),a._v(" "),t("p",[t("img",{attrs:{src:"https://s3.ax1x.com/2020/11/24/DYOq8P.png",alt:""}})]),a._v(" "),t("p",[a._v("Spring Cloud Stream 在生产端消费端管道前都加了一层插件（下图绿色部分），插件可以用于接受各种不同的消息，并且支持消息中间件的替换（如可将中间的 RabbitMQ 替换成 Kafka）")]),a._v(" "),t("p",[t("img",{attrs:{src:"https://s3.ax1x.com/2020/11/24/DYOyNR.png",alt:"image-20200928104956167"}})]),a._v(" "),t("p",[a._v("Barista 接口：Barista 接口是定义来作为后面类的参数，这一接口定义消息通道类型和通道名称，通道的名称是作为配置用，通道类型则决定了 app 会使用这一通道进行发送消息还是从中接收消息")]),a._v(" "),t("blockquote",[t("p",[a._v("@Output：输出注解，用于定义发送消息接口")]),a._v(" "),t("p",[a._v("@Input：输入注解，用于定义消息的消费者接口")]),a._v(" "),t("p",[a._v("@StreamListener：用于定义监听方法的注解")])]),a._v(" "),t("p",[a._v("使用 Spring Cloud Stream 非常简单，只需要使用好这三个注解即可，在实现高性能消息生产和消费场景非常适用，但是使用 Spring Cloud Stream 框架有一个非常大的问题就是不能实现消息的可靠性投递，也就是没办法保证消息 100% 的可靠性，会存在少量的消息丢失问题。")]),a._v(" "),t("p",[a._v("这个原因是因为 Spring Cloud Stream 框架为了兼顾 Kafka，所以在实际中作中使用它的目的就是针对高性能的消息通信，这点就是当前版本 Spring Cloud Stream 的定位。")])])}),[],!1,null,null,null);t.default=e.exports}}]);