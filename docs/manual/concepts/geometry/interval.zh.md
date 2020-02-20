---
title: 区间图 interval
order: 4
---

## 简介

区间图（interval)是一种表示数据上下区间的图表的集合。区间图在直角坐标系下是柱状图，极坐标下是玫瑰图，是一种所以用长度、宽度、弧度、周长等来表现数据大小、区间的图表，区间图对应一般的图表类型有：

- 柱状图（条形图），一般的柱状图，使用长度对比数据大小。
- 玫瑰图，使用半径大小对比数据大小。
- 饼图/环图，使用弧度大小对比数据大小。
- 条形环图（玉缺图），同样使用圆弧对比数据大小。
- 直方图，表示数据分布的直方图。

![](https://zos.alipayobjects.com/basement/skylark/0ad6383d14791888765785398d7565/attach/4080/900/image.png#align=left&display=inline&height=465&originHeight=465&originWidth=608&status=done&style=none&width=608)

区间图可以进行[数据调整](../../tutorial/adjust)，当 x 轴上同一个分类下有多个分组的数据时可以进行：

- 层叠，构成层叠柱状图、层叠玫瑰图、嵌套饼图、层叠条形环图。

![](https://zos.alipayobjects.com/basement/skylark/0ad680ae14791889104346479d17cd/attach/4080/900/image.png#align=left&display=inline&height=215&originHeight=215&originWidth=832&status=done&style=none&width=832)

- 分组，构成分组柱状图、分组玫瑰图。

![](https://zos.alipayobjects.com/basement/skylark/0ad680ae14791889672237500d17d3/attach/4080/900/image.png#align=left&display=inline&height=214&originHeight=214&originWidth=785&status=done&style=none&width=785)

- 也可以对数据进行对称处理，构成漏斗图。

![](https://zos.alipayobjects.com/basement/skylark/0ad6383d14791891290007069d7553/attach/4080/900/image.png#align=left&display=inline&height=218&originHeight=218&originWidth=792&status=done&style=none&width=792)

## 支持的数据格式

区间图生成的所有的图表的数据格式是一致的，这里的数据格式是指位置相关字段的数据格式，有三种情况：

- x,y 都是数值，一般的柱状图、玫瑰图

```javascript
const data = [{ name: '分类一', value: 100 }];
chart.interval().position('name*value');
```

![](https://zos.alipayobjects.com/basement/skylark/0ad680ae14791891444836613d17cd/attach/4080/900/image.png#align=left&display=inline&height=327&originHeight=327&originWidth=395&status=done&style=none&width=395)

- x 是数值，y 是数组，区间柱状图、区间玫瑰图、层叠柱状图、层叠玫瑰图以及对称的柱状图（漏斗图）。

```javascript
const data = [{ name: '分类一', value: [10, 100] }];
chart.interval().position('name*value');
```

![](https://zos.alipayobjects.com/basement/skylark/0ad680ae14791891588746633d17cd/attach/4080/900/image.png#align=left&display=inline&height=338&originHeight=338&originWidth=395&status=done&style=none&width=395)

- x 是数组，y 是数值，构成了直方图

```javascript
const data = [
  { score: [60, 70], count: 30 },
  { score: [71, 80], count: 90 },
];
chart.interval().position('score*count');
```

![](https://zos.alipayobjects.com/basement/skylark/0ad680ae14791891743571114d17d9/attach/4080/900/image.png#align=left&display=inline&height=349&originHeight=349&originWidth=468&status=done&style=none&width=468)

- x 是数值，y 为空，仅当饼图时，此时的坐标系是 'theta'，其实是在 G2 的内部补齐了 x,y

汇总的表格：

| x    | y    | 解释                                                   |
| ---- | ---- | ------------------------------------------------------ |
| 数值 | 数值 | 常规的柱状图、玫瑰图                                   |
| 数值 | 数组 | 区间柱状图、区间玫瑰图、层叠柱状图、层叠玫瑰图、漏斗图 |
| 数组 | 数值 | 直方图、环形直方图                                     |
| 数值 | 空   | 饼图                                                   |

## 视觉通道

color、shape 视觉通道映射的字段是分类类型时会导致数据的分组，数据分组后，需要进行[数据的调整](#)：层叠、分组。

### color

颜色视觉通道在区间图上应用时一般映射分类字段，对数据进行分组，但是有些特殊情况下也会映射的连续字段上，对不同区间的数值对应的图形使用不同的颜色：

```javascript
const data = [
  { a: 'a1', value: 50 },
  { a: 'a2', value: 60 },
  { a: 'a3', value: 40 },
];

chart
  .interval()
  .position('a*value')
  .color('value', (value) => {
    if (value > 50) {
      return 'red';
    }
    return 'green';
  });
```

![](https://zos.alipayobjects.com/basement/skylark/0ad6383d14791891907446768d7559/attach/4080/900/image.png#align=left&display=inline&height=484&originHeight=484&originWidth=487&status=done&style=none&width=487)

此时 color 内部的回调函数将连续字段 value 转换成了一个分类字段，大于 50 和小于 50 的分类。

### size

size 视觉通道对于区间图来说一般仅设置常量，应用到区间图的宽度。一般不进行连续字段的映射，原因在于区间图是通过长度来对比数据大小的，如果再增加宽度信息，那么会带来视觉通道的干扰，看下面的情形：

![](https://zos.alipayobjects.com/basement/skylark/0ad6383d14791892046715469d7565/attach/4080/900/image.png#align=left&display=inline&height=310&originHeight=310&originWidth=431&status=done&style=none&width=431)

区间图的不同的图表类型对 size 的解析不完全相同：

- 柱状图，将 size 的数值解析成画布上的像素值。
- 玫瑰图，将 size 的数据解析成角度值。
- 饼图，size 字段无意义。
- 环状条形图，size 的数值解析成画布上的像素值。

### shape

区间图支持的图表形状有：

- rect，默认的填充区间图。
- hollow-rect, 非填充的仅有边框的区间图。
- line， 使用线来表示上下区间。
- tick，使用多条线来表示数据区间。

## 区间图跟坐标系

前面的章节中，我们介绍过[坐标系](../coordinate)，在不同的坐标系中图形标记有不同的表现方式，下面我们介绍 interval 受坐标系的影响：

- interval（区间）在直角坐标系中表现为柱状图，在极坐标下表现为玫瑰图。
- interval（区间）在直角坐标系 transpose（转置）后，表现为条形图,在极坐标系 transpose（转置）后表现为条形环图 。

![](https://zos.alipayobjects.com/basement/skylark/0ad680ae14791892201206684d17cd/attach/4080/900/image.png#align=left&display=inline&height=178&originHeight=178&originWidth=710&status=done&style=none&width=710)

- 层叠 interval（区间）在直角坐标系 transpose（转置）后，表现为层叠条形图，在极坐标系 transpose（转置）后是层叠的条形环图。当展示百分百的层叠 Interval 时，在极坐标系 transpose（转置）后是嵌套饼图，仅有一个分类时，则是单个饼图。

![](https://zos.alipayobjects.com/basement/skylark/0ad6383d14791892367025489d7565/attach/4080/900/image.png#align=left&display=inline&height=372&originHeight=372&originWidth=654&status=done&style=none&width=654)

- 当 interval(区间）的 shape 是`line`,`tick`，在极坐标系下会做相应的弯曲 。

![](https://zos.alipayobjects.com/basement/skylark/0ad680ae14791892532527554d17d3/attach/4080/900/image.png#align=left&display=inline&height=499&originHeight=499&originWidth=568&status=done&style=none&width=568)
