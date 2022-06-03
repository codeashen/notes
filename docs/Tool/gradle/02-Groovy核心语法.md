[TOC]

# 1 基础语法

## 1.1 变量

![image-20220526233831271](https://cc.hjfile.cn/cc/img/20220526/2022052611383526332661.png)

Groovy 代码中的变量经过编译后到 class 文件中，最终都是对象类型。

```groovy
package variable

// groovy中实际没有基本数据类型，所有的数据都是对象
int x = 10
double y = 3.14
println x.class    // class java.lang.Integer
println y.class    // class java.lang.Double

// groovy可以使用弱类型定义变量
def x1 = 11
def y1 = 3.1415
def name = 'Alice'
println x1.class   // class java.lang.Integer
println y1.class   // class java.math.BigDecimal
println name.class // class java.lang.String

// 弱类型变量可以自动转换类型
x1 = 'Bob'
println x1.class   // class java.lang.String
```

> Groovy 中使用 def 定义浮点变量，默认是 BigDecimal 类型的。

## 1.2 字符串

![image-20220526234558263](https://cc.hjfile.cn/cc/img/20220526/202205261146020704041.png)

Groovy 中字符串有 String 和 GString 两种，String 就和 `java.lang.String` 相同，此处主要讲 GString。

### 字符串的定义

1. 单引号字符串

   ```groovy
   def simpleString = 'a single string'
   ```

2. 格式化字符串

   ```groovy
   // 字符串保持定义时的格式
   def triple = '''line on
   line two
   line three'''
   
   // 使用 \ 避免换行
   def triple = '''\
   line one
   line two
   line three'''
   ```

3. 双引号字符串

   如果双引号字符串 A 中包含表达式，则 A 的类型为 GString，否则为 String

   ```groovy
   def name = "Alice"
   def sayHello = "Hello, ${name}."
   def sum = "The sum of 1 and 2 equals ${1 + 2}"
   
   println sayHello        // Hello, Alice.
   println sayHello.class  // class org.codehaus.groovy.runtime.GStringImpl
   ```

需要 String 的地方同样可以传入 GString

```groovy
// String类型的参数，可以接收GString
String echo(String message) {
    return message
}

def name = "Alice"
def result = echo("Hello, ${name}.")
```

### 字符串方法

![image-20220526235822741](https://cc.hjfile.cn/cc/img/20220526/2022052611582653957278.png)

字符串中方法有三类来源：

1. `java.lang.String` 中的方法，无需学习
2. `DefaultGroovyMethods` 中的方法，Groovy 对所有对象的拓展
3. `StringGroovyMethods` 中的方法，`StringGroovyMethods` 继承自 `DefaultGroovyMethods`，拓展了很多方法，又分为两类：
   - 接收普通类型的参数
   - 接收闭包类型的参数

此处主要讲解 `StringGroovyMethods` 中接收普通类型参数的方法。

```groovy
def str = "groovy"

// 字符串填充
println str.center(10)  // "  groovy  "
println str.center(10, '*')  // "**groovy**"

println str.padLeft(10)  // "     groovy"
println str.padLeft(10, '*')  // "****groovy"

// 字符串比较
println str.compareTo("hello")  // -1
println str > "hello"  // false

// 字符串查找和截取
println str.getAt(0)  // g
println str[0]  // 'g'
println str[0..2]  // 'gro'

// 字符串减法
println "HelloWorld".minus("Hello")  // World
println "HelloWorld" - "Hello"  // World

// 字符串反转
println "1234".reverse()  // 4321

// 字符串首字母大写
println "hello".capitalize()  // Hello

// 判断字符串是不是数字
println "123".isNumber()  // true
```

## 1.3 逻辑控制

![image-20220527000247608](https://cc.hjfile.cn/cc/img/20220527/202205271202514334.png)

这里主要讲和 java 有所不同的 switch 和 list。

### switch 语句

Java 中 switch 只支持 byte、char、short、int、String、enum 类型，Groovy 中没有此限制，并且更加强大。

```groovy
def result
def x = 1.23

switch (x) {
    case 'foo':
        result = 'equals foo'
        break
    case [4, 5, 6, 'inlist']:  // 列表
        result = 'in the list'
        break
    case 12..30:   // 范围
        result = 'in the range'
        break
    case Integer:  // 类型
        result = 'is Integer'
        break
    case BigDecimal:
        result = 'is BigDecimal'
        break
    default:
        result = "default"
}

println result  // is BigDecimal
```

### for 循环

1. 对范围循环

   ```groovy
   def sum = 0
   for (i in 1..10) {
       sum += i
   }
   println sum
   ```

2. 对 list 循环

   ```groovy
   for (i in [1, 2, 3]) {
       println i
   }
   ```

3. 对 map 循环

   ```groovy
   for (i in ['lucy': 1, 'jack': 2]) {
       println "${i.key}: ${i.value}"
   }
   ```

# 2 闭包

## 2.1 闭包基础

![image-20220527002931462](https://cc.hjfile.cn/cc/img/20220527/2022052712293531825087.png)

闭包就是一段代码串，使用上与方法类似，但其实有着较大差别。

**闭包的定义**

```groovy
// 定义闭包
def closure = { println "Hello World" }
// 调用闭包的两种方式
closure.call()
closure()
```

**闭包的参数**

```groovy
// 定义有参闭包
def closure = { String name, int age ->
    println "${name} is ${age} years old."
}

// 调用闭包
closure.call("John", 30)
closure("John", 30)
```

**闭包的隐式参数**

没有定义参数的时候，会有一个隐式参数 `it`

```groovy
def closure = { println "Hello ${it}" }

closure.call("Alice")
closure("Alice")
```

**闭包一定有返回值**

```groovy
def closure1 = { "Hello World" }
def result1 = closure1()  // "Hello World"

def closure2 = { println "Hello World" }
def result2 = closure2()  // null
```

## 2.2 闭包使用

![image-20220527010333167](https://cc.hjfile.cn/cc/img/20220527/2022052701033698877340.png)

### 基本类型结合闭包

下面介绍三个存在于 `DefaultGroovyMethods` 类中包含闭包参数的方法。

**upto 求阶乘**

```groovy
// 使用 upto 方法求阶乘
int factorial(int number) {
    int result = 1
    // 从1增长到number，每次执行参数2中闭包的操作
    1.upto(number, {num -> result *= num })
    return result
}
```

**downto 求阶乘**

```groovy
// 使用 downto 方法求阶乘
int factorial(int number) {
    int result = 1
    // 从number减少到1，每次执行参数2中闭包的操作
    number.downto(1, {num -> result *= num })
    return result
}
```

**times 求累加和**

```groovy
// 使用 times 方法，求从 0...number 的累加和
int cal(int number) {
    int result = 0
    // times方法只有一个闭包类型参数，可以直接将参数跟在方法名后，省略小括号
    number.times {
        num -> result += num
    }
    result
}
```

### 字符串结合闭包

**each 方法遍历字符串**

```groovy
String str = "Hello"
str.each { 
    item -> println item
}
// 返回 str 本身
```

**find 查找符合条件的第一个**

```groovy
String str = "the 2 and 3 is 5"
str.find {
    String item -> item.isNumber()
}
// 返回 2
```

**findAll 查找所有**

```groovy
String str = "the 2 and 3 is 5"
def list = str.findAll {String item -> item.isNumber()}
println list.toListString()  // [2, 3, 5]
```

**any 判断是否存在符合条件的**

```groovy
String str = "the 2 and 3 is 5"
def result = str.any {
    String item -> item.isNumber()
}
// 返回 true
```

**every 判断每一项是否符合条件**

```groovy
String str = "the 2 and 3 is 5"
def result = str.every {
    String item -> item.isNumber()
}
// 返回 false
```

**collect 将字符串的每一项都经过闭包处理，得到结果加到集合中，返回集合**

```groovy
String str = "Hello"
def list = str.collect { it.toUpperCase() }
println list  // [H, E, L, L, O]
```

## 2.3 闭包进阶

闭包进阶部分包含两部分内容，首先是闭包的关键变量，有三个关键字 this、owner 和 delegate，这三个关键字正式 Groovy 闭包强大是核心。第二部分是闭包的委托策略，它直接决定了闭包可以调用哪些变量和方法。

![image-20220527014410611](https://cc.hjfile.cn/cc/img/20220527/202205270144145266958.png)

### 闭包的关键变量

#### 变量定义

先看下闭包中三个关键变量  this、owner 和 delegate 是什么。

```groovy
// 脚本名称：closurestudy.groovy
package closure

def scriptClosure = {
    println "========= scriptClosure ========="
    println this
    println owner
    println delegate
}
scriptClosure.call()
```

调用闭包后输出结果如下：

```
========= scriptClosure =========
closure.closurestudy@d02f8d
closure.closurestudy@d02f8d
closure.closurestudy@d02f8d
```

可以看到三个变量的输出结果完全一样，都是当前脚本 `closurestudy.groovy` 生成的对象，那它们有什么本质区别呢。

- **this**：和 Java 中的 this 关键字含义一样，代表闭包定义处的类。

   上例中闭包 `scriptClosure` 定义在脚本 `closurestudy` 中，而脚本编译完后是继承 `Script` 类：

   ```java
   public class closurestudy extends Script {
       // ......
   }
   ```

   所以 Groovy 闭包中的 *this* 就是指闭包定义处的类 `closurestudy`。

- **owner**：代表闭包定义处的类或对象。

   和 *this* 不同的是 *owner* 不仅可以表示闭包定义处的类，还可以表示闭包定义处的对象。

   如上例中，闭包 `scriptClosure` 定义在类 `closurestudy` 中，所以 *owner* 同样指向 `closurestudy` 这个脚本类，其实闭包中还可以嵌套定义闭包，那此时 *owner* 就是闭包的外层闭包。

- **delegate**：代表任意对象，默认值与 *owner* 一致，可以手动修改成任意对象。

   > this 和 owner 是不能被修改的。

#### 复杂示例

**示例一：内部类中的静态闭包**

下面看一个复杂的示例，在脚本 `closurestudy` 中添加一些内容。

```groovy
package closure

def scriptClosure = {
    println "========= scriptClosure ========="
    println this
    println owner
    println delegate
}
scriptClosure.call()

// 定义了一个内部类
class Person {
    // 内部类中的静态闭包
    def static classClosure = {
        println "========= classClosure =========="
        println this
        println owner
        println delegate
    }

    // 内部类中的静态方法
    def static say() {
        // 静态方法中的闭包
        def methodClosure = {
            println "========= methodClosure ========="
            println this
            println owner
            println delegate
        }
        methodClosure.call()
    }

}
Person.classClosure.call()
Person.say()
```

输出结果如下，都是静态闭包和方法，所以变量指向类，不是对象内存地址

```
========= scriptClosure =========
closure.closurestudy@4d6f197e
closure.closurestudy@4d6f197e
closure.closurestudy@4d6f197e
========= classClosure ==========
class closure.Person
class closure.Person
class closure.Person
========= methodClosure =========
class closure.Person
class closure.Person
class closure.Person
```

**示例二：内部类中的非静态闭包**

再将静态方法替换成普通方法

```groovy
package closure

def scriptClosure = {
    println "========= scriptClosure ========="
    println this
    println owner
    println delegate
}
scriptClosure.call()

// 定义了一个内部类
class Person {
    // 内部类中的闭包
    def classClosure = {
        println "========= classClosure =========="
        println this
        println owner
        println delegate
    }

    // 内部类中的方法
    def say() {
        // 方法中的闭包
        def methodClosure = {
            println "========= methodClosure ========="
            println this
            println owner
            println delegate
        }
        methodClosure.call()
    }

}
// 创建对象, 调用对象的闭包和方法
Person p = new Person()
p.classClosure.call()
p.say()
```

结果如下，非静态的普通闭包和方法，变量指向类对象（有 @ 符号加内存地址）

```
========= scriptClosure =========
closure.closurestudy@d02f8d
closure.closurestudy@d02f8d
closure.closurestudy@d02f8d
========= classClosure ==========
closure.Person@36bc415e
closure.Person@36bc415e
closure.Person@36bc415e
========= methodClosure =========
closure.Person@36bc415e
closure.Person@36bc415e
closure.Person@36bc415e
```

**示例三：闭包中的闭包**

```groovy
package closure

def outerClosure = {
    def innerClosure = {
        println "========= innerClosure ========="
        println this
        println owner
        println delegate
    }
    innerClosure.call()
}
outerClosure.call()
```

输出结果如下：

```
========= innerClosure =========
closure.closurestudy@d02f8d
closure.closurestudy$_run_closure2@3e134896
closure.closurestudy$_run_closure2@3e134896
```

this 直接指向脚本对象，owner 指向 outerClosure 实例对象，delegate 默认和 owner 相同。

**示例四：修改 delegate 值**

```groovy
Person p = new Person()

def closure = {
    delegate = p  // 修改 delegate
    println this
    println owner
    println delegate
}
closure.call()
```

结果：

```
closure.closurestudy@695a69a1
closure.closurestudy@695a69a1
closure.Person@5c20ffa8
```

#### 闭包关键变量总结

- 大多数场景 this、owner 和 delegate 的值都是一样的
- 在闭包中定义闭包，则其 this 和 [owner, delegate] 就一样了
- delegate 值可以修改成任意对象，另外两个不能修改

### 闭包的委托策略

> 委托策略并不常用，了解即可

如下代码中，有两个类 Student 和 Teacher，两个类有共同的属性 name，创建两个对象后，打印两次 stu.toString() 的结果。

第一次打印：毫无疑问结果是 `My name is Sarah`

第二次打印：访问到的是 tea 中的 name， 输出结果是 `My name is Tina`

```groovy
class Student {
    String name
    def pretty = { "My name is ${name}" }
    
    String toString() {
        pretty.call()
    }
}

class Teacher {
    String name
}

def stu = new Student(name: 'Sarah')
def tea = new Teacher(name: 'Tina')

println stu.toString()  // My name is Sarah

// 将闭包 stu.pretty 的 delegate 指向 tea，并且设置委托策略为 DELEGATE_FIRST
stu.pretty.delegate = tea
stu.pretty.resolveStrategy = Closure.DELEGATE_FIRST

println stu.toString()  // My name is Tina
```

这就是闭包委托策略的作用，可以访问其他对象中的属性和方法。具体的委托策略有四种：

- OWNER_FIRST：默认策略，先在 owner 中找，找不到再到 delegate 中找
- OWNER_ONLY：只在 owner 中找
- DELEGATE_FIRST：现在 delegate 中找，找不到再到 owner 中找
- DELEGATE_ONLY：只在 delegate 中找

# 3 数据结构

## 3.1 列表

**定义**

```groovy
// java的定义方式
// def list = new ArrayList()

//groovy的定义方式列表
def list = [1, 2, 3]
println list.class    // class java.util.ArrayList
println list.size()   // 3

// 定义数组
def array = [1, 2, 3] as int[]  // 弱类型
int[] array2 = [1, 2, 3]        // 强类型
```

**添加**

```groovy
list.add(9)
list += [9, 10]
list.add(2, 8)
list.addAll([6, 11])
list.addAll(3, [7, 12])
```

**删除**

```groovy
list.remove((Object) 2)
list.removeAt(2)
list.removeElement(2)
list.removeAll { return it % 2 == 0 }
list -= [2]
```

**排序**

```groovy
// java 排序方式
Collections.sort(list)

Comparator cp = { a, b -> a - b }
Collections.sort(list, cp)

// groovy 排序方式
list.sort()
list.sort { a, b -> a - b }
```

**查找**

```groovy
def findList = [-3, 9, 6, 2, -7, 1, 5]

// 查找第一个负数
int result = findList.find { it < 0 }
// 查找所有负数
def newlist = findList.findAll { it < 0 }

// 查找最小值
findList.min()
// 查找绝对值最小值
findList.min { Math.abs(it) }
findList.max()
findList.max { Math.abs(it) }

// 统计负数个数
def num = findList.count { it < 0  }
```

## 3.2 映射

**定义和基本操作**

```groovy
//def map = new HashMap()
def colors = [
        red  : '#FF0000',
        green: '#00FF00',
        blue : '#0000FF'
]

// 查询
println colors['red']
println colors.red

// 添加
colors.yellow = '#FFFF00'
// 向 colors 中添加一个键值对，childmap - [a: 1, b: 2]
colors.childmap = [a: 1, b: 2]
```

**映射类型**

```groovy
// 获取 colors 的类型，不能用 colors.class，这表示获取键 'class' 对应的值
println colors.getClass()  // class java.util.LinkedHashMap

// 指定 map 类型
def map1 = [a: 1, b: 2] as HashMap
HashMap map2 = [a: 1, b: 2]
```

**遍历**

```groovy
def students = [
        1: [number: '0001', name: 'Bob', score: 55, sex: 'male'],
        2: [number: '0002', name: 'Alice', score: 62, sex: 'female'],
        3: [number: '0003', name: 'Tina', score: 73, sex: 'female'],
        4: [number: '0004', name: 'Sarah', score: 66, sex: 'female']
]

// 遍历 k-v
students.each { def student ->
    println "key is ${student.key}, value is ${student.value}"
}
students.each { key, value ->
    println "key is ${key}, value is ${value}"
}

// 带索引遍历
students.eachWithIndex { def student, int i ->
    println "index is ${i}, key is ${student.key}, value is ${student.value}"
}
students.eachWithIndex { key, value, i ->
    println "index is ${i}, key is ${key}, value is ${value}"
}
```

**查找**

```groovy
// 查找第一个及格的
def entry = students.find { def student ->
    student.value.score >= 60
}

// 查找所有及格的
def entries = students.findAll { def student ->
    student.value.score >= 60
}

// 统计及格人数
def count = students.count { def student ->
    student.value.score >= 60
}

// 查找所有及格同学的名字（转换）
def names = students.findAll { def student ->
    student.value.score >= 60
}.collect {
    it.value.name
}
```

**分组**

```groovy
// 按照是否及格分组
def group = students.groupBy { def student ->
    student.value.score >= 60 ? '及格' : '不及格'
}
```

**排序**

```groovy
def sorted = students.sort { s1, s2 ->
    s1.value.score - s2.value.score
}
```

## 3.3 范围

Groovy 中的范围 Range 其实是集成了 List 的，并提供了一些更方便的操作。

```java
public interface Range<T extends Comparable> extends List<T>
```

**定义**

```groovy
def range = 1..10

println range[0]            // 1
println range.contains(10)  // true
println range.from          // 1
println range.to            // 10
```

**遍历**

```groovy
range.each {
    println it
}

for (i in range) {
    println i
}
```

**switch 中使用 range**

```groovy
def getGrade(Number number) {
    def result
    switch (number) {
        case 0..<60:
            result = "F"
            break
        case 60..<70:
            result = "D"
            break
        case 70..<80:
            result = "C"
            break
        case 80..<90:
            result = "B"
            break
        case 90..100:
            result = "A"
            break
    }
}

println getGrade(60)  // D
```

# 4 面向对象

## 4.1 Groovy 中的类和接口



![image-20220603055027673](https://cc.hjfile.cn/cc/img/20220603/2022060305503105754807.png)

选择创建 Groovy Class 可以看到 Groovy 中有以下几种类型：

![image-20220603055038496](https://cc.hjfile.cn/cc/img/20220603/2022060305504030460881.png)

- Class：与 java 类似，Groovy 中默认都是 public 的，Groovy 所有的 class 都继承自 GroovyObject 接口。
- Interface：与 java 类似，Groovy 接口中不允许定义非 public 类型的方法。
- Trait：与接口相似，不同的是其中的方法可以有默认的实现，类似与 java 的抽象类。

```groovy
interface Action {
    void eat()
    void play()
}
```

```groovy
trait DefaultAction {
    abstract void eat()
    
    void play() {
        println "play"
    }
}
```

```groovy
class Person implements Action {
    String name
    Integer age
    
    def increaseAge(Integer years) {
        age += years
    }

    @Override
    void eat() {}

    @Override
    void play() {}
}
```

```groovy
// 无论使用 . 还是 get/set 方法，最终都是调用的是 get/set 方法
def person = new Person(name: "John", age: 30)
println "Name: ${person.name}, Age: ${person.age}"

person.increaseAge(10)
```

## 4.2 Groovy 元编程

Groovy 有强大的运行时机制，当发起一个方法调用后，会经过以下过程。

![image-20220603055923925](https://cc.hjfile.cn/cc/img/20220603/2022060305592602266615.png)

简单起见，从下往上介绍，先介绍 invokeMethod 和 methodMissing 方法。

```groovy
class Person {
    String name
    Integer age

    def increaseAge(Integer years) {
        age += years
    }

    /**
     * 方法找不到时，会调用此方法代替
     * @param methodName 方法名
     * @param args 方法参数
     * @return
     */
    def invokeMethod(String methodName, Object args) {
        return "the method is ${methodName} and the param are ${args}"
    }

    /**
     * 同 invokeMethod 作用，优先级高于 invokeMethod
     */
    def methodMissing(String methodName, Object args) {
        return "the method ${methodName} is missing"
    }
}
```

下面介绍 MetaClass，即 Groovy 中的元编程，该特性支持在运行时期为类动态地添加属性和方法。

```groovy
// 为类动态添加属性
Person.metaClass.sex = 'male'

def person = new Person(name: "John", age: 30)
println person.sex
person.sex = 'female'
println "the new sex is: " + person.sex

// 为类动态添加方法
Person.metaClass.nameUpperCase = { -> name.toUpperCase() }

println person.nameUpperCase()  // JOHN

// 为类动态添加静态方法
Person.metaClass.static.createPerson = {
    String name, int age -> new Person(name: name, age: age)
}

// 为类动态添加静态属性
Person.metaClass.static.type = 'human'
```

> 动态注入的方法和属性并不是持久的，程序运行时在其他地方调用不了动态添加的内容，如果像整个运行期间都可以调用，需要在添加属性和方法前调用如下方法。
>
> ```groovy
> ExpandoMetaClass.enableGlobally()
> ```





