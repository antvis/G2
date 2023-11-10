---
title: Encode
order: 6
---

In G2, **encoding** is mainly used to specify the relationship between visual element attributes and data. You can specify encoding at the mark level:


```js
({
  type: 'interval',
  encode: {
    x: 'name',
    y: 'value',
  },
});
```

```js
// API
// First kind
chart.interval().encode('x', 'name').encode('y', 'value');

// Second kind
chart.interval().encode({ x: 'name', y: 'value' });
```

You can also specify encoding at the view level:

```js
({
  type: 'view',
  encode: {
    x: 'name',
    y: 'value',
  },
});
```

```js
// API
// First kind
chart.encode('x', 'name').encode('y', 'value');

// Second kind
chart.encode({ x: 'name', y: 'value' });
```

## Channels

To control the style of the mark, we often bind a column of data to its visual attribute. For example, in the example below, we bind the 'height' column of data to the 'x' attribute, the 'weight' column of data to the 'y' attribute, and the 'gender' column of data to the 'color' attribute.

```js | ob { pin: false }
table({
  url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
});
```

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .point()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
    })
    .encode('x', 'weight')
    .encode('y', 'height')
    .encode('color', 'gender');

  chart.render();

  return chart.getContainer();
})();
```

This binding process is called **encode**. We often say that a visual attribute of the graph is encoded by a column of data, and this data-driven property is called a **channel**. For example, the x, y, and color channels of the point mark in the example above are each encoded by the corresponding column of data.

A complete encoding consists of `encode.type` and `encode.value`:

```js
({
  type: 'point',
  encode: {
    x: { type: 'field', value: 'weight' },
    y: { type: 'field', value: 'height' },
    color: { type: 'field', value: 'gender' },
  },
});
```

In most cases, you can directly specify the value, as shown below for encoding some built-in categories:


### Field Encode

Specify the binding of the channel and a certain column of the data:

```js
({
  type: 'interval',
  encode: { x: { type: 'field', value: 'name' } },
});
```

```js
// Syntax sugar
({
  type: 'interval',
  encode: { x: 'name' },
});
```

### Function Encode

Specify the binding of the channel and some newly generated bindings:

```js
({
  type: 'interval',
  encode: {
    color: {
      type: 'transform',
      value: (d) => (d.value > 100 ? 'high' : 'low'),
    },
  },
});
```

```js
// Syntax sugar
({
  type: 'interval',
  encode: {
    color: (d) => (d.value > 100 ? 'high' : 'low'),
  },
});
```

### Constant Encode

Set the channel value to a constant, which is often used to specify the color channel.

```js
({
  type: 'interval',
  encode: { color: { type: 'constant', value: 'steelblue' } },
});
```

```js
// Syntax sugar
({
  type: 'interval',
  encode: { color: 'steelblue' },
});
```

### Data Encode

Specify the value of a channel as an array.

```js
({
  type: 'line',
  encode: {
    x: { type: 'column', value: [0, 1, , 2, 3] },
  },
});
```

For some big data scenarios, using array columns is more suitable, here is a simple example.

```js | ob
(() => {
  const I = [0, 1, 2, 3, 4];
  const X = I.map((i) => ((i - 2) * Math.PI) / 2);
  const Y = X.map((x) => Math.sin(x));

  const chart = new G2.Chart();

  chart
    .line()
    .data(I)
    .encode('x', { type: 'column', value: X })
    .encode('y', { type: 'column', value: Y })
    .encode('shape', 'smooth');

  chart.render();

  return chart.getContainer();
})();
```

## Array Channels

Certainly, for spatial channels like x and y channels, you often need more than one column of data, such as a waterfall chart, you can specify multiple columns for a channel through an array.

```js
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data([
      { month: 'Jan.', profit: 387264, start: 0, end: 387264 },
      { month: 'Feb.', profit: 772096, start: 387264, end: 1159360 },
      { month: 'Mar.', profit: 638075, start: 1159360, end: 1797435 },
      { month: 'Apr.', profit: -211386, start: 1797435, end: 1586049 },
      { month: 'May', profit: -138135, start: 1586049, end: 1447914 },
      { month: 'Jun', profit: -267238, start: 1447914, end: 1180676 },
      { month: 'Jul.', profit: 431406, start: 1180676, end: 1612082 },
      { month: 'Aug.', profit: 363018, start: 1612082, end: 1975100 },
      { month: 'Sep.', profit: -224638, start: 1975100, end: 1750462 },
      { month: 'Oct.', profit: -299867, start: 1750462, end: 1450595 },
      { month: 'Nov.', profit: 607365, start: 1450595, end: 2057960 },
      { month: 'Dec.', profit: 1106986, start: 2057960, end: 3164946 },
      { month: 'Total', start: 0, end: 3164946 },
    ])
    .encode('x', 'month')
    .encode('y', ['end', 'start']) // specify two columns of data
    .encode('color', (d) =>
      d.month === 'Total' ? 'Total' : d.profit > 0 ? 'Increase' : 'Decrease',
    )
    .axis('y', { labelFormatter: '~s' });

  chart.render();

  return chart.getContainer();
})();
```

In addition, you can specify them separately in the form of `${channel}${index}`:


```js
// Equivalent to the above form
chart.encode('y', 'end').encode('y1', 'start');
```

## Common Channels

Different marks have different channels, but there are also some common channels. Some common and drawing-related common channels are as follows:


- **x** - x position
- **y** - y position
- **z** - z position
- **color** - color, fill color or border color, determined by shape
- **opacity** - opacity, fill-opacity or border opacity, determined by the style
- **shape** - shape
- **size** - size, different marks have different functions
- **series** - series, used to split into series
- **key** - unique mark, used for data updates

## View Encode

Channel encode has transitivity, the encoding of the view is passed to the mark specified by `children`, if the mark does not have the encoding of the corresponding channel, then set, otherwise do nothing. For example, draw a point line chart:

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .data([
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 7 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 },
    ])
    .encode('x', 'year') // View level encoding
    .encode('y', 'value');

  chart.line();

  chart.point();

  chart.render();

  return chart.getContainer();
})();
```
