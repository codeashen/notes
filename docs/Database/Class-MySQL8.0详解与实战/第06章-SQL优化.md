优化SQL的一般步骤

![image-20210810190556395](https://z3.ax1x.com/2021/08/10/fYzkBd.png)

# 发现问题

常见问题发现渠道

- 用户主动上报应用性能问题
- 分析慢查询日志发现存在问题的SQL
- 数据库时实监控长时间运行的SQL

配置MySQL慢查询日志

慢查询日志默认是关闭的，通过以下配置开启慢查询日志。

```
set global slow_query_log = [ON|OFF] 
set global slow_query_log_file = /sql_log/slowlog.log 
set global long_query_time = xx.xxx 秒 
set global log_queries_not_using_indexes = [ON|OFF]
```

分析慢查询日志

有两种工具分析慢查询日志，官方的 `mysqldumpslow` 工具和第三方 `pt-query-digest` 工具。

- `mysqldumpslow [opts...] [logs...]`
- `pt-query-digest [options] [files] [dsn]`

安装