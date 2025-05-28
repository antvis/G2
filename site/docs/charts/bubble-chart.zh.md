---
title: 气泡图
order: 2
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*z8JFRLxrs_IAAAAAAAAAAAAADmJ7AQ/original'
category: ['relation', 'distribution']
similar: ['scatter', 'bubble-map']
---

<img alt="bubble" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*z8JFRLxrs_IAAAAAAAAAAAAADmJ7AQ/original" width=600/>

## 气泡图的简介

气泡图是散点图的一种变形，它在散点图的基础上增加了第三个维度的数据展示。在气泡图中，每个数据点不仅仅由X轴和Y轴的位置决定，还由气泡的大小表示第三个维度的数值大小。气泡的大小编码了数据的另一个量化属性，使得每个点能同时展现三个变量的信息（X位置、Y位置和气泡大小）。

气泡图非常适合展示三个数值变量之间的关系，帮助我们发现数据中的模式、相关性或异常值。此外，通过添加颜色编码，可以在气泡图中展现第四个维度的信息，进一步丰富图表的信息量。

**英文名**：Bubble Chart



## 气泡图的构成

### 基础气泡图

<img alt="bubble-basic" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*z8JFRLxrs_IAAAAAAAAAAAAADmJ7AQ/original" width=600 />

| 图表类型         | 基础气泡图                                                                                      |
| ---------------- | ----------------------------------------------------------------------------------------------- |
| 适合的数据       | 多维度数据：至少两个连续型数据字段（X、Y轴）和一个数值型数据字段（气泡大小）                    |
| 功能             | 展示多个变量之间的关系，发现数据模式和相关性                                                    |
| 数据与图形的映射 | 两个连续变量映射到XY坐标<br>第三个变量映射到气泡的大小<br>可选的分类型变量映射到气泡的颜色或形状 |
| 适合的数据条数   | 通常不超过100个数据点，过多会导致图表拥挤                                                       |
| 视觉设计建议     | 使用半透明气泡避免重叠遮挡<br>气泡大小范围应适中，避免过大或过小<br>添加网格线辅助阅读坐标值      |

---

### 对数气泡图

<img alt="bubble-log" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*mezjR7Iy-TYAAAAAAAAAAAAADmJ7AQ/original" width=600/>

| 图表类型         | 对数气泡图                                                                                           |
| ---------------- | ---------------------------------------------------------------------------------------------------- |
| 适合的数据       | 数值范围差异极大的数据集，需要对数变换来展示                                                         |
| 功能             | 处理数据跨度很大的情况，如人口数据、GDP数据等                                                        |
| 数据与图形的映射 | 与基础气泡图相同，但采用对数比例尺<br>两个连续变量映射到XY坐标<br>第三个变量通过对数映射到气泡的大小 |
| 使用场景         | 当数据出现指数增长或数值范围跨越多个数量级时                                                         |
| 实现方法         | 使用`scale: { size: { type: 'log', range: [4, 20] } }`配置对数比例尺                                |
| 注意事项         | 应在图例或标签中明确指出使用了对数变换，避免误导读者                                                 |

## 气泡图的应用场景

### 适合的场景

气泡图最适合用于以下几类场景：

1. **多维数据分析** - 当需要同时分析三个或更多变量之间的关系
2. **比较特征聚类** - 发现数据中的分组模式和异常值
3. **资源分配可视化** - 展示多维度指标下的资源分布
4. **风险与机会分析** - 同时考虑多个因素的决策辅助

#### 示例 1: **经济与人口健康指标分析**

下图展示了不同国家人均GDP、预期寿命与人口数量的关系，同时用颜色区分了不同大洲，有效地在一个图表中展现了四个维度的数据。

| country（国家） | GDP（人均GDP） | lifeExpectancy（预期寿命） | population（人口） | continent（大洲） |
| --------------- | -------------- | -------------------------- | ------------------ | ----------------- |
| China           | 12547          | 76.9                       | 1403500365         | Asia              |
| United States   | 59532          | 78.5                       | 321773631          | Americas          |
| India           | 6427           | 68.3                       | 1324517249         | Asia              |
| Japan           | 38428          | 83.9                       | 127141000          | Asia              |
| Germany         | 46136          | 81.0                       | 82695000           | Europe            |

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'point',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
  },
  encode: {
    x: 'GDP',
    y: 'LifeExpectancy',
    size: 'Population',
    color: 'continent',
    shape: 'point'
  },
  scale: { 
    size: { type: 'log', range: [4, 20] } 
  },
  style: { 
    fillOpacity: 0.3, 
    lineWidth: 1 
  },
  legend: {
    size: false
  }
});

chart.render();
```

**分析** ：

- `GDP` 字段映射到 X 轴，表示国家人均GDP，可以看出发达国家集中在右侧
- `LifeExpectancy` 字段映射到 Y 轴，表示国民预期寿命，能够观察到人均GDP与预期寿命有正相关性
- `Population` 字段映射到气泡大小，通过对数比例尺处理，使得中国、印度等人口大国清晰可见
- `continent` 字段映射到颜色，可以看出不同大洲国家的聚类分布

**洞察**：通过此图，我们可以直观地观察到:
1. 经济水平与健康水平的正相关关系
2. 人口规模与经济发展之间并无必然联系
3. 不同大洲国家的发展模式存在差异

### 不适合的场景

例子 1: **数据点过多或气泡重叠过度**

当数据点超过100个或气泡严重重叠时，气泡图可能变得混乱难以阅读。在这种情况下，可以考虑使用热力图或分面图表。

以下是一个包含大量数据点的气泡图示例，可以看到随着数据点的增加，气泡之间的重叠让图表变得难以解读：

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

// 生成200个随机数据点
const data = Array.from({ length: 200 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 20 + 5,
  category: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)]
}));

chart.options({
  type: 'point',
  autoFit: true,
  data,
  encode: {
    x: 'x',
    y: 'y',
    size: 'size',
    color: 'category'
  },
  style: { 
    fillOpacity: 0.3, 
    lineWidth: 1 
  },
});

chart.render();
```

例子 2: **只有两个变量需要比较**

当只需比较两个变量之间的关系时，散点图比气泡图更简洁有效。气泡图的第三个变量（气泡大小）如果没有必要，反而会增加认知负担。

例子 3: **展示趋势变化的时序数据**

气泡图不适合展示时序趋势数据。对于需要展示随时间变化趋势的数据，折线图或面积图是更好的选择。

下面是一个不使用气泡图而使用折线图展示时序数据的例子：

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'view',
  autoFit: true,
  data: [
    { day: '2015/9/1', share: 10, volume: 1200 },
    { day: '2015/9/5', share: 20, volume: 2100 },
    { day: '2015/9/10', share: 32, volume: 3400 },
    { day: '2015/9/15', share: 45, volume: 2900 },
    { day: '2015/9/20', share: 51, volume: 4100 },
    { day: '2015/9/25', share: 45, volume: 3800 },
    { day: '2015/9/30', share: 40, volume: 2700 },
  ],
  encode: { x: 'day', y: 'share' },
  axis: {
    y: {
      title: '股价',
    },
    x: {
      title: '日期',
    },
  },
  children: [
    {
      type: 'line',
      style: {
        lineWidth: 3,
      },
    },
  ],
});

chart.render();
```

如果确实需要在时序数据中加入第三个维度的信息，可以使用带有大小编码的时间序列气泡图：

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'point',
  autoFit: true,
  data: [
    { day: '2015/9/1', share: 10, volume: 1200 },
    { day: '2015/9/5', share: 20, volume: 2100 },
    { day: '2015/9/10', share: 32, volume: 3400 },
    { day: '2015/9/15', share: 45, volume: 2900 },
    { day: '2015/9/20', share: 51, volume: 4100 },
    { day: '2015/9/25', share: 45, volume: 3800 },
    { day: '2015/9/30', share: 40, volume: 2700 },
  ],
  encode: { 
    x: 'day', 
    y: 'share',
    size: 'volume'
  },
  scale: {
    size: { range: [10, 40] }
  },
  style: { 
    fillOpacity: 0.6, 
    stroke: '#1890ff',
    fill: '#1890ff'
  },
  axis: {
    y: { title: '股价' },
    x: { title: '日期' }
  },
  annotations: [
    {
      type: 'line',
      data: [
        { day: '2015/9/1', share: 10 },
        { day: '2015/9/5', share: 20 },
        { day: '2015/9/10', share: 32 },
        { day: '2015/9/15', share: 45 },
        { day: '2015/9/20', share: 51 },
        { day: '2015/9/25', share: 45 },
        { day: '2015/9/30', share: 40 },
      ],
      encode: { x: 'day', y: 'share' },
      style: { stroke: '#1890ff', lineWidth: 2 }
    }
  ]
});

chart.render();
```

## 气泡图与其他图表的对比

### 气泡图和[散点图](/charts/scatter)、[热力图](/charts/heatmap)

| 图表类型 | 主要特点 | 适用场景 | 数据维度 |
|---------|---------|---------|---------|
| 气泡图 | 通过点的大小编码额外维度 | 多变量关系分析 | 3-4个变量(X、Y、大小、颜色) |
| 散点图 | 仅展示点的位置 | 二维相关性分析 | 2-3个变量(X、Y、颜色) |
| 热力图 | 通过颜色深浅展示密度或量值 | 展示分布密度 | 3个变量(X、Y、颜色强度) |

### 气泡图和[散点地图](/charts/scatter-map)、[气泡地图](/charts/bubble-map)

| 图表类型 | 坐标系统 | 数据约束 | 应用场景 |
|---------|---------|---------|---------|
| 气泡图 | 抽象坐标系 | 可使用任意数值作为XY坐标 | 多维数据关系可视化 |
| 气泡地图 | 地理坐标系 | 点位置受地理坐标约束 | 地理数据中多变量分析 |
| 散点地图 | 地理坐标系 | 点位置受地理坐标约束 | 地理位置的简单分布 |

## 气泡图最佳实践

### 设计建议

1. **气泡大小选择**
   - 设置合适的气泡大小范围，避免过大导致重叠，或过小导致难以辨认
   - 使用半透明填充色，降低重叠区域的视觉干扰

2. **数据处理**
   - 当气泡大小差异过大时，考虑使用对数比例尺
   - 适当筛选数据，避免图表过于拥挤

3. **标签和交互**
   - 添加悬停交互，显示详细数据信息
   - 对重要数据点添加标签，但避免标签过多造成混乱

### 代码示例：添加悬停交互的气泡图

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'point',
  autoFit: true,
  data: [
    { x: 10, y: 20, size: 20, category: 'A', name: '项目1' },
    { x: 20, y: 40, size: 35, category: 'A', name: '项目2' },
    { x: 30, y: 30, size: 15, category: 'B', name: '项目3' },
    { x: 40, y: 60, size: 40, category: 'B', name: '项目4' },
    { x: 50, y: 50, size: 25, category: 'C', name: '项目5' },
  ],
  encode: {
    x: 'x',
    y: 'y',
    size: 'size',
    color: 'category',
    shape: 'point'
  },
  style: { 
    fillOpacity: 0.6, 
    lineWidth: 1 
  },
  tooltip: {
    items: [
      { field: 'name', name: '项目名称' },
      { field: 'x', name: 'X值' },
      { field: 'y', name: 'Y值' },
      { field: 'size', name: '大小' },
    ]
  },
  interaction: [
    { type: 'tooltip' },
    { type: 'elementHighlight' }
  ]
});

chart.render();
```

## 相似图表

<code src="./demos/list-card.tsx"></code>

## 分类

<code src="./demos/list-category.tsx"></code>
