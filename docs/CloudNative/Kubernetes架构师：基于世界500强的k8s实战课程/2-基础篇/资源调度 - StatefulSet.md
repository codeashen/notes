[TOC]

# 有状态应用管理 StatefulSet

StatefulSet（有状态集，缩写为 sts）常用于部署有状态的且需要有序启动的应用程序，比如在进行 SpringCloud 项目容器化时，Eureka 的部署是比较适合用 StatefulSet 部署方式的，可以给每个 Eureka 实例创建一个唯一且固定的标识符，并且每个 Eureka 实例无需配置多余的 Service，其余 SpringBoot 应用可以直接通过 Eureka 的 Headless Service 即可进行注册。

Eureka 的 statefulset 的资源名称是 eureka，eureka-0 eureka-1 eureka-2

Service：headless service，没有 ClusterIP       eureka-svc

Eureka-0.eureka-svc.NAMESPACE_NAME eureka-1.eureka-svc …

# StatefulSet 的基本概念

StatefulSet 主要用于管理有状态应用程序的工作负载 API 对象。比如在生产环境中，可以部署 ElasticSearch 集群、MongoDB 集群或者需要持久化的 RabbitMQ 集群、Redis 集群、Kafka 集群和 ZooKeeper 集群等。

和 Deployment 类似，一个 StatefulSet 也同样管理着基于相同容器规范的 Pod。不同的是，StatefulSet 为每个 Pod 维护了一个粘性标识。这些 Pod 是根据相同的规范创建的，但是不可互换，每个 Pod 都有一个持久的标识符，在重新调度时也会保留，一般格式为 StatefulSetName-Number。比如定义一个名字是 Redis-Sentinel 的 StatefulSet，指定创建三个 Pod，那么创建出来的Pod名字就为 Redis-Sentinel-0、Redis-Sentinel-1、Redis-Sentinel-2。而 StatefulSet 创建的 Pod 一般使用 Headless Service（无头服务）进行通信，和普通的 Service 的区别在于 Headless Service 没有 ClusterIP，它使用的是 Endpoint 进行互相通信，Headless 一般的格式为：

```
{statefulSetName}-{0..N-1}.{serviceName}.{namespace}.svc.cluster.local
```

说明：

- statefulSetName 为 StatefulSet 的名字；
- .N-1 为 Pod 所在的序号，从 0 开始到 N-1；
- serviceName 为 Headless Service 的名字，创建 StatefulSet 时，必须指定 Headless Service 名称；
- namespace 为服务所在的命名空间；
- .cluster.local 为 Cluster Domain（集群域）。

下面通过一个例子看下 StatefulSet 的应用场景。

假如公司某个项目需要在 Kubernetes 中部署一个主从模式的 Redis，此时使用 StatefulSet 部署就极为合适，因为 StatefulSet 启动时，只有当前一个容器完全启动时，后一个容器才会被调度，并且每个容器的标识符是固定的，那么就可以通过标识符来断定当前 Pod 的角色。

比如用一个名为 redis-ms 的 StatefulSet 部署主从架构的 Redis，第一个容器启动时，它的标识符为 redis-ms-0，并且 Pod 内主机名也为 redis-ms-0，此时就可以根据主机名来判断，当主机名为 redis-ms-0 的容器作为 Redis 的主节点，其余从节点，那么 Slave 连接 Master 主机配置就可以使用不会更改的 Master 的 Headless Service，此时 Redis 从节点（Slave）配置文件如下：

```yaml
port 6379
slaveof redis-ms-0.redis-ms.public-service.svc.cluster.local 6379
tcp-backlog 511
timeout 0
tcp-keepalive 0
……
```

其中 `redis-ms-0.redis-ms.public-service.svc.cluster.local` 是 Redis Master 的 Headless Service，**在同一命名空间下只需要写 `redis-ms-0.redis-ms` 即可，后面的 `public-service.svc.cluster.local` 可以省略**。

# StatefulSet 注意事项

一般 StatefulSet 用于有以下一个或者多个需求的应用程序：

- 需要稳定的独一无二的网络标识符。
- 需要持久化数据。
- 需要有序的、优雅的部署和扩展。
- 需要有序的自动滚动更新。

如果应用程序不需要任何稳定的标识符或者有序的部署、删除或者扩展，应该使用无状态的控制器部署应用程序，比如 Deployment 或者 ReplicaSet。

Pod 所用的存储必须由 PersistentVolume Provisioner（持久化卷配置器）根据请求配置 StorageClass，或者由管理员预先配置，当然也可以不配置存储。

为了确保数据安全，删除和缩放 StatefulSet 不会删除与 StatefulSet 关联的卷，可以手动选择性地删除 PVC 和 PV。

StatefulSet 目前使用 Headless Service（无头服务）负责 Pod 的网络身份和通信，需要提前创建此服务。

删除一个 StatefulSet 时，不保证对 Pod 的终止，要在 StatefulSet 中实现 Pod 的有序和正常终止，可以在删除之前将 StatefulSet 的副本缩减为 0。

# 定义一个 StatefulSet 资源文件

定义一个简单的 StatefulSet 的示例如下：

```yaml
#### 定义一个 Service
apiVersion: v1
kind: Service
metadata:
  name: nginx
  labels:
    app: nginx
spec:
  ports:
  - port: 80
    name: web
  clusterIP: None  # 设置为 None，可以通过 Headless Service 访问到 sts 的 pod
  selector:
    app: nginx
---
#### 定义一个 StatefulSet
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: web
spec:
  serviceName: "nginx"  # StatefulSet 必须要配置 serviceName，指向一个已经存在的 service
  replicas: 2
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx
        ports:
        - containerPort: 80
          name: web
```

> *此示例没有添加存储配置，后面的章节会单独讲解存储相关的知识点*

其中：

- `kind:  Service` 定义了一个名字为 *Nginx* 的 Headless Service，创建的 Service 格式为 nginx-0.nginx.default.svc.cluster.local，其他的类似，因为没有指定 Namespace（命名空间），所以默认部署在 default。
- `kind: StatefulSet` 定义了一个名字为 *web* 的 StatefulSet，replicas 表示部署 Pod 的副本数，本实例为 2。

在 StatefulSet 中必须设置 Pod 选择器（.spec.selector）用来匹配其标签（.spec.template.metadata.labels）。在 1.8 版本之前，如果未配置该字段（.spec.selector），将被设置为默认值，在 1.8 版本之后，如果未指定匹配 Pod Selector，则会导致 StatefulSet 创建错误。

当 StatefulSet 控制器创建 Pod 时，它会添加一个标签 [statefulset.kubernetes.io/pod-name，该标签的值为](http://statefulset.kubernetes.io/pod-name，该标签的值为) Pod 的名称，用于匹配 Service。

# StatefulSet 创建和扩缩容

创建一个sts

```xml
[root@k8s-master01 ~]# kubectl create -f nginx-sts.yaml # -n namespace_name
service/nginx created
statefulset.apps/web created
```

更改副本数为3

```xml
[root@k8s-master01 ~]# kubectl scale --replicas=3 sts web
```

创建以及缩容过程，都是先按序号从小到大创建 pod。如先创建 web-0，等 web-0 启动成功才会去创建 web-0，期间如果前面的 pod 被手动删除或者挂掉，会先启动前面的 pod，再创建新的 pod。

缩容操作按序号从大到小删除 pod。

> - [顺序创建 Pod](https://kubernetes.io/zh/docs/tutorials/stateful-application/basic-stateful-set/#顺序创建-pod)
> - [扩容/缩容 StatefulSet](https://kubernetes.io/zh/docs/tutorials/stateful-application/basic-stateful-set/#扩容-缩容-statefulset)

# 更新 StatefulSet

通过 `kubectl get sts web -o yaml` 查看 sts 的 yaml，可以看到 `.spec.updateStrategy` 中配置的更新策略。

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  creationTimestamp: "2020-09-19T07:46:49Z"
  generation: 5
  name: web
  namespace: default
spec:
  podManagementPolicy: OrderedReady
  replicas: 2
  revisionHistoryLimit: 10
  selector:
    matchLabels:
      app: nginx
  serviceName: nginx
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: nginx
    spec:
      containers:
      - image: nginx:1.15.2
        imagePullPolicy: IfNotPresent
        name: nginx
        ports:
        - containerPort: 80
          name: web
          protocol: TCP
        resources: {}
        terminationMessagePath: /dev/termination-log
        terminationMessagePolicy: File
      dnsPolicy: ClusterFirst
      restartPolicy: Always
      schedulerName: default-scheduler
      securityContext: {}
      terminationGracePeriodSeconds: 30
  **updateStrategy:
    rollingUpdate:
      partition: 0
    type: RollingUpdate**
```

通过 `.spec.updateStrategy` 字段配置 StatefulSet 的更新策略，有两个选项：

- `RollingUpdate`：对 StatefulSet 中的 Pod 执行自动的滚动更新。默认的更新策略。
- `OnDelete`：不会自动更新 StatefulSet 中的 Pod，必须手动删除 Pod 让控制器创建新的 Pod，以此来更新。

**滚动更新**

当使用 `RollingUpdate` 更新策略时， StatefulSet 控制器会删除和重建 StatefulSet 中的每个 Pod。它将按照 Pod 序号从大到小，每次更新一个 Pod。

Kubernetes 控制面会等到被更新的 Pod 进入 Running 和 Ready 状态，然后再更新其前身。 如果你设置了 `.spec.minReadySeconds`（查看[最短就绪秒数](https://kubernetes.io/zh/docs/concepts/workloads/controllers/statefulset/#minimum-ready-seconds)），控制面在 Pod 就绪后会额外等待一定的时间再执行下一步。

**分区滚动更新**

通过声明 `.spec.updateStrategy.rollingUpdate.partition` 的方式，`RollingUpdate` 更新策略可以实现分区。

如果配置了 `partition`，当 StatefulSet 的更新时， 所有序号大于等于 `partition` 的 Pod 都会被更新。 所有序号小于该分区序号的 Pod 都不会被更新，并且，即使他们被删除也会依据之前的版本进行重建。 如果 `partition` 大于它的副本数，则更新不会被应用。

阶段更新和金丝雀发布时，可能用到分区滚动更新。

# 删除 StatefulSet

StatefulSet 同时支持级联和非级联删除。使用非级联方式删除 StatefulSet 时，StatefulSet 的 Pod 不会被删除。使用级联删除时，StatefulSet 和它的 Pod 都会被删除。

使用 `kubectl delete statefulset web --cascade=orphan` 来实现非级联删除，省略 `--cascade=orphan` 默认为级联删除。

非级联删除后，剩余的 pod 没有 sts 管理成为孤儿 pod，此时手动删除 pod 不会再重建了。

更多参考：[删除 StatefulSet](https://kubernetes.io/zh/docs/tutorials/stateful-application/basic-stateful-set/#删除-statefulset)

# 附录：相关官方文档

- [StatefulSet 概念](https://kubernetes.io/zh/docs/concepts/workloads/controllers/statefulset/)
- [StatefulSet 基础](https://kubernetes.io/zh/docs/tutorials/stateful-application/basic-stateful-set/)
- [Headless Service](https://kubernetes.io/zh/docs/concepts/services-networking/service/#headless-services)
- [扩缩 StatefulSet](https://kubernetes.io/zh/docs/tasks/run-application/scale-stateful-set/)
- [删除 StatefulSet](https://kubernetes.io/zh/docs/tasks/run-application/delete-stateful-set/)