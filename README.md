<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> [English](./README.en-US.md) | 简体中文

<h1 align="center">
<b>G2</b>
</h1>

<div align="center">

一套面向常规统计图表，以数据驱动的高交互可视化图形语法。

[![](https://img.shields.io/travis/antvis/g2.svg)](https://travis-ci.org/antvis/g2) ![CI](https://github.com/antvis/G2/workflows/CI/badge.svg) [![Coverage Status](https://coveralls.io/repos/github/antvis/G2/badge.svg?branch=master)](https://coveralls.io/github/antvis/G2?branch=master) [![NPM Package](https://img.shields.io/npm/v/@antv/g2.svg)](https://www.npmjs.com/package/@antv/g2) [![NPM Downloads](http://img.shields.io/npm/dm/@antv/g2.svg)](https://npmjs.org/package/@antv/g2) ![Dependencies](https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg) [![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/g2.svg)](http://isitmaintained.com/project/antvis/g2 'Percentage of issues still open') [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=shields)](https://github.com/antvis/g2/pulls)

![](https://img.shields.io/badge/language-TypeScript-red.svg) ![](https://img.shields.io/badge/license-MIT-000000.svg)

[![](https://img.shields.io/twitter/follow/AntV_Alipay.svg?label=AntV&style=social)](https://twitter.com/AntV_Alipay)

</div>

<p align="center">
  <a href="https://g2.antv.vision/zh">网站</a> •
  <a href="https://g2.antv.vision/zh/docs/manual/about-g2">教程文档</a> •
  <a href="https://www.yuque.com/antv">博客</a> •
  <a href="https://github.com/antvis/G2Plot">G2Plot</a>
</p>

G2 是一套基于图形语法理论的可视化底层引擎，以数据驱动，提供图形语法与交互语法，具有高度的易用性和扩展性。使用 G2，你可以无需关注图表各种繁琐的实现细节，一条语句即可使用 Canvas 或 SVG 构建出各种各样的可交互的统计图表。

## 📺 线上示例

<a href="https://g2.antv.vision/zh/examples/gallery"><img src="https://user-images.githubusercontent.com/6628666/75466330-fe1d0c00-59c4-11ea-91ba-506f60ef8af4.png" style='width: 100%'/></a>

## ✨ 特性

- 💯 完善的图形语法：数据到图形的映射，能够绘制出所有的图表。
- 🤩 全新的交互语法：通过触发和反馈机制可以组合出各种交互行为，对数据进行探索。
- 🦍 强大的 View 模块：可支持开发个性化的数据多维分析图形。
- 👬 双引擎渲染：Canvas 或 SVG 任意切换。
- 💄 可视化组件体系：面向交互、体验优雅。
- 🛡 全面拥抱 TypeScript：提供完整的类型定义文件。

## 📦 安装

```bash
$ npm install @antv/g2
```

## 🔨 快速上手

<img src="https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*8qbLQb7A0loAAAAAAAAAAABkARQnAQ" style="width: 600px">

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

## 🏷️ 版本

- v3.5.x: https://github.com/antvis/G2/tree/v3.5.x
- v4.0.x: https://github.com/antvis/G2/tree/v4.0.x

> 你也可以在业务中使用基于 G2 封装的常规统计图表 **[G2Plot](https://github.com/antvis/G2Plot)**，可以使用配置的方式快速生成一个通用图表，降低开发者的使用成本。

## 🤝 如何贡献

如果您在使用的过程中碰到问题，可以先通过 [issues](https://github.com/antvis/g2/issues) 看看有没有类似的 bug 或者建议。

如需提交代码，请遵从我们的[贡献指南](https://github.com/antvis/g2/blob/master/CONTRIBUTING.md)。

<a href="https://issuehunt.io/r/antvis/G2" rel="nofollow" target="_blank"><img src="https://camo.githubusercontent.com/fcf6ed4dcbd95ccadfe62647fc93194b7262c862de38406e5dae68aa682c85c3/68747470733a2f2f697373756568756e742e696f2f7374617469632f656d6265642f697373756568756e742d627574746f6e2d76312e737667" alt="Let's fund issues in this repository" data-canonical-src="https://issuehunt.io/static/embed/issuehunt-button-v1.svg" style="max-width:100%;"></a>

## 联系我们

钉钉群组号码: 30233731 / 35686967 (2 群) / 44788198 （3 群）

<img src="https://gw.alipayobjects.com/zos/antfincdn/hTzzaqgHgQ/Antv%252520G2%252520%26%252520G2Plot.png" width="200" height="266" />
