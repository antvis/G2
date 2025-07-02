---
title: band
order: 2
---

## 概述

band 比例尺是一种特殊的分类比例尺，它将离散的定义域（如类别、名称等）映射到连续的数值范围，并为每个类别分配相等宽度的区间（band）。与普通的 [ordinal](/manual/core/scale/ordinal) 比例尺不同，band 比例尺不仅关注点的位置，还关注每个类别占据的区间宽度。

band 比例尺的主要特点：

- 将离散数据（如类别）映射到连续区间
- 为每个类别分配等宽的区间（band）
- 支持设置类别之间的内部间距（paddingInner）和外部间距（paddingOuter）
- 常用于柱状图、条形图等需要表示类别数据的可视化中

在 G2 中，band 比例尺是柱状图（interval 标记）的默认 x 轴比例尺，它能够自动处理类别数据的映射和布局。

## 配置项

| 属性         | 描述                                                                 | 类型                                                   | 默认值      | 必选 |
| ------------ | -------------------------------------------------------------------- | ------------------------------------------------------ | ----------- | ---- |
| domain       | 设置定义域数组，即输入数据的可能值                                   | `number[] \| string[] \| Date[]`                       | `[]`        |      |
| range        | 设置数据映射的值域范围，即输出的范围                                 | `number[]` \| `string[]`                               | `[0, 1]`    |      |
| unknown      | 对于 `undefined`， `NaN`，`null` 空值，返回的数据                    | `any`                                                  | `undefined` |      |
| round        | 输出值是否进行四舍五入                                               | `boolean`                                              | `false`     |      |
| paddingInner | 设置类别之间的内部间距，在 [0, 1] 范围内，值越大间距越大             | `number`                                               | `0`         |      |
| paddingOuter | 设置两端的外部间距，在 [0, 1] 范围内，值越大间距越大                 | `number`                                               | `0`         |      |
| padding      | 同时设置 `paddingInner` 和 `paddingOuter` 的快捷方式                 | `number`                                               | `0`         |      |
| align        | 对齐方式，在 [0, 1] 范围内，0 表示左对齐，0.5 表示居中，1 表示右对齐 | `number`                                               | `0.5`       |      |
| compare      | 对定义域进行映射前的排序函数                                         | `(a: string or number, b: string or number) => number` | `undefined` |      |
| flex         | 设置各类别的宽度分配比例                                             | `number[]`                                             | `[]`        |      |

### band 比例尺的布局原理

band 比例尺将连续的值域范围（range）划分为等宽的区间，每个区间对应定义域中的一个离散值。下图展示了 band 比例尺的布局原理：

```plain
|<------------------------------------------- range ------------------------------------------->|
|             |                   |             |                   |             |             |
|<--step*PO-->|<----bandWidth---->|<--step*PI-->|<----bandWidth---->|<--step*PI-->|<--step*PO-->|
|             | ***************** |             | ***************** |             |             |
|             | ******* A ******* |             | ******* B ******* |             |             |
|             | ***************** |             | ***************** |             |             |
|             |<--------------step------------->|                                               |
|-----------------------------------------------------------------------------------------------|
```

其中：

- **range**: 整个比例尺的值域范围
- **bandWidth**: 每个类别占据的宽度
- **step**: 相邻类别中心点之间的距离
- **step\*PI (paddingInner)**: 类别之间的内部间距
- **step\*PO (paddingOuter)**: 两端的外部间距

## 带宽概念详解

### 什么是带宽(bandWidth)

带宽(bandWidth)是 band 比例尺中每个类别实际占据的宽度，它决定了柱状图中每个柱子的宽度、条形图中每个条的高度等。带宽是 band 比例尺区别于其他比例尺的核心概念。

### 带宽的计算公式

带宽的计算涉及多个参数，具体公式如下：

```plain
step = rangeLength / (domain.length - paddingInner + paddingOuter * 2)
bandWidth = step * (1 - paddingInner)
```

其中：

- `rangeLength`: 值域的长度（range[1] - range[0]）
- `domain.length`: 定义域中类别的数量
- `paddingInner`: 内部间距比例 [0, 1]
- `paddingOuter`: 外部间距比例 [0, 1]

### 参数对带宽的影响

#### 1. paddingInner 的影响

`paddingInner` 控制类别之间的间距，直接影响带宽大小：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const data = [
  { category: 'A', value: 100 },
  { category: 'B', value: 80 },
  { category: 'C', value: 120 },
  { category: 'D', value: 90 },
];

// 创建三个图表展示不同 paddingInner 的效果
const charts = [
  { paddingInner: 0, title: 'paddingInner: 0 (带宽最大)' },
  { paddingInner: 0.3, title: 'paddingInner: 0.3 (中等带宽)' },
  { paddingInner: 0.8, title: 'paddingInner: 0.8 (带宽最小)' },
];

charts.forEach((config, index) => {
  const container = document.createElement('div');
  container.style.width = '300px';
  container.style.height = '200px';
  container.style.display = 'inline-block';
  container.style.margin = '10px';
  document.getElementById('container').appendChild(container);

  const chart = new Chart({
    container,
    autoFit: true,
  });

  chart.options({
    type: 'interval',
    data,
    encode: {
      x: 'category',
      y: 'value',
      color: 'category',
    },
    scale: {
      x: {
        type: 'band',
        paddingInner: config.paddingInner,
        paddingOuter: 0.1,
      },
    },
    axis: {
      x: { title: config.title },
      y: { title: null },
    },
  });

  chart.render();
});
```

#### 2. paddingOuter 的影响

`paddingOuter` 控制两端的间距，间接影响带宽：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const data = [
  { category: 'A', value: 100 },
  { category: 'B', value: 80 },
  { category: 'C', value: 120 },
  { category: 'D', value: 90 },
];

const charts = [
  { paddingOuter: 0, title: 'paddingOuter: 0' },
  { paddingOuter: 0.3, title: 'paddingOuter: 0.3' },
  { paddingOuter: 0.6, title: 'paddingOuter: 0.6' },
];

charts.forEach((config, index) => {
  const container = document.createElement('div');
  container.style.width = '300px';
  container.style.height = '200px';
  container.style.display = 'inline-block';
  container.style.margin = '10px';
  document.getElementById('container').appendChild(container);

  const chart = new Chart({
    container,
    autoFit: true,
  });

  chart.options({
    type: 'interval',
    data,
    encode: {
      x: 'category',
      y: 'value',
      color: 'category',
    },
    scale: {
      x: {
        type: 'band',
        paddingInner: 0.2,
        paddingOuter: config.paddingOuter,
      },
    },
    axis: {
      x: { title: config.title },
      y: { title: null },
    },
  });

  chart.render();
});
```

#### 3. 类别数量的影响

类别数量越多，每个类别的带宽越小：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const datasets = [
  {
    data: [
      { category: 'A', value: 100 },
      { category: 'B', value: 80 },
    ],
    title: '2个类别',
  },
  {
    data: [
      { category: 'A', value: 100 },
      { category: 'B', value: 80 },
      { category: 'C', value: 120 },
      { category: 'D', value: 90 },
    ],
    title: '4个类别',
  },
  {
    data: [
      { category: 'A', value: 100 },
      { category: 'B', value: 80 },
      { category: 'C', value: 120 },
      { category: 'D', value: 90 },
      { category: 'E', value: 110 },
      { category: 'F', value: 95 },
    ],
    title: '6个类别',
  },
];

datasets.forEach((dataset, index) => {
  const container = document.createElement('div');
  container.style.width = '300px';
  container.style.height = '200px';
  container.style.display = 'inline-block';
  container.style.margin = '10px';
  document.getElementById('container').appendChild(container);

  const chart = new Chart({
    container,
    autoFit: true,
  });

  chart.options({
    type: 'interval',
    data: dataset.data,
    encode: {
      x: 'category',
      y: 'value',
      color: 'category',
    },
    scale: {
      x: {
        type: 'band',
        padding: 0.3, // 固定间距比例
      },
    },
    axis: {
      x: { title: dataset.title },
      y: { title: null },
    },
  });

  chart.render();
});
```

### 如何获取带宽值

在实际开发中，有时需要获取计算后的带宽值，可以通过以下方式：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { category: 'A', value: 100 },
    { category: 'B', value: 80 },
    { category: 'C', value: 120 },
    { category: 'D', value: 90 },
  ],
  encode: {
    x: 'category',
    y: 'value',
    color: 'category',
  },
  scale: {
    x: {
      type: 'band',
      padding: 0.3,
    },
  },
});

chart.render().then(() => {
  // 获取 x 轴的比例尺
  const xScale = chart.getScale().x;

  // 获取带宽值 - 使用无参数调用
  const bandWidth = xScale.getBandWidth?.() ?? 0;
  console.log('当前带宽值:', bandWidth);

  // 也可以获取特定类别的带宽（如果需要）
  const categoryABandWidth = xScale.getBandWidth?.(xScale.invert('A')) ?? 0;
  console.log('类别A的带宽值:', categoryABandWidth);

  // 计算步长值（相邻类别中心点的距离）
  const domain = xScale.getOptions()?.domain || [];
  const range = xScale.getOptions()?.range || [0, 1];
  const rangeLength = range[1] - range[0];
  const paddingInner = xScale.getOptions()?.paddingInner || 0;
  const paddingOuter = xScale.getOptions()?.paddingOuter || 0;
  const step = rangeLength / (domain.length - paddingInner + paddingOuter * 2);
  console.log('当前步长值:', step);

  // 在图表上显示带宽信息
  const container = chart.getContainer();
  const info = document.createElement('div');
  info.style.position = 'absolute';
  info.style.top = '10px';
  info.style.left = '10px';
  info.style.background = 'rgba(0,0,0,0.8)';
  info.style.color = 'white';
  info.style.padding = '5px 10px';
  info.style.borderRadius = '4px';
  info.style.fontSize = '12px';
  info.innerHTML = `带宽: ${bandWidth.toFixed(2)}<br>步长: ${step.toFixed(2)}`;
  container.appendChild(info);
});
```

### 带宽在不同图表类型中的应用

#### 1. 柱状图中的带宽

在柱状图中，带宽直接决定柱子的宽度：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { month: '1月', sales: 1200 },
    { month: '2月', sales: 1100 },
    { month: '3月', sales: 1350 },
    { month: '4月', sales: 1280 },
  ],
  encode: {
    x: 'month',
    y: 'sales',
    color: 'month',
  },
  scale: {
    x: {
      type: 'band',
      padding: 0.2, // 较小的间距，柱子较宽
    },
  },
  style: {
    stroke: '#fff',
    strokeWidth: 2,
  },
});

chart.render();
```

#### 2. 条形图中的带宽

在条形图中，带宽决定条的高度：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  coordinate: { transform: [{ type: 'transpose' }] },
  data: [
    { department: '销售部', count: 45 },
    { department: '市场部', count: 32 },
    { department: '技术部', count: 28 },
    { department: '人事部', count: 15 },
  ],
  encode: {
    x: 'department',
    y: 'count',
    color: 'department',
  },
  scale: {
    x: {
      type: 'band',
      padding: 0.4, // 条之间有较大间距
    },
  },
});

chart.render();
```

#### 3. 分组柱状图中的带宽

在分组柱状图中，整体的带宽会被子组的数量平分：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { quarter: 'Q1', type: '实际', value: 120 },
    { quarter: 'Q1', type: '预算', value: 100 },
    { quarter: 'Q2', type: '实际', value: 140 },
    { quarter: 'Q2', type: '预算', value: 130 },
    { quarter: 'Q3', type: '实际', value: 160 },
    { quarter: 'Q3', type: '预算', value: 150 },
  ],
  encode: {
    x: 'quarter',
    y: 'value',
    color: 'type',
  },
  transform: [{ type: 'dodgeX' }],
  scale: {
    x: {
      type: 'band',
      padding: 0.3, // 每个季度的整体带宽
    },
  },
});

chart.render();
```

### 带宽优化建议

#### 1. 根据数据量调整间距

- **少量数据（< 5 个类别）**：可以使用较小的 padding（0.1-0.3），让柱子更宽更突出
- **中等数据（5-10 个类别）**：建议使用中等 padding（0.3-0.5），平衡可读性和视觉效果
- **大量数据（> 10 个类别）**：可以使用较大的 padding（0.5-0.8），或考虑分页展示

#### 2. 考虑图表容器大小

```js | ob { inject: true }
import { Chart } from '@antv/g2';

// 模拟不同容器宽度下的带宽效果
const widths = [300, 600, 900];
const data = Array.from({ length: 8 }, (_, i) => ({
  category: `类别${String.fromCharCode(65 + i)}`,
  value: Math.random() * 100 + 50,
}));

widths.forEach((width, index) => {
  const container = document.createElement('div');
  container.style.width = `${width}px`;
  container.style.height = '200px';
  container.style.display = 'inline-block';
  container.style.margin = '10px';
  container.style.border = '1px solid #ccc';
  document.getElementById('container').appendChild(container);

  const chart = new Chart({
    container,
    width,
    height: 200,
  });

  chart.options({
    type: 'interval',
    data,
    encode: {
      x: 'category',
      y: 'value',
      color: 'category',
    },
    scale: {
      x: {
        type: 'band',
        padding: 0.2, // 固定间距比例
      },
    },
    axis: {
      x: { title: `容器宽度: ${width}px` },
      y: { title: null },
    },
  });

  chart.render();
});
```

#### 3. 响应式带宽设计

对于需要适配不同屏幕尺寸的图表，可以动态调整 padding：

```js
// 根据容器宽度动态调整 padding
function getResponsivePadding(containerWidth, dataLength) {
  const baseWidth = containerWidth / dataLength;

  if (baseWidth > 100) {
    return 0.6; // 容器很宽时，增加间距
  } else if (baseWidth > 50) {
    return 0.4; // 中等宽度
  } else {
    return 0.2; // 容器较窄时，减少间距
  }
}
```

通过深入理解带宽概念，你可以更好地控制图表的视觉效果，创建出既美观又实用的数据可视化作品。

## 使用示例

### 基础柱状图

band 比例尺最常见的应用是柱状图，通过设置 `padding` 可以控制柱子之间的间距：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
  scale: {
    x: {
      type: 'band',
      padding: 0.5, // 设置柱子之间的间距
    },
  },
});

chart.render();
```

### 分组柱状图

在分组柱状图中，band 比例尺与 dodgeX 转换一起使用，可以创建分组效果：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { month: '1月', value: 86.5, type: '降水量' },
    { month: '2月', value: 86.5, type: '降水量' },
    { month: '3月', value: 86.5, type: '降水量' },
    { month: '4月', value: 86.5, type: '降水量' },
    { month: '5月', value: 86.5, type: '降水量' },
    { month: '6月', value: 86.5, type: '降水量' },
    { month: '1月', value: 30.5, type: '蒸发量' },
    { month: '2月', value: 30.5, type: '蒸发量' },
    { month: '3月', value: 30.5, type: '蒸发量' },
    { month: '4月', value: 30.5, type: '蒸发量' },
    { month: '5月', value: 30.5, type: '蒸发量' },
    { month: '6月', value: 30.5, type: '蒸发量' },
  ],
  encode: {
    x: 'month',
    y: 'value',
    color: 'type',
  },
  transform: [{ type: 'dodgeX' }],
  scale: {
    x: {
      type: 'band',
      padding: 0.2, // 设置组间距
    },
  },
});

chart.render();
```

### 自定义柱宽

使用 `flex` 属性可以为不同类别设置不同的宽度比例：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { country: 'USA', value: 12394, gdp: 21.4 },
    { country: 'China', value: 9608, gdp: 14.7 },
    { country: 'Japan', value: 4731, gdp: 5.0 },
    { country: 'Germany', value: 3861, gdp: 4.2 },
    { country: 'UK', value: 2678, gdp: 2.9 },
  ],
  encode: {
    x: 'country',
    y: 'value',
    color: 'country',
  },
  scale: {
    x: {
      type: 'band',
      padding: 0.4,
      flex: [2.14, 1.47, 0.5, 0.42, 0.29], // 根据 GDP 设置不同宽度
    },
  },
});

chart.render();
```

### 条形图（横向柱状图）

通过坐标系转置，可以创建条形图，band 比例尺同样适用：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  coordinate: { transform: [{ type: 'transpose' }] },
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
  scale: {
    x: {
      type: 'band',
      padding: 0.5,
    },
  },
});

chart.render();
```

### 堆叠柱状图

使用 `stackY` 转换可以创建堆叠柱状图，展示各部分的累积效果：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { quarter: 'Q1', department: '销售部', value: 120 },
    { quarter: 'Q1', department: '市场部', value: 100 },
    { quarter: 'Q1', department: '技术部', value: 80 },
    { quarter: 'Q2', department: '销售部', value: 140 },
    { quarter: 'Q2', department: '市场部', value: 110 },
    { quarter: 'Q2', department: '技术部', value: 90 },
    { quarter: 'Q3', department: '销售部', value: 160 },
    { quarter: 'Q3', department: '市场部', value: 95 },
    { quarter: 'Q3', department: '技术部', value: 120 },
    { quarter: 'Q4', department: '销售部', value: 180 },
    { quarter: 'Q4', department: '市场部', value: 100 },
    { quarter: 'Q4', department: '技术部', value: 130 },
  ],
  encode: {
    x: 'quarter',
    y: 'value',
    color: 'department',
  },
  transform: [{ type: 'stackY' }],
  scale: {
    x: {
      type: 'band',
      padding: 0.3,
    },
  },
});

chart.render();
```

### 不等宽柱状图（使用 flexX 转换）

根据指定字段的值自动调整柱子宽度，适合表示权重或比例关系：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { region: '华东', sales: 8500, population: 2.4 },
    { region: '华南', sales: 6200, population: 1.8 },
    { region: '华北', sales: 7800, population: 2.1 },
    { region: '西南', sales: 4500, population: 1.2 },
    { region: '东北', sales: 3200, population: 0.9 },
    { region: '西北', sales: 2800, population: 0.7 },
  ],
  encode: {
    x: 'region',
    y: 'sales',
    color: 'region',
  },
  transform: [{ type: 'flexX', field: 'population' }], // 根据人口数据调整柱宽
  scale: {
    x: {
      type: 'band',
      padding: 0.2,
    },
  },
});

chart.render();
```

### 时间序列柱状图

处理时间数据时，band 比例尺能很好地处理时间间隔的可视化：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { month: '2024-01', sales: 1200 },
    { month: '2024-02', sales: 1100 },
    { month: '2024-03', sales: 1350 },
    { month: '2024-04', sales: 1280 },
    { month: '2024-05', sales: 1400 },
    { month: '2024-06', sales: 1520 },
    { month: '2024-07', sales: 1680 },
    { month: '2024-08', sales: 1590 },
    { month: '2024-09', sales: 1450 },
    { month: '2024-10', sales: 1380 },
    { month: '2024-11', sales: 1250 },
    { month: '2024-12', sales: 1600 },
  ],
  encode: {
    x: 'month',
    y: 'sales',
    color: (d) => (d.sales > 1500 ? 'high' : d.sales > 1300 ? 'medium' : 'low'),
  },
  scale: {
    x: {
      type: 'band',
      padding: 0.1,
    },
    color: {
      domain: ['low', 'medium', 'high'],
      range: ['#faad14', '#1890ff', '#52c41a'],
    },
  },
});

chart.render();
```

### 多级分类柱状图

展示具有层次结构的分类数据：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { category: '服装-男装', subcategory: '衬衫', value: 850 },
    { category: '服装-男装', subcategory: '裤子', value: 750 },
    { category: '服装-男装', subcategory: '外套', value: 650 },
    { category: '服装-女装', subcategory: '连衣裙', value: 950 },
    { category: '服装-女装', subcategory: '上衣', value: 800 },
    { category: '服装-女装', subcategory: '裙子', value: 700 },
    { category: '电子-手机', subcategory: 'iPhone', value: 1200 },
    { category: '电子-手机', subcategory: '华为', value: 1100 },
    { category: '电子-手机', subcategory: '小米', value: 900 },
    { category: '电子-电脑', subcategory: '笔记本', value: 1500 },
    { category: '电子-电脑', subcategory: '台式机', value: 800 },
    { category: '电子-电脑', subcategory: '平板', value: 600 },
  ],
  encode: {
    x: 'category',
    y: 'value',
    color: 'subcategory',
  },
  transform: [{ type: 'dodgeX' }],
  scale: {
    x: {
      type: 'band',
      padding: 0.4, // 较大的间距区分不同主类别
      paddingInner: 0.3, // 内部间距
      paddingOuter: 0.1, // 外部间距
    },
  },
});

chart.render();
```

### 对比分析柱状图

使用 paddingInner 和 paddingOuter 精确控制间距，适合对比分析：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { product: '产品A', current: 320, target: 400 },
    { product: '产品B', current: 280, target: 350 },
    { product: '产品C', current: 410, target: 450 },
    { product: '产品D', current: 180, target: 250 },
    { product: '产品E', current: 350, target: 380 },
  ].flatMap((d) => [
    { product: d.product, type: '当前销量', value: d.current },
    { product: d.product, type: '目标销量', value: d.target },
  ]),
  encode: {
    x: 'product',
    y: 'value',
    color: 'type',
  },
  transform: [{ type: 'dodgeX' }],
  scale: {
    x: {
      type: 'band',
      paddingInner: 0.2, // 组内间距较小
      paddingOuter: 0.3, // 组间间距较大
    },
    color: {
      domain: ['当前销量', '目标销量'],
      range: ['#1890ff', '#52c41a'],
    },
  },
});

chart.render();
```

### 动态柱宽柱状图

结合 compare 函数对数据进行排序，并使用不同的柱宽策略：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const data = [
  { brand: '苹果', market_share: 23.4, revenue: 365 },
  { brand: '三星', market_share: 20.1, revenue: 220 },
  { brand: '华为', market_share: 15.8, revenue: 180 },
  { brand: '小米', market_share: 12.3, revenue: 120 },
  { brand: 'OPPO', market_share: 8.9, revenue: 95 },
  { brand: 'vivo', market_share: 7.2, revenue: 85 },
  { brand: '其他', market_share: 12.3, revenue: 150 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: {
    x: 'brand',
    y: 'market_share',
    color: 'brand',
  },
  scale: {
    x: {
      type: 'band',
      padding: 0.2,
      compare: (a, b) => {
        // 按市场份额降序排列
        const dataA = data.find((d) => d.brand === a);
        const dataB = data.find((d) => d.brand === b);
        return (dataB?.market_share || 0) - (dataA?.market_share || 0);
      },
      flex: [2.34, 2.01, 1.58, 1.23, 0.89, 0.72, 1.23], // 根据市场份额设置宽度
    },
  },
});

chart.render();
```

## 高级应用场景

### 瀑布图（使用 band 比例尺）

展示数值的逐步累积变化过程：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

// 瀑布图数据处理
const rawData = [
  { name: '期初余额', value: 1000, type: 'start' },
  { name: '收入增加', value: 500, type: 'positive' },
  { name: '成本支出', value: -200, type: 'negative' },
  { name: '税费支出', value: -150, type: 'negative' },
  { name: '其他收入', value: 100, type: 'positive' },
  { name: '期末余额', value: 1250, type: 'end' },
];

// 计算累积值
let cumulative = 0;
const data = rawData.map((d, i) => {
  if (d.type === 'start' || d.type === 'end') {
    const result = { ...d, start: 0, end: d.value };
    cumulative = d.value;
    return result;
  } else {
    const start = cumulative;
    cumulative += d.value;
    return { ...d, start, end: cumulative };
  }
});

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: data.flatMap((d) => [
    { name: d.name, value: d.end - d.start, position: d.start, type: d.type },
  ]),
  encode: {
    x: 'name',
    y: ['position', (d) => d.position + d.value],
    color: 'type',
  },
  scale: {
    x: {
      type: 'band',
      padding: 0.4,
    },
    color: {
      domain: ['start', 'positive', 'negative', 'end'],
      range: ['#722ed1', '#52c41a', '#ff4d4f', '#1890ff'],
    },
  },
});

chart.render();
```

### 分面柱状图

使用 band 比例尺结合分面布局展示多维数据：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'facetRect',
  data: [
    { region: '北区', quarter: 'Q1', product: '产品A', sales: 120 },
    { region: '北区', quarter: 'Q1', product: '产品B', sales: 100 },
    { region: '北区', quarter: 'Q1', product: '产品C', sales: 80 },
    { region: '北区', quarter: 'Q2', product: '产品A', sales: 140 },
    { region: '北区', quarter: 'Q2', product: '产品B', sales: 110 },
    { region: '北区', quarter: 'Q2', product: '产品C', sales: 90 },
    { region: '南区', quarter: 'Q1', product: '产品A', sales: 150 },
    { region: '南区', quarter: 'Q1', product: '产品B', sales: 130 },
    { region: '南区', quarter: 'Q1', product: '产品C', sales: 110 },
    { region: '南区', quarter: 'Q2', product: '产品A', sales: 170 },
    { region: '南区', quarter: 'Q2', product: '产品B', sales: 140 },
    { region: '南区', quarter: 'Q2', product: '产品C', sales: 120 },
  ],
  encode: { x: 'region', y: 'quarter' },
  children: [
    {
      type: 'interval',
      encode: {
        x: 'product',
        y: 'sales',
        color: 'product',
      },
      scale: {
        x: {
          type: 'band',
          padding: 0.3,
        },
      },
    },
  ],
});

chart.render();
```

## 常见问题

### 如何调整柱子的宽度？

可以通过设置 `padding` 属性来调整柱子之间的间距，从而间接调整柱子的宽度。`padding` 值越大，柱子越窄；值越小，柱子越宽。

```js
chart.interval().encode('x', 'type').encode('y', 'sale').scale('x', {
  type: 'band',
  padding: 0.5, // 值范围在 [0, 1] 之间
});
```

### band 比例尺与 point 比例尺的区别是什么？

- **band 比例尺**：为每个类别分配一个区间（带宽），适合柱状图等需要占据宽度的图表
- **point 比例尺**：为每个类别分配一个点，相当于 `bandWidth = 0` 的 band 比例尺，适合散点图等只需要点位置的图表

### 如何设置不同宽度的柱子？

有两种方法：

1. 使用 `flex` 属性为不同类别设置不同的宽度比例
2. 使用 `flexX` 转换，根据指定字段的值自动设置柱宽

```js
// 方法1：使用 flex 属性
chart
  .interval()
  .encode('x', 'country')
  .encode('y', 'value')
  .scale('x', {
    type: 'band',
    flex: [2, 1, 3, 1.5], // 手动设置宽度比例
  });

// 方法2：使用 flexX 转换
chart
  .interval()
  .encode('x', 'country')
  .encode('y', 'value')
  .transform({ type: 'flexX', field: 'gdp' }); // 根据 gdp 字段自动设置宽度
```
