(window.webpackJsonp=window.webpackJsonp||[]).push([[95],{420:function(a,s,e){"use strict";e.r(s);var t=e(4),r=Object(t.a)({},(function(){var a=this,s=a._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("p",[a._v("Horizontal Pod Autoscaler：Pod的水平自动伸缩器。 观察Pod的CPU、内存使用率自动扩展或缩容Pod的数量。 不适用于无法缩放的对象，比如DaemonSet。")]),a._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("CPU、内存\n自定义指标的扩缩容。\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br")])]),s("p",[a._v("必须定义 Requests参数，必须安装metrics-server。")]),a._v(" "),s("h1",{attrs:{id:"使用-hpa"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#使用-hpa"}},[a._v("#")]),a._v(" 使用 HPA")]),a._v(" "),s("p",[a._v("创建 HPA")]),a._v(" "),s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# CPU达到20%就自动扩容，最少2个，最多5个")]),a._v("\nkubectl autoscale deployment demo-nginx --cpu-percent"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("20")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--min")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("2")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--max")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("5")]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br")])]),s("p",[a._v("查看 HPA")]),a._v(" "),s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("kubectl get hpa\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("h1",{attrs:{id:"附录-相关官方文档"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#附录-相关官方文档"}},[a._v("#")]),a._v(" 附录：相关官方文档")]),a._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/",target:"_blank",rel:"noopener noreferrer"}},[a._v("Horizontal Pod Autoscaling"),s("OutboundLink")],1)]),a._v(" "),s("li",[s("a",{attrs:{href:"https://kubernetes.io/zh/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/",target:"_blank",rel:"noopener noreferrer"}},[a._v("Horizontal Pod Autoscaler 演练"),s("OutboundLink")],1)])])])}),[],!1,null,null,null);s.default=r.exports}}]);