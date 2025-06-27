---
title: select
order: 2
---

## 概述

`select` 标记转换是一种非常灵活且高效的选择。按照指定通道进行分组，根据指定通道和 selector 从每组选择出数据。通过 select 转换，可以基于条件筛选数据并实现对特定位置的标记。

<img alt="select" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*LbTfQL1VLtIAAAAAAAAAAAAAemJ7AQ/original" width="500" />

## 使用场景

- 峰值标注：标记折线图的最高/最低点

- 首尾标注： 在时间序列中突出显示起点/终点

- 分类标注： 对不同数据类别进行差异化标记

- 趋势标注： 标记平均值、中位数等统计特征点

## 配置项

| 属性     | 描述                                           | 类型                   | 默认值   |
| -------- | ---------------------------------------------- | ---------------------- | -------- |
| groupBy  | 针对指定的通道进行分组                         | `string` \| `string[]` | `series` |
| channel  | 针对每个分组，使用指定的通道进行指定的数据抽取 | [Channel](#channel)    |          |
| selector | 针对每个分组，指定对应的数据抽取操作           | [Selector](#selector)  | `first`  |

### channel

理论上，`channel` 可以设置为所有的通道值，具体可以参考 [encode](/manual/core/encode) 文档。所有的枚举值如下：

```ts
type Channel =
  | 'x'
  | 'y'
  | 'z'
  | 'x1'
  | 'y1'
  | 'series'
  | 'color'
  | 'opacity'
  | 'shape'
  | 'size'
  | 'key'
  | 'groupKey'
  | 'position'
  | 'series'
  | 'enterType'
  | 'enterEasing'
  | 'enterDuration'
  | 'enterDelay'
  | 'updateType'
  | 'updateEasing'
  | 'updateDuration'
  | 'updateDelay'
  | 'exitType'
  | 'exitEasing'
  | 'exitDuration'
  | 'exitDelay'
  | `position${number}`;
```

### selector

```ts
type Selector =
  | 'min' // 最小值
  | 'max' // 最大值
  | 'first' // 第一个值
  | 'last' // 最后一个值
  | 'mean' // 平均值
  | 'median' // 中位数
  | ((I: number[], V: number[]) => number[]); // 自定义选取函数
```

## 示例

如下所示，对柱形图顶部进行数值标注：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const data = [
  { letter: 'A', frequency: 0.08167 },
  { letter: 'B', frequency: 0.01492 },
  { letter: 'C', frequency: 0.02782 },
  { letter: 'D', frequency: 0.04253 },
  { letter: 'E', frequency: 0.12702 },
  { letter: 'F', frequency: 0.02288 },
  { letter: 'G', frequency: 0.02015 },
  { letter: 'H', frequency: 0.06094 },
  { letter: 'I', frequency: 0.06966 },
  { letter: 'J', frequency: 0.00153 },
  { letter: 'K', frequency: 0.00772 },
  { letter: 'L', frequency: 0.04025 },
  { letter: 'M', frequency: 0.02406 },
  { letter: 'N', frequency: 0.06749 },
  { letter: 'O', frequency: 0.07507 },
  { letter: 'P', frequency: 0.01929 },
  { letter: 'Q', frequency: 0.00095 },
  { letter: 'R', frequency: 0.05987 },
  { letter: 'S', frequency: 0.06327 },
  { letter: 'T', frequency: 0.09056 },
  { letter: 'U', frequency: 0.02758 },
  { letter: 'V', frequency: 0.00978 },
  { letter: 'W', frequency: 0.0236 },
  { letter: 'X', frequency: 0.0015 },
  { letter: 'Y', frequency: 0.01974 },
  { letter: 'Z', frequency: 0.00074 },
];

const chart = new Chart({
  container: 'container',
});
chart.options({
  width: 800,
  paddingLeft: 50,
  paddingRight: 100,
  data,
  children: [
    // 柱形图标记配置
    {
      type: 'interval',
      encode: {
        x: 'letter',
        y: 'frequency',
      },
    },
    // 文本标记配置
    {
      type: 'text',
      encode: {
        x: 'letter',
        y: 'frequency',
        text: 'frequency',
        series: 'frequency',
      },
      transform: [
        {
          // 使用select 转换标记
          type: 'select',
          // 基于y通道
          channel: 'y',
          // 选择最高点
          selector: 'max',
        },
      ],
      style: {
        // 标注文本向左偏移12个像素
        dx: -12,
        // 标注文本向上偏移12个像素
        dy: -12,
      },
    },
  ],
});

chart.render();
```
