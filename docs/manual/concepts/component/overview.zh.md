---
title: 概览
order: 0
---

常见的 G2 图表包含的组件如下图所示：

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*vS9aS7nrfH4AAAAAAAAAAABkARQnAQ" style="width:100%">

## 几何图形 Geometry

几何图形（Geometry），即我们所说的点、线、面这些几何图形，在 G2 中几何标记的类型决定了生成图表的类型，也就是数据被可视化后的实际表现，不同的几何标记都包含对应的图形属性 Attribute。

查看 [Geometry 教程](../geometry/overview)获取更多信息。

## 坐标轴 Axis

每个图表通常包含两个坐标轴，在直角坐标系（笛卡尔坐标系）下，分别为 x 轴和 y 轴，在极坐标轴下，则分别由角度和半径 2 个维度构成。

每个坐标轴由坐标轴线（line）、刻度线（tickLine）、刻度文本（label）、标题（title）以及网格线（grid）组成。

查看 [Axis 教程](./axis)获取更多信息

## 图例 Legend

图例作为图表的辅助元素，用于标定不同的数据类型以及数据的范围，辅助阅读图表，帮助用户在图表中进行数据的筛选过滤。

查看 [Legend 教程](./legend)获取更多信息。

## 提示信息 Tooltip

当鼠标悬停在某个点上时，会以提示框的形式显示当前点对应的数据的信息，比如该点的值，数据单位等。数据提示框内提示的信息还可以通过格式化函数动态指定。

查看 [Tooltip 教程](./tooltip)获取更多信息。

## 辅助标记 Annotation

当需要在图表上绘制一些辅助线、辅助框或者图片时，比如增加平均值线、最高值线或者标示明显的范围区域时，可以使用辅助标记 annotation。

查看 [Annotation 教程](./annotation)获取更多信息。

## 缩略轴 Slider

当图表中数据量比较多，用户希望关注数据集中在某个特殊区域的时候，可以使用缩略轴组件。缩略轴较适用于折线图。

查看 [Slider 教程](./slider)获取更多信息。

## 滚动条 Scrollbar

当图表中数据量比较多多，也可以适用滚动条组件来一次只浏览一部分数据。滚动条组件提供水平滚动条、和垂直滚动条。滚动条组件较适用于柱形图和条形图。

查看 [Scrollbar 教程](../../../api/general/scrollbar)获取更多信息。
