(window.webpackJsonp=window.webpackJsonp||[]).push([[79],{403:function(t,_,a){"use strict";a.r(_);var v=a(4),e=Object(v.a)({},(function(){var t=this,_=t._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[_("h3",{attrs:{id:"一、聚合分析概述"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#一、聚合分析概述"}},[t._v("#")]),t._v(" 一、聚合分析概述")]),t._v(" "),_("p",[t._v("搜索引擎用来回答如下问题：")]),t._v(" "),_("ul",[_("li",[t._v("请告诉我地址为上海的所有订单？")]),t._v(" "),_("li",[t._v("请告诉我最近 1 天内创建但没有付款的所有订单？")])]),t._v(" "),_("p",[t._v("聚合分析可以回答如下问题：")]),t._v(" "),_("ul",[_("li",[t._v("请告诉我最近 1 周每天的订单成交量有多少？")]),t._v(" "),_("li",[t._v("请告诉我最近 1 个月每天的平均订单金额是多少？")]),t._v(" "),_("li",[t._v("请告诉我最近半年卖的最火的前 5 个商品是哪些？")])]),t._v(" "),_("p",[_("strong",[t._v("聚合分析（Aggregation）")]),t._v("，是 es 除搜索功能外提供的针对 es 数据做统计分析的功能")]),t._v(" "),_("ul",[_("li",[t._v("功能丰富，提供 Bucket、Metric、Pipeline 等多种分析方式，可以满足大部分的分析需求")]),t._v(" "),_("li",[t._v("实时性高，所有的计算结果都是即时返回的，而 hadoop 等大数据系统一般都是 T+1 级别的")])]),t._v(" "),_("p",[t._v("聚合分析作为 search 的一部分，api 如下所示：")]),t._v(" "),_("p",[_("img",{attrs:{src:"https://s3.ax1x.com/2020/12/29/rquUlF.png",alt:"image-20201228223957382"}})]),t._v(" "),_("p",[t._v("例：请告诉我公司目前在职人员工作岗位的分布情况？")]),t._v(" "),_("p",[_("img",{attrs:{src:"https://s3.ax1x.com/2020/12/29/rquay4.png",alt:"image-20201228224118476"}})]),t._v(" "),_("p",[t._v("为了便于理解，es 将聚合分析主要分为如下 3 类")]),t._v(" "),_("ul",[_("li",[_("strong",[t._v("Bucket")]),t._v("：分桶类型，类似 SQL 中的 GROUP BY 语法")]),t._v(" "),_("li",[_("strong",[t._v("Metric")]),t._v("：指标分析类型，如计算最大值、最小值、平均值等等")]),t._v(" "),_("li",[_("strong",[t._v("Pipeline")]),t._v("：管道分析类型，基于上一级的聚合分析结果进行再分析")])]),t._v(" "),_("p",[t._v("具体参考官方文档："),_("a",{attrs:{href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Aggregations"),_("OutboundLink")],1)]),t._v(" "),_("h1",{attrs:{id:"二、metric-聚合分析"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#二、metric-聚合分析"}},[t._v("#")]),t._v(" 二、Metric 聚合分析")]),t._v(" "),_("p",[t._v("主要分如下两类：")]),t._v(" "),_("ul",[_("li",[t._v("单值分析，只输出一个分析结果\n"),_("ul",[_("li",[t._v("min，max，avg，sum")]),t._v(" "),_("li",[t._v("cardinality")])])]),t._v(" "),_("li",[t._v("多值分析，输出多个分析结果\n"),_("ul",[_("li",[t._v("stats，extended stats")]),t._v(" "),_("li",[t._v("percentile，percentile rank")]),t._v(" "),_("li",[t._v("top hits")])])])]),t._v(" "),_("h2",{attrs:{id:"_2-1-单值分析"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-单值分析"}},[t._v("#")]),t._v(" 2.1 单值分析")]),t._v(" "),_("h3",{attrs:{id:"_2-1-1-min"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-1-min"}},[t._v("#")]),t._v(" 2.1.1 min")]),t._v(" "),_("p",[t._v("单值分析以 min 为例，返回数值类字段的最小值，max、avg、sum 同理。")]),t._v(" "),_("p",[_("img",{attrs:{src:"https://s3.ax1x.com/2020/12/29/rqu0m9.png",alt:"image-20201228224800852"}})]),t._v(" "),_("p",[t._v("一次返回多个聚合分析：")]),t._v(" "),_("p",[_("img",{attrs:{src:"https://s3.ax1x.com/2020/12/29/rquBwR.png",alt:"image-20201228225104133"}})]),t._v(" "),_("h3",{attrs:{id:"_2-1-2-cardinality"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-2-cardinality"}},[t._v("#")]),t._v(" 2.1.2 cardinality")]),t._v(" "),_("p",[t._v("Cardinality，意为集合的势，或者基数，是指不同数值的个数，类似 SQL 中的 distinct count 概念。")]),t._v(" "),_("p",[_("img",{attrs:{src:"https://s3.ax1x.com/2020/12/29/rqusFx.png",alt:"image-20201228225315162"}})]),t._v(" "),_("h2",{attrs:{id:"_2-2-多值分析"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-多值分析"}},[t._v("#")]),t._v(" 2.2 多值分析")]),t._v(" "),_("h3",{attrs:{id:"_2-2-1-stats"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-1-stats"}},[t._v("#")]),t._v(" 2.2.1 stats")]),t._v(" "),_("p",[t._v("返回一系列数值类型的统计值，包含 min、max、avg、sum 和 count。")]),t._v(" "),_("p",[_("img",{attrs:{src:"https://s3.ax1x.com/2020/12/29/rquyY6.png",alt:"image-20201228225439558"}})]),t._v(" "),_("h3",{attrs:{id:"_2-2-2-extended-stats"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-2-extended-stats"}},[t._v("#")]),t._v(" 2.2.2 extended stats")]),t._v(" "),_("p",[t._v("对 stats 的扩展，包含了更多的统计数据，如方差、标准差等。")]),t._v(" "),_("p",[_("img",{attrs:{src:"https://s3.ax1x.com/2020/12/29/rqu2lD.png",alt:"image-20201228225556165"}})]),t._v(" "),_("h3",{attrs:{id:"_2-2-3-percentile"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-3-percentile"}},[t._v("#")]),t._v(" 2.2.3 percentile")]),t._v(" "),_("p",[t._v("返回指定字段的各百分位数档次统计。")]),t._v(" "),_("p",[_("img",{attrs:{src:"https://s3.ax1x.com/2020/12/29/rquR6e.png",alt:"image-20201228225805803"}})]),t._v(" "),_("p",[t._v("以上响应表示，1.0%的数据在5150以内，95.5%的数据在26250以内。")]),t._v(" "),_("h3",{attrs:{id:"_2-2-4-percentile-rank"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-4-percentile-rank"}},[t._v("#")]),t._v(" 2.2.4 percentile rank")]),t._v(" "),_("p",[t._v("返回指定字段指定值所处的百分位。")]),t._v(" "),_("p",[_("img",{attrs:{src:"https://s3.ax1x.com/2020/12/29/rquhmd.png",alt:"image-20201228225948207"}})]),t._v(" "),_("p",[t._v("以上示例表示，11000 工资在 50% 的位置，30000 工资在 75% 的位置。")]),t._v(" "),_("h3",{attrs:{id:"_2-2-5-top-hit"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-5-top-hit"}},[t._v("#")]),t._v(" 2.2.5 top hit")]),t._v(" "),_("p",[t._v("一般用于分桶后获取该桶内最匹配的顶部文档列表，即详情数据。")]),t._v(" "),_("p",[_("img",{attrs:{src:"https://s3.ax1x.com/2020/12/29/rqu7ff.png",alt:"image-20201228230214811"}})]),t._v(" "),_("p",[t._v("上述请求表示，现根据 job 名称分组，然后对每个 job 组中的数据取年龄在前 10 名的，根据年龄倒序排列。（就像是公司裁员，每个岗位取 10 个年纪最大的，干掉）")]),t._v(" "),_("h1",{attrs:{id:"三、bucket-聚合分析"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#三、bucket-聚合分析"}},[t._v("#")]),t._v(" 三、Bucket 聚合分析")]),t._v(" "),_("p",[t._v("Bucket，意为桶，即按照一定的规则将文档分配到不同的桶中，达到分类分析的目的。")]),t._v(" "),_("p",[_("img",{attrs:{src:"https://s3.ax1x.com/2020/12/28/r7al7D.png",alt:"image-20201228230737559"}})]),t._v(" "),_("p",[t._v("按照 Bucket 的分桶策略，常见的 Bucket 聚合分析如下：")]),t._v(" "),_("ul",[_("li",[t._v("Terms")]),t._v(" "),_("li",[t._v("Range")]),t._v(" "),_("li",[t._v("Date Range")]),t._v(" "),_("li",[t._v("Histogram")]),t._v(" "),_("li",[t._v("Date Histogram")])]),t._v(" "),_("h2",{attrs:{id:"_3-1-分桶策略"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-分桶策略"}},[t._v("#")]),t._v(" 3.1 分桶策略")]),t._v(" "),_("h3",{attrs:{id:"_3-1-1-terms-单词分桶"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-1-terms-单词分桶"}},[t._v("#")]),t._v(" 3.1.1 Terms 单词分桶")]),t._v(" "),_("p",[t._v("该分桶策略最简单，直接按照 term 来分桶，如果是 text 类型，则按照分词后的结果分桶")]),t._v(" "),_("p",[_("img",{attrs:{src:"https://s3.ax1x.com/2020/12/28/r7abg1.png",alt:"image-20201228230938657"}})]),t._v(" "),_("h3",{attrs:{id:"_3-1-2-range-范围分桶"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-2-range-范围分桶"}},[t._v("#")]),t._v(" 3.1.2 Range 范围分桶")]),t._v(" "),_("p",[t._v("通过指定数值的范围来设定分桶规则")]),t._v(" "),_("p",[_("img",{attrs:{src:"https://s3.ax1x.com/2020/12/30/rq8cE4.png",alt:"image-20201228231154222"}})]),t._v(" "),_("h3",{attrs:{id:"_3-1-3-date-range-时间范围分桶"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-3-date-range-时间范围分桶"}},[t._v("#")]),t._v(" 3.1.3 Date Range 时间范围分桶")]),t._v(" "),_("p",[t._v("通过指定日期的范围来设定分桶规则")]),t._v(" "),_("p",[_("img",{attrs:{src:"https://s3.ax1x.com/2020/12/30/rq8WCR.png",alt:"image-20201228231400377"}})]),t._v(" "),_("h3",{attrs:{id:"_3-1-4-histogram-固定间隔分桶"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-4-histogram-固定间隔分桶"}},[t._v("#")]),t._v(" 3.1.4 Histogram 固定间隔分桶")]),t._v(" "),_("p",[t._v("直方图，以固定间隔的策略来分割数据")]),t._v(" "),_("p",[_("img",{attrs:{src:"https://s3.ax1x.com/2020/12/30/rq8f81.png",alt:"image-20201228231532484"}})]),t._v(" "),_("h3",{attrs:{id:"_3-1-5-date-histogram-固定日期间隔分桶"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-5-date-histogram-固定日期间隔分桶"}},[t._v("#")]),t._v(" 3.1.5 Date Histogram 固定日期间隔分桶")]),t._v(" "),_("p",[t._v("针对日期的直方图或者柱状图，是时序数据分析中常用的聚合分析类型")]),t._v(" "),_("p",[_("img",{attrs:{src:"https://s3.ax1x.com/2020/12/30/rq8HVe.png",alt:"image-20201230002833090"}})]),t._v(" "),_("h2",{attrs:{id:"_3-2-bucket-metric-聚合分析"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-bucket-metric-聚合分析"}},[t._v("#")]),t._v(" 3.2 Bucket + Metric 聚合分析")]),t._v(" "),_("p",[t._v("Bucket 聚合分析允许通过添加子分析来进一步进行分析，该子分析可以是 Bucket 也可以是 Metric。这也使得 es 的聚合分析能力变得异常强大")]),t._v(" "),_("p",[t._v("例一：分桶后再分桶")]),t._v(" "),_("p",[_("img",{attrs:{src:"https://s3.ax1x.com/2020/12/30/rqGSr8.png",alt:"image-20201230003127395"}})]),t._v(" "),_("p",[t._v("例二：分桶后进行数据分析")]),t._v(" "),_("p",[_("img",{attrs:{src:"https://s3.ax1x.com/2020/12/30/rqGeMV.png",alt:"image-20201230003513621"}})]),t._v(" "),_("h1",{attrs:{id:"四、pipeline-聚合分析"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#四、pipeline-聚合分析"}},[t._v("#")]),t._v(" 四、Pipeline 聚合分析")]),t._v(" "),_("h2",{attrs:{id:"_4-1-pipeline-聚合介绍"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-pipeline-聚合介绍"}},[t._v("#")]),t._v(" 4.1 Pipeline 聚合介绍")]),t._v(" "),_("p",[t._v("针对聚合分析的结果再次进行聚合分析，而且支持链式调用。")]),t._v(" "),_("p",[t._v("可以回答如下问题：订单月平均销售额是多少？")]),t._v(" "),_("p",[_("img",{attrs:{src:"https://s3.ax1x.com/2020/12/30/rqGwIH.png",alt:"image-20201230003832151"}})]),t._v(" "),_("p",[t._v("上述聚合示例有3步")]),t._v(" "),_("ol",[_("li",[t._v("根据月份分桶，分到每个月份的营业额集合（"),_("code",[t._v("sales_per_month")]),t._v("）")]),t._v(" "),_("li",[t._v("对分桶的结果进行求和分析，计算出每个月的营业总额（"),_("code",[t._v("sales")]),t._v("）")]),t._v(" "),_("li",[t._v("对每月的营业总额求平均值（"),_("code",[t._v("avg_monthly_sales")]),t._v("，分析的是 "),_("code",[t._v("sales_per_month")]),t._v(" > "),_("code",[t._v("sales")]),t._v(" 下的结果）")])]),t._v(" "),_("p",[t._v("Pipeline 的分析结果会输出到原结果中，根据输出位置的不同，分为以下两类：")]),t._v(" "),_("ol",[_("li",[_("strong",[t._v("Sibling")]),t._v("：结果与现有聚合分析结果同级")]),t._v(" "),_("li",[_("strong",[t._v("Parent")]),t._v("：结果内嵌到现有的聚合分析结果中")])]),t._v(" "),_("h2",{attrs:{id:"_4-2-pipeline-聚合分类"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_4-2-pipeline-聚合分类"}},[t._v("#")]),t._v(" 4.2 Pipeline 聚合分类")]),t._v(" "),_("h3",{attrs:{id:"_4-2-1-sibling-pipeline"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_4-2-1-sibling-pipeline"}},[t._v("#")]),t._v(" 4.2.1 Sibling Pipeline")]),t._v(" "),_("p",[t._v("Sibling Pipeline 聚合结果与现有聚合分析结果同级，有以下几种聚合方式：")]),t._v(" "),_("table",[_("thead",[_("tr",[_("th",[t._v("聚合方式")]),t._v(" "),_("th",[t._v("作用")])])]),t._v(" "),_("tbody",[_("tr",[_("td",[t._v("max_bucket "),_("br"),t._v("min_bucket "),_("br"),t._v("avg_bucket "),_("br"),t._v("sum_bucket")]),t._v(" "),_("td",[t._v("求最值、平均值、求和")])]),t._v(" "),_("tr",[_("td",[t._v("stats_bucket "),_("br"),t._v("extended_stats_bucket")]),t._v(" "),_("td",[t._v("一系列统计数")])]),t._v(" "),_("tr",[_("td",[t._v("percentiles_bucket")]),t._v(" "),_("td",[t._v("百分位数统计")])])])]),t._v(" "),_("h4",{attrs:{id:"min-bucket"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#min-bucket"}},[t._v("#")]),t._v(" min_bucket")]),t._v(" "),_("p",[t._v("找出所有 Bucket 中值最小的 Bucket 名称和值")]),t._v(" "),_("p",[_("img",{attrs:{src:"https://s3.ax1x.com/2020/12/30/rqJ0mT.png",alt:"image-20201230005437480"}})]),t._v(" "),_("p",[t._v("以上示例表示：按 job 类型分组，求出每种 job 的平均工资，同时得出平均工资最少的一个桶")]),t._v(" "),_("blockquote",[_("p",[t._v("注意：这里请求的聚合名里，"),_("code",[t._v("avg_salary")]),t._v(" 在 "),_("code",[t._v("jobs")]),t._v(" 里面，而 "),_("code",[t._v("min_salary_by_job")]),t._v(" 和外层的 "),_("code",[t._v("jobs")]),t._v(" 同级")])]),t._v(" "),_("p",[t._v("min_bucket、avg_bucket、sun_bucket 用法类似")]),t._v(" "),_("h4",{attrs:{id:"stats-bucket"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#stats-bucket"}},[t._v("#")]),t._v(" stats_bucket")]),t._v(" "),_("p",[t._v("计算所有 Bucket 值的 Stats 分析")]),t._v(" "),_("p",[_("img",{attrs:{src:"https://s3.ax1x.com/2020/12/30/rqYnN4.png",alt:"image-20201230011325095"}})]),t._v(" "),_("h4",{attrs:{id:"percentiles-bucket"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#percentiles-bucket"}},[t._v("#")]),t._v(" percentiles_bucket")]),t._v(" "),_("p",[t._v("计算所有 Bucket 值的百分位数")]),t._v(" "),_("p",[_("img",{attrs:{src:"https://s3.ax1x.com/2020/12/30/rqYQ3R.png",alt:"image-20201230011512936"}})]),t._v(" "),_("h3",{attrs:{id:"_4-2-2-parent-pipeline"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_4-2-2-parent-pipeline"}},[t._v("#")]),t._v(" 4.2.2 Parent Pipeline")]),t._v(" "),_("p",[t._v("Parent Pipeline 聚合结果内嵌到现有的聚合分析结果中，有以下几种方式：")]),t._v(" "),_("table",[_("thead",[_("tr",[_("th",[t._v("聚合方式")]),t._v(" "),_("th",[t._v("作用")])])]),t._v(" "),_("tbody",[_("tr",[_("td",[t._v("derivative")]),t._v(" "),_("td",[t._v("导数")])]),t._v(" "),_("tr",[_("td",[t._v("moving_avg")]),t._v(" "),_("td",[t._v("移动平均值")])]),t._v(" "),_("tr",[_("td",[t._v("cumulative_sum")]),t._v(" "),_("td",[t._v("累积加和")])])])]),t._v(" "),_("h4",{attrs:{id:"derivative"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#derivative"}},[t._v("#")]),t._v(" derivative")]),t._v(" "),_("p",[t._v("计算Bucket值的导数")]),t._v(" "),_("p",[_("img",{attrs:{src:"https://s3.ax1x.com/2020/12/30/rqYsDf.png",alt:"image-20201230012107933"}})]),t._v(" "),_("blockquote",[_("p",[t._v("注意：这里请求的聚合名里，"),_("code",[t._v("avg_salary")]),t._v(" 在 "),_("code",[t._v("birth")]),t._v(" 里面，而 "),_("code",[t._v("derivative_avg_salary")]),t._v(" 和内层的 "),_("code",[t._v("avg_salary")]),t._v(" 同级，也在 "),_("code",[t._v("birth")]),t._v(" 里面")])]),t._v(" "),_("p",[t._v("moving_avg、cumulative_sum 用法类似")]),t._v(" "),_("h1",{attrs:{id:"五、作用范围"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#五、作用范围"}},[t._v("#")]),t._v(" 五、作用范围")]),t._v(" "),_("p",[t._v("es 聚合分析默认作用范围是 query 的结果集，可以通过如下的方式改变其作用范围")]),t._v(" "),_("ol",[_("li",[t._v("filter：基于主查询聚合分析")]),t._v(" "),_("li",[t._v("post_filter：聚合分析之后影响主查询")]),t._v(" "),_("li",[t._v("global：无视主查询，聚合分析所有文档")])]),t._v(" "),_("p",[_("img",{attrs:{src:"https://s3.ax1x.com/2020/12/30/rqtSr6.png",alt:"image-20201230012957015"}})]),t._v(" "),_("h2",{attrs:{id:"_5-1-filter"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_5-1-filter"}},[t._v("#")]),t._v(" 5.1 filter")]),t._v(" "),_("p",[t._v("为某个聚合分析设定过滤条件，从而在不更改整体 query 语句的情况下修改了作用范围，不影响主查询结果。")]),t._v(" "),_("p",[_("img",{attrs:{src:"https://s3.ax1x.com/2020/12/30/rqtAGd.png",alt:"image-20201230013252648"}})]),t._v(" "),_("p",[t._v("上述例子总体有两个聚合分析，"),_("code",[t._v("jobs_salary_small")]),t._v(" 和 "),_("code",[t._v("jobs")]),t._v("，两个聚合分析针对不同的query条件聚合分析。")]),t._v(" "),_("p",[_("code",[t._v("jobs")]),t._v(" 根据主查询分析，即没限制查询条件的所有文档。")]),t._v(" "),_("p",[_("code",[t._v("jobs_salary_small")]),t._v(" 在主查的基础上，增加了 "),_("code",[t._v("filter")]),t._v(" 条件，只分析工资范围是 "),_("code",[t._v("*-10000")]),t._v(" 的文档数据。")]),t._v(" "),_("p",[t._v("所以结果 "),_("code",[t._v("jobs")]),t._v(" 聚合组有 4 个 bucket，"),_("code",[t._v("jobs_salary_small")]),t._v(" 聚合组只有工资少于 10000 的两个 bucket。")]),t._v(" "),_("h2",{attrs:{id:"_5-2-post-filter"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_5-2-post-filter"}},[t._v("#")]),t._v(" 5.2 post-filter")]),t._v(" "),_("p",[t._v("作用于文档过滤，但在聚合分析后生效，影响主查询结果。")]),t._v(" "),_("p",[_("img",{attrs:{src:"https://s3.ax1x.com/2020/12/30/rqNCyq.png",alt:"image-20201230014319487"}})]),t._v(" "),_("p",[t._v("上述示例中，结果是先针对所有文档进行聚合分析，但是得到分析结果之后，会将主查询的 "),_("code",[t._v("hits")]),t._v(" 结果按照 "),_("code",[t._v("post_filter")]),t._v(" 的规则过滤，所以 "),_("code",[t._v("jobs")]),t._v(" 分析的结果中有所有的 bucket，但是主查询 "),_("code",[t._v("hits")]),t._v(" 结果中只有一个文档。")]),t._v(" "),_("h2",{attrs:{id:"_5-3-global"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_5-3-global"}},[t._v("#")]),t._v(" 5.3 global")]),t._v(" "),_("p",[t._v("无视 query 过滤条件，基于全部文档进行分析。")]),t._v(" "),_("p",[_("img",{attrs:{src:"https://s3.ax1x.com/2020/12/30/rqNK61.png",alt:"image-20201230014742832"}})]),t._v(" "),_("p",[t._v("上述示例中，有两个聚合分析，"),_("code",[t._v("java_avg_salary")]),t._v(" 和 "),_("code",[t._v("all")]),t._v("，"),_("code",[t._v("java_avg_salary")]),t._v(" 基于主查询 "),_("code",[t._v("query")]),t._v(" 进行聚合分析，"),_("code",[t._v("all")]),t._v(" 设置 "),_("code",[t._v("global")]),t._v("，无视主查询的 query 条件，对所有文档进行分析。")]),t._v(" "),_("h1",{attrs:{id:"六、排序"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#六、排序"}},[t._v("#")]),t._v(" 六、排序")]),t._v(" "),_("p",[t._v("可以使用自带的关键数据进行排序，比如：")]),t._v(" "),_("ul",[_("li",[_("code",[t._v("_count")]),t._v(" 文档数")]),t._v(" "),_("li",[_("code",[t._v("_key")]),t._v(" 按照 key 值排序")])]),t._v(" "),_("h1",{attrs:{id:"七、原理与精准度"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#七、原理与精准度"}},[t._v("#")]),t._v(" 七、原理与精准度")])])}),[],!1,null,null,null);_.default=e.exports}}]);