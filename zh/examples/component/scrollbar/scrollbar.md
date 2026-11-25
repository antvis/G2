---
title: "滚动条"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/component/scrollbar/scrollbar/"
version: "5.4.8"
---

# 滚动条

[运行示例](https://g2.antv.antgroup.com/zh/examples/component/scrollbar/scrollbar/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
  },
  encode: { x: 'date', y: 'close' },
  scrollbar: {
    // 开启 X 轴方向上的滚动条
    x: {},
    y: { value: 0.2 },
  },
});

chart.on('afterrender', () => {
  const { canvas } = chart.getContext();
  const { document } = canvas;
  document
    .querySelector('.g2-scrollbar')
    .addEventListener('valuechange', (evt) => {
      console.info(evt.detail);
    });
});

chart.render();
```
