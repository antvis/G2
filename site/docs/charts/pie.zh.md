---
title: 饼图
order: 5
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*q_VWSqumTu4AAAAAAAAAAAAADmJ7AQ/original'
category: ['part-to-whole']
similar: ['donut', 'rose']
---

<img alt="pie" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*q_VWSqumTu4AAAAAAAAAAAAADmJ7AQ/original" width=600/>

## 饼图的简介

饼图是一种圆形统计图表，将数据表示为整个圆的各个扇形，用于显示各个类别在总体中的占比关系。每个扇形的角度大小与其所代表的数值成正比，整个饼图代表数据的总和。

饼图特别适合展示分类数据的占比关系，可以直观地展示各个部分在整体中的相对重要性。通过不同颜色的扇形区分各个类别，使得比较各类别的占比变得简单直观。

当类别较少（通常不超过5-7个）且需要强调各部分与整体关系时，饼图是一个很好的选择。对于类别较多的情况，可以考虑将小占比的类别合并为"其他"类别。

**英文名**：Pie Chart, Pie Graph

## 饼图的构成

### 基础饼图

<img alt="basic-pie" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*q_VWSqumTu4AAAAAAAAAAAAADmJ7AQ/original" width=600 />

| 图表类型         | 基础饼图                                                                          |
| ---------------- | --------------------------------------------------------------------------------- |
| 适合的数据       | 分类数据：一个分类数据字段、一个连续数据字段                                      |
| 功能             | 展示各个类别在总体中的占比关系                                                    |
| 数据与图形的映射 | 分类字段映射到扇形的颜色和标签<br>数值字段映射到扇形的角度大小<br>整个圆表示数据总和 |
| 适合的场景       | 类别数量较少（5-7个以内）的占比展示                                               |

---

### 环形图

<img alt="donut-chart" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*LbyiSpiAFooAAAAAAAAAAAAADmJ7AQ/original" width=600/>

| 图表类型         | 环形图                                                                              |
| ---------------- | ----------------------------------------------------------------------------------- |
| 适合的数据       | 分类数据：一个分类数据字段、一个连续数据字段                                        |
| 功能             | 展示各个类别的占比关系，同时在中心区域可以显示总计或关键信息                        |
| 数据与图形的映射 | 分类字段映射到扇形的颜色和标签<br>数值字段映射到扇形的角度大小<br>中心区域可用于显示额外信息 |
| 适合的场景       | 需要在中心显示总数或关键指标的占比展示                                              |

## 饼图的应用场景

### 适合的场景

例子 1: **展示市场份额分布**

下图展示了不同浏览器的市场份额占比，清晰地显示了各浏览器在市场中的相对地位。

| browser（浏览器） | value（市场份额） |
| ----------------- | ----------------- |
| Chrome            | 61.04             |
| Safari            | 15.12             |
| Edge              | 10.52             |
| Firefox           | 7.19              |
| Samsung Internet  | 2.98              |
| Opera             | 3.15              |

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { browser: 'Chrome', value: 61.04 },
    { browser: 'Safari', value: 15.12 },
    { browser: 'Edge', value: 10.52 },
    { browser: 'Firefox', value: 7.19 },
    { browser: 'Samsung Internet', value: 2.98 },
    { browser: 'Opera', value: 3.15 },
  ],
  encode: {
    y: 'value',
    color: 'browser',
  },
  transform: [{ type: 'stackY' }],
  coordinate: { type: 'theta' },
  legend: {
    color: {
      position: 'right',
      rowPadding: 5,
    },
  },
});

chart.render();
```

**说明**：
- `browser` 字段映射到颜色，区分不同浏览器
- `value` 字段映射到角度大小，表示市场份额
- 使用 `coordinate: { type: 'theta' }` 将柱状图转换为饼图
- 使用 `transform: [{ type: 'stackY' }]` 堆叠数据

例子 2: **展示预算分配情况**

饼图非常适合展示预算、支出等资源分配情况，让人一目了然地看到各项目的资源占比。

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { category: '研发', value: 35 },
    { category: '营销', value: 25 },
    { category: '销售', value: 20 },
    { category: '运营', value: 15 },
    { category: '其他', value: 5 },
  ],
  encode: {
    y: 'value',
    color: 'category',
  },
  transform: [{ type: 'stackY' }],
  coordinate: { type: 'theta', outerRadius: 0.8 },
  scale: {
    color: {
      palette: 'category10',
    },
  },
  legend: {
    color: {
      position: 'right',
      rowPadding: 5,
    },
  },
  labels: [
    {
      text: (d) => `${d.category}: ${d.value}%`,
      position: 'outside',
      connector: true,
    },
  ],
});

chart.render();
```

**说明**：
- 使用外部标签显示类别名称和百分比
- `connector: true` 添加标签连接线
- `outerRadius: 0.8` 调整饼图大小，为标签留出空间

例子 3: **环形图展示多层数据**

环形图可以在中心区域显示总计信息，或者展示多层嵌套的分类数据。

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { type: '移动端', value: 45 },
    { type: '桌面端', value: 35 },
    { type: '平板端', value: 20 },
  ],
  encode: {
    y: 'value',
    color: 'type',
  },
  transform: [{ type: 'stackY' }],
  coordinate: { 
    type: 'theta', 
    innerRadius: 0.4,
    outerRadius: 0.8,
  },
  scale: {
    color: {
      palette: 'spectral',
    },
  },
  legend: {
    color: {
      position: 'bottom',
      layout: { justifyContent: 'center' },
    },
  },
  labels: [
    {
      text: (d) => `${d.value}%`,
      position: 'inside',
      fill: 'white',
      fontSize: 12,
      fontWeight: 'bold',
    },
  ],
});

chart.render();
```

**说明**：
- `innerRadius: 0.4` 创建环形图的内圆
- 内部标签显示百分比数值
- 图例放置在底部，水平居中排列

### 不适合的场景

例子 1: **类别过多时不适合使用饼图**

当类别数量超过7个时，饼图会变得难以阅读和比较。此时应该考虑使用柱状图或条形图。

例子 2: **需要精确比较数值时不合适**

饼图主要用于展示占比关系，不适合精确的数值比较。当需要精确比较各类别的具体数值时，柱状图会是更好的选择。

例子 3: **数据变化趋势展示**

饼图是静态的占比展示，不适合展示数据随时间的变化趋势。此类需求应该使用折线图或面积图。

## 饼图的扩展

### 玫瑰图（南丁格尔图）

玫瑰图使用扇形的半径而不是角度来表示数值大小，适合展示数值差异较大的分类数据。

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { month: 'Jan', value: 120 },
    { month: 'Feb', value: 200 },
    { month: 'Mar', value: 150 },
    { month: 'Apr', value: 80 },
    { month: 'May', value: 70 },
    { month: 'Jun', value: 110 },
    { month: 'Jul', value: 130 },
    { month: 'Aug', value: 80 },
    { month: 'Sep', value: 140 },
    { month: 'Oct', value: 160 },
    { month: 'Nov', value: 180 },
    { month: 'Dec', value: 190 },
  ],
  encode: {
    x: 'month',
    y: 'value',
    color: 'month',
  },
  coordinate: { type: 'polar' },
  scale: {
    x: { padding: 0 },
    color: {
      palette: 'rainbow',
    },
  },
  axis: {
    x: { grid: true },
    y: { tickCount: 5, grid: true },
  },
  legend: false,
});

chart.render();
```

**说明**：
- 使用 `coordinate: { type: 'polar' }` 创建极坐标系
- 数值映射到半径，月份映射到角度
- 适合展示周期性数据或数值差异较大的情况

### 嵌套饼图

嵌套饼图可以同时展示两个层级的分类数据，内外圈分别表示不同的分类维度。

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'view',
  autoFit: true,
  data: [
    { category: '电子产品', subcategory: '手机', value: 35 },
    { category: '电子产品', subcategory: '电脑', value: 25 },
    { category: '电子产品', subcategory: '平板', value: 15 },
    { category: '服装', subcategory: '男装', value: 10 },
    { category: '服装', subcategory: '女装', value: 8 },
    { category: '图书', subcategory: '小说', value: 4 },
    { category: '图书', subcategory: '教育', value: 3 },
  ],
  children: [
    {
      type: 'interval',
      encode: {
        y: 'value',
        color: 'category',
      },
      transform: [{ type: 'stackY' }],
      coordinate: { 
        type: 'theta', 
        innerRadius: 0.3,
        outerRadius: 0.6,
      },
      legend: false,
    },
    {
      type: 'interval',
      encode: {
        y: 'value',
        color: 'subcategory',
      },
      transform: [{ type: 'stackY' }],
      coordinate: { 
        type: 'theta', 
        innerRadius: 0.6,
        outerRadius: 0.9,
      },
      scale: {
        color: {
          palette: 'category20',
        },
      },
      legend: {
        color: {
          position: 'right',
          rowPadding: 3,
        },
      },
    },
  ],
});

chart.render();
```

**说明**：
- 内圈显示主要类别，外圈显示子类别
- 使用不同的 `innerRadius` 和 `outerRadius` 创建两个同心环
- 适合展示有层级关系的分类数据

## 饼图与其他图表的对比

### 饼图和[柱状图](/charts/bar)

- 饼图强调各部分与整体的关系，适合展示占比
- 柱状图更适合精确的数值比较，不强调与总数的关系
- 当类别较少且需要展示占比时选择饼图，需要精确比较数值时选择柱状图

### 饼图、[环形图](/en/charts/donut)和[玫瑰图](/en/charts/rose)

- 饼图是最基础的形式，适合简单的占比展示
- 环形图可以在中心显示额外信息，空间利用率更高
- 玫瑰图使用半径表示数值，适合数值差异较大的情况

### 饼图和[面积图](/charts/area)、[折线图](/charts/line)

- 饼图展示静态的占比关系，适合某个时间点的数据快照
- 面积图和折线图展示数据随时间的变化趋势
- 当需要展示占比时选择饼图，需要展示趋势时选择面积图或折线图

## 相似图表

<code src="./demos/list-card.tsx"></code>

## 分类

<code src="./demos/list-category.tsx"></code>