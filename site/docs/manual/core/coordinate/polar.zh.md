---
title: polar
order: 2
---

## 概述

`polar`（极坐标系）是一种非笛卡尔坐标系，通过将直角坐标系的点 (x, y) 转换为极坐标系下的点 (r, θ)，其中 r 是半径，θ 是角度。极坐标系在可视化中常用于展示周期性数据、相对关系或分布差异。

### 坐标系特点

- 圆心作为极点（原点），从圆心向外辐射的直线为极轴

- 数据点位置由到圆心的距离（半径 r）和与极轴的夹角（角度 θ）共同决定

- 适合展示循环、周期性、分布型数据

### 适用场景

- 玫瑰图：展示分类数据的数值差异

- 雷达图：多维度数据比较

- 极坐标散点图：展示角度与半径的相关性

- 需要环形布局的各类可视化

## 配置项

| 属性        | 描述                                       | 类型                    | 默认值              | 必选 |
| ----------- | ------------------------------------------ | ----------------------- | ------------------- | ---- |
| type        | 坐标系类型，设置为 'polar'                 | `string`                | 无                  | ✓    |
| startAngle  | 极坐标系起始弧度                           | `number`                | `-Math.PI / 2`      |      |
| endAngle    | 极坐标系结束弧度                           | `number`                | `(Math.PI * 3) / 2` |      |
| innerRadius | 极坐标内半径，表示为画布高度的百分比 (0-1) | `number`                | `0`                 |      |
| outerRadius | 极坐标外半径，表示为画布高度的百分比 (0-1) | `number`                | `1`                 |      |
| transform   | 坐标系变换配置                             | `CoordinateTransform[]` | `undefined`         |      |

> 复杂类型说明：
>
> - `startAngle` 和 `endAngle` 以弧度为单位，默认值分别为 -π/2 和 3π/2，构成一个完整圆（2π）。
> - `innerRadius` 和 `outerRadius` 的值域为 [0-1]，分别表示极坐标内半径和外半径相对于画布高度的比例。
> - `transform` 用于配置额外的坐标系变换。

## 示例

### 开始使用

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  width: 720,
  height: 720,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
  },
  encode: { x: 'year', y: 'people' },
  transform: [{ type: 'groupX', y: 'sum' }],
  scale: { y: { type: 'sqrt' } },
  coordinate: { type: 'polar' },
  animate: { enter: { type: 'waveIn' } },
  axis: {
    y: {
      titleSpacing: 28,
      labelFormatter: '~s',
      tickCount: 5,
      tickFilter: (d, i) => i !== 0,
      direction: 'right',
    },
  },
  tooltip: { items: [{ channel: 'y', valueFormatter: '~s' }] },
});

chart.render();
```

### 雷达图

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  data: [
    { item: 'Design', type: 'a', score: 70 },
    { item: 'Design', type: 'b', score: 30 },
    { item: 'Development', type: 'a', score: 60 },
    { item: 'Development', type: 'b', score: 70 },
    { item: 'Marketing', type: 'a', score: 50 },
    { item: 'Marketing', type: 'b', score: 60 },
    { item: 'Users', type: 'a', score: 40 },
    { item: 'Users', type: 'b', score: 50 },
    { item: 'Test', type: 'a', score: 60 },
    { item: 'Test', type: 'b', score: 70 },
    { item: 'Language', type: 'a', score: 70 },
    { item: 'Language', type: 'b', score: 50 },
    { item: 'Technology', type: 'a', score: 50 },
    { item: 'Technology', type: 'b', score: 40 },
    { item: 'Support', type: 'a', score: 30 },
    { item: 'Support', type: 'b', score: 40 },
    { item: 'Sales', type: 'a', score: 60 },
    { item: 'Sales', type: 'b', score: 40 },
    { item: 'UX', type: 'a', score: 50 },
    { item: 'UX', type: 'b', score: 60 },
  ],
  scale: { x: { padding: 0.5, align: 0 }, y: { tickCount: 5 } },
  coordinate: { type: 'polar' },
  axis: { x: { grid: true }, y: { zIndex: 1, title: false } },
  interaction: { tooltip: { crosshairsLineDash: [4, 4] } },
  children: [
    {
      type: 'area',
      encode: { x: 'item', y: 'score', color: 'type', shape: 'smooth' },
      scale: { y: { domainMax: 80 } },
      style: { fillOpacity: 0.5 },
    },
    {
      type: 'line',
      encode: { x: 'item', y: 'score', color: 'type', shape: 'smooth' },
      style: { lineWidth: 2 },
    },
  ],
});

chart.render();
```

### 向量场图

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'vector',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antfincdn/F5VcgnqRku/wind.json',
  },
  encode: {
    x: 'longitude',
    y: 'latitude',
    rotate: ({ u, v }) => (Math.atan2(v, u) * 180) / Math.PI,
    size: ({ u, v }) => Math.hypot(v, u),
    color: ({ u, v }) => Math.hypot(v, u),
  },
  scale: { size: { range: [6, 20] }, color: { palette: 'viridis' } },
  coordinate: { type: 'polar' },
  axis: { x: { grid: false }, y: { grid: false } },
  legend: false,
  tooltip: { title: { channel: 'color', valueFormatter: '.1f' } },
});

chart.render();
```
