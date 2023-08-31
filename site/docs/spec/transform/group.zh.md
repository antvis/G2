---
title: group
order: 1
---

对离散的 x 和 连续的 y 通道进行分组，并且对通道根据指定的 Reducer 进行聚合。

## 开始使用

<img alt="group" src="https://mdn.alipayobjects.com/mdn/huamei_qa8qxu/afts/img/A*Wk4zR40uQesAAAAAAAAAAAAADmJ7AQ" width="500" />

在对应的 mark 中有 transform 方法可以使用数据的变换。

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 300,
});

chart
  .cell()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/seattle-weather.json',
  })
  .transform({ type: 'group', color: 'max' })
  .encode('x', (d) => new Date(d.date).getUTCDate())
  .encode('y', (d) => new Date(d.date).getUTCMonth())
  .encode('color', 'temp_max')
  .style('inset', 0.5)
  .scale('color', {
    type: 'sequential',
    palette: 'gnBu',
  });

chart.render();
```

## 选项

| 属性      | 描述                                      | 类型                   | 默认值       |
| --------- | ----------------------------------------- | ---------------------- | ------------ |
| channels  | 针对哪些通道做数据分组聚合                | `string` \| `string[]` | `['x', 'y']` |
| [channel] | 输出到具体 mark 的 channel 数据的聚合方式 | `Reducer`              |              |

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
