---
title: vector
order: 26
---

## 概述

Vector 图形是将数据映射成为`箭头`的样式去可视化展示，通过控制箭头的位置、大小、颜色、角度等信息，去可视化一些向量场数据。它具备有以下视觉通道：

- `x`：水平方向的位置，对 x 轴刻度对应
- `y`：垂直方向的位置，对 y 轴刻度对应，位置锚点定位为箭头的中心
- `color`：箭头的颜色
- `size`：箭头的长度
- `rotate`：箭头的旋转角度，起始角度为直角坐标系中的 `右边`，旋转方向为 `顺时针`

Vector 图形标记会将数据通过上述通道映射成向量数据：`[start, end]`。

<img alt="vector" src="https://gw.alipayobjects.com/zos/antfincdn/c9nPWlX5Au/vector.png" width="300" />

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'vector',
  data: [
    { longitude: 3.375, latitude: 45.625, u: -1.3287959, v: -2.6778967 },
    { longitude: 3.625, latitude: 45.625, u: -1.012322, v: -2.8640392 },
    { longitude: 3.875, latitude: 45.625, u: -0.7947747, v: -3.0722558 },
    { longitude: 4.125, latitude: 45.625, u: -0.70024896, v: -3.311115 },
    { longitude: 4.375, latitude: 45.625, u: -0.62092346, v: -3.5720115 },
    { longitude: 4.625, latitude: 45.625, u: -0.54210645, v: -3.798527 },
    { longitude: 4.875, latitude: 45.625, u: -0.531152, v: -3.6907976 },
    { longitude: 5.125, latitude: 45.625, u: -0.58284736, v: -3.2739944 },
    { longitude: 5.375, latitude: 45.625, u: -0.6388908, v: -2.8400586 },
    { longitude: 5.625, latitude: 45.625, u: -0.68683237, v: -2.4499083 },
    { longitude: 5.875, latitude: 45.625, u: -0.6949226, v: -2.2482452 },
    { longitude: 6.125, latitude: 45.625, u: -0.67617714, v: -2.189318 },
    { longitude: 6.375, latitude: 45.625, u: -0.6690367, v: -2.1100578 },
    { longitude: 6.625, latitude: 45.625, u: -0.6749189, v: -2.0985062 },
    { longitude: 6.875, latitude: 45.625, u: -0.61023676, v: -2.067676 },
    { longitude: 7.125, latitude: 45.625, u: -0.46769565, v: -1.9350243 },
    { longitude: 7.375, latitude: 45.625, u: -0.31841764, v: -1.7978805 },
    { longitude: 7.625, latitude: 45.625, u: -0.296789, v: -1.6545589 },
    { longitude: 7.875, latitude: 45.625, u: -0.49164182, v: -1.6660733 },
    { longitude: 8.125, latitude: 45.625, u: -0.7730643, v: -1.8458021 },
    { longitude: 8.375, latitude: 45.625, u: -1.0214152, v: -2.0177982 },
    { longitude: 8.625, latitude: 45.625, u: -1.131555, v: -2.0604942 },
    { longitude: 8.875, latitude: 45.625, u: -1.143751, v: -1.9134171 },
    { longitude: 9.125, latitude: 45.625, u: -1.1628431, v: -1.6859006 },
    { longitude: 9.375, latitude: 45.625, u: -1.1996219, v: -1.4945693 },
    { longitude: 9.625, latitude: 45.625, u: -1.2651129, v: -1.385864 },
    { longitude: 9.875, latitude: 45.625, u: -1.340052, v: -1.3189282 },
  ],
  encode: {
    x: 'longitude',
    y: 'latitude',
    rotate: ({ u, v }) => (Math.atan2(v, u) * 180) / Math.PI,
    size: 30,
    color: ({ u, v }) => Math.hypot(v, u),
  },
  scales: {
    size: { range: [6, 20] },
    color: { type: 'sequential', palette: 'viridis' },
  },
  axis: {
    x: { grid: false },
    y: { grid: false },
  },
  style: {
    arrowSize: 10,
  },
  legend: false,
});

chart.render();
```

## 配置项

| 属性   | 描述                                                                                                 | 类型              | 默认值 | 必选 |
| ------ | ---------------------------------------------------------------------------------------------------- | ----------------- | ------ | ---- |
| encode | 配置 `vector` 标记的视觉通道，包括`x`、`y`、`rotate`、`size`等，用于指定视觉元素属性和数据之间的关系 | [encode](#encode) | -      | ✓    |
| style  | 配置 `vector` 标记的图形样式                                                                         | [style](#style)   | -      |      |

### encode

| 属性   | 描述                                                                                                                                               | 类型                          | 默认值 | 必选 |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------ | ---- |
| x      | 绑定 `vector` 标记的 `x` 属性通道，绑定水平方向的位置，与 x 轴刻度对应                                                                             | [encode](/manual/core/encode) | -      | ✓    |
| y      | 绑定 `vector` 标记的 `y` 属性通道，绑定垂直方向的位置，与 y 轴刻度对应，位置锚点定位为箭头的中心                                                   | [encode](/manual/core/encode) | -      | ✓    |
| size   | 绑定 `vector` 标记的 `size` 属性通道，改变图形标记的大小，`size` 视觉通道映射在箭头的长度上                                                        | [encode](/manual/core/encode) | -      | ✓    |
| rotate | 绑定 `vector` 标记的 `rotate` 属性通道, 用于将数据字段映射为箭头的旋转角度                                                                         | [encode](/manual/core/encode) | -      | ✓    |
| color  | 绑定 `vector` 标记的 color 属性通道，如果将数据字段映射到颜色通道，会对数据进行分组，不同的颜色对应不同的分组, `color`视觉通道映射在箭头的颜色上。 | [encode](/manual/core/encode) | -      |      |

### style

| 属性          | 描述                                                                                                          | 类型                                              | 默认值    | 必选 |
| ------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | --------- | ---- |
| arrowSize     | 箭头图标的大小，可以指定像素值、也可以指定箭头长度的相对值。                                                  | `string` \| `number`                              | '40%'     |      |
| fill          | 图形的填充色                                                                                                  | `string` \| `Function<string>`                    | -         |      |
| fillOpacity   | 图形的填充透明度                                                                                              | `number` \| `Function<number>`                    | -         |      |
| stroke        | 图形的描边                                                                                                    | `string` \| `Function<string>`                    | -         |      |
| strokeOpacity | 描边透明度                                                                                                    | `number` \| `Function<number>`                    | -         |      |
| lineWidth     | 图形描边的宽度                                                                                                | `number` \| `Function<number>`                    | -         |      |
| lineDash      | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | `[number,number]` \| `Function<[number, number]>` | -         |      |
| opacity       | 图形的整体透明度                                                                                              | `number` \| `Function<number>`                    | -         |      |
| shadowColor   | 图形阴影颜色                                                                                                  | `string` \| `Function<string>`                    | -         |      |
| shadowBlur    | 图形阴影的高斯模糊系数                                                                                        | `number` \| `Function<number>`                    | -         |      |
| shadowOffsetX | 设置阴影距图形的水平距离                                                                                      | `number` \| `Function<number>`                    | -         |      |
| shadowOffsetY | 设置阴影距图形的垂直距离                                                                                      | `number` \| `Function<number>`                    | -         |      |
| cursor        | 鼠标样式。同 css 的鼠标样式，默认 'default'。                                                                 | `string` \| `Function<string>`                    | 'default' |      |

## 示例

- 怎么指定箭头图标的长度？

有两种指定箭头图标长度的方式，一种是通过填写像素值，比如 `4`，来指定为固定长度；另外一种是通过指定一个百分比，比如 `30%`，来指定参考箭头长度的相对长度。默认值为 `40%`。如下示例：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'vector',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antfincdn/F5VcgnqRku/wind.json',
  },
  encode: {
    x: 'longitude',
    y: 'latitude',
    rotate: ({ u, v }) => (Math.atan2(v, u) * 180) / Math.PI,
    size: ({ u, v }) => Math.hypot(v, u),
    color: ({ u, v }) => Math.hypot(v, u),
  },
  scales: {
    size: { range: [6, 20] },
    color: { type: 'sequential', palette: 'viridis' },
  },
  axis: {
    x: { grid: false },
    y: { grid: false },
  },
  style: {
    arrowSize: 4,
    // arrowSize: '30%',
  },
  legend: false,
});

chart.render();
```

更多的案例，可以查看[图表示例](/examples#general-vector)页面。
