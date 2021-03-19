### 1.3.1 Mapping介绍

Mapping 类似数据库中的表结构定义，主要作用如下：

* 定义Index下的字段名（Field Name）
* 定义字段的类型，比如数值型、字符串型、布尔型等
* 定义倒排索引相关的配置，比如是否索引、记录 position等

![image-20201224003619215](https://s3.ax1x.com/2020/12/24/rcJoAH.png)

自定义Mapping

![image-20201224003751552](https://s3.ax1x.com/2020/12/24/rcJTNd.png)

### 1.3.2 参数介绍

#### dynamic

* Mapping中的字段类型一旦设定后，禁止直接修改，原因是Lucene实现的倒排索引生成后不允许修改

* 重新建立新的索引，然后做reindex操作重新导入文档

* 允许新增字段通过**dynamic**参数来控制字段的新增

    * **true**：(默认)允许自动新增字段
    * **false**：不允许自动新增字段，但是文档可以正常写入，但无法对字段进行查询等操作
    * **strict**：文档不能写入，报错

  ![image-20201224004042261](https://s3.ax1x.com/2020/12/24/rcJ74A.png)

  查询一个索引的mapping： `GET /index_name/_mapping`

#### copy_to

* 将该字段的值复制到目标字段，实现类似 `_all` 的作用
* 不会出现在 `_source` 中，只用来搜索

![image-20201225003011925](https://s3.ax1x.com/2020/12/25/rREqsA.png)

#### index

* 控制当前字段是否索引，默认为true，即记录索引，false不记录，即不可搜索
* 不用来检索的字段可以设置成false，不生成倒排索引，会节省空间

![image-20201225003359686](https://s3.ax1x.com/2020/12/25/rRELqI.png)

#### index_options

index_options 用于控制倒排索引记录的内容，有如下4种配置

* **docs**： 只记录 doc id
* **freqs** ：记录 doc id 和 term frequencies (词频)
* **positions**：记录 doc id、term frequencies 和 term position (位置)
* **offsets** ：记录doc id、term frequencies、term position 和 character offsets (开始结束位置)

text 类型默认配置为 positions，其他默认为 docs

记录内容越多，占用空间越大

![image-20201225004617196](https://s3.ax1x.com/2020/12/25/rREXZt.png)

#### null_value

当字段遇到null 值时的处理策略，默认为null，即空值，此时es会忽略该值。可以通过设定该值设定字段的默认值

![image-20201225004646636](https://s3.ax1x.com/2020/12/25/rREvIf.png)

### 1.3.3 数据类型

**常见数据类型**

* 字符串：text，keyword
* 数值型：long，integer，short，byte，double，float，half_float，scaled_float
* 布尔：boolean
* 日期：date
* 二进制：binary
* 范围类型：integer_range，float_range，long_range，double_range，date_range

**复杂数据类型**

* 数组类型 array：无需指定为数组，只需要放入数组的元素符合该字段数据类型即可，即integer类型字段可以存放integer数组
* 对象类型 object
* 嵌套类型 nested object：和前者的区别的这些文档会特殊处理，不会和父文档混在一起，是独立存在的

**地理位置数据类型**

* geo_point
* geo_ shape

**专用类型**

* ip：记录ip地址
* completion：实现自动补全
* token_count：记录分次数
* murmur3：记录字符串hash值
* percolator
* join：做子查询用

**多字段特性 multi-fields**

允许对同一个字段采用不同的配置，比如分词，常见例子如对人名实现拼音搜索，只需要在人名中新增一个子字段为pinyin即可

![image-20201225010451559](https://s3.ax1x.com/2020/12/25/rREzi8.png)

### 1.3.4 Dynamic Mapping

#### 自动识别

es可以自动识别文档字段类型，从而降低用户使用成本，如下所示

![image-20201225010752220](https://s3.ax1x.com/2020/12/25/rRVSJS.png)

es是依靠JSON文档的字段类型来实现自动识别字段类型，支持的类型如下：

![image-20201225010926671](https://s3.ax1x.com/2020/12/25/rRVpRg.png)

#### 日期和数字识别

**日期识别**

日期的自动识别可以自行配置日期格式，以满足各种需求

* 默认是 `["strict date optional time","yyyy/MM/dd HH:mmss Zlyyyy/MM/dd Z]`

* strict_date_optional_time 是 ISO datetime 的格式，完整格式类似下面：

  `YYYY-MM-DDThh:mm:ssTZD(eg 1997-07-16T19:20:30+01:00)`

* dynamic_date_formats 可以自定义日期类型

* date_detection 可以关闭日期自动识别的机制

![image-20201225011645649](https://s3.ax1x.com/2020/12/25/rRV9zQ.png)

**数字识别**

字符串是数字时，默认不会自动识别为整型，因为字符串中出现数字是完全合理的

* numeric_detection 可以开启字符串中数字的自动识别，如下所示：

![image-20201225011838499](https://s3.ax1x.com/2020/12/25/rRVPMj.png)

### 1.3.5 Dynamic Template

允许根据es自动识别的数据类型、字段名等来动态设定字段类型，可以实现如下效果：

* 所有字符串类型都设定为keyword类型，即默认不分词
* 所有以 message 开头的字段都设定为text类型，即分词
* 所有以 long_ 开头的字段都设定为long类型
* 所有自动匹配为double类型的都设定为float类型，以节省空间

匹配规则一般有如下几个参数：

* match_mapping_type 匹配es 自动识别的字段类型，如boolean、long、string等
* match，unmatch 匹配字段名
* path_match，path unmatch 匹配路径

下面示例就是实现了上述第一点，创建一个索引，改索引将String都设置为keyword：

![image-20201225012624670](https://s3.ax1x.com/2020/12/25/rRViss.png)

以message开头的字段都设置为text类型：

![image-20201225013052799](https://s3.ax1x.com/2020/12/25/rRVFLn.png)

自定义Mapping的操作步骤建议如下：

1. 写入一条文档到es的临时索引中，获取es自动生成的mapping
2. 修改步骤1得到的mapping，自定义相关配置
3. 使用步骤2的mapping 创建实际所需索引

### 1.3.6 索引模板

索引模板，英文为Index Template，主要用于在新建索引时自动应用预先设定的配置，简化索引创建的操作步骤

* 可以设定索引的配置和mapping
* 可以有多个模板，根据 order设置，order大的覆盖小的配置

索引模板API，endpoint为 `_template`，如下所示：

**创建索引模板**

![image-20201225013813823](https://s3.ax1x.com/2020/12/25/rRVAZq.png)

**获取与删除索引模板**

![image-20201225014132461](https://s3.ax1x.com/2020/12/25/rRVEd0.png)

**示例**

创建两个模板

![image-20201225014216422](https://s3.ax1x.com/2020/12/25/rRVVoV.png)

创建索引，查看结构

![image-20201225014316967](https://s3.ax1x.com/2020/12/25/rRVeiT.png)
