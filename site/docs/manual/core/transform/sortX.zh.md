---
title: sortX
order: 2
---

## 概述

`sortX` 是 G2 提供的一个常用数据变换（transform），用于对**离散型 x 轴**的定义域进行排序。通过指定排序依据，可以让图表的 x 轴按照某个度量值（如 y、color、size 等）进行升序或降序排列，从而更直观地展示数据的大小关系或分布趋势。  
`sortX` 支持灵活的排序通道、聚合方式、分片等配置，常用于突出重点、优化可读性、对比分析等场景，**尤其适用于 x 通道为离散型的 mark（如 interval、rect、point 等）**。

---

## 使用场景

- **柱状图/条形图排序**：将柱子按数值从高到低（或低到高）排列，便于对比各项数据。
- **分组/分面排序**：在分组或分面场景下，按组内某个指标排序，突出分组间的差异。
- **Top N/Bottom N 筛选**：结合 `slice` 配置，仅展示前 N 或后 N 项数据，聚焦重点。
- **与其他变换联用**：常与 `dodgeX`、`diffY` 等 transform 组合使用，实现更复杂的数据布局和视觉效果。

---

## 配置项

| 属性    | 描述                                         | 类型                         | 默认值  |
| ------- | -------------------------------------------- | ---------------------------- | ------- |
| by      | 指定排序的通道（如 'y'、'color'、'size' 等） | `string`                     | `'y'`   |
| reverse | 是否逆序                                     | `boolean`                    | `false` |
| slice   | 选择一个分片范围（如前 N 项、区间）          | `number \| [number, number]` |         |
| reducer | 分组聚合方式，用于多值比较                   | `Reducer`                    | `'max'` |
| ordinal | 是否按分类型通道处理（连续数据时设为 false） | `boolean`                    | `true`  |

### by

指定排序依据的通道，常用如 `'y'`（按 y 值排序）、`'color'`（按颜色分组排序）、`'size'`（按点大小排序）等。

### reverse

是否逆序排列。`true` 表示将排序结果逆序，`false` 表示保持默认顺序。实际排序方向还与 `reducer` 聚合方式有关（如 `reducer: 'max'` 时，reverse: true 为降序；`reducer: 'min'` 时，reverse: true 为升序）。

### slice

用于截取排序后的部分数据。可以是一个数字（前 N 项），或区间 `[start, end]`。

### reducer

当排序依据为数组或分组时，指定聚合方式。支持 `'max'`、`'min'`、`'sum'`、`'mean'`、`'median'`、`'first'`、`'last'`，也可自定义函数。

### ordinal

是否按分类型通道处理，若排序依据为连续型数据可设为 `false`。

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

### 1. 柱状图按 y 值降序排序

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { 类别: 'A', 数值: 30 },
    { 类别: 'B', 数值: 50 },
    { 类别: 'C', 数值: 20 },
    { 类别: 'D', 数值: 40 },
  ],
  encode: { x: '类别', y: '数值' },
  transform: [{ type: 'sortX', by: 'y', reverse: true }],
});

chart.render();
```

### 2. 只显示 Top 3 项（slice）

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { 类别: 'A', 数值: 30 },
    { 类别: 'B', 数值: 50 },
    { 类别: 'C', 数值: 20 },
    { 类别: 'D', 数值: 40 },
  ],
  encode: { x: '类别', y: '数值' },
  transform: [{ type: 'sortX', by: 'y', reverse: true, slice: 3 }],
});

chart.render();
```

### 3. 与 dodgeX 联用，分组后排序

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { 州: 'A', 年龄: '青年', 人口: 30 },
    { 州: 'A', 年龄: '中年', 人口: 40 },
    { 州: 'A', 年龄: '老年', 人口: 20 },
    { 州: 'B', 年龄: '青年', 人口: 50 },
    { 州: 'B', 年龄: '中年', 人口: 60 },
    { 州: 'B', 年龄: '老年', 人口: 30 },
  ],
  encode: { x: '州', y: '人口', color: '年龄' },
  transform: [{ type: 'sortX', by: 'y', reverse: true }, { type: 'dodgeX' }],
});

chart.render();
```

### 4. 复杂排序与 reducer 配置

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { 类别: 'A', 数值: 30 },
    { 类别: 'B', 数值: 50 },
    { 类别: 'C', 数值: 20 },
    { 类别: 'D', 数值: 40 },
  ],
  encode: { x: '类别', y: '数值' },
  transform: [
    { type: 'sortX', by: 'y', reducer: 'min' }, // 按最小值排序
  ],
});

chart.render();
```
