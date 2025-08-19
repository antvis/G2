---
title: 韦恩图
order: 2
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*uJF2T7anbQUAAAAAAAAAAAAADmJ7AQ/original'
category: ['relation']
similar: ['sunburst', 'treemap', 'sankey']
---

<img alt="venn" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*uJF2T7anbQUAAAAAAAAAAAAADmJ7AQ/original" width=600/>

## 韦恩图的简介

韦恩图是一种用圆形或其他封闭曲线来表示集合及其关系的图表，由英国数学家约翰·韦恩（John Venn）于 1880 年发明。韦恩图通过重叠的区域来显示不同集合之间的交集、并集和差集关系，是数据可视化中展示集合关系的经典图表类型。

韦恩图特别适合展示不同数据集合之间的关系，如用户群体的重叠关系、产品功能的交集、市场分析中的重叠用户等。通过直观的圆形区域和重叠部分，能够清晰地表达复杂的集合逻辑关系。

当需要分析多个群体或类别之间的共同点和差异时，韦恩图是一个非常有效的可视化工具。它能够帮助用户快速理解数据之间的包含、交叉和独立关系。

**英文名**：Venn Diagram

## 韦恩图的构成

### 基础韦恩图

<img alt="basic-venn" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*uJF2T7anbQUAAAAAAAAAAAAADmJ7AQ/original" width=600 />

| 图表类型         | 基础韦恩图                                                                   |
| ---------------- | ---------------------------------------------------------------------------- |
| 适合的数据       | 集合数据：包含集合名称、集合大小、交集关系的数据                             |
| 功能             | 展示不同集合之间的交集、并集和独立关系                                       |
| 数据与图形的映射 | 集合名称映射到圆形区域<br>集合大小映射到圆形面积<br>交集关系通过重叠区域表示 |
| 适合的场景       | 2-4 个集合的关系分析，用户群体分析，产品功能对比                             |

---

### 空心韦恩图

<img alt="hollow-venn" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*lAPPSaOWGXYAAAAAAAAAAAAADmJ7AQ/original" width=600/>

| 图表类型         | 空心韦恩图                                                               |
| ---------------- | ------------------------------------------------------------------------ |
| 适合的数据       | 集合数据：包含集合名称、集合大小、交集关系的数据                         |
| 功能             | 突出边界线条，减少色彩干扰，更清晰地展示集合边界                         |
| 数据与图形的映射 | 集合名称映射到圆形边界<br>集合大小映射到圆形面积<br>空心设计突出结构关系 |
| 适合的场景       | 需要强调集合边界的场景，黑白打印友好的展示                               |

## 韦恩图的应用场景

### 适合的场景

例子 1: **用户群体重叠分析**

下图展示了不同平台用户群体的重叠关系，帮助了解用户在多个平台之间的分布情况。

| 描述          | 集合                     | 用户数 |
| ------------- | ------------------------ | ------ |
| 仅使用微信    | ['微信']                 | 1200   |
| 仅使用微博    | ['微博']                 | 800    |
| 仅使用抖音    | ['抖音']                 | 1000   |
| 微信+微博用户 | ['微信', '微博']         | 300    |
| 微信+抖音用户 | ['微信', '抖音']         | 400    |
| 微博+抖音用户 | ['微博', '抖音']         | 200    |
| 三平台都使用  | ['微信', '微博', '抖音'] | 150    |

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'path',
  data: {
    type: 'inline',
    value: [
      { sets: ['微信'], size: 1200, label: '微信' },
      { sets: ['微博'], size: 800, label: '微博' },
      { sets: ['抖音'], size: 1000, label: '抖音' },
      { sets: ['微信', '微博'], size: 300, label: '微信&微博' },
      { sets: ['微信', '抖音'], size: 400, label: '微信&抖音' },
      { sets: ['微博', '抖音'], size: 200, label: '微博&抖音' },
      { sets: ['微信', '微博', '抖音'], size: 150 },
    ],
    transform: [
      {
        type: 'venn',
      },
    ],
  },
  encode: {
    d: 'path',
    color: 'key',
  },
  labels: [
    {
      position: 'inside',
      text: (d) => d.label || '',
    },
  ],
  style: {
    opacity: (d) => (d.sets.length > 1 ? 0.3 : 0.7),
  },
  state: {
    inactive: { opacity: 0.2 },
    active: { opacity: 0.9 },
  },
  interactions: [{ type: 'elementHighlight' }],
  legend: false,
});

chart.render();
```

**说明**：

- `sets` 字段定义集合关系，单个集合用一个元素，交集用多个元素
- `size` 字段映射到圆形面积大小，表示用户数量
- `padding` 参数控制画布内边距，避免图形被裁切
- 使用透明度区分单独集合和交集区域

例子 2: **产品功能对比分析**

韦恩图可以清晰地展示不同产品功能的重叠情况，帮助产品经理进行功能规划。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'path',
  data: {
    type: 'inline',
    value: [
      { sets: ['产品A'], size: 25, label: 'A' },
      { sets: ['产品B'], size: 20, label: 'B' },
      { sets: ['产品A', '产品B'], size: 15, label: '共同' },
    ],
    transform: [
      {
        type: 'venn',
      },
    ],
  },
  encode: {
    d: 'path',
    color: 'key',
  },
  labels: [
    {
      position: 'inside',
      text: (d) => d.label,
      style: {
        fontSize: 12,
        fontWeight: 'bold',
      },
      transform: [
        {
          type: 'overlapDodgeY',
        },
      ],
    },
  ],
  style: {
    fillOpacity: 0.6,
    stroke: '#fff',
    lineWidth: 2,
  },
  scale: {
    color: {
      range: ['#1890FF', '#52C41A', '#FF7A45'],
    },
  },
  tooltip: {
    items: [
      {
        name: '功能数量',
        field: 'size',
      },
      {
        name: '集合',
        field: 'key',
      },
    ],
  },
  legend: false,
});

chart.render();
```

**说明**：

- 使用自定义颜色方案突出不同产品的特色
- 添加边框线条增强视觉分离效果
- 配置详细的 tooltip 信息展示

例子 3: **技能重叠分析**

展示团队成员技能的重叠情况，帮助项目分工和团队建设。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'path',
  data: {
    type: 'inline',
    value: [
      { sets: ['前端'], size: 12, label: '前端' },
      { sets: ['后端'], size: 15, label: '后端' },
      { sets: ['设计'], size: 8, label: '设计' },
      { sets: ['前端', '后端'], size: 5, label: '全栈' },
      { sets: ['前端', '设计'], size: 3, label: '前端+设计' },
      { sets: ['后端', '设计'], size: 2, label: '后端+设计' },
      { sets: ['前端', '后端', '设计'], size: 1, label: '全能' },
    ],
    transform: [
      {
        type: 'venn',
        padding: 15,
      },
    ],
  },
  encode: {
    d: 'path',
    color: 'key',
  },
  labels: [
    {
      position: 'inside',
      text: (d) => `${d.label}\n(${d.size}人)`,
      style: {
        fontSize: 10,
        textAlign: 'center',
      },
      transform: [
        {
          type: 'overlapDodgeY',
        },
      ],
    },
  ],
  style: {
    fillOpacity: 0.5,
  },
  interactions: [{ type: 'elementHighlight' }],
  legend: {
    color: {
      position: 'bottom',
      layout: { justifyContent: 'center' },
    },
  },
});

chart.render();
```

**说明**：

- 在标签中同时显示技能类型和人数
- 使用交互高亮效果增强用户体验
- 适当的透明度设置便于查看重叠区域

### 不适合的场景

例子 1: **集合数量过多时不适合使用韦恩图**

当集合数量超过 4 个时，韦恩图会变得过于复杂，重叠关系难以清晰表达。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

// 5个集合的韦恩图 - 不推荐
chart.options({
  type: 'path',
  data: {
    type: 'inline',
    value: [
      { sets: ['A'], size: 10, label: 'A' },
      { sets: ['B'], size: 10, label: 'B' },
      { sets: ['C'], size: 10, label: 'C' },
      { sets: ['D'], size: 10, label: 'D' },
      { sets: ['E'], size: 10, label: 'E' },
      { sets: ['A', 'B'], size: 3 },
      { sets: ['A', 'C'], size: 3 },
      { sets: ['A', 'D'], size: 3 },
      { sets: ['B', 'C'], size: 3 },
      { sets: ['B', 'D'], size: 3 },
      { sets: ['C', 'D'], size: 3 },
      { sets: ['A', 'B', 'C'], size: 1 },
      { sets: ['A', 'B', 'D'], size: 1 },
      { sets: ['A', 'C', 'D'], size: 1 },
      { sets: ['B', 'C', 'D'], size: 1 },
    ],
    transform: [
      {
        type: 'venn',
        padding: 10,
      },
    ],
  },
  encode: {
    d: 'path',
    color: 'key',
  },
  labels: [
    {
      position: 'inside',
      text: (d) => d.label || '',
    },
  ],
  style: {
    fillOpacity: 0.4,
  },
  legend: false,
});

chart.render();
```

**说明**：上图中 5 个集合产生了过多的重叠区域，视觉上混乱难读。此种情况下，推荐使用[旭日图](/charts/sunburst)或[桑基图](/charts/sankey)。

例子 2: **数据差异极大时不适合使用韦恩图**

当集合大小差异极大时，小集合可能无法清晰显示。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'path',
  data: {
    type: 'inline',
    value: [
      { sets: ['大型企业'], size: 10000, label: '大型企业' },
      { sets: ['中型企业'], size: 1000, label: '中型企业' },
      { sets: ['小型企业'], size: 100, label: '小型企业' },
      { sets: ['大型企业', '中型企业'], size: 200 },
      { sets: ['中型企业', '小型企业'], size: 50 },
      { sets: ['大型企业', '小型企业'], size: 10 },
    ],
    transform: [
      {
        type: 'venn',
        padding: 10,
      },
    ],
  },
  encode: {
    d: 'path',
    color: 'key',
  },
  labels: [
    {
      position: 'inside',
      text: (d) => d.label || '',
    },
  ],
  style: {
    fillOpacity: 0.6,
  },
  legend: false,
});

chart.render();
```

**说明**：上图中小型企业的圆形区域过小，难以清晰展示。此时建议使用[树图](/charts/treemap)或将数据进行归一化处理。

## 韦恩图的扩展

### 空心韦恩图

空心韦恩图通过去除填充色，仅保留边框线条，适合需要突出边界关系的场景。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'path',
  data: {
    type: 'inline',
    value: [
      { sets: ['iOS'], size: 15, label: 'iOS用户' },
      { sets: ['Android'], size: 12, label: 'Android用户' },
      { sets: ['Web'], size: 10, label: 'Web用户' },
      { sets: ['iOS', 'Android'], size: 2, label: '双端用户' },
      { sets: ['iOS', 'Web'], size: 2, label: 'iOS+Web' },
      { sets: ['Android', 'Web'], size: 1, label: 'Android+Web' },
      { sets: ['iOS', 'Android', 'Web'], size: 1 },
    ],
    transform: [
      {
        type: 'venn',
        padding: 10,
      },
    ],
  },
  encode: {
    d: 'path',
    color: 'key',
    shape: 'hollow',
  },
  labels: [
    {
      position: 'inside',
      text: (d) => d.label || '',
      fill: '#000',
      style: {
        fontSize: 11,
      },
    },
  ],
  style: {
    opacity: 0.8,
    lineWidth: 3,
  },
  tooltip: false,
});

chart.render();
```

**说明**：

- 使用 `shape: 'hollow'` 创建空心效果
- 适合黑白打印和需要突出结构的场景
- 标签颜色设置为黑色以确保可读性

### 自定义样式的韦恩图

通过自定义颜色和样式，创建更具品牌特色的韦恩图。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'path',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/lastfm.json',
    transform: [
      {
        type: 'venn',
        padding: 12,
        sets: 'sets',
        size: 'size',
        as: ['key', 'path'],
      },
    ],
  },
  encode: {
    d: 'path',
    color: 'key',
  },
  labels: [
    {
      position: 'inside',
      text: (d) => d.label || '',
      style: {
        fontSize: 12,
        fontWeight: 'bold',
      },
      transform: [{ type: 'contrastReverse' }],
    },
  ],
  style: {
    opacity: (d) => (d.sets.length > 1 ? 0.4 : 0.7),
    stroke: '#fff',
    lineWidth: 2,
  },
  scale: {
    color: {
      range: ['#667eea', '#764ba2', '#f093fb'],
    },
  },
  state: {
    inactive: { opacity: 0.1 },
    active: { opacity: 0.9 },
  },
  interactions: [{ type: 'elementHighlight' }],
  legend: false,
});

chart.render();
```

**说明**：

- 使用渐变色彩方案提升视觉效果
- 添加白色边框增强区域分离
- 交互状态配置提升用户体验

## 韦恩图与其他图表的对比

### 韦恩图与[旭日图](/charts/sunburst)

- 韦恩图适合展示集合的交集关系，突出重叠部分
- 旭日图适合展示层次结构和分类关系，突出包含关系

### 韦恩图与[桑基图](/charts/sankey)

- 韦恩图展示静态的集合关系，适合分析现状
- 桑基图展示流动关系，适合分析数据的流向和转化

### 韦恩图与[树图](/charts/treemap)

- 韦恩图强调集合的重叠关系，适合关系分析
- 树图强调层次结构和占比关系，适合结构分析

## 相似图表

<code src="./demos/list-card.tsx"></code>

## 分类

<code src="./demos/list-category.tsx"></code>
