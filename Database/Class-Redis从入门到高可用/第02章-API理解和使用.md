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

| API                      | 描述                                            | 时间复杂度 |
| ------------------------ | ----------------------------------------------- | ---------- |
| get key                  | 获取key对应的value                              | O(1)       |
| set key value            | 设置key-value                                   | O(1)       |
| del key                  | 删除key-value                                   | O(1)       |
| incr key                 | key自增1，如果key不存在，自增后get(key)=1       | O(1)       |
| decr key                 | key自减1，如果key不存在，自减后get(key)=-1      | O(1)       |
| incrby key k             | key自增k，如果key不存在，自增后get(key)=k       | O(1)       |
| decrby key k             | key自减k，如果key不存在，自减后get(key)=-k      | O(1)       |
| setex key value          | key不存在，才设置                               | O(1)       |
| set key value xx         | key存在，才设置                                 | O(1)       |
| mget k1 k2 k3..          | 批量获取key，原子操作                           | O(n)       |
| mset k1 v1 k2 v2 k3 v3   | 批量设置key-value                               | O(n)       |
| getset key newValue      | set key newValue并返回旧的value                 | O(1)       |
| append key value         | 将value追加到旧的value                          | O(1)       |
| strlen key               | 返回字符串的长度（注意中文）                    | O(1)       |
| incrbyfloat key 3.5      | 增加key对应的值3.5                              | O(1)       |
| getrange key start end   | 获取字符串指定下标所有的值（从0开始，包含首位） | O(1)       |
| setrange key index value | 设置指定下标所有对应的值                        | O(1)       |

# 三、哈希类型

## 3.1 哈希键值结构

![哈希键值结构](https://z3.ax1x.com/2021/06/01/2mvbGV.png)

## 3.2 哈希命令

| API                                       | 描述                                | 时间复杂度 |
| ----------------------------------------- | ----------------------------------- | ---------- |
| hget key field                            | 获取hash key对应的field的value      | O(1)       |
| hset key field value                      | 设置hash key对应field的value        | O(1)       |
| hdel key field                            | 删除hash key对应field的value        | O(1)       |
| hexists key field                         | 判断hash key是否有field             | O(1)       |
| hlen key                                  | 获取hash key field的数量            | O(1)       |
| hmget key field1 field...fieldN           | 批量获取hash key的一批field对应的值 | O(n)       |
| hmset key field1 v1 field2 v2...fieldN vN | 批量设置hash key的一批field value   | O(n)       |
| hincrby key field k                       | 指定key下field的值自增 k            | O(1)       |
| hgetall key                               | 返回hash key对应所有的field和value  | O(n)       |
| hvals key                                 | 返回hash key对应所有field的value    | O(n)       |
| hkeys key                                 | 返回hash key对应所有field           | O(n)       |
|                                           |                                     |            |
|                                           |                                     |            |
|                                           |                                     |            |
|                                           |                                     |            |
|                                           |                                     |            |
|                                           |                                     |            |



# 四、列表烈性

# 五、集合类型

# 六、有序集合类型