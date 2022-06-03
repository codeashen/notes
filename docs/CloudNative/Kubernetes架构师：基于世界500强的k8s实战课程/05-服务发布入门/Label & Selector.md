[TOC]

# Label 和 Selector

- Label：对k8s中各种资源进行分类、分组，添加一个具有特别属性的一个标签
- Selector：通过一个过滤的语法进行查找到对应标签的资源

当Kubernetes对系统的任何API对象如Pod和节点进行“分组”时，会对其添加Label（key=value形式的“键-值对”）用以精准地选择对应的API对象。而Selector（标签选择器）则是针对匹配对象的查询方法。注：键-值对就是key-value pair。

例如，常用的标签tier可用于区分容器的属性，如frontend、backend；或者一个release_track用于区分容器的环境，如canary、production等。

>  💡 需要特别注意的是，对被 Deployment 等高级资源管理的 Pod，手动添加或修改的标签是临时的，下次滚动更新就会恢复。持久修改应该通过 Deployment 等方式修改。

# 定义 Label

应用案例：

公司与 xx 银行有一条专属的高速光纤通道，此通道只能与 192.168.7.0 网段进行通信，因此只能将与 xx 银行通信的应用部署到 192.168.7.0 网段所在的节点上，此时可以对节点进行 Label（即加标签）：

```xml
[root@k8s-master01 ~]# kubectl label node k8s-node02 region=subnet7
node/k8s-node02 labeled
```

然后，可以通过 Selector 对其筛选：

```xml
[root@k8s-master01 ~]# kubectl get no -l region=subnet7
NAME         STATUS   ROLES    AGE     VERSION
k8s-node02   Ready    <none>   3d17h   v1.17.3
```

最后，在 Deployment 或其他控制器中指定将 Pod 部署到该节点

```yaml
containers:
  ......
dnsPolicy: ClusterFirst
nodeSelector:
  region: subnet7
restartPolicy: Always
......
```

也可以用同样的方式对 Service 进行 Label：

```xml
[root@k8s-master01 ~]# kubectl label svc canary-v1 -n canary-production env=canary version=v1
service/canary-v1 labeled
```

查看 Labels：

```xml
[root@k8s-master01 ~]# kubectl get svc -n canary-production --show-labels
NAME        TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE   LABELS
canary-v1   ClusterIP   10.110.253.62   <none>        8080/TCP   24h   env=canary,version=v1
```

还可以查看所有 Version 为 v1 的 svc

```xml
[root@k8s-master01 canary]# kubectl get svc --all-namespaces -l version=v1
NAMESPACE           NAME        TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
canary-production   canary-v1   ClusterIP   10.110.253.62   <none>        8080/TCP   25h
```

其他资源的 Label 方式相同。

# Selector 条件匹配

Selector 主要用于资源的匹配，只有符合条件的资源才会被调用或使用，可以使用该方式对集群中的各类资源进行分配。

假如对 Selector 进行条件匹配，目前已有的 Label 如下：

```xml
[root@k8s-master01 ~]# kubectl get svc --show-labels
NAME          TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE     LABELS
details       ClusterIP   10.99.9.178      <none>        9080/TCP   45h     app=details
kubernetes    ClusterIP   10.96.0.1        <none>        443/TCP    3d19h   component=apiserver,provider=kubernetes
nginx         ClusterIP   10.106.194.137   <none>        80/TCP     2d21h   app=productpage,version=v1
nginx-v2      ClusterIP   10.108.176.132   <none>        80/TCP     2d20h   <none>
productpage   ClusterIP   10.105.229.52    <none>        9080/TCP   45h     app=productpage,tier=frontend
ratings       ClusterIP   10.96.104.95     <none>        9080/TCP   45h     app=ratings
reviews       ClusterIP   10.102.188.143   <none>        9080/TCP   45h     app=reviews
```

选择 app 为 reviews 或者 productpage 的 svc：

```xml
[root@k8s-master01 ~]# kubectl get svc -l  'app in (details, productpage)' --show-labels
NAME          TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE     LABELS
details       ClusterIP   10.99.9.178      <none>        9080/TCP   45h     app=details
nginx         ClusterIP   10.106.194.137   <none>        80/TCP     2d21h   app=productpage,version=v1
productpage   ClusterIP   10.105.229.52    <none>        9080/TCP   45h     app=productpage,tier=frontend
```

选择 app 为 productpage 或 reviews 但不包括 version=v1 的 svc：

```xml
[root@k8s-master01 ~]# kubectl get svc -l  version!=v1,'app in (details, productpage)' --show-labels
NAME          TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE   LABELS
details       ClusterIP   10.99.9.178     <none>        9080/TCP   45h   app=details
productpage   ClusterIP   10.105.229.52   <none>        9080/TCP   45h   app=productpage,tier=frontend
```

选择包含 label 名为 app 的 svc，不限制 label 值：

```xml
[root@k8s-master01 ~]# kubectl get svc -l app --show-labels
NAME          TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE     LABELS
details       ClusterIP   10.99.9.178      <none>        9080/TCP   45h     app=details
nginx         ClusterIP   10.106.194.137   <none>        80/TCP     2d21h   app=productpage,version=v1
productpage   ClusterIP   10.105.229.52    <none>        9080/TCP   45h     app=productpage,tier=frontend
ratings       ClusterIP   10.96.104.95     <none>        9080/TCP   45h
```

# 修改 Label

在实际使用中，Label 的更改是经常发生的事情，可以使用 `--overwrite` 参数修改标签。

修改标签，比如将 version=v1 改为 version=v2：

```xml
[root@k8s-master01 canary]# kubectl get svc -n canary-production --show-labels
NAME        TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE   LABELS
canary-v1   ClusterIP   10.110.253.62   <none>        8080/TCP   26h   env=canary,version=v1
[root@k8s-master01 canary]# kubectl label svc canary-v1 -n canary-production version=v2 --overwrite
service/canary-v1 labeled
[root@k8s-master01 canary]# kubectl get svc -n canary-production --show-labels
NAME        TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE   LABELS
canary-v1   ClusterIP   10.110.253.62   <none>        8080/TCP   26h   env=canary,version=v2
```

# 删除 Label

删除标签，比如删除 version：

```xml
[root@k8s-master01 canary]# kubectl label svc canary-v1 -n canary-production version-
service/canary-v1 labeled
[root@k8s-master01 canary]# kubectl get svc -n canary-production --show-labels
NAME        TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE   LABELS
canary-v1   ClusterIP   10.110.253.62   <none>        8080/TCP   26h   env=canary
```

# 附录：相关官方文档

- [Label 和 Selector](https://kubernetes.io/zh/docs/concepts/overview/working-with-objects/labels/)