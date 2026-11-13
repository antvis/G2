---
title: "基因螺旋图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/helix/helix-gene/"
version: "5.4.8"
---

# 基因螺旋图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/helix/helix-gene/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

// 模拟数据
const data = [];
const groups = ['WT', 'KO'];
const hours = 72;
const baseValues = {
  WT: 2.0,
  KO: 2.3,
};

for (let i = 0; i < hours; i++) {
  const time = `${i}h`;
  groups.forEach((group) => {
    const fluctuation = Math.random() * 0.4 - 0.2;
    data.push({
      time,
      group,
      logFPKM: baseValues[group] + Math.sin(i / 10) * 0.3 + fluctuation, // 模拟趋势变化
    });
  });
}

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 600,
  padding: [50, 50, 50, 50],
});

chart.options({
  type: 'interval',
  data: data,
  coordinate: {
    type: 'helix',
    startAngle: 0.2 * Math.PI,
    endAngle: 6.5 * Math.PI,
    innerRadius: 0.1,
  },
  encode: { x: 'time', y: 'group', color: 'logFPKM' },
  scale: {
    color: {
      type: 'linear',
      range: ['#fff', '#ec4839'],
    },
  },
  tooltip: {
    title: 'time',
    items: [
      { field: 'group', name: '组别' },
      {
        field: 'logFPKM',
        name: 'log(FPKM)',
        valueFormatter: (value) => value.toFixed(2),
      },
    ],
  },
  animate: {
    enter: {
      type: 'fadeIn',
      duration: 1000,
    },
  },
});

chart.render();
```
