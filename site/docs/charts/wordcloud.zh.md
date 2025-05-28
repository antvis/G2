---
title: 词云图
order: 19
screenshot: /screenshots/wordcloud.webp
category: ['text', 'distribution']
similar: ['treemap', 'bubble', 'pack']
---

## 词云图的简介

词云图是一种以可视化方式展示文本数据的图表类型，通过调整词语的大小、颜色和位置来反映词语在文本中的重要程度或出现频率。词云图将文本信息转换为直观的视觉表现，使用户能够快速识别文本中的关键词汇和主题。

词云图特别适合分析大量文本数据，如社交媒体评论、用户反馈、文章内容、调研报告等。通过词语大小的对比，用户可以迅速了解哪些词汇最为重要或出现最频繁，从而提取文本的核心信息和趋势。

词云图不仅具有实用的分析价值，还具有很强的艺术性和视觉冲击力，常被用于演示文稿、报告封面和数据可视化展示中。

**英文名**：Word Cloud, Tag Cloud

## 词云图的构成

### 基础词云图

词云图主要由以下几个部分构成：

1. **词语（Words）**：文本中的关键词汇，是词云图的核心元素
2. **字体大小（Font Size）**：通常与词频或重要性成正比
3. **颜色编码（Color Encoding）**：可用于区分不同类别或强调重要程度
4. **布局算法（Layout Algorithm）**：确定词语在空间中的位置分布
5. **形状容器（Shape Container）**：词云的整体轮廓，可以是矩形、圆形或自定义形状

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // 模拟词频数据
  const data = [
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
  ];

  chart.options({
    type: 'wordCloud',
    data,
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

  return chart.getContainer();
})();
```

### 定制形状词云图

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // 模拟品牌关键词数据
  const data = [
    { text: '创新', value: 95 },
    { text: '品质', value: 88 },
    { text: '服务', value: 82 },
    { text: '专业', value: 78 },
    { text: '可靠', value: 75 },
    { text: '效率', value: 70 },
    { text: '团队', value: 65 },
    { text: '体验', value: 60 },
    { text: '技术', value: 58 },
    { text: '解决方案', value: 55 },
    { text: '合作', value: 52 },
    { text: '价值', value: 50 },
    { text: '领先', value: 48 },
    { text: '优质', value: 45 },
    { text: '定制', value: 42 },
    { text: '支持', value: 40 },
    { text: '快速', value: 38 },
    { text: '安全', value: 35 },
    { text: '稳定', value: 32 },
    { text: '灵活', value: 30 }
  ];

  chart.options({
    type: 'wordCloud',
    data,
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
        palette: ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#084594']
      }
    },
    style: {
      fontFamily: '微软雅黑, Arial',
      fontWeight: (d) => d.value > 60 ? 'bold' : 'normal'
    },
    legend: {
      color: { title: '重要程度' }
    }
  });

  chart.render();

  return chart.getContainer();
})();
```

## 词云图的应用场景

### 适合的场景

例子 1: **文本挖掘和关键词分析**

词云图在文本挖掘中具有重要作用，可以快速识别文档或语料库中的高频词汇：

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // 模拟用户评论关键词数据
  const data = [
    { text: '好用', value: 145, sentiment: 'positive' },
    { text: '方便', value: 132, sentiment: 'positive' },
    { text: '快速', value: 128, sentiment: 'positive' },
    { text: '界面', value: 115, sentiment: 'neutral' },
    { text: '功能', value: 108, sentiment: 'neutral' },
    { text: '体验', value: 95, sentiment: 'positive' },
    { text: '稳定', value: 88, sentiment: 'positive' },
    { text: '卡顿', value: 75, sentiment: 'negative' },
    { text: '客服', value: 68, sentiment: 'neutral' },
    { text: '价格', value: 62, sentiment: 'neutral' },
    { text: '推荐', value: 58, sentiment: 'positive' },
    { text: '问题', value: 55, sentiment: 'negative' },
    { text: '更新', value: 52, sentiment: 'neutral' },
    { text: '优化', value: 48, sentiment: 'positive' },
    { text: '简单', value: 45, sentiment: 'positive' },
    { text: '复杂', value: 38, sentiment: 'negative' },
    { text: '满意', value: 35, sentiment: 'positive' },
    { text: '改进', value: 32, sentiment: 'neutral' },
    { text: '清晰', value: 28, sentiment: 'positive' },
    { text: '困难', value: 25, sentiment: 'negative' }
  ];

  chart.options({
    type: 'wordCloud',
    data,
    layout: {
      spiral: 'rectangular',
      fontSize: [14, 50],
      padding: 4
    },
    encode: {
      size: 'value',
      color: 'sentiment'
    },
    scale: {
      color: {
        domain: ['positive', 'neutral', 'negative'],
        palette: ['#52c41a', '#1890ff', '#ff4d4f']
      }
    },
    style: {
      fontFamily: '苹方, Arial',
      fontWeight: 'bold'
    },
    legend: {
      color: { 
        title: '情感倾向',
        itemName: {
          formatter: (d) => {
            const map = { positive: '积极', neutral: '中性', negative: '消极' };
            return map[d] || d;
          }
        }
      }
    },
    title: '用户评论关键词情感分析'
  });

  chart.render();

  return chart.getContainer();
})();
```

例子 2: **品牌分析和市场研究**

词云图可以有效展示品牌关联词汇和市场定位：

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // 模拟品牌关联词数据
  const data = [
    { text: '高端', value: 112, category: '品牌形象' },
    { text: '奢华', value: 98, category: '品牌形象' },
    { text: '时尚', value: 89, category: '设计风格' },
    { text: '经典', value: 85, category: '设计风格' },
    { text: '精工', value: 78, category: '制造工艺' },
    { text: '传承', value: 72, category: '品牌历史' },
    { text: '独特', value: 68, category: '产品特色' },
    { text: '优雅', value: 65, category: '设计风格' },
    { text: '耐用', value: 62, category: '产品质量' },
    { text: '精致', value: 58, category: '制造工艺' },
    { text: '瑞士', value: 55, category: '品牌起源' },
    { text: '机械', value: 52, category: '技术特色' },
    { text: '收藏', value: 48, category: '产品价值' },
    { text: '限量', value: 45, category: '产品特色' },
    { text: '投资', value: 42, category: '产品价值' },
    { text: '手工', value: 38, category: '制造工艺' },
    { text: '艺术', value: 35, category: '设计风格' },
    { text: '传统', value: 32, category: '品牌历史' },
    { text: '创新', value: 28, category: '技术特色' },
    { text: '珍贵', value: 25, category: '产品价值' }
  ];

  chart.options({
    type: 'wordCloud',
    data,
    layout: {
      spiral: 'archimedean',
      fontSize: [12, 45],
      padding: 3,
      rotate: [-60, 60]
    },
    encode: {
      size: 'value',
      color: 'category'
    },
    scale: {
      color: {
        palette: ['#722ed1', '#eb2f96', '#fa8c16', '#52c41a', '#13c2c2', '#1890ff']
      }
    },
    style: {
      fontFamily: 'Georgia, serif',
      fontWeight: (d) => d.value > 70 ? 'bold' : 'normal',
      fontStyle: (d) => d.category === '设计风格' ? 'italic' : 'normal'
    },
    legend: {
      color: { title: '关键词类别' }
    },
    title: '奢侈品手表品牌词云分析'
  });

  chart.render();

  return chart.getContainer();
})();
```

例子 3: **社交媒体和趋势分析**

词云图可以展示社交媒体话题的热度和趋势：

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // 模拟社交媒体热门话题数据
  const data = [
    { text: '人工智能', value: 156, trend: 'up' },
    { text: '机器学习', value: 134, trend: 'up' },
    { text: '大数据', value: 128, trend: 'stable' },
    { text: '云计算', value: 118, trend: 'up' },
    { text: '区块链', value: 95, trend: 'down' },
    { text: '物联网', value: 88, trend: 'stable' },
    { text: '5G', value: 82, trend: 'up' },
    { text: '数字化转型', value: 78, trend: 'up' },
    { text: '虚拟现实', value: 72, trend: 'stable' },
    { text: '增强现实', value: 68, trend: 'up' },
    { text: '自动驾驶', value: 65, trend: 'up' },
    { text: '智能家居', value: 58, trend: 'stable' },
    { text: '边缘计算', value: 52, trend: 'up' },
    { text: '量子计算', value: 48, trend: 'up' },
    { text: '网络安全', value: 45, trend: 'stable' },
    { text: '数据分析', value: 42, trend: 'stable' },
    { text: '深度学习', value: 38, trend: 'up' },
    { text: '智能制造', value: 35, trend: 'up' },
    { text: '数字孪生', value: 32, trend: 'up' },
    { text: '元宇宙', value: 28, trend: 'down' }
  ];

  chart.options({
    type: 'wordCloud',
    data,
    layout: {
      spiral: 'rectangular',
      fontSize: [10, 40],
      padding: 2,
      rotate: () => (Math.random() - 0.5) * 60
    },
    encode: {
      size: 'value',
      color: 'trend'
    },
    scale: {
      color: {
        domain: ['up', 'stable', 'down'],
        palette: ['#ff4d4f', '#faad14', '#52c41a']
      }
    },
    style: {
      fontFamily: '微软雅黑, sans-serif',
      fontWeight: 'bold'
    },
    legend: {
      color: { 
        title: '趋势状态',
        itemName: {
          formatter: (d) => {
            const map = { up: '上升', stable: '稳定', down: '下降' };
            return map[d] || d;
          }
        }
      }
    },
    title: '科技趋势热门话题词云'
  });

  chart.render();

  return chart.getContainer();
})();
```

### 不适合的场景

例子 1: **精确数值比较**

词云图通过字体大小差异来表现数值大小，但这种视觉编码方式不够精确，不适合需要准确比较数值的场景。如果需要精确比较，柱状图或表格会是更好的选择。

例子 2: **词汇数量过多或过少**

当词汇数量过多时，词云图会显得拥挤混乱，难以阅读；当词汇数量过少时，词云图的视觉效果不佳。一般建议词汇数量控制在20-100个之间。

## 词云图的扩展

### 分层词云图

通过分层展示不同级别的关键词：

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // 模拟分层关键词数据
  const data = [
    // 核心层
    { text: '产品', value: 100, layer: 'core', importance: 'high' },
    { text: '用户', value: 95, layer: 'core', importance: 'high' },
    { text: '体验', value: 90, layer: 'core', importance: 'high' },
    // 重要层
    { text: '设计', value: 75, layer: 'important', importance: 'medium' },
    { text: '功能', value: 72, layer: 'important', importance: 'medium' },
    { text: '质量', value: 68, layer: 'important', importance: 'medium' },
    { text: '服务', value: 65, layer: 'important', importance: 'medium' },
    // 支撑层
    { text: '技术', value: 50, layer: 'support', importance: 'low' },
    { text: '团队', value: 48, layer: 'support', importance: 'low' },
    { text: '流程', value: 45, layer: 'support', importance: 'low' },
    { text: '成本', value: 42, layer: 'support', importance: 'low' },
    { text: '时间', value: 40, layer: 'support', importance: 'low' },
    { text: '资源', value: 38, layer: 'support', importance: 'low' },
    { text: '方案', value: 35, layer: 'support', importance: 'low' },
    { text: '标准', value: 32, layer: 'support', importance: 'low' }
  ];

  chart.options({
    type: 'wordCloud',
    data,
    layout: {
      spiral: 'archimedean',
      fontSize: [14, 48],
      padding: 4
    },
    encode: {
      size: 'value',
      color: 'layer'
    },
    scale: {
      color: {
        domain: ['core', 'important', 'support'],
        palette: ['#ff4d4f', '#faad14', '#1890ff']
      }
    },
    style: {
      fontFamily: 'Arial, sans-serif',
      fontWeight: (d) => d.importance === 'high' ? 'bold' : 'normal',
      opacity: (d) => {
        const opacityMap = { high: 1, medium: 0.8, low: 0.6 };
        return opacityMap[d.importance];
      }
    },
    legend: {
      color: { 
        title: '词汇层级',
        itemName: {
          formatter: (d) => {
            const map = { core: '核心层', important: '重要层', support: '支撑层' };
            return map[d] || d;
          }
        }
      }
    },
    title: '产品关键词分层词云'
  });

  chart.render();

  return chart.getContainer();
})();
```

### 时间演进词云图

展示关键词随时间的变化趋势：

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // 模拟时间演进数据（显示当前时间点）
  const timeData = {
    '2020': [
      { text: '疫情', value: 150 },
      { text: '远程办公', value: 120 },
      { text: '线上教育', value: 100 },
      { text: '健康码', value: 80 },
      { text: '口罩', value: 75 }
    ],
    '2021': [
      { text: '疫苗', value: 140 },
      { text: '元宇宙', value: 110 },
      { text: '碳中和', value: 95 },
      { text: '芯片', value: 85 },
      { text: '新能源', value: 70 }
    ],
    '2022': [
      { text: 'ChatGPT', value: 180 },
      { text: 'AI绘画', value: 130 },
      { text: '数字藏品', value: 90 },
      { text: '新冠特效药', value: 75 },
      { text: '世界杯', value: 65 }
    ]
  };

  // 当前显示2022年数据
  const currentData = timeData['2022'].map(item => ({
    ...item,
    year: '2022',
    category: item.value > 100 ? 'hot' : item.value > 80 ? 'warm' : 'normal'
  }));

  chart.options({
    type: 'wordCloud',
    data: currentData,
    layout: {
      spiral: 'rectangular',
      fontSize: [16, 60],
      padding: 5
    },
    encode: {
      size: 'value',
      color: 'category'
    },
    scale: {
      color: {
        domain: ['hot', 'warm', 'normal'],
        palette: ['#ff4d4f', '#faad14', '#1890ff']
      }
    },
    style: {
      fontFamily: '微软雅黑, Arial',
      fontWeight: 'bold'
    },
    legend: {
      color: { 
        title: '热度等级',
        itemName: {
          formatter: (d) => {
            const map = { hot: '热门', warm: '温热', normal: '一般' };
            return map[d] || d;
          }
        }
      }
    },
    title: '2022年度热词词云'
  });

  chart.render();

  return chart.getContainer();
})();
```

## 词云图与其他图表的对比

### 词云图和[树图](/charts/treemap)

- 词云图通过字体大小表示数据大小，树图通过矩形面积表示
- 词云图更适合文本数据的展示，树图更适合层次化数据
- 词云图具有更强的艺术性，树图具有更准确的数值表达

### 词云图和[气泡图](/charts/bubble)

- 词云图使用文本作为数据载体，气泡图使用圆圈
- 词云图侧重关键词识别，气泡图侧重数值关系
- 词云图布局更灵活多样，气泡图位置编码更精确

### 词云图和[柱状图](/charts/bar)

- 词云图通过视觉冲击力传达信息，柱状图通过精确比较传达信息
- 词云图适合概览和趋势识别，柱状图适合具体数值分析
- 词云图更具装饰性，柱状图更具分析性

## 相似图表

<code src="./demos/list-card.tsx"></code>

## 分类

<code src="./demos/list-category.tsx"></code>