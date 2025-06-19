---
title: tree
order: 1
---

A tree chart (`Tree`) can decompose things or phenomena into a tree-like structure, also known as a tree diagram or system diagram. In a tree structure, the root node has no predecessor nodes, and each of the remaining nodes has one and only one predecessor node. Leaf nodes have no successor nodes, while each of the remaining nodes can have one or more successor nodes.

## Getting Started

<img alt="tree" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*srsgT7Tb6jQAAAAAAAAAAAAADmJ7AQ/original
" width="600" />

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 1500,
  width: 800,
});

chart
  .tree()
  .coordinate({ transform: [{ type: 'transpose' }] })
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/flare.json',
  })
  .layout({
    sortBy: (a, b) => a.value - b.value,
  })
  .style('nodeFill', (d) => (d.height === 0 ? '#999' : '#000'))
  .style('linkStroke', '#999')
  .style('labelText', (d) => d.data.name || '-')
  .style('labelFontSize', (d) => (d.height === 0 ? 7 : 12))
  .style('labelTextAlign', (d) => (d.height === 0 ? 'start' : 'end'))
  .style('labelPosition', (d) => (d.height !== 0 ? 'left' : 'right'))
  .style('labelDx', (d) => (d.height === 0 ? 5 : -5))
  .style('labelBackground', true)
  .style('labelBackgroundFill', '#fff');

chart.render();
```

## Options

| Property   | Description                               | Type            | Default Value |
| ---------- | ----------------------------------------- | --------------- | ------------- |
| layout     | Layout configuration                      | `TreeTransform` | -             |
| style      | Configure graphics style and label style  | -               | -             |
| nodeLabels | Custom node data label configuration      | label[]         | []            |
| linkLabels | Custom link data label configuration      | label[]         | []            |

### layout

| Property   | Description              | Type                    | Default Value                            |
| ---------- | ------------------------ | ----------------------- | ---------------------------------------- |
| nodeSize   | Node size                | `(node: any) => string` | -                                        |
| sortBy     | Sort method              | `((a, b) => number)`    | `(a, b) => b.value - a.value`            |
| separation | Distance between adjacent nodes | `(a, b) => number`      | `(a, b) => a.parent == b.parent ? 1 : 2` |

### style

Composite graphic marks need to be distinguished by different prefixes for graphic configuration.

- `<label>`: Data label prefix, for example: `labelText` sets the text of the label.
- `<node>`: Node configuration prefix, for example: `nodeFill` sets the fill color of the node.
- `<link>`: Link configuration prefix, for example: `linkStrokeWidth` sets the width of the link.

## FAQ

- How to draw a circular tree chart?
  You need to specify `coordinate: 'polar'`
