---
title: 堆叠面积图
order: 4
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*stacked-area-demo.png/original'
category: ['trend', 'composition']
similar: ['area', 'stacked-bar', 'line']
---

<img alt="stacked-area" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*stacked-area-demo.png/original" width=600/>

## 堆叠面积图的简介

堆叠面积图（Stacked Area Chart）是一种用于展示多个数据序列随时间或类别变化的趋势，并且突出各部分在整体中的占比变化的图表。它通过将多组面积图按顺序堆叠，直观地反映各部分的累积和整体趋势。

**英文名**：Stacked Area Chart

**其他名称**：堆积面积图、分层面积图

## 堆叠面积图的构成

- **X 轴**：通常表示时间或类别。
- **Y 轴**：表示数值，显示各序列的累积值。
- **面积**：每个系列的面积堆叠在前一个系列之上，面积的高度表示该系列的数值。
- **颜色**：不同系列用不同颜色区分。

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'area',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/stacked-area.json',
  },
  encode: {
    x: 'year',
    y: 'value',
    color: 'type',
    series: 'type',
  },
  transform: [{ type: 'stackY' }],
  style: {
    fillOpacity: 0.7,
  },
  axis: {
    x: { title: '年份' },
    y: { title: '数值' },
  },
});

chart.render();
```

---

## 堆叠面积图的应用场景

### 适合的场景

- 展示多个系列随时间或类别的**趋势和占比变化**。
- 需要突出**整体与部分的关系**。
- 比较不同系列的**累积变化**。

### 不适合的场景

- 系列过多导致颜色难以区分。
- 关注单个系列的精确变化时，建议使用折线图或普通面积图。

---

## 堆叠面积图的扩展

### 百分比堆叠面积图

将每个时间点的总和归一化为 100%，突出各部分的占比变化。

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'area',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/stacked-area.json',
  },
  encode: {
    x: 'year',
    y: 'value',
    color: 'type',
    series: 'type',
  },
  transform: [{ type: 'normalizeY' }, { type: 'stackY' }],
  style: {
    fillOpacity: 0.7,
  },
  axis: {
    x: { title: '年份' },
    y: { title: '占比', labelFormatter: (v) => `${(v * 100).toFixed(0)}%` },
  },
});

chart.render();
```

---

## 堆叠面积图与其他图表的对比

### 堆叠面积图和[面积图](/charts/area)

- 面积图适合展示单一系列的趋势，堆叠面积图适合展示多个系列的累积趋势和占比。

### 堆叠面积图和[堆叠柱状图](/charts/stacked-bar)

- 两者都能展示部分与整体的关系，堆叠面积图更适合趋势类数据，堆叠柱状图适合类别型数据。

### 堆叠面积图和[折线图](/charts/line)

- 折线图适合比较各系列的具体数值变化，堆叠面积图更突出累积和占比。

---

## 相似图表

<code src="./demos/list-card.tsx"></code>

## 分类

<code src="./demos/list-category.tsx"></code>