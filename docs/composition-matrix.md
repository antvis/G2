# Matrix

Matrix is part of G2's view composition. It generates multiple plots like _Rect_, but it allows full replication of data set for each view. The encode options _x_ and _y_ will be propagated to children, and _position_ encode is a shorthand for both x and y encode.

## Position

```js | table
data = fetchJSON('https://vega.github.io/editor/data/penguins.json');
```

```js
(() => {
  const chart = new G2.Chart({
    width: 800,
    height: 800,
    paddingLeft: 60,
    paddingBottom: 60,
  });

  const matrix = chart
    .matrix()
    .data(data)
    .encode('position', [
      'Beak Length (mm)',
      'Beak Depth (mm)',
      'Flipper Length (mm)',
      'Body Mass (g)',
    ]);

  matrix
    .point()
    .encode('color', 'Species')
    .encode('shape', 'hollowPoint')
    .animate('enter', { type: null });

  return chart.render().node();
})();
```

## X & Y

```js
(() => {
  const chart = new G2.Chart({
    width: 800,
    paddingLeft: 50,
    paddingBottom: 60,
  });

  const matrix = chart
    .matrix()
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/48eb9b33-9d2b-40a2-864b-6522f92ba3b9.json',
      callback: (d) =>
        Object.assign(d, {
          temp_max: +d.temp_max,
          precipitation: +d.precipitation,
          wind: +d.wind,
          date: new Date(d.date),
        }),
    })
    .transform({
      type: 'rename',
      map: {
        temp_max: 'Temp Max',
        precipitation: 'Precipitation',
        wind: 'Wind',
        date: 'Date',
        location: 'Location',
      },
    })
    .encode('x', 'Date')
    .encode('y', ['Temp Max', 'Precipitation', 'Wind']);

  matrix.line().encode('color', 'Location').scale('x', { tickCount: 10 });

  return chart.render().node();
})();
```
