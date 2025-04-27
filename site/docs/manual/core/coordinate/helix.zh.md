---
title: helix
order: 10
---

`helix` 坐标系是一种将二维数据沿螺旋线展开的坐标系统。它常用于可视化时间序列数据或基因表达数据，通过螺旋的延伸来展示数据的周期性或趋势。

## 开始使用

```js | ob
(() => {
  const chart = new G2.Chart({
    autoFit: true,
    height: 500,
  });

  // 模拟数据
  const data = [];
  for (let i = 0; i < 372; i++) {
    const time = new Date(Date.now() + i * 1000 * 3600 * 24)
      .toISOString()
      .split('T')[0];
    data.push({ time, value: Math.random() * 100 });
  }

  chart.data(data);

  chart.coordinate({
    type: 'helix',
    startAngle: 0.5 * Math.PI, // 起始角度
    endAngle: 12.5 * Math.PI, // 结束角度
  });

  chart
    .interval()
    .encode('x', 'time')
    .encode('y', 'value')
    .encode('color', 'value')
    .scale('color', { range: ['#ffffff', '#1890FF'] });

  chart.render();

  return chart.getContainer();
})();
```

| 参数        | 说明                     | 类型     | 默认值        |
| ----------- | ------------------------ | -------- | ------------- |
| startAngle  | 螺旋线的起始角度（弧度） | `number` | `0`           |
| endAngle    | 螺旋线的结束角度（弧度） | `number` | `Math.PI * 6` |
| innerRadius | 螺旋线的内半径（0 到 1） | `number` | `0`           |
| outerRadius | 螺旋线的外半径（0 到 1） | `number` | `1`           |
