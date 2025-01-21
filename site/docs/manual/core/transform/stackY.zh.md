---
title: stackY
order: 1
---

按照指定通道分组，对每组的 y 和 y1 通道进行堆叠，实现堆叠效果。

## 开始使用

<img alt="stackY" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*GwDUQbVt9XYAAAAAAAAAAAAADmJ7AQ/original" width="600" />

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  })
  .transform({ type: 'stackY' })
  .transform({ type: 'sortX', by: 'y', reverse: true })
  .encode('x', 'state')
  .encode('y', 'population')
  .encode('color', 'age')
  .axis('y', { labelFormatter: '~s' });

chart.render();
```

## 选项

| 属性               | 描述                                           | 类型                               | 默认值                 |
|-------------------|------------------------------------------------|-----------------------------------|-----------------------|
| groupBy           | 指定分组通道                                     | `string \| string[]`              | `x`                   |
| orderBy           | 指定排序的数据                                   | `TransformOrder`                   | `null`                |
| y                 | y 通道选择的数据通道来源                           | `'y'\ | 'y1'`                     | `y`                   |
| y1                | y1 通道选择的数据通道来源                          | `'y'\ | 'y1'`                     | `y1`                   |
| reverse           | 是否逆序                                        | `boolean`                          | `false`               |
| series            | 是否有分组字段                                   | `boolean`                         | `true`                 |

```ts
type Primitive = number | string | boolean | Date;

type TransformOrder =
  | 'value'
  | 'sum'
  | 'series'
  | 'maxIndex'
  | string[]
  | null
  | ((data: Record<string, Primitive>) => Primitive);
```
