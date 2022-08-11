# Scale

## Linear

The scale for y channel of following interval is linear scale.

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
    .scale('y', { range: [0.9, 0.1] });

  return chart.render().node();
})();
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
    .encode('color', (_, i) => i)
    .scale('color', { range: ['red', 'yellow'] });

  return chart.render().node();
})();
```

## Log

The scale for size channel of following point is log scale.

```js | dom
(() => {
  const chart = new G2.Chart();

  chart
    .point()
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
    })
    .encode('x', 'GDP')
    .encode('y', 'LifeExpectancy')
    .encode('size', 'Population')
    .encode('size', 'Population')
    .encode('color', 'continent')
    .scale('size', { type: 'log', range: [4, 20] })
    .style('fillOpacity', 0.3)
    .style('lineWidth', 1);

  return chart.render().node();
})();
```

## Pow

The scale for size channel of following point is pow scale.

```js | dom
(() => {
  const chart = new G2.Chart();

  chart
    .point()
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
    })
    .encode('x', 'GDP')
    .encode('y', 'LifeExpectancy')
    .encode('size', 'Population')
    .encode('size', 'Population')
    .encode('color', 'continent')
    .scale('size', { type: 'pow', range: [4, 20] })
    .style('fillOpacity', 0.3)
    .style('lineWidth', 1);

  return chart.render().node();
})();
```

## Time

The scale for x channel of following line is time scale.

```js
(() => {
  const chart = new G2.Chart();

  chart
    .line()
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/ab55d10f-24da-465a-9eba-87ac4b7a83ec.json',
    })
    .encode('x', (d) => new Date(d.Date))
    .encode('y', 'Close');

  return chart.render().node();
})();
```

## Band

The scale for x channel of following interval is linear scale.

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
    .scale('x', { padding: 0.2, range: [0.05, 0.95] });

  return chart.render().node();
})();
```

Flex option.

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
    .encode('color', 'genre')
    .scale('x', { flex: [2, 3, 1, 4, 2] });

  return chart.render().node();
})();
```

## Ordinal

The scale for color channel of following point is ordinal scale.

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
    .encode('color', 'gender')
    .encode('shape', 'hollowPoint')
    .scale('color', { range: ['orange', 'steelblue'] });

  return chart.render().node();
})();
```

## Identity

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
    .encode('color', 'steelblue')
    .scale('color', { type: 'identity' });

  return chart.render().node();
})();
```

## Threshold

```js
(() => {
  const chart = new G2.Chart({
    width: 900,
    height: 280,
  });

  chart
    .grid()
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/89c20fe8-0c6f-46c8-b36b-4cb653dba8ed.json',
      callback: (d) => ({ salary: d }),
    })
    .encode('x', (_, i) => ((i / 5) | 0) + 1)
    .encode('y', (_, i) => (i % 5) + 1)
    .encode('color', 'salary')
    .scale('color', {
      type: 'threshold',
      domain: [10000, 100000],
      range: ['#eee', 'pink', 'red'],
    })
    .style('stroke', 'black')
    .style('lineWidth', 1);

  return chart.render().node();
})();
```

## Quantize

```js
(() => {
  const chart = new G2.Chart({
    width: 900,
    height: 280,
  });

  chart
    .grid()
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/89c20fe8-0c6f-46c8-b36b-4cb653dba8ed.json',
      callback: (d) => ({ salary: d }),
    })
    .encode('x', (_, i) => ((i / 5) | 0) + 1)
    .encode('y', (_, i) => (i % 5) + 1)
    .encode('color', 'salary')
    .scale('color', {
      type: 'quantize',
      domain: [10000, 100000],
      range: ['#eee', 'pink', 'red'],
    })
    .style('stroke', 'black')
    .style('lineWidth', 1);

  return chart.render().node();
})();
```

## Quantile

```js
(() => {
  const chart = new G2.Chart({
    width: 900,
    height: 280,
  });

  chart
    .grid()
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/89c20fe8-0c6f-46c8-b36b-4cb653dba8ed.json',
      callback: (d) => ({ salary: d }),
    })
    .encode('x', (_, i) => ((i / 5) | 0) + 1)
    .encode('y', (_, i) => (i % 5) + 1)
    .encode('color', 'salary')
    .scale('color', {
      type: 'quantile',
      range: ['#eee', 'pink', 'red'],
    })
    .style('stroke', 'black')
    .style('lineWidth', 1);

  return chart.render().node();
})();
```
