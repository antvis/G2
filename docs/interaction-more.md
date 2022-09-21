# More Interaction

## Fisheye

**Bubble with fisheye.**

```js | dom
(() => {
  const chart = new G2.Chart();

  chart
    .coordinate({ type: 'fisheye', focusX: 0.5, focusY: 0.5 })
    .interaction({ type: 'fisheye' });

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

**Interval with fisheye.**

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

  chart.interaction({ type: 'fisheye' });

  return chart.render().node();
})();
```

## EllipsisText

**Basic EllipsisText.**

```js
(() => {
  const chart = new G2.Chart();

  chart.interaction({ type: 'ellipsisText' });

  chart
    .area()
    .data({
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/bmw-prod/e58c9758-0a09-4527-aa90-fbf175b45925.json',
    })
    .transform({ type: 'stackY' })
    .transform({ type: 'normalizeY' })
    .encode('x', (d) => new Date(d.date))
    .encode('y', 'unemployed')
    .encode('color', 'industry')
    .encode('shape', 'smooth')
    .scale('x', { field: 'Date' })
    .scale('color', {
      guide: { size: 72, autoWrap: true, maxRows: 3, cols: 6 },
    });

  return chart.render().node();
})();
```

**EllipsisText with custom options.**

```js
(() => {
  const chart = new G2.Chart();

  chart.interaction({
    type: 'ellipsisText',
    x: 576,
    y: 30,
    htmlStyle: 'max-width:120px;overflow:hidden;',
  });

  chart
    .area()
    .data({
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/bmw-prod/e58c9758-0a09-4527-aa90-fbf175b45925.json',
    })
    .transform({ type: 'stackY' })
    .transform({ type: 'normalizeY' })
    .encode('x', (d) => new Date(d.date))
    .encode('y', 'unemployed')
    .encode('color', 'industry')
    .encode('shape', 'smooth')
    .scale('x', { field: 'Date' })
    .scale('color', {
      guide: { size: 72, autoWrap: true, maxRows: 3, cols: 6 },
    });

  return chart.render().node();
})();
```
