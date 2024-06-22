import { jsx } from "vue/jsx-runtime";

const sectionList = [
  {
    title: `快速开始`,
    content: `
## Nighta 的故事
一天夜里，睡不着，我打开手机一看，凌晨三点。做点什么好呢？看看编译原理吧。此后，我用了几天时间简单学习了编译原理，再到网吧里用了一晚上时间实现了一个解释器。这就是Nighta———几乎是一夜之间诞生的脚本语言。它没有更好的性能，也没有更高级的特性，但是它是我对自己本科生涯画上的一个句号：

> 还记得最初的 \`Hello World\` 吗？这是多少人编程的起点！原来，我们从一开始就是在面向世界编程，怀抱以一己之力改变全世界的壮志雄心，这一切是何等浪漫！
> 而当我将要奔赴远方时，有感而发，挥毫提笔，留下代码作别，却仍是一句 \`Hello World\` 。

我想通过 Nighta 的故事，分享我的四年来的感悟：**其实，很多技术并不是魔法，人人都可以学会。**

## Nighta 的特性

Nighta 是一个基于 JavaScript 实现的跨平台语言，语法类似于 Lisp 语言，用\`()\`包裹每一条语句，形如：
\`\`\`js
(say "Hello World")
\`\`\`
此外，Nighta 提倡万物皆函数，每一个 \`()\` 内的语句都是表达式，都可以被看作是函数，且均有返回值。
同时，函数也可以被反过来看作是 Nighta 中的变量，相关细节将在后续章节中介绍。


## 安装与使用

TODO: 在不久的将来将会开放下载。

当前可以在 [Playground](/#/playground) 中进行体验。

具体用法请参考本文档左侧菜单中的各个栏目。
> 当前仅提供了相关语法的案例，更细致的描述会在未来进行补充。
`
  },
  {
    title: `变量`,
    content: `
## var
Nighta 是弱类型语言，使用 \`var\` 关键字声明变量，不严格区分类型：
\`\`\`js
(var a 100)
(var b "string")
(var c null)
(var d  undefined)
(var e false)
\`\`\`

也可以进行嵌套，并且对于换行或空格等格式是没有太多限制的，只需要保障关键字和变量名称等内容之间有空格分隔，同时让代码格式看起来美观（这很重要）即可。
下面是两种等价的写法：
\`\`\`js
(var f (var g "good night"))

(var f 
  (var g "good night")
)
\`\`\`

你可以用内置函数 \`say\` 来输出结果上述结果:
\`\`\`js
(say a b c d e)
\`\`\`
`
  },
  {
    title: `基础运算`,
    content: `
Nighta 的每一个 \`()\` 中只支持单次运算：
\`\`\`js
(1 + (1 * (1 / 2)))
(var a (1 + 1.1))
(a % 2)
\`\`\`

由于是弱类型的缘故，不同类型的值也可以进行 \`+\` 运算，变量也可以跨类型地重新赋值：
\`\`\`js
(var msg1 "Hello")
(var msg2 1024)
(var msg (msg1 + msg2))
(msg = true)
\`\`\`


同时，Nighta 中万物都是函数，除了\`=\`赋值语句以外的基础运算都可以被重写：

\`\`\`js
(var + (
  fun (v1 v2) {
    (say v1 " say: [Hello] to " v2) 
  })
)
(say ("You" + "World"))
\`\`\`

上述代码的结果是: 
> You say [Hello] to World

    `
  },
  {
    title: `条件语句`,
    content: `
      这是内容
    `
  },
  {
    title: `数组`,
    content: `
      这是内容
    `
  },
  {
    title: `循环语句`,
    content: `
      这是内容
    `
  },
  {
    title: `函数`,
    content: `
      这是内容
    `
  },
  {
    title: `类`,
    content: `
      这是内容
    `
  },
  {
    title: `APIs`,
    content: `
      这是内容
    `
  }
];

export default sectionList;