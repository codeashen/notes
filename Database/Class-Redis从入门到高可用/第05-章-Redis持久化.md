# 一、持久化的作用

redis所有数据保持在内存中，对数据的更新将异步地保存到磁盘上。

主流数据库的持久化方式：

| 持久化方式 | 说明                                                         | 数据库                                  |
| ---------- | ------------------------------------------------------------ | --------------------------------------- |
| 快照       | 数据库某时刻的完整备份                                       | MySQL Dump<br>Redis RDB                 |
| 写日志     | 将数据库的变化操作记录在日志中，可以重放日志中的操作恢复数据 | MySQL Binlog<br>Hbase HLog<br>Redis AOF |

Redis持久化有RDB和AOF两种策略

# 二、RDB

## 2.1 RDB介绍

![image-20210603174625696](https://z3.ax1x.com/2021/06/03/23al1f.png)

- Redis在某一时刻记录此时内存中完整数据的一个快照，保存在RDB文件中
- 在启动重新载入RDB文件，就可以恢复数据到内存中
- RDB文件也是主从复制的一个媒介

## 2.2 RDB触发的三种方式 

### save（同步）

redis客户端发送save命令，服务端就会执行rdb操作。

![image-20210603180124647](https://z3.ax1x.com/2021/06/03/23BMVg.png)

save命令是一个同步命令，会等带服务端操作完成返回，在此之前服务端不能响应客户端的其他命令。

![image-20210603180525847](https://z3.ax1x.com/2021/06/03/23DPyV.png)

save命令的文件策略：如果有老的rdb文件，save命令会生成一个临时rdb文件（此时有两个rdb文件），然后覆盖掉老的rdb文件。

时间复杂度：O(n)

### bgsave（异步）

redis客户端发送bgsave命令，服务端收到命令后直接返回"Background saving started"。然后在redis服务端中，会fork出一个子进程，在子进程中至今rdb操作，操作完成后告知主进程成功。

bgsave是异步的，所以执行bgsave操作时服务端可以正常响应客户端的其他命令。bgsave的文件策略和时间复杂度同save。

![image-20210603180735447](https://z3.ax1x.com/2021/06/03/23DYYd.png)

save和bgsave对比：

| 命令   | save             | bgsave              |
| ------ | ---------------- | ------------------- |
| IO类型 | 同步             | 异步                  |
| 阻塞?  | 是               | 是（阻塞发生在fork)    |
| 复杂度 | O(n)             | o(n)                 |
| 优点   | 不会消耗额外内存   | 不阻塞客户端命令        |
| 缺点   | 阻塞客户端命令     | 需要fork,消耗内存      |

### 自动

不需要客户端操作，根据配置自动执行rdb操作。

![image-20210603182632417](https://z3.ax1x.com/2021/06/03/23sxFe.png)

rdb相关配置

```
# 自动rdb配置
save 900 1      #每900秒有1个key改变
save 300 10     #每300秒有10个key改变
save 60 10000   #每60秒有10000个key改变

dbfilename dump.rdb               #指定rbd文件的名称
dir ./                            #工作目录，rdb、aof、日志文件存在此目录
stop-writes-on-bgsave-error yes   #如果bgsave发生错误是否停止写入
rdbcompression yes                #rdb文件是否采用压缩的格式
rdbchecksum yes                   #是否对rdb文件进行校验和检验
```

rdb配置最佳实践

```
#### 不开启自动保存 ####

#由于redis单线程，通常一台机器上启动好几个redis实例，可以根据端口号区分rdb文件属于哪个实例
dbfilename dump-${port}.rdb

#自定义工作目录
dir /bigdiskpath

stop-writes-on-bgsave-error yes
rdbcompression yes
rdbchecksum yes
```

## 2.3 rdb触发机制

- 全量复制：主从复制的时候会生成rdb文件
- debug reload：redis提供debug级别的重启，会生成rdb文件
- shutdown：执行`shutdown save`会生成rdb文件

# 三、AOF

## 3.1 AOF介绍

RDB持久化的问题：

- 耗时耗性能：

  ![image-20210604145455351](https://z3.ax1x.com/2021/06/04/2GXHXR.png)

- 不可控，丢失数据：

  ![image-20210604145708231](https://z3.ax1x.com/2021/06/04/2GjwuR.png)



为了解决上述问题RDB的问题，redis还提供了AOF持久化方式。如下图所示，redis写命令都会记录到aof都会追加到aof文件中，重启redis后加载aof文件，恢复数据。

![image-20210604150016150](https://z3.ax1x.com/2021/06/04/2GvAM9.png)

## 3.2 AOF的三种策略

- always：每一条命令都刷到aof文件中
- everysec（默认）：每秒把缓冲区中的命令刷到aof文件中
- no：由操作系统决定何时将缓冲区中命令刷到aof文件中

![image-20210604151348099](https://z3.ax1x.com/2021/06/04/2JS7es.png)

![image-20210604151506860](https://z3.ax1x.com/2021/06/04/2JpUmj.png)

![image-20210604151642397](https://z3.ax1x.com/2021/06/04/2Jpx4P.png)

三种策略对比：

| 命令     | 优点                   | 缺点                                |
| -------- | ---------------------- | ----------------------------------- |
| always   | 不丢失数据             | IO开销较大，一般的sata盘只有几百TPS |
| everysec | 每秒一次fsync丢1秒数据 | 丢1秒数据                           |
| no       | 不用管                 | 不可控                              |

## 3.3 AOF重写

### AOF重写介绍

aof文件记录redis的写入命令，随着写入命令越来越多，aof文件将越来越大。为了解决这个问题，redis提供了aof重写机制。

aof重写会将写入命令中重复的、无效的、过时的等命令进行优化，使生成的aof文件很小。

![image-20210604155011373](https://z3.ax1x.com/2021/06/04/2JnvLt.png)

### aof重写的优点

- 减少硬盘占用量
- 加速恢复速度

### aof重写实现的两种方式

1. bgrewriteaof 命令：类似于bgsave，fork出子进程异步进行aof重写
2. AOF重写配置

**bgrewriteaof 命令**

![image-20210604160539972](https://z3.ax1x.com/2021/06/04/2JMrZt.png)

**AOF 重写配置**

| 配置名                      | 含义                                                         |
| --------------------------- | ------------------------------------------------------------ |
| auto-aof-rewrite-min-size   | AOF文件重写需要的尺寸（即当AOF文件超过多大时开始重写）       |
| auto-aof-rewrite-percentage | AOF文件增长率（比如配置100，这次200M重写了，下次就是400M重写） |

redis中还有两个统计数据

- aof_current_size：AOF当前尺寸（单位：字节）
- aof_base_size：AOF上次启动和重写的尺寸（单位：字节）

当同时满足以下条件时，自动触发aof重写

- `aof_current_size > auto-aof-rewrite-min-size `
- `(aof_current_size - aof_base_size) / aof_base_size > auto-aof-rewrite-percentage`

AOF重写流程：

![image-20210604162310804](https://z3.ax1x.com/2021/06/04/2J351U.png)

1. 无论是执行 bgrewriteaof 命令还是自动触发，AOF重写最终本质都会执行 bgrewriteaof 操作
2. 主进程会fork出一个子进程，来执行aof操作
3. aof_buf 记录了现有的内存数据，将这些数据更新到旧的aof文件中（内存回溯）
4. aof_rewrite_buf 记录了重写期间的写命令，会记录在一个新的aof文件中，最后合并到旧aof文件中

## 3.4 AOF相关配置

```
appendonly yes                           #是否开启aof
appendfilename "appendonly-${port}.aof"  #aof文件名
appendfsync everysec                     #aof刷盘策略
dir/bigdiskpath                          #工作目录
no-appendfsync-on-rewrite yes            #aof重写的时候不记录aof命令（是否可以容忍重写期间丢数据）
auto-aof-rewrite-percentage 100          #aof重写增长率
auto-aof-rewrite-min-size 64mb           #aof重写尺寸
aof-load-truncated yes                   #是否加载被截断的aof文件（例如刷入aof文件途中宕机了）
```

# 四、RDB和AOF选择

**RDB和AOF对比**

| 命令 | RDB | AOF |
| --- | --- | --- |
| 启动优先级 | 低 | 高 |
| 体积 | 小 | 大 |
| 恢复速度 | 快 | 慢 |
| 数据安全性 | 丢数据 | 根据策略决定 |
| 轻重 | 重 | 轻 |

**RDB最佳策略**

- ”关“
- 集中管理
- 主从，从开？

**AOF最佳策略**

- “开”：缓存和存储
- AOF重写集中管理
- everysec

**最佳策略**

- 小分片
- 缓存或者存储
- 监控（硬盘、内存、负载、网络）
- 足够的内存





















