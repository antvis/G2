# Interval

- <a href="#basic-interval">Basic Interval</a>
- <a href="#flex-interval">Flex Interval</a>
- <a href="#hollow-interval">Hollow Interval</a>
- <a href="#transpose-interval">Transpose Interval</a>
- <a href="#polar-interval">Polar Interval</a>
- <a href="#polar+transpose-interval">Polar+Transpose Interval</a>
- <a href="#polar+transpose+stacky-interval">Polar+Transpose+StackY Interval</a>
- <a href="#stacky-interval">StackY Interval</a>
- <a href="#dodgex-interval">DodgeX Interval</a>
- <a href="#stacky+dodgex-interval">StackY+DodgeX Interval</a>

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
  statistic: [{ type: 'stackY' }],
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
  statistic: [{ type: 'stackY' }],
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
