---
title: Geometry 几何标记
order: 6
---

# 什么是几何标记

即我们所说的点、线、面这些几何图形。G2 中并没有特定的图表类型（柱状图、散点图、折线图等）的概念，用户可以单独绘制某一种类型的图表，如饼图，也可以绘制混合图表，比如折线图和柱状图的组合。

G2 生成的图表的类型，都是由几何标记决定的。可以通过下图直观得理解什么是几何标记：![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*_r5_SIX-5FMAAAAAAAAAAABkARQnAQ)

## 如何声明几何标记

创建好 chart 对象之后，就可以通过如下方式选择几何标记的类型：

```javascript
const geom = chart.point().xx().xx(); // 这里使用了 point 类型的 geom，该方法会返回 geom 对象
```

## 几何标记类型

目前 G2 支持的几何标记的类型如下：

| geom 类型 | 描述 |
| --- | --- |
| `point` | 点，用于绘制各种点图。 |
| `path` | 路径，无序的点连接而成的一条线，常用于路径图的绘制。 |
| `line` | 线，点按照 x 轴连接成一条线，构成线图。 |
| `area` | 填充线图跟坐标系之间构成区域图，也可以指定上下范围。 |
| `interval` | 使用矩形或者弧形，用面积来表示大小关系的图形，一般构成柱状图、饼图等图表。 |
| `polygon` | 多边形，可以用于构建色块图、地图等图表类型。 |
| `edge` | 两个点之间的链接，用于构建树图和关系图中的边、流程图中的连接线。 |
| `schema` | 自定义图形，用于构建箱型图（或者称箱须图）、蜡烛图（或者称 K 线图、股票图）等图表。 |
| `heatmap` | 用于**热力图**的绘制。 |

## 几何标记和图表类型

虽然 G2 没有特定的图表类型概念，**但是仍基本支持所有传统图表类型的绘制**。

下表展示了 G2 中的 geom 几何标记类型和传统图表的对应关系，更多的图表详见 G2 官网的 [demo](/zh/examples/line/basic)。

| geom 类型 | 图表类型 | 备注 |
| --- | --- | --- |
| point | 点图、折线图中的点 | 点的形状有很多，也可以使用图片代表点（气泡图），同时点也可以在不同坐标系下显示，所以可以扩展出非常多的图表类型。 |
| path | 路径图，地图上的路径 | 路径图是无序的线图。 |
| line | 折线图、曲线图、阶梯线图 | 在极坐标系下可以转换成雷达图。 |
| area | 区域图（面积图）、层叠区域图、区间区域图 | 极坐标系下可用于绘制雷达区域图。 |
| interval | 柱状图、直方图、南丁格尔玫瑰图、饼图、条形环图（玉缺图）、漏斗图等 | 通过坐标系的转置、变化，可以生成各种常见的图表类型；所有的图表都可以进行层叠、分组。 |
| polygon | 色块图（像素图）、热力图、地图 | 多个点可以构成多边形。 |
| schema | k 线图，箱型图 | 自定义的图表类型。 |
| edge | 树图、流程图、关系图 | 与点一起构建关系图。 |
| heatmap | 热力图 | -- |

## geom 对象方法

几何标记 geom 对象方法主要有两种：

- 图形属性（attr）方法：用户设置数据到视觉通道的映射，详细信息查看 [图形属性](/zh/docs/manual/tutorial/attribute)

  - position

  - color

  - size

  - shape

  - opacity

- 属性方法之外的方法

  - label(dims, [callback], cfg) 几何标记上显示文本

  - tooltip(dims) 映射到 tooltip 的字段

  - style(cfg) 配置图形的样式

  - select(cfg) 图形选中操作

  - active(boolean) 图形激活交互开关

  - animate(cfg) 图形的动画

> 具体 API 详见[文档](/zh/docs/api/geometry)

## 几何标记和图形形状

使用几何标记实现各种图表类型时，对于每一种几何标记来说，在绘制的时候有不同的形状（shape)，视觉通道跟图形属性的映射方式不一样也会生成不同的图形：

- 点图，可以使用圆点、三角形、正方形、十字符号等表示点

- 线图，可以有折线、曲线、点线等

- 多边形，可以是实心的多边形，也可以是空心的仅有边框的多边形

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*IVY9T7Ht1BQAAAAAAAAAAABkARQnAQ)

下面提供了 G2 中各个 geom 内置提供的 shape 类型，在后续图形属性章节，会详细介绍 shape 的使用方法。

| geom 类型 | shape 类型 | 解释 |
| --- | --- | --- |
| point | 'circle','square','bowtie','diamond',<br />'hexagon','triangle','triangle-down','hollowCircle',<br />'hollowSquare','hollowBowtie',<br />'hollowDiamond','hollowHexagon',<br />'hollowTriangle','hollowTriangle-down','cross','tick',<br />'plus','hyphen','line' | hollow 开头的图形都是空心的 |
| line | 'line','smooth','dot','dash',<br />'dotSmooth','spline' | dot ：点线，smooth： 平滑线 |
| area | 'area','smooth','line','dotLine',<br />'smoothLine','dotSmoothLine' | [area] 和 [smooth] 是填充内容的区域图，其他图表是空心的线图 |
| interval | 'rect','hollowRect','line',<br />'tick','stroke','funnel', 'pyramid' | [hollowRect] 是空心的矩形， [line] 和 [tick] 都是线段，stroke：带边框的矩形，'funnel' 漏斗图；'pyramid' 金字塔图 |
| polygon | 'polygon','hollow','stroke' | polygon：多边形、hollow：空心多边形和 stroke：带边框的多边形 |
| schema | 'box','candle' | 目前仅支持箱须图、K 线图 |
| edge | 'line','vhv','smooth','arc' | vhv：直角折线，arc：弧线，分为笛卡尔坐标系、极坐标系、带权重和不带权重四种情况。 |

以折线图为例：

```javascript
chart.line().position('x*y').shape('type', ['line', 'dot']);

chart.line().position('x*y').shape('type', function(type) {
	if(type === 'a') {
    	return 'line';
    } else {
    	return 'dot';
    }
});
```

如果上面各种几何标记的图形形状没法满足你需求的话，可以进行 [自定义shape](/zh/docs/manual/tutorial/shape)
