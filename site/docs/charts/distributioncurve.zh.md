---
title: 分布曲线图
order: 2
screenshot: 'https://t.alipayobjects.com/images/T1BjJkXcxgXXXXXXXX.png'
category: ['distribution']
similar: ['line', 'violin', 'histogram']
---

<img alt="distributioncurve" src="https://t.alipayobjects.com/images/T1BjJkXcxgXXXXXXXX.png" width=600/>

## 分布曲线图的简介

分布曲线图是一种用于展示数据频率分布的统计图表，通过平滑的曲线形式直观地反映数据在不同数值区间的分布密度和集中趋势。它是理解数据分布特征、识别数据模式的重要可视化工具。

分布曲线图特别适合用于探索性数据分析、多组数据分布比较、数据质量检查以及统计分布特征识别等场景，是统计分析和数据科学中的重要工具。

**英文名**：Distribution Curve, Frequency Curve, Density Curve

## 分布曲线图的构成

<img alt="basic-distribution-curve" src="https://t.alipayobjects.com/images/T1AjNkXjNfXXXXXXXX.png" width=600 />

分布曲线图由以下元素构成:

- 横轴：表示自变量
- 纵轴：表示因变量
- 表示概率分布的分布曲线

## 分布曲线图的应用场景

### 适合的场景

例子 1: **展示正态分布数据的分布特征**

分布曲线图非常适合展示正态分布数据，能够清晰地显示数据的集中趋势、对称性和分布形态。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

// 生成正态分布数据
const generateNormalData = (count, mean, std) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    // 使用Box-Muller变换生成正态分布数据
    const u1 = Math.random();
    const u2 = Math.random();
    const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    data.push({ value: mean + std * z0 });
  }
  return data;
};

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'line',
  data: {
    value: generateNormalData(1000, 100, 15),
    transform: [
      {
        type: 'custom',
        callback: (data) => {
          // 提取数值数据
          const values = data.map(d => d.value).filter(v => !isNaN(v));
          
          // 计算数据范围
          const min = Math.min(...values);
          const max = Math.max(...values);
          const binCount = 30;
          const binWidth = (max - min) / binCount;
          
          // 创建分箱
          const bins = Array.from({ length: binCount }, (_, i) => ({
            x0: min + i * binWidth,
            x1: min + (i + 1) * binWidth,
            count: 0,
          }));
          
          // 统计每个分箱的频数
          values.forEach(value => {
            const binIndex = Math.min(
              Math.floor((value - min) / binWidth),
              binCount - 1
            );
            bins[binIndex].count++;
          });
          
          // 计算频率密度并生成曲线数据
          const total = values.length;
          return bins.map(bin => ({
            x: (bin.x0 + bin.x1) / 2, // 区间中心点
            y: bin.count / total, // 频率密度
            frequency: bin.count,
            range: `${bin.x0.toFixed(1)}-${bin.x1.toFixed(1)}`,
          }));
        },
      },
    ],
  },
  encode: {
    x: 'x',
    y: 'y',
    shape: 'smooth',
  },
  style: {
    lineWidth: 3,
    stroke: '#1890ff',
  },
  axis: {
    x: { title: '测量值' },
    y: { title: '频率密度' },
  },
  tooltip: {
    title: (d) => `区间: ${d.range}`,
    items: [
      { field: 'frequency', name: '频数' },
      { field: 'y', name: '频率密度', valueFormatter: '.3f' },
    ],
  },
});

chart.render();
```

**说明**：

- 展示了经典的钟形正态分布曲线
- 可以清晰观察到数据的对称性和集中趋势
- 适合质量控制、生物统计、心理测量等领域的数据分析

例子 2: **多组数据分布比较分析**

当需要比较不同条件或分组下的数据分布时，分布曲线图能够直观地展示各组间的分布差异。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'line',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/species.json',
    transform: [
      {
        type: 'custom',
        callback: (data) => {
          // 按物种分组数据
          const groups = {};
          data.forEach(d => {
            if (!groups[d.species]) groups[d.species] = [];
            groups[d.species].push(d.y);
          });
          
          const binCount = 20;
          const results = [];
          
          // 为每个物种创建分布曲线数据
          Object.entries(groups).forEach(([species, values]) => {
            const filteredValues = values.filter(v => !isNaN(v));
            if (filteredValues.length === 0) return;
            
            const min = Math.min(...filteredValues);
            const max = Math.max(...filteredValues);
            const binWidth = (max - min) / binCount;
            
            // 创建分箱
            const bins = Array.from({ length: binCount }, (_, i) => ({
              x0: min + i * binWidth,
              x1: min + (i + 1) * binWidth,
              count: 0,
            }));
            
            // 统计频数
            filteredValues.forEach(value => {
              const binIndex = Math.min(
                Math.floor((value - min) / binWidth),
                binCount - 1
              );
              bins[binIndex].count++;
            });
            
            // 生成曲线数据
            const total = filteredValues.length;
            bins.forEach(bin => {
              results.push({
                x: (bin.x0 + bin.x1) / 2,
                y: bin.count / total,
                species,
                frequency: bin.count,
                range: `${bin.x0.toFixed(2)}-${bin.x1.toFixed(2)}`,
              });
            });
          });
          
          return results;
        },
      },
    ],
  },
  encode: {
    x: 'x',
    y: 'y',
    color: 'species',
    shape: 'smooth',
  },
  style: {
    lineWidth: 2,
    strokeOpacity: 0.8,
  },
  axis: {
    x: { title: '花瓣长度' },
    y: { title: '频率密度' },
  },
  legend: {
    color: {
      title: '物种',
      position: 'right',
    },
  },
  tooltip: {
    title: (d) => `${d.species} - 区间: ${d.range}`,
    items: [
      { field: 'frequency', name: '频数' },
      { field: 'y', name: '频率密度', valueFormatter: '.3f' },
    ],
  },
});

chart.render();
```

**说明**：

- 通过不同颜色的曲线比较多个分组的分布特征
- 便于识别各组数据的分布中心、形态和离散程度
- 适合A/B测试分析、实验对照组比较、市场细分分析等场景

### 不适合的场景

例子 1: **数据量过少时效果不佳**

当数据点过少时，分箱统计可能不够准确，生成的分布曲线可能不能准确反映真实的分布特征。

```js | ob { inject: true, pin: false }
import { Chart } from '@antv/g2';

// 模拟少量数据
const smallData = [
  12, 15, 13, 14, 16, 18, 11, 17, 15, 13
];

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  height: 250,
});

chart.options({
  type: 'point',
  data: smallData.map((value, index) => ({ index: index + 1, value })),
  encode: {
    x: 'index',
    y: 'value',
    size: 6,
  },
  style: {
    fill: '#1890ff',
    fillOpacity: 0.8,
  },
  axis: {
    x: { title: '数据点序号' },
    y: { title: '数值' },
  },
  title: '数据量少时建议使用散点图',
});

chart.render();
```

**问题说明**：

- 数据点太少（少于30个）时，分箱后每个区间的数据过少
- 生成的分布曲线可能出现人工的波动和不规律的形状
- 无法准确反映真实的数据分布特征
- 建议改用散点图、箱形图或增加数据收集

例子 2: **离散型分类数据不适用**

对于离散的分类数据，连续的分布曲线没有实际意义，因为分类之间不存在连续性关系。

```js | ob { inject: true, pin: false }
import { Chart } from '@antv/g2';

// 离散分类数据
const discreteData = [
  { category: '产品A', sales: 45 },
  { category: '产品B', sales: 67 },
  { category: '产品C', sales: 33 },
  { category: '产品D', sales: 52 },
  { category: '产品E', sales: 28 },
];

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  height: 250,
});

chart.options({
  type: 'interval',
  data: discreteData,
  encode: {
    x: 'category',
    y: 'sales',
    color: 'category',
  },
  style: {
    fillOpacity: 0.8,
  },
  axis: {
    x: { title: '产品类别' },
    y: { title: '销售数量' },
  },
  title: '分类数据建议使用柱状图',
});

chart.render();
```

**问题说明**：

- 分类数据之间没有连续性关系，强行连接会产生误导
- 分布曲线无法表达分类数据的真实含义
- 柱状图能更准确地表达分类数据的比较关系
- 适合使用柱状图、饼图等离散图表类型

## 分布曲线图与其他图表的对比

### 分布曲线图和[直方图](/charts/histogram)

- 分布曲线图通过平滑的曲线展示连续的频率分布，强调整体趋势
- 直方图通过矩形柱状图展示频数分布，具有明确的区间边界
- 分布曲线图更适合展示分布的整体形态和趋势识别
- 直方图更适合精确的频数统计和区间分析

### 分布曲线图和[小提琴图](/charts/violin)

- 分布曲线图专注于展示频率分布的曲线形态
- 小提琴图结合了密度分布和箱形图的统计摘要信息
- 分布曲线图更适合纯粹的分布形态分析和多组比较
- 小提琴图更适合需要统计摘要信息的场景

### 分布曲线图和[折线图](/charts/line)

- 分布曲线图基于频率统计，展示数据的分布特征
- 折线图展示数据随时间或顺序的变化趋势
- 分布曲线图适合统计分析和分布探索
- 折线图适合时间序列分析和趋势追踪

## 相似图表

<code src="./demos/list-card.tsx"></code>

## 分类

<code src="./demos/list-category.tsx"></code>
