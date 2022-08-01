# Interaction

## Fisheye

**Bubble with fisheye.**

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
  interaction: [{ type: 'fisheye' }],
});
```

**Interval with fisheye.**

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
    color: 'genre',
  },
  interaction: [{ type: 'fisheye' }],
});
```

## Brush

**Basic brush.**

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

**BrushX.**

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

**BrushY.**

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

## BrushHighlight

**Basic BrushHighlight.**

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

**Basic BrushHighlightX.**

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

**Basic BrushHighlightY.**

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

**BrushHighlight with `polygon` brushType.**

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
  interaction: [{ type: 'brushHighlight', brushType: 'polygon' }],
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

## EllipsisText with custom options

```js | dom
G2.render({
  type: 'area',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/e58c9758-0a09-4527-aa90-fbf175b45925.json',
    },
    { type: 'stackY' },
    { type: 'normalizeY' },
  ],
  paddingTop: 72,
  scale: {
    x: { field: 'Date' },
    color: {
      guide: {
        size: 72,
        autoWrap: true,
        maxRows: 3,
        cols: 6,
      },
    },
  },
  width: 700,
  interaction: [
    {
      type: 'ellipsisText',
      x: 576,
      y: 30,
      htmlStyle: 'max-width:120px;overflow:hidden;',
    },
  ],
  encode: {
    shape: 'smoothArea',
    x: (d) => new Date(d.date),
    y: 'unemployed',
    color: 'industry',
  },
});
```
