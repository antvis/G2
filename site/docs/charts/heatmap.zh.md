---
title: 热力图
order: 7
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ze7gSYylw_QAAAAAAAAAAAAADmJ7AQ/original'
category: ['distribution', 'comparison']
similar: ['histogram', 'contourline', 'scatter', 'bubble']
---

<img alt="heatmap" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ze7gSYylw_QAAAAAAAAAAAAADmJ7AQ/original" width=600/>

## 热力图的简介

热力图是一种通过颜色强度映射二维数据密度或数值大小的可视化图表，擅长揭示数据分布规律、聚类特征及异常点。热力图将两个分类/连续字段（如 x、y）映射为坐标轴，第三个数值字段（如 value）映射为颜色梯度，形成网格化的色块矩阵，通常冷色调（如蓝色）表示低值，暖色调（如红色）表示高值。

热力图特别适合展示大量数据点的分布特征，通过颜色的变化可以直观地反映数据集中的密度或强度变化，帮助识别数据中的模式和关系。在展示多维数据时，热力图比条形图或散点图更加直观，能够一目了然地显示数据的聚集区域和稀疏区域。

热力图广泛应用于地理空间分析、网站用户行为研究、科学研究中的相关性分析等多种场景。

**英文名**：Heatmap, Heat Map

## 热力图的构成

### 边界未经平滑处理的热力图

<img alt="basic-heatmap" src="https://os.alipayobjects.com/rmsportal/dbxsqRSCIYXcEeW.png" width=600 />

| 图表类型         | 边界未经平滑处理的热力图                                    |
| ---------------- | ----------------------------------------------------------- |
| 适合的数据       | 三个连续字段                                                |
| 功能             | 观察数据的分布情况                                          |
| 数据与图形的映射 | 两个连续字段分别映射到 x 轴、y 轴。一个连续元数据映射到颜色 |
| 适合的数据条数   | 超过 30 条数据                                              |

---

### 边界经平滑处理的热力图

<img alt="density-heatmap" src="https://os.alipayobjects.com/rmsportal/XKeijYcqHgbSLHN.png" width=600/>

| 图表类型         | 边界经平滑处理的热力图                                      |
| ---------------- | ----------------------------------------------------------- |
| 适合的数据       | 三个连续字段                                                |
| 功能             | 展示数据的分布情况，加上统计算法可预测未知区域数据          |
| 数据与图形的映射 | 两个连续字段分别映射到 x 轴、y 轴。一个连续元数据映射到颜色 |
| 适合的数据条数   | 超过 30 条数据                                              |

## 热力图的应用场景

### 适合的场景

例 1: **适合展示二维数据的分布密度**

下面这张热力图展示了二维空间上的温度分布情况。通过颜色的变化可以直观地看出不同区域的温度差异。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  padding: 0,
});

chart.options({
  type: 'view',
  axis: false,
  children: [
    {
      type: 'image',
      style: {
        src: 'https://gw.alipayobjects.com/zos/rmsportal/NeUTMwKtPcPxIFNTWZOZ.png',
        x: '50%',
        y: '50%',
        width: '100%',
        height: '100%',
      },
      tooltip: false,
    },
    {
      type: 'heatmap',
      data: {
        type: 'fetch',
        value: 'https://assets.antv.antgroup.com/g2/heatmap.json',
      },
      encode: {
        x: 'g',
        y: 'l',
        color: 'tmp',
      },
      style: {
        opacity: 0,
      },
      tooltip: false,
    },
  ],
});

chart.render();
```

**说明**：

- `g` 字段映射到 x 轴，`l` 字段映射到 y 轴，表示二维空间中的位置
- `tmp` 字段映射到颜色，表示每个位置点的温度值
- 背景图像和热力叠加，直观展示温度分布情况

例 2: **适合展示散点数据的密度分布**

密度热力图可以展示散点数据的集中区域，下面的例子展示了钻石数据集中克拉数和价格的分布关系。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';
import DataSet from '@antv/data-set';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/diamond.json',
  },
  scale: {
    x: { nice: true, domainMin: -0.5 },
    y: { nice: true, domainMin: -2000 },
    color: { nice: true },
  },
  children: [
    {
      type: 'heatmap',
      data: {
        transform: [
          {
            type: 'custom',
            callback: (data) => {
              const dv = new DataSet.View().source(data);
              dv.transform({
                type: 'kernel-smooth.density',
                fields: ['carat', 'price'],
                as: ['carat', 'price', 'density'],
              });
              return dv.rows;
            },
          },
        ],
      },
      encode: {
        x: 'carat',
        y: 'price',
        color: 'density',
      },
      style: {
        opacity: 0.3,
        gradient: [
          [0, 'white'],
          [0.2, 'blue'],
          [0.4, 'cyan'],
          [0.6, 'lime'],
          [0.8, 'yellow'],
          [0.9, 'red'],
        ],
      },
    },
    {
      type: 'point',
      encode: {
        x: 'carat',
        y: 'price',
      },
    },
  ],
});

chart.render();
```

**说明**：

- `carat` 字段和 `price` 字段分别映射到 x 轴和 y 轴
- 使用核密度估计（kernel density estimation）计算散点的密度分布
- 密度值映射到颜色，形成热力效果
- 叠加原始散点数据，可以同时观察数据点和密度分布

### 不适合的场景

例 1: **不适合精确比较具体数值**

热力图通过颜色强度表现数值大小，但人眼对颜色的感知不如对长度的感知精确。如果需要准确比较具体数值，柱状图或折线图是更好的选择。

例 2: **不适合展示少量离散数据点**

当数据点较少时，热力图的密度分布优势不明显，直接使用散点图可能更为清晰直观。

## 热力图的扩展

### 阈值热力图

阈值热力图根据预设的阈值区间，将连续数据划分为离散的颜色区间，适合强调特定范围内的数据。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

// 生成模拟的二维网格数据
const data = [];
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    data.push({
      x: i,
      y: j,
      value: Math.floor(Math.random() * 100),
    });
  }
}

chart.options({
  type: 'cell',
  data,
  encode: {
    x: 'x',
    y: 'y',
    color: 'value',
  },
  scale: {
    color: {
      type: 'threshold',
      domain: [25, 50, 75],
      range: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b'],
    },
  },
  style: {
    stroke: '#fff',
    lineWidth: 1,
  },
  label: {
    text: 'value',
    style: {
      fontSize: 10,
      fill: '#000',
    },
  },
});

chart.render();
```

**说明**：

- 生成 10x10 的网格数据，模拟二维热力图数据结构
- 使用阈值（threshold）比例尺将连续数据划分为离散区间
- 设置了 25、50、75 三个阈值，将数据分为四个区间
- 每个区间使用不同的颜色表示，便于区分不同数值级别的分布

## 热力图与其他图表的对比

### 热力图与[散点图](/charts/scatter)

- 热力图强调数据密度和分布模式，通过颜色梯度直观地展示数据集中区域
- 散点图展示每个独立的数据点，更适合观察个体数据点的分布和离群点
- 热力图适合处理大量数据点，散点图在数据量大时可能出现重叠问题

### 热力图与[气泡图](/charts/bubble-chart)

- 热力图通过颜色强度表现数据密度或第三维度的数值大小
- 气泡图通过气泡大小表现第三维度的数值，同时可以显示具体的数据点位置
- 热力图更适合展示连续分布和密度模式，气泡图更适合展示离散数据点的多维关系

### 热力图与[等高线图](/charts/contourline)

- 热力图使用颜色强度来表示数值大小，提供直观的视觉对比
- 等高线图使用等值线连接相同数值的点，更适合分析连续变化的趋势和梯度
- 热力图更适合展示离散数据点的密度分布，等高线图更适合展示连续表面的变化模式

### 热力图与[直方图](/charts/histogram)

- 热力图可以展示二维空间上的数据分布，适合分析两个变量之间的关系
- 直方图展示单一变量的频率分布，更适合分析单一变量的分布特征
- 热力图可以看作是二维直方图的扩展，用颜色替代了高度来表示频率或密度

## 相似图表

<code src="./demos/list-card.tsx"></code>

## 分类

<code src="./demos/list-category.tsx"></code>
