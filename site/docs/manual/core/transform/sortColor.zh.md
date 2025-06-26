---
title: sortColor
order: 2
---

## 概述

`sortColor` 是 G2 提供的一个常用数据变换（transform），用于对离散型 color（颜色）通道的定义域进行排序。通过指定排序依据，可以让图表的颜色分组按照某个度量值（如 y、x 等）进行升序或降序排列，从而更直观地展示分组数据的大小关系或分布趋势。  
`sortColor` 支持灵活的排序通道、聚合方式、分片等配置，常用于突出重点、优化可读性、对比分析等场景，尤其适用于分组柱状图、分组条形图、堆叠图等。

---

## 使用场景

- **分组柱状图/条形图排序**：将颜色分组（如不同类别、系列）按数值从高到低（或低到高）排列，便于对比各组数据。
- **分面/多系列排序**：在分面或多系列场景下，按组内某个指标排序，突出分组间的差异。
- **与其他变换联用**：常与 `sortX`、`dodgeX` 等 transform 组合使用，实现更复杂的数据布局和视觉效果。

---

## 配置项

| 属性    | 描述                             | 类型      | 默认值  |
| ------- | -------------------------------- | --------- | ------- |
| by      | 指定排序的通道（如 'y'、'x' 等） | `string`  | `'y'`   |
| reverse | 是否逆序                         | `boolean` | `false` |
| reducer | 分组聚合方式，用于多值比较       | `Reducer` | `'max'` |

### by

指定排序依据的通道，常用如 `'y'`（按 y 值排序）、`'x'`（按 x 值排序）等。  
可选通道详见 [G2 视觉通道文档](/manual/core/encode)。

### reverse

是否逆序排列。`true` 表示将排序结果逆序，`false` 表示保持默认顺序。实际排序方向还与 `reducer` 聚合方式有关（如 `reducer: 'max'` 时，reverse: true 为降序；`reducer: 'min'` 时，reverse: true 为升序）。

### reducer

当排序依据为数组或分组时，指定聚合方式。支持 `'max'`、`'min'`、`'sum'`、`'mean'`、`'median'`、`'first'`、`'last'`，也可自定义函数。

```ts
type Primitive = number | string | boolean | Date;

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

### 1. 分组柱状图按 y 值排序颜色分组（reverse 控制顺序）

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { 类别: 'A', 年份: '2022', 数值: 30 },
    { 类别: 'A', 年份: '2023', 数值: 50 },
    { 类别: 'B', 年份: '2022', 数值: 20 },
    { 类别: 'B', 年份: '2023', 数值: 40 },
    { 类别: 'C', 年份: '2022', 数值: 35 },
    { 类别: 'C', 年份: '2023', 数值: 25 },
  ],
  encode: { x: '类别', y: '数值', color: '年份' },
  transform: [
    { type: 'sortColor', by: 'y', reverse: true },
    { type: 'dodgeX' },
  ],
});

chart.render();
```

### 2. 复杂排序与 reducer 配置

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { 类别: 'A', 年份: '2022', 数值: 30 },
    { 类别: 'A', 年份: '2023', 数值: 50 },
    { 类别: 'B', 年份: '2022', 数值: 20 },
    { 类别: 'B', 年份: '2023', 数值: 40 },
    { 类别: 'C', 年份: '2022', 数值: 35 },
    { 类别: 'C', 年份: '2023', 数值: 25 },
  ],
  encode: { x: '类别', y: '数值', color: '年份' },
  transform: [
    { type: 'sortColor', by: 'y', reducer: 'min' }, // 按最小值排序
    { type: 'dodgeX' },
  ],
});

chart.render();
```
