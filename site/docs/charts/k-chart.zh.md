---
title: K线图
order: 10
screenshot: 'https://os.alipayobjects.com/rmsportal/UCqFUhWcZgDJsDH.png'
category: ['trend', 'time', 'comparison']
similar: ['line', 'area', 'bar', 'boxplot']
---

<img alt="candlestick" src="https://os.alipayobjects.com/rmsportal/UCqFUhWcZgDJsDH.png" width=600/>

## K 线图的简介

K 线图，原名蜡烛图，又称阴阳图、棒线、红黑线或蜡烛线，常用于展示股票交易数据。K 线就是指将各种股票每日、每周、每月的开盘价、收盘价、最高价、最低价等涨跌变化状况，用图形的方式表现出来。

K 线图通过直观的视觉表现方式，能够快速反映某一时期的价格走势，帮助分析师和投资者判断市场趋势。每根 K 线包含四个关键价格信息：开盘价、收盘价、最高价和最低价，这四个价格构成了完整的交易信息。

K 线图的设计理念源于日本，最初用于大米期货交易，后来被广泛应用于各种金融市场的技术分析中。

**英文名**：Candlestick Chart, K Chart

## K 线图的构成

### 单根 K 线结构

<img alt="candlestick-structure" src="https://t.alipayobjects.com/images/T1FtFkXXXlXXXXXXXX.png" width=600/>

K 线如图所示:

1. **上影线**：最上方的一条细线，表示最高价和收盘价（或开盘价）之间的价差
2. **实体**：中间的一条粗线，表示开盘价和收盘价之间的价差
3. **下影线**：下面的一条细线，表示开盘价（或收盘价）和最低价之间的差距

当收盘价高于开盘价，也就是股价走势呈上升趋势时，我们称这种情况下的 K 线为阳线，中部的实体通常以红色或空白表示。反之称为阴线，用绿色或黑色实体表示。

| 图表类型         | K 线图                                                                                |
| ---------------- | ------------------------------------------------------------------------------------- |
| 适合的数据       | 时间序列：一个时间字段，四个数值字段（开盘价、收盘价、最高价、最低价）                |
| 功能             | 观察数据的**趋势**变化<br>**对比**不同时期的价格区间                                  |
| 数据与图形的映射 | 时间字段映射到横轴<br>四个价格字段映射到纵轴形成 K 线实体和影线<br>涨跌状态映射到颜色 |
| 适合的数据条数   | 适合中长期数据，通常几十到几百个交易周期                                              |

## K 线图的应用场景

### 适合的场景

**场景 1：股票价格分析**

K 线图最经典的应用场景就是股票市场分析，通过观察 K 线的形态可以判断市场的多空力量对比。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const data = [
  {
    time: '2015-11-19',
    start: 8.18,
    max: 8.33,
    min: 7.98,
    end: 8.32,
  },
  {
    time: '2015-11-18',
    start: 8.37,
    max: 8.6,
    min: 8.03,
    end: 8.09,
  },
  {
    time: '2015-11-17',
    start: 8.7,
    max: 8.78,
    min: 8.32,
    end: 8.37,
  },
  {
    time: '2015-11-16',
    start: 8.48,
    max: 8.85,
    min: 8.43,
    end: 8.7,
  },
  {
    time: '2015-11-13',
    start: 8.01,
    max: 8.75,
    min: 7.97,
    end: 8.41,
  },
  {
    time: '2015-11-12',
    start: 7.76,
    max: 8.18,
    min: 7.61,
    end: 8.15,
  },
  {
    time: '2015-11-11',
    start: 7.55,
    max: 7.81,
    min: 7.49,
    end: 7.8,
  },
  {
    time: '2015-11-10',
    start: 7.5,
    max: 7.68,
    min: 7.44,
    end: 7.57,
  },
];

chart
  .data(data)
  .encode('x', 'time')
  .encode('color', (d) => {
    const trend = Math.sign(d.start - d.end);
    return trend > 0 ? '下跌' : trend === 0 ? '不变' : '上涨';
  })
  .scale('x', {
    compare: (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  })
  .scale('color', {
    domain: ['下跌', '不变', '上涨'],
    range: ['#4daf4a', '#999999', '#e41a1c'],
  });

chart
  .link()
  .encode('y', ['min', 'max'])
  .tooltip({
    title: 'time',
    items: [
      { field: 'start', name: '开盘价' },
      { field: 'end', name: '收盘价' },
      { field: 'min', name: '最低价' },
      { field: 'max', name: '最高价' },
    ],
  });

chart
  .interval()
  .encode('y', ['start', 'end'])
  .style('fillOpacity', 1)
  .style('stroke', (d) => {
    if (d.start === d.end) return '#999999';
  })
  .axis('y', {
    title: '价格',
  })
  .tooltip({
    title: 'time',
    items: [
      { field: 'start', name: '开盘价' },
      { field: 'end', name: '收盘价' },
      { field: 'min', name: '最低价' },
      { field: 'max', name: '最高价' },
    ],
  });

chart.render();
```

**场景 2：商品期货分析**

K 线图同样适用于商品期货、外汇等金融衍生品的价格分析，帮助交易者识别价格模式和趋势。

**场景 3：数字货币分析**

在数字货币交易中，K 线图是最常用的技术分析工具，可以清楚地展示价格的波动情况。

### 不适合的场景

**场景 1：非时间序列数据**

K 线图专门用于时间序列数据，对于不涉及时间维度的分类数据比较，应该使用[柱状图](/charts/bar)或[条形图](/charts/bar)。

**场景 2：单一数值展示**

如果只需要展示简单的数值变化趋势，[折线图](/charts/line)或[面积图](/charts/area)会更加简洁明了。

## K 线图的扩展

### K 线图与成交量组合

将 K 线图与成交量柱状图结合，可以更全面地分析市场行为。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

// 创建K线图容器
document.getElementById('container').innerHTML = `
  <div id="kChart" style="height: 300px;"></div>
  <div id="volumeChart" style="height: 150px; margin-top: 10px;"></div>
`;

const data = [
  {
    time: '2015-11-19',
    start: 8.18,
    max: 8.33,
    min: 7.98,
    end: 8.32,
    volumn: 1810,
  },
  {
    time: '2015-11-18',
    start: 8.37,
    max: 8.6,
    min: 8.03,
    end: 8.09,
    volumn: 2790,
  },
  {
    time: '2015-11-17',
    start: 8.7,
    max: 8.78,
    min: 8.32,
    end: 8.37,
    volumn: 3729,
  },
  {
    time: '2015-11-16',
    start: 8.48,
    max: 8.85,
    min: 8.43,
    end: 8.7,
    volumn: 2890,
  },
];

const KChart = new Chart({
  container: 'kChart',
  autoFit: true,
});

KChart.options({
  type: 'view',
  data,
  encode: {
    x: 'time',
    color: (d) => {
      const trend = Math.sign(d.start - d.end);
      return trend > 0 ? '下跌' : trend === 0 ? '不变' : '上涨';
    },
  },
  scale: {
    color: {
      domain: ['下跌', '不变', '上涨'],
      range: ['#4daf4a', '#999999', '#e41a1c'],
    },
  },
  children: [
    {
      type: 'link',
      encode: { y: ['min', 'max'] },
    },
    {
      type: 'interval',
      encode: { y: ['start', 'end'] },
      style: { fillOpacity: 1 },
    },
  ],
  axis: {
    y: { title: '价格' },
  },
});

// 成交量图
const VolumeChart = new Chart({
  container: 'volumeChart',
  autoFit: true,
});

VolumeChart.options({
  type: 'interval',
  data,
  encode: {
    x: 'time',
    y: 'volumn',
    color: (d) => {
      const trend = Math.sign(d.start - d.end);
      return trend > 0 ? '下跌' : trend === 0 ? '不变' : '上涨';
    },
  },
  scale: {
    color: {
      domain: ['下跌', '不变', '上涨'],
      range: ['#4daf4a', '#999999', '#e41a1c'],
    },
  },
  axis: {
    y: { title: '成交量' },
  },
});

KChart.render();
VolumeChart.render();
```

**说明**：

- K 线图部分展示价格的四个关键信息（开盘、收盘、最高、最低）
- 成交量图部分使用相同的颜色编码展示交易量
- 两个图表通过相同的时间轴对齐，便于关联分析

### K 线图与柱状图组合

使用更完整的数据源，结合 K 线图和柱状图展示股票价格和成交量的关系，并支持图例联动交互。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

// 创建K线图和柱状图容器
document.getElementById('container').innerHTML = `
  <div id="kChart" style="height: 360px;"></div>
  <div id="columnChart" style="height: 180px;"></div>
`;

const KChart = new Chart({
  container: 'kChart',
  autoFit: true,
  height: 360,
  paddingLeft: 60,
});

KChart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/antvdemo/assets/data/candle-sticks.json',
  },
  encode: {
    x: 'time',
    color: (d) => {
      const trend = Math.sign(d.start - d.end);
      return trend > 0 ? '下跌' : trend === 0 ? '不变' : '上涨';
    },
  },
  scale: {
    x: {
      compare: (a, b) => new Date(a).getTime() - new Date(b).getTime(),
    },
    color: {
      domain: ['下跌', '不变', '上涨'],
      range: ['#4daf4a', '#999999', '#e41a1c'],
    },
  },
  children: [
    {
      type: 'link',
      encode: { y: ['min', 'max'] },
      tooltip: {
        title: 'time',
        items: [
          { field: 'start', name: '开盘价' },
          { field: 'end', name: '收盘价' },
          { field: 'min', name: '最低价' },
          { field: 'max', name: '最高价' },
        ],
      },
    },
    {
      type: 'interval',
      encode: { y: ['start', 'end'] },
      style: {
        fillOpacity: 1,
        stroke: (d) => (d.start === d.end ? '#999999' : undefined),
      },
      axis: {
        x: { title: false },
        y: { title: false },
      },
      tooltip: {
        title: 'time',
        items: [
          { field: 'start', name: '开盘价' },
          { field: 'end', name: '收盘价' },
          { field: 'min', name: '最低价' },
          { field: 'max', name: '最高价' },
        ],
      },
    },
  ],
});

const ColumnChart = new Chart({
  container: 'columnChart',
  autoFit: true,
  paddingTop: 0,
  paddingBottom: 0,
  height: 180,
  paddingLeft: 60,
});

ColumnChart.options({
  type: 'interval',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/antvdemo/assets/data/candle-sticks.json',
  },
  encode: {
    x: 'time',
    y: 'volumn',
    color: (d) => {
      const trend = Math.sign(d.start - d.end);
      return trend > 0 ? '下跌' : trend === 0 ? '不变' : '上涨';
    },
  },
  scale: {
    x: {
      compare: (a, b) => new Date(a).getTime() - new Date(b).getTime(),
    },
    color: {
      domain: ['下跌', '不变', '上涨'],
      range: ['#4daf4a', '#999999', '#e41a1c'],
    },
  },
  axis: {
    x: false,
    y: { title: false },
  },
});

// 图例联动交互
KChart.on('legend:filter', (e) => {
  const { nativeEvent, data } = e;
  if (!nativeEvent) return;
  ColumnChart.emit('legend:filter', { data });
});

KChart.on('legend:reset', (e) => {
  const { nativeEvent, data } = e;
  if (!nativeEvent) return;
  ColumnChart.emit('legend:reset', { data });
});

KChart.render();
ColumnChart.render();
```

**说明**：

- 上方 K 线图展示价格走势，下方柱状图展示成交量
- 两个图表使用相同的颜色编码和时间轴对齐
- 支持图例联动，点击图例可以同时过滤两个图表的数据
- 使用真实的股票数据源，展示更完整的市场信息

## K 线图与其他图表的对比

### K 线图和[折线图](/charts/line)

- K 线图展示完整的价格信息（开盘、收盘、最高、最低），适合详细的技术分析
- 折线图只展示单一价格线（通常是收盘价），适合展示价格趋势的整体走向

### K 线图和[柱状图](/charts/bar)

- K 线图专门用于时间序列的价格数据分析，强调时间维度上的价格变化
- 柱状图主要用于不同分类之间的数值大小对比，不涉及时间序列

### K 线图和[箱形图](/charts/boxplot)

- K 线图展示特定时间点的价格区间，侧重于价格走势分析
- 箱形图展示数据的统计分布特征，侧重于数据分布的统计分析

## 相似图表

<code src="./demos/list-card.tsx"></code>

## 分类

<code src="./demos/list-category.tsx"></code>
