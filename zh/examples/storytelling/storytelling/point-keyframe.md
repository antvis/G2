---
title: "点帧动画"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/examples/storytelling/storytelling/point-keyframe/"
version: "5.4.8"
---

# 点帧动画

[运行示例](https://g2.antv.antgroup.com/zh/examples/storytelling/storytelling/point-keyframe/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```ts
import { Chart } from '@antv/g2';

fetch(
  'https://gw.alipayobjects.com/os/bmw-prod/fbe4a8c1-ce04-4ba3-912a-0b26d6965333.json',
)
  .then((res) => res.json())
  .then((data) => {
    const chart = new Chart({
      container: 'container',
    });

    chart.options({
      type: 'timingKeyframe',
      direction: 'alternate',
      iterationCount: 4,
      children: [
        {
          type: 'interval',
          data: data,
          transform: [{ type: 'groupX', y: 'mean' }],
          encode: { x: 'gender', y: 'weight', color: 'gender', key: 'gender' },
        },
        {
          type: 'point',
          data: data,
          encode: {
            x: 'height',
            y: 'weight',
            color: 'gender',
            groupKey: 'gender',
            shape: 'point',
          },
        },
      ],
    });

    chart.render();
  });
```
