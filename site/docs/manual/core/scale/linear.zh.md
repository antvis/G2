---
title: linear
order: 2
---

## 概述

linear 是连续型比例尺的基类，它的核心作用是将数据从数据域（domain）线性映射到视觉范围（range），同时保留数据之间的比例关系。每个输出值 y 均可表示为输入值 x 的线性函数：`y = mx + b`。

当未显式声明比例尺类型时，G2 会对数值型（如温度、销售额）字段默认应用 linear 比例尺。

## 使用方式

linear 比例尺常规用于将数据映射到归一化坐标上。这个例子中会将 y 通道的比例尺设置它的映射方式，从而影响到图形在画布上的位置。

```ts
chart
  .line()
  .encode('x', 'year')
  .encode('y', 'sale')
  .scale('y', {
    type: 'linear',
    range: [0.2, 0.8],
    /* 其他配置项 */
  });
```

不仅可以在数据类型为连续数值数据时使用，也可以在需要保持数据比例关系中使用。

```ts
chart
  .interval()
  .data([
    { time: '2023-01', sales: '100' },
    { time: '2023-01', sales: '300' },
  ])
  .encode('x', 'time')
  .encode('y', 'sales')
  .scale('y', {
    type: 'linear', // 当 sales 数值为字符串，会被错误地推断为分类数据，需要显式设置
  });
```

## 配置层级

交互可以配置在 Mark 层级：

```ts
({
  type: 'line',
  scale: {
    x: { padding: 0.5 },
    y: {
      type: 'linear', // 指定类型
      domain: [10, 100], // 指定定义域
      range: [0, 1], // 指定值域
    },
  },
});
```

也可以配置在 View 层级：

```ts
({
  type: 'view',
  scale: {
    x: { padding: 0.5 },
    y: {
      type: 'linear', // 指定类型
      domain: [10, 100], // 指定定义域
      range: [0, 1], // 指定值域
    },
  },
});
```

## 配置项

| 属性        | 描述                                                                        | 类型                                                    | 默认值                                 |
| ----------- | --------------------------------------------------------------------------- | ------------------------------------------------------- | -------------------------------------- |
| domain      | 设置数据的定义域范围                                                        | `number[]`                                              | 输入数据的最大最小值范围               |
| domainMin   | 设置数据的定义域最小值                                                      | `number`                                                | 输入数据的最小值                       |
| domainMax   | 设置数据的定义域最大值                                                      | `number`                                                | 输入数据的最大                         |
| range       | 设置数据映射的值域范围                                                      | `number[]` \| `string[]`                                | `[0, 1]`                               |
| rangeMin    | 设置数据映射的值域最小值                                                    | `number \| string`                                      | `0`                                    |
| rangeMax    | 设置数据映射的值域最大值                                                    | `number \| string`                                      | `1`                                    |
| unknown     | 对于 `undefined`， `NaN`，`null` 空值，返回的数据                           | `any`                                                   | `undefined`                            |
| tickCount   | 设置推荐的 tick 生成数量，tickCount 只是建议值，不会完全按照这个值产生 tick | `number`                                                | `5`                                    |
| tickMethod  | 设置生成 tick 的方法，常用于自定义 tick                                     | `(min: number, max: number, count: number) => number[]` | `d3-ticks`                             |
| round       | 输出值去四舍五入                                                            | `boolean`                                               | `false`                                |
| clamp       | 将映射值限定在 range 的范围内                                               | `boolean`                                               | `false`                                |
| nice        | 扩展 domain 范围，让输出的 tick 展示得更加友好                              | `boolean`                                               | `false`                                |
| interpolate | 自定义差值函数                                                              | `(a: number, b: number) => (t: number) => T`            | `(a, b) => (t) => a * (1 - t) + b * t` |

## 示例

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const data = [
  { time: '2023-01', sales: 100 },
  { time: '2023-02', sales: 200 },
  { time: '2023-03', sales: 150 },
  { time: '2023-04', sales: 300 },
  { time: '2023-05', sales: 400 },
];

chart
  .interval()
  .data(data)
  .encode('x', 'time')
  .encode('y', 'sales')
  .scale('y', {
    type: 'linear', // 使用线性比例尺
    nice: true,
    domain: [0, 300], // 自定义设置比例尺的范围，需要显式设置
  });

chart.render();
```

## FAQ

- 怎么自定义 y 轴的刻度？

比如只需要在刻度上显示 0, 100, 600，那就以下方式设置 y 比例尺。

```ts
chart
  .line()
  // ...
  .scale('y', {
    type: 'linear',
    domain: [0, 700],
    tickMethod: () => [0, 100, 600],
  });
```
