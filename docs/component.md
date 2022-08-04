# Component

## Title

```js
G2.render({
  title: 'Basic usage.',
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
  },
});
```

```js
G2.render({
  title: {
    size: 60,
    text: 'Title with subtitle and custom style.',
    style: { fontSize: 18 },
    subtitle: 'Description of chart.',
    subtitleStyle: { fill: 'grey' },
  },
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  scale: { color: { guide: { title: null } } },
  encode: {
    x: 'genre',
    y: 'sold',
  },
});
```

## Legend

> Legend component will be infer to generate for a **color** scale.
> If the scale is ordinal or categorical, by default the legend appears as a categorical legend, otherwise the legend appears as a continuous if the scale is linear.

### Categorical legend

**Basic categorical legend.**

```js
G2.render({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
});
```

**Custom legend.**

```js
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
  encode: {
    shape: 'smoothArea',
    x: (d) => new Date(d.date),
    y: 'unemployed',
    color: 'industry',
  },
});
```

### Continuous legend

```js
G2.render({
  type: 'interval',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
    },
    {
      type: 'groupX',
      y: 'mean',
    },
  ],
  paddingLeft: 60,
  encode: {
    x: 'clarity',
    y: 'price',
    color: 'price',
  },
});
```

## Axis

### Axis title

```js
G2.render({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  scale: {
    x: {
      guide: {
        title: {
          titleAnchor: 'end',
          content: 'genre →',
          style: { fontWeight: 'lighter' },
        },
      },
    },
    y: {
      guide: {
        title: {
          // relative to axis line.
          positionX: -8,
          positionY: -12,
          content: 'sold ↑',
          rotate: 0,
          style: { fontWeight: 'lighter' },
        },
      },
    },
  },
  encode: {
    x: 'genre',
    y: 'sold',
  },
});
```

### Axis label

```js
G2.render({
  height: 300,
  width: 640,
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/blockchain.json',
    },
    {
      type: 'fold',
      fields: ['blockchain', 'nlp'],
      as: ['metric', 'value'],
    },
  ],
  scale: {
    x: {
      guide: {
        label: {
          autoHide: 'greedy',
          showLast: false,
          style: (datum, idx, data) => {
            const isYear = (d) => !Number.isNaN(Number(d));
            return {
              fontWeight: isYear(datum.text) ? 'bold' : 'lighter',
            };
          },
        },
      },
    },
    color: { guide: null },
  },
  type: 'line',
  encode: {
    x: (d) => new Date(d.date),
    y: 'value',
    color: 'metric',
  },
});
```

## Grid

## Tooltip

> TODO

## Slider

> TODO

## Scrollbar

> TODO

## Timeline

> TODO
