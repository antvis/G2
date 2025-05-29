---
title: 马赛克图
order: 1
screenshot: 'https://os.alipayobjects.com/rmsportal/eXoQbOxSvByiNWd.jpg'
category: ['comparison', 'proportion']
similar: ['heatmap', 'treemap']
---

<img alt="mosaic" src="https://os.alipayobjects.com/rmsportal/eXoQbOxSvByiNWd.jpg" width=600/>

## 马赛克图的简介

马赛克图（Mosaic Plot，又名 Marimekko Chart）是一种用于显示分类数据之间关系的图表。它通过矩形的面积和颜色来表示数据的比例和分类。

马赛克图分为均匀和非均匀两种类型，均匀马赛克图在生活中更为常见，例如地铁票价图；而非均匀马赛克图多用于统计学领域。

**英文名**：Mosaic Plot, Marimekko Chart

## 马赛克图的构成

### 非均匀坐标轴马赛克图

<img alt="mosaic-uneven" src="https://os.alipayobjects.com/rmsportal/RKlgDYrPsNzxKHt.png" width=600/>

| 图表类型         | 非均匀坐标轴马赛克图                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------- |
| 适合的数据       | 多维分类数据                                                                                              |
| 功能             | 显示多维分类数据的分布                                                                                  |
| 数据与图形的映射 | 分类数据字段映射到非均匀的坐标轴<br>面积和颜色表示数据的比例和分类                                       |
| 适合的数据条数   | 数据维度较多时效果更佳                                                                                  |

---

### 均匀坐标轴马赛克图

<img alt="mosaic-even" src="https://os.alipayobjects.com/rmsportal/VwBbTVppnBdxlhk.png" width=600/>

| 图表类型         | 均匀坐标轴马赛克图                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------- |
| 适合的数据       | 二维分类数据                                                                                              |
| 功能             | 显示二维分类数据的分布                                                                                  |
| 数据与图形的映射 | 分类数据字段映射到均匀的坐标轴<br>颜色表示数据的分类                                                     |
| 适合的数据条数   | 数据维度较少时效果更佳                                                                                  |

## 马赛克图的应用场景

### 适合的场景

例子 1: **适合应用到多维分类数据分析**

![非均匀马赛克图](https://t.alipayobjects.com/images/rmsweb/T1B.0iXcxfXXXXXXXX.png)

例子 2: **适合应用到二维分类数据分析**

```js | ob { autoMount: true }
const chart = new G2.Chart({
  container: 'container',
  autoFit: true,
  height: 400,
});

chart.options({
  type: 'cell',
  data: [
    { product: '手机', region: '华北', sales: 120, category: '高端' },
    { product: '手机', region: '华东', sales: 180, category: '高端' },
    { product: '手机', region: '华南', sales: 150, category: '高端' },
    { product: '电脑', region: '华北', sales: 80, category: '中端' },
    { product: '电脑', region: '华东', sales: 110, category: '中端' },
    { product: '电脑', region: '华南', sales: 95, category: '中端' },
    { product: '平板', region: '华北', sales: 60, category: '中端' },
    { product: '平板', region: '华东', sales: 85, category: '中端' },
    { product: '平板', region: '华南', sales: 70, category: '低端' },
    { product: '耳机', region: '华北', sales: 40, category: '低端' },
    { product: '耳机', region: '华东', sales: 55, category: '低端' },
    { product: '耳机', region: '华南', sales: 45, category: '低端' },
  ],
  encode: {
    x: 'product',
    y: 'region',
    color: 'category',
    size: 'sales',
  },
  scale: {
    color: {
      palette: 'category10',
      type: 'ordinal',
    },
    size: {
      type: 'linear',
      range: [0.3, 1],
    },
  },
  style: {
    stroke: '#fff',
    strokeWidth: 2,
    inset: 2,
  },
  legend: {
    color: {
      title: '产品类别',
      position: 'top',
    },
    size: {
      title: '销售额',
      position: 'right',
    },
  },
  axis: {
    x: {
      title: '产品类型',
      labelAutoRotate: false,
    },
    y: {
      title: '销售区域',
    },
  },
  tooltip: {
    title: (d) => `${d.product} - ${d.region}`,
    items: [
      { field: 'sales', name: '销售额', valueFormatter: (v) => `${v}万` },
      { field: 'category', name: '类别' },
    ],
  },
});

chart.render();
```

## 马赛克图与其他图表的对比

### 马赛克图和热力图

- 从图形属性上：
  - 热力图表示第三维度的颜色是**线性**变化的。
  - 马赛克图表示第三维度的颜色是**分类**的。
  - 标准热力图要经过平滑算法，没有明显的边界。
  - 马赛克图拥有清晰的边界。
- 从数据上看：
  - 均匀的马赛克图和热力图在连续数据上的含义非常相似。
- 从分析需求上看：
  - 热力图侧重于分布，可预测未知区域数据。
  - 马赛克图拥有更清晰的边界，更侧重于对比。

## 马赛克图的扩展阅读

- [A Brief History of the Mosaic Display](http://www.datavis.ca/papers/moshist.pdf)
- [Are Mosaic Plots Worthwhile](https://www.perceptualedge.com/articles/visual_business_intelligence/are_mosaic_plots_worthwhile.pdf)
- [Marimekko Charts](http://peltiertech.com/marimekko-charts/)
- [Marimekko Charts FusionChart](http://www.fusioncharts.com/charts/marimekko-charts/)
- [Marimekko Charts The Data Visualisation Catalogue](http://www.datavizcatalogue.com/methods/marimekko_chart.html#.VlJ9E98rJTY)
- [Marimekko Charts in Microsoft Excel](http://www.clearlyandsimply.com/clearly_and_simply/2014/05/marimekko-charts-in-microsoft-excel.html)

## 相似图表

<code src="./demos/list-card.tsx"></code>

---
## 分类

<code src="./demos/list-category.tsx"></code>

