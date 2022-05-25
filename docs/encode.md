# Encode

## Field

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
    x: 'genre', // Field Encode
    y: 'sold', // Field Encode
  },
});
```

## Constant

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
    color: 'orange', // Constant Encode
  },
});
```

## Transform

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
    // Transform Encode
    // It is not visual data by default.
    color: (d) => (d.sold > 200 ? 'high' : 'low'),
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
    // This will make channel values for color visual data.
    color: { type: 'identity' },
  },
  encode: {
    x: 'genre',
    y: 'sold',
    color: (d) => (d.sold > 200 ? 'orange' : 'steelblue'),
  },
});
```

## Custom

```js | dom
(() => {
  const Proportion = ({ value }) => {
    return (data) => {
      const sum = data.reduce((total, e) => total + e[value], 0);
      return data.map((d) => d[value] / sum);
    };
  };
  return G2.render({
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
      y: { type: Proportion, value: 'sold' },
    },
  });
})();
```

```js
(() => {
  const Proportion = ({ value }) => {
    return (data) => {
      const sum = data.reduce((total, e) => total + e[value], 0);
      return data.map((d) => d[value] / sum);
    };
  };

  const context = {
    library: Object.assign(G2.createLibrary(), {
      'encode.proportion': Proportion,
    }),
  };

  return G2.render(
    {
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
        y: { type: 'proportion', value: 'sold' },
      },
    },
    context,
  );
})();
```
