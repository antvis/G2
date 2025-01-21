---
title: symmetryY
order: 1
---

按照指定通道分组，给每组的 y 和 y1 通道添加偏移，实现对称效果。

## 开始使用

<img alt="symmetryY" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Vf-FQZH-5FMAAAAAAAAAAAAADmJ7AQ/original" width="600" />

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/unemployment-by-industry.json',
  transform: [{
    type: 'map',
    callback: (d) => ({
      ...d,
      date: new Date(d.date),
    })
  }],
});

chart
  .area()
  .transform({ type: 'stackY' })
  .transform({ type: 'symmetryY' })
  .encode('x', 'date')
  .encode('y', 'unemployed')
  .encode('color', 'industry');

chart.render();
```

## 选项

| 属性               | 描述                                           | 类型                               | 默认值                 |
|-------------------|------------------------------------------------|-----------------------------------|-----------------------|
| groupBy           | 指定分组通道                                     | `string \| string[]`              | `x`                   |

## FAQ

- 怎么绘制一个对称的条形图？

同样的，使用这个 transform 即可，如下：

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 800,
  height: 300,
});

chart.coordinate({ transform: [{ type: 'transpose' }] });

chart
  .interval()
  .data([
    { x: 'A', y: 100 },
    { x: 'B', y: 200 },
    { x: 'C', y: 300 },
    { x: 'D', y: 250 },
  ])
  .transform({ type: 'stackY' })
  .transform({ type: 'symmetryY' })
  .encode('x', 'x')
  .encode('y', 'y')
  .encode('color', 'x')
  .scale('x', { padding: 0.5 })
  .legend(false);

chart.render();
```
