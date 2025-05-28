---
title: Tree Map
order: 6
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*tree-map-demo.png/original'
category: ['hierarchy', 'composition']
similar: ['sunburst', 'circle-packing', 'pie']
---

<img alt="tree-map" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*tree-map-demo.png/original" width=600/>

## Introduction to Tree Maps

A tree map is a visualization for hierarchical data, using nested rectangles to represent nodes. The area of each rectangle is proportional to its value, making it easy to see the relationship between the whole and its parts.

**Other Names**: Rectangular Tree, Treemap

## Components of a Tree Map

- **Rectangles**: Each node is represented by a rectangle, with area proportional to its value.
- **Nesting**: Parent nodes contain child rectangles, showing hierarchy.
- **Color**: Used to distinguish categories or levels.

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'treemap',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/treemap-data.json',
  },
  encode: {
    value: 'value',
    color: 'name',
    path: 'path',
  },
  style: {
    label: { text: 'name', fill: '#fff' },
  },
});

chart.render();
```

---

## Use Cases of Tree Maps

### Suitable Use Cases

- Displaying hierarchical data (e.g., organization structure, file systems, market share).
- Highlighting the relationship between the whole and its parts.

### Unsuitable Use Cases

- Too many levels or nodes make rectangles too small to read.
- When precise value comparison is needed.

---

## Extensions of Tree Maps

- Use color and interaction to enhance information.
- Combine with sunburst or circle packing charts for deeper analysis.

---

## Comparing Tree Maps to Other Charts

### Tree Maps and [Sunburst Charts](/en/charts/sunburst)

- Both show hierarchy; tree maps use nested rectangles, sunburst uses concentric rings.

### Tree Maps and [Pie Charts](/en/charts/pie)

- Pie charts show a single level of composition; tree maps show multiple levels.

---

## Similar Charts

<code src="./demos/list-card.tsx"></code>

## Categories

<code src="./demos/list-category.tsx"></code>