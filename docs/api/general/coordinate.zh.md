---
title: 坐标系 - Coordinate
order: 4
---

配置坐标系，之前的调用方法为 `coord`，将在 V4.1 移除。有三种调用方法：

第一种 直接传入 _CoordinateOption_ 配置。

```sign
(option?: CoordinateOption) => CoordinateController;
```

```ts
chart.coordinate({
  type: 'polar',
  cfg: {
    radius: 0.85,
  },
  actions: [['transpose']],
});
```

_**CoordinateOption**_ 坐标系总配置：

| 参数名  | 类型                  | 是否必选 | 默认值 | 描述                           |
| ------- | --------------------- | -------- | ------ | ------------------------------ |
| type    | string                |          | 'rect' | 坐标系类型                     |
| cfg     | _CoordinateCfg_       |          | -      | 坐标系配置项，目前常用于极坐标 |
| actions | _CoordinateActions_[] |          | -      | 坐标系变换操作                 |

_**CoordinateOption.type**_ 坐标系类型：

- cartesian / rect：笛卡尔坐标系，G2 默认的坐标系 `chart.coordinate('rect')`
- polar：极坐标系 `chart.coordinate('polar')`
- helix：螺旋坐标系，基于阿基米德螺旋线 `chart.coordinate('helix')`
- theta：一种特殊的极坐标系，半径长度固定，仅仅将数据映射到角度，常用于饼图的绘制。 `chart.coordinate('theta')`  或者 `chart.coordinate('polar').transpose()`

_**CoordinateCfg**_ 坐标系配置项，目前常用于极坐标：

| 参数名      | 类型     | 是否必选 | 默认值 | 描述                                       |
| ----------- | -------- | -------- | ------ | ------------------------------------------ |
| startAngle  | _number_ |          | -      | 用于极坐标，配置起始弧度                   |
| endAngle    | _number_ |          | -      | 用于极坐标，配置结束弧度                   |
| radius      | _number_ |          | -      | 用于极坐标，配置极坐标半径，0-1 范围的数值 |
| innerRadius | _number_ |          | -      | 用于极坐标，极坐标内半径，0 -1 范围的数值  |

_**CoordinateActions**_ 坐标系变换操作：

包括旋转，缩放，镜像映射和置换等。可以通过 _CoordinateOption_.actions 传入，或者 _CoordinateController_ 进一步调用方法实现坐标系变化操作。

```ts
type CoordinateActions =
  | ['rotate', number] // 配置旋转度数，使用弧度制
  | ['reflect', 'x' | 'y'] // 沿 x 方向镜像或者沿 y 轴方向映射
  | ['scale', number, number] // 沿着 x 和 y 方向的缩放比率
  | ['transpose']; //  x，y 轴置换，常用于条形图和柱状图之间的转换
```

```ts
chart
  .coordinate() // 默认创建直角坐标系
  .transpose() // x，y 轴置换
  .scale(1, 1) // 沿着 x 和 y 方向的缩放比率 1, 1
  .rotate(Math.PI * 0.4) // 旋转 Math.PI * 0.4
  .reflect('x'); // 沿 x 方向镜像
```

第二种 第一个参数指明坐标系类型，第二个参数传入 _CoordinateOption_ 配置。

```sign
(type: string, coordinateCfg?: CoordinateCfg): CoordinateController;
```

```ts
// 创建极坐标，并设定半径为 0.85
chart.coordinate('polar', { radius: 0.85 });

// 默认创建直角坐标系
chart.coordinate();
```

第三种 是第一种和第二种的结合

```sign
(type: string | CoordinateOption, coordinateCfg?: CoordinateCfg): CoordinateController
```
