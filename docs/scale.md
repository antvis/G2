# Scale

## Linear

The scale for y channel of following interval is linear scale.

```js | dom
G2.render({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  scale: {
    y: { range: [0.9, 0.1] },
  },
  encode: {
    x: 'genre',
    y: 'sold',
  },
});
```

```js | dom
G2.render({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  scale: {
    color: { range: ['red', 'yellow'] },
  },
  encode: {
    x: 'genre',
    y: 'sold',
    color: (_, i) => i,
  },
});
```

## Log

The scale for size channel of following point is log scale.

```js | dom
G2.render({
  type: 'point',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
    },
  ],
  scale: { size: { type: 'log', range: [4, 20] }, y: { field: 'Life' } },
  encode: {
    x: 'GDP',
    y: 'LifeExpectancy',
    size: 'Population',
    color: 'continent',
  },
  style: {
    fillOpacity: 0.3,
    lineWidth: 1,
  },
});
```

## Pow

The scale for size channel of following point is pow scale.

```js | dom
G2.render({
  type: 'point',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
    },
  ],
  scale: { size: { type: 'pow', range: [4, 20] }, y: { field: 'Life' } },
  encode: {
    x: 'GDP',
    y: 'LifeExpectancy',
    size: 'Population',
    color: 'continent',
  },
  style: {
    fillOpacity: 0.3,
    lineWidth: 1,
  },
});
```

## Time

The scale for x channel of following line is time scale.

```js | dom
G2.render({
  type: 'line',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/ab55d10f-24da-465a-9eba-87ac4b7a83ec.json',
    },
  ],
  scale: { x: { field: 'Date' } },
  encode: {
    x: (d) => new Date(d.Date),
    y: 'Close',
  },
});
```

## Band

The scale for x channel of following interval is linear scale.

```js | dom
G2.render({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  scale: {
    x: { padding: 0.2, range: [0.05, 0.95] }, // Specify padding.
  },
  encode: {
    x: 'genre',
    y: 'sold',
  },
});
```

Flex option.

```js | dom
G2.render({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  scale: {
    x: { flex: [2, 3, 1, 4, 2] },
  },
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
});
```

## Ordinal

The scale for color channel of following point is ordinal scale.

```js | dom
G2.render({
  type: 'point',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
    },
  ],
  scale: {
    color: { range: ['orange', 'steelblue'] },
  },
  encode: {
    x: 'height',
    y: 'weight',
    color: 'gender',
    shape: 'hollowPoint',
  },
});
```

## Identity

```js | dom
G2.render({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  scale: {
    color: { type: 'identity' },
  },
  scale: {
    y: { range: [0.9, 0.1] },
    color: 'steeblue',
  },
  encode: {
    x: 'genre',
    y: 'sold',
  },
});
```

## Threshold

```js | dom
G2.render({
  type: 'grid',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/89c20fe8-0c6f-46c8-b36b-4cb653dba8ed.json',
      callback: (d) => ({ salary: d }),
    },
  ],
  width: 900,
  height: 280,
  scale: {
    color: {
      type: 'threshold',
      domain: [10000, 100000],
      range: ['#eee', 'pink', 'red'],
    },
  },
  encode: {
    y: (_, i) => (i % 5) + 1,
    x: (_, i) => ((i / 5) | 0) + 1,
    color: 'salary',
  },
  style: {
    stroke: 'black',
    lineWidth: 1,
  },
});
```

## Quantize

```js | dom
G2.render({
  type: 'grid',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/89c20fe8-0c6f-46c8-b36b-4cb653dba8ed.json',
      callback: (d) => ({ salary: d }),
    },
  ],
  width: 900,
  height: 280,
  scale: {
    color: {
      type: 'quantize',
      domain: [10000, 100000],
      range: ['#eee', 'pink', 'red'],
    },
  },
  encode: {
    y: (_, i) => (i % 5) + 1,
    x: (_, i) => ((i / 5) | 0) + 1,
    color: 'salary',
    tooltip: 'salary',
  },
  style: {
    stroke: 'black',
    lineWidth: 1,
  },
});
```

## Quantile

```js | dom
G2.render({
  type: 'grid',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/89c20fe8-0c6f-46c8-b36b-4cb653dba8ed.json',
      callback: (d) => ({ salary: d }),
    },
  ],
  width: 900,
  height: 280,
  scale: {
    color: {
      type: 'quantile',
      range: ['#eee', 'pink', 'red'],
    },
  },
  encode: {
    y: (_, i) => (i % 5) + 1,
    x: (_, i) => ((i / 5) | 0) + 1,
    color: 'salary',
  },
  style: {
    stroke: 'black',
    lineWidth: 1,
  },
});
```
