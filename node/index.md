[TOC]

## 什么是 Node？

简单地说，Node是 JavaScript 的一种**运行环境**。在此之前，我们知道 JavaScript 都是在浏览器中执行的，用于给网页添加各种动态效果，那么可以说**浏览器也是 JavaScript 的运行环境**。那么这两个运行环境有哪些差异呢？请看下图：

![差异](./img/difference.png)

两个运行环境共同包含了 ECMAScript，也就是剥离了所有运行环境的 JavaScript **语言标准**本身。现在 ECMAScript 的发展速度非常惊人，几乎能够做到每年发展一个版本。

><span style="color: red; font-weight: bold;">提示</span>
ECMAScript 和 JavaScript 的关系是，前者是后者的规格，后者是前者的一种实现。
在日常场合，这两个词是可以互换的。更多背景知识可参考阮一峰的[《JavaScript语言的历史》](https://javascript.ruanyifeng.com/introduction/history.html#toc3)。

另一方面，浏览器端 JavaScript 还包括了：
* 浏览器对象模型（Browser Object Model，简称 BOM），也就是 **window**对象
* 文档对象模型（Document Object Model，简称 DOM），也就是 **document** 对象

而 Node.js 则是包括 V8 引擎。V8 是 Chrome 浏览器中的 JavaScript 引擎，经过多年的发展和优化，性能和安全性都已经达到了相当的高度。
而 Node.js 则进一步将 V8 引擎加工成可以在任何操作系统中运行 JavaScript 的平台。

## 运行 Node 代码

运行 Node 代码通常有两种方式：
* 在 REPL 中交互式输入和运行；
* 将代码写入 JS 文件，并用 Node 执行.

><span style="color: red; font-weight: bold;">提示</span>
REPL 的全称是 Read Eval Print Loop（读取-执行-输出-循环），通常可以理解为**交互式解释器**，你可以输入任何表达式或语句，然后就会立刻执行并返回结果。如果你用过 Python 的 REPL 一定会觉得很熟悉。

### 使用 REPL 快速体验
如果你已经安装好了 Node，那么运行以下命令就可以输出 Node.js 的版本：

```js
$ node -v
v12.10.0
```

然后，我们还可以进入 Node REPL（直接输入 `node`），然后输入任何合法的 JavaScript 表达式或语句：

```js
$ node
Type ".help" for more information.
> 1 + 2
3
> var x = 10;
undefined
> x + 20
30
> console.log('Hello World');
Hello World
undefined
```

有些行的开头是 `>`，代表输入提示符，因此 > 后面的都是我们要输入的命令，其他行则是表达式的返回值或标准输出（Standard Output，stdout）。运行的效果如下：

### 编写 Node 脚本
REPL 通常用来进行一些代码的试验。在搭建具体应用时，更多的还是创建 Node 文件。我们先创建一个最简单的 Node.js 脚本文件，叫做 timer.js，代码如下：

```js
console.log('Hello World!');
```

然后用 Node 解释器执行这个文件：

```js
$ node timer.js
Hello World!
```

看上去非常平淡无奇，但是这一行代码却凝聚了 Node.js 团队背后的心血。我们来对比一下，在浏览器和 Node 环境中执行这行代码有什么区别：

* 在浏览器运行 console.log 调用了 BOM，实际上执行的是 window.console.log('Hello World!')
* Node 首先在所处的操作系统中创建一个新的进程，然后向标准输出打印了指定的字符串， 实际上执行的是 process.stdout.write('Hello World!\n')

简而言之，Node 为我们提供了一个无需依赖浏览器、能够直接与操作系统进行交互的 JavaScript 代码运行环境！

## Node 全局对象初探

如果你有过编写 JavaScript 的经验，那么你一定对全局对象不陌生。在浏览器中，我们有 `document` 和 `window` 等全局对象；而 Node 只包含 ECMAScript 和 V8，不包含 BOM 和 DOM，因此 Node 中不存在 document 和 window；取而代之，Node 专属的全局对象是 `process`。在这一节中，我们将初步探索一番 Node 全局对象。

#### JavaScript 全局对象的分类

在此之前，我们先看一下 JavaScript 各个运行环境的全局对象的比较，如下图所示：

![各环境下的全局对象](./img/difference1.png)

可以看到 JavaScript 全局对象可以分为四类：

1. 浏览器专属，例如 `window`、`alert` 等等；
2. Node 专属，例如 `process`、`Buffer`、`__dirname`、`__filename` 等等；
3. 浏览器和 Node 共有，但是实现方式不同，例如 `console`（第一节中已提到）、`setTimeout`、`setInterval` 等；
4. 浏览器和 Node 共有，并且属于<span style="font-weight: bold; color: red;"> ECMAScript 语言定义</span>的一部分，例如 `Date`、`String`、`Promise` 等；

#### Node 专属全局对象解析

##### `process`

process 全局对象可以说是 Node.js 的灵魂，它是管理当前 Node.js 进程状态的对象，提供了与操作系统的简单接口。

首先我们探索一下 `process` 对象的重要属性。打开 Node REPL，然后我们查看一下 `process` 对象的一些属性：

* pid：进程编号
* env：系统环境变量
* argv：命令行执行此脚本时的输入参数
* platform：当前操作系统的平台

```js
$ node
Type ".help" for more information.
> process.pid
22143
> process.platform
'darwin'
> process.argv
[ '/usr/local/bin/node' ]
```

##### `__filename` 和 `__dirname`

分别代表当前所运行 Node 脚本的文件路径和所在目录路径。

>警告
`__filename` 和 `__dirname` 只能在 Node 脚本文件中使用，在 REPL 中是没有定义的。

##### `Buffer`
Buffer 全局对象让 JavaScript 也能够轻松地处理二进制数据流，结合 Node 的流接口（Stream），能够实现高效的二进制文件处理。

#### 使用 Node 全局对象

接下来我们将在刚才写的脚本文件中使用 Node 全局对象，分别涵盖上面的三类：

* Node 专属：process
* 实现方式不同的共有全局对象：console 和 setTimeout
* ECMAScript 语言定义的全局对象：Date

代码如下：
```js
setTimeout(() => {
  console.log('Hello World!');
}, 3000);

console.log('当前进程 ID', process.pid);
console.log('当前脚本路径', __filename);

const time = new Date();
console.log('当前时间', time.toLocaleString());
```

运行以上脚本，在我机器上的输出如下（Hello World! 会延迟三秒输出）：

```html
当前进程 ID 23292

当前脚本路径 /Users/zhangshidong/Documents/myProject/personalSummary/node/src/timer.js

当前时间 2020-4-7 15:30:45

Hello World!
```

从上面的代码中也可以一瞥 Node.js 异步的魅力：在 setTimeout 等待的 3 秒内，程序并没有阻塞，而是继续向下执行，这就是 Node.js 的异步非阻塞！

>提示
在实际的应用环境中，往往有很多 I/O 操作（例如网络请求、数据库查询等等）需要耗费相当多的时间，而 Node.js 能够在等待的同时继续处理新的请求，大大提高了系统的吞吐率。

## 理解 Node 模块机制
Node.js 相比之前的浏览器 JavaScript 的另一个重点改变就是：模块机制的引入。这一节内容很长，但却是入门 Node.js 最为关键的一步，加油吧💪！

### JavaScript 的模块化之路
Eric Raymond 在《UNIX编程艺术》中定义了模块性（Modularity）的规则：

> 开发人员应使用通过定义明确的接口连接的简单零件来构建程序，因此问题是局部的，可以在将来的版本中替换程序的某些部分以支持新功能。该规则旨在节省调试复杂、冗长且不可读的复杂代码的时间。

“分而治之”的思想在计算机的世界非常普遍，但是在 ES2015 标准出现以前， JavaScript 语言定义本身并没有模块化的机制，构建复杂应用也没有统一的接口标准。人们通常使用一系列的 `<script>` 标签来导入相应的模块（依赖）:

```html
<head>
  <script src="fileA.js"></script>
  <script src="fileB.js"></script>
</head>
```
这种组织 JS 代码的方式有很多问题，其中最显著的包括：

* 导入的多个 JS 文件直接作用于全局命名空间，很容易产生命名冲突
* 导入的 JS 文件之间不能相互访问，例如 fileB.js 中无法访问 fileA.js 中的内容，很不方便
* 导入的 `<script>` 无法被轻易去除或修改

人们渐渐认识到了 JavaScript 模块化机制的缺失带来的问题，于是两大模块化规范被提出：

1. AMD（Asynchronous Module Definition）规范，在浏览器中使用较为普遍，最经典的实现包括 RequireJS；
2. CommonJS 规范，致力于为 JavaScript 生态圈提供统一的接口 API，Node.js 所实现的正是这一模块标准。

>提示
ECMAScript 2015（也就是大家常说的 ES6）标准为 JavaScript 语言引入了全新的模块机制（称为 ES 模块，全称 ECMAScript Modules），并提供了 import 和 export 关键词。但是截止目前，Node.js 对 ES 模块的支持还处于试验阶段，不提倡使用。

### 什么是 Node 模块
在正式分析 Node 模块机制之前，我们需要明确定义什么是 Node 模块。通常来说，Node 模块可分为两大类：

* 核心模块：Node 提供的内置模块，在安装 Node 时已经被编译成二进制可执行文件
* 文件模块：用户编写的模块，可以是自己写的，也可以是通过 npm 安装。

其中，文件模块可以是一个单独的文件（以 .js、.node 或 .json 结尾），或者是一个目录。当这个模块是一个目录时，模块名就是目录名，有两种情况：

1. 目录中有一个 package.json 文件，则这个 Node 模块的入口就是其中 main 字段指向的文件；
2. 目录中有一个名为 index 的文件，扩展名为 .js、.node 或 .json，此文件则为模块入口文件。

### Node 模块机制浅析

知道了 Node 模块的具体定义后，我们来了解一下 Node 具体是怎样实现模块机制的。具体而言，Node 引入了三个新的全局对象（还是 Node 专属）：1）`require`；2） `exports` 和 3）`module`。下面我们逐一讲解。

#### require

require 用于导入其他 Node 模块，其参数接受一个字符串代表模块的`名称或路径`，通常被称为模块标识符。具体有以下三种形式：

* 直接写模块名称，通常是核心模块或第三方文件模块，例如 os、express 等
* 模块的相对路径，指向项目中其他 Node 模块，例如 ./utils
* 模块的绝对路径（不推荐！），例如 /home/xxx/MyProject/utils

>提示
在通过路径导入模块时，通常省略文件名中的 .js 后缀。

代码示例如下：

```js
// 导入内置库或第三方模块
const os = require('os');
const express = require('express');

// 通过相对路径导入其他模块
const utils = require('./utils');

// 通过绝对路径导入其他模块
const utils = require('/home/xxx/MyProject/utils');
```

你也许会好奇，通过名称导入 Node 模块的时候（例如 express），是从哪里找到这个模块的？实际上每个模块都有个路径搜索列表 `module.paths`，在后面讲解 `module` 对象的时候就会一清二楚了。

#### exports

我们已经学会了用 require 导入其他模块中的内容，那么怎么写一个 Node 模块，并导出其中内容呢？答案就是用 `exports` 对象。

例如我们写一个 Node 模块 myModule.js：

```js
// myModule.js
function add(a, b) {
  return a + b;
}

// 导出函数 add
exports.add = add;
```

通过将 add 函数添加到 exports 对象中，外面的模块就可以通过以下代码使用这个函数。在 myModule.js 旁边创建一个 main.js，代码如下：

```js
// main.js
const myModule = require('./myModule');

// 调用 myModule.js 中的 add 函数
myModule.add(1, 2);
```

>提示
如果你熟悉 ECMAScript 6 中的解构赋值[7]，那么可以用更优雅的方式获取 add 函数：
const { add } = require('./myModule');






