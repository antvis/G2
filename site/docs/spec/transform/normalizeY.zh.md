---
title: normalizeY
order: 1
---

对 y 和 y1 通道根据指定的 basis 进行归一化处理。

## 开始使用

<img alt="normalizeY" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*1oZjT4cKSh8AAAAAAAAAAAAADmJ7AQ/original" width="600" />

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.coordinate({ transform: [{ type: 'transpose' }] });

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
    transform: [
      {
        type: 'filter',
        callback: (d) => d.year === 2000,
      },
    ],
  })
  .transform({ type: 'stackY' })
  .transform({ type: 'normalizeY' })
  .encode('x', 'age')
  .encode('y', 'people')
  .encode('color', 'sex')
  .scale('color', { type: 'ordinal', range: ['#ca8861', '#675193'] })
  .axis('y', { labelFormatter: '.0%' })
  .label({ text: 'people', position: 'inside', style: { fill: 'white' } });

chart.render();
```

## 选项

| 属性    | 描述                             | 类型                   | 默认值 |
| ------- | -------------------------------- | ---------------------- | ------ |
| groupBy | 按照哪个通道分组数据             | `string` \| `string[]` | `x`    |
| basis   | 使用某一个聚合数据进行归一化计算 | `Basis`                | `max`  |

```ts
type Basis =
  | 'deviation'
  | 'first'
  | 'last'
  | 'max'
  | 'mean'
  | 'median'
  | 'min'
  | 'sum'
  | (I, Y) => number;
```
