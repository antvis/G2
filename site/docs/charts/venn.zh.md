---
title: 韦恩图
order: 7
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*venn-demo.png/original'
category: ['relation', 'set']
similar: ['upset', 'pie', 'scatter']
---

<img alt="venn" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*venn-demo.png/original" width=600/>

## 韦恩图的简介

韦恩图（Venn Diagram）是一种用于展示集合之间交集、并集、补集等关系的图表。通过多个重叠的圆形，直观地表达集合之间的包含与交集关系。

**英文名**：Venn Diagram

**其他名称**：维恩图、集合关系图

## 韦恩图的构成

- **圆形**：每个集合用一个圆表示。
- **重叠区域**：圆的重叠部分表示集合的交集。
- **颜色/标签**：用于区分不同集合及其交集。

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'venn',
  autoFit: true,
  data: [
    { sets: ['A'], size: 12 },
    { sets: ['B'], size: 12 },
    { sets: ['A', 'B'], size: 2 },
  ],
  encode: {
    sets: 'sets',
    size: 'size',
    color: (d) => (d.sets.length === 1 ? '#5B8FF9' : '#61DDAA'),
    label: (d) => d.sets.join('∩'),
  },
  style: {
    label: { fill: '#fff', fontSize: 16 },
  },
});

chart.render();
```

---

## 韦恩图的应用场景

### 适合的场景

- 展示集合之间的交集、并集、补集等关系。
- 数据科学、集合论、市场分析等领域。

### 不适合的场景

- 集合数量过多时，图形难以辨认。
- 需要精确数值对比时，建议用其他图表。

---

## 韦恩图的扩展

- 可扩展为三集合、多集合韦恩图。
- 可结合 UpSet 图等展示更复杂的集合关系。

---

## 韦恩图与其他图表的对比

### 韦恩图和[UpSet 图](/charts/upset)

- UpSet 图适合集合数量较多、关系复杂的场景，韦恩图适合集合数量较少、关系直观的场景。

### 韦恩图和[饼图](/charts/pie)

- 饼图展示比例，韦恩图展示集合关系。

---

## 相似图表

<code src="./demos/list-card.tsx"></code>

## 分类

<code src="./demos/list-category.tsx"></code>