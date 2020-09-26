---
title: G2 主题配置项详解
order: 7
---

## 基础配置

- 主题色： defaultColor
- 字体：fontFamily
- 图表内边距：padding，默认 'auto' 自动计算

## 图形属性映射

- 色板：colors
- 形状：shapes，定义每个几何标记对应的 shapes 列表
- 大小: sizes，映射的图形大小范围

## 图形样式

因为 G2 的图形是由 Geometry + Shape 组成的:

| **geometry 类型** |                                                                                                                         **shape 类型**                                                                                                                         |                                                                                                                     **解释**                                                                                                                      |
| :---------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|       point       | - 'circle'- 'square'- 'bowtie'- 'diamond'- 'hexagon'- 'triangle'- 'triangle-down'- 'hollow-circle'- 'hollow-square'- 'hollow-bowtie'- 'hollow-diamond'- 'hollow-hexagon'- 'hollow-triangle'- 'hollow-triangle-down'- 'cross'- 'tick'- 'plus'- 'hyphen'- 'line' |        hollow 开头的图形都是空心的。![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*SOzoR4n967MAAAAAAAAAAABkARQnAQ)![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*AyLUTY60MDkAAAAAAAAAAABkARQnAQ)        |
|       line        |                                                                                                  - 'line'- 'dot'- 'dash'- 'smooth'- 'hv'- 'vh'- 'hvh'- 'vhv'                                                                                                   |                                                  'hv', 'vh', 'hvh', 'vhv' 用于绘制阶梯线图。![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*yMFrQKD52WcAAAAAAAAAAABkARQnAQ)                                                   |
|       area        |                                                                                                           - 'area'- 'smooth'- 'line'- 'smooth-line'                                                                                                            |                                       'area' 和 'smooth-line' 是填充内容的区域图，其他图表是空心的线图。![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*nX8vR4cShMYAAAAAAAAAAABkARQnAQ)                                       |
|     interval      |                                                                                                  - 'rect'- 'hollow-rect'- 'line'- 'tick'- 'funnel'- 'pyramid'                                                                                                  |                  'hollow-rect' 是空心的矩形，'line' 和 'tick' 都是线段，'funnel' 用于绘制漏斗图；'pyramid' 用于绘制金字塔图。![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*0H-zQrrV7YcAAAAAAAAAAABkARQnAQ)                  |
|      polygon      |                                                                                                                          - 'polygon'                                                                                                                           |                                                               polygon：多边形。![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*QgsPTLQ3eLUAAAAAAAAAAABkARQnAQ)                                                                |
|      schema       |                                                                                                                       - 'box'- 'candle'                                                                                                                        | 目前仅支持箱须图('box')、K 线图('candle')。![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*olU9QYwnMgMAAAAAAAAAAABkARQnAQ)![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*JX_ISqY-UIAAAAAAAAAAAABkARQnAQ) |
|       edge        |                                                                                                                - 'line'- 'vhv'- 'smooth'- 'arc'                                                                                                                |                                vhv：直角折线，arc：弧线，分为笛卡尔坐标系、极坐标系、带权重和不带权重四种情况。![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*UOxHSKuGsBwAAAAAAAAAAABkARQnAQ)                                |

所以在配置图形样式时，需要以 Geometry 名称 + Shape 名称为 token，进行样式定义，目前主题开放的配置可用于定义图形的默认显示样式，active 的样式，inactive 的样式以及 selected 的样式。

> 以上配置定义的是 interval 这个几何标记下 rect 形状在各个状态下的样式。通常我们只需要为各个 Geometry 设置一个或者两个样式（填充或者描边的样式）即可，Geometry 下的各个 shapes 复用即可，除非某个 shape 样式特殊。

## 图表组件

所有的图表组件样式，定义在 `components`  属性下。

### 坐标轴

G2 的坐标轴根据坐标系类型的不同进行了类型划分，但是每种类型下的配置属性是相同的。

1. 对于直角坐标系，我们提供了上、下、左、右四个方向的坐标轴配置。
1. 对于极坐标系，我们提供了半径轴和圆弧轴的两个坐标轴的配置。

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*QwP6RI0M2n8AAAAAAAAAAABkARQnAQ)每个坐标轴可配置的属性如下：

| 属性名      | 描述                                                                                        |
| ----------- | ------------------------------------------------------------------------------------------- |
| title       | 坐标轴标题，可以控制：1. 是否展示 1. 标题的显示位置 1. 标题文本的样式                       |
| label       | 坐标轴文本，可以控制：1. 是否展示 1. 是否自动隐藏或者自动旋转 1. 文本的样式                 |
| line        | 坐标轴线，可以控制：1. 是否展示 1. 线的样式                                                 |
| grid        | 网格线，可以控制：1. 是否展示 1. 网格线的样式                                               |
| tickLine    | 坐标轴刻度线，可以控制：1. 是否展示 1. 刻度线的长度 1. 刻度线的样式 1. 刻度线是否和文本对齐 |
| subTickLine | 坐标轴自刻度线，可以控制：1. 是否展示 1. 刻度线的样式                                       |

### 图例

G2 中图例分为连续图例和分类图例两种，同样主题中也为这两种类型的图例提供了配置。

- 分类图例，针对分类图例，可以配置如下属性：

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*7ka8SLG1io8AAAAAAAAAAABkARQnAQ)

| 属性名   | 描述                                              |
| -------- | ------------------------------------------------- |
| title    | 图例标题，可以控制：1. 是否展示 1. 标题文本的样式 |
| marker   | 图例项 marker，可以控制：1. 形状 1. 样式          |
| itemName | 图例项文本，可以控制：1. 文本样式 1. 间距         |

- 连续图例，针对连续图例，可以配置一下属性：

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*-1IJRJbBJxYAAAAAAAAAAABkARQnAQ)

| 属性名  | 描述                                              |
| ------- | ------------------------------------------------- |
| title   | 图例标题，可以控制：1. 是否展示 1. 标题文本的样式 |
| track   | _选择范围的色块样式_                              |
| rail    | _图例滑轨（背景）的样式配置项_                    |
| label   | _文本的样式配置_                                  |
| handler | _滑块的样式配置_                                  |

### Tooltip

针对 tooltip，主题开放的配置为：

1. marker 的样式
1. crosshairs 的样式
1. tooltip 整个内容框的样式配置

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*HW-WRqzZT3MAAAAAAAAAAABkARQnAQ)

### Annotation 

G2 在主题中提供了以下 7 种 Annotation 的样式配置：

| Annotation 类型 | 描述                     | 样式                                                                                                |
| --------------- | ------------------------ | --------------------------------------------------------------------------------------------------- |
| arc             | 弧线                     | ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*p6NSQau2HloAAAAAAAAAAABkARQnAQ) |
| line            | 辅助线，带文本           | ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*ob5ARp0Fk_cAAAAAAAAAAABkARQnAQ) |
| text            | 标注文本                 | ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*7xDjT7Q3B_IAAAAAAAAAAABkARQnAQ) |
| region          | 辅助区域                 | ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*IpEdQaAmGDoAAAAAAAAAAABkARQnAQ) |
| dataMarker      | 带点、线及文本的图形标记 | ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*ycZ0R4cueL0AAAAAAAAAAABkARQnAQ) |
| dataRegion      | 带区域及文本的图形标记   | ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*9qcrRp5rWdcAAAAAAAAAAABkARQnAQ) |

### Labels

图形标签，在 G2 主题中，分为以下三类：

| 类型        | 描述                                                         |                                                                                                     |
| ----------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| labels      | 通用 labels，可以配置文本的距离及样式                        | ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*eMhjSatkIikAAAAAAAAAAABkARQnAQ) |
| innerLabels | 显示在图形内部的文本，可以配置文本的距离及样式               | ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*kL3SRJKtuO0AAAAAAAAAAABkARQnAQ) |
| pieLabels   | 饼图文本的样式，可以配置文本的距离、样式以及文本连接线的样式 | ![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*3GGPQZ66bggAAAAAAAAAAABkARQnAQ) |
