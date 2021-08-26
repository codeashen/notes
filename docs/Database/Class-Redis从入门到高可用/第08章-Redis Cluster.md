# 一、呼唤集群

1. 并发量：单机 redis 可以承受 10 万的 QPS，如果并发量超过该数值，需要分布式集群
2. 数据量：数据量超过单机承载能力时，需要分布式集群
3. 网络流量：分担网卡压力，需要分布式集群

为了上述需求，redis 3.0 提供了 redis cluster 功能。

# 二、数据分布

## 2.1 数据分区方式

![image-20210608180609901](https://z3.ax1x.com/2021/06/08/2r2Gss.png)

分布式数据库需要数据分区，分区要使用一定的规则，例如有顺序分区和哈希分区。

![image-20210608180746018](https://z3.ax1x.com/2021/06/08/2r2sy9.png)

| 分布方式 |                                特点                                 |                        典型产品                        |
| :------: | :-----------------------------------------------------------------: | :----------------------------------------------------: |
| 哈希分区 | 数据分散度高<br/>键值分布业务无关<br/>无法顺序访问<br/>支持批量操作 | 一致性哈希 Memcache<br/>Redis Cluster<br/>其他缓存产品 |
| 顺序分区 |  数据分散度易倾斜<br/>键值业务相关<br/>可顺序访问<br/>支持批量操作  |                   GigTable<br/>Hbase                   |

哈希分区的几种方案：

- 节点取余分区
- 一致性哈希分区
- 虚拟槽分区（redis cluster 采用方式）

## 2.2 节点取余分区

节点取余分区：`hash(key) % nodes`，但是添加节点后，数据分区需要偏移，影响很多数据。

![image-20210608181708138](https://z3.ax1x.com/2021/06/08/2rfzlD.png)

- 客户端分片：哈希 + 取余
- 节点伸缩：数据节点关系变化，导致数据迁移
- 迁移数量和添加节点数量有关：建议翻倍扩容

## 2.3 一致性哈希分区

![image-20210608182231911](https://z3.ax1x.com/2021/06/08/2r4ZU1.png)

- 客户端分片：哈希 + 顺时针（优化取余）
- 节点伸缩：只影响邻近节点，但是还是有数据迁移
- 翻倍伸缩：保证最小迁移数据和负载均衡

例如在 node1 和 node2 之间插入节点 node5，则只影响 node2上 的数据，别的节点数据不受影响。

![image-20210608182704133](https://z3.ax1x.com/2021/06/08/2r5SZd.png)

## 2.4 虚拟槽分区

- 预设虚拟槽：每个槽映射一个数据子集，一般比节点数大
- 良好的哈希函数：例如 CRC16
- 服务端管理节点、槽、数据：例如 Redis Cluster

![image-20210608182858454](https://z3.ax1x.com/2021/06/08/2r5ceH.png)

数据 key 经过 hash 之后，对节点槽上限取余，结果落到哪个槽，数据就在对应的节点上

# 三、搭建集群

## 3.1 基本架构

### 单体架构

![image-20210609100322478](https://z3.ax1x.com/2021/06/09/2yFfiR.png)

- 一个 redis 实例负责读写
- 客户端连接这个单点

### 分布式架构

![image-20210609102927474](https://z3.ax1x.com/2021/06/09/2yeISA.png)

- 服务端有很多个节点，每个节点都负责去读也负责去写
- 节点之间是彼此通信的，内部使用 Gossip 协议

### Redis Cluster架构

- 节点：集群中的 redis 节点
- meet：节点之间通信操作
- 指派槽：每个节点都指派对应的槽，用来判断数据是否在该节点指派槽内
- 复制：为了保证高可用，每个主节点都有一个从节点（内部监控不依赖于 sentinel）

**(1) 节点**

![image-20210609103135805](https://z3.ax1x.com/2021/06/09/2ym6pj.png)

在 redis cluster 中有一个配置 `cluster-enabled: yes`，配置为 yes 表示以集群模式启动

**(2) meet**

![image-20210609103155317](https://z3.ax1x.com/2021/06/09/2ym2Xq.png)

节点之间通过 meet 操作，互相交换信息。在此基础上，知道哪些节点负责哪些槽。

![image-20210609103224950](https://z3.ax1x.com/2021/06/09/2ymfBV.png)

所有节点共享信息。

**(3) 指派槽**

如图，假设现在 redis cluster 总共有 16384 个槽，为了达到负载均衡的效果，为每个节点指派指定的槽。当命令的 key 到达某节点后，会根据 `hash(key) % 16384` 的计算结果，判断数据是否落在自己的指派槽范围内。如果在就返回结果，不在的话返回对应的节点，因为每个节点都知道每个节点个指派槽的关系。

![image-20210609103310911](https://z3.ax1x.com/2021/06/09/2ymINF.png)

对于客户端来说，只需要计算一个key，算出其对应的槽。

![image-20210609103439215](https://z3.ax1x.com/2021/06/09/2ymzND.png)

**(4) 复制**

Redis Cluster 特性

- 复制：集群是有主从复制的，每个主节点都有一个从节点
- 高可用：每个主节点故障，从节点都可以晋升，从而实现高可用
- 分片：数据是分片的，由多个主节点进行读写

## 3.3 搭建集群（原生命令安装）

1. 配置开启节点：加入 redis cluster 配置

   节点配置

   ![image-20210609114029307](https://z3.ax1x.com/2021/06/09/2yDrUU.png)

   > 主要配置说明：
   >
   > ```
   > cluster-enabled yes                # 集群模式启动
   > cluster-node-timeout 15000         # 节点超时时间（毫秒）
   > cluster-config-file "nodes.conf"   # 集群节点的配置
   > cluster-require-full-coverage yes  # 集群是否需要要求所有节点都正常，一般配置no
   > ```

   启动多个节点

   ```bash
   redis-server redis-7000.conf 
   redis-server redis-7001.conf 
   redis-server redis-7002.conf 
   redis-server redis-7003.conf 
   redis-server redis-7004.conf 
   redis-server redis-7005.conf
   ```

2. meet 操作：实现节点间的通信

   执行 meet 命令，`cluster meet ip port`，让节点之间建立通信关系

   ```bash
   redis-cli -h 127.0.0.1 -p 7000 cluster meet 127.0.0.1 7001 
   redis-cli -h 127.0.0.1 -p 7000 cluster meet 127.0.0.1 7002 
   redis-cli -h 127.0.0.1 -p 7000 cluster meet 127.0.0.1 7003 
   redis-cli -h 127.0.0.1 -p 7000 cluster meet 127.0.0.1 7004 
   redis-cli -h 127.0.0.1 -p 7000 cluster meet 127.0.0.1 7005
   ```

   上述命令，在 7000 端口的节点 meet 了 7001~7005 节点，根据 Gossip 协议，他们会互相交换信息，从而互相全部连通。

3. 分配指派槽：确定数据访问关系

   通过以下命令分配槽，`cluster addslots slot [slot...]`

   ```bash
   redis-cli -h 127.0.0.1 -p 7000 cluster addslots {0..5461} 
   redis-cli -h 127.0.0.1 -p 7001 cluster addslots {5462..10922} 
   redis-cli -h 127.0.0.1 -p 7002 cluster addslots {10923...16383}
   ```

   > 分配槽命令是一个一个分配的，可以使用 shell 帮助分配，以下脚本 addslots.sh
   >
   > ```shell
   > start=$1   # 参数1：起始槽
   > end=$2     # 参数2：终止槽
   > port=$3    # 参数2：端口
   > 
   > # 循环将槽分配给指定端口的 redis 节点
   > for slot in `seq ${start} ${end}`
   > do
   >     echo "slot:${slot}"
   >     redis-cli -p ${port} cluster addslots ${slot}
   > done
   > ```
   >
   >执行脚本，给 7000、7001、7002 节点分配槽
   >
   > ```bash
   > sh addslots.sh 0 5461 7000
   > sh addslots.sh 5462 10922 7001
   > sh addslots.sh 10923 16383 7002
   > ```

4. 设置主从：有主从关系才能实现故障的自动转移

   通过以下命令，设置集群主从关系，`cluster replicate node-id`

   ```bash
   redis-cli -h 127.0.0.1 -p 7003 cluster replicate ${node-id-7000} 
   redis-cli -h 127.0.0.1 -p 7004 cluster replicate ${node-id-7001} 
   redis-cli -h 127.0.0.1 -p 7005 cluster replicate ${node-id-7002}
   ```

   上述命令中，让 7003 去复制 7000，让 7004 去复制 7001，让 7005 去复制 7002

下面介绍一些集群命令

- `cluster nodes`：查看集群节点信息
- `cluster info`：查看集群信息
- `cluster solts`：查看集群槽的分配情况

## 3.4 搭建集群（官方工具 redis-trib）

原生安装方式很麻烦，生产环境一般不使用。官方提供了 ruby 的安装脚本，相比原生安装方式方便很多。

### ruby 环境准备

```bash
# 下载 ruby
wget https://cache.ruby-lang.org/pub/ruby/2.3/ruby-2.3.1.tar.gz

# 安装 ruby 
tar-xvf ruby-2.3.1.tar.gz 
./configure -prefix=/usr/local/ruby 
make 
make install 
cd /usr/local/ruby 
cp bin/ruby /usr/local/bin
cp bin/gem /usr/local/bin

# 安装 rubygem redis
wget http://rubygems.org/downloads/redis-3.3.0.gem 
gem install -l redis-3.3.0.gem 
gem list --check redis gem

# 安装 redis-trib.rb
cp ${REDIS_HOME}/src/redis-trib.rb /usr/local/bin
```

### 搭建集群

1. 启动节点

   ```bash
   redis-server redis-8000.conf 
   redis-server redis-8001.conf 
   redis-server redis-8002.conf 
   redis-server redis-8003.conf 
   redis-server redis-8004.conf 
   redis-server redis-8005.conf
   ```

2. 一键搭建集群

   ```bash
   # 1 表示主节点的从节点个数，前三个 {ip:port} 表示主节点，后三个表示对应的从节点
   ./redis-trib.rb create --replicas 1 127.0.0.1:8000 127.0.0.1:8001 127.0.0.1:8002 127.0.0.1:8003 127.0.0.1:8004 127.0.0.1:8005
   ```

   > ruby 脚本命令解释：[redis-trib.rb命令详解](https://www.cnblogs.com/ivictor/p/9768010.html)

## 3.5 总结

1. 原生命令安装
   - 理解 Redis Cluster 架构。
   - 生产环境不使用。
2. 官方工具安装
   - 高效、准确。
   - 生产环境可以使用。
3. 其他
   - 可视化部署

# 四、集群伸缩

## 4.1 伸缩原理

![image-20210609153637202](https://z3.ax1x.com/2021/06/09/26DIk8.png)

集群伸缩就是有节点加入集群或从集群中下线。

**集群伸缩 = 槽和数据在节点之间的移动**，如下图，是一个扩容集群的示意图

![image-20210609153716625](https://z3.ax1x.com/2021/06/09/26rDun.png)

## 4.2 扩容集群

扩容集群的步骤：

1. 准备新节点
2. 加入集群
3. 迁移槽和数据

### 准备新节点

新节点特点：

- 集群模式
- 配置和其他节点统一
- 启动后是孤儿节点

```bash
redis-server conf/redis-6385.conf 
redis-server conf/redis-6386.conf
```

![image-20210609154049422](https://z3.ax1x.com/2021/06/09/26s324.png)

### 加入集群

```bash
127.0.0.1:6379> cluster meet 127.0.0.1 6385 
127.0.0.1:6379> cluster meet 127.0.0.1 6386
```

![image-20210609154226931](https://z3.ax1x.com/2021/06/09/26yVJO.png)

加入集群的作用：

- 为它迁移槽和数据实现 *扩容*
- 作为从节点负责 *故障转移*

以上的原生 redis cluster 方式加入集群，下面是 redis-trib.rb 方式加入集群：

```bash
redis-trib.rb add-node new_host:new_port existing_host:existing_port --slave --master-id <arg> 
redis-trib.rb add-node 127.0.0.1:6385 127.0.0.1:6379 
# 建议使用 redis-trib.rb 能够避免新节点已经加入了其他集群，造成故障。
```

### 迁移槽和数据

步骤：

1. 槽迁移计划

   ![image-20210609155228536](https://z3.ax1x.com/2021/06/09/262zrQ.png)

2. 迁移数据

   迁移数据步骤：

   ![image-20210609155955050](https://z3.ax1x.com/2021/06/09/26WU6U.png)

   1. 对目标节点发送：`cluster setslot {slot} importing {sourceNodeld}` 命令，让目标节点准备导入槽的数据。
   2. 对源节点发送：`cluster setslot {slot} migrating {targetNodeld}` 命令，让源节点准备迁出槽的数据。
   3. 源节点循环执行 `cluster getkeysinslot {slot} {count}` 命令，每次获取 count 个属于槽的健。
   4. 在源节点上执行 `migrate {targetIp} {targetPort} key 0 {timeout}` 命令把指定 key 迁移。
   5. 重复执行步骤 3~4 直到槽下所有的键数据迁移到目标节点。
   6. 向集群内所有主节点发送 `cluster setslot {slot} node {targetNodeld}` 命令，通知槽分配给目标节点。

   迁移数据伪代码：

   ![image-20210609160749006](https://z3.ax1x.com/2021/06/09/26hJMT.png)

   redis 提供了 `pipeline migrate` 来批量迁移数据，此外还有 redis-trib.rb 方式。

3. 添加从节点

## 4.3 缩容集群

缩容集群对应以下步骤：

1. 下线迁移槽
2. 忘记节点
3. 关闭节点

![image-20210609161947570](https://z3.ax1x.com/2021/06/09/26o2ct.png)

### 下线槽

![image-20210609162058403](https://z3.ax1x.com/2021/06/09/26TVHO.png)

### 忘记节点

```
redis-cli> cluster forget {downNodeId}
```

![image-20210609162148714](https://z3.ax1x.com/2021/06/09/26TGb8.png)

如果需要忘记一个节点，需要对集群中其他的所有节点执行忘记命令，否则经过后效时间后，集群节点间的通信还会重新扩散该节点信息。

# 五、客户端路由

Redis Cluster 的客户端使用不同于单机和 sentinel 模式，需要使用其他的方式进行连接。

## 5.1 moved重定向

moved 重定向发生在命令 key 和连接的节点槽不匹配时。

下图表示客户端向集群发送命令过程，其中第 4 步重定向发送命令需要客户端自己编码实现。

![image-20210609163150290](https://z3.ax1x.com/2021/06/09/26bGb6.png)

槽命中：直接返回

![image-20210609163320828](https://z3.ax1x.com/2021/06/09/26bhxs.png)

槽不命中：moved 异常

![image-20210609164449354](https://z3.ax1x.com/2021/06/09/26OVbt.png)

演示：

![image-20210609164608186](https://z3.ax1x.com/2021/06/09/26OtaV.png)

第一次 redis 客户端连接添加了 `-c` 参数，表示集群方式连接，可以槽不匹配时会自动重定向；第二次没有以集群方式连接，槽不匹配会抛出 moved 异常。

## 5.2 ask重定向

如果集群发生了扩容或缩容，源节点的 solt 迁移到目标节点，此过程中访问就会有问题。Redis Cluster 考虑到这个问题，有 ask 重定向。

![image-20210609165650494](https://z3.ax1x.com/2021/06/09/26joUP.png)

ask 重定向过程：

![image-20210609170208014](https://z3.ax1x.com/2021/06/09/26xCdI.png)

moved重定向和ask重定向：

- 两者都是客户单重定向
- moved：槽已经确定迁移
- ask：槽还在迁移中

两者都对客户端提出了挑战，命令和槽的匹配性，重定向过程会有性能问题。

## 5.3 smart 客户端

### smart 客户端原理

smart客户端的目标是追求性能

1. 从集群中选一个可运行节点，使用 cluster slots 初始化槽和节点映射。
2. 将 cluster slots 的结果映射到本地，为每个节点创建 JedisPool。
3. 准备执行命令。

执行命令简单流程如下

![image-20210609171939509](https://z3.ax1x.com/2021/06/09/2cScdA.png)

### smart 客户端使用：JedisCluster

**简单使用：**

```java
// 定义集群节点集合
Set<HostAndPort> nodeList = new HashSet<HostAndPort>(); 
nodeList.add(new HostAndPort(HOST1, PORT1)); 
nodeList.add(new HostAndPort(HOST2, PORT2)); 
nodeList.add(new HostAndPort(HOST3, PORT3));
nodeList.add(new HostAndPort(HOST4, PORT4)); 
nodeList.add(new HostAndPort(HOST5, PORT5)); 
nodeList.add(new HostAndPort(HOST6, PORT6)); 
// 创建 JedisCluster 对象
JedisCluster redisCluster = new JedisCluster(nodeList, timeout, poolConfig); 
// 执行命令
redisCluster.command...
```

**使用技巧：**

1. 单例：内置了所有节点的连接池
2. 无需手动借还连接池
3. 合理设置 commons-pool

**多节点命令实现：**

有些命令需要跨节点，比如 scan

```java
// 获取所有节点的 JeidsPool 
Map<String, JedisPool> jedisPoolMap = jedisCluster.getClusterNodes(); 
for (Entry<String, JedisPool> entry : jedisPoolMap.entrySet()) { 
    // 获取每个节点的 Jedis 连接 
    Jedis jedis = entry.getValue().getResource(); 
    // 只删除主节点数据 
    if(!isMaster(jedis)) { 
        continue; 
    }
    // finally close
}
```

**批量操作优化：**

使用 jedisCluster 完成批量操作，必须保证 mget、mset 的 key 在一个槽内，该条件非常苛刻。批量操作，有以下四种方案：

- 串行 mget 

  串行执行单个命令

  ![image-20210609174044483](https://z3.ax1x.com/2021/06/09/2ciZ4A.png)

- 串行 IO 

  先把 key 在客户端进行分组，相同节点上槽的 key 分成一组，然后逐组 pipeline 请求集群中的节点

  ![image-20210609174206883](https://z3.ax1x.com/2021/06/09/2ci0DU.png)

- 并行 IO

  并行 IO 就是在串行 IO 的基础上，key 分组后多线程并行请求后端节点

  ![image-20210609174614185](https://z3.ax1x.com/2021/06/09/2cFSaQ.png)

- hash_tag

  将所有的 key 进行 tag 包装，让所有的 key 都落在一个节点，以后 mget 就只需要请求一个节点

  ![image-20210609174735252](https://z3.ax1x.com/2021/06/09/2cFnIJ.png)

| 方案      | 优点                                   | 缺点                                              | 网络IO            |
| --------- | -------------------------------------- | ------------------------------------------------- | ----------------- |
| 串行 mget | 编程简单<br />少量keys满足需求         | 大量 keys 请求延迟严重                            | O(keys)           |
| 串行 IO   | 编程简单<br />少量节点满足需求         | 大量 node 时延迟严重                              | O(nodes)          |
| 并行 IO   | 利用并行特性<br />延迟取决于最慢的节点 | 编程复杂<br />超时定位问题难                      | O(max_slow(node)) |
| hash_tag  | 性能最高                               | 读写增加 tag 维护成本<br />tag 分布易出现数据倾斜 | O(1)              |

# 六、故障转移

Redis Cluster 中并没有使用 Sentinel 进行监控，因为 Redis Cluster 自身实现了高可用，如果当前节点故障，其他节点可以监控到，实现故障转移。

## 6.1 故障发现

Redis Cluster 中故障发现原理：

- 通过节点间的 ping/pong 消息实现故障发现：不需要 sentinel
- 也分为主观下线和客观下线

### 主观下线

定义：某个节点认为另一个节点不可用，“偏见”

主观下线流程：

![image-20210609175847985](https://z3.ax1x.com/2021/06/09/2cA22n.png)

### 客观下线

定义：当半数以上持有槽的主节点都标记某节点主观下线

客观下线逻辑流程：

![image-20210609180039669](https://z3.ax1x.com/2021/06/09/2cECPH.png)

尝试客观下线流程：

![image-20210609180307754](https://z3.ax1x.com/2021/06/09/2cEGLV.png)

客观下线后，进行以下两个工作

- 通知集群内所有节点标记故障节点为客观下线
- 通知故障节点的从节点触发故障转移流程

## 6.2 故障恢复

客观下线后通知到从节点，从节点就会准备开始做故障恢复，从而保证整个集群的高可用。其中包含以下 4 个过程：

1. 资格检查
2. 准备选举时间
3. 选举投票
4. 替换主节点

### 资格检查

- 每个从节点检查与故障主节点的断线时间。
- 超过 `cluster-node-timeout * cluster-slave-validity-factor` 的计算结果，取消资格。
- `cluster-slave-validity-factor`：默认是 10

### 准备选举时间

当从节点符合故障转移的资格之后，需要更新触发故障选举的时间，只有达到该时间才会触发后续的流程。这一步是为了保证偏移量大的从节点有更小的延迟，从而达到所谓的选举时间。其实是为了保证数据一致性更高，因为此时主节点故障，只有偏移量最大的从节点数据数据更完整，设置更短的选举时间，让它更快的参与选举。

![image-20210609181022697](https://z3.ax1x.com/2021/06/09/2cVRBV.png)

### 选举投票

从节点达到选举时间后，会让主节点对该从节点进行投票。先进入选举的节点更容易得到更多的票数，当票数超过主节点个数的 `1/2 + 1` 票后，该节点可以替换主节点。

![image-20210609181606375](https://z3.ax1x.com/2021/06/09/2cZIVf.png)

### 替换主节点

1. 当前从节点取消复制变为主节点。（`slaveof no one`）
2. 执行 `clusterDelSlot` 撤销故障主节点负责的槽，并执行 `clusterAddSlot` 把这些槽分配给自己。
3. 向集群广播自己的 pong 消息，表明已经替换了故障从节点。

# 七、开发运维常见问题

## 7.1 集群完整性

- `cluster-require-full-coverage` 默认为 yes

  - 集群中 16384 个槽全部可用：保证集群完整性

  - 节点故障或者正在故障转移：

    `(error) CLUSTERDOWN The cluster is down`

- 大多数业务无法容忍，`cluster-require-full-coverage` 建议设置为 no

> `cluster-require-full-coverage` 如果设置为 yes，只有集群中所有节点都是在线状态，所有 16384 个槽都是成功分配的状态，才认为集群是完整的，集群才会对外提供服务。

## 7.2 带宽消耗

Redis Cluster 节点之间会定期交换信息以及心跳检测。节点见进行 ping/pong 消息，官方建议集群节点个数不要超过 1000 个，否则会带来不容忽视的带宽消耗。

![image-20210609183541474](https://z3.ax1x.com/2021/06/09/2cny5T.png)

带宽消耗体现在以下三个方面：

- 消息发送频率：节点发现与其它节点最后通信时间超过 `cluster-node-timeout / 2` 时会直接发送 ping 消息
- 消息数据量：slots 槽数组（2KB 空间）和整个集群 1/10 的状态数据（10 个节点状态数据约 1KB)
- 节点部署的机器规模：集群分布的机器越多且每台机器划分的节点数越均匀，则集群内整体的可用带宽越高。

优化：

- 避免“大”集群：避免多业务使用一个集群，大业务可以多集群。
- cluster-node-timeout：带宽和故障转移速度的均衡。
- 尽量均匀分配到多机器上：保证高可用和带宽

## 7.3 Pub/Sub 广播

集群中任意一个节点发布消息，消息会在集群中进行传播，即其他节点都会订阅到该消息，增加了带宽消耗。

![image-20210609184414156](https://z3.ax1x.com/2021/06/09/2cuGLR.png)

问题：publish 在集群每个节点广播：加重带宽

解决：如果需要发布订阅，单独“走”一套 Redis Sentinel

## 7.4 数据倾斜

### 数据倾斜：内存不均

![image-20210609190118320](https://z3.ax1x.com/2021/06/09/2cMhrj.png)

造成数据倾斜的一些原因：

1. 节点和槽分配不均
   - `redis-trib.rb info ip:port`：查看节点、槽、键值分布 
   - `redis-trib.rb rebalance ip:port`：进行均衡操作（谨慎使用）
2. 不同槽对应键值数量差异较大
   - CRC16 正常情况下比较均匀
   - 可能存在 hash_tag
   - `cluster countkeysinslot {slot}`：获取槽对应键值个数
3. 包含 bigkey
   - bigkey：例如大字符串、几百万的元素的 hash、set 等
   - 从节点执行：`redis-cli --bigkeys`
   - 优化：优化数据结构
4. 内存相关配置不一致
   - `hash-max-ziplist-value`、`set-max-intset-entries` 等配置

### 请求倾斜：热点数据

热点 key：重要的 key 或者 bigkey

优化：

- 避免 bigkey
- 热键不要用 hash_tag
- 当一致性不高时，可以用本地缓存 + MQ

## 7.5 读写分离

只读连接：集群模式的从节点不接受任何读写请求。

- 重定向到负责槽的主节点
- readonly 命令可以读：连接级别命令（只在本次连接内有效）

Redis Cluster 的读写分离实现更加复杂

- 同样的问题：复制延迟、读取过期数据、从节点故障
- 修改客户端：cluster slaves {nodeld}
- 集群模式下不建议读写分离，可以扩大集群规模

## 7.6 数据迁移

官方迁移工具：redis-trib.rb import

- 只能从单机迁移到集群
- 不支持在线迁移：source 需要停写
- 不支持断点续传
- 单线程迁移：影响速度

有一些第三方的工具支持在线迁移数据：

- 唯品会：redis-migrate-tool 
- 豌豆荚：redis-port

## 7.7 集群 vs 单机

集群有以下限制：

- key 批量操作支持有限：例如 mget、mset 必须在一个 slot
- Key 事务和 Lua 支持有限：操作的 key 必须在一个节点
- key 是数据分区的最小粒度：不支持 bigkey 分区
- 不支持多个数据库：集群模式下只有一个 db 0
- 复制只支持一层：不支持树形复制结构

思考：分布式 Redis 不一定好

1. Redis Cluster：满足容量和性能的扩展性，很多业务“不需要”
   - 大多数时客户端性能会“降低”
   - 命令无法跨节点使用：mget、keys、scan、flush、sinter等
   - Lua 和事务无法跨节点使用
   - 客户端维护更复杂：SDK 和应用本身消耗（例如更多的连接池）
2. 很多场景 Redis Sentinel 已经足够好

# 八、总结

- Redis cluster 数据分区规则采用虚拟槽方式（16384 个槽），每个节点负责一部分槽和相关数据，实现数据和请求的负载均衡。
- 搭建集群划分四个步骤：准备节点、节点握手、分配槽、复制。
  `redis-trib.rb` 工具用于快速搭建集群。
- 集群伸缩通过在节点之间移动槽和相关数据实现。
  - 扩容时根据槽迁移计划把槽从源节点迁移到新节点。
  - 收缩时如果下线的节点有负责的槽需要迁移到其它节点，再通过 `cluster forget` 命令让集群内所有节点忘记被下线节点。
- 使用 smart 客户端操作集群达到通信效率最大化，客户端内部负责计算维护 `键 -> 槽 -> 节点` 的映射，用于快速定位到目标节点。
- 集群自动故障转移过程分为故障发现和节点恢复。节点下线分为主观下线和客观下线，当超过半数主节点认为故障节点为主观下线时标记它为客观下线状态。从节点负责对客观下线的主节点触发故障恢复流程，保证集群的可用性。
- 开发运维常见问题包括：超大规模集群带宽消耗，pub/sub 广播问题，集群倾斜问题，单机和集群对比等。