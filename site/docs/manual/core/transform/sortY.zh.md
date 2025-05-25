---
title: sortY
order: 2
---

## 概述

`sortY` 是 G2 提供的一个常用数据变换（transform），用于对离散型 y 轴的定义域进行排序。通过指定排序依据，可以让图表的 y 轴按照某个度量值（如 x、color 等）进行升序或降序排列，从而更直观地展示数据的大小关系或分布趋势。  
`sortY` 支持灵活的排序通道、聚合方式、分片等配置，常用于突出重点、优化可读性、对比分析等场景，尤其适用于条形图、分组条形图等。

---

## 使用场景

- **条形图排序**：将条形按数值从高到低（或低到高）排列，便于对比各项数据。
- **分组/分面排序**：在分组或分面场景下，按组内某个指标排序，突出分组间的差异。
- **Top N/Bottom N 筛选**：结合 `slice` 配置，仅展示前 N 或后 N 项数据，聚焦重点。
- **与其他变换联用**：常与 `dodgeY`、`diffX` 等 transform 组合使用，实现更复杂的数据布局和视觉效果。

---

## 配置项

| 属性    | 描述                                                   | 类型                         | 默认值  |
| ------- | ------------------------------------------------------ | ---------------------------- | ------- |
| by      | 指定排序的通道（如 'x'、'color' 等）                   | `string`                     | `'y'`   |
| reverse | 是否逆序                                               | `boolean`                    | `false` |
| slice   | 选择一个分片范围（如前 N 项、区间）                    | `number \| [number, number]` |         |
| reducer | 分组聚合方式，用于多值比较                             | `Reducer`                    | `'max'` |

### by

指定排序依据的通道，常用如 `'x'`（按 x 值排序）、`'color'`（按颜色分组排序）等。

### reverse

是否逆序排列，`true` 为降序，`false` 为升序。

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

### 1. 条形图按 x 值降序排序

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    coordinate: { transpose: true },
    data: [
      { 类别: 'A', 数值: 30 },
      { 类别: 'B', 数值: 50 },
      { 类别: 'C', 数值: 20 },
      { 类别: 'D', 数值: 40 },
    ],
    encode: { y: '类别', x: '数值' },
    transform: [
      { type: 'sortY', by: 'x', reverse: true },
    ],
  });

  chart.render();
  return chart.getContainer();
})();
```

### 2. 只显示 Top 2 项（slice）

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    coordinate: { transpose: true },
    data: [
      { 类别: 'A', 数值: 30 },
      { 类别: 'B', 数值: 50 },
      { 类别: 'C', 数值: 20 },
      { 类别: 'D', 数值: 40 },
    ],
    encode: { y: '类别', x: '数值' },
    transform: [
      { type: 'sortY', by: 'x', reverse: true, slice: 2 },
    ],
  });

  chart.render();
  return chart.getContainer();
})();
```

### 3. 分组条形图排序

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    coordinate: { transpose: true },
    data: [
      { 地区: '东部', 年份: '2022', 销量: 80 },
      { 地区: '东部', 年份: '2023', 销量: 90 },
      { 地区: '西部', 年份: '2022', 销量: 60 },
      { 地区: '西部', 年份: '2023', 销量: 70 },
      { 地区: '南部', 年份: '2022', 销量: 50 },
      { 地区: '南部', 年份: '2023', 销量: 65 },
    ],
    encode: { y: '地区', x: '销量', color: '年份' },
    transform: [
      { type: 'sortY', by: 'x', reverse: true },
    ],
  });

  chart.render();
  return chart.getContainer();
})();
```

### 4. 复杂排序与 reducer 配置

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    coordinate: { transpose: true },
    data: [
      { 类别: 'A', 数值: 30 },
      { 类别: 'B', 数值: 50 },
      { 类别: 'C', 数值: 20 },
      { 类别: 'D', 数值: 40 },
    ],
    encode: { y: '类别', x: '数值' },
    transform: [
      { type: 'sortY', by: 'x', reducer: 'min' }, // 按最小值排序
    ],
  });

  chart.render();
  return chart.getContainer();
})();
```