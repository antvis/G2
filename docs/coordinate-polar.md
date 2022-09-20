# Polar

Polar 是极坐标系变换，将笛卡尔直角坐标系坐标变换为极坐标系下的坐标，常用于玫瑰图和柱状图之间的转换。

## 快速开始

```js
(() => {
  const chart = new G2.Chart({ paddingLeft: 80 });

  chart.coordinate({ type: 'polar' });

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
| startAngle   | 极坐标系起始弧度             | number | -Math.PI / 2    |
| endAngle     | 极坐标系结束弧度             | number | (Math.PI * 3) / 2    |
| innerRadius  | 极坐标内半径，范围0-1        | number | 0    |
| outerRadius  | 极坐标半径，范围0-1     | number | 1      |
