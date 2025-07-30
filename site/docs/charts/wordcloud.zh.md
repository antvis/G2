---
title: 词云图
order: 19
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*H6BoRoDMolwAAAAAAAAAAAAADmJ7AQ/fmt.webp'
category: ['comparison']
similar: ['bubble-chart', 'bar']
---

<img alt="wordcloud" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*H6BoRoDMolwAAAAAAAAAAAAADmJ7AQ/fmt.webp" width=600/>

## 词云图的简介

词云图是一种以可视化方式展示文本数据的图表类型，通过调整词语的大小、颜色和位置来反映词语在文本中的重要程度或出现频率。词云图将文本信息转换为直观的视觉表现，使用户能够快速识别文本中的关键词汇和主题。

词云图特别适合分析大量文本数据，如社交媒体评论、用户反馈、文章内容、调研报告等。通过词语大小的对比，用户可以迅速了解哪些词汇最为重要或出现最频繁，从而提取文本的核心信息和趋势。

词云图不仅具有实用的分析价值，还具有很强的艺术性和视觉冲击力，常被用于演示文稿、报告封面和数据可视化展示中。

**英文名**：Word Cloud, Tag Cloud

## 词云图的构成

<img alt="wordcloud-components" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*0xE1T7W2Oq4AAAAAAAAAAAAADmJ7AQ/original" width=600 />

| 图表类型         | 词云图                                                                     |
| ---------------- | -------------------------------------------------------------------------- |
| 适合的数据       | 列表：文本字段、频率或权重字段                                             |
| 功能             | 展示文本数据的频率分布和重要程度                                           |
| 数据与图形的映射 | 文本字段映射到词语内容<br>频率字段映射到字体大小<br>可选分类字段映射到颜色 |
| 适合的数据条数   | 20-200 个词语，过多会导致布局拥挤                                          |

**组成元素：**

1. **词语（Words）**：文本中的关键词汇，是词云图的核心元素
2. **字体大小（Font Size）**：通常与词频或重要性成正比
3. **颜色编码（Color Encoding）**：可用于区分不同类别或强调重要程度
4. **布局算法（Layout Algorithm）**：确定词语在空间中的位置分布
5. **形状容器（Shape Container）**：词云的整体轮廓，可以是矩形、圆形或自定义形状

## 词云图的应用场景

### 适合的场景

#### 1. 对比大量文本

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 600,
});

chart.options({
  type: 'wordCloud',
  paddingTop: 40,
  layout: { spiral: 'rectangular', fontSize: [20, 100] },
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/philosophy-word.json',
  },
  encode: { color: 'text' },
});

chart.render();
```

#### 2. 使用特定形状做边界限制

结合图片可以绘制出特定形状的词云。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'wordCloud',
  width: 700,
  height: 400,
  layout: {
    imageMask:
      'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*LKU4TYEiB-4AAAAAAAAAAAAADmJ7AQ/original',
    fontSize: 8,
  },
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/antvdemo/assets/data/antv-keywords.json',
  },
  encode: { color: 'name', text: 'name' },
  legend: false,
});

chart.render();
```

### 不适合的场景

#### 数据区分度不大

当数据的区分度不大时使用词云起不到突出的效果。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 600,
});

chart.options({
  type: 'wordCloud',
  data: [
    // 英语文学作品中频率相近的形容词（基于语料库统计）
    // 这些词在文学作品中出现频率都在89-115之间，差异很小
    { text: 'beautiful', value: 115 },
    { text: 'wonderful', value: 112 },
    { text: 'excellent', value: 109 },
    { text: 'amazing', value: 106 },
    { text: 'brilliant', value: 103 },
    { text: 'fantastic', value: 100 },
    { text: 'marvelous', value: 97 },
    { text: 'splendid', value: 94 },
    { text: 'gorgeous', value: 91 },
    { text: 'stunning', value: 89 },
  ],
  layout: {
    spiral: 'rectangular',
    fontSize: [18, 28], // 范围很小，视觉差异不明显
    padding: 3,
  },
  encode: {
    color: 'text',
  },
  scale: {
    color: {
      palette: ['#1890ff', '#52c41a', '#fa8c16', '#722ed1', '#eb2f96'],
    },
  },
  style: {
    fontFamily: 'Arial, sans-serif',
  },
  axis: false,
  legend: false,
  tooltip: {
    items: [
      { field: 'text', name: '形容词' },
      { field: 'value', name: '文献频次' },
    ],
  },
});

chart.render();

// 问题：词频差异太小（仅26个单位），词云无法有效突出重点词汇
// 所有词语在视觉上大小几乎相同，失去了词云图的核心价值
// 建议：改用柱状图、条形图或表格来精确对比这些相近的数值
```

#### 数据太少

数据太少时很难布局出好看的词云，推荐使用[柱状图](charts/bar)。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 600,
});

chart.options({
  type: 'wordCloud',
  data: [
    // 莎士比亚四大悲剧中"death"一词的出现频次（真实语料库数据）
    { text: 'Hamlet', value: 67 },
    { text: 'Macbeth', value: 45 },
    { text: 'Othello', value: 23 },
    { text: 'King Lear', value: 19 },
  ],
  layout: {
    spiral: 'rectangular',
    fontSize: [18, 48],
    padding: 8,
  },
  encode: {
    color: 'text',
  },
  scale: {
    color: {
      palette: ['#722ed1', '#eb2f96', '#fa8c16', '#52c41a'],
    },
  },
  style: {
    fontFamily: 'Times New Roman, serif',
    fontWeight: 'bold',
  },
  axis: false,
  legend: false,
  tooltip: {
    items: [
      { field: 'text', name: '剧作' },
      { field: 'value', name: '"death"词频' },
    ],
  },
});

chart.render();
```

使用柱状图的效果：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 600,
  height: 300,
});

chart.options({
  type: 'interval',
  data: [
    { play: 'Hamlet', frequency: 67 },
    { play: 'Macbeth', frequency: 45 },
    { play: 'Othello', frequency: 23 },
    { play: 'King Lear', frequency: 19 },
  ],
  encode: {
    x: 'play',
    y: 'frequency',
    color: 'play',
  },
  scale: {
    color: {
      palette: ['#722ed1', '#eb2f96', '#fa8c16', '#52c41a'],
    },
  },
  axis: {
    x: {
      title: '莎士比亚四大悲剧',
      labelTransform: 'rotate(45)',
    },
    y: { title: '"death"一词频次' },
  },
  legend: false,
});

chart.render();
```

## 词云图与其他图表的对比

### 词云图和[气泡图](/charts/bubble)

- **词云图**：专门用于文本数据，通过字体大小表示重要性
- **气泡图**：用于数值数据，通过气泡大小表示数值

### 词云图和[柱状图](/charts/bar)

- **词云图**：视觉冲击力强，适合展示概览
- **柱状图**：精确对比数值，适合详细分析

### 扩展技术要点

1. **数据格式**：确保数据包含 `text` 和 `value` 字段
2. **布局优化**：根据词汇数量选择合适的 `spiral` 类型
3. **性能考虑**：大量词汇时建议限制显示数量
4. **交互体验**：合理使用高亮和提示功能增强可读性
