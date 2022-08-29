# Label

## Label Position

```js | select "options: { labels: ['top', 'left', 'right', 'bottom', 'inside'], values: ['top', 'left', 'right', 'bottom', 'inside'] }"
position = 'top';
```

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
    .encode('label', 'sold')
    .style('label', { position });

  return chart.render().node();
})();
```

## Label in transpose

```js
(() => {
  const chart = new G2.Chart({ paddingLeft: 72 });

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
    .encode('color', 'genre')
    .encode('label', 'sold')
    .style('label', { position });

  return chart.render().node();
})();
```

## Label in transpose and polar

```js
(() => {
  const chart = new G2.Chart();

  chart
    .coordinate({ type: 'transpose' })
    .coordinate({ type: 'polar', innerRadius: 0.6 });

  chart
    .interval()
    .data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ])
    .encode('y', 'sold')
    .encode('color', 'genre')
    .encode('label', 'sold')
    // Label position supports 'inside' or 'outside', when coordinate is transpose + theta.
    .style('label', { position: 'inside' });

  return chart.render().node();
})();
```
