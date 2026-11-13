---
title: "点击系列图提示"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/component/tooltip/tooltip-click-line/"
version: "5.4.8"
---

# 点击系列图提示

[运行示例](https://g2.antv.antgroup.com/zh/examples/component/tooltip/tooltip-click-line/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'line',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  },
  encode: { x: 'letter', y: 'frequency' },
  axis: { y: { labelFormatter: '.0%' } },
  interaction: {
    tooltip: {
      disableNative: true, // Disable pointerover and pointerout events.
      bounding: {
        x: -Infinity,
        y: -Infinity,
        width: Infinity,
        height: Infinity,
      },
      mount: 'body',
    },
  },
});

chart.on('plot:click', ({ offsetX, target }) => {
  chart.emit('tooltip:show', { offsetX, offsetY: 20, target });
});

chart.render();
```
