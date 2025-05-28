---
title: 堆叠柱状图
order: 2
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*69WQTY8YrWgAAAAAAAAAAAAADmJ7AQ/original'
category: ['comparison', 'proportion']
similar: ['bar', 'grouped-bar', 'stacked-area', 'pie']
---

<img alt="stacked-bar" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*69WQTY8YrWgAAAAAAAAAAAAADmJ7AQ/original" width=600/>

## 堆叠柱状图的简介

堆叠柱状图（Stacked Bar Chart）是一种用于对比各分类下不同子项数值，并展示各子项在整体中的占比的图表。通过将多个系列的数据在同一柱子上堆叠，直观地反映各部分与整体的关系。

**英文名**：Stacked Bar Chart

**其他名称**：堆积柱状图、分组堆叠柱状图

## 堆叠柱状图的构成

- **X 轴/分类轴**：表示对比的分类。
- **Y 轴/数值轴**：表示数值大小。
- **柱子**：每个分类对应一根柱子，柱子被不同系列按顺序堆叠。
- **颜色**：不同系列用不同颜色区分。

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { genre: 'Sports', sold: 275, type: 'Online' },
    { genre: 'Sports', sold: 115, type: 'Offline' },
    { genre: 'Strategy', sold: 120, type: 'Online' },
    { genre: 'Strategy', sold: 350, type: 'Offline' },
    { genre: 'Action', sold: 150, type: 'Online' },
    { genre: 'Action', sold: 80, type: 'Offline' },
  ],
  encode: { x: 'genre', y: 'sold', color: 'type', series: 'type' },
  transform: [{ type: 'stackY' }],
  axis: {
    x: { title: '类型' },
    y: { title: '销量' },
  },
  legend: { color: { title: '渠道' } },
});

chart.render();
```

---

## 堆叠柱状图的应用场景

### 适合的场景

- 对比各分类下不同子项的数值和占比。
- 展示部分与整体的关系。
- 需要突出各系列的累积效果。

### 不适合的场景

- 分类或系列过多，颜色难以区分。
- 关注单个系列的精确对比时，建议用分组柱状图。

---

## 堆叠柱状图的扩展

### 百分比堆叠柱状图

将每个分类的总和归一化为 100%，突出各部分的占比。

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { genre: 'Sports', sold: 275, type: 'Online' },
    { genre: 'Sports', sold: 115, type: 'Offline' },
    { genre: 'Strategy', sold: 120, type: 'Online' },
    { genre: 'Strategy', sold: 350, type: 'Offline' },
    { genre: 'Action', sold: 150, type: 'Online' },
    { genre: 'Action', sold: 80, type: 'Offline' },
  ],
  encode: { x: 'genre', y: 'sold', color: 'type', series: 'type' },
  transform: [{ type: 'normalizeY' }, { type: 'stackY' }],
  axis: {
    x: { title: '类型' },
    y: { title: '占比', labelFormatter: (v) => `${(v * 100).toFixed(0)}%` },
  },
  legend: { color: { title: '渠道' } },
});

chart.render();
```

---

## 堆叠柱状图与其他图表的对比

### 堆叠柱状图和[柱状图](/charts/bar)

- 柱状图适合对比单一系列的分类数值，堆叠柱状图适合对比多个系列的累积和占比。

### 堆叠柱状图和[分组柱状图](/charts/grouped-bar)

- 分组柱状图适合对比各系列的绝对值，堆叠柱状图适合突出部分与整体的关系。

### 堆叠柱状图和[堆叠面积图](/charts/stacked-area)

- 两者都能展示累积和占比，堆叠面积图更适合趋势类数据。

---

## 相似图表

<code src="./demos/list-card.tsx"></code>

## 分类

<code src="./demos/list-category.tsx"></code>