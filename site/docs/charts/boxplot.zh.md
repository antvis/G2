---
title: 箱形图
order: 3
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*yeZuSY9YIEAAAAAAAAAAAAAADmJ7AQ/original'
category: ['distribution', 'comparison']
similar: ['histogram', 'bar', 'scatter']
---

<img alt="boxplot" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*yeZuSY9YIEAAAAAAAAAAAAAADmJ7AQ/original" width=600/>

## 箱形图的简介

箱形图（Box Plot），又称盒须图、盒式图或箱线图，是一种用于展示一组数据分布情况的统计图表。它能够显示数据的五个重要统计量：最小值、下四分位数（Q1）、中位数（Q2）、上四分位数（Q3）和最大值，同时可以清楚地识别出数据中的异常值。

箱形图的设计简洁明了，通过箱体和须线的组合，可以快速了解数据的集中趋势、离散程度和偏态分布，是统计分析和数据探索中的重要工具。

**英文名**：Box Plot, Box-and-Whisker Plot

**其他名称**：盒须图、盒式图、箱线图

## 箱形图的构成

### 基础箱形图

<img alt="boxplot-anatomy" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*pU-NQa1PgxQAAAAAAAAAAAAADmJ7AQ/fmt.webp" width=600 />

| 图表类型         | 箱形图                                                                                       |
| ---------------- | -------------------------------------------------------------------------------------------- |
| 适合的数据       | 一个分类数据字段、一个连续数据字段                                                           |
| 功能             | 展示数据分布情况，识别异常值，比较不同分组的数据分布                                         |
| 数据与图形的映射 | 分类数据字段映射到横轴位置<br>连续数据字段自动计算统计值映射到箱体各部分<br>异常值显示为散点 |
| 适合的数据条数   | 每个分组建议至少有 5-10 个数据点                                                             |

箱形图的主要组成部分包括：

- **箱体**：从下四分位数（Q1）到上四分位数（Q3）的矩形区域，包含了中间 50%的数据
- **中位线**：箱体内部的水平线，表示数据的中位数（Q2）
- **须线**：从箱体延伸出的线段，通常延伸到 1.5 倍四分位距（IQR）范围内的最远数据点
- **异常值**：超出须线范围的数据点，以单独的点标记显示

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'boxplot',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/morley.json',
  },
  encode: {
    x: 'Expt',
    y: 'Speed',
  },
  style: {
    boxFill: '#1890ff',
    boxFillOpacity: 0.3,
    pointStroke: '#f5222d',
    pointR: 3,
  },
});

chart.render();
```

---

## 箱形图的应用场景

### 适合的场景

**场景 1：数据分布分析**

箱形图是分析数据分布的理想工具，能够快速识别数据的集中趋势、离散程度和偏态分布。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'boxplot',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
  },
  encode: {
    x: 'species',
    y: 'flipper_length_mm',
    color: 'species',
  },
  axis: {
    y: {
      title: '鳍长 (mm)',
    },
    x: {
      title: '企鹅种类',
    },
  },
});

chart.render();
```

**场景 2：异常值检测**

箱形图能够直观地显示数据中的异常值，帮助识别需要进一步调查的数据点。

**场景 3：多组数据比较**

通过并排显示多个箱形图，可以有效地比较不同组别间的数据分布差异。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'boxplot',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
  },
  encode: {
    x: 'species',
    y: 'flipper_length_mm',
    color: 'sex',
    series: 'sex',
  },
  axis: {
    y: {
      title: '鳍长 (mm)',
    },
    x: {
      title: '企鹅种类',
    },
  },
});

chart.render();
```

### 不适合的场景

**场景 1：数据量过少**

当每个分组的数据点少于 5 个时，箱形图的统计意义不大，建议使用散点图或条形图。

**场景 2：展示精确数值**

箱形图侧重于显示数据分布的整体特征，不适合需要精确数值的场景，此时应使用表格或条形图。

**场景 3：时间序列分析**

对于时间序列数据的趋势分析，[折线图](/charts/line)或[面积图](/charts/area)更为合适。

## 箱形图的扩展

### 分组箱形图

通过设置不同的颜色和系列，可以在同一图表中比较多个维度的数据分布。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'boxplot',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
  },
  encode: {
    x: 'species',
    y: 'body_mass_g',
    color: 'sex',
    series: 'sex',
  },
  axis: {
    y: {
      title: '体重 (g)',
    },
    x: {
      title: '企鹅种类',
    },
  },
});

chart.render();
```

### 横向箱形图

当分类标签过长时，可以使用横向箱形图来提高可读性。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'boxplot',
  coordinate: { transform: [{ type: 'transpose' }] },
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/morley.json',
    transform: [{ type: 'filter', callback: (d) => d.Expt <= 3 }],
  },
  encode: {
    x: 'Expt',
    y: 'Speed',
    color: 'Expt',
  },
  axis: {
    x: {
      title: '光速测量值',
    },
    y: {
      title: '实验编号',
    },
  },
});

chart.render();
```

### 无异常点箱形图

在某些场景下，可以隐藏异常点，只关注数据的整体分布。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'boxplot',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/morley.json',
  },
  encode: {
    x: 'Expt',
    y: 'Speed',
  },
  style: {
    point: false,
    boxFill: '#52c41a',
    boxFillOpacity: 0.4,
  },
  axis: {
    y: {
      title: '光速测量值',
    },
    x: {
      title: '实验编号',
    },
  },
});

chart.render();
```

## 箱形图与其他图表的对比

### 箱形图和[直方图](/charts/histogram)

- 箱形图主要展示数据的统计摘要（五数概括），适合快速比较多个分组
- 直方图展示数据的具体分布形状，适合单个变量的分布分析

### 箱形图和[柱状图](/charts/bar)

- 箱形图适合展示数据的分布情况和统计特征
- 柱状图主要用于比较不同分类的数值大小

### 箱形图和[散点图](/charts/scatter)

- 箱形图适合展示分组数据的分布概览
- 散点图适合展示具体数据点的分布和相关关系

## 相似图表

<code src="./demos/list-card.tsx"></code>

## 分类

<code src="./demos/list-category.tsx"></code>
