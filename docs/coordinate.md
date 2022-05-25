# Coordinate

## Cartesian

Cartesian coordinate will append to coordinate if is not specified.

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
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
});
```

## Polar

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
  coordinate: [{ type: 'polar' }],
  scale: { x: { padding: 0.05 } },
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
  style: {
    radius: 10,
  },
});
```

## Transpose

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
  coordinate: [{ type: 'transpose' }],
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
});
```

## Parallel

```js | dom
G2.render({
  type: 'line',
  width: 720,
  paddingLeft: 80,
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/96cd81b5-54a4-4fe8-b778-502b2114df58.json',
      callback: ({ Year, ...rest }) => ({
        Year: new Date(Year),
        ...rest,
      }),
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
    'position[1]': { nice: true, guide: { zIndex: 1 } },
    'position[2]': { nice: true, guide: { zIndex: 1 } },
    'position[3]': { nice: true, guide: { zIndex: 1 } },
    'position[4]': { nice: true, guide: { zIndex: 1 } },
    'position[5]': { nice: true, guide: { zIndex: 1 } },
    'position[6]': { nice: true, guide: { zIndex: 1 } },
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

## Fisheye

Fisheye coordinate must be specified after cartesian coordinate.

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
  coordinate: [
    { type: 'cartesian' },
    { type: 'fisheye', focusX: 50, focusY: 50 },
  ],
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
