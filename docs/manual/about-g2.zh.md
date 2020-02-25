---
title: G2 简介
order: 0
redirect_from:
  - /zh/docs/manual
---

<div><a href="https://travis-ci.org/antvis/g2" target="_self" rel="nofollow"><img style="width: auto;" src="https://img.shields.io/travis/antvis/g2.svg"></a> <img style="width: auto;" src="https://github.com/antvis/G2/workflows/CI/badge.svg" alt="CI"> <a href="https://coveralls.io/github/antvis/G2?branch=master" target="_self" rel="nofollow"><img style="width: auto;" src="https://coveralls.io/repos/github/antvis/G2/badge.svg?branch=master" alt="Coverage Status"></a> <a href="https://www.npmjs.com/package/@antv/g2" target="_self" rel="nofollow"><img style="width: auto;" src="https://img.shields.io/npm/v/@antv/g2.svg" alt="NPM Package"></a> <a href="https://npmjs.org/package/@antv/g2" target="_self" rel="nofollow"><im style="width: auto;"g src="http://img.shields.io/npm/dm/@antv/g2.svg" alt="NPM Downloads"></a> <img style="width: auto;" src="https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg" alt="Dependencies"> <a href="http://isitmaintained.com/project/antvis/g2" title="Percentage of issues still open" target="_self" rel="nofollow"><img style="width: auto;" src="http://isitmaintained.com/badge/open/antvis/g2.svg" alt="Percentage of issues still open"></a> <a href="https://github.com/antvis/g2/pulls" target="_self" rel="nofollow"><img style="width: auto;" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=shields" alt="PRs Welcome"></a></div>
<div><img style="width: auto;" src="https://img.shields.io/badge/language-TypeScript-red.svg"> <img style="width: auto;" src="https://img.shields.io/badge/license-MIT-000000.svg"></div>
<div><a href="https://twitter.com/AntV_Alipay" target="_self" rel="nofollow"><img style="width: auto;" src="https://img.shields.io/twitter/follow/AntV_Alipay.svg?label=AntV&amp;style=social"></a></div>

G2 是一套基于图形语法理论的可视化底层引擎，以数据驱动，提供图形语法与交互语法，具有高度的易用性和扩展性。使用 G2，你可以无需关注图表各种繁琐的实现细节，一条语句即可使用 Canvas 或 SVG 构建出各种各样的可交互的统计图表。

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

![image.png](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*8qbLQb7A0loAAAAAAAAAAABkARQnAQ)

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

// Step 3：创建图形语法，绘制柱状图
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

## 🤝 如何贡献

如果您在使用的过程中碰到问题，可以先通过 [issues](https://github.com/antvis/g2/issues) 看看有没有类似的 bug 或者建议。

如需提交代码，请遵从我们的[贡献指南](https://github.com/antvis/g2/blob/master/CONTRIBUTING.md)。
