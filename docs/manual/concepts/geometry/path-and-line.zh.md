---
title: 路径和线（path && line）
order: 2
---

## 简介

路径(path)和线(line)都是一维的线，两者间的唯一差别在于线展示的数据是沿 x 轴方向有序的，而路径的数据是无序的。下面的讲解中使用的线图同时指代路径和线。

![](https://zos.alipayobjects.com/basement/skylark/0ad6383d14791813867844985d7559/attach/4080/900/image.png#align=left&display=inline&height=230&originHeight=230&originWidth=867&status=done&style=none&width=867)

## 支持的数据格式

线图的数据格式主要是指映射到位置的字段的格式，线图的两个字段分别映射到画布的 x 轴方向和 y 轴方向，线图的字段格式：

- 两个字段都是数值（分类或者连续），一般情况下 x 轴有序的线图通常用于观察数据的趋势，不建议 x 轴使用无序的分类字段
- 映射到 x 轴的字段是数值，y 轴的字段是数组，y 轴对应的字段表示数据的区间值

```javascript
const data = [
  { month: '一月', temperature: [-5, 10] },
  { month: '二月', temperature: [3, 12] },
];
chart.line().position('month*temperature');
```

- ![](https://zos.alipayobjects.com/basement/skylark/0ad6383d14791814023983420d7565/attach/4080/900/image.png#align=left&display=inline&height=389&originHeight=389&originWidth=699&status=done&style=none&width=699)

使用表格表示：

| x        | y                          | 解释                                |
| -------- | -------------------------- | ----------------------------------- |
| 数值类型 | 数值类型                   | 一般的线图                          |
| 数值类型 | 数组，数组内部是连续的数据 | 带有区间信息的线图，同时生成 2 条线 |

## 支持的视觉通道

### color

color 可以区分不同的线，增加 color 视觉通道，可以将数据进行分组，绘制出多条直线

```javascript
const data = [
  { month: '一月', temperature: 10, city: '北京' },
  { month: '一月', temperature: 15, city: '南京' },
];
chart.line().position('month*temperature').color('city');
```

![](https://zos.alipayobjects.com/basement/skylark/0ad680ae14791814186284070d17cd/attach/4080/900/image.png#align=left&display=inline&height=494&originHeight=494&originWidth=961&status=done&style=none&width=961)

### size

size 的视觉通道跟图形的自由度相关，自由度 = 空间维度 - 图形维度，线是一维的，所以线图的自由度是 1。在 G2 中我们将 size 视觉通道映射的线的宽度，由于人对宽度的识别度不高，这个映射慎用。

![](https://zos.alipayobjects.com/basement/skylark/0ad6383d14791814326954771d7553/attach/4080/900/image.png#align=left&display=inline&height=469&originHeight=469&originWidth=874&status=done&style=none&width=874)

### shape

线图支持的图形：

- line 常见的实线
- dot 点线
- smooth 平滑的曲线

![](https://zos.alipayobjects.com/basement/skylark/0ad6383d14791814488053451d7565/attach/4080/900/image.png#align=left&display=inline&height=495&originHeight=495&originWidth=962&status=done&style=none&width=962)

- 信号相关的折线图：vh hv hvh vhv

![](https://zos.alipayobjects.com/basement/skylark/0ad6383d14791814670683470d7565/attach/4080/900/image.png#align=left&display=inline&height=490&originHeight=490&originWidth=949&status=done&style=none&width=949)

## 线图和坐标系

线图在直角坐标系和极坐标系下有所差别，在极坐标下线图需要进行闭合。

![](https://zos.alipayobjects.com/basement/skylark/0ad6383d14791814858303483d7565/attach/4080/900/image.png#align=left&display=inline&height=476&originHeight=476&originWidth=771&status=done&style=none&width=771)
