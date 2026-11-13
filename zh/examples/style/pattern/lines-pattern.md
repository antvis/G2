---
title: "Lines Pattern"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/style/pattern/lines-pattern/"
version: "5.4.8"
---

# Lines Pattern

[运行示例](https://g2.antv.antgroup.com/zh/examples/style/pattern/lines-pattern/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
/**
 * A recreation of this demo: https://nivo.rocks/pie/
 */
import { Chart } from '@antv/g2';
import { lines } from '@antv/g-pattern';

const chart = new Chart({
  container: 'container',
  width: 500,
  height: 400,
});

const colors = ['#e8c1a0', '#f47560', '#f1e15b', '#e8a838', '#61cdbb'];

chart.options({
  type: 'interval',
  coordinate: { type: 'theta', innerRadius: 0.25, outerRadius: 0.8 },
  data: [
    { id: 'c', value: 526 },
    { id: 'sass', value: 220 },
    { id: 'php', value: 325 },
    { id: 'elixir', value: 561 },
    { id: 'rust', value: 54 },
  ],
  transform: [{ type: 'stackY' }],
  encode: { y: 'value' },
  labels: [
    {
      text: 'id',
      position: 'outside',
      fontWeight: 'bold',
    },
  ],
  style: {
    radius: 6,
    stroke: '#fff',
    lineWidth: 4,
    fill: (_, idx) => {
      return {
        image: lines({
          backgroundColor: colors[idx],
          backgroundOpacity: 0.65,
          stroke: colors[idx],
          lineWidth: 4,
          spacing: 5,
        }),
        repetition: 'repeat',
        transform: 'rotate(30deg)',
      };
    },
  },
  legend: false,
});

chart.render();
```
