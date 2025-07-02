---
title: quantile
order: 2
---

## 概述

`quantile` 比例尺属于**离散化比例尺**，主要用于将连续型数据按照分位数（quantile）进行分组，然后映射到指定的值域（range）。它是一种**按照数据密度自动分段**的度量，与 [threshold](/manual/core/scale/threshold) 类似，但 quantile 是根据数据的排序索引自动等分，而不是手动指定阈值。它会根据数据的分布密度自动确定分段点（ticks），这些分段点由数据的分位数决定，而不是均匀分布；scale 时是按照这些 ticks 进行分段映射，ticks 的计算方式采用 `tickMethod: quantile`。这一特性使得 quantile 比例尺特别适合展示具有不均匀分布的数据集，能更准确地反映数据密度变化，适用于需要根据数据本身特性进行离散化的场景。

### 映射效果举例

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  data: [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4 },
    { year: '1996', value: 5 },
    { year: '1997', value: 7 },
    { year: '1998', value: 7 },
    { year: '1999', value: 13 },
  ],
  encode: { x: 'year', y: 'value' },
  scale: {
    y: {
      type: 'quantile',
      range: [1, 0.5, 0],
    },
  },
  children: [
    { type: 'line', labels: [{ text: 'value', style: { dx: -10, dy: -12 } }] },
    { type: 'point', style: { fill: 'white' }, tooltip: false },
  ],
});

chart.render();
```

> 上图说明更多的 4-5 周围的值都被映射到了 0.5,故 4-5 之间的数据密度最大。

## 配置项

| 属性       | 描述                                                           | 类型                                                    | 默认值               | 必选 |
| ---------- | -------------------------------------------------------------- | ------------------------------------------------------- | -------------------- | ---- |
| domain     | 设置数据的定义域范围                                           | `number[]`                                              | `[]`                 |      |
| range      | 设置数据映射的值域范围                                         | `any[]`                                                 | `[]`                 | ✔    |
| unknown    | 对于 `undefined`、`NaN`、`null` 空值，返回的数据               | `any`                                                   | `undefined`          |      |
| tickCount  | 设置推荐的 tick 生成数量，tickCount 只是建议值，不保证完全生效 | `number`                                                | `5`                  |      |
| tickMethod | 设置生成 tick 的方法，常用于自定义 tick                        | `(min: number, max: number, count: number) => number[]` | `wilkinson-extended` |      |
| nice       | 扩展 domain 范围，让输出的 tick 展示得更加友好                 | `boolean`                                               | `false`              |      |

### 复杂类型说明

- **tickMethod**：
  - 类型：`(min: number, max: number, count: number) => number[]`
  - 说明：用于生成刻度值（ticks）的函数，接收定义域的最小值、最大值和期望的刻度数量作为参数。在 quantile 比例尺中，虽然实际数据分段是通过分位数（quantile）计算得到的 thresholds，但生成用于展示的刻度值是通过 tickMethod 完成的。默认使用 `wilkinson-extended` 算法，这是一种能生成美观、均匀分布刻度的算法。自定义此方法可以控制坐标轴上显示的刻度位置和数量。
  - 示例：`tickMethod: (min, max, count) => [min, (min+max)/2, max]` 将只在最小值、中间值和最大值处生成刻度。

## 示例

### 色块图

以下示例展示如何用 quantile 比例尺将薪资数据分为三组并映射为不同颜色：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'cell',
  height: 640,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/bd287f2c-3e2b-4d0a-8428-6a85211dce33.json',
  },
  encode: { x: 'x', y: 'y', color: 'index' },
  scale: {
    color: { type: 'quantile', range: ['#eeeeee', '#ffc3ce', '#ff0d0d'] },
  },
  style: { stroke: '#000', inset: 2 },
  animate: { enter: { type: 'fadeIn' } },
});

chart.render();
```

> 在上例中，quantile 比例尺会自动根据数据分布将薪资分为三组，并映射为三种不同的颜色，适合展示数据分布的分层效果。
