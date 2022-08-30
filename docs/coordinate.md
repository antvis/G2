# Coordinate

## Cartesian

Cartesian coordinate will append to coordinate if is not specified.

```js
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
    .encode('color', 'genre');

  return chart.render().node();
})();
```

## Polar

```js
(() => {
  const chart = new G2.Chart();

  chart.coordinate({ type: 'polar' });

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
    .encode('color', 'genre')
    .scale('x', { padding: 0.05 })
    .scale('y', { guide: null })
    .style('radius', 10);

  return chart.render().node();
})();
```

## Transpose

```js
(() => {
  const chart = new G2.Chart({ paddingLeft: 80 });

  chart.coordinate({ type: 'transpose' });

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
    .encode('color', 'genre');

  return chart.render().node();
})();
```

## Parallel

```js
(() => {
  const chart = new G2.Chart({
    width: 720,
    paddingLeft: 60,
  });

  chart.coordinate({ type: 'parallel' });

  chart
    .line()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/96cd81b5-54a4-4fe8-b778-502b2114df58.json',
      callback: (d) => Object.assign(d, { year: new Date(d.year) }),
      transform: [
        {
          type: 'filterBy',
          // Filter data with defined Horsepower and Miles_per_Gallon.
          fields: ['Horsepower', 'Miles_per_Gallon'],
        },
      ],
    })
    .encode('position', [
      'Cylinders',
      'Displacement',
      'Weight_in_lbs',
      'Horsepower',
      'Acceleration',
      'Miles_per_Gallon',
      'Year',
    ])
    .encode('color', 'Origin')
    .encode('size', 1.01)
    .style('strokeOpacity', 0.3)
    // zIndex of mark is default to 0.
    // zIndex of component is default to -1.
    // Set zIndex to 1 for component to draw above marks.
    .scale('position', { nice: true, guide: { zIndex: 1 } })
    .scale('position1', { nice: true, guide: { zIndex: 1 } })
    .scale('position2', { nice: true, guide: { zIndex: 1 } })
    .scale('position3', { nice: true, guide: { zIndex: 1 } })
    .scale('position4', { nice: true, guide: { zIndex: 1 } })
    .scale('position5', { nice: true, guide: { zIndex: 1 } });

  return chart.render().node();
})();
```

## Fisheye

Fisheye coordinate must be specified after cartesian coordinate.

```js | dom
(() => {
  const chart = new G2.Chart();

  chart.coordinate({ type: 'fisheye', focusX: 0.5, focusY: 0.5 });

  chart
    .point()
    .data({
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
    })
    .encode('x', 'GDP')
    .encode('y', 'LifeExpectancy')
    .encode('size', 'Population')
    .encode('size', 'Population')
    .encode('color', 'continent')
    .scale('size', { type: 'log', range: [4, 20] })
    .scale('x', { guide: { label: { autoHide: true } } })
    .style('fillOpacity', 0.3)
    .style('lineWidth', 1);

  return chart.render().node();
})();
```
