# StackEnter

## Group by X

Intervals show group one by group.

```js | dom
G2.render({
  type: 'interval',
  data: [
    { type: 'Apple', year: '2001', value: 260 },
    { type: 'Orange', year: '2001', value: 100 },
    { type: 'Banana', year: '2001', value: 90 },
    { type: 'Apple', year: '2002', value: 210 },
    { type: 'Orange', year: '2002', value: 150 },
    { type: 'Banana', year: '2002', value: 30 },
  ],
  scale: { enter: { type: 'identity' } },
  transform: [{ type: 'stackEnter', by: ['x'] }],
  encode: {
    x: 'year',
    y: 'value',
    color: 'type',
    series: 'type',
    enterDuration: 1000,
  },
});
```

## Group by Color

Intervals shows up series by series.

```js | dom
G2.render({
  type: 'interval',
  data: [
    { type: 'Apple', year: '2001', value: 260 },
    { type: 'Orange', year: '2001', value: 100 },
    { type: 'Banana', year: '2001', value: 90 },
    { type: 'Apple', year: '2002', value: 210 },
    { type: 'Orange', year: '2002', value: 150 },
    { type: 'Banana', year: '2002', value: 30 },
  ],
  scale: { enter: { type: 'identity' } },
  transform: [{ type: 'stackEnter', by: ['color'] }],
  encode: {
    x: 'year',
    y: 'value',
    color: 'type',
    series: 'type',
    enterDuration: 1000,
  },
});
```

## Group by Color and X

Intervals shows up series by series then group by group.

```js | dom
G2.render({
  type: 'interval',
  data: [
    { type: 'Apple', year: '2001', value: 260 },
    { type: 'Orange', year: '2001', value: 100 },
    { type: 'Banana', year: '2001', value: 90 },
    { type: 'Apple', year: '2002', value: 210 },
    { type: 'Orange', year: '2002', value: 150 },
    { type: 'Banana', year: '2002', value: 30 },
  ],
  scale: { enter: { type: 'identity' } },
  transform: [{ type: 'stackEnter', by: ['color', 'x'] }],
  encode: {
    x: 'year',
    y: 'value',
    color: 'type',
    series: 'type',
    enterDuration: 1000,
  },
});
```

## Group by X and Color

Intervals shows up group by group and then series by series.

```js | dom
G2.render({
  type: 'interval',
  data: [
    { type: 'Apple', year: '2001', value: 260 },
    { type: 'Orange', year: '2001', value: 100 },
    { type: 'Banana', year: '2001', value: 90 },
    { type: 'Apple', year: '2002', value: 210 },
    { type: 'Orange', year: '2002', value: 150 },
    { type: 'Banana', year: '2002', value: 30 },
  ],
  scale: { enter: { type: 'identity' } },
  transform: [{ type: 'stackEnter', by: ['x', 'color'] }],
  encode: {
    x: 'year',
    y: 'value',
    color: 'type',
    series: 'type',
    enterDuration: 1000,
  },
});
```

## For Stack Interval

StackEnter is useful for stack intervals.

```js | dom
G2.render({
  type: 'interval',
  data: [
    { type: 'Apple', year: '2001', value: 260 },
    { type: 'Orange', year: '2001', value: 100 },
    { type: 'Banana', year: '2001', value: 90 },
    { type: 'Apple', year: '2002', value: 210 },
    { type: 'Orange', year: '2002', value: 150 },
    { type: 'Banana', year: '2002', value: 30 },
  ],
  scale: { enter: { type: 'identity' } },
  transform: [{ type: 'stackEnter', by: ['color'] }],
  encode: {
    x: 'year',
    y: 'value',
    color: 'type',
    enterDuration: 1000,
  },
});
```
