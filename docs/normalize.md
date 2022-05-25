# Normalize

Group marks into series by specified channels, and then transform each series's value, say to transform them relative to some basis to apply a moving average. The default basis is `max` and the marks are grouped by `x` channel by default. The built-in basis is as followed:

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
G2.render({
  type: 'interval',
  data: [
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
  ],
  transform: [{ type: 'normalizeY' }],
  encode: {
    x: 'month',
    y: 'rainfall',
    color: 'city',
  },
});
```

## Normalized Stacked Dodged Interval

Options `groupBy` can be specified as an array.

```js
G2.render({
  type: 'interval',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/antfincdn/mor%26R5yBI9/stack-group-column.json',
    },
    { type: 'normalizeY', groupBy: ['x', 'series'] },
  ],
  scale: { y: { field: 'order' } },
  encode: {
    x: 'product_type',
    y: 'order_amt',
    color: 'product_sub_type',
    series: 'sex',
  },
});
```

## Normalized Stacked Area

```js
G2.render({
  type: 'area',
  data: [
    { year: '1991', sale: 15468, type: '办公用品' },
    { year: '1992', sale: 16100, type: '办公用品' },
    { year: '1993', sale: 15900, type: '办公用品' },
    { year: '1994', sale: 17409, type: '办公用品' },
    { year: '1995', sale: 17000, type: '办公用品' },
    { year: '1996', sale: 31056, type: '办公用品' },
    { year: '1997', sale: 31982, type: '办公用品' },
    { year: '1998', sale: 32040, type: '办公用品' },
    { year: '1999', sale: 33233, type: '办公用品' },
    { year: '1991', sale: 11468, type: '食品' },
    { year: '1992', sale: 16100, type: '食品' },
    { year: '1993', sale: 19900, type: '食品' },
    { year: '1994', sale: 17409, type: '食品' },
    { year: '1995', sale: 20000, type: '食品' },
    { year: '1996', sale: 18056, type: '食品' },
    { year: '1997', sale: 28982, type: '食品' },
    { year: '1998', sale: 32040, type: '食品' },
    { year: '1999', sale: 40233, type: '食品' },
  ],
  transform: [{ type: 'stackY' }, { type: 'normalizeY' }],
  encode: {
    x: 'year',
    y: 'sale',
    color: 'type',
    shape: 'smoothArea',
  },
});
```

## Normalized Line

Specifies `basis` to `first`.

```js
G2.render({
  type: 'line',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/6a9b4091-2fe1-4649-89f3-f9a211827811.json',
    },
    {
      type: 'normalizeY',
      groupBy: 'series',
      basis: 'first',
    },
  ],
  scale: { x: { field: 'Date' } },
  encode: {
    x: (d) => new Date(d.Date),
    y: 'Close',
    color: 'Symbol',
  },
});
```
