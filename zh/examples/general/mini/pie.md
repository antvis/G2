---
title: "迷你饼图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/mini/pie/"
version: "5.4.8"
---

# 迷你饼图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/mini/pie/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 100,
  height: 100,
});

chart.options({
  type: 'interval',
  coordinate: { type: 'theta' },
  interaction: {
    tooltip: {
      render: (e, { title, items }) => items[0].value,
    },
  },
  data: [
    { id: 'c', value: 526 },
    { id: 'sass', value: 220 },
    { id: 'php', value: 325 },
    { id: 'elixir', value: 561 },
    { id: 'rust', value: 54 },
  ],
  transform: [{ type: 'stackY' }],
  encode: { y: 'value', color: 'id' },
  style: { radius: 4, stroke: '#fff', lineWidth: 1 },
  animate: { enter: { type: 'waveIn' } },
  axis: false,
  legend: false,
});

chart.render();
```
