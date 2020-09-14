---
title: 坐标系配置
order: 3
---

坐标系，Coordinate，可将对象的位置映射到图形平面上，描述了数据是如何映射到图形所在的平面。位置通常由两个坐标 x 和 y 决定，目前 G2 还不支持三维坐标系。最常见的坐标系为笛卡尔坐标系，此外还有极坐标系和各种地图投影等。

## 坐标系类型

坐标系笼统得可以分为笛卡尔坐标系和非笛卡尔坐标系两种，非笛卡尔坐标系即极坐标（helix 螺旋坐标系也是极坐标的一种），由角度和半径这两个维度来确定位置。

坐标系类型的变换会改变几何标记的形状：比如在极坐标系中，矩形将变为圆环的一部分，而地图中两点间的最短路径也将不是直线。所以我们使用极坐标来生成饼图、玫瑰图和雷达图等，常用于表达周期性数据。

下图展示的层叠柱状图，在不同坐标系下的形状变化：

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*f07nRa4lBK4AAAAAAAAAAABkARQnAQ)

（1）为层叠柱状图绘制在笛卡尔坐标系下；（2）为层叠柱状图绘制在极坐标系下，我们称之为牛眼图，此时 y 轴映射为半径；（3）展示的饼图则是层叠柱状图在极坐标下对 x y 两个坐标轴进行转置后的结果，其中 x 轴被映射为半径，y 轴被映射成了角度。

G2 中可用的坐标系类型如下：

|     **名字**     |                                  **描述**                                  |                                **配置语法**                                |
| :--------------: | :------------------------------------------------------------------------: | :------------------------------------------------------------------------: |
| cartesian / rect |                      笛卡尔坐标系，G2 默认的坐标系。                       |       `chart.coordinate('rect')`  或 `chart.coordinate('cartesian')`       |
|      polar       |                                 极坐标系。                                 |                        `chart.coordinate('polar')`                         |
|      helix       |                      螺旋坐标系，基于阿基米德螺旋线。                      |                        `chart.coordinate('helix')`                         |
|      theta       | 一种特殊的极坐标系，半径长度固定，仅仅将数据映射到角度，常用于饼图的绘制。 | `chart.coordinate('theta')`  或者 `chart.coordinate('polar').transpose()`  |

## 坐标系变换

G2 提供的坐标系支持一系列的变换操作:

| **变换方法** |                                                                                                                      **描述**                                                                                                                      |                             **配置语法**                              |
| :----------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------: |
|    rotate    |                                                         旋转，默认按照坐标系中心旋转。![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*kP-KR7FyW4cAAAAAAAAAAABkARQnAQ)                                                          |            `chart.coordinate().rotate(-Math.PI * 0.25);`              |
|    scale     |         缩放，默认按照坐标系中心进行缩放![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*De4NR7ULUL4AAAAAAAAAAABkARQnAQ#align=left&display=inline&height=252&originHeight=252&originWidth=679&status=done&style=none&width=679)          |             `chart.coordinate('rect').scale(0.7, 1.2);`               |
|  transpose   | x，y 轴置换，例如柱状图转换成水平柱状图（条形图）![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*zeCISaB3L_QAAAAAAAAAAABkARQnAQ#align=left&display=inline&height=157&originHeight=157&originWidth=534&status=done&style=none&width=534) |               `chart.coordinate('rect').transpose();`                 |
|   reflect    |      镜像，沿 x 方向镜像或者沿 y 轴方向映射:![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*xoudRJG7T2kAAAAAAAAAAABkARQnAQ#align=left&display=inline&height=159&originHeight=159&originWidth=825&status=done&style=none&width=825)      | `chart.coordinate().reflect('x');` `chart.coordinate().reflect('y');` |

## API

更详细的配置使用，详见 [API](../../api/coordinate)。
