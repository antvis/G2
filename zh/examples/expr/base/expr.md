---
title: "Spec 函数表达式"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/expr/base/expr/"
version: "5.4.8"
---

# Spec 函数表达式

[运行示例](https://g2.antv.antgroup.com/zh/examples/expr/base/expr/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const spec = {
  type: 'spaceLayer',
  height: 840,
  width: 640,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/79fd9317-d2af-4bc4-90fa-9d07357398fd.csv',
    format: 'csv',
  },
  children: [
    {
      type: 'interval',
      height: 360,
      width: 360,
      legend: false,
      x: 280,
      transform: [{ type: 'stackY' }],
      coordinate: { type: 'theta' },
      scale: {
        color: { palette: 'spectral' },
      },
      encode: {
        y: 'value',
        color: 'name',
        enterDelay: '{a.value>10000000 ? a.value>20000000 ? 2000 : 1000 : 0}',
      },
      style: {
        stroke: '{ a.value>20000000 ? "purple" : null}',
      },
      labels: [
        {
          text: '{"*" + a.name}',
          radius: '{a.value>15000000 ? a.value>20000000 ? 0.6 : 0.75 : 0.9}',
          style: {
            fontSize: '{a.value>15000000 ? a.value>20000000 ? 12 : 10 : 6}',
            fontWeight: 'bold',
          },
          transform: [{ type: 'contrastReverse' }],
        },
        {
          text: '{b < c.length - 3 ? a.value : ""}',
          radius: '{a.value>15000000 ? a.value>20000000 ? 0.6 : 0.75 : 0.9}',
          style: { fontSize: 9, dy: 12 },
          transform: [{ type: 'contrastReverse' }],
        },
      ],
      animate: { enter: { type: 'waveIn', duration: 600 } },
    },
    {
      type: 'view',
      height: 400,
      width: 540,
      y: 300,
      children: [
        {
          type: 'interval',
          height: 400,
          width: 540,
          legend: false,
          y: 300,
          scale: {
            color: { palette: 'spectral' },
          },
          encode: {
            y: 'value',
            x: 'name',
            color: 'name',
            enterDelay:
              '{a.value>10000000 ? a.value>20000000 ? 2000 : 1000 : 0}',
          },
        },
        {
          type: 'line',
          height: 400,
          width: 540,
          legend: false,
          y: 300,
          encode: { x: 'name', y: 'value' },
          scale: { y: { independent: true } },
          labels: [
            {
              text: '{a.value}',
              selector: '{a}',
            },
          ],
          axis: {
            y: {
              position: 'right',
              grid: null,
            },
          },
        },
      ],
    },
  ],
};

chart.options(spec);

chart.render();
```
