## 5.1 WordPress安装

```shell 
# 后台启动mysql容器，配置容器数据卷，指定root用户密码，指定数据库
$ docker run -d --name mysql -v /d/Data/docker/mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=wordpress mysql

# 后台运行wordpress，指定数据库为mysql容器的3306端口，链接到mysql容器中，本地8080端口绑定容器80端口
$ docker run -d -e WORDPRESS_DB_HOST=mysql:3306 --link mysql -p 8080:80 wordpress

# 访问localhost:8080就可以看见wordpress安装界面
```
## 5.2 Docker Compose

通过前面的WordPress安装，可以发现多容器的APP有以下痛点

* 要从Dockerfile build image或者Dockerhub拉取image
* 要创建多个container
* 要管理这些container（启动停止删除）

Docker Compose “批处理”，就是为了解决这些痛点的

![image-20210119163211574](https://s3.ax1x.com/2021/01/19/s2rIsI.png)

* Docker Compose 是一个工具
* 这个工具可以通过一个yml文件定义多容器的docker应用
* 通过一条命令就可以根据yml文件的定义去创建或者管理这多个容器

## 5.3 docker-compose.yml

Docker compose使用的yml文件默认名称为docker-compose.yml，其中有以下三大概念

![image-20210119163409961](https://s3.ax1x.com/2021/01/19/s2roLt.png)

### 5.3.2 Services

**Services介绍：**

* 一个service代表一个container，这个container可以从 dockerhub的image来创建，或者从本地的Dockerfile build出来的image来创建
* Service的启动类似docker run，我们可以给其指定 network和volume，所以可以给service指定network和 Volume的引用

**dockerhub拉取方式：**

```yml
# 定义一个service名称为db，镜像为从dockerhub拉取的postgres:9.4，指定容器数据卷，相当于run -v db-data:/var/1ib/postgresq1/data，
services:
  db:
    image: postgres:9.4 
    volumes:
      - "db-data:/var/1ib/postgresq1/data"
    networks:
      - back-tier
```

相当于以下命令:

```shell
$ docker run -d --network back-tier -v db-data:/var/ lib/postgresql/data postgres:9.4
```

**dockerfile构建方式：**

```yml
# 定义一个service名称为worker，镜像从本地dockerfile构建，链接到db和redis容器
services:
  worker:
    build: ./worker
    links:
      - db
      - redis
    networks:
      - back-tier
```

### 5.3.3 Volumes & Networks

```yml
services:
  db:
    image: postgres:9.4 
    volumes:
      - "db-data:/var/1ib/postgresq1/data"
    networks:
      - back-tier

# 此处定义volumes，services中使用
volumes: 
  db-data: 

# 此处定义networks，services中使用
networks:
  front-tier:
    driver: bridge 
  back-tier:
    driver: bridge
```

相当于有以下命令：

```shell
$ docker volume create db-data
$ docker network create-d bridge back-tier
```

### 5.3.4 Docker Compoes构建WordPress

```yml
# 指定版本号
version: '3'

# 定义services
services:

  wordpress:
    image: wordpress
    # 端口映射
    ports:
      - 8080:80
    # 基于的服务
    depends_on:
      - mysql
    # 指定环境变量
    environment:
      WORDPRESS_DB_HOST: mysql
      WORDPRESS_DB_PASSWORD: root
    # 指定连接的网络
    networks:
      - my-bridge

  mysql:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: wordpress
    volumes:
      - mysql-data:/var/lib/mysql
    networks:
      - my-bridge

# 定义volumes
volumes:
  mysql-data:

# 定义networks
networks:
  my-bridge:
    driver: bridge
```

## 5.4 Docker Compose命令

```shell
# up启动services，-f指定yml文件，如果不指定，则默认找当前路径下的docker-compose.yml文件
$ docker-compose -f docker-compose.yml up
# 查看正在运行的services
$ docker-compose ps
# 停止启动的所有服务
$ docker-compose stop
# 停止启动的所有服务，并移除由yml文件创建的containers、networks、images和volumes，注意不会删除本地的images
$ docker-compose down
# 用-d后台启动服务，不会打印启动日志
$ docker-compose up -d
# 列举docker-compose中使用的containers及其适用的images
$ docker-compose images
# 进入docker-compose中的service
$ docker-compose exec mysql bash
```

## 5.5 水平拓展和负载均衡

创建python文件，app.py

```python
from flask import Flask
from redis import Redis
import os
import socket

app = Flask(__name__)
redis = Redis(host=os.environ.get('REDIS_HOST', '127.0.0.1'), port=6379)


@app.route('/')
def hello():
    redis.incr('hits')
    return 'Hello Container World! I have been seen %s times and my hostname is %s.\n' % (redis.get('hits'),socket.gethostname())


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80, debug=True)
```

创建Dockerfile

```dockerfile
FROM python:2.7
LABEL maintaner="Peng Xiao xiaoquwl@gmail.com"
COPY . /app
WORKDIR /app
RUN pip install flask redis
EXPOSE 80
CMD [ "python", "app.py" ]
```

创建docker-compose.yml

```yml
version: "3"

services:
  # redis服务
  redis:
    image: redis
  # python的web服务
  web:
    build:
      context: .
      dockerfile: Dockerfile
    environment:
      REDIS_HOST: redis
  # HAProxy负载均衡服务
  lb:
    image: dockercloud/haproxy
    links:
      - web
    ports:
      - 8080:80
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock 
```

上面准备好之后，执行以下命令

```shell
# 默认方式启动服务，并访问测试
$ docker-compose up -d 
$ curl 127.0.0.1:8080

# 适用scale参数将web启动3个web服务
$ docker-compose up --scale web=3 -d 
# 访问测试
$ curl 127.0.0.1:8080
```

适用上述scale方式可以在单机上启动多个服务，案例中，通过HAProxy服务访问web服务，这种方式中，web服务不能绑定端口，否则多个容器同时绑定一个本地端口报错。
