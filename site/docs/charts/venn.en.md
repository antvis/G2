---
title: Venn Diagram
order: 7
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*venn-demo.png/original'
category: ['relation', 'set']
similar: ['upset', 'pie', 'scatter']
---

<img alt="venn" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*venn-demo.png/original" width=600/>

## Introduction to Venn Diagrams

A Venn diagram is a chart used to show the relationships between sets, such as intersections, unions, and complements. It uses overlapping circles to visually represent the relationships among sets.

**Other Names**: Set Diagram, Euler Diagram

## Components of a Venn Diagram

- **Circles**: Each set is represented by a circle.
- **Overlapping Areas**: The intersection of circles shows the intersection of sets.
- **Color/Labels**: Used to distinguish different sets and their intersections.

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'venn',
  autoFit: true,
  data: [
    { sets: ['A'], size: 12 },
    { sets: ['B'], size: 12 },
    { sets: ['A', 'B'], size: 2 },
  ],
  encode: {
    sets: 'sets',
    size: 'size',
    color: (d) => (d.sets.length === 1 ? '#5B8FF9' : '#61DDAA'),
    label: (d) => d.sets.join('∩'),
  },
  style: {
    label: { fill: '#fff', fontSize: 16 },
  },
});

chart.render();
```

---

## Use Cases of Venn Diagrams

### Suitable Use Cases

- Showing intersections, unions, and complements of sets.
- Data science, set theory, market analysis, etc.

### Unsuitable Use Cases

- Too many sets make the diagram hard to read.
- When precise value comparison is needed, use other charts.

---

## Extensions of Venn Diagrams

- Can be extended to three or more sets.
- Can be combined with UpSet charts for more complex relationships.

---

## Comparing Venn Diagrams to Other Charts

### Venn Diagrams and [UpSet Charts](/en/charts/upset)

- UpSet charts are better for many sets and complex relationships; Venn diagrams are better for fewer, more intuitive sets.

### Venn Diagrams and [Pie Charts](/en/charts/pie)

- Pie charts show proportions; Venn diagrams show set relationships.

---

## Similar Charts

<code src="./demos/list-card.tsx"></code>

## Categories

<code src="./demos/list-category.tsx"></code>