---
title: sortY
order: 2
---

## 概述

`sortY` 是 G2 提供的一个常用数据变换（transform），用于对**离散型 y 轴**的定义域进行排序。通过指定排序依据，可以让图表的 y 轴按照某个度量值（如 x、color 等）进行升序或降序排列，从而更直观地展示数据的大小关系或分布趋势。  
`sortY` 支持灵活的排序通道、聚合方式、分片等配置，常用于突出重点、优化可读性、对比分析等场景，**尤其适用于 y 通道为离散型的 mark（如散点图、词云、image 等）**。

---

## 使用场景

- **散点图分组排序**：将 y 轴为分组字段的散点图按某个度量值排序。
- **词云/图片分布排序**：对 y 轴为类别的词云、图片等 mark 排序。
- **Top N/Bottom N 筛选**：结合 `slice` 配置，仅展示前 N 或后 N 项数据，聚焦重点。
- **与其他变换联用**：常与 `dodgeY`、`diffX` 等 transform 组合使用，实现更复杂的数据布局和视觉效果。

---

## 配置项

| 属性    | 描述                                         | 类型                         | 默认值  |
| ------- | -------------------------------------------- | ---------------------------- | ------- |
| by      | 指定排序的通道（如 'x'、'color'、'size' 等） | `string`                     | `'y'`   |
| reverse | 是否逆序                                     | `boolean`                    | `false` |
| slice   | 选择一个分片范围（如前 N 项、区间）          | `number \| [number, number]` |         |
| reducer | 分组聚合方式，用于多值比较                   | `Reducer`                    | `'max'` |

### by

指定排序依据的通道，常用如 `'x'`（按 x 值排序）、`'color'`（按颜色分组排序）、`'size'`（按点大小排序）等。

### reverse

是否逆序排列。`true` 表示将排序结果逆序，`false` 表示保持默认顺序。实际排序方向还与 `reducer` 聚合方式有关（如 `reducer: 'max'` 时，reverse: true 为降序；`reducer: 'min'` 时，reverse: true 为升序）。

### slice

用于截取排序后的部分数据。可以是一个数字（前 N 项），或区间 `[start, end]`。

### reducer

当排序依据为数组或分组时，指定聚合方式。支持 `'max'`、`'min'`、`'sum'`、`'mean'`、`'median'`、`'first'`、`'last'`，也可自定义函数。

```ts
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

---

## 示例

### 1. 散点图 y 轴分组排序

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'point',
  data: [
    { city: '北京', year: '2020', value: 30 },
    { city: '上海', year: '2020', value: 50 },
    { city: '广州', year: '2020', value: 20 },
    { city: '深圳', year: '2020', value: 40 },
    { city: '北京', year: '2021', value: 35 },
    { city: '上海', year: '2021', value: 55 },
    { city: '广州', year: '2021', value: 25 },
    { city: '深圳', year: '2021', value: 45 },
  ],
  encode: { x: 'year', y: 'city', color: 'city', size: 'value' },
  transform: [{ type: 'sortY', by: 'size', reverse: true }],
});

chart.render();
```

### 2. 只显示 Top 2 个分组（slice）

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'point',
  data: [
    { city: '北京', year: '2020', value: 30 },
    { city: '上海', year: '2020', value: 50 },
    { city: '广州', year: '2020', value: 20 },
    { city: '深圳', year: '2020', value: 40 },
    { city: '北京', year: '2021', value: 35 },
    { city: '上海', year: '2021', value: 55 },
    { city: '广州', year: '2021', value: 25 },
    { city: '深圳', year: '2021', value: 45 },
  ],
  encode: { x: 'year', y: 'city', color: 'city', size: 'value' },
  transform: [{ type: 'sortY', by: 'size', reverse: true, slice: 2 }],
});

chart.render();
```

---
