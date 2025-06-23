---
title: sankey
order: 1
---

A Sankey diagram is a specific type of flow diagram used to describe the flow from one set of values to another. Sankey diagrams have the following characteristics:

- The starting flow and ending flow are the same, with the sum of all main branch widths equal to the sum of all split branch widths, maintaining energy balance;
- Internally, different lines represent different flow distribution scenarios, with widths proportionally displaying the flow share of each branch;
- Different node widths represent flow magnitudes under specific states.
  Sankey diagrams are commonly used for visualization analysis of energy, material composition, financial, and other data.

## Getting Started

<img alt="sankey" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*dACBR7ANcfEAAAAAAAAAAAAADmJ7AQ/original
" width="600" />

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  padding: 10,
});

chart
  .sankey()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/energy.json',
    transform: [
      {
        type: 'custom',
        callback: (data) => ({ links: data }),
      },
    ],
  })
  .layout({
    nodeAlign: 'center',
    nodePadding: 0.03,
  })
  .scale('color', { range: schemeTableau10 })
  .style('labelSpacing', 3)
  .style('labelFontWeight', 'bold')
  .style('nodeStrokeWidth', 1.2)
  .style('linkFillOpacity', 0.4);

chart.render();
```

In G2, **Layout** is used to specify parameters for layout methods of marks with specific layout functions, such as Sankey, WordCloud, ForceGraph, etc.

```js
({
  type: 'sankey',
  layout: {
    nodeAlign: 'center',
    nodePadding: 0.03,
  },
});
```

```js
// API
chart.sankey().layout({ nodeAlign: 'center', nodePadding: 0.03 });
```

## Options

| Property   | Description                                                                        | Type      | Default                               |
| ---------- | ---------------------------------------------------------------------------------- | --------- | ------------------------------------- |
| tooltip    | Configure Sankey diagram tooltip, see [tooltip configuration](#tooltip)            | _object_  | See [tooltip configuration](#tooltip) |
| layout     | Configure Sankey diagram layout, see [layout configuration](#layout)               | _object_  | See [layout configuration](#layout)   |
| style      | Configure graphic and label styles, see [style configuration](#style)              | _object_  | See [style configuration](#style)     |
| nodeLabels | Custom node data label configuration, see [nodeLabels configuration](##nodelabels) | _label[]_ | []                                    |
| linkLabels | Custom link data label configuration, see [linkLabels configuration](#linklabels)  | _label[]_ | []                                    |

### tooltip

As a composite graphic, Sankey diagrams need to distinguish between nodes and links when configuring `tooltip`.

#### title

Unlike single mark `title` configuration, Sankey diagrams need to configure `nodeTitle` and `linkTitle` separately.

```js
({
  tooltip: {
    nodeTitle: (d) => d.key,
    linkTitle: (d) => 'link',
  },
});
```

#### items

Unlike single mark `items` configuration, Sankey diagrams need to configure both `nodeItems` and `linkItems`.

Like regular `items`, `nodeItems` and `linkItems` also support custom configuration:

```js
({
  tooltip: {
    nodeItems: [
      (d, index, data, column) => {
        return {
          color: 'red', // Specify item color
          name: 'Node', // Specify item name
          value: d.key, // Use y channel value
          content: 'Custom node property',
        };
      },
    ],
    linkItems: [
      (d, index, data, column) => {
        return {
          color: 'red', // Specify item color
          name: 'Link', // Specify item name
          value: `${d.source.key}-${d.target.key}`, // Use y channel value
          content: 'Custom link property',
        };
      },
    ],
  },
});
```

#### 💡 How to use supplementary properties in data to customize tooltip display in Sankey diagrams?

Similar to general `Mark` custom `tooltip` interaction methods, first pass custom properties in the graphic's `tooltip`, then use them in `interaction`.

Example:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const data = {
  nodes: [
    { id: 'a', key: 'Homepage', des: 'Custom node property' },
    { id: 'b', key: 'Page 1', des: 'Custom node property' },
    { id: 'b_1', key: 'Page 1', des: 'Custom node property' },
    { id: 'c', key: 'Page 2', des: 'Custom node property' },
    { id: 'c_1', key: 'Page 2', des: 'Custom node property' },
    { id: 'd', key: 'Page 3', des: 'Custom node property' },
    { id: 'd_1', key: 'Page 3', des: 'Custom node property' },
  ],
  links: [
    { source: 'a', target: 'b', value: 100 },
    { source: 'b', target: 'c', value: 80 },
    { source: 'b', target: 'd', value: 20 },
    { source: 'c', target: 'b_1', value: 80 },
    { source: 'b_1', target: 'c_1', value: 40 },
    { source: 'b_1', target: 'd_1', value: 40 },
  ],
};

chart.options({
  type: 'sankey',
  width: 900,
  height: 600,
  data: {
    value: data,
    transform: [
      {
        type: 'custom',
        callback: (data) => ({
          nodes: data.nodes,
          links: data.links,
        }),
      },
    ],
  },
  tooltip: {
    nodeItems: [
      (d, index, data, column) => {
        return {
          content: d.des,
        };
      },
    ],
    linkItems: [
      (d, index, data, column) => {
        return {
          color: 'red', // Specify item color
          name: 'Link', // Specify item name
          value: `${d.source.key}-${d.target.key}`, // Use y channel value
          content: 'Custom link property',
        };
      },
    ],
  },
  layout: {
    nodeId: (d) => d.id,
    nodeAlign: 'center',
    nodePadding: 0.03,
    iterations: 25,
  },
  style: {
    labelSpacing: 3,
    labelFontWeight: 'bold',
    // linkFillOpacity: 0.2,
    // linkFill: '#3F96FF',
  },
  interaction: {
    tooltip: {
      render: (e, { items, title }) => {
        return `<div>${items[0].content}</div>`;
      },
    },
  },
});

chart.render();
```

### layout

Sankey diagram layout configuration. Specific configuration options are as follows:

#### nodeId

<description>**optional** _function_ </description>

Callback format: `(node: any) => string`. If `nodeId` is not specified, defaults to `(node) => node.key`.

Node binding field, used as unique identifier in layout.

#### 💡 Sankey diagrams don't support cycles, so how should we configure for scenarios like page flow diagrams where duplicate nodes appear?

For nodes that appear multiple times, set an id as unique identifier and configure the `nodeId` callback method as `(node) => node.id`.

Example:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const data = {
  nodes: [
    { id: 'a', key: 'Homepage' },
    { id: 'b', key: 'Page 1' },
    { id: 'b_1', key: 'Page 1' },
    { id: 'c', key: 'Page 2' },
    { id: 'c_1', key: 'Page 2' },
    { id: 'd', key: 'Page 3' },
    { id: 'd_1', key: 'Page 3' },
  ],
  links: [
    { source: 'a', target: 'b', value: 100 },
    { source: 'b', target: 'c', value: 80 },
    { source: 'b', target: 'd', value: 20 },
    { source: 'c', target: 'b_1', value: 80 },
    { source: 'b_1', target: 'c_1', value: 40 },
    { source: 'b_1', target: 'd_1', value: 40 },
  ],
};

chart.options({
  type: 'sankey',
  width: 900,
  height: 600,
  data: {
    value: data,
    transform: [
      {
        type: 'custom',
        callback: (data) => ({
          nodes: data.nodes,
          links: data.links,
        }),
      },
    ],
  },
  layout: {
    nodeId: (d) => d.id,
    nodeAlign: 'center',
    nodePadding: 0.03,
    iterations: 25,
  },
  style: {
    labelSpacing: 3,
    labelFontWeight: 'bold',
    linkFillOpacity: 0.2,
    linkFill: '#3F96FF',
  },
});

chart.render();
```

#### nodeSort

<description>**optional** _function_ </description>

Callback format: `((a: any, b: any) => number)`

Node sorting method. If `nodeSort` is not specified, returns the current node sorting method, defaulting to `undefined`, meaning the vertical order of nodes within each column will be automatically determined by the layout. If `nodeSort` is `null`, the order is fixed by input. Otherwise, the order is determined by the specified sorting function; this function is passed two nodes and must return a value less than 0 if the first node should be above the second node, greater than 0 if the second node should be above the first node, or 0 if no order is specified.

#### linkSort

<description> **optional** _function_ </description>

Callback format: `((a: any, b: any) => number)`

Link sorting method. If `linkSort` is not specified, returns the current link sorting method, defaulting to `undefined`, meaning the vertical order of links within each node will be automatically determined by the layout. If `linkSort` is `null`, the order is fixed by input. Otherwise, the order is determined by the specified sorting function; this function is passed two links and must return a value less than 0 if the first link should be above the second link, greater than 0 if the second link should be above the first link, or 0 if no order is specified.

#### nodeAlign

<description>**optional** _string_ ｜ _function_ </description>

Built-in supported types: `'left' | 'right' | 'center' | 'justify'`

Callback format: `((node: any, n: number) => number`

Current node alignment method. Besides the built-in types, you can also pass the current node and the graph's total depth `n` (maximum node depth + 1), and must return an integer between `0` and `n - 1`, indicating the desired horizontal position of the node in the generated graph.

#### nodeWidth

<description>**optional** _number_ </description>

Node width. Defaults to `0.02`.

#### nodePadding

<description>**optional** _number_ </description>

Node spacing. Defaults to `0.02`.

#### nodeDepth

<description>**optional** _function_ </description>

Callback format: `(datum: any, maxDepth: number) => number`

Node depth.

#### iterations

<description>**optional** _number_ </description>

Layout calculation iteration count, defaults to `6`. More iterations result in more reasonable layout.

For more `layout` configuration, see [d3-sankey](https://github.com/d3/d3-sankey)

### style

Default style configuration:

```js
({
  // label
  labelText: (d) => d.key,
  labelSpacing: 5,
  labelFontSize: 10,
  // node
  nodeStroke: '#000',
  // link
  linkFillOpacity: 0.5,
  linkStroke: undefined,
});
```

Composite graphic marks need to use different prefixes to distinguish graphic configurations.

- `<label>`: Prefix for configuring data labels.

| Property           | Type                 | Description                                                                                                                                                                    |
| ------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| labelText          | _(d: any) => string_ | Configure default data label value for Sankey diagram, defaults to `(d) => d.key`                                                                                              |
| labelSpacing       | _number_             | Configure data label spacing for Sankey diagram, defaults to `5`                                                                                                               |
| labelFontSize      | _number_             | Sankey diagram data label font size                                                                                                                                            |
| labelFontFamily    | _string_             | Sankey diagram data label font family                                                                                                                                          |
| labelFontWeight    | _number_             | Sankey diagram data label font weight                                                                                                                                          |
| labelLineHeight    | _number_             | Sankey diagram data label text line height                                                                                                                                     |
| labelTextAlign     | _string_             | Set current alignment for Sankey diagram data label text content, supported values: `center` \| `end` \| `left` \| `right` \| `start`, defaults to `start`                     |
| labelTextBaseline  | _string_             | Set current text baseline used when drawing Sankey diagram data label text, supported values: `top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging`. Defaults to `bottom` |
| labelFill          | _string_             | Sankey diagram data label text fill color                                                                                                                                      |
| labelFillOpacity   | _number_             | Sankey diagram data label text fill opacity                                                                                                                                    |
| labelStroke        | _string_             | Sankey diagram data label text stroke                                                                                                                                          |
| labelLineWidth     | _number_             | Sankey diagram data label text stroke width                                                                                                                                    |
| labelLineDash      | _[number,number]_    | Sankey diagram data label stroke dash configuration, first value is dash segment length, second value is gap distance. Setting lineDash to [0,0] results in no stroke.         |
| labelStrokeOpacity | _number_             | Sankey diagram data label stroke opacity                                                                                                                                       |
| labelOpacity       | _number_             | Sankey diagram data label text overall opacity                                                                                                                                 |
| labelShadowColor   | _string_             | Sankey diagram data label text shadow color                                                                                                                                    |
| labelShadowBlur    | _number_             | Sankey diagram data label text shadow Gaussian blur coefficient                                                                                                                |
| labelShadowOffsetX | _number_             | Set horizontal distance of Sankey diagram data label shadow from text                                                                                                          |
| labelShadowOffsetY | _number_             | Set vertical distance of Sankey diagram data label shadow from text                                                                                                            |
| labelCursor        | _string_             | Sankey diagram data label mouse cursor style. Same as CSS cursor style, defaults to 'default'.                                                                                 |

- `<node>`: Prefix for configuring nodes.

| Property          | Type              | Description                                                                                                                                                      |
| ----------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| nodeFill          | _string_          | Sankey diagram node fill color                                                                                                                                   |
| nodeFillOpacity   | _number_          | Sankey diagram node fill opacity                                                                                                                                 |
| nodeStroke        | _string_          | Sankey diagram node stroke                                                                                                                                       |
| nodeStrokeOpacity | _number_          | Sankey diagram node stroke opacity                                                                                                                               |
| nodeLineWidth     | _number_          | Sankey diagram node stroke width                                                                                                                                 |
| nodeLineDash      | _[number,number]_ | Sankey diagram node stroke dash configuration, first value is dash segment length, second value is gap distance. Setting lineDash to [0,0] results in no stroke. |
| nodeOpacity       | _number_          | Sankey diagram node overall opacity                                                                                                                              |
| nodeShadowColor   | _string_          | Sankey diagram node shadow color                                                                                                                                 |
| nodeShadowBlur    | _number_          | Sankey diagram node shadow Gaussian blur coefficient                                                                                                             |
| nodeShadowOffsetX | _number_          | Set horizontal distance of shadow from Sankey diagram node                                                                                                       |
| nodeShadowOffsetY | _number_          | Set vertical distance of shadow from Sankey diagram node                                                                                                         |
| nodeCursor        | _string_          | Sankey diagram node mouse cursor style. Same as CSS cursor style, defaults to 'default'.                                                                         |

- `<link>`: Prefix for configuring links.

| Property          | Type              | Description                                                                                                                                                      |
| ----------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| linkFill          | _string_          | Sankey diagram link fill color                                                                                                                                   |
| linkFillOpacity   | _number_          | Sankey diagram link fill opacity                                                                                                                                 |
| linkStroke        | _string_          | Sankey diagram link stroke                                                                                                                                       |
| linkStrokeOpacity | _number_          | Sankey diagram link stroke opacity                                                                                                                               |
| linkLineWidth     | _number_          | Sankey diagram link stroke width                                                                                                                                 |
| linkLineDash      | _[number,number]_ | Sankey diagram link stroke dash configuration, first value is dash segment length, second value is gap distance. Setting lineDash to [0,0] results in no stroke. |
| linkOpacity       | _number_          | Sankey diagram link overall opacity                                                                                                                              |
| linkShadowColor   | _string_          | Sankey diagram link shadow color                                                                                                                                 |
| linkShadowBlur    | _number_          | Sankey diagram link shadow Gaussian blur coefficient                                                                                                             |
| linkShadowOffsetX | _number_          | Set horizontal distance of shadow from Sankey diagram link                                                                                                       |
| linkShadowOffsetY | _number_          | Set vertical distance of shadow from Sankey diagram link                                                                                                         |
| linkCursor        | _string_          | Sankey diagram link mouse cursor style. Same as CSS cursor style, defaults to 'default'.                                                                         |

### nodeLabels

<description>**optional** _Label[]_ </description>

Built-in data label configuration is as follows.

```js
({
  labels: [
    {
      text,
      dx: (d) => (d.x[0] < 0.5 ? spacing : -spacing),
      ...labelStyle, // User-provided custom data label styles
    },
    ...nodeLabels, // User-provided custom data labels
  ],
});
```

Besides the built-in node data labels, you can also customize node data label configuration.

```js
({
  nodeLabels: [
    {
      text: (d) => d.key,
      fontSize: 10, // Note!!! Drawing properties here no longer need the label prefix
      fill: 'red',
    },
  ],
});
```

### linkLabels

<description>**optional** _Label[]_ </description>

Links don't have built-in data labels, but you can customize link data label configuration.

```js
({
  linkLabels: [
    {
      text: (d) => d.key,
      fontSize: 10, // Note!!! Drawing properties here no longer need the label prefix
      fill: 'yellow',
    },
  ],
});
```
