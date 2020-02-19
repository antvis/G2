---
title: G2 基础概念概览
order: 2
---

为了更好得使用 G2 进行数据可视化，我们需要了解 G2 的图表组成以及相关概念。

## 图形语法

G2 的强大是由其背后的一套图形语法所支撑的，它基于[《The Grammar of Graphics》(Leland Wilkinson 著)](https://book.douban.com/subject/10123863/)一书，是一套用来描述所有统计图表深层特性的语法规则，该语法回答了『什么是统计图表』这一问题，以自底向上的方式组织最基本的元素形成更高级的元素。

![image.png](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*PDXtQYx4gAYAAAAAAAAAAABkARQnAQ)

由此，G2 所构建出的图表是由一系列独立的图形语法元素组合而成的：

- **数据 Data**：可视化最基础的部分。
- **图形属性 Attribute**：负责将数据中的变量映射至图形空间。
- **几何标记 Geometry**：即你在图表中实际看到的图形元素，如点、线、多边形等，每个几何标记对象含有多个图形属性，G2 的核心就是建立数据中的一系列变量到图形属性的映射。
- **度量 Scale**：数据空间到图形属性空间的转换桥梁，每一个图形属性都对应着一个或者多个度量。
- **坐标系 Coordinate**：描述了数据是如何映射到图形所在的平面的，同一个几何标记在不同坐标系下会有不同的表现。G2 提供了多种坐标系的支持：笛卡尔坐标、极坐标以及螺旋坐标等。
- **可视化组件 Component**：也可以成为图表辅助元素，用于增强图表的可读性和可理解性，在 G2 中，提供了丰富的可视化组件，包括坐标轴 Axis，图例 Legend，提示信息 Tooltip，图形标记 Annotation，滑动条 Slider 等。
- **分面 Facet**：描述了如何将数据分解为各个子集，以及如何对这些子集作图并联合进行展示，主要用于多维数据分析。

所以，在 G2 中，我们通常这么描述一张图表：**一张图表就是从数据到几何标记对象的图形属性的一个映射，此外图形中还可能包含数据的统计变换，最后绘制在某个特定的坐标系中**。

## 交互语法

G2 的图形语法本质上是将数据映射到图形的过程拆解成为一个个最基本的元素，然后通过组合搭配产生千变万化的图表。交互语法也是一样，我们将一个交互进行拆解，然后再组合以形成一个完整的交互行为。

在 G2 中，我们认为一个**交互行为**是由一系列**交互环节**组成，而每一个交互环节又由以下两部分组成：

1. **触发**，交互环节的触发，包括触发对象和触发事件
1. **反馈**，交互环节的结果

对于交互环节，我们又可以将其分类为：

- 示能：表示交互可以进行
- 开始：交互开始
- 持续：交互持续
- 结束：交互结束
- 暂停：交互暂停
- 回滚：取消交互，恢复到原始状态

所以 G2 的交互语法就变成了对交互环节的组装，以框选图表交互行为为例，我们使用交互语法描述如下：

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*W1vOSalgrxQAAAAAAAAAAABkARQnAQ)

![](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*iv-ESoJg8noAAAAAAAAAAABkARQnAQ)

更多交互语法细节，请阅读[交互语法](/concepts/grammar-of-interaction)。

## View 视图

View 是拥有独立数据源，并且能够绘制多个图形的容器，里面会包含 Geometry，组件，交互，事件等，而 Chart 是继承于 View，直接暴露给开发者的便捷使用入口，所以 Chart 也是 View，所以用户可以通过 Chart 创建子 View，再通过子 View 再创建子 View，常作为异构数据以及多维数据的可视化解决方案。

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*xW6bT7-4E1sAAAAAAAAAAABkARQnAQ)

## 图表组成

常见的 G2 图表组成如下图所示：

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*vS9aS7nrfH4AAAAAAAAAAABkARQnAQ)

### 坐标轴 Axis

每个图表通常包含两个坐标轴，在直角坐标系（笛卡尔坐标系）下，分别为 x 轴和 y 轴，在极坐标轴下，则分别由角度和半径 2 个维度构成。

每个坐标轴由坐标轴线（line）、刻度线（tickLine）、刻度文本（label）、标题（title）以及网格线（grid）组成。

查看 [Axis 教程](tutorial/axis)获取更多信息。

### 图例 Legend

图例作为图表的辅助元素，用于标定不同的数据类型以及数据的范围，辅助阅读图表，帮助用户在图表中进行数据的筛选过滤。

查看 [Legend 教程](tutorial/legend)获取更多信息。

### 几何标记 Geometry

几何标记（Geometry），即我们所说的点、线、面这些几何图形，在 G2 中几何标记的类型决定了生成图表的类型，也就是数据被可视化后的实际表现，不同的几何标记都包含对应的图形属性 Attribute。

查看 [Geometry 教程](concepts/geometry)获取更多信息。

### 提示信息 Tooltip

当鼠标悬停在某个点上时，会以提示框的形式显示当前点对应的数据的信息，比如该点的值，数据单位等。数据提示框内提示的信息还可以通过格式化函数动态指定。

查看 [Tooltip 教程](tutorial/tooltip)获取更多信息。

### 图形标记 Annotation

当需要在图表上绘制一些辅助线、辅助框或者图片时，比如增加平均值线、最高值线或者标示明显的范围区域时，可以使用辅助标记 annotation。

查看 [Annotation 教程](tutorial/annotation)获取更多信息。
