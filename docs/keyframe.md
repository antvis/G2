# Keyframe

> The flashing problem should be solved in the future.

Keyframe composition provide a convent mechanism to author storytelling. It can be declared as simple as css animation, expect the object which applied animation change from a simple shape to a chart. It support following options for keyframe composition.

- _duration_ - the duration for each frame 
- _iterationCount_ the play count for the animation, which can be a number of *infinite*
- _direction_ - the play direction for the animation, which can be *normal*, *reverse*, *alternate*, *reverse-alternate*
- _easing_ - the easing function for each frame

## One to One

```js
(() => {
  const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ];
  return G2.render({
    type: 'keyframe',
    children: [
      {
        type: 'point',
        data,
        scale: {
          x: { guide: null },
          y: { guide: null },
        },
        encode: {
          key: 'genre',
          size: 50,
        },
      },
      {
        type: 'point',
        data,
        scale: {
          x: { guide: null, padding: 0.5 },
          y: { guide: null },
        },
        encode: {
          x: 'genre',
          key: 'genre',
          color: 'orange',
          size: 50,
        },
      },
      {
        type: 'interval',
        data,
        encode: {
          x: 'genre',
          y: 'sold',
          color: 'genre',
          key: 'genre',
        },
      },
      {
        type: 'interval',
        data,
        coordinate: [{ type: 'transpose' }],
        encode: {
          y: 'sold',
          color: 'genre',
          key: 'genre',
        },
      },
      {
        type: 'interval',
        data,
        coordinate: [{ type: 'transpose' }, { type: 'polar' }],
        encode: {
          y: 'sold',
          color: 'genre',
          key: 'genre',
        },
      },
      {
        type: 'interval',
        data,
        coordinate: [{ type: 'polar' }],
        encode: {
          x: 'genre',
          y: 'sold',
          color: 'genre',
          key: 'genre',
        },
        style: {
          radius: 10,
        },
      },
      {
        type: 'interval',
        data,
        coordinate: [{ type: 'transpose' }],
        encode: {
          x: 'genre',
          y: 'sold',
          color: 'orange',
          key: 'genre',
        },
      },
      {
        type: 'interval',
        data,
        transform: [
          {
            type: 'sortBy',
            fields: ['sold'],
            order: 'DESC',
          },
        ],
        coordinate: [{ type: 'transpose' }],
        encode: {
          x: 'genre',
          y: 'sold',
          color: (d, i) => i,
          key: 'genre',
        },
      },
    ],
  });
})();
```

## Duration

```js
(() => {
  const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ];
  return G2.render({
    type: 'keyframe',
    duration: 2000,
    children: [
      {
        type: 'interval',
        data,
        encode: {
          x: 'genre',
          y: 'sold',
          color: 'genre',
          key: 'genre',
        },
      },
      {
        type: 'interval',
        data,
        coordinate: [{ type: 'polar' }],
        encode: {
          x: 'genre',
          y: 'sold',
          color: 'genre',
          key: 'genre',
        },
      },
    ],
  });
})();
```

## IterationCount

### Number

```js
(() => {
  const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ];
  return G2.render({
    type: 'keyframe',
    iterationCount: 2,
    children: [
      {
        type: 'interval',
        data,
        encode: {
          x: 'genre',
          y: 'sold',
          color: 'genre',
          key: 'genre',
        },
      },
      {
        type: 'interval',
        data,
        coordinate: [{ type: 'polar' }],
        encode: {
          x: 'genre',
          y: 'sold',
          color: 'genre',
          key: 'genre',
        },
      },
    ],
  });
})();
```

### Infinite

```js
(() => {
  const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ];
  return G2.render({
    type: 'keyframe',
    iterationCount: 'infinite',
    children: [
      {
        type: 'interval',
        data,
        encode: {
          x: 'genre',
          y: 'sold',
          color: 'genre',
          key: 'genre',
        },
      },
      {
        type: 'interval',
        data,
        coordinate: [{ type: 'polar' }],
        encode: {
          x: 'genre',
          y: 'sold',
          color: 'genre',
          key: 'genre',
        },
      },
    ],
  });
})();
```

## Direction

### Reverse

```js
(() => {
  const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ];
  return G2.render({
    type: 'keyframe',
    direction: 'reverse',
    children: [
      {
        type: 'interval',
        data,
        encode: {
          x: 'genre',
          y: 'sold',
          color: 'genre',
          key: 'genre',
        },
      },
      {
        type: 'interval',
        data,
        coordinate: [{ type: 'polar' }],
        encode: {
          x: 'genre',
          y: 'sold',
          color: 'genre',
          key: 'genre',
        },
      },
    ],
  });
})();
```

### Alternate

```js
(() => {
  const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ];
  return G2.render({
    type: 'keyframe',
    direction: 'alternate',
    iterationCount: 2,
    children: [
      {
        type: 'interval',
        data,
        encode: {
          x: 'genre',
          y: 'sold',
          color: 'genre',
          key: 'genre',
        },
      },
      {
        type: 'interval',
        data,
        coordinate: [{ type: 'polar' }],
        encode: {
          x: 'genre',
          y: 'sold',
          color: 'genre',
          key: 'genre',
        },
      },
    ],
  });
})();
```

### Reverse Alternate

```js
(() => {
  const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ];
  return G2.render({
    type: 'keyframe',
    direction: 'reverse-alternate',
    iterationCount: 2,
    children: [
      {
        type: 'interval',
        data,
        encode: {
          x: 'genre',
          y: 'sold',
          color: 'genre',
          key: 'genre',
        },
      },
      {
        type: 'interval',
        data,
        coordinate: [{ type: 'polar' }],
        encode: {
          x: 'genre',
          y: 'sold',
          color: 'genre',
          key: 'genre',
        },
      },
    ],
  });
})();
```
