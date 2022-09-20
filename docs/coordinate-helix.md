# Helix

Helix 是螺旋坐标系变换，将笛卡尔直角坐标系坐标变换为螺旋坐标系下的点。

## 快速开始

```js
(() => {
  const chart = new G2.Chart({ paddingLeft: 80 });

  chart.coordinate({ type: 'helix' });

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

## API

| 参数          | 说明                       | 类型    | 默认值 |
|--------------|----------------------------|--------|--------|
| startAngle   | 螺旋坐标系起始弧度             | number | 0    |
| endAngle     | 螺旋坐标系结束弧度             | number | Math.PI * 6    |
| innerRadius  | 螺旋坐标内半径，范围0-1        | number | 0    |
| outerRadius  | 螺旋坐标系半径，范围0-1     | number | 1      |
