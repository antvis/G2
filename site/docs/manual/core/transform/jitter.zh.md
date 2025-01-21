---
title: jitter
order: 1
---

根据离散的 x 和 离散的 y 比例尺，生成 dy 和 dx 通道，实现在某个区域散开的效果。

## 开始使用

<img alt="jitter" src="https://mdn.alipayobjects.com/mdn/huamei_qa8qxu/afts/img/A*eJQYQZQ_HZQAAAAAAAAAAAAADmJ7AQ" width="500" />

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.coordinate({ type: 'polar' });

chart
  .point()
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
  })
  .transform({ type: 'jitter' })
  .encode('x', 'clarity')
  .encode('color', 'clarity')
  .legend(false);

chart.render();
```

## 选项
| 属性               | 描述                                           | 类型                 | 默认值                 |
|-------------------|------------------------------------------------|---------------------|-----------------------|
| padding           | 分组在 x,y 方向上的间距 [0 ~ 1]                   | `number`            | `0`                   |
| paddingX          | 分组在 x 方向的间距 [0 ~ 1]                       | `number`            | `0`                   |
| paddingY          | 分组在 y 方向的间距 [0 ~ 1]                       | `number`            | `0`                   |
| random            | 随机函数，返回值为 [0, 1)                         | `() => number`      | `Math.random`         |
