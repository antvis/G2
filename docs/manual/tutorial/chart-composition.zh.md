---
title: G2 图表组成
order: 0
---

## 简介

为了更好得使用 G2 进行数据可视化，我们需要了解 G2 图表的组成以及相关概念。

完整的 G2 图表组成如下图所示：

![image | left](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*M8fAR6Gcf1QAAAAAAAAAAABkARQnAQ)

## 坐标轴 AXES

每个图表通常包含两个坐标轴，在直角坐标系（笛卡尔坐标系）下，分别为 x 轴和 y 轴，在极坐标轴下，则分别由角度和半径 2 个维度构成。

每个坐标轴由坐标轴线（line）、刻度线（tickLine）、刻度文本（label）、标题（title）以及网格线（grid）组成。

查看 [Axis 教程](/zh/docs/manual/tutorial/axis)获取更多信息。

## 图例 LEGEND

图例作为图表的辅助元素，用于标定不同的数据类型以及数据的范围，用于辅助阅读图表，帮助用户在图表中进行数据的筛选过滤。

查看 [Legend 教程](/zh/docs/manual/tutorial/legend)获取更多信息。

## 几何标记 GEOMETRY

几何标记（Geometry），即我们所说的点、线、面这些几何图形，在 G2 中几何标记的类型决定了生成图表的类型。也就是数据被可视化后的实际表现，不同的几何标记都包含对应的图形属性。

查看 [Geometry 教程](/zh/docs/manual/tutorial/geometry)获取更多信息。

## 提示信息 TOOLTIP

当鼠标悬停在某个点上时，会以提示框的形式显示当前点对应的数据的信息，比如该点的值，数据单位等。数据提示框内提示的信息还可以通过格式化函数动态指定。

查看 [Tooltip 教程](/zh/docs/manual/tutorial/tooltip)获取更多信息。

## 辅助标记 GUIDE

当需要在图表上绘制一些辅助线、辅助框或者图片时，比如增加平均值线、最高值线或者标示明显的范围区域时，可以使用辅助标记 guide。

查看 [Guide 教程](/zh/docs/manual/tutorial/guide)获取更多信息。
