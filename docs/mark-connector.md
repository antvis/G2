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
      { x1: 'Sports', x2: 'Strategy', y1: 275, y2: 115 },
    ])
    .encode('x', ['x1', 'x2'])
    .encode('y', ['y1', 'y2'])
    .style('stroke', '#979797')
    .label({ text: '下降 58.18%', dy: -15 })

  return chart.render().node();
})();
```
