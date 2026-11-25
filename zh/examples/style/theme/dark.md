---
title: "暗色风格"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/style/theme/dark/"
version: "5.4.8"
---

# 暗色风格

[运行示例](https://g2.antv.antgroup.com/zh/examples/style/theme/dark/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://nivo.rocks/pie/
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 500,
  height: 400,
});

chart.options({
  type: 'interval',

  // Apply dark theme.
  theme: {
    type: 'classicDark',
    view: {
      viewFill: '#141414',
    },
  },
  coordinate: { type: 'theta', innerRadius: 0.25, outerRadius: 0.8 },
  data: [
    { id: 'c', value: 526 },
    { id: 'sass', value: 220 },
    { id: 'php', value: 325 },
    { id: 'elixir', value: 561 },
    { id: 'rust', value: 54 },
  ],
  transform: [{ type: 'stackY' }],
  encode: { y: 'value', color: 'id' },
  labels: [
    {
      text: 'value',
      offset: 14,
      fontWeight: 'bold',
    },
    {
      text: 'id',
      position: 'spider',
      connectorDistance: 0,
      fontWeight: 'bold',
      textBaseline: 'bottom',
      textAlign: (d) => (['c', 'sass'].includes(d.id) ? 'end' : 'start'),
      dy: -4,
    },
  ],
  style: { radius: 4, inset: 1 },
  animate: { enter: { type: 'waveIn', duration: 1000 } },
  legend: false,
});

chart.render();
```
