---
title: 散点图
order: 11
screenshot: /screenshots/scatter-plot.webp
category: ['correlation', 'distribution']
similar: ['bubble', 'line', 'area']
---

## 简介

散点图是一种通过二维坐标平面上的点来展示两个连续变量之间关系的可视化图表。每个数据点的位置由两个变量的值决定，其中一个变量确定水平位置（x轴），另一个变量确定垂直位置（y轴）。散点图特别适合用于探索和展示变量间的相关性、分布模式以及异常值的识别。

## 构成

散点图主要由以下几个部分构成：

1. **数据点（Points）**：代表数据集中每个观测值的圆点或其他形状
2. **X轴（X-axis）**：水平坐标轴，通常表示自变量
3. **Y轴（Y-axis）**：垂直坐标轴，通常表示因变量
4. **坐标网格（Grid）**：辅助读数的参考线
5. **图例（Legend）**：当有多个数据系列时，说明不同点的含义

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'point',
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
    encode: {
      x: 'height',
      y: 'weight'
    },
    style: {
      fill: '#1890ff',
      fillOpacity: 0.7,
      stroke: '#1890ff',
      strokeWidth: 2,
      r: 6
    },
    axis: {
      x: { title: '身高 (cm)' },
      y: { title: '体重 (kg)' }
    }
  });

  chart.render();

  return chart.getContainer();
})();
```

## 应用场景

散点图在数据分析和可视化中有着广泛的应用：

### 相关性分析

用于探索两个连续变量之间的线性或非线性关系：

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // 模拟广告投入与销售收入的关系数据
  const data = [
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
  ];

  chart.options({
    type: 'point',
    data,
    encode: {
      x: 'adSpend',
      y: 'revenue'
    },
    style: {
      fill: '#52c41a',
      fillOpacity: 0.8,
      stroke: '#52c41a',
      strokeWidth: 2,
      r: 8
    },
    axis: {
      x: { title: '广告投入 (万元)' },
      y: { title: '销售收入 (万元)' }
    },
    title: '广告投入与销售收入关系分析'
  });

  chart.render();

  return chart.getContainer();
})();
```

### 数据分布探索

通过散点图可以观察数据的分布模式、聚类和异常值：

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // 模拟学生考试成绩分布数据
  const data = [
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
  ];

  chart.options({
    type: 'point',
    data,
    encode: {
      x: 'math',
      y: 'english',
      color: 'category'
    },
    style: {
      fillOpacity: 0.8,
      strokeWidth: 2,
      r: 8
    },
    scale: {
      color: {
        palette: ['#1890ff', '#52c41a', '#fa8c16']
      }
    },
    axis: {
      x: { title: '数学成绩' },
      y: { title: '英语成绩' }
    },
    legend: {
      color: { title: '班级类型' }
    },
    title: '不同班级学生成绩分布'
  });

  chart.render();

  return chart.getContainer();
})();
```

### 时间序列分析

散点图也可以用于展示时间序列数据中的模式：

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // 模拟网站访问量与转化率的月度数据
  const data = [
    { month: 1, visitors: 15000, conversion: 2.1 },
    { month: 2, visitors: 18000, conversion: 2.3 },
    { month: 3, visitors: 22000, conversion: 2.8 },
    { month: 4, visitors: 25000, conversion: 3.2 },
    { month: 5, visitors: 28000, conversion: 3.5 },
    { month: 6, visitors: 32000, conversion: 3.8 },
    { month: 7, visitors: 35000, conversion: 4.1 },
    { month: 8, visitors: 38000, conversion: 4.3 },
    { month: 9, visitors: 33000, conversion: 3.9 },
    { month: 10, visitors: 30000, conversion: 3.6 },
    { month: 11, visitors: 27000, conversion: 3.4 },
    { month: 12, visitors: 31000, conversion: 3.7 }
  ];

  chart.options({
    type: 'point',
    data,
    encode: {
      x: 'visitors',
      y: 'conversion',
      size: 'month'
    },
    style: {
      fill: '#722ed1',
      fillOpacity: 0.7,
      stroke: '#722ed1',
      strokeWidth: 2
    },
    scale: {
      size: { range: [6, 16] }
    },
    axis: {
      x: { title: '月访问量' },
      y: { title: '转化率 (%)' }
    },
    title: '网站访问量与转化率关系（点大小表示月份）'
  });

  chart.render();

  return chart.getContainer();
})();
```

## 扩展

### 气泡图

通过添加第三个维度（点的大小）来展示更多信息：

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  // 模拟产品性能数据
  const data = [
    { performance: 85, satisfaction: 8.2, marketShare: 15, product: '产品A' },
    { performance: 78, satisfaction: 7.8, marketShare: 22, product: '产品B' },
    { performance: 92, satisfaction: 8.8, marketShare: 8, product: '产品C' },
    { performance: 88, satisfaction: 8.5, marketShare: 18, product: '产品D' },
    { performance: 75, satisfaction: 7.5, marketShare: 25, product: '产品E' },
    { performance: 90, satisfaction: 8.7, marketShare: 12, product: '产品F' }
  ];

  chart.options({
    type: 'point',
    data,
    encode: {
      x: 'performance',
      y: 'satisfaction',
      size: 'marketShare',
      color: 'product'
    },
    style: {
      fillOpacity: 0.7,
      strokeWidth: 2
    },
    scale: {
      size: { range: [8, 32] }
    },
    axis: {
      x: { title: '产品性能得分' },
      y: { title: '用户满意度' }
    },
    legend: {
      color: { title: '产品类型' },
      size: { title: '市场份额 (%)' }
    },
    title: '产品性能 vs 用户满意度（气泡大小=市场份额）'
  });

  chart.render();

  return chart.getContainer();
})();
```

### 带趋势线的散点图

添加回归线来更清晰地展示数据趋势：

```js | ob { autoMount: true }
(() => {
  const chart = new G2.Chart();

  const data = [
    { x: 1, y: 2.1 }, { x: 2, y: 3.8 }, { x: 3, y: 5.2 },
    { x: 4, y: 6.9 }, { x: 5, y: 8.1 }, { x: 6, y: 9.8 },
    { x: 7, y: 11.2 }, { x: 8, y: 13.1 }, { x: 9, y: 14.8 },
    { x: 10, y: 16.5 }
  ];

  chart.options({
    children: [
      {
        type: 'point',
        data,
        encode: {
          x: 'x',
          y: 'y'
        },
        style: {
          fill: '#1890ff',
          fillOpacity: 0.8,
          stroke: '#1890ff',
          strokeWidth: 2,
          r: 6
        }
      },
      {
        type: 'line',
        data,
        encode: {
          x: 'x',
          y: 'y'
        },
        style: {
          stroke: '#ff4d4f',
          strokeWidth: 2,
          strokeDasharray: [4, 4]
        }
      }
    ],
    axis: {
      x: { title: 'X 变量' },
      y: { title: 'Y 变量' }
    },
    title: '带趋势线的散点图'
  });

  chart.render();

  return chart.getContainer();
})();
```

## 对比

散点图与其他图表类型的对比：

| 图表类型 | 适用场景 | 优势 | 劣势 |
|---------|---------|------|------|
| 散点图 | 探索两变量关系、异常值检测 | 直观展示相关性、易于识别模式 | 数据点过多时可能重叠 |
| 折线图 | 时间序列数据、趋势展示 | 清晰显示变化趋势 | 不适合展示变量间相关性 |
| 柱状图 | 分类数据比较 | 便于比较不同类别 | 无法展示连续变量关系 |
| 气泡图 | 三维数据展示 | 信息量更大 | 复杂度较高，解读难度增加 |

## 相似图表

- **气泡图**：散点图的扩展，通过点的大小表示第三个维度
- **折线图**：同样使用坐标系，但强调数据点间的连接关系
- **面积图**：可以看作是填充的折线图，强调数量的累积效果