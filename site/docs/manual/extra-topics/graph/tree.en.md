---
title: tree
order: 1
---

A tree chart (`Tree`) can decompose things or phenomena into a tree-like structure, also known as a tree diagram or system diagram. In a tree structure, the root node has no predecessor nodes, and each of the remaining nodes has one and only one predecessor node. Leaf nodes have no successor nodes, while each of the remaining nodes can have one or more successor nodes.

## Getting Started

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'tree',
  width: 800,
  height: 1500,
  layout: { sortBy: (a, b) => a.value - b.value },
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/flare.json',
  },
  coordinate: { transform: [{ type: 'transpose' }] },
  style: {
    nodeFill: (d) => (d.height === 0 ? '#999' : '#000'),
    linkStroke: '#999',
    labelText: (d) => d.data.name || '-',
    labelFontSize: (d) => (d.height === 0 ? 7 : 12),
    labelTextAlign: (d) => (d.height === 0 ? 'start' : 'end'),
    labelPosition: (d) => (d.height !== 0 ? 'left' : 'right'),
    labelDx: (d) => (d.height === 0 ? 5 : -5),
    labelBackground: true,
    labelBackgroundFill: '#fff',
  },
});

chart.render();
```

## Data Format

Tree chart supports multiple data configuration methods:

### 1. Remote Data (fetch)

Use `type: 'fetch'` to fetch data from remote sources, supporting JSON, CSV and other formats:

```js
chart.tree().data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/flare.json',
});
```

### 2. Inline Data (inline)

#### Explicitly specify inline type

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'tree',
  data: {
    type: 'inline',
    value: {
      name: 'root',
      children: [
        {
          name: 'branch1',
          value: 100,
          children: [
            { name: 'leaf1', value: 50 },
            { name: 'leaf2', value: 30 },
          ],
        },
        {
          name: 'branch2',
          value: 80,
          children: [
            { name: 'leaf3', value: 40 },
            { name: 'leaf4', value: 40 },
          ],
        },
      ],
    },
  },
});

chart.render();
```

#### Shorthand form (Recommended)

Since G2's default data type is `inline`, you can pass data directly:

```js
// Pass hierarchical data object directly
chart.tree().data({
  value: {
    name: 'root',
    children: [
      {
        name: 'branch1',
        value: 100,
        children: [
          { name: 'leaf1', value: 50 },
          { name: 'leaf2', value: 30 },
        ],
      },
    ],
  },
});

// Or pass flat data array (requires layout.path configuration)
const flatData = [
  { name: 'root', value: 180 },
  { name: 'root/branch1', value: 100 },
  { name: 'root/branch1/leaf1', value: 50 },
  { name: 'root/branch1/leaf2', value: 30 },
  { name: 'root/branch2', value: 80 },
  { name: 'root/branch2/leaf3', value: 40 },
  { name: 'root/branch2/leaf4', value: 40 },
];

chart
  .tree()
  .data({ value: flatData })
  .layout({
    path: (d) => d.name, // Specify path field
  });
```

### Data Structure Description

Tree chart supports two data structures:

1. **Hierarchical Data**: JSON objects already in tree structure, each node contains a `children` array
2. **Flat Data**: Arrays containing path information, requiring `layout.path` configuration to build hierarchy

Hierarchical data example:

```json
{
  "name": "root",
  "value": 180,
  "children": [
    {
      "name": "branch1",
      "value": 100,
      "children": [
        { "name": "leaf1", "value": 50 },
        { "name": "leaf2", "value": 30 }
      ]
    }
  ]
}
```

Flat data example:

```json
[
  { "name": "root", "value": 180 },
  { "name": "root/branch1", "value": 100 },
  { "name": "root/branch1/leaf1", "value": 50 }
]
```

## Options

| Property   | Description                              | Type            | Default Value |
| ---------- | ---------------------------------------- | --------------- | ------------- |
| layout     | Layout configuration                     | `TreeTransform` | -             |
| style      | Configure graphics style and label style | -               | -             |
| nodeLabels | Custom node data label configuration     | label[]         | []            |
| linkLabels | Custom link data label configuration     | label[]         | []            |

### layout

| Property   | Description              | Type                    | Default Value                            |
| ---------- | ------------------------ | ----------------------- | ---------------------------------------- |
| nodeSize   | Node size                | `(node: any) => string` | -                                        |
| sortBy     | Sort method              | `((a, b) => number)`    | `(a, b) => b.value - a.value`            |
| separation | Distance between nodes   | `(a, b) => number`      | `(a, b) => a.parent == b.parent ? 1 : 2` |
| path       | Path field configuration | `(d: any) => string`    | -                                        |

**Note**: When using flat data, you must configure `layout.path` to specify how to extract hierarchical path information from the data.

### style

Composite mark components require different prefixes to distinguish graphic configurations.

- `<label>`: Prefix for data labels, e.g., `labelText` sets the label text.
- `<node>`: Prefix for node configurations, e.g., `nodeFill` sets the node fill color.
- `<link>`: Prefix for link configurations, e.g., `linkStrokeWidth` sets the link width.

## FAQ

- How to draw a circular tree chart?
  You need to specify `coordinate: { type: 'polar' }`

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'tree',
  layout: { sortBy: (a, b) => a.value - b.value },
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/flare.json',
  },
  coordinate: { type: 'polar' },
  style: {
    nodeFill: (d) => (d.height === 0 ? '#999' : '#000'),
    linkStroke: '#999',
    labelText: (d) => d.data.name || '-',
    labelFontSize: (d) => (d.height === 0 ? 7 : 12),
    labelTextAlign: (d) => (d.height === 0 ? 'start' : 'end'),
    labelPosition: (d) => (d.height !== 0 ? 'left' : 'right'),
    labelDx: (d) => (d.height === 0 ? 5 : -5),
    labelBackground: true,
    labelBackgroundFill: '#fff',
  },
});

chart.render();
```
