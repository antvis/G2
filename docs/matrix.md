# Matrix

Matrix is part of G2's view composition. It generates multiple plots like _Rect_, but it allows full replication of data set for each view. The encode options _x_ and _y_ will be propagated to children, and _position_ encode is a shorthand for both x and y encode.

## Position

```js
G2.render({
  type: 'matrix',
  width: 800,
  height: 800,
  paddingLeft: 60,
  paddingBottom: 60,
  transform: [
    {
      type: 'fetch',
      url: 'https://vega.github.io/editor/data/penguins.json',
    },
  ],
  encode: {
    position: [
      'Beak Length (mm)',
      'Beak Depth (mm)',
      'Flipper Length (mm)',
      'Body Mass (g)',
    ],
  },
  children: [
    {
      type: 'point',
      encode: {
        color: 'Species',
        shape: 'hollowPoint',
      },
    },
  ],
});
```

## X & Y

```js
G2.render({
  type: 'matrix',
  width: 800,
  paddingLeft: 50,
  paddingBottom: 60,
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/48eb9b33-9d2b-40a2-864b-6522f92ba3b9.json',
      callback: (d) =>
        Object.assign(d, {
          temp_max: +d.temp_max,
          precipitation: +d.precipitation,
          wind: +d.wind,
          date: new Date(d.date),
        }),
    },
    {
      type: 'rename',
      map: {
        temp_max: 'Temp Max',
        precipitation: 'Precipitation',
        wind: 'Wind',
        date: 'Date',
        location: 'Location',
      },
    },
  ],
  encode: {
    y: ['Temp Max', 'Precipitation', 'Wind'],
    x: 'Date',
  },
  children: [
    {
      type: 'line',
      scale: {
        x: { tickCount: 10 },
      },
      encode: {
        color: 'Location',
      },
    },
  ],
});
```
