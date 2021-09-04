# 谈谈你对 Java 的理解

- 平台无关性：一次编译处处运行
- GC：垃圾回收机制，不用手动释放内存
- 语言特性：泛型、反射、Lambda 表达式
- 面向对象：封装、继承、多态
- 类库：集合、并发库、网络库
- 异常处理

# 如何实现一处编译处处运行

Java 源文件经过 javac 的编译会生成字节码保存在 .class 文件中，.class 文件是跨平台的基础，有了 .class 文件 JVM 才能加载对应的 Java 类。Java 提供了不同平台的虚拟机，所以可以实现到处执行。JVM 将字节码文件里的内容加载进内存，并最终转换为本操作系统能够识别的机器码去执行。

Java 源码首先被编译成字节码，再由不同平台的 JVM 进行解析，Java 语言在不同的平台上运行时不需要进行重新编译， Java 虚拟机在执行字节码的时候，把字节码转换成具体平台上的机器指令。

为什么 JVM 不直接将源码解析成机器码去执行？

- 准备工作：每次执行都需要各种检查。

  如果直接将源码转换为机器码去执行，那每次都要进行语法、句法、语义的检查，即每次执行这些语义分析的结果都不会被保留，都要重新分析，影响性能，所以引入了中间字节码。

- 兼容性：也可以江别的语言解析成字节码。

如 ruby、scala 生成字节码同样可以被 JVM 调用执行。

#  JVM 如何加载 .class 文件

JVM 是一个内存中的虚拟机

![image-20210903183646944](https://z3.ax1x.com/2021/09/03/h65bt0.png)

- Class loader：依据特定格式，加载clas文件到内存
- Execution Engine：对命令进行解析
- Native interface：融合不同开发语言的原生库为」ava所用
- Runtime data area：M内存空间结构模型

# 什么是反射

Java 反射机制是在运行状态中，对于任意一个类，都能够知道这个类的所有属性和方法；对于任意一一个对象，都能够调用它任意方法和属性；这种动态获取信息以及动态调用对象方法的功能称为 Java 语言的反射机制。

# 谈谈 ClassLoader

反射中获取类属性和方法必须要获取 class 对象，而要获取到 class 对象必须要获取到该类的字节码文件对象。

## 类从编译到执行的过程：

- 编译器将 `Robot.java` 源文件编译为 `Robot.class` 字节码文件
- ClassLoader 将字节码转换为 JVM 中的 `Class<Robot>` 对象
- JVM 利用 `Class<Robot>` 对象实例化为 Robot 对象

## 谈谈 ClassLoader

Classloader 在 Java 中有着非常重要的作用，它主要工作在 Class 装载的加载阶段，其主要作用是从系统外部获得 Class 二进制数据流。它是 Java 的核心组件，所有的 Class 都是由 Classloader 进行加载的，Classloader 负责通过将 Class 文件里的二进制数据流装载进系统，然后交给Java虛拟机进行连接、初始化等操作。

关键方法是 `loadClass`。

## ClassLoader 的种类

- **BootStrapClassloader**：C++ 编写，加载核心库 `java.*`
- **ExtclassLoader**：Java 编写，加载扩展库 `javax.*`
- **AppClassLoader**：Java 编写，加载程序所在目录
- **自定义ClassLoader**：Java编写，定制化加载

## 自定义 ClassLoader

自定义 ClassLoader 需要继承 ClassLoader 抽象类，并关注两个关键方法，其中 `findClass` 方法需要重写，`defineClass` 方法现成实现不用管，在 `findClass` 方法中调用即可。

```java
// 查找具有指定二进制名称的类。
protected Class<?> findClass(String name) throws ClassNotFoundException {
    throw new ClassNotFoundException(name);
}

// 将字节数组转换为类Class的实例并返回。
protected final Class<?> defineClass(String name, byte[] b, int off, int len)
    throws ClassFormatError
{
    return defineClass(name, b, off, len, null);
}
```

下面编写一个自定义 ClassLoader：

```java
public class MyClassLoader extends ClassLoader {
    private String path;

    public MyClassLoader(String path) {
        this.path = path;
    }

    // 重写 findClass 方法，用于寻找类文件
    @Override
    protected Class<?> findClass(String name) {
        byte[] bytes = loadClassData(name);
        // 调用 defineClass 方法获取 Class 实例，不需要重写
        return defineClass(name, bytes, 0, bytes.length);
    }

    // 加载类文件
    private byte[] loadClassData(String name) {
        name = path + name + ".class";
        byte[] bytes = null;
        try (InputStream in = new FileInputStream(name);
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            int i = 0;
            while ((i = in.read()) != -1) {
                out.write(i);
            }
            bytes = out.toByteArray();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return bytes;
    }

    // 测试方法
    public static void main(String[] args) throws Exception {
        MyClassLoader classLoader = new MyClassLoader("/Users/baidu/Desktop/");
        Class<?> clazz = classLoader.loadClass("Robot");
        System.out.println(clazz.getClassLoader());
        clazz.newInstance();
    }
}
```

# 双亲委派机制

## 双亲委派机制过程

![image-20210903221436518](https://z3.ax1x.com/2021/09/03/hcQ94e.png)

双亲委派机制如上图，首先自低而上查找有没有加载过该类，如果加载过直接返回，否则委派给上一级的 ClassLoader。如果都没有加载过，则自顶向下尝试在自己负责的路径下加载指定类。

```java
protected Class<?> loadClass(String name, boolean resolve) throws ClassNotFoundException {
    synchronized (getClassLoadingLock(name)) {  // 加锁防止别的线程进来加载类
        // 首先检查该类是否被加载过
        Class<?> c = findLoadedClass(name);
        if (c == null) {
            long t0 = System.nanoTime();
            try {
                // 如果没被加载过，找上一级 ClassLoader 尝试去加载
                if (parent != null) {
                    // CustomClassLoader -> AppClassLoader -> ExtClassLoader
                    c = parent.loadClass(name, false);
                } else {
                    c = findBootstrapClassOrNull(name);  // BootstrapClassLoader
                }
            } catch (ClassNotFoundException e) {
                // 非空父加载器没找到类时，抛出 ClassNotFoundException
            }
            if (c == null) {
                // 如果还没找到，调用 findClass 方法查找类
                long t1 = System.nanoTime();
                c = findClass(name);
                // 定义类加载器；记录统计数据
                sun.misc.PerfCounter.getParentDelegationTime().addTime(t1 - t0);
                sun.misc.PerfCounter.getFindClassTime().addElapsedTimeFrom(t1);
                sun.misc.PerfCounter.getFindClasses().increment();
            }
        }
        if (resolve) {
            resolveClass(c);
        }
        return c;
    }
}
```

## 为什么要使用双亲委派机制取加载类

避免多份同样字节码的加载

# loadClass 和 forName 的区别

## 类加载的方式

- 隐式加载：new
- 显示加载：loadClass，forName 等

使用 new 创建对象时，隐式调用类加载器加载对应的类到 JVM 中。对于显示加载，获取到 `Class<?>` 对象后需要调用 `newInstance` 方法来生成对象实例。隐式调用无需调用 `newInstance` 方法即可获取对象实例，并且 `new` 支持调用带参构造器生成对象实例，而 `Class<?>` 对象的 `newInstance` 方法不支持传入参数，需要通过反射获取到构造器，在调用构造器的 `newInstance` 方法才能支持参数。

## loadClass 和 forName 的区别

类的装载过程，分为三步： 

1. 加载：通过 loadClass 方法把 class 文件字节码加载到内存中，并将这些数据转换成运行时数据区中方法区的类型数据，在运行时，堆中生成一个代表这个类的 Java.lang.Class 对象作为方法区类数据的访问入口。
2. 链接：执行校验、准备、解析，其中解析步骤是可选的。
   - 校验：检査加载的 class 的正确性和安全性。如检查 class 文件格式是否正确等。
   - 准备：为类变量分配存储空间并设置类变量初始值。类变量随类型信息存放在方法区中，生命周期很长，使用不当容易造成内存泄漏。
   - 解析：JVM 将常量池内的符号引用转换为直接引用。
3. 初始化：为类变量赋值和并执行静态代码块。

之前的 ClassLoader 源码中 loadClass 方法的第二个参数 resolve 参数就是决定是否链接这个类，一个参数的 loadClass 方法默认是 false。

```java
public Class<?> loadClass(String name) throws ClassNotFoundException {
    return loadClass(name, false);
}
```

再看 forName 方法，

```java
@CallerSensitive
public static Class<?> forName(String className) throws ClassNotFoundException {
    Class<?> caller = Reflection.getCallerClass();
    // 调用本地方法，第二个参数表示是否初始化类
    return forName0(className, true, ClassLoader.getClassLoader(caller), caller);
}
```

通过上面的介绍得出 loadClass 和 forName 的区别：

- `Class.forName` 得到的 class 是已经初始化完成的。即已经完成了第三步初始化。
- `Classloder.loadClass` 得到的 class 是还没有链接的。即只完成了第一步加载。

两者之间的区别有各自的应用场景，`forName` 方法在 MySQL 注册 JDBC 驱动的时候有应用，为了执行其中的静态代码块。`loadClass` 方法，在 Spring IoC 中资源加载器读取一些 bean 的配置的时候，使用 `loadClass` 方法加载，这和 Spring 的 `lazy loading` 有关，Spring IoC 为了加快初始化速度，大量使用了延迟加载技术，而是用 `loadClass` 方法不需要执行链接和初始化步骤，将这些步骤留到实际使用到这个类的时候再做。

# Java 运行时数据区

## Java 内存区域中堆和栈的区别

要讲清楚这个问题，先要搞清楚程序运行时的内存分配策略，通常有三种内存分配策略：
- 静态存储：编译时确定每个数据目标在运行时的存储空间需求
- 栈式存储：数据区需求在编译时未知，运行时模块入口前确定
- 堆式存储：编译时或运行时模块入口都无法确定，动态分配

堆和栈的区别：

- 管理方式：栈自动释放，堆需要GC
- 空间大小：栈比堆小
- 碎片相关：栈产生的碎片远小于堆
- 分配方式：栈支持静态和动态分配，而堆仅支持动态分配
- 效率：栈的效率比堆高

# Intern 方法

## Intern 方法在不同版本的区别

JDK6：当调用 Intern 方法时，如果字符串常量池先前已创建出该字符串对象，则返回池中的该字符串的引用。否则， 将此字符串对象添加到字符串常量池中，并且返回该字符串对象的引用。

JDK6+：当调用 intern 方法时，如果字符串常量池先前已创建出该字符串对象，则返回池中的该字符串的引用。否则， 如果该字符串对象已经存在于Java堆中，则将堆中对此对象 的引用添加到字符串常量池中，并且返回该引用；如果堆中不存在，则在池中创建该字符串并返回其引用。

## 字符串的一个例题

首先要知道：在引号中声明的字符串都会在字符串常量池中创建出来。

```java
public static void main(String[] args) {
    String s = new String("a");
    s.intern();
    String s2 = "a";
    System.out.println(s == s2);
    
    String s3 = new String("a") + new String("a");
    s3.intern();
    String s4 = "aa";
    System.out.println(s3 == s4);
}
```

上述代码，Java6 中得出两个 false，Java7 中前者 false，后者 true。分析如下：

在 JDK6 中得到：

![image-20210904184410871](https://z3.ax1x.com/2021/09/04/h2mLTS.png)

在 JDK7 之后：

![image-20210904184439004](https://z3.ax1x.com/2021/09/04/h2mvWj.png)













