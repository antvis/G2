---
title: 区域图 area
order: 3
---

## 简介

区域图也叫面积图，在折线图的基础之上形成的, 它将折线图中折线与自变量坐标轴之间的区域使用颜色或者纹理填充。和折线图一样，面积图也用于强调数量随时间而变化的程度，也可用于引起人们对总值趋势的注意。他们最常用于表现趋势和关系,而不是传达特定的值。

区域图有这么几种类型：

- 一般区域图：所有的数据都从相同的零轴开始。
- 区间区域图：y 轴对应的数据存在区间值。例如展示每天温度的区域图有最大值、最小值
- 层叠区域图：展示几个数据集，每一个数据集的起点不同，都是基于前一个数据集，形成的区域图互相层叠。
- 对称层叠区域图：对层叠的区域图进行对称处理，主要体现不同时期各类数据的对比，常见的[stream graph](../../../../examples/area/streamgraph)就是对称层叠区域图。

![](https://zos.alipayobjects.com/basement/skylark/0ad6383d14791824077205215d7559/attach/4080/900/image.png#align=left&display=inline&height=198&originHeight=198&originWidth=984&status=done&style=none&width=984)

![](https://zos.alipayobjects.com/basement/skylark/0ad680ae14791824913365638d17d3/attach/4080/900/image.png#align=left&display=inline&height=810&originHeight=810&originWidth=1534&status=done&style=none&width=1534)

## 数据格式

一个图表类型支持的数据格式，是指生成这个图表需要的最少的字段数，也就是跟位置相关的字段的数据格式。区域图的位置视觉通道需要 x,y 两个字段的值，支持的数据格式有以下两种：

- x,y 都是数值(分类、连续），由于区域图表示的数据的趋势，所以尽量避免 x 轴对应的字段是无序的分类类型。
- x 是数值（分类、连续），y 是数组，表示一个区间值

表格表示：

| x    | y    | 解释                   |
| ---- | ---- | ---------------------- |
| 数值 | 数值 | 一般的区域图           |
| 数值 | 数组 | 层叠区域图和区间区域图 |

- 层叠区域图不需要用户传入 y 轴对应的值是数据，G2 提供了[数据调整](../../tutorial/adjust)的功能。

## 支持的视觉通道

### color

单个区域图仅能使用一种颜色（或者渐变色），数据字段映射到颜色，会对数据进行分组，将数据拆分成多个区域图：

```javascript
const data = [
  { month: '一月', temperature: 10, city: '北京' },
  { month: '一月', temperature: 15, city: '南京' },
];
chart.area().position('month*temperature').color('city');
```

![](https://zos.alipayobjects.com/basement/skylark/0ad680ae14791829837183820d17c0/attach/4080/900/image.png#align=left&display=inline&height=490&originHeight=490&originWidth=954&status=done&style=none&width=954)

对数据进行层叠，则形成层叠区域图：

```javascript
chart.area().adjust('stack').position('month*temperature').color('city');
```

### size

size 视觉通道，我们前面讲过这个视觉通道跟图形标记的自由度相关。由于区域图图形的自由度 = 2，所以无法进行 size 的扩展，size 视觉通道对区域图无效。

### shape

区域图的支持的图形如下：

- 'area': 一般的区域图。
- 'smooth'：平滑的区域图。
- 'line'：仅用线包围起区域图的范围，而不使用颜色填充。
- 'smooth-line'：平滑线包围器区域图的范围，不使用颜色填充。

## 区域图和坐标系

区域图在直角坐标系和极坐标系下有所差别，在极坐标下线区域图需要进行闭合。

![](https://zos.alipayobjects.com/basement/skylark/0ad680ae14791830001437639d17d9/attach/4080/900/image.png#align=left&display=inline&height=457&originHeight=457&originWidth=518&status=done&style=none&width=518)
