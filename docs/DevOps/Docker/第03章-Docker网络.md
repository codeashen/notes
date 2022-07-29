# 一、网络知识回顾

![image-20210118180845255](https://s3.ax1x.com/2021/01/19/sghEPP.png)

共有IP和私有IP：

* Public IP：互联网上的唯一标识，可以访问internet
* Private IP：不可在互联网上使用，仅供机构内部使用

* A类：10.0.0.0-10.255.255.255(10.0.0.0/8）
* B类：172.16.0.0--172.31.255.255(172.16.0.0/12)
* C类：192.168.0.0--192.168.255.255(192.168.0.0/16)

网络地址转换（NAT）：既然私有地上不能在互联网上使用，就需要 NAT 技术。

![image-20210118182112952](https://s3.ax1x.com/2021/01/19/sghQVs.png)

# 二、Docker 容器通信

## 2.1 容器通信原理

Docker 容器互通

```shell
$ docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
6c7fa109641b        bridge              bridge              local
b489f385f6a5        host                host                local
d4eb15a0b172        none                null                local
```

docker 容器如何互相通信以及 docker 容器如何访问外网，如下图所示：

![image-20210118192320605](https://s3.ax1x.com/2021/01/19/sghlan.png)

- 容器间通信：docker 容器都连接到 docker0 bridge 上，通过 docker0 bridge 实现容器间的互相通信
- 容器与互联网通信：docker0 bridge 与物理机网卡间做网络地址转换，使用物理机的 ip 访问外网

## 2.2 容器之间的 link

使用容器名连通容器操作（实际用的不多）:

```shell
# 运行 mytomcat 链接到容器 mymysql
$ docker run -d --name mytomcat --link mymysql
# 进入 mytomcat 容器
$ docker exec -it mytomcat /bin/bash
# 使用容器名称 ping，发现可以 ping 通
$ ping mymysql
```

## 2.3 容器的端口映射

```shell
# 启动 nginx，使用 -p 参数将容器内 80 端口映射到本地 10080 端口
$ docker run -p 10080:80 nginx
```

这样就可以在外部环境，通过访问 docker 宿主机映射的端口来访问容器内的应用。

![image-20210118195933222](https://s3.ax1x.com/2021/01/19/sgh8P0.png)
