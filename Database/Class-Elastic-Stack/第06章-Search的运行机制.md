### 1.6.1 Search两个阶段

Search执行的时候实际分两个步骤运作的，即 Query-Then-Fetch

* Query阶段
* Fetch阶段

**Query阶段过程：**

![image-20201227032936521](https://s3.ax1x.com/2020/12/29/rqn7M4.png)

**Fetch阶段过程：**

![image-20201227033057665](https://s3.ax1x.com/2020/12/29/rqnbL9.png)

### 1.6.2 相关性算分问题

相关性算分在shard与shard间是相互独立的，也就意味着同一个Term的IDF等值在不同shard 上是不同的。文档的相关性算分和它所处的shard相关

在文档数量不多时，会导致相关性算分严重不准的情况发生

解决思路有两个：

* 一是设置分片数为1个，从根本上排除问题，在文档数量不多的时候可以考虑该方案，比如百万到干万级别的文档数量
* 二是使用DFS Query-then-Fetch 查询方式

**DFS Query-then-Fetch** 是在拿到所有文档后再重新完整的计算一次相关性算分，耗费更多的cpu和内存，执行性能也比较低下，一般不建议使用。使用方式如下：

![image-20201227033703844](https://s3.ax1x.com/2020/12/29/rqnLZR.png)

### 1.6.3 排序

**排序操作及机制**

es 默认会采用相关性算分排序，用户可以通过设定sorting参数来自行设定排序规则

![image-20201227033849683](https://s3.ax1x.com/2020/12/29/rqnOd1.png)

![image-20201227033954663](https://s3.ax1x.com/2020/12/29/rqnXIx.png)

按照字符串排序比较特殊，因为es有text和keyword两种类型，针对text 类型排序，如下所示：

![image-20201227034328731](https://s3.ax1x.com/2020/12/29/rqnvi6.png)

针对keyword 类型排序，可以返回预期结果：

![image-20201227034408381](https://s3.ax1x.com/2020/12/29/rqnxJK.png)

排序的过程实质是对字段原始内容排序的过程，这个过程中**倒排索引无法发挥作用**，需要用到**正排索引**，也就是通过文档Id 和字段可以快速得到字段原始内容。
es 对此提供了2种实现方式：

* fielddata，默认禁用
* doc values，默认启用，除了text类型

![image-20201227034644517](https://s3.ax1x.com/2020/12/29/rqnzRO.png)

**Fielddata**

Fielddata 默认是关闭的，可以通过如下api开启：

* 此时字符串是按照分词后的term 排序，往往结果很难符合预期
* 一般是在对分词做聚合分析的时候开启

![image-20201227034851533](https://s3.ax1x.com/2020/12/29/rquSzD.png)

**Doc Values**

Doc Values默认是启用的，可以在创建索引的时候关闭，如果后面要再开启 doc values，需要做 reindex操作

![image-20201227035133503](https://s3.ax1x.com/2020/12/29/rquCsH.png)

**docvalue_fields**

可以通过该字段获取 fielddata 或者 doc values中存储的内容

![image-20201227035344484](https://s3.ax1x.com/2020/12/29/rqukdI.png)

### 1.6.4 分页与遍历

es提供了3种方式来解决分页与遍历的问题：

* from/size
* scroll
* search_after

| 类型         | 场景                                       |
| ------------ | ------------------------------------------ |
| From/Size    | 需要实时获取顶部的部分文档，且需要自由翻页 |
| Scroll       | 需要全部文档，如导出所有数据的功能         |
| Search_After | 需要全部文档，不需要自由翻页               |

#### from/size

最常用的分页方案，from-指明开始位置，size-指明获取总数

![image-20201227040011543](https://s3.ax1x.com/2020/12/29/rquZJf.png)

**深度分页问题**

深度分页是一个经典的问题：在数据分片存储的情况下如何获取前1000个文档？

* 获取从990~1000的文档时，会在每个分片上都先获取1000个文档，然后再由Coordinating Node 聚合所有分片的结果后再排序选取前1000个文档
* 页数越深，处理文档越多，占用内存越多，耗时越长。尽量避免深度分页，es通过**index.max result window** 限定最多到10000条数据

![image-20201227040232980](https://s3.ax1x.com/2020/12/29/rquKyQ.png)

#### scroll

遍历文档集的api，以快照的方式来避免深度分页的问题

* 不能用来做实时搜索，因为数据不是实时的
* 尽量不要使用复杂的sort条件，使用_doc最高效
* 使用稍嫌复杂

**使用步骤：**

第一步需要发起一个scroll search，如下所示：

* es在收到该请求后会根据查询条件创建文档ld合集的快照

![image-20201227040800272](https://s3.ax1x.com/2020/12/29/rqu3oq.png)

第二步调用 scroll search的api，获取文档集合，如下所示：

* 不断迭代调用直到返回hits.hits数组为空时停止

![image-20201227040918387](https://s3.ax1x.com/2020/12/29/rquGF0.png)

过多的scroll 调用会占用大量内存，可以通过clear api删除过多的scroll快照：

![image-20201227041039308](https://s3.ax1x.com/2020/12/29/rquJYV.png)

#### search_after

避免深度分页的性能问题，提供实时的下一页文档获取功能

* 缺点是不能使用from参数，即不能指定页数
* 只能下一页，不能上一页
* 使用简单

第一步为正常的搜索，但要指定sort值，并保证值唯一

第二步为使用上一步最后一个文档的 sort 值进行查询

![image-20201227041244726](https://s3.ax1x.com/2020/12/29/rquYWT.png)

如何避免深度分页问题？

通过唯一排序值定位将每次要处理的文档数都控制在size内

![image-20201227041458696](https://s3.ax1x.com/2020/12/29/rquNSU.png)
