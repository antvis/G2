---
title: 堆叠柱状图
order: 2
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*69WQTY8YrWgAAAAAAAAAAAAADmJ7AQ/original'
category: ['comparison', 'proportion']
similar: ['bar', 'multi-set-bar', 'stacked-area', 'percentage-bar']
---

<img alt="stacked-bar" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*69WQTY8YrWgAAAAAAAAAAAAADmJ7AQ/original" width=600/>

## 堆叠柱状图的简介

堆叠柱状图是柱状图的扩展，通过在单个柱子中堆叠多个数据系列来显示分类数据。每个柱子代表一个类别的总数，而柱子内的不同颜色段代表各个子类别的数值。堆叠柱状图不仅能够展示每个类别的总量，还能显示各个子类别对总量的贡献。

堆叠柱状图特别适合于比较多个类别的组成结构，以及观察各子类别在不同类别中的分布情况。通过颜色编码，用户可以轻松识别不同的子类别，并比较它们在各个主类别中的占比。

当需要同时展示总量和构成时，堆叠柱状图是一个很好的选择。可以进一步扩展为百分比堆叠柱状图来显示各部分的相对比例。

**英文名**：Stacked Bar Chart, Stacked Column Chart

## 堆叠柱状图的构成

### 垂直堆叠柱状图

<img alt="stacked-bar-vertical" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*RqV4T4LZxaAAAAAAAAAAAAAADmJ7AQ/original" width=600 />

| 图表类型         | 垂直堆叠柱状图                                                                                   |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| 适合的数据       | 多系列分类数据：一个分类数据字段、一个连续数据字段、一个系列分类字段                             |
| 功能             | 对比不同类别的总量以及各子类别的构成                                                             |
| 数据与图形的映射 | 分类字段映射到横轴位置<br>数值字段映射到柱子高度<br>系列字段映射到颜色，通过堆叠显示在同一柱子中 |
| 适合的数据条数   | 主类别不超过 12 条，子类别不超过 8 条                                                            |

---

### 水平堆叠柱状图

<img alt="stacked-bar-horizontal" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*4Rr_Q4VSLkEAAAAAAAAAAAAADmJ7AQ/original" width=600/>

| 图表类型         | 水平堆叠柱状图                                                         |
| ---------------- | ---------------------------------------------------------------------- |
| 适合的数据       | 多系列分类数据：一个分类数据字段、一个连续数据字段、一个系列分类字段   |
| 功能             | 对比不同类别的总量以及各子类别的构成                                   |
| 数据与图形的映射 | 分类字段映射到纵轴位置<br>数值字段映射到柱子宽度<br>系列字段映射到颜色 |
| 适合的数据条数   | 主类别不超过 30 条，子类别不超过 8 条                                  |

## 堆叠柱状图的应用场景

### 适合的场景

例子 1: **适合展示多城市降雨量的月度构成**

下图展示了伦敦和柏林两个城市在不同月份的降雨量分布，能够清楚地看出每个月的总降雨量以及两个城市各自的贡献。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
    { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
    { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
    { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
    { name: 'London', 月份: 'May', 月均降雨量: 47 },
    { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
    { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
    { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
    { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
    { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
    { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
    { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
    { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
    { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
    { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
    { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
  ],
  encode: { x: '月份', y: '月均降雨量', color: 'name' },
  transform: [{ type: 'stackY' }],
  interaction: [
    {
      type: 'elementHighlight',
      background: true,
      region: true,
    },
  ],
});

chart.render();
```

**说明**：

- `月份` 字段映射到横轴位置，表示时间维度
- `月均降雨量` 字段映射到柱子高度，通过 `stackY` 变换进行堆叠
- `name` 字段映射到颜色，区分不同城市
- 可以同时比较每个月的总降雨量和各城市的贡献

例子 2: **适合展示人口年龄结构的地区对比**

堆叠柱状图非常适合展示不同地区的人口年龄结构分布，既能看出各地区的总人口，又能分析年龄构成。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  encode: { x: 'state', y: 'population', color: 'age' },
  transform: [{ type: 'stackY' }, { type: 'sortX', by: 'y', reverse: true }],
  axis: {
    x: {
      labelSpacing: 4,
      labelTransform: 'rotate(90)',
    },
    y: {
      labelFormatter: '~s',
      title: null,
    },
  },
  legend: {
    color: {
      position: 'right',
      title: '年龄段',
    },
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

- 使用 `sortX` 变换按总人口数量排序，便于比较
- `labelFormatter: '~s'` 格式化数值显示（如 1M 表示 1 百万）
- 旋转 x 轴标签以避免重叠

例子 3: **水平堆叠柱状图适合类别较多的情况**

当分类较多时，水平堆叠柱状图能够更好地展示标签，避免文字重叠。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  width: 800,
  height: 600,
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  coordinate: { transform: [{ type: 'transpose' }] },
  encode: { x: 'state', y: 'population', color: 'age' },
  transform: [{ type: 'stackY' }, { type: 'sortX', by: 'y', reverse: true }],
  axis: {
    y: {
      labelFormatter: '~s',
      title: null,
    },
    x: {
      title: null,
    },
  },
  legend: {
    color: {
      position: 'bottom',
      title: '年龄段',
    },
  },
});

chart.render();
```

**说明**：

- 使用 `coordinate: { transform: [{ type: 'transpose' }] }` 实现水平方向
- 标签可以水平排列，提高可读性
- 适合有较多分类的数据

例子 4: **百分比堆叠柱状图展示比例关系**

当重点关注各部分占比而非绝对数值时，百分比堆叠柱状图是更好的选择。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  width: 800,
  height: 600,
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  coordinate: { transform: [{ type: 'transpose' }] },
  encode: { x: 'state', y: 'population', color: 'age' },
  transform: [
    { type: 'stackY' },
    { type: 'normalizeY' },
    { type: 'sortX', by: 'y', reverse: true },
  ],
  axis: {
    y: {
      labelFormatter: '.0%',
      title: null,
    },
    x: {
      title: null,
    },
  },
  legend: {
    color: {
      position: 'bottom',
      title: '年龄段',
    },
  },
  tooltip: {
    channel: 'y0',
    valueFormatter: '.0%',
  },
});

chart.render();
```

**说明**：

- 结合 `stackY` 和 `normalizeY` 变换实现百分比堆叠
- `labelFormatter: '.0%'` 将 y 轴标签格式化为百分比
- 便于比较各州的年龄结构比例

### 不适合的场景

例子 1: **不适合展示负值数据的简单堆叠**

传统的堆叠柱状图不适合包含负值的数据，因为堆叠逻辑会导致视觉混乱。

例子 2: **子类别过多时视觉效果差**

当子类别数量超过 8-10 个时，颜色区分度下降，用户难以有效区分和比较。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

// 模拟过多子类别的数据
const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { category: 'A', type: 'Type1', value: 10 },
    { category: 'A', type: 'Type2', value: 8 },
    { category: 'A', type: 'Type3', value: 6 },
    { category: 'A', type: 'Type4', value: 4 },
    { category: 'A', type: 'Type5', value: 3 },
    { category: 'A', type: 'Type6', value: 2 },
    { category: 'A', type: 'Type7', value: 2 },
    { category: 'A', type: 'Type8', value: 1 },
    { category: 'A', type: 'Type9', value: 1 },
    { category: 'A', type: 'Type10', value: 1 },
    { category: 'A', type: 'Type11', value: 1 },
    { category: 'A', type: 'Type12', value: 1 },
    { category: 'B', type: 'Type1', value: 12 },
    { category: 'B', type: 'Type2', value: 9 },
    { category: 'B', type: 'Type3', value: 7 },
    { category: 'B', type: 'Type4', value: 5 },
    { category: 'B', type: 'Type5', value: 4 },
    { category: 'B', type: 'Type6', value: 3 },
    { category: 'B', type: 'Type7', value: 2 },
    { category: 'B', type: 'Type8', value: 2 },
    { category: 'B', type: 'Type9', value: 1 },
    { category: 'B', type: 'Type10', value: 1 },
    { category: 'B', type: 'Type11', value: 1 },
    { category: 'B', type: 'Type12', value: 1 },
  ],
  encode: { x: 'category', y: 'value', color: 'type' },
  transform: [{ type: 'stackY' }],
});

chart.render();
```

在这种情况下，建议将较小的类别合并为"其他"类别，或者使用其他图表类型。

## 堆叠柱状图的扩展

### 分散堆叠柱状图

分散堆叠柱状图可以展示正负值的对比，特别适合展示盈亏、增减等对比数据。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'view',
  paddingLeft: 25,
  children: [
    {
      type: 'interval',
      data: {
        type: 'fetch',
        value: 'https://assets.antv.antgroup.com/g2/nivo-gain-lost.json',
        transform: [
          {
            type: 'fold',
            fields: [
              'lost > 100$',
              'lost <= 100$',
              'gained <= 100$',
              'gained > 100$',
            ],
          },
        ],
      },
      encode: { x: 'user', y: 'value', color: 'key' },
      transform: [{ type: 'stackY' }],
      scale: {
        x: { padding: 0.2 },
        y: { domainMin: -100, domainMax: 100 },
        color: {
          domain: [
            'lost > 100$',
            'lost <= 100$',
            'gained <= 100$',
            'gained > 100$',
          ],
          range: ['#97e3d5', '#61cdbb', '#e25c3b', '#f47560'],
        },
      },
      style: { radius: 10 },
      axis: {
        y: { position: 'right', title: false, labelFormatter: (v) => `${v}%` },
      },
      legend: { color: { title: false } },
      labels: [
        {
          text: 'value',
          position: 'inside',
          formatter: (v) => (v ? `${v}%` : ''),
          transform: [{ type: 'overlapDodgeY' }],
          fill: '#000',
          fontSize: 10,
        },
      ],
    },
    {
      type: 'lineY',
      data: [0],
      style: { lineWidth: 2, stroke: '#e25c3b', strokeOpacity: 1 },
    },
    {
      type: 'text',
      style: {
        x: -10,
        y: '75%',
        text: 'lost',
        fontWeight: 'bold',
        dy: -10,
        transform: 'rotate(-90)',
        fill: '#61cdbb',
      },
    },
    {
      type: 'text',
      style: {
        x: -10,
        y: '20%',
        text: 'gain',
        fontWeight: 'bold',
        dy: -10,
        transform: 'rotate(-90)',
        fill: '#e25c3b',
      },
    },
  ],
});

chart.render();
```

**说明**：

- 使用正负值数据展示盈亏对比
- 设置 `domainMin` 和 `domainMax` 控制坐标轴范围
- 添加分界线突出正负值的分界
- 使用圆角样式增强视觉效果

## 堆叠柱状图与其他图表的对比

### 堆叠柱状图和[柱状图](/charts/bar)

- 堆叠柱状图展示多个子类别的构成关系和总量
- 普通柱状图主要用于比较不同类别的单一数值
- 堆叠柱状图能同时显示部分和整体的关系

### 堆叠柱状图和[堆叠面积图](/charts/stacked-area)

- 堆叠柱状图适合离散的分类数据比较
- 堆叠面积图适合连续的时间序列数据趋势展示
- 堆叠柱状图更便于精确数值比较

### 堆叠柱状图和[饼图](/charts/pie)

- 堆叠柱状图可以同时比较多个类别的构成
- 饼图只能展示单个整体的构成比例
- 堆叠柱状图在比较多个类别时更有优势

## 相似图表

<code src="./demos/list-card.tsx"></code>

## 分类

<code src="./demos/list-category.tsx"></code>
