---
title: 打包图
order: 2
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*epG0TaxEVTsAAAAAAAAAAAAADmJ7AQ/original'
category: ['relation']
similar: ['treemap', 'sunburst']
---

<img alt="pack" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*epG0TaxEVTsAAAAAAAAAAAAADmJ7AQ/original" width=600/>

## 打包图的简介

打包图是一种树形层次结构的可视化图表，使用圆形（而非矩形）一层又一层地代表整个层次结构。每个圆圈代表层次结构中的一个节点，圆圈的大小与其数值成正比，包含关系通过圆圈的嵌套来表示。

打包图特别适合展示具有层级关系的数据，如组织架构、文件系统、软件包结构等。相比于传统的树形图，打包图通过圆形的嵌套关系更加直观地展示了数据的包含关系和数值比例，使得用户能够快速理解数据的层次结构和各部分的相对重要性。

当数据具有明显的层级结构且需要同时展示包含关系和数值大小时，打包图是一个很好的选择。它既能展示整体的层次结构，又能通过圆圈大小比较各节点的数值。

**英文名**：Circle Packing, Pack Chart

## 打包图的构成

| 图表类型         | 打包图                                                                             |
| ---------------- | ---------------------------------------------------------------------------------- |
| 适合的数据       | 层次化数据：具有树状结构的嵌套数据，包含分类字段和数值字段                         |
| 功能             | 展示层次化数据的包含关系和数值比例                                                 |
| 数据与图形的映射 | 层级关系映射到嵌套圆圈<br>数值大小映射到圆圈半径<br>不同层级通过颜色和嵌套关系区分 |
| 适合的场景       | 软件包结构、组织架构、文件系统等具有清晰层次和包含关系的数据展示                   |

## 打包图的应用场景

### 适合的场景

例子 1: **展示软件包层次结构**

下图展示了软件项目的模块层次结构，通过打包图可以清晰地看到各个模块和子模块的大小分布，帮助开发者了解代码结构。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';
import { interpolateHcl } from 'd3-interpolate';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
});

chart.options({
  type: 'pack',
  width: 800,
  height: 600,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/flare.json',
  },
  encode: {
    value: 'value',
    color: 'depth',
  },
  scale: {
    color: {
      domain: [0, 5],
      range: ['hsl(152,80%,80%)', 'hsl(228,30%,40%)'],
      interpolate: interpolateHcl,
    },
  },
  style: {
    labelText: (d) => (d.r >= 10 && d.height === 0 ? `${d.data.name}` : ''),
    labelFontSize: 8,
  },
  legend: { color: false },
  tooltip: {
    title: (d) => d.data.name,
    items: [{ field: 'value', name: '大小' }],
  },
});

chart.render();
```

**说明**：

- `value` 字段映射到圆圈大小，表示模块的代码量
- `depth` 字段映射到颜色，区分不同层级
- 通过 `labelText` 设置标签显示条件

例子 2: **展示组织架构人数分布**

打包图非常适合展示组织架构中各部门的人数分布，让管理者一目了然地看到各部门的规模。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
});

const orgData = {
  name: '公司',
  value: 500,
  children: [
    {
      name: '技术部',
      value: 200,
      children: [
        { name: '前端团队', value: 80 },
        { name: '后端团队', value: 90 },
        { name: '算法团队', value: 30 },
      ],
    },
    {
      name: '产品部',
      value: 120,
      children: [
        { name: '产品设计', value: 50 },
        { name: '用户研究', value: 30 },
        { name: '数据分析', value: 40 },
      ],
    },
    {
      name: '运营部',
      value: 100,
      children: [
        { name: '市场推广', value: 60 },
        { name: '客户服务', value: 40 },
      ],
    },
    {
      name: '行政部',
      value: 80,
      children: [
        { name: '人力资源', value: 30 },
        { name: '财务', value: 25 },
        { name: '法务', value: 25 },
      ],
    },
  ],
};

chart.options({
  type: 'pack',
  width: 700,
  height: 500,
  data: { value: orgData },
  layout: {
    padding: 8,
    sort: (a, b) => b.value - a.value,
  },
  encode: {
    value: 'value',
    color: 'depth',
  },
  scale: {
    color: {
      range: ['#E8F4FD', '#1890FF', '#003A8C'],
    },
  },
  labels: [
    {
      text: (d) => d.data.name,
      position: 'inside',
      fontWeight: (d) => (d.depth <= 1 ? 'bold' : 'normal'),
      fontSize: (d) => Math.max(8, Math.min(14, d.r / 3)),
      background: (d) => d.data.children, // 背景展示
      backgroundFill: '#fff',
      transform: [
        { type: 'contrastReverse' },
        { type: 'overflowStroke' },
        { type: 'overlapDodgeY', padding: 8 },
      ],
    },
  ],
  legend: { color: false },
  tooltip: {
    title: (d) => d.data.name,
    items: [{ field: 'value', name: '人数' }],
  },
});

chart.render();
```

**说明**：

- 使用嵌套数据结构表示组织层级
- `sort` 配置按数值大小排序，大圆圈优先显示
- 通过 `labelFontSize` 动态调整字体大小适应圆圈
- 使用不同的标签颜色区分层级

例子 3: **展示投资组合分布**

打包图可以清晰地展示投资组合中各资产类别及具体投资项目的占比关系。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
});

const portfolioData = {
  name: '投资组合',
  value: 1000000,
  children: [
    {
      name: '股票',
      value: 400000,
      children: [
        { name: '科技股', value: 180000 },
        { name: '金融股', value: 120000 },
        { name: '消费股', value: 100000 },
      ],
    },
    {
      name: '债券',
      value: 300000,
      children: [
        { name: '国债', value: 150000 },
        { name: '企业债', value: 100000 },
        { name: '可转债', value: 50000 },
      ],
    },
    {
      name: '基金',
      value: 200000,
      children: [
        { name: '股票型基金', value: 80000 },
        { name: '债券型基金', value: 70000 },
        { name: '混合型基金', value: 50000 },
      ],
    },
    {
      name: '现金',
      value: 100000,
    },
  ],
};

chart.options({
  type: 'pack',
  width: 600,
  height: 600,
  data: { value: portfolioData },
  layout: {
    padding: 3,
  },
  encode: {
    value: 'value',
    color: (d) => {
      const parentName =
        d.depth === 0 ? 'root' : d.parent?.data?.name || d.data.name;
      return parentName;
    },
  },
  scale: {
    color: {
      range: ['#FFF7E6', '#FFE7BA', '#FFC069', '#FA8C16', '#D46B08'],
    },
  },
  style: {
    labelText: (d) => {
      if (d.height === 0) return d.data.name;
      if (d.depth === 0) return '';
      return d.data.name;
    },
    labelFill: '#fff',
    labelFontWeight: 'bold',
    labelFontSize: (d) => Math.max(8, Math.min(12, d.r / 4)),
    stroke: '#fff',
    strokeWidth: 1,
    fillOpacity: 0.8,
    labelBackground: (d) => d.data.children, // 背景展示
    labelBackgroundFill: '#fff',
    labelTransform: [
      { type: 'contrastReverse' },
      { type: 'overflowStroke' },
      { type: 'overlapDodgeY', padding: 8 },
    ],
  },
  legend: { color: false },
  tooltip: {
    title: (d) => d.data.name,
    items: [
      {
        field: 'value',
        name: '金额',
        valueFormatter: (v) => `¥${(v / 10000).toFixed(1)}万`,
      },
    ],
  },
});

chart.render();
```

**说明**：

- 使用自定义颜色映射区分不同资产类别
- 通过 `fillOpacity` 设置透明度增强视觉效果
- 自定义 `valueFormatter` 格式化金额显示

## 打包图与其他图表的对比

### 打包图与[矩形树图](/charts/treemap)

打包图和矩形树图都能展示层次化数据，但具有不同的特征：

| 对比维度 | 打包图                       | 矩形树图                     |
| -------- | ---------------------------- | ---------------------------- |
| 视觉形式 | 圆形嵌套布局                 | 矩形嵌套布局                 |
| 空间利用 | 圆形边界，利用率较低         | 矩形填充，利用率高           |
| 比例感知 | 面积比较，但圆形判断相对困难 | 面积比较，矩形更易精确判断   |
| 层次展示 | 嵌套圆圈，包含关系直观       | 嵌套矩形，包含关系明确       |
| 美观性   | 圆形布局更加美观和谐         | 矩形布局简洁实用             |
| 适用场景 | 强调视觉美感和整体包含关系   | 强调精确的比例对比和空间效率 |

### 打包图与[旭日图](/charts/sunburst)

打包图和旭日图都使用圆形布局展示层次数据，但展现方式不同：

| 对比维度 | 打包图                   | 旭日图                       |
| -------- | ------------------------ | ---------------------------- |
| 布局方式 | 嵌套圆圈，内部包含       | 同心圆环，径向展开           |
| 数值映射 | 圆圈面积表示数值大小     | 扇形角度表示数值大小         |
| 层次关系 | 通过嵌套层级表示包含关系 | 通过径向距离表示层级深度     |
| 中心区域 | 根节点占据中心圆圈       | 中心可用于显示标题或交互     |
| 交互体验 | 点击节点下钻到子层级     | 点击扇形下钻，支持面包屑导航 |
| 适用场景 | 强调包含关系和整体结构   | 强调层级导航和比例分配       |

## 相似图表

<code src="./demos/list-card.tsx"></code>

## 分类

<code src="./demos/list-category.tsx"></code>
