# Area

## Basic Area

```js
(() => {
  const chart = new G2.Chart();

  chart
    .area()
    .data([
      { year: '1951 年', sale: 38 },
      { year: '1952 年', sale: 52 },
      { year: '1956 年', sale: 61 },
      { year: '1957 年', sale: 145 },
      { year: '1958 年', sale: 48 },
      { year: '1959 年', sale: 38 },
      { year: '1960 年', sale: 38 },
      { year: '1962 年', sale: 38 },
    ])
    .encode('x', 'year')
    .encode('y', 'sale');

  return chart.render().node();
})();
```

## Stacked Area

```js
(() => {
  const chart = new G2.Chart();

  chart
    .area()
    .data([
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
    ])
    .transform({ type: 'stackY' })
    .encode('x', 'year')
    .encode('y', 'sale')
    .encode('color', 'type')
    .encode('shape', 'smooth');

  return chart.render().node();
})();
```

## Symmetry Area

```js
(() => {
  const chart = new G2.Chart();

  chart
    .area()
    .data([
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
    ])
    .transform({ type: 'stackY' })
    .transform({ type: 'symmetryY' })
    .encode('x', 'year')
    .encode('y', 'sale')
    .encode('color', 'type')
    .encode('shape', 'smooth');

  return chart.render().node();
})();
```

## Gradient Area

```js
(() => {
  const chart = new G2.Chart();

  chart
    .area()
    .data([
      { year: '1991', value: 0 },
      { year: '1992', value: 632 },
      { year: '1993', value: 432 },
      { year: '1994', value: 1941 },
      { year: '1995', value: 1532 },
      { year: '1996', value: 15588 },
      { year: '1997', value: 16514 },
      { year: '1998', value: 16572 },
      { year: '1999', value: 17765 },
    ])
    .encode('x', 'year')
    .encode('y', 'value')
    .encode('color', 'value')
    .encode('shape', 'smooth')
    .encode('series', 'a')
    .style('gradient', true);

  return chart.render().node();
})();
```

## Area In Polar

```js
(() => {
  const chart = new G2.Chart();

  chart.coordinate({ type: 'polar' });

  chart
    .area()
    .data([
      { item: 'Design', type: 'a', score: 70 },
      { item: 'Design', type: 'b', score: 30 },
      { item: 'Development', type: 'a', score: 60 },
      { item: 'Development', type: 'b', score: 70 },
      { item: 'Marketing', type: 'a', score: 50 },
      { item: 'Marketing', type: 'b', score: 60 },
      { item: 'Users', type: 'a', score: 40 },
      { item: 'Users', type: 'b', score: 50 },
      { item: 'Test', type: 'a', score: 60 },
      { item: 'Test', type: 'b', score: 70 },
      { item: 'Language', type: 'a', score: 70 },
      { item: 'Language', type: 'b', score: 50 },
      { item: 'Technology', type: 'a', score: 50 },
      { item: 'Technology', type: 'b', score: 40 },
      { item: 'Support', type: 'a', score: 30 },
      { item: 'Support', type: 'b', score: 40 },
      { item: 'Sales', type: 'a', score: 60 },
      { item: 'Sales', type: 'b', score: 40 },
      { item: 'UX', type: 'a', score: 50 },
      { item: 'UX', type: 'b', score: 60 },
    ])
    .encode('x', 'item')
    .encode('y', 'score')
    .encode('color', 'type')
    .encode('shape', 'smooth')
    .scale('x', { guide: { type: 'axisX' }, padding: 0.5, align: 0 })
    .scale('y', {
      guide: { type: 'axisY', zIndex: 1 },
      tickCount: 5,
    })
    .style('fillOpacity', 0.5);

  return chart.render().node();
})();
```
