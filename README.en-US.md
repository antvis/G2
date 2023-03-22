<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> English | [简体中文](./README.md)

<h1 align="center">
<b>G2 5.0</b>
</h1>

<div align="center">

G2 is a visualization grammar for dashboard building, data exploration and storytelling.

[![Build Status](https://github.com/antvis/g2/workflows/build/badge.svg?branch=v5)](https://github.com/antvis//actions)
[![Coverage Status](https://img.shields.io/coveralls/github/antvis/g2/v5.svg)](https://coveralls.io/github/antvis/g2?branch=v5)
[![npm Version](https://img.shields.io/npm/v/@antv/g2.svg)](https://www.npmjs.com/package/@antv/g2)
[![npm Download](https://img.shields.io/npm/dm/@antv/g2.svg)](https://www.npmjs.com/package/@antv/g2)
[![npm License](https://img.shields.io/npm/l/@antv/g2.svg)](https://www.npmjs.com/package/@antv/g2)

![examples](https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*o4YET5i12oMAAAAAAAAAAAAAARQnAQ)

</div>

> G2 5.0 is still work in progress, the stable release is on the [master](https://github.com/antvis/G2/tree/master) branch.

G2 is named after Leland Wilkinson’s book _The Grammar of Graphics_ and was profoundly inspired by it in the very beginning. Here are some resources you can begin with:

- [Introduction](http://g2-next.antv.vision/introduction) - a brief overview and G2's motivations
- [Examples](http://g2-next.antv.vision/examples) - a large number of demos to learn from and copy-paste
- [Tutorials](http://g2-next.antv.vision/tutorials) - interactive case-driven guides of G2's core concepts
- [API Reference](http://g2-next.antv.vision/basic) - complete documentation for all visualization components

## ✨ Features

- **Progressive Usage** - The main objective of G2 is to help you get meaningful visualizations quickly with concise declarations and it infers the rest. But you can configure much more for complex and advanced situations.
- **Declarative API** - We employs a functional declarative API to specify chart options in a programmatic fashion, which contributes to better logic reuse and more flexible code organization.
- **High Extensibility** - To satisfy specific needs, G2 provides a convenient and consistent mechanism to extend everything you can imagine, whether a scale, a transform, a mark, etc,. You can even customize a brand new visualization tool based on this mechanism.
- **Comprehensive Grammar** - G2 rejects a chart typology in favor of marks, transforms, scales, coordinates, and compositions. In addition to static visual representations, it's possible to declare data-driven animations and apply well-designed action-based interactions to plots as well.
- **Powerful Renderer** - There is a powerful renderer [G](https://github.com/antvis/G) under G2 to generate web-based visualizations using Canvas, SVG or WebGL. The plenty of plugins it has benefit G2 from rendering charts with novel styles such as hand-drawn and fully embrace the ecosystem of [D3](https://github.com/d3/d3).

## 🔨 Getting Started

G2 is usually installed via a package manager such as npm or Yarn.

```bash
$ npm install @antv/g2@next
```

```bash
$ yarn add @antv/g2@next
```

The Chart object then can be imported from G2.

```html
<div id="chart"></div>
```

```js
import { Chart } from '@antv/g2';

// A tabular data to be visualized.
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

// Instantiate a new chart.
const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

// Specify visualization.
chart
  .interval() // Create an interval mark and add it to the chart.
  .data(data) // Bind data for this mark.
  .encode('x', 'genre') // Assign genre column to x position channel.
  .encode('y', 'sold'); // Assign sold column to y position channel.

// Render visualization。
chart.render();
```

If all goes well, you can get the following lovely bar chart!

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*K-7URYaij4kAAAAAAAAAAAAADmJ7AQ/original" width="640" height="480" alt="example">

## 📮 Contributing

- [Issues](https://github.com/antvis/g2/issues) - report bugs or request features
- [Contributing Guide](https://github.com/antvis/g2/blob/v5/CONTRIBUTING.en-US.md) - help build G2
- [Discussions](https://github.com/antvis/G2/discussions) - discuss on Github or in DingTalk group(30233731, 35686967, 44788198)

<img src="https://gw.alipayobjects.com/zos/antfincdn/hTzzaqgHgQ/Antv%252520G2%252520%26%252520G2Plot.png" width="200" height="266" alt="code"/>

## 📄 License

MIT@[AntV](https://github.com/antvis).
