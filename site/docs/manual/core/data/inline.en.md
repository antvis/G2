---
title: inline
order: 2
---

## Overview

G2 has two types of data sources: one is `inline`, which directly passes in specific data and is the default data source type in G2; the other data source type is `fetch`, which fetches data from remote interfaces.

### Usage

Explicitly specify `type` as `inline`, the complete syntax is as follows:

```js
chart.data({
  type: 'inline',
  value: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
});
```

Since the default data type in G2 is `inline`, it can also be abbreviated as follows:

```js
chart.data([
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
]);
```

## Getting Started

Here is an example:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
  },
});

chart.render();
```

## Configuration

| Property  | Description                | Type                                                         | Default |
| --------- | -------------------------- | ------------------------------------------------------------ | ------- |
| value     | Specific object array data | object[]                                                     | []      |
| transform | Transform for inline data  | [DataTransform](/en/manual/core/data/overview#datatransform) | []      |

This data source is relatively simple, equivalent to the passed-in data being directly used as the data source for transform processing, and then going through the rendering logic.

⚠️ G2 supports some graph data structures, which are JavaScript Object types. When using abbreviated syntax, it may cause G2 to misidentify them. Therefore, if the chart data is an Object, it is recommended to use the complete syntax to pass in the data.

```js
const graphData = {
  nodes: [
    /** */
  ],
  edges: [
    /** */
  ],
};

chart.data(graphData); // ❌ Not recommended, G2 may misidentify during processing

chart.data({
  // ✅ Recommended complete syntax, clearer semantics, avoids identification errors due to ambiguity
  type: 'inline',
  value: graphData,
});
```
