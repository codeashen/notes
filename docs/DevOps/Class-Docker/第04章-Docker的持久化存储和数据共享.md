## 4.1 Docker持久化简介

![image-20210118200739472](https://s3.ax1x.com/2021/01/19/sghJ2T.png)

![image-20210118200957693](https://s3.ax1x.com/2021/01/19/sghYxU.png)

Docker持久化数据方案：

* **基于本地文件系统的Volume**。可以在执行Docker create或Docker run时，通过-v参数将主机的目录作为容器的数据卷。这部分功能便是基于本地文件系统的volume管理。
* **基于plugin的Volume**，支持第三方的存储方案，比如NAS，aws

## 4.2 Volume类型

Volume有以下两种类型

* 受管理的Data Volume，由docker后台自动创建。
* 绑定挂载的Volume，具体挂载位置可以由用户指定。

### 4.2.1 Data Volume

受管理的Data Volume，可以使用默认的docker volume，也可以自定义docker volume映射

**1、 默认docker volume**

![image-20210118202745192](https://s3.ax1x.com/2021/01/19/sghNMF.png)

```shell
# 查看docker volume列表
$ docker volume ls
DRIVER              VOLUME NAME
local               40b685bd181c911b2ed49d47e7973207bf15c0af3d494a77e4ef43e9d8c27429
local               c03dd3896cd06601c409cce497321d8100abfa356fe23d5aaac910ef80432c1c
local               da7d5902cbf6f586580fd1c6432eac97c8c187fb87da388618f11521500182ab

# 查看详情，包括挂载的本地目录
$ docker volume inspect 40b685bd181c911b2ed49d47e7973207bf15c0af3d494a77e4ef43e9d8c27429
[
    {
        "CreatedAt": "2021-01-07T02:32:08Z",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/40b685bd181c911b2ed49d47e7973207bf15c0af3d494a77e4ef43e9d8c27429/_data",
        "Name": "40b685bd181c911b2ed49d47e7973207bf15c0af3d494a77e4ef43e9d8c27429",
        "Options": null,
        "Scope": "local"
    }
]

# 删除volume
$ docker volume rm 40b685bd181c911b2ed49d47e7973207bf15c0af3d494a77e4ef43e9d8c27429
```

使用这种默认的，生成的docker volume可读性差

**2、自定义volume映射**

```shell
# 将mysql容器内/var/lib/mysql映射到名叫mysql的docker volume上
$ docker run -d -v mysql:/var/lib/mysql --name mysql1 -e MYSQL_ALLOW_EMPTY_PASSWORD=true mysql

# 查看docker volume
$ docker volume 1s 
DRIVER 		VOLUME NAME
1ocal 		mysql

# 删除容器之后还能继续使用上次的docker volume
$ docker rm -f mysql1

$ docker run -d -v mysql:/var/lib/mysql --name mysql2 -e MYSQL_ALLOW_EMPTY_PASSWORD=true mysql
```

这样可以自定义docker volume名称，可读性好

### 4.2.2 Bind Mouting

![image-20210118202815005](https://s3.ax1x.com/2021/01/19/sghUr4.png)

```
-v 本地路径:容器路径
```

例如：

```shell
$ docker run --name mysql -v /c/data/mysql:/var/lib/mysql mysql
```

这种方式直接将本地目录与容器内目录关联，其中的文件也是同步的