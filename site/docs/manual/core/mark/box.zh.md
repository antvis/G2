---
title: box
order: 3
---

## 概述

`box` 标记用于绘制箱线图（boxplot），又称盒须图、盒式图，是一种用于展示一组数据分布情况的统计图表。箱线图通常包含以下几个关键统计值：

- **最小值**：数据集中的最小值（不包括异常值）
- **下四分位数（Q1）**：数据集中排在 25%位置的值
- **中位数（Q2）**：数据集中排在 50%位置的值
- **上四分位数（Q3）**：数据集中排在 75%位置的值
- **最大值**：数据集中的最大值（不包括异常值）

`box` 标记的特殊之处在于，它的 `y` 通道对应的数据是一个包含这些统计值的数组，G2 会将这些数据映射为箱线图所需的 14 个点集合，形成完整的箱线图图形。

<img alt="box" width="100%" style="max-width: 400px" src="https://gw.alipayobjects.com/zos/antfincdn/f6WEf%24CrgE/20220913111713.jpg" />

`box` 标记与 [`boxplot`](/manual/core/mark/boxplot) 标记的区别在于：

- `box` 是原子标记，需要开发者手动指定 5 个统计点的数据
- `boxplot` 是高阶标记，自带数据分组和数据统计聚合功能

因此，`box` 更适用于后端对超大数据进行计算和统计之后的可视化展示，而 `boxplot` 更适合用于前端数据的探索和分析过程。

### 箱线图的点集合结构

`box` 标记内部会将数据映射为以下 14 个点的集合，形成完整的箱线图：

```text
p0           p2          p1
   ──────────┬──────────
             │
             │
             │
             │ p3
p4 ┌─────────┴──────────┐ p5
   │                    │
   │                    │
p8 ├────────────────────┤ p9
   │                    │
   │        p10         │
p7 └─────────┬──────────┘ p6
             │
             │
             │
  ───────────┴───────────
p12         p11           p13
```

## 配置项

| 属性       | 描述                                                                          | 类型                      | 默认值                 | 必选 |
| ---------- | ----------------------------------------------------------------------------- | ------------------------- | ---------------------- | ---- |
| encode     | 配置 `box` 标记的视觉通道，包括 `x`、`y`、`color`、`shape` 等                 | [encode](#encode)         | -                      | ✓    |
| coordinate | 配置 `box` 标记的坐标系，坐标系会执行一系列点转换，从而改变标记的空间展示形式 | [coordinate](#coordinate) | `{type: 'cartesian' }` |      |
| style      | 配置 `box` 标记的图形样式                                                     | [style](#style)           | -                      |      |

### encode

配置 `box` 标记的视觉通道。

| 属性   | 描述                                                                                                                  | 类型                          | 默认值  | 必选 |
| ------ | --------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------- | ---- |
| x      | 绑定 `box` 标记的 `x` 属性通道，通常是分类字段                                                                        | [encode](/manual/core/encode) | -       | ✓    |
| y      | 绑定 `box` 标记的 `y` 属性通道，通常是包含 5 个统计值的数组，按顺序为：最小值、下四分位数、中位数、上四分位数、最大值 | [encode](/manual/core/encode) | -       | ✓    |
| color  | 绑定 `box` 标记的 `color` 属性通道，用于区分不同类别的箱线图                                                          | [encode](/manual/core/encode) | -       |      |
| shape  | 绑定 `box` 标记的 `shape` 属性通道，可选值为 `box`、`violin`                                                          | `'box'` \| `'violin'`         | `'box'` |      |
| series | 绑定 `box` 标记的 `series` 属性通道，用于分组显示箱线图                                                               | [encode](/manual/core/encode) | -       |      |

### coordinate

`box` 标记在不同坐标系下的展示有所差别。根据坐标系或坐标系转换的不同，可以绘制不同形式的箱线图。

| 坐标系或坐标系转换 | 坐标系配置              | 图表         |
| ------------------ | ----------------------- | ------------ |
| 直角坐标系         | `{ type: 'cartesian' }` | 标准箱线图   |
| 极坐标系           | `{ type: 'polar' }`     | 极坐标箱线图 |

### style

配置 `box` 标记的图形样式。`box` 标记支持两种形状：`box`（默认）和 `violin`。

| 属性          | 描述                                                                   | 类型                                                                    | 默认值      | 必选 |
| ------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------- | ---- |
| fill          | 图形的填充色                                                           | `string` \| `(datum, index, data, column) => string`                    | -           |      |
| fillOpacity   | 图形的填充透明度                                                       | `number` \| `(datum, index, data, column) => number`                    | `0.95`      |      |
| stroke        | 图形的描边颜色                                                         | `string` \| `(datum, index, data, column) => string`                    | `#000`      |      |
| strokeOpacity | 描边透明度                                                             | `number` \| `(datum, index, data, column) => number`                    | -           |      |
| lineWidth     | 图形描边的宽度                                                         | `number` \| `(datum, index, data, column) => number`                    | `1`         |      |
| lineDash      | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离 | `[number,number]` \| `(datum, index, data, column) => [number, number]` | -           |      |
| opacity       | 图形的整体透明度                                                       | `number` \| `(datum, index, data, column) => number`                    | -           |      |
| shadowColor   | 图形阴影颜色                                                           | `string` \| `(datum, index, data, column) => string`                    | -           |      |
| shadowBlur    | 图形阴影的高斯模糊系数                                                 | `number` \| `(datum, index, data, column) => number`                    | -           |      |
| shadowOffsetX | 设置阴影距图形的水平距离                                               | `number` \| `(datum, index, data, column) => number`                    | -           |      |
| shadowOffsetY | 设置阴影距图形的垂直距离                                               | `number` \| `(datum, index, data, column) => number`                    | -           |      |
| cursor        | 鼠标样式。同 CSS 的鼠标样式                                            | `string` \| `(datum, index, data, column) => string`                    | `'default'` |      |

## 示例

### 基础箱线图

使用 `box` 标记可以创建基础箱线图，需要提供包含 5 个统计值的数组数据。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'box',
  data: [
    { x: 'Oceania', y: [1, 9, 16, 22, 24] },
    { x: 'East Europe', y: [1, 5, 8, 12, 16] },
    { x: 'Australia', y: [1, 8, 12, 19, 26] },
    { x: 'South America', y: [2, 8, 12, 21, 28] },
    { x: 'North Africa', y: [1, 8, 14, 18, 24] },
    { x: 'North America', y: [3, 10, 17, 28, 30] },
    { x: 'West Europe', y: [1, 7, 10, 17, 22] },
    { x: 'West Africa', y: [1, 6, 8, 13, 16] },
  ],
  encode: {
    x: 'x',
    y: 'y',
    color: 'x',
  },
  scale: {
    x: { paddingInner: 0.6, paddingOuter: 0.3 },
    y: { zero: true },
  },
  legend: false,
  style: {
    stroke: 'black',
  },
});

chart.render();
```

### 分组箱线图

使用 `series` 通道可以创建分组箱线图，对不同类别的数据进行比较。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'box',
  data: [
    { Species: 'I. setosa', type: 'SepalLength', bin: [4.3, 4.8, 5, 5.2, 5.8] },
    {
      Species: 'I. setosa',
      type: 'SepalWidth',
      bin: [2.3, 3.2, 3.4, 3.7, 4.4],
    },
    { Species: 'I. setosa', type: 'PetalLength', bin: [1, 1.4, 1.5, 1.6, 1.9] },
    {
      Species: 'I. setosa',
      type: 'PetalWidth',
      bin: [0.1, 0.2, 0.2, 0.3, 0.6],
    },
    {
      Species: 'I. versicolor',
      type: 'SepalLength',
      bin: [4.9, 5.6, 5.9, 6.3, 7],
    },
    {
      Species: 'I. versicolor',
      type: 'SepalWidth',
      bin: [2, 2.5, 2.8, 3, 3.4],
    },
    {
      Species: 'I. versicolor',
      type: 'PetalLength',
      bin: [3, 4, 4.35, 4.6, 5.1],
    },
    {
      Species: 'I. versicolor',
      type: 'PetalWidth',
      bin: [1, 1.2, 1.3, 1.5, 1.8],
    },
    {
      Species: 'I. virginica',
      type: 'SepalLength',
      bin: [4.9, 6.2, 6.5, 6.9, 7.9],
    },
    {
      Species: 'I. virginica',
      type: 'SepalWidth',
      bin: [2.2, 2.8, 3, 3.2, 3.8],
    },
    {
      Species: 'I. virginica',
      type: 'PetalLength',
      bin: [4.5, 5.1, 5.55, 5.9, 6.9],
    },
    {
      Species: 'I. virginica',
      type: 'PetalWidth',
      bin: [1.4, 1.8, 2, 2.3, 2.5],
    },
  ],
  encode: {
    x: 'type',
    y: 'bin',
    series: 'Species',
    color: 'Species',
  },
  scale: {
    x: { paddingInner: 0.2, paddingOuter: 0.1 },
    y: { zero: true },
    series: { paddingInner: 0.3, paddingOuter: 0.1 },
  },
  style: {
    stroke: 'black',
  },
  tooltip: [
    { name: 'min', channel: 'y' },
    { name: 'q1', channel: 'y1' },
    { name: 'q2', channel: 'y2' },
    { name: 'q3', channel: 'y3' },
    { name: 'max', channel: 'y4' },
  ],
});

chart.render();
```

### 极坐标箱线图

通过配置极坐标系，可以创建极坐标下的箱线图。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'box',
  data: [
    { x: 'Oceania', y: [1, 9, 16, 22, 24] },
    { x: 'East Europe', y: [1, 5, 8, 12, 16] },
    { x: 'Australia', y: [1, 8, 12, 19, 26] },
    { x: 'South America', y: [2, 8, 12, 21, 28] },
    { x: 'North Africa', y: [1, 8, 14, 18, 24] },
    { x: 'North America', y: [3, 10, 17, 28, 30] },
    { x: 'West Europe', y: [1, 7, 10, 17, 22] },
    { x: 'West Africa', y: [1, 6, 8, 13, 16] },
  ],
  coordinate: {
    type: 'polar',
    innerRadius: 0.2,
  },
  encode: {
    x: 'x',
    y: 'y',
    color: 'x',
  },
  scale: {
    x: { paddingInner: 0.6, paddingOuter: 0.3 },
    y: { zero: true },
  },
  style: {
    stroke: 'black',
  },
  axis: {
    y: { tickCount: 5 },
  },
  tooltip: [
    { name: 'min', channel: 'y' },
    { name: 'q1', channel: 'y1' },
    { name: 'q2', channel: 'y2' },
    { name: 'q3', channel: 'y3' },
    { name: 'max', channel: 'y4' },
  ],
  legend: false,
});

chart.render();
```

## 常见问题

### 如何在前端进行数据分布情况的分析？

G2 提供了多种方式来进行数据分布的分析：

- 使用 `transform` 进行数据转换，可以实现对数据进行统计分析，计算出最小值、下四分位数、中位数、上四分位数、最大值等统计值：

```js
chart.box().data({
  type: 'connector',
  value: [
    /* your detail data */
  ],
  callback: (data) => {
    // 在这里对数据进行统计分析
    // 可以使用自定义算法或第三方库
    return data;
  },
});
```

- 使用社区提供的[算法库](https://github.com/antvis/data-set/blob/master/src/transform/aggregate.ts)进行数据统计。

- 直接使用 [`boxplot`](/manual/core/mark/boxplot) 标记，它是一个高阶标记，自带数据分组和统计聚合功能，更适合前端数据的探索和分析：

```js
chart.boxplot().data(data).encode('x', 'category').encode('y', 'value');
```
