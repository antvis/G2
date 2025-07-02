---
title: 直方图
order: 2
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*WJFaSp1JLHQAAAAAAAAAAAAADmJ7AQ/original'
category: ['comparison', 'distribution']
similar: ['bar', 'boxplot', 'line', 'area']
---

<img alt="histogram" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*WJFaSp1JLHQAAAAAAAAAAAAADmJ7AQ/original" width=600/>

## 直方图的简介

直方图，形状类似[柱状图](/charts/bar)却有着与柱状图完全不同的含义。直方图牵涉统计学的概念，首先要对数据进行分组，然后统计每个分组内数据元的数量。在平面直角坐标系中，横轴标出每个组的端点，纵轴表示频数，每个矩形的高代表对应的频数，称这样的统计图为频数分布直方图。频数分布直方图需要经过频数乘以组距的计算过程才能得出每个分组的数量，同一个直方图的组距是一个固定不变的值，所以如果直接用纵轴表示数量，每个矩形的高代表对应的数据元数量，既能保持分布状态不变，又能直观的看出每个分组的数量。本文的例子全部使用纵轴表示数量的非标准直方图绘制。

**相关概念**：

- 组数：在统计数据时，我们把数据按照不同的范围分成几个组，分成的组的个数称为组数
- 组距：每一组两个端点的差
- 频数：分组内的数据元的数量除以组距

**直方图的作用**：

- 能够显示各组频数或数量分布的情况
- 易于显示各组之间频数或数量的差别

通过直方图还可以观察和估计哪些数据比较集中，异常或者孤立的数据分布在何处。

**英文名**：Histogram

## 直方图的构成

### 频数分布直方图

<img alt="basic-histogram" src="https://os.alipayobjects.com/rmsportal/rDGZziKoqcGqXaj.png" width=600 />

| 图表类型         | 频数分布直方图                                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 适合的数据       | 列表：一个连续数据字段、一个分类字段（可选）                                                                             |
| 功能             | 展示数据在不同区间内的分布情况                                                                                           |
| 数据与图形的映射 | 分组数据字段（统计结果）映射到横轴的位置<br>频数字段（统计结果）映射到矩形的高度<br>分类数据可以设置颜色增强分类的区分度 |
| 适合的数据条数   | 不低于 50 条数据                                                                                                         |

---

### 非标准的直方图

<img alt="density-histogram" src="https://os.alipayobjects.com/rmsportal/ZmewPQkvLvoHAzq.png" width=600/>

| 图表类型         | 非标准的直方图                                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 适合的数据       | 列表：一个连续数据字段、一个分类字段（可选）                                                                             |
| 功能             | 展示数据在不同区间内的分布情况                                                                                           |
| 数据与图形的映射 | 分组数据字段（统计结果）映射到横轴的位置<br>数量字段（统计结果）映射到矩形的高度<br>分类数据可以设置颜色增强分类的区分度 |
| 适合的数据条数   | 不低于 50 条数据                                                                                                         |

## 直方图的应用场景

### 适合的场景

例子 1: **数据分布的统计分析**

下图是一个钻石重量分布的直方图，展示了钻石重量在不同区间的分布情况。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
});

chart
  .interval()
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
  })
  .encode('x', 'carat')
  .encode('y', 'count')
  .transform({
    type: 'binX',
    y: 'count',
  })
  .scale({
    y: { nice: true },
  })
  .axis({
    x: { title: '钻石重量（克拉）' },
    y: { title: '频数' },
  })
  .style({
    fill: '#1890FF',
    fillOpacity: 0.9,
    stroke: '#FFF',
  });

chart.render();
```

**说明**：

- `carat` 字段，映射到横轴，表示钻石重量的数值范围
- 使用 `interval()` 几何图形配合 `binX` 转换自动计算不同区间的数据频数
- 条形之间无间隔，表示数据是连续分布的

例子 2: **使用不同的分箱方式**

直方图的关键是如何划分数据区间（即"分箱"），不同的分箱方式会影响对数据分布的理解。下图使用了自定义的分箱数量。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
});

chart
  .interval()
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
  })
  .encode('x', 'carat')
  .encode('y', 'count')
  .transform({
    type: 'binX',
    y: 'count',
    thresholds: 30, // 指定分箱数量
  })
  .scale({
    y: { nice: true },
  })
  .axis({
    x: { title: '钻石重量（克拉）' },
    y: { title: '频数' },
  })
  .style({
    fill: '#1890FF',
    fillOpacity: 0.9,
    stroke: '#FFF',
  });

chart.render();
```

**说明**：

- 使用 `transform: { type: 'binX', thresholds: 30 }` 指定分箱数量为 30
- 分箱数量的选择会影响分布的细节展示，较多的箱数可以显示更细致的分布情况
- 较少的箱数则可以突出主要分布趋势

例子 3: **密度直方图进行概率分布分析**

密度直方图将频数标准化，更适合比较不同规模数据集的分布。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
});

chart
  .interval()
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
  })
  .encode('x', 'carat')
  .encode('y', 'density')
  .transform(
    {
      type: 'binX',
      y: 'count',
      thresholds: 20,
    },
    {
      type: 'normalizeY',
    },
  )
  .axis({
    x: { title: '钻石重量（克拉）' },
    y: {
      title: '密度',
      labelFormatter: '.0%',
    },
  })
  .style({
    fill: '#2FC25B',
    fillOpacity: 0.85,
    stroke: '#FFF',
  });

chart.render();
```

**说明**：

- 结合使用 `binX` 和 `normalizeY` 转换，将频数转换为密度
- 纵轴格式化为百分比显示，更直观地表示数据分布的概率密度
- 密度直方图面积总和为 1，更适合进行概率分布分析

### 不适合的场景

例子 1: **不适合展示分类数据的比较**

直方图针对的是连续型数值数据的分布，不适合用于非数值型的分类数据比较。对于分类数据的计数统计，应该使用普通柱状图。

例子 2: **不适合展示时间序列的趋势**

直方图侧重于展示数据的分布特征，而非随时间变化的趋势。如果需要展示数据随时间的变化趋势，应使用折线图或面积图等时序图表。

## 直方图的扩展

### 多分布直方图

多分布直方图可以在同一坐标系中展示多个数据集的分布情况，便于比较不同数据集的分布特征。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
});

chart
  .interval()
  .data({
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
  })
  .encode('x', 'price')
  .encode('y', 'count')
  .encode('color', 'group')
  .transform({
    type: 'binX',
    y: 'count',
    thresholds: 30,
    groupBy: ['group'],
  })
  .scale({
    y: { nice: true },
    color: { range: ['#1890FF', '#FF6B3B'] },
  })
  .axis({
    x: { title: '价格（美元）' },
    y: { title: '频数' },
  })
  .style({
    fillOpacity: 0.7,
    stroke: '#FFF',
    lineWidth: 1,
  })
  .legend(true);

chart.render();
```

**说明**：

- 通过 `color: 'group'` 和 `groupBy: ['group']` 实现多分布的对比
- 使用不同颜色和透明度，便于观察不同组别的数据分布差异

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
