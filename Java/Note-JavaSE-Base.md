数据类型转换

* 自动类型转换

  > 范围小的类型向范围大的类型提升， `byte、short、char` **运算时直接提升为** `int`。
  >
  > 范围大小：`byte、short、char‐‐>int‐‐>long‐‐>float‐‐>double`
  >
  > 范围大小不一定和占用字节数有关(浮点型)。

* 强制类型转换

  > 对于`byte/short/char`三种类型来说，如果右侧赋值的数值没有超过范围，
  > 那么javac编译器将会自动隐含地为我们补上一个(byte)(short)(char)。
  >
  > - 如果没有超过左侧的范围，编译器补上强转。
  >
  > - 如果右侧超过了左侧范围，那么直接编译器报错。

# 运算符

* 一旦运算当中有不同类型的数据，那么结果将会是数据类型范围大的那种。

* 复合赋值运算符其中隐含了一个强制类型转换。

  ```java
  public static void main(String[] args){   
  	short s = 1;   
  	s+=1;  
   	System.out.println(s);
  }
  ```

  > 分析：`s += 1`逻辑上看作是`s = s + 1`计算结果被提升为int类型，再向short类型赋值时发生错误，因为不能将取值范围 大的类型赋值到取值范围小的类型。但是，`s=s+1`进行两次运算 ，`+= `是一个运算符，只运算一次，并带有强制转换的特点，也就是说`s += 1`就是`s = (short)(s + 1)`，因此程序没有问题编译通过，运行结果是2

* 常亮和变量运算

  ```java
  public static void main(String[] args){
      byte b1=1;
      byte b2=2;
      byte b3=1 + 2;
      byte b4=b1 + b2;
      System.out.println(b3);
      System.out.println(b4); 
  }
  ```

  > 分析： `b3 = 1 + 2 `，1 和 2 是常量，为固定不变的数据，在编译的时候（编译器javac），已经确定了 1+2 的结果并没 有超过byte类型的取值范围，可以赋值给变量 b3 ，因此 `b3 = 1 + 2` 是正确的，编译的字节码文件中直接就是byte b3 = 3。
  > 反之，`b4 = b2 + b3`， b2 和 b3 是变量，变量的值是可能变化的，在编译的时候，编译器javac不确定b2+b3的结果是什 么，因此会将结果以int类型进行处理，所以int类型不能赋值给byte类型，因此编译失败。

* 三元运算符 

  `变量名称 = 条件判断 ? 表达式A : 表达式B`

  > 必须同时保证表达式A和表达式B都符合左侧数据类型的要求。
  >
  > 三元运算符的结果必须被使用(被赋值或输出)。

# 条件控制语句

**switch语句的注意事项**

* 多个case后面的数值不可以重复

* switch括号里的值只能是一下数据类型

  > 基本数据类型：byte、short、char、int
  >
  > 引用数据类型：String、enum

* **case穿透性**

  在switch语句中，如果case的后面不写break，将出现穿透现象，也就是不会在判断下一个case的值，直接向后运行，直到遇到break，或者整体switch结束。

  ```java
  public static void main(String[] args) {
  	switch (2){
          case 1:
        		System.out.println("第一");
         		break;
          case 2:
        		System.out.println("第二");
          case 3:
       		System.out.println("第三");
              break;
          default:
          	System.out.println("没上榜");
  	}
  }
  ```

  >上述程序中，执行`case 2`后，由于没有break语句，程序会一直向后走，不会在判断case，直到遇到break，或者整体switch结束。
  >结果输出了`第二`、`第三`

# 循环

* 死循环注意事项

  ```java
  public static void main(String[] args) {
      while (true) {
          System.out.println("循环执行中...")；
      }
      System.out.println("不循环了"); //编译不通过，提示无法访问的语句
  }
  ```

# 数组

## 数组的定义

```java
//动态初始化 (可以拆分成两步)
int[] arr1 = new int[3];  <==>  int[] arr1; arr1 = new int[3];
//静态初始化 (可以拆分成两步)
int[] arr2 = new int[] {10, 20, 30}; <==> int[] arr2; arr2 = new int[]{10, 20,30};
//静态初始化的省略格式 (不可以拆分成两步)
int[] arr3 = {10, 20, 30}; 
//int[] arr3; arr3 = {10, 20, 30} //编译不通过
```

## 数据默认值

| 数据类型                           | 默认值 |
| :--------------------------------- | :----- |
| 整数类型（byte、short、int、long） | 0      |
| 浮点类型（float、double）          | 0.0    |
| 字符类型（char）                   | '\000' |
| 布尔类型（boolean）                | false  |
| 引用类型                           | null   |

数组被初始化的时候都有默认值，静态初始化其实也有默认值，只不过系统自动马上将默认值替换成了具体数值。

##  Java虚拟机中的内存划分

| 区域名称                          | 作用                                                         |
| --------------------------------- | ------------------------------------------------------------ |
| 栈内存（Stack）                   | 方法运行时使用的内存，比如main方法运行，进入方法栈中执行（进栈或叫压栈）。 |
| 堆内存（Heap）                    | 存储对象或者数组，new来创建的，都存储在堆内存。              |
| 方法区（Method Area）             | 存储可以运行的class文件。                                    |
| 本地方法栈（Native Method Stack） | JVM在使用操作系统功能的时候使用，和我们开发无关。            |
| 寄存器（pc Register）             | 给CPU使用，和我们开发无关。                                  |

![](https://s2.ax1x.com/2019/05/07/Esi0U0.png)

## 数组在内存中的状态

![](https://s2.ax1x.com/2019/05/07/EsiiAx.png)

# 类和对象

## 对象在堆存中状态

* **一个对象在内存中**

  ![](https://s2.ax1x.com/2019/05/07/EsM8PJ.png)

  >1. 方法区最先加载数据，加载 Phone.class 和 Demo01PhoneOne.class ，其中的成员方法有了地址值。
  >2. main方法是程序的起点，main方法先进栈（压栈）。
  >3. main方法创建了Phone对象获取地址值，存放在堆中。堆中对象的成员变量参考方法区的Phone.class创建出来，并附上默认值；成员方法在堆中保存的是地址值，多个对象共享。
  >4. main方法访问对象one的成员变量，会根据one的地址值找到堆中的对象，进新访问（红箭头）
  >5. main访问对象one的成员方法call时，根据one地址值找到堆中对象（红箭头），再根据成员方法的地址值找到方法区中对应的方法call（绿箭头），call方法要运行，先进栈（压栈），然后获取参数并运行（蓝箭头），运行完成后直接从栈中消失（出栈，弹栈）
  >6. main方法继续执行sendMessage方法，与call方法同理，最后main执行完也出栈
  >
  >Tips：**出栈（压栈）**：在栈内存中运行的方法，遵循"先进后出，后进先出"的原则，后进的方法压在先进的方法上

* **多个对象在内存中**

  ![](https://s2.ax1x.com/2019/05/07/EswUEj.png)

## 成员变量和局部变量的区别

1. **定义的位置不一样【重点】**
局部变量：在方法的内部或方法生命上（形式参数）
成员变量：在方法的外部，直接写在类当中
2. **作用范围不一样【重点】**
    局部变量：方法中
    成员变量：类中
3. **默认值不一样【重点】**
    局部变量：没有默认值，必须先定义，赋值，最后使用
    成员变量：有默认值，规则和数组一样
4. **内存的位置不一样**
    局部变量：位于栈内存（和方法同步）
    成员变量：位于堆内存（和对象同步）
5. **生命周期不一样**
    局部变量：随着方法进栈（调用）而诞生，随着方法出栈（调用完毕）而消失
    成员变量：随着对象创建而诞生，随着对象被垃圾回收而消失

## Getter方法的特例

> 对于boolean值，Getter方法要写成**`isXxx()`**的形式，而不是`getXxx()`的形式

## 构造方法

```java
public class Person {
    public String name;
    public Person(String name) {
        this.name = name;
    }
    //已经存在显式构造方法，不会再有隐式空构造方法
    //每个类至少有一个构造方法
}
```

> 自定义类中没写构造方法，编译器会自动加上一个空参数空方法体的构造方法，但是如果写了带参数的构造方法，那将不会加上隐藏的构造方法。

# 常用API（一）

**`java.lang`**包下的内容不需要导包

## Scanner类

> Scanner类获取下一个字符串，不是~~nextString()~~（不存在） ，而是**`next()`**。

## 匿名对象

> `System.ou.println(new Scanner(System.in).nextInt());`

## Random类

```java
Random ran = new Random();
int a = ran.nextInt();	// int范围内的伪随机数
int b = ran.nextInt(10);	// [0,10)伪随机数
float c = ran.nextFloat();	// [0,1.0F)伪随机数
Double d = ran.nextDouble();	// [0,1.0)伪随机数
```

## ArrayList类

> 泛型只能是引用数据类型，不能是基本数据类型
>
> 包装类中特殊情况：int（Integer），char（Character）

* public boolean **add(E e)**：向集合当中添加元素，参数的类型和泛型一致。返回值代表添加是否成功。
  备注：对于ArrayList集合来说，add添加动作一定是成功的，所以返回值可用可不用。
  但是对于其他集合（今后学习）来说，add添加动作不一定成功。
* public E **get(int index)**：从集合当中获取元素，参数是索引编号，返回值就是对应位置的元素。
* public E **remove(int index)**：从集合当中删除元素，参数是索引编号，返回值就是被删除掉的元素。
* public int **size()**：获取集合的尺寸长度，返回值是集合中包含的元素个数。

## String类

### 字符串的特点：

1. 字符串的内容永不可变。【重点】
2. 正是因为字符串不可改变，所以字符串是可以**共享使用**的。
3. 字符串效果上相当于是char[]字符数组，但是**底层原理**是**byte[]字节数组**。

### 创建字符串的常见3+1种方式

* 三种构造方法

  `public String()`：创建一个空白字符串，不含有任何内容。

  `public String(char[] array)`：根据字符数组的内容，来创建对应的字符串。

  `public String(byte[] array)`：根据字节数组的内容，来创建对应的字符串。

  > Tips：`public String(byte[] array)`  是将byte数组中的数字转换为对应字符集的字符，再组合成字符串
  >
  > 如`String str = new String(new byte[]{65, 66, 67}；`，得到的`str == "ABC"`

* 一种直接创建

  String str = "Hello"; // 右边直接用双引号

注意：直接写上双引号，就是字符串对象。

### 字符串常量池

> **字符串常量池**：程序当中直接写上的双引号字符串，就在字符串常量池中。**字符串常量池在栈内存中**。

![](https://s2.ax1x.com/2019/05/07/Ey8OYT.png)

> str1：“abc”用底层的byte字节数组表示，根据字节数组创建字符串对象并存放在堆内存中的字符串常量池中，str1的引用指向该字符串对象
>
> str2：字符串常量池已经存在相同的字符串对象，直接将引用指向该对象
>
> str3：将字符数组转化为底层的byte字节数组，根据字节数组创建字符串对象，str3引用指向该对象

### 常用方法

* 判断

  `public boolean equals (Object anObject) `：将此字符串与指定对象进行比较。

  `public boolean equalsIgnoreCase (String anotherString) `：将此字符串与指定对象进行比较，忽略大小写。

* 获取

  `public int length () `：返回此字符串的长度。

  `public String concat (String str) `：将指定的字符串连接到该字符串的末尾。

  `public char charAt (int index)` ：返回指定索引处的 char值。

  `public int indexOf (String str) `：返回指定子字符串第一次出现在该字符串内的索引。

  `public String substring (int beginIndex) `：返回一个子字符串，从beginIndex开始截取字符串到字符串结尾。

  `public String substring (int beginIndex, int endIndex) `：返回一个子字符串，从beginIndex到
  endIndex截取字符串。含beginIndex，不含endIndex。

* 转换

  `public char[] toCharArray () `：将此字符串转换为新的字符数组。

  `public byte[] getBytes () `：使用平台的默认字符集将该String编码转换为新的字节数组。

  `public String replace (CharSequence target, CharSequence replacement)` ：将与target匹配的字符串使用replacement字符串替换。

* 分割

  `public String[] split(String regex) `：将此字符串按照给定的regex（规则）拆分为字符串数组。

> **注意：**
>
> 1. `replace(CharSequence target, CharSeqence replacement)`两个参数不是字符串，但是可以传入字符串对象
> 2. `split(String regex)`参数是正则表达式，不能按照"."来分割字符串

## static关键字

* 注意事项
  1. **静态不能直接访问非静态**。
  原因：因为在内存当中是【先】有的静态内容，【后】有的非静态内容。
  “先人不知道后人，但是后人知道先人。”
  2. **静态方法当中不能用this**。
  原因：this代表当前对象，通过谁调用的方法，谁就是当前对象。

* static内存状态

  ![](https://s2.ax1x.com/2019/05/08/EyoX4I.png)

  > 方法区有专门的静态区

* 静态代码块

  `static { }`：定义在成员位置，使用static修饰的代码块{ }。

  位置：类中方法外。

  执行：随着类的加载而执行且执行一次，优先于main方法和构造方法的执行。

  典型用途：用来一次性地对静态成员变量进行赋值。

  > 加载完类后，类的初始化就会发生，意味着它会初始化所有类静态成员，以下情况一个类被初始化：
  >
  > 1. 实例通过使用new()关键字创建或者使用class.forName()反射，但它有可能导致ClassNotFoundException。
  > 2. 类的静态方法被调用
  > 3. 类的静态域被赋值
  > 4. 静态域被访问，而且它不是常量
  > 5. 在顶层类中执行assert语句
  >
  > 所以在上述情况发后，静态代码块就会执行
  >
  > 参考自：[类在什么时候加载和初始化](http://www.importnew.com/6579.html "")

## Arrays类

`public static void sort(int[] a)` ：对指定的 int 型数组按数字升序进行排序。

`static String toString(int[] a)  `： 返回指定数组内容的字符串表示形式。

以上方法都有各种不同参数形式的重载，另外还有`copyOf(...)`，`copyOfRage(...)`两个数组赋值方法及其重载形式。

>备注：
>1. 如果是数值，sort默认按照升序从小到大
>2. 如果是字符串，sort默认按照字母升序
>3. 如果是自定义的类型，那么这个自定义的类需要有Comparable或者Comparator接口的支持。（今后学习）

## Math类

`public static double abs(double a) `：返回 double 值的绝对值。（有多种不同参数类型重载）

`public static double ceil(double a) `：返回大于等于参数的最小的整数（向上取整）。

`public static double floor(double a) `：返回小于等于参数最大的整数（向下取整）。

`public static long round(double a)` ：返回最接近参数的 long。(相当于四舍五入方法)

`Math.PI`：圆周率近似值

# 继承与多态

## 继承

```java
public class Fu {
    int numFu = 10;
    int num = 100;
    public void methodFu() {
        // 使用的是本类当中的，不会向下找子类的
        System.out.println(num);
    }
}

public class Zi extends Fu {
    int numZi = 20;
    int num = 200;
    public void methodZi() {
        // 因为本类当中有num，所以这里用的是本类的num
        System.out.println(num);
    }
}

public class Demo01ExtendsField {
    public static void main(String[] args) {
        Fu fu = new Fu(); // 创建父类对象
        System.out.println(fu.numFu); // 只能使用父类的东西，没有任何子类内容
        System.out.println("===========");

        Zi zi = new Zi();
        System.out.println(zi.numFu); // 10
        System.out.println(zi.numZi); // 20
        System.out.println("===========");

        // 直接访问，等号左边是谁，就优先用谁
        System.out.println(zi.num); // 优先子类，200
        System.out.println("===========");

        // 间接通过成员方法访问，这个方法是子类的，优先用子类的，没有再向上找
        zi.methodZi(); // 200
        // 间接通过成员方法访问，这个方法是在父类当中定义的，
        zi.methodFu(); // 100
    }
}
```

* **强烈注意**：在父子类的继承关系当中，如果成员变量重名，则创建子类对象时，访问有两种方式：
  * 直接通过子类对象访问成员变量：new对象的**等号左边**是谁，就优先用谁，没有则向上找。（非多态就本身，多态就父类。永远不会向下找，所以多态情况下`Fu obj = new Zi()`，obj访问不到子类特有的成员变量numZi）
  * 间接通过成员方法访问成员变量：该方法属于谁，就优先用谁，没有则向上找。（子类对象通过子类自己定义的新方法访问重名成员变量，则访问到子类变量；子类对象通过继承的父类方法访问重名成员变量，且子类本身没有重写该方法，访问到的是父类的变量）

### 方法重写

* 方法覆盖重写的注意事项：

  1. 必须保证父子类之间方法的名称相同，参数列表也相同

  2. **子类方法的返回值必须【小于等于】父类方法的返回值范围。（重写不可以提升方法返回值范围）**

     小扩展提示：java.lang.Object类是所有类的公共最高父类（祖宗类），java.lang.String就是Object的子类。

  3. **子类方法的权限必须【大于等于】父类方法的权限修饰符。（重写不可以降低方法的访问权限）**

     小扩展提示：public > protected > (default) > private

  > 以上好像是因为上转型限制。返回值（产物）的向上转型还是父类返回值（轿车也是车）；有人说不断降低方法访问权限最后就不能被继承了（private），违背了继承原则。
  >
  > 以上都是到处乱看的，没找到标准答案

### 构造方法

1. 构造方法的名字是与类名一致的。所以子类是无法继承父类构造方法的。
2. 构造方法的作用是初始化成员变量的。所以子类的初始化过程中，必须先执行父类的初始化动作。子类的构
造方法中默认有一个 super() ，表示调用父类的构造方法，父类成员变量初始化后，才可以给子类使用。（不写默认添加）
3. super()调用父类构造方法，必须是子类构造方法的第一个语句。不能一个子类构造调用多次super构造。

### super和this关键字

* super关键字的三种用法：
  1. 在子类的成员方法中，访问父类的成员变量。`super.xxx`
  2. 在子类的成员方法中，访问父类的成员方法。`super.xxx()`
  3. 在子类的构造方法中，访问父类的构造方法。`super()`

* this关键字的三种用法：
  1. 在本类的成员方法中，访问本类的成员变量。`this.xxx`
  2. 在本类的成员方法中，访问本类的另一个成员方法。`this.xxx()`
  3. 在本类的构造方法中，访问本类的另一个构造方法。`this()`

> 在第三种用法当中要注意：
>
> A. this(...)调用也必须是构造方法的第一个语句，唯一一个。
>
> B. super和this两种构造调用，不能同时使用。（都必须是第一句，故不可）
>
> `super(...)`，`this(...)`，super语句和this语句都不写构造方法名，this.Person()错的。

### super和this的内存图

![](https://s2.ax1x.com/2019/05/08/E6yTqx.png)

> 以上 `method(){} //子` 中有 `super.mathod()` 语句

## 抽象类

* 抽象方法 ： 没有方法体的方法。就是加上abstract关键字，然后去掉大括号，直接分号结束。

* 抽象类：包含抽象方法的类。在class之前写上abstract。

-------------

1. 抽象类不能创建对象，如果创建，编译无法通过而报错。只能创建其非抽象子类的对象。

  > 理解：假设创建了抽象类的对象，调用抽象的方法，而抽象方法没有具体的方法体，没有意义。

2. 抽象类中，可以有构造方法，是供子类创建对象时，初始化父类成员使用的。

  > 理解：子类的构造方法中，有默认的super()，需要访问父类构造方法。

3. 抽象类中，不一定包含抽象方法，但是有抽象方法的类必定是抽象类。

   > 理解：未包含抽象方法的抽象类，目的就是不想让调用者创建该类对象，通常用于某些特殊的类结构设计。（适配器模式）

4. 抽象类的子类，必须重写抽象父类中所有的抽象方法，否则，编译无法通过而报错。**除非该子类也是抽象
   类**。

   > 理解：假设不重写所有抽象方法，则类中可能包含抽象方法。那么创建对象后，调用抽象的方法，没有
   > 意义。

## 接口

* 接口中可包含内容

  * 如果是Java 7，那么接口中可以包含的内容有：
    1. 常量
    2. 抽象方法
* 如果是Java 8，还可以额外包含有：
    3. 默认方法
    4. 静态方法
  * 如果是Java 9，还可以额外包含有：
  5. 私有方法
  -------------------
  
* 接口的注意事项：

  * 如果实现类并没有覆盖重写接口中所有的抽象方法，那么这个实现类自己就必须是抽象类。*

  * 接口当中的抽象方法，修饰符必须是两个固定的关键字：public abstract
  * 这两个关键字修饰符，可以选择性地省略。

### 接口中内容

在Java 9+版本中，接口的内容可以有：

1. 成员变量其实是**常量**

  > 格式：
  > `[public] [static] [final] 数据类型 常量名称 = 数据值;
  > `
  >
  > 注意：
  > 常量必须进行赋值，而且一旦赋值不能改变。
  > 常量名称完全大写，用下划线进行分隔。

2. 接口中最重要的就是**抽象方法**

  > 格式：
  > `[public] [abstract] 返回值类型 方法名称(参数列表);`
  >
  > 注意：实现类必须覆盖重写接口所有的抽象方法，除非实现类是抽象类。

3. **默认方法**（Java 8开始，为了解决口升级，不修改实现类而新增的）

  > 格式：
  > `[public] default 返回值类型 方法名称(参数列表) { 方法体 }` 
  >
  > 注意：默认方法可以被继承，通过接口实现类对象调用，也可以被覆盖重写；
  >
  > 默认方法前**必须写default**，这不代表访问权限，访问权限还是public

4. **静态方法**（Java 8开始）

  > 格式：
  > `[public] static 返回值类型 方法名称(参数列表) { 方法体 }`
  >
  > 注意：应该通过接口名称进行调用，不能通过实现类对象调用接口静态方法，会报错

5. **私有方法**（Java 9开始，解决默认方法或静态方法中重复代码块问题，供他们调用）

  > 格式：普通私有方法：`private 返回值类型 方法名称(参数列表) { 方法体 }`
  >
  > 静态私有方法：`private static 返回值类型 方法名称(参数列表) { 方法体 }`
  >
  > 注意：private的方法只有接口自己才能调用，不能被实现类或别人使用。

默认方法冲突：参考 [Java8新特性--Interface中的default方法（接口默认方法）](https://blog.csdn.net/shallowinggg/article/details/78039372 "")

### 接口的注意事项

1. 接口是没有静态代码块或者构造方法的。

2. 一个类的直接父类是唯一的，但是一个类可以同时实现多个接口。

  格式：
  `public class MyInterfaceImpl implements MyInterfaceA, MyInterfaceB {
   // 覆盖重写所有抽象方法
  }`

3. 如果实现类所实现的多个接口当中，存在重复的抽象方法，那么只需要覆盖重写一次即可。

4. 如果实现类没有覆盖重写所有接口当中的所有抽象方法，那么实现类就必须是一个抽象类。

5. 如果实现类锁实现的多个接口当中，存在重复的默认方法，那么实现类一定要对冲突的默认方法进行覆盖重写。

6. 一个类如果直接父类当中的方法，和接口当中的默认方法产生了冲突，优先用父类当中的方法。

### 接口之间的多继承

1. 类与类之间是单继承的。直接父类只有一个。
2. 类与接口之间是多实现的。一个类可以实现多个接口。
3. 接口与接口之间是多继承的。

> 注意事项：
>
> 1. 多个父接口当中的抽象方法如果重复，没关系。
> 2. 多个父接口当中的默认方法如果重复，那么子接口必须进行默认方法的覆盖重写，【而且带着default关键字】。

## 多态

同意对象有不同的表现形体（小明有学生子类形态和人类父类形态）

### 多态中成员变量和成员方法的使用特点

成员变量：编译看左边，运行还看左边。

成员方法：编译看左边，运行看右边。

```java
public class Fu /*extends Object*/ {
    int num = 10;
    public void showNum() {
        System.out.println(num);
    }
    public void method() {
        System.out.println("父类方法");
    }
    public void methodFu() {
        System.out.println("父类特有方法");
    }
}

public class Zi extends Fu {
    int num = 20;
    int age = 16;
    @Override
    public void showNum() {
        System.out.println(num);
    }
    @Override
    public void method() {
        System.out.println("子类方法");
    }
    public void methodZi() {
        System.out.println("子类特有方法");
    }
}
```

* 成员变量：编译看左边，运行还看左边

  >1. 直接通过对象名称访问成员变量：看等号左边是谁，优先用谁，没有则向上找。
  >2. 间接通过成员方法访问成员变量：看该方法属于谁，优先用谁，没有则向上找。
  >
  >```java
  >public class Demo01MultiField {
  >    public static void main(String[] args) {
  >        // 使用多态的写法，父类引用指向子类对象
  >        Fu obj = new Zi();
  >        System.out.println(obj.num); // 父：10
  >//        System.out.println(obj.age); // 错误写法！
  >        System.out.println("=============");
  >
  >        // 子类没有覆盖重写，就是父：10
  >        // 子类如果覆盖重写，就是子：20
  >        obj.showNum();
  >    }
  >}
  >```
  >
  >

* 成员方法：编译看左边，运行看右边

  >在多态的代码当中，成员方法的访问规则是： 看new的是谁，就优先用谁，没有则向上找。
  >
  >```java
  >public class Demo02MultiMethod {
  >    public static void main(String[] args) {
  >        Fu obj = new Zi(); // 多态
  >
  >        obj.method(); // 父子都有，优先用子
  >        obj.methodFu(); // 子类没有，父类有，向上找到父类
  >
  >        // 编译看左边，左边是Fu，Fu当中没有methodZi方法，所以编译报错。
  >//        obj.methodZi(); // 错误写法！
  >    }
  >}
  >```

### 引用类型转换（向上转型和向下转型）

![](https://s2.ax1x.com/2019/05/08/EcVWzq.png)

> 向上转型一定是安全的，但是也有弊端：
>
> **对象一旦向上转型为父类，就无法调用子类原本特有的内容**
>
> 解决方案：【还原】，向下转型，即强转（不对就报ClassCastException，类型转换异常）

### instanceof

如何才能知道一个父类引用的对象，本来是什么子类？

格式：
`对象 instanceof 类名称`

这将会得到一个boolean值结果，也就是判断前面的对象能不能当做后面类型的实例。

```java
public static void giveMeAPet(Animal animal) {
    if (animal instanceof Dog) {
        Dog dog = (Dog) animal;
        dog.watchHouse(); // 如果是狗，让它去看家
    }
    if (animal instanceof Cat) {
        Cat cat = (Cat) animal;
        cat.catchMouse(); // 如果是猫，让它去抓老鼠
    }
}
```

## final关键字

* 修饰类

  > final类不能被继承，其中的成员方法都无法进行重写

* 修饰方法

  > final方法是最终方法，不能被重写；final和abstract关键字不能修饰同一方法，矛盾

* 修饰成员变量

  > 由于成员变量具有默认值，所以用了final之后**必须手动赋值**，不会再给默认值了。
  >
  > 2. 对于final的成员变量，要么使用直接赋值，要么通过构造方法赋值。二者选其一。
  > 3. 如果通过构造方法赋值，必须保证类当中所有重载的构造方法，都最终会对final的成员变量进行赋值。

* 修饰局部变量

  > * **基本类型**：基本类型的局部变量，被final修饰后，只能赋值一次，不能再更改。
  >
  > * **引用类型**：引用类型的局部变量，被final修饰后，只能指向一个对象，地址不能再更改。但是不影响对象内部的成员变量值的
  >
  >   如：`final Student stu = new Student();`stu中的属性（成员变量）还是可以改变的，只是stu不能再指向别的对象了。

  ```java
  // 正确写法！只要保证有唯一一次赋值即可，分两步正确
  final int num3;
  num3 = 30;
  ```

## 权限修饰符

|                          | public | protected | default | private |
| ------------------------ | :----: | :-------: | :-----: | :-----: |
| 同一类中（我自己）       |   √    |     √     |    √    |    √    |
| 同一包中（我邻居）       |   √    |     √     |    √    |         |
| 不同包中子类（我儿子）   |   √    |     √     |         |         |
| 不同包中无关类（陌生人） |   √    |           |         |         |

## 内部类

### 成员内部类

* 定义格式：

  ```java
  class 外部类 {
      class 内部类{
      }
  }
  ```

* 编译后字节码文件特点：

  内部类仍然是一个独立的类，在编译之后会内部类会被编译成独立的.class文件，但是前面冠以外部类的类名
  和$符号 。比如，Person$Heart.class

  > 通俗说：一个包含n个内部类的外部类编译后，会生成n+1个字节码文件，分别是Outer.class,   Outer$Inner_1.class,   Outer$Inner_2.class ,   ~~~,  Outer$Inner_n.class

* 访问特点

  * 内部类可以直接访问外部类的成员，包括私有成员。

  * 外部类要访问内部类的成员，必须要建立内部类的对象。

  在别的类中创建内部类对象格式：

  > 外部类名.内部类名 对象名 = new 外部类型().new 内部类型()；
  >
  > `Outer.Inner obj = new Outer().new Inner()；`
  >
  > 助记：前后都是**外.内**，而且有两个new，像是两个普通new对象格式合并成一个

* 重名问题

  如果出现了重名现象，内部类方法访问外部类成员变量，那么格式是：外部类名称.this.外部类成员变量名

  ```java
  public class Outer {
      int num = 10; // 外部类的成员变量
  
      public class Inner /*extends Object*/ {
          int num = 20; // 内部类的成员变量
          public void methodInner() {
              int num = 30; // 内部类方法的局部变量
              System.out.println(num); // 局部变量，就近原则
              System.out.println(this.num); // 内部类的成员变量
              System.out.println(Outer.this.num); // 外部类的成员变量******
          }
      }
  
  }
  ```

### 局部内部类

如果一个类是定义在一个方法内部的，那么这就是一个局部内部类。

“局部”：只有当前所属的方法才能使用它，出了这个方法外面就不能用了。【只能在当前方法内创建局部内部类对象并使用，其他地方都不能创建和使用局部内部类对象】

定义格式：

```java
修饰符 class 外部类名称 {
    修饰符 返回值类型 外部类方法名称(参数列表) {
        class 局部内部类名称 { //不能加任何修饰符
            // ...
        }
    }
}
```

小节一下类的权限修饰符：
public > protected > (default) > private

**【定义一个类的时候，权限修饰符规则】**：

1. 外部类：public / (default)
2. 成员内部类：public / protected / (default) / private
3. 局部内部类：什么都不能写（不等于default）

---------------------

局部内部类，如果希望访问所在方法的局部变量，那么这个局部变量必须是【有效final的】。

备注：从Java 8+开始，只要局部变量事实不变，那么final关键字可以省略。

原因（涉及到生命周期）：
1. new出来的对象在堆内存当中。
2. 局部变量是跟着方法走的，在栈内存当中。
3. 方法运行结束之后，立刻出栈，局部变量就会立刻消失。
4. 但是new出来的对象会在堆当中持续存在，直到垃圾回收消失。
```java
public class MyOuter {
    public void methodOuter() { // 局部方法
        int num = 10; // 所在方法的局部变量

        class MyInner {
            public void methodInner() {
                System.out.println(num);
            }
        }
        new MyInner().methodInner();
    }
}
```

### 匿名内部类

如果接口的实现类（或者是父类的子类）只需要使用唯一的一次（其实是对象只用一次，不是其中的方法只用一次），
那么这种情况下就可以省略掉该类的定义，而改为使用【匿名内部类】。

匿名内部类的定义格式：`接口名称 对象名 = new 接口名称() {
    // 覆盖重写所有抽象方法
};`

对格式“`new 接口名称() {...}`”进行解析：
1. `new`代表创建对象的动作
2. `接口名称`就是匿名内部类需要实现哪个接口
3. `{...}`这才是匿名内部类的内容

-------------------

示例：

```java
// 接口
public interface MyInterface {
    void method1(); // 抽象方法
    void method2();
}
```

```java
// 测试类
public class DemoMain {

    public static void main(String[] args) {
//        MyInterface obj = new MyInterfaceImpl();
//        obj.method();

//        MyInterface some = new MyInterface(); // 错误写法！

        // 使用匿名内部类，但不是匿名对象，对象名称就叫objA
        MyInterface objA = new MyInterface() {
            @Override
            public void method1() {
                System.out.println("匿名内部类实现了方法！111-A");
            }

            @Override
            public void method2() {
                System.out.println("匿名内部类实现了方法！222-A");
            }
        };
        objA.method1();
        objA.method2();
        System.out.println("=================================");

        // 使用了匿名内部类，而且省略了对象名称，也是匿名对象
        new MyInterface() {
            @Override
            public void method1() {
                System.out.println("匿名内部类实现了方法！111-B");
            }

            @Override
            public void method2() {
                System.out.println("匿名内部类实现了方法！222-B");
            }
        }.method1();
        // 因为匿名对象无法调用第二次方法，所以需要再创建一个匿名内部类的匿名对象
        new MyInterface() {
            @Override
            public void method1() {
                System.out.println("匿名内部类实现了方法！111-B");
            }

            @Override
            public void method2() {
                System.out.println("匿名内部类实现了方法！222-B");
            }
        }.method2();
    }

}
```

根据以上示例**注意**几点问题：
1. 匿名内部类，在【创建对象】的时候，只能使用唯一一次。
    如果希望多次创建对象，而且类的内容一样的话，那么就需要使用单独定义的实现类了。

2. 匿名对象，在【调用方法】的时候，只能调用唯一一次。
    如果希望同一个对象，调用多次方法，那么必须给对象起个名字。

3. 匿名内部类是省略了【实现类/子类名称】，但是匿名对象是省略了【对象名称】

  **【强调】**：匿名内部类和匿名对象不是一回事！！！

# 常用API（二）

## Object类

equals方法在IDEA中的自动重写

```java
import java.util.Objects;

public class Person {	
	private String name;
	private int age;
	
    @Override //这是用IDEA自动重写的，很精髓
    public boolean equals(Object o) {
        if (this == o)
            return true;
        // 如果参数为空，或者类型信息不一样，则认为不同
        //getClass() != o.getClass() 使用反射技术,判断o是否是Person类型  等效于 obj instanceof Person
        if (o == null || getClass() != o.getClass())
            return false;
        // 转换为当前类型
        Person person = (Person) o;
        // 要求基本类型相等，并且将引用类型交给java.util.Objects类的equals静态方法取用结果
        return age == person.age && Objects.equals(name, person.name);
    }
}
```

### Objects类

在刚才IDEA自动重写equals代码中，使用到了`java.util.Objects`类，那么这个类是什么呢？

在**JDK7**添加了一个Objects工具类，它提供了一些方法来操作对象，它由一些静态的实用方法组成，这些方法是null-save（空指针安全的）或null-tolerant（容忍空指针的），用于计算对象的hashcode、返回对象的字符串表示形式、比较两个对象。

在比较两个对象的时候，Object的equals方法容易抛出空指针异常，而Objects类中的equals方法就优化了这个问题。方法如下：

* `public static boolean equals(Object a, Object b)`:判断两个对象是否相等。

我们可以查看一下源码，学习一下：

```java
public static boolean equals(Object a, Object b) {  
    return (a == b) || (a != null && a.equals(b));  
}
```

## Date类

### 概述

` java.util.Date`类 表示特定的瞬间，精确到毫秒。

继续查阅Date类的描述，发现Date拥有多个构造函数，只是部分已经过时，但是其中有未过时的构造函数可以把毫秒值转成日期对象。

- `public Date()`：分配Date对象并初始化此对象，以表示分配它的时间（精确到毫秒）。（当前时间）
- `public Date(long date)`：分配Date对象并初始化此对象，以表示自从标准基准时间（称为“历元（epoch）”，即1970年1月1日00:00:00 GMT）以来的指定毫秒数。（计算机元年经历毫秒数之后的时间）

> tips: 由于我们处于东八区，所以我们的基准时间为1970年1月1日8时0分0秒。

简单来说：使用无参构造，可以自动设置当前系统时间的毫秒时刻；指定long类型的构造参数，可以自定义毫秒时刻。例如：

```java
import java.util.Date;

public class Demo01Date {
    public static void main(String[] args) {
        // 创建日期对象，把当前的时间
        System.out.println(new Date()); // Tue Jan 16 14:37:35 CST 2018
        // 创建日期对象，把当前的毫秒值转成日期对象
        System.out.println(new Date(0L)); // Thu Jan 01 08:00:00 CST 1970
    }
}
```

> tips:在使用println方法时，会自动调用Date类中的toString方法。Date类对Object类中的toString方法进行了覆盖重写，所以结果为指定格式的字符串。
>

### 常用方法

Date类中的多数方法已经过时，常用的方法有：

* `public long getTime()` 把日期对象转换成对应的时间毫秒值。

  > 相当于System.currentTimeMillis()

## DateFormat类

`java.text.DateFormat` 是日期/时间格式化子类的抽象类，我们通过这个类可以帮我们完成日期和文本之间的转换,也就是可以在Date对象与String对象之间进行来回转换。

* **格式化**：按照指定的格式，从Date对象转换为String对象。
* **解析**：按照指定的格式，从String对象转换为Date对象。

### 构造方法

由于DateFormat为抽象类，不能直接使用，所以需要常用的子类`java.text.SimpleDateFormat`。这个类需要一个模式（格式）来指定格式化或解析的标准。构造方法为：

* `public SimpleDateFormat(String pattern)`：用给定的模式和默认语言环境的日期格式符号构造SimpleDateFormat。

### 格式规则

常用的格式规则为：

| 标识字母（区分大小写） | 含义 |
| :--------------------: | ---- |
|           y            | 年   |
|           M            | 月   |
|           d            | 日   |
|           H            | 时   |
|           m            | 分   |
|           s            | 秒   |

> 备注：更详细的格式规则，可以参考SimpleDateFormat类的API文档。

### 常用方法

DateFormat类的常用方法有：

- `public String format(Date date)`：将Date对象格式化为字符串。
- `public Date parse(String source)`：将字符串解析为Date对象。

format方法

```java
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

//把Date对象转换成String
public class Demo03DateFormatMethod {
    public static void main(String[] args) {
        Date date = new Date();
        // 创建日期格式化对象,在获取格式化对象时可以指定风格
        DateFormat df = new SimpleDateFormat("yyyy年MM月dd日");
        String str = df.format(date);
        System.out.println(str); // 2008年1月23日
    }
}
```

parse方法

```java
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

// 把String转换成Date对象
public class Demo04DateFormatMethod {
    // parse方法，会抛出异常这里继续抛出给虚拟机处理
    public static void main(String[] args) throws ParseException {
        DateFormat df = new SimpleDateFormat("yyyy年MM月dd日");
        String str = "2018年12月11日";
        Date date = df.parse(str);
        System.out.println(date); // Tue Dec 11 00:00:00 CST 2018
    }
}
```

## calendar类

`java.util.Calendar`是日历类，在Date后出现，替换掉了许多Date的方法。该类将所有可能用到的时间信息封装为静态成员变量，方便获取。**日历类就是方便获取各个时间属性的**。

### 获取方式

**Calendar为抽象类**，由于语言敏感性，Calendar类在创建对象时并非直接创建，而是通过静态方法创建，返回子类对象，如下：

Calendar静态方法

* `public static Calendar getInstance()`：使用默认时区和语言环境获得一个日历

### 常用方法

根据Calendar类的API文档，常用方法有：

- `public int get(int field)`：返回给定日历字段的值。
- `public void set(int field, int value)`：将给定的日历字段设置为给定值。
- `public abstract void add(int field, int amount)`：根据日历的规则，为给定的日历字段添加或减去指定的时间量。
- `public Date getTime()`：返回一个表示此Calendar时间值（从历元到现在的毫秒偏移量）的Date对象。

Calendar类中提供很多成员常量，代表给定的日历字段：

| 字段值       | 含义                                  |
| ------------ | ------------------------------------- |
| YEAR         | 年                                    |
| MONTH        | 月（从0开始，可以+1使用）             |
| DAY_OF_MONTH | 月中的天（几号）                      |
| HOUR         | 时（12小时制）                        |
| HOUR_OF_DAY  | 时（24小时制）                        |
| MINUTE       | 分                                    |
| SECOND       | 秒                                    |
| DAY_OF_WEEK  | 周中的天（周几，周日为1，可以-1使用） |

#### get/set方法

get方法用来获取指定字段的值，set方法用来设置指定字段的值，代码使用演示：

```java
import java.util.Calendar;

public class CalendarUtil {
    public static void main(String[] args) {
        // 创建Calendar对象
        Calendar cal = Calendar.getInstance();
        // 设置年 
        int year = cal.get(Calendar.YEAR);
        // 设置月
        int month = cal.get(Calendar.MONTH) + 1;
        // 设置日
        int dayOfMonth = cal.get(Calendar.DAY_OF_MONTH);
        System.out.print(year + "年" + month + "月" + dayOfMonth + "日");
    }    
}
```

```java
import java.util.Calendar;

public class Demo07CalendarMethod {
    public static void main(String[] args) {
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.YEAR, 2020);
        System.out.print(year + "年" + month + "月" + dayOfMonth + "日"); // 2020年1月17日
    }
}
```

#### add方法

add方法可以对指定日历字段的值进行加减操作，如果第二个参数为正数则加上偏移量，如果为负数则减去偏移量。代码如：

```java
import java.util.Calendar;

public class Demo08CalendarMethod {
    public static void main(String[] args) {
        Calendar cal = Calendar.getInstance();
        System.out.print(year + "年" + month + "月" + dayOfMonth + "日"); // 2018年1月17日
        // 使用add方法
        cal.add(Calendar.DAY_OF_MONTH, 2); // 加2天
        cal.add(Calendar.YEAR, -3); // 减3年
        System.out.print(year + "年" + month + "月" + dayOfMonth + "日"); // 2015年1月18日; 
    }
}
```

#### getTime方法

Calendar中的getTime方法并不是获取毫秒时刻，而是拿到对应的Date对象。

```java
import java.util.Calendar;
import java.util.Date;

public class Demo09CalendarMethod {
    public static void main(String[] args) {
        Calendar cal = Calendar.getInstance();
        Date date = cal.getTime();
        System.out.println(date); // Tue Jan 16 16:03:09 CST 2018
    }
}
```

> Tips：
>
>   在Calendar类中，月份的表示是以0-11代表1-12月。
>

## System类

`java.lang.System`类中提供了大量的静态方法，可以获取与系统相关的信息或系统级操作，在System类的API文档中，常用的方法有：

- `public static long currentTimeMillis()`：返回以毫秒为单位的当前时间。
- `public static void arraycopy(Object src, int srcPos, Object dest, int destPos, int length)`：将数组中指定的数据拷贝到另一个数组中。

### currentTimeMillis方法

实际上，currentTimeMillis方法就是 获取当前系统时间与1970年01月01日00:00点之间的毫秒差值，**可以用来测试程序效率**，如下

验证for循环打印数字1-9999所需要使用的时间（毫秒）

~~~java
public class SystemTest1 {
    public static void main(String[] args) {
        long start = System.currentTimeMillis();
        for (int i = 0; i < 10000; i++) {
            System.out.println(i);
        }
        long end = System.currentTimeMillis();
        System.out.println("共耗时毫秒：" + (end - start));
    }
}
~~~

### arraycopy方法

* `public static void arraycopy(Object src, int srcPos, Object dest, int destPos, int length)`：将数组中指定的数据拷贝到另一个数组中。

数组的拷贝动作是系统级的，性能很高。System.arraycopy方法具有5个参数，含义分别为：

| 参数序号 | 参数名称 | 参数类型 | 参数含义             |
| -------- | -------- | -------- | -------------------- |
| 1        | src      | Object   | 源数组               |
| 2        | srcPos   | int      | 源数组索引起始位置   |
| 3        | dest     | Object   | 目标数组             |
| 4        | destPos  | int      | 目标数组索引起始位置 |
| 5        | length   | int      | 复制元素个数         |

将src数组中前3个元素，复制到dest数组的前3个位置上复制元素前：src数组元素[1,2,3,4,5]，dest数组元素[6,7,8,9,10]复制元素后：src数组元素[1,2,3,4,5]，dest数组元素[1,2,3,9,10]

```java
import java.util.Arrays;

public class Demo11SystemArrayCopy {
    public static void main(String[] args) {
        int[] src = new int[]{1,2,3,4,5};
        int[] dest = new int[]{6,7,8,9,10};
        System.arraycopy( src, 0, dest, 0, 3);
        /*代码运行后：两个数组中的元素发生了变化
         src数组元素[1,2,3,4,5]
         dest数组元素[1,2,3,9,10]
        */
    }
}
```

## StringBuilder类

![](https://s2.ax1x.com/2019/05/09/E2pcJP.png)

> String和StringBuilder类底层都是字符数组，但是String的字符数组被final修饰。由于String对象不可变，上图中拼接字符串后会形成5个字符串，占用空间多。
>
> StringBuilder是个字符串的缓冲区，即它是一个容器，容器中可以装很多字符串。并且能够对其中的字符串进行各种操作。
>
> StringBuilder的内部拥有一个数组用来存放字符串内容，进行字符串拼接时，直接在数组中加入新内容。StringBuilder会自动维护数组的扩容。

### 构造方法

根据StringBuilder的API文档，常用构造方法有2个：

- `public StringBuilder()`：构造一个空的StringBuilder容器。
- `public StringBuilder(String str)`：构造一个StringBuilder容器，并将字符串添加进去。

```java
public class StringBuilderDemo {
    public static void main(String[] args) {
        StringBuilder sb1 = new StringBuilder();
        System.out.println(sb1); // (空白)
        // 使用带参构造
        StringBuilder sb2 = new StringBuilder("itcast");
        System.out.println(sb2); // itcast
    }
}
```

### 常用方法

StringBuilder常用的方法有2个：

- `public StringBuilder append(...)`：添加任意类型数据的字符串形式，并返回当前对象自身。
- `public String toString()`：将当前StringBuilder对象转换为String对象。

#### append方法

append方法具有多种重载形式，可以接收任意类型的参数。任何数据作为参数都会将对应的字符串内容添加到StringBuilder中。例如：

```java
public class Demo02StringBuilder {
	public static void main(String[] args) {
		//创建对象
		StringBuilder builder = new StringBuilder();
		//public StringBuilder append(任意类型)
		StringBuilder builder2 = builder.append("hello");
		//对比一下
		System.out.println("builder:"+builder);
		System.out.println("builder2:"+builder2);
		System.out.println(builder == builder2); //true
	    // 可以添加 任何类型
		builder.append("hello");
		builder.append("world");
		builder.append(true);
		builder.append(100);
		// 在我们开发中，会遇到调用一个方法后，返回一个对象的情况。然后使用返回的对象继续调用方法。
        // 这种时候，我们就可以把代码现在一起，如append方法一样，代码如下
		//链式编程
		builder.append("hello").append("world").append(true).append(100);
		System.out.println("builder:"+builder);
	}
}
```

> 备注：StringBuilder已经覆盖重写了Object当中的toString方法。

#### toString方法

通过toString方法，StringBuilder对象将会转换为不可变的String对象。如：

```java
public class Demo16StringBuilder {
    public static void main(String[] args) {
        // 链式创建
        StringBuilder sb = new StringBuilder("Hello").append("World").append("Java");
        // 调用方法
        String str = sb.toString();
        System.out.println(str); // HelloWorldJava
    }
}
```

## 包装类

### 基本类型转换为String

基本类型转换String总共有三种方式，掌握最简单的即可

>1. 基本类型的值+""  最简单的方法(工作中常用)
>
>2. 包装类的静态方法toString(参数)
>
>  不是Object类的toString() 重载
>  static String toString(int i) 返回一个表示指定整数的 String 对象。
>
>3. String类的静态方法valueOf(参数)
>
>  static String valueOf(int i) 返回 int 参数的字符串表示形式。
>

String转换成对应的基本类型 

除了Character类之外，其他所有包装类都具有parseXxx静态方法可以将字符串参数转换为对应的基本类型：

- `public static byte parseByte(String s)`：将字符串参数转换为对应的byte基本类型。
- `public static short parseShort(String s)`：将字符串参数转换为对应的short基本类型。
- `public static int parseInt(String s)`：将字符串参数转换为对应的int基本类型。
- `public static long parseLong(String s)`：将字符串参数转换为对应的long基本类型。
- `public static float parseFloat(String s)`：将字符串参数转换为对应的float基本类型。
- `public static double parseDouble(String s)`：将字符串参数转换为对应的double基本类型。
- `public static boolean parseBoolean(String s)`：将字符串参数转换为对应的boolean基本类型。

# Collection集合

集合按照其存储结构可以分为两大类，分别是单列集合`java.util.Collection`和双列集合`java.util.Map`，这里我们主要学习`Collection`集合

* **Collection**：单列集合类的根接口，用于存储一系列符合某种规则的元素，它有两个重要的子接口，分别是`java.util.List`和`java.util.Set`。其中，`List`的特点是元素有序、元素可重复。`Set`的特点是元素无序，而且不可重复。`List`接口的主要实现类有`java.util.ArrayList`和`java.util.LinkedList`，`Set`接口的主要实现类有`java.util.HashSet`和`java.util.TreeSet`。

![](https://s2.ax1x.com/2019/05/10/E25A2t.png)

> 注意：TreeSet和HashSet无序，LinkedHashSet有序

集合本身是一个工具，它存放在java.util包中。在`Collection`接口定义着单列集合框架中最最共性的内容。

## Collertion接口的常用方法

Collection是所有单列集合的父接口，因此在Collection中定义了单列集合(List和Set)通用的一些方法，这些方法可用于操作所有的单列集合。方法如下：

- `public boolean add(E e)`：  把给定的对象添加到当前集合中 。
- `public void clear()` :清空集合中所有的元素。
- `public boolean remove(E e)`: 把给定的对象在当前集合中删除。
- `public boolean contains(E e)`: 判断当前集合中是否包含给定的对象。
- `public boolean isEmpty()`: 判断当前集合是否为空。
- `public int size()`: 返回集合中元素的个数。
- `public Object[] toArray()`: 把集合中的元素，存储到数组中。
- `public Iterator<E> Iterator()`: 返回一个迭代器对象

## Iterator接口

为了遍历集合中的所有元素，JDK专门提供了一个接口`java.util.Iterator`。

`Iterator`接口也是Java集合中的一员，但它与`Collection`、`Map`接口有所不同，`Collection`接口与`Map`接口主要用于存储元素，而`Iterator`主要用于迭代访问（即遍历）`Collection`中的元素，因此`Iterator`对象也被称为迭代器。

想要遍历Collection集合，那么就要获取该集合迭代器完成迭代操作，下面介绍一下获取迭代器的方法：

- `public Iterator<E> iterator()`: 获取集合对应的迭代器，用来遍历集合中的元素的。

  > * collcetion各种实现类继承了该方法，所以实现类对象或向上转型对象都能使用该方法创建迭代器。
  > * Iterator<E>接口也是有泛型的,迭代器的泛型跟着集合走,集合是什么泛型,迭代器就是什么泛型。

下面介绍一下迭代的概念：

- **迭代**：即Collection集合元素的通用获取方式。在取元素之前先要判断集合中有没有元素，如果有，就把这个元素取出来，继续在判断，如果还有就再取出出来。一直把集合中的所有元素全部取出。这种取出方式专业术语称为迭代。

Iterator接口的常用方法如下：

- `public E next()`:返回迭代的下一个元素。
- `public boolean hasNext()`:如果仍有元素可以迭代，则返回 true。

**迭代器的使用步骤(重点)**:

1. 使用集合中的方法iterator()获取迭代器的实现类对象,使用Iterator接口接收(多态)
2. 使用Iterator接口中的方法hasNext判断还有没有下一个元素
3. 使用Iterator接口中的方法next取出集合中的下一个元素

```java
public class IteratorDemo {
  	public static void main(String[] args) {
        // 使用多态方式 创建对象
        Collection<String> coll = new ArrayList<String>();

        // 添加元素到集合
        coll.add("串串星人");
        coll.add("吐槽星人");
        coll.add("汪星人");
        //遍历
        //使用迭代器 遍历   每个集合对象都有自己的迭代器
        Iterator<String> it = coll.iterator();
        //  泛型指的是 迭代出 元素的数据类型
        while(it.hasNext()){ //判断是否有迭代元素
            String s = it.next();//获取迭代出的元素
            System.out.println(s);
        }
  	}
}
```

> tips:：在进行集合元素取出时，如果集合中已经没有元素了，还继续使用迭代器的next方法，将会发生java.util.NoSuchElementException没有集合元素的错误。

### 迭代器实现原理

Iterator迭代器对象在遍历集合时，内部采用指针的方式来跟踪集合中的元素

![](https://s2.ax1x.com/2019/05/10/ERKg8U.png)

在调用Iterator的next方法之前，迭代器的索引位于第一个元素之前，不指向任何元素，当第一次调用迭代器的next方法后，迭代器的索引会向后移动一位，指向第一个元素并将该元素返回，当再次调用next方法时，迭代器的索引会指向第二个元素并将该元素返回，依此类推，直到hasNext方法返回false，表示到达了集合的末尾，终止对元素的遍历。

## 增强for循环

增强for循环(也称for each循环)是**JDK1.5**以后出来的一个高级for循环，专门用来遍历数组和集合的。它的内部原理其实是个Iterator迭代器，所以在遍历的过程中，不能对集合中的元素进行增删操作。

```java
for(元素的数据类型  变量 : Collection集合or数组){ 
  	//写操作代码
}
```

* iterable接口：实现这个接口允许对象成为 "foreach" 语句的目标。 

  collection接口实现了iterable接口，所以可以使用增强for遍历

增强for于遍历Collection和数组。通常只进行遍历元素，不要在遍历的过程中对集合元素进行增删操作。

> tips: 新for循环必须有被遍历的目标。目标只能是Collection或者是数组。新式for仅仅作为遍历操作出现。

# 泛型

我们都知道集合中是可以存放任意对象的，只要把对象存储集合后，那么这时他们都会被提升成Object类型。当我们在取出每一个对象，并且进行相应的操作，这时必须采用类型转换。

~~~java
public class GenericDemo {
	public static void main(String[] args) {
		Collection coll = new ArrayList();
		coll.add("abc");
		coll.add("itcast");
		coll.add(5);//由于集合没有做任何限定，任何类型都可以给其中存放
		Iterator it = coll.iterator();
		while(it.hasNext()){
			//需要打印每个字符串的长度,就要把迭代出来的对象转成String类型
			String str = (String) it.next();
			System.out.println(str.length());
		}
	}
}
~~~

程序在运行时发生了问题**java.lang.ClassCastException**，类型转换异常。

在JDK5之后，新增了**泛型**(**Generic**)语法，让你在设计API时可以指定类或方法支持泛型，这样我们使用API的时候也变得更为简洁，并得到了编译时期的语法检查。

> tips:一般在创建对象时，将未知的类型确定具体的类型。当没有指定泛型时，默认类型为Object类型。

## 使用泛型的好处

* 将运行时期的ClassCastException，转移到了编译时期变成了编译失败。
* 避免了类型强转的麻烦。

通过我们如下代码体验一下：

~~~java
public class GenericDemo2 {
	public static void main(String[] args) {
        Collection<String> list = new ArrayList<String>();
        list.add("abc");
        list.add("itcast");
        // list.add(5);//当集合明确类型后，存放类型不一致就会编译报错
        // 集合已经明确具体存放的元素类型，那么在使用迭代器的时候，迭代器也同样会知道具体遍历元素类型
        Iterator<String> it = list.iterator();
        while(it.hasNext()){
            String str = it.next();
            //当使用Iterator<String>控制元素类型后，就不需要强转了。获取到的元素直接就是String类型
            System.out.println(str.length());
        }
	}
}
~~~

> tips:泛型是数据类型的一部分，我们将类名与泛型合并一起看做数据类型。

## 泛型的定义与使用

### 类中使用泛型

定义格式：

```java
修饰符 class 类名<E> {  }
```

使用方法：**在创建对象的时候确定泛型**

### 方法中使用泛型

定义格式：

```java
修饰符 <E> 返回值类型 方法名(参数列表(使用泛型)){  }
```

传递什么类型的参数,泛型就是什么类型

使用方法：**含有泛型的方法,在调用方法的时候确定泛型的数据类型**

### 接口中使用泛型

定义格式：

```java
修饰符 interface接口名<E> {  }
```

使用方法：

1. **定义实现类时确定泛型的类型**

   定义接口的实现类，实现接口，指定接口的泛型。

   下例：定义接口(Iterator)的实现类(Scanner)，实现接口(Iterator)，指定接口的泛型(String)。

   > ```java
   > public interface Iterator<E> {
   >     E next();
   > }    
   > ```
   >
   > Scanner类实现了Iterator接口,并指定接口的泛型为String,所以重写的next方法泛型默认就是String
   >
   > ```java
   > public final class Scanner implements Iterator<String>{
   >     public String next() {}
   > }
   > ```

   

2. **接口的实现类不确定泛型，创建实现类对象时，确定泛型的类型**

   接口使用什么泛型,实现类就使用什么泛型,类跟着接口走

   就相当于定义了一个含有泛型的类,创建对象的时候确定泛型的类型

   下例：接口(List)的实现类(ArrayList)不确定泛型，创建实现类对象(StringLists)时，确定泛型的类型(String)

   > ```java
   > public interface List<E>{
   >     boolean add(E e);
   >     E get(int index);
   > }
   > ```
   >
   > 实现类ArrayList不指定泛型
   >
   > ```java
   > public class ArrayList<E> implements List<E>{
   >     public boolean add(E e) {}
   >     public E get(int index) {}
   > }
   > ```
   >
   > 创建ArrayList对象时确定泛型类型为String
   >
   > ```java
   > ArrayList<String> StringLists = new ArrayList<>();
   > ```

## 泛型的通配符

当使用泛型类或者接口时，传递的数据中，泛型类型不确定，可以通过通配符<?>表示。但是一旦使用泛型的通配符后，只能使用Object类中的共性方法，集合中元素自身方法无法使用。

### 通配符基本使用

泛型的通配符:**不知道使用什么类型来接收的时候,此时可以使用?，?表示未知通配符。**

此时只能接受数据,不能往该集合中存储数据。

~~~java
public static void main(String[] args) {
    ArrayList<Integer> list1 = new ArrayList<>();
    getElement(list1);
    
    ArrayList<String> list2 = new ArrayList<>();
    getElement(list2);
}
public static void getElement(ArrayList<?> list){}
//？代表可以接收任意类型
//将方法上的？替换成Object是行不通的，因为泛型不存在继承关系
~~~

tips：泛型不存在继承关系

ArrayList<Object> list = new ArrayList<String>();这种是错误的。

不存在继承Collection<String> list = new ArrayList<String>();是对的，是继承


### 通配符高级使用（受限泛型）

之前设置泛型的时候，实际上是可以任意设置的，只要是类就可以设置。但是在Java的泛型中可以指定一个泛型的**上限**和**下限**。

**泛型的上限**：

* **格式**： `类型名称 <? extends 类 > 对象名称`
* **意义**： `只能接收该类型及其子类`

**泛型的下限**：

- **格式**： `类型名称 <? super 类 > 对象名称`
- **意义**： `只能接收该类型及其父类型`

比如：现已知Object类，String 类，Number类，Integer类，其中Number是Integer的父类

~~~java
public static void main(String[] args) {
    Collection<Integer> list1 = new ArrayList<Integer>();
    Collection<String> list2 = new ArrayList<String>();
    Collection<Number> list3 = new ArrayList<Number>();
    Collection<Object> list4 = new ArrayList<Object>();
    
    getElement(list1);
    getElement(list2);//报错
    getElement(list3);
    getElement(list4);//报错
  
    getElement2(list1);//报错
    getElement2(list2);//报错
    getElement2(list3);
    getElement2(list4);
  
}
// 泛型的上限：此时的泛型?，必须是Number类型或者Number类型的子类
public static void getElement1(Collection<? extends Number> coll){}
// 泛型的下限：此时的泛型?，必须是Number类型或者Number类型的父类
public static void getElement2(Collection<? super Number> coll){}
~~~

# 常见数据结构

## 栈

* **栈**：**stack**,又称堆栈，它是运算受限的线性表，其限制是仅允许在标的一端进行插入和删除操作，不允许在其他任何位置进行添加、查找、删除等操作。

简单的说：采用该结构的集合，对元素的存取有如下的特点

* 先进后出（即，存进去的元素，要在后它后面的元素依次取出后，才能取出该元素）。例如，子弹压进弹夹，先压进去的子弹在下面，后压进去的子弹在上面，当开枪时，先弹出上面的子弹，然后才能弹出下面的子弹。

* 栈的入口、出口的都是栈的顶端位置。

  ![](https://s2.ax1x.com/2019/05/10/ERvk9K.png)

这里两个名词需要注意：

* **压栈**：就是存元素。即，把元素存储到栈的顶端位置，栈中已有元素依次向栈底方向移动一个位置。
* **弹栈**：就是取元素。即，把栈的顶端位置元素取出，栈中已有元素依次向栈顶方向移动一个位置。

## 队列

* **队列**：**queue**,简称队，它同堆栈一样，也是一种运算受限的线性表，其限制是仅允许在表的一端进行插入，而在表的另一端进行删除。

简单的说，采用该结构的集合，对元素的存取有如下的特点：

* 先进先出（即，存进去的元素，要在后它前面的元素依次取出后，才能取出该元素）。例如，小火车过山洞，车头先进去，车尾后进去；车头先出来，车尾后出来。
* 队列的入口、出口各占一侧。例如，下图中的左侧为入口，右侧为出口。

![](https://s2.ax1x.com/2019/05/10/ERvKAI.png)

## 数组

![](https://s2.ax1x.com/2019/05/10/ERxmxU.png)

* **数组**:**Array**,是有序的元素序列，数组是在内存中开辟一段连续的空间，并在此空间存放元素。就像是一排出租屋，有100个房间，从001到100每个房间都有固定编号，通过编号就可以快速找到租房子的人。

简单的说,采用该结构的集合，对元素的存取有如下的特点：

*  查找元素快：通过索引，可以快速访问指定位置的元素

   ![](https://s2.ax1x.com/2019/05/10/ERvMNt.png)

*  增删元素慢
  * **指定索引位置增加元素**：需要创建一个新数组，将指定新元素存储在指定索引位置，再把原数组元素根据索引，复制到新数组对应索引的位置。如下图![](https://s2.ax1x.com/2019/05/10/ERv8gS.png)
  * **指定索引位置删除元素：**需要创建一个新数组，把原数组元素根据索引，复制到新数组对应索引的位置，原数组中指定索引位置元素不复制到新数组中。如下图![](https://s2.ax1x.com/2019/05/10/ERv19f.png)

## 链表

* **链表**:**linked list**,由一系列结点node（链表中每一个元素称为结点）组成，结点可以在运行时动态生成。每个结点包括两个部分：一个是存储数据元素的数据域，另一个是存储下一个结点地址的指针域。我们常说的链表结构有单向链表与双向链表，那么这里给大家介绍的是**单向链表**。

  ![](https://s2.ax1x.com/2019/05/10/ERvA1O.png)

简单的说，采用该结构的集合，对元素的存取有如下的特点：

* 多个结点之间，通过地址进行连接。例如，多个人手拉手，每个人使用自己的右手拉住下个人的左手，依次类推，这样多个人就连在一起了。

  ![](https://s2.ax1x.com/2019/05/10/ERvEcD.png)

* 查找元素慢：想查找某个元素，需要通过连接的节点，依次向后查找指定元素

* 增删元素快：

  *  增加元素：只需要修改连接下个元素的地址即可。

    ![](https://s2.ax1x.com/2019/05/10/ERvYuQ.png)

  *  删除元素：只需要修改连接下个元素的地址即可。

    ![](https://s2.ax1x.com/2019/05/10/ERvGjg.png)

![](https://s2.ax1x.com/2019/05/10/ERzckR.png)

## 红黑树

* **二叉树**：**binary tree** ,是每个结点不超过2的有序**树（tree）** 。

简单的理解，就是一种类似于我们生活中树的结构，只不过每个结点上都最多只能有两个子结点。

二叉树是每个节点最多有两个子树的树结构。顶上的叫根结点，两边被称作“左子树”和“右子树”。

如图：

![](https://s2.ax1x.com/2019/05/10/ERvQ4P.png)

我们要说的是二叉树的一种比较有意思的叫做**红黑树**，红黑树本身就是一颗二叉查找树，将节点插入后，该树仍然是一颗二叉查找树。也就意味着，树的键值仍然是有序的。

红黑树的约束:

1. 节点可以是红色的或者黑色的


2. 根节点是黑色的


3. 叶子节点(特指空节点)是黑色的
4. 每个红色节点的子节点都是黑色的
5. 任何一个节点到其每一个叶子节点的所有路径上黑色节点数相同

红黑树的特点:

​	速度特别快,趋近平衡树,查找叶子元素最少和最多次数不多于二倍

![](https://s2.ax1x.com/2019/05/10/ERzX1f.png)

> **红黑树折半查找效率很高**，在后面HashSet有涉及

# List集合

## List接口介绍

`java.util.List`接口继承自`Collection`接口，是单列集合的一个重要分支，习惯性地会将实现了`List`接口的对象称为List集合。在List集合中允许出现重复的元素，所有的元素是以一种线性方式进行存储的，在程序中可以通过索引来访问集合中的指定元素。另外，List集合还有一个特点就是元素有序，即元素的存入顺序和取出顺序一致。

List接口特点：

1. **它是一个元素存取有序的集合**。例如，存元素的顺序是11、22、33。那么集合中，元素的存储就是按照11、22、33的顺序完成的）。
2. **它是一个带有索引的集合，通过索引就可以精确的操作集合中的元素**（与数组的索引是一个道理）。
3. **集合中可以有重复的元素**，通过元素的equals方法，来比较是否为重复的元素。

> tips:我们已经学习过List接口的子类java.util.ArrayList类，该类中的方法都是来自List中定义。

## List接口中常用方法

List作为Collection集合的子接口，不但继承了Collection接口中的全部方法，而且还增加了一些根据元素索引来操作集合的特有方法，如下：

- `public void add(int index, E element)`: 将指定的元素，添加到该集合中的指定位置上。
- `public E get(int index)`:返回集合中指定位置的元素。
- `public E remove(int index)`: 移除列表中指定位置的元素, 返回的是被移除的元素。
- `public E set(int index, E element)`:用指定元素替换集合中指定位置的元素,返回值的更新前的元素。

## List接口常用实现类

### ArrayList集合

`java.util.ArrayList`集合底层数据存储的结构是可增长的**数组结构**（基于数组实现的链表）。元素增删慢，查找快，由于日常开发中使用最多的功能为查询数据、遍历数据，所以`ArrayList`是最常用的集合。ArrayList集合线程不安全(不同步的)。

许多程序员开发时非常随意地使用ArrayList完成任何需求，并不严谨，这种用法是不提倡的。

### LinkedList集合

`java.util.LinkedList`集合数据存储的结构是**双向链表**（通过源码知道，不是数组，是节点Node）结构。方便元素添加、删除的集合。

> LinkedList是一个**双向链表**，那么双向链表是什么样子的呢，我们用个图了解下

![](https://s2.ax1x.com/2019/05/10/ERv338.png)

实际开发中对一个集合元素的添加与删除经常涉及到首尾操作，而LinkedList提供了大量首尾操作的方法。这些方法我们作为了解即可：

增：

- `public void addFirst(E e)`:将指定元素插入此列表的开头。
- `public void addLast(E e)`:将指定元素添加到此列表的结尾。
- `public void push(E e)`:将元素推入此列表所表示的堆栈。（API指明等效于addFirst）

删：

- `public E removeFirst()`:移除并返回此列表的第一个元素。
- `public E removeLast()`:移除并返回此列表的最后一个元素。
- `public E pop()`:从此列表所表示的堆栈处弹出一个元素。（API指明等效于removeFirst）

改：

*  `public E set(int index, E element) `：将此列表中指定位置的元素替换为指定的元素，返回此位置以前的元素。

查：

- `public E getFirst()`:返回此列表的第一个元素。
- `public E getLast()`:返回此列表的最后一个元素。
- `public boolean isEmpty()`：如果列表不包含元素，则返回true。


> LinkedList是List的子类，List中的方法LinkedList都是可以使用，这里就不做详细介绍，我们只需要了解LinkedList的特有方法即可。在开发时，LinkedList集合也可以作为堆栈，队列的结构使用。（了解即可）

### Vector集合

Vector是1.0版本就有的单列集合，和ArrayList集合一样，底层是可增长的对象**数组**，是同步的（单线程的，线程安全）。

# Set集合

 Set接口的特点:

1. 不允许存储重复的元素
2. 没有索引，没有带索引的方法，所以不能使用普通的for循环遍历

> Tips：Set集合取出元素的方式可以采用：迭代器、增强for。

## HashSet

`java.util.HashSet`是`Set`接口的一个实现类，它所存储的元素是不可重复的，并且元素都是无序的(即存取顺序不一致)。`java.util.HashSet`底层的实现其实是由哈希表（`java.util.HashMap`实例，只包含<K,V>中的Key，所以不能重复）支持。

`HashSet`是根据对象的哈希值来确定元素在集合中的存储位置，因此**具有良好的存取和查找性能**。保证元素唯一性的方式依赖于：`hashCode`与`equals`方法。

1. 不允许存储重复的元素
2. 没有索引,没有带索引的方法,也不能使用普通的for循环遍历
3. 是一个无序的集合,存储元素和取出元素的顺序有可能不一致
4. 底层是一个哈希表结构(查询的速度非常的快)

## HashSet集合存储数据的结构（哈希表）

### 哈希值

哈希值：是一个十进制的整数,由系统随机给出(就是对象的地址值,是一个逻辑地址,是模拟出来得到地址,不是数据实际存储的物理地址)

```java
//Object类的hashCode方法的源码:
public native int hashCode();
//native:代表该方法调用的是本地操作系统的方法

//toString方法的源码:
return getClass().getName() + "@" + Integer.toHexString(hashCode());
```

### 哈希表

在**JDK1.8**之前，哈希表底层采用数组+链表实现，即使用链表处理冲突，同一hash值的链表都存储在一个链表里。但是当位于一个桶中的元素较多，即hash值相等的元素较多时，通过key值依次查找的效率较低。而JDK1.8中，哈希表存储采用数组+链表+红黑树实现，当链表长度超过阈值（8）时，将链表转换为红黑树，这样大大减少了查找时间。

简单的来说，哈希表是由数组+链表+红黑树（JDK1.8增加了红黑树部分）实现的，如下图所示。

![](https://s2.ax1x.com/2019/05/10/EWnyH1.png)

![](https://s2.ax1x.com/2019/05/10/ERvenH.png)

为了方便理解结合一个存储流程图来说明：

![](https://s2.ax1x.com/2019/05/10/ERvmBd.png)

总而言之，**JDK1.8**引入红黑树大程度优化了HashMap的性能，那么对于我们来讲保证HashSet集合元素的唯一，其实就是根据对象的hashCode和equals方法来决定的。

【所以】如果我们往集合中存放自定义的对象，那么保证其唯一，就**必须重写hashCode和equals方**法建立属于当前对象的比较方式。

## Set集合存储元素不重复原理

**【注意】Set集合要存储自定义元素，需要重写HashCode和equals方法，用以判断元素重复性。**

![](https://s2.ax1x.com/2019/05/10/EWnIud.png)

## HashSet存储自定义类型元素

**给HashSet中存放自定义类型元素时，需要重写对象中的hashCode和equals方法**，建立自己的比较方式，才能保证HashSet集合中的对象唯一

创建自定义Student类，姓名和年龄相同的对象视为同一元素

~~~java
public class Student {
    private String name;
    private int age;

    public Student() {
    }
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
	//省略Getter和Setter方法

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Student student = (Student) o;
        return age == student.age &&
               Objects.equals(name, student.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}
~~~

~~~java
public class HashSetDemo2 {
    public static void main(String[] args) {
        //创建集合对象   该集合中存储 Student类型对象
        HashSet<Student> stuSet = new HashSet<Student>();
        //存储 
        Student stu = new Student("于谦", 43);
        stuSet.add(stu);
        stuSet.add(new Student("郭德纲", 44));
        stuSet.add(new Student("于谦", 43));
        stuSet.add(new Student("郭麒麟", 23));
        stuSet.add(stu);

        for (Student stu2 : stuSet) {
            System.out.println(stu2);
        }
    }
}
执行结果：
Student [name=郭德纲, age=44]
Student [name=于谦, age=43]
Student [name=郭麒麟, age=23]
~~~

## LinkedHashSet

LinkedHashSet集合特点:

底层是一个哈希表(数组+链表/红黑树)+链表:多了一条链表(记录元素的存储顺序),保证**元素有序**

```java
public class LinkedHashSetDemo {
	public static void main(String[] args) {
		Set<String> set = new LinkedHashSet<String>();
		set.add("bbb");
		set.add("aaa");
		set.add("abc");
		set.add("bbc");
        Iterator<String> it = set.iterator();
		while (it.hasNext()) {
			System.out.println(it.next());
		}
	}
}
结果：
  bbb
  aaa
  abc
  bbc
```

## 可变参数

在**JDK1.5**之后，当方法的参数列表数据类型已经确定,但是参数的个数不确定,就可以使用可变参数，格式：

```java
修饰符 返回值类型 方法名(参数类型... 形参名){  }
//方法接收到的参数其实是一个名为“参数名”的数组
```

 可变参数的原理：可变参数底层就是一个数组，根据传递参数个数不同，会创建不同长度的数组,来存储这些参数，传递的参数个数，可以是0个(不传递)，1，2...多个。其实这个书写完全等价与

```java
修饰符 返回值类型 方法名(参数类型[] 形参名){  }
```

只是后面这种定义，在调用时必须传递数组，而前者可以直接传递数据即可。

同样是代表数组，但是在调用这个带有可变参数的方法时，不用创建数组(这就是简单之处)，直接将数组中的元素作为实际参数进行传递，其实编译成的class文件，将这些元素先封装到一个数组中，在进行传递。这些动作都在编译.class文件时，自动完成了。

```java
public class Demo01VarArgs {
    public static void main(String[] args) {
        //int i = add(10,20);
        int i = add(10,20,30,40,50,60,70,80,90,100);
        System.out.println(i);
    }

    public static int add(int...arr){ //arr其实是int型数组
        int sum = 0;
        for (int i : arr) {
            sum += i;
        }
        return sum;
    }

    //定义一个方法,计算三个int类型整数的和
    /*public static int add(int a,int b,int c){
        return a+b+c;
    }*/

    //定义一个方法,计算两个int类型整数的和
    /*public static int add(int a,int b){
        return a+b;
    }*/
}
```

> tips: 上述add方法在同一个类中，只能存在一个。因为会发生调用的不确定性
>

可变参数的注意事项
            

1. 一个方法的参数列表，只能有一个可变参数

2. 如果方法的参数有多个，那么可变参数必须写在参数列表的末尾

> 这是因为可变参数用逗号分隔，如果不放在最后一个，或有多个可变参数，被调用方法就分不清参数列表了

# Collections工具类

`java.utils.Collections`是集合工具类，用来对集合进行操作。

## 常用方法

- `public static <T> boolean addAll(Collection<T> c, T... elements)  `:往集合中添加一些元素。
- `public static void shuffle(List<?> list) 打乱顺序`:打乱集合顺序。
- `public static <T> void sort(List<T> list)`:将集合中元素按照默认规则排序。
- `public static <T> void sort(List<T> list，Comparator<? super T> )`:将集合中元素按照指定规则排序。

```java
public class CollectionsDemo {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<Integer>();
        //原来写法
        //list.add(12);
        //list.add(14);
        //list.add(15);
        //list.add(1000);
        //采用工具类 完成 往集合中添加元素  
        Collections.addAll(list, 5, 222, 1，2);
        System.out.println(list);
        //排序方法 
        Collections.sort(list);
        System.out.println(list);
    }
}
结果：
[5, 222, 1, 2]
[1, 2, 5, 222]
```

集合按照顺序进行了排列，可是这样的顺序是采用默认的顺序。有默认排序规则的对象元素，都实现了Comparable接口，并重写了里面的compareTo方法，表示他们可比较。

## Comparable接口

`public static <T> void sort(List<T> list)`使用前提：

> 被排序的集合里边存储的元素，必须实现`Comparable`接口，重写接口中的方法`compareTo`定义排序的规则。

Comparable接口的排序规则:

> 本身(this) - 参数：升序

~~~java
//要排序的元素实现Comparable接口，接口泛型放自己
public class Student implements Comparable<Student>{
    private String name;
    private int age;
	
    // 省略无参、全参构造方法和Getter、Setter方法
    
    //重写compareTo方法
    @Override
    public int compareTo(Student o) {
        return this.age - o.age; //本身 - 参数 ：升序
    }
    
    @Override
    public String toString() {
        return "Student{" + "name='" + name + '\'' + ", age=" + age +'}';
    }
}
~~~

测试类：

~~~java
public class Demo {
    public static void main(String[] args) {
        // 创建四个学生对象 存储到集合中
        ArrayList<Student> list = new ArrayList<Student>();

        list.add(new Student("rose",18));
        list.add(new Student("jack",16));
        list.add(new Student("abc",16));
        list.add(new Student("ace",17));
        list.add(new Student("mark",16));
        
        Collections.sort(list); // 排序

        for (Student student : list) {
            System.out.println(student);
        }
    }
}
结果：
Student{name='jack', age=16}
Student{name='abc', age=16}
Student{name='mark', age=16}
Student{name='ace', age=17}
Student{name='rose', age=18}
~~~

## Comparator接口

* `public static <T> void sort(List<T> list，Comparator<? super T> )`方法使用：

  排序集合的时候，传入比较器，常常都是直接在参数位置使用Comparator接口的匿名内部类的匿名对象

  ~~~java
  Collections.sort(list, new Comparator<Integer>() {
      //重写比较的规则
      @Override
      public int compare(Integer o1, Integer o2) {
          //return o1-o2;//升序
          return o2-o1;//降序
      }
  });
  ~~~

* Comparator和Comparable的区别
  * Comparable：自己(this)和别人(参数)比较，自己需要实现Comparable接口，重写比较的规则compareTo方法
  * Comparator：相当于找一个第三方的裁判，比较两个元素
* Comparator的排序规则:
          o1 - o2：升序

----------------
~~~java
public class Student{
    private String name;
    private int age;
	
    // 省略无参、全参构造方法和Getter、Setter方法
    
    @Override
    public String toString() {
        return "Student{" + "name='" + name + '\'' + ", age=" + age +'}';
    }
}
~~~

测试类：

~~~java
public class Demo {
    public static void main(String[] args) {
        // 创建四个学生对象 存储到集合中
        ArrayList<Student> list = new ArrayList<Student>();

        list.add(new Student("rose",18));
        list.add(new Student("jack",16));
        list.add(new Student("abc",16));
        list.add(new Student("ace",17));
        list.add(new Student("mark",16));
        
        Collections.sort(list, new Comparator<Student>() {
            @Override
            public int compare(Student o1, Student o2) {
                return o1.getAge() - o2.getAge(); //前 - 后，o1-1o2，升序
            }
        });

        for (Student student : list) {
            System.out.println(student);
        }
    }
}
结果：
Student{name='jack', age=16}
Student{name='abc', age=16}
Student{name='mark', age=16}
Student{name='ace', age=17}
Student{name='rose', age=18}
~~~

### Comparator拓展

以适当的规则重写Comparator接口的compare方法，实现多条件排序

~~~java
Collections.sort(list, new Comparator<Student>() {
    @Override
    public int compare(Student o1, Student o2) {
        // 年龄降序
        int result = o2.getAge()-o1.getAge();//年龄降序

        if(result==0){//第一个规则判断完了 下一个规则 姓名的首字母 升序
            result = o1.getName().charAt(0)-o2.getName().charAt(0);
        }

        return result;
    }
});
~~~

效果如下：

~~~
Student{name='rose', age=18}
Student{name='ace', age=17}
Student{name='abc', age=16}
Student{name='jack', age=16}
Student{name='mark', age=16}
~~~

## Comparable和Comparator区别

**Comparable**：强行对实现它的每个类的对象进行整体排序。这种排序被称为类的自然排序，类的compareTo方法被称为它的自然比较方法。只能在类中实现compareTo()一次，不能经常修改类的代码实现自己想要的排序。实现此接口的对象列表（和数组）可以通过Collections.sort（和Arrays.sort）进行自动排序，对象可以用作有序映射中的键或有序集合中的元素，无需指定比较器。

**Comparator**：强行对某个对象进行整体排序。可以将Comparator 传递给sort方法（如Collections.sort或 Arrays.sort），从而允许在排序顺序上实现精确控制。还可以使用Comparator来控制某些数据结构（如有序set或有序映射）的顺序，或者为那些没有自然顺序的对象collection提供排序。

-----------------

自己的总结：

* 使用方式上：

  Comparable在参与比较的元素类上实现接口，比较的时候直接sort；

  Comparator在sort方法上传入接口的匿名内部类的匿名对象。

* 特点：

  Comparable确定后，就只能哪找这个规则使用sort方法；

  Comparator可以在不同的地方使用不同的规则排序。

# Map集合

![](https://s2.ax1x.com/2019/05/11/Efk3ND.png)

* `Collection`中的集合，元素是孤立存在的（理解为单身），向集合中存储元素采用一个个元素的方式存储。
* `Map`中的集合，元素是成对存在的(理解为夫妻)。每个元素由键与值两部分组成，通过键可以找对所对应的值。
* `Collection`中的集合称为单列集合，`Map`中的集合称为双列集合。
* 需要注意的是，`Map`中的集合不能包含重复的键Key，值Value可以重复；每个键只能对应一个值。

## Map接口的常用实现类

Map接口的常用实现类有：HashMap、LinkedHashMap

* Map集合的特点:
  1. Map集合是一个双列集合,一个元素包含两个值(一个key,一个value)
  2. Map集合中的元素,key和value的数据类型可以相同,也可以不同
  3. Map集合中的元素,key是不允许重复的,value是可以重复的
  4. Map集合中的元素,key和value是一一对应

* HashMap集合的特点:

  1. HashMap集合底层是**哈希表**:查询的速度特别的快

     JDK1.8之前:数组+单向链表

     JDK1.8之后:数组+单向链表|红黑树(链表的长度超过8):提高查询的速度

  2. hashMap集合是一个无序的集合,存储元素和取出元素的顺序有可能不一致

*  LinkedHashMap的特点：

  1. LinkedHashMap集合底层是**哈希表+链表**(保证迭代的顺序)
  2. LinkedHashMap集合是一个有序的集合,存储元素和取出元素的顺序是一致的

## Map接口中的常用方法

Map接口中定义了很多方法，常用的如下：

* `public V put(K key, V value)`:  把指定的键与指定的值添加到Map集合中。
* `public V remove(Object key)`: 把指定的键 所对应的键值对元素 在Map集合中删除，返回被删除元素的值。
* `public V get(Object key)` 根据指定的键，在Map集合中获取对应的值。
* `boolean containsKey(Object key)  ` 判断集合中是否包含指定的键。
* `public Set<K> keySet()`: 获取Map集合中所有的键，存储到Set集合中。
* `public Set<Map.Entry<K,V>> entrySet()`: 获取到Map集合中所有的键值对对象的集合(Set集合)。

Map接口的方法演示

~~~java
public class MapDemo {
    public static void main(String[] args) {
        //创建 map对象
        HashMap<String, String>  map = new HashMap<String, String>();

        //添加元素到集合
        map.put("黄晓明", "杨颖");
        map.put("文章", "马伊琍");
        map.put("邓超", "孙俪");
        System.out.println(map);

        //String remove(String key)
        System.out.println(map.remove("邓超"));
        System.out.println(map);

        // 想要查看 黄晓明的媳妇 是谁
        System.out.println(map.get("黄晓明"));
        System.out.println(map.get("邓超"));    
    }
}
~~~

> 使用put方法时
>
> 存储键值对的时候，key不重复，存储键值对，返回值V是null
>
> 存储键值对的时候，key重复，会使用新的value替换map中重复的value，返回被替换的value值
>
> 可以理解为，是要符合泛型规则，都会存储进去，返回之前的value值，没有则null

## Map集合遍历键找值方式

键找值方式：即通过元素中的键，获取键所对应的值

分析步骤：

1. 获取Map中所有的键，由于键是唯一的，所以返回一个Set集合存储所有的键。方法提示:`keyset()`
2. 遍历键的Set集合，得到每一个键。
3. 根据键，获取键所对应的值。方法提示:`get(K key)`

![](https://s2.ax1x.com/2019/05/11/EfEDpQ.png)

代码演示：

~~~java
public class MapDemo01 {
    public static void main(String[] args) {
        //创建Map集合对象 
        HashMap<String, String> map = new HashMap<String,String>();
        //添加元素到集合 
        map.put("胡歌", "霍建华");
        map.put("郭德纲", "于谦");
        map.put("薛之谦", "大张伟");

        //获取所有的键  获取键集
        Set<String> keys = map.keySet();
        // 遍历键集 得到 每一个键 （迭代器也行）
        for (String key : keys) {
          	//key  就是键
            //获取对应值
            String value = map.get(key);
            System.out.println(key+"的CP是："+value);
        }  
    }
}
~~~

## Entry键值对对象

我们已经知道，`Map`中存放的是两种对象，一种称为**key**(键)，一种称为**value**(值)，它们在在`Map`中是一一对应关系，这一对对象又称做`Map`中的一个`Entry(项)`。`Entry`将键值对的对应关系封装成了对象。即键值对对象，这样我们在遍历`Map`集合时，就可以从每一个键值对（`Entry`）对象中获取对应的键与对应的值。

> 我看了Map和HashMap的源码，Map接口里没有任何属性，只有内部接口Entry<K,V>和抽象方法，HashMap里有内部类Node<K,V>实现了Entry接口，并在里面增加了新的属性key和value。
>
> 所以说Map里直接存的就是Entry键值对，key和value是存在Entry的实现类里的

 既然Entry表示了一对键和值，那么也同样提供了获取对应键和对应值得方法：

* `public K getKey()`：获取Entry对象中的键。
* `public V getValue()`：获取Entry对象中的值。

在Map集合中也提供了获取所有Entry对象的方法：

* `public Set<Map.Entry<K,V>> entrySet()`: 获取到Map集合中所有的键值对对象的集合(Set集合)。

## Map集合遍历键值对方式

键值对方式：即通过集合中每个键值对(Entry)对象，获取键值对(Entry)对象中的键与值。

操作步骤与图解：

1.  获取Map集合中，所有的键值对(Entry)对象，以Set集合形式返回。方法提示:`entrySet()`。

2.  遍历包含键值对(Entry)对象的Set集合，得到每一个键值对(Entry)对象。
3.  通过键值对(Entry)对象，获取Entry对象中的键与值。  方法提示:`getkey() getValue()`     

~~~java
public class MapDemo02 {
    public static void main(String[] args) {
        // 创建Map集合对象 
        HashMap<String, String> map = new HashMap<String,String>();
        // 添加元素到集合 
        map.put("胡歌", "霍建华");
        map.put("郭德纲", "于谦");
        map.put("薛之谦", "大张伟");

        // 获取 所有的 entry对象  entrySet
        Set<Entry<String,String>> entrySet = map.entrySet();

        // 遍历得到每一个entry对象
        for (Entry<String, String> entry : entrySet) {
           	// 解析 
            String key = entry.getKey();
            String value = entry.getValue();  
            System.out.println(key+"的CP是:"+value);
        }
    }
}
~~~

> tips：Map集合不能直接使用迭代器或者foreach进行遍历。但是转成Set之后就可以使用了。
>

## HashMap存储自定义类型键值

示例：每位学生（姓名，年龄）都有自己的家庭住址。学生作为键, 家庭住址作为值。

> 注意，学生姓名相同并且年龄相同视为同一名学生。
>

编写学生类：

~~~java
public class Student {
    private String name;
    private int age;

    //省略构造方法和Getter/Setter方法
    
    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Student student = (Student) o;
        return age == student.age && Objects.equals(name, student.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}
~~~

编写测试类：

~~~java 
public class HashMapTest {
    public static void main(String[] args) {
        //1,创建Hashmap集合对象。
        Map<Student,String>map = new HashMap<Student,String>();
        //2,添加元素。
        map.put(newStudent("lisi",28), "上海");
        map.put(newStudent("wangwu",22), "北京");
        map.put(newStudent("zhaoliu",24), "成都");
        map.put(newStudent("zhouqi",25), "广州");
        map.put(newStudent("wangwu",22), "南京");
        
        //3,取出元素。键找值方式
        Set<Student>keySet = map.keySet();
        for(Student key: keySet){
            Stringvalue = map.get(key);
            System.out.println(key.toString()+"....."+value);
        }
    }
}
~~~

**【注意】**

- 当给HashMap中存放自定义对象时，如果自定义对象作为key存在，这时要保证对象唯一，必须复写对象的hashCode和equals方法(如果忘记，请回顾HashSet存放自定义对象)。
- 如果要保证map中存放的key和取出的顺序一致，可以使用`java.util.LinkedHashMap`集合来存放。

## LinkedHashMap

HashMap保证成对元素唯一，并且查询速度很快，可是成对元素存放进去是*没有顺序*的。

在HashMap下面有一个子类LinkedHashMap，它是**链表和哈希表**组合的一个数据存储结构，是*有序*的。

~~~java
public class LinkedHashMapDemo {
    public static void main(String[] args) {
        LinkedHashMap<String, String> map = new LinkedHashMap<String, String>();
        map.put("邓超", "孙俪");
        map.put("李晨", "范冰冰");
        map.put("刘德华", "朱丽倩");
        Set<Entry<String, String>> entrySet = map.entrySet();
        for (Entry<String, String> entry : entrySet) {
            System.out.println(entry.getKey() + "  " + entry.getValue());
        }
    }
}

结果:
邓超  孙俪
李晨  范冰冰
刘德华  朱丽倩
~~~

## Hashtable

* Hashtable：底层也是一个哈希表，是一个线程安全的集合，是单线程集合，速度慢

  HashMap:底层是一个哈希表，是一个线程不安全的集合，是多线程的集合，速度快

* Hashtable集合：不能存储null值，null键

  HashMap集合(之前学的所有的集合)：可以存储null值，null键

Hashtable和Vector集合一样，在jdk1.2版本之后被更先进的集合(HashMap，ArrayList)取代了

~~~java
public class Demo02Hashtable {
    public static void main(String[] args) {
        HashMap<String,String> map = new HashMap<>();
        map.put(null,"a");
        map.put("b",null);
        map.put(null,null); //取代了第一个
        System.out.println(map);//{null=null, b=null}

        Hashtable<String,String> table = new Hashtable<>();
        //table.put(null,"a");//NullPointerException
        //table.put("b",null);//NullPointerException
        table.put(null,null);//NullPointerException
    }
}
~~~

Hashtable的子类Properties依然活跃在历史舞台，Properties集合是一个唯一和IO流相结合的集合

# JDK9中对集合的优化

JDK9的新特性：
List接口，Set接口，Map接口：里边增加了一个静态的方法of，可以给集合一次性添加多个元素，并返回存了给定元素的集合

~~~java
static <E> List<E> of(E... elements)
~~~

使用前提： 当集合中存储的元素的个数已经确定了，不在改变时使用

注意:
1. of方法只适用于List接口，Set接口，Map接口，不适用于接接口的实现类
2. of方法的返回值是一个不能改变的集合，集合不能再使用add，put方法添加元素，会抛出异常
3. Set接口和Map接口在调用of方法的时候，不能有重复的元素，否则会抛出异常

~~~java
public class Demo01JDK9 {
    public static void main(String[] args) {
        List<String> list = List.of("a", "b", "a", "c", "d");
        System.out.println(list);//[a, b, a, c, d]
        //list.add("w");//UnsupportedOperationException:不支持操作异常

        //Set<String> set = Set.of("a", "b", "a", "c", "d");//IllegalArgumentException:非法参数异常,有重复的元素
        Set<String> set = Set.of("a", "b", "c", "d");
        System.out.println(set);
        //set.add("w");//UnsupportedOperationException:不支持操作异常

        //Map<String, Integer> map = Map.of("张三", 18, "李四", 19, "王五", 20,"张三",19);////IllegalArgumentException:非法参数异常,有重复的元素
        Map<String, Integer> map = Map.of("张三", 18, "李四", 19, "王五", 20);
        System.out.println(map);//{王五=20, 李四=19, 张三=18}
        //map.put("赵四",30);//UnsupportedOperationException:不支持操作异常
    }
}
~~~

> 了解即可：这里使用静态of方法得到的集合，不是对应接口的任何实现类，看源码发现返回的是ImmutableCollections工具类的内部类对象ListN<E>、SetN<E>、Map<E>

# Debug介绍

![](https://s2.ax1x.com/2019/05/11/EfYm2n.png)

# 异常

- **异常** ：指的是程序在执行过程中，出现的非正常的情况，最终会导致JVM的非正常停止。

在Java等面向对象的编程语言中，异常本身是一个类，产生异常就是创建异常对象并抛出了一个异常对象。Java处理异常的方式是中断处理。

> 异常指的并不是语法错误,语法错了,编译不通过,不会产生字节码文件,根本不能运行.

## 异常体系

异常机制其实是帮助我们**找到**程序中的问题，异常的根类是`java.lang.Throwable`，其下有两个子类：`java.lang.Error`与`java.lang.Exception`，平常所说的异常指`java.lang.Exception`。

![](https://s2.ax1x.com/2019/05/11/Efdz8g.png)

**Throwable体系：**

- **Error**:严重错误Error，无法通过处理的错误，只能事先避免，好比绝症。
- **Exception**:表示异常，异常产生后程序员可以通过代码的方式纠正，使程序继续运行，是必须要处理的。好比感冒、阑尾炎。

**Throwable中的常用方法：**

- `public void printStackTrace()`:打印异常的详细信息。

  *包含了异常的类型,异常的原因,还包括异常出现的位置,在开发和调试阶段,都得使用printStackTrace。*

- `public String getMessage()`:获取发生异常的原因。

  *提示给用户的时候,就提示错误原因。*

- `public String toString()`:获取异常的类型和异常描述信息(不用)。

***出现异常,不要紧张,把异常的简单类名,拷贝到API中去查。***

> 常见Error：

```java
int[] a = new int[1024*1024*1024]; 
/*
OutOfMemoryError: Java heap space  内存溢出错误
创建的数组太大了，超出了给JVM分配的内存
*/
```

## 异常分类

我们平常说的异常就是指Exception，因为这类异常一旦出现，我们就要对代码进行更正，修复程序。

**异常(Exception)的分类**:根据在编译时期还是运行时期去检查异常?

* **编译时期异常**:checked异常。在编译时期,就会检查,如果没有处理异常,则编译失败。(如日期格式化异常)
* **运行时期异常**:runtime异常。在运行时期,检查异常.在编译时期,运行异常不会编译器检测(不报错)。(如数学异常)

    ![](https://s2.ax1x.com/2019/05/11/EfwKM9.png)

## 异常的产生过程解析

![](https://s2.ax1x.com/2019/05/11/Efw4Zq.png)

## 异常的处理

Java异常处理的五个关键字：**try、catch、finally、throw、throws**

### 抛出异常throw

作用：可以使用throw关键字在指定的方法中抛出指定的异常

throw**用在方法内**，用来抛出一个异常对象，将这个异常对象传递到调用者处，并结束当前方法的执行。

使用格式：`throw new xxxException("异常产生的原因");`

注意:

1. throw关键字必须写在方法的内部

2. throw关键字后边new的对象必须是Exception或者Exception的子类对象

3. throw关键字抛出指定的异常对象,我们就必须处理这个异常对象

   > throw关键字后边创建的是RuntimeException或者是 RuntimeException的子类对象,我们可以不处理,默认交给JVM处理(打印异常对象,中断程序)
   >
   > throw关键字后边创建的是编译异常(写代码的时候报错),我们就必须处理这个异常,要么throws,要么try...catch

~~~java
public class ThrowDemo {
    public static void main(String[] args) {
        //创建一个数组 
        int[] arr = {2,4,52,2};
        int element = getElement(arr, 4);

        System.out.println(element);
        System.out.println("over");
    }
    /*
     * 根据 索引找到数组中对应的元素
     */
    public static int getElement(int[] arr,int index){ 
       	//判断  索引是否越界
        if(index<0 || index>arr.length-1){
             /*
             判断条件如果满足，当执行完throw抛出异常对象后，方法已经无法继续运算。
             这时就会结束当前方法的执行，并将异常告知给调用者。这时就需要通过异常来解决。 
              */
             throw new ArrayIndexOutOfBoundsException("哥们，角标越界了~~~");
        }
        int element = arr[index];
        return element;
    }
}
~~~

### Objects非空判断

还记得我们学习过一个类Objects吗，曾经提到过它由一些静态的实用方法组成，这些方法是null-save（空指针安全的）或null-tolerant（容忍空指针的），那么在它的源码中，对对象为null的值进行了抛出异常操作。

* `public static <T> T requireNonNull(T obj)`:查看指定引用对象不是null。

查看源码发现这里对为null的进行了抛出异常操作：

~~~java
public static <T> T requireNonNull(T obj) {
    if (obj == null)
      	throw new NullPointerException();
    return obj;
}
~~~

### 声明异常throws

**声明异常**：将问题标识出来，报告给调用者。如果方法内通过throw抛出了编译时异常，而没有捕获处理，那么必须通过throws进行声明，让调用者去处理。

关键字**throws**运用于方法声明之上,用于表示当前方法不处理异常,而是提醒该方法的调用者来处理异常(抛出异常).

**声明异常格式：**

~~~java
修饰符 返回值类型 方法名(参数列表) throws AAAExcepiton,BBBExcepiton...{
    throw new AAAExcepiton("产生原因");
    throw new BBBExcepiton("产生原因");
    ...
}
~~~

**注意事项：**

1. throws关键字必须写在方法声明处

2. throws关键字后边声明的异常必须是Exception或者是Exception的子类

3. 方法内部如果抛出了多个异常对象,那么throws后边必须也声明多个异常

   如果抛出的多个异常对象有*子父类关系*,那么直接声明*父类异常*即可

4. 调用了一个声明抛出异常的方法,我们就必须的处理声明的异常

   要么继续使用throws声明抛出,交给方法的调用者处理,最终交给JVM

   要么try...catch自己处理异常

声明异常的代码演示：

~~~java
public class ThrowsDemo {
    public static void main(String[] args) throws FileNotFoundException {
        read("a.txt");
    }

    // 如果定义功能时有问题发生需要报告给调用者。可以通过在方法上使用throws关键字进行声明
    public static void read(String path) throws FileNotFoundException {
        if (!path.equals("a.txt")) {//如果不是 a.txt这个文件 
            // 我假设  如果不是 a.txt 认为 该文件不存在 是一个错误 也就是异常  throw
            throw new FileNotFoundException("文件不存在");
        }
    }
}
~~~

throws用于进行异常类的声明，若该方法可能有多种异常情况产生，那么在throws后面可以写多个异常类，用逗号隔开。

~~~java
public class ThrowsDemo2 {
    public static void main(String[] args) throws IOException {
        read("a.txt");
    }

    public static void read(String path)throws FileNotFoundException, IOException {
        if (!path.equals("a.txt")) {//如果不是 a.txt这个文件 
            // 我假设  如果不是 a.txt 认为 该文件不存在 是一个错误 也就是异常  throw
            throw new FileNotFoundException("文件不存在");
        }
        if (!path.equals("b.txt")) {
            throw new IOException();
        }
    }
}
~~~

### 捕获异常try…catch

如果异常出现的话,会立刻终止程序,所以我们得处理异常:

1. 该方法不处理,而是声明抛出,由该方法的调用者来处理(throws)。
2. 在方法中使用try-catch的语句块来处理异常。

**try-catch**的方式就是捕获异常。

* **捕获异常**：Java中对异常有针对性的语句进行捕获，可以对出现的异常进行指定方式的处理。

捕获异常语法如下：

~~~java
try{
     编写可能会出现异常的代码
}catch(异常类型  e){
     处理异常的代码
     //记录日志(工作中)/打印异常信息/继续抛出异常
}
~~~

> 注意:try和catch都不能单独使用,必须连用。

演示如下：

~~~java
public class TryCatchDemo {
    public static void main(String[] args) {
        try {// 当产生异常时，必须有处理方式。要么捕获，要么声明。
            read("b.txt");
        } catch (FileNotFoundException e) {// 括号中需要定义什么呢？
          	//try中抛出的是什么异常，在括号中就定义什么异常类型
            System.out.println(e);
        }
        System.out.println("over");
    }
    /*
     * 我们 当前的这个方法中 有异常  有编译期异常
     */
    public static void read(String path) throws FileNotFoundException {
        if (!path.equals("a.txt")) {//如果不是 a.txt这个文件 
            throw new FileNotFoundException("文件不存在");
        }
    }
}
~~~

如何获取异常信息：

Throwable类中定义了一些查看方法:

* `public String getMessage()`:获取异常的描述信息,原因(提示给用户的时候,就提示错误原因。


* `public String toString()`:获取异常的类型和异常描述信息(不用)。
* `public void printStackTrace()`:打印异常的跟踪栈信息并输出到控制台。

        *包含了异常的类型,异常的原因,还包括异常出现的位置,在开发和调试阶段,都得使用printStackTrace。*

### finally代码块

**finally**：有一些特定的代码无论异常是否发生，都需要执行。另外，因为异常会引发程序跳转，导致有些语句执行不到。而finally就是解决这个问题的，在finally代码块中存放的代码都是一定会被执行的。

> finally代码块不能单独使用

> 当只有在try或者catch中调用退出JVM的相关方法,此时finally才不会执行,否则finally永远会执行。

### 异常注意事项

* 多个异常使用捕获又该如何处理呢？

  1. 多个异常分别处理。
  2. 多个异常一次捕获，多次处理。
  3. 多个异常一次捕获一次处理。

  一般我们是使用一次捕获多次处理方式，格式如下：

  ```java
  try{
       编写可能会出现异常的代码
  }catch(异常类型A  e){  当try中出现A类型异常,就用该catch来捕获.
       处理异常的代码
  }catch(异常类型B  e){  当try中出现B类型异常,就用该catch来捕获.
       处理异常的代码
  }
  ```

  > 注意：这种异常处理方式，要求多个catch中的异常不能相同，并且若catch中的多个异常之间有子父类异常的关系，那么子类异常要求在上面的catch处理，父类异常在下面的catch处理，否则报错。
  >
  > 原因：假设不报错，子类异常的处理方式会被上面的父类异常处理方式拦截

* 运行时异常被抛出可以不处理。即不捕获也不声明抛出。

* 如果finally有return语句，永远返回finally中的结果，避免该情况. 

**【子父类中的异常】:**

* 如果**父类方法**抛出了多个异常，子类重写父类方法时，抛出和父类相同的异常，或者是父类异常的子类，或者不抛出异常。

* ***父类方法**没有抛出异常，子类重写父类该方法时也不可抛出异常。此时子类产生该异常，只能捕获处理，不能声明抛出

  > **助记：**子类不能比父类更坏

## 自定义异常

**异常类如何定义:**

1. 自定义一个编译期异常: 自定义类 并继承于`java.lang.Exception`。
2. 自定义一个运行时期的异常类:自定义类 并继承于`java.lang.RuntimeException`。

异常中只需要提供空参构造和带异常信息的构造即可

查看源码发现,所有的异常类都会有一个带异常信息的构造方法,方法内部会调用父类带异常信息的构造方法,让父类来处理这个异常信息

~~~java
public class MyException extends Exception {
    /**
     * 空参构造
     */
    public RegisterException() {
    }

    /**
     * @param message 表示异常提示
     */
    public RegisterException(String message) {
        super(message);
    }
}
~~~

之后再在需要的方法内throw new MyException即可

# 线程

## 线程实现方式

### 并发和并行

- **并发**：指两个或多个事件在**同一个时间段内**发生。
- **并行**：指两个或多个事件在**同一时刻**发生（同时发生）。

![](https://s2.ax1x.com/2019/05/11/EfhbsP.png)

在操作系统中，安装了多个程序，并发指的是在一段时间内宏观上有多个程序同时运行，这在单 CPU 系统中，每一时刻只能有一道程序执行，即微观上这些程序是分时的交替运行，只不过是给人的感觉是同时运行，那是因为分时交替运行的时间是非常短的。

而在多个 CPU 系统中，则这些可以并发执行的程序便可以分配到多个处理器上（CPU），实现多任务并行执行，即利用每个处理器来处理一个可以并发执行的程序，这样多个程序便可以同时执行。目前电脑市场上说的多核 CPU，便是多核处理器，核 越多，并行处理的程序越多，能大大的提高电脑运行的效率。

> 注意：单核处理器的计算机肯定是不能并行的处理多个任务的，只能是多个任务在单个CPU上并发运行。同理,线程也是一样的，从宏观角度上理解线程是并行运行的，但是从微观角度上分析却是串行运行的，即一个线程一个线程的去运行，当系统只有一个CPU时，线程会以某种顺序执行多个线程，我们把这种情况称之为线程调度。

### 进程和线程

- **进程**：是指一个内存中运行的应用程序，每个进程都有一个独立的内存空间，一个应用程序可以同时运行多个进程；进程也是程序的一次执行过程，是系统运行程序的基本单位；系统运行一个程序即是一个进程从创建、运行到消亡的过程。

  ![](https://s2.ax1x.com/2019/05/11/Ef4pzn.png)

- **线程**：线程是进程中的一个执行单元，负责当前进程中程序的执行，一个进程中至少有一个线程。一个进程中是可以有多个线程的，这个应用程序也可以称之为多线程程序。 

  简而言之：一个程序运行后至少有一个进程，一个进程中可以包含多个线程 

  ![](https://s2.ax1x.com/2019/05/11/Ef4eJJ.png)

**线程调度:**

- 分时调度

  所有线程轮流使用 CPU 的使用权，平均分配每个线程占用 CPU 的时间。

- 抢占式调度

  优先让优先级高的线程使用 CPU，如果线程的优先级相同，那么会随机选择一个(线程随机性)，Java使用的为抢占式调度。

  > 抢占式调度详解
  >
  > 大部分操作系统都支持多进程并发运行，现在的操作系统几乎都支持同时运行多个程序。实际上，CPU(中央处理器)使用抢占式调度模式在多个线程间进行着高速的切换。对于CPU的一个核而言，某个时刻，只能执行一个线程，而 CPU的在多个线程间切换速度相对我们的感觉要快，看上去就是在同一时刻运行。
  > 其实，*多线程程序并不能提高程序的运行速度，但能够提高程序运行效率，让CPU的使用率更高。*

![](https://s2.ax1x.com/2019/05/11/Ef4tWd.png)

### Java中主线程

![](https://s2.ax1x.com/2019/05/11/Ef5Gn0.png)

### 创建线程类（继承Thread类）

Java使用`java.lang.Thread`类代表**线程**，所有的线程对象都必须是Thread类或其子类的实例。每个线程的作用是完成一定的任务，实际上就是执行一段程序流即一段顺序执行的代码。Java使用线程执行体来代表这段程序流。Java中通过继承Thread类来**创建**并**启动多线程**的步骤如下：

1. 定义Thread类的子类，并重写该类的run()方法。

   > 该run()方法的方法体就代表了线程需要完成的任务,因此把run()方法称为线程执行体。

2. 创建Thread子类的实例，即创建了线程对象

3. 调用线程对象的start()方法来启动该线程

   >void start() 使该线程开始执行；Java 虚拟机调用该线程的 run 方法。
   >
   >结果是两个线程并发地运行，当前线程（main线程）和另一个线程（创建的新线程,执行其 run 方法）。
   >
   >多次启动一个线程是非法的。特别是当线程已经结束执行后，不能再重新启动。
   >
   >java程序属于抢占式调度,那个线程的优先级高,那个线程优先执行;同一个优先级,随机选择一个执行

自定义线程类：

~~~java
public class MyThread extends Thread {
	//定义指定线程名称的构造方法
	public MyThread(String name) {
		//调用父类的String参数的构造方法，指定线程的名称
		super(name);
	}

	//重写run方法，完成该线程执行的逻辑
	@Override
	public void run() {
		for (int i = 0; i < 10; i++) {
			System.out.println(getName()+"：正在执行！"+i);
		}
	}
}
~~~

测试类：
~~~java
public class Demo01 {
	public static void main(String[] args) {
		//创建自定义线程对象
		MyThread mt = new MyThread("新的线程！");
		//开启新线程
		mt.start();
		//在主方法中执行for循环
		for (int i = 0; i < 10; i++) {
			System.out.println("main线程！"+i);
		}
	}
}
~~~

### 多线程原理

程序启动运行main时候，java虚拟机启动一个进程，主线程main在main()调用时候被创建。随着调用mt的对象的
start方法，另外一个新的线程也启动了，这样，整个应用就在多线程下运行。

多线程抢占cpu资源，随机打印结果：

![](https://s2.ax1x.com/2019/05/12/Eh39aQ.png)

多线程执行时，在栈内存中，其实**每一个执行线程都有一片自己所属的栈内存空间**。进行方法的压栈和弹栈。

![](https://s2.ax1x.com/2019/05/11/EfTsun.png)

当执行线程的任务结束了，线程自动在栈内存中释放了。但是当所有的执行线程都结束了，那么进程就结束了。

### Thread类常用方法

**构造方法**

* `public Thread()` :分配一个新的线程对象。
* `public Thread(String name)` :分配一个指定名字的新的线程对象。
* `public Thread(Runnable target)` :分配一个带有指定目标新的线程对象。(传入Runnable实现类对象)
* `public Thread(Runnable target,String name)` :分配一个带有指定目标新的线程对象并指定名字。

**常用方法**

* `public static Thread currentThread()`：**静态方法**，返回对当前正在执行的线程对象的引用。
* `public String getName()` :获取当前线程名称。
* `public void start()` :导致此线程开始执行; Java虚拟机调用此线程的run方法。
* `public void run()` :此线程要执行的任务在此处定义代码。
* `public static void sleep(long millis)` :使当前正在执行的线程以指定的毫秒数暂停（暂时停止执行）。

> 获取线程名称两种方式:
>
> 1. 使用Thread类中的方法getName()，在线程类里用
>
> 2. 先获取到当前正在执行的线程,使用线程中的方法getName()获取线程的名称
>
>    `String name = Thread.currentThread().getName()`
>
> 主线程没有继承Thread类，就只能用方法2获取线程名

设置前程名称的两种方式

1. 线程对象.setName(String 线程名)

   ~~~java
   public static void main(String[] args) {
       MyThread mt = new MyThread();
       mt.setNamme("自定义线程一");
   }
   ~~~

2. 在线程对象里提供带参数的构造方法，方法内执行父类的带参构造，创建线程对象的时候就指定线程名

   ~~~java
   public class MyThread extends Thread {
       public MyThread(String name) {
           super(name);
       }
    
       @Override
       public void run() { ... }
   }
   ~~~
   
   ~~~java
   public static void main(String[] args) {
       MyThread mt = new MyThread("我的线程");
   }
   ~~~
   

### 创建线程类（实现Runnable接口）

采用 java.lang.Runnable 也是非常常见的一种，我们只需要重写run方法即可，但是Runnable接口中并没有定义start方法，那怎么办开启线程呢。

Thread有两个构造方法：

- `public Thread(Runnable target)` :分配一个带有指定目标新的线程对象。
- `public Thread(Runnable target,String name)` :分配一个带有指定目标新的线程对象并指定名字。

所以步骤如下：

1. 定义Runnable接口的实现类，并重写该接口的run()方法，该run()方法的方法体同样是该线程的线程执行体。
2. 创建Runnable实现类的实例，并以此实例作为Thread的target来创建Thread对象，该Thread对象才是真正
的线程对象。
3. 调用线程对象的start()方法来启动线程

~~~java
public class MyRunnable implements Runnable{
    @Override
    public void run() {
        for (int i = 0; i < 20; i++) {
            System.out.println(Thread.currentThread().getName()+" "+i);
        }
    }
}
~~~

~~~java
public class Demo {
    public static void main(String[] args) {
        //创建自定义类对象 线程任务对象
        MyRunnable mr = new MyRunnable();
        //创建线程对象
        Thread t = new Thread(mr,"小强");
        t.start();
        for (int i = 0; i < 20; i++) {
            System.out.println("旺财 " + i);
        }
    }
}
~~~

通过实现Runnable接口，使得该类有了多线程类的特征。run()方法是多线程程序的一个执行目标。所有的多线程
代码都在run方法里面。Thread类实际上也是实现了Runnable接口的类。

在启动的多线程的时候，需要先通过Thread类的构造方法Thread(Runnable target) 构造出对象，然后调用Thread
对象的start()方法来运行多线程代码。

实际上所有的多线程代码都是通过运行Thread的start()方法来运行的。因此，不管是继承Thread类还是实现
Runnable接口来实现多线程，最终还是通过Thread的对象的API来控制线程的，熟悉Thread类的API是进行多线程
编程的基础。

> tips:Runnable对象仅仅作为Thread对象的target，Runnable实现类里包含的run()方法仅作为线程执行体。
> 而实际的线程对象依然是Thread实例，只是该Thread线程负责执行其target的run()方法。

### Thread和Runnable的区别

如果一个类继承Thread，则不适合资源共享。但是如果实现了Runable接口的话，则很容易的实现资源共享。

实现Runnable接口比继承Thread类所具有的优势：
1. 适合多个相同的程序代码的线程去共享同一个资源。

   > Thread类用同一Runnable接口实现类创建不同线程
   >
   > ~~~java
   > Runnable r = new RunnableImpl();
   > Thread  thread1 = new Thread(r);
   > Thread  thread2 = new Thread(r);
   > ~~~

2. 可以避免java中的单继承的局限性。

   > 继承了Thread类不能再继承其他类，实现了Runnable接口还可以继承其他类

3. 增加程序的健壮性，实现解耦操作，代码可以被多个线程共享，代码和线程独立。

   >实现Runnable接口的方式,把设置线程任务和开启新线程进行了分离(解耦)
   >
   >Runnable实现类中,重写了run方法：用来设置线程任务
   >
   >创建Thread类对象,调用start方法：用来开启新线程

4. 线程池只能放入实现Runable或Callable类线程，不能直接放入继承Thread的类。

------------------

**【注意】**

在java中，每次程序运行**至少启动2个线程**。一个是**main线程**，一个是**垃圾回收线程**。因为每当使用
java命令执行一个类的时候，实际上都会启动一个JVM，每一个JVM其实在就是在操作系统中启动了一个进
程。

### 匿名内部类创建线程

~~~java
public class Thread_demo {

    public static void main(String[] args) {

        new Thread("子类线程") {
            @Override
            public void run() {
                for (int i = 0; i < 10; i++) {
                    System.out.println(Thread.currentThread().getName() + "启动啦：" + i);
                }
            }
        }.start();

        new Thread(new Runnable() {
            @Override
            public void run() {
                for (int i = 0; i < 10; i++) {
                    System.out.println(Thread.currentThread().getName() + "启动啦：" + i);
                }
            }
        }, "实现类线程").start();
    }
}
~~~

## 线程安全

### 线程安全

如果有多个线程在同时运行，而这些线程可能会同时运行这段代码。程序每次运行结果和单线程运行的结果是一样
的，而且其他的变量的值也和预期的是一样的，就是线程安全的。

我们通过一个案例，演示线程的安全问题：电影院要卖票，我们模拟电影院的卖票过程。假设要播放的电影是 “战狼3”，本次电影的座位共100个
(本场电影只能卖100张票)。

![EhdeLn.png](https://s2.ax1x.com/2019/05/12/EhdeLn.png)

我们来模拟电影院的售票窗口，实现多个窗口同时卖 “战狼3”这场电影票(多个窗口一起卖这100张票)
需要窗口，采用线程对象来模拟；需要票，Runnable接口子类来模拟

~~~java
public class Ticket implements Runnable {
    //定义票总数
    private int ticket = 100;

    // 执行卖票操作
    @Override
    public void run() {
        //每个窗口卖票的操作  制造死循环，表示窗口永远开启，一直买票
        while (true) {
            if (ticket > 0) {//有票 可以卖
                //出票操作
                //使用sleep模拟一下出票时间
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                //获取当前线程对象的名字
                String name = Thread.currentThread().getName();
                System.out.println(name + "正在卖:" + ticket‐‐);
            }
        }
    }
}
~~~

测试类：

~~~java
public class Demo {
    public static void main(String[] args) {
        //创建线程任务对象
        Ticket ticket = new Ticket();
        //创建三个窗口对象
        Thread t1 = new Thread(ticket, "窗口1");
        Thread t2 = new Thread(ticket, "窗口2");
        Thread t3 = new Thread(ticket, "窗口3");
        //同时卖票
        t1.start();
        t2.start();
        t3.start();
    }
}
~~~

结果：

![Ehd6OA.png](https://s2.ax1x.com/2019/05/12/Ehd6OA.png)

发现程序出现了两个问题：
1. 相同的票数,比如5这张票被卖了两回。
2. 不存在的票，比如0票与-1票，是不存在的。

这种问题，几个窗口(线程)票数不同步了，这种问题称为线程不安全。

>线程安全问题都是由**全局变量**及**静态变量**引起的。若每个线程中对全局变量、静态变量只有读操作，而无写
>操作，一般来说，这个全局变量是线程安全的；若有多个线程同时执行写操作，一般都需要考虑线程同步，
>否则的话就可能影响线程安全。

### 线程安全问题产生的原理

![EhwzUP.png](https://s2.ax1x.com/2019/05/12/EhwzUP.png)

因为线程在if语句判断之后Thread.sleep(10)了，来模拟被其他线程抢去了CPU的执行权。

这样就能理解线程安全问题为什么都是由全局变量和静态变量引起的了。

### 线程同步

当我们使用多个线程访问同一资源的时候，且多个线程中对资源有写的操作，就容易出现线程安全问题。

要解决上述多线程并发访问一个资源的安全性问题:也就是解决重复票与不存在票问题，Java中提供了同步机制
(synchronized)来解决。

根据案例简述：

~~~
窗口1线程进入操作的时候，窗口2和窗口3线程只能在外等着，窗口1操作结束，窗口1和窗口2和窗口3才有机会进入代码
去执行。也就是说在某个线程修改共享资源的时候，其他线程不能修改该资源，等待修改完毕同步之后，才能去抢夺CPU
资源，完成对应的操作，保证了数据的同步性，解决了线程不安全的现象。
~~~

为了保证每个线程都能正常执行原子操作,Java引入了线程同步机制。

那么怎么去使用呢？有三种方式完成同步操作：

1. 同步代码块。
2. 同步方法。
3. 锁机制。

#### 同步代码块

* 同步代码块： synchronized 关键字可以用于方法中的某个区块中，表示只对这个区块的资源实行互斥访问。

格式：

~~~java
synchronized(同步锁){
    可能会出现线程安全问题的代码(访问了共享数据的代码)
}
~~~

**同步锁**:
对象的同步锁只是一个概念,可以想象为在对象上标记了一个锁.

1. 锁对象可以是任意类型。
2. 多个线程对象 要使用同一把锁。

> 在任何时候,最多允许一个线程拥有同步锁,谁拿到锁就进入代码块,其他的线程只能在外等着(BLOCKED锁阻塞)。

~~~java
public class Ticket implements Runnable{
    private int ticket = 100;
    Object lock = new Object();//作为锁对象
	
    // 执行卖票操作
    @Override
    public void run() {
        //每个窗口卖票的操作 窗口 永远开启
        while(true){
            synchronized (lock) {   /***** 将有问题的代码放进去即可 *****/
                if(ticket>0){//有票 可以卖
                    //出票操作
                    //使用sleep模拟一下出票时间
                    try {
                        Thread.sleep(50);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    //获取当前线程对象的名字
                    String name = Thread.currentThread().getName();
                    System.out.println(name+"正在卖:"+ticket‐‐);
                }
            }
        }
    }
}
~~~

当使用了同步代码块后，上述的线程的安全问题，解决了。原理如下：

![EhBwF0.png](https://s2.ax1x.com/2019/05/12/EhBwF0.png)

保证了线程安全，但是频繁判断锁、获取锁、释放锁，程序效率会降低。

#### 同步发那个发

* **同步方法**：使用synchronized修饰的方法，就叫做同步方法，保证A线程执行该方法的时候，其他线程只能在方法外等着。

格式：

~~~java
// 在返回值前加synchronized
public synchronized void method(){
    可能会产生线程安全问题的代码
}
~~~

>此时的同步锁是谁呢?
>
>* 对于非static方法，同步锁就是this。
>
>* 对于static方法，我们使用当前方法所在类的字节码对象(类名.class)。（涉及到反射）
>
>> 其实同步方法相当于将同步代码块抽取封装为方法：
>>
>> ~~~java
>> public void method(){
>>      synchronized(this) {
>>          可能会产生线程安全问题的代码
>>      }
>> }
>> ~~~
>>
>> ~~~java
>> public static void method(){
>>      synchronized(本类名.class) {
>>          可能会产生线程安全问题的代码
>>      }
>> }
>> ~~~

具体代码：
~~~java
public class Ticket implements Runnable{
    private int ticket = 100;
	// 执行卖票操作
    @Override
    public void run() {
        //每个窗口卖票的操作   窗口 永远开启
        while(true){
            sellTicket();
        }
    }
    /*
    * 锁对象 是 谁调用这个方法 就是谁
    * 隐含 锁对象 就是 this
    */
    public synchronized void sellTicket(){
        if(ticket>0){//有票 可以卖
            //出票操作
            //使用sleep模拟一下出票时间
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            //获取当前线程对象的名字
            String name = Thread.currentThread().getName();
            System.out.println(name+"正在卖:"+ticket‐‐);
        }
    }
}
~~~

#### Lock锁

`java.util.concurrent.locks.Lock` 机制提供了比synchronized代码块和synchronized方法更广泛的锁定操作,
同步代码块/同步方法具有的功能Lock都有,除此之外更强大,更体现面向对象。

Lock锁也称同步锁，加锁与释放锁方法化了，如下：

* `public void lock() `:加同步锁。
* `public void unlock() `:释放同步锁。

Lock是接口，使用它的实现类ReentrantLock类创建对象。

使用方法：

1. 在成员位置创建一个ReentrantLock对象
2. 在可能会出现安全问题的代码前调用Lock接口中的方法lock获取锁
3. 在可能会出现安全问题的代码后调用Lock接口中的方法unlock释放锁

~~~java
public class Ticket implements Runnable{
    private int ticket = 100;
    Lock lock = new ReentrantLock();  //---------1.多态创建Lock接口子类对象
	// 执行卖票操作
    @Override
    public void run() {
        //每个窗口卖票的操作 窗口 永远开启
        while(true){
            lock.lock();  //----------------2.有问题代码前加lock方法
            if(ticket>0){//有票 可以卖
                //出票操作
                //使用sleep模拟一下出票时间
                try {
                    Thread.sleep(50);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                //获取当前线程对象的名字
                String name = Thread.currentThread().getName();
                System.out.println(name+"正在卖:"+ticket‐‐);
            }
            lock.unlock(); //----------------3.有问题代码后加unlock方法
        }
    }
}
~~~

高级使用方法：

上例子中，把两个lock和unlock方法中的代码都放到try代码块中，把后面的lock.unlock();放到finally代码块中。

避免了其中代码出现异常，锁没有释放。官方建议如下

~~~java
//建议总是 立即实践，使用 lock 块来调用 try，在之前/之后的构造中，最典型的代码如下： 

class X {
	private final ReentrantLock lock = new ReentrantLock();
    // ...

	public void m() { 
		lock.lock();  // block until condition holds
		try {
			// ... method body
		} finally {
			lock.unlock()
		}
	}
}
~~~

## 线程状态

### 线程状态概述

当线程被创建并启动以后，它既不是一启动就进入了执行状态，也不是一直处于执行状态。在线程的生命周期中，
有几种状态呢？在API中 `java.lang.Thread.State` 这个枚举中给出了六种线程状态。

- `NEW`
  至今尚未启动的线程处于这种状态。   
- `RUNNABLE`
  正在  Java 虚拟机中执行的线程处于这种状态。  
- `BLOCKED`
  受阻塞并等待某个监视器锁的线程处于这种状态。   
- `WAITING`
  无限期地等待另一个线程来执行某一特定操作的线程处于这种状态。   
- `TIMED_WAITING`
  等待另一个线程来执行取决于指定等待时间的操作的线程处于这种状态。   
- `TERMINATED`
  已退出的线程处于这种状态。

这里先列出各个线程状态发生的条件，下面将会对每种状态进行详细解析

| 线程状态                | 导致状态发生的条件                                           |
| ----------------------- | :----------------------------------------------------------- |
| New(新建)               | 线程刚被创建，但是并未启动。还没调用start方法。              |
| Runnable(可运行)        | 线程可以在java虚拟机中运行的状态，可能正在运行自己代码，也可能没有，这取决于操作系统处理器。 |
| Blocked(锁阻塞)         | 当一个线程试图获取一个对象锁，而该对象锁被其他的线程持有，则该线程进入Blocked状态；当该线程持有锁时，该线程将变成Runnable状态。 |
| Waiting(无限等待)       | 一个线程在等待另一个线程执行一个（唤醒）动作时，该线程进入Waiting状态。进入这个状态后是不能自动唤醒的，必须等待另一个线程调用notify或者notifyAll方法才能够唤醒。 |
| Timed Waiting(计时等待) | 同waiting状态，有几个方法有超时参数，调用他们将进入Timed Waiting状态。这一状态将一直保持到超时期满或者接收到唤醒通知。带有超时参数的常用方法有Thread.sleep 、Object.wait。 |
| Terminated(被终止)      | 因为run方法正常退出而死亡，或者因为没有捕获的异常终止了run方法而死亡。 |

![Eh26de.png](https://s2.ax1x.com/2019/05/12/Eh26de.png)

### Timed Waiting（计时等待）

Timed Waiting在API中的描述为：一个正在限时等待另一个线程执行一个（唤醒）动作的线程处于这一状态。单独的去理解这句话，真是玄之又玄，其实我们在之前的操作中已经接触过这个状态了，在哪里呢？

在我们写卖票的案例中，为了减少线程执行太快，现象不明显等问题，我们在run方法中添加了sleep语句，这样就强制当前正在执行的线程休眠（暂停执行），以“减慢线程”。

sleep模拟计时器：

~~~java
public class MyThread extends Thread {
    public void run() {
        for (int i = 0; i < 100; i++) {
            System.out.print(i);
            try {
                Thread.sleep(1000); //睡眠一秒
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
    public static void main(String[] args) {
        new MyThread().start();
    }
}
~~~


sleep方法的使用还是很简单的。我们需要记住下面几点：
1. 进入 TIMED_WAITING 状态的一种常见情形是调用的 sleep 方法，单独的线程也可以调用，不一定非要有协
作关系。
2. 为了让其他线程有机会执行，可以将Thread.sleep()的调用放线程run()之内。这样才能保证该线程执行过程
    中会睡眠
3. sleep与锁无关，线程睡眠到期自动苏醒，并返回到Runnable（可运行）状态。

>Tips：sleep()中指定的时间是线程不会运行的最短时间。因此，sleep()方法不能保证该线程睡眠到期后就
>开始立刻执行。

Timed Waiting 线程状态图：

![EhfEqK.png](https://s2.ax1x.com/2019/05/12/EhfEqK.png)

###  BLOCKED（锁阻塞）

Blocked状态在API中的介绍为：一个正在阻塞等待一个监视器锁（锁对象）的线程处于这一状态。

我们已经学完同步机制，那么这个状态是非常好理解的了。比如，线程A与线程B代码中使用同一锁，如果线程A获
取到锁，线程A进入到Runnable状态，那么线程B就进入到Blocked锁阻塞状态。

这是由Runnable状态进入Blocked状态。除此Waiting以及Time Waiting状态也会在某种情况下进入阻塞状态，而
这部分内容作为扩充知识点带领大家了解一下。

Blocked 线程状态图

![Eh4Uvn.png](https://s2.ax1x.com/2019/05/12/Eh4Uvn.png)

### Waiting（无限等待）

Wating状态在API中介绍为：一个正在无限期等待另一个线程执行一个特别的（唤醒）动作的线程处于这一状态。

等待唤醒，也叫线程之间的通信

![Eh4c8J.png](https://s2.ax1x.com/2019/05/12/Eh4c8J.png)

看示例前先介绍Object类的两个方法：

* `public void wait()`： 

  在其他线程调用此对象的 `notify()` 方法或 `notifyAll()` 方法前，导致当前线程等待。

* `public void notify()`： 

  唤醒在此对象监视器上等待的所有线程。

下面通过例子理解waiting状态，（这里先理解线程状态，线程间通信后面有详细介绍）

~~~java
public class WaitingTest {
    public static Object obj = new Object();

    public static void main(String[] args) {
        // 演示waiting
        new Thread(new Runnable() {
            @Override
            public void run() {
                while (true) {
                    synchronized (obj) {
                        try {
                            System.out.println(Thread.currentThread().getName() + "=== 获取到锁对象，调用wait方法，进入waiting状态，释放锁对象");
                            obj.wait(); //无限等待
                            //obj.wait(5000); //计时等待, 5秒 时间到，自动醒来
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                        System.out.println(Thread.currentThread().getName() + "=== 从waiting状态醒来，获取到锁对象，继续执行了");
                    }
                }
            }
        }, "等待线程").start();

        new Thread(new Runnable() {
            @Override
            public void run() {
                // while (true){ //每隔3秒 唤醒一次
                try {
                    System.out.println(Thread.currentThread().getName() + "‐‐‐‐‐ 等待3秒钟");
                    Thread.sleep(3000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                synchronized (obj) {
                    System.out.println(Thread.currentThread().getName() + "‐‐‐‐‐ 获取到锁对 象,调用notify方法，释放锁对象");
                    obj.notify();
                }
            }
            // }
        }, "唤醒线程").start();
    }
}
~~~

通过上述案例我们会发现，一个调用了某个对象的 Object.wait 方法的线程会等待另一个线程调用此对象的
Object.notify()方法 或 Object.notifyAll()方法。

其实waiting状态并不是一个线程的操作，它体现的是多个线程间的通信，可以理解为多个线程之间的协作关系，
多个线程会争取锁，同时相互之间又存在协作关系。就好比在公司里你和你的同事们，你们可能存在晋升时的竞
争，但更多时候你们更多是一起合作以完成某些任务。

当多个线程协作时，比如A，B线程，如果A线程在Runnable（可运行）状态中调用了wait()方法那么A线程就进入
了Waiting（无限等待）状态，同时失去了同步锁。假如这个时候B线程获取到了同步锁，在运行状态中调用了
notify()方法，那么就会将无限等待的A线程唤醒。注意是唤醒，如果获取到锁对象，那么A线程唤醒后就进入
Runnable（可运行）状态；如果没有获取锁对象，那么就进入到Blocked（锁阻塞状态）。

Waiting 线程状态图：

![EhHPud.png](https://s2.ax1x.com/2019/05/12/EhHPud.png)

视频中的例子：

~~~java
package com.itheima.demo10.WaitAndNotify;
/*
    等待唤醒案例:线程之间的通信
        创建一个顾客线程(消费者):告知老板要的包子的种类和数量,调用wait方法,放弃cpu的执行,进入到WAITING状态(无限等待)
        创建一个老板线程(生产者):花了5秒做包子,做好包子之后,调用notify方法,唤醒顾客吃包子

    注意:
        顾客和老板线程必须使用同步代码块包裹起来,保证等待和唤醒只能有一个在执行
        同步使用的锁对象必须保证唯一
        只有锁对象才能调用wait和notify方法

    Obejct类中的方法
    void wait()
          在其他线程调用此对象的 notify() 方法或 notifyAll() 方法前，导致当前线程等待。
    void notify()
          唤醒在此对象监视器上等待的单个线程。
          会继续执行wait方法之后的代码
 */
public class Demo01WaitAndNotify {
    public static void main(String[] args) {
        //创建锁对象,保证唯一
        Object obj = new Object();
        // 创建一个顾客线程(消费者)
        new Thread(){
            @Override
            public void run() {
               //一直等着买包子
               while(true){
                   //保证等待和唤醒的线程只能有一个执行,需要使用同步技术
                   synchronized (obj){
                       System.out.println("告知老板要的包子的种类和数量");
                       //调用wait方法,放弃cpu的执行,进入到WAITING状态(无限等待)
                       try {
                           obj.wait();
                       } catch (InterruptedException e) {
                           e.printStackTrace();
                       }
                       //唤醒之后执行的代码
                       System.out.println("包子已经做好了,开吃!");
                       System.out.println("---------------------------------------");
                   }
               }
            }
        }.start();

        //创建一个老板线程(生产者)
        new Thread(){
            @Override
            public void run() {
                //一直做包子
                while (true){
                    //花了5秒做包子
                    try {
                        Thread.sleep(5000);//花5秒钟做包子
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                    //保证等待和唤醒的线程只能有一个执行,需要使用同步技术
                    synchronized (obj){
                        System.out.println("老板5秒钟之后做好包子,告知顾客,可以吃包子了");
                        //做好包子之后,调用notify方法,唤醒顾客吃包子
                        obj.notify();
                    }
                }
            }
        }.start();
    }
}
~~~

在后面的线程间通信中有更多介绍。

### 线程件状态转换

![EhL2xU.png](https://s2.ax1x.com/2019/05/12/EhL2xU.png)

> Tips:
>
> 我们在翻阅API的时候会发现Timed Waiting（计时等待）与 Waiting（无限等待）状态联系还是很紧密的，比如Waiting（无限等待）状态中wait方法是空参的，而timed waiting（计时等待）中wait方法是带参的。
>
> 执行带参wait方法后，如果没有得到（唤醒）通知，那么线程就处于Timed Waiting状态，直到倒计时完毕自动醒来；如果在倒计时期间得到（唤醒）通知，那么线程从Timed Waiting状态立刻唤醒。

## 等待唤醒机制

### 线程间通信

**概念：**多个线程在处理同一个资源，但是处理的动作（线程的任务）却不相同。

比如：线程A用来生成包子的，线程B用来吃包子的，包子可以理解为同一资源，线程A与线程B处理的动作，一个是生产，一个是消费，那么线程A与线程B之间就存在线程通信问题。

![EhOaJx.png](https://s2.ax1x.com/2019/05/12/EhOaJx.png)

**为什么要处理线程间通信：**

多个线程并发执行时, 在默认情况下CPU是随机切换线程的，当我们需要多个线程来共同完成一件任务，并且我们希望他们有规律的执行, 那么多线程之间需要一些协调通信，以此来帮我们达到多线程共同操作一份数据。

**如何保证线程间通信有效利用资源：**

多个线程在处理同一个资源，并且任务不同时，需要线程通信来帮助解决线程之间对同一个变量的使用或操作。 就是多个线程在操作同一份数据时， 避免对同一共享变量的争夺。也就是我们需要通过一定的手段使各个线程能有效的利用资源。而这种手段即—— **等待唤醒机制。**

### 等待唤醒机制

**什么是等待唤醒机制**

这是多个线程间的一种**协作**机制。谈到线程我们经常想到的是线程间的**竞争（race）**，比如去争夺锁，但这并不是故事的全部，线程间也会有协作机制。就好比在公司里你和你的同事们，你们可能存在在晋升时的竞争，但更多时候你们更多是一起合作以完成某些任务。

就是在一个线程进行了规定操作后，就进入等待状态（**wait()**）， 等待其他线程执行完他们的指定代码过后 再将其唤醒（**notify()**）;在有多个线程进行等待时， 如果需要，可以使用 notifyAll()来唤醒所有的等待线程。

wait/notify 就是线程间的一种协作机制。

**等待唤醒中的方法**

等待唤醒机制就是用于解决线程间通信的问题的，使用到的3个方法的含义如下：

1. **wait**：线程不再活动，不再参与调度，进入 wait set 中，因此不会浪费 CPU 资源，也不会去竞争锁了，这时的线程状态即是 WAITING。它还要等着别的线程执行一个**特别的动作**，也即是“**通知（notify）**”在这个对象上等待的线程从wait set 中释放出来，重新进入到调度队列（ready queue）中
2. **notify**：则选取所通知对象的 wait set 中的一个线程释放；例如，餐馆有空位置后，等候就餐最久的顾客最先入座。
3. **notifyAll**：则释放所通知对象的 wait set 上的全部线程。

>注意：
>
>哪怕只通知了一个等待的线程，被通知线程也不能立即恢复执行，因为它当初中断的地方是在同步块内，而此刻它已经不持有锁，所以她需要再次尝试去获取锁（很可能面临其它线程的竞争），成功后才能在当初调用 wait 方法之后的地方恢复执行。
>
>总结如下：
>
>- 如果能获取锁，线程就从 WAITING 状态变成 RUNNABLE 状态；
>- 否则，从 wait set 出来，又进入 entry set，线程就从 WAITING 状态又变成 BLOCKED 状态

**调用wait和notify方法需要注意的细节**

1. wait方法与notify方法必须要由同一个锁对象调用。因为：对应的锁对象可以通过notify唤醒使用同一个锁对象调用的wait方法后的线程。
2. wait方法与notify方法是属于Object类的方法的。因为：锁对象可以是任意对象，而任意对象的所属类都是继承了Object类的。
3. wait方法与notify方法必须要在同步代码块或者是同步函数中使用。因为：必须要通过锁对象调用这2个方法。

### 生产者与消费者问题

等待唤醒机制其实就是经典的“生产者与消费者”的问题。

就拿生产包子消费包子来说等待唤醒机制如何有效利用资源：

![EhXUBQ.png](https://s2.ax1x.com/2019/05/12/EhXUBQ.png)

>* 包子铺线程和包子线程关系-->通信(互斥)
>* 必须同时同步技术保证两个线程只能有一个在执行
>* 锁对象必须保证唯一,可以使用包子对象作为锁对象
>* 包子铺类和吃货的类就需要把包子对象作为参数传递进来
>  1. 需要在成员位置创建一个包子变量
>  2. 使用带参数构造方法,为这个包子变量赋值

**代码演示：**

包子资源类：

~~~java
public class BaoZi {
     String pier ;
     String xianer ;
     boolean flag = false ;//包子资源 是否存在  包子资源状态
}
~~~

吃货线程类：

~~~java
public class ChiHuo extends Thread{
    private BaoZi bz;

    public ChiHuo(String name,BaoZi bz){
        super(name);
        this.bz = bz;
    }
    @Override
    public void run() {
        while(true){
            synchronized (bz){
                if(bz.flag == false){//没包子
                    try {
                        bz.wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
                
                System.out.println("吃货正在吃"+bz.pier+bz.xianer+"包子");
                bz.flag = false;
                bz.notify();
            }
        }
    }
}
~~~

包子铺线程类：

~~~java
public class BaoZiPu extends Thread {

    private BaoZi bz;

    public BaoZiPu(String name,BaoZi bz){
        super(name);
        this.bz = bz;
    }

    @Override
    public void run() {
        int count = 0;
        //造包子
        while(true){
            //同步
            synchronized (bz){
                if(bz.flag == true){//包子资源  存在
                    try {
                        bz.wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }

                // 没有包子  造包子
                System.out.println("包子铺开始做包子");
                if(count%2 == 0){
                    // 冰皮  五仁
                    bz.pier = "冰皮";
                    bz.xianer = "五仁";
                }else{
                    // 薄皮  牛肉大葱
                    bz.pier = "薄皮";
                    bz.xianer = "牛肉大葱";
                }
                count++;

                bz.flag=true;
                System.out.println("包子造好了："+bz.pier+bz.xianer);
                System.out.println("吃货来吃吧");
                //唤醒等待线程 （吃货）
                bz.notify();
            }
        }
    }
}
~~~

测试类：

~~~java
public class Demo {
    public static void main(String[] args) {
        //等待唤醒案例
        BaoZi bz = new BaoZi();

        ChiHuo ch = new ChiHuo("吃货",bz);
        BaoZiPu bzp = new BaoZiPu("包子铺",bz);

        ch.start();
        bzp.start();
    }
}
~~~

执行效果：

~~~java
包子铺开始做包子
包子造好了：冰皮五仁
吃货来吃吧
吃货正在吃冰皮五仁包子
包子铺开始做包子
包子造好了：薄皮牛肉大葱
吃货来吃吧
吃货正在吃薄皮牛肉大葱包子
包子铺开始做包子
包子造好了：冰皮五仁
吃货来吃吧
吃货正在吃冰皮五仁包子
~~~

## 线程池

### 线程池概念

* **线程池：**其实就是一个容纳多个线程的容器，其中的线程可以反复使用，省去了频繁创建线程对象的操作，无需反复创建线程而消耗过多资源。

通过一张图来了解线程池的工作原理：

![E4C41A.png](https://s2.ax1x.com/2019/05/12/E4C41A.png)

合理利用线程池能够带来三个好处：

1. 降低资源消耗。减少了创建和销毁线程的次数，每个工作线程都可以被重复利用，可执行多个任务。
2. 提高响应速度。当任务到达时，任务可以不需要的等到线程创建就能立即执行。
3. 提高线程的可管理性。可以根据系统的承受能力，调整线程池中工作线线程的数目，防止因为消耗过多的内存，而把服务器累趴下(每个线程需要大约1MB内存，线程开的越多，消耗的内存也就越大，最后死机)。

### 线程池使用

Java里面线程池的顶级接口是`java.util.concurrent.Executor`，但是严格意义上讲`Executor`并不是一个线程池，而只是一个执行线程的工具。真正的线程池接口是`java.util.concurrent.ExecutorService`。

要配置一个线程池是比较复杂的，尤其是对于线程池的原理不是很清楚的情况下，很有可能配置的线程池不是较优的，因此在`java.util.concurrent.Executors`线程工厂类里面提供了一些静态工厂，生成一些常用的线程池。官方建议使用Executors工程类来创建线程池对象。

Executors类中有个创建线程池的方法如下：

* `public static ExecutorService newFixedThreadPool(int nThreads)`：返回线程池对象。(创建的是有界线程池,也就是池中的线程个数可以指定最大数量)

获取到了一个线程池ExecutorService 对象，那么怎么使用呢，在这里定义了一个使用线程池对象的方法如下：

* `public Future<?> submit(Runnable task)`:获取线程池中的某一个线程对象，并执行

  > Future接口：用来记录线程任务执行完毕后产生的结果。线程池创建与使用。

使用线程池中线程对象的步骤：

1. 创建线程池对象。
2. 创建Runnable接口子类对象。(创建任务)
3. 提交Runnable接口子类对象。(提交任务)
4. 关闭线程池(一般不做)。

> 线程池使用步骤：
>
> 1. 使用线程池的工厂类Executors里面提供的静态方法newFixedThreadPool生产一个指定线程数量的线程池(ExecutorService实现类)
> 2. 创建一个类,实现Runnable接口,重写run方法,设置线程任务
> 3. 调用ExecutorService中的方法submit,传递线程任务(实现类),开启线程,执行run方法
> 4. 调用ExecutorService中的方法shutdown销毁线程池(不建议执行)

Runnable实现类代码：

~~~java
public class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("我要一个教练");
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("教练来了： " + Thread.currentThread().getName());
        System.out.println("教我游泳，教完后，教练回到了游泳池");
    }
}
~~~

线程池测试类：

~~~java
public class ThreadPoolDemo {
    public static void main(String[] args) {
        // 创建线程池对象
        ExecutorService service = Executors.newFixedThreadPool(2);//包含2个线程对象
        // 创建Runnable实例对象
        MyRunnable r = new MyRunnable();

        // 从线程池中获取线程对象,然后调用MyRunnable中的run()
        service.submit(r);
        // 再获取个线程对象，调用MyRunnable中的run()
        service.submit(r);
        service.submit(r);
        // 注意：submit方法调用结束后，程序并不终止，是因为线程池控制了线程的关闭。
        // 将使用完的线程又归还到了线程池中
        // 关闭线程池
        //service.shutdown();
    }
}
~~~

## Lambda表达式

### Lambda表达式概述

Java 8（JDK 1.8）中，加入了**Lambda表达式**的重量级新特性。Lambda表达式改面向对象编程为函数式编程。

**用途**：Lambda表达式用于代替匿名内部类作为参数传递的情况，以简化代码。

比如之前使用匿名内部类创建线程

~~~java
public class Demo01Runnable {
	public static void main(String[] args) {
    	// 匿名内部类作为参数
		new Thread(new Runnable(){
            @Override
            public void run() {
                Sysout.out.println("多线程任务执行");
            }
        }).start(); // 启动线程
	}
}
~~~

这里匿名内部类写的很多，但关键的只有重写的方法体。

下面体验Lambda表达式的写法，和以上代码等效。

~~~java
public class Demo02LambdaRunnable {
	public static void main(String[] args) {
		new Thread(() -> System.out.println("多线程任务执行！")).start(); // 启动线程
	}
}
~~~

匿名内部类省略了类的定义，不需要编写具体的实现类；Lambda表达式简化了代码结构。

### 使用Lambda表达式的前提

1. 使用Lambda必须具有接口，且要求**接口中有且仅有一个抽象方法**。

   无论是JDK内置的`Runnable`、`Comparator`接口还是自定义的接口，只有当接口中的抽象方法存在且唯一时，才可以使用Lambda。

2. 使用Lambda必须具有**上下文推断**。

   也就是方法的参数或局部变量类型必须为Lambda对应的接口类型，才能使用Lambda作为该接口的实例。

> 备注：有且仅有一个抽象方法的接口，称为“**函数式接口**”。

### Lamb表达式标准格式

Lambda省去面向对象的条条框框，格式由**3个部分**组成：

- 一些参数
- 一个箭头
- 一段代码

Lambda表达式的**标准格式**为：

```
(参数类型 参数名称) -> { 代码语句 }
```

格式说明：

- 小括号内的语法与传统方法参数列表一致：无参数则留空；多个参数则用逗号分隔。
- `->`是新引入的语法格式，代表指向动作。
- 大括号内的语法与传统方法体要求基本一致。

### 案例

* 无参无返回值

  ~~~java
  public interface Cook {
      void makeFood();
  }
  ~~~

  ~~~java
  public class Demo05InvokeCook {
      public static void main(String[] args) {
          invokeCook( () -> {System.out.println("炒菜！");} );
      }
  
      // 该方法需要传入Cook接口实现类对象
      private static void invokeCook(Cook cook) {
          cook.makeFood();
      }
  }
  ~~~

* 无参又返回值

  使用数组存储多个Person对象，对数组中的Person对象使用Arrays的sort方法通过年龄进行升序排序

  ~~~java
  public class Person { 
      private String name;
      private int age;
      
      // 省略构造器、toString方法与Getter Setter 
  }
  ~~~

  ~~~java
  import java.util.Arrays;
  import java.util.Comparator;
  
  public class Demo06Comparator {
      public static void main(String[] args) {
        	// 本来年龄乱序的对象数组
          Person[] array = {
          	new Person("古力娜扎", 19),
          	new Person("迪丽热巴", 18),
         		new Person("马尔扎哈", 20) };
  
        	// 匿名内部类写法
          Arrays.sort(array, new Comparator<Person>(){
              @Override
              public int compare(Person o1, Person o2) {
                  return o1.getAge() - o2.getAge();
              }
          });
  
          // Lambda表达式写法
          Arrays.sort(array, (Person a, Person b) -> {
            	return a.getAge() - b.getAge();
          });
          
          for (Person person : array) {
              System.out.println(person);
          }
      }
  }
  ~~~

* 有参有返回值

  ~~~java
  public interface Calculator {
      // 传入两个数，返回计算结果，计算方法由实现类重写
      int jisuan(int a, int b); 
  }
  ~~~

  ~~~java
  public class Demo08InvokeCalc {
      public static void main(String[] args) {
          // 重写计算方法为加法
          invokeCalc( 120, 130, (int a, int b) -> {return a + b;} );
      }
  
      // 该方法需要传入Calculator接口实现类对象
      private static void invokeCalc(int a, int b, Calculator calc) {
          int result = calc.jisaun(a, b);
          System.out.println("结果是：" + result);
      }
  }
  ~~~

### Lamb表达式省略格式

可推导即可省略

Lambda强调的是“做什么”而不是“怎么做”，所以凡是可以根据上下文推导得知的信息，都可以省略。例如上例还可以使用Lambda的省略写法：

```java
public static void main(String[] args) {
  	invokeCalc(120, 130, (a, b) -> a + b);
}
```

**【省略规则】**

在Lambda标准格式的基础上，使用省略写法的规则为：

1. 小括号内参数的类型可以省略；
2. 如果小括号内**有且仅有一个参**，则小括号可以省略；
3. 如果大括号内**有且仅有一个语句**，则无论是否有返回值，都可以省略大括号、return关键字及语句分号（要省略，则这三样必须同时省略）。

> 备注：掌握这些省略规则后，请对应地回顾本章开头的多线程案例。

# File类与递归

## File类

`java.io.File` 类是文件和目录路径名的抽象表示，主要用于文件和目录的创建、查找和删除等操作。

### 静态成员变量

* `static String pathSeparator` 与系统有关的路径分隔符，为了方便，它被表示为一个字符串。

* `static char pathSeparatorChar` 与系统有关的路径分隔符。

  > 以上两个一样，路径分隔符，windows:分号;  linux:冒号:

* `static String separator` 与系统有关的默认名称分隔符，为了方便，它被表示为一个字符串。

* `static char separatorChar` 与系统有关的默认名称分隔符。

  >以上两个一样，文件名称分隔符，windows:反斜杠\  linux:正斜杠/

### 构造方法

- `public File(String pathname) ` ：通过将给定的**路径名字符串**转换为抽象路径名来创建新的 File实例。  
- `public File(String parent, String child) ` ：从**父路径名字符串和子路径名字符串**创建新的 File实例。
- `public File(File parent, String child)` ：从**父抽象路径名和子路径名字符串**创建新的 File实例。  

~~~java
// 文件路径名
String pathname = "D:\\aaa.txt";
File file1 = new File(pathname); 

// 文件路径名
String pathname2 = "D:\\aaa\\bbb.txt";
File file2 = new File(pathname2); 

// 通过父路径和子路径字符串
 String parent = "d:\\aaa";
 String child = "bbb.txt";
 File file3 = new File(parent, child);

// 通过父级File对象和子路径字符串
File parentDir = new File("d:\\aaa");
String child = "bbb.txt";
File file4 = new File(parentDir, child);
~~~

> 小贴士：
>
> 1. 一个File对象代表硬盘中实际存在的一个文件或者目录。
> 2. 无论该路径下是否存在文件或者目录，都不影响File对象的创建。

### 常用方法

#### 获取功能的方法

* `public String getAbsolutePath() ` ：返回此File的绝对路径名字符串。

* ` public String getPath() ` ：将此File转换为路径名字符串。 (构造路径)

* `public String getName()`  ：返回由此File表示的文件或目录的名称。  

* `public long length()`  ：返回由此File表示的文件的长度。 

  > File类中重写的toString()方法就是return getPath()
>
  > getPath()方法获取的就是new File对象时，传递的参数路径，传的是什么返回什么，传相对就返回相对，传绝对就返回绝对

  方法演示，代码如下：

  ```java
  public class FileGet {
      public static void main(String[] args) {
          File f = new File("d:/aaa/bbb.java");     
        System.out.println("文件绝对路径:"+f.getAbsolutePath());
          System.out.println("文件构造路径:"+f.getPath());
          System.out.println("文件名称:"+f.getName());
          System.out.println("文件长度:"+f.length()+"字节");
  
          File f2 = new File("d:/aaa");     
          System.out.println("目录绝对路径:"+f2.getAbsolutePath());
          System.out.println("目录构造路径:"+f2.getPath());
          System.out.println("目录名称:"+f2.getName());
          System.out.println("目录长度:"+f2.length());
      }
  }
  输出结果：
文件绝对路径:d:\aaa\bbb.java
  文件构造路径:d:\aaa\bbb.java
  文件名称:bbb.java
  文件长度:636字节
  
  目录绝对路径:d:\aaa
  目录构造路径:d:\aaa
  目录名称:aaa
  目录长度:4096
  ```

> API中说明：length()，表示文件的大小(字节为单位)。但是File对象表示目录，则返回值是不确定的。

#### 绝对路径和相对路径

* **绝对路径**：从盘符开始的路径，这是一个完整的路径。
* **相对路径**：相对于**项目根目录**的路径，这是一个便捷的路径，开发中经常使用。

```java
public class FilePath {
    public static void main(String[] args) {
      	// D盘下的bbb.java文件
        File f = new File("D:\\bbb.java");
        System.out.println(f.getAbsolutePath());
      	
		// 项目下的bbb.java文件
        File f2 = new File("bbb.java");
        System.out.println(f2.getAbsolutePath());
    }
}
输出结果：
D:\bbb.java
D:\idea_project_test4\bbb.java
```

#### 判断功能的方法

- `public boolean exists()` ：此File表示的文件或目录是否实际存在。
- `public boolean isDirectory()` ：此File表示的是否为目录。（不存在false）
- `public boolean isFile()` ：此File表示的是否为文件。（不存在false）


方法演示，代码如下：

```java
public class FileIs {
    public static void main(String[] args) {
        File f = new File("d:\\aaa\\bbb.java");
        File f2 = new File("d:\\aaa");
      	// 判断是否存在
        System.out.println("d:\\aaa\\bbb.java 是否存在:"+f.exists());
        System.out.println("d:\\aaa 是否存在:"+f2.exists());
      	// 判断是文件还是目录
        System.out.println("d:\\aaa 文件?:"+f2.isFile());
        System.out.println("d:\\aaa 目录?:"+f2.isDirectory());
    }
}
输出结果：
d:\aaa\bbb.java 是否存在:true
d:\aaa 是否存在:true
d:\aaa 文件?:false
d:\aaa 目录?:true
```

#### 创建删除功能的方法

- `public boolean createNewFile()` ：当且仅当具有该名称的文件尚不存在时，创建一个新的空文件。 （如果文件或文件夹已经存在，不会创建， 返回false）
- `public boolean delete()` ：删除由此File表示的文件或目录。  
- `public boolean mkdir()` ：创建由此File表示的目录。(创建单级文件夹)
- `public boolean mkdirs()` ：创建由此File表示的目录，包括任何必需但不存在的父目录。(创建多级文件夹)

方法演示，代码如下：

```java
public class FileCreateDelete {
    public static void main(String[] args) throws IOException {
        // 文件的创建
        File f = new File("aaa.txt");
        System.out.println("是否存在:"+f.exists()); // false
        System.out.println("是否创建:"+f.createNewFile()); // true
        System.out.println("是否存在:"+f.exists()); // true
		
     	// 目录的创建
      	File f2= new File("newDir");	
        System.out.println("是否存在:"+f2.exists());// false
        System.out.println("是否创建:"+f2.mkdir());	// true
        System.out.println("是否存在:"+f2.exists());// true

		// 创建多级目录
      	File f3= new File("newDira\\newDirb");
        System.out.println(f3.mkdir());// false
        File f4= new File("newDira\\newDirb");
        System.out.println(f4.mkdirs());// true
      
      	// 文件的删除
       	System.out.println(f.delete());// true
      
      	// 目录的删除
        System.out.println(f2.delete());// true
        System.out.println(f4.delete());// false
    }
}
```

> API中说明：delete方法，如果此File表示目录，则目录必须为空才能删除。

### 目录的遍历

* `public String[] list()` ：返回一个String数组，表示该File目录中的所有子文件或目录。


* `public File[] listFiles()` ：返回一个File数组，表示该File目录中的所有的子文件或目录。  

```java
public class FileFor {
    public static void main(String[] args) {
        File dir = new File("d:\\java_code");
      
      	//获取当前目录下的文件以及文件夹的名称。
		String[] names = dir.list();
		for(String name : names){
			System.out.println(name);
		}
        //获取当前目录下的文件以及文件夹对象，只要拿到了文件对象，那么就可以获取更多信息
        File[] files = dir.listFiles();
        for (File file : files) {
            System.out.println(file);
        }
    }
}
```

> 注意
>
> list方法和listFiles方法遍历的是File构造方法中给出的目录
>
> 如果构造方法中给出的目录的路径不存在,会抛出空指针异常
>
> 如果构造方法中给出的路径不是一个目录,也会抛出空指针异常

## 递归

### 概述

* **递归**：指在当前方法内调用自己的这种现象。

* **递归的分类:**
  - 递归分为两种，直接递归和间接递归。
  - 直接递归称为方法自身调用自己。
  - 间接递归可以A方法调用B方法，B方法调用C方法，C方法调用A方法。

* **注意事项**：
  - 递归一定要有条件限定，保证递归能够停止下来，否则会发生栈内存溢出。
  
  - 在递归中虽然有限定条件，但是递归次数不能太多。否则也会发生栈内存溢出。
  
  - 构造方法,禁止递归
  
    > 栈内存溢出原因，方法不断压栈执行，超出栈内存大小

```java
public class Demo01DiGui {
	public static void main(String[] args) {
		// a();
		b(1);
	}
	
	/*
	 * 3.构造方法,禁止递归
	 * 编译报错:构造方法是创建对象使用的,不能让对象一直创建下去
	 */
	public Demo01DiGui() {
		//Demo01DiGui();
	}

	/*
	 * 2.在递归中虽然有限定条件，但是递归次数不能太多。否则也会发生栈内存溢出。
	 * 4993
	 * 	Exception in thread "main" java.lang.StackOverflowError
	 */
	private static void b(int i) {
		System.out.println(i);
		//添加一个递归结束的条件,i==5000的时候结束
		if(i==5000){
			return;//结束方法
		}
		b(++i);
	}

	/*
	 * 1.递归一定要有条件限定，保证递归能够停止下来，否则会发生栈内存溢出。 Exception in thread "main"
	 * java.lang.StackOverflowError
	 */
	private static void a() {
		System.out.println("a方法");
		a();
	}
}
```

### 递归累加求和  

计算1 ~ n的和

**分析**：num的累和 = num + (num-1)的累和，所以可以把累和的操作定义成一个方法，递归调用。

**【注意】理解好递归，必须要明确：**

1. 递归结束的条件

   > 本例中，结束条件是当num为1时，结束递归

2. 递归的目的

   > 本例中，递归的目的获取下一个被加的数字 `(num - 1)` ，要区分递归的木底和整个方法的目的，整个方法的目的是求和。

**实现代码**：

```java
public class DiGuiDemo {
	public static void main(String[] args) {
		//计算1~num的和，使用递归完成
		int num = 5;
      	// 调用求和的方法
		int sum = getSum(num);
      	// 输出结果
		System.out.println(sum);
		
	}
  	/*
  	  通过递归算法实现.
  	  参数列表:int 
  	  返回值类型: int 
  	*/
	public static int getSum(int num) {
      	/* 
      	   num为1时,方法返回1,
      	   相当于是方法的出口,num总有是1的情况
      	*/
		if(num == 1){
			return 1;
		}
      	/*
          num不为1时,方法返回 num +(num-1)的累和
          递归调用getSum方法
        */
		return num + getSum(num-1);
	}
}
```

* 代码执行图解

[![E4TmNV.jpg](https://s2.ax1x.com/2019/05/13/E4TmNV.jpg)](https://imgchr.com/i/E4TmNV)

> 小贴士：递归一定要有条件限定，保证递归能够停止下来，次数不要太多，否则会发生栈内存溢出。

### 递归求阶乘

* **阶乘**：所有小于及等于该数的正整数的积。

```java
n的阶乘：n! = n * (n-1) *...* 3 * 2 * 1 
```

**分析**：这与累和类似,只不过换成了乘法运算，学员可以自己练习，需要注意阶乘值符合int类型的范围。

```
推理得出：n! = n * (n-1)!
```

**代码实现**：

```java
public class DiGuiDemo {
  	//计算n的阶乘，使用递归完成
    public static void main(String[] args) {
        int n = 3;
      	// 调用求阶乘的方法
        int value = getValue(n);
      	// 输出结果
        System.out.println("阶乘为:"+ value);
    }
	/*
  	  通过递归算法实现.
  	  参数列表:int 
  	  返回值类型: int 
  	*/
    public static int getValue(int n) {
      	// 1的阶乘为1
        if (n == 1) {
            return 1;
        }
      	/*
      	  n不为1时,方法返回 n! = n*(n-1)!
          递归调用getValue方法
      	*/
        return n * getValue(n - 1);
    }
}
```

### 递归打印多级目录

**分析**：多级目录的打印，就是当目录的嵌套。遍历之前，无从知道到底有多少级目录，所以我们还是要使用递归实现。

**代码实现**：

```java  
public class DiGuiDemo2 {
    public static void main(String[] args) {
      	// 创建File对象
        File dir  = new File("D:\\aaa");
      	// 调用打印目录方法
        printDir(dir);
    }

    public static void  printDir(File dir) {
      	// 获取子文件和目录
        File[] files = dir.listFiles();
      	// 循环打印
      	/*
      	  判断:
      	  当是文件时,打印绝对路径.
      	  当是目录时,继续调用打印目录的方法,形成递归调用.
      	*/
        for (File file : files) {
    		// 判断
            if (file.isFile()) {
              	// 是文件,输出文件绝对路径
                System.out.println("文件名:"+ file.getAbsolutePath());
            } else {
              	// 是目录,输出目录绝对路径
                System.out.println("目录:"+file.getAbsolutePath());
              	// 继续遍历,调用printDir,形成递归
                printDir(file);
            }
        }
    }
}
```

## File类综合案例	

### 文件搜索	

搜索`D:\aaa` 目录中的`.java` 文件。

**分析**：

1. 目录搜索，无法判断多少级目录，所以使用递归，遍历所有目录。
2. 遍历目录时，获取的子文件，通过文件名称，判断是否符合条件。（String对象的`endWith(String Str)`方法）

**代码实现**：

```java
public class DiGuiDemo3 {
    public static void main(String[] args) {
        // 创建File对象
        File dir  = new File("D:\\aaa");
      	// 调用打印目录方法
        printDir(dir);
    }

    public static void printDir(File dir) {
      	// 获取子文件和目录
        File[] files = dir.listFiles();
      	
      	// 循环打印
        for (File file : files) {
            if (file.isFile()) {
              	// 是文件，判断文件名并输出文件绝对路径
                if (file.getName().toLowerCase().endsWith(".java")) {
                    System.out.println("文件名:" + file.getAbsolutePath());
                }
            } else {
                // 是目录，继续遍历,形成递归
                printDir(file);
            }
        }
    }
}
```

### 文件过滤器优化

`public File[] listFiles()` ：返回一个File数组，表示该File目录中的所有的子文件或目录。  

以上方法有一个带参重载 `public File[] listFiles(FileFilter filter)` ：返回一个File数组，表示该File目录中所有符合filter过滤器规则的子文件或目录。

其中的参数类`java.io.FileFilter`是一个接口，是File的过滤器，接口中只有一个方法。 

`boolean accept(File pathname)  ` ：测试参数pathname是否应该包含在当前File目录中，符合则返回true。

> ~~~java
> File f = new File("C:\\aaa")；
> File[] files = f.listFiles(new FileFilter(){
> 	@Override
> 	public boolean accept(File pathname){
> 		//是java文件或是文件夹都返回true，在外层会存到files数组中
> 		return pathname.getName().endWith(".java") || pathname.isDirectory();
> 	}
> });
> ~~~

**分析**：

1. 接口作为参数，需要传递子类对象，重写其中方法。我们选择匿名内部类方式，比较简单。
2. `accept`方法，参数为File，表示当前File下所有的子文件和子目录。保留住则返回true，过滤掉则返回false。保留规则：
   1. 要么是.java文件。
   2. 要么是目录，用于继续遍历。
3. 通过过滤器的作用，`listFiles(FileFilter)`返回的数组元素中，子文件对象都是符合条件的，可以直接打印。

**代码实现：**

```java
public class DiGuiDemo4 {
    public static void main(String[] args) {
        File dir = new File("D:\\aaa");
        searchJavaFile(dir);
    }
  
    public static void searchJavaFile(File dir) {
      	// 匿名内部类方式,创建过滤器子类对象
        File[] files = dir.listFiles(new FileFilter() {
            @Override
            public boolean accept(File pathname) {
                return pathname.getName().toLowerCase().endsWith(".java") || 									pathname.isDirectory();
            }
        });
      	// 循环打印
        for (File file : files) {
            if (file.isFile()) {
                System.out.println("文件名:" + file.getAbsolutePath());
            } else {
                searchJavaFile(file);
            }
        }
    }
}      
```

### Lambda优化

**分析：**`FileFilter`是只有一个方法的接口，因此可以用lambda表达式简写。

lambda格式：

```java
()->{ }
```

**代码实现：**

```java
public static void searchJavaFile(File dir) {
  	// lambda的改写
    File[] files = dir.listFiles(f ->{ 
      	return f.getName().toLowerCase().endsWith(".java") || f.isDirectory(); 
    });
  	
	// 循环打印
    for (File file : files) {
        if (file.isFile()) {
            System.out.println("文件名:" + file.getAbsolutePath());
      	} else {
        	searchJavaFile(file);
      	}
    }
}
```

# IO流

## IO概述

### IO流分类

根据数据的流向分为：**输入流**和**输出流**。

* **输入流** ：把数据从`其他设备`上读取到`内存`中的流。 
* **输出流** ：把数据从`内存` 中写出到`其他设备`上的流。

格局数据的类型分为：**字节流**和**字符流**。

* **字节流** ：以字节为单位，读写数据的流。
* **字符流** ：以字符为单位，读写数据的流。

### IO的流向说明图解

[![E5ktOA.jpg](https://s2.ax1x.com/2019/05/13/E5ktOA.jpg)](https://imgchr.com/i/E5ktOA)

### 顶级父类们

**【注意】都是抽象类**

|            |        输入流         |           输出流           |
| :--------: | :------------------: | :-----------------------: |
| **字节流** | 字节输入流**InputStream** | 字节输出流**OutputStream** |
| **字符流** |   字符输入流**Reader**    |    字符输出流**Writer**    |

## 字节流

**一切皆为字节**

一切文件数据(文本、图片、视频等)在存储时，都是以二进制数字的形式保存，都一个一个的字节，那么传输时一样如此。所以，字节流可以传输任意文件数据。在操作流的时候，我们要时刻明确，无论使用什么样的流对象，底层传输的始终为二进制数据。

### 字节输出流OutputStream

`java.io.OutputStream `抽象类是表示字节输出流的所有类的超类，将指定的字节信息写出到目的地。它定义了字节输出流的基本共性功能方法。

* `public void close()` ：关闭此输出流并释放与此流相关联的任何系统资源。  
* `public void flush() ` ：刷新此输出流并强制任何缓冲的输出字节被写出。  
* `public void write(byte[] b)`：将 b.length字节从指定的字节数组写入此输出流。  
* `public void write(byte[] b, int off, int len)` ：从指定的字节数组写入 len字节，从偏移量 off开始输出到此输出流。  
* `public abstract void write(int b)` ：将指定的字节输出流。

> 小贴士：
>
> close方法，当完成流的操作时，必须调用此方法，释放系统资源。

### FileOutputStream类

`OutputStream`有很多子类，我们从最简单的一个子类开始。

`java.io.FileOutputStream `类是文件输出流，用于将数据写出到文件。

#### 构造方法

* `public FileOutputStream(File file)`：创建文件输出流以写入由指定的 File对象表示的文件。 

* `public FileOutputStream(String name)`： 创建文件输出流以指定的名称写入文件。  

  >构造方法会做以下工作
  >
  >1. 创建一个FileOutputStream对象
  >2. 会根据构造方法中传递的文件/文件路径,创建一个空的文件
  >3. 会把FileOutputStream对象指向创建好的文件

当你创建一个流对象时，必须传入一个文件路径。该路径下，如果没有这个文件，会创建该文件。如果有这个文件，会**清空**这个文件的数据。

构造举例，代码如下：

```java
public class FileOutputStreamConstructor throws IOException {
    public static void main(String[] args) {
   	 	// 使用File对象创建流对象
        File file = new File("a.txt");
        FileOutputStream fos = new FileOutputStream(file);
      
        // 使用文件名称创建流对象
        FileOutputStream fos = new FileOutputStream("b.txt");
    }
}
```

#### 数据写入的步骤（重点）：

* 原理

  java程序-->JVM(java虚拟机)-->OS(操作系统)-->OS调用写数据的方法-->把数据写入到文件中
      

* 字节输出流的使用步骤(重点):
  1. 创建一个FileOutputStream对象,构造方法中传递写入数据的目的地
  2. 调用FileOutputStream对象中的方法write,把数据写入到文件中
  3. 释放资源(流使用会占用一定的内存,使用完毕要把内存清空,提供程序的效率)

#### 写出字节数据

* `public void write(int b)`：一次写入一个字节
* `public void write(byte[] b)`：一次写入一个byte数组中的数据

1. **写出字节**：`write(int b)` 方法，每次可以写出一个字节数据，代码使用演示：

```java
public class FOSWrite {
    public static void main(String[] args) throws IOException {
        // 使用文件名称创建流对象
        FileOutputStream fos = new FileOutputStream("fos.txt");     
      	// 写出数据
      	fos.write(97); // 写出第1个字节
      	fos.write(98); // 写出第2个字节
      	fos.write(99); // 写出第3个字节
      	// 关闭资源
        fos.close();
    }
}
输出结果：
abc
```

> 小贴士：
>
> 1. 虽然参数为int类型四个字节，但是只会保留一个字节的信息写出。
> 2. 流操作完毕后，必须释放系统资源，调用close方法，千万记得。

字节输出流和记事本打开文件原理：

![E5VKwn.png](https://s2.ax1x.com/2019/05/13/E5VKwn.png)

2. **写出字节数组**：`write(byte[] b)`，每次可以写出数组中的数据，代码使用演示：

```java
/*
一次写多个字节:
  如果写的第一个字节是正数(0-127),那么显示的时候会查询ASCII表
  如果写的第一个字节是负数,那第一个字节会和第二个字节,两个字节组成一个中文显示,查询系统默认码表(GBK)
  {97, 98, 99} --> abc            {-65,-66,-67,68,69}--->烤紻E
  
也可以用String类的getBytes()方法，根据平台编码获取String对象的byte数组
*/
public class FOSWrite {
    public static void main(String[] args) throws IOException {
        // 使用文件名称创建流对象
        FileOutputStream fos = new FileOutputStream("fos.txt");     
      	// 字符串转换为字节数组
      	byte[] b = "黑马程序员".getBytes();
      	// 写出字节数组数据
      	fos.write(b);
      	// 关闭资源
        fos.close();
    }
}
输出结果：
黑马程序员
```
3. **写出指定长度字节数组**：`write(byte[] b, int off, int len)` ,每次写出从off索引开始，len个字节，代码使用演示：

```java
public class FOSWrite {
    public static void main(String[] args) throws IOException {
        // 使用文件名称创建流对象
        FileOutputStream fos = new FileOutputStream("fos.txt");     
      	// 字符串转换为字节数组
      	byte[] b = "abcde".getBytes();
		// 写出从索引2开始，2个字节。索引2是c，两个字节，也就是cd。
        fos.write(b,2,2);
      	// 关闭资源
        fos.close();
    }
}
输出结果：
cd
```

#### 数据追加续写

经过以上的演示，每次程序运行，创建输出流对象，都会清空目标文件中的数据。如何保留目标文件中数据，还能继续添加新数据呢？

- `public FileOutputStream(File file, boolean append)`： 创建文件输出流以写入由指定的 File对象表示的文件。  
- `public FileOutputStream(String name, boolean append)`： 创建文件输出流以指定的名称写入文件。  

这两个构造方法，参数中都需要传入一个boolean类型的值，`true` 表示追加数据，`false` 表示清空原有数据。这样创建的输出流对象，就可以指定是否追加续写了，代码使用演示：

```java
public class FOSWrite {
    public static void main(String[] args) throws IOException {
        // 使用文件名称创建流对象
        FileOutputStream fos = new FileOutputStream("fos.txt"，true);     
      	// 字符串转换为字节数组
      	byte[] b = "abcde".getBytes();
		// 写出从索引2开始，2个字节。索引2是c，两个字节，也就是cd。
        fos.write(b);
      	// 关闭资源
        fos.close();
    }
}
文件操作前：cd
文件操作后：cdabcde
```

#### 写出换行

Windows系统里，换行符号是`\r\n` 。把

以指定是否追加续写了，代码使用演示：

```java
public class FOSWrite {
    public static void main(String[] args) throws IOException {
        // 使用文件名称创建流对象
        FileOutputStream fos = new FileOutputStream("fos.txt");  
      	// 定义字节数组
      	byte[] words = {97,98,99,100,101};
      	// 遍历数组
        for (int i = 0; i < words.length; i++) {
          	// 写出一个字节
            fos.write(words[i]);
          	// 写出一个换行, 换行符号转成数组写出
            fos.write("\r\n".getBytes());
        }
      	// 关闭资源
        fos.close();
    }
}

输出结果：
a
b
c
d
e
```

> * 回车符`\r`和换行符`\n` ：
>   * 回车符：回到一行的开头（return）。
>   * 换行符：下一行（newline）。
> * 系统中的换行：
>   * Windows系统里，每行结尾是 `回车+换行` ，即`\r\n`；
>   * Unix系统里，每行结尾只有 `换行` ，即`/n`；
>   * Mac系统里，每行结尾是 `回车` ，即`/r`。从 Mac OS X开始与Linux统一。

### 字节输入流InputStream

`java.io.InputStream `抽象类是表示字节输入流的所有类的超类，可以读取字节信息到内存中。它定义了字节输入流的基本共性功能方法。

- `public void close()` ：关闭此输入流并释放与此流相关联的任何系统资源。    
- `public abstract int read()`： 从输入流读取数据的下一个字节。 
- `public int read(byte[] b)`： 从输入流中读取一些字节数，并将它们存储到字节数组 b中 。

> 小贴士：
>
> close方法，当完成流的操作时，必须调用此方法，释放系统资源。

### FileInputStream类

`java.io.FileInputStream `类是文件输入流，从文件中读取字节。

#### 构造方法

* `FileInputStream(File file)`： 通过打开与实际文件的连接来创建一个 FileInputStream ，该文件由文件系统中的 File对象 file命名。 
* `FileInputStream(String name)`： 通过打开与实际文件的连接来创建一个 FileInputStream ，该文件由文件系统中的路径名 name命名。  

当你创建一个流对象时，必须传入一个文件路径。该路径下，如果没有该文件,会抛出`FileNotFoundException` 。

- 构造举例，代码如下：

```java
public class FileInputStreamConstructor throws IOException{
    public static void main(String[] args) {
   	 	// 使用File对象创建流对象
        File file = new File("a.txt");
        FileInputStream fos = new FileInputStream(file);
      
        // 使用文件名称创建流对象
        FileInputStream fos = new FileInputStream("b.txt");
    }
}
```

#### 读取数据的步骤（重点）

* 原理

  java程序-->JVM-->OS-->OS读取数据的方法-->读取文件

* 字节输入流的使用步骤(重点):
  1. 创建FileInputStream对象,构造方法中绑定要读取的数据源
  2. 使用FileInputStream对象中的方法read,读取文件
  3. 释放资源

#### 读取字节数据

* `public int read()`：一次读取一个字节数据，返回读到的数据字节。
* `public int read(byte[] b)`：从输入流中读取一定数量的字节，并将其存储在缓冲区数组 b 中。返回读取的有效字节个数。

1. **读取字节**：`read`方法，每次可以读取一个字节的数据，提升为int类型，读取到文件末尾，返回`-1`，代码使用演示：

```java
public class FISRead {
    public static void main(String[] args) throws IOException{
      	// 使用文件名称创建流对象
       	FileInputStream fis = new FileInputStream("read.txt");
      	// 读取数据，返回一个字节
        int read = fis.read();
        System.out.println((char) read);
        read = fis.read();
        System.out.println((char) read);
        read = fis.read();
        System.out.println((char) read);
        read = fis.read();
        System.out.println((char) read);
        read = fis.read();
        System.out.println((char) read);
      	// 读取到末尾,返回-1
       	read = fis.read();
        System.out.println( read);
		// 关闭资源
        fis.close();
    }
}
输出结果：
a
b
c
d
e
-1
```

循环改进读取方式，代码使用演示：

```java
public class FISRead {
    public static void main(String[] args) throws IOException{
      	// 使用文件名称创建流对象
       	FileInputStream fis = new FileInputStream("read.txt");
      	// 定义变量，保存数据
        int b ；
        // 循环读取
        while ((b = fis.read())!=-1) {
            System.out.println((char)b);
        }
		// 关闭资源
        fis.close();
    }
}
输出结果：
a
b
c
d
e
```

> 小贴士：
>
> 1. 虽然读取了一个字节，但是会自动提升为int类型。
> 2. 流操作完毕后，必须释放系统资源，调用close方法，千万记得。

2. **使用字节数组读取**：`read(byte[] b)`，每次读取b的长度个字节到数组中，返回读取到的有效字节个数，读取到末尾时，返回`-1` 

   `int read(byte[] b) `：从输入流中读取一定数量的字节，并将其存储在缓冲区数组 b 中。
   
   明确两件事情:
   
   1. 方法的参数byte[]的作用?
      
      起到缓冲作用,存储每次读取到的多个字节
      数组的长度一把定义为1024(1kb)或者1024的整数倍
      
   2. 方法的返回值int是什么?
   
      每次读取的有效字节个数
   
   String类的构造方法
   
   * `String(byte[] bytes) `:把字节数组转换为字符串
   
   * `String(byte[] bytes, int offset, int length)` 把字节数组的一部分转换为字符串
   
     offset:数组的开始索引 length:转换的字节个数

```java
public class FISRead {
    public static void main(String[] args) throws IOException{
      	// 使用文件名称创建流对象.
       	FileInputStream fis = new FileInputStream("read.txt"); // 文件中为abcde
      	// 定义变量，作为有效个数
        int len ；
        // 定义字节数组，作为装字节数据的容器   
        byte[] b = new byte[2];
        // 循环读取
        while (( len= fis.read(b))!=-1) {
           	// 每次读取后,把数组变成字符串打印
            System.out.println(new String(b));
        }
		// 关闭资源
        fis.close();
    }
}

输出结果：
ab
cd
ed
```

错误数据`d`，是由于最后一次读取时，只读取一个字节`e`，数组中，上次读取的数据没有被完全替换，所以要通过`len` ，获取有效的字节，代码使用演示：

```java
public class FISRead {
    public static void main(String[] args) throws IOException{
      	// 使用文件名称创建流对象.
       	FileInputStream fis = new FileInputStream("read.txt"); // 文件中为abcde
      	// 定义变量，作为有效个数
        int len ；
        // 定义字节数组，作为装字节数据的容器   
        byte[] b = new byte[2];
        // 循环读取
        while (( len= fis.read(b))!=-1) {
           	// 每次读取后,把数组的有效字节部分，变成字符串打印
            System.out.println(new String(b，0，len));//  len 每次读取的有效字节个数
        }
		// 关闭资源
        fis.close();
    }
}

输出结果：
ab
cd
e
```

> 小贴士：
>
> 使用数组读取，每次读取多个字节，减少了系统间的IO操作次数，从而提高了读写的效率，建议开发中使用。

![E5QYZD.png](https://s2.ax1x.com/2019/05/13/E5QYZD.png)

### 字节流文件复制

自己写的，感觉比课件的好：

~~~java
public class FileCopy {

    public static void main(String[] args) {
        File file = new File("G:\\1图片\\小伙伴\\1.jpg");
        if (file.exists())
            copy(file, "I:\\haha.jpg");
    }

    public static void copy(File file, String path) {

        FileInputStream fis = null;
        FileOutputStream fos = null;

        try {
            fis = new FileInputStream(file);
            fos = new FileOutputStream(path);

            byte[] bytes = new byte[1024];
            int n = 0;

            while ((n = fis.read(bytes)) != -1) {
                //fos.write(bytes);  //数据偏差
                fos.write(bytes, 0, n); // 只写入有效字节
            }

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                fos.close();
                fis.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }
}
~~~

## 字符流

当使用字节流读取文本文件时，可能会有一个小问题。就是遇到中文字符时，可能不会显示完整的字符，那是因为一个中文字符可能占用多个字节存储（一直汉字，GBK占2字节，UTF-8占3字节）。所以Java提供一些字符流类，以字符为单位读写数据，专门用于处理文本文件。

### 字符输入流【Reader】

`java.io.Reader`抽象类是表示用于读取字符流的所有类的超类，可以读取字符信息到内存中。它定义了字符输入流的基本共性功能方法。

- `public void close()` ：关闭此流并释放与此流相关联的任何系统资源。    
- `public int read()`： 从输入流读取一个字符。 
- `public int read(char[] cbuf)`： 从输入流中读取一些字符，并将它们存储到字符数组 cbuf中 。

### FileReader类  

~~~
java.io.Reader
	|-----java.io.InputStreamReader
				|-----java.io.FileReader
~~~

`java.io.FileReader `类是读取字符文件的便利类。构造时使用系统默认的字符编码和默认字节缓冲区。

> 小贴士：
>
> 1. 字符编码：字节与字符的对应规则。Windows系统的中文编码默认是GBK编码表。
>
> idea中UTF-8
>
> 2. 字节缓冲区：一个字节数组，用来临时存储字节数据。

#### 构造方法

- `FileReader(File file)`： 创建一个新的 FileReader ，给定要读取的File对象。   
- `FileReader(String fileName)`： 创建一个新的 FileReader ，给定要读取的文件的名称。  

当你创建一个流对象时，必须传入一个文件路径。类似于FileInputStream 。

- 构造举例，代码如下：

```java
public class FileReaderConstructor throws IOException{
    public static void main(String[] args) {
   	 	// 使用File对象创建流对象
        File file = new File("a.txt");
        FileReader fr = new FileReader(file);
      
        // 使用文件名称创建流对象
        FileReader fr = new FileReader("b.txt");
    }
}
```

#### 使用步骤

1. 创建FileReader对象,构造方法中绑定要读取的数据源
2. 使用FileReader对象中的read方法读取文件
3. close()方法释放资源

#### 读取字符数据

1. **读取字符**：`read`方法，每次可以读取一个字符的数据，提升为int类型，读取到文件末尾，返回`-1`，循环读取，代码使用演示：

```java
public class FRRead {
    public static void main(String[] args) throws IOException {
      	// 使用文件名称创建流对象
       	FileReader fr = new FileReader("read.txt");
      	// 定义变量，保存数据
        int b ；
        // 循环读取
        while ((b = fr.read())!=-1) {
            System.out.println((char)b);
        }
		// 关闭资源
        fr.close();
    }
}
输出结果：
黑
马
程
序
员
```

> 小贴士：虽然读取了一个字符，但是会自动提升为int类型。
>

2. **使用字符数组读取**：`read(char[] cbuf)`，每次读取b的长度个字符到数组中，返回读取到的有效字符个数，读取到末尾时，返回`-1` ，代码使用演示：

```java
public class FRRead {
    public static void main(String[] args) throws IOException {
      	// 使用文件名称创建流对象
       	FileReader fr = new FileReader("read.txt");
      	// 定义变量，保存有效字符个数
        int len ；
        // 定义字符数组，作为装字符数据的容器
         char[] cbuf = new char[2];
        // 循环读取
        while ((len = fr.read(cbuf))!=-1) {
            System.out.println(new String(cbuf));
        }
		// 关闭资源
        fr.close();
    }
}
输出结果：
黑马
程序
员序
```

获取有效的字符改进，代码使用演示：

```java
public class FISRead {
    public static void main(String[] args) throws IOException {
      	// 使用文件名称创建流对象
       	FileReader fr = new FileReader("read.txt");
      	// 定义变量，保存有效字符个数
        int len ；
        // 定义字符数组，作为装字符数据的容器
        char[] cbuf = new char[2];
        // 循环读取
        while ((len = fr.read(cbuf))!=-1) {
            System.out.println(new String(cbuf,0,len));
        }
    	// 关闭资源
        fr.close();
    }
}

输出结果：
黑马
程序
员
```

### 字符输出流【Writer】

`java.io.Writer `抽象类是表示用于写出字符流的所有类的超类，将指定的字符信息写出到目的地。它定义了字节输出流的基本共性功能方法。

- `void write(int c)` 写入单个字符。
- `void write(char[] cbuf) `写入字符数组。 
- `abstract  void write(char[] cbuf, int off, int len) `写入字符数组的某一部分,off数组的开始索引,len写的字符个数。 
- `void write(String str) `写入字符串。 
- `void write(String str, int off, int len)` 写入字符串的某一部分,off字符串的开始索引,len写的字符个数。
- `void flush() `刷新该流的缓冲。  
- `void close()` 关闭此流，但要先刷新它。 

### FileWriter类

~~~
java.io.Writer
	|-----java.io.OutputStreamWriter
				|-----java.io.FileWriter
~~~

`java.io.FileWriter `类是写出字符到文件的便利类。构造时使用系统默认的字符编码和默认字节缓冲区。

#### 构造方法

- `FileWriter(File file)`： 创建一个新的 FileWriter，给定要读取的File对象。   
- `FileWriter(String fileName)`： 创建一个新的 FileWriter，给定要读取的文件的名称。  

当你创建一个流对象时，必须传入一个文件路径，类似于FileOutputStream。

- 构造举例，代码如下：

```java
public class FileWriterConstructor {
    public static void main(String[] args) throws IOException {
   	 	// 使用File对象创建流对象
        File file = new File("a.txt");
        FileWriter fw = new FileWriter(file);
      
        // 使用文件名称创建流对象
        FileWriter fw = new FileWriter("b.txt");
    }
}
```

#### 使用步骤

1. 创建FileWriter对象,构造方法中绑定要写入数据的目的地
2. 使用FileWriter中的方法write,把数据写入到内存缓冲区中(字符转换为字节的过程)
3. 使用FileWriter中的方法flush,把内存缓冲区中的数据,刷新到文件中
4. 释放资源(会先把内存缓冲区中的数据刷新到文件中)

#### 基本写出数据

**写出字符**：`write(int b)` 方法，每次可以写出一个字符数据，代码使用演示：

```java
public class FWWrite {
    public static void main(String[] args) throws IOException {
        // 使用文件名称创建流对象
        FileWriter fw = new FileWriter("fw.txt");     
      	// 写出数据
      	fw.write(97); // 写出第1个字符
      	fw.write('b'); // 写出第2个字符
      	fw.write('C'); // 写出第3个字符
      	fw.write(30000); // 写出第4个字符，中文编码表中30000对应一个汉字。
      
      	/*
        【注意】关闭资源时,与FileOutputStream不同。
      	 如果不关闭,数据只是保存到缓冲区，并未保存到文件。
        */
        // fw.close();
    }
}
输出结果：
abC田
```

> 小贴士：
>
> 1. 虽然参数为int类型四个字节，但是只会保留一个字符的信息写出。
> 2. 未调用close方法，数据只是保存到了缓冲区，并未写出到文件中。

#### 关闭和刷新

因为内置缓冲区的原因，如果不关闭输出流，无法写出字符到文件中。但是关闭的流对象，是无法继续写出数据的。如果我们既想写出数据，又想继续使用流，就需要`flush` 方法了。

* `flush` ：刷新缓冲区，流对象可以继续使用。
* `close `：先刷新缓冲区，然后通知系统释放资源。流对象不可以再被使用了。

代码使用演示：

```java
public class FWWrite {
    public static void main(String[] args) throws IOException {
        // 使用文件名称创建流对象
        FileWriter fw = new FileWriter("fw.txt");
        // 写出数据，通过flush
        fw.write('刷'); // 写出第1个字符
        fw.flush();
        fw.write('新'); // 继续写出第2个字符，写出成功
        fw.flush();
      
      	// 写出数据，通过close
        fw.write('关'); // 写出第1个字符
        fw.close();
        fw.write('闭'); // 继续写出第2个字符,【报错】java.io.IOException: Stream closed
        fw.close();
    }
}
```

> 小贴士：即便是flush方法写出了数据，操作的最后还是要调用close方法，释放系统资源。

#### 写出其他数据

1. **写出字符数组** ：`write(char[] cbuf)` 和 `write(char[] cbuf, int off, int len)` ，每次可以写出字符数组中的数据，用法类似FileOutputStream，代码使用演示：

```java
public class FWWrite {
    public static void main(String[] args) throws IOException {
        // 使用文件名称创建流对象
        FileWriter fw = new FileWriter("fw.txt");     
      	// 字符串转换为字节数组
      	char[] chars = "黑马程序员".toCharArray();
      
      	// 写出字符数组
      	fw.write(chars); // 黑马程序员
        
		// 写出从索引2开始，2个字节。索引2是'程'，两个字节，也就是'程序'。
        fw.write(chars,2,2); // 程序
      
      	// 关闭资源
        fos.close();
    }
}
```

2. **写出字符串**：`write(String str)` 和 `write(String str, int off, int len)` ，每次可以写出字符串中的数据，更为方便，代码使用演示：

```java
public class FWWrite {
    public static void main(String[] args) throws IOException {
        // 使用文件名称创建流对象
        FileWriter fw = new FileWriter("fw.txt");     
      	// 字符串
      	String msg = "黑马程序员";
      
      	// 写出字符数组
      	fw.write(msg); //黑马程序员
      
		// 写出从索引2开始，2个字节。索引2是'程'，两个字节，也就是'程序'。
        fw.write(msg,2,2);	// 程序
      	
        // 关闭资源
        fos.close();
    }
}
```

3. **续写和换行**：操作类似于FileOutputStream。

```java
public class FWWrite {
    public static void main(String[] args) throws IOException {
        // 使用文件名称创建流对象，可以续写数据
        FileWriter fw = new FileWriter("fw.txt"，true);     
      	// 写出字符串
        fw.write("黑马");
      	// 写出换行
      	fw.write("\r\n");
      	// 写出字符串
  		fw.write("程序员");
      	// 关闭资源
        fw.close();
    }
}
输出结果:
黑马
程序员
```

> 小贴士：字符流，只能操作文本文件，不能操作图片，视频等非文本文件。
>
> 当我们单纯读或者写文本文件时  使用字符流 其他情况使用字节流

## IO异常处理和关闭资源方法

### Java7之前处理

之前的入门练习，我们一直把异常抛出，而实际开发中并不能这样处理，建议使用`try...catch...finally` 代码块，处理异常部分，代码使用演示：

```java  
public class HandleException1 {
    public static void main(String[] args) {
      	// 声明变量
        FileWriter fw = null;
        try {
            //创建流对象
            fw = new FileWriter("fw.txt");
            // 写出数据
            fw.write("黑马程序员"); //黑马程序员
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (fw != null) {
                    fw.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```

### Java7的处理

还可以使用JDK7优化后的`try-with-resource` 语句，该语句确保了每个资源在语句结束时关闭。所谓的资源（resource）是指在程序完成后，必须关闭的对象。

格式：

```java
try (创建流对象语句，如果多个,使用';'隔开) {
	// 读写数据
} catch (IOException e) {
	e.printStackTrace();
}
```

代码使用演示：

```java
public class HandleException2 {
    public static void main(String[] args) {
      	// 创建流对象
        try ( FileWriter fw = new FileWriter("fw.txt"); ) {
            // 写出数据
            fw.write("黑马程序员"); //黑马程序员
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### Java9的改进

JDK9中`try-with-resource` 的改进，对于**引入对象**的方式，支持的更加简洁。被引入的对象，同样可以自动关闭，无需手动close，我们来了解一下格式。

改进后格式：

```java
Resource resource1 = new Resource("resource1");
Resource resource2 = new Resource("resource2");

// 引入方式：直接引入
try (resource1; resource2) {
     // 使用对象
}
```

改进后，代码使用演示：

```java
public class TryDemo {
    public static void main(String[] args) throws IOException {
       	// 创建流对象
        FileReader fr  = new FileReader("in.txt");
        FileWriter fw = new FileWriter("out.txt");
       	// 引入到try中
        try (fr; fw) {
          	// 定义变量
            int b;
          	// 读取数据
          	while ((b = fr.read())!=-1) {
            	// 写出数据
            	fw.write(b);
          	}
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

> 可以看出Java9的改进还不如Java7的改进方便，在try之外定义创建流对象又会产生IO异常，又多了异常处理

## 属性集

### 概述

`java.util.Properties ` 继承于` Hashtable` ，来表示一个持久的属性集。它使用键值结构存储数据，每个键及其对应值都是一个字符串。该类也被许多Java类使用，比如获取系统属性时，`System.getProperties` 方法就是返回一个`Properties`对象。

> Hashtable已经被取代，但其子类Properties类还活跃在历史舞台，因为它是唯一一个和IO流相结合的集合

### Properties类

#### 构造方法

- `public Properties()` :创建一个空的属性列表。

#### 基本的存储方法

- `public Object setProperty(String key, String value)` ： 保存一对属性。  
- `public String getProperty(String key) ` ：使用此属性列表中指定的键搜索属性值。
- `public Set<String> stringPropertyNames() ` ：所有键的名称的集合。

```java
public class ProDemo {
    public static void main(String[] args) throws FileNotFoundException {
        // 创建属性集对象
        Properties properties = new Properties();
        // 添加键值对元素
        properties.setProperty("filename", "a.txt");
        properties.setProperty("length", "209385038");
        properties.setProperty("location", "D:\\a.txt");
        // 打印属性集对象
        System.out.println(properties);
        // 通过键,获取属性值
        System.out.println(properties.getProperty("filename"));
        System.out.println(properties.getProperty("length"));
        System.out.println(properties.getProperty("location"));

        // 遍历属性集,获取所有键的集合
        Set<String> strings = properties.stringPropertyNames();
        // 打印键值对
        for (String key : strings ) {
          	System.out.println(key+" -- "+properties.getProperty(key));
        }
    }
}
输出结果：
{filename=a.txt, length=209385038, location=D:\a.txt}
a.txt
209385038
D:\a.txt
filename -- a.txt
length -- 209385038
location -- D:\a.txt
```

#### 与流相关的方法

可以使用Properties集合中的方法store,把集合中的临时数据,持久化写入到硬盘中存储

可以使用Properties集合中的方法load,把硬盘中保存的文件(键值对),读取到集合中使用

##### properties持久化

可以使用Properties集合中的方法store,把集合中的临时数据,持久化写入到硬盘中存储

* `void store(OutputStream out, String comments)`

* `void store(Writer writer, String comments)`

  > 参数:
  >
  > OutputStream out：字节输出流，不能写入中文
  >
  > Writer writer：字符输出流，可以写中文
  >
  > String comments：注释，用来解释说明保存的文件是做什么用的，不能使用中文，会产生乱码，默认是Unicode编码
  > 一般使用""空字符串

使用步骤:

1. 创建Properties集合对象,添加数据
2. 创建字节输出流/字符输出流对象,构造方法中绑定要输出的目的地
3. 使用Properties集合中的方法store,把集合中的临时数据,持久化写入到硬盘中存储
4. 释放资源

~~~java
public class PropertiesDemo {

    public static void main(String[] args) throws IOException {
        //1.创建Properties集合对象,添加数据
        Properties prop = new Properties();
        prop.setProperty("赵丽颖","168");
        prop.setProperty("迪丽热巴","165");
        prop.setProperty("古力娜扎","160");

        //2.创建字节输出流/字符输出流对象,构造方法中绑定要输出的目的地
        FileWriter fw = new FileWriter("09_IOAndProperties\\prop.txt");

        //3.使用Properties集合中的方法store,把集合中的临时数据,持久化写入到硬盘中存储
        prop.store(fw,"save data");

        //4.释放资源
        fw.close();

        //prop.store(new FileOutputStream("09_IOAndProperties\\prop2.txt"),"");
    }
    
}
~~~


##### properties加载文件

可以使用Properties集合中的方法load,把硬盘中保存的文件(键值对),读取到集合中使用

* `void load(InputStream inStream)`

* `void load(Reader reader)`

  > 参数:
  >
  > InputStream inStream:字节输入流,不能读取含有中文的键值对
  >
  > Reader reader:字符输入流,能读取含有中文的键值对


使用步骤:

1. 创建Properties集合对象
2. 使用Properties集合对象中的方法load读取保存键值对的文件
3. 遍历Properties集合

注意:
1. 存储键值对的文件中,键与值默认的连接符号可以使用=,空格(其他符号)
2. 存储键值对的文件中,可以使用#进行注释,被注释的键值对不会再被读取
3. 存储键值对的文件中,键与值默认都是字符串,不用再加引号

~~~java
public class PropertiesDemo {
    
    public static void main(String[] args) throws IOException {
        //1.创建Properties集合对象
        Properties prop = new Properties();
        
        //2.使用Properties集合对象中的方法load读取保存键值对的文件
        prop.load(new FileReader("09_IOAndProperties\\prop.txt"));
        
        //prop.load(new FileInputStream("09_IOAndProperties\\prop.txt"));
        
        //3.遍历Properties集合
        Set<String> set = prop.stringPropertyNames();
        for (String key : set) {
            String value = prop.getProperty(key);
            System.out.println(key+"="+value);
        }
    }
}
~~~

> 小贴士：文本中的数据，必须是键值对形式，可以使用空格、等号、冒号等符号分隔。
>
> ~~~
> filename=a.txt
> length=209385038
> location=D:\a.txt
> ~~~

## 缓冲流

我们已经学习了基本的一些流，作为IO流的入门，接下来我们要见识一些更强大的流。比如能够高效读写的**缓冲流**，能够转换编码的**转换流**，能够持久化存储对象的**序列化流**等等。这些功能更为强大的流，都是在基本的流对象基础之上创建而来的，就像穿上铠甲的武士一样，相当于是对基本流对象的一种增强。

### 概述

缓冲流，也叫高效流，是对4个基本的`FileXxx` 流的增强，所以也是4个流，按照数据类型分类：

- **字节缓冲流**：`BufferedInputStream`，`BufferedOutputStream` 
- **字符缓冲流**：`BufferedReader`，`BufferedWriter`

缓冲流的基本原理，是在创建流对象时，会创建一个内置的默认大小的缓冲区数组，通过缓冲区读写，减少系统IO次数，从而提高读写的效率。

### 字节缓冲流

继承自抽象类InputStream和抽象类OutputStream，常用读写方法和基本流一致。

#### 构造方法

- `public BufferedInputStream(InputStream in)` ：以默认缓冲区大小创建一个新的缓冲输入流。 

- `public BufferedInputStream(InputStream in, int size)`： 指定缓冲区大小，创建一个新的缓冲输入流。

- `public BufferedOutputStream(OutputStream out)`： 以默认缓冲区大小创建一个新的缓冲输出流。

- `public BufferedOutputStream(OutputStream out, int Size)`： 指定缓冲区大小，创建一个新的缓冲输出流。

构造举例，代码如下：

```java
// 创建字节缓冲输入流
BufferedInputStream bis = new BufferedInputStream(new FileInputStream("bis.txt"));
// 创建字节缓冲输出流
BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream("bos.txt"));
```


  > 参数就是字节输入输出流对象，是抽象类，使用其子类FileInputStream和FileOutputStream对象。

#### 效率测试

查询API，缓冲流读写方法与基本的流是一致的，我们通过复制大文件（375MB），测试它的效率。

1. **基本流**，代码如下：

```java
public class BufferedDemo {
    public static void main(String[] args) throws FileNotFoundException {
        // 记录开始时间
      	long start = System.currentTimeMillis();
		// 创建流对象
        try (
        	FileInputStream fis = new FileInputStream("jdk9.exe");
        	FileOutputStream fos = new FileOutputStream("copy.exe")
        ){
        	// 读写数据
            int b;
            while ((b = fis.read()) != -1) {
                fos.write(b);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
		// 记录结束时间
        long end = System.currentTimeMillis();
        System.out.println("普通流复制时间:"+(end - start)+" 毫秒");
    }
}

十几分钟过去了...
```

2. **缓冲流**，代码如下：

```java
public class BufferedDemo {
    public static void main(String[] args) throws FileNotFoundException {
        // 记录开始时间
      	long start = System.currentTimeMillis();
		// 创建流对象
        try (
        	BufferedInputStream bis = new BufferedInputStream(new FileInputStream("jdk9.exe"));
	     BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream("copy.exe"));
        ){
        // 读写数据
            int b;
            while ((b = bis.read()) != -1) {
                bos.write(b);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
		// 记录结束时间
        long end = System.currentTimeMillis();
        System.out.println("缓冲流复制时间:"+(end - start)+" 毫秒");
    }
}

缓冲流复制时间:8016 毫秒
```

如何更快呢？使用数组的方式（和基本流一样的方法），代码如下：

```java
public class BufferedDemo {
    public static void main(String[] args) throws FileNotFoundException {
      	// 记录开始时间
        long start = System.currentTimeMillis();
		// 创建流对象
        try (
			BufferedInputStream bis = new BufferedInputStream(new FileInputStream("jdk9.exe"));
		 BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream("copy.exe"));
        ){
          	// 读写数据
            int len;
            byte[] bytes = new byte[8*1024];
            while ((len = bis.read(bytes)) != -1) {
                bos.write(bytes, 0 , len);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
		// 记录结束时间
        long end = System.currentTimeMillis();
        System.out.println("缓冲流使用数组复制时间:"+(end - start)+" 毫秒");
    }
}
缓冲流使用数组复制时间:666 毫秒
```

### 字符缓冲流

#### 构造方法

- `public BufferedReader(Reader in)` ：以默认缓冲区大小创建一个新的缓冲输入流。
- `public BufferedReader(Reader in, int size)` ：指定缓冲区大小，创建一个新的缓冲输入流。
- `public BufferedWriter(Writer out)`：以默认缓冲区大小创建一个新的缓冲输出流。
- `public BufferedWriter(Writer out, int size)`：指定缓冲区大小，创建一个新的缓冲输出流。

构造举例，代码如下：

```java
// 创建字符缓冲输入流
BufferedReader br = new BufferedReader(new FileReader("br.txt"));
// 创建字符缓冲输出流
BufferedWriter bw = new BufferedWriter(new FileWriter("bw.txt"));
```

#### 特有方法

字符缓冲流的基本方法与普通字符流调用方式一致，不再阐述，我们来看它们具备的特有方法。

- BufferedReader：`public String readLine()`: 读一行文字。 
- BufferedWriter：`public void newLine()`: 写一行行分隔符,由系统属性定义符号。 

`readLine`方法演示，代码如下：

```java
public class BufferedReaderDemo {
    public static void main(String[] args) throws IOException {
      	 // 创建流对象
        BufferedReader br = new BufferedReader(new FileReader("in.txt"));
		// 定义字符串,保存读取的一行文字
        String line  = null;
      	// 循环读取,读取到最后返回null
        while ((line = br.readLine())!=null) {
            System.out.print(line);
            System.out.println("------");
        }
		// 释放资源
        br.close();
    }
}
```

`newLine`方法演示，代码如下：

```java
public class BufferedWriterDemo throws IOException {
    public static void main(String[] args) throws IOException  {
      	// 创建流对象
		BufferedWriter bw = new BufferedWriter(new FileWriter("out.txt"));
      	// 写出数据
        bw.write("黑马");
      	// 写出换行
        bw.newLine();
        bw.write("程序");
        bw.newLine();
        bw.write("员");
        bw.newLine();
		// 释放资源
        bw.close();
    }
}
输出效果:
黑马
程序
员
```

### 练习:文本排序

请将文本信息恢复顺序。

```
3.侍中、侍郎郭攸之、费祎、董允等，此皆良实，志虑忠纯，是以先帝简拔以遗陛下。愚以为宫中之事，事无大小，悉以咨之，然后施行，必得裨补阙漏，有所广益。
8.愿陛下托臣以讨贼兴复之效，不效，则治臣之罪，以告先帝之灵。若无兴德之言，则责攸之、祎、允等之慢，以彰其咎；陛下亦宜自谋，以咨诹善道，察纳雅言，深追先帝遗诏，臣不胜受恩感激。
4.将军向宠，性行淑均，晓畅军事，试用之于昔日，先帝称之曰能，是以众议举宠为督。愚以为营中之事，悉以咨之，必能使行阵和睦，优劣得所。
2.宫中府中，俱为一体，陟罚臧否，不宜异同。若有作奸犯科及为忠善者，宜付有司论其刑赏，以昭陛下平明之理，不宜偏私，使内外异法也。
1.先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也。
9.今当远离，临表涕零，不知所言。
6.臣本布衣，躬耕于南阳，苟全性命于乱世，不求闻达于诸侯。先帝不以臣卑鄙，猥自枉屈，三顾臣于草庐之中，咨臣以当世之事，由是感激，遂许先帝以驱驰。后值倾覆，受任于败军之际，奉命于危难之间，尔来二十有一年矣。
7.先帝知臣谨慎，故临崩寄臣以大事也。受命以来，夙夜忧叹，恐付托不效，以伤先帝之明，故五月渡泸，深入不毛。今南方已定，兵甲已足，当奖率三军，北定中原，庶竭驽钝，攘除奸凶，兴复汉室，还于旧都。此臣所以报先帝而忠陛下之职分也。至于斟酌损益，进尽忠言，则攸之、祎、允之任也。
5.亲贤臣，远小人，此先汉所以兴隆也；亲小人，远贤臣，此后汉所以倾颓也。先帝在时，每与臣论此事，未尝不叹息痛恨于桓、灵也。侍中、尚书、长史、参军，此悉贞良死节之臣，愿陛下亲之信之，则汉室之隆，可计日而待也。
```

案例分析

1. 逐行读取文本信息。
2. 解析文本信息到集合中。
3. 遍历集合，按顺序，写出文本信息。

案例实现

```java
public class BufferedTest {
    public static void main(String[] args) throws IOException {
        // 创建map集合,保存文本数据,键为序号,值为文字
        HashMap<String, String> lineMap = new HashMap<>();

        // 创建流对象
        BufferedReader br = new BufferedReader(new FileReader("in.txt"));
        BufferedWriter bw = new BufferedWriter(new FileWriter("out.txt"));

        // 读取数据
        String line  = null;
        while ((line = br.readLine())!=null) {
            // 解析文本
            String[] split = line.split("\\.");
            // 保存到集合
            lineMap.put(split[0],split[1]);
        }
        // 释放资源
        br.close();

        // 遍历map集合
        for (int i = 1; i <= lineMap.size(); i++) {
            String key = String.valueOf(i);
            // 获取map中文本
            String value = lineMap.get(key);
          	// 写出拼接文本
            bw.write(key+"."+value);
          	// 写出换行
            bw.newLine();
        }
		// 释放资源
        bw.close();
    }
}
```

## 转换流

### 字符编码和字符集（了解，可以不看）

#### 字符编码

计算机中储存的信息都是用二进制数表示的，而我们在屏幕上看到的数字、英文、标点符号、汉字等字符是二进制数转换之后的结果。按照某种规则，将字符存储到计算机中，称为**编码** 。反之，将存储在计算机中的二进制数按照某种规则解析显示出来，称为**解码** 。比如说，按照A规则存储，同样按照A规则解析，那么就能显示正确的文本符号。反之，按照A规则存储，再按照B规则解析，就会导致乱码现象。

编码:字符(能看懂的)--字节(看不懂的)

解码:字节(看不懂的)-->字符(能看懂的)

- **字符编码`Character Encoding`** : 就是一套自然语言的字符与二进制数之间的对应规则。

  编码表:生活中文字和计算机中二进制的对应规则

#### 字符集

- **字符集 `Charset`**：也叫编码表。是一个系统支持的所有字符的集合，包括各国家文字、标点符号、图形符号、数字等。

计算机要准确的存储和识别各种字符集符号，需要进行字符编码，一套字符集必然至少有一套字符编码。常见字符集有ASCII字符集、GBK字符集、Unicode字符集等。

![EIZdL4.jpg](https://s2.ax1x.com/2019/05/14/EIZdL4.jpg)

可见，当指定了**编码**，它所对应的**字符集**自然就指定了，所以**编码**才是我们最终要关心的。

- **ASCII字符集** ：
  - ASCII（American Standard Code for Information Interchange，美国信息交换标准代码）是基于拉丁字母的一套电脑编码系统，用于显示现代英语，主要包括控制字符（回车键、退格、换行键等）和可显示字符（英文大小写字符、阿拉伯数字和西文符号）。
  - 基本的ASCII字符集，使用7位（bits）表示一个字符，共128字符。ASCII的扩展字符集使用8位（bits）表示一个字符，共256字符，方便支持欧洲常用字符。
- **ISO-8859-1字符集**：
  - 拉丁码表，别名Latin-1，用于显示欧洲使用的语言，包括荷兰、丹麦、德语、意大利语、西班牙语等。
  - ISO-8859-1使用单字节编码，兼容ASCII编码。
- **GBxxx字符集**：
  - GB就是国标的意思，是为了显示中文而设计的一套字符集。
  - **GB2312**：简体中文码表。一个小于127的字符的意义与原来相同。但两个大于127的字符连在一起时，就表示一个汉字，这样大约可以组合了包含7000多个简体汉字，此外数学符号、罗马希腊的字母、日文的假名们都编进去了，连在ASCII里本来就有的数字、标点、字母都统统重新编了两个字节长的编码，这就是常说的"全角"字符，而原来在127号以下的那些就叫"半角"字符了。
  - **GBK**：最常用的中文码表。是在GB2312标准基础上的扩展规范，使用了双字节编码方案，共收录了21003个汉字，完全兼容GB2312标准，同时支持繁体汉字以及日韩汉字等。
  - **GB18030**：最新的中文码表。收录汉字70244个，采用多字节编码，每个字可以由1个、2个或4个字节组成。支持中国国内少数民族的文字，同时支持繁体汉字以及日韩汉字等。
- **Unicode字符集** ：
  - Unicode编码系统为表达任意语言的任意字符而设计，是业界的一种标准，也称为统一码、标准万国码。
  - 它最多使用4个字节的数字来表达每个字母、符号，或者文字。有三种编码方案，UTF-8、UTF-16和UTF-32。最为常用的UTF-8编码。
  - UTF-8编码，可以用来表示Unicode标准中任何字符，它是电子邮件、网页及其他存储或传送文字的应用中，优先采用的编码。互联网工程工作小组（IETF）要求所有互联网协议都必须支持UTF-8编码。所以，我们开发Web应用，也要使用UTF-8编码。它使用一至四个字节为每个字符编码，编码规则：
    1. 128个US-ASCII字符，只需一个字节编码。
    2. 拉丁文等字符，需要二个字节编码。 
    3. 大部分常用字（含中文），使用三个字节编码。
    4. 其他极少使用的Unicode辅助字符，使用四字节编码。

### 编码引出的问题

在IDEA中，使用`FileReader` 读取项目中的文本文件。由于IDEA的设置，都是默认的`UTF-8`编码，所以没有任何问题。但是，当读取Windows系统中创建的文本文件时，由于Windows系统的默认是GBK编码，就会出现乱码。

```java
public class ReaderDemo {
    public static void main(String[] args) throws IOException {
        FileReader fileReader = new FileReader("E:\\File_GBK.txt");
        int read;
        while ((read = fileReader.read()) != -1) {
            System.out.print((char)read);
        }
        fileReader.close();
    }
}
输出结果：
���
```

那么如何读取GBK编码的文件呢？ 

### 转换流理解图解

**转换流是字节与字符间的桥梁！**![EIZayF.jpg](https://s2.ax1x.com/2019/05/14/EIZayF.jpg)

### InputStreamReader类  

转换流`java.io.InputStreamReader`，是Reader的子类，是从字节流到字符流的桥梁。它读取字节，并使用指定的字符集将其解码为字符。它的字符集可以由名称指定，也可以接受平台的默认字符集。 

#### 构造方法

- `InputStreamReader(InputStream in)`: 创建一个使用默认字符集的字符流。 
- `InputStreamReader(InputStream in, String charsetName)`: 创建一个指定字符集的字符流。

构造举例，代码如下： 

```java
InputStreamReader isr = new InputStreamReader(new FileInputStream("in.txt"));
InputStreamReader isr2 = new InputStreamReader(new FileInputStream("in.txt") , "GBK");
```

#### 指定编码读取

```java
public class ReaderDemo2 {
    public static void main(String[] args) throws IOException {
      	// 定义文件路径,文件为gbk编码
        String FileName = "E:\\file_gbk.txt";
      	// 创建流对象,默认UTF8编码
        InputStreamReader isr = new InputStreamReader(new FileInputStream(FileName));
      	// 创建流对象,指定GBK编码
        InputStreamReader isr2 = new InputStreamReader(new FileInputStream(FileName) , "GBK");
		// 定义变量,保存字符
        int read;
      	// 使用默认编码字符流读取,乱码
        while ((read = isr.read()) != -1) {
            System.out.print((char)read); // ��Һ�
        }
        isr.close();
      
      	// 使用指定编码字符流读取,正常解析
        while ((read = isr2.read()) != -1) {
            System.out.print((char)read);// 大家好
        }
        isr2.close();
    }
}
```

### OutputStreamWriter类

转换流`java.io.OutputStreamWriter` ，是Writer的子类，是从字符流到字节流的桥梁。使用指定的字符集将字符编码为字节。它的字符集可以由名称指定，也可以接受平台的默认字符集。 

#### 构造方法

- `OutputStreamWriter(OutputStream in)`: 创建一个使用默认字符集的字符流。 
- `OutputStreamWriter(OutputStream in, String charsetName)`: 创建一个指定字符集的字符流。

构造举例，代码如下： 

```java
OutputStreamWriter isr = new OutputStreamWriter(new FileOutputStream("out.txt"));
OutputStreamWriter isr2 = new OutputStreamWriter(new FileOutputStream("out.txt") , "GBK");
```

#### 指定编码写出

```java
public class OutputDemo {
    public static void main(String[] args) throws IOException {
      	// 定义文件路径
        String FileName = "E:\\out.txt";
      	// 创建流对象,默认UTF8编码
        OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream(FileName));
        // 写出数据
      	osw.write("你好"); // 保存为6个字节
        osw.close();
      	
		// 定义文件路径
		String FileName2 = "E:\\out2.txt";
     	// 创建流对象,指定GBK编码
        OutputStreamWriter osw2 = new OutputStreamWriter(new FileOutputStream(FileName2),"GBK");
        // 写出数据
      	osw2.write("你好");// 保存为4个字节
        osw2.close();
    }
}
```

### 练习：转换文件编码

将GBK编码的文本文件，转换为UTF-8编码的文本文件。

案例分析

1. 指定GBK编码的转换流，读取文本文件。
2. 使用UTF-8编码的转换流，写出文本文件。

案例实现

```java
public class TransDemo {
   public static void main(String[] args) {      
    	// 1.定义文件路径
     	String srcFile = "file_gbk.txt";
        String destFile = "file_utf8.txt";
		// 2.创建流对象
    	// 2.1 转换输入流,指定GBK编码
        InputStreamReader isr = new InputStreamReader(new FileInputStream(srcFile) , "GBK");
    	// 2.2 转换输出流,默认utf8编码
        OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream(destFile));
		// 3.读写数据
    	// 3.1 定义数组
        char[] cbuf = new char[1024];
    	// 3.2 定义长度
        int len;
    	// 3.3 循环读取
        while ((len = isr.read(cbuf))!=-1) {
            // 循环写出
          	osw.write(cbuf,0,len);
        }
    	// 4.释放资源
        osw.close();
        isr.close();
  	}
}
```

## 序列化

### 概述

Java 提供了一种对象**序列化**的机制。用一个字节序列可以表示一个对象，该字节序列包含该`对象的数据`、`对象的类型`和`对象中存储的属性`等信息。字节序列写出到文件之后，相当于文件中**持久保存**了一个对象的信息。 

反之，该字节序列还可以从文件中读取回来，重构对象，对它进行**反序列化**。`对象的数据`、`对象的类型`和`对象中存储的数据`信息，都可以用来在内存中创建对象。看图理解序列化： ![EIZUQU.jpg](https://s2.ax1x.com/2019/05/14/EIZUQU.jpg)

### ObjectOutputStream类

`java.io.ObjectOutputStream ` 类，将Java对象的原始数据类型写出到文件,实现对象的持久存储。

#### 构造方法

- `public ObjectOutputStream(OutputStream out) `： 创建一个指定OutputStream的ObjectOutputStream。

构造举例，代码如下：  

```java
FileOutputStream fileOut = new FileOutputStream("employee.txt");
ObjectOutputStream out = new ObjectOutputStream(fileOut);
```

#### 序列化操作

1. 一个对象要想序列化，必须满足两个条件:

- 该类必须实现`java.io.Serializable ` 接口，`Serializable` 是一个标记接口，不实现此接口的类将不会使任何状态序列化或反序列化，会抛出`NotSerializableException` 。
- 该类的所有属性必须是可序列化的。如果有一个属性不需要可序列化的，则该属性必须注明是瞬态的，使用`transient` 关键字修饰。

```java
public class Employee implements java.io.Serializable {
    public String name;
    public String address;
    public transient int age; // transient瞬态修饰成员,不会被序列化
    public void addressCheck() {
      	System.out.println("Address  check : " + name + " -- " + address);
    }
}
```

2.写出对象方法

- `public final void writeObject (Object obj)` : 将指定的对象写出。

```java
public class SerializeDemo{
   	public static void main(String [] args)   {
    	Employee e = new Employee();
    	e.name = "zhangsan";
    	e.address = "beiqinglu";
    	e.age = 20; 
    	try {
      		// 创建序列化流对象
          ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream("employee.txt"));
        	// 写出对象
        	out.writeObject(e);
        	// 释放资源
        	out.close();
        	fileOut.close();
        	System.out.println("Serialized data is saved"); // 姓名，地址被序列化，年龄没有被序列化。
        } catch(IOException i)   {
            i.printStackTrace();
        }
   	}
}
输出结果：
Serialized data is saved
```

#### static和transient关键字

* static关键字：静态关键字

静态优先于非静态加载到内存中(静态优先于对象进入到内存中)

被static修饰的成员变量不能被序列化的，序列化的都是对象
~~~java
// Person类中将age定义为static成员变量
private static int age;

oos.writeObject(new Person("小美女",18));
Object o = ois.readObject();

//序列化的结构：Person{name='小美女', age=0}
~~~
* transient关键字：瞬态关键字

被transient修饰成员变量，不能被序列化
~~~java
private transient int age;

oos.writeObject(new Person("小美女",18));
Object o = ois.readObject();

//序列化的结果：Person{name='小美女', age=0}
~~~
### ObjectInputStream类

ObjectInputStream反序列化流，将之前使用ObjectOutputStream序列化的原始数据恢复为对象。 

#### 构造方法

- `public ObjectInputStream(InputStream in) `： 创建一个指定InputStream的ObjectInputStream。

#### 反序列化操作1

如果能找到一个对象的class文件，我们可以进行反序列化操作，调用`ObjectInputStream`读取对象的方法：

- `public final Object readObject ()` : 读取一个对象。

```java
public class DeserializeDemo {
   public static void main(String [] args)   {
        Employee e = null;
        try {		
             // 创建反序列化流
             FileInputStream fileIn = new FileInputStream("employee.txt");
             ObjectInputStream in = new ObjectInputStream(fileIn);
             // 读取一个对象
             e = (Employee) in.readObject();
             // 释放资源
             in.close();
             fileIn.close();
        }catch(IOException i) {
             // 捕获其他异常
             i.printStackTrace();
             return;
        }catch(ClassNotFoundException c)  {
        	// 捕获类找不到异常
             System.out.println("Employee class not found");
             c.printStackTrace();
             return;
        }
        // 无异常,直接打印输出
        System.out.println("Name: " + e.name);	// zhangsan
        System.out.println("Address: " + e.address); // beiqinglu
        System.out.println("age: " + e.age); // 0
    }
}
```

对于JVM可以反序列化对象，它必须是能够找到class文件的类。如果找不到该类的class文件，则抛出一个 `ClassNotFoundException` 异常。

#### **反序列化操作2**

另外，当JVM反序列化对象时，能找到class文件，但是class文件在序列化对象之后发生了修改，那么反序列化操作也会失败，抛出一个`InvalidClassException`异常。发生这个异常的原因如下：

- 该类的序列版本号与从流中读取的类描述符的版本号不匹配 

- 该类包含未知数据类型 

- 该类没有可访问的无参数构造方法 

  > 总而言之可以理解为，序列化出对象后，对象的类做了修改，编译后的class文件也被修改了，拿之前序列化的文件不能再反序列化回去了。

`Serializable` 接口给需要序列化的类，提供了一个序列版本号（就像数字签名）。`serialVersionUID` 该版本号的目的在于验证序列化的对象和对应类是否版本匹配，值是由实现Serializable接口的类的内容计算来的。

解决方法：手动指定serialVersionUID的值，这样就算之后类改变了，也可以反序列化成功。必须是static final long serialVersionUID，建议private。

```java
public class Employee implements java.io.Serializable {
     // 加入序列版本号
     private static final long serialVersionUID = 1L;
     public String name;
     public String address;
     // 添加新的属性 ,重新编译, 可以反序列化,该属性赋为默认值.
     public int eid; 

     public void addressCheck() {
         System.out.println("Address  check : " + name + " -- " + address);
     }
}
```

### 练习：序列化集合

1. 将存有多个自定义对象的集合序列化操作，保存到`list.txt`文件中。
2. 反序列化`list.txt` ，并遍历集合，打印对象信息。

案例分析

1. 把若干学生对象 ，保存到集合中。
2. 把集合序列化。
3. 反序列化读取时，只需要读取一次，转换为集合类型。
4. 遍历集合，可以打印所有的学生信息

案例实现

```java
public class SerTest {
	public static void main(String[] args) throws Exception {
		// 创建 学生对象
		Student student = new Student("老王", "laow");
		Student student2 = new Student("老张", "laoz");
		Student student3 = new Student("老李", "laol");

		ArrayList<Student> arrayList = new ArrayList<>();
		arrayList.add(student);
		arrayList.add(student2);
		arrayList.add(student3);
		// 序列化操作
		// serializ(arrayList);
		
		// 反序列化  
		ObjectInputStream ois  = new ObjectInputStream(new FileInputStream("list.txt"));
		// 读取对象,强转为ArrayList类型
		ArrayList<Student> list  = (ArrayList<Student>)ois.readObject();
		
      	for (int i = 0; i < list.size(); i++ ){
          	Student s = list.get(i);
        	System.out.println(s.getName()+"--"+ s.getPwd());
      	}
	}

	private static void serializ(ArrayList<Student> arrayList) throws Exception {
		// 创建 序列化流 
		ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("list.txt"));
		// 写出对象
		oos.writeObject(arrayList);
		// 释放资源
		oos.close();
	}
}
```

## 打印流

### 概述

平时我们在控制台打印输出，是调用`print`方法和`println`方法完成的，这两个方法都来自于`java.io.PrintStream`类，继承自`java.io.OutputStream`该类能够方便地打印各种数据类型的值，是一种便捷的输出方式。

### PrintStream类

#### 构造方法

构造方法参数指定了打印流的输出流向

- `public PrintStream(String fileName)  `： 使用指定的文件名创建一个新的打印流。
- `public PrintStream(File file)`：创建一个新的打印流，输出的目的地是一个文件
- `public PrintStream(OutputStream out)`：创建一个新的打印流，输出的目的地是一个字节输出流

构造举例，代码如下：  

```java
PrintStream ps = new PrintStream("ps.txt")；
```

#### 常用方法:

继承OutputStream的方法，和之前的流都一样。特有方法print、println

注意:

如果使用继承自父类的write方法写数据,那么查看数据的时候会查询编码表 97->a

如果使用自己特有的方法print/println方法写数据,写的数据原样输出 97->97

~~~java
public class Demo01PrintStream {
    public static void main(String[] args) throws FileNotFoundException {
        //System.out.println("HelloWorld");

        //创建打印流PrintStream对象,构造方法中绑定要输出的目的地
        PrintStream ps = new PrintStream("print.txt");
        //如果使用继承自父类的write方法写数据,那么查看数据的时候会查询编码表 97->a
        ps.write(97);
        //如果使用自己特有的方法print/println方法写数据,写的数据原样输出 97->97
        ps.println(97);
        ps.println(8.8);
        ps.println('a');
        ps.println("HelloWorld");
        ps.println(true);

        //释放资源
        ps.close();
    }
}

--print.txt文件中内容：--
a
97
8.8
a
HelloWorld
true
~~~

#### 改变输出语句的打印流向

`System.out`就是`PrintStream`类型的，只不过它的流向是系统规定的，打印在控制台上。不过，既然是流对象，我们就可以玩一个"小把戏"，改变它的流向。

```java
/*
    可以改变输出语句的目的地(打印流的流向)
    输出语句,默认在控制台输出
    使用System.setOut方法改变输出语句的目的地改为参数中传递的打印流的目的地
        static void setOut(PrintStream out)
          重新分配“标准”输出流。
 */
public class Demo02PrintStream {
    public static void main(String[] args) throws FileNotFoundException {
        System.out.println("我是在控制台输出"); // 打印在控制台

        PrintStream ps = new PrintStream("aaa.txt");
        System.setOut(ps); // 把输出语句的目的地改变为打印流的目的地
        System.out.println("我在打印流的目的地中输出"); // 打印到aaa.txt文件中

        ps.close();
    }
}
```

# 网络编程

## 网络编程入门

### 软件结构

- **C/S结构** ：全称为Client/Server结构，是指客户端和服务器结构。常见程序有ＱＱ、迅雷等软件。

* **B/S结构** ：全称为Browser/Server结构，是指浏览器和服务器结构。常见浏览器有谷歌、火狐等。

两种架构各有优势，但是无论哪种架构，都离不开网络的支持。**网络编程**，就是在一定的协议下，实现两台计算机的通信的程序。

### 网络通信协议

* **网络通信协议：**通过计算机网络可以使多台计算机实现连接，位于同一个网络中的计算机在进行连接和通信时需要遵守一定的规则，这就好比在道路中行驶的汽车一定要遵守交通规则一样。在计算机网络中，这些连接和通信的规则被称为网络通信协议，它对数据的传输格式、传输速率、传输步骤等做了统一规定，通信双方必须同时遵守才能完成数据交换。


* **TCP/IP协议：** 传输控制协议/因特网互联协议( Transmission Control Protocol/Internet Protocol)，是Internet最基本、最广泛的协议。它定义了计算机如何连入因特网，以及数据如何在它们之间传输的标准。它的内部包含一系列的用于处理数据通信的协议，并采用了4层的分层模型，每一层都呼叫它的下一层所提供的协议来完成自己的需求。

![](https://s2.ax1x.com/2019/05/14/EIB25R.png)

上图中，TCP/IP协议中的四层分别是应用层、传输层、网络层和链路层，每层分别负责不同的通信功能。
链路层：链路层是用于定义物理传输通道，通常是对某些网络连接设备的驱动协议，例如针对光纤、网线提供的驱动。
网络层：网络层是整个TCP/IP协议的核心，它主要用于将传输的数据进行分组，将分组数据发送到目标计算机或者网络。
运输层：主要使网络程序进行通信，在进行网络通信时，可以采用TCP协议，也可以采用UDP协议。
应用层：主要负责应用程序的协议，例如HTTP协议、FTP协议等。

### 协议分类

通信的协议还是比较复杂的，`java.net` 包中包含的类和接口，它们提供低层次的通信细节。我们可以直接使用这些类和接口，来专注于网络程序开发，而不用考虑通信的细节。

`java.net` 包中提供了两种常见的网络协议的支持：

- **UDP**：用户数据报协议(User Datagram Protocol)。UDP是无连接通信协议，即在数据传输时，数据的发送端和接收端不建立逻辑连接。简单来说，当一台计算机向另外一台计算机发送数据时，发送端不会确认接收端是否存在，就会发出数据，同样接收端在收到数据时，也不会向发送端反馈是否收到数据。

  由于使用UDP协议消耗资源小，通信效率高，所以通常都会用于音频、视频和普通数据的传输例如视频会议都使用UDP协议，因为这种情况即使偶尔丢失一两个数据包，也不会对接收结果产生太大影响。

  但是在使用UDP协议传送数据时，由于UDP的面向无连接性，不能保证数据的完整性，因此在传输重要数据时不建议使用UDP协议。UDP的交换过程如下图所示。

![UDP通信图解](https://s2.ax1x.com/2019/05/14/EIBf8x.png)

特点:数据被限制在64kb以内，超出这个范围就不能发送了。

数据报(Datagram):网络传输的基本单位 

- **TCP**：传输控制协议 (Transmission Control Protocol)。TCP协议是**面向连接**的通信协议，即传输数据之前，在发送端和接收端建立逻辑连接，然后再传输数据，它提供了两台计算机之间可靠无差错的数据传输。

  在TCP连接中必须要明确客户端与服务器端，由客户端向服务端发出连接请求，每次连接的创建都需要经过“三次握手”。

  - 三次握手：TCP协议中，在发送数据的准备阶段，客户端与服务器之间的三次交互，以保证连接的可靠。
    - 第一次握手，客户端向服务器端发出连接请求，等待服务器确认。
    - 第二次握手，服务器端向客户端回送一个响应，通知客户端收到了连接请求。
    - 第三次握手，客户端再次向服务器端发送确认信息，确认连接。整个交互过程如下图所示。

![](https://s2.ax1x.com/2019/05/14/EIB4xK.jpg)

    完成三次握手，连接建立后，客户端和服务器就可以开始进行数据传输了。由于这种面向连接的特性，TCP协议可以保证传输数据的安全，所以应用十分广泛，例如下载文件、浏览网页等。

### 网络编程三要素

#### 协议

* **协议：**计算机网络通信必须遵守的规则，已经介绍过了，不再赘述。

#### IP地址

* **IP地址：指互联网协议地址（Internet Protocol Address）**，俗称IP。IP地址用来给一个网络中的计算机设备做唯一的编号。假如我们把“个人电脑”比作“一台电话”的话，那么“IP地址”就相当于“电话号码”。

**IP地址分类**

* IPv4：是一个32位的二进制数，通常被分为4个字节，表示成`a.b.c.d` 的形式，例如`192.168.65.100` 。其中a、b、c、d都是0~255之间的十进制整数，那么最多可以表示42亿个。

* IPv6：由于互联网的蓬勃发展，IP地址的需求量愈来愈大，但是网络地址资源有限，使得IP的分配越发紧张。

  为了扩大地址空间，拟通过IPv6重新定义地址空间，采用128位地址长度，每16个字节一组，分成8组十六进制数，表示成`ABCD:EF01:2345:6789:ABCD:EF01:2345:6789`，号称可以为全世界的每一粒沙子编上一个网址，这样就解决了网络地址资源数量不够的问题。

**常用命令**

* 查看本机IP地址，在控制台输入：

```java
ipconfig
```

* 检查网络是否连通，在控制台输入：

```java
ping 空格 IP地址
ping 220.181.57.216
```

**特殊的IP地址**

* 本机IP地址：`127.0.0.1`、`localhost` 。

#### 端口号

网络的通信，本质上是两个进程（应用程序）的通信。每台计算机都有很多的进程，那么在网络通信时，如何区分这些进程呢？

如果说**IP地址**可以唯一标识网络中的设备，那么**端口号**就可以唯一标识设备中的进程（应用程序）了。

* **端口号：用两个字节表示的整数，它的取值范围是0~65535**。其中，0~1023之间的端口号用于一些知名的网络服务和应用，普通的应用程序需要使用1024以上的端口号。如果端口号被另外一个服务或应用所占用，会导致当前程序启动失败。

利用`协议`+`IP地址`+`端口号` 三元组合，就可以标识网络中的进程了，那么进程间的通信就可以利用这个标识与其它进程进行交互。

## TCP通信程序

### 概述

TCP通信能实现两台计算机之间的数据交互，通信的两端，要严格区分为客户端（Client）与服务端（Server）。

**两端通信时步骤：**

1. 服务端程序，需要事先启动，等待客户端的连接。
2. 客户端主动连接服务器端，连接成功才能通信。服务端不可以主动连接客户端。

**在Java中，提供了两个类用于实现TCP通信程序：**

1. 客户端：`java.net.Socket` 类表示。创建`Socket`对象，向服务端发出连接请求，服务端响应请求，两者建立连接开始通信。
2. 服务端：`java.net.ServerSocket` 类表示。创建`ServerSocket`对象，相当于开启一个服务，并等待客户端的连接。

### Socket类  

`Socket` 类：该类实现客户端套接字，套接字指的是两台设备之间通讯的端点。

#### 构造方法

* `public Socket(String host, int port)` :创建套接字对象并将其连接到指定主机上的指定端口号。如果指定的host是null ，则相当于指定地址为回送地址。  

  > 小贴士：回送地址(127.x.x.x) 是本机回送地址（Loopback Address），主要用于网络软件测试以及本地机进程间通信，无论什么程序，一旦使用回送地址发送数据，立即返回，不进行任何网络传输。

构造举例，代码如下：

```java
Socket client = new Socket("127.0.0.1", 6666);
```

#### 成员方法

* `public InputStream getInputStream()` ： 返回此套接字的输入流。
  * 如果此Scoket具有相关联的通道，则生成的InputStream 的所有操作也关联该通道。
  * 关闭生成的InputStream也将关闭相关的Socket。
  
* `public OutputStream getOutputStream()` ： 返回此套接字的输出流。
  
  * 如果此Scoket具有相关联的通道，则生成的OutputStream 的所有操作也关联该通道。
  * 关闭生成的OutputStream也将关闭相关的Socket。
  
* `public void close()` ：关闭此套接字。
  
  * 一旦一个socket被关闭，它不可再使用。
  * 关闭此socket也将关闭相关的InputStream和OutputStream 。 
  
* `public void shutdownOutput()` ： 禁用此套接字的输出流。   
  * 对于 TCP 套接字，任何以前写入的数据都将被发送，并且后跟 TCP 的正常连接终止序列。
  


### ServerSocket类

`ServerSocket`类：这个类实现了服务器套接字，该对象等待通过网络的请求。

#### 构造方法

* `public ServerSocket(int port)` ：使用该构造方法在创建ServerSocket对象时，就可以将其绑定到一个指定的端口号上，参数port就是端口号。

构造举例，代码如下：

```java
ServerSocket server = new ServerSocket(6666);
```

#### 成员方法

* `public Socket accept()` ：侦听并接受连接，返回一个新的Socket对象，用于和客户端实现通信。该方法会一直阻塞直到建立连接。 

  > 调用accept服务器端进入监听状态，等有客户端链接后，就得到一个客户端的Socket对象，通过这个对象再获取流，就可以明确和哪个客户端建立连接了


### 简单的TCP网络程序

#### TCP通信分析图解

1. 【服务端】启动,创建ServerSocket对象，指定端口，等待连接。
2. 【客户端】启动,创建Socket对象，请求连接。
3. 【服务端】接收连接,调用accept方法，并返回一个Socket对象。
4. 【客户端】Socket对象，获取OutputStream，向服务端写出数据。
5. 【服务端】Scoket对象，获取InputStream，读取客户端发送的数据。

> 到此，客户端向服务端发送数据成功。

![](https://s2.ax1x.com/2019/05/14/EIDCZQ.md.jpg)

> 自此，服务端向客户端回写数据。

6. 【服务端】Socket对象，获取OutputStream，向客户端回写数据。
7. 【客户端】Scoket对象，获取InputStream，解析回写数据。
8. 【客户端】释放资源，断开连接。

![EI6ZtJ.png](https://s2.ax1x.com/2019/05/14/EI6ZtJ.png)

### 客户端向服务器发送数据

**服务端实现：**

```java
public class ServerTCP {
    public static void main(String[] args) throws IOException {
        System.out.println("服务端启动 , 等待连接 .... ");
        // 1.创建 ServerSocket对象，绑定端口，开始等待连接
        ServerSocket ss = new ServerSocket(6666);
        // 2.接收连接 accept 方法, 返回 socket 对象.
        Socket server = ss.accept();
        // 3.通过socket 获取输入流
        InputStream is = server.getInputStream();
        // 4.一次性读取数据
      	// 4.1 创建字节数组
        byte[] b = new byte[1024];
      	// 4.2 据读取到字节数组中.
        int len = is.read(b)；
        // 4.3 解析数组,打印字符串信息
        String msg = new String(b, 0, len);
        System.out.println(msg);
        //5.关闭资源.
        is.close();
        server.close();
    }
}
```

**客户端实现：**

```java
public class ClientTCP {
	public static void main(String[] args) throws Exception {
		System.out.println("客户端 发送数据");
		// 1.创建 Socket ( ip , port ) , 确定连接到哪里.
		Socket client = new Socket("localhost", 6666);
		// 2.获取流对象 . 输出流
		OutputStream os = client.getOutputStream();
		// 3.写出数据.
		os.write("你好么? tcp ,我来了".getBytes());
		// 4. 关闭资源 .
		os.close();
		client.close();
	}
}
```

### 服务器向客户端回写数据

**服务端实现：**

```java
public class ServerTCP {
    public static void main(String[] args) throws IOException {
        System.out.println("服务端启动 , 等待连接 .... ");
        // 1.创建 ServerSocket对象，绑定端口，开始等待连接
        ServerSocket ss = new ServerSocket(6666);
        // 2.接收连接 accept 方法, 返回 socket 对象.
        Socket server = ss.accept();
        // 3.通过socket 获取输入流
        InputStream is = server.getInputStream();
        // 4.一次性读取数据
      	// 4.1 创建字节数组
        byte[] b = new byte[1024];
      	// 4.2 据读取到字节数组中.
        int len = is.read(b)；
        // 4.3 解析数组,打印字符串信息
        String msg = new String(b, 0, len);
        System.out.println(msg);
      	// =================回写数据=======================
      	// 5. 通过 socket 获取输出流
      	 OutputStream out = server.getOutputStream();
      	// 6. 回写数据
      	 out.write("我很好,谢谢你".getBytes());
      	// 7.关闭资源.
      	out.close();
        is.close();
        server.close();
    }
}
```

**客户端实现：**

```java
public class ClientTCP {
	public static void main(String[] args) throws Exception {
		System.out.println("客户端 发送数据");
		// 1.创建 Socket ( ip , port ) , 确定连接到哪里.
		Socket client = new Socket("localhost", 6666);
		// 2.通过Scoket,获取输出流对象 
		OutputStream os = client.getOutputStream();
		// 3.写出数据.
		os.write("你好么? tcp ,我来了".getBytes());
      	// ==============解析回写=========================
      	// 4. 通过Scoket,获取 输入流对象
      	InputStream in = client.getInputStream();
      	// 5. 读取数据数据
      	byte[] b = new byte[100];
      	int len = in.read(b);
      	System.out.println(new String(b, 0, len));
		// 6. 关闭资源 .
      	in.close();
		os.close();
		client.close();
	}
}
```

## 综合案例

### 文件上传案例

#### 文件上传分析图解

1. 【客户端】输入流，从硬盘读取文件数据到程序中。
2. 【客户端】输出流，写出文件数据到服务端。
3. 【服务端】输入流，读取文件数据到服务端程序。
4. 【服务端】输出流，写出文件数据到服务器硬盘中。

![EI6vDK.png](https://s2.ax1x.com/2019/05/14/EI6vDK.png)

![](https://s2.ax1x.com/2019/05/14/EI6sAg.jpg)    

#### 基本实现

**服务端实现：**

```java
public class FileUpload_Server {
    public static void main(String[] args) throws IOException {
        System.out.println("服务器 启动.....  ");
        // 1. 创建服务端ServerSocket
      	ServerSocket serverSocket = new ServerSocket(6666);
  		// 2. 建立连接 
        Socket accept = serverSocket.accept();
      	// 3. 创建流对象
      	// 3.1 获取输入流,读取文件数据
        BufferedInputStream bis = new BufferedInputStream(accept.getInputStream());
        // 3.2 创建输出流,保存到本地 .
        BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream("copy.jpg"));
		// 4. 读写数据
        byte[] b = new byte[1024 * 8];
        int len;
        while ((len = bis.read(b)) != -1) {
            bos.write(b, 0, len);
        }
        //5. 关闭 资源
        bos.close();
        bis.close();
        accept.close();
        System.out.println("文件上传已保存");
    }
}
```

**客户端实现：**

```java
public class FileUPload_Client {
	public static void main(String[] args) throws IOException {
        // 1.创建流对象
        // 1.1 创建输入流,读取本地文件  
        BufferedInputStream bis  = new BufferedInputStream(new FileInputStream("test.jpg"));
        // 1.2 创建输出流,写到服务端 
        Socket socket = new Socket("localhost", 6666);
        BufferedOutputStream   bos   = new BufferedOutputStream(socket.getOutputStream());

        //2.写出数据. 
        byte[] b  = new byte[1024 * 8 ];
        int len ; 
        while (( len  = bis.read(b))!=-1) {
            bos.write(b, 0, len);
        }
        System.out.println("文件发送完毕");
        // 3.释放资源

        bos.close(); 
        socket.close();
        bis.close(); 
        System.out.println("文件上传完毕 ");
	}
}
```

#### 阻塞问题

以上代码运行后发现没有客户端和服务器端程序都没有停止。查阅API，inputStream的read方法这样写道：在输入数据可用、检测到流末尾或者抛出异常前，此方法一直阻塞。这是因为read方法没有读到文件的结束标记，read方法处于阻塞状态。

![EIgtyt.png](https://s2.ax1x.com/2019/05/14/EIgtyt.png)

如上图，阻塞的read只有一个，服务器端的read，因为客户端没有将结束标记写进服务器。

解决方法：Socket类中的shutdownOutput()方法

* `public void shutdownOutput()` ： 禁用此套接字的输出流。   
  * 对于 TCP 套接字，任何以前写入的数据都将被发送，并且后跟 TCP 的正常连接终止序列。

在客户端向服务器端写入文件结束后（while循环结束后），调用该方法。

### 文件上传优化分析

1. **文件名称写死的问题**

   服务端，保存文件的名称如果写死，那么最终导致服务器硬盘，只会保留一个文件，建议使用系统时间优化，保证文件名称唯一，代码如下：

```java
FileOutputStream fis = new FileOutputStream(System.currentTimeMillis()+".jpg") // 文件名称
BufferedOutputStream bos = new BufferedOutputStream(fis);
```

2. **循环接收的问题**

   服务端，指保存一个文件就关闭了，之后的用户无法再上传，这是不符合实际的，使用循环改进，可以不断的接收不同用户的文件，代码如下：

```java
// 每次接收新的连接,创建一个Socket
while（true）{
    Socket accept = serverSocket.accept();
    ......
}
```

3. **效率问题**

   服务端，在接收大文件时，可能耗费几秒钟的时间，此时不能接收其他用户上传，所以，使用多线程技术优化，代码如下：

```java
while（true）{
    Socket accept = serverSocket.accept();
    // accept 交给子线程处理.
    new Thread(() -> {
      	......
        InputStream bis = accept.getInputStream();
      	......
    }).start();
}
```

#### 优化实现

```java
public class FileUpload_Server {
    public static void main(String[] args) throws IOException {
        System.out.println("服务器 启动.....  ");
        // 1. 创建服务端ServerSocket
        ServerSocket serverSocket = new ServerSocket(6666);
      	// 2. 循环接收,建立连接
        while (true) {
            Socket accept = serverSocket.accept();
          	/* 
          	3. socket对象交给子线程处理,进行读写操作
               Runnable接口中,只有一个run方法,使用lambda表达式简化格式
            */
            new Thread(() -> {
                try (
                    //3.1 获取输入流对象
                    BufferedInputStream bis = new BufferedInputStream(accept.getInputStream());
                    //3.2 创建输出流对象, 保存到本地 .
                    FileOutputStream fis = new FileOutputStream(System.currentTimeMillis() + ".jpg");
                    BufferedOutputStream bos = new BufferedOutputStream(fis);) {
                    // 3.3 读写数据
                    byte[] b = new byte[1024 * 8];
                    int len;
                    while ((len = bis.read(b)) != -1) {
                      bos.write(b, 0, len);
                    }
                    //4. 关闭 资源
                    bos.close();
                    bis.close();
                    accept.close();
                    System.out.println("文件上传已保存");
                } catch (IOException e) {
                  	e.printStackTrace();
                }
            }).start();
        }
    }
}
```

### 信息回写分析图解

前四步与基本文件上传一致.

5. 【服务端】获取输出流，回写数据。
6. 【客户端】获取输入流，解析回写数据。

![](https://s2.ax1x.com/2019/05/14/EI6Rcq.jpg)

#### 回写实现

```java
public class FileUpload_Server {
    public static void main(String[] args) throws IOException {
        System.out.println("服务器 启动.....  ");
        // 1. 创建服务端ServerSocket
        ServerSocket serverSocket = new ServerSocket(6666);
        // 2. 循环接收,建立连接
        while (true) {
            Socket accept = serverSocket.accept();
          	/*
          	3. socket对象交给子线程处理,进行读写操作
               Runnable接口中,只有一个run方法,使用lambda表达式简化格式
            */
            new Thread(() -> {
                try (
                    //3.1 获取输入流对象
                    BufferedInputStream bis = new BufferedInputStream(accept.getInputStream());
                    //3.2 创建输出流对象, 保存到本地 .
                    FileOutputStream fis = new FileOutputStream(System.currentTimeMillis() + ".jpg");
                    BufferedOutputStream bos = new BufferedOutputStream(fis);
                ) {
                    // 3.3 读写数据
                    byte[] b = new byte[1024 * 8];
                    int len;
                    while ((len = bis.read(b)) != -1) {
                        bos.write(b, 0, len);
                    }

                    // 4.=======信息回写===========================
                    System.out.println("back ........");
                    OutputStream out = accept.getOutputStream();
                    out.write("上传成功".getBytes());
                    out.close();
                    //================================

                    //5. 关闭 资源
                    bos.close();
                    bis.close();
                    accept.close();
                    System.out.println("文件上传已保存");
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }).start();
        }
    }
}
```

**客户端实现：**

```java
public class FileUpload_Client {
    public static void main(String[] args) throws IOException {
        // 1.创建流对象
        // 1.1 创建输入流,读取本地文件
        BufferedInputStream bis = new BufferedInputStream(new FileInputStream("test.jpg"));
        // 1.2 创建输出流,写到服务端
        Socket socket = new Socket("localhost", 6666);
        BufferedOutputStream bos = new BufferedOutputStream(socket.getOutputStream());

        //2.写出数据.
        byte[] b  = new byte[1024 * 8 ];
        int len ;
        while (( len  = bis.read(b))!=-1) {
            bos.write(b, 0, len);
        }
      	// 关闭输出流,通知服务端,写出数据完毕
        socket.shutdownOutput();
        System.out.println("文件发送完毕");
        // 3. =====解析回写============
        InputStream in = socket.getInputStream();
        byte[] back = new byte[20];
        in.read(back);
        System.out.println(new String(back));
        in.close();
        // ============================

        // 4.释放资源
        socket.close();
        bis.close();
    }
}
```

## 模拟B\S服务器(综合案例)

模拟网站服务器，使用浏览器访问自己编写的服务端程序，查看网页效果。

### 案例分析

1. 准备页面数据，web文件夹，里面放html文件。

   复制到我们Module中，比如复制到day08中

   ![](https://s2.ax1x.com/2019/05/14/EIWnLq.png)

2. 我们模拟服务器端，ServerSocket类监听端口，使用浏览器访问

   ~~~java
   public static void main(String[] args) throws IOException {
       	ServerSocket server = new ServerSocket(8000);
       	Socket socket = server.accept();
       	InputStream in = socket.getInputStream();
      	    byte[] bytes = new byte[1024];
       	int len = in.read(bytes);
       	System.out.println(new String(bytes,0,len));
       	socket.close();
       	server.close();
   }
   ~~~

   启动服务器端代码，浏览器中输入相应url后无法访问，服务器控制台打印出收取到的信息

   ![](https://s2.ax1x.com/2019/05/14/EIWMwV.jpg)

3. 服务器程序中字节输入流可以读取到浏览器发来的请求信息，打印到了控制台上，其实就是http请求信息

   ![](https://s2.ax1x.com/2019/05/14/EIW1FU.jpg)


第一行`GET /web/index.html HTTP/1.1`是浏览器的请求消息。`/web/index.html`为浏览器想要请求的服务器端的资源，使用字符串切割方式获取到请求的资源。

~~~java
//转换流,读取浏览器请求第一行
BufferedReader readWb = new BufferedReader(new InputStreamReader(socket.getInputStream()));
String requst = readWb.readLine(); // GET /web/index.html HTTP/1.1
//取出请求资源的路径
String[] strArr = requst.split(" "); // {"GET", "/web/index.html", "HTTP/1.1"}
//去掉web前面的/
String path = strArr[1].substring(1); // web/index.html
System.out.println(path);
~~~

### 案例实现

服务端实现：

```java
public class SerDemo {
    public static void main(String[] args) throws IOException {
        System.out.println("服务端  启动 , 等待连接 .... ");
        // 创建ServerSocket 对象
        ServerSocket server = new ServerSocket(8888);
        Socket socket = server.accept();
        // 转换流读取浏览器的请求消息
        BufferedReader readWb = new
        BufferedReader(new InputStreamReader(socket.getInputStream()));
        String requst = readWb.readLine();
        // 取出请求资源的路径
        String[] strArr = requst.split(" ");
        // 去掉web前面的/
        String path = strArr[1].substring(1);
        // 读取客户端请求的资源文件
        FileInputStream fis = new FileInputStream(path);
        byte[] bytes= new byte[1024];
        int len = 0 ;
        // 字节输出流,将文件写会客户端
        OutputStream out = socket.getOutputStream();
        // 写入HTTP协议响应头,固定写法
        out.write("HTTP/1.1 200 OK\r\n".getBytes());
        out.write("Content-Type:text/html\r\n".getBytes());
        // 必须要写入空行,否则浏览器不解析
        out.write("\r\n".getBytes());
        while((len = fis.read(bytes))!=-1){
            out.write(bytes,0,len);
        }
        fis.close();
        out.close();
        readWb.close();	
        socket.close();
        server.close();
    }
}

```

### 访问效果

![](https://s2.ax1x.com/2019/05/14/EIhVrn.png)

发现浏览器中出现很多的叉子,说明浏览器没有读取到图片信息导致。

浏览器工作原理是遇到图片会开启一个线程进行单独的访问，因此在服务器端加入线程技术。

浏览器解析服务器回写的html页面，页面中如果有图片，那么浏览器就会单独的开启一个线程，读取服务器的图片

**解决办法**：让服务器一直处于监听状态，客户端请求一次，服务器就回写一次（用while死循环即可，加上线程技术更好）

~~~java
public class ServerDemo {
    public static void main(String[] args) throws IOException {
        ServerSocket server = new ServerSocket(8888);
        while(true){
            Socket socket = server.accept();
            new Thread(new Web(socket)).start();
        }
    }
    static class Web implements Runnable{
        private Socket socket;

        public Web(Socket socket){
            this.socket=socket;
        }

        public void run() {
            try{
                //转换流,读取浏览器请求第一行
                BufferedReader readWb = new
                        BufferedReader(new InputStreamReader(socket.getInputStream()));
                String requst = readWb.readLine();
                //取出请求资源的路径
                String[] strArr = requst.split(" ");
                System.out.println(Arrays.toString(strArr));
                String path = strArr[1].substring(1);
                System.out.println(path);

                FileInputStream fis = new FileInputStream(path);
                System.out.println(fis);
                byte[] bytes= new byte[1024];
                int len = 0 ;
                //向浏览器 回写数据
                OutputStream out = socket.getOutputStream();
                out.write("HTTP/1.1 200 OK\r\n".getBytes());
                out.write("Content-Type:text/html\r\n".getBytes());
                out.write("\r\n".getBytes());
                while((len = fis.read(bytes))!=-1){
                    out.write(bytes,0,len);
                }
                fis.close();
                out.close();
                readWb.close();
                socket.close();
            }catch(Exception ex){

            }
        }
    }

}
~~~

至此就可以在浏览器正常显示被访问的资源了

