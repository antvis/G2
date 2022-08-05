# Brush

## Brush

Brush Interaction supports config `brushType`, options are: `rect`(default), `rectX`, `rectY`, `polygon`.

### Basic Brush

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
  interaction: [{ type: 'brush' }],
});
```

### BrushX

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
  interaction: [{ type: 'brush', brushType: 'rectX' }],
});
```

### BrushY

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
  interaction: [{ type: 'brush', brushType: 'rectY' }],
});
```

### Polygon Brush

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
  interaction: [{ type: 'brush', brushType: 'polygon' }],
});
```

## BrushHighlight

BrushHighlight Interaction options:

- `brushType`: type of brush, supports `rect` (default), `rectX`, `rectY` and `polygon`.
- `multiple`: whether support multiple brush selections.

Double click to cancel brush selections.

### Basic BrushHighlight

```js | dom
G2.render({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275, type: 'A' },
    { genre: 'Strategy', sold: 115, type: 'B' },
    { genre: 'Action', sold: 120, type: 'C' },
    { genre: 'Shooter', sold: 350, type: 'D' },
    { genre: 'Other', sold: 150, type: 'E' },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
  },
  interaction: [{ type: 'brushHighlight' }],
});
```

### BrushHighlightX

```js | dom
G2.render({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275, type: 'A' },
    { genre: 'Strategy', sold: 115, type: 'B' },
    { genre: 'Action', sold: 120, type: 'C' },
    { genre: 'Shooter', sold: 350, type: 'D' },
    { genre: 'Other', sold: 150, type: 'E' },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
  },
  interaction: [{ type: 'brushHighlight', brushType: 'rectX' }],
});
```

### BrushHighlightY

```js | dom
G2.render({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275, type: 'A' },
    { genre: 'Strategy', sold: 115, type: 'B' },
    { genre: 'Action', sold: 120, type: 'C' },
    { genre: 'Shooter', sold: 350, type: 'D' },
    { genre: 'Other', sold: 150, type: 'E' },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
  },
  interaction: [{ type: 'brushHighlight', brushType: 'rectY' }],
});
```

### Multiple BrushHighlight

```js | dom
G2.render({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275, type: 'A' },
    { genre: 'Strategy', sold: 115, type: 'B' },
    { genre: 'Action', sold: 120, type: 'C' },
    { genre: 'Shooter', sold: 350, type: 'D' },
    { genre: 'Other', sold: 150, type: 'E' },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
  },
  interaction: [{ type: 'brushHighlight', multiple: true }],
});
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
