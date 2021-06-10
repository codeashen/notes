# Fiddler介绍

## Fiddler简介

- Fiddler是位于客户端和服务器端的HTTP代理
- 目前最常用的http抓包工具之一
- 功能非常强大，是web调试的利器
  - 监控浏览器所有的HTTP/HTTPS流量
  - 查看、分析请求内容细节
  - 伪造客户端请求和服务器响应
  - 测试网站的性能
  - 解密HTTPS的web会话
  - 全局、局部断点功能
  - 第三方插件
- 使用场景
  - 接口调试、接口测试、线上环境调试、web性能分析
  - 判断前后端bug、开发环境hosts配置、mock、弱网断网

## Fiddler原理

![image-20210326002135375](https://z3.ax1x.com/2021/06/10/22iH2R.png)

Fiddler一打开就会设置一个系统代理，是本机的8888端口， Chrome浏览器等会使用该代理，然后Fiddler监听这个端口就可以抓到数据包了。

> 打开Fiddler后，查看windows的 *设置 -> 网络和Internet -> 代理*  可以看到设置的代理信息

#  Fiddler界面介绍

![image-20210326010118621](https://z3.ax1x.com/2021/06/10/22iLKx.png)

## 菜单栏

- File：重新打开视图、导入导出会话等
- Edit：复制、移除、选择、粘贴、查找会话等
- Rules：隐藏规则、自动断点、脚本设置、弱网测试等
  - 隐藏图片、建立通道的会话
  - 隐藏304响应
- Tool：Fiddler设置、windows设置、清除IE缓存Cookie、编码解码工具、会话比较、重置脚本、host设置等
- View：展示或隐藏各种视图
- Help：帮助

## 工具栏

- <img src='https://z3.ax1x.com/2021/06/10/22iOr6.png'/>添加注释：标记接口，或导入导出时候有用，方便别人查看
- <img src='https://z3.ax1x.com/2021/06/10/22iXqK.png'/>重放请求：Shift+R 重放n次，串行的，非并发
- <img src='https://z3.ax1x.com/2021/06/10/22ivVO.png'/>释放断点
- <img src='https://z3.ax1x.com/2021/06/10/22ixaD.png'/>保持的会话个数
- <img src='https://z3.ax1x.com/2021/06/10/22izIe.png'/>监听进程：点住拖到Chrome上可以只监听Chrome
- <img src='https://z3.ax1x.com/2021/06/10/22FpPH.png'/>清除IE缓存
- <img src='https://z3.ax1x.com/2021/06/10/22F9Gd.png'/>文本编码解码器：有URL编码、Base64、MD5等多种

## 会话列表

1. [#]--HTTP Request的顺序，从1开始，按照页面加载请求的顺序递增。
2. [Result]--HTTP响应的状态，可以参考这里。
3. [Protocol]——请求使用的协议（如HTTP/HTTPS/FTP）
4. [Host]—-请求地址的域名
5. [URL]—-请求的服务器路径和文件名，也包括GET参数
6. [BODY]——请求的大小，以byte为单位
7. [Caching]—-请求的缓存过期时间或缓存控制 header 等值
8. [Content-Type]—-请求响应的类型（Content-Type)
9. [Process]—-发出此请求的windows进程及进程ID
10. [Comments]—-用户通过脚本或者右键菜单给此session增加的备注
11. [Custom]--用户可以通过脚本设置的自定义值

## 命令行&状态栏

- 黑色命令行：可以执行一些命令操作
  
  - `bpu xxx ：带有xxx的请求都设置断点，不加xxx清除断点
- <img src='https://z3.ax1x.com/2021/06/10/22FCRA.png'/>是否设置代理：即是非启动Fiddler监听
- <img src='https://z3.ax1x.com/2021/06/10/22FPxI.png'/>监控的进程：浏览器、非浏览器、无等
- <img src='https://z3.ax1x.com/2021/06/10/22FFMt.png'/>断点：在进程选择右边，正常是一个空白，点一次设置请求前断点，点两次设置响应后断点

## 辅助标签&工具

- Statistics：请求的时间统计，HTTP请求的性能和其他数据分析，如DNS解析的时间，建立TCP/IP连接的时间消耗等信息

- Inspectors：检查器，可以多种方式查看请求的请求报文和响应报文相关信息

- AutoResponder：自动响应器，可用于拦截某一请求，进行如下操作：

  - 重定向到本地的资源
  - 使用Fiddler的内置响应
  - 自定义响应

  ![image-20210326020842862](https://z3.ax1x.com/2021/06/10/22FAqf.png)

- Composer：请求发送器，可自行填写，也可拖动请求到Composer上

- Filter：过滤器，多维度的过滤规则，可根据主机、进程、请求头、响应头、状态码、响应类型和大小、断点进行请求的过滤

  - 主机：分解局域网、广域网、host名称过滤
  - 客户端进程：根据进程过滤
  - 请求头：显示/隐藏URL中包含关键字、标记含指定header的、删除指定header、添加header
  - 断点：根据请求方法、响应内容等设置断点
  - 响应状态码：根据状态码控制显隐
  - 相应类型大小：根据条件控制显隐
  - 响应头：标记、设置、添加响应头
    

# Fiddler功能介绍

## 断点

设置断点有两种方式，全局断点和局部断点

**1. 全局断点**

全局断点的设置如下图所示，两个地方都可以设置，下面状态栏点一下为 Before Requests，两下为After Response， 三下取消

![image-20210327004243758](https://z3.ax1x.com/2021/06/10/22FZdS.png)

**2. 局部断点**

局部断点要使用命令行设置

- 请求前断点 `bpu xxx`

  url中含有关键字xxx的请求服务器前被阻塞， 不带关键字xxx取消断点

- 响应后断点 `bpafter xxx`

  url中含有关键字xxx的服务器响应后被阻塞，不带关键字xxx取消断点

## 弱网测试

![image-20210327010208519](https://z3.ax1x.com/2021/06/10/22FeIg.png)

上图中，勾选①处，开启弱网环境。若要自定义弱网程度，点击②处自动打开脚本，查找`m_SimulateModem` 找到如下内容

```javascript
if (m_SimulateModem) {
    // 请求每发送1KB延迟300毫秒
    oSession["request-trickle-delay"] = "300"; 
    // 响应每下载1KB延迟150毫秒
    oSession["response-trickle-delay"] = "150"; 
}
```

## HTTPS抓包

Tools > Options > HTTPS > Decrypt HTTPS traffic

## App抓包

电脑端设置：

1. 点击 Tools > Fiddler Options > Connections.
2. 勾选 `Allow remote computers to connect`
3. 重启Fiddler 
4. 确保防火墙允许Fiddler进程可以远程连接 

移动端设置：

1. 打开 设置>WLAN>连接上的WLAN设置，点击代理>手动，设置主机名为Fiddler所在主机的IP，端口为Fiddler监听端口
2. 设备连接WiFi（保证在一个局域网），确保设备可以访问到`http://电脑IP:8888`，该地址会返回Fiddler Echo Service页面

此时手机上的请求就可以在Fiddler上看到了，有时候有些请求抓不到，可能需要手机端安装证书，步骤如下： 

1. 点击页面底部FiddlerRoot certificate下载证书
2. 打开 设置>更多设置>系统安全>加密与凭据>从存储设备安装，选择下载好的FiddlerRoot.cer进行安装
3. 浏览器打开`https://www.baidu.com`，已经可以抓取HTTPS包了
4. 注意：测试完毕，记得关闭代理，否则手机无法上网

> ios设备安装证书略有不同：
>
> 打开FiddlerRoot.cer文件并安装安装成功后，在 通用>关于本机>证书信任设置 中，信任刚安装的Fiddler证书

## Fiddler插件

Willow：方便的管理多环境规则，增强版的AutoResponder
