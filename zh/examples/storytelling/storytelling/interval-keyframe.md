---
title: "条帧动画"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/storytelling/storytelling/interval-keyframe/"
version: "5.4.8"
---

# 条帧动画

[运行示例](https://g2.antv.antgroup.com/zh/examples/storytelling/storytelling/interval-keyframe/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

const sex = [
  { city: 'A', sex: '男', value: 52 },
  { city: 'A', sex: '女', value: 48 },
  { city: 'B', sex: '男', value: 130 },
  { city: 'B', sex: '女', value: 70 },
];
const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'timingKeyframe',
  children: [
    {
      type: 'interval',
      data: sex,
      transform: [{ type: 'groupX', y: 'sum' }],
      encode: { x: 'city', y: 'value', key: 'city' },
    },
    {
      type: 'interval',
      data: sex,
      transform: [{ type: 'dodgeX' }],
      encode: { x: 'city', y: 'value', color: 'sex', groupKey: 'city' },
    },
  ],
});

chart.render();
```
