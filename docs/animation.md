# Animation

## TimeEffect

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
  animate: {
    enter: {
      duration: 1000, //  Specify effect time by animate options.
      delay: 300,
    },
  },
});
```

## Animation Type

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
  animate: {
    enter: {
      type: 'fadeIn', //  Specify animation type.
      duration: 2000,
    },
  },
});
```

## Encode EnterType

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
    enterType: { range: ['scaleInY', 'fadeIn'] }, // Specify animation types.
  },
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
    enterType: (d) => (d.sold > 200 ? 'high' : 'low'),
  },
  animate: {
    enter: {
      duration: 3000,
    },
  },
});
```

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
    enterType: { type: 'identity' },
  },
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
    enterType: (d) => (d.sold > 200 ? 'scaleInY' : 'fadeIn'),
  },
  animate: {
    enter: {
      duration: 3000,
    },
  },
});
```

## Encode EnterDelay and EnterDuration

```js | dom
G2.render({
  type: 'interval',
  width: 720,
  data: [
    { name: 'event planning', startTime: 1, endTime: 4 },
    { name: 'layout logistics', startTime: 3, endTime: 13 },
    { name: 'select vendors', startTime: 5, endTime: 8 },
    { name: 'hire venue', startTime: 9, endTime: 13 },
    { name: 'hire caterer', startTime: 10, endTime: 14 },
    { name: 'hire event decorators', startTime: 12, endTime: 17 },
    { name: 'rehearsal', startTime: 14, endTime: 16 },
    { name: 'event celebration', startTime: 17, endTime: 18 },
  ],
  paddingTop: 60,
  paddingLeft: 100,
  coordinate: [{ type: 'transpose' }],
  scale: {
    // All the intervals will show up in 10s.
    // But the animation will take more than 10s to finish.
    enter: { range: [0, 10000], zero: true },
    color: { guide: { size: 60, autoWrap: true, maxRows: 2, cols: 5 } },
  },
  encode: {
    x: 'name',
    y: ['endTime', 'startTime'],
    color: 'name',
    // The appear time of interval is linearly related to startTime.
    enterDelay: 'startTime',
    // The duration of interval animation is linearly related to duration time.
    enterDuration: (d) => d.endTime - d.startTime,
  },
});
```
