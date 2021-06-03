# 一、通用命令和架构

## 1.1 通用命令

- `keys [pattern]`：遍历所有的key

  ```bash
  127.0.0.1:6379> mset hello world hehe haha php good phe his 
  OK 
  127.0.0.1:6379> keys he* 
  1)"hehe"
  2）"hello"
  127.0.0.1:6379> keys he[h-]* 
  1)"hehe"
  2)"hello"
  127.0.0.1:6379> keys ph?
  1)"phe"
  2)"php"
  ```

  keys 一般不再生产环境使用，O(n) 复杂度

  keys * 怎么用：

  - 热备从节点
  - scan

- `dbsize`：计算key的总数

  ```bash
  127.0.0.1:6379> mset k1 v1 k2 v2 k3 v3 k4 v4 
  OK 
  127.0.0.1:6379> dbsize 
  (integer) 4 
  127.0.0.1:6379> sadd myset a b c d e 
  (integer) 5 
  127.0.0.1:6379> dbsize 
  (integer) 5
  ```

  时间复杂度 O(1)，redis内部有计数器

- `exists <key>`：检查key是否存在

  ```bash
  127.0.0.1:6379> set a b 
  OK 
  127.0.0.1:6379>get a 
  "b"
  127.0.0.1:6379> del a 
  (integer) 1 
  127.0.0.1:6379> get a 
  (nil)
  ```

- `del [key ...]`：删除指定 key-value

  ```bash
  127.0.0.1:6379> set a b 
  OK 
  127.0.0.1:6379> get a 
  "b"
  127.0.0.1:6379> del a 
  (integer) 1 
  127.0.0.1:6379> get a 
  (nil)
  ```

- `expire key <seconds>`：设置key过期时间

  - `ttl <key>`：查看key剩余过期时间
  - `persist <key>`：取消过期时间

- `type <key>`：返回一个key的类型

  ```bash
  127.0.0.1:6379> set a b 
  OK 
  127.0.0.1:6379> type a 
  string
  127.0.0.1:6379> sadd myset 1 2 3 
  (integer) 3
  127.0.0.1:6379> type myset
  set
  ```

  type返回类型：string、hash、list、set、zset、none（不存在的key）

常见通用命令的时间复杂度：

| 命令   | 时间复杂度 |
| ------ | ---------- |
| keys   | O(n)       |
| dbsize | O(1)       |
| del    | O(1)       |
| exists | O(1)       |
| expire | O(1)       |
| type   | O(1)       |

## 1.2 数据结构和内部编码

![Redis数据结构和内部编码](https://z3.ax1x.com/2021/06/01/2mXSat.png)

Redis对外的五种数据类型，出于性能和空间的考虑，在其内部采用不同的数据结构来实现。用户只需要关心对外提供的数据类型的使用，不关心内部实现方式，面向接口的设计。

实际在Redis源码内部，有一个 **redisObject** 的结构体，来对外实现不同的数据类型，其内部结构如下图：

![image-20210601080813355](https://z3.ax1x.com/2021/06/01/2mXPG8.png)

## 1.3 单线程架构

Redis使用单线程串行执行命令

![Redis单线程](https://z3.ax1x.com/2021/06/01/2mXGL9.png)

单线程为什么这么快？

1. **纯内存**（主要原因）
2. 非阻塞IO
3. 避免线程切换和竞态消耗

![Redis非阻塞IO](https://z3.ax1x.com/2021/06/01/2mXai6.png)

单线程执行命令的特点：

1. 一次只执行一条命令

2. 拒绝长（慢）命令

   keys, flushall, flushdb, slow lua script, mutil/exec, operate big value(collection)

3. 其实不是单线程

   fsync file descriptor：持久化文件

   close file descriptor：关闭文件描述符

   上述文件操作都是单独线程来执行的

# 二、字符串类型

## 2.1 字符串键值结构

![image-20210601082610549](https://z3.ax1x.com/2021/06/01/2mj2nJ.png)

- 字符串key是字符串，value可以存字符串、数字、bits（二进制）、json字符串等
- 字符串value不能大于512MB

字符串应用场景有：缓存、计数器、分布式锁等

## 2.2 字符串命令

| API                        | 描述                                            | 时间复杂度 |
| -------------------------- | ----------------------------------------------- | ---------- |
| `get key`                  | 获取key对应的value                              | O(1)       |
| `set key value`            | 设置key-value                                   | O(1)       |
| `del key`                  | 删除key-value                                   | O(1)       |
| `incr key`                 | key自增1，如果key不存在，自增后get(key)=1       | O(1)       |
| `decr key`                 | key自减1，如果key不存在，自减后get(key)=-1      | O(1)       |
| `incrby key k`             | key自增k，如果key不存在，自增后get(key)=k       | O(1)       |
| `decrby key k`             | key自减k，如果key不存在，自减后get(key)=-k      | O(1)       |
| `setex key value`          | key不存在，才设置                               | O(1)       |
| `set key value xx`         | key存在，才设置                                 | O(1)       |
| `mget k1 k2 k3..`          | 批量获取key，原子操作                           | O(n)       |
| `mset k1 v1 k2 v2 k3 v3`   | 批量设置key-value                               | O(n)       |
| `getset key newValue`      | set key newValue并返回旧的value                 | O(1)       |
| `append key value`         | 将value追加到旧的value                          | O(1)       |
| `strlen key`               | 返回字符串的长度（注意中文）                    | O(1)       |
| `incrbyfloat key 3.5`      | 增加key对应的值3.5                              | O(1)       |
| `getrange key start end`   | 获取字符串指定下标所有的值（从0开始，包含首位） | O(1)       |
| `setrange key index value` | 设置指定下标所有对应的值                        | O(1)       |

# 三、哈希类型

## 3.1 哈希键值结构

![哈希键值结构](https://z3.ax1x.com/2021/06/01/2mvbGV.png)

## 3.2 哈希命令

| API                                         | 描述                                                     | 时间复杂度 |
| ------------------------------------------- | -------------------------------------------------------- | ---------- |
| `hget key field`                            | 获取hash key对应的field的value                           | O(1)       |
| `hset key field value`                      | 设置hash key对应field的value                             | O(1)       |
| `hdel key field`                            | 删除hash key对应field的value                             | O(1)       |
| `hexists key field`                         | 判断hash key是否有field                                  | O(1)       |
| `hlen key`                                  | 获取hash key field的数量                                 | O(1)       |
| `hmget key field1 field...fieldN`           | 批量获取hash key的一批field对应的值                      | O(n)       |
| `hmset key field1 v1 field2 v2...fieldN vN` | 批量设置hash key的一批field value                        | O(n)       |
| `hincrby key field k`                       | 指定key下field的值自增 k                                 | O(1)       |
| `hgetall key`                               | 返回hash key对应所有的field和value                       | O(n)       |
| `hvals key`                                 | 返回hash key对应所有field的value                         | O(n)       |
| `hkeys key`                                 | 返回hash key对应所有field                                | O(n)       |
| `hsetnx key field value`                    | 设置hash key对应field的value（如field已经存在，则 失败） | O(1)       |
| `hincrby key field intCounter`              | hash key对应的field的value自增intCounter                 | O(1)       |
| `hincrbyfloat key field floatCounter`       | hincrby浮点数版                                          | O(1)       |

# 四、列表类性

## 4.1 列表介绍

Redis中的列表，其实是linked list，链表

![image-20210603142646951](https://z3.ax1x.com/2021/06/03/216xp9.png)

![image-20210603142732407](https://z3.ax1x.com/2021/06/03/21ctcn.png)

列表有如下特点

- 有序的
- 可以重复
- 左右两边插入和弹出

## 4.2 列表API

| API                                        | 描述                                                         | 时间复杂度 |
| ------------------------------------------ | ------------------------------------------------------------ | ---------- |
| **增**                                     |                                                              |            |
| `rpush key v1 v2...vN`                     | 从列表右端插入值（1-N个）                                    | O(1~n)     |
| `lpush key v1 v2...vN`                     | 从列表左端插入值（1-N个）                                    | O(1~n)     |
| `linsert key before\|after value newValue` | 在list指定的值前/后插入newValue                              | O(n)       |
| **删**                                     |                                                              |            |
| `lpop key`                                 | 从列表左侧弹出一个item                                       | O(1)       |
| `rpop key`                                 | 从列表右侧弹出一个item                                       | O(1)       |
| `lrem key count value`                     | 根据count值，从列表中删除所有value相等的项<br>（1）count>0，从左到右，删除最多count个value相等的项<br/>（2）count<0，从右到左，删除最多Math.abs(count)个value相等的项<br/>（3）count=0，删除所有value相等的项 | O(n)       |
| `Itrim key start end`                      | 按照索引范围修剪列表（subList）                              | O(n)       |
| **查**                                     |                                                              |            |
| `lrange key start end`                     | 获取列表指定索引范围所有item（包含end）                      | O(n)       |
| `lindex key index`                         | 获取列表指定索引的item                                       | O(n)       |
| `llen key`                                 | 获取列表长度                                                 | O(1)       |
| **改**                                     |                                                              |            |
| `lset key index newValue`                  | 设置列表指定索引值为newValue                                 | O(n)       |
| **Other**                                  |                                                              |            |
| `blpop key timeout`                        | Ipop阻塞版本，timeout是阻塞超时时间，timeout=0为永远不阻塞<br>针对空列表，空列表lpop会直接返回空，blpop会阻塞等有元素返回 | O(1)       |
| `brpop key timeout`                        | rpop阻塞版本，timeout是阻塞超时时间，timeout=0为永远不阻塞<br/>针对空列表，空列表rpop会直接返回空，blpop会阻塞等有元素返回 | O(1)       |

>Tips:
>
>- lpush + lpop = Stack（栈）
>- lpush + rpop = Queue（队列）
>- lpush + ltrim = Capped Collection（固定长度列表）
>- lpush + brpop = Message Queue（消息队列）

# 五、集合类型

- 无序的
- 无重复
- 支持集合间的操作

| API                                                    | 描述                                                 | 时间复杂度 |
| ------------------------------------------------------ | ---------------------------------------------------- | ---------- |
| **增删**                                               |                                                      |            |
| `sadd key element`                                     | 向集合key添加element（如果element已经存在 添加失败） | O(1)       |
| `srem key element`                                     | 将集合key中的element移除掉                           | O(1)       |
| **查询**                                               |                                                      |            |
| `scard key`                                            | 获取集合元素个数                                     | O(1)       |
| `sismember key member`                                 | 判断元素member是否在集合key中                        | O(1)       |
| `srandmember key count`                                | 从集合key中随机获取count个元素                       | O(1~n)     |
| `spop key`                                             | 从集合key中随机弹出一个元素（从集合中删掉）          | O(1)       |
| `smembers key`                                         | 获取集合key中所有元素                                | O(n)       |
| **集合间操作**                                         |                                                      |            |
| `sdiff key1 key2`                                      | 差集                                                 | O(n)       |
| `sinter key1 key2`                                     | 交集                                                 | O(n)       |
| `sunion key1 key2`                                     | 并集                                                 | O(1)       |
| `sdiffstore|sinterstore|sunionstore destKey key1 key2` | 求集合间的差、交、并集，保存到集合destKey中          | O(n)       |

# 六、有序集合类型

有序集合结构

![image-20210603165541114](https://z3.ax1x.com/2021/06/03/231QpQ.png)

| API                                                | 描述                                 | 时间复杂度    |
| -------------------------------------------------- | ------------------------------------ | ------------- |
| **基本命令**                                       |                                      |               |
| `zadd key score elemen`                            | 添加score和element（可以多对）       | O(logN)       |
| `zrem key element`                                 | 删除元素（可以是多个）               | O(1)          |
| `zscore key element`                               | 返回元素的分数                       | O(1)          |
| `zincrby key increScore element`                   | 增加或减少元素的分数                 | O(1)          |
| **范围操作**                                       |                                      |               |
| `zrange key start end [WITHSCORES]`                | 返回指定排名范围内的升序元素[分值]   | O(log(n) + m) |
| `zrangebyscore key minScore maxScore [WITHSCORES]` | 返回指定分数范围内的升序元素[分值]   | O(log(n) + m) |
| `zcount key minScore maxScore`                     | 返回有序集合内在指定分数范围内的个数 | O(log(n) + m) |
| `zremrangebyrank key start end`                    | 删除指定排名内的升序元素             | O(log(n) + m) |
| `zremrangebyscore key minScore maxScore`           | 删除指定分数内的升序元素             | O(log(n) + m) |

其他命令：zrevrank、zrevrange、zrevrangebyscore、zinterstore、zunionstore