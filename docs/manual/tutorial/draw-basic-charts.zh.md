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

![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1580885622670-351e7c56-de89-4126-8301-54c904e25d85.png#align=left&display=inline&height=103&name=image.png&originHeight=205&originWidth=534&size=13632&status=done&style=none&width=267)

下表罗列了 G2 中各个 geometry 内置提供的 shape 类型:

| **geometry 类型** |                                                                                                                         **shape 类型**                                                                                                                         |                                                   **解释**                                                   |
| :---------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------: |
|       point       | - 'circle'- 'square'- 'bowtie'- 'diamond'- 'hexagon'- 'triangle'- 'triangle-down'- 'hollow-circle'- 'hollow-square'- 'hollow-bowtie'- 'hollow-diamond'- 'hollow-hexagon'- 'hollow-triangle'- 'hollow-triangle-down'- 'cross'- 'tick'- 'plus'- 'hyphen'- 'line' |                                        hollow 开头的图形都是空心的。                                         |
|       line        |                                                                                                  - 'line'- 'dot'- 'dash'- 'smooth'- 'hv'- 'vh'- 'hvh'- 'vhv'                                                                                                   |                                 'hv', 'vh', 'hvh', 'vhv' 用于绘制阶梯线图。                                  |
|       area        |                                                                                                           - 'area'- 'smooth'- 'line'- 'smooth-line'                                                                                                            |                      'area' 和 'smooth-line' 是填充内容的区域图，其他图表是空心的线图。                      |
|     interval      |                                                                                                  - 'rect'- 'hollow-rect'- 'line','tick'- 'funnel'- 'pyramid'                                                                                                   | 'hollow-rect' 是空心的矩形，'line' 和 'tick' 都是线段，'funnel' 用于绘制漏斗图；'pyramid' 用于绘制金字塔图。 |
|      polygon      |                                                                                                                          - 'polygon'                                                                                                                           |                                              polygon：多边形。                                               |
|      schema       |                                                                                                                       - 'box'- 'candle'                                                                                                                        |                                 目前仅支持箱须图('box')、K 线图('candle')。                                  |
|       edge        |                                                                                                                - 'line'- 'vhv'- 'smooth'- 'arc'                                                                                                                |               vhv：直角折线，arc：弧线，分为笛卡尔坐标系、极坐标系、带权重和不带权重四种情况。               |

## 折线图

### 基础实例

链接：[http://localhost:8000/zh/examples/line/basic](http://localhost:8000/zh/examples/line/basic)![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1580886908285-c9db444b-5b5c-4d5b-93bf-ad35eb78497d.png#align=left&display=inline&height=529&name=image.png&originHeight=1104&originWidth=1372&size=71346&status=done&style=none&width=657)

### 核心语法

`chart.line().position('year*value');`

## 面积图

### 基础实例

链接：[http://localhost:8000/zh/examples/area/basic](http://localhost:8000/zh/examples/area/basic)![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1580887468018-668ae2b4-5441-4bbf-bd65-9f0f25853774.png#align=left&display=inline&height=533&name=image.png&originHeight=1066&originWidth=1404&size=84442&status=done&style=none&width=702)

### 核心语法

```typescript
chart.area().position('year*value');
```

## 柱状图

### 基础实例

链接：[http://localhost:8000/zh/examples/column/basic](http://localhost:8000/zh/examples/column/basic)![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1580887507415-44fa9176-e179-4b3b-ab14-3db276851bf0.png#align=left&display=inline&height=542&name=image.png&originHeight=1084&originWidth=1398&size=68176&status=done&style=none&width=699)

### 核心语法

```typescript
chart.interval().position('year*sales');
```

## 条形图

### 基础实例

链接：[http://localhost:8000/zh/examples/bar/basic](http://localhost:8000/zh/examples/bar/basic)![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1580887538786-7050a9cd-8d44-4f2f-87e9-cebbaba63814.png#align=left&display=inline&height=546&name=image.png&originHeight=1092&originWidth=1394&size=74199&status=done&style=none&width=697)

### 核心语法

```typescript
chart.coordinate().transpose();
chart.interval().position('country*population');
```

## 饼图

### 基础实例

链接：[http://localhost:8000/zh/examples/pie/basic](http://localhost:8000/zh/examples/pie/basic)![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1580887635655-bfbf1981-37c1-4ec8-9787-46d5a7a85c45.png#align=left&display=inline&height=513&name=image.png&originHeight=1026&originWidth=1128&size=97138&status=done&style=none&width=564)

### 核心语法

```typescript
chart.coordinate('theta');
chart
  .interval()
  .position('percent')
  .color('item')
  .adjust('stack');
```

## 散点图

### 基础实例

链接：[http://localhost:8000/zh/examples/point/scatter](http://localhost:8000/zh/examples/point/scatter)![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1580887928360-37a193da-a775-4f72-b79d-e0399a199e70.png#align=left&display=inline&height=540&name=image.png&originHeight=1080&originWidth=1374&size=187367&status=done&style=none&width=687)

### 核心语法

```typescript
chart
  .point()
  .position('height*weight')
  .color('gender')
  .shape('circle')
  .style({
    fillOpacity: 0.6,
  });
```

## 漏斗图

### 基础实例

链接：[http://localhost:8000/zh/examples/funnel/funnel](http://localhost:8000/zh/examples/funnel/funnel)![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1580888147493-c57b804f-98ec-48c9-9436-3beaad09cf8f.png#align=left&display=inline&height=484&name=image.png&originHeight=968&originWidth=1216&size=94147&status=done&style=none&width=608)

### 核心语法

```typescript
chart
  .coordinate('rect')
  .transpose()
  .scale(1, -1);
chart
  .interval()
  .adjust('symmetric')
  .position('action*percent')
  .shape('funnel')
  .color('action', ['#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF']);
```

## 雷达图

### 基础实例

链接：[http://localhost:8000/zh/examples/radar/radar](http://localhost:8000/zh/examples/radar/radar)![image.png](https://cdn.nlark.com/yuque/0/2020/png/98090/1580888209324-d5d398dc-29d5-413b-8994-4c1dbec6dac0.png#align=left&display=inline&height=520&name=image.png&originHeight=1040&originWidth=960&size=148786&status=done&style=none&width=480)

### 核心语法

```typescript
chart.coordinate('polar', {
  radius: 0.8,
});
chart
  .line()
  .position('item*score')
  .color('user')
  .size(2);
chart
  .point()
  .position('item*score')
  .color('user')
  .shape('circle')
  .size(4)
  .style({
    stroke: '#fff',
    lineWidth: 1,
    fillOpacity: 1,
  });
chart
  .area()
  .position('item*score')
  .color('user');
```

## 更多图表

更多图表类型，请访问 [demos 页面]()。
