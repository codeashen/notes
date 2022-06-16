[TOC]

# Gradle 基本概念

Gradle 主要是用来构建应用程序的，Gradle 是一款构建工具，但不仅仅是构建工具这么简单，还可以是一款变成框框架。为什么这么说，来看 Gradle 的组成。

![Gradle 的三大组成](https://cc.hjfile.cn/cc/img/20220616/2022061612390932252983.png)

Gradle 的三大组成：

- groovy 核心语法，gradle 完全使用 groovy 的所有语法
- build script block，可以在不同的 block 里执行不同的逻辑
- gradle 自己的 api，包括 project、task 等

Gradle 既有自己的语法，也有自己的 api，可以通过变成灵活的实现构建过程中的需求，所以可以看作变成框架。

# Gradle 优势

- 灵活性上，可以在构建过程中加入自己定义逻辑
- 粒度性上，整个构建过程都是通过一系列 task 完成的，粒度分布在每一个 task
- 扩展性上，gradle 支持插件机制，可以复用已有的插件
- 兼容性上，不仅强大，而且兼容 ant、maven

# Gradle 执行流程

执行 gradle 命令（clean、assemble、build 等），前面会有一个 loading 和 configuration 阶段，走完这两步，才真正执行指定的命令。

如执行 build 命令，在经过 loading 和 configuration 阶段后，又会执行很多其他的逻辑。

以上是因为 loading 和 configuration 就是 gradle 生命周期中的前两个，而 clean、build 等命令其实是执行 gradle 中的 task，而 task 是有依赖性的，执行指定 task 前，必须先执行所有其依赖的 task。

总结下来，gradle 的生命周期分为以下三个阶段：

![image-20220616005614592](https://cc.hjfile.cn/cc/img/20220616/2022061612561662374706.png)

# 生命周期监听

gradle 提供了很多钩子函数，用来监听 gradle 的生命周期，即执行流程。这些 api 可以让我们在 gradle 生命周期的各阶段加入自定义回调逻辑。

下面介绍几个在平时开发过程中最常用的几个钩子函数：

- `this.beforeEvaluate`：在配置阶段开始之前的回调
- `this.afterEvaluate`：在配置阶段之后的回调
- `this.gradle.buildFinished`：gradle 生命周期执行完的回调

可以在 build.gradle 文件中加入以下代码，测试生命周期回调。

```groovy
//......

// 配置阶段开始前的回调
this.beforeEvaluate {
    println '===== before evaluate ====='
}

// 配置阶段完成后的回调
this.afterEvaluate {
    println '===== after evaluate ====='
}

// gradle执行完毕后的回调
this.gradle.buildFinished {
    println '===== build finished ====='
}

// 等同于 beforeEvaluate
this.gradle.beforeProject {
    println '===== before project ====='
}

// 等同于 afterEvaluate
this.gradle.afterProject {
    println '===== after project ====='
}
```

另外初始化阶段就是执行了 setting.gradle，所以可以在 setting.gradle 中加入初始化阶段要做的事情

```groovy
rootProject.name = 'hello-gradle'

println '===== init start ====='
```

执行测试，在控制台执行 `./gradlew clean`，可以看到以下输出

```
===== init start =====

> Configure project :
===== after project =====
===== after evaluate =====
===== build finished =====

BUILD SUCCESSFUL in 2s
1 actionable task: 1 executed
```



























