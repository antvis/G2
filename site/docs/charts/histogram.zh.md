---
title: 直方图
order: 2
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*WJFaSp1JLHQAAAAAAAAAAAAADmJ7AQ/original'
category: ['comparison', 'distribution']
similar: ['bar', 'column']
---


<img alt="histogram" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*WJFaSp1JLHQAAAAAAAAAAAAADmJ7AQ/original" width=600/>

## 直方图的简介

直方图是一种用于展示数据分布情况的统计图表，它将连续的数据分成多个区间（组距），统计每个区间内数据出现的频率，并使用条形来表示这些频率。与普通柱状图不同，直方图的特点是没有组间距离，相邻的条形紧密相连，以表示数据是连续的。

直方图特别适合于探索和分析数据的分布形态，如偏斜度、峰度、是否呈现正态分布等。通过观察直方图，可以快速了解数据的集中趋势、离散程度以及异常值的存在。

在数据分析和统计学中，直方图是一种基础且重要的可视化工具，常用于数据预处理阶段，帮助研究人员了解数据特征，为后续分析提供依据。

**英文名**：Histogram

## 直方图的构成

### 基础直方图

<img alt="basic-histogram" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*WJFaSp1JLHQAAAAAAAAAAAAADmJ7AQ/original" width=600 />

| 图表类型         | 基础直方图                                                                          |
| ---------------- | ----------------------------------------------------------------------------------- |
| 适合的数据       | 连续型数据：需要展示单一变量的分布情况                                               |
| 功能             | 统计数据分布的频率，展示数据的分布形态                                               |
| 数据与图形的映射 | 横轴表示数据的区间范围<br>纵轴表示每个区间内数据出现的频率<br>条形高度对应频率或计数值 |
| 适合的场景       | 数据分布的探索性分析，了解数据集中趋势和离散程度                                     |

---

### 密度直方图

<img alt="density-histogram" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*j-D7RILbV8oAAAAAAAAAAAAADmJ7AQ/original" width=600/>

| 图表类型         | 密度直方图                                                                             |
| ---------------- | -------------------------------------------------------------------------------------- |
| 适合的数据       | 连续型数据：需要展示单一变量分布的概率密度                                              |
| 功能             | 通过标准化处理，展示数据的密度分布而非原始频数                                           |
| 数据与图形的映射 | 横轴表示数据的区间范围<br>纵轴表示每个区间内的频率密度<br>条形高度对应某区间的概率密度    |
| 适合的场景       | 比较不同规模数据集的分布形态，概率分布分析                                              |

## 直方图的应用场景

### 适合的场景

例子 1: **数据分布的统计分析**

下图是一个钻石重量分布的直方图，展示了钻石重量在不同区间的分布情况。

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'histogram',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
  },
  encode: { 
    x: 'carat',
    y: 'count' 
  },
  scale: {
    y: { nice: true }
  },
  axis: {
    x: {
      title: '钻石重量（克拉）',
    },
    y: {
      title: '频数',
    },
  },
  style: {
    fill: '#1890FF',
    fillOpacity: 0.9,
    stroke: '#FFF',
  }
});

chart.render();
```


**说明** ：

- `carat` 字段，映射到横轴，表示钻石重量的数值范围
- 系统自动计算不同区间的数据频数，映射到纵轴
- 条形之间无间隔，表示数据是连续分布的

例子 2: **使用不同的分箱方式**

直方图的关键是如何划分数据区间（即"分箱"），不同的分箱方式会影响对数据分布的理解。下图使用了自定义的分箱数量。

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'histogram',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
  },
  encode: { 
    x: 'carat',
    y: 'count' 
  },
  transform: [{ 
    type: 'binX', 
    y: 'count',
    bins: 30 // 指定分箱数量
  }],
  scale: {
    y: { nice: true }
  },
  axis: {
    x: {
      title: '钻石重量（克拉）',
    },
    y: {
      title: '频数',
    },
  },
  style: {
    fill: '#1890FF',
    fillOpacity: 0.9,
    stroke: '#FFF',
  }
});

chart.render();
```

**说明**：
- 使用 `transform: [{ type: 'binX', bins: 30 }]` 指定分箱数量为30
- 分箱数量的选择会影响分布的细节展示，较多的箱数可以显示更细致的分布情况
- 较少的箱数则可以突出主要分布趋势

例子 3: **密度直方图进行概率分布分析**

密度直方图将频数标准化，更适合比较不同规模数据集的分布。

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'histogram',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
  },
  encode: { 
    x: 'carat',
    y: 'density'
  },
  transform: [{ 
    type: 'binX', 
    y: 'count',
    bins: 20
  }, {
    type: 'normalizeY'
  }],
  axis: {
    x: { 
      title: '钻石重量（克拉）' 
    },
    y: { 
      title: '密度',
      labelFormatter: '.0%'
    }
  },
  style: {
    fill: '#2FC25B',
    fillOpacity: 0.85,
    stroke: '#FFF',
  }
});

chart.render();
```

**说明**：
- 结合使用 `binX` 和 `normalizeY` 转换，将频数转换为密度
- 纵轴格式化为百分比显示，更直观地表示数据分布的概率密度
- 密度直方图面积总和为1，更适合进行概率分布分析

### 不适合的场景

例子 1: **不适合展示分类数据的比较**

直方图针对的是连续型数值数据的分布，不适合用于非数值型的分类数据比较。对于分类数据的计数统计，应该使用普通柱状图。

例子 2: **不适合展示时间序列的趋势**

直方图侧重于展示数据的分布特征，而非随时间变化的趋势。如果需要展示数据随时间的变化趋势，应使用折线图或面积图等时序图表。

## 直方图的扩展

### 多分布直方图

多分布直方图可以在同一坐标系中展示多个数据集的分布情况，便于比较不同数据集的分布特征。

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'histogram',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
    transform: [
      {
        type: 'map',
        callback: (d) => ({
          ...d,
          group: d.cut === 'Ideal' ? 'Ideal' : 'Others',
        }),
      },
    ],
  },
  encode: { 
    x: 'price',
    y: 'count',
    color: 'group'
  },
  transform: [{ 
    type: 'binX', 
    y: 'count',
    bins: 30,
    groupBy: ['group']
  }],
  scale: {
    y: { nice: true },
    color: {
      range: ['#1890FF', '#FF6B3B']
    }
  },
  axis: {
    x: { title: '价格（美元）' },
    y: { title: '频数' }
  },
  style: {
    fillOpacity: 0.7,
    stroke: '#FFF',
    lineWidth: 1
  },
  legend: true
});

chart.render();
```

**说明**：
- 通过 `color: 'group'` 和 `groupBy: ['group']` 实现多分布的对比
- 使用不同颜色和透明度，便于观察不同组别的数据分布差异

### 密度曲线与直方图结合

将密度曲线与直方图结合可以更全面地展示数据分布特征。

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'view',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
  },
  children: [
    {
      type: 'histogram',
      encode: { 
        x: 'price',
        y: 'count'
      },
      transform: [{ 
        type: 'binX', 
        y: 'count',
        bins: 30
      }],
      style: {
        fill: '#1890FF',
        fillOpacity: 0.6,
        stroke: '#FFF'
      }
    },
    {
      type: 'line',
      encode: { 
        x: 'price',
        y: 'density',
        shape: 'smooth'
      },
      transform: [{ 
        type: 'kde', 
        field: 'price',
        as: ['price', 'density'],
        extent: [0, 20000],
        bandwidth: 50
      }],
      style: {
        stroke: '#FF6B3B',
        lineWidth: 2
      }
    }
  ],
  scale: {
    y: { nice: true }
  },
  axis: {
    x: { title: '价格（美元）' },
    y: { title: '频数' }
  }
});

chart.render();
```

**说明**：
- 同时使用直方图和密度曲线展示分布特征
- 直方图显示实际频数分布，密度曲线则平滑展示整体趋势
- 通过 `kde` 转换计算核密度估计值

## 直方图与其他图表的对比

### 直方图和[柱状图](/charts/bar)

- 直方图用于展示连续型数值数据的分布，强调数据分布形态
- 柱状图用于比较不同类别或时间点的数值大小，强调类别间数值对比
- 直方图的条形间无间隔，柱状图的柱子间有间隔

### 直方图和[箱型图](/charts/boxplot)

- 直方图通过频数分布展示数据集中趋势和离散程度
- 箱型图通过四分位数展示数据的集中和离散情况，更便于识别异常值
- 直方图提供更详细的分布形态，箱型图则提供更简洁的统计概括

### 直方图和[折线图](/charts/line)、[面积图](/charts/area)

- 直方图侧重于展示数据的分布状况和形态特征
- 折线图和面积图侧重于展示数据随时间的变化趋势
- 直方图适合单一时间点的数据分析，折线图和面积图适合多时间点的连续数据分析

## 相似图表

<code src="./demos/list-card.tsx"></code>

## 分类

<code src="./demos/list-category.tsx"></code>
