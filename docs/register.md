# Register

## Register Data Transform

```js
(() => {
  G2.register('data.double', (options) => {
    const { field } = options;
    return (data) =>
      data.map((d) => Object.assign({}, d, { [field]: d[field] * 2 }));
  });

  const chart = new G2.Chart({});

  chart.data({
    value: [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ],
    transform: [{ type: 'double', field: 'sold' }],
  });

  chart
    .interval()
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre');

  return chart.render().node();
})();
```
