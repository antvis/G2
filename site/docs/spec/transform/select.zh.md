---
title: select
order: 1
---

按照指定通道进行分组，根据指定通道和 selector 从每组选择出数据。

## 开始使用

<img alt="select" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*q8F1S4YXwtsAAAAAAAAAAAAADmJ7AQ/original" width="500" />

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 800,
  paddingLeft: 50,
  paddingRight: 100,
});

chart.data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/indices.json',
});

chart
  .line()
  .encode('x', (d) => new Date(d.Date))
  .encode('y', 'Close')
  .encode('color', 'Symbol')
  .axis('y', { title: '↑ Change in price (%)' });

chart
  .text()
  .encode('x', (d) => new Date(d.Date))
  .encode('y', 'Close')
  .encode('series', 'Symbol')
  .encode('color', 'Symbol')
  .encode('text', 'Symbol')
  .transform({ type: 'select', channel: 'series', selector: 'last' })
  .style('dx', 12);

chart.render();
```

## 选项

| 属性     | 描述                                           | 类型                   | 默认值   |
| -------- | ---------------------------------------------- | ---------------------- | -------- |
| groupBy  | 针对指定的通道进行分组                         | `string` \| `string[]` | `series` |
| channel  | 针对每个分组，使用指定的通道进行指定的数据抽取 | `string`               |          |
| selector | 针对每个分组，指定对应的数据抽取操作           | `Selector`             | `first`  |

```ts
type Selector =
  | 'min'
  | 'max'
  | 'first'
  | 'last'
  | 'mean'
  | 'median'
  | ((I: number[], V: number[]) => number[]);
```
