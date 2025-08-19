---
title: 矩形树图
order: 2
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*BD2zQIr7D5MAAAAAAAAAAAAADmJ7AQ/original'
category: ['comparison', 'proportion', 'relation']
similar: ['sunburst', 'pie', 'donut-chart']
---

<img alt="treemap" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*BD2zQIr7D5MAAAAAAAAAAAAADmJ7AQ/original" width=600/>

## 矩形树图的简介

矩形树图是一种用于展示层次化数据的可视化图表，通过一系列嵌套的矩形来表示树状结构的数据。每个矩形的面积大小与其对应的数值成正比，颜色通常用来区分不同的类别或层级。矩形树图将树形数据结构转化为平面空间的矩形填充，能够直观地展示数据的层次关系和数值比例。

矩形树图特别适合展示具有层级关系的大量数据，如文件系统、组织架构、预算分配、股票市场等。相比传统的树形结构图，矩形树图能更有效地利用空间，并且具有展示占比功能，使得用户能够快速理解数据的分布和重要性。

矩形树图还支持交互式下钻功能，用户可以点击某个矩形区域来查看该层级的详细子项，这使得它成为数据探索和分析的强大工具。

**英文名**：Treemap

## 矩形树图的构成

<img alt="basic-treemap" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*BD2zQIr7D5MAAAAAAAAAAAAADmJ7AQ/original" width=600 />

| 图表类型         | 矩形树图                                                                           |
| ---------------- | ---------------------------------------------------------------------------------- |
| 适合的数据       | 层次化数据：具有树状结构的嵌套数据，包含分类字段和数值字段                         |
| 功能             | 展示层次化数据的比例关系和分布情况                                                 |
| 数据与图形的映射 | 层级关系映射到嵌套矩形<br>数值大小映射到矩形面积<br>不同类别通过颜色和位置进行区分 |
| 适合的场景       | 文件系统、组织架构、预算分配、股票组合等具有清晰层次关系的数据展示                 |

## 矩形树图的应用场景

### 适合的场景

例子 1: **展示文件系统结构**

下图展示了软件项目文件系统的层次结构，通过矩形树图可以清晰地看到各个模块和文件的大小分布，帮助开发者了解代码结构。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
});

chart.options({
  type: 'treemap',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/flare-treemap.json',
  },
  layout: {
    path: (d) => d.name.replace(/\./g, '/'),
    tile: 'treemapBinary',
    paddingInner: 1,
  },
  encode: {
    value: 'size',
    color: (d) => d.parent?.data.name.split('.')[1] || 'root',
  },
  style: {
    labelText: (d) => {
      const name = d.data.name
        .split('.')
        .pop()
        .split(/(?=[A-Z][a-z])/g)[0];
      return name;
    },
    labelFill: '#000',
    labelPosition: 'top-left',
    labelDx: 3,
    labelDy: 3,
    fillOpacity: 0.7,
  },
  tooltip: {
    title: (d) => d.path?.join?.('.') || d.data.name,
    items: [{ field: 'value', name: '大小' }],
  },
});

chart.render();
```

**说明**：

- 使用 `path` 配置将扁平化数据转换为层次结构
- `layout.tile` 设置为 `treemapBinary` 使用二分布局算法
- `paddingInner` 设置矩形间的内边距，增强视觉分离效果

例子 2: **展示预算分配情况**

矩形树图非常适合展示预算在不同项目和子项目之间的分配情况，帮助管理者快速了解资源配置。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
});

const budgetData = {
  name: '年度预算',
  children: [
    {
      name: '研发部门',
      children: [
        { name: '前端开发', value: 1200 },
        { name: '后端开发', value: 1500 },
        { name: '测试', value: 800 },
        { name: '设计', value: 600 },
      ],
    },
    {
      name: '市场部门',
      children: [
        { name: '广告投放', value: 2000 },
        { name: '活动策划', value: 800 },
        { name: '内容营销', value: 500 },
      ],
    },
    {
      name: '运营部门',
      children: [
        { name: '客户服务', value: 700 },
        { name: '数据分析', value: 400 },
        { name: '运营支持', value: 300 },
      ],
    },
    { name: '其他支出', value: 1200 },
  ],
};

chart.options({
  type: 'treemap',
  data: { value: budgetData },
  layout: {
    tile: 'treemapSquarify',
    paddingInner: 2,
  },
  encode: {
    value: 'value',
    color: (d) => d.path[1] || d.data.name,
  },
  style: {
    labelText: (d) => d.data.name,
    labelFill: '#fff',
    labelStroke: '#000',
    labelLineWidth: 0.5,
    labelFontSize: 12,
  },
  tooltip: {
    title: (d) => d.data.name,
    items: [
      { field: 'value', name: '预算', valueFormatter: (v) => `${v}万元` },
    ],
  },
});

chart.render();
```

**说明**：

- 使用层级结构数据，不需要配置 `path`
- `tile: 'treemapSquarify'` 使用黄金比例算法，产生更接近正方形的矩形
- 通过 `labelPosition: 'center'` 将标签居中显示

例子 3: **展示销售数据层次**

矩形树图可以有效展示销售数据的多层级结构，从地区到产品类别再到具体产品。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
});

const salesData = {
  name: '全国销售',
  children: [
    {
      name: '华东地区',
      children: [
        {
          name: '数码产品',
          children: [
            { name: '手机', value: 3200 },
            { name: '电脑', value: 2800 },
            { name: '平板', value: 1500 },
          ],
        },
        {
          name: '家电',
          children: [
            { name: '冰箱', value: 2100 },
            { name: '洗衣机', value: 1800 },
            { name: '空调', value: 2500 },
          ],
        },
      ],
    },
    {
      name: '华北地区',
      children: [
        {
          name: '数码产品',
          children: [
            { name: '手机', value: 2800 },
            { name: '电脑', value: 2400 },
            { name: '平板', value: 1200 },
          ],
        },
        {
          name: '家电',
          children: [
            { name: '冰箱', value: 1900 },
            { name: '洗衣机', value: 1600 },
            { name: '空调', value: 2200 },
          ],
        },
      ],
    },
    {
      name: '华南地区',
      children: [
        { name: '数码产品', value: 2200 },
        { name: '家电', value: 1800 },
      ],
    },
  ],
};

chart.options({
  type: 'treemap',
  data: { value: salesData },
  layout: {
    tile: 'treemapSliceDice',
    paddingInner: 3,
    layer: 2, // 只显示前两层
  },
  encode: {
    value: 'value',
    color: (d) => d.path[1] || 'default',
  },
  style: {
    labelText: (d) => {
      const name = d.data.name;
      const value = d.value;
      return d.depth <= 1 ? `${name}\n${Math.round(value)}万` : name;
    },
    labelFill: '#000',
    labelFontSize: (d) =>
      Math.max(10, Math.min(16, Math.sqrt(d.x1 - d.x0) * 2)),
    stroke: '#fff',
    lineWidth: 2,
  },
  interaction: {
    treemapDrillDown: {
      breadCrumbY: 12,
      activeFill: '#873bf4',
      breadCrumbFill: 'rgba(0, 0, 0, 0.85)',
      breadCrumbFontSize: 12,
    },
  },
  legend: false,
});

chart.render();
```

### 不适合的场景

例子 1: **数值差异极小的数据对比**

当数据中各项目的数值差异很小时，矩形树图的面积差异不明显，用户难以感知到数值的细微差别。

```js | ob { inject: true, pin: false }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
});

// 数值差异很小的数据
const similarData = {
  name: '地区销售（相似数值）',
  children: [
    { name: '北京', value: 9995 },
    { name: '上海', value: 10001 },
    { name: '广州', value: 9999 },
    { name: '深圳', value: 10003 },
    { name: '杭州', value: 9997 },
    { name: '南京', value: 10002 },
  ],
};

chart.options({
  type: 'treemap',
  data: { value: similarData },
  encode: { value: 'value' },
  style: {
    labelText: (d) => `${d.data.name}\n${d.value}`,
    labelFill: '#000',
  },
});

chart.render();
```

**柱状图（推荐）**

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
});

const similarDataFlat = [
  { name: '北京', value: 9995 },
  { name: '上海', value: 10001 },
  { name: '广州', value: 9999 },
  { name: '深圳', value: 10003 },
  { name: '杭州', value: 9997 },
  { name: '南京', value: 10002 },
];

chart.options({
  type: 'interval',
  data: similarDataFlat,
  encode: { x: 'name', y: 'value', color: 'name' },
  axis: {
    y: { nice: false, domain: [9990, 10010] }, // 缩小Y轴范围突出差异
  },
});

chart.render();
```

**说明**：当数据值差异小于 5% 时，矩形树图的面积差异几乎不可感知，此时建议使用柱状图并调整 Y 轴范围来突出差异。

例子 2: **非层次化的简单分类数据**

对于没有层次关系的简单分类数据，矩形树图会显得过于复杂，不如饼图或柱状图直观。

```js | ob { inject: true, pin: false }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
});

// 简单的分类数据，没有层次关系
const simpleData = {
  name: '产品销量',
  children: [
    { name: '产品A', value: 230 },
    { name: '产品B', value: 180 },
    { name: '产品C', value: 150 },
    { name: '产品D', value: 120 },
  ],
};

chart.options({
  type: 'treemap',
  data: { value: simpleData },
  encode: { value: 'value' },
  style: {
    labelText: (d) => d.data.name,
    labelFill: '#000',
  },
});

chart.render();
```

**饼图（推荐）**

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
});

const simpleDataFlat = [
  { name: '产品A', value: 230 },
  { name: '产品B', value: 180 },
  { name: '产品C', value: 150 },
  { name: '产品D', value: 120 },
];

chart.options({
  type: 'interval',
  data: simpleDataFlat,
  encode: { y: 'value', color: 'name' },
  transform: [{ type: 'stackY' }],
  coordinate: { type: 'theta' },
  legend: {
    color: { position: 'right' },
  },
});

chart.render();
```

**说明**：对于简单的分类占比数据，饼图能更直观地展示各部分在整体中的比例关系。

## 矩形树图的扩展用法

### 带下钻交互的矩形树图

矩形树图最强大的功能之一是支持下钻交互，用户可以点击某个区域来深入查看该层级的详细信息：

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
});

const drillDownData = {
  name: '商品',
  children: [
    {
      name: '文具',
      children: [
        {
          name: '笔类',
          children: [
            { name: '铅笔', value: 430 },
            { name: '圆珠笔', value: 530 },
            { name: '钢笔', value: 80 },
            { name: '水彩笔', value: 130 },
          ],
        },
        { name: '笔记本', value: 160 },
        { name: '文件夹', value: 90 },
        { name: '其他', value: 80 },
      ],
    },
    {
      name: '零食',
      children: [
        { name: '饼干', value: 280 },
        { name: '辣条', value: 150 },
        { name: '糖果', value: 210 },
        {
          name: '饮品',
          children: [
            { name: '可乐', value: 122 },
            { name: '矿泉水', value: 244 },
            { name: '果汁', value: 49 },
            { name: '牛奶', value: 82 },
          ],
        },
        { name: '其他', value: 40 },
      ],
    },
    { name: '其他商品', value: 450 },
  ],
};

chart.options({
  type: 'treemap',
  data: { value: drillDownData },
  layout: {
    tile: 'treemapBinary',
    paddingInner: 5,
  },
  encode: { value: 'value' },
  style: {
    labelFill: '#000',
    labelStroke: '#fff',
    labelLineWidth: 1.5,
    labelFontSize: 14,
    labelPosition: 'top-left',
    labelDx: 5,
    labelDy: 5,
  },
  interaction: {
    treemapDrillDown: {
      breadCrumbY: 12,
      activeFill: '#873bf4',
      breadCrumbFill: 'rgba(0, 0, 0, 0.85)',
      breadCrumbFontSize: 12,
    },
  },
  tooltip: {
    title: (d) => d.data.name,
    items: [{ field: 'value', name: '数量' }],
  },
});

chart.render();
```

### 自定义样式的矩形树图

通过丰富的样式配置，可以创建个性化的矩形树图：

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
});

const customData = {
  name: '技术栈',
  children: [
    {
      name: '前端',
      children: [
        { name: 'React', value: 45 },
        { name: 'Vue', value: 35 },
        { name: 'Angular', value: 20 },
      ],
    },
    {
      name: '后端',
      children: [
        { name: 'Node.js', value: 40 },
        { name: 'Python', value: 35 },
        { name: 'Java', value: 25 },
      ],
    },
    {
      name: '数据库',
      children: [
        { name: 'MySQL', value: 50 },
        { name: 'MongoDB', value: 30 },
        { name: 'Redis', value: 20 },
      ],
    },
  ],
};

chart.options({
  type: 'treemap',
  data: { value: customData },
  layout: {
    tile: 'treemapResquarify',
    paddingInner: 4,
    paddingOuter: 2,
  },
  encode: {
    value: 'value',
    color: (d) => d.path[1] || 'default',
  },
  scale: {
    color: {
      range: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'],
    },
  },
  style: {
    labelText: (d) => d.data.name,
    labelFill: '#fff',
    labelStroke: '#000',
    labelLineWidth: 1,
    labelFontSize: (d) => Math.max(10, Math.min(18, (d.x1 - d.x0) * 0.1)),
    labelFontWeight: 'bold',
    stroke: '#fff',
    lineWidth: 3,
    radius: 4, // 圆角
    fillOpacity: 0.9,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowBlur: 4,
    shadowOffsetX: 2,
    shadowOffsetY: 2,
  },
  interaction: [
    {
      type: 'elementHighlight',
    },
  ],
});

chart.render();
```

### 带渐变色的矩形树图

通过渐变色可以增强矩形树图的视觉效果：

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
});

const gradientData = {
  name: '市场份额',
  children: [
    { name: '阿里巴巴', value: 28 },
    { name: '腾讯', value: 25 },
    { name: '字节跳动', value: 18 },
    { name: '美团', value: 15 },
    { name: '京东', value: 12 },
    { name: '百度', value: 10 },
    { name: '网易', value: 8 },
    { name: '小米', value: 7 },
    { name: '滴滴', value: 6 },
    { name: '拼多多', value: 5 },
    { name: '新浪', value: 4 },
    { name: '搜狐', value: 3 },
    { name: '360', value: 2 },
    { name: '其他', value: 7 },
  ],
};

chart.options({
  type: 'treemap',
  data: { value: gradientData },
  layout: {
    tile: 'treemapSquarify',
    paddingInner: 3,
  },
  encode: {
    value: 'value',
    color: 'value',
  },
  scale: {
    color: {
      type: 'sequential',
      range: ['#E8F4FD', '#1890FF'],
    },
  },
  style: {
    labelText: (d) => `${d.data.name}\n${d.value}%`,
    labelFill: (d) => (d.value > 20 ? '#fff' : '#000'),
    labelFontSize: 14,
    labelFontWeight: 'bold',
    stroke: '#fff',
    lineWidth: 2,
  },
  tooltip: {
    title: (d) => d.data.name,
    items: [
      { field: 'value', name: '市场份额', valueFormatter: (v) => `${v}%` },
    ],
  },
});

chart.render();
```

## 矩形树图与其他图表的对比

### 矩形树图和[旭日图](/charts/sunburst)

矩形树图和旭日图都可以展示层次化数据，但有不同的特点：

| 对比维度 | 矩形树图               | 旭日图                 |
| -------- | ---------------------- | ---------------------- |
| 视觉形式 | 矩形布局               | 圆形布局               |
| 空间利用 | 矩形填充，利用率高     | 圆形边界，利用率较低   |
| 比例感知 | 面积比较，更准确       | 角度比较，适中         |
| 层次展示 | 嵌套矩形，包含关系明确 | 同心圆，层次关系清晰   |
| 适用场景 | 强调精确的比例对比     | 强调层次关系和整体结构 |

### 矩形树图和[饼图](/charts/pie)

矩形树图相比饼图的优势：

- **层次化数据**：矩形树图可以展示多层级数据，而饼图只能展示单层级
- **空间利用**：矩形树图能更有效利用空间，展示更多信息
- **精确比较**：矩形面积比角度更容易进行精确比较
- **交互性**：支持下钻交互，可以逐层探索数据

饼图的优势：

- **整体感知**：更好地展示各部分与整体的关系
- **简洁性**：对于简单分类数据更清晰易懂

## 相似图表

<code src="./demos/list-card.tsx"></code>

## 分类

<code src="./demos/list-category.tsx"></code>
