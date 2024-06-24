const sectionList = [
  {
    title: `快速开始`,
    content: `
## Nighta 的故事
一天夜里，睡不着，我打开手机一看，凌晨三点。做点什么好呢？看看编译原理吧。此后，我用了几天时间简单学习了编译原理，再到网吧里用了一晚上时间实现了一个解释器。这就是Nighta———几乎是一夜之间诞生的脚本语言。
它没有更好的性能，也没有更高级的特性，但是它是我对自己本科生涯画上的一个句号：

> 还记得最初的 \`Hello World\` 吗？这是多少人编程的起点！原来，我们从一开始就是在面向世界编程，怀抱以一己之力改变全世界的壮志雄心，这一切是何等浪漫！
> 而当我将要奔赴远方时，有感而发，挥毫提笔，留下代码作别，却仍是一句 \`Hello World\` 。

我想通过 Nighta 的故事，分享我四年的感悟，鼓励后来的编程学习者：**其实，很多技术并不是魔法，人人都可以学会**。

## Nighta 的特性

Nighta 是一个基于 JavaScript 实现的跨平台语言，语法类似于 Lisp ，用\`()\`包裹每一条语句，形如：
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

不过，目前 nighta 还没有支持 \`++\` 等语法糖，所以现阶段使用这些语法时会抛出异常。

    `
  },
  {
    title: `作用域`,
    content: `
nighta 中，使用 \`{}\` 包裹内容即可创建一个局部作用域：
\`\`\`js
(var msg1 "oh!")
{
  (var msg1 "Hello,")
  (var msg2 "World!")
  (say (msg1 + msg2))
}
\`\`\`

最后输出的内容是:
> Hello,World!

可以利用作用域的特性来创建局部变量，或者局部重写函数————当然，二者本质是一样的，因为在 nighta 中，函数也是一种变量。

此外，分支语句、函数中也涉及到作用域的使用————在这些场景下使用作用域时，如果该作用域中只有一条语句，那么可以省略\`{}\`。

`
  },
  {
    title: `条件语句`,
    content: `
## if
和其他大部分语言不太一样，nighta 中的 \`if\` 是一个三元表达式。

\`\`\`js
(var x 100)
(if (> x 100) {
  (say "bigger")
} {
  (say "smaller")
})
\`\`\`

如果需要表示更复杂的判断逻辑，可以嵌套使用 \`if\` 语句。

另外，正如上一章节提到的那样，当作用域内只有一条语句时，可以省略 \`{}\`

\`\`\`js
(var x 100)
(if (> x 100) 
  (say "x is bigger than 100")
  (if (< x 100) 
      (say "x is smaller than 100")
      (say "x is equal to 100")
  )
)
\`\`\`
`
  },
  {
    title: `循环语句`,
    content: `
nighta 中的循环语句的语法较为常规:
\`\`\`js
(var i 0)
(while (i < 10) {
  (i = (i + 1))
})  
\`\`\`

类似地，\`{}\` 在其内只有一条语句时是可省略的。

> 美中不足的是，目前 nighta 还不支持 \`++\` 等语法糖。

    `
  },
  {
    title: `函数`,
    content: `
## 普通函数
nighta 的函数声明和调用都非常简单：
\`\`\`js
(fun square (x y) 
  {
    (var z 30)
    ((x + y) * z)
  }
)
(square 10 2) 
\`\`\`

类似地，\`{}\` 在其内只有一条语句时是可省略的，具体内容可以参考下文中的匿名函数案例。

## 匿名函数

\`\`\`js
(fun sum (a b) (a + b))

(fun calc (callback x y) 
  (callback x y)
)

(calc sum 10 2)
\`\`\`

注意到了吗？上方代码中的 \`callback\` 函数被当作参数传递了——这算是再次强调，在 nighta 中，函数可以被看做一种变量。

`
  },
  {
    title: `类`,
    content: `
## 基本使用

nighta 仅简单支持了 OOP 的部分规范，基本语法如下：

\`\`\`js
(class Person null {
  (fun constructor (x)
    (self["x"] = x)
  )

  (fun info () {
    (say x)
  })
})

(var person (new Person 1))
(person["info"])
\`\`\`

class 中存在一个可以直接使用的变量 \`self\` 指向其当前的上下文环境。

同时使用 \`[]\` 可以访问 class 的属性——请注意，代码中访问属性是 \`"x"\` 而不是 \`x\` ! 前者是字符串，后者表示一个变量——可能是任何内容。
> 这意味着，你可以在其中插入语句实现更复杂的属性名称计算，类似于这样: \`instance[(("a" + "good") + "name")]\`
> 同时，还可以直接进行嵌套：\`instance[instance[key]]\`

## 继承

继承的语法也非常简单，只需要把上述声明 class 的语句中的 \`null\` 替换为要继承的类即可。

但是 nighta 的继承机制可能不像主流语言那样完善，它只支持会继承方法。

\`\`\`js
(class Person null {
  (fun constructor (num) {
  })
  (fun info () {
    (say "This is OOP: " self["num"])
  })
})

(class Worker Person {
  (fun constructor (num) {
    (self["num"] = num)
  })  
})

(var worker (new Worker 12345))
(worker["info"])
\`\`\`
    `
  },
  {
    title: `数组`,
    content: `
## List
数组、列表、字典———其实几乎就是同一个概念，在 nighta 中，使用 List 创建数组，而 \`List\` 本身实际上是基于上一章节的 class 进行封装的，所以其语法如下：
\`\`\`js
(var arr (new List 10))

(fun iterator () {
  (arr["map"]
    (fun (item index) {
      (say "arr[" index "] -----> " arr[index])
    })
  )
})

(arr["push"] "one")
(arr["push"] "two")
(arr["pop"])
(arr["unshift"] "one")
(arr["unshift"] "two")
(arr["shift"])

(iterator)
\`\`\`

目前，\`List\` 提供了几个 API：
- \`len\`: 属性，当前的数组长度。
- \`push\`: 方法，在列表的末尾插入一个元素。
- \`pop\`: 方法，移除列表的最后一个元素。
- \`unshift\`: 方法，在列表的开头插入一个元素。
- \`shift\`: 方法，移除列表的第一个元素。
- \`map\`: 方法，迭代器，需要传入一个回调，提供两个参数 \`element\` 和 \`index\` 分别指代元素本身和其下标。 

同时，可以使用形如 \`arr[10]\` 的语法对指定下标 \`10\` 的内容进行**访问**——请注意，最好不要用这个方式对**长度越界的部分**进行修改，因为这样的修改不会引起 \`len\` 的变化，进而导致获取数组长度错误。

    `
  },
  {
    title: `其他内容`,
    content: `
## 这里该写点什么好呢
> 以后想到了再补上吧
    `
  }
];

export default sectionList;