(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{359:function(a,s,t){"use strict";t.r(s);var r=t(4),e=Object(r.a)({},(function(){var a=this,s=a._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"一、rabbitmq集群架构模式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一、rabbitmq集群架构模式"}},[a._v("#")]),a._v(" 一、RabbitMQ集群架构模式")]),a._v(" "),s("h2",{attrs:{id:"_1-1-主备模式-warren"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-主备模式-warren"}},[a._v("#")]),a._v(" 1.1 主备模式（Warren）")]),a._v(" "),s("p",[a._v("**主备模式：**实现 RabbitMQ 的高可用集群，一般在并发和数据量不高的情况下，这种模式非常好用且简单。主备模式也称之为 Warren 模式。")]),a._v(" "),s("blockquote",[s("p",[a._v("注意：主备不同于主从。主备模式中，备份节点不提供任何服务，仅当主节点挂掉后，备份节点升级为主节点提供服务。")])]),a._v(" "),s("p",[s("strong",[a._v("主备模式架构模型：")])]),a._v(" "),s("p",[s("img",{attrs:{src:"https://s3.ax1x.com/2020/11/24/DYOg9x.png",alt:"image-20200929232448526"}})]),a._v(" "),s("p",[a._v("如上图，主备模式中，利用 HaProxy 实现主备切换。")]),a._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("# HaProxy 配置\nlisten rabbitmq_cluster\nbind 0.0.0.0:5672\nmode tcp    # 配置TCP模式\nbalance roundrobin  # 简单的轮询\nserver bhz76 192.168.11.76:5672 check inter 5000 rise 2 fall 2  # 主节点\nserver bhz77 192.168.11.77:5672 backup check inter 5000 rise 2 fall 2  # 备份节点\n\n# rabbitmq 集群节点配置\n# inter 每隔 5 秒对 mq 集群做健康检查，2 次证明服务器可用，3 次失败证明服务器不可用，并且配置主备机制\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br"),s("span",{staticClass:"line-number"},[a._v("5")]),s("br"),s("span",{staticClass:"line-number"},[a._v("6")]),s("br"),s("span",{staticClass:"line-number"},[a._v("7")]),s("br"),s("span",{staticClass:"line-number"},[a._v("8")]),s("br"),s("span",{staticClass:"line-number"},[a._v("9")]),s("br"),s("span",{staticClass:"line-number"},[a._v("10")]),s("br")])]),s("h2",{attrs:{id:"_1-2-远程模式-shovel"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-远程模式-shovel"}},[a._v("#")]),a._v(" 1.2 远程模式（Shovel）")]),a._v(" "),s("p",[a._v("**远程模式：**可以实现双活的一种模式，简称 Shovel 模式，所谓 Shovel 就是我们可以把消息进行不同数据中心的复制工作，我们可以让两个跨地域的 mq 集群互联。")]),a._v(" "),s("p",[s("strong",[a._v("远程模式架构模型：")])]),a._v(" "),s("p",[s("img",{attrs:{src:"https://s3.ax1x.com/2020/11/24/DYO236.png",alt:"image-20200929233717068"}})]),a._v(" "),s("p",[a._v("上图示例中，Goleta 市有大量订单生成，此处的 MQ 集群压力过大，可以将消息转到 Carpinteria 市的 MQ 中心进行消息处理。在使用 Shovel 插件后，模型变成了近端同步确认，远端异步确认的方式，大大提高了订单的确认速度，并且还能保证可靠性。")]),a._v(" "),s("p",[s("strong",[a._v("原理图：")])]),a._v(" "),s("p",[s("img",{attrs:{src:"https://s3.ax1x.com/2020/11/24/DYOWjO.png",alt:"image-20200929234547700"}})]),a._v(" "),s("p",[a._v("近端 MQ 有两个队列，warehouse_goleta 和 backup_orders，当 warehouse_goleta 消息过多时，将消息路由到 backup_ordre 队列，然后将其中的消息复制到远端 MQ 处理。")]),a._v(" "),s("p",[s("strong",[a._v("Shovel集群的配置:")])]),a._v(" "),s("ol",[s("li",[s("p",[a._v("首先启动 rabbitmq 插件，命令如下：")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("rabbitmq-plugins "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("enable")]),a._v(" amqp_client\nrabbitmq-plugins "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("enable")]),a._v(" rabbitmq_shovel\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br")])])]),a._v(" "),s("li",[s("p",[a._v("创建 rabbitmq.config 文件")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("touch")]),a._v(" /etc/rabbitmq/rabbitmq.config\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])])]),a._v(" "),s("li",[s("p",[a._v("添加配置")]),a._v(" "),s("p",[s("img",{attrs:{src:"https://s3.ax1x.com/2020/11/24/DYOhuD.png",alt:"image-20200929235256488"}})])]),a._v(" "),s("li",[s("p",[a._v("最后我们需要源服务器和目的地服务器都是用相同的配置文件（rabbitmq.config）")])])]),a._v(" "),s("h2",{attrs:{id:"_1-3-镜像模式-mirror"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-镜像模式-mirror"}},[a._v("#")]),a._v(" 1.3 镜像模式（Mirror）")]),a._v(" "),s("p",[a._v("**镜像模式：**集群模式非常经典的就是 Mirror 镜像模式。保证 100% 数据不丢失，在实际工作中用的也是最多的。并且实现集群非常简单，一般互联网大厂都会构建这种镜像集群模式。")]),a._v(" "),s("p",[a._v("Mirror 镜像队列，目的是为了保证 RabbitMQ 数据的高可靠性解决方案，主要就是实现数据的同步，一般来讲是 2-3 个节点实现数据同步（对于 100% 数据可靠性一般是 3 节点）。")]),a._v(" "),s("p",[s("strong",[a._v("集群架构：")])]),a._v(" "),s("p",[s("img",{attrs:{src:"https://s3.ax1x.com/2020/11/24/DYO4De.png",alt:"image-20200929235735708"}})]),a._v(" "),s("h2",{attrs:{id:"_1-4-多活模式-federation"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-4-多活模式-federation"}},[a._v("#")]),a._v(" 1.4 多活模式（Federation）")]),a._v(" "),s("p",[a._v("**多活模式：**这种模式也是实现异地数据复制的主流模式，因为 Shovel 模式配置比较复杂，所以一般来说实现异地集群模式都是使用这种双活或者多活模型来实现的。这种模型需要依赖 rabbitmq 的 federation 插件，可以实现持续可靠的 AMQP 数据通信，多活模式在实际配置与应用中非常简单。")]),a._v(" "),s("p",[a._v("RabbitMQ 部署架构采用双中心模式（多中心），那么在两套（多套）数据中心中各部署一套 RabbitMQ 集群，各中心的 RabbitMQ 服务除了需要为业务提供正常的服务外，中心之间还需要实现部分队列消息共享。")]),a._v(" "),s("p",[s("strong",[a._v("集群架构：")])]),a._v(" "),s("p",[s("img",{attrs:{src:"https://s3.ax1x.com/2020/11/24/DYO5HH.png",alt:"image-20200930000345937"}})]),a._v(" "),s("blockquote",[s("p",[a._v("Federation 插件是一个不需要构建在 Cluster，而在 Brokers 之间传输消息的高性能插件，Federation 插件可以在 Brokers 或者 Cluster 之间传输消息，连接的双方使用不同的 users 和 virtual hosts，双方也可以使用版本不同的 RabbitMQ 和 Erlang。Federation 插件使用 AMQP 协议通讯，可以接受不连续的传输。")])]),a._v(" "),s("p",[s("img",{attrs:{src:"https://s3.ax1x.com/2020/11/24/DYOoEd.png",alt:"image-20200930000831095"}})]),a._v(" "),s("p",[a._v("上官方图所示，Federation Exchanges，可以看成 Downstream 从 Upstream 主动拉取消息，但并不是拉取所有消息，必须是在 Downstream 上已经明确定义 Bindings 关系的 Exchange，也就是有实际的物理 Queue 来接收消息，才会从 Upstream 拉去消息到 Downstream。使用 AMQP 协议实施代理见通信，Downstream 会将绑定关系组合的在一起，绑定/解除绑定命令将发送到 Upstream 交换机，因此，Federation Exchange 只接收具有订阅的消息。")]),a._v(" "),s("h1",{attrs:{id:"二、rabbitmq集群恢复与故障转移"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#二、rabbitmq集群恢复与故障转移"}},[a._v("#")]),a._v(" 二、RabbitMQ集群恢复与故障转移")]),a._v(" "),s("p",[a._v("RabbitMQ 镜像队列集群的恢复的解决方案和应用场景：")]),a._v(" "),s("p",[a._v("前提：两个节点 A 和 B 组成一个镜像队列")]),a._v(" "),s("p",[a._v("场景1：A 先停，B 后停")])])}),[],!1,null,null,null);s.default=e.exports}}]);