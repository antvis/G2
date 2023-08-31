---
title: groupColor
order: 1
---

对离散的 color 通道进行分组，并且对通道根据指定的 Reducer 进行聚合。

## 开始使用

<img alt="groupColor" src="https://mdn.alipayobjects.com/mdn/huamei_qa8qxu/afts/img/A*6CbxQ6P9bFcAAAAAAAAAAAAADmJ7AQ" width="500" />

在对应的 mark 中有 transform 方法可以使用数据的变换。

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 120,
});

chart.coordinate({ transform: [{ type: 'transpose' }] });

chart
  .interval()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
  })
  .transform({ type: 'groupColor', y: 'count' })
  .transform({ type: 'stackY' })
  .transform({ type: 'normalizeY' })
  .axis('y', { labelFormatter: '.0%' })
  .encode('color', 'sex')
  .label({ text: 'sex', position: 'inside' });

chart.render();
```

## 选项

| 属性      | 描述                                      | 类型      | 默认值 |
| --------- | ----------------------------------------- | --------- | ------ |
| [channel] | 输出到具体 mark 的 channel 数据的聚合方式 | `Reducer` |        |

```ts
type Primitive = number | string | boolean | Date;

type Reducer =
  | 'mean'
  | 'max'
  | 'count'
  | 'min'
  | 'median'
  | 'sum'
  | 'first'
  | 'last'
  | ((I: number[], V: Primitive[]) => Primitive);
```
