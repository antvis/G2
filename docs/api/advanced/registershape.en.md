---
title: 自定义 Shape
order: 0
---

## 简介

自定义 Shape 可以很好地支持部分有 **高订制需求的** 图表可视化需求。这也是 G2 在向 **可编程可视化引擎** 迈出的重要一步。在使用自定义 Shape 之前，需要了解 G2 的绘图原理：在 G2 中每种几何形状都是由特定的几个关键点通过线连接而成，下表列出了  G2 各个几何形状的关键点形成机制：

| Geometry 类型 | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| point         | 点的绘制很简单，只要获取它的坐标以及大小即可，其中的  `size`  属性代表的是点的半径。 <img src="https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*IF_yR6LCyw4AAAAAAAAAAABkARQnAQ" style="width: 50%;">                                                                                                                                                                                                                                                   |
| line          | 线其实是由无数个点组成，在 G2 中我们将参与绘制的各个数据转换成坐标上的点然后通过线将逐个点连接而成形成线图，其中的  `size`  属性代表的是线的粗细。 <img src="https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*8YQzSpmUnEAAAAAAAAAAAABkARQnAQ" style="width: 50%;">                                                                                                                                                                                     |
| area          | area 面其实是在 line 线的基础之上形成的，它将折线图中折线与自变量坐标轴之间的区域使用颜色或者纹理填充。<img src="https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*JRyMSIpRfRwAAAAAAAAAAABkARQnAQ" style="width: 50%;">                                                                                                                                                                                                                                 |
| interval      | interval 默认的图形形状是矩形，而矩形实际是由四个点组成的，在 G2 中我们根据 pointInfo 中的 x、y、size 以及 y0 这四个值来计算出这四个点，然后顺时针连接而成。<img src="https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*soWnSLeska8AAAAAAAAAAABkARQnAQ" style="width: 50%;">                                                                                                                                                                            |
| polygon       | polygon 多边形其实也是由多个点连接而成，在 pointInfo 中 x 和 y 都是数组结构。<img src="https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*anXLQ72bP78AAAAAAAAAAABkARQnAQ" style="width: 50%;">                                                                                                                                                                                                                                                           |
| schema        | schema 作为一种自定义的几何图形，在 G2 中默认提供了 box 和 candle 两种 shape，分别用于绘制箱型图和股票图，注意这两种形状的矩形部分四个点的连接顺序都是顺时针，并且起始点均为左下角，这样就可以无缝转换至极坐标。<img src="https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*USWRQ4MxENAAAAAAAAAAAABkARQnAQ" style="width: 98px;"><img src="https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*NxwVQqQsgHwAAAAAAAAAAABkARQnAQ" style="width: 92px;"> |
| edge          | edge 边同 line 线一致，区别就是 edge 是一个线段，连接边的两个端点即可。                                                                                                                                                                                                                                                                                                                                                                                      |

## 接口定义

```javascript
import { registerShape } from '@antv/g2';

// 往 interval 几何标记上注册名为 'line' 的 shape
registerShape('interval', 'line', {
  // 定义 line 的关键点
  getPoints(shapePoint: ShapePoint) {
    return getLinePoints(shapePoint);
  },
  // 图形具体的绘制代码
  draw(cfg: ShapeInfo, container: IGroup) {
    const style = getStyle(cfg, true, false, 'lineWidth');
    const path = this.parsePath(getRectPath(cfg.points));
    const shape = container.addShape('path', {
      attrs: {
        ...style,
        path,
      },
      name: 'interval',
    });

    return shape;
  },
  // 定义图形的缩略图样式
  getMarker(markerCfg: ShapeMarkerCfg) {
    const { color } = markerCfg;
    return {
      symbol: (x: number, y: number, r: number) => {
        return [
          ['M', x, y - r],
          ['L', x, y + r],
        ];
      },
      style: {
        r: 5,
        stroke: color,
      },
    };
  },
});
```

<!-- 更详细的使用说明详见： [Shape API](../../api/register#g2registershape)。 -->

## 快速上手

以柱状图举例，几何标记 interval 会给出四个关键点（即组成矩形的四个顶点），然后将这四个点依次连接，得到每个柱子的形状。**红色圆形**标记就是几何标记点。默认的柱状图就是通过四个几何标记点，依次相连后得到的。

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*MHASTo6s90oAAAAAAAAAAABkARQnAQ#align=left&display=inline&height=196&originHeight=196&originWidth=249&status=done&style=none&width=249)

下面我们就使用自定义 shape 的功能，把上面的柱状图的柱子变成三角形，即如下图所示：

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*8MCIS7hehZsAAAAAAAAAAABkARQnAQ#align=left&display=inline&height=196&originHeight=196&originWidth=245&status=done&style=none&width=245)

#### 第一步，注册 'triangle' shape

```javascript
import { registerShape } from '@antv/g2';

registerShape('interval', 'triangle', {
  // 1. 定义关键点
  getPoints(cfg) {
    const x = cfg.x;
    const y = cfg.y;
    const y0 = cfg.y0;
    const width = cfg.size;
    return [
      { x: x - width / 2, y: y0 },
      { x: x, y: y },
      { x: x + width / 2, y: y0 },
    ];
  },
  // 2. 绘制
  draw(cfg, group) {
    const points = this.parsePoints(cfg.points); // 将0-1空间的坐标转换为画布坐标
    console.log(cfg);
    const polygon = group.addShape('path', {
      attrs: {
        path: [
          ['M', points[0].x, points[0].y],
          ['L', points[1].x, points[1].y],
          ['L', points[2].x, points[2].y],
        ],
        ...cfg.defaultStyle,
      },
    });
    return polygon;
  },
});
```

上面代码中，我们进行了三步操作：

1. 通过 `getPoints()`   方法返回三角形的三个关键点（即三个顶点）。此时 cfg 中会传入，x, y, y0, size。其中 x, y 是柱子最高点的坐标，y0 是横坐标轴的 y 坐标，size 是柱子默认宽度。
1. 得到标记点后，我们在 `draw()` 方法中拿到 cfg.points 数据和数据映射后的图形属性数据（比如 cfg.color），再通过绘图库提供的多边形图形，将三个点依次头尾相连，生成每个三角形。
1. 通过 addShap 来绘制图形，addShape 的参数参考： [绘图文档](https://g.antv.vision/zh/docs/api/general/container/#addshapecfg-shapecfg)。

> 注意：points 数据和参与 points 计算的配置项都是 0-1 空间的数据！

#### 第二步，使用

```javascript
const data = [
  { genre: 'Sports', sold: 27500 },
  { genre: 'Strategy', sold: 11500 },
  { genre: 'Action', sold: 6000 },
  { genre: 'Shooter', sold: 3500 },
  { genre: 'Other', sold: 1500 },
];

const chart = new Chart({
  container: 'mountNode',
  width: 400,
  height: 300,
});

chart.data(data);
chart
  .interval()
  .position('genre*sold')
  // highlight-start
  .shape('triangle');
// highlight-end
chart.render();
```

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*QX5fTqBLmr4AAAAAAAAAAABkARQnAQ" style="width:400px;">
