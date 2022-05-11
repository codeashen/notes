[TOC]

Horizontal Pod Autoscaler：Pod的水平自动伸缩器。 观察Pod的CPU、内存使用率自动扩展或缩容Pod的数量。 不适用于无法缩放的对象，比如DaemonSet。

```
CPU、内存
自定义指标的扩缩容。
```

必须定义 Requests参数，必须安装metrics-server。

# 使用 HPA

创建 HPA

```bash
# CPU达到20%就自动扩容，最少2个，最多5个
kubectl autoscale deployment demo-nginx --cpu-percent=20 --min=2 --max=5
```

查看 HPA

```bash
kubectl get hpa
```

# 附录：相关官方文档

- [Horizontal Pod Autoscaling](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)
- [Horizontal Pod Autoscaler 演练](https://kubernetes.io/zh/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/)