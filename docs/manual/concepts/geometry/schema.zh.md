---
title: 自定义图 schema
order: 6
---

## 简介

在前面的章节中，我们介绍了多种几何标记：点图、线图、区域图、区间图（interval)、多边形都是根据映射到位置的字段格式来划分的：

- 点图：x、y 映射到位置的单个图形。
- 线图：多个点连接成线。
- 区域图：线和 x 轴包围而成的面积。
- 区间图：分类字段映射到 x 轴的位置， y 是个区间值，默认最小值是 0。
- 多边形：多个点映射到位置上，连接起来构成一个多边形。

而有一种情况前面的几何标记都无法实现：x 字段映射到 x 轴的位置上，y 字段有多个值（>2)此时无法使用统一几何标记实现，常见的这种图表有：

- 箱型图
- k 线图

![](https://zos.alipayobjects.com/basement/skylark/0ad680ae14791872780536142d17cd/attach/4080/900/image.png#align=left&display=inline&height=251&originHeight=251&originWidth=945&status=done&style=none&width=945)

## 箱型图

箱形图（Box-plot）又称为盒须图、盒式图或箱线图，是一种用作显示一组数据分散情况资料的统计性图表。主要由五个个数据节点构成，将一组数据从大到小排列，分别计算出他的上边缘，上四分位数 Q3，中位数，下四分位数 Q1，下边缘。箱型图可以分为：

- 一维箱型图，仅仅表述单个维度的数据分布
- 二维箱型图，表述多个分类的数据分布

![](https://zos.alipayobjects.com/basement/skylark/0ad6383d14791872949264824d7565/attach/4080/900/image.png#align=left&display=inline&height=245&originHeight=245&originWidth=880&status=done&style=none&width=880)

### 支持的数据格式

箱型图支持的数据格式是指映射到位置视觉通道的 x，y 字段的数据格式：

- 映射到 x 的字段是数组，无映射到 y 轴的字段
- 映射到 x 轴的字段是分类类型数值，映射到 y 轴的字段是数组

如果用户传入的数据格式不是数组，而是多条记录，那么可以通过统计函数进行统计处理，生成需要的五个值。

### 视觉通道

#### 颜色（color)

颜色可以映射到箱型图的边框上，如果映射的字段不等于映射到 x 的字段类型，则会生成分组的箱型图：

```javascript
chart.schema().adjust('dodge').position('cut*price').color('clarity').shape('box');
```

![](https://zos.alipayobjects.com/basement/skylark/0ad680ae14791873655806931d17d3/attach/4080/900/image.png#align=left&display=inline&height=461&originHeight=461&originWidth=946&status=done&style=none&width=946)

#### 大小（size)

大小可以改变箱型图的宽度，一般使用常量更改箱型图的宽度

```javascript
chart.schema().adjust('dodge').position('price').size(10).shape('box');
```

![](https://zos.alipayobjects.com/basement/skylark/0ad680ae14791873851254704d17c0/attach/4080/900/image.png#align=left&display=inline&height=351&originHeight=351&originWidth=892&status=done&style=none&width=892)

#### 形状

当前自定义几何标记中形状 'box'，表示是箱型图，后面可能会增加带有异常点的箱型图。

## k 线图

K 线图（Candlestick Charts）又称蜡烛图、日本线、阴阳线、棒线、红黑线等，常用说法是“K 线”。它是以每个分析周期的开盘价、最高价、最低价和收盘价绘制而成。

k 线图在不同的国家对股价上涨和下跌采用的颜色不一致，在美国红色是下跌，绿色是上涨；而国内红色是上涨，绿色是下跌。

### 支持的数据格式

k 线图支持的数据格式是映射到位置的字段的数据格式，G2 仅支持一种数据格式：单个分类字段值映射到 x 轴，数组（开盘价、最高价、最低价和收盘）映射到 y 轴。
