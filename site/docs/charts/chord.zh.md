---
title: 和弦图
order: 38
screenshot: 'https://zos.alipayobjects.com/rmsportal/wqqqDPsmjjToaWvrNFMY.png'
category: ['relation']
similar: ['radar-chart', 'radial-bar', 'sankey', 'arcdiagram']
---

<img alt="chord" src="https://zos.alipayobjects.com/rmsportal/wqqqDPsmjjToaWvrNFMY.png" width=600/>

## 和弦图的简介

和弦图（Chord Diagram）是一种显示矩阵中数据间相互关系的可视化方法，节点数据沿圆周径向排列，节点之间使用带权重（有宽度）的弧线链接。特别适合展示多个实体之间的相互关系和流量。

和弦图能够直观地展示多个节点之间的复杂关系网络，特别适用于展示双向流动数据，如人口迁移、贸易流向、资金往来、软件依赖关系等场景。

**英文名**：Chord Diagram

## 和弦图的构成

<img alt="chord-structure" src="https://zos.alipayobjects.com/rmsportal/djkdEIgCQjeCCqCNwuct.png" width=600 />

| 图表类型         | 和弦图                                                                                   |
| ---------------- | ---------------------------------------------------------------------------------------- |
| 适合的数据       | 节点数据集（可选）、边数据集：源节点、目标节点、流量值                                   |
| 功能             | 观察节点关系，展示多个实体间的双向流动关系                                               |
| 数据与图形的映射 | 权重映射到节点和边的宽度<br>源节点和目标节点映射到圆周上的弧段位置<br>节点可以用颜色区分 |
| 适合的数据条数   | 节点数据两组以上，5-15 个节点效果最佳                                                    |

### 和弦图的组成部分

- **外圆弧（Outer Arcs）**：圆周上的弧段，代表各个分类或节点，弧段长度反映节点的总流量
- **连接弧（Chords）**：连接不同外圆弧的曲线，表示节点间的关系，弧线粗细表示流量大小
- **标签（Labels）**：标识各个节点的文字说明
- **颜色（Colors）**：用于区分不同的节点或流向

## 和弦图的应用场景

### 适合的场景

例子 1: **适合应用到流量关系展示**

下图展示了不同城市之间的人口流动情况，通过和弦图可以清晰地看到各城市间的双向流动关系。

| source（源城市） | target（目标城市） | value（流动人口） |
| ---------------- | ------------------ | ----------------- |
| 北京             | 上海               | 100,000           |
| 北京             | 广州               | 80,000            |
| 上海             | 北京               | 70,000            |
| 上海             | 广州               | 90,000            |
| 广州             | 深圳               | 120,000           |

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'chord',
  autoFit: true,
  data: {
    value: {
      links: [
        { source: '北京', target: '上海', value: 100 },
        { source: '北京', target: '广州', value: 80 },
        { source: '北京', target: '深圳', value: 60 },
        { source: '上海', target: '北京', value: 70 },
        { source: '上海', target: '广州', value: 90 },
        { source: '上海', target: '深圳', value: 50 },
        { source: '广州', target: '北京', value: 40 },
        { source: '广州', target: '上海', value: 85 },
        { source: '广州', target: '深圳', value: 120 },
        { source: '深圳', target: '北京', value: 35 },
        { source: '深圳', target: '上海', value: 45 },
        { source: '深圳', target: '广州', value: 110 },
      ],
    },
  },
  layout: { nodeWidthRatio: 0.05 },
  scale: {
    color: {
      type: 'ordinal',
      range: ['#5B8FF9', '#5AD8A6', '#F6BD16', '#E86452'],
    },
  },
  style: {
    labelFontSize: 12,
    labelFill: '#333',
    linkFillOpacity: 0.6,
  },
  tooltip: {
    items: [
      { field: 'source', name: '源城市' },
      { field: 'target', name: '目标城市' },
      { field: 'value', name: '流动人口' },
    ],
  },
  interaction: [
    {
      type: 'elementHighlight',
      background: true,
    },
  ],
});

chart.render();
```

例子 2: **展示软件依赖关系**

下图展示了软件包之间的依赖关系，每个节点表示一个独立的包，每条边展示了包与包之间的依赖关系。边的粗细表示依赖的强度。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'chord',
  autoFit: true,
  data: {
    value: {
      links: [
        { source: 'vis.core', target: 'vis.data', value: 85 },
        { source: 'vis.core', target: 'vis.event', value: 45 },
        { source: 'vis.core', target: 'vis.util', value: 120 },
        { source: 'vis.data', target: 'vis.core', value: 30 },
        { source: 'vis.data', target: 'vis.util', value: 60 },
        { source: 'vis.event', target: 'vis.core', value: 25 },
        { source: 'vis.event', target: 'vis.data', value: 40 },
        { source: 'vis.util', target: 'vis.core', value: 15 },
        { source: 'vis.render', target: 'vis.core', value: 95 },
        { source: 'vis.render', target: 'vis.util', value: 55 },
        { source: 'vis.layout', target: 'vis.core', value: 75 },
        { source: 'vis.layout', target: 'vis.util', value: 35 },
      ],
    },
  },
  layout: { nodeWidthRatio: 0.05 },
  scale: {
    color: {
      type: 'ordinal',
      range: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd'],
    },
  },
  style: {
    labelFontSize: 11,
    labelFill: '#333',
    linkFillOpacity: 0.6,
  },
  tooltip: {
    items: [
      { field: 'source', name: '依赖包' },
      { field: 'target', name: '目标包' },
      { field: 'value', name: '依赖强度' },
    ],
  },
  interaction: [
    {
      type: 'elementHighlight',
      background: true,
    },
  ],
});

chart.render();
```

**说明**：

- 节点表示不同的软件包模块
- 边的粗细表示依赖关系的强度
- 颜色用于区分不同的包，便于识别循环依赖

### 不适合的场景

例子 1: **节点过多导致可读性差**

当节点数量超过 15 个时，和弦图会变得拥挤难读，连接线重叠严重。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

// 模拟20个省份的数据，节点过多导致可读性差
const provinces = [
  '北京',
  '上海',
  '广州',
  '深圳',
  '杭州',
  '南京',
  '武汉',
  '成都',
  '西安',
  '重庆',
  '天津',
  '苏州',
  '青岛',
  '大连',
  '厦门',
  '宁波',
  '长沙',
  '郑州',
  '济南',
  '福州',
];

const data = [];
provinces.forEach((source, i) => {
  provinces.forEach((target, j) => {
    if (i !== j && Math.random() > 0.7) {
      data.push({
        source,
        target,
        value: Math.floor(Math.random() * 50) + 10,
      });
    }
  });
});

chart.options({
  type: 'chord',
  autoFit: true,
  data: {
    value: {
      links: data.slice(0, 40), // 只取前40条数据演示
    },
  },
  layout: { nodeWidthRatio: 0.05 },
  style: {
    labelFontSize: 8, // 字体变小以适应更多标签
    labelFill: '#666',
    linkFillOpacity: 0.5,
  },
});

chart.render();
```

例子 2: **不适合展示层次关系**

和弦图主要用于展示平等节点间的关系，不适合展示有明显层次结构的数据。

## 和弦图的扩展

### 自定义颜色和样式

下图展示了某个时段用户使用 Uber 软件在美国旧金山各个城市之间乘车交通的情况。图中的节点表示城市，节点大小表示了交通流量的多少，从图中可以看出，交通行为主要发生在几个主要城市之间。

<img alt="uber-traffic" src="https://zos.alipayobjects.com/rmsportal/IWssILKPItzzYdrsmclc.png" width=500 />

以下是使用自定义颜色和样式的和弦图示例：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'chord',
  autoFit: true,
  data: {
    value: {
      links: [
        { source: '中国', target: '美国', value: 4200 },
        { source: '中国', target: '日本', value: 3200 },
        { source: '中国', target: '韩国', value: 2800 },
        { source: '美国', target: '中国', value: 1200 },
        { source: '美国', target: '墨西哥', value: 6100 },
        { source: '日本', target: '中国', value: 1400 },
        { source: '日本', target: '韩国', value: 800 },
        { source: '韩国', target: '中国', value: 1100 },
      ],
    },
  },
  layout: { nodeWidthRatio: 0.05 },
  scale: {
    color: {
      type: 'ordinal',
      range: ['#5B8FF9', '#5AD8A6', '#F6BD16', '#E86452'],
    },
  },
  style: {
    labelFontSize: 14,
    labelFontWeight: 'bold',
    labelFill: '#000',
    linkFillOpacity: 0.7,
  },
  tooltip: {
    items: [
      { field: 'source', name: '出口国' },
      { field: 'target', name: '进口国' },
      { field: 'value', name: '贸易额（亿美元）' },
    ],
  },
  interaction: [
    {
      type: 'elementHighlight',
      background: true,
    },
  ],
});

chart.render();
```

## 和弦图与其他图表的对比

### 和弦图和雷达图

- 和弦图主要用于展示节点间的双向流动关系，强调连接和流量
- 雷达图主要用于多维度数据比较，通过多边形展示各维度的值

### 和弦图和面积图

- 和弦图通过圆形布局和连接弧展示关系网络，适合展示流动数据
- 面积图通过填充区域展示数值变化趋势，适合时间序列数据

## 相似图表

<code src="./demos/list-card.tsx"></code>

## 分类

<code src="./demos/list-category.tsx"></code>
