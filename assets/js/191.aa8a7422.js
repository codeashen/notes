(window.webpackJsonp=window.webpackJsonp||[]).push([[191],{515:function(s,t,a){"use strict";a.r(t);var n=a(4),e=Object(n.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"settings"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#settings"}},[s._v("#")]),s._v(" Settings")]),s._v(" "),t("p",[s._v("前面我们介绍 "),t("code",[s._v("org.gradle.api.Project")]),s._v(" 的根据 build.gradle 文件来初始化的，这里介绍的 "),t("code",[s._v("org.gradle.api.initialization.Settings")]),s._v(" 是根据 settings.gradle 文件来初始化的。Settings 的作用就是决定本工程中哪些子工程是需要被 gradle 处理的。")]),s._v(" "),t("p",[s._v("所以 Settings 接口就对用这根工程下的 settings.gradle 文件，可以在该文件中调用 Settings 接口中的方法。Settings 接口中最核心的方法就是 include 方法引入工程，引入后 gradle 就会处理该子工程。")]),s._v(" "),t("p",[s._v("Settings 对应了 gradle 的初始化阶段，初始化阶段就是在执行 settings.gradle 中的逻辑。")]),s._v(" "),t("h1",{attrs:{id:"sourceset"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#sourceset"}},[s._v("#")]),s._v(" SourceSet")]),s._v(" "),t("p",[s._v("为什么 gradle 如何知道工程源码在 "),t("code",[s._v("src/main/java")]),s._v(" 下呢？其实就是从 SourceSet 类的配置中获取的，SourceSet 决定了代码、资源、第三方库等存放的位置。")]),s._v(" "),t("p",[s._v("SourceSet 接口约定了很多默认配置，这些配置可以被修改。在需要修改的工程的 build.gradle 文件中使用 sourceSets 方法修改。")]),s._v(" "),t("div",{staticClass:"language-groovy line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-groovy"}},[t("code",[s._v("sourceSets "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    main "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 修改java源码路径")]),s._v("\n        java"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("srcDir")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'src/main/java'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 修改资源文件路径")]),s._v("\n        resources"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("srcDir")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'src/main/resources'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br")])]),t("p",[s._v("一般使用默认约定即可。")]),s._v(" "),t("h1",{attrs:{id:"自定义-plugin"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#自定义-plugin"}},[s._v("#")]),s._v(" 自定义 Plugin")]),s._v(" "),t("p",[s._v("可以将完成特定功能的所有 Task 封装在一个插件中，其他项目只需要引入该插件就可以使用其功能。")]),s._v(" "),t("p",[s._v("要创建一个插件，先要创建一个插件工程，插件工程目录结构如下：")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://cc.hjfile.cn/cc/img/20220619/2022061906560815120227.png",alt:"image-20220619185606612"}})]),s._v(" "),t("p",[s._v("build.gradle")]),s._v(" "),t("div",{staticClass:"language-groovy line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-groovy"}},[t("code",[s._v("apply plugin"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'groovy'")]),s._v("\n\nsourceSets "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    main "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        groovy "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            srcDir "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'src/main/groovy'")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n        resources "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            srcDir "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'src/main/resources'")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br")])]),t("p",[s._v("com.ashen.gradle.study.properties")]),s._v(" "),t("div",{staticClass:"language-properties line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-properties"}},[t("code",[t("span",{pre:!0,attrs:{class:"token key attr-name"}},[s._v("implementation-class")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token value attr-value"}},[s._v("com.ashen.gradle.study.GradleStudyPlugin")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("GradleStudyPlugin")]),s._v(" "),t("div",{staticClass:"language-groovy line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-groovy"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("package")]),s._v(" com"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("ashen"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("gradle"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("study\n\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" org"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("gradle"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("api"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Plugin\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" org"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("gradle"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("api"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("Project\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/**\n * 自定义 Plugin\n */")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("GradleStudyPlugin")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("implements")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Plugin")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("Project"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/**\n     * 插件的执行方法\n     * @param project 引入当前插件的 Project 对象\n     */")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[s._v("@Override")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("apply")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("Project project"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        println "),t("span",{pre:!0,attrs:{class:"token interpolation-string"}},[t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Hello Plugin, this is ')]),t("span",{pre:!0,attrs:{class:"token interpolation"}},[t("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[s._v("${")]),t("span",{pre:!0,attrs:{class:"token expression"}},[s._v("project"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("name")]),t("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[s._v("}")])]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"')])]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br")])]),t("p",[s._v("其他工程使用该插件")]),s._v(" "),t("div",{staticClass:"language-groovy line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-groovy"}},[t("code",[s._v("apply plugin"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'com.ashen.gradle.study'")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])])])}),[],!1,null,null,null);t.default=e.exports}}]);