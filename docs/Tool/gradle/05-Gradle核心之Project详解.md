[TOC]

# project 概述

![image-20220616230406549](https://cc.hjfile.cn/cc/img/20220616/2022061611040909613693.png)

- 每个模块都是 project

  以图中工程项目为例，如果在 maven 项目中，我们习惯将 hello-gradle 称为 project，称其中的 common、facade、service 为 module。但在 gradle 项目中，它们其实都是 project。

- 每个 build.gradle 对应一个 project

我们可以执行 `./gradlew project` 命令查看 project 结构，输出中会看到如下内容，即根 project 下有三个子 project。

```
------------------------------------------------------------
Root project 'hello-gradle'
------------------------------------------------------------

Root project 'hello-gradle'
+--- Project ':common'
+--- Project ':facade'
\--- Project ':service'
```

它们分别有什么作用呢，其中根 project 的作用就是管理它的子 project，而每个子 project 对应一个输出，可以是 apk、jar、war 等类型的输出。

# Project API 综述

Project 的 API 非常多，大致可以分为以下六个部分。

![image-20220616231529783](https://cc.hjfile.cn/cc/img/20220616/202206161115310633374.png)

- project 相关 api，有用操作父 project 以及管理子 project 的能力；
- task 相关 api，为当前 project 新增 task 以及使用已有 task 的能力，下一章单独介绍；
- 属性相关 api，gradle 的 project 有一些属性，还可以添加额外属性；
- file 相关 api，主要用来处理当前 project 下的文件；
- gradle 生命周期 api，提供一些钩子函数，上一章介绍过；
- 其他 api，零散的一些 api，包括添加依赖，添加配置，引入外部文件等。

# Project API 详解

## Project

查找 project 的 api：

- `getAllProjects`：获取当前 project 及其所有子 project

- `getSubProjects`：获取当前 project 的所有子 project

- `getParent`：获取当前 project 的父 project

- `getRootProject`：获取当前 project 的根 project

  ```groovy
  def getProjects() {
      println '------------------'
      println 'Root Project'
      println '------------------'
      this.getAllprojects().eachWithIndex { Project project, int index ->
          if (index == 0) {
              println "Root project ':${project.name}'"
          } else {
              println "+--- project ':${project.name}'"
          }
      }
  }
  
  this.getProjects()
  ```

  可以通过以上 api 找到相应的 project，然后通过 project 相关 api 来配置 project。gradle 还提供了更强大的 api 来直接对想要管理的 project 进行操作。

- `project` ：配置指定子工程

  ```groovy
  /**
   * 使用给定路径和闭包配置项目
   *
   * @param path 工程项目
   * @param configureClosure 用来配置项目的闭包
   * @return 指定的工程，从不返回null
   * @throws UnknownProjectException 如果项目不存在
   */
  Project project(String path, Closure configureClosure);
  ```

  下面是在父工程中配置子工程 app 的示例：

  ```groovy
  project('app') { Project project ->
      apply { plugin: 'com.android.application' }
      group "com.imooc"
      version "1.0.0-release"
      dependencies {}
      
      android {}
  }
  ```

- `allprojects`：配置当前工程及其所有子工程

  ```groovy
  allprojects() {
      group "com.imooc"
      version "1.0.0-release"
  }
  
  // 验证配置
  println project('service').group
  ```

- `subprojects`：配置当前工程下的所有子工程

  ```groovy
  subprojects {
      // 自定义的 gradle 脚本，将工程推到 maven 仓库
      apply from: '../publishToMaven.gradle'
  }
  ```

## 属性



















