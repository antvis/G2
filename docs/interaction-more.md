# Interaction

## Fisheye

**Bubble with fisheye.**

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
  interaction: [{ type: 'fisheye' }],
});
```

**Interval with fisheye.**

```js | dom
G2.render({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275, type: 'A' },
    { genre: 'Strategy', sold: 115, type: 'B' },
    { genre: 'Action', sold: 120, type: 'C' },
    { genre: 'Shooter', sold: 350, type: 'D' },
    { genre: 'Other', sold: 150, type: 'E' },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
  interaction: [{ type: 'fisheye' }],
});
```

## EllipsisText

**Basic EllipsisText.**

```js | dom
G2.render({
  type: 'area',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/e58c9758-0a09-4527-aa90-fbf175b45925.json',
    },
    { type: 'stackY' },
    { type: 'normalizeY' },
  ],
  paddingTop: 72,
  scale: {
    x: { field: 'Date' },
    color: {
      guide: {
        size: 72,
        autoWrap: true,
        maxRows: 3,
        cols: 6,
      },
    },
  },
  encode: {
    shape: 'smoothArea',
    x: (d) => new Date(d.date),
    y: 'unemployed',
    color: 'industry',
  },
});
```

**EllipsisText with custom options.**

```js | dom
G2.render({
  type: 'area',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/e58c9758-0a09-4527-aa90-fbf175b45925.json',
    },
    { type: 'stackY' },
    { type: 'normalizeY' },
  ],
  paddingTop: 72,
  scale: {
    x: { field: 'Date' },
    color: {
      guide: {
        size: 72,
        autoWrap: true,
        maxRows: 3,
        cols: 6,
      },
    },
  },
  width: 700,
  interaction: [
    {
      type: 'ellipsisText',
      x: 576,
      y: 30,
      htmlStyle: 'max-width:120px;overflow:hidden;',
    },
  ],
  encode: {
    shape: 'smoothArea',
    x: (d) => new Date(d.date),
    y: 'unemployed',
    color: 'industry',
  },
});
```
