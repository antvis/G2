# Spatial

## Layer

```js | dom
G2.render({
  type: 'layer',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  children: [
    {
      type: 'interval',
      transform: [{ type: 'sortBy', fields: ['sold'], order: 'DESC' }],
      encode: {
        x: 'genre',
        y: 'sold',
        color: 'genre',
      },
    },
    {
      type: 'interval',
      paddingBottom: 200,
      paddingLeft: 400,
      coordinate: [{ type: 'transpose' }, { type: 'polar' }],
      encode: {
        y: 'sold',
        color: 'genre',
      },
    },
  ],
});
```

## Row(Flex)

```js | dom
G2.render({
  type: 'flex',
  width: 800,
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  children: [
    {
      type: 'interval',
      transform: [{ type: 'sortBy', fields: ['sold'], order: 'DESC' }],
      encode: {
        x: 'genre',
        y: 'sold',
        color: 'genre',
      },
    },
    {
      type: 'interval',
      coordinate: [{ type: 'transpose' }],
      encode: {
        x: 'genre',
        y: 'sold',
        color: 'genre',
      },
    },
  ],
});
```

## Col(Flex)

```js | dom
G2.render({
  type: 'flex',
  direction: 'col',
  height: 600,
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  children: [
    {
      type: 'interval',
      encode: {
        x: 'genre',
        y: 'sold',
        color: 'genre',
      },
    },
    {
      type: 'interval',
      coordinate: [{ type: 'transpose' }],
      encode: {
        x: 'genre',
        y: 'sold',
        color: 'genre',
      },
    },
  ],
});
```

## Nested(Flex)

```js | dom
G2.render({
  type: 'flex',
  direction: 'row',
  width: 840,
  height: 600,
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  children: [
    {
      type: 'interval',
      encode: {
        x: 'genre',
        y: 'sold',
        color: 'genre',
      },
    },
    {
      type: 'flex',
      direction: 'col',
      children: [
        {
          type: 'interval',
          coordinate: [{ type: 'transpose' }],
          encode: {
            x: 'genre',
            y: 'sold',
            color: 'genre',
          },
        },
        {
          type: 'interval',
          coordinate: [{ type: 'polar' }],
          encode: {
            x: 'genre',
            y: 'sold',
            color: 'genre',
          },
        },
      ],
    },
  ],
});
```
