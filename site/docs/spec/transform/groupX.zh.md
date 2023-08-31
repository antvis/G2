---
title: groupX
order: 1
---

对离散的 x 通道进行分组，并且对通道根据指定的 Reducer 进行聚合。等效于 `channels = ['x']` 的 [group](/spec/transform/group)。

## 开始使用

<img alt="groupX" src="https://mdn.alipayobjects.com/mdn/huamei_qa8qxu/afts/img/A*RtalTb-DPdkAAAAAAAAAAAAADmJ7AQ" width="400" />

在对应的 mark 中有 transform 方法可以使用数据的变换。

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 800,
  height: 1200,
});

chart.coordinate({ transform: [{ type: 'transpose' }] });

chart.data({
  type: 'fetch',
  value:
    'https://gw.alipayobjects.com/os/bmw-prod/b6f2ff26-b232-447d-a613-0df5e30104a0.csv',
});

chart
  .link()
  .scale('y', { formatter: '.0%' })
  .transform({ type: 'groupX', y: 'min', y1: 'max' })
  .encode('x', 'state')
  .encode('y', 'population')
  .style('stroke', '#000');

chart
  .point()
  .scale('color', { palette: 'spectral' })
  .encode('x', 'state')
  .encode('y', 'population')
  .encode('shape', 'point')
  .encode('color', 'age');

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
