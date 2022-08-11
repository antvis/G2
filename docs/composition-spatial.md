# Spatial

## Layer

```js
(() => {
  const chart = new G2.Chart();

  const layer = chart.layer().data([
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ]);

  layer
    .view()
    .interval()
    .transform({ type: 'sortBy', fields: ['sold'], order: 'DESC' })
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre');

  layer
    .view()
    .paddingBottom(200)
    .paddingLeft(400)
    .coordinate({ type: 'transpose' })
    .coordinate({ type: 'polar' })
    .interval()
    .encode('y', 'sold')
    .encode('color', 'genre')
    .scale('color', { guide: null });

  return chart.render().node();
})();
```

## Row(Flex)

```js
(() => {
  const chart = new G2.Chart({
    width: 800,
  });

  const flex = chart.flex().data([
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ]);

  flex
    .view()
    .interval()
    .transform({ type: 'sortBy', fields: ['sold'], order: 'DESC' })
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre');

  flex
    .view()
    .coordinate({ type: 'transpose' })
    .interval()
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre');

  return chart.render().node();
})();
```

## Col(Flex)

```js
(() => {
  const chart = new G2.Chart({
    height: 800,
  });
  const flex = chart
    .flex()
    .data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ])
    .direction('col');

  flex
    .view()
    .interval()
    .transform({ type: 'sortBy', fields: ['sold'], order: 'DESC' })
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre');

  flex
    .view()
    .paddingLeft(72)
    .coordinate({ type: 'transpose' })
    .interval()
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre');

  return chart.render().node();
})();
```

## Nested(Flex)

```js
(() => {
  const chart = new G2.Chart({
    width: 840,
    height: 600,
  });

  const f1 = chart
    .flex()
    .data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ])
    .direction('row');

  f1.view()
    .interval()
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre');

  const f2 = f1.flex().direction('col');

  f2.view()
    .coordinate({ type: 'transpose' })
    .interval()
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre');

  f2.view()
    .coordinate({ type: 'polar' })
    .interval()
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .scale('y', { guide: null });

  return chart.render().node();
})();
```
