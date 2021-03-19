## 3.1 网络知识回顾

![image-20210118180845255](https://s3.ax1x.com/2021/01/19/sghEPP.png)

共有IP和私有IP：

* Public IP：互联网上的唯一标识，可以访问internet
* Private IP：不可在互联网上使用，仅供机构内部使用

* A类：10.0.0.0-10.255.255.255(10.0.0.0/8）
* B类：172.16.0.0--172.31.255.255(172.16.0.0/12)
* C类：192.168.0.0--192.168.255.255(192.168.0.0/16)

网络地址转换NAT

![image-20210118182112952](https://s3.ax1x.com/2021/01/19/sghQVs.png)

## 3.2 Docker容器通信

Docker容器互通

```shell
$ docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
6c7fa109641b        bridge              bridge              local
b489f385f6a5        host                host                local
d4eb15a0b172        none                null                local
```

docker容器如何互相通信以及docker容器如何访问外网，如下图所示：

![image-20210118192320605](https://s3.ax1x.com/2021/01/19/sghlan.png)

使用容器名连通容器操作（实际用的不多）:

```shell
# 运行mytomcat链接到容器mymysql
$ docker run -d --name mytomcat --link mymysql
# 进入mytomcat容器
$ docker exec -it mytomcat /bin/bash
# 使用容器名称ping，发现可以ping通
$ ping mymysql
```

Docker端口映射

```shell
# 启动nginx，使用-p参数将容器内80端口映射到本地80端口
$ docker run -p 80:80 nginx
```

![image-20210118195933222](https://s3.ax1x.com/2021/01/19/sgh8P0.png)
