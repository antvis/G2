# Brush

## Brush

Brush Interaction supports config `brushType`, options are: `rect`(default), `rectX`, `rectY`, `polygon`.

### Basic Brush

```js
(() => {
  const chart = new G2.Chart();

  chart
    .point()
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
    })
    .encode('x', 'height')
    .encode('y', 'weight')
    .encode('color', 'gender');

  chart.interaction({ type: 'brush' });

  return chart.render().node();
})();
```

### BrushX

```js
(() => {
  const chart = new G2.Chart();

  chart
    .point()
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
    })
    .encode('x', 'height')
    .encode('y', 'weight')
    .encode('color', 'gender');

  chart.interaction({ type: 'brush', brushType: 'rectX' });

  return chart.render().node();
})();
```

### BrushY

```js
(() => {
  const chart = new G2.Chart();

  chart
    .point()
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
    })
    .encode('x', 'height')
    .encode('y', 'weight')
    .encode('color', 'gender');

  chart.interaction({ type: 'brush', brushType: 'rectY' });

  return chart.render().node();
})();
```

### Polygon Brush

```js
(() => {
  const chart = new G2.Chart();

  chart
    .point()
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
    })
    .encode('x', 'height')
    .encode('y', 'weight')
    .encode('color', 'gender');

  chart.interaction({ type: 'brush', brushType: 'polygon' });

  return chart.render().node();
})();
```

## BrushHighlight

BrushHighlight Interaction options:

- `brushType`: type of brush, supports `rect` (default), `rectX`, `rectY` and `polygon`.
- `multiple`: whether support multiple brush selections.

Double click to cancel brush selections.

### Basic BrushHighlight

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
    .encode('y', 'sold');

  chart.interaction({ type: 'brushHighlight' });

  return chart.render().node();
})();
```

### BrushHighlightX

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
    .encode('y', 'sold');

  chart.interaction({ type: 'brushHighlight', brushType: 'rectX' });

  return chart.render().node();
})();
```

### BrushHighlightY

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
    .encode('y', 'sold');

  chart.interaction({ type: 'brushHighlight', brushType: 'rectY' });

  return chart.render().node();
})();
```

### Multiple BrushHighlight

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
    .encode('y', 'sold');

  chart.interaction({ type: 'brushHighlight', multiple: true });

  return chart.render().node();
})();
```

## BrushVisible

```js | dom
G2.render({
  type: 'point',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
    },
  ],
  encode: {
    x: 'height',
    y: 'weight',
    color: 'gender',
  },
  interaction: [{ type: 'brushVisible' }],
});
```
