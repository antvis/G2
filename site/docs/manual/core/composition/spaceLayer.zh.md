---
title: spaceLayer
order: 2
---

对空间不做任何划分，多个视图使用同一个空间区域，常用于视图的层叠。

## 开始使用

绘制一个常见的柱饼结合的图表。

<img alt="spaceLayer" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*qPbkQb8c6F4AAAAAAAAAAAAADmJ7AQ/original" width="600" />

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const layer = chart.spaceLayer().data({
  type: 'fetch',
  value:
    'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  format: 'csv',
});

// 柱图
layer
  .interval()
  .attr('paddingLeft', 50)
  .transform({ type: 'sortX', reverse: true, by: 'y' })
  .encode('x', 'letter')
  .encode('y', 'frequency')
  .encode('color', 'letter');

// 饼图
layer
  .interval()
  .attr('paddingLeft', 400)
  .attr('paddingBottom', 200)
  .coordinate({ type: 'theta' })
  .transform({ type: 'stackY' })
  .legend(false)
  .encode('y', 'frequency')
  .encode('color', 'letter');

chart.render();
```

更多的案例，可以查看[图表示例](/examples)页面。

## 选项

无额外配置项。
