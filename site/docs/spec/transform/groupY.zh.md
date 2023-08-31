---
title: groupY
order: 1
---

对离散的 y 通道进行分组，并且对通道根据指定的 Reducer 进行聚合。等效于 `channels = ['y']` 的 [group](/spec/transform/group)。

## 开始使用

<img alt="groupY" src="https://mdn.alipayobjects.com/mdn/huamei_qa8qxu/afts/img/A*rWBUQ6_kf8kAAAAAAAAAAAAADmJ7AQ" width="500" />

在对应的 mark 中有 transform 方法可以使用数据的变换。

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  paddingLeft: 80,
  height: 180,
});

chart.data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/penguins.json',
  transform: [
    {
      type: 'map',
      callback: (d) => ({ ...d, body_mass_g: +d.body_mass_g }),
    },
  ],
});

chart
  .point()
  .encode('x', 'body_mass_g')
  .encode('y', 'species')
  .style('stroke', '#000');

chart
  .link()
  .transform({ type: 'groupY', x: 'min', x1: 'max' })
  .encode('x', 'body_mass_g')
  .encode('y', 'species')
  .style('stroke', '#000');

chart
  .point()
  .transform({ type: 'groupY', x: 'median' })
  .encode('y', 'species')
  .encode('x', 'body_mass_g')
  .encode('shape', 'line')
  .encode('size', 12)
  .style('stroke', 'red');

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
