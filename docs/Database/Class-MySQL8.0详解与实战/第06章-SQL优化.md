优化SQL的一般步骤

![image-20210810190556395](https://z3.ax1x.com/2021/08/10/fYzkBd.png)

# 一、发现问题

常见问题发现渠道

- 用户主动上报应用性能问题
- 分析慢查询日志发现存在问题的SQL
- 数据库时实监控长时间运行的SQL

配置MySQL慢查询日志

慢查询日志默认是关闭的，通过以下配置开启慢查询日志。

```sql
set global slow_query_log = [ON|OFF] 
set global slow_query_log_file = /sql_log/slowlog.log 
set global long_query_time = xx.xxx 秒 
set global log_queries_not_using_indexes = [ON|OFF]
```

分析慢查询日志

有两种工具分析慢查询日志，官方的 `mysqldumpslow` 工具和第三方 `pt-query-digest` 工具。

- `mysqldumpslow [opts...] [logs...]`
- `pt-query-digest [options] [files] [dsn]`

-----------------

# 二、执行计划

为什么要关注执行计划

- 了解 SQL 如何访问表中的数据
- 了解 SQL 如何使用表中的索引
- 了解 SQL 所使用的查询类型

```sql
EXPLAIN SELECT course_id, title, study_cnt FROM imc_course WHERE study_cnt > 3000;
```

![image-20210811235755890](https://z3.ax1x.com/2021/08/11/fdKw4I.png)

## id

`id` 表示查询执行的顺序。

- id 相同时由上到下执行，id 不同时，由大到小执行
- id 为 NULL 表示数据是由另外两个查询进行 union 操作后产生的结果集

示例一：id 相同的情况

```sql
EXPLAIN SELECT course_id, class_name, level_name, title, study_cnt 
FROM imc_course a 
JOIN imc_class b ON b.class_id = a.class_id 
JOIN imc_level c ON c.level_id = a.level_id 
WHERE study_cnt > 3000；
```

![image-20210811235733016](https://z3.ax1x.com/2021/08/11/fdKdUA.png)

示例二：id 不同的情况

```sql
EXPLAIN SELECT a.course_id, a.title
FROM imc_course a 
WHERE a.course_id NOT IN (
	SELECT course_id FROM imc_chapter b
);
```

![image-20210812000727550](https://z3.ax1x.com/2021/08/12/fdKf5n.png)

## select_type

`select_type` 顾名思义，表示所执行查询的类型。

| 值                 | 含义                                                         |
| ------------------ | ------------------------------------------------------------ |
| simple             | 不包含子查询或是 union 操作的查询                            |
| primary            | 查询中如果包含任何子查询，那么最外层的查询则被标记为 primary |
| subquery           | select 列表中的子查询                                        |
| dependent subquery | 依赖外部结果的子查询                                         |
| union              | union 操作的第二个或是之后的查询的值为 union                 |
| dependent union    | 当 union 做为子查询时，第二或是第二个后的查询的 select_type 值 |
| union result       | union 产生的结果集                                           |
| derived            | 出现在 from 子句中的子查询                                   |

```sql
EXPLAIN 
SELECT course_id, class_name, level_name, title, study_cnt 
FROM imc_course a 
JOIN imc_class b ON b.class_id = a.class_id 
JOIN imc_level c ON c.level_id = a.level_id 
WHERE study_cnt > 3000
UNION
SELECT course_id, class_name, level_name, title, study_cnt
FROM imc_course a
JOIN imc_class b ON b.class_id = a.class_id
JOIN imc_level c ON c.level_id = a.level_id
WHERE class_name = 'MySQL';
```

![image-20210812002211211](https://z3.ax1x.com/2021/08/12/fdMUMT.png)

以上例子中，id 为 1 的查询表示 union 操作的第一个查询，类型为 primary；id 为 2 的查询为 union 操作的第二个查询，类型为 union；id 为 null 的查询表示结果是由两个查询的结果集 union 得到的。

## table

`table` 表示执行计划中，表示是从哪个表中获取数据。

- `<unionM，N>` 表示由 id 为 M，N 查询 union 产生的结果集
- `<derived N>`, `<subquery N>` 表示数据从 id 为 N 的查询产生临时表中获取

## partitions

`partitions` 只有才查询分区表时才有意义。

- 对于分区表，显示查询的分区 id
- 对于非分区表，显示 NULL

## type

`type` 表示查询使用的关联类型，性能从高到低如下表所示。

| 值          | 含义                                                         |
| ----------- | ------------------------------------------------------------ |
| system      | 这是 const 联接类型的一个特例，当查询的表只有一行时使用      |
| const       | 表中有且只有一个匹配的行时使用，如对主键或是唯一索引的查询，这是效率最高的联接方式 |
| eq_ref      | 唯一索或主键引查找，对于每个索引键，表中只有一条记录与之匹配 |
| ref         | 非唯一索引查找，返回匹配某个单独值的所有行                   |
| ref_or_null | 类似于 ref 类型的查询，但是附加了对 NULL 值列的查询          |
| index_merge | 该联接类型表示使用了索引合并优化方法                         |
| range       | 索引范围扫描，常见于 between、>、< 这样的查询条件            |
| index       | FULL Index Scan 全索引扫描，同 ALL 的区别是，遍历的是索引树  |
| ALL         | FULL Table Scan 全表扫描，这是效率最差的联接方式             |

> 对于 index_merge 类型：
>
> 一般情况下 MySQL 在查询中只能使用一个索引，在 MySQL 5.6 之后支持了索引合并，即 MySQL 可以使用多个索引来查询数据后，再进行合并优化。但是从上表中可以看到，这种查询方式性能并不高。

## possible_key，key，key_len

- `possible_key`：表示查询中可能会用到的索引。是基于查询使用的列和过滤条件进行判断的，查询中的列所涉及到的索引都会被列出来，但是未必会被使用到，possible_key 展示了可能用到的索引。
- `key`：表示查询中实际用到的索引。
- `key_len`：表示实际使用索引的最大长度。可以区分联合索引的使用情况，长度是由表中定义的字段长度决定的，如 varchar(20)，并不是行中存储数据的实际长度。这也是强调尽量将字段长度定义的小一些，因为会直接影响到 SQL 执行计划的生成。

## ref

`ref` 表示那些列或常量被用于索引查找。如果查询中没有用到任何索引，则 ref 为 NULL。

## row

`row` 有两个方面的含义

- 跟据统计信息预估的扫描的行数。
- 关联查询中 row 值也代表内嵌循环的次数，在内嵌循环算法中，每获取一个匹配的值，都要对目标表进行一次查找，所以循环次数越多，性能也就越差。

row 是一个预估值，并不准确。

## filtered

`filtered` 表示预估返回结果的行数占需扫描行数的百分比。也是一个预估值，所以并不准确，但是可以一定程度上评估查询性能。filtered 的百分比越高表示性能越好。

## extra

`extra` 包含了一些不适合在其他列展示的额外信息，常见的值如下表：

| 值                            | 含义                                                         |
| ----------------------------- | ------------------------------------------------------------ |
| Distinct                      | 优化 distinct 操作，在找到第一匹配的元组后即停止找同样值的动作。 |
| Not exists                    | 使用 not exists 来优化查询。                                 |
| Using filesort                | 使用文件来进行排序，通常会出现在 order by 或 group by 查询中。<br/>这个值的出现表示 MySQL 需要使用外部索引来进行排序，而不是直接按照索引的顺序从表中获取数据的。 |
| Using index                   | 使用了覆盖索引进行查询。                                     |
| Using temporary               | MySQL 需要使用临时表来缓存数据，常见于排序，子查询，和分组查询。<br>出现了这个值，需要重点关注，因为需要临时表，性能不好。 |
| Using where                   | MySQL 服务器层需要使用 WHERE 条件来对获取到的数据进行过滤。  |
| select tables optimized laway | 表示可以直接通过索引来获得数据，不用访问表。                 |

> 覆盖索引：查询所需要的所有信息，都可以通过索引获取，不用回表查询。



