---
title: diffY
order: 1
---

对 y 和 y1 通道求差集。

## 开始使用

<img alt="diffY" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*CJn4T4_Rf98AAAAAAAAAAAAADmJ7AQ/original" width="600" />

在对应的 mark 中有 transform 方法可以使用数据的变换。

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/temperature-compare.json',
  transforms: [
    {
      type: 'map',
      callback: (d) => (d) => ({
        ...d,
        date: new Date(d.date),
      })
    }
  ]
});

chart
  .area()
  .data({
    transform: [
      {
        type: 'fold',
        fields: ['New York', 'San Francisco'],
        key: 'city',
        value: 'temperature',
      },
    ],
  })
  .transform([{ type: 'diffY' }]) // Diff the 2 area shape.
  .encode('x', 'date')
  .encode('y', 'temperature')
  .encode('color', 'city')
  .encode('shape', 'hvh')
  .scale('color', { range: ['#67a9cf', '#ef8a62'] });

chart
  .line()
  .encode('x', 'date')
  .encode('y', 'San Francisco')
  .encode('shape', 'hvh')
  .style('stroke', '#000');

chart.render();
```

## 选项

| 属性               | 描述                                           | 类型                     | 默认值                 |
|-------------------|------------------------------------------------|-------------------------|-----------------------|
| groupBy           | 按照哪个通道分组数据                              | `string` \| `string[]`  | `x`                   |  
| series            | 是否存在分组                                     | `boolean`               | `true`                   |
