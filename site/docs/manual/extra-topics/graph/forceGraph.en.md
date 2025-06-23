---
title: forceGraph
order: 1
---

Force-directed graph is a chart used to display complex relationship networks. In a force-directed graph, each node in the system can be viewed as a charged particle with repulsive forces between them. At the same time, these particles are connected by "edges" between them, creating attractive forces.

## Getting Started

<img alt="forceGraph" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*nbN4TYyfq70AAAAAAAAAAAAADmJ7AQ/original
" width="600" />

```js
import { Chart } from '@antv/g2';
import { schemeTableau10 } from 'd3-scale-chromatic';

const chart = new Chart({
  container: 'container',
});

chart
  .forceGraph()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/miserable.json',
  })
  .scale('color', { range: schemeTableau10 });

chart.render();
```

## Options

| Property   | Description                               | Type             | Default |
| ---------- | ----------------------------------------- | ---------------- | ------- |
| layout     | Layout configuration                      | `ForceTransform` | -       |
| style      | Configure graphics style and label style  | -                | -       |
| nodeLabels | Custom configuration for node data labels | label[]          | []      |
| linkLabels | Custom configuration for link data labels | label[]          | []      |

### layout

| Property     | Description                                | Type                      | Default |
| ------------ | ------------------------------------------ | ------------------------- | ------- |
| joint        | Discrete force layout or attraction layout | boolean                   | true    |
| nodeStrength | Node attraction force                      | `number \| (d => number)` | -       |
| linkStrength | Link attraction force                      | `number \| (d => number)` | -       |

### style

Composite graphic marks need to be distinguished through different prefixes for graphic configuration.

- `<label>`: Prefix for data labels, e.g., `labelText` sets the text content of the label.
- `<node>`: Prefix for node configuration, e.g., `nodeFill` sets the fill color of nodes.
- `<link>`: Prefix for link configuration, e.g., `linkStrokeWidth` sets the width of links.
