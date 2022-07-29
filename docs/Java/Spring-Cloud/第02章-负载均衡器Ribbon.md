![image-20201130131907133](https://s3.ax1x.com/2020/12/01/DWXtte.png)

## Ribbon概述

### Ribbon简介

* Ribbon是客户端负载均衡器
* Ribbon核心功能：服务发现
* Ribbon核心功能：服务选择规则
* Ribbon核心功能：服务监听

![image-20201201105530735](https://s3.ax1x.com/2020/12/02/DI9LJ1.png)

### Ribbon依赖

```xml
<!-- Ribbon依赖 -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-hystrix-dashboard</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

## Ribbon与Eureka整合

* Ribbon天然与Eureka无缝整合
* 通过@LoadBalance提供负载均衡支持
* 通过ribbon.eureka.enabled=false禁用Eureka

## Ribbon核心

### Ribbon核心之IRule

* IRule通过特定算法选取要访问的服务
* IRule常使用BestAvailableRule和WeightedResponseTimeRule

![image-20201130171356363](https://s3.ax1x.com/2020/12/01/DWXd1A.png)

### Ribbon核心之IPing

* IPing是Ribbon保证服务可用的基石
* 常见实现：NIWSDiscoveryPing、PingUrl

![image-20201130173607564](https://s3.ax1x.com/2020/12/01/DWX0Xt.png)

### Ribbon核心之ServerList

* ServerList是Ribbon存储的可用服务列表
* ServerList可以手动设置
* ServerList常见应用是从Eureka中自动获取

## Ribbon参数配置

* 默认参数配置：DefaultClientConfigImpl
* Ribbon key定义：CommonClientConfigKey
* Ribbon参数分为全局配置和指定客户端配置
* 参数格式：`<client>.ribbon.<key>=<value>`