# Connector

## Fetch

**Fetch with `json` format.**

```js | dom
G2.render({
  type: 'interval',
  // fetch
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/ce45e3d7-ba78-4a08-b411-28df40ef9b7f.json',
    },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
  },
});
```

**Fetch with `csv` format.**

```js | dom
G2.render({
  type: 'interval',
  // fetch
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/87092954-aed4-48b2-93ba-b07b255f04a2.csv',
      format: 'csv',
      callback: (d) => Object.assign(d, { weight: +d.weight }),
    },
  ],
  encode: {
    x: 'to',
    y: 'weight',
    color: 'from',
  },
  scale: {
    x: { guide: { title: null, label: { style: { fontSize: 10 } } } },
    y: { guide: { title: null, label: { style: { fontSize: 10 } } } },
    color: { guide: null },
  },
});
```

## SortBy

```js | dom
G2.render({
  type: 'interval',
  // sortBy
  transform: [{ type: 'sortBy', fields: ['sold'] }],
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
```

## FilterBy

```js | dom
G2.render({
  type: 'line',
  width: 720,
  paddingLeft: 60,
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/96cd81b5-54a4-4fe8-b778-502b2114df58.json',
      callback: (d) => Object.assign(d, { year: new Date(d.year) }),
    },
    {
      type: 'filterBy',
      // Filter data with defined Horsepower and Miles_per_Gallon.
      fields: ['Horsepower', 'Miles_per_Gallon'],
    },
  ],
  coordinate: [{ type: 'parallel' }],
  scale: {
    // zIndex of mark is default to 0.
    // zIndex of component is default to -1.
    // Set zIndex to 1 for component to draw above marks.
    position: { nice: true, guide: { zIndex: 1 } },
    position1: { nice: true, guide: { zIndex: 1 } },
    position2: { nice: true, guide: { zIndex: 1 } },
    position3: { nice: true, guide: { zIndex: 1 } },
    position4: { nice: true, guide: { zIndex: 1 } },
    position5: { nice: true, guide: { zIndex: 1 } },
  },
  encode: {
    position: [
      'Cylinders',
      'Displacement',
      'Weight_in_lbs',
      'Horsepower',
      'Acceleration',
      'Miles_per_Gallon',
      'Year',
    ],
    color: 'Origin',
    size: 1.01,
  },
  style: {
    strokeOpacity: 0.3,
  },
});
```
