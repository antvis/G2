# StackEnter

## Group by X

Intervals show group one by group.

```js
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data([
      { type: 'Apple', year: '2001', value: 260 },
      { type: 'Orange', year: '2001', value: 100 },
      { type: 'Banana', year: '2001', value: 90 },
      { type: 'Apple', year: '2002', value: 210 },
      { type: 'Orange', year: '2002', value: 150 },
      { type: 'Banana', year: '2002', value: 30 },
    ])
    .transform({ type: 'stackEnter', by: ['x'] })
    .encode('x', 'year')
    .encode('y', 'value')
    .encode('color', 'type')
    .encode('series', 'type')
    .encode('enterDuration', 1000);

  return chart.render().node();
})();
```

## Group by Color

Intervals shows up series by series.

```js
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data([
      { type: 'Apple', year: '2001', value: 260 },
      { type: 'Orange', year: '2001', value: 100 },
      { type: 'Banana', year: '2001', value: 90 },
      { type: 'Apple', year: '2002', value: 210 },
      { type: 'Orange', year: '2002', value: 150 },
      { type: 'Banana', year: '2002', value: 30 },
    ])
    .transform({ type: 'stackEnter', by: ['color'] })
    .encode('x', 'year')
    .encode('y', 'value')
    .encode('color', 'type')
    .encode('series', 'type')
    .encode('enterDuration', 1000);

  return chart.render().node();
})();
```

## Group by Color and X

Intervals shows up series by series then group by group.

```js
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data([
      { type: 'Apple', year: '2001', value: 260 },
      { type: 'Orange', year: '2001', value: 100 },
      { type: 'Banana', year: '2001', value: 90 },
      { type: 'Apple', year: '2002', value: 210 },
      { type: 'Orange', year: '2002', value: 150 },
      { type: 'Banana', year: '2002', value: 30 },
    ])
    .transform({ type: 'stackEnter', by: ['color', 'x'] })
    .encode('x', 'year')
    .encode('y', 'value')
    .encode('color', 'type')
    .encode('series', 'type')
    .encode('enterDuration', 1000);

  return chart.render().node();
})();
```

## Group by X and Color

Intervals shows up group by group and then series by series.

```js
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data([
      { type: 'Apple', year: '2001', value: 260 },
      { type: 'Orange', year: '2001', value: 100 },
      { type: 'Banana', year: '2001', value: 90 },
      { type: 'Apple', year: '2002', value: 210 },
      { type: 'Orange', year: '2002', value: 150 },
      { type: 'Banana', year: '2002', value: 30 },
    ])
    .transform({ type: 'stackEnter', by: ['x', 'color'] })
    .encode('x', 'year')
    .encode('y', 'value')
    .encode('color', 'type')
    .encode('series', 'type')
    .encode('enterDuration', 1000);

  return chart.render().node();
})();
```

## For Stack Interval

StackEnter is useful for stack intervals.

```js
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data([
      { type: 'Apple', year: '2001', value: 260 },
      { type: 'Orange', year: '2001', value: 100 },
      { type: 'Banana', year: '2001', value: 90 },
      { type: 'Apple', year: '2002', value: 210 },
      { type: 'Orange', year: '2002', value: 150 },
      { type: 'Banana', year: '2002', value: 30 },
    ])
    .transform({ type: 'stackEnter', by: ['color'] })
    .encode('x', 'year')
    .encode('y', 'value')
    .encode('color', 'type')
    .encode('enterDuration', 1000);

  return chart.render().node();
})();
```
