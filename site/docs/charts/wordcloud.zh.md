---
title: 词云图
order: 19
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*AubySIbXrHMAAAAAAAAAAAAAemJ7AQ/original'
category: ['distribution']
similar: ['treemap', 'bubble', 'pack']
---

<img alt="wordcloud" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*AubySIbXrHMAAAAAAAAAAAAAemJ7AQ/original" width=600/>

## 词云图的简介

词云图是一种以可视化方式展示文本数据的图表类型，通过调整词语的大小、颜色和位置来反映词语在文本中的重要程度或出现频率。词云图将文本信息转换为直观的视觉表现，使用户能够快速识别文本中的关键词汇和主题。

词云图特别适合分析大量文本数据，如社交媒体评论、用户反馈、文章内容、调研报告等。通过词语大小的对比，用户可以迅速了解哪些词汇最为重要或出现最频繁，从而提取文本的核心信息和趋势。

词云图不仅具有实用的分析价值，还具有很强的艺术性和视觉冲击力，常被用于演示文稿、报告封面和数据可视化展示中。

**英文名**：Word Cloud, Tag Cloud

## 词云图的构成

<img alt="wordcloud-components" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*AubySIbXrHMAAAAAAAAAAAAAemJ7AQ/original" width=600 />

| 图表类型         | 词云图                                                                                              |
| ---------------- | --------------------------------------------------------------------------------------------------- |
| 适合的数据       | 列表：文本字段、频率或权重字段                                                                      |
| 功能             | 展示文本数据的频率分布和重要程度                                                                    |
| 数据与图形的映射 | 文本字段映射到词语内容<br>频率字段映射到字体大小<br>可选分类字段映射到颜色                          |
| 适合的数据条数   | 20-200 个词语，过多会导致布局拥挤                                                                  |

**组成元素：**
1. **词语（Words）**：文本中的关键词汇，是词云图的核心元素
2. **字体大小（Font Size）**：通常与词频或重要性成正比
3. **颜色编码（Color Encoding）**：可用于区分不同类别或强调重要程度
4. **布局算法（Layout Algorithm）**：确定词语在空间中的位置分布
5. **形状容器（Shape Container）**：词云的整体轮廓，可以是矩形、圆形或自定义形状

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'wordCloud',
  data: [
    { text: 'JavaScript', value: 120, category: '编程语言' },
    { text: 'Python', value: 100, category: '编程语言' },
    { text: 'React', value: 90, category: '前端框架' },
    { text: 'Vue', value: 85, category: '前端框架' },
    { text: 'Node.js', value: 80, category: '后端技术' },
    { text: 'TypeScript', value: 75, category: '编程语言' },
    { text: 'CSS', value: 70, category: '样式技术' },
    { text: 'HTML', value: 65, category: '标记语言' },
    { text: 'Angular', value: 60, category: '前端框架' },
    { text: 'Express', value: 55, category: '后端技术' },
    { text: 'MongoDB', value: 50, category: '数据库' },
    { text: 'MySQL', value: 45, category: '数据库' },
    { text: 'Git', value: 40, category: '版本控制' },
    { text: 'Docker', value: 35, category: '容器技术' },
    { text: 'AWS', value: 30, category: '云服务' }
  ],
  layout: {
    spiral: 'rectangular',
    fontSize: [12, 60],
    padding: 3
  },
  encode: {
    color: 'category'
  },
  scale: {
    color: {
      palette: ['#1890ff', '#52c41a', '#fa8c16', '#722ed1', '#eb2f96', '#13c2c2']
    }
  },
  style: {
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold'
  },
  legend: {
    color: { title: '技术分类' }
  }
});

chart.render();
```

## 词云图的应用场景

### 适合的场景

#### 1. 文本内容分析

词云图非常适合分析文本内容，快速识别关键词和主题：

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'wordCloud',
  data: [
    { text: '用户体验', value: 95 },
    { text: '产品设计', value: 88 },
    { text: '界面优化', value: 82 },
    { text: '功能完善', value: 78 },
    { text: '性能提升', value: 75 },
    { text: '操作简便', value: 70 },
    { text: '视觉效果', value: 65 },
    { text: '响应速度', value: 60 },
    { text: '兼容性', value: 55 },
    { text: '稳定性', value: 50 }
  ],
  layout: {
    spiral: 'archimedean',
    fontSize: [16, 48],
    padding: 5
  },
  encode: {
    size: 'value',
    color: 'value'
  },
  scale: {
    color: {
      palette: ['#91d5ff', '#40a9ff', '#1890ff', '#096dd9', '#0050b3']
    }
  },
  style: {
    fontFamily: 'Microsoft YaHei, sans-serif'
  }
});

chart.render();
```

#### 2. 社交媒体热词分析

分析社交媒体上的热门话题和关键词：

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'wordCloud',
  data: [
    { text: '人工智能', value: 120 },
    { text: '机器学习', value: 100 },
    { text: '深度学习', value: 90 },
    { text: '大数据', value: 85 },
    { text: '云计算', value: 80 },
    { text: '区块链', value: 75 },
    { text: '物联网', value: 70 },
    { text: '5G', value: 65 },
    { text: '虚拟现实', value: 60 },
    { text: '增强现实', value: 55 }
  ],
  layout: {
    spiral: 'rectangular',
    fontSize: [14, 56],
    padding: 4
  },
  encode: {
    color: 'text'
  },
  scale: {
    color: {
      palette: ['#ff7875', '#ff9c6e', '#ffc069', '#fff566', '#95de64', '#5cdbd3', '#69c0ff', '#85a5ff', '#b37feb', '#ff85c0']
    }
  }
});

chart.render();
```

### 不适合的场景

#### 词语过多导致布局混乱

当词语数量过多时，词云图会变得拥挤难读：

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

// 生成大量词语数据
const data = Array.from({ length: 100 }, (_, i) => ({
  text: `词语${i + 1}`,
  value: Math.random() * 50 + 10
}));

chart.options({
  type: 'wordCloud',
  data,
  layout: {
    spiral: 'rectangular',
    fontSize: [8, 24],
    padding: 1
  },
  encode: {
    size: 'value'
  },
  style: {
    fill: '#1890ff'
  }
});

chart.render();
```

**解决方案：数据筛选和分组**

对数据进行筛选，只显示最重要的词语：

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

// 只显示前20个最重要的词语
const filteredData = Array.from({ length: 20 }, (_, i) => ({
  text: `重要词语${i + 1}`,
  value: 100 - i * 3
}));

chart.options({
  type: 'wordCloud',
  data: filteredData,
  layout: {
    spiral: 'archimedean',
    fontSize: [16, 48],
    padding: 5
  },
  encode: {
    size: 'value',
    color: 'value'
  },
  scale: {
    color: {
      palette: ['#52c41a', '#1890ff', '#722ed1']
    }
  }
});

chart.render();
```

## 词云图与其他图表的对比

### 词云图和[树图](/charts/treemap)

- **词云图**：适合展示文本数据的频率分布，具有艺术性
- **树图**：适合展示层次结构数据，空间利用率高

### 词云图和[气泡图](/charts/bubble)

- **词云图**：专门用于文本数据，通过字体大小表示重要性
- **气泡图**：用于数值数据，通过气泡大小表示数值

### 词云图和[柱状图](/charts/bar)

- **词云图**：视觉冲击力强，适合展示概览
- **柱状图**：精确对比数值，适合详细分析

## 词云图的扩展

### 形状词云图

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'wordCloud',
  data: [
    { text: '创新', value: 95 },
    { text: '品质', value: 88 },
    { text: '服务', value: 82 },
    { text: '专业', value: 78 },
    { text: '可靠', value: 75 },
    { text: '效率', value: 70 },
    { text: '团队', value: 65 },
    { text: '体验', value: 60 },
    { text: '技术', value: 58 },
    { text: '解决方案', value: 55 }
  ],
  layout: {
    spiral: 'archimedean',
    fontSize: [16, 48],
    padding: 5,
    rotate: [-45, 45]
  },
  encode: {
    size: 'value',
    color: 'value'
  },
  scale: {
    color: {
      palette: ['#ff7875', '#ffc069', '#95de64', '#5cdbd3', '#69c0ff']
    }
  },
  style: {
    fontFamily: 'Microsoft YaHei, sans-serif',
    fontWeight: 'bold'
  }
});

chart.render();
```

### 多色彩词云图

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'wordCloud',
  data: [
    { text: '数据可视化', value: 100, category: '技术' },
    { text: '用户界面', value: 90, category: '设计' },
    { text: '交互体验', value: 85, category: '体验' },
    { text: '响应式设计', value: 80, category: '设计' },
    { text: '前端开发', value: 75, category: '技术' },
    { text: '用户研究', value: 70, category: '体验' },
    { text: '原型设计', value: 65, category: '设计' },
    { text: '性能优化', value: 60, category: '技术' },
    { text: '可用性测试', value: 55, category: '体验' },
    { text: '视觉设计', value: 50, category: '设计' }
  ],
  layout: {
    spiral: 'rectangular',
    fontSize: [14, 42],
    padding: 4
  },
  encode: {
    size: 'value',
    color: 'category'
  },
  scale: {
    color: {
      palette: ['#1890ff', '#52c41a', '#fa8c16']
    }
  },
  legend: {
    color: { title: '分类' }
  }
});

chart.render();
```

## 相似图表

<code src="./demos/list-category.tsx"></code>

## 分类

<code src="./demos/list-category.tsx"></code>