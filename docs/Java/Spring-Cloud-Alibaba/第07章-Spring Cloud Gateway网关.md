## 7.1 Spring Cloud Gateway简介

Spring Cloud Gateway是什么

- 是 Spring Cloud的网关(第二代)，未来会取代zuul(第一代)
- 基于Netty、 Reactor以及WebFluX构建

优点：

- 性能强劲
- 功能强大
- 设计优雅、易拓展

缺点：

- 依赖Netty与Webflux，不是 Servlet编程模型有一定的适应成本
- 不能在Servlet容器下工作，也不能构建成WAR包
- 不支持Spring boot 1.x

## 7.2 快速开始

创建一个新的maven项目

```xml
<!-- actuator -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>

<!-- nacos -->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
<!-- spring cloud gateway -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>
```

配置文件：

```yml
server:
  port: 8040

spring:
  application:
    name: gateway
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
        namespace: 01511f2b-269d-442f-8cde-91a6220ce63d
    gateway:
      discovery:
        locator:
          # 让gateway通过服务发现组件找到其他的微服务，从而自动转发请求
          enabled: true
          
management:
  endpoints:
    web:
      exposure:
        include: "*"
  endpoint:
    health:
      show-details: always
```

启动项目，就将可以通过gateway访问nacos上的微服务了。如访问 localhost:8040/user-center/users/1，就会转发到用户中心的 /users/1 的端点上。

> 根据以上配置，只要服务名匹配上，就会根据服务发现的服务名转发请求， 当服务注册有多个实例时，自动负载均衡
>
> localhost:8040/user-center/users/1   ----->   user-center服务的 /users/1 端点
>
> localhost:8040/content-center/shares/1   ----->   content-center服务的 /shares/1 端点

## 7.3 核心概念


- **Route(路由)**：Spring Cloud gateway的基础元素，可简单理解成一条转发的规则，包含：ID、目标URL、 Predicate集合以及Filter集合。
- **Predicate(谓词)**：即java.util.function.Predicate, Spring Cloud Gateway使用Predicate实现路由的匹配条件
- **Filter(过滤器)**：修改请求以及响应

路由配置示例：

```yml
spring:
  cloud:
    gateway:
      routes:
        - id: test_route 
        uri: https://www.baidu.com 
        predicates:
          - Path=/more
        filters:
          - AddRequestHeader=X-Request-Foo, Bar
```

> 上述配置表示当请求predicates指定的path时，会经过filter处理，然后再转发到uri上。
>
> 即：http://localhost:8040/more   ----->  https://baidu.com/more

> 注意：
>
> [快速开始](#7.2 快速开始) 处并没有使用这种配置方式，而是让gateway自动发现nacos上的服务，然后直接通过服务名实现转发。

## 7.4 工作方式

下图从总体上概述了Spring Cloud Gateway的工作方式：

![Spring Cloud Gateway Diagram](https://s3.ax1x.com/2021/03/04/6VBKWd.png)

客户端向Spring Cloud Gateway发出请求。如果Gateway Handler Mapping确定请求与路由匹配，则将其发送到Gateway Web Handler。该处理器通过特定于请求的过滤器链来运行请求。筛选器由虚线分隔的原因是，筛选器可以在发送代理请求之前和之后运行逻辑。所有前置过滤器逻辑均被执行。然后发出代理请求。发出代理请求后，将运行后置过滤器逻辑。

参考：[官方文档](https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/#gateway-how-it-works)

## 7.5 路由谓词工厂

### 7.5.1 内置谓词工厂

路由谓词工厂（Route Predicate Factories）

Spring Cloud Gateway将路由作为Spring WebFlux的`HandlerMapping`基础架构的一部分进行匹配。Spring Cloud Gateway包括许多内置的路由谓词工厂。所有这些谓词都与HTTP请求的不同属性匹配。您可以将多个路由谓词工厂与逻辑`and`语句结合使用。

![image-20210226165140539](https://s3.ax1x.com/2021/03/04/6VBQSA.png)

参考：

- [路由谓词工厂手记](https://www.imooc.com/article/290804)
- [官方文档](https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/#gateway-request-predicates-factories)

### 7.5.2 自定义谓词工厂

参考：[官方文档-自定义谓词工厂](https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/#writing-custom-route-predicate-factories)

1. 编写自定义谓词工厂配置类

   ```java
   /**
    * 自定义谓词的配置类，属性对应配置文件内容
    */
   @Data
   public class TimeBetweenConfig {
       /**
        * 开始时间
        */
       private LocalTime start;
       /**
        * 结束时间
        */
       private LocalTime end;
   }
   ```

2. 编写自定义谓词工厂

   ```java
   /**
    * 自定义谓词工厂，类名必须以 RoutePredicateFactory 结尾
    */
   @Component
   @Slf4j
   public class TimeBetweenRoutePredicateFactory extends AbstractRoutePredicateFactory<TimeBetweenConfig> {
       
       public TimeBetweenRoutePredicateFactory() {
           super(TimeBetweenConfig.class);
       }
   
       /**
        * 实现谓词判断的方法，谓词工厂核心方法
        * @param config 谓词工厂配置
        * @return 是否放行逻辑
        */
       @Override
       public Predicate<ServerWebExchange> apply(TimeBetweenConfig config) {
           LocalTime start = config.getStart();
           LocalTime end = config.getEnd();
           return exchange -> {
               LocalTime now = LocalTime.now();
               if (now.isAfter(start) && now.isBefore(end)) {
                   return true;
               } else {
                   log.warn("仅限{}到{}时间段内访问", start, end);
                   return false;
               }
           };
       }
   
       /**
        * 控制配置类（TimeBetweenConfig）属性和配置文件中配置项（TimeBetween）的映射关系
        */
       @Override
       public List<String> shortcutFieldOrder() {
           /*
            * 例如我们的配置项是：TimeBetween=上午9:00, 下午5:00
            * 那么按照顺序，start对应的是上午9:00；end对应的是下午5:00
            */
           return Arrays.asList("start", "end");
       }
   }
   ```

3. 配置文件

   ```yml
   spring:
     application:
       name: gateway
     cloud:
       nacos:
         discovery:
           server-addr: 127.0.0.1:8848
           namespace: 01511f2b-269d-442f-8cde-91a6220ce63d
       gateway:
         discovery:
           locator:
             # 让gateway通过服务发现组件找到其他的微服务，从而自动转发请求
             enabled: true
         routes: 
           - id: time-route
             uri: lb://user-center
             predicates:
               # 自定义谓词工厂，每天9点到18点才可以访问
               - TimeBetween=上午9:00,下午6:00
               
   ```

   >Tips:
   >
   >这里主要是配置了我们自定义的路由谓词工厂类名的前缀以及允许访问的时间段，这个时间格式不是随便配置的，而是Spring Cloud Gateway的默认时间格式，相关源码如下：
   >
   >- `org.springframework.format.support.DefaultFormattingConversionService#addDefaultFormatters`
   >
   >时间格式是可以注册的，关于时间格式注册的相关源码如下：
   >
   >- `org.springframework.format.datetime.standard.DateTimeFormatterRegistrar#registerFormatters`

启动gateway，访问`localhost:8040/users/1`，根据配置的 `uri: lb://user-center` 转发到user-center服务的 `/users/1`端点，并且时间若再自定义谓词工厂配置的时间端内，可以访问成功，否则404返回。

注意此时的请求地址上没有`/user-center`，这里要注意区分，如果带上了`user-center`无论何时都能请求成功，这是因为配置了`spring.cloud.gateway.discovery.locator.enabled=true`，具体原因：

- 使用`localhost:8040/user-center/users/1`访问

  使用的是`spring.cloud.gateway.discovery.locator.enabled=true`这个配置，通过配置中心找到user-center服务的实例，转发请求过去。并不会判断配置的谓词工厂规则。

- 使用`localhost:8040/users/1`访问

  会根据谓词工厂规则，如果在时间段内，就转发到`lb://user-center`对应的端点，走的是`routes`配置的规则。

## 7.6 网关过滤器工厂

### 7.6.1 内置过滤器工厂

网关过滤器工厂（GatewayFilter Factories）。路由过滤器允许以某种方式修改传入的HTTP请求或传出的HTTP响应。路由过滤器适用于==特定路由==。Spring Cloud Gateway包括许多内置的GatewayFilter工厂。

参考：

- [过滤器工厂手记](https://www.imooc.com/article/290816)
- [官方文档](https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/#gatewayfilter-factories)

###  自定义过滤器工厂

### 7.6.2 过滤器生命周期

**过滤器工厂生命周期**

- pre：Gateway转发请求之前
- post：Gateway转发请求之后

**自定义过滤器工厂方式**

- 方式一：继承 AbstractGatewayFilterFactory 

  - 参考示例：org.springframework.cloud.gateway.filter.factory.RequestSizeGatewayFilterFactory

  - 配置形式：

    ```yml
    spring:
      cloud:
        gateway:
          routes:
            filters:
              - name: RequestSize 
                args:
                  maxSize: 5000000
    ```

- 方式二：继承 AbstractNameValueGatewayFilterFactory

  - 参考示例：org.springframework.cloud.gateway.filter.factory.AddRequestHeaderGatewayFilterFactory

  - 配置形式：

    ```yml
    spring:
      cloud:
        gateway:
          routes:
            filters:
              - AddRequestHeader=S-Header,Bar
    ```

**核心API**

- `exchange.getRequest().mutate().xxx`：获取并修改request 
- `exchange.mutate().xxx`：修改exchange 
- `chain.filter(exchange)`：传递给下一个过滤器处理 
- `exchange.getResponse()`：拿到响应

**自定义过滤器工厂示例**

编写一个自定义过滤器工厂，功能就是记录日志

```java
/**
 * 自定义过滤器工厂，类名必须以 GatewayFilterFactory 结尾
 */
@Component
@Slf4j
public class PreLogGatewayFilterFactory extends AbstractNameValueGatewayFilterFactory {
    @Override
    public GatewayFilter apply(NameValueConfig config) {
        return (exchange, chain) -> {
            // 打印日志，获取配置文件配置的参数
            log.info("请求进来了，{}，{}", config.getName(), config.getValue());  //请求进来了，a，b

            // 获取并修改请求
            ServerHttpRequest modifiedRequest = exchange.getRequest()
                    .mutate()
                    .header("my-header", "header-value")
                    .build();
            // 修改exchange
            ServerWebExchange modifiedExchange = exchange.mutate()
                    .request(modifiedRequest)
                    .build();
            // 传递给下一个过滤器处理
            return chain.filter(modifiedExchange);
        };
    }
}
```

写配置

```yml
spring:
  application:
    name: gateway
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
        namespace: 01511f2b-269d-442f-8cde-91a6220ce63d
    gateway:
      discovery:
        locator:
          # 让gateway通过服务发现组件找到其他的微服务，从而自动转发请求
          enabled: true
      routes: 
        - id: user-center
          uri: lb://user-center
          predicates:
            # 自定义谓词工厂，每天9点到18点才可以访问
            - TimeBetween=上午9:00,下午6:00
          filters:
            # 自定义过滤器工厂
            - PreLog=a,b
```

参考：[官方文档-自定义过滤器工厂](https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/#writing-custom-gatewayfilter-factories)

## 7.7 全局过滤器

全局过滤器（GlobalFilter）和网关过滤器（GatewayFilter）有相同的特性，特殊之处在于他应用于==所有的路由==。

参考：

- [全局过滤器手记](https://www.imooc.com/article/290821)
- [官方文档](https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/#global-filters)

## 7.8 Gateway整合Sentinel

老版本Gateway支持整合Hystrix，不支持Sentinel，是使用过滤器工厂HystrixGatewayFilterFactory整合Hystrix的，可参考[过滤器工厂手记](https://www.imooc.com/article/290816)的HystrixGatewayFilterFactory小节。新版本的官方文档没有介绍这个过滤器，可看[2.2.7.RELEASE版本介绍](https://docs.spring.io/spring-cloud-gateway/docs/2.2.7.RELEASE/reference/html/#hystrix)。

新版本整合Sentinel  // todo

## 7.9 Gateway监控

通过/gateway执行器端点，可以监视Spring Cloud Gateway应用程序并与之交互。为了可远程访问，必须在应用程序属性中通过HTTP或JMX启用开放端点。

```properties
management.endpoint.gateway.enabled=true # 默认值
management.endpoints.web.exposure.include=gateway
```

下表列出了Spring Cloud Gateway执行器端点（每个端点都`/actuator/gateway`作为基本路径）：

| ID              | HTTP Method        | Description                                     |
| :-------------- | :----------------- | :---------------------------------------------- |
| `globalfilters` | GET                | 展示所有的全局过滤器                            |
| `routefilters`  | GET                | 展示所有的过滤器工厂（GatewayFilter factories） |
| `refresh`       | POST【无消息体】   | 清空路由缓存                                    |
| `routes`        | GET                | 展示路由列表                                    |
| `routes/{id}`   | GET                | 展示指定id的路由的信息                          |
| `routes/{id}`   | POST【消息体如下】 | 新增一个路由                                    |
| `routes/{id}`   | DELETE【无消息体】 | 删除一个路由                                    |

具体请求方式及消息体等，参考：

- [官方文档](https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/#actuator-api)
- [Gateway监控手记](https://www.imooc.com/article/290822)

## 7.10 Gateway排错

Gateway为有两种手段来排错

- 日志级别

  以下记录器可能在DEBUG和TRACE级别包含有价值的故障排除信息：

  - org.springframework.cloud.gateway
  - org.springframework.http.server.reactive
  - org.springframework.web.reactive
  - org.springframework.boot.autoconfigure.web
  - reactor.netty
  - redisratelimiter

- Wiretap

  Reactor Netty的`HttpClient`和`HttpServer`可具有窃听功能。当`reactor.netty`日志级别设置为`DEBUG`或结合使用时`TRACE`，它允许记录信息，例如通过网络发送和接收的header和body信息。要启用监听，请分别为`HttpServer`和`HttpClient`设置`spring.cloud.gateway.httpserver.wiretap=true`和`spring.cloud.gateway.httpclient.wiretap=true`。

参考：

- [官方文档](https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/#troubleshooting)
- [Gateway监控手记](https://www.imooc.com/article/290824)

## 7.11 过滤器执行顺序

1. **规则一：Order越小越靠前执行**

2. **规则二：过滤器工厂的Order按配置顺序从1开始递增**

   ![image-20210304113245526](https://s3.ax1x.com/2021/03/04/6VBlQI.png)

3. **规则三：如果配置了默认过滤器，则先执行相同Order的默认过滤器**

   ![image-20210304113032240](https://s3.ax1x.com/2021/03/04/6VB3OP.png)

   顺序：AddResponseHeader(X-Foo) --> AddResponseHeader(X-Header)  --> PrefixPath --> PreLog --> AddResponseHeader(Y-Header)

4. **规则四：如需自行控制Order，可返回OrderedGatewayFilter**

   ```java
   @Component
   @Slf4j
   public class PreLogGatewayFilterFactory extends AbstractNameValueGatewayFilterFactory {
       @Override
       public GatewayFilter apply(NameValueConfig config) {
           GatewayFilter gatewayFilter = (exchange, chain) -> {
               // 打印日志，获取配置文件配置的参数
               log.info("请求进来了，{}，{}", config.getName(), config.getValue());  //请求进来了，a，b
   
               // 获取并修改请求
               ServerHttpRequest modifiedRequest = exchange.getRequest()
                       .mutate()
                       .header("my-header", "header-value")
                       .build();
               // 修改exchange
               ServerWebExchange modifiedExchange = exchange.mutate()
                       .request(modifiedRequest)
                       .build();
               // 传递给下一个过滤器处理
               return chain.filter(modifiedExchange);
           };
   
           // （可选）用OrderedGatewayFilter包装，控制过滤器执行顺序，order数值小的先执行
           OrderedGatewayFilter filter = new OrderedGatewayFilter(gatewayFilter, 20);
           
           return filter;
       }
   }
   ```

相关源码：

- `org.springframework.cloud.gateway.route.RouteDefinitionRoutelocator#load GatewayFilters`：为过滤器设置 Order数值,从1开始
- `org.springframework.cloud.gateway.route.Route.DefinitionRoutelocator#getFilters`：加载默认过滤器&路由过滤器，对过滤器做了排序 
- `org.springframework.cloud.gateway.handler.FilteringWebHandler#handle`：构建过滤器链并执行

## 7.12 Gateway限流

该`RequestRateLimiter` `GatewayFilter`工厂采用的是`RateLimiter`实施以确定当前请求被允许继续进行。如果不是，`HTTP 429 - Too Many Requests`则返回状态（默认情况下）。

- [官方文档](https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/#the-requestratelimiter-gatewayfilter-factory)
- [Gateway限流手记](