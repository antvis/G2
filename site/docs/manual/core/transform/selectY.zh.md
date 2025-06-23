---
title: selectY
order: 2
---

## 概述

`selectY` 基于 y 通道上的数据进行筛选，选出符合范围或条件的数据子集。

<img alt="selectY" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*pwabTpvQCUEAAAAAAAAAAAAAemJ7AQ/original" width="500" />

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

如下所示，在图表中标注出每个城市的最高温度：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const data = [
  { month: 1, city: 'Tokyo', temperature: 7 },
  { month: 1, city: 'London', temperature: 3.9 },
  { month: 2, city: 'Tokyo', temperature: 6.9 },
  { month: 2, city: 'London', temperature: 4.2 },
  { month: 3, city: 'Tokyo', temperature: 9.5 },
  { month: 3, city: 'London', temperature: 5.7 },
  { month: 4, city: 'Tokyo', temperature: 14.5 },
  { month: 4, city: 'London', temperature: 8.5 },
  { month: 5, city: 'Tokyo', temperature: 18.4 },
  { month: 5, city: 'London', temperature: 11.9 },
  { month: 6, city: 'Tokyo', temperature: 21.5 },
  { month: 6, city: 'London', temperature: 15.2 },
  { month: 7, city: 'Tokyo', temperature: 25.2 },
  { month: 7, city: 'London', temperature: 17 },
  { month: 8, city: 'Tokyo', temperature: 26.5 },
  { month: 8, city: 'London', temperature: 16.6 },
  { month: 9, city: 'Tokyo', temperature: 23.3 },
  { month: 9, city: 'London', temperature: 14.2 },
  { month: 10, city: 'Tokyo', temperature: 18.3 },
  { month: 10, city: 'London', temperature: 10.3 },
  { month: 11, city: 'Tokyo', temperature: 13.9 },
  { month: 11, city: 'London', temperature: 6.6 },
  { month: 12, city: 'Tokyo', temperature: 9.6 },
  { month: 12, city: 'London', temperature: 4.8 },
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
    // 折线图标记配置
    {
      type: 'line',
      encode: {
        x: 'month',
        y: 'temperature',
        color: 'city',
      },
      axis: {
        y: {
          title: '温度',
        },
      },
    },
    // 文本标记配置
    {
      type: 'text',
      encode: {
        x: 'month',
        y: 'temperature',
        series: 'city',
        text: (d) => `最高温度：${d.temperature}°C`,
      },
      transform: [
        {
          // 使用selectY 转换标记
          type: 'selectY',
          // 选择最大值
          selector: 'max',
        },
      ],
      style: {
        // 标注文本沿y轴偏移12个像素
        dy: -12,
      },
      // 关闭文本标记的tooltip
      tooltip: false,
    },
    // point点标记配置
    {
      type: 'point',
      encode: {
        x: 'month',
        y: 'temperature',
        color: 'city',
        series: 'city',
      },
      transform: [
        {
          // 使用selectY 转换标记
          type: 'selectY',
          // 选择最大值
          selector: 'max',
        },
      ],
      // 关闭point点标记的tooltip
      tooltip: false,
    },
  ],
});

chart.render();
```

```

```
