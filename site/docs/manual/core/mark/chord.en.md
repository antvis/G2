---
title: chord
order: 6
---

`chord` is a circular chart used to visualize matrix relationship data, intuitively displaying bidirectional flows or connection strengths between different categories through node arcs arranged around the circumference and interconnected ribbon curves. In `chord`, data points (nodes) are typically arranged along a circular ring, with chords (curves) connecting relationships or flows between nodes. Each chord not only represents the connection between two nodes but can also express the weight or strength of relationships through visual channels (such as color, width, transparency, etc.). Chord charts are widely used in scenarios such as social networks, system call relationships, traffic distribution, and transaction flow analysis. By clearly displaying complex connections between nodes, they help users quickly understand structures and patterns in data.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'chord',
  layout: { nodeWidthRatio: 0.05 },
  data: {
    value: {
      links: [
        { source: 'Beijing', target: 'Tianjin', value: 30 },
        { source: 'Beijing', target: 'Shanghai', value: 80 },
        { source: 'Beijing', target: 'Hebei', value: 46 },
        { source: 'Beijing', target: 'Liaoning', value: 49 },
        { source: 'Beijing', target: 'Heilongjiang', value: 69 },
        { source: 'Beijing', target: 'Jilin', value: 19 },
        { source: 'Tianjin', target: 'Hebei', value: 62 },
        { source: 'Tianjin', target: 'Liaoning', value: 82 },
        { source: 'Tianjin', target: 'Shanghai', value: 16 },
        { source: 'Shanghai', target: 'Heilongjiang', value: 16 },
        { source: 'Hebei', target: 'Heilongjiang', value: 76 },
        { source: 'Hebei', target: 'Inner Mongolia', value: 24 },
        { source: 'Inner Mongolia', target: 'Beijing', value: 32 },
      ],
    },
  },
  scale: {
    color: {
      range: [
        '#4e79a7',
        '#f28e2c',
        '#e15759',
        '#76b7b2',
        '#59a14f',
        '#edc949',
        '#af7aa1',
        '#ff9da7',
        '#9c755f',
        '#bab0ab',
      ],
    },
  },
  style: { labelFontSize: 15, linkFillOpacity: 0.6 },
});

chart.render();
```

## Configuration Options

| Property | Description                                                                                                                                | Type              | Default                                             | Required |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | --------------------------------------------------- | -------- |
| encode   | Configure visual channels for `chord` marks, including `color`, `shape`, etc., to specify relationships between visual attributes and data | [encode](#encode) | -                                                   |          |
| layout   | Configure `chord` layout method                                                                                                            | [layout](#layout) | -                                                   |          |
| scale    | Configure scale for `chord` marks, including `x`, `y`, `color`, `shape`, etc.                                                              | [scale](#scale)   | `{x: { type: 'identity' },y: { type: 'identity' }}` |          |
| style    | Configure `chord` graphic styles                                                                                                           | [style](#style)   | -                                                   |          |

### encode

| Property  | Description                                                                                                  | Type                             | Default   |
| --------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------- | --------- |
| color     | Map colors of nodes or connecting chords, used to distinguish different categories or relationship strengths | [encode](/en/manual/core/encode) | -         |
| nodeShape | Shape of nodes in the chord diagram, defining the specific visual appearance of nodes                        | _string_\| Function\<_string_\>  | `polygon` |
| linkShape | Shape of connecting chords in the chord diagram, defining the specific visual appearance of chords           | _string_\| Function\<_string_\>  | `ribbon`  |
| source    | Define the starting point of connecting chords, usually mapped to a node field                               | _string_\| Function\<_string_\>  | `source`  |
| target    | Define the ending point of connecting chords, usually mapped to another node field                           | _string_\| Function\<_string_\>  | `target`  |

#### source/target

The `source` and `target` visual channels are important properties that affect the starting and ending points of connecting chords in chord chart marks. `source` maps to the field in data representing the starting node of connection relationships, while `target` maps to the field representing the ending node of connection relationships. These two properties together build the relationship logic between nodes in the chord diagram, visually representing interactions or dependencies between nodes through intuitive connecting chords.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'chord',
  data: {
    value: {
      links: [
        { begin: 'Beijing', end: 'Tianjin', value: 34 },
        { begin: 'Beijing', end: 'Shanghai', value: 95 },
        { begin: 'Beijing', end: 'Hebei', value: 61 },
        { begin: 'Beijing', end: 'Liaoning', value: 32 },
        { begin: 'Beijing', end: 'Heilongjiang', value: 84 },
        { begin: 'Beijing', end: 'Jilin', value: 19 },
        { begin: 'Tianjin', end: 'Hebei', value: 62 },
        { begin: 'Tianjin', end: 'Liaoning', value: 34 },
        { begin: 'Tianjin', end: 'Shanghai', value: 48 },
        { begin: 'Shanghai', end: 'Heilongjiang', value: 67 },
        { begin: 'Hebei', end: 'Heilongjiang', value: 37 },
        { begin: 'Hebei', end: 'Inner Mongolia', value: 51 },
        { begin: 'Inner Mongolia', end: 'Beijing', value: 56 },
      ],
    },
  },
  encode: {
    source: 'begin',
    target: 'end',
  },
});

chart.render();
```

Encode properties like `source` and `target` also support dynamically retrieving values from data. You can pass a function, and the chart will call this function during execution to calculate the required results.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'chord',
  data: {
    value: {
      links: [
        { begin: 'Beijing', end: 'Tianjin', value1: 34, value2: 46 },
        { begin: 'Beijing', end: 'Shanghai', value1: 95, value2: 69 },
        { begin: 'Beijing', end: 'Hebei', value1: 61, value2: 62 },
        { begin: 'Beijing', end: 'Liaoning', value1: 32, value2: 82 },
        { begin: 'Beijing', end: 'Heilongjiang', value1: 84, value2: 30 },
        { begin: 'Beijing', end: 'Jilin', value1: 19, value2: 1 },
        { begin: 'Tianjin', end: 'Hebei', value1: 62, value2: 24 },
        { begin: 'Tianjin', end: 'Liaoning', value1: 34, value2: 16 },
        { begin: 'Tianjin', end: 'Shanghai', value1: 48, value2: 49 },
        { begin: 'Shanghai', end: 'Heilongjiang', value1: 67, value2: 80 },
        { begin: 'Hebei', end: 'Heilongjiang', value1: 37, value2: 67 },
        { begin: 'Hebei', end: 'Inner Mongolia', value1: 51, value2: 16 },
        { begin: 'Inner Mongolia', end: 'Beijing', value1: 56, value2: 76 },
      ],
    },
  },
  encode: {
    source: (d) => d.begin,
    target: (d) => d.end,
  },
});

chart.render();
```

For more `encode` configurations, please refer to the [encode](/en/manual/core/encode) introduction page.

### layout

The layout property controls the layout method of chord diagrams, defining how nodes and connecting chords are presented on the canvas. Chord diagram layouts are typically based on circular (ring) arrangements, distributing all nodes evenly around the circumference and displaying relationships and weights between nodes through connecting chords. Through layout configuration, you can further adjust node positions, connection methods, and graphic structures.

| Property         | Description                                                                       | Type                           | Default                     |
| ---------------- | --------------------------------------------------------------------------------- | ------------------------------ | --------------------------- |
| y                | Y-axis coordinate during layout                                                   | _number_                       | `0`                         |
| id               | Key of the node                                                                   | _Function\<string \| number\>_ | `(node) => node.key`        |
| source           | Set the source node data field for the chord diagram                              | _Function\<string\>_           | `(edge) => edge.source`     |
| target           | Set the target node data field for the chord diagram                              | _Function\<string\>_           | `(edge) => edge.target`     |
| sourceWeight     | Weight of the source                                                              | _Function\<number\>_           | `(edge) => edge.value \| 1` |
| targetWeight     | Weight of the target                                                              | _Function\<number\>_           | `(edge) => edge.value \| 1` |
| sortBy           | Sorting method, can choose id, weight, frequency sorting or custom sorting method | _string \| Function\<number\>_ | `null`                      |
| nodeWidthRatio   | Width configuration of chord diagram nodes, 0 ~ 1, relative to canvas width       | _number_                       | `0.05`                      |
| nodePaddingRatio | Spacing between chord diagram nodes, 0 ~ 1, relative to canvas height             | _number_                       | `0.1`                       |

### scale

The scale property defines how data fields map to visual properties of graphics (such as node positions, chord lengths, colors, etc.), thus affecting the presentation of chord diagrams. By configuring scale, you can adjust node arrangement order, connection chord weight proportions, or color mappings to make charts better conform to data characteristics or user analysis needs.

| Property | Description                                                                                                                   | Type                                                    | Default                |
| -------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ---------------------- |
| x        | Define the arrangement position of nodes on the circumference, can map to categorical or numerical fields                     | Record<string, [scale](/en/manual/core/scale/overview)> | `{ type: 'identity' }` |
| y        | Control the projection position of nodes or chords, usually not explicitly set in chord diagrams                              | Record<string, [scale](/en/manual/core/scale/overview)> | `{ type: 'identity' }` |
| color    | Define color mapping rules for nodes or connecting chords, used to distinguish different categories or relationship strengths | Record<string, [scale](/en/manual/core/scale/overview)> | -                      |
| size     | Map the thickness of connecting chords or size of nodes to represent weight or strength                                       | Record<string, [scale](/en/manual/core/scale/overview)> | -                      |

For more `scale` configurations, please refer to the [scale](/en/manual/core/scale/overview) introduction page.

### style

The `style` property provides a series of configuration options for customizing the visual effects of chord diagrams, mainly affecting nodes, links (connecting chords), and labels.

| Property         | Description                                                                                           | Type                           | Default   |
| ---------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------ | --------- |
| linkFillOpacity  | Fill opacity of connecting chords (relationship lines connecting different nodes) in `chord` graphics | _number \| Function\<number\>_ | `1`       |
| linkFill         | Fill color of connecting chords (relationship lines connecting different nodes) in `chord` graphics   | _string \| Function\<number\>_ | -         |
| linkStroke       | Border color of connecting chords in `chord` graphics                                                 | _string \| Function\<number\>_ | -         |
| linkOpacity      | Overall opacity of connecting chords in `chord` graphics (including fill and border)                  | _number \| Function\<number\>_ | `0.5`     |
| linkLineDash     | Dashed line style for connecting chord borders in `chord` graphics                                    | _[number, number]_             | -         |
| labelFill        | Font color of node labels in `chord` graphics                                                         | _string \| Function\<number\>_ | -         |
| labelFillOpacity | Transparency of node label font color in `chord` graphics                                             | _number \| Function\<number\>_ | `0.6`     |
| labelFontSize    | Font size of node labels in `chord` graphics                                                          | _number \| Function\<number\>_ | `10`      |
| labelFontWeight  | Font weight of node labels in `chord` graphics (such as `"normal"`, `"bold"`)                         | _string\| number_              | `normal`  |
| labelOpacity     | Overall opacity of node labels in `chord` graphics                                                    | _number \| Function\<number\>_ | `1`       |
| nodeFill         | Fill color of nodes in `chord` graphics                                                               | _string \| Function\<number\>_ | -         |
| nodeFillOpacity  | Fill opacity of nodes in `chord` graphics                                                             | _number \| Function\<number\>_ | `1`       |
| nodeStroke       | Border color of nodes in `chord` graphics                                                             | _string \| Function\<number\>_ | -         |
| nodeOpacity      | Overall opacity of nodes in `chord` graphics                                                          | _number \| Function\<number\>_ | `1`       |
| nodeLineDash     | Dashed line style for node borders in `chord` graphics                                                | _[number, number]_             | -         |
| cursor           | Mouse cursor style. Same as CSS cursor style, default 'default'.                                      | _string \| Function\<number\>_ | 'default' |

For more `style` configurations, please refer to the [style](/en/manual/core/style) introduction page.

Try it out:

```js | ob {. inject: true }
import { Chart } from '@antv/g2';
import { schemeTableau10 } from 'd3-scale-chromatic';

const chart = new Chart({
  container: 'container',
  width: 900,
  height: 600,
});

const data = [
  {
    source: '北京',
    target: '天津',
    value: 30,
  },
  {
    source: '北京',
    target: '上海',
    value: 80,
  },
  {
    source: '北京',
    target: '河北',
    value: 46,
  },
  {
    source: '北京',
    target: '辽宁',
    value: 49,
  },
  {
    source: '北京',
    target: '黑龙江',
    value: 69,
  },
  {
    source: '北京',
    target: '吉林',
    value: 19,
  },
  {
    source: '天津',
    target: '河北',
    value: 62,
  },
  {
    source: '天津',
    target: '辽宁',
    value: 82,
  },
  {
    source: '天津',
    target: '上海',
    value: 16,
  },
  {
    source: '上海',
    target: '黑龙江',
    value: 16,
  },
  {
    source: '河北',
    target: '黑龙江',
    value: 76,
  },
  {
    source: '河北',
    target: '内蒙古',
    value: 24,
  },
  {
    source: '内蒙古',
    target: '北京',
    value: 32,
  },
];

chart
  .chord()
  .data({
    value: { links: data },
  })
  .layout({
    nodeWidthRatio: 0.05,
  })
  .scale('color', { range: schemeTableau10 })
  .style('labelFontSize', 15)
  .style('linkFillOpacity', 0.6);

chart.render();

```
