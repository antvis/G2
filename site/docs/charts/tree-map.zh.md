---
title: 矩形树图
order: 6
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*tree-map-demo.png/original'
category: ['hierarchy', 'composition']
similar: ['sunburst', 'circle-packing', 'pie']
---

<img alt="tree-map" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*tree-map-demo.png/original" width=600/>

## 矩形树图的简介

矩形树图（Tree Map）是一种用于展示层级结构数据的可视化图表，通过嵌套矩形的面积大小来表示各层级节点的数值大小，适合展示整体与部分的关系。

**英文名**：Tree Map

**其他名称**：矩形树状图、树形矩阵图

## 矩形树图的构成

- **矩形**：每个节点用一个矩形表示，面积与数值成正比。
- **嵌套结构**：父节点包含子节点的矩形，反映层级关系。
- **颜色**：可用于区分不同类别或层级。

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'treemap',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/treemap-data.json',
  },
  encode: {
    value: 'value',
    color: 'name',
    path: 'path',
  },
  style: {
    label: { text: 'name', fill: '#fff' },
  },
});

chart.render();
```

---

## 矩形树图的应用场景

### 适合的场景

- 展示具有层级结构的数据（如公司结构、文件系统、市场份额等）。
- 需要突出整体与部分关系。

### 不适合的场景

- 层级过深或节点过多，导致矩形过小难以辨认。
- 需要精确比较各节点数值时。

---

## 矩形树图的扩展

- 可结合颜色、交互等方式增强信息表达。
- 可与旭日图、圆打包图等联合使用。

---

## 矩形树图与其他图表的对比

### 矩形树图和[旭日图](/charts/sunburst)

- 都能展示层级关系，矩形树图用嵌套矩形，旭日图用同心圆环。

### 矩形树图和[饼图](/charts/pie)

- 饼图适合展示一层的组成，矩形树图适合多层级的组成。

---

## 相似图表

<code src="./demos/list-card.tsx"></code>

## 分类

<code src="./demos/list-category.tsx"></code>