---
title: parallel
order: 2
---

## 概述

平行坐标系（Parallel）是一种用于可视化多维数据的坐标系，它将多个变量映射到平行的坐标轴上，每条数据记录表示为连接各个坐标轴上对应值的折线。平行坐标系特别适合用于分析多个变量之间的关系和模式，以及识别数据集中的异常值和聚类。

在 G2 中，平行坐标系通过将笛卡尔直角坐标系变换为平行坐标系来实现，每个数据维度对应一个垂直的坐标轴。

### 坐标系原理

平行坐标系的基本原理是：

1. 将多个数据维度映射到平行排列的坐标轴上
2. 每条数据记录表示为穿过所有坐标轴的折线
3. 线在每个坐标轴上的位置对应该维度的数据值

平行坐标系有两种常见的布局方式：

- 垂直布局：坐标轴垂直排列（默认）
- 水平布局：通过 transpose 变换将坐标轴水平排列

### 开始使用

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

// 定义维度数组
const dimensions = [
  'Cylinders',
  'Displacement',
  'Weight_in_lbs',
  'Horsepower',
  'Acceleration',
  'Miles_per_Gallon',
  'Year',
];

chart.options({
  type: 'line',
  width: 720,
  paddingLeft: 60,
  coordinate: { type: 'parallel' },
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/96cd81b5-54a4-4fe8-b778-502b2114df58.json',
    callback: (d) => Object.assign(d, { year: new Date(d.year) }),
    transform: [
      {
        type: 'filter',
        callback: (d) => d.Horsepower != null && d.Miles_per_Gallon != null,
      },
    ],
  },
  encode: {
    position: dimensions,
    color: 'Origin',
    size: 1.01,
  },
  style: {
    strokeOpacity: 0.3,
  },
  scale: {
    position: { nice: true },
    position1: { nice: true },
    position2: { nice: true },
    position3: { nice: true },
    position4: { nice: true },
    position5: { nice: true },
  },
  axis: {
    position: { zIndex: 1 },
    position1: { zIndex: 1 },
    position2: { zIndex: 1 },
    position3: { zIndex: 1 },
    position4: { zIndex: 1 },
    position5: { zIndex: 1 },
  },
});

chart.render();
```

## 使用场景

平行坐标系特别适合以下场景：

1. **多维数据分析**：当需要同时分析多个变量之间的关系时，平行坐标系可以在一个视图中展示所有维度
2. **模式识别**：通过观察线条的走向，可以识别数据中的模式和趋势
3. **异常值检测**：异常数据通常会表现为与大多数线条路径明显不同的线条
4. **聚类分析**：相似的数据记录会形成相似的线条路径，便于识别数据聚类

### 注意事项

1. **数据量**：当数据记录过多时，线条会重叠导致视觉混乱，建议使用透明度或交互式筛选
2. **轴的顺序**：坐标轴的排列顺序会影响可视化效果，相关性强的变量放在相邻位置通常更有利于分析
3. **轴的缩放**：不同维度的数据范围可能差异很大，需要适当设置比例尺以便更好地比较

## 配置项

平行坐标系的配置项相对简单，主要通过 `coordinate` 属性进行设置：

| 属性      | 说明                           | 类型        | 默认值 | 必选 |
| --------- | ------------------------------ | ----------- | ------ | ---- |
| transform | 坐标系变换，可用于实现水平布局 | Transform[] | []     |      |

### 坐标系变换

平行坐标系支持以下坐标系变换：

| 变换类型  | 说明                     | 示例                                     |
| --------- | ------------------------ | ---------------------------------------- |
| transpose | 将垂直布局转换为水平布局 | `{ transform: [{ type: 'transpose' }] }` |

## 常见用例

### 1. 垂直平行坐标系

垂直平行坐标系是最常见的平行坐标系布局，坐标轴垂直排列。

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  coordinate: { type: 'parallel' },
  data: [
    { dim1: 10, dim2: 30, dim3: 20, dim4: 60, category: 'A' },
    { dim1: 20, dim2: 20, dim3: 30, dim4: 40, category: 'B' },
    { dim1: 30, dim2: 10, dim3: 40, dim4: 20, category: 'C' },
  ],
  encode: {
    position: ['dim1', 'dim2', 'dim3', 'dim4'],
    color: 'category',
  },
  style: {
    lineWidth: 2,
    strokeOpacity: 0.7,
  },
  scale: {
    color: {
      palette: 'spectral',
    },
  },
  axis: {
    position: { zIndex: 1 },
    position1: { zIndex: 1 },
    position2: { zIndex: 1 },
    position3: { zIndex: 1 },
  },
});

chart.render();
```

### 2. 水平平行坐标系

通过添加 transpose 变换，可以将坐标轴水平排列，创建水平平行坐标系。

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  coordinate: {
    type: 'parallel',
    transform: [{ type: 'transpose' }],
  },
  data: [
    { dim1: 10, dim2: 30, dim3: 20, dim4: 60, category: 'A' },
    { dim1: 20, dim2: 20, dim3: 30, dim4: 40, category: 'B' },
    { dim1: 30, dim2: 10, dim3: 40, dim4: 20, category: 'C' },
  ],
  encode: {
    position: ['dim1', 'dim2', 'dim3', 'dim4'],
    color: 'category',
  },
  style: {
    lineWidth: 2,
    strokeOpacity: 0.7,
  },
  scale: {
    color: {
      palette: 'spectral',
    },
  },
  axis: {
    position: { zIndex: 1 },
    position1: { zIndex: 1 },
    position2: { zIndex: 1 },
    position3: { zIndex: 1 },
  },
});

chart.render();
```

### 3. 带交互的平行坐标系

平行坐标系通常需要交互来增强分析能力，例如添加轴的高亮和筛选功能。

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

// 定义维度数组
const dimensions = [
  'economy (mpg)',
  'cylinders',
  'displacement (cc)',
  'power (hp)',
  'weight (lb)',
];

chart.options({
  type: 'line',
  coordinate: { type: 'parallel' },
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/cars3.json',
  },
  encode: {
    position: dimensions,
    color: 'cylinders',
  },
  style: {
    lineWidth: 1.5,
    strokeOpacity: 0.4,
  },
  scale: {
    color: {
      palette: 'brBG',
    },
  },
  axis: {
    position: { zIndex: 1 },
    position1: { zIndex: 1 },
    position2: { zIndex: 1 },
    position3: { zIndex: 1 },
    position4: { zIndex: 1 },
  },
  interaction: {
    tooltip: { series: false },
    brushAxisHighlight: true,
  },
  state: {
    active: { lineWidth: 3 },
    inactive: { stroke: 'grey', opacity: 0.3 },
  },
});

chart.render();
```

## 完整示例

以下是一个完整的平行坐标系示例，展示了如何使用平行坐标系分析多维数据：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

// 定义维度数组
const dimensions = [
  'Cylinders',
  'Displacement',
  'Weight_in_lbs',
  'Horsepower',
  'Acceleration',
  'Miles_per_Gallon',
  'Year',
];

chart.options({
  type: 'line',
  width: 800,
  height: 500,
  padding: [40, 100, 60, 100], // 增加四周的内边距，给标签留出更多空间
  coordinate: { type: 'parallel' },
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/96cd81b5-54a4-4fe8-b778-502b2114df58.json',
    callback: (d) => Object.assign(d, { year: new Date(d.year) }),
    transform: [
      {
        type: 'filter',
        callback: (d) => d.Horsepower != null && d.Miles_per_Gallon != null,
      },
    ],
  },
  encode: {
    position: dimensions,
    color: 'Origin',
    size: 1.01,
  },
  style: {
    strokeOpacity: 0.3,
  },
  scale: {
    // 为所有position设置相同的配置
    ...Object.fromEntries(
      dimensions.map((_, i) => [`position${i > 0 ? i : ''}`, { nice: true }]),
    ),
    // 为年份设置时间格式
    Year: {
      type: 'time',
      tickCount: 6,
      mask: 'YYYY',
    },
  },
  axis: {
    // 定义基础轴配置
    ...(() => {
      // 创建基础配置对象
      const baseAxisConfig = {
        zIndex: 1,
        line: true,
        labelStroke: '#fff',
        labelLineWidth: 5,
        labelFontSize: 12,
        labelStrokeLineJoin: 'round',
        titleStroke: '#fff',
        titleFontSize: 14,
        titleLineWidth: 5,
        titleStrokeLineJoin: 'round',
        lineStroke: 'black',
        tickStroke: 'black',
        lineLineWidth: 1,
        grid: null, // 移除网格线
        tickCount: 5, // 减少刻度数量
        labelSpacing: 8, // 增加标签与轴的距离
      };

      // 为每个维度创建配置
      return Object.fromEntries(
        dimensions.map((dim, i) => {
          const key = `position${i > 0 ? i : ''}`;
          // 为最后一个维度（Year）添加特殊配置
          if (i === dimensions.length - 1) {
            return [
              key,
              {
                ...baseAxisConfig,
                labelFormatter: (text) => text.slice(0, 4), // 只显示年份
              },
            ];
          }
          return [key, baseAxisConfig];
        }),
      );
    })(),
  },
  legend: {
    color: {
      position: 'bottom', // 将图例放在底部
      layout: 'horizontal',
    },
  },
  interaction: {
    tooltip: { series: false },
    brushAxisHighlight: {
      maskFill: '#d8d0c0',
      maskOpacity: 0.3,
    },
  },
  state: {
    active: { lineWidth: 3, strokeOpacity: 1 },
    inactive: { stroke: '#ccc', opacity: 0.3 },
  },
});

chart.render();
```

这个示例展示了如何创建一个功能完整的平行坐标系图表，包括以下特性：

1. 使用多个数据维度创建平行坐标轴
2. 根据数据值设置线条颜色
3. 自定义坐标轴样式，提高可读性
4. 添加交互功能，支持轴的高亮和筛选
5. 设置活动和非活动状态样式，增强交互体验
6. 添加图例，帮助理解颜色编码

通过这些配置，可以创建出既美观又实用的平行坐标系可视化，有效地分析多维数据之间的关系。
