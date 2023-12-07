---
title: chord
order: 1
---
弦图（Chord diagram）是一种用于可视化关系和连接的图表形式。它主要用于展示多个实体之间的相互关系、联系的强度或流量的分布。

## 开始使用

<img alt="chord" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*x6h_RZR7r0QAAAAAAAAAAAAADmJ7AQ/original" width="600" />

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.chord().data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/population-flow.json',
  transform: [
    {
      type: 'custom',
      callback: (d) => ({ links: d }),
    },
  ],
});

chart.render();
```

## 选项

| 属性             | 描述                                                      | 类型                          | 默认值                        |
| ---------------- | --------------------------------------------------------- | ----------------------------- | ----------------------------- |
| y                | 布局时y轴的坐标                                           | `number`                    | `0`                         |
| id               | 节点的键                                                  | `Function<string \| number>` | `(node) => node.key`        |
| source           | 设置弦图的来源节点数据字段                                | `Function<string>`          | `(node) => node.source`     |
| target           | 设置弦图的目标节点数据字段                                | `Function<string>`          | `(node) => node.target`     |
| sourceWeight     | 来源的权重                                                | `Function<number>`          | `(node) => node.value \|\| 1` |
| targetWeight     | 目标的权重                                                | `Function<number>`          | `(node) => node.value \|\| 1` |
| sortBy           | 排序方法，可选id, weight, frequency排序或者自定义排序方法 | `string \| Function<number>` | -                             |
| nodeWidthRatio   | 弦图节点的宽度配置，0 ~ 1，参考画布的宽度                 | `number`                   | `0.05`                      |
| nodePaddingRatio | 弦图节点之间的间距，0 ~ 1，参考画布的高度                 | `number`                    | `0.1`                       |
