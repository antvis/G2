# Component

<!-- Title


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
}); -->

## Legend

Legend component will be generate from a **color** scale.

If the scale is ordinal or categorical, by default the legend appears as a categorical legend, otherwise the legend appears as a continuous if the scale is continuous.

### Categorical

**Basic categorical legend.**

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

**Custom legend.**

```js
(() => {
  const chart = new G2.Chart();

  chart
    .area()
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/e58c9758-0a09-4527-aa90-fbf175b45925.json',
    })
    .transform({ type: 'stackY', orderBy: 'sum' })
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

### Continuous

```js
(() => {
  const chart = new G2.Chart({ paddingLeft: 60 });

  chart
    .interval()
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
    })
    .transform({ type: 'groupX', y: 'mean' })
    .encode('x', 'clarity')
    .encode('y', 'price')
    .encode('color', 'price')
    .scale('color', { range: ['yellow', 'orange'] });

  return chart.render().node();
})();
```

## Axis

### title

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
    .scale('x', {
      guide: {
        title: {
          titleAnchor: 'end',
          content: 'genre →',
          style: { fontWeight: 'lighter' },
        },
      },
    })
    .scale('y', {
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
    });

  return chart.render().node();
})();
```

### label

```js
(() => {
  const chart = new G2.Chart({
    width: 640,
    height: 300,
  });

  chart
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/blockchain.json',
    })
    .transform({
      type: 'fold',
      fields: ['blockchain', 'nlp'],
      as: ['metric', 'value'],
    });

  chart
    .line()
    .encode('x', (d) => new Date(d.date))
    .encode('y', 'value')
    .encode('color', 'metric')
    .scale('x', {
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
    })
    .scale('color', { guide: null });

  return chart.render().node();
})();
```
