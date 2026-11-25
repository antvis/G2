---
title: "inline"
description: "inline"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/manual/core/data/inline/"
version: "5.4.8"
---

[Resource index](/llms.txt)

## Overview

G2 has two types of data sources: one is `inline`, which directly passes in specific data and is the default data source type in G2; the other data source type is `fetch`, which fetches data from remote interfaces.

### Usage

Explicitly specify `type` as `inline`, the complete syntax is as follows:

```js
chart.options({
  type: 'view',
  data: {
    type: 'inline',
    value: [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ],
  },
});
```

When the data is an array and no data transforms are needed, use this shorthand:

```js
chart.options({
  type: 'view',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
});
```

## Getting Started

Here is an example:



```ts
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
| value     | Array or object supported by the mark | any                                                          | []      |
| transform | Transform for inline data  | [DataTransform](/en/manual/core/data/overview/#datatransform) | []      |

This data source is relatively simple, equivalent to the passed-in data being directly used as the data source for transform processing, and then going through the rendering logic.

## Replacing remote data with local data

An object assigned to `data` is read as connector configuration. After loading a `fetch` result into a local variable, use `{ type: 'inline', value: localData }`. Do not assign a tree root or `{ nodes, links }` directly to `data`. The shorthand above applies to arrays without transforms.

```js
const graphData = {
  nodes: [{ id: 'A' }, { id: 'B' }],
  links: [{ source: 'A', target: 'B' }],
};

chart.options({
  type: 'forceGraph',
  data: { type: 'inline', value: graphData },
  encode: { nodeColor: 'id' },
});
```

`inline` passes data through; it does not convert an object into a table. The value must still match the target mark's structure, such as nodes and links for a graph or a tree for a hierarchy. When replacing `fetch`, retain any `data.transform` steps that still apply and check field names and nesting.

For ordinary marks, `data` does not accept an arbitrary `(previousData) => nextData` function. Compute an array first or use a [custom](/en/manual/core/data/custom/) transform in `data.transform`. See [data configuration levels](/en/manual/core/data/overview/) for view inheritance.
