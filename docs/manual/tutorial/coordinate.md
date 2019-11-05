---
title: Coordinate 坐标系
order: 8
---

## 坐标系介绍

坐标系是将两种位置标度结合在一起组成的 2 维定位系统，描述了数据是如何映射到图形所在的平面。

G2 包含了两种类型坐标系（polar、theta、helix 均属于极坐标），目前所有的坐标系均是 2 维的。

## 如何设置坐标系

G2 默认提供的坐标系类型为笛卡尔坐标系，当不满足用户需求时，可以通过调用下面的语法声明需要使用的坐标系：

```js
chart.coord('coordType'[, cfg]);
```

| coordType | 说明 |
| :--- | :--- |
| `rect` | 直角坐标系，目前仅支持二维，由 x, y 两个互相垂直的坐标轴构成。 |
| `polar` | 极坐标系，由角度和半径 2 个维度构成。 |
| `theta` | 一种特殊的极坐标系，半径长度固定，仅仅将数据映射到角度，常用于饼图的绘制。 |
| `helix` | 螺旋坐标系，基于阿基米德螺旋线。 |


## 坐标系类型及配置

坐标系可以分为笛卡尔坐标系和非笛卡尔坐标系，非笛卡尔坐标系即极坐标（helix 螺旋坐标系也是极坐标的一种），由角度和半径这两个维度来确定位置。

利用极坐标可生成饼图、玫瑰图和雷达图等，常被用于周期性数据，比如时间和方向数据。

坐标系类型的变换会改变几何标记的形状：在极坐标系中，矩形将变为圆环的一部分，而地图中两点间的最短路径也将不是直线。

例如下图展示的层叠柱状图，在不同坐标系下就变换成了其他的图表类型：



![image | left](https://zos.alipayobjects.com/skylark/fd9ba64b-b569-4c1d-acb9-d4dad3500258/attach/2378/44af7b435f0d3f88/image.png "")


上图左侧为层叠柱状图，中间的饼图则是层叠柱状图在极坐标下对 x y 两个坐标轴进行转置后的结果，其中 x 轴被映射为半径，y 轴被映射成了角度。而最右边的牛眼图则相反，y 轴映射为半径。

### 坐标系配置

极坐标均支持 `startAngle` 和 `endAngle` 这两个属性配置。

（1）对于 `polar` 和 `theta` 这两种坐标系类型，可以进行如下属性的配置：

```js
chart.coord('polar' || 'theta' || 'helix', {
  startAngle: 弧度, // 起始弧度
  endAngle: 弧度, // 结束弧度
  innerRadius: 0 至 1 范围的数值, // 用于空心部分的半径设置
  radius: 0 至 1 范围的数值 // 实心圆的半径大小设置
});
```

效果如图所示：

`chart.coord('theta', { innerRadius: 0.5 });`



![image | left](https://gw.alipayobjects.com/zos/rmsportal/xQxbzqQTjELOvrKSFEkh.png "")


```javascript
chart.coord('polar', {
  radius: 0.5,
  startAngle: -Math.PI / 6,
  endAngle: 7 * Math.PI /6
});
```



![image | left](https://gw.alipayobjects.com/zos/rmsportal/YbxpoBRuIrNsaMNOCmcG.png "")


```javascript
chart.coord('helix', {
  startAngle: 0.5 * Math.PI,
  endAngle: 12.5 * Math.PI,
  radius: 0.8
});
```



![image | left](https://gw.alipayobjects.com/zos/rmsportal/EWHCatHynDfQTPByyfVp.png "")


这里需要说明的是，G2 极坐标默认的起始角度和结束角度如下图所示：



![image | left](https://zos.alipayobjects.com/skylark/85950a42-9579-44cb-b656-8dd28c9a014a/attach/2378/d648679184c6977c/image.png "")


## 坐标系变换

G2 提供的坐标系支持一系列的变换操作：

* rotate: 旋转，默认按照坐标系中心旋转；
* scale: 放大、缩小，默认按照坐标系中心放大、缩小；

```js
chart.coord('rect').scale(0.7, 1.2);
```



![image | left](https://zos.alipayobjects.com/rmsportal/bAISlaEvIUpqIFVBiXKo.gif "")


* transpose: x，y 轴交换，例如柱状图转换成水平柱状图（条形图）；



![image | left](https://zos.alipayobjects.com/skylark/3b319bf7-f5ae-4165-9753-a1fbd58cc209/attach/2378/62bc082e8beb0f78/image.png "")


* reflect: 镜像, 沿 x 方向镜像或者沿 y 轴方向映射。



![image | left](https://zos.alipayobjects.com/skylark/3e02d865-fcfc-4afd-9ffa-66a1299b31b5/attach/2378/4225fd7483f54155/image.png "")


以下是 G2 中坐标系变换的使用语法，当需要进行多种坐标系变换时，可以直接进行链式调用，如下代码所示：

```js
chart.coord().rotate(90).scale(1.3, 5).reflect('x').transpose();
```

## 相关实例

* [环图](https://antv.alipay.com/zh-cn/g2/3.x/demo/pie/clock.html)
* [仪表盘](https://antv.alipay.com/zh-cn/g2/3.x/demo/gauge/basic.html)

