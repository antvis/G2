# Connector

## 开始

```js
(() => {
  const chart = new G2.Chart({ height: 300 });

  chart.data([
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 150 },
    { genre: 'Other', sold: 350 },
  ]);

  chart
    .interval()
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre');

  // @todo Maybe a transform to be more concise and readable.
  chart
    .connector()
    .data([
      { x1: 'Strategy', x2: 'Action', y1: 115, y2: 120 },
      { x1: 'Other', x2: 'Shooter', y1: 350, y2: 150 },
    ])
    .encode('x', ['x1', 'x2'])
    .encode('y', ['y1', 'y2'])
    .style('stroke', '#979797');

  return chart.render().node();
})();
```
