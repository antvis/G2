<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> [English](./README.en-US.md) | 简体中文

<h1 align="center">
<b>G2 5.0</b>
</h1>

<div align="center">

G2 是一个可视化语法，用于报表搭建、数据探索和可视化叙事。

[![Build Status](https://github.com/antvis/g2/workflows/build/badge.svg?branch=v5)](https://github.com/antvis//actions)
[![Coverage Status](https://img.shields.io/coveralls/github/antvis/g2/v5.svg)](https://coveralls.io/github/antvis/g2?branch=v5)
[![npm Version](https://img.shields.io/npm/v/@antv/g2.svg)](https://www.npmjs.com/package/@antv/g2)
[![npm Download](https://img.shields.io/npm/dm/@antv/g2.svg)](https://www.npmjs.com/package/@antv/g2)
[![npm License](https://img.shields.io/npm/l/@antv/g2.svg)](https://www.npmjs.com/package/@antv/g2)

![examples](https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*o4YET5i12oMAAAAAAAAAAAAAARQnAQ)

</div>

> G2 5.0 仍在开发中，4.x 稳定版在 [master](https://github.com/antvis/G2/tree/master) 分支上.

G2 的名字来自于 Wilkinson 的《Grammar of Graphics》，并在功能和 API 设计上深受它的启发。这里有一些资源可以帮助你开始使用它：

- [介绍](http://g2-next.antv.vision/introduction)：概述和开发动机
- [案例](http://g2-next.antv.vision/examples)：大量可供学习和复制粘贴的案例
- [教程](http://g2-next.antv.vision/tutorials)：交互式案例驱动的教程，帮助你了解核心概念
- [API](http://g2-next.antv.vision/basic)：所有可视化组件的完整文档

## ✨ 特色

- **渐进式使用**：可以通过简明的声明，快速获得有意义的可视化图表，G2 会在内部会做出合理的推断。但是针对复杂和高级的场景，仍然可以添加更多的配置去满足你的需求。
- **声明式 API**：我们采用了函数式的声明式 API，可以通过更具编程风格的方式指定图表配置，这有助于更好地重用逻辑和更灵活地组织代码。
- **高可扩展性**：为了满足各种特定需求，G2 提供了一个方便和一致的机制来扩展你能想象到的一切，无论是一个比例尺，一个变换还是一个视觉元素，等等。你甚至可以基于这个机制定制一个全新的可视化工具。
- **全面的语法**：和传统可视化工具不同，G2 中没有图表的概念，而是通过组合视觉元素、变换、比例尺、坐标系变换和视图复合来获得图表。除了静态可视化之外，还支持制作由数据驱动的可视化动画，并且提供了一套精心设计的基于 Action 的交互语法。
- **强大的渲染引擎**：在 G2 底层有一个强大的渲染器 [G](https://github.com/antvis/G)，可用使用 Canvas、SVG 以及 WebGL 生成基于网页的可视化。同时 G 提供了大量的插件，使得 G2 能够绘制拥有新颖风格的图表（比如手绘风格）并且可以并完全拥抱 [D3](https://github.com/d3/d3) 的生态。

## 🔨 开始使用

可以通过 npm 或 Yarn 等包管理器来安装。

```bash
$ npm install @antv/g2
```

```bash
$ yarn add @antv/g2
```

成功安装之后，可以通过 import 导入 Chart 对象。

```html
<div id="chart"></div>
```

```js
import { Chart } from '@antv/g2';

// 将要可视化的表格数据
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

// 实例化图表并且指定容器的 id
const chart = new Chart({
  container: 'chart',
});

// 声明可视化
chart
  .interval() // 创建一个 Interval 的视觉元素，并且添加到图表中
  .data(data) // 给这个视觉元素绑定数据
  .encode('x', 'genre') // 将 genre 对应的列数据和 x 位置通道绑定
  .encode('y', 'sold'); // 将 sold 对应的列数据和 y 位置通道绑定

// 将可视化渲染进指定的容器
chart.render();
```

如果一切顺利，你可以得到下面的柱状图!

<img src="https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*NZmbQItc82oAAAAAAAAAAAAAARQnAQ" width="640" height="480">

## 📮 参与贡献

- [问题](https://github.com/antvis/g2/issues)： 报告 bug 或者提出需求
- [贡献指南](https://github.com/antvis/g2/blob/v5/CONTRIBUTING.en-US.md)：参与建设 G2
- [讨论](https://github.com/antvis/G2/discussions)：在 Github 上或者钉钉群里面讨论（30233731, 35686967, 44788198）

<img src="https://gw.alipayobjects.com/zos/antfincdn/hTzzaqgHgQ/Antv%252520G2%252520%26%252520G2Plot.png" width="200" height="266" />

## 📄 许可证

MIT@[AntV](https://github.com/antvis).
