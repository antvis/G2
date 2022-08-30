# Symmetry

The SymmetryY transform apply offset for y channels, say to transform
them to be symmetry.

## Symmetry Stacked Area

```js
(() => {
  const chart = new G2.Chart();

  chart
    .area()
    .data({
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/bmw-prod/e58c9758-0a09-4527-aa90-fbf175b45925.json',
    })
    .transform({ type: 'stackY' })
    .transform({ type: 'symmetryY' })
    .encode('x', (d) => new Date(d.date))
    .encode('y', 'unemployed')
    .encode('color', 'industry')
    .encode('shape', 'smoothArea')
    .scale('x', { field: 'Date', utc: true })
    .scale('y', { guide: { formatter: (d) => `${+d / 1000}k` } })
    .scale('color', {
      guide: { size: 72, autoWrap: true, maxRows: 3, cols: 6 },
    });

  return chart.render().node();
})();
```

## Symmetry Interval

```js
(() => {
  const chart = new G2.Chart({ paddingLeft: 72 });

  chart.coordinate({ type: 'transpose' });

  chart
    .interval()
    .data({
      value: [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ],
      transform: [{ type: 'sortBy', fields: ['sold'], order: 'DESC' }],
    })
    .transform({ type: 'symmetryY' })
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .encode('shape', 'pyramid')
    .scale('x', { paddingInner: 0 });

  return chart.render().node();
})();
```

## Symmetry Stacked Point

```js
(() => {
  const chart = new G2.Chart({ height: 360 });

  chart
    .point()
    .data({
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/bmw-prod/88c601cd-c1ff-4c9b-90d5-740d0b710b7e.json',
    })
    .transform({ type: 'stackY', orderBy: 'series' })
    .transform({ type: 'symmetryY' })
    .encode('x', (d) => 2021 - d.birth)
    .encode('y', 1)
    .encode('color', 'gender')
    .scale('color', { field: 'Gender' })
    .scale('x', { field: 'Age →', nice: true })
    .scale('y', {
      field: '← Women · Men →',
      guide: {
        formatter: (d) => `${Math.abs(+d)}`,
        title: { style: { textAlign: 'center' } },
      },
    });

  return chart.render().node();
})();
```
