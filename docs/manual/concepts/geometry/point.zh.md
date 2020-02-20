---
title: 点图 point
order: 1
---

## 简介

几何标记点，一般用于点图。点图是一种表现数据分布的图表，常用于观察数据的相关性，根据点图表示的字段来划分，可以分为下面几种点图：

- 一维分类点图，仅按照分类关系展示点的分布，用于观察不同分类数据的数量分布
- 一维连续点图，将数据的一个连续字段映射到画布上的一个轴上（一般是 x 轴），用于观察差连续数据在一个维度上的分布
- 二维连续点图，将数据的两个连续字段映射到画布上的两个坐标轴上(x,y 轴），以显示变量之间的相互影响程度，观察数据字段之间的相关性
- 二维分类点图，将数据的两个分类字段映射到画布上的两个坐标轴上(x,y 轴），观察符合两个分类条件下的数据分布
- 二维分类/连续点图，将一个分类数据字段和一个连续数据字段映射到画布上的两个坐标轴上(x,y 轴），观察不同分类数据某个连续量的分布，可以理解成为多个一维连续点图的集合

![](https://zos.alipayobjects.com/basement/skylark/0ad6383d14791791792692843d7565/attach/4080/900/image.png#align=left&display=inline&height=497&originHeight=497&originWidth=1007&status=done&style=none&width=1007)

所有存在分类字段映射到位置的点图，为了避免同一分类下点的折叠，都需要进行数据调整。

## 支持的数据字段格式

这里说的数据字段格式是决定点图位置相关字段的个数和数据格式，有以下情况：

- 单个的数值字段，分类字段或者连续字段，数据以及语法如下：

```javascript
const data = [{ carat: 10 }];
// ...
chart.point().position('carat');
```

- 两个数值字段，分类字段连续字段，语法如下：

```javascript
const data = [{ month: '一月', temperature: 10 }];
chart.point().position('month*temperature');
```

- 两个数据字段，y 轴对应的数据字段是数组，如：

```javascript
const data = [{ month: '一月', temperature: [-5, 10] }];
chart.point().position('month*temperature');
```

### 数据字段的格式

| x        | y        | 解释                                                       |
| -------- | -------- | ---------------------------------------------------------- |
| 数值字段 | 空       | 展示一维数据的分布。                                       |
| 数值字段 | 数值字段 | 二维分类点图、二维连续点图、二维分类/连续点图。            |
| 数值字段 | 数组     | 一般是 二维分类/连续点图，x 表示分类，y 轴数据表示区间值。 |

数值字段是分类或者连续字段都可以。

## 视觉通道的支持

点图最重要的视觉通道是位置，但是其他几个视觉通道对点图的影响也很大。

### color

点图上的 color 视觉通道一般用于区分不同的数据类型，一般映射到分类字段。

![](https://zos.alipayobjects.com/basement/skylark/0ad680ae14791792081434306d17d3/attach/4080/900/image.png#align=left&display=inline&height=491&originHeight=491&originWidth=1007&status=done&style=none&width=1007)

### size

点图增加 size 视觉通道，即可生成气泡图，size 视觉通道可以映射到的视觉通道个数，跟图表类型的自由度直接相关，在前面的[几何标记](#)章节里介绍过自由度的概念。

自由度 = 所在的空间维数 - 图形的维度。

我们知道点图本身仅仅是 0 维的图形，所以其自由度是 2，从理论上说 size 可以映射到两个视觉通道，但是实际上我们不会这样做。

<img src="https://zos.alipayobjects.com/basement/skylark/0ad6383d14791792288604206d7553/attach/4080/900/image.png" style="width: 385px;">

人的视觉对图形在两个方向上进行大小的扩展，两个方向的视觉通道会耦合、干扰，导致识别度不高，所以对于点图 size 视觉通道的映射，G2 仅仅支持一个字段的映射，数据字段的大小映射到图形的半径（如果是正方形 1/2 边长）。

<img src="https://zos.alipayobjects.com/basement/skylark/0ad6383d14791792474912863d7565/attach/4080/900/image.png" style="width: 302px;">

在项目中使用最多的是气泡图：

![](https://zos.alipayobjects.com/basement/skylark/0ad6383d14791792641844492d7559/attach/4080/900/image.png#align=left&display=inline&height=493&originHeight=493&originWidth=905&status=done&style=none&width=905)

### shape

点图可以指定不同的形状圆点、三角形、方形等形状，可以将分类的字段映射到形状上：

![](https://zos.alipayobjects.com/basement/skylark/0ad6383d14791792810214503d7559/attach/4080/900/image.png#align=left&display=inline&height=450&originHeight=450&originWidth=984&status=done&style=none&width=984)

#### 支持的图形

shape 视觉通道支持的形状主要有两大类：

- 内部填充的 shape
  - 'circle'
  - 'square'
  - 'bowtie'
  - 'diamond'
  - 'hexagon'
  - 'triangle'
  - 'triangle-down'
- 空心的仅使用边框的 shape
  - 'hollow-circle'
  - 'hollow-square'
  - 'hollow-bowtie'
  - 'hollow-diamond'
  - 'hollow-hexagon'
  - 'hollow-triangle'
  - 'hollow-triangle-down'
  - 'cross'
  - 'tick'
  - 'plus'
  - 'hyphen'
  - 'line'

## 点图跟坐标系

由于点图是 0 维的，所以点图在不同[坐标系](../coordinate)内的图形是完全一致的，接下来的图形类型中你会认识到图表的形状受坐标系的影响。

## 点图和其他图

点图可以用于折线图上的数据点，或者跟其他图表组合显示数据点：

![](https://zos.alipayobjects.com/basement/skylark/0ad680ae14791792966693382d17cd/attach/4080/900/image.png#align=left&display=inline&height=433&originHeight=433&originWidth=926&status=done&style=none&width=926)

![](https://zos.alipayobjects.com/basement/skylark/0ad6383d14791793143505780d755f/attach/4080/900/image.png#align=left&display=inline&height=471&originHeight=471&originWidth=877&status=done&style=none&width=877)
