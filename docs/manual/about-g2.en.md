---
title: Introduction to G2
order: 0
redirect_from:
  - /en/docs/manual
---

G2 is a set of underlying visualization engine based on the theory of graphic grammar. It is data-driven, providing graphic grammar and interactive grammar, with high ease of use and scalability. With G2, you can use Canvas or SVG to construct a variety of interactive statistical charts without paying attention to the various tedious implementation details of the chart.

## ✨ Characteristics

- 💯 Perfect graph grammar: data to graph mapping, able to draw all charts.
- 🤩 Brand-new interaction syntax: Various interaction behaviors can be combined through trigger and feedback mechanisms to explore data.
- 🦍 Powerful View module: can support the development of personalized data multi-dimensional analysis graphics.
- 👬 Dual-engine rendering: Canvas or SVG can be switched at will.
- 💄 Visual component system: for interaction and elegant experience.
- 🛡 Fully embrace TypeScript: Provide a complete type definition file.

## 📦 Installation

```bash
npm install @antv/g2
```

## 🔨 Quick Start

<img src="https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*8qbLQb7A0loAAAAAAAAAAABkARQnAQ" style="width:600px;">

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

// Step 2: Load the data source 
chart.data(data);

// Step 3: Create a graphic grammar and draw a column chart 
chart.interval().position('genre*sold');

// Step 4: Render chart 
chart.render();
```

## ⌨️ Local development

```bash
# Install dependencies
$ npm install

# Run the test case
$ npm run test

# Open electron run the test case, monitor file changes in build
$ npm run test-live

# Run CI
$ npm run ci

# Run website 
$ npm start
```

## 🤝 How to contribute

If you encounter a problem during use, you can check the [issues](https://github.com/antvis/g2/issues) to see if there are similar bugs or suggestions.

To submit code, please follow our [contribution guidelines](https://github.com/antvis/g2/blob/master/CONTRIBUTING.md)。
