---
title: 绘制基础图表
order: 16
---

## Geometry 几何标记

G2 中并没有特定的图表类型（柱状图、散点图、折线图等）的概念，所有的图表都是通过组合一系列图形语法元素绘制而成的，用户可以单独绘制某一种类型的图表，如饼图，也可以绘制混合图表，比如折线图和柱状图的组合。

在 G2 中，我们通常这么描述一张图表：**从数据到几何标记对象的图形属性的一个映射，此外图形中还可能包含数据的统计变换，最后绘制在某个特定的坐标系中**。

在向大家介绍如何使用图形语法绘制各种基础图表前，需要先了解下 Geometry 几何标记：即我们所说的点、线、面这些几何图形，G2 默认提供了如下 9 中几何标记：

| **geometry 类型** |                                      **描述**                                       |
| :---------------: | :---------------------------------------------------------------------------------: |
|      `point`      |                               点，用于绘制各种点图。                                |
|      `path`       |                路径，无序的点连接而成的一条线，常用于路径图的绘制。                 |
|      `line`       |                       线，点按照 x 轴连接成一条线，构成线图。                       |
|      `area`       |                填充线图跟坐标系之间构成区域图，也可以指定上下范围。                 |
|    `interval`     |     使用矩形或者弧形，用面积来表示大小关系的图形，一般构成柱状图、饼图等图表。      |
|     `polygon`     |                    多边形，可以用于构建色块图、地图等图表类型。                     |
|      `edge`       |          两个点之间的链接，用于构建树图和关系图中的边、流程图中的连接线。           |
|     `schema`      | 自定义图形，用于构建箱型图（或者称箱须图）、蜡烛图（或者称 K 线图、股票图）等图表。 |
|     `heatmap`     |                               用于**热力图**的绘制。                                |

对于每一种几何标记来说，在绘制时还可以对应不同的形状（shape)，举例来说：

- 点图，可以使用圆点、三角形、正方形、十字符号等表示点
- 线图，可以有折线、曲线、点线等
- 多边形，可以是实心的多边形，也可以是空心的仅有边框的多边形

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*HD1lQKSvKHUAAAAAAAAAAABkARQnAQ" style="width: 50%;">

下表罗列了 G2 中各个 geometry 内置提供的 shape 类型:

| **geometry 类型** |                                                                                                                        **shape 类型**                                                                                                                        |                                                   **解释**                                                   |
| :---------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------: |
|       point       | 'circle', 'square', 'bowtie', 'diamond', 'hexagon', 'triangle', 'triangle-down', 'hollow-circle', 'hollow-square', 'hollow-bowtie', 'hollow-diamond', 'hollow-hexagon', 'hollow-triangle', 'hollow-triangle-down', 'cross', 'tick', 'plus', 'hyphen', 'line' |                                        hollow 开头的图形都是空心的。                                         |
|       line        |                                                                            'line', 'dot', 'dash', 'smooth', 'hv', 'vh', 'hvh', 'vhv', 'hv', 'vh', 'hvh', 'vhv' 用于绘制阶梯线图。                                                                            |
|       area        |                                                                                                           'area', 'smooth', 'line', 'smooth-line'                                                                                                            |                      'area' 和 'smooth-line' 是填充内容的区域图，其他图表是空心的线图。                      |
|     interval      |                                                                                                  'rect', 'hollow-rect', 'line','tick', 'funnel', 'pyramid'                                                                                                   | 'hollow-rect' 是空心的矩形，'line' 和 'tick' 都是线段，'funnel' 用于绘制漏斗图；'pyramid' 用于绘制金字塔图。 |
|      polygon      |                                                                                                                          'polygon'                                                                                                                           |                                              polygon：多边形。                                               |
|      schema       |                                                                                                                       'box', 'candle'                                                                                                                        |                                 目前仅支持箱须图('box')、K 线图('candle')。                                  |
|       edge        |                                                                                                                'line', 'vhv', 'smooth', 'arc'                                                                                                                |               vhv：直角折线，arc：弧线，分为笛卡尔坐标系、极坐标系、带权重和不带权重四种情况。               |

## 折线图

### 基础实例

链接：[https://g2.antv.vision/zh/examples/line/basic](https://g2.antv.vision/zh/examples/line/basic)

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*sawJQpa3IHQAAAAAAAAAAABkARQnAQ" style="width: 50%;">

### 核心语法

`chart.line().position('year*value');`

## 面积图

### 基础实例

链接：[https://g2.antv.vision/zh/examples/area/basic](https://g2.antv.vision/zh/examples/area/basic)

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*aC4uRb3mPzoAAAAAAAAAAABkARQnAQ" style="width: 50%;">

### 核心语法

```typescript
chart.area().position('year*value');
```

## 柱状图

### 基础实例

链接：[https://g2.antv.vision/zh/examples/column/basic](https://g2.antv.vision/zh/examples/column/basic)

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*5EBZQI2YjX0AAAAAAAAAAABkARQnAQ" style="width: 50%;">

### 核心语法

```typescript
chart.interval().position('year*sales');
```

## 条形图

### 基础实例

链接：[https://g2.antv.vision/zh/examples/bar/basic](https://g2.antv.vision/zh/examples/bar/basic)

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*MMeSTLWvzp4AAAAAAAAAAABkARQnAQ" style="width: 50%;">

### 核心语法

```typescript
chart.coordinate().transpose();
chart.interval().position('country*population');
```

## 饼图

### 基础实例

链接：[https://g2.antv.vision/zh/examples/pie/basic](https://g2.antv.vision/zh/examples/pie/basic)

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*Rae2R43KhQsAAAAAAAAAAABkARQnAQ" style="width: 50%;">

### 核心语法

```typescript
chart.coordinate('theta');
chart.interval().position('percent').color('item').adjust('stack');
```

## 散点图

### 基础实例

链接：[https://g2.antv.vision/zh/examples/point/scatter](https://g2.antv.vision/zh/examples/point/scatter)

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*bZLwQZ1yJTwAAAAAAAAAAABkARQnAQ" style="width: 50%;">

### 核心语法

```typescript
chart.point().position('height*weight').color('gender').shape('circle').style({
  fillOpacity: 0.6,
});
```

## 漏斗图

### 基础实例

链接：[https://g2.antv.vision/zh/examples/funnel/funnel](https://g2.antv.vision/zh/examples/funnel/funnel)

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*LnLvQJTv-VMAAAAAAAAAAABkARQnAQ" style="width: 50%;">

### 核心语法

```typescript
chart.coordinate('rect').transpose().scale(1, -1);
chart
  .interval()
  .adjust('symmetric')
  .position('action*percent')
  .shape('funnel')
  .color('action', ['#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF']);
```

## 雷达图

### 基础实例

链接：[https://g2.antv.vision/zh/examples/radar/radar](https://g2.antv.vision/zh/examples/radar/radar)

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*_tPRTZPyNpwAAAAAAAAAAABkARQnAQ" style="width: 50%;">

### 核心语法

```typescript
chart.coordinate('polar', {
  radius: 0.8,
});
chart.line().position('item*score').color('user').size(2);
chart.point().position('item*score').color('user').shape('circle').size(4).style({
  stroke: '#fff',
  lineWidth: 1,
  fillOpacity: 1,
});
chart.area().position('item*score').color('user');
```

## 更多

更多关于 Geometry 几何标记和图表类型的信息，可以翻阅[几何标记与图表类型](../concepts/geometry/overview)章节。
