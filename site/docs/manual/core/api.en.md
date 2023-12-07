---
title: API
order: 2
---

G2 has designed a **specification (spec)** to describe the visualizations that can be drawn, which allows users to render charts by calling `chart.options(options)` with specified **options** that meet the specification. For example, a basic bar chart can be drawn as follows:

```js | ob
(() => {
  const chart = new G2.Chart();

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

  return chart.getContainer();
})();
```

## Functional API

Based on the underlying spec, in order to provide more diverse and flexible capabilities to declare charts, G2 also provides a series of functional APIs to declare charts, such as declaring the simple bar chart above:

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ])
    .encode('x', 'genre')
    .encode('y', 'sold');

  chart.render();

  return chart.getContainer();
})();
```

Simply put, **calling the functional API is just generating internal options. There is no essential difference between the two, and their drawing capabilities are the same. It's more of a stylistic choice.** For example, when calling `chart.interval`, an Interval mark is added to `children`:

```js
({
  type: 'view',
  children: [{ type: 'interval' }],
});
```

`chart.interval().encode('x', 'genre')` just sets the `encode` in options：

```js
({
  type: 'view',
  children: [{ type: 'interval', encode: { x: 'genre' } }],
});
```

Therefore, understanding the mapping relationship between the functional API and Options is very important. In the subsequent introduction, the spec will be introduced first, followed by the corresponding API.

## View Tree

Overall, G2's spec is a hierarchical **view tree**, composed of different nodes. Nodes specify their types through `node.type`, different types have different functions, and they are nested through `node.children`.

```js
({
  type: 'spaceFlex',
  children: [
    {
      type: 'view',
      children: [{ type: 'line' }, { type: 'point' }],
    },
    {
      type: 'interval',
    },
  ],
});
```

The view can be simply understood as a chart, or **a single view plot**. This "tree" manages views in time and space through different container nodes, thereby managing our views in time and space to draw **multiple view plots**.

The API declares the hierarchical relationship by adding the corresponding _child_ node to the specified _parent_ in the form of `parent.[child]()`. For example, the above hierarchical relationship needs to be declared as follows using the API:

```js
const spaceFlex = chart.spaceFlex();

const view = spaceFlex.view();

view.line();

view.point();

spaceFlex.interval();
```

Next, we introduce three types of nodes:

- Mark nodes
- View nodes
- Composite nodes

## Mark Nodes

Mark nodes are leaf nodes on this tree, which cannot be nested further, that is, they cannot contain the `children` attribute. Marks are similar to the concept of a chart. For example, an Interval mark can draw a bar chart.

```js
({
  type: 'interval',
});
```

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval', // Mark node
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

  return chart.getContainer();
})();
```

## View Nodes

If you want to have multiple marks in the chart, you need to put them into view nodes to draw a single view plot. View nodes can only nest mark nodes.

```js
({
  type: 'view',
  children: [{ type: 'line' }, { type: 'point' }],
});
```

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'view', // view node
    data: [
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 7 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 },
    ],
    encode: {
      x: 'year',
      y: 'value',
    },
    children: [
      { type: 'line' }, // Line mark
      { type: 'point' }, // Point mark
    ],
  });

  chart.render();

  return chart.getContainer();
})();
```

## Composite Nodes

Used to draw multiple views in a chart (multi-view chart). It can nest composite nodes, view nodes and mark nodes.

```js
({
  type: 'spaceFlex',
  children: [
    { type: 'spaceFlex' }, // composite node
    { type: 'view' }, // view node
    { type: 'interval' }, // mark node
  ],
});
```

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'spaceFlex',
    width: 800,
    height: 400,
    children: [
      {
        type: 'interval',
        padding: 'auto',
        data: [
          { genre: 'Shooter', sold: 350 },
          { genre: 'Sports', sold: 275 },
          { genre: 'Other', sold: 150 },
          { genre: 'Action', sold: 120 },
          { genre: 'Strategy', sold: 115 },
        ],
        encode: { x: 'genre', y: 'sold' },
      },
      {
        type: 'interval',
        padding: 'auto',
        data: [
          { genre: 'Shooter', sold: 350 },
          { genre: 'Sports', sold: 275 },
          { genre: 'Other', sold: 150 },
          { genre: 'Action', sold: 120 },
          { genre: 'Strategy', sold: 115 },
        ],
        encode: { y: 'sold', color: 'genre' },
        transform: [{ type: 'stackY' }],
        coordinate: { type: 'theta' },
        legend: { color: false },
      },
    ],
  });

  chart.render();

  return chart.getContainer();
})();
```
