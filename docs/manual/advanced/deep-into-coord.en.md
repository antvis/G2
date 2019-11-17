---
title: 坐标系详解
order: 3
---

在视觉通道中识别度最高，同时支持定性（分类）数据和定量数据的视觉通道是位置 position。数据会被映射到空间的位置上，我们将这个空间定义成坐标系。常见的坐标系：

* 直角坐标系（笛卡尔坐标系），有几个互相垂直的向量构成的空间，G2 中当前实现的是 x, y 两个基底向量构成的二维直角坐标系，三维坐标系后面的版本中提供。
* 极坐标系，是使用一个角度值和半径值构成的坐标系，使用 x 轴表示角度，y 轴表示半径的长度。
* 质心坐标系，使用三角形的三个顶点求得坐标点 u,v,w，且 w = 1-u-v，这个坐标系在三维绘图中广泛使用。

目前 G2 中主要实现了直角坐标系和极坐标系，坐标系主要完成以下两个功能：

1. 将 0-1 区间内的数据映射到画布空间；
2. 将画布空间的数据，翻转回 0-1 的范围内。

## G2 支持的坐标系

| coordType | 说明 |
| :--- | :--- |
| `rect` | 直角坐标系，目前仅支持二维，由 x, y 两个互相垂直的坐标轴构成。 |
| `polar` | 极坐标系，由角度和半径 2 个维度构成。 |
| `theta` | 一种特殊的极坐标系，半径长度固定，仅仅将数据映射到角度，常用于饼图的绘制。 |
| `helix` | 螺旋坐标系，基于阿基米德螺旋线。 |

## 坐标系和图形

坐标系类型的变换会改变几何标记的形状：在极坐标系中，矩形将变为圆环的一部分，而地图中两点间的最短路径也将不是直线。我们以直角坐标系下的柱状图为例，讲解图形在直角坐标系和极坐标系下的不同视觉效果。

### 直角坐标系

柱状图在直角坐标系下，由四个点构建成的矩形构成：

![image | left](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*21uGSJqHWmoAAAAAAAAAAABkARQnAQ)

在直角坐标系下，柱状图一般使用 x 轴方向映射数据的分类，y 轴方向映射数据的大小。

![image | left](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*fQe3S7XnzUEAAAAAAAAAAABkARQnAQ)

### 极坐标系

柱状图到了极坐标下，依然由四个点连接而成，变化仅仅在于到圆心距离相等的两个点间的直线变成圆弧：

![image | left](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*gq3XT6435gsAAAAAAAAAAABkARQnAQ)

在极坐标系下，柱状图就自然而然的转换成为了玫瑰图

![image | left](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*IDYwT4Rn5VEAAAAAAAAAAABkARQnAQ)

可视化的过程是数据到图形的映射过程，只要数据映射的通道一致，那么我们就可以使用统一的方式将图形在不同的坐标系下绘制出来。

### 层叠柱状图到嵌套环图

下图是一个只有一个分类的层叠柱状图：

![image | left](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*19YKQIDtmFkAAAAAAAAAAABkARQnAQ)

此时我们将坐标系转换成极坐标系，`chart.coord('polar')`

![image | left](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*zu5VSbRslSQAAAAAAAAAAABkARQnAQ)

说明：由于分类只有一个，所以占有了整个圆环，y 轴表示数据的大小，该图也叫牛眼图。

### 层叠柱状图到饼图

依然是上面的示例，我们将 x 轴、y 轴转置，y 轴表示数据的分类，x 轴表示数据的大小：

![image | left](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*C8PNTpIWzOYAAAAAAAAAAABkARQnAQ)

此时我们将坐标系转换成极坐标系：

![image | left](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*uX4dTI1zZhgAAAAAAAAAAABkARQnAQ)

饼图就生成了，此时如果我们使用两个分类的数据，会出现什么效果？看下图：

![geom-multiple.gif | left](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*bh2cSZLodI8AAAAAAAAAAABkARQnAQ)

此时就生成了嵌套的饼图。

## 坐标系和视觉通道

上面我们讲解了相同的图形在不同坐标系下的不同展示效果，由于直角坐标系是两个垂直向量构建而成的，视觉通道都是 postion 的两个子通道（x, y)，而极坐标，是由角度和长度两个维度构建而成，角度和位置在视觉通道中的表现力有所差异：

![image | left](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*nZs7RYClaFoAAAAAAAAAAABkARQnAQ)

所以在使用图形和坐标系时需要理解清晰数据字段和视觉通道的映射关系，在合适的场景选择合适的视觉通道。

## 坐标系的接口设计

结合上面的内容，直角坐标系和极坐标系必须具有功能：
1. 可指定在画布上的范围，通过指定起始点、结束点。需要明确的是，画布的坐标起始点和 G2 图表的坐标起始点是不同的。

![image | left](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*tnF7QaUg8Q0AAAAAAAAAAABkARQnAQ)

1. 将数据从 0-1 映射到画布坐标，将画布上的坐标反转回数据 0-1 的范围内
2. 坐标系的平移、旋转、放大缩小、镜像等转置功能

### 属性

| 属性名 | 含义 |
| :--- | :--- |
| start | 坐标系的起始点 |
| end | 坐标系的结束点 |

### 方法

| 方法名 | 含义 |
| :--- | :--- |
| convert(point) | 将数据从 0-1 空间映射到画布空间 |
| invert(point) | 将数据从画布空间反转回 0-1 空间 |
| translate(x,y) | 平移 |
| rotate(angle) | 旋转 |
| scale(sx, sy) | 方法、缩小 |
| transpose() | x, y 交换 |
| reflect() | 镜像，默认进行 y 轴镜像，也可以指定 x 轴、xy 双轴镜像等 |

### 极坐标的特殊属性

由于极坐标是由角度和半径长度两个维度共同构成的，所以有自己特有的属性：

| 方法名 | 含义 |
| :--- | :--- |
| radius | 半径长度，0-1 范围内的数值，最终的半径长度 = min（长，宽） / 2 \* radius |
| innerRadius | plus 坐标系下，内部空白的半径大小，空白的半径 = min（长，宽） / 2 \* inner |
| startAngle | 极坐标的起始角度 |
| endAngle | 极坐标的结束角度 |

指定了起始角度、结束角度的玫瑰图：

![image | left](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*6qeWQon0hioAAAAAAAAAAABkARQnAQ)
