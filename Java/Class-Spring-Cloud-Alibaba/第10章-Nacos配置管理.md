## 9.1 配置管理介绍

为什么要实现配置管理?

- 不同环境，不同配置
- 配置属性动态刷新

![image-20210308103619781](C:\Users\wanggaosheng\AppData\Roaming\Typora\typora-user-images\image-20210308103619781.png)

## 9.2 配置示例

nacos配置管理的配置文件是bootstrap.yml，其中也有server-addr配置，这是因为Spring Cloud Alibaba将服务发现和配置管理区分开了，nacos服务发现的集群和nacos配置管理的集群可以分离，这样职责单一，性能也更好。

加依赖

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
</dependency>
```

写配置，resource目录下新建bootstrap.yml文件

```yml
spring:
  cloud:
    nacos:
      config:
        server-addr: 127.0.0.1:8848
        file-extension: yaml

  application:
    name: content-center
  profiles:
    active: dev
```

配置，nacos配置约定，对应的地方必须一样

![image-20210305175109417](https://s3.ax1x.com/2021/03/08/6Qe76S.png)

在 Nacos Spring Cloud 中，`dataId` 的完整格式如下：

```plain
${prefix}-${spring.profiles.active}.${file-extension}
```

- `prefix` 默认为 `spring.application.name` 的值，也可以通过配置项 `spring.cloud.nacos.config.prefix`来配置。

- `spring.profiles.active` 即为当前环境对应的 profile。 

  > **注意：当 `spring.profiles.active` 为空时，对应的连接符 `-` 也将不存在，dataId 的拼接格式变成 `${prefix}.${file-extension}`**

- `file-exetension` 为配置内容的数据格式，可以通过配置项 `spring.cloud.nacos.config.file-extension` 来配置。目前只支持 `properties` 和 `yaml` 类型。

上图是通过控制台操作配置，也可以通过调用API操作配置。Spring Boot和Spring Cloud等使用示例，参考官网示例。配置历史版本回滚见控制台对应页面即可。

参考：

- [官网文档](https://nacos.io/zh-cn/docs/quick-start-spring-cloud.html)
- [Spring官方文档](https://spring-cloud-alibaba-group.github.io/github-pages/hoxton/en-us/index.html#_spring_cloud_alibaba_nacos_config)

