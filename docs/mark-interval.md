# Interval

## Basic Interval

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
    .encode('label', 'sold');

  return chart.render().node();
})();
```

## Flex Interval

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

## Hollow Interval

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
    .encode('shape', 'hollowRect');

  return chart.render().node();
})();
```

## Transpose Interval

```js
(() => {
  const chart = new G2.Chart({ paddingLeft: 72 });

  chart.coordinate({ type: 'transpose' });

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

## Polar Interval

```js
(() => {
  const chart = new G2.Chart();

  chart.coordinate({ type: 'polar' });

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
    .scale('x', { padding: 0.05 })
    .scale('y', { guide: null })
    .style('radius', 10);

  return chart.render().node();
})();
```

## Reflect Interval

```js
(() => {
  const chart = new G2.Chart();

  chart.coordinate({ type: 'reflect' });

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
    .scale('x', { padding: 0.05 })
    .scale('y', { guide: null })
    .style('radius', 10);

  return chart.render().node();
})();
```

## Helix Interval

```js
(() => {
  // mock data
  const data = [];
  const n = 31;
  for (let i = 0; i < 372; i++) {
    const now = Date();
    data[i] = {};
    data[i].time = new Date(now).getTime() + i * 1000 * 3600 * 24;
    const random = Math.floor(Math.random() * 10);
    if ((i % n > 2 && i % n < 4) || (i % n >= 6 && i % n < 7)) {
      data[i].value = 30 + random * 7;
    } else if (i % n >= 4 && i % n < 6) {
      data[i].value = 60 + random * 8;
    } else {
      data[i].value = 10 + random * 5;
    }
  }
  const chart = new G2.Chart();

  chart.coordinate({
    type: 'helix',
    startAngle: 0.5 * Math.PI,
    endAngle: 12.5 * Math.PI,
  });

  chart
    .interval()
    .data(data)
    .encode('x', 'time')
    .encode('y', 'value')
    .encode('color', 'time');

  return chart.render().node();
})();
```

## Polar+Transpose Interval

```js
(() => {
  const chart = new G2.Chart();

  chart.coordinate({ type: 'transpose' }).coordinate({ type: 'polar' });

  //@todo Hide the last label to avoid overlap.
  //@todo Maybe don't need to specify guide type?
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
    .scale('color', { guide: { position: 'right', size: 65 } })
    .scale('y', { guide: { type: 'axisY' } });

  return chart.render().node();
})();
```

## Theta Interval

```js
(() => {
  const chart = new G2.Chart();

  chart.coordinate({ type: 'theta' });

  //@todo Hide the last label to avoid overlap.
  //@todo Maybe don't need to specify guide type?
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
    .scale('color', { guide: { position: 'right', size: 65 } })
    .scale('y', { guide: { type: 'axisY' } });

  return chart.render().node();
})();
```

## Polar+Transpose+StackY Interval

```js
(() => {
  const chart = new G2.Chart();

  chart.coordinate({ type: 'transpose' }).coordinate({ type: 'polar' });

  chart
    .interval()
    .data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ])
    .encode('y', 'sold')
    .encode('color', 'genre');

  return chart.render().node();
})();
```

## StackY Interval

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
    .encode('x', 'month')
    .encode('y', 'rainfall')
    .encode('color', 'city');

  return chart.render().node();
})();
```

## DodgeX Interval

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
    .encode('x', 'month')
    .encode('y', 'rainfall')
    .encode('color', 'city')
    .encode('series', 'city');

  return chart.render().node();
})();
```

## StackY+DodgeX Interval

```js
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data({
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/antfincdn/mor%26R5yBI9/stack-group-column.json',
    })
    .encode('x', 'product_type')
    .encode('y', 'order_amt')
    .encode('color', 'product_sub_type')
    .encode('series', 'sex');

  return chart.render().node();
})();
```

## Range Interval

```js
(() => {
  const chart = new G2.Chart({
    paddingLeft: 60,
  });

  chart
    .interval()
    .data([
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
    ])
    .encode('x', 'month')
    .encode('y', ['end', 'start'])
    .encode('color', (d) =>
      d.month === 'Total' ? 'Total' : d.profit > 0 ? 'Increase' : 'Decrease',
    );

  return chart.render().node();
})();
```
