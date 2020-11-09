---
title: G2 简介
order: 0
redirect_from:
  - /zh/docs/manual
---

G2 是一套基于图形语法理论的可视化底层引擎，以数据驱动，提供图形语法与交互语法，具有高度的易用性和扩展性。使用 G2，你可以无需关注图表各种繁琐的实现细节，一条语句即可使用 Canvas 或 SVG 构建出各种各样的可交互的统计图表。

## 📺 线上示例

<a href="https://g2.antv.vision/zh/examples/gallery"><img src="https://user-images.githubusercontent.com/6628666/75466330-fe1d0c00-59c4-11ea-91ba-506f60ef8af4.png" style="width:100%;"></a>

## ✨ 特性

- 💯 完善的图形语法：数据到图形的映射，能够绘制出所有的图表。
- 🤩 全新的交互语法：通过触发和反馈机制可以组合出各种交互行为，对数据进行探索。
- 🦍 强大的 View 模块：可支持开发个性化的数据多维分析图形。
- 👬 双引擎渲染：Canvas 或 SVG 任意切换。
- 💄 可视化组件体系：面向交互、体验优雅。
- 🛡 全面拥抱 TypeScript：提供完整的类型定义文件。

## 📦 安装

```bash
npm install @antv/g2
```

## 🔨 快速上手

<img src="https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*8qbLQb7A0loAAAAAAAAAAABkARQnAQ" style="width:600px;" />

在绘图前我们需要为 G2 准备一个 DOM 容器：

```html
<div id="c1"></div>
```

```ts
import { Chart } from '@antv/g2';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

// Step 1: 创建 Chart 对象
const chart = new Chart({
  container: 'c1', // 指定图表容器 ID
  width: 600, // 指定图表宽度
  height: 300, // 指定图表高度
});

// Step 2: 载入数据源
chart.data(data);

// Step 3: 创建图形语法，绘制柱状图
chart.interval().position('genre*sold');

// Step 4: 渲染图表
chart.render();
```

## ⌨️ 本地开发

```bash
# 安装依赖
$ npm install

# 运行测试用例
$ npm run test

# 打开 electron 运行测试用例，监听文件变化构建
$ npm run test-live

# 运行 CI
$ npm run ci

# 运行网站
$ npm start
```

## ⭐ 图形语法

G2 的强大是由其背后的一套图形语法所支撑的，它基于[《The Grammar of Graphics》](https://book.douban.com/subject/10123863/)(Leland Wilkinson 著)一书，是一套用来描述所有统计图表深层特性的语法规则，该语法回答了『什么是统计图表』这一问题，以自底向上的方式组织最基本的元素形成更高级的元素。

![image.png](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*PDXtQYx4gAYAAAAAAAAAAABkARQnAQ)

由此，G2 所构建出的图表是由一系列独立的图形语法元素组合而成的，包括数据、图形属性、几何标记、度量、坐标系、可视化组件、分面等。
所以，在 G2 中，我们通常这么描述一张图表：一张图表就是从数据到几何标记对象的图形属性的一个映射，此外图形中还可能包含数据的统计变换，最后绘制在某个特定的坐标系中。

查看 [图形语法](./concepts/grammar-of-graphics) 获取更多信息。

## 👋 交互语法

G2 的图形语法本质上是将数据映射到图形的过程拆解成为一个个最基本的元素，然后通过组合搭配产生千变万化的图表。交互语法也是一样，我们将一个交互进行拆解，然后再组合以形成一个完整的交互行为。
在 G2 中，我们认为一个**交互行为**是由一系列**交互环节**组成，而每一个交互环节又由以下两部分组成：

1. **触发**，交互环节的触发，包括触发对象和触发事件
2. **反馈**，交互环节的结果

查看 [交互语法](./concepts-overview#交互语法) 获取更多信息。

## 🔍 G2 文档

我们建议初次使用 G2 的用户跟随教程中的“快速上手”创建出自己的第一个 G2 图表。教程部分包含可视化基础教程及高级教程，供用户按需阅读。
有经验的用户可以查看 API 文档探索更多功能，做出更加复杂的图表。

## 🤝 如何贡献

如果您在使用的过程中碰到问题，可以先通过 [issues](https://github.com/antvis/g2/issues) 看看有没有类似的 bug 或者建议。

如需提交代码，请遵从我们的 [贡献指南](https://github.com/antvis/g2/blob/master/CONTRIBUTING.md)。
