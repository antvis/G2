---
title: 绘制混合图表
order: 17
---

在 G2 中，混合图表的绘制非常简单，仍然可以通过组合的方式解决，只需在当前 chart 上声明多个 geometry 即可，当然也可以使用多 View 方案。对于异构数据（即多份数据源），可以使用多 View 绘制。下面就通过一个例子向大家详细介绍绘制方法。

## 带均值线的区间面积图

![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1580966501100-1cd2a5ea-39dd-4d7a-8ba5-3be92fd904fc.png#align=left&display=inline&height=325&name=image.png&originHeight=650&originWidth=846&size=48166&status=done&style=none&width=423)上图由面积图 + 折线图 + 点图组合而成，其中面积区域可视化的是这段时间的温度范围，即每日的最高和最低气温，而折线图表示的是每日的平均温度变化，该图表的数据结构如下，其中 `time`  字段代表的是日期，以时间戳的格式存储， `rangeTemp`  代表每日温度区间， `averageTemp`  代表该日的平均温度。

```typescript
[
  { time: 1246406400000, rangeTemp: [14.3, 27.7], averageTemp: 21.5 },
  { time: 1246492800000, rangeTemp: [14.5, 27.8], averageTemp: 22.1 },
  { time: 1246579200000, rangeTemp: [15.5, 29.6], averageTemp: 23 },
  { time: 1246665600000, rangeTemp: [16.7, 30.7], averageTemp: 23.8 },
  { time: 1246752000000, rangeTemp: [16.5, 25.0], averageTemp: 21.4 },
  { time: 1246838400000, rangeTemp: [17.8, 25.7], averageTemp: 21.3 },
  { time: 1246924800000, rangeTemp: [13.5, 24.8], averageTemp: 18.3 },
  { time: 1247011200000, rangeTemp: [10.5, 21.4], averageTemp: 15.4 },
  { time: 1247097600000, rangeTemp: [9.2, 23.8], averageTemp: 16.4 },
  { time: 1247184000000, rangeTemp: [11.6, 21.8], averageTemp: 17.7 },
  { time: 1247270400000, rangeTemp: [10.7, 23.7], averageTemp: 17.5 },
  { time: 1247356800000, rangeTemp: [11.0, 23.3], averageTemp: 17.6 },
  { time: 1247443200000, rangeTemp: [11.6, 23.7], averageTemp: 17.7 },
  { time: 1247529600000, rangeTemp: [11.8, 20.7], averageTemp: 16.8 },
  { time: 1247616000000, rangeTemp: [12.6, 22.4], averageTemp: 17.7 },
  { time: 1247702400000, rangeTemp: [13.6, 19.6], averageTemp: 16.3 },
  { time: 1247788800000, rangeTemp: [11.4, 22.6], averageTemp: 17.8 },
  { time: 1247875200000, rangeTemp: [13.2, 25.0], averageTemp: 18.1 },
  { time: 1247961600000, rangeTemp: [14.2, 21.6], averageTemp: 17.2 },
  { time: 1248048000000, rangeTemp: [13.1, 17.1], averageTemp: 14.4 },
  { time: 1248134400000, rangeTemp: [12.2, 15.5], averageTemp: 13.7 },
  { time: 1248220800000, rangeTemp: [12.0, 20.8], averageTemp: 15.7 },
  { time: 1248307200000, rangeTemp: [12.0, 17.1], averageTemp: 14.6 },
  { time: 1248393600000, rangeTemp: [12.7, 18.3], averageTemp: 15.3 },
  { time: 1248480000000, rangeTemp: [12.4, 19.4], averageTemp: 15.3 },
  { time: 1248566400000, rangeTemp: [12.6, 19.9], averageTemp: 15.8 },
  { time: 1248652800000, rangeTemp: [11.9, 20.2], averageTemp: 15.2 },
  { time: 1248739200000, rangeTemp: [11.0, 19.3], averageTemp: 14.8 },
  { time: 1248825600000, rangeTemp: [10.8, 17.8], averageTemp: 14.4 },
  { time: 1248912000000, rangeTemp: [11.8, 18.5], averageTemp: 15 },
  { time: 1248998400000, rangeTemp: [10.8, 16.1], averageTemp: 13.6 },
];
```

下面我们开始使用以下两种方式来绘制这张混合图表。

### 使用 Geometry 组合方式

#### 声明图形语法

首先我们需要确定几何标记以及图形属性映射规则:

1. 从图形特征来看，该图表是由『面积图』 + 『折线图』 + 『点图』三种基础图表组合而成的，所以需要使用
1. area, 对应面积图
1. line, 对应折线图
1. point，对应点图
1. 图形属性映射规则：
1. 对于面积图， `time`  以及 `rangeTemp`  字段分别确定图形位置（x 和 y）
1. 对应折线图和点图，`time` 以及 `averageTemp`  字段分别确定图形位置（x 和 y）

确定好映射规则后，就可以开始图表的绘制了：

```typescript
const chart = new Chart({
  container: 'mountNode',
  autoFit: false,
  width: 400,
  height: 300,
});

chart.data(data);
// highlight-start
chart.area().position('time*rangeTemp');
chart.line().position('time*averageTemp');
chart
  .point()
  .position('time*averageTemp')
  .shape('circle')
  .style({
    stroke: '#fff',
    lineWidth: 1,
    fillOpacity: 1,
  });
// highlight-end
chart.render();
```

![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1580967571685-ad1aa2df-de32-4009-ae81-b8b513837ad6.png#align=left&display=inline&height=324&name=image.png&originHeight=648&originWidth=842&size=64088&status=done&style=none&width=421)

#### 外观调整

但是从绘制结果看，并不理想，因此我们还需要做一些外观调整：

##### 调整 x 轴的文本的显示格式

x 轴对应 `time`  字段，代表日期，在原始数据中是以时间戳的格式存储的，因为 G2 内部默认会将其转换为数值型度量（linear），但是我们实际希望她能以日期：'MM-DD' 的格式展示，所以我们使用 `chart.scale()`  接口对 `time`  字段进行了如下定义：

```typescript
chart.scale({
  time: {
    type: 'time', // 声明为 time 类型
    mask: 'MM-DD', // 格式化日期
    nice: true,
  },
});
```

![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1580968853274-7a57af0f-7846-45d5-95c9-22bf2d66c23c.png#align=left&display=inline&height=328&name=image.png&originHeight=656&originWidth=842&size=65354&status=done&style=none&width=421)

##### 同步双 Y 轴数值范围

在 G2 中，实现多 Y 轴的绘制非常简单，用户完全不需要做任何配置。只要做到各个 geom 的 X 轴属性相同， Y 轴属性不同，G2 就会为您自动生成。**正如该图一样，因为折线图和面积图的 y 轴映射字段不同，就会自动生成双 Y 轴（按照声明顺序从左到右依次生成），但是有一个问题， 就是因为两个字段的数值范围不同，导致两条 Y 轴的数值范围也不同，然后这两个字段的数据又具有关联性，所以我们需要对数据进行同步，因此我们使用 **`**chart.scale()**`  接口为 `rangeTemp`  和 `averageTemp`  配置  `sync`  属性：

```typescript
chart.scale({
  // highlight-start
  averageTemp: {
    sync: 'value',
  },
  rangeTemp: {
    sync: 'value',
  },
  // highlight-end
  time: {
    type: 'time',
    mask: 'MM-DD',
    nice: true,
  },
});
```

**![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1580969314325-e83ec70b-5ea5-4990-aa9b-0ba07507905b.png#align=left&display=inline&height=328&name=image.png&originHeight=656&originWidth=790&size=58783&status=done&style=none&width=395)\*\***

##### 隐藏一条坐标轴

因为两个 Y 轴表示的是同样的数值范围，所以我们在这里只需要展示一条即可，因此我们选择将 `averageTemp`  字段对应的 Y 轴隐藏：

```typescript
chart.axis('averageTemp', false);
```

\***\*![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1580971348331-062f732a-f1ec-4737-8376-ec4c06edb5bb.png#align=left&display=inline&height=326&name=image.png&originHeight=652&originWidth=798&size=76854&status=done&style=none&width=399)**

##### 配置 tooltip

为了达到图表阅读的高效性，我们对 tooltip 进行如下配置：

```typescript
chart.tooltip({
  shared: true, // 合并数据
  showCrosshairs: true, // 展示辅助线
});
```

### 多 View 绘制方式

下面我们再使用多 View 的方式绘制上图。

#### 拆分 View

我们将面积图绘制在一个子 View 中，折线图和点图绘制在另一个子 View 中，显然这两个子 View 的绘图范围是相同的。

```typescript
const view1 = chart.createView();
view1.data(data);
view1.area().position('time*rangeTemp');

const view2 = chart.createView();
view2.data(data);
view2.line().position('time*averageTemp');
view2
  .point()
  .position('time*averageTemp')
  .shape('circle')
  .style({
    stroke: '#fff',
    lineWidth: 1,
    fillOpacity: 1,
  });
```

![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1580970898763-1b6b6576-c71a-4f77-9b87-021ecc5d1738.png#align=left&display=inline&height=310&name=image.png&originHeight=620&originWidth=852&size=66304&status=done&style=none&width=426)

#### 外观调整

使用多 View 的绘图方式，同样会涉及到上述问题，所以我们同样可以根据上述的配置，对图表进行调整。因为子 View 会继承父 View 在 scale, coordinate, tooltip, legend 以及 animate 上的配置，所以我们可以直接在 chart 上进行配置：

```typescript
chart.scale({
  averageTemp: {
    sync: 'value',
  },
  rangeTemp: {
    sync: 'value',
  },
  time: {
    type: 'time',
    mask: 'MM-DD',
    nice: true,
  },
});
```

![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1580971041720-ef39832c-5774-4e97-8b6b-d0f5d6e0b712.png#align=left&display=inline&height=338&name=image.png&originHeight=676&originWidth=824&size=56703&status=done&style=none&width=412)
