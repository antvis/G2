# Interval

## Basic Interval

```js | dom
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

## Flex Interval

```js | dom
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
    x: { flex: [2, 3, 1, 4, 2] },
  },
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
});
```

## Hollow Interval

```js | dom
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
    shape: 'hollowRect',
  },
});
```

## Transpose Interval

```js | dom
G2.render({
  paddingLeft: 70,
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  coordinate: [{ type: 'transpose' }],
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
});
```

## Polar Interval

```js | dom
G2.render({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  coordinate: [{ type: 'polar' }],
  scale: { x: { padding: 0.05 } },
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
  style: {
    radius: 10,
  },
});
```

## Polar+Transpose Interval

```js | dom
G2.render({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  coordinate: [{ type: 'transpose' }, { type: 'polar' }],
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
});
```

## Polar+Transpose+StackY Interval

```js | dom
G2.render({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  coordinate: [{ type: 'transpose' }, { type: 'polar' }],
  encode: {
    y: 'sold',
    color: 'genre',
  },
});
```

## StackY Interval

```js | dom
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
  encode: {
    x: 'month',
    y: 'rainfall',
    color: 'city',
  },
});
```

## DodgeX Interval

```js | dom
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
  encode: {
    x: 'month',
    y: 'rainfall',
    color: 'city',
    series: 'city',
  },
});
```

## StackY+DodgeX Interval

```js | dom
G2.render({
  type: 'interval',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/antfincdn/mor%26R5yBI9/stack-group-column.json',
    },
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

## Range Interval

```js
G2.render({
  type: 'interval',
  data: [
    { month: 'Jan.', profit: 387264, start: 0, end: 387264 },
    { month: 'Feb.', profit: 772096, start: 387264, end: 1159360 },
    { month: 'Mar.', profit: 638075, start: 1159360, end: 1797435 },
    { month: 'Apr.', profit: -211386, start: 1797435, end: 1586049 },
    { month: 'May', profit: -138135, start: 1586049, end: 1447914 },
    { month: 'Jun', profit: -267238, start: 1447914, end: 1180676 },
    { month: 'Jul.', profit: 431406, start: 1180676, end: 1612082 },
    { month: 'Aug.', profit: 363018, start: 1612082, end: 1975100 },
    { month: 'Sep.', profit: -224638, start: 1975100, end: 1750462 },
    { month: 'Oct.', profit: -299867, start: 1750462, end: 1450595 },
    { month: 'Nov.', profit: 607365, start: 1450595, end: 2057960 },
    { month: 'Dec.', profit: 1106986, start: 2057960, end: 3164946 },
    { month: 'Total', start: 0, end: 3164946 },
  ],
  paddingLeft: 60,
  scale: {
    y: { guide: { label: { formatter: (d) => `${+d.text / 1000}k` } } },
  },
  encode: {
    x: 'month',
    y: ['end', 'start'],
    color: (d) =>
      d.month === 'Total' ? 'Total' : d.profit > 0 ? 'Increase' : 'Decrease',
  },
});
```
