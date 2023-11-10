---
title: Data
order: 5
---

In G2, **Data** is primarily used to specify the data to be visualized and data transformation (pre-processing).  Data can be specified at the view level:

```js
({
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

```js
// API form
chart.data([
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
]);
```

It can also be specified at the mark level:

```js
({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
});
```

```js
// API form
chart.interval().data([
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
]);
```

## Connectors and Transforms

A complete data declaration consists of two parts: **Connector** and **Data Transform**. Connector is the way to get data, specified by `data.type`, and data transform is the pre-processing function, specified by `data.transform`.

```js
({
  data: {
    type: 'fetch', // specify connector type
    // Specify connector value
    value:
      'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
    transform: [
      // specify transforms, multiple can be specified
      { type: 'filter', callback: (d) => d.sex === 'gender' },
    ],
  },
});
```

If the data satisfies the following three conditions:


- Inline data
- Is an array
- No pre-processing function

It can be directly specified as `data`:

```js
({
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
});
```

## Data in Mark

Each mark has its data, which means we can visualize multiple datasets in one view, such as the following interval chart:


```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .rangeX()
    .data([
      { year: [new Date('1933'), new Date('1945')], event: 'Nazi Rule' },
      {
        year: [new Date('1948'), new Date('1989')],
        event: 'GDR (East Germany)',
      },
    ])
    .encode('x', 'year')
    .encode('color', 'event')
    .scale('color', { independent: true, range: ['#FAAD14', '#30BF78'] })
    .style('fillOpacity', 0.75)
    .tooltip(false);

  chart
    .line()
    .data({
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/year-population.json',
    })
    .encode('x', (d) => new Date(d.year))
    .encode('y', 'population')
    .encode('color', '#333');

  chart.render();

  return chart.getContainer();
})();
```

## Data in View

The view can also be data-bound. The data bound to a view is transitive: it will be passed to the marks in `view.children`. If the mark does not have data, its data will be set; otherwise, there is no effect. This means that for marks that share data, you can bind the data to the view.


```js | ob
(() => {
  const chart = new G2.Chart();

  chart.data([
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ]);

  chart.line().encode('x', 'year').encode('y', 'value');

  chart.point().encode('x', 'year').encode('y', 'value');

  chart.render();

  return chart.getContainer();
})();
```

## Data Updates

Since the data is bound to the mark, updating the data can be a bit complicated. Take the following case as an example:

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const interval = chart
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
```

There are several ways to update the data of the interval in the above example:

- First method: The most basic way.

```js
// Update the data bound to the interval
interval.data(newData);

// Update the chart rendering through chart
chart.render();
```

- Second method: Syntactic sugar for the above method.

```js
// Update interval data and render the chart
interval.changeData(newData);
```

- Third method: Get the interval object through the query API, then update the data.

```js
chart.getNodesByType('rect')[0].changeData(data);
```

## FAQ

- How to use third-party libraries to draw statistical regression lines?

With the ability to customize data conversion, we can use external data processing-related libraries. In the example below, we use the third-party library [d3-regression](https://github.com/HarryStevens/d3-regression) to generate a linear statistical regression line:

```js
import { regressionLinear } from 'd3-regression';

node.data({
  // Use D3's regression linear to perform linear regression on the data
  transform: [
    {
      type: 'custom',
      callback: regressionLinear(),
    },
  ],
});
```

More examples of statistical regression lines can be found in [Data Analysis-regression](/examples#analysis-regression).
