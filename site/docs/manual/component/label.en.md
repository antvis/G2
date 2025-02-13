---
title: Label
order: 7.6
---

**Label** in G2 is one of the means to annotate charts. Multiple labels can be added to a mark:

```js
({
  type: 'interval',
  labels: [
    {
      text: 'genre', // Specify the bound field
      dy: -15, // Specify style
    },
    {
      text: 'sold', // Specify the bound field
      fill: '#fff', // Specify style
      dy: 5,
    },
  ],
});
```

```js
// API method
// First way
chart
  .interval()
  .label({
    text: 'genre', // Specify the bound field
    dy: -15, //Specify style
  })
  .label({
    text: 'sold', // Specify the bound field
    fill: '#fff', // Specify style
    dy: 5,
  });

// Second way
chart.interval().label([
  {
    text: 'genre', // Specify the bound field
    dy: -15, // Specify style
  },
  {
    text: 'sold', // Specify the bound field
    fill: '#fff', // Specify style
    dy: 5,
  },
]);
```

At the level of View, you can declare label transform through `labelTransform`:

```js
({
  type: 'view',
  labelTransform: [{ type: 'overlapHide' }, { type: 'contrastReverse' }],
});
```

```js
// API method
// First way
chart
  .labelTransform({ type: 'overlapHide' })
  .labelTransform({ type: 'contrastReverse' });

// Second way
chart.labelTransform([{ type: 'overlapHide' }, { type: 'contrastReverse' }]);
```

## Mark Label

Each mark can have multiple labels. The configuration of a label is roughly as follows:

```js
({
  type: 'interval',
  labels: [
    {
      text: 'name', // Bound field or a constant string
      dy: -2, // @antv/g supported styles
      fill: 'red', // @antv/g supported styles
      selector: 'last', // Selector
      transform: [], // Label transform
    },
  ],
});
```

Here's a simple example:

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
    .encode('y', 'sold')
    // Declare the first label
    .label({
      text: 'genre', // Specify the bound field
      style: {
        dy: -15, // Specify style
      },
    })
    // Declare the second label
    .label({
      text: 'sold', // Specify the bound field
      style: {
        fill: '#fff', // Specify style
        dy: 5,
      },
    });

  chart.render();

  return chart.getContainer();
})();
```

## Selector

For the mark of a graph corresponding to multiple data items, we can select the mark that needs to be retained through `selector`. Currently supported values ​​are as follows:

- **first** - the first one
- **last** - the last one
- **function** - custom selector

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .line()
    .data({
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/indices.json',
    })
    .transform({ type: 'normalizeY', basis: 'first', groupBy: 'color' })
    .encode('x', (d) => new Date(d.Date))
    .encode('y', 'Close')
    .encode('color', 'Symbol')
    .axis('y', { title: '↑ Change in price (%)' })
    .label({
      text: 'Symbol',
      selector: 'last', // Select the last one
      style: {
        fontSize: 10,
      },
    });
  chart.render();

  return chart.getContainer();
})();
```

## Label Transform

When the display of labels does not meet expectations, such as overlapping or unclear colors, we can use **Label Transform** to optimize label display.

It can be found that in the example below, the labels corresponding to times such as 2004 have overlapped.

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .line()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/cb99c4ab-e0a3-4c76-9586-fe7fa2ff1a8c.csv',
    })
    .transform({ type: 'groupX', y: 'mean' })
    .encode('x', (d) => new Date(d.date).getFullYear())
    .encode('y', 'price')
    .encode('color', 'symbol')
    .label({
      text: 'price',
      fontSize: 10,
    })
    .tooltip({ channel: 'y', valueFormatter: '.1f' });

  chart.render();

  return chart.getContainer();
})();
```

At this time, we can set the label transform for the corresponding label: overlapDodgeY, which is used to prevent the labels from overlapping in the y direction.

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .line()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/cb99c4ab-e0a3-4c76-9586-fe7fa2ff1a8c.csv',
    })
    .transform({ type: 'groupX', y: 'mean' })
    .encode('x', (d) => new Date(d.date).getFullYear())
    .encode('y', 'price')
    .encode('color', 'symbol')
    .label({
      text: 'price',
      transform: [{ type: 'overlapDodgeY' }], // Appoint labelTransform
      fontSize: 10,
    })
    .tooltip({ channel: 'y', valueFormatter: '.1f' });

  chart.render();

  return chart.getContainer();
})();
```

## View Level Label Transform

Label transform can also be declared at the level of view to process labels for the entire view.

```js
({
  type: 'view',
  labelTransform: [],
});
```
