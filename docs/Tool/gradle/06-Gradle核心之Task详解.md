[TOC]

# Task 定义及配置

## 创建 Task

有两种方式创建 Task。

**方式一：使用 Project 接口中的 task 方法创建**

Project 接口提供了 task 方法，传入名称和闭包创建 Task。

```java
/**
 * 创建具有给定名称的 Task 并将其添加到此项目。
 */
Task task(String name, Closure configureClosure);
```

示例：

```groovy
// 直接通过 task 方法创建 Task
task helloTask {
    println 'Hello, task!'
}
```

**方式二：使用 TaskContainer 的 create 方法创建**

```java
/**
 * Project 接口中获取 TaskContainer 的方法，
 * 返回包含所有 Task 的 TaskContainer。
 */
TaskContainer getTasks();
```

示例：

```groovy
// 通过 TaskContainer 创建 Task
tasks.create('helloTask2') {
    println 'Hello, task2!'
}
```

这两种创建 Task 的方式效果相同，task 方法创建的 Task 最后也会添加到 TaskContainer 中。

## 配置 Task

可以为 Task 配置组名 group 和描述 description 等，配置方式也有两种

**方式一：创建 Task 的同时配置（推荐）**

```groovy
task helloTask(group: 'ashen', description: 'test 1') {
    println 'Hello, task!'
}

tasks.create(name: 'helloTask2', group: 'ashen', description: 'test 2') {
    println 'Hello, task2!'
}
```

**方式二：在 Task 中调用 set 方法配置**

```groovy
task helloTask() {
    setGroup('ashen')
    setDescription('Hello World')
    println 'Hello, task!'
}

tasks.create('helloTask2') {
    setGroup('ashen')
    setDescription('Hello World')
    println 'Hello, task2!'
}
```

group 用于对 Task 分组，description 用于描述 Task。

![image-20220619142805746](https://cc.hjfile.cn/cc/img/20220619/2022061902281062332956.png)

具体可以配置哪些信息，可以在 Task 接口的源码中看到，其他的配置将在接下来的小节中陆续介绍。

```java
public interface Task extends Comparable<Task>, ExtensionAware {
    String TASK_NAME = "name";                // 名称
    String TASK_DESCRIPTION = "description";  // 描述
    String TASK_GROUP = "group";              // 分组
    String TASK_TYPE = "type";                // 类型
    String TASK_DEPENDS_ON = "dependsOn";     // 依赖的其他 Task
    String TASK_OVERWRITE = "overwrite";      // 重写 Task
    String TASK_ACTION = "action";            // 配置执行逻辑
    
    //......
}
```

# Task 的执行

上一小节中两个 Task 我们执行其中任意一个，都可以看到两个 Task 中的输出语句都输出了，这是为什么呢？因为我们创建的 Task 中的代码是在 Task 的配置阶段运行的，而任何 Task 的执行都会配置整个 Project 中的所有配置代码，所以两个输出语句都输出了。

```
14:49:24: Executing 'helloTask'...


> Configure project :
Hello, task!
Hello, task2!

> Task :helloTask UP-TO-DATE

BUILD SUCCESSFUL in 98ms
14:49:24: Execution finished 'helloTask'.
```

前面介绍过，gradle 有三个阶段：初始化阶段、配置阶段和执行阶段。如何让代码在执行阶段运行呢。我们可以为 Task 指定执行阶段所需要执行的代码，而且只有 Task 可以在 gradle 的执行阶段去执行。

指定方式就是调用 task 的 doFirst 方法和 doLast 方法，下例中展示了 doFirst 使用方式，doLast 相同。

```groovy
task helloTask(group: 'ashen', description: 'test 1') {
    println 'Hello, task!'
    // Task 内部调用 doFirst
    doFirst {
        println 'Hello, inner 1'
    }
    // doFirst 可以调用多次
    doFirst {
        println 'Hello, inner 2'
    }
}

// Task 外部调用 doFirst
helloTask.doFirst {
    println 'Hello, outer 1'
}
```

执行 helloTask 输出如下：

```
14:58:30: Executing 'helloTask'...


> Configure project :
Hello, task!
Hello, task2!

> Task :helloTask
Hello, outer 1
Hello, inner 2
Hello, inner 1

BUILD SUCCESSFUL in 115ms
1 actionable task: 1 executed
14:58:30: Execution finished 'helloTask'.
```

通过调用 doFirst 可以为已有的 Task 之前添加逻辑，调用 doLast 可以为已有的 Task 之后添加逻辑。

案例：下面看一个统计 build 时长的案例中如何使用 doFirst 和 doLast

```groovy
def startBuildTime, endBuildTime

this.afterEvaluate { Project project ->
    def firstTask = project.tasks.getByName('classes')
    firstTask.doFirst {
        startBuildTime = System.currentTimeMillis()
        println 'the build started at ' + startBuildTime
    }
    def lastTask = project.tasks.getByPath('service:build')
    lastTask.doLast {
        endBuildTime = System.currentTimeMillis()
        println 'the build duration is ' + (endBuildTime - startBuildTime) + 'ms'
    }
}
```

# Task 的依赖和执行顺序

决定 Task 执行顺序的有三种方式：

![image-20220619151945354](https://cc.hjfile.cn/cc/img/20220619/2022061903194886761586.png)

- dependsOn 强依赖方式：为 Task 指定一个或多个依赖的 Task，则当前 Task 的执行必须依赖它所依赖的其他 Task 的执行。
- 指定 Task 的输入输出：等效于 dependsOn 强依赖方式。
- 通过 Task 的 API 指定执行顺序

## Task 依赖

为 Task 配置依赖的其他 Task

```groovy
task taskX {
    doLast {
        println "taskX"
    }
}

task taskY {
    doLast {
        println "taskY"
    }
}

// 配置 taskZ 依赖
task taskZ(dependsOn: [taskX, taskY]) {
    doLast {
        println "taskZ"
    }
}
```

现在执行 taskZ，会先执行 taskX 和 taskY，而 taskX 和 taskY 没有依赖关系，二者执行顺序随机。

还可以动态配置多个 Task。

```groovy
task taskZ(dependsOn: [taskX, taskY]) {
    dependsOn this.tasks.findAll {
        it.name.startsWith('lib')
    }
    doLast {
        println "taskZ"
    }
}
```

## Task 输入输出

前面介绍了 dependsOn 将任务关联起来，接下来介绍另一个关联任务的方式，即 Task 的输入输出。

![image-20220619162419248](https://cc.hjfile.cn/cc/img/20220619/2022061904242129695946.png)

如图为两个 Task，每个 Task 有其输入和输出，inputs 和 outputs 是 Task 的两个属性。Task One 的输出可以当作 Task Two 的输入，通过这种输出输入关系可以将 Task 关联起来。

```groovy
ext {
    versionCode = '1.0.0'
    versionInfo = 'First release of the app'
    destFile = file('releases.txt')
    if (destFile != null && !destFile.exists()) {
        destFile.createNewFile()
    }
}

task writeTask {
    // 为 task 指定输入
    inputs.property('versionCode', this.versionCode)
    inputs.property('versionInfo', this.versionInfo)
    // 为 task 指定输出
    outputs.file this.destFile

    doLast {
        def data = inputs.getProperties()
        File file = outputs.getFiles().getSingleFile()
        def sw = new StringWriter()
        sw.append("versionCode: " + data.get('versionCode') + '\n')
        sw.append("versionInfo: " + data.get('versionInfo') + '\n')
        file.withWriter { writer -> 
            writer.append(sw.toString()) 
        }
    }
}

task readTask {
    //指定输入文件为上一个task的输出
    inputs.file this.destFile
    doLast {
        //读取输入文件的内容并显示
        def file = inputs.files.singleFile
        println file.text
    }
}

// 测试任务
task testTask {
    dependsOn readTask, writeTask
    doLast {
        println 'test finished'
    }
}
```

执行 testTask，它依赖了 writeTask 和 readTask，而 readTask 的输入是 writeTask 的输出，所以会先执行 writeTask。

## 使用 API 指定顺序

```groovy
task taskX {
    doLast { println 'taskX' }
}

task taskY {
    doLast { println 'taskY' }
}

task taskZ {
    mustRunAfter taskX    // 强制于taskX之后执行
    shouldRunAfter taskY  // 应该于taskY之后执行（不常用）
    doLast { println 'taskZ' }
}

task testTask {
    dependsOn taskX, taskY, taskZ
    doLast { println 'test finished' }
}
```

# Task 类型

之前创建的 Task 其实都是 `org.gradle.api.DefaultTask` 类型的子类，gradle 还提供了更多类型的 Task，以便更方便地编写任务。

具体有哪些类型可以查看官方文档：[Task types](https://docs.gradle.org/current/dsl/#N104C2)，其实这些类型就是对已有 API 的封装，以更方便的实现特定的逻辑。

以 [Copy](https://docs.gradle.org/current/dsl/org.gradle.api.tasks.Copy.html) 类型为例，可以方便地复制文件，其实我们直接调用 Project 的 API 也可以实现，所以 Task 类型可以根据实际需求看是否使用。

```groovy
task copyDocs(type: Copy) {
    from 'src/main/doc'
    into 'build/target/doc'
}
```

