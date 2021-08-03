# 一、Redis特性

Redis是一个开源的基于键值的存储服务系统，支持多种数据结构，性能非常高，功能丰富。

- 速度快
- 持久化
- 多种数据机构
- 支持多种语言（协议简单，支持TCP）
- 功能丰富
- 简单（代码短小精悍，使用简单）
- 主从复制

**特性一：速度快**

官方称可达到 10W QPS

- 存储介质：内存
- 实现语言：C语言
- 线程模型：单线程（内存读写速度非常快，使用单线程就能达到很高的性能，避免多线程造成的性能瓶颈）

![image-20210527175348363](https://z3.ax1x.com/2021/05/27/2Pvdde.png)

最主要的原因：数据存在内存

**特性二：持久化**

Redis所有数据保持在内存中，对数据的更新将异步地保存到磁盘上。

**特性三：多种数据结构**

五种基本数据结构：String、Linked List、Set、Sorted Set、Hash Table

![image-20210527175718385](https://z3.ax1x.com/2021/05/27/2Pvozq.png)

新支持的数据结构：

- BitMaps：位图（可以用于实现布隆过滤器）
- HyperLogLog：超小内存唯一值计数
- GEO：地理信息定位

**特性四：支持多种语言**

**特性五：功能丰富**

- 发布订阅
- Lua脚本
- 事务
- Pipeline

**特性六：简单**

- 单机核心代码只有23000行
- 不依赖于外部库
- 单线程模型

**特性七：主从复制**

![image-20210527180830960](https://z3.ax1x.com/2021/05/27/2PzEuV.png)

**特性八：高可用、分布式**

- 高可用：Redis-Sentinel（v2.4之后）
- 分布式：Redis-Cluster（v3.0之后）

# 二、Redis典型适用场景

1. 缓存系统

  ![image-20210527184124224](https://z3.ax1x.com/2021/05/27/2iC7l9.png)

2. 计数器：适用Redis提供的incr、decr，可以在单线程下高效计数

  ![image-20210527184312463](https://z3.ax1x.com/2021/05/27/2iCzfe.png)

3. 消息队列系统：Redis提供发布订阅功能，可以用于一些简单的消息队列功能

4. 排行榜：适用Redis的有序集合实现

5. 社交网络：Redis跟社交网络很多功能吻合，如粉丝数、关注数、共同关注、时间轴列表等

6. 实时系统：布隆过滤器等

# 三、Redis安装和启动

## 3.1 Redis安装

```shell
# 下载安装
> wget http://download.redis.io/releases/redis-3.0.7.tar.gz
> tar -zxvf redis-3.0.7.tar.gz
# 建立软连接（可选）
> ln -s redis-3.0.7 redis
# 编译
> cd redis && make
# 安装
> make install
```

可执行文件说明

- redis-server：Redis服务器
- redis-cli：Redis命令行客户端
- redis-batchmark：Redis性能测试工具
- redis-check-aof：AOF文件修复工具
- redis-check-dump：RDB文件修复工具
- redis-sentinel：Sentinel服务器

## 3.2 Redis三种启动方式

**方式一：默认方式启动**

```shell
# 启动redis
> redis-server

# 验证
## 查看进程
> ps -ef | grep redis
## 查看端口是否处于监听
> netstat -antpl | grep redis
## 用客户端验证
> redis-cli -h ip -p port ping
```

**方式二：指定参数启动**

```bash
> redis-server --port 6380
```

**方式三：配置文件启动**

```bash
> redis-server <configPath>
```

三种方式比较

- 生成环境选择配置文件启动
- 单机多实例配置文件可以用端口区分开

Redis客户端连接：

```shell
redis-cli -h ip -p port
```

## 3.3 Redis常用配置

- daemonize：是否以守护进程启动（no|yes）（默认no，建议yes）
- port：Redis对外端口号
- logfile：Redis系统日志
- dir：Redis工作目录

