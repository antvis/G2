---
title: "列重复矩阵"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/composition/repeat/matrix-col/"
version: "5.4.8"
---

# 列重复矩阵

[运行示例](https://g2.antv.antgroup.com/zh/examples/composition/repeat/matrix-col/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 300,
  height: 720,
  paddingLeft: 60,
  paddingBottom: 60,
});

chart.options({
  type: 'repeatMatrix',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/weather.json',
    transform: [
      {
        type: 'map',
        callback: ({ date, ...d }) => ({
          ...d,
          date: new Date(date).getMonth() + '',
        }),
      },
    ],
  },
  encode: { y: ['temp_max', 'precipitation', 'wind'], x: 'date' },
  children: [
    {
      type: 'line',
      transform: [{ type: 'groupX', y: 'mean' }],
      encode: { color: 'location' },
      scale: { y: { zero: true } },
    },
  ],
});

chart.render();
```
