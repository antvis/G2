---
title: "forceGraph"
description: "forceGraph"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/manual/extra-topics/graph/force-graph/"
version: "5.4.8"
---

[Resource index](/llms.txt)

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

chart.options({
  type: 'forceGraph',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/miserable.json',
  },
  scale: { color: { range: schemeTableau10 } },
});

chart.render();
```

## Options

| Property   | Description                               | Type             | Default |
| ---------- | ----------------------------------------- | ---------------- | ------- |
| data       | Data source configuration; see below      | [Data](/en/manual/core/data/overview/) | -       |
| layout     | Layout configuration                      | `ForceTransform` | -       |
| style      | Configure graphics style and label style  | -                | -       |
| nodeLabels | Custom configuration for node data labels | label[]          | []      |
| linkLabels | Custom configuration for link data labels | label[]          | []      |

### data

For a local network object, put the `nodes` and `links` arrays in `data.value` and declare the connector with `type: 'inline'`. In this example, each link's `source` and `target` refer to node `id` values:

```js
import { Chart } from '@antv/g2';

const graphData = {
  nodes: [{ id: 'A' }, { id: 'B' }],
  links: [{ source: 'A', target: 'B' }],
};

const chart = new Chart({ container: 'container' });
chart.options({
  type: 'forceGraph',
  data: { type: 'inline', value: graphData },
});
chart.render();
```

When replacing a remote `fetch` example with an already loaded object, also use `data: { type: 'inline', value: graphData }`. Do not assign `data: graphData` directly: an object assigned to `data` is interpreted as connector configuration, and omitting `value` can produce a blank chart.

Remote JSON can return the same `{ nodes, links }` structure through the `fetch` connector. See [inline](/en/manual/core/data/inline/) and [fetch](/en/manual/core/data/fetch/) for data source configuration and transforms.

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
