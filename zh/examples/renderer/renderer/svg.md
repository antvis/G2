---
title: "SVG 渲染器"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/renderer/renderer/svg/"
version: "5.4.8"
---

# SVG 渲染器

[运行示例](https://g2.antv.antgroup.com/zh/examples/renderer/renderer/svg/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';
import { Renderer } from '@antv/g-svg';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  renderer: new Renderer(),
});

chart.options({
  type: 'spaceFlex',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/seattle-weather.json',
  },
  direction: 'col',
  ratio: [1, 1],
  children: [
    {
      type: 'spaceFlex',
      direction: 'row',
      ratio: [1, 1],
      children: [
        {
          type: 'interval',
          transform: [{ type: 'groupX', y: 'mean' }],
          encode: {
            x: (d) => new Date(d.date).getUTCMonth(),
            y: 'precipitation',
          },
        },
        {
          type: 'line',
          transform: [{ type: 'groupX', y: 'mean' }],
          encode: {
            x: (d) => new Date(d.date).getUTCMonth(),
            y: 'wind',
            shape: 'smooth',
          },
        },
      ],
    },
    {
      type: 'spaceFlex',
      direction: 'row',
      ratio: [1, 1],
      children: [
        {
          type: 'area',
          transform: [{ type: 'groupX', y: 'mean' }],
          encode: {
            x: (d) => new Date(d.date).getUTCMonth(),
            y: ['temp_min', 'temp_max'],
            shape: 'smooth',
          },
        },
        {
          type: 'point',
          transform: [{ type: 'groupX', y: 'mean' }],
          encode: { x: 'temp_min', y: 'temp_max', shape: 'point' },
        },
      ],
    },
  ],
});

chart.render();
```
