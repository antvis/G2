---
title: sortX
order: 1
---

对离散的 x 比例尺的定义域根据指定通道排序。

## 开始使用

<img alt="sortX" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*TehBRbDnoIkAAAAAAAAAAAAADmJ7AQ/original" width="500" />

```ts
import { Chart } from '@antv/g2';

const labelFormatter = (d) => Math.abs(d) + (d < 0 ? 'BC' : d > 0 ? 'AC' : '');
const left = (d) => d.end > -1500 && d.start > -3000;

const chart = new Chart({
  container: 'container',
  width: 900,
  height: 1000,
  paddingRight: 80,
});

chart.coordinate({ transform: [{ type: 'transpose' }] });

chart
  .interval()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/world-history.json',
  })
  .transform({ type: 'sortX', by: 'y' })
  .transform({ type: 'sortColor', by: 'y', reducer: 'min' })
  .axis('y', [
    {
      tickCount: 5,
      labelFormatter,
      grid: null,
      title: null,
      labelTextAlign: 'start',
    },
    {
      position: 'top',
      labelFormatter,
      title: null,
      labelTextAlign: 'start',
    },
  ])
  .axis('x', false)
  .encode('x', 'civilization')
  .encode('y', ['start', 'end'])
  .encode('color', 'region')
  .scale('color', { palette: 'set2' })
  .label({
    text: 'civilization',
    position: (d) => (left(d) ? 'left' : 'right'),
    style: {
      textAlign: (d) => (left(d) ? 'end' : 'start'),
      dx: (d) => (left(d) ? -5 : 5),
      fontSize: 10,
    },
  });

chart.render();
```

## 选项

| 属性    | 描述                                                   | 类型                         | 默认值  |
| ------- | ------------------------------------------------------ | ---------------------------- | ------- |
| reverse | 是否逆序                                               | `boolean`                    | `false` |
| by      | 指定排序的通道                                         | `string`                     | `y`     |
| slice   | 选择一个分片范围                                       | `number \| [number, number]` | `y`     |
| reducer | 分组聚合，用于比较大小                                 | `Reducer`                    | `max`   |
| ordinal | reducer 处理逻辑，若被处理的数据是连续在设置为 `false` | `boolean`                    | `true`  |

```ts
type Primitive = number | string | boolean | Date;

type Reducer =
  | 'max'
  | 'min'
  | 'sum'
  | 'first'
  | 'last'
  | 'mean'
  | 'median'
  | ((I: number[], V: Primitive[]) => Primitive);
```
