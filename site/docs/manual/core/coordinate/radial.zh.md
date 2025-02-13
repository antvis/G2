---
title: radial
order: 2
---

Radial 是一种特殊的极坐标系，常用于绘制玉钰图。

## 开始使用

<img alt="radial" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*TVXmRq627aEAAAAAAAAAAAAADmJ7AQ/original" height="600" />

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 500,
});

chart.coordinate({
  type: 'radial',
  innerRadius: 0.1,
  endAngle: Math.PI,
});

chart
  .interval()
  .data([
    { question: '问题 1', percent: 0.21 },
    { question: '问题 2', percent: 0.4 },
    { question: '问题 3', percent: 0.49 },
    { question: '问题 4', percent: 0.52 },
    { question: '问题 5', percent: 0.53 },
    { question: '问题 6', percent: 0.84 },
    { question: '问题 7', percent: 1.0 },
    { question: '问题 8', percent: 1.2 },
  ])
  .encode('x', 'question')
  .encode('y', 'percent')
  .encode('color', 'percent')
  .style('stroke', 'white')
  .scale('color', {
    range: '#BAE7FF-#1890FF-#0050B3',
  })
  .legend({
    color: {
      length: 400,
      position: 'bottom',
      layout: { justifyContent: 'center' },
    },
  })
  .axis('y', {
    tickFilter: (d, i) => i !== 0,
  });

chart.render();
```

## 选项

| 参数        | 说明                   | 类型   | 默认值               |
| ----------- | ---------------------- | ------ | -------------------- |
| startAngle  | 极坐标系起始弧度       | number | `-Math.PI / 2`       |
| endAngle    | 极坐标系结束弧度       | number | `(Math.PI \* 3) / 2` |
| innerRadius | 极坐标内半径，范围 0-1 | number | `0`                  |
| outerRadius | 极坐标半径，范围 0-1   | number | `1`                  |
