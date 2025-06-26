---
title: 雷达图
order: 3
screenshot: 'https://os.alipayobjects.com/rmsportal/DLgjgcpcRbaZIfQ.jpg'
category: ['comparison']
similar: ['rose', 'radial-bar', 'pie']
---

<img alt="radar" src="https://os.alipayobjects.com/rmsportal/DLgjgcpcRbaZIfQ.jpg" width=600/>

## 雷达图的简介

雷达又叫戴布拉图、蜘蛛网图。传统的雷达图被认为是一种表现多维（4 维以上）数据的图表。它将多个维度的数据量映射到坐标轴上，这些坐标轴起始于同一个圆心点，通常结束于圆周边缘，将同一组的点使用线连接起来就称为了雷达图。它可以将多维数据进行展示，但是点的相对位置和坐标轴之间的夹角是没有任何信息量的。在坐标轴设置恰当的情况下雷达图所围面积能表现出一些信息量。

每一个维度的数据都分别对应一个坐标轴，这些坐标轴具有相同的圆心，以相同的间距沿着径向排列，并且各个坐标轴的刻度相同。连接各个坐标轴的网格线通常只作为辅助元素。将各个坐标轴上的数据点用线连接起来就形成了一个多边形。坐标轴、点、线、多边形共同组成了雷达图。

着重要强调的是，虽然雷达图每个轴线都表示不同维度，但使用上为了容易理解和统一比较。使用雷达图经常会人为的将将多个坐标轴都统一成一个度量，比如：统一成分数、百分比等。这样这个图就退化成一个二维图了，事实上这种雷达图在日常生活更常见、更长用。 另外，雷达图还可以展示出数据集中各个变量的权重高低情况，非常适用于展示性能数据。

雷达图的主要缺点是：

(1) 如果雷达图上多边形过多会使可读性下降，使整体图形过于混乱。特别是有颜色填充的多边形的情况，上层会遮挡覆盖下层多边形。

(2) 如果变量过多，也会造成可读性下降，因为一个变量对应一个坐标轴，这样会使坐标轴过于密集，使图表给人感觉很复杂。所以最佳实践就是尽可能控制变量的数量使雷达图保持简单清晰。

注意：

(1) 为了使概念尽可能简单，且贴近现今的使用习惯，下面我们暂时只介绍退化为二维的雷达图。

(2) 雷达图更注重于同类图表之间的对比（即雷达图与雷达图之间的对比）

**英文名**：Radar Chart, Spider Chart, Web Chart, Polar Chart, Star Plots

## 雷达图的构成

### 单组雷达图

<img alt="radar" src="https://os.alipayobjects.com/rmsportal/xeuEDbQyDWZngob.png" width=600 />

| 图表类型         | 单组雷达图                                                    |
| ---------------- | ------------------------------------------------------------- |
| 适合的数据       | 一个分类字段，一个连续字段                                    |
| 功能             | 对比分类数据的数值大小                                        |
| 数据与图形的映射 | 分类字段映射到极坐标下角度标定的位置 连续字段映射到半径长度。 |
| 适合的数据条数   | 不超过 30 条                                                  |

---

### 多组雷达图

<img alt="radar" src="https://os.alipayobjects.com/rmsportal/pQDJLaWnSQrQhii.png" width=600 />

| 图表类型         | 多组雷达图                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------ |
| 适合的数据       | 一个连续字段，两个个分类字段                                                               |
| 功能             | 对比不同分类数据的数值大小                                                                 |
| 数据与图形的映射 | 一个分类字段映射到极坐标下角度标定的位置 另一个分类字段映射到颜色 连续字段映射到半径长度。 |
| 适合的数据条数   | 不超过 30 条                                                                               |

---

## 雷达图的应用场景

### 适合的场景

例子 1: **适合应用到多维数据对比的场景**

下图是一个个人综合能力评估雷达图。

| ability  | score（评分，满分 10 分） |
| -------- | ------------------------- |
| 语言表达 | 8.8                       |
| 逻辑思维 | 9.0                       |
| 亲和力   | 7.2                       |
| 运动     | 4.5                       |
| 学习     | 8.3                       |

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'area',
  coordinate: {
    type: 'polar',
  },
  autoFit: true,
  data: [
    { ability: '语言表达', score: 8.8 },
    { ability: '逻辑思维', score: 9.0 },
    { ability: '亲和力', score: 7.2 },
    { ability: '运动', score: 4.5 },
    { ability: '学习', score: 8.3 },
  ],
  encode: { x: 'ability', y: 'score' },
  scale: {
    x: { padding: 0.5, align: 0 },
    y: {
      domainMin: 0,
      domainMax: 10,
      tickCount: 5,
      label: false,
    },
  },
  style: {
    fillOpacity: 0.5,
    lineWidth: 2,
  },
  axis: {
    x: { grid: true },
    y: { tick: false, grid: true, title: false, zIndex: 1 },
  },
  interaction: {
    tooltip: { crosshairsLineDash: [4, 4] },
  },
});

chart.render();
```

**说明** ：

- `ability` 字段，映射到极坐标下角度标定的位置，用于区分不同的能力类型
- `score` 字段，映射到半径长度，表示评分高低

例子 2: **适合应用到多个维度组成的能力衡量的场景**

如下面展示了华为 Mate 和 中兴 Grand Memo 两款手机的综合表现雷达图，分别从易用性、功能、拍照、跑分、续航这五个维度进行考核，可以看出两款手机在这个维度方面的性能都比较平衡，同时也可逐项对比。`虚构数据`

| performance（综合表现） | type（手机类型） | score（评分，满分 100 分） |
| ----------------------- | ---------------- | -------------------------- |
| 易用性                  | 华为 Mate        | 80                         |
| 功能                    | 华为 Mate        | 90                         |
| 拍照                    | 华为 Mate        | 80                         |
| 跑分                    | 华为 Mate        | 70                         |
| 续航                    | 华为 Mate        | 90                         |
| 易用性                  | 中兴 Grand Memo  | 70                         |
| 功能                    | 中兴 Grand Memo  | 82                         |
| 拍照                    | 中兴 Grand Memo  | 81                         |
| 跑分                    | 中兴 Grand Memo  | 82                         |
| 续航                    | 中兴 Grand Memo  | 78                         |

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'line',
  coordinate: {
    type: 'polar',
  },
  autoFit: true,
  data: [
    { performance: '易用性', type: '华为 Mate', score: 80 },
    { performance: '功能', type: '华为 Mate', score: 90 },
    { performance: '拍照', type: '华为 Mate', score: 80 },
    { performance: '跑分', type: '华为 Mate', score: 70 },
    { performance: '续航', type: '华为 Mate', score: 90 },
    { performance: '易用性', type: '中兴 Grand Memo', score: 70 },
    { performance: '功能', type: '中兴 Grand Memo', score: 82 },
    { performance: '拍照', type: '中兴 Grand Memo', score: 81 },
    { performance: '跑分', type: '中兴 Grand Memo', score: 82 },
    { performance: '续航', type: '中兴 Grand Memo', score: 78 },
  ],
  encode: { x: 'performance', y: 'score', color: 'type' },
  scale: {
    x: { padding: 0.5, align: 0 },
    y: {
      domainMin: 0,
      domainMax: 100,
      tickCount: 5,
      label: false,
    },
  },
  style: {
    fillOpacity: 0.5,
    lineWidth: 2,
  },
  axis: {
    x: { grid: true, tick: false, gridLineDash: [0, 0] },
    y: {
      tick: false,
      grid: true,
      title: false,
      zIndex: 1,
      gridLineDash: [0, 0],
      gridAreaFill: (dataum, index, data) => {
        return index % 2 === 1 ? 'rgba(0, 0, 0, 0.04)' : '';
      },
    },
  },
  interaction: {
    tooltip: { crosshairsLineDash: [4, 4] },
  },
});

chart.render();
```

**说明** ：

- `performance` 字段，映射到极坐标下角度标定的位置，用于区分综合表现类型
- `type` 字段，手机类型，用于颜色区分
- `score` 字段，映射到半径长度，表示评分高低

## 雷达图与其他图表的对比

### 雷达图和[饼图](/charts/pie)

- 雷达图主要用于多个维度间的数据（大小、数值）的对比
- 饼图主要是展示分类之间的占比情况

### 雷达图和玉珏图

- 玉珏图通过各分类的分布角度、长度以及颜色的密度来对比数据，适用于展示各部分占整体的比例。
- 雷达图通过多边形的边缘或弧线到极坐标中的半径长度来对比数据，适合比较不同类别在多个维度上的表现。

## 相似图表

<code src="./demos/list-card.tsx"></code>

## 分类

<code src="./demos/list-category.tsx"></code>
