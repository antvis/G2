---
title: 小提琴图
order: 2
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*QXpmQaR71yYAAAAAAAAAAAAADmJ7AQ/original'
category: ['distribution']
similar: ['boxplot', 'histogram', 'density']
---

<img alt="violin" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*QXpmQaR71yYAAAAAAAAAAAAADmJ7AQ/original" width=600/>

## 小提琴图的简介

小提琴图（Violin Plot）是一种结合了[箱形图](/charts/boxplot)和[核密度估计](/manual/core/data/kde)的数据可视化图表，用于展示数据的分布形状和统计摘要。小提琴图的形状类似小提琴，因此得名。

小提琴图通过密度曲线展示数据在不同数值区间的分布密度，同时叠加箱形图的统计信息（如中位数、四分位数等），能够更直观地反映数据的分布特征，包括多峰性、偏态以及异常值情况。

相比传统的箱形图，小提琴图提供了更丰富的分布信息，特别适合用于比较多个组别的数据分布特征，是探索性数据分析和统计可视化的重要工具。

**英文名**：Violin Plot

## 小提琴图的构成

### 基础小提琴图

<img alt="basic-violin" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*QXpmQaR71yYAAAAAAAAAAAAADmJ7AQ/original" width=600 />

| 图表类型         | 小提琴图                                                                                                          |
| ---------------- | ----------------------------------------------------------------------------------------------------------------- |
| 适合的数据       | 一个分类数据字段、一个连续数据字段                                                                                |
| 功能             | 展示数据分布的形状、密度和统计摘要，比较不同分组的分布特征                                                        |
| 数据与图形的映射 | 分类数据字段映射到横轴位置<br>连续数据字段通过 KDE 转换为密度分布<br>统计值映射到箱形图元素<br>密度映射到图形宽度 |
| 适合的数据条数   | 每个分组建议至少有 20-30 个数据点                                                                                 |

小提琴图的主要组成部分包括：

- **密度轮廓**：通过核密度估计（KDE）生成的平滑曲线，展示数据在不同数值处的密度分布
- **箱形图**：叠加在密度轮廓上的传统箱形图，显示中位数、四分位数等统计信息
- **中位线**：标示数据的中位数位置
- **四分位数线**：标示上下四分位数的位置
- **异常值**：超出正常范围的数据点

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/species.json',
  },
  children: [
    {
      type: 'density',
      data: {
        transform: [
          {
            type: 'kde',
            field: 'y',
            groupBy: ['x', 'species'],
          },
        ],
      },
      encode: {
        x: 'x',
        y: 'y',
        series: 'species',
        color: 'species',
        size: 'size',
      },
      tooltip: false,
    },
    {
      type: 'boxplot',
      encode: {
        x: 'x',
        y: 'y',
        series: 'species',
        color: 'species',
        shape: 'violin',
      },
      style: {
        opacity: 0.5,
        strokeOpacity: 0.5,
        point: false,
      },
    },
  ],
});

chart.render();
```

---

### 核密度图

<img alt="density" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*-EcIQ7sKufsAAAAAAAAAAAAADmJ7AQ/original" width=600/>

| 图表类型         | 核密度图                                                                                  |
| ---------------- | ----------------------------------------------------------------------------------------- |
| 适合的数据       | 一个分类数据字段、一个连续数据字段                                                        |
| 功能             | 展示数据的概率密度分布，识别数据的分布模式                                                |
| 数据与图形的映射 | 分类数据字段映射到横轴位置<br>连续数据字段通过 KDE 转换为密度分布<br>密度值映射到区域大小 |
| 适合的数据条数   | 建议至少有 50+ 个数据点                                                                   |

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'density',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/species.json',
    transform: [
      {
        type: 'kde',
        field: 'y',
        groupBy: ['x'],
        size: 20,
      },
    ],
  },
  encode: {
    x: 'x',
    y: 'y',
    color: 'x',
    size: 'size',
  },
  tooltip: false,
});

chart.render();
```

---

### 极坐标小提琴图

<img alt="polar-violin" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*r027Q4SUC3kAAAAAAAAAAAAADmJ7AQ/original" width=600/>

| 图表类型         | 极坐标小提琴图                                                                                |
| ---------------- | --------------------------------------------------------------------------------------------- |
| 适合的数据       | 循环性或周期性数据：时间序列、角度数据等                                                      |
| 功能             | 在极坐标系中展示数据分布，适合周期性或循环性数据的可视化                                      |
| 数据与图形的映射 | 分类数据字段映射到角度<br>连续数据字段映射到径向距离<br>密度信息通过 KDE 转换后映射到区域形状 |
| 适合的场景       | 时间周期分析、方向性数据分析                                                                  |

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'view',
  coordinate: { type: 'polar' },
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/species.json',
  },
  children: [
    {
      type: 'density',
      data: {
        transform: [
          {
            type: 'kde',
            field: 'y',
            groupBy: ['x', 'species'],
          },
        ],
      },
      encode: {
        x: 'x',
        y: 'y',
        series: 'species',
        color: 'species',
        size: 'size',
      },
      tooltip: false,
    },
    {
      type: 'boxplot',
      encode: {
        x: 'x',
        y: 'y',
        series: 'species',
        color: 'species',
        shape: 'violin',
      },
      style: {
        opacity: 0.5,
        strokeOpacity: 0.5,
        point: false,
      },
    },
  ],
});

chart.render();
```

## 小提琴图的应用场景

### 适合的场景

例子 1: **多组数据分布比较**

当需要比较多个组别或类别的数据分布特征时，小提琴图能够同时展示每个组的分布形状、集中趋势和离散程度，便于发现组间差异。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/species.json',
  },
  children: [
    {
      type: 'density',
      data: {
        transform: [
          {
            type: 'kde',
            field: 'y',
            groupBy: ['x', 'species'],
          },
        ],
      },
      encode: {
        x: 'x',
        y: 'y',
        series: 'species',
        color: 'species',
        size: 'size',
      },
      tooltip: false,
    },
    {
      type: 'boxplot',
      encode: {
        x: 'x',
        y: 'y',
        series: 'species',
        color: 'species',
        shape: 'violin',
      },
      style: {
        opacity: 0.5,
        strokeOpacity: 0.5,
        point: false,
      },
    },
  ],
  axis: {
    x: { title: '分组' },
    y: { title: '数值分布' },
  },
});

chart.render();
```

例子 2: **探索数据分布模式**

用于识别数据的分布特征，如是否为正态分布、是否存在多峰性、偏态程度等，比箱形图提供更丰富的分布信息。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'density',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/species.json',
    transform: [
      {
        type: 'kde',
        field: 'y',
        groupBy: ['x'],
        size: 30,
      },
    ],
  },
  encode: {
    x: 'x',
    y: 'y',
    color: 'x',
    size: 'size',
  },
  style: {
    fillOpacity: 0.6,
    stroke: '#FFF',
    lineWidth: 1,
  },
  axis: {
    x: { title: '类别' },
    y: { title: '密度分布' },
  },
  tooltip: {
    title: (d) => `类别: ${d.x}`,
    items: [
      { field: 'y', name: '密度值' },
      { field: 'size', name: '概率' },
    ],
  },
});

chart.render();
```

例子 3: **异常值检测**

结合密度分布和箱形图的统计信息，可以更准确地识别和理解异常值的存在及其在整体分布中的位置。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/morley.json',
  },
  children: [
    {
      type: 'density',
      data: {
        transform: [
          {
            type: 'kde',
            field: 'Speed',
            groupBy: ['Expt'],
          },
        ],
      },
      encode: {
        x: 'Expt',
        y: 'Speed',
        size: 'size',
        color: 'Expt',
      },
      style: {
        fillOpacity: 0.4,
      },
      tooltip: false,
    },
    {
      type: 'boxplot',
      encode: {
        x: 'Expt',
        y: 'Speed',
        color: 'Expt',
        shape: 'violin',
      },
      style: {
        opacity: 0.8,
        point: { fill: 'red', size: 3 },
      },
    },
  ],
  axis: {
    x: { title: '实验组' },
    y: { title: '光速测量值' },
  },
});

chart.render();
```

### 不适合的场景

❌ **数据量过少**：每个分组的数据点少于 20 个时，核密度估计可能不够准确，建议使用箱形图或散点图。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

// 模拟少量数据
const smallData = [
  { group: 'A', value: 12 },
  { group: 'A', value: 15 },
  { group: 'A', value: 13 },
  { group: 'B', value: 18 },
  { group: 'B', value: 16 },
  { group: 'B', value: 20 },
  { group: 'C', value: 25 },
  { group: 'C', value: 22 },
  { group: 'C', value: 24 },
];

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'boxplot',
  data: smallData,
  encode: {
    x: 'group',
    y: 'value',
    color: 'group',
  },
  style: {
    boxFill: 'lightblue',
    boxFillOpacity: 0.6,
    point: { fill: 'red', size: 4 },
  },
  axis: {
    x: { title: '分组' },
    y: { title: '数值' },
  },
  title: '数据量少时建议使用箱形图',
});

chart.render();
```

❌ **离散型数据**：对于类别型或计数型数据，小提琴图的连续密度分布没有实际意义，建议使用柱状图或条形图。

下面的例子展示了离散数据的正确可视化方式：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

// 模拟离散计数数据
const discreteData = [
  { category: '产品A', count: 45 },
  { category: '产品B', count: 67 },
  { category: '产品C', count: 33 },
  { category: '产品D', count: 52 },
  { category: '产品E', count: 28 },
];

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  data: discreteData,
  encode: {
    x: 'category',
    y: 'count',
    color: 'category',
  },
  style: {
    fillOpacity: 0.8,
  },
  axis: {
    x: { title: '产品类别' },
    y: { title: '销售数量' },
  },
  title: '离散数据建议使用柱状图',
});

chart.render();
```

❌ **单一数据系列**：如果只有一个数据系列且不需要分组比较，直方图或密度图可能更简洁有效。

❌ **实时数据监控**：小提琴图需要完整的数据集进行密度估计，不适合流式或实时更新的数据场景。

## 小提琴图与其他图表的对比

### 小提琴图和[箱形图](/charts/boxplot)

- 小提琴图展示完整的数据分布形状和密度，提供更丰富的分布信息
- 箱形图主要展示统计摘要（五数概括），更简洁但信息有限
- 小提琴图适合探索数据分布的细节特征，箱形图适合快速比较多个分组

### 小提琴图和[直方图](/charts/histogram)

- 小提琴图通过平滑的密度曲线展示分布，支持多组对比
- 直方图通过分箱统计展示频数分布，适合单一数据集的分布分析
- 小提琴图更适合连续分布的可视化，直方图适合离散化的分布统计

## 相似图表

<code src="./demos/list-card.tsx"></code>

## 分类

<code src="./demos/list-category.tsx"></code>
