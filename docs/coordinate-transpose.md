# Transpose

Transpose 是坐标系的转置变换，将 (x, y) 变换成 (y, x)，常用于条形图和柱状图之间的转换。

## 快速开始

```js
(() => {
  const chart = new G2.Chart({ paddingLeft: 80 });

  chart.coordinate({ type: 'transpose' });

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
    .encode('y', 'sold')
    .encode('color', 'genre');

  return chart.render().node();
})();
```
