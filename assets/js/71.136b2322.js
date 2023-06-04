(window.webpackJsonp=window.webpackJsonp||[]).push([[71],{396:function(t,s,a){"use strict";a.r(s);var n=a(4),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"一、缓存的收益与成本"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一、缓存的收益与成本"}},[t._v("#")]),t._v(" 一、缓存的收益与成本")]),t._v(" "),s("h2",{attrs:{id:"_1-1-收益"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-收益"}},[t._v("#")]),t._v(" 1.1 收益")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("加速读写")]),t._v(" "),s("p",[t._v("通过缓存加速读写速度：CPUL1/L2/L3 Cache、Linux page Cache加速硬盘读写、浏览器缓存、Ehcache缓存数据库结果。")])]),t._v(" "),s("li",[s("p",[t._v("降低后端负载")]),t._v(" "),s("p",[t._v("后端服务器通过前端缓存降低负载：业务端使用Redis降低后端MySQL负载等")])])]),t._v(" "),s("h2",{attrs:{id:"_1-2-成本"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-成本"}},[t._v("#")]),t._v(" 1.2 成本")]),t._v(" "),s("ol",[s("li",[t._v("数据不一致：缓存层和数据层有时间窗口不一致，和更新策略有关。")]),t._v(" "),s("li",[t._v("代码维护成本：多了一层缓存逻辑。")]),t._v(" "),s("li",[t._v("运维成本：例如Redis Cluster")])]),t._v(" "),s("h2",{attrs:{id:"_1-3-使用场景"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-使用场景"}},[t._v("#")]),t._v(" 1.3 使用场景")]),t._v(" "),s("ol",[s("li",[t._v("降低后端负载：\n对高消耗的SQL：join结果集/分组统计结果缓存。")]),t._v(" "),s("li",[t._v("加速请求响应：\n利用Redis/Memcache优化IO响应时间")]),t._v(" "),s("li",[t._v("大量写合并为批量写：\n如计数器先Redis累加再批量写DB")])]),t._v(" "),s("h1",{attrs:{id:"二、缓存更新策略"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#二、缓存更新策略"}},[t._v("#")]),t._v(" 二、缓存更新策略")]),t._v(" "),s("h2",{attrs:{id:"_2-1-缓存更新方式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-缓存更新方式"}},[t._v("#")]),t._v(" 2.1 缓存更新方式")]),t._v(" "),s("ol",[s("li",[t._v("LRU/LFU/FIFO 算法剔除：例如 maxmemory-policy。")]),t._v(" "),s("li",[t._v("超时剔除：例如 expire。")]),t._v(" "),s("li",[t._v("主动更新：开发控制生命周期")])]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",{staticStyle:{"text-align":"center"}},[t._v("策略")]),t._v(" "),s("th",{staticStyle:{"text-align":"center"}},[t._v("一致性")]),t._v(" "),s("th",{staticStyle:{"text-align":"center"}},[t._v("维护成本")])])]),t._v(" "),s("tbody",[s("tr",[s("td",{staticStyle:{"text-align":"center"}},[t._v("LRU/LIRS 算法剔除")]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[t._v("最差")]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[t._v("低")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"center"}},[t._v("超时剔除")]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[t._v("较差")]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[t._v("低")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"center"}},[t._v("主动更新")]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[t._v("强")]),t._v(" "),s("td",{staticStyle:{"text-align":"center"}},[t._v("高")])])])]),t._v(" "),s("p",[t._v("两条建议：")]),t._v(" "),s("ol",[s("li",[t._v("低一致性：最大内存和淘汰策略")]),t._v(" "),s("li",[t._v("高一致性：超时剔除和主动更新结合，最大内存和淘汰策略兜底。")])]),t._v(" "),s("h2",{attrs:{id:"_2-2-redis-淘汰策略"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-redis-淘汰策略"}},[t._v("#")]),t._v(" 2.2 Redis 淘汰策略")]),t._v(" "),s("p",[t._v("Redis 通过 "),s("code",[t._v("maxmemory-policy")]),t._v(" 配置数据的淘汰策略，一共六种淘汰策略，分成四大类")]),t._v(" "),s("ul",[s("li",[t._v("lru：最近最少使用的淘汰\n"),s("ul",[s("li",[t._v("allkeys：所有")]),t._v(" "),s("li",[t._v("volatile：设置过期时间的")])])]),t._v(" "),s("li",[t._v("ttl：从已设置过期时间中挑选将要过期的淘汰")]),t._v(" "),s("li",[t._v("random：数据中随机淘汰\n"),s("ul",[s("li",[t._v("allkeys：所有")]),t._v(" "),s("li",[t._v("volatile：设置过期时间的")])])]),t._v(" "),s("li",[t._v("no-enviction：禁止驱逐，直接报错")])]),t._v(" "),s("h1",{attrs:{id:"三、缓存粒度控制"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#三、缓存粒度控制"}},[t._v("#")]),t._v(" 三、缓存粒度控制")]),t._v(" "),s("p",[t._v("缓存数据时，是否需要缓存全量信息。")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://z3.ax1x.com/2021/06/09/2c80E9.png",alt:"image-20210609193929928"}})]),t._v(" "),s("ol",[s("li",[t._v("通用性：全量属性更好")]),t._v(" "),s("li",[t._v("占用空间：部分属性更好")]),t._v(" "),s("li",[t._v("代码维护：表面上全量属性更好")])]),t._v(" "),s("h1",{attrs:{id:"四、缓存穿透"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#四、缓存穿透"}},[t._v("#")]),t._v(" 四、缓存穿透")]),t._v(" "),s("p",[t._v("问题描述：缓存和数据库中都没有的数据，而用户不断发起请求，如发起为id为“-1”的数据或id为特别大不存在的数据。这时的用户很可能是攻击者，攻击会导致数据库压力过大。")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://z3.ax1x.com/2021/06/09/2c8qKS.png",alt:"image-20210609194200024"}})]),t._v(" "),s("p",[t._v("原因：")]),t._v(" "),s("ol",[s("li",[t._v("业务代码自身问题")]),t._v(" "),s("li",[t._v("恶意攻击、爬虫等等")])]),t._v(" "),s("p",[t._v("如何发现：")]),t._v(" "),s("ol",[s("li",[t._v("业务的相应时间")]),t._v(" "),s("li",[t._v("业务本身问题")]),t._v(" "),s("li",[t._v("相关指标：总调用数、缓存层命中数、存储层命中数")])]),t._v(" "),s("p",[t._v("解决方案：")]),t._v(" "),s("ol",[s("li",[s("p",[s("strong",[t._v("接口参数校验")]),t._v("，不合法参数直接返回（如 id<0）")])]),t._v(" "),s("li",[s("p",[s("strong",[t._v("缓存空对象")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://z3.ax1x.com/2021/06/10/2gYPde.png",alt:"image-20210610100558759"}})]),t._v(" "),s("p",[t._v("本方案有两个问题：")]),t._v(" "),s("ul",[s("li",[t._v("需要更多的键。")]),t._v(" "),s("li",[t._v("缓存层和存储层数据“短期”不一致。")])])]),t._v(" "),s("li",[s("p",[s("strong",[t._v("布隆过滤器拦截")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://z3.ax1x.com/2021/06/10/2gY3Js.png",alt:"image-20210610100705450"}})])])]),t._v(" "),s("h1",{attrs:{id:"五、缓存击穿"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#五、缓存击穿"}},[t._v("#")]),t._v(" 五、缓存击穿")]),t._v(" "),s("p",[t._v("问题描述：某一个热点 key，在缓存过期的一瞬间，同时有大量的请求打进来，由于此时缓存过期了，所以请求最终都会走到数据库，造成瞬时数据库请求量大、压力骤增，甚至可能打垮数据库。")]),t._v(" "),s("p",[t._v("解决方案：")]),t._v(" "),s("ol",[s("li",[s("strong",[t._v("加互斥锁")]),t._v("。在并发的多个请求中，只有第一个请求线程能拿到锁并执行数据库查询操作，其他的线程拿不到锁就阻塞等着，等到第一个线程将数据写入缓存后，直接走缓存。")]),t._v(" "),s("li",[s("strong",[t._v("热点数据不过期")]),t._v("。直接将缓存设置为不过期，然后由定时任务去异步加载数据，更新缓存。")])]),t._v(" "),s("h1",{attrs:{id:"六、缓存雪崩"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#六、缓存雪崩"}},[t._v("#")]),t._v(" 六、缓存雪崩")]),t._v(" "),s("p",[t._v("问题描述：缓存雪崩是指缓存中数据大批量到过期时间，而查询数据量巨大，引起数据库压力过大甚至宕机。和缓存击穿不同的是，缓存击穿指并发查同一条数据，缓存雪崩是不同数据都过期了，很多数据都查不到从而查数据库。")]),t._v(" "),s("p",[t._v("解决方案：")]),t._v(" "),s("ol",[s("li",[s("strong",[t._v("过期时间打散")]),t._v("。既然是大量缓存集中失效，那最容易想到就是让他们不集中生效。可以给缓存的过期时间时加上一个随机值时间，使得每个 key 的过期时间分布开来，不会集中在同一时刻失效。")]),t._v(" "),s("li",[s("strong",[t._v("热点数据不过期")]),t._v("。该方式和缓存击穿一样，也是要着重考虑刷新的时间间隔和数据异常如何处理的情况。")]),t._v(" "),s("li",[s("strong",[t._v("加互斥锁")]),t._v("。该方式和缓存击穿一样，按 key 维度加锁，对于同一个 key，只允许一个线程去计算，其他线程原地阻塞等待第一个线程的计算结果，然后直接走缓存即可。")])]),t._v(" "),s("h1",{attrs:{id:"七、无底洞问题优化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#七、无底洞问题优化"}},[t._v("#")]),t._v(" 七、无底洞问题优化")]),t._v(" "),s("p",[t._v("问题描述：")]),t._v(" "),s("ul",[s("li",[t._v("2010年，Facebook有了3000个Memcache节点。")]),t._v(" "),s("li",[t._v("发现问题：“加”机器性能没能提升，反而下降。")])]),t._v(" "),s("p",[t._v("以mget为例，mget需要客户端根据节点不同数据分批查询。一次mget操作随着节点的个数越来越多，网络次数也会越来越多，对客户端一次命令的执行效率会有很大的影响。节点数从一个变成node个，一次mget操作的IO从 O(1) 变成 O(node)，并行情况下要等最慢的节点完成，串行的情况下需要依次等各个节点完成。")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://z3.ax1x.com/2021/06/10/2g0LgH.png",alt:"image-20210610105002288"}})]),t._v(" "),s("p",[t._v("问题关键点：")]),t._v(" "),s("ul",[s("li",[t._v("更多的机器 != 更高的性能")]),t._v(" "),s("li",[t._v("批量接口需求（mget,mset等）")]),t._v(" "),s("li",[t._v("数据增长与水平扩展需求")])]),t._v(" "),s("p",[t._v("优化IO的几种方案：")]),t._v(" "),s("ol",[s("li",[t._v("命令本身优化：例如慢查询keys、hgetall bigkey")]),t._v(" "),s("li",[t._v("减少网络通信次数")]),t._v(" "),s("li",[t._v("降低接入成本：例如客户端长连接/连接池、NIO等")])]),t._v(" "),s("p",[t._v("优化批量操作的几种方法（Redis Cluster章节有详细解释）：")]),t._v(" "),s("ol",[s("li",[t._v("串行mget")]),t._v(" "),s("li",[t._v("串行IO")]),t._v(" "),s("li",[t._v("并行IO")]),t._v(" "),s("li",[t._v("hash_tag")])]),t._v(" "),s("h1",{attrs:{id:"八、热点key重建优化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#八、热点key重建优化"}},[t._v("#")]),t._v(" 八、热点key重建优化")]),t._v(" "),s("p",[t._v("缓存重建：从数据库查询到数据，缓存到redis的过程。")]),t._v(" "),s("p",[t._v("问题描述：热点key + 较长的重建时间")]),t._v(" "),s("p",[t._v("一个key对应的数据是热点数据，同时它的重建过程比较长，在第一次查询时开始重建缓存，但是重建过程中时间较长， 在重建期间有很多请求进来，由于缓存还没重建成功，所以这些请求都会去查询数据库并重建缓存。会造成数据库压力比较大，以及响应时间较慢的问题。过程如下图所示：")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://z3.ax1x.com/2021/06/10/2gs8MQ.png",alt:"image-20210610110217537"}})]),t._v(" "),s("p",[t._v("要解决这个问题，有以下三个目标：")]),t._v(" "),s("ul",[s("li",[t._v("减少重缓存的次数")]),t._v(" "),s("li",[t._v("数据尽可能一致")]),t._v(" "),s("li",[t._v("减少潜在危险")])]),t._v(" "),s("p",[t._v("两个解决方案：")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("互斥锁（mutex key)")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://z3.ax1x.com/2021/06/10/2gyNOH.png",alt:"image-20210610110732233"}})]),t._v(" "),s("p",[t._v("不需要大量重建过程，但是需要等待，可能大量线程等待。")]),t._v(" "),s("div",{staticClass:"language-java line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 伪代码")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" key"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" \n    "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" value "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" redis"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("key"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" \n        "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" mutexKey "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"mutex:key:"')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" key"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("redis"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("set")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("mutexKey"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"1"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"ex 180"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"nx"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" \n            value "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" db"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("key"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n            redis"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("set")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("key"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n            redis"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("delete")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("mutexKey"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" \n            "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//其他线程休息50毫秒后重试 ")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Thread")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sleep")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("50")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n            "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("key"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br"),s("span",{staticClass:"line-number"},[t._v("14")]),s("br"),s("span",{staticClass:"line-number"},[t._v("15")]),s("br"),s("span",{staticClass:"line-number"},[t._v("16")]),s("br"),s("span",{staticClass:"line-number"},[t._v("17")]),s("br")])])]),t._v(" "),s("li",[s("p",[t._v("永远不过期")]),t._v(" "),s("ol",[s("li",[t._v("缓存层面：没有设置过期时间（没有用expire)。")]),t._v(" "),s("li",[t._v("功能层面：为每个value添加逻辑过期时间，但发现超过逻辑过期时间后，会使用单独的线程去构建缓存。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://z3.ax1x.com/2021/06/10/2g6e4P.png",alt:"image-20210610111051419"}})]),t._v(" "),s("div",{staticClass:"language-java line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 伪代码")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("final")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" key"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" \n    "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("V")]),t._v(" v "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" redis"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("key"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n    "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" value "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" v"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getValue")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("long")]),t._v(" logicTimeout "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" v"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getLogicTimeout")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("logicTimeout "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("System")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("currentTimeMillis")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" \n        "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" mutexKey "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"mutex:key:"')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" key"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("redis"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("set")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("mutexKey"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"1"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"ex 180"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"nx"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" \n            "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//异步更新后台异常执行 ")]),t._v("\n            threadPool"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("execute")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Runnable")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" \n                "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("run")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" \n                    "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" dbValue "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" db"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("key"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n                    redis"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("set")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("key"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("dbValue"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" newLogicTimeout"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n                    redis"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("delete")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("keyMutex"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n                "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br"),s("span",{staticClass:"line-number"},[t._v("14")]),s("br"),s("span",{staticClass:"line-number"},[t._v("15")]),s("br"),s("span",{staticClass:"line-number"},[t._v("16")]),s("br"),s("span",{staticClass:"line-number"},[t._v("17")]),s("br"),s("span",{staticClass:"line-number"},[t._v("18")]),s("br"),s("span",{staticClass:"line-number"},[t._v("19")]),s("br"),s("span",{staticClass:"line-number"},[t._v("20")]),s("br")])])])]),t._v(" "),s("p",[t._v("两种方案对比：")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("方案")]),t._v(" "),s("th",[t._v("优点")]),t._v(" "),s("th",[t._v("缺点")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("互斥锁")]),t._v(" "),s("td",[t._v("- 思路简单"),s("br"),t._v("- 保证一致性")]),t._v(" "),s("td",[t._v("- 代码复杂度增加"),s("br"),t._v("- 存在死锁的风险")])]),t._v(" "),s("tr",[s("td",[t._v("key永不过期")]),t._v(" "),s("td",[t._v("- 基本杜绝热点key重建问题")]),t._v(" "),s("td",[t._v("-不保证一致性"),s("br"),t._v("- 逻辑过期时间增加维护成本和内存成本")])])])]),t._v(" "),s("h1",{attrs:{id:"九、总结"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#九、总结"}},[t._v("#")]),t._v(" 九、总结")]),t._v(" "),s("ul",[s("li",[t._v("缓存收益：加速读写、降低后端存储负载。")]),t._v(" "),s("li",[t._v("缓存成本：缓存和存储数据不一致性、代码维护成本、运维成本。")]),t._v(" "),s("li",[t._v("推荐结合剔除、超时、主动更新三种方案共同完成。")]),t._v(" "),s("li",[t._v("穿透问题：使用缓存空对象和布隆过滤器来解决，注意它们各自的使用场景和局限性。")]),t._v(" "),s("li",[t._v("无底洞问题：分布式缓存中，有更多的机器不保证有更高的性能。有四种批量操作方式：串行命令、串行IO、并行IO、hash_tag。")]),t._v(" "),s("li",[t._v("雪崩问题：缓存层高可用、客户端降级、提前演练是解决雪崩问题的重要方法。")]),t._v(" "),s("li",[t._v("热点key问题：互斥锁、“永远不过期”能够在一定程度上解决热点key问题，开发人员在使用时要了解它们各自的使用成本。")])]),t._v(" "),s("p",[t._v("参考文章：")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/359118610",target:"_blank",rel:"noopener noreferrer"}},[t._v("缓存穿透、缓存击穿、缓存雪崩解决方案"),s("OutboundLink")],1)])])])}),[],!1,null,null,null);s.default=e.exports}}]);