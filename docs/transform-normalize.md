# Normalize

The **normalize** transform group marks into series by specified channels, and then transform each series's value, say to transform them relative to some basis to apply a moving average. The default basis is `max` and the marks are grouped by `x` channel by default. The built-in basis is as followed:

- min
- max
- first
- last
- mean
- extent
- median
- sum
- deviation

## Normalized Stacked Interval

```js
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data([
      { city: 'London', month: 'Jan.', rainfall: 18.9 },
      { city: 'London', month: 'Feb.', rainfall: 28.8 },
      { city: 'London', month: 'Mar.', rainfall: 39.3 },
      { city: 'London', month: 'Apr.', rainfall: 81.4 },
      { city: 'London', month: 'May', rainfall: 47 },
      { city: 'London', month: 'Jun.', rainfall: 20.3 },
      { city: 'London', month: 'Jul.', rainfall: 24 },
      { city: 'London', month: 'Aug.', rainfall: 35.6 },
      { city: 'Berlin', month: 'Jan.', rainfall: 12.4 },
      { city: 'Berlin', month: 'Feb.', rainfall: 23.2 },
      { city: 'Berlin', month: 'Mar.', rainfall: 34.5 },
      { city: 'Berlin', month: 'Apr.', rainfall: 99.7 },
      { city: 'Berlin', month: 'May', rainfall: 52.6 },
      { city: 'Berlin', month: 'Jun.', rainfall: 35.5 },
      { city: 'Berlin', month: 'Jul.', rainfall: 37.4 },
      { city: 'Berlin', month: 'Aug.', rainfall: 42.4 },
    ])
    .transform({ type: 'normalizeY' })
    .encode('x', 'month')
    .encode('y', 'rainfall')
    .encode('color', 'city');

  return chart.render().node();
})();
```

## Normalized Stacked Dodged Interval

Options `groupBy` can be specified as an array.

```js
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/antfincdn/mor%26R5yBI9/stack-group-column.json',
    })
    .transform({ type: 'normalizeY', groupBy: ['x', 'series'] })
    .encode('x', 'product_type')
    .encode('y', 'order_amt')
    .encode('color', 'product_sub_type')
    .encode('series', 'sex')
    .scale('y', { field: 'order' });

  return chart.render().node();
})();
```

## Normalized Stacked Area

```js
(() => {
  const chart = new G2.Chart();

  chart
    .area()
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/e58c9758-0a09-4527-aa90-fbf175b45925.json',
    })
    .transform({ type: 'stackY' })
    .transform({ type: 'normalizeY' })
    .encode('x', (d) => new Date(d.date))
    .encode('y', 'unemployed')
    .encode('color', 'industry')
    .encode('shape', 'smoothArea')
    .scale('x', { field: 'Date' })
    .scale('color', {
      guide: { size: 72, autoWrap: true, maxRows: 3, cols: 6 },
    });

  return chart.render().node();
})();
```

## Normalized Line

Specifies `basis` to `first`.

```js
(() => {
  const chart = new G2.Chart();

  chart
    .line()
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/6a9b4091-2fe1-4649-89f3-f9a211827811.json',
    })
    .transform({ type: 'normalizeY', groupBy: 'series', basis: 'first' })
    .encode('x', (d) => new Date(d.Date))
    .encode('y', 'Close')
    .encode('color', 'Symbol')
    .scale('x', { field: 'Date' });

  return chart.render().node();
})();
```
