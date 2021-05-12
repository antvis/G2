---
title: 坐标系
order: 6
---

## 简介

前面的章节中我们介绍过了视觉通道，视觉通道中识别度最高，同时支持定性（分类）数据和定量数据的视觉通道是位置(position)，数据映射到空间上位置，我们将这个空间定义成坐标系(Coordinate)。常见的坐标系：

- 直角坐标系（笛卡尔坐标系），有几个互相垂直的向量构成的空间，G2 中当前实现的是 x、y 两个基底向量构成的二维直角坐标系，三维坐标系后面的版本中提供。
- 极坐标系，是使用一个角度值和长度值构成的坐标系，使用 x 轴表示角度，y 轴表示半径的长度。
- 质心坐标系，使用三角形的三个顶点求得坐标点 u,v,w，且 w = 1-u-v，这个坐标系在三维绘图中广泛使用。

G2 中主要实现了直角坐标系和极坐标系，坐标系主要完成了两个功能：

- 将 0-1 区间内的数据映射到画布空间。
- 将画布空间的数据，翻转回 0-1 的范围内。

## G2 的坐标系类型

G2 中可用的坐标系类型如下：

|     **名字**     |                                  **描述**                                  |                                **配置语法**                                |
| :--------------: | :------------------------------------------------------------------------: | :------------------------------------------------------------------------: |
| cartesian / rect |                      笛卡尔坐标系，G2 默认的坐标系。                       |       `chart.coordinate('rect')`  或 `chart.coordinate('cartesian')`       |
|      polar       |                  极坐标系，角度和半径构建成的二维坐标系。                  |                        `chart.coordinate('polar')`                         |
|      helix       |                      螺旋坐标系，基于阿基米德螺旋线。                      |                        `chart.coordinate('helix')`                         |
|      theta       | 一种特殊的极坐标系，半径长度固定，仅仅将数据映射到角度，常用于饼图的绘制。 | `chart.coordinate('theta')`  或者 `chart.coordinate('polar').transpose()`  |

<img src="https://zos.alipayobjects.com/basement/skylark/0ad680ae14790905900681748d17d9/attach/4080/900/image.png" style="width: 800px;">

## 坐标系和图形

可视化编码的两个核心组成部分：图形标记和视觉通道。视觉通道我们已经在前面的章节中介绍过，图形标记我们将在图表类型中介绍，本章节讲述相同的图形标记在不同的坐标系下有不同的视觉效果。我们以直角坐标系下的柱状图为例，讲解图形在直角坐标系和极坐标系下的不同视觉效果。

### 直角坐标系

柱状图在直角坐标系下，由四个点构建成的矩形构成：

<img src="https://zos.alipayobjects.com/basement/skylark/0ad6383d14790906774093416d755f/attach/4080/900/image.png" style="width: 185px;">

在直角坐标系下，柱状图一般使用 x 轴方向映射数据的分类，y 轴方向映射数据的大小。

<img src="https://zos.alipayobjects.com/basement/skylark/0ad680ae14790906987441831d17d3/attach/4080/900/image.png" style="width: 396px;">

### 极坐标系

柱状图到了极坐标下，依然由四个点连接而成，变化仅仅在于到圆心距离相等的两个点间的直线变成圆弧：

<img src="https://zos.alipayobjects.com/basement/skylark/0ad6383d14790907557403462d755f/attach/4080/900/image.png" style="width: 214px;">

在极坐标系下，柱状图就自然而然的转换成为了玫瑰图。

<img src="https://zos.alipayobjects.com/basement/skylark/0ad680ae14790908648391844d17d9/attach/4080/900/image.png" style="width: 337px;">

可视化的过程是数据到图形的映射过程，只要数据映射的通道一致，那么我们就可以使用统一的方式将图形在不同的坐标系下绘制出来。

### 层叠柱状图到嵌套环图

我们来看一下下面的柱状图所有的项累加起来是 100%，占用了全部的高度，各项层叠。

<img src="https://zos.alipayobjects.com/basement/skylark/0ad6383d14790908984276710d7559/attach/4080/900/image.png" style="width: 686px;">

> 分类只有一个，x 轴用于区分分类，y 轴表示数据的大小

此时我们将坐标系转换成极坐标系:

<img src="https://zos.alipayobjects.com/basement/skylark/0ad680ae14790909146141973d17d3/attach/4080/900/image.png" style="width: 353px;">

> 由于分类只有一个，所以占有了整个圆环，y 轴表示数据的大小

### 层叠柱状图到饼图

依然是上面的示例，我们将 x 轴、y 轴置换，y 轴表示数据的分类，x 轴表示数据的大小：

<img src="https://zos.alipayobjects.com/basement/skylark/0ad680ae14790909320201915d17d9/attach/4080/900/image.png" style="width: 655px;">

此时我们将坐标系转换成极坐标系：

<img src="https://zos.alipayobjects.com/basement/skylark/0ad680ae14790909482501932d17d9/attach/4080/900/image.png" style="width: 341px;">

饼图就生成了，此时如果我们使用两个分类的数据，会出现什么效果？看下图：

<img src="https://zos.alipayobjects.com/basement/skylark/0ad680ae14790909644247959d17cd/attach/4080/900/image.png" style="width: 350px;">
<img src="https://zos.alipayobjects.com/basement/skylark/0ad6383d14790909800453557d755f/attach/4080/900/image.png" style="width: 350px;">

此时就生成了嵌套的饼图。

## 坐标系和视觉通道

上面我们讲解了相同的图形在不同坐标系下的不同展示效果，由于直角坐标系是两个垂直向量构建而成的，视觉通道都是 postion 的两个子通道（x,y)，而极坐标，是由角度和长度两个维度构建而成，角度和位置在视觉通道中的表现力有所差异：

<img src="https://zos.alipayobjects.com/rmsportal/SbFIAczdQaCpyKV.png" style="width: 500px;">

所以在使用图形和坐标系时需要理解清晰数据字段和视觉通道的映射关系，在合适的场景选择合适的视觉通道。

## 坐标系的变换

坐标系可以进行以下操作：

| **变换方法** |                                                                                                                      **描述**                                                                                                                      |                             **配置语法**                              |
| :----------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------: |
|    rotate    |                                                         旋转，默认按照坐标系中心旋转。![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*kP-KR7FyW4cAAAAAAAAAAABkARQnAQ)                                                          |            `chart.coordinate().rotate(-Math.PI * 0.25);`              |
|    scale     |         缩放，默认按照坐标系中心进行缩放![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*De4NR7ULUL4AAAAAAAAAAABkARQnAQ#align=left&display=inline&height=252&originHeight=252&originWidth=679&status=done&style=none&width=679)          |             `chart.coordinate('rect').scale(0.7, 1.2);`               |
|  transpose   | x，y 轴置换，例如柱状图转换成水平柱状图（条形图）![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*zeCISaB3L_QAAAAAAAAAAABkARQnAQ#align=left&display=inline&height=157&originHeight=157&originWidth=534&status=done&style=none&width=534) |               `chart.coordinate('rect').transpose();`                 |
|   reflect    |      镜像，沿 x 方向镜像或者沿 y 轴方向映射:![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*xoudRJG7T2kAAAAAAAAAAABkARQnAQ#align=left&display=inline&height=159&originHeight=159&originWidth=825&status=done&style=none&width=825)      | `chart.coordinate().reflect('x');` `chart.coordinate().reflect('y');` |

## 坐标系的接口设计

结合上面的内容，直角坐标系和极坐标系必须具有的属性或接口：

- 在画布上的范围，需要指定起始点、结束点。

<img src="https://os.alipayobjects.com/rmsportal/uDqMRYlwVbfsdJb.png" style="width: 500px;">

- 将数据从 0-1 映射到画布坐标，将画布上的坐标反转回数据 0-1 的范围内。
- 坐标系的平移、旋转、放大缩小、镜像等转置功能。

### 属性

| 属性名 | 含义             |
| ------ | ---------------- |
| start  | 坐标系的起始点。 |
| end    | 坐标系的结束点。 |

### 方法

| 方法名                | 含义                              |
| --------------------- | --------------------------------- |
| convert(point)        | 将数据从 0-1 空间映射到画布空间。 |
| invert(point)         | 将数据从画布空间反转回 0-1 空间。 |
| translate(x,y)        | 平移。                            |
| rotate(angle)         | 旋转。                            |
| scale(sx,sy)          | 方法、缩小。                      |
| transpose()           | x、y 交换。                       |
| reflect('x'&#124;'y') | 沿着 x 或者 y 进行镜像变换。      |

### 极坐标的特殊属性

由于极坐标是由角度和半径长度两个维度共同构成的，所以有自己特有的属性：

| 方法名      | 含义                                                                       |
| ----------- | -------------------------------------------------------------------------- |
| radius      | 半径长度，0-1 范围内的数值，最终的半径长度 = min(长，宽) / 2 \* radius。   |
| innerRadius | plus 坐标系下，内部空白的半径大小，空白的半径 = min(长，宽) / 2 \* inner。 |
| startAngle  | 极坐标的起始角度。                                                         |
| endAngle    | 极坐标的结束角度。                                                         |

下图为指定了起始角度、结束角度的玫瑰图：

<img src="https://zos.alipayobjects.com/basement/skylark/0ad680ae14790910901892109d17d3/attach/4080/900/image.png" style="width: 500px;">

## API

更详细的配置使用，详见 [API](../../api/general/coordinate)。
