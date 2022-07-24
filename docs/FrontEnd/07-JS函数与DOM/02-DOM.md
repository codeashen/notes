[TOC]

# DOM基本概念

DOM 是 JS 操控 HTML 和 CSS 的桥梁。

DOM（Document Object Model，文档对象模型）是 JavaScript 操作 HTML 文档的接口，使文档操作变得非常优雅、简便。

DOM 最大的特点就是将文档表示为节点树。

![image-20220720015436496](https://cc.hjfile.cn/cc/img/20220720/2022072001543852520255.png)

# 访问元素节点

## 认识 document 对象

所谓“访问”元素节点，就是指“得到”、“获取”页面上的元素节点。访问元素节点主要依靠document对象

- document 对象是 DOM 中最重要的东西，几乎所有 DOM 的功能都封装在了 document 对象中。
- document 对象也表示整个 HTML 文档，它是 DOM 节点树的根。
- document 对象的 nodeType 属性值是 9

![image-20220722235508342](https://cc.hjfile.cn/cc/img/20220722/2022072211551154885509.png)

## nodeType 常用属性值

节点的 nodeType 属性可以显示这个节点具体的类型。

![image-20220723002045071](https://cc.hjfile.cn/cc/img/20220723/2022072312204692310138.png)

## 访问元素节点的常用方法

![image-20220722235559255](https://cc.hjfile.cn/cc/img/20220722/202207221156017219435.png)

**(1) getElementById**

通过 id 得到元素节点。如果有相同 id 的元素，只能获取到第一个。

![image-20220723000529967](https://cc.hjfile.cn/cc/img/20220723/2022072312053190966589.png)

**(2) getElementByTagName**

通过标签名得到节点数组。任何一个节点元素也可以调用 getElementByTagName 得到其内部的节点数组。

![image-20220723000635489](https://cc.hjfile.cn/cc/img/20220723/2022072312063810184317.png)

**(3) getElementByClassName**

通过类名得到节点数组。某个节点元素也可以继续调用 getElementByClassName 方法获取内部节点数组。

  ![image-20220723000657982](https://cc.hjfile.cn/cc/img/20220723/2022072312070019815349.png)

**(4) querySelector**

通过选择器得到元素。只能得到页面上的一个元素，如果有多个元素符合条件，则只能得到第一个。

![image-20220723000724612](https://cc.hjfile.cn/cc/img/20220723/2022072312072674645677.png)

**(5) querySelectorAll**

通过选择器得到元素数组。

## 延迟运行

在测试 DOM 代码时，通常 JS 代码一定要写到 HTML 节点的后面，否则 JS 无法找到相应 HTML 节点。

可以使用 `window.onload = function(){}` 事件，使页面加载完毕后，再执行指定的代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
    <script>
        // 给 window 对象添加 onload 事件监听，onload 表示页面都建在完毕了
        window.onload = function () {
            var box1 = document.getElementById('box1');
            console.log(box1);
        }
    </script>
</head>
<body>
    <div id="box1"></div>
</body>
</html>
```

# 节点的关系

![image-20220723002306105](https://cc.hjfile.cn/cc/img/20220723/2022072312230788238111.png)

![image-20220723002323216](https://cc.hjfile.cn/cc/img/20220723/2022072312232515785478.png)

**注意：文本节点也属于节点。**

- DOM中，文本节点也属于节点，在使用节点的关系时一定要注意。
- 在标准的 W3C 规范中，空白文本节点也应该算作节点，但是在 IE8 及以前的浏览器中会有一定的兼容问题，它们不把空文本节点当做节点。

如何排除文本节点的干扰呢？从 IE9 开始支持一些**“只考虑元素节点”**的属性。

![image-20220723002943978](https://cc.hjfile.cn/cc/img/20220723/2022072312294615633362.png)

> 思考：如果要兼容到 IE6，即不能使用右边只考虑元素节点的属性，如何实现只获得元素节点的功能呢？
>
> 可以自己封装函数，使用左边的属性，结合 `nodeType == 1` 是否成立，即是否为元素节点，从而实现功能。
>
> ```javascript
> // 示例：IE6 环境实现 children 属性功能的函数
> function getChildren(node) {
>     var children = [];
>     for (var i = 0; i < node.childrens.length; i++) {
>         if (node.childrens[i].nodeType == 1) {
>             children.push(node.childrens[i]);
>         }
>     }
>     return children[];
> }
> ```

# 节点的操作

## 改变元素节点的内容

改变元素节点中的内容可以使用两个相关属性：① innerHTML，② innerText

- innerHTML 属性能以 HTML 语法设置节点中的内容
- innerText 属性只能以纯文本的形式设置节点中的内容

```javascript
var box1 = document.getElementById('box1');
box1.innerHTML = '<a href="www.baidu.com">百度一下</a>';

var box2 = document.getElementById('box2');
box2.innerText = '我是一段文本';
```

## 改变元素节点的 CSS 样式

改变元素节点的 CSS 样式需要使用这样的语句：

![image-20220723005646525](https://cc.hjfile.cn/cc/img/20220723/2022072312564856444719.png)

## 改变元素节点的 HTML 属性

标准 W3C 属性，如 src、href 等等，只需要直接打点进行更改即可：

![image-20220723005754506](https://cc.hjfile.cn/cc/img/20220723/2022072312575648742931.png)

不符合 W3C 标准的属性，要使用 setAttribute() 和 getAttribute() 来设置、读取：

![image-20220723005851374](https://cc.hjfile.cn/cc/img/20220723/2022072312585504498011.png)

# 节点的创建、移除和克隆

## 创建节点

`document.createElement()` 方法用于创建一个指定 tagName 的 HTML 元素。

```javascript
var oDiv = document.createElement('div')
```

新创建出的节点是“孤儿节点”，这意味着它并没有被挂载到 DOM 树上，我们无法看见它。必须继续使用 `appendChild()` 或 `insertBefore()` 方法将孤儿节点插入到 DOM 树上。

任何已经在 DOM 树上的节点，都可以调用 `appendChild()` 方法，它可以将孤儿节点挂载到它的内部，成为它的最后一个子节点。

```javascript
父节点.appendChild(孤儿节点);
```

任何已经在 DOM 树上的节点，都可以调用 `insertBefore()` 方法，它可以将孤儿节点挂载到它的内部，成为它的“标杆子节点”之前的节点。

```javascript
父节点.insertBefore(孤儿节点, 标杆节点);
```

## 移动节点

如果将已经挂载到 DOM 树上的节点成为 `appendChild()` 或者 `insertBefore()` 的参数，这个**节点将会被移动**。这意味着一个节点不能同时位于 DOM 树的两个位置

```javascript
新父节点.appendChild(己经有父亲的节点);
新父节点.insertBefore(已经有父亲的节点，标杆子节点);
```

## 删除节点

`removeChild()` 方法从 DOM 中删除一个子节点。节点不能主动删除自己，必须由父节点删除它。

```javascript
父节点.removeChild(要删除子节点)；
```

## 克隆节点

`cloneNode()` 方法可以克隆节点，克隆出的节点是“孤儿节点”。

参数是一个布尔值，表示是否采用深度克隆：如果为 true，则该节点的所有后代节点也都会被克隆；如果为false，则只克隆该节点本身。

```javascript
var 孤儿节点 = 老节点.cloneNode();
var 孤儿节点 = 老节点.cloneNode(true);
```

# DOM 事件

## 事件监听

DOM 允许我们书写JavaScript代码以让 HTML 元素对事件作出反应，从而执行一些程序。

设置事件监听的方法主要有 `onxxx` 和 `addEventListener()` 两种，二者的区别将在“事件传播”小节中介绍。

```javascript
oBox.onclick = function () {
    // 点击盒子时，将执行这段代码
}
```

**常见的鼠标事件监听**

![image-20220723011600586](https://cc.hjfile.cn/cc/img/20220723/2022072301160268531199.png)

> onmouseenter 不冒泡，onmouseover 冒泡。

**常见的键盘事件监听**

![image-20220723011706418](https://cc.hjfile.cn/cc/img/20220723/2022072301170895268264.png)

**常见的表单事件监听**

![image-20220723011757184](https://cc.hjfile.cn/cc/img/20220723/202207230117591689763.png)

**常见的页面事件监听**

![image-20220723011858386](https://cc.hjfile.cn/cc/img/20220723/202207230119003289646.png)

> 更多窗口和页面的事件在 BOM 小节中介绍。

## 事件传播

如下图，三个互相嵌套的盒子都注册了点击事件，当我们点击了三个盒子的中心，此时事件监听执行的顺序是怎样的呢？这个问题就涉及到了事件传播。

![image-20220723012117490](https://cc.hjfile.cn/cc/img/20220723/202207230121193532891.png)

实际上，事件的传播是：**先从外到内，然后再从内到外**。

- 事件从外到内传播的过程叫**捕获阶段**，即外层的元素先监听到事件
- 事件从内到外传播的过程叫**冒泡阶段**，即如同冒泡一样，内层元素先监听到事件

![image-20220723012949486](https://cc.hjfile.cn/cc/img/20220723/2022072301295135413627.png)

而 `onxxx` 这样的写法**只能监听到冒泡阶段**，`addEventListener` 写法可以指定监听哪个阶段。

- DOM0 级事件监听：只能监听冒泡阶段

  ```javascript
  oBox.onclick = function () {
  };
  ```

- DOM2 级事件监听：可以指定监听的阶段

  ```javascript
  /**
   * 参数1：事件类型
   * 参数2：事件处理函数
   * 参数3：true-监听捕获阶段；false-监听冒泡阶段
   */
  oBox.addEventListener('click', function () {
      // 事件处理函数
  }, true);
  ```

注意事项：

- 嵌套元素的事件监听，先捕获后冒泡；
- 最内部元素不再区分捕获和冒泡阶段，会先执行写在前面的监听，然后执行后写的监听；
- 如果给元素设置相同的两个或多个同名事件，则 DOM0 级写法后面写的会覆盖先写的；而DOM2 级会按顺序执行。

## 事件对象

事件处理函数提供一个形式参数，它是一个对象，封装了本次事件的细节。这个参数通常用单词 event 或字母 e 来表示。

```javascript
oBox.onclick = function (e) {
    // 对象e就是这次事件的“事件对象”
};
```

事件对象内部封装了很多有用的属性，下面介绍些常用的。

### 鼠标位置相关属性

![image-20220723015243759](https://cc.hjfile.cn/cc/img/20220723/2022072301524554421165.png)

### e.charCode 和 e.keyCode 属性

`e.charCode` 属性通常用于 `onkeypress` 事件中，表示用户输入的字符的"字符码”

![image-20220723015800381](https://cc.hjfile.cn/cc/img/20220723/2022072301580208294539.png)

`e.keyCode` 属性通常用于 `onkeydown` 事件和 `onkeyup` 中，表示用户按下的按键的“键码”

![image-20220723015825736](https://cc.hjfile.cn/cc/img/20220723/202207230158273938782.png)

案例：键盘移动盒子

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        #box {
            position: absolute;
            top: 200px;
            left: 200px;
            width: 100px;
            height: 100px;
            background-color: orange;
        }
    </style>
</head>
<body>
    <div id="box"></div>

    <script>
        var oBox = document.getElementById('box');

        // 全局变量t、l，分别表示盒子的top属性值和left属性值
        var t = 200;
        var l = 200;

        // 监听document对象的键盘按下事件监听，表示当用户在整个网页上按下按键的时候
        document.onkeydown = function (e) {
            console.log(e.keyCode);
            switch (e.keyCode) {
                case 37:
                    l -= 3;
                    break;
                case 38:
                    t -= 3;
                    break;
                case 39:
                    l += 3;
                    break;
                case 40:
                    t += 3;
                    break;
            }

            // 更改样式
            oBox.style.left = l + 'px';
            oBox.style.top = t + 'px';
        };
    </script>
</body>
</html>
```

### e.preventDefault 组织默认事件

`e.preventDefault()` 方法用来阻止事件产生的“默认动作"。一些特殊的业务需求，需要阻止事件的“默认动作”。

案例一：制作一个文本框，只能让用户在其中输入小写字母和数字，其他字符输入没有效果。

```html
<body>
    <p>
        只能输入小写字母和数字：
        <input type="text" id="field">
    </p>
    <script>
        var oField = document.getElementById('field');

        oField.onkeypress = function (e) {
            console.log(e.charCode);
            
            // 根据用户输入的字符的字符码（e.charCode)
            // 数字0~9，字符码48~57
            // 小写字母a~z，字符码97~122
            if (!(e.charCode >= 48 && e.charCode <= 57 || e.charCode >= 97 && e.charCode <= 122)) {
                // 阻止浏览器的默认行为
                e.preventDefault();
            }
        };
    </script>
</body>
```

案例二：制作鼠标滚轮事件，当鼠标在盒子中向下滚动时，数字加 1，反之，数字减 1。

鼠标滚轮事件是 `onmousewheel`，它的事件对象 e 提供 `deltaY` 属性表示鼠标滚动方向，向下滚动时返回正值，向上滚动时返回负值。

```html
<body>
    <div id="box"></div>
    <h1 id="info">0</h1>

    <script>
        var oBox = document.getElementById('box');
        var oInfo = document.getElementById('info');

        // 全局变量就是info中显示的数字
        var num = 0;

        // 给box盒子添加鼠标滚轮事件监听
        oBox.onmousewheel = function (e) {
            // 阻止默认事件：就是说当用户在盒子里面滚动鼠标滚轮的时候，此时不会引发页面的滚动条的滚动
            e.preventDefault();
            
            if (e.deltaY > 0) {
                num++;
            } else {
                num--;
            }
            oInfo.innerText = num;
        }
    </script>
</body>
```

### e.stopPropagation 阻止事件传播

`e.stopPropagation()` 方法用来阻止事件继续传播。在一些场合，非常有必要切断事件继续传播，否则会造成页面特效显示出 bug。

案例：制作一个弹出层：点击按钮显示弹窗，点击网页任意地方关闭弹窗，但是点击弹窗内部不会关闭弹窗。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .modal {
            width: 400px;
            height: 140px;
            background-color: #333;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -70px;
            margin-left: -200px;
            display: none;
        }
    </style>
</head>

<body>
    <button id="btn">按我弹出弹出层</button>
    <div class="modal" id="modal"></div>

    <script>
        var oBtn = document.getElementById('btn');
        var oModal = document.getElementById('modal');

        // 点击按钮的时候，弹出层显示
        oBtn.onclick = function (e) {
            // 阻止事件继续传播到document身上
            e.stopPropagation();
            oModal.style.display = 'block';
        };

        // 点击页面任何部分的时候，弹出层关闭
        document.onclick = function () {
            oModal.style.display = 'none';
        };

        // 点击弹出层内部的时候，不能关闭弹出层的，所以应该阻止事件继续传播
        oModal.onclick = function (e) {
            // 阻止事件继续传播到document身上
            e.stopPropagation();
        };
    </script>
</body>
</html>
```

## 事件委托

需求：有一个无需列表 ul，要求列表中的每个列表项 li 点击就变红。

这个需求怎么作？可以给每个 li 都添加事件监听，这么作的问题是大量的事件监听会消耗大量内存，每个 li 的事件处理函数也都不同，这些函数本身也会占用内存。

解决：利用==事件冒泡==机制，将==后代元素==事件委托给==祖先元素==。

![image-20220723022155164](https://cc.hjfile.cn/cc/img/20220723/202207230221568753436.png)

事件委托中有一个重要的事件属性 `e.target`。事件委托通常需要结合使用 `e.target` 属性，来获取事件的事件源元素。

![image-20220723022949105](https://cc.hjfile.cn/cc/img/20220723/2022072302295099716056.png)

下面能实现开头的需求了：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
</head>

<body>
    <button id="btn">按我创建一个新列表项</button>
    <ul id="list">
        <li>列表项</li>
        <li>列表项</li>
        <li>列表项</li>
    </ul>
    <script>
        var oList = document.getElementById('list');
        var oBtn = document.getElementById('btn');

        oList.onclick = function (e) {
            // e.target表示用户真正点击的那个元素
            e.target.style.color = 'red';
        };

        oBtn.onclick = function () {
            // 创建新的li元素
            var oLi = document.createElement('li');
            // 写内容
            oLi.innerText = '我是新来的';
            // 上树
            oList.appendChild(oLi);
        };
    </script>
</body>
</html>
```

**事件委托的使用场景：**

- 当有大量类似元素需要批量添加事件监听时，使用事件委托可以减少内存开销
- 当有动态元素节点上树时，使用事件委托可以让新上树的元素具有事件监听

**使用事件委托时的注意事项：**

1. 不能委托不冒泡的事件给祖先元素

   onmouseenter 和 onmouseover 都表示“鼠标进入”，它们有什么区别呢？

   答：onmouseenter?不冒泡，onmouseover冒泡。

2. 最内层元素不能再有额外的内层元素了，比如：

   ![image-20220723023945746](https://cc.hjfile.cn/cc/img/20220723/2022072302394747951042.png)

   这样的 DOM 结构会导致点击 span 时事件传递给 ul，导致 span 变红，而不是整个 li 变红。

# 实现动画

## 定时器

`setInterval()` 函数可以重复调用一个函数，在每次调用之间具有固定的时间间隔。

![image-20220723024606903](https://cc.hjfile.cn/cc/img/20220723/2022072302460872584442.png)

`setInterval()` 函数可以接收第3、4个参数，它们将按顺序传入函数。

![image-20220723024727198](https://cc.hjfile.cn/cc/img/20220723/2022072302472914521327.png)

`clearInterval()` 函数可以清除一个定时器

![image-20220723024939255](https://cc.hjfile.cn/cc/img/20220723/2022072302494091943295.png)

## 延迟器

`setTimeout()` 函数可以设置一个延时器，当指定时间到了之后，会执行函数一次，不再重复执行。

![image-20220723025226702](https://cc.hjfile.cn/cc/img/20220723/2022072302522906768886.png)

`clearTimeout()` 函数可以清除延时器，和 `clearInterval()` 非常类似。

`setInterval()` 和 `setTimeout()` 是两个异步语句。

异步（asynchronous）：不会阻塞 CPU 继续执行其他语句，当异步完成时，会执行“回调函数”（callback）。

## 函数节流

函数节流：一个函数执行一次后，只有大于设定的执行周期后才允许执行第二次。

函数节流经常用在防止连续点击类似的场景，实现也很简单，只需要借助 `setTimeout()` 延时器。

```javascript
var lock true;

function 需要节流的函数() {
    // 如果锁是关闭状态，则不执行
    if (!lock) return;
    
    // === 真正的函数逻辑 ===
    console.log('函数逻辑执行了');
    
    // 执行逻辑后，锁定函数
    lock = false;
    
    // 指定 2000ms 后将锁打开
    setTimeout(function () {
        lock = true;
    }, 2000);
}
```



