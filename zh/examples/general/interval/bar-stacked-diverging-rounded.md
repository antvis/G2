---
title: "圆角发散堆叠条形图"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/general/interval/bar-stacked-diverging-rounded/"
version: "5.4.8"
---

# 圆角发散堆叠条形图

[运行示例](https://g2.antv.antgroup.com/zh/examples/general/interval/bar-stacked-diverging-rounded/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://nivo.rocks/storybook/?path=/docs/bar--diverging-stacked
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  paddingLeft: 25,
});

const fields = [
  'lost > 100$',
  'lost <= 100$',
  'gained <= 100$',
  'gained > 100$',
];

chart.options({
  type: 'view',
  children: [
    {
      type: 'interval',
      data: {
        type: 'fetch',
        value: 'https://assets.antv.antgroup.com/g2/nivo-gain-lost.json',
        transform: [
          {
            type: 'fold',
            fields,
          },
        ],
      },
      transform: [{ type: 'stackY' }],
      encode: { x: 'user', y: 'value', color: 'key' },
      scale: {
        x: { padding: 0.2 },
        y: { domainMin: -100, domainMax: 100 },
        color: {
          domain: fields,
          range: ['#97e3d5', '#61cdbb', '#e25c3b', '#f47560'],
        },
      },
      legend: { color: { title: false } },
      labels: [
        {
          text: 'value',
          position: 'inside',
          formatter: (v) => (v ? `${v}%` : ''),
          transform: [{ type: 'overlapDodgeY' }],
          fill: '#000',
          fontSize: 10,
        },
      ],
      axis: {
        y: {
          position: 'right',
          title: false,
          labelFormatter: (v) => `${v}%`,
        },
      },
      style: { radius: 10 },
    },
    {
      type: 'lineY',
      data: [0],
      style: { lineWidth: 2, stroke: '#e25c3b', strokeOpacity: 1 },
    },
  ],
});

chart.call(titleLeft, '75%', 'lost', '#61cdbb');
chart.call(titleLeft, '20%', 'gain', '#e25c3b');

function titleLeft(node, y, text, fill) {
  node
    .text()
    .style('x', -10)
    .style('y', y)
    .style('text', text)
    .style('fontWeight', 'bold')
    .style('dy', -10)
    .style('transform', 'rotate(-90)')
    .style('fill', fill);
}

chart.render();
```
