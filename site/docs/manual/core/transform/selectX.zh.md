---
title: selectX
order: 2
---

## 概述

`selectX` 基于 x 通道上的数据进行筛选，选出符合范围或条件的数据子集。

<img alt="selectX" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*R-q2QaIHGccAAAAAAAAAAAAAemJ7AQ/original" width="500">

## 使用场景

- 峰值标注：标记折线图的最高/最低点

- 首尾标注： 在时间序列中突出显示起点/终点

- 分类标注： 对不同数据类别进行差异化标记

- 趋势标注： 标记平均值、中位数等统计特征点

## 配置项

| 属性     | 描述                                 | 类型                   | 默认值   |
| -------- | ------------------------------------ | ---------------------- | -------- |
| groupBy  | 针对指定的通道进行分组               | `string` \| `string[]` | `series` |
| selector | 针对每个分组，指定对应的数据抽取操作 | [Selector](#selector)  | `first`  |

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

如下所示，对不同的数据类型进行标注：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  width: 800,
  paddingLeft: 50,
  paddingRight: 100,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/indices.json',
  },
  children: [
    // 折线标记配置
    {
      type: 'line',
      encode: {
        x: (d) => new Date(d.Date),
        y: 'Close',
        color: 'Symbol',
      },
      axis: {
        y: {
          title: '↑ Change in price (%)',
        },
      },
    },
    // 文本标注配置
    {
      type: 'text',
      encode: {
        x: (d) => new Date(d.Date),
        y: 'Close',
        series: 'Symbol',
        color: 'Symbol',
        text: 'Symbol',
      },
      transform: [
        {
          // 使用selectX 转换标记
          type: 'selectX',
          // 选择最后一个数据点
          selector: 'last',
        },
      ],
      style: {
        // 标注文本向右偏移12个像素
        dx: 12,
      },
      // 关闭文本的tooltip
      tooltip: false,
    },
  ],
});

chart.render();
```
