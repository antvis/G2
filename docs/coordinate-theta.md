# Theta

Theta 是一种特殊的极坐标系，半径长度固定，仅将数据映射到角度，常用于饼图和柱状图之间的转换。


## 快速开始

```js
(() => {
  const chart = new G2.Chart({ paddingLeft: 80 });

  chart.coordinate({ type: 'theta' });

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
