---
title: helix
order: 10
---

The `helix` coordinate system is a coordinate system that unfolds two-dimensional data along a spiral line. It is commonly used to visualize time series data or gene expression data, showing data periodicity or trends through spiral extension.

## Getting Started

```js | ob
(() => {
  const chart = new G2.Chart({
    autoFit: true,
    height: 500,
  });

  // Sample data
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
    startAngle: 0.5 * Math.PI, // Start angle
    endAngle: 12.5 * Math.PI, // End angle
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

| Parameter   | Description                           | Type     | Default       |
| ----------- | ------------------------------------- | -------- | ------------- |
| startAngle  | Start angle of the spiral (radians)   | `number` | `0`           |
| endAngle    | End angle of the spiral (radians)     | `number` | `Math.PI * 6` |
| innerRadius | Inner radius of the spiral (0 to 1)   | `number` | `0`           |
| outerRadius | Outer radius of the spiral (0 to 1)   | `number` | `1`           |
