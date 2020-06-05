---
title: G2 绘图入门
order: 0
---

在本篇中，将为你介绍 G2 的基本用法，文章可能有点长，但是可以帮助你更好得理解图形语法，入门 G2，请花点时间耐心阅读。通过本篇，你将学到：

1. 如何将数据变量映射到[图形属性](../concepts/visual-channel)上
1. 如何通过指定不同的几何标记来创建不同类型的图表
1. 如何使用分面
1. 如何调整图表外观

## 数据准备

为了可以更好地熟悉 G2 作图的细节，而不是去熟悉各种不同的数据集，本篇所有的图表都会使用同一份数据集，该数据集结构以及内容如下:

```typescript
[
  { feature: 'Battery', value: 0.22, phone: 'iPhone' },
  { feature: 'Brand', value: 0.28, phone: 'iPhone' },
  { feature: 'Contract', value: 0.29, phone: 'iPhone' },
  { feature: 'Design', value: 0.17, phone: 'iPhone' },
  { feature: 'Internet', value: 0.22, phone: 'iPhone' },
  { feature: 'Large', value: 0.02, phone: 'iPhone' },
  { feature: 'Price', value: 0.21, phone: 'iPhone' },
  { feature: 'Smartphone', value: 0.5, phone: 'iPhone' },
  { feature: 'Battery', value: 0.27, phone: 'Samsung' },
  { feature: 'Brand', value: 0.16, phone: 'Samsung' },
  { feature: 'Contract', value: 0.35, phone: 'Samsung' },
  { feature: 'Design', value: 0.13, phone: 'Samsung' },
  { feature: 'Internet', value: 0.2, phone: 'Samsung' },
  { feature: 'Large', value: 0.13, phone: 'Samsung' },
  { feature: 'Price', value: 0.35, phone: 'Samsung' },
  { feature: 'Smartphone', value: 0.38, phone: 'Samsung' },
  { feature: 'Battery', value: 0.26, phone: 'Nokia Smartphone' },
  { feature: 'Brand', value: 0.1, phone: 'Nokia Smartphone' },
  { feature: 'Contract', value: 0.3, phone: 'Nokia Smartphone' },
  { feature: 'Design', value: 0.14, phone: 'Nokia Smartphone' },
  { feature: 'Internet', value: 0.22, phone: 'Nokia Smartphone' },
  { feature: 'Large', value: 0.04, phone: 'Nokia Smartphone' },
  { feature: 'Price', value: 0.41, phone: 'Nokia Smartphone' },
  { feature: 'Smartphone', value: 0.3, phone: 'Nokia Smartphone' },
];
```

> 该数据集描述的是 iPhone，Samsung 以及  Nokia Smartphone 三款手机各个特征（feature）的评分情况（value）。

从该数据集可以看出，G2 接收的数据格式为**标准的 JSON 数**组。

## 绘制点图

现在我们使用 G2 来绘制一张简单的点图，我们将 `feature`  和 `value`  两个字段分别映射至图表的 x 和 y 轴上：

1. 使用 point 几何标记绘制点图；
1. 使用 `position`  通道，将对应的变量映射到 x 和 y 位置空间上。

```typescript
const data = [
  { feature: 'Battery', value: 0.22, phone: 'iPhone' },
  { feature: 'Brand', value: 0.28, phone: 'iPhone' },
  { feature: 'Contract', value: 0.29, phone: 'iPhone' },
  { feature: 'Design', value: 0.17, phone: 'iPhone' },
  { feature: 'Internet', value: 0.22, phone: 'iPhone' },
  { feature: 'Large', value: 0.02, phone: 'iPhone' },
  { feature: 'Price', value: 0.21, phone: 'iPhone' },
  { feature: 'Smartphone', value: 0.5, phone: 'iPhone' },
  { feature: 'Battery', value: 0.27, phone: 'Samsung' },
  { feature: 'Brand', value: 0.16, phone: 'Samsung' },
  { feature: 'Contract', value: 0.35, phone: 'Samsung' },
  { feature: 'Design', value: 0.13, phone: 'Samsung' },
  { feature: 'Internet', value: 0.2, phone: 'Samsung' },
  { feature: 'Large', value: 0.13, phone: 'Samsung' },
  { feature: 'Price', value: 0.35, phone: 'Samsung' },
  { feature: 'Smartphone', value: 0.38, phone: 'Samsung' },
  { feature: 'Battery', value: 0.26, phone: 'Nokia Smartphone' },
  { feature: 'Brand', value: 0.1, phone: 'Nokia Smartphone' },
  { feature: 'Contract', value: 0.3, phone: 'Nokia Smartphone' },
  { feature: 'Design', value: 0.14, phone: 'Nokia Smartphone' },
  { feature: 'Internet', value: 0.22, phone: 'Nokia Smartphone' },
  { feature: 'Large', value: 0.04, phone: 'Nokia Smartphone' },
  { feature: 'Price', value: 0.41, phone: 'Nokia Smartphone' },
  { feature: 'Smartphone', value: 0.3, phone: 'Nokia Smartphone' },
];

const chart = new Chart({
  container: 'mountNode',
  autoFit: false,
  width: 600,
  height: 300,
});

chart.data(data);
chart.point().position('feature*value'); // highlight-line
chart.render();
```

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*M1QdTpv9Ei4AAAAAAAAAAABkARQnAQ)

## 颜色、大小、形状等图形属性映射

### 颜色

为了区分  iPhone，Samsung 以及  Nokia Smartphone 三款手机，我们将 `phone`  字段映射到 color 图形通道上，通过颜色来区分不同手机的数据。

```typescript
chart
  .point()
  .position('feature*value')
  // highlight-start
  .color('phone');
// highlight-end
```

这个时候，G2 会根据 `phone`  字段数值类型，自动生成一张图例，用以展示数据取值与图形属性之间的对应关系。

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*CTV2RIsYQvMAAAAAAAAAAABkARQnAQ)

### 形状

同样，我们可以通过点形状来区分不同手机的数据，所以我们又将 `phone`  字段映射至 shape 图形通道，并指定具体的 shape 形状：

```typescript
chart
  .point()
  .position('feature*value')
  .color('phone')
  // highlight-start
  .shape('phone', ['circle', 'square', 'triangle']);
// highlight-end
```

这个时候你会发现，图例的 marker 样式也发生了变化：![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*7YScQ5cRDY8AAAAAAAAAAABkARQnAQ)

### 大小

为了让点更清晰，我们通过 size 图形通道适当放大这些点。

```typescript
chart
  .point()
  .position('feature*value')
  .color('phone')
  .shape('phone', ['circle', 'square', 'triangle'])
  // highlight-start
  .size(6);
// highlight-end
```

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*tIZaR68ivQsAAAAAAAAAAABkARQnAQ)

## 几何标记

几何标记即我们所说的点、线、面这些几何图形。G2 中并没有特定的图表类型（柱状图、散点图、折线图等）的概念，用户可以单独绘制某一种类型的图表，如饼图，也可以绘制混合图表，比如折线图和柱状图的组合。G2 生成的图表的类型，都是由几何标记决定的，比如：

- geometry = 'point' 就可以绘制点图
- geometry = 'line' 就可以绘制折线图
- geometry = 'area' 就可以绘制面积图

### 折线图

下面我们就基于以上点图，来绘制折线图，我们只需要将 `chart.point()`  改为 `chart.line()`  即可：

```typescript
chart
  // highlight-start
  .line()
  // highlight-end
  .position('feature*value')
  .color('phone');
```

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*p3FdS7MIlJIAAAAAAAAAAABkARQnAQ)

> 你会发现图例发生了细微的变化，G2 的图例会根据 Geometry 的类型来生成对应的缩略图。

### 面积图

面积图的绘制也很简单，我们只需要将 `chart.line()`  替换成 `chart.area()`  即可：

```typescript
chart
  // highlight-start
  .area()
  // highlight-end
  .position('feature*value')
  .color('phone');
```

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*GT_URJHlEI4AAAAAAAAAAABkARQnAQ)

### 叠加几何标记

当然我们还可以进行几何标记的叠加以实现混合图表的绘制：

```typescript
chart
  .area()
  .position('feature*value')
  .color('phone');
chart
  .line()
  .position('feature*value')
  .color('phone');
chart
  .point()
  .position('feature*value')
  .color('phone')
  .shape('circle');
```

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*M4JvSbo_n_EAAAAAAAAAAABkARQnAQ)

我们还可以通过 `adjust()`  接口将数据进行调整，让数据以层叠的方式进行展示，即绘制层叠面积图：

```typescript
chart
  .area()
  // highlight-start
  .adjust('stack')
  // highlight-end
  .position('feature*value')
  .color('phone');
chart
  .line()
  // highlight-start
  .adjust('stack')
  // highlight-end
  .position('feature*value')
  .color('phone');
chart
  .point()
  // highlight-start
  .adjust('stack')
  // highlight-end
  .position('feature*value')
  .color('phone')
  .shape('circle');
```

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*bs8YTLj2uqsAAAAAAAAAAABkARQnAQ)

## 坐标系变化

我们还可以通过 `chart.coordinate()`  接口，一步将以上图形切换至极坐标系下：

```typescript
chart.coordinate('polar');
```

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*Vn16S4y68BQAAAAAAAAAAABkARQnAQ)

这样就变成了雷达图。

## 分面

上面我们已经介绍了使用图形属性（颜色和形状）类比较不同分组的方法，它可以帮助我们将所有的数据组都绘制在同一张图表上。而分面提供了另外一种方法：将一份数据按照某个维度分隔成若干子集，然后创建一个图表的矩阵，将每一个数据子集绘制到图形矩阵的窗格中。G2 提供了多种分面类型，在这里我们使用 `rect`  分面类型，对上述数据进行分割绘制：![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*xQnuRJeG0JIAAAAAAAAAAABkARQnAQ)

> 在这个例子中，我们以 `phone`  字段为分割维度，使用 `rect`  分面类型，以列分面的性质展示三个手机的各自的数据集。

```typescript
const chart = new Chart({
  container: 'mountNode',
  autoFit: false,
  width: 600,
  height: 300,
  padding: [0, 100, 0, 40],
});

chart.data(data);
chart.scale({
  value: {
    sync: true,
  },
});
// highlight-start
chart.facet('rect', {
  fields: [null, 'phone'],
  rowTitle: {
    style: {
      textAlign: 'start',
      fontSize: 12,
    },
  },
  eachView(view) {
    view.area().position('feature*value');
    view.line().position('feature*value');
    view
      .point()
      .position('feature*value')
      .shape('circle');
  },
});
// highlight-end
chart.render();
```

## 图表样式配置

G2 绘制的图表由以下基本元素组成：

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*7yM9TZK9FU4AAAAAAAAAAABkARQnAQ)

- Axis 坐标轴可以通过 `chart.axis()`  接口进行配置
- Tooltip 提示信息可以通过 `chart.tooltip()`  接口进行配置
- Legend 图例可以通过 `chart.legend()`  接口进行配置

如下代码所示，我们通过  `chart.legend()` 接口调整了图例的显示位置：

```typescript
chart.legend({
  position: 'right-bottom',
});
```

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*cEnUSYejBNEAAAAAAAAAAABkARQnAQ)

在这里我们只做一个大体的介绍，更详细的使用方式详见其他教程篇章。
