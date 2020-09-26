---
title: G2
order: 0
redirect_from:
  - /en/docs/manual
---

<div align="center">

A highly interactive data-driven visualization grammar for statistical charts.

![language: typescript](https://img.shields.io/badge/language-TypeScript-red.svg) ![license: MIT](https://img.shields.io/badge/license-MIT-000000.svg)

[![twitter: AntV_Alipay](https://img.shields.io/twitter/follow/AntV_Alipay.svg?label=AntV&style=social)](https://twitter.com/AntV_Alipay)

</div>

<p align="center">
  <a href="https://g2.antv.vision/en">Website</a> •
  <a href="https://g2.antv.vision/en/docs/manual/about-g2">Tutorial Docs</a> •
  <a href="https://www.yuque.com/antv">Blog</a>
</p>

G2 is a visualization grammar, a data-driven visual language with a high level of usability and scalability. It provides a set of grammars, takes users beyond a limited set of charts to an almost unlimited world of graphical forms. With G2, you can describe the visual appearance and interactive behavior of a visualization just by one statement, and generate web-based views using Canvas or SVG.

## 📺 Live Demos

<a href="https://g2.antv.vision/en/examples/gallery"><img alt="gallery" src="https://user-images.githubusercontent.com/6628666/75466330-fe1d0c00-59c4-11ea-91ba-506f60ef8af4.png" style='width: 100%'/></a>

## ✨ Features

- 💯Stable grammar of graphics: enable to draw all kinds of charts by mapping data to graphics.
- 🤩New grammar of interaction: interaction behaviors combined with Trigger and Action mechanisms are used to exploring data.
- 🦍Advanced View module: with the ability to develop customized multi-dimension data analysis graphics.
- 👬Dual-engine rendering: with the ability to switch Canvas and SVG freely.
- 💄Visual components: interaction-oriented, elegant experience.
- 🛡Fully embrace Typescript: Complete type definition files are provided.

## 📦 Installation

```bash
npm install @antv/g2
```

## 🔨 Getting Started

<img alt="column chart" src="https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*8qbLQb7A0loAAAAAAAAAAABkARQnAQ" style="width:600px;">

Before drawing, we need to prepare a DOM container for G2:

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

// Step 1: Create a Chart object
const chart = new Chart({
  container: 'c1', // specify the chart container ID
  width: 600, // specify the chart width
  height: 300, // specify the chart height
});

// Step 2: Load the data.
chart.data(data);

// Step 3: Declare the grammar of graphics and draw a column chart.
chart.interval().position('genre*sold');

// Step 4: Render chart.
chart.render();
```

## ⌨️ Development

```bash
# Install dependencies
$ npm install

# Run test cases
$ npm run test

# Open electron to run the test cases and listen to file changes
$ npm run test-live

# Run CI
$ npm run ci

# Run website
$ npm start
```

## 🏷️ Releases

- v3.5.x: https://github.com/antvis/G2/tree/v3.5.x
- v3.6.x: https://github.com/antvis/G2/tree/v3.6.x
- v4.0.x: https://github.com/antvis/G2/tree/v4.0.x

## 🤝 How to Contribute

Please let us know how can we help. Do check out [issues](https://github.com/antvis/g2/issues) for bug reports or suggestions first.

To become a contributor, please follow our [contributing guide](https://github.com/antvis/g2/blob/master/CONTRIBUTING.md).
