---
title: 漏斗图
order: 10
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*bVErS5tN_goAAAAAAAAAAAAADmJ7AQ/original'
category: ['comparison']
similar: ['pyramid']
---


<img alt="funnel" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*bVErS5tN_goAAAAAAAAAAAAADmJ7AQ/original" width=600/>

## 漏斗图的简介

漏斗图是一种特殊的可视化图表，用于展示业务过程中数据在不同阶段的流转情况。它因形状类似漏斗而得名，从上到下依次展示各个阶段的数据量，通常上宽下窄，反映数据流失或转化的过程。

漏斗图特别适合用于可视化业务流程中的转化率，例如销售流程、用户注册流程或营销漏斗等。通过漏斗图，可以直观地观察到各个阶段的数据变化，识别出关键的转化环节或瓶颈。

漏斗图的每一层代表流程中的一个阶段，层的宽度或面积通常与该阶段的数据量成正比，从而清晰地反映出转化过程中的数据损失情况。

**英文名**：Funnel Chart, Funnel Diagram

## 漏斗图的构成

### 基础漏斗图

<img alt="basic-funnel" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*bVErS5tN_goAAAAAAAAAAAAADmJ7AQ/original" width=600 />

| 图表类型         | 基础漏斗图                                                                          |
| ---------------- | ----------------------------------------------------------------------------------- |
| 适合的数据       | 有序分类数据：表示流程各阶段的分类字段、每个阶段的数值字段                         |
| 功能             | 展示业务流程各阶段的数据流转和转化率                                               |
| 数据与图形的映射 | 分类字段映射到漏斗的各层<br>数值字段映射到漏斗各层的宽度或面积<br>颜色区分不同阶段 |
| 适合的场景       | 分析多阶段流程中的转化情况和流失节点                                               |

## 漏斗图的应用场景

### 适合的场景

例子 1: **适合展示销售流程的转化分析**

下图展示了销售漏斗中从获取潜在客户到最终成交的各个阶段转化情况。

| stage（阶段） | value（数量） |
| ------------- | ------------- |
| 访问         | 8043          |
| 咨询         | 2136          |
| 报价         | 908           |
| 议价         | 691           |
| 成交         | 527           |

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'funnel',
  data: [
    { stage: '访问', value: 8043 },
    { stage: '咨询', value: 2136 },
    { stage: '报价', value: 908 },
    { stage: '议价', value: 691 },
    { stage: '成交', value: 527 },
  ],
  encode: {
    y: 'stage',
    value: 'value',
    shape: 'funnel',
  },
  transform: [
    {
      type: 'symmetryY',
      coordinate: 'rect'
    },
  ],
  scale: {
    color: { 
      palette: 'spectral',
    },
  },
  style: {
    labelText: (d) => `${d.stage}: ${d.value}`,
  },
  legend: false,
});

chart.render();
```


**说明** ：

- `stage` 字段映射到漏斗的各个层级，表示销售流程的不同阶段
- `value` 字段映射到各层的宽度，直观展示了从漏斗顶部到底部的转化情况
- 通过漏斗形状，可以清晰地看出各阶段之间的转化率和流失情况

例子 2: **适合展示网站流量转化分析**

漏斗图可以有效地分析网站流量从访问到最终行为的转化过程，帮助识别用户流失的关键环节。

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'funnel',
  data: [
    { stage: '浏览首页', value: 100000, percent: '100%' },
    { stage: '搜索产品', value: 60000, percent: '60%' },
    { stage: '查看商品详情', value: 30000, percent: '30%' },
    { stage: '加入购物车', value: 10000, percent: '10%' },
    { stage: '完成购买', value: 5000, percent: '5%' },
  ],
  encode: {
    y: 'stage',
    value: 'value',
    color: 'stage',
  },
  style: {
    labelText: (d) => `${d.stage}: ${d.percent}`,
    labelPosition: 'right',
  },
  legend: false,
  scale: {
    color: { 
      palette: 'blues',
    },
  },
});

chart.render();
```

**说明**：
- 每一层代表网站流量转化的不同阶段
- 层的宽度反映了该阶段的用户数量
- 通过比较相邻层的差异，可以发现用户流失的主要环节
- 添加了转化百分比的标签，更直观地展示转化效果

例子 3: **对比漏斗图展示不同渠道的转化效果**

当需要比较不同渠道或时期的转化效果时，可以使用对比漏斗图进行分析。

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  data: [
    { stage: '访问', value: 8043, category: '渠道A' },
    { stage: '咨询', value: 2136, category: '渠道A' },
    { stage: '报价', value: 908, category: '渠道A' },
    { stage: '议价', value: 691, category: '渠道A' },
    { stage: '成交', value: 527, category: '渠道A' },
    { stage: '访问', value: 6841, category: '渠道B' },
    { stage: '咨询', value: 2761, category: '渠道B' },
    { stage: '报价', value: 1098, category: '渠道B' },
    { stage: '议价', value: 624, category: '渠道B' },
    { stage: '成交', value: 487, category: '渠道B' },
  ],
  axis: false,
  children: [
    {
      type: 'funnel',
      region: { start: { x: 0, y: 0 }, end: { x: 0.48, y: 1 } },
      transform: [{ type: 'filter', callback: (d) => d.category === '渠道A' }],
      encode: {
        y: 'stage',
        value: 'value',
        color: 'stage',
      },
      scale: {
        color: { palette: 'spectral' },
      },
      style: {
        labelText: (d) => `${d.value}`,
        labelPosition: 'left',
      },
      title: '渠道A',
    },
    {
      type: 'funnel',
      region: { start: { x: 0.52, y: 0 }, end: { x: 1, y: 1 } },
      transform: [{ type: 'filter', callback: (d) => d.category === '渠道B' }],
      encode: {
        y: 'stage',
        value: 'value',
        color: 'stage',
      },
      scale: {
        color: { palette: 'spectral' },
      },
      style: {
        labelText: (d) => `${d.value}`,
        labelPosition: 'right',
      },
      title: '渠道B',
    },
  ],
  legend: false,
});

chart.render();
```

**说明**：
- 左右并排展示两个渠道的转化漏斗，实现直观对比
- 通过相同的颜色编码对应相同的阶段，便于比较
- 可以清晰地观察到不同渠道在各个阶段的转化效率差异

### 不适合的场景

例子 1: **不适合展示无序或无明显层级关系的数据**

漏斗图的本质是展示有序流程的转化过程，如果数据没有明确的先后顺序或层级关系，使用漏斗图会造成误导。对于这类数据，柱状图或饼图可能是更合适的选择。

例子 2: **不适合展示各阶段数值波动或增长的数据**

漏斗图通常表达的是数据从多到少的递减过程。如果流程中存在某些阶段的数值大于前一阶段（例如营销活动导致用户数增加），使用传统漏斗图会显得不合适，此时可以考虑使用其他图表形式。

## 漏斗图的扩展

### 对称漏斗图

对称漏斗图可以更清晰地展示两个相关流程的对比，或者同一流程中的正负面因素对比。

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  data: [
    { stage: '获客', value: 3800, category: '实际' },
    { stage: '激活', value: 2600, category: '实际' },
    { stage: '留存', value: 1800, category: '实际' },
    { stage: '转化', value: 1000, category: '实际' },
    { stage: '获客', value: 4000, category: '目标' },
    { stage: '激活', value: 3000, category: '目标' },
    { stage: '留存', value: 2000, category: '目标' },
    { stage: '转化', value: 1200, category: '目标' },
  ],
  children: [
    {
      type: 'funnel',
      region: { start: { x: 0, y: 0 }, end: { x: 0.48, y: 1 } },
      transform: [
        { type: 'filter', callback: (d) => d.category === '实际' },
        { type: 'sortY', by: 'value', reverse: true },
      ],
      coordinate: { transform: [{ type: 'transpose' }, { type: 'mirror', direction: 'x' }] },
      encode: {
        x: 'stage',
        value: 'value',
        color: 'stage',
      },
      scale: {
        color: { palette: 'spectral' },
      },
      style: {
        labelText: (d) => `${d.value}`,
        labelPosition: 'inside',
      },
      title: '实际转化',
    },
    {
      type: 'funnel',
      region: { start: { x: 0.52, y: 0 }, end: { x: 1, y: 1 } },
      transform: [
        { type: 'filter', callback: (d) => d.category === '目标' },
        { type: 'sortY', by: 'value', reverse: true },
      ],
      coordinate: { transform: [{ type: 'transpose' }] },
      encode: {
        x: 'stage',
        value: 'value',
        color: 'stage',
      },
      scale: {
        color: { palette: 'spectral' },
      },
      style: {
        labelText: (d) => `${d.value}`,
        labelPosition: 'inside',
      },
      title: '目标转化',
    },
  ],
  legend: false,
  axis: false,
});

chart.render();
```

**说明**：
- 使用水平对称的布局展示实际转化与目标转化的对比
- 两侧使用相同的颜色编码和标签，便于对应比较
- 通过镜像变换实现左侧漏斗的反向展示

### 金字塔漏斗图

金字塔形漏斗图是一种变体，更适合展示层级结构或人口金字塔等数据。

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'funnel',
  data: [
    { age: '80+', male: -100, female: 150 },
    { age: '70-79', male: -200, female: 260 },
    { age: '60-69', male: -350, female: 380 },
    { age: '50-59', male: -500, female: 520 },
    { age: '40-49', male: -680, female: 700 },
    { age: '30-39', male: -820, female: 850 },
    { age: '20-29', male: -950, female: 1000 },
    { age: '10-19', male: -870, female: 900 },
    { age: '0-9', male: -600, female: 650 },
  ],
  coordinate: { transform: [{ type: 'transpose' }] },
  encode: {
    x: 'age',
    value: (d) => [Math.abs(d.male), d.female],
    color: (d, idx) => idx === 0 ? '男性' : '女性',
  },
  scale: {
    color: { range: ['#1890ff', '#f5222d'] },
  },
  style: {
    shape: 'pyramid',
    labelText: (d, idx) => `${idx === 0 ? Math.abs(d.male) : d.female}`,
    labelPosition: 'inside',
  },
  legend: {
    color: { position: 'top' },
  },
  axis: {
    y: { grid: true, title: false },
  },
});

chart.render();
```

**说明**：
- 横向展示的金字塔形状，适合人口结构等对称性数据
- 左右两侧展示不同类别（男性/女性）的数据
- 使用不同颜色区分两个方向的数据流
- 通过坐标轴转置实现水平展示

## 漏斗图与其他图表的对比

### 漏斗图和[柱状图](/charts/bar)

- 漏斗图强调的是流程转化和各阶段的连续关系
- 柱状图更适合直接比较不同类别间的数值大小
- 当需要详细分析流程转化时，漏斗图能提供更直观的视觉效果

### 漏斗图和[饼图](/charts/pie)

- 漏斗图展示的是有序流程中的各个阶段及其关系
- 饼图展示的是整体中各部分的占比关系，不强调顺序
- 当关注各阶段间的转化而非单纯的占比时，漏斗图是更好的选择

## 相似图表

<code src="./demos/list-card.tsx"></code>

## 分类

<code src="./demos/list-category.tsx"></code>