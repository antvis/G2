# Layout

## Default Size

The default width equals to 640px, default height equals to 480px.

```js | dom
(() => {
  // Don't specify size.
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
    .encode('y', 'sold');

  return chart.render().node();
})();
```

## Specified Size

```js | range "pin: false; min: 300; max: 1000"
width = 800;
```

```js | range "pin: false; min: 100; max: 500"
height = 300;
```

```js | dom
(() => {
  const chart = new G2.Chart({
    width, // Specify width.
    height, // SPecify height.
  });

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
    .encode('y', 'sold');

  return chart.render().node();
})();
```

## Padding

The padding will be inferred by components(e.g. axis, legend) if is not specified explicitly.

```js | range "pin: false; min: 0; max: 120"
paddingLeft = 80;
```

```js | range "pin: false; min: 0; max: 120"
paddingRight = 80;
```

```js | range "pin: false; min: 0; max: 120"
paddingBottom = 80;
```

```js | range "pin: false; min: 0; max: 120"
paddingTop = 80;
```

```js | dom
(() => {
  const chart = new G2.Chart({
    paddingTop, // Specify paddingTop.
    paddingRight, // Specify paddingRight.
    paddingBottom, // Specify paddingBottom.
    paddingLeft, // Specify paddingLeft.
  });

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
    .encode('y', 'sold');

  return chart.render().node();
})();
```
