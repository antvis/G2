---
title: G2 演进史
order: 0
---

## 简介

G2 自 2014 年以来已经发展到 4.0，回顾过去，我们发现每一个版本都是一笔记忆，当我们对每个版本的架构进行梳理，分析每个版本背后的思考时，这些记忆就转换成了财富，我从下面这些阶段谈起：

- G2 之前的图表
- v0.1 - v1.0 成型
- G2 v2.0 完善图形语法
- G2 v3.0 通用场景的支持
- G2 v4.0 交互语法和多维分析

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*LAbKQ6SHtTQAAAAAAAAAAABkARQnAQ">

## G2 之前的图表

在 2014 年上半年，由于业务上的要求，我参考了苹果在 keynote 和 numbers 的设计风格，实现了一套常见图表的图表库 Acharts，在配置项上参考了 highcharts ，实现了十几种图表，能够满足常见的数据展示需求：

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*gtUlTKfmFNoAAAAAAAAAAABkARQnAQ">

这个图表库在架构上非常简单，底层基于 Rapheal.js，兼容当时所有的浏览器，在公司内部的一些系统上得到了使用，整体思路还是按照做前端组件库的思路，一个个图表的进行开发，在动画、交互、渲染方面进行独立的优化。

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*NLreT4bvVRIAAAAAAAAAAABkARQnAQ">

这个版本开发了大概半年多，遇到了一些问题：

- 没有专业设计师的支持，交互和设计都是参考的其他图表库。
- 图表的扩展比较麻烦，每个图表都有各自的实现。
- 做完常见图表后不知道下一步该做什么。

当时也是 R 语言的 ggplot2 大火的年代，数据分析同图表结合真的让人打开眼界，我去读了 ggplot2 背后的 《The Grammar Of Graphics》，结合当时内部的一些数据分析业务，想能否做一套同 ggplot2 相同定位的 web 端的可视化分析工具，这就有了 G2 这个项目。

## v0.1-v1.0 成型

G2 是在 2014 年 9 月份正式开始设计和开发，一个月后开发出第一个版本 v0.1，完全仿照 GPL (IBM SPASS 的绘图引擎)进行了 javascript 的改写, 语法完全基于函数：

```javascript
var A = G2.Attr;
chart.line(A.position('x*y'), A.color.hue('z'));
chart.render();
```

通过这些工作图形语法在前端的可行性得到验证，接下来三个月我在 G2 中支持了统计函数、数据列处理（参考 R 语言的 DataFrame)，秉持着 “一句话一个图表的理念”，疯狂的进入编码阶段，实现了折柱饼、直方图、色块热力图、k 线图 等常见的图表，于 2015 年 3 月份正式发布了 v1.0 版本。G2 的 v1.x 版本包含三个版本：v1.0、v1.1 和 v1.2，这三个版本的架构并没有发生变化，核心部分是完成 `数据到图形的映射` ，一直到现在正在开发的 G2 4.0 版本这些模块都很稳定。

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*jxGbToxJz2IAAAAAAAAAAABkARQnAQ">

模块的说明：

- 最底层是绘图引擎 G，实现了图形的绘制和拾取
- 中间是完成可视化语法的一些模块
  - Scale、Coord、Attr（视觉通道）、Adjust（数据调整） 用于实现数据到图形的映射
  - 组件和自定 Shape 完成图表的绘制
  - 统计模块，包含汇总、回归、平滑和关系计算，用于实现一些统计相关的图表
- 最上层只有 Chart （图表的入口）和 抽象的几种几何标记

如果你有过使用 G2 的经验，发现 G2 1.0 已经具备了 G2 的 核心功能，创建一个图表的过程主要有三步：

- 设置数据
- 图形映射语法，包括统计函数
- 渲染

```javascript
chart.source(data);
chart.point().position('carat*price').color('clarity');
chart.render();
```

在此基础上配合统计语法，可以绘制出所有常见的图表：

```javascript
//直方图
chart.interval().position(Stat.summary.count(Stat.bin.rect('depth')));
//六边形热力图
chart.polygon().position(Stat.bin.hex('carat*price')).color(Stat.summary.count());
```

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*hevdQZa81f4AAAAAAAAAAABkARQnAQ" style="width: 250px;">
<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*x2v1TYVSVqIAAAAAAAAAAABkARQnAQ" style="width: 250px;">

1.x 版本并没有开源，迭代了 3 个小版本，这个版本同样开发了 1 年的时间，仅在蚂蚁和阿里内部 10 几个系统上使用，这些系统都有以下特点：

- 都是数据产品，对图表的 UI 细节要求不高，用户大都是数据分析人员
- 数据粒度比较细，需要前端进行简单的统计展示

`一个工具一旦诞生，就会应用到你意想不到的领域，工具开发者的也会人为创造需求以图活下来的动力，所以接下来 G2 做了更多，不知何时就偏离了初始的方向`。

## v2.0 完善图形语法

v2.0 版本是在 2016 年 3 月正式发布的，这个版本依然秉持着 `一句话一张图表` 的理念，野心更大的想绘制出所有见过的图表。所以在 2.x 版本，我们做了下面的工作：

- 增加了大量的统计函数，包括：各种归回算法、密度函数计算
- 支持了 treemap、关系图 和 地图
- 支持多 View，增加分面机制，支持多维数据的展示
- 重构了底层的绘图引擎 G ，将 3 层 Canvas 结果改成 1 层，提升了渲染、交互性能

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*E3n9SJh-eXMAAAAAAAAAAABkARQnAQ">

从架构图上来看 G2 v2.0 和 G2 v1.0 是一个兼容的版本，仅增加了 View 和 分面的支持，但是基本所有模块都进行了重构，这些模块一直到稳定到现在。G2 v2.x 从 2016 年 3 月 到 2017 年 11 月发展了 4 个版本，在阿里集团内部的系统数增长到 400+，这时候使用的场景已经多样化，用户对图表的设计、易用性、组件细节都有了大量的要求，同一时期 Echarts 已经非常完备，我们开始在组件、交互、图表的细节展示等多方面进行改造，同 G2 定位于 ”数据分析的图形语法“ 的方向越来越不一致。这期间我们也做了在后来看来使用不多的一些功能，这些需求并非来自真实的需求，而是受 ggplot2 的影响，以为我们的业务可以用得到，例如：

- 等高线、关系图
- 线性/非线性回归、密度函数

```javascript
// 绘制等高线
chart.contour().position(Stat.smooth.loess.triangular('l*g*Altitude', 0.01)).color('Altitude', 'hue').size(3);
// 密度函数生成热力图
chart.heatmap().position(Stat.smooth.loess.gaussian('g*l*tmp', 0.03)).color('tmp', '#233284-#FCE89A-#8A1D25');
```

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*WsZLSrmCRcUAAAAAAAAAAABkARQnAQ" style="width: 250px;">
<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*JcnbTqVLz4QAAAAAAAAAAABkARQnAQ" style="width: 250px;">

可以看到在 G2 2.x 中一些图标的绘制需要使用各种统计函数，从理论上说你可以通过 坐标系*度量*几何标记\*统计函数 生成无数的图表，但是具体在业务上的价值那就在这里讨论，看看这些图表有什么应用场景：

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*jE6TQZNsM1UAAAAAAAAAAABkARQnAQ" style="width: 250px;">
<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*kx6rRadE2ZYAAAAAAAAAAABkARQnAQ" style="width: 250px;">

> 仔细想来这些功能并非没有应用场景，而是我们自己做的并不够专业，细节实现的并不好，也没有进行步道，真所谓努力了好久，没有得到什么掌声。

## v3.0 通用场景的支持

时间到了 2017 年中，随着 v2.x 的用户越来越多，非数据分析的场景越来越多，来自用户的诉求并不是支持多少图表，而是对一些图表特性的要求：

- 组件应该支持 xx 功能
- 文本遮挡问题，图表自适应问题
- 移动端问题

同时 2.x 的一些问题也暴露出来，统计语法对于非数据背景的开发人员来说过于晦涩，图形语法与一些具体图表的特殊化代码（柱状图的起始点从 0 开始，饼图只有一个传入 position 的字段等）的无法正交。当时 vega 初步在社区上出现，我们参考 vega 的 transform 将统计和布局模块从 G2 中移出，放入了 DataSet 模块中。个性化的交互也要求越来越多，所以 G2 3.0 从开始就调整了方向：

- 对各种图表组件进行细化，提供更多的配置项，开放了更多的概念
- 设计师团队的加入，对图表、组件和交互进行了大量的设计
- 数据统计和布局外置，从 d3 等库引入更多的布局算法
- 增加图表绘制和文本上的配置项，不同的图表支持不同文本防遮挡算法
- 交互允许自定义，增加了 interaction 机制

从 G2 3.0 的架构图，我们可以清晰的看到架构上的调整，这个版本最大的变化就是 `面向一般图表展示场景的易用性` 。

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*scnbQrDvfYYAAAAAAAAAAABkARQnAQ">

G2 3.0 于 2017 年 11 月 22 正式发布，整个项目周期迭代了 2 年，这个版本有 6 个迭代，前两个迭代依然在图表覆盖范围的增强，支持了一些新的图表类型：

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*UFEESoLy9SwAAAAAAAAAAABkARQnAQ">

中间的两个版本设计师对基础图表进行了大量优化，推出了一些经典案例：

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*X9WnSIYCxjcAAAAAAAAAAABkARQnAQ">

G2 3.x 版本贯穿了 2 年 6 个版本，内外部系统的使用量超过 20000 个，从一个面向数据分析的图形语法，转变为支持通用场景的图表库，我们投入了大量的开发和设计资源。在发展壮大的同时，我们遇到了一些问题：

- 技术上的包袱越来越重，G2 变得越来越臃肿，越来越平庸
- typescript 和 react 的兴起，我们的前端架构已经陈旧，架构需要调整
- 无法对每种图表进行细化，单个图表的体验做不到最好
- 面对重的分析场景力不从心

## V4.0 交互语法和多维分析

2018 年 10 月份我们开始了 v4.0 的设计，这个版本的背景是当前的版本不满足重的 BI 场景的需求，在异常数据展示，交互细节等方面被业务方诟病已久。技术层面整个技术栈迁移到 typescript，所有的模块全面重构，团队方面有了更多新人的加入，但是这个版本并没有发布，降级成为 v3.6 版本，新的 v4.0 版本于 2019-8 月份重启，2019-11-22 发布 alpha 版，12 月 30 日 发布 beta 版，2020 年 2 月底发布正式版。G2 v4.0 的定位发生变化：

- 商业 BI 产品的绘图引擎
- 图表库的制作工具
- 可视化学术界的可视化工具

所以 G2 v4.0 版主要做了下面的几件事情：

- 底层绘图引擎和组件层全面升级，提升渲染性能和组件的自适应性
- 重新分层，G2 上层提供独立的图表库 G2-Plot，降低 G2 本身的包袱
- G2 同 F2 重新融合，F2 可以通过 G2 打包产出，G2 同时支持移动端
- 支持交互语法，可以自由拼装出所有交互

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*FVf3SJg5FyAAAAAAAAAAAABkARQnAQ">

G2 的最终形态一定是多种语法的组合：

- 图形语法：数据到图形的映射，能够绘制出所有的图表
- 交互语法：可以组合出各种交互，对数据进行探索
- 统计语法：对数据进行聚合、归回、拟合等计算，帮助用户从不同层面认知数据
- 动画语法：让数据栩栩如生、交互顺滑

所以在 G2 4.0 正式版发布后，我们会继续对改进 G2，可能在未来 2-3 年都是 v4.x 的时代，最终的架构如下：!

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*AXGOTZ2GATAAAAAAAAAAAABkARQnAQ">

## 总结

过去 5 年 G2 重构了数十次，有一些模块如数据映射模块始终稳定，有些模块如组件模块一直差强人意，有些模块如动画模块、交互模块总不能让人满意，但是我们一直坚持改进着，向着我们做出一套世界级的可视化工具的梦想前进着，可能会是 5 年 10 年，梦想总是有的，一定可以实现！
