# Symmetry

The SymmetryY transform apply offset for y channels, say to transform
them to be symmetry.

## Symmetry Stacked Area

```js
G2.render({
  type: 'area',
  paddingTop: 72,
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/e58c9758-0a09-4527-aa90-fbf175b45925.json',
    },
    { type: 'stackY' },
    { type: 'symmetryY' },
  ],
  scale: {
    x: { field: 'Date', utc: true },
    y: { guide: { label: { formatter: (d) => `${+d.text / 1000}k` } } },
    color: {
      guide: { size: 72, autoWrap: true, maxRows: 3, cols: 6 },
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

## Symmetry Interval

```js
G2.render({
  type: 'interval',
  paddingLeft: 72,
  transform: [
    { type: 'sortBy', fields: ['sold'], order: 'DESC' },
    { type: 'symmetryY' },
  ],
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  scale: { x: { paddingInner: 0 } },
  coordinate: [{ type: 'transpose' }],
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
    shape: 'pyramid',
  },
});
```

## Symmetry Stacked Point

```js
G2.render({
  type: 'point',
  height: 360,
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/88c601cd-c1ff-4c9b-90d5-740d0b710b7e.json',
    },
    { type: 'stackY', orderBy: 'series' },
    { type: 'symmetryY' },
  ],
  scale: {
    x: { field: 'Age →', nice: true },
    y: {
      field: '← Women · Men →',
      guide: {
        label: { formatter: (d) => `${Math.abs(+d.text)}` },
        title: { style: { textAlign: 'center' } },
      },
    },
  },
  encode: {
    x: (d) => 2021 - d.birth,
    y: 1,
    color: 'gender',
    shape: 'hexagon',
  },
});
```
