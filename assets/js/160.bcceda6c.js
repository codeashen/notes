(window.webpackJsonp=window.webpackJsonp||[]).push([[160],{483:function(v,_,t){"use strict";t.r(_);var s=t(4),n=Object(s.a)({},(function(){var v=this,_=v._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("p",[v._v("在微服务架构中，应该选择什么样的负载均衡器以及服务发现后如何实现节点保护？")]),v._v(" "),_("p",[v._v("负载均衡器是微服务架构中非常核心的部分，因为一旦算法出现了问题，后端节点负载不一致，就会导致某个节点被打挂，甚至引起雪崩的级联反应。")]),v._v(" "),_("h1",{attrs:{id:"负载均衡器基本概念"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#负载均衡器基本概念"}},[v._v("#")]),v._v(" 负载均衡器基本概念")]),v._v(" "),_("p",[_("strong",[v._v("负载均衡（Load Balance），是一种网络流量分配技术，用于解决单台机器性能出现瓶颈时，需要多台机器分摊处理流量的情况")]),v._v("。load 在中文里也有“量”的意思，在这里可以理解为机器的工作量，那么 Load Balance 就是让每台机器平摊处理的工作量（请求量）。")]),v._v(" "),_("p",[v._v("一般情况下，我们说的负载均衡器，有以下几种实现方式。")]),v._v(" "),_("ul",[_("li",[_("p",[_("strong",[v._v("硬件负载均衡")]),v._v("：比较常见的硬件负载均衡器有NetScaler、F5、Radware，Array 等，由专业的硬件公司生产，一般在互联网公司的早期阶段进行使用，但是由于价格昂贵，现在互联网公司很少使用了。")])]),v._v(" "),_("li",[_("p",[_("strong",[v._v("DNS 负载均衡")]),v._v("：通过域名返回后端节点 IP 进行负载均衡，也可以为每个后端 IP 设置权重。因为 DNS 解析存在缓存延时的问题，所以在内网较少使用。但对于大流量的 Web 和 App，入口层一般会使用此种方式做负载均衡，后端多组四层 LB 做负载均衡。")]),v._v(" "),_("p",[_("img",{attrs:{src:"https://s0.lgstatic.com/i/image2/M01/03/F6/Cip5yF_liTCAWeozAABK8gkEa7w975.png",alt:"DNS 负载均衡示意图"}})])]),v._v(" "),_("li",[_("p",[_("strong",[v._v("软件负载均衡")]),v._v("：比较流行的是 Nginx、HAproxy、LVS 等，像 LVS 是四层负载均衡器，性能较高；Nginx、HAproxy 主要用于七层的负载均衡，有较多的负载均衡策略，同时流量相对于四层会更加均衡。像我们常用的云厂商，比如阿里云的 SLB 同时提供了基于 LVS 的四层负载均衡器和基于七层的 Tengine 负载均衡器供大家选择。")])]),v._v(" "),_("li",[_("p",[_("strong",[v._v("程序内负载均衡")]),v._v("：严格来说它属于软件负载均衡的一种，只是"),_("strong",[v._v("把负载均衡的策略放在了服务内部")]),v._v("。对于微服务架构来说，服务内部做负载均衡更合适，因为微服务就是通过服务发现发现服务节点的，在程序内部选取合适的流量节点自然更加合理。")])]),v._v(" "),_("li",[_("p",[_("strong",[v._v("Serivce Mesh 负载均衡")]),v._v("：利用 sidecar 做程序内的负载均衡，属于软件负载均衡的一种，相比 SDK 内负载均衡，可以随时更新各种负载均衡策略。")])])]),v._v(" "),_("p",[v._v("现在，你已经对负载均衡器已经有了基本的了解，实际上无论是软负载还是硬负载，基本上都用到了以下几种算法。")]),v._v(" "),_("h1",{attrs:{id:"常用的负载均衡算法"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#常用的负载均衡算法"}},[v._v("#")]),v._v(" 常用的负载均衡算法")]),v._v(" "),_("ul",[_("li",[_("strong",[v._v("Round Robin")]),v._v("：简单轮询算法，适合后端节点权重一致的情况。应用场景较少，但算法时间复杂度为 O(1)， 可以在预先判断后端节点权重一致的情况下使用。")]),v._v(" "),_("li",[_("strong",[v._v("Weighted Round Robin")]),v._v("：通过取最大公约数的方式，做简单轮询。因为权重多的节点会比较集中，Nginx发明了一种平滑加权轮询，通过算法将权重大的节点分散开，但在服务重启时依然会出现节点请求较为集中的情况。")]),v._v(" "),_("li",[_("strong",[v._v("Weighted Random")]),v._v("：通过随机的方式进行负载均衡，配合二分查找，可以将时间复杂度降到O(log^n)。该算法对于后端节点非常均衡，不会出现加权轮询导致的重启时节点请求较为集中的情况。")]),v._v(" "),_("li",[_("strong",[v._v("Two Random Choices")]),v._v("：目前比较流行的算法，适合后端节点权重一致的情况，通过两次随机算法，获取到两个节点，然后对比节点的 CPU 负载，延时情况等信息，获取一个最优的节点，好处是后端节点的 CPU 或者延时会比较均衡，因为分区和虚拟机硬件配置的原因，此种做法可以动态调节后端节点负载，在生产中是非常好的选择。")]),v._v(" "),_("li",[_("strong",[v._v("Sticky Session（会话保持）")]),v._v("：根据客户端 IP 或者 Cookie 进行会话保持，实际上就是同一个客户端，每次选取的后端节点 IP 保持一致，主要是用于登录验证的会话保持。实际上"),_("strong",[v._v("此种算法让服务变成了有状态服务，另外对于后端负载也会不均衡，在微服务架构中已经较少使用")]),v._v("。如果想要进行 Session 的保持，大多是将 Session 存储在外部存储中，比如 Redis 等。")])]),v._v(" "),_("p",[v._v("现在你已经对负载均衡有了一个基本的了解，接下来我们进一步看看服务发现后的节点保护。")]),v._v(" "),_("h1",{attrs:{id:"服务发现后的节点保护"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#服务发现后的节点保护"}},[v._v("#")]),v._v(" 服务发现后的节点保护")]),v._v(" "),_("p",[v._v("服务发现后的节点保护，我在注册中心的章节也简单提到过。实际上最早我是把节点保护放在了注册发现的模块中，后来因为耦合性过高将此模块拆解出来成为独立的模块，并和负载均衡模块配合使用。实际上，在 Envoy 中，节点保护的功能也放在了负载均衡器中。")]),v._v(" "),_("h2",{attrs:{id:"主动健康检查"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#主动健康检查"}},[v._v("#")]),v._v(" 主动健康检查")]),v._v(" "),_("p",[v._v("受注册中心的网络分区故障等原因影响，"),_("strong",[v._v("在负载均衡器中进行主动健康检查")]),v._v("，是避免此类情况发生的最佳模式，但长时间的主动健康检查会产生大量无用的 ping 操作，造成不必要的机器负载损失。所以在实践中，建议选择"),_("strong",[v._v("获取过少的节点时才触发主动健康检查模式")]),v._v("。")]),v._v(" "),_("p",[v._v("当获取节点过少、进入主动健康检查的模式时会触发对后端节点的 ping 操作，这个过少的阈值可以根据公司负载情况确定。比如在实际操作中，"),_("strong",[v._v("如果机器负载长期处于比较高的水位，你可以采用一个比较保守的数值，比如小于 80% 的时候触发")]),v._v("。")]),v._v(" "),_("p",[v._v("为了能够保证两台机器至少能够下掉一台，"),_("strong",[v._v("我采用了 (currentNodeNum+1)/nodeCount < 80% 这样的算法，以保证至少下掉一个节点")]),v._v("。其中 nodeCount 为 15 分钟前的服务节点总数，当然这样是一个经验值，你也可以根据公司的实际情况适当调整。")]),v._v(" "),_("p",[v._v("另外，在容器环境中，扩缩容时可能会触发节点的自我保护模式，造成一定的短时间流量损失，但相对于因为流量打到了错误的节点上引发的雪崩，我认为此种情况还是可以接受的。")]),v._v(" "),_("p",[_("strong",[v._v("恐慌阈值")])]),v._v(" "),_("p",[v._v("依据健康检查的结果判断后端节点是否正常，这种方式虽然可以保证网络分区异常情况下节点间的连通性，但如果后端节点大量不可用的情况下，只有少数节点能够通过健康检查。此种情况下，少量的节点显然是无法提供正常服务的。")]),v._v(" "),_("p",[v._v("另外，因为服务发版导致的服务节点多数或者全部不可用的情况也很容易出现，此时你的首选操作一定是回滚。回滚期间，节点的可用是有先后顺序的，这个时候如果完全信任主动健康检查的结果，会导致流量全部路由到新回滚成功的节点上，造成新启动的节点会立即被打挂。")]),v._v(" "),_("p",[v._v("解决上面两种问题的办法一种是服务治理中的限流，这部分内容我在后面会讲到；另外一种办法就是"),_("strong",[v._v("负载均衡器中的恐慌阈值。")]),v._v(" 当健康检查后节点依然少于设定的阈值，则忽略健康检查结果，将流量路由到全部的节点，包括不健康的节点，这样就可以保证负载的均衡，也不会把流量集中到过少的节点，导致服务处于“雪崩”的状态。")]),v._v(" "),_("p",[v._v("这个阈值的设置也是比较讲究的，虽然 Envoy 官方默认值是 50%，但我觉得这并不是最合适的设置："),_("strong",[v._v("50% 的阈值太过激进，很容易达到触发条件")]),v._v("。而当你理解了这个阈值的作用，就会明白当线上出现故障的时候，节点是会趋于全部不可用的，所以线上我把这个值设置为 10%。因为"),_("strong",[v._v("随着故障节点变多，剩下的少量节点也扛不住调用方的所有流量，剩余的节点会慢慢趋近我们设置的阈值，一样可以达到恐慌阈值设置的目的")]),v._v("，而且也不会因为只是少量节点故障，触发阈值导致的错误流量。")]),v._v(" "),_("h2",{attrs:{id:"被动健康检查"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#被动健康检查"}},[v._v("#")]),v._v(" 被动健康检查")]),v._v(" "),_("p",[v._v("有些时候单纯靠主动健康检查依然无法避免错误的流量，毕竟主动健康检查只是通过特定的 ping 接口或者 TCP 探活进行健康检查的，这些并不是服务的真实流量，特别是在使用 TCP 探活的时候，更容易出现问题。这个时候就需要"),_("strong",[v._v("被动健康检查")]),v._v("了，"),_("strong",[v._v("通过真实流量来判断节点是否正常，也就是利用节点熔断器")]),v._v("。")]),v._v(" "),_("p",[v._v("和服务级别的熔断器一样，节点熔断器也是"),_("strong",[v._v("通过状态码判断服务是否正常")]),v._v("，假如后端是 HTTP 服务，我们通常会"),_("strong",[v._v("将 499 以上的错误码认为是后端服务错误")]),v._v("。通过记录 10s 的滑动窗口内的错误码比例，当后端节点的错误比例达到我们设置的阈值时，便将后端节点从负载均衡器中移除。当然你也要考虑不能摘除过多的节点，所以熔断器需要设置和自我保护相同的触发阈值，以避免过多的节点被移出引发“雪崩”。")]),v._v(" "),_("p",[v._v("现在我们已经讲完了主动和被动健康检查，通过两种健康检查的配合，你基本上能够避免大多数节点故障的异常情况了。")])])}),[],!1,null,null,null);_.default=n.exports}}]);