# Element Interaction

## ElementActive

**Basic ElementActive.**

```js | dom
G2.render({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275, type: 'A' },
    { genre: 'Strategy', sold: 115, type: 'B' },
    { genre: 'Action', sold: 120, type: 'C' },
    { genre: 'Shooter', sold: 350, type: 'D' },
    { genre: 'Other', sold: 150, type: 'E' },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
  interaction: [{ type: 'elementActive' }],
});
```

**ElementActive with custom color.**

```js | dom
G2.render({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275, type: 'A' },
    { genre: 'Strategy', sold: 115, type: 'B' },
    { genre: 'Action', sold: 120, type: 'C' },
    { genre: 'Shooter', sold: 350, type: 'D' },
    { genre: 'Other', sold: 150, type: 'E' },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
  interaction: [{ type: 'elementActive', color: 'red' }],
});
```

## ElementSelected

**Basic ElementSelected.**

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
  },
  interaction: [{ type: 'elementSelected' }],
});
```

**ElementSelected with custom `color` and `border` options.**

```js | dom
G2.render({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275, type: 'A' },
    { genre: 'Strategy', sold: 115, type: 'B' },
    { genre: 'Action', sold: 120, type: 'C' },
    { genre: 'Shooter', sold: 350, type: 'D' },
    { genre: 'Other', sold: 150, type: 'E' },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
  interaction: [{ type: 'elementSelected', color: 'red', border: 3 }],
});
```

## ElementSingleSelected

```js | dom
G2.render({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275, type: 'A' },
    { genre: 'Strategy', sold: 115, type: 'B' },
    { genre: 'Action', sold: 120, type: 'C' },
    { genre: 'Shooter', sold: 350, type: 'D' },
    { genre: 'Other', sold: 150, type: 'E' },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
  interaction: [{ type: 'elementSelected', singleMode: true }],
});
```
