## 2.1 Docker的架构和底层技术

Docker Platform

* Docker提供了一个开发，打包，运行app的平台
* 把app和底层infrastructure隔离开来

![image-20210107113657044](https://s3.ax1x.com/2021/01/07/se1PpQ.png)

Docker Engine

* 后台进程（dockerd)
* REST API Server
* CLI接口（docker)

![image-20210107113729851](https://s3.ax1x.com/2021/01/07/se1ilj.png)

Docker Architecture

![image-20210107114039372](https://s3.ax1x.com/2021/01/07/se1F6s.png)

底层技术支持

* Namespaces：做隔离pid,net,ipc,mnt,uts
* Control groups：做资源限制
* Union file systems：Container和image的分层

## 2.2 Docker Image

* 文件和meta data的集合（root filesystem)
* 分层的，并且每一层都可以添加改变删除文件，成为一个新的image
* 不同的image可以共享相同的layer
* Image本身是read-only的

![image-20210107131324326](https://s3.ax1x.com/2021/01/07/se1kXn.png)

如何获得一个image

方式一、build from dockerfile

![image-20210107131747649](https://s3.ax1x.com/2021/01/07/se1V00.png)

方式二、pull fom register

![image-20210107132300348](https://s3.ax1x.com/2021/01/07/se1hcj.png)

## 2.3 Docker Container

* 通过Image创建（copy）
* 在lmage layer之上建立一个container layer（可读写）
* 类比面向对象：类和实例
* Image负责app的存储和分发，Container负责运行app

![image-20210107133335105](https://s3.ax1x.com/2021/01/07/se8kd0.png)

  ```shell
  #查看所有正在运行和退出的容器
  docker container ls -a
  # 等同于
  docker ps -a
  #交互式运行container
  docker run -it centos
  #删除容器
  docker rm c72dd5359148
  #删除所有容器
  docker rm $(docker ps -aq)
  ```
## 2.4 Dockerfile语法梳理及最佳实践

### FROM

用于指定base镜像

![image-20210107151927292](https://s3.ax1x.com/2021/01/07/sefi8S.png)

> 尽量使用官方的image作为base image！

### LABEL

用于添加元数据

![image-20210107151908380](https://s3.ax1x.com/2021/01/07/sefFgg.png)

> Metadata不可少

### RUN

使用RUN运行一些命令，安装一些软件的时候经常使用run。

每执行一次RUN，image都会新加一层。

![image-20210107151851460](https://s3.ax1x.com/2021/01/07/sefEuj.png)

> * 为了美观，复杂的RUN请用反斜线换行！
> * 避免无用分层，合并多条命令成一行！

### WORKDIR

用于指定工作目录

![image-20210107151821768](https://s3.ax1x.com/2021/01/07/sefnU0.png)

> * 用WORKDIR，不要用RUN cd！
> * 尽量使用绝对目录！

### ADD、COPY

将本地文件添加到docker image里。

ADD添加到docker image目录中可以自动将文件解压缩

![image-20210107152243522](https://s3.ax1x.com/2021/01/07/sehH6e.png)

> * 大部分情况，COPY优于ADD！
> *  ADD除了COPY还有额外功能（解压）！
> * 添加远程文件/目录请使用curl或者wget！

### ENV

添加环境变量

![image-20210107152856953](https://s3.ax1x.com/2021/01/07/se4ehV.png)

> 尽量使用ENV增加可维护性

### VOLUME、EXPOSE

用于存储和网络

### CMD、ENTRYPOINT

## 2.5 RUN、CMD、ENTRYPOINT

* **RUN**：执行命令并创建新的Image Layer
* **CMD**：设置容器启动后默认执行的命令和参数
* **ENTRYPOINT**：设置容器启动时运行的命令

### Shell和Exec格式

Dockerfile中可以使用shell格式或者Exec格式编写命令，Shell格式用shell脚本语法编写，Exec格式使用命令和参数的特定格式编写。

**Shell格式：**

![image-20210112004118859](https://s3.ax1x.com/2021/01/12/sGaQtP.png)

**Exec格式：**

![image-20210112004130931](https://s3.ax1x.com/2021/01/12/sGa3p8.png)

### CMD

* 容器启动时默认执行的命令
* 如果docker run指定了其它命令，CMD命令被忽略
* 如果定义了多个CMD，只有最后一个会执行

![image-20210112005020350](https://s3.ax1x.com/2021/01/12/sGatmj.png)

### ENTRYPOINT

* 让容器以应用程序或者服务的形式运行
* 不会被忽略，一定会执行
* 最佳实践：写一个shell脚本作为entrypoint

```dockerfile
# 参考mongodb的写法

# 拷贝本地的shell脚本文件到镜像的中
COPY docker-entrypoint.sh /usr/1ocal/bin/ 
# 使用ENTRYPOINT命令运行shell脚本
ENTRYPOINT ["docker-entrypoint.sh"] 

EXPOSE 27017 
CMD ["mongod"]
```

## 2.6 发布镜像

1. docker hub注册账户

2. 本地登录docker账户

   ```shell
   $ docker login
   Username: lucifer
   Password:
   Login Succeeded
   ```

3. 编写dockerfile，构建docker image

   ```shell
   # 构建自己的镜像，注意镜像名要以“docker用户名/”开头
   $ docker build -t lucifer/mycentos .
   ```

4. 推送镜像

   ```shell
   $ docker push lucifer/mycentos:latest
   ```

---

创建私有的docker镜像仓库：

https://registry.hub.docker.com/_/registry
