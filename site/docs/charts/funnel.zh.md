---
title: 漏斗图
order: 10
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*9GDLQpMor0oAAAAAAAAAAAAADmJ7AQ/original'
category: ['comparison', 'flow']
similar: ['sankey']
---

<img alt="funnel" src="https://os.alipayobjects.com/rmsportal/eArJFAYwiiFeJpk.png" width=600/>

## 漏斗图的简介

漏斗图是一种特殊的可视化图表，用于展示业务过程中数据在不同阶段的流转情况。它因形状类似漏斗而得名，从上到下依次展示各个阶段的数据量，通常上宽下窄，反映数据流失或转化的过程。

漏斗图特别适合用于可视化业务流程中的转化率，例如销售流程、用户注册流程或营销漏斗等。通过漏斗图，可以直观地观察到各个阶段的数据变化，识别出关键的转化环节或瓶颈。

漏斗图的每一层代表流程中的一个阶段，层的宽度或面积通常与该阶段的数据量成正比，从而清晰地反映出转化过程中的数据损失情况。

**英文名**：Funnel Chart, Funnel Diagram

## 漏斗图的构成

### 基础漏斗图

<img alt="basic-funnel" src="https://os.alipayobjects.com/rmsportal/eArJFAYwiiFeJpk.png" width=600 />

| 图表类型         | 基础漏斗图                                                                         |
| ---------------- | ---------------------------------------------------------------------------------- |
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
| 访问          | 8043          |
| 咨询          | 2136          |
| 报价          | 908           |
| 议价          | 691           |
| 成交          | 527           |

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  data: [
    { stage: '访问', value: 8043 },
    { stage: '咨询', value: 2136 },
    { stage: '报价', value: 908 },
    { stage: '议价', value: 691 },
    { stage: '成交', value: 527 },
  ],
  encode: {
    x: 'stage',
    y: 'value',
    color: 'stage',
    shape: 'funnel',
  },
  coordinate: { transform: [{ type: 'transpose' }] },
  transform: [
    {
      type: 'symmetryY',
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
  animate: { enter: { type: 'fadeIn' } },
  axis: false,
  labels: [
    {
      text: (d) => `${d.stage}\n${d.value}`,
      position: 'inside',
      transform: [{ type: 'contrastReverse' }],
    },
  ],
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

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  data: [
    { stage: '浏览首页', value: 100000, percent: '100%' },
    { stage: '搜索产品', value: 60000, percent: '60%' },
    { stage: '查看商品详情', value: 30000, percent: '30%' },
    { stage: '加入购物车', value: 10000, percent: '10%' },
    { stage: '完成购买', value: 5000, percent: '5%' },
  ],
  encode: {
    x: 'stage',
    y: 'value',
    color: 'stage',
    shape: 'funnel',
  },
  coordinate: { transform: [{ type: 'transpose' }] },
  transform: [
    {
      type: 'symmetryY',
    },
  ],
  scale: {
    color: {
      palette: 'blues',
    },
  },
  style: {
    labelText: (d) => `${d.stage}: ${d.percent}`,
  },
  animate: { enter: { type: 'fadeIn' } },
  axis: false,
  labels: [
    {
      text: (d) => `${d.stage}\n${d.percent}`,
      position: 'inside',
      transform: [{ type: 'contrastReverse' }],
    },
  ],
  legend: false,
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

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
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
      type: 'interval',
      region: { start: { x: 0, y: 0 }, end: { x: 0.48, y: 1 } },
      transform: [{ type: 'filter', callback: (d) => d.category === '渠道A' }],
      encode: {
        x: 'stage',
        y: 'value',
        color: 'stage',
        shape: 'funnel',
      },
      coordinate: { transform: [{ type: 'transpose' }] },
      transform: [
        {
          type: 'symmetryY',
        },
      ],
      scale: {
        color: { palette: 'spectral' },
      },
      style: {
        labelText: (d) => `${d.value}`,
      },
      animate: { enter: { type: 'fadeIn' } },
      axis: false,
      labels: [
        {
          text: (d) => `${d.value}`,
          position: 'inside',
          transform: [{ type: 'contrastReverse' }],
        },
      ],
      title: '渠道A',
    },
    {
      type: 'interval',
      region: { start: { x: 0.52, y: 0 }, end: { x: 1, y: 1 } },
      transform: [{ type: 'filter', callback: (d) => d.category === '渠道B' }],
      encode: {
        x: 'stage',
        y: 'value',
        color: 'stage',
        shape: 'funnel',
      },
      coordinate: { transform: [{ type: 'transpose' }] },
      transform: [
        {
          type: 'symmetryY',
        },
      ],
      scale: {
        color: { palette: 'spectral' },
      },
      style: {
        labelText: (d) => `${d.value}`,
      },
      animate: { enter: { type: 'fadeIn' } },
      axis: false,
      labels: [
        {
          text: (d) => `${d.value}`,
          position: 'inside',
          transform: [{ type: 'contrastReverse' }],
        },
      ],
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

### 对比漏斗图

对比漏斗图可以更清晰地展示两个不同流程或实体的转化效果对比，帮助识别不同方案之间的差异和优劣。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'view',
  autoFit: true,
  data: [
    { action: '访问', visitor: 500, site: '站点1' },
    { action: '浏览', visitor: 400, site: '站点1' },
    { action: '交互', visitor: 300, site: '站点1' },
    { action: '下单', visitor: 200, site: '站点1' },
    { action: '完成', visitor: 100, site: '站点1' },
    { action: '访问', visitor: 550, site: '站点2' },
    { action: '浏览', visitor: 420, site: '站点2' },
    { action: '交互', visitor: 280, site: '站点2' },
    { action: '下单', visitor: 150, site: '站点2' },
    { action: '完成', visitor: 80, site: '站点2' },
  ],
  scale: {
    x: { padding: 0 },
    color: { range: ['#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF'] },
  },
  coordinate: { transform: [{ type: 'transpose' }] },
  axis: false,
  children: [
    {
      type: 'interval',
      data: {
        transform: [{ type: 'filter', callback: (d) => d.site === '站点1' }],
      },
      encode: { x: 'action', y: 'visitor', color: 'action', shape: 'funnel' },
      style: { stroke: '#FFF' },
      animate: { enter: { type: 'fadeIn' } },
      labels: [
        {
          text: 'visitor',
          position: 'inside',
          transform: [{ type: 'contrastReverse' }],
        },
        {
          text: 'action',
          position: 'right',
          dx: (d) => {
            return d.action === '完成' ? 48 : 16;
          },
        },
      ],
    },
    {
      type: 'interval',
      data: {
        transform: [{ type: 'filter', callback: (d) => d.site === '站点2' }],
      },
      encode: {
        x: 'action',
        y: (d) => -d.visitor,
        color: 'action',
        shape: 'funnel',
      },
      style: { stroke: '#FFF' },
      animate: { enter: { type: 'fadeIn' } },
      labels: [
        {
          text: 'visitor',
          position: 'inside',
          transform: [{ type: 'contrastReverse' }],
        },
      ],
    },
  ],
});

chart.render();
```

**说明**：

- 使用水平对比的布局展示两个站点的转化漏斗效果
- 上下两个漏斗分别展示不同站点的数据，便于直观对比
- 通过 y 轴负值变换实现下方漏斗的反向展示，形成镜像对比效果
- 相同的颜色编码和标签配置确保对比的一致性

### 金字塔漏斗图

金字塔形漏斗图是一种变体，通过对称的金字塔形状展示转化流程，能够更突出各阶段的转化率变化。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'interval',
  autoFit: true,
  paddingRight: 80,
  data: {
    type: 'inline',
    value: [
      { action: '浏览网站', pv: 50000 },
      { action: '放入购物车', pv: 35000 },
      { action: '生成订单', pv: 25000 },
      { action: '支付订单', pv: 15000 },
      { action: '完成交易', pv: 8000 },
    ],
    transform: [
      {
        type: 'custom',
        callback: (data) =>
          data.map((d) => ({
            ...d,
            rate: d.pv / data[0].pv,
          })),
      },
    ],
  },
  encode: { x: 'action', y: 'pv', color: 'action', shape: 'pyramid' },
  transform: [{ type: 'symmetryY' }],
  scale: { x: { padding: 0 } },
  coordinate: { transform: [{ type: 'transpose' }] },
  animate: { enter: { type: 'fadeIn' } },
  axis: false,
  legend: { color: { position: 'bottom' } },
  labels: [
    { text: (d) => `${d.action} ${d.pv}`, textAlign: 'left' },
    {
      text: (d) => `${(d.rate * 100).toFixed(1)}%`,
      position: 'inside',
      transform: [{ type: 'contrastReverse' }],
    },
  ],
});

chart.render();
```

**说明**：

- 使用 `shape: "pyramid"` 创建对称的金字塔形状，视觉效果更加平衡
- 通过 `symmetryY` 变换实现上下对称的金字塔布局
- 自动计算并显示每个阶段的转化率百分比
- 横向展示便于阅读标签信息，特别适合阶段名称较长的场景

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
