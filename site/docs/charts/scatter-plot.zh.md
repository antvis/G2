---
title: 散点图
order: 11
screenshot: "https://os.alipayobjects.com/rmsportal/EFRpgfUCANawLBP.jpg"
category: ['relation', 'trend',]
similar: ['bubble', 'line', 'area']
---

<img alt="scatter" src="https://os.alipayobjects.com/rmsportal/EFRpgfUCANawLBP.jpg" width=600/>

## 散点图的简介

散点图是一种通过二维坐标平面上的点来展示两个连续变量之间关系的可视化图表。每个数据点的位置由两个变量的值决定，其中一个变量确定水平位置（x轴），另一个变量确定垂直位置（y轴）。

散点图有别于[折线图](/charts/line)，散点图主要用于探索和展示变量间的相关性、分布模式以及异常值的识别，而折线图更适合展示连续数据的趋势变化。

![散点图变量关系示例](https://t.alipayobjects.com/images/T1xypjXj4bXXXXXXXX.png)

通过观察散点图上数据点的分布情况，我们可以推断出变量间的相关性。如果变量之间不存在相互关系，那么在散点图上就会表现为随机分布的离散的点，如果存在某种相关性，那么大部分数据点就会相对密集并以某种趋势呈现。数据的相关关系主要分为：正相关（两个变量值同时增长）、负相关（一个变量值增加另一个变量值下降）、不相关、线性相关、指数相关等。

**英文名**：Scatter plot, Scatter chart

## 散点图的构成

<img alt="scatter-components" src="https://t.alipayobjects.com/images/T1wy8jXnlgXXXXXXXX.png" width=600 />

| 图表类型         | 散点图                                                                                              |
| ---------------- | --------------------------------------------------------------------------------------------------- |
| 适合的数据       | 列表：两个连续数据字段                                                                              |
| 功能             | 探索两个变量之间的相关性，识别数据模式和异常值                                                      |
| 数据与图形的映射 | 第一个连续数据字段映射到横轴位置<br>第二个连续数据字段映射到纵轴位置<br>可选分类字段映射到点的颜色或大小 |
| 适合的数据条数   | 10-1000 条数据，数据过多时可考虑采样或使用密度图                                                   |

**组成元素：**
1. **数据点（Points）**：代表数据集中每个观测值的圆点或其他形状
2. **X轴（X-axis）**：水平坐标轴，通常表示自变量
3. **Y轴（Y-axis）**：垂直坐标轴，通常表示因变量
4. **坐标网格（Grid）**：辅助读数的参考线
5. **图例（Legend）**：当有多个数据系列时，说明不同点的含义

```js | ob { autoMount: true }

  import { Chart } from "@antv/g2";

  const chart = new Chart({ container: "container" });

  chart.options({
    type: "view",
    autoFit: true,
    data: [
      { height: 161, weight: 50 },
      { height: 167, weight: 55 },
      { height: 171, weight: 63 },
      { height: 174, weight: 58 },
      { height: 176, weight: 65 },
      { height: 178, weight: 70 },
      { height: 180, weight: 72 },
      { height: 182, weight: 75 },
      { height: 185, weight: 78 },
      { height: 188, weight: 82 }
    ],
    encode: { x: "height", y: "weight" },
    scale: { x: { range: [0, 1] }, y: { domainMin: 0, nice: true } },
    children: [
      { 
        type: "point", 
        style: { 
          fill: "#1890ff", 
          fillOpacity: 0.7,
          stroke: "#1890ff",
          strokeWidth: 2,
          r: 6
        }
      }
    ],
    axis: {
      x: { title: "身高 (cm)" },
      y: { title: "体重 (kg)" }
    }
  });

  chart.render();


```

## 散点图的应用场景

### 适合的场景

例子 1: **适合应用到相关性分析**

下图展示了广告投入与销售收入的关系，通过散点图可以清晰地看出两者之间的正相关关系。

| adSpend（广告投入万元） | revenue（销售收入万元） |
| ----------------------- | ----------------------- |
| 10                      | 120                     |
| 15                      | 180                     |
| 20                      | 220                     |
| ...                     | ...                     |

```js | ob { autoMount: true }
import { Chart } from "@antv/g2";

const chart = new Chart({
  container: "container",
});

chart.options({
  type: "view",
  autoFit: true,
  data: [
    { adSpend: 10, revenue: 120 },
    { adSpend: 15, revenue: 180 },
    { adSpend: 20, revenue: 220 },
    { adSpend: 25, revenue: 280 },
    { adSpend: 30, revenue: 320 },
    { adSpend: 35, revenue: 380 },
    { adSpend: 40, revenue: 420 },
    { adSpend: 45, revenue: 480 },
    { adSpend: 50, revenue: 520 },
    { adSpend: 55, revenue: 580 },
    { adSpend: 60, revenue: 620 },
    { adSpend: 65, revenue: 680 }
  ],
  encode: { x: "adSpend", y: "revenue" },
  scale: { x: { range: [0, 1] }, y: { domainMin: 0, nice: true } },
  children: [
    { 
      type: "point", 
      style: { 
        fill: "#52c41a", 
        fillOpacity: 0.8,
        stroke: "#52c41a",
        strokeWidth: 2,
        r: 8
      }
    }
  ],
  axis: {
    x: { title: "广告投入 (万元)" },
    y: { title: "销售收入 (万元)" }
  },
  title: "广告投入与销售收入关系分析"
});

chart.render();
```

**说明**：
- `adSpend` 字段映射到 X 轴位置，表示广告投入金额
- `revenue` 字段映射到 Y 轴位置，表示销售收入
- 数据点分布呈现明显的正相关趋势

例子 2: **适合应用到数据分布探索**

通过散点图可以观察数据的分布模式、聚类和异常值，下图展示了不同班级学生成绩的分布：

```js | ob { autoMount: true }
import { Chart } from "@antv/g2";

const chart = new Chart({
  container: "container",
});

chart.options({
  type: "view",
  autoFit: true,
  data: [
    { math: 85, english: 78, category: '理科班' },
    { math: 92, english: 75, category: '理科班' },
    { math: 88, english: 82, category: '理科班' },
    { math: 95, english: 79, category: '理科班' },
    { math: 89, english: 85, category: '理科班' },
    { math: 76, english: 88, category: '文科班' },
    { math: 72, english: 92, category: '文科班' },
    { math: 78, english: 85, category: '文科班' },
    { math: 74, english: 89, category: '文科班' },
    { math: 80, english: 91, category: '文科班' },
    { math: 82, english: 83, category: '综合班' },
    { math: 86, english: 84, category: '综合班' },
    { math: 84, english: 86, category: '综合班' },
    { math: 87, english: 81, category: '综合班' }
  ],
  encode: { x: "math", y: "english", color: "category" },
  scale: { 
    x: { range: [0, 1] }, 
    y: { domainMin: 0, nice: true },
    color: { palette: ['#1890ff', '#52c41a', '#fa8c16'] }
  },
  children: [
    { 
      type: "point", 
      style: { 
        fillOpacity: 0.8,
        strokeWidth: 2,
        r: 8
      }
    }
  ],
  axis: {
    x: { title: "数学成绩" },
    y: { title: "英语成绩" }
  },
  legend: {
    color: { title: "班级类型" }
  },
  title: "不同班级学生成绩分布"
});

chart.render();
```

### 不适合的场景

例子 1: **数据点过多导致重叠**

当数据点过多时，散点图会出现严重的重叠问题，影响数据的可读性。如下图所示的 1000 个数据点的散点图：

```js | ob { autoMount: true }
import { Chart } from "@antv/g2";

const chart = new Chart({
  container: "container",
});

// 生成 1000 个随机数据点
const data = Array.from({ length: 1000 }, (_, i) => ({
  x: Math.random() * 100,
  y: Math.random() * 100 + Math.random() * 20,
  id: i
}));

chart.options({
  type: "view",
  autoFit: true,
  data,
  encode: { x: "x", y: "y" },
  scale: { x: { range: [0, 1] }, y: { domainMin: 0, nice: true } },
  children: [
    { 
      type: "point", 
      style: { 
        fill: "#1890ff", 
        fillOpacity: 0.6,
        stroke: "#1890ff",
        strokeWidth: 1,
        r: 4
      }
    }
  ],
  axis: {
    x: { title: "X 变量" },
    y: { title: "Y 变量" }
  },
  title: "数据点过多的散点图（重叠严重）"
});

chart.render();
```

对于大量数据点，更适合使用**密度图**或**热力图**：

```js | ob { autoMount: true }
import { Chart } from "@antv/g2";

const chart = new Chart({
  container: "container",
});

// 使用相同的数据，但采用密度图表示
chart.options({
  type: "view",
  autoFit: true,
  data: Array.from({ length: 1000 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100 + Math.random() * 20,
    id: i
  })),
  encode: { x: "x", y: "y" },
  scale: { x: { range: [0, 1] }, y: { domainMin: 0, nice: true } },
  children: [
    { 
      type: "point", 
      style: { 
        fill: "#1890ff", 
        fillOpacity: 0.1,
        stroke: "none",
        r: 2
      }
    }
  ],
  axis: {
    x: { title: "X 变量" },
    y: { title: "Y 变量" }
  },
  title: "优化后的散点图（降低透明度和点大小）"
});

chart.render();
```

例子 2: **不适合展示分类数据的对比**

散点图不适合用于展示分类数据的数值对比，如下图试图用散点图展示不同产品的销量：

```js | ob { autoMount: true }
import { Chart } from "@antv/g2";

const chart = new Chart({
  container: "container",
});

chart.options({
  type: "view",
  autoFit: true,
  data: [
    { product: '产品A', sales: 275 },
    { product: '产品B', sales: 115 },
    { product: '产品C', sales: 120 },
    { product: '产品D', sales: 350 },
    { product: '产品E', sales: 150 },
  ],
  encode: { x: "product", y: "sales" },
  scale: { x: { range: [0, 1] }, y: { domainMin: 0, nice: true } },
  children: [
    { 
      type: "point", 
      style: { 
        fill: "#1890ff", 
        fillOpacity: 0.8,
        stroke: "#1890ff",
        strokeWidth: 2,
        r: 8
      }
    }
  ],
  axis: {
    x: { title: "产品类型" },
    y: { title: "销量" }
  },
  title: "不适合的用法：用散点图展示分类数据"
});

chart.render();
```

对于分类数据的对比，更适合使用[柱状图](/charts/bar)：

```js | ob { autoMount: true }
import { Chart } from "@antv/g2";

const chart = new Chart({
  container: "container",
});

chart.options({
  type: "interval",
  autoFit: true,
  data: [
    { product: '产品A', sales: 275 },
    { product: '产品B', sales: 115 },
    { product: '产品C', sales: 120 },
    { product: '产品D', sales: 350 },
    { product: '产品E', sales: 150 },
  ],
  encode: { x: "product", y: "sales", color: "product" },
  axis: {
    x: { title: "产品类型" },
    y: { title: "销量" }
  },
  title: "更适合的选择：用柱状图展示分类数据"
});

chart.render();
```

## 散点图的扩展


### 带趋势线的散点图

添加回归线来更清晰地展示数据趋势：

```js | ob { autoMount: true }

  import { Chart } from "@antv/g2";

  const chart = new Chart({ container: "container" });

  const data = [
    { x: 1, y: 2.1 }, { x: 2, y: 3.8 }, { x: 3, y: 5.2 },
    { x: 4, y: 6.9 }, { x: 5, y: 8.1 }, { x: 6, y: 9.8 },
    { x: 7, y: 11.2 }, { x: 8, y: 13.1 }, { x: 9, y: 14.8 },
    { x: 10, y: 16.5 }
  ];

  chart.options({
    type: "view",
    autoFit: true,
    data,
    encode: { x: "x", y: "y" },
    scale: { x: { range: [0, 1] }, y: { domainMin: 0, nice: true } },
    children: [
      {
        type: "point",
        style: {
          fill: "#1890ff",
          fillOpacity: 0.8,
          stroke: "#1890ff",
          strokeWidth: 2,
          r: 6
        }
      },
      {
        type: "line",
        style: {
          stroke: "#ff4d4f",
          strokeWidth: 2,
          strokeDasharray: [4, 4]
        }
      }
    ],
    axis: {
      x: { title: "X 变量" },
      y: { title: "Y 变量" }
    },
    title: "带趋势线的散点图"
  });

  chart.render();

```

## 散点图与其他图表类型的对比


| 图表类型 | 适用场景 | 优势 | 劣势 |
|---------|---------|------|------|
| 散点图 | 探索两变量关系、异常值检测 | 直观展示相关性、易于识别模式 | 数据点过多时可能重叠 |
| 折线图 | 时间序列数据、趋势展示 | 清晰显示变化趋势 | 不适合展示变量间相关性 |
| 柱状图 | 分类数据比较 | 便于比较不同类别 | 无法展示连续变量关系 |
| 气泡图 | 三维数据展示 | 信息量更大 | 复杂度较高，解读难度增加 |

## 相似图表

<code src="./demos/list-card.tsx"></code>

## 分类

<code src="./demos/list-category.tsx"></code>