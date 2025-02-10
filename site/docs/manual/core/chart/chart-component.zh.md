---
title: G2 图表组成
order: 1
---

## 简介
为了更好地使用 G2 进行数据可视化，我们需要了解 G2 图表的组成以及相关概念。

以下是一个简单的例子：

<img alt="chart-component" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ZHFsRpdpnwwAAAAAAAAAAAAAemJ7AQ/original"/>

## 标题 title

用于一句话概要说明图表要展示的数据，图表的标题是比较常用的组件，支持标题和副标题，以及他们的样式和位置设置。

查看 [Title](/manual/component/title) 教程获取更多信息。

## 坐标轴 axis

绘制坐标轴，目前支持直角坐标系坐标轴与极坐标系坐标轴。

每个坐标轴由坐标轴线（line）、刻度（tick）、刻度文本（label）、标题（title）以及网格线（grid）组成。

查看 [Axis](/manual/component/axis) 教程获取更多信息。

## 图例 legend

绘制图例，G2 提供了两种图例类型：分类图例（Category Legend）和连续图例（Continuous Legend），分别用于展示分类数据和连续数据。

查看 [Legend](/manual/component/legend) 教程获取更多信息。

## 滚动条 scrollbar

滚动条（scrollbar）是一个交互组件，当显示区域大小不足以容纳全部信息时，可以将超出部分隐藏，并通过滚动条的垂直或横向滑动来显示出被隐藏部分。

内容是否超出显示区域取决于内容的多少以及显示区域的尺寸，当需要显示的内容在纵向方向上超过显示区域的大小时，应当使用垂直滚动条以控制显示的部分，横向滚动条同理。

查看 [Scrollbar](/manual/component/scrollbar) 教程获取更多信息。

## 滑动条 slider

缩略轴（slider）是一种辅助看数据的组件，它将大量数据浓缩到一个轴上，既可以缩小宏观看数据全貌，又可以放大微观看数据的片段，同时还可以拖拽观察数据在一定区间内的演变。

缩略轴是值域数据的浓缩，它跟位置通道 x, y 对应的比例尺的类型息息相关。一般来说时间类型上使用缩略轴的频率高，连续轴使用缩略轴频次低、分类轴几乎不会使用到缩略轴。

查看 [Slider](/manual/component/slider) 教程获取更多信息。

## 提示信息 tooltip

当鼠标悬停在某个点上时，会以提示框的形式显示当前点对应的数据的信息，比如该点的值，数据单位等。数据提示框内提示的信息还可以通过格式化函数动态指定。

查看 [Tooltip](/manual/component/tooltip) 教程获取更多信息。
