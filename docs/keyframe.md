# Keyframe

> The flashing problem should be solved in the future.

Keyframe composition provide a convent mechanism to author storytelling. It can be declared as simple as css animation, expect the object which applied animation change from a simple shape to a chart. It support following options for keyframe composition.

- _duration_ - the duration for each frame
- _iterationCount_ the play count for the animation, which can be a number of _infinite_
- _direction_ - the play direction for the animation, which can be _normal_, _reverse_, _alternate_, _reverse-alternate_
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
        scale: { y: { guide: null }, x: { guide: null } },
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
        paddingLeft: 70,
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

## Split and Merge

```js
(async () => {
  const response = await fetch(
    'https://gw.alipayobjects.com/os/bmw-prod/fbe4a8c1-ce04-4ba3-912a-0b26d6965333.json',
  );
  const data = await response.json();
  return G2.render({
    type: 'keyframe',
    direction: 'alternate',
    duration: 1000,
    iterationCount: 4,
    children: [
      {
        type: 'interval',
        data,
        transform: [{ type: 'groupX', y: 'mean' }],
        encode: {
          x: 'gender',
          y: 'weight',
          color: 'gender',
          key: 'gender',
        },
      },
      {
        type: 'point',
        data,
        encode: {
          x: 'height',
          y: 'weight',
          color: 'gender',
          groupKey: 'gender',
        },
      },
    ],
  });
})();
```

## Among Facets

```js
(async () => {
  const response = await fetch(
    'https://gw.alipayobjects.com/os/bmw-prod/7fbb7084-cf34-4e7c-91b3-09e4748dc5e9.json',
  );
  const data = await response.json();
  return G2.render({
    type: 'keyframe',
    direction: 'alternate',
    iterationCount: 2,
    children: [
      {
        type: 'rect',
        paddingRight: 86,
        paddingLeft: 54,
        data,
        encode: {
          y: 'industry',
        },
        children: [
          {
            type: 'area',
            class: 'area',
            frame: false,
            scale: { y: { facet: false }, x: { utc: true } },
            encode: {
              shape: 'smoothArea',
              x: (d) => new Date(d.date),
              y: 'unemployed',
              color: 'industry',
              key: 'industry',
            },
            style: { fillOpacity: 1 },
            animate: { enter: { type: 'scaleInY' } },
          },
        ],
      },
      {
        type: 'area',
        class: 'area',
        paddingLeft: 54,
        paddingRight: 86,
        data,
        transform: [{ type: 'stackY', reverse: true }],
        scale: { x: { utc: true } },
        encode: {
          shape: 'smoothArea',
          x: (d) => new Date(d.date),
          y: 'unemployed',
          color: 'industry',
          key: 'industry',
        },
        style: { fillOpacity: 1 },
      },
      {
        type: 'area',
        class: 'area',
        paddingLeft: 54,
        paddingRight: 86,
        scale: { x: { utc: true } },
        data,
        encode: {
          shape: 'smoothArea',
          x: (d) => new Date(d.date),
          y: 'unemployed',
          color: 'industry',
          key: 'industry',
        },
        style: { fillOpacity: 0.8 },
      },
    ],
  });
})();
```

## Unit Visualization

```js
(async () => {
  const response = await fetch(
    'https://gw.alipayobjects.com/os/bmw-prod/fbe4a8c1-ce04-4ba3-912a-0b26d6965333.json',
  );
  const data = await response.json();
  return G2.render({
    type: 'keyframe',
    direction: 'alternate',
    iterationCount: 4,
    children: [
      {
        type: 'rect',
        data,
        encode: {
          x: 'gender',
        },
        children: [
          {
            type: 'point',
            class: 'point',
            encode: {
              color: 'gender',
              key: (d) => `(${d.weight}, ${d.height})`,
            },
            adjust: { type: 'pack' },
          },
        ],
      },
      {
        type: 'point',
        class: 'point',
        data,
        encode: {
          x: 'height',
          y: 'weight',
          color: 'gender',
          key: (d) => `(${d.weight}, ${d.height})`,
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
        scale: { y: { guide: null }, x: { guide: null } },
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
        scale: { y: { guide: null }, x: { guide: null } },
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
        scale: { y: { guide: null }, x: { guide: null } },
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
        scale: { y: { guide: null }, x: { guide: null } },
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
        coordinate: [{ type: 'polar' }],
        scale: { y: { guide: null }, x: { guide: null } },
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
        coordinate: [{ type: 'polar' }],
        scale: { y: { guide: null }, x: { guide: null } },
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
