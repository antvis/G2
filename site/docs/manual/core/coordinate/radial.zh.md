---
title: radial
order: 3
---

## 概述

径向坐标系（Radial）是一种特殊的极坐标系，它通过将极坐标系进行转置操作得到。在径向坐标系中，角度被映射到 Y 轴，半径被映射到 X 轴，这与传统极坐标系的映射方式相反。

径向坐标系常用于绘制以下类型的图表：

- 玉珏图
- 径向条形图
- 径向堆叠条形图
- Apple 活动图等特殊可视化

这类图表通常使用 `interval` 标记来展示数据，能够有效地展示数据的分布和比较情况。

### 坐标系原理

径向坐标系是通过对极坐标系进行以下变换得到的：

1. 转置（transpose）：交换 X 轴和 Y 轴的映射
2. 平移（translate）和反射（reflect）：调整坐标系的位置和方向

这种变换使得数据在视觉上呈现出不同于传统条形图的放射状效果，特别适合展示周期性数据或需要强调中心辐射效果的场景。

### 开始使用

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  coordinate: {
    type: 'radial',
    innerRadius: 0.1,
    endAngle: Math.PI,
  },
  data: [
    { question: '问题 1', percent: 0.21 },
    { question: '问题 2', percent: 0.4 },
    { question: '问题 3', percent: 0.49 },
    { question: '问题 4', percent: 0.52 },
    { question: '问题 5', percent: 0.53 },
    { question: '问题 6', percent: 0.84 },
    { question: '问题 7', percent: 1.0 },
    { question: '问题 8', percent: 1.2 },
  ],
  encode: {
    x: 'question',
    y: 'percent',
    color: 'percent',
  },
  style: {
    stroke: 'white',
  },
  scale: {
    color: {
      range: '#BAE7FF-#1890FF-#0050B3',
    },
  },
  legend: {
    color: {
      length: 400,
      position: 'bottom',
      layout: { justifyContent: 'center' },
    },
  },
  axis: {
    y: {
      tickFilter: (d, i) => i !== 0,
    },
  },
});

chart.render();
```

## 使用场景

径向坐标系适合以下场景：

1. **需要强调中心辐射效果**：当数据具有从中心向外辐射的概念时，如资源分配、影响力等
2. **展示周期性数据**：当数据具有循环特性，但不适合使用传统极坐标系时
3. **需要节省空间**：相比于传统条形图，径向条形图在保持数据可读性的同时可以更紧凑地展示
4. **美观需求**：当需要创建视觉上更具吸引力的可视化时

### 注意事项

1. **数据量**：径向坐标系适合展示中等数量的类别（约 5-15 个），过多或过少的类别可能不适合
2. **标签放置**：在径向坐标系中，标签的放置需要特别注意，可以使用 `label` 配置中的 `autoRotate` 和 `rotateToAlignArc` 属性
3. **半径设置**：适当设置 `innerRadius` 可以提高可读性，特别是当数据值差异较小时

## 配置项

径向坐标系主要负责将数据空间的位置映射到画布空间。而其他视觉属性，例如颜色、大小等，仍然通过相应的比例尺进行映射。关于比例尺的详细信息，请参考[比例尺](/manual/core/scale/overview)文档。

| 参数        | 说明                   | 类型   | 默认值               | 必选 |
| ----------- | ---------------------- | ------ | -------------------- | ---- |
| startAngle  | 极坐标系起始弧度       | number | `-Math.PI / 2`       |      |
| endAngle    | 极坐标系结束弧度       | number | `(Math.PI \* 3) / 2` |      |
| innerRadius | 极坐标内半径，范围 0-1 | number | `0`                  |      |
| outerRadius | 极坐标半径，范围 0-1   | number | `1`                  |      |

### 角度单位说明

在径向坐标系中，角度使用弧度（radians）作为单位，而非角度（degrees）。以下是常用角度的弧度对照：

| 角度 | 弧度 | 位置               |
| ---- | ---- | ------------------ |
| 0°   | 0    | 3 点钟方向         |
| 90°  | π/2  | 12 点钟方向        |
| 180° | π    | 9 点钟方向         |
| 270° | 3π/2 | 6 点钟方向         |
| 360° | 2π   | 3 点钟方向（一周） |

可以使用 `Math.PI` 来表示 π，例如 `Math.PI / 2` 表示 90°。

## 常见用例

### 1. 玉珏图（径向条形图）

玉珏图是径向坐标系最常见的应用之一，它将传统条形图在径向坐标系下展示，形成放射状的视觉效果。

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.coordinate({ type: 'radial', innerRadius: 0.1, endAngle: Math.PI });

chart
  .interval()
  .data([
    { category: '类别 A', value: 40 },
    { category: '类别 B', value: 60 },
    { category: '类别 C', value: 80 },
  ])
  .encode('x', 'category')
  .encode('y', 'value')
  .encode('color', 'value');

chart.render();
```

### 2. 径向堆叠条形图

通过在径向坐标系中应用堆叠变换，可以创建径向堆叠条形图，适合展示具有层次关系的数据。

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.coordinate({ type: 'radial' });

chart
  .interval()
  .data([
    { category: '类别 A', type: '类型1', value: 40 },
    { category: '类别 A', type: '类型2', value: 20 },
    { category: '类别 B', type: '类型1', value: 30 },
    { category: '类别 B', type: '类型2', value: 50 },
    { category: '类别 C', type: '类型1', value: 25 },
    { category: '类别 C', type: '类型2', value: 35 },
  ])
  .encode('x', 'category')
  .encode('y', 'value')
  .encode('color', 'type')
  .transform({ type: 'stackY' });

chart.render();
```

### 3. Apple 活动图

通过设置适当的内半径和样式，可以创建类似 Apple Watch 活动环的可视化效果。

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const data = [
  { name: 'activity1', percent: 0.6, color: '#1ad5de' },
  { name: 'activity2', percent: 0.2, color: '#a0ff03' },
  { name: 'activity3', percent: 0.3, color: '#e90b3a' },
];

chart.coordinate({ type: 'radial', innerRadius: 0.2 });

// 背景环
chart
  .interval()
  .data(data)
  .encode('x', 'name')
  .encode('y', 1)
  .style('fillOpacity', 0.25);

// 数据环
chart
  .interval()
  .data(data)
  .encode('x', 'name')
  .encode('y', 'percent')
  .encode('color', 'color')
  .scale('color', { type: 'identity' })
  .style('radius', 26);

chart.render();
```

## 完整示例

以下是一个带有标签和动画效果的径向条形图完整示例：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  coordinate: {
    type: 'radial',
    innerRadius: 0.1,
    endAngle: Math.PI,
  },
  data: [
    { category: '类别 A', value: 21 },
    { category: '类别 B', value: 40 },
    { category: '类别 C', value: 49 },
    { category: '类别 D', value: 52 },
    { category: '类别 E', value: 53 },
    { category: '类别 F', value: 84 },
    { category: '类别 G', value: 100 },
    { category: '类别 H', value: 120 },
  ],
  encode: {
    x: 'category',
    y: 'value',
    color: 'value',
  },
  style: {
    stroke: 'white',
  },
  scale: {
    color: {
      range: '#BAE7FF-#1890FF-#0050B3',
    },
  },
  axis: {
    y: {
      tickFilter: (d, i) => i !== 0,
    },
  },
  legend: {
    color: {
      length: 400,
      position: 'bottom',
      layout: { justifyContent: 'center' },
    },
  },
  label: {
    text: 'value',
    position: 'outside',
    autoRotate: true,
    rotateToAlignArc: true,
    dx: 4,
  },
  animate: {
    enter: {
      type: 'waveIn',
      duration: 800,
    },
  },
});

chart.render();
```

这个示例展示了如何创建一个带有标签和动画效果的径向条形图，包括以下特性：

1. 设置径向坐标系，内半径为 0.1，结束角度为 π（半圆）
2. 使用连续色板展示数据值的大小
3. 添加外部标签，并使用 `autoRotate` 和 `rotateToAlignArc` 使标签沿着弧线排列
4. 添加波浪进入动画效果
5. 自定义 Y 轴刻度，过滤掉第一个刻度（通常是 0）
6. 在底部居中放置图例

通过这些配置，可以创建出既美观又信息丰富的径向条形图。
