---
title: time
order: 2
---

Time 比例尺是一种特殊的连续比例尺，专门用于处理时间序列数据。它将时间数据（Date 对象）映射到连续的数值范围。Time 比例尺的映射函数为 `y = x.getTime() + b`，其中 `x` 是时间值，`b` 是偏移量。

## 概述

Time 比例尺属于连续比例尺的一种，主要用于处理时间序列数据的可视化。它能够：

- 自动处理时间数据的格式化和解析
- 提供灵活的时间刻度生成机制

## 配置项

| 属性         | 描述                                                                        | 类型                                                    | 默认值                                 | 必选 |
| ------------ | --------------------------------------------------------------------------- | ------------------------------------------------------- | -------------------------------------- | ---- |
| domain       | 设置数据的定义域范围                                                        | `Date[]`                                                | 输入数据的最大最小值范围               |      |
| domainMin    | 设置数据的定义域最小值                                                      | `Date`                                                  | 输入数据的最小值                       |      |
| domainMax    | 设置数据的定义域最大值                                                      | `Date`                                                  | 输入数据的最大值                       |      |
| range        | 设置数据映射的值域范围                                                      | `number[]` \| `string[]`                                | `[0, 1]`                               |      |
| rangeMin     | 设置数据映射的值域最小值                                                    | `number`\| `string`                                     | `0`                                    |      |
| rangeMax     | 设置数据映射的值域最大值                                                    | `number`\| `string`                                     | `1`                                    |      |
| unknown      | 对于 `undefined`，`NaN`，`null` 空值，返回的数据                            | `any`                                                   | `undefined`                            |      |
| tickCount    | 设置推荐的 tick 生成数量，tickCount 只是建议值，不会完全按照这个值产生 tick | `number`                                                | `5`                                    |      |
| tickInterval | 设置推荐的 tick 之间的间隔，tickInterval 优先级高于 tickCount               | `number`                                                | `undefined`                            |      |
| tickMethod   | 设置生成 tick 的方法，常用于自定义 tick                                     | `(min: number, max: number, count: number) => number[]` | `d3Time`                               |      |
| round        | 输出值去四舍五入                                                            | `boolean`                                               | `false`                                |      |
| clamp        | 将映射值限定在 range 的范围内                                               | `boolean`                                               | `false`                                |      |
| nice         | 扩展 domain 范围，让输出的 tick 展示得更加友好                              | `boolean`                                               | `false`                                |      |
| mask         | 设置时间显示的格式，底层使用 [fetcha](https://github.com/taylorhakes/fecha) | `string`                                                | `undefined`                            |      |
| utc          | 是否使用 UTC 时间                                                           | `boolean`                                               | `false`                                |      |
| interpolate  | 自定义差值函数                                                              | `(a: number, b: number) => (t: number) => T`            | `(a, b) => (t) => a * (1 - t) + b * t` |      |

### 复杂类型说明

#### tickMethod

```ts
type TickMethod = (min: number, max: number, count: number) => number[];
```

用于自定义时间刻度的生成方法，接收最小值、最大值和期望的刻度数量，返回一个时间数组。

#### interpolate

```ts
type Interpolate = (a: number, b: number) => (t: number) => T;
```

用于自定义两个时间值之间的插值方法，默认使用线性插值。

## 示例

### 开始使用

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const data = [
  {
    time: '2015-11-19',
    start: 8.18,
    max: 8.33,
    min: 7.98,
    end: 8.32,
    volumn: 1810,
    money: 14723.56,
  },
  {
    time: '2015-11-18',
    start: 8.37,
    max: 8.6,
    min: 8.03,
    end: 8.09,
    volumn: 2790.37,
    money: 23309.19,
  },
  {
    time: '2015-11-17',
    start: 8.7,
    max: 8.78,
    min: 8.32,
    end: 8.37,
    volumn: 3729.04,
    money: 31709.71,
  },
  {
    time: '2015-11-16',
    start: 8.18,
    max: 8.69,
    min: 8.05,
    end: 8.62,
    volumn: 3095.44,
    money: 26100.69,
  },
  {
    time: '2015-11-13',
    start: 8.01,
    max: 8.75,
    min: 7.97,
    end: 8.41,
    volumn: 5815.58,
    money: 48562.37,
  },
  {
    time: '2015-11-12',
    start: 7.76,
    max: 8.18,
    min: 7.61,
    end: 8.15,
    volumn: 4742.6,
    money: 37565.36,
  },
  {
    time: '2015-11-11',
    start: 7.55,
    max: 7.81,
    min: 7.49,
    end: 7.8,
    volumn: 3133.82,
    money: 24065.42,
  },
  {
    time: '2015-11-10',
    start: 7.5,
    max: 7.68,
    min: 7.44,
    end: 7.57,
    volumn: 2670.35,
    money: 20210.58,
  },
  {
    time: '2015-11-09',
    start: 7.65,
    max: 7.66,
    min: 7.3,
    end: 7.58,
    volumn: 2841.79,
    money: 21344.36,
  },
  {
    time: '2015-11-06',
    start: 7.52,
    max: 7.71,
    min: 7.48,
    end: 7.64,
    volumn: 2725.44,
    money: 20721.51,
  },
  {
    time: '2015-11-05',
    start: 7.48,
    max: 7.57,
    min: 7.29,
    end: 7.48,
    volumn: 3520.85,
    money: 26140.83,
  },
  {
    time: '2015-11-04',
    start: 7.01,
    max: 7.5,
    min: 7.01,
    end: 7.46,
    volumn: 3591.47,
    money: 26285.52,
  },
  {
    time: '2015-11-03',
    start: 7.1,
    max: 7.17,
    min: 6.82,
    end: 7,
    volumn: 2029.21,
    money: 14202.33,
  },
  {
    time: '2015-11-02',
    start: 7.09,
    max: 7.44,
    min: 6.93,
    end: 7.17,
    volumn: 3191.31,
    money: 23205.11,
  },
  {
    time: '2015-10-30',
    start: 6.98,
    max: 7.27,
    min: 6.84,
    end: 7.18,
    volumn: 3522.61,
    money: 25083.44,
  },
  {
    time: '2015-10-29',
    start: 6.94,
    max: 7.2,
    min: 6.8,
    end: 7.05,
    volumn: 2752.27,
    money: 19328.44,
  },
  {
    time: '2015-10-28',
    start: 7.01,
    max: 7.14,
    min: 6.8,
    end: 6.85,
    volumn: 2311.11,
    money: 16137.32,
  },
  {
    time: '2015-10-27',
    start: 6.91,
    max: 7.31,
    min: 6.48,
    end: 7.18,
    volumn: 3172.9,
    money: 21827.3,
  },
  {
    time: '2015-10-26',
    start: 6.9,
    max: 7.08,
    min: 6.87,
    end: 6.95,
    volumn: 2769.31,
    money: 19337.44,
  },
  {
    time: '2015-10-23',
    start: 6.71,
    max: 6.85,
    min: 6.58,
    end: 6.79,
    volumn: 2483.18,
    money: 16714.31,
  },
  {
    time: '2015-10-22',
    start: 6.38,
    max: 6.67,
    min: 6.34,
    end: 6.65,
    volumn: 2225.88,
    money: 14465.56,
  },
];

chart
  .data(data)
  .encode('x', 'time')
  .encode('color', (d) => {
    const trend = Math.sign(d.start - d.end);
    return trend > 0 ? '下跌' : trend === 0 ? '不变' : '上涨';
  })
  .scale('x', {
    compare: (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  })
  .scale('color', {
    domain: ['下跌', '不变', '上涨'],
    range: ['#4daf4a', '#999999', '#e41a1c'],
  });

chart
  .link()
  .encode('y', ['min', 'max'])
  .tooltip({
    title: 'time',
    items: [
      { field: 'start', name: '开盘价' },
      { field: 'end', name: '收盘价' },
      { field: 'min', name: '最低价' },
      { field: 'max', name: '最高价' },
    ],
  });

chart
  .interval()
  .encode('y', ['start', 'end'])
  .style('fillOpacity', 1)
  .style('stroke', (d) => {
    if (d.start === d.end) return '#999999';
  })
  .axis('y', {
    title: false,
  })
  .tooltip({
    title: 'time',
    items: [
      { field: 'start', name: '开盘价' },
      { field: 'end', name: '收盘价' },
      { field: 'min', name: '最低价' },
      { field: 'max', name: '最高价' },
    ],
  });

chart.render();
```

### 示例代码解释

上面的示例展示了一个股票 K 线图的实现，它充分利用了时间比例尺的特性。以下是关键部分的解释：

#### 数据结构

每个数据点包含多个字段：`time`（日期）、`start`（开盘价）、`max`（最高价）、`min`（最低价）、`end`（收盘价）以及交易量和金额。数据按时间顺序排列，从 2015 年 10 月 22 日到 2015 年 11 月 19 日。

#### 时间比例尺配置

```js
chart.scale('x', {
  compare: (a, b) => new Date(a).getTime() - new Date(b).getTime(),
});
```

这段代码的关键在于自定义的比较函数，它将字符串时间转换为时间戳进行比较，确保数据能够正确排序。这是时间比例尺的一个重要应用，使其能够处理字符串形式的日期数据。

#### 颜色编码

```js
chart.encode('color', (d) => {
  const trend = Math.sign(d.start - d.end);
  return trend > 0 ? '下跌' : trend === 0 ? '不变' : '上涨';
});
```

这个函数根据开盘价与收盘价的关系来决定每个数据点的颜色：

- 当开盘价大于收盘价时（下跌），使用绿色
- 当开盘价等于收盘价时（不变），使用灰色
- 当开盘价小于收盘价时（上涨），使用红色

#### 图形元素

该示例使用了两个图形元素来构建完整的 K 线图：

1. `chart.link()`：绘制从最低价到最高价的线段（K 线图的影线部分）
2. `chart.interval()`：绘制从开盘价到收盘价的矩形（K 线图的实体部分）

两个图形元素共享相同的工具提示配置，当鼠标悬停时显示完整的价格信息。

#### 应用场景

这个示例展示了时间比例尺在金融数据可视化中的典型应用：

- 处理时序数据的排序和格式化
- 处理日期字符串到可视位置的转换
- 结合多个图形元素展示复杂的时间相关数据

通过这种方式，时间比例尺使得创建股票分析、经济趋势等金融数据可视化变得简单高效。
