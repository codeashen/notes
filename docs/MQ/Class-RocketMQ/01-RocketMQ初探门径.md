# 一、RocketMQ整体介绍

- RocketMQ 是一款分布式、队列模型的消息中间件
- 支持集群模型、负载均衡、水平扩展能力
- 亿级别的消息堆积能力
- 采用零拷贝的原理、顺序写盘、随机读
- 丰富的API使用（同步消息、异步消息、顺序消息、延迟消息、事务消息）
- 代码优秀，底层通信框架采用Netty NIO框架
- NameServer 代替 Zookeper
- 强调集群无单点，可扩展，任意一点高可用，水平可扩展
- 消息失败重试机制、消息可查询
- 开源社区活跃、成熟度（经过双十一考验）

# 二、RocketMQ概念模型

* **Producer：**消息生产者，负责生产消息，一般由业务系统负责产生消息。
* **Consumer：**消息消费者，负责消费消息，一般是由后台系统负责异步消费。
* **Push Consumer：**Consumer的一种，需要向Consumer对象注册监听。
* **Pull Consumer：**Consumer的以中，需要主动请求Broker拉去消息。
* **Producer Group：**生产者集合，一般用于发送一类消息。
* **Consumer Group：**消费者集合，一般用于接受一类消息进行消费。
* **Broker：**MQ消息服务（中转角色，用于消息存储与生产消息转发）。

参考官方文档：[基本概念](https://github.com/apache/rocketmq/blob/master/docs/cn/concept.md)

# 三、RocketMQ源码包结构

- rocketmq-broker：主要的业务逻辑，消息收发，主从同步，pagecache
- rocketmq-client：客户端接口，比如生产者和消费者
- rocketmq-example：示例，比如生产者和消费者
- rocketmq-common：公用数据结构等等 
- rocketmq-distribution：编译模块，编译输出等
- rocketmq-fliter：进行Broker过滤的不感兴趣的消息传输，减小带宽压力
- rocketmq-logappender、rocketmq-logging：日志相关
- rocketmq-namesrv：Namesrv服务，用于服务协调
- rocketmq-openmessaging：对外提供服务
- rocketmq-remoting：远程调用接口，封装Netty底层通信
-  rocketmq-srvutil：提供一些公用的工具方法，比如解析命令行参数
- rocketmq-store：消息存储
- rocketmq-test、rocketmq-example：测试、示例
- rocketmq-tools：管理工具，比如有名的mqadmin工具

# 四、RocketMQ环境搭建

## 4.1 RocketMQ单节点搭建

RocketMQ天然支持集群，这里我们使用单点为例，演示搭建过程

1. hosts添加信息

   ```bash
   vi /etc/hosts
   
   # 配置以下信息
   192.168.36.123 rocketmq-nameserver1
   196.168.36.123 rocketmq-master1
   ```

2. 上传解压

   地址：

   ```bash
   # 上传 apache-rocketmq.tar.gz 文件至/usr/local
   tar -zxvf apache-rocketmq.tar.gz -C /usr/local
   # 建立软连接
   ln -s apache-rocketmq rocketmq
   ll /usr/local
   ```

3. 创建存储路径

   ```bash
   mkdir /usr/local/rocketmq/store
   mkdir /usr/local/rocketmq/store/commitlog
   mkdir /usr/local/rocketmq/store/consumequeue
   mkdir /usr/local/rocketmq/store/index
   ```

4. RocketMQ配置文件

   配置文件在 `${rocketmq_home}/conf` 下，有不同集群模式的配置，我们复制一个，在此基础上修改

   ```bash
   cd /usr/local/rocketmq/conf
   cp -r 2m-2s-async/ test-conf/
   vim test-conf/broker-a.properties
   ```

   使用以下配置

   ```properties
   #所属集群名字
   brokerClusterName=rocketmq-cluster
   #broker 名字，注意此处不同的配置文件填写的不一样
   brokerName=broker-a
   #0 表示 Master，>0 表示 Slave
   brokerId=0
   #nameServer 地址，分号分割
   namesrvAddr=rocketmq-nameserver1:9876
   #在发送消息时，自动创建服务器不存在的 topic，默认创建的队列数
   defaultTopicQueueNums=4
   #是否允许 Broker 自动创建 Topic，建议线下开启，线上关闭
   autoCreateTopicEnable=true
   #是否允许 Broker 自动创建订阅组，建议线下开启，线上关闭
   autoCreateSubscriptionGroup=true
   #Broker 对外服务的监听端口
   listenPort=10911
   #删除文件时间点，默认凌晨 4 点
   deleteWhen=04
   #文件保留时间，默认 48 小时
   fileReservedTime=120
   #commitLog 每个文件的大小默认 1G
   mapedFileSizeCommitLog=1073741824
   #ConsumeQueue 每个文件默认存 30W 条，根据业务情况调整
   mapedFileSizeConsumeQueue=300000
   #destroyMapedFileIntervalForcibly=120000
   #redeleteHangedFileInterval=120000
   #检测物理文件磁盘空间
   diskMaxUsedSpaceRatio=88
   #存储路径
   storePathRootDir=/usr/local/rocketmq/store
   #commitLog 存储路径
   storePathCommitLog=/usr/local/rocketmq/store/commitlog
   #消费队列存储路径存储路径
   storePathConsumeQueue=/usr/local/rocketmq/store/consumequeue
   #消息索引存储路径
   storePathIndex=/usr/local/rocketmq/store/index
   #checkpoint 文件存储路径
   storeCheckpoint=/usr/local/rocketmq/store/checkpoint
   #abort 文件存储路径
   abortFile=/usr/local/rocketmq/store/abort
   #限制的消息大小
   maxMessageSize=65536
   
   #flushCommitLogLeastPages=4
   #flushConsumeQueueLeastPages=2
   #flushCommitLogThoroughInterval=10000
   #flushConsumeQueueThoroughInterval=60000
   
   #Broker 的角色
   #- ASYNC_MASTER 异步复制 Master
   #- SYNC_MASTER 同步双写 Master
   #- SLAVE
   brokerRole=ASYNC_MASTER
   #刷盘方式
   #- ASYNC_FLUSH 异步刷盘
   #- SYNC_FLUSH 同步刷盘
   flushDiskType=ASYNC_FLUSH
   #checkTransactionMessageEnable=false
   #发消息线程池数量
   #sendMessageThreadPoolNums=128
   #拉消息线程池数量
   #pullMessageThreadPoolNums=128
   ```

5. 修改日志配置文件

   ```bash
   mkdir -p /usr/local/rocketmq/logs
   cd /usr/local/rocketmq/conf && sed -i 's#${user.home}#/usr/local/rocketmq#g' *.xml
   ```

6. 修改启动脚本参数

   RocketMQ对内存要求较高，启动脚本配置的JVM内存很大，这里修改一下

   ```bash
   # 修改broker启动配置
   vim /usr/local/rocketmq/bin/runbroker.sh
   ```

   > 修改配置：JAVA_OPT="${JAVA_OPT} -server **-Xms1g -Xmx1g -Xmn512m** -XX:PermSize=128m - XX:MaxPermSize=320m"

   ```bash
   # 修改nameserver启动配置
   vim /usr/local/rocketmq/bin/runserver.sh
   ```

   > 修改配置：JAVA_OPT="${JAVA_OPT} -server **-Xms1g -Xmx1g -Xmn512m** -XX:PermSize=128m - XX:MaxPermSize=320m"

7. 启动 NameServer 和 Broker

   ```bash
   cd /usr/local/rocketmq/bin
   # 先启动 NameServer
   nohup sh mqnamesrv &
   # 再启动 broker，指定配置文件，以及输出
   nohup sh mqbroker -c /usr/local/rocketmq/conf/test-conf/broker-a.properties >/dev/null 2>&1 &
   
   # jps命令查看java进程，验证
   jps
   ```

8. 关闭进程和数据清理

   ```bash
   cd /usr/local/rocketmq/bin
   sh mqshutdown broker
   sh mqshutdown namesrv
   # --等待停止
   rm -rf /usr/local/rocketmq/store
   mkdir /usr/local/rocketmq/store
   mkdir /usr/local/rocketmq/store/commitlog
   mkdir /usr/local/rocketmq/store/consumequeue
   mkdir /usr/local/rocketmq/store/index
   # --按照上面步骤重启 NameServer 与 BrokerServer
   ```

## 4.2 RocketMQ控制台

官方提供的RocketMQ控制台，是一个SpringBoot项目，github地址：[rocketmq-externals](https://github.com/apache/rocketmq-externals)

打包其中的 **rocketmq-console** 模块，`mvn clean package -Dmaven.test.skip=true`，在运行jar包即可