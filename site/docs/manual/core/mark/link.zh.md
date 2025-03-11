---
title: link
order: 15
---

## 概述

`link` 图形标记 虽然类似折线图 通过指定 `x`，`y` 通道为长度为 2 的字段数组。获取两两对应的 (x,y) 的定位点，并连接对应的定位点，绘制带方向的线段(添加箭头)。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: "link",
    height: 260,
    autoFit: true,
    data: [
      { x1: 10, y1: 10, x2: 20, y2: 20, type: "1" },
      { x1: 21, y1: 12, x2: 11, y2: 22, type: "1" },
      { x1: 20, y1: 21, x2: 10, y2: 11, type: "2" },
      { x1: 11, y1: 23, x2: 21, y2: 13, type: "2" },
    ],
    encode: { x: ["x1", "x2"], y: ["y1", "y2"], color: "type" }, // link 标记 需要 x x1 y y1 通道, 从而达到两个点确定一条线或一条向量
    style: { arrow: true, arrowSize: 6 }, // arrow 为箭头开关，箭头通常可以代表方向，这个是 link 和 line 标记的区别。
    legend: false,
  });

  chart.render();

  return chart.getContainer();
})();
```

更多的案例，可以查看[图表示例 - 连接图](/examples#general-link)页面。

## 配置项

| 属性       | 描述                                                                                               | 类型                      | 默认值                 | 必选 |
| ---------- | -------------------------------------------------------------------------------------------------- | ------------------------- | ---------------------- | ---- |
| encode     | 配置 `link` 标记的视觉通道，包括`x`、`y`、`color`、`shape`等，用于指定视觉元素属性和数据之间的关系 | [encode](#encode)         | -                      | ✓    |
| style      | 配置 `link` 标记的图形样式                                                                         | [style](#style)           | -                      |      |

### encode

配置 `area` 标记的视觉通道。

| 属性  | 描述                                                                                                                                        | 类型                          | 默认值 | 必选 |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------ | ---- |
| x     | 绑定 `link` 标记的 `x` 属性通道，可以单独字符串代表 `x` 通道，也可以直接通过 数组 的形式，直接为 `x` 和 `x1`通道                                | [encode](/manual/core/encode) | -      | ✓    |
| x1     | 绑定 `link` 标记的 `x1` 属性通道，为结束方向的标点 `x` 数值。                                                                  | [encode](/manual/core/encode) | -      | ✓    |
| y     | 绑定 `link` 标记的 `y` 属性通道，可以单独字符串代表 `y` 通道，也可以直接通过 数组 的形式，直接为 `y` 和 `y1`通道            | [encode](/manual/core/encode) | -      | ✓    |
| y1     | 绑定 `link` 标记的 `y1` 属性通道，为结束方向的标点 `y` 数值。                          | [encode](/manual/core/encode) | -      | ✓    |
| color | 绑定 `link` 标记的 `color` 属性通道，如果将数据字段映射到颜色通道，会对数据进行分组，将数据拆分成多个不同颜色的区域，可用来划分区域或呈现当前区域的数值 | [encode](/manual/core/encode) | -      |      |
| shape | 绑定 `link` 标记的 `shape` 属性通道 | [encode](/manual/core/encode) | `link`    |      |

#### x & y & x1 & y1

`link` 标记但视觉通道需要 `x`、`y`、`x1`、`y1` 四个字段的值，支持的数据格式有以下两种：

- `x`、`y` 直接配置

```ts
{
  type: 'link',
  data: [
    { x: 10, y: 10, x1: 20, y1: 20 },
  ],
  encode: { x: ['x','x1'], y: ['y','y1'] }
}
```

- `x`、`y`、`x1`、`y1` 单独配置

```ts
{
  type: 'link',
  data: [
    { x: 10, y: 10, x1: 20, y1: 20 },
  ],
  encode: { x: 'x', y: 'y', x1:'x1',y1:'y1' }
}
```

#### color

`color` 视觉通道影响 `link` 图形标记。`link` 标记中单个区域仅能使用一种颜色（或者渐变色），但如果将数据字段映射到颜色通道，会对数据进行分组，将数据拆分成多个区域：

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: "link",
    autoFit: true,
    data: {
      type: "fetch",
      value: "https://gw.alipayobjects.com/os/antfincdn/SM13%24lHuYH/metros.json",
    },
    encode: {
      x: ["POP_1980", "POP_2015"],
      y: ["R90_10_1980", "R90_10_2015"],
      color: (d) => d.R90_10_2015 - d.R90_10_1980, // color 为数值映射，会因为映射的数值而改变颜色。 当前代表长度，不同长度展示的颜色会成渐变展示
    },
    scale: { x: { type: "log" } },
    style: { arrow: true, arrowSize: 6 },
    axis: { x: { labelFormatter: "~s", labelTransform: "rotate(90)" } },
    legend: false,
    tooltip: { title: { channel: "color", valueFormatter: ".1f" } },
  });

  chart.render();

  return chart.getContainer();
})();
```

#### shape

`link` 标记内置支持的形状如下：

| 形状   | 描述                             | 示例                                                                                              |
| ------ | -------------------------------- | --------------------------------------------------------------------------------------------- |
| link   | 连接线\|向量 | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*tTHNQaV0JaAAAAAAAAAAAAAAemJ7AQ/original"></img> |
| arc    | 弧线.       | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*3ya9SI9qVTQAAAAAAAAAAAAAemJ7AQ/original"></img> |
| smooth | 贝塞尔曲线   | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*etcgSbaVmlAAAAAAAAAAAAAAemJ7AQ/original"></img> |
| vhv    | 直角折线     | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*X1oJSaTeNv8AAAAAAAAAAAAAemJ7AQ/original"></img> |

### style

| 属性            | 描述                                           | 类型                 | 默认值      | 必选  |
|----------------|------------------------------------------------|---------------------|------------|-------|
| arrow          | 控制是否展示箭头。本质为线段并非图形，继承直线的所有属性。          | _boolean_            | `false`    |       |
| arrowSize      | 箭头图标的大小，可以指定像素值、也可以指定箭头长度的相对值。此属性为箭头长度，宽度为 'lineWidth' 配置 | _string_ \| _number_ | `40%`      |       |
| stroke         | 图形的颜色                                      | _string_ \| _Function\<string\>_             |   -        |       |
| strokeOpacity  | 图形透明度                                        | _number_ \| _Function\<number\>_              |   -        |       |
| lineWidth      | 图形的宽度                                    | _number_ \| _Function\<number\>_               |   -        |       |
| lineDash       | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 因为箭头同样为继承直线样式配置，最好不要在有箭头的时候配置这个样式 | _[number,number]_ \| _Function\<[number, number]\>_ |   -        |       |
| opacity        | 图形的整体透明度                                   | _number_ \| _Function\<number\>_              |   -        |       |
| shadowColor    | 图形阴影颜色                                      | _string_ \| _Function\<string\>_              |   -        |       |
| shadowBlur     | 图形阴影的高斯模糊系数                              | _number_ \| _Function\<number\>_              |   -        |       |
| shadowOffsetX  | 设置阴影距图形的水平距离                            | _number_ \| _Function\<number\>_              |   -        |       |
| shadowOffsetY  | 设置阴影距图形的垂直距离                            | _number_ \| _Function\<number\>_              |   -        |       |
| cursor         | 鼠标样式。同 css 的鼠标样式，默认 'default'。        | _string_ \| _Function\<string\>_               |   `default`  |       |

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: "link",
    height: 260,
    autoFit: true,
    data: [
      { x1: 10, y1: 10, x2: 20, y2: 20 },
    ],
    encode: { x: ["x1", "x2"], y: ["y1", "y2"]},
    style: {
      arrow: true,
      arrowSize: 6 , // 箭头长度
      lineWidth: 8, // 线宽
      stroke: '#1f1aa1', // 颜色
      opacity: 0.7,
    }, 
    legend: false,
  });

  chart.render();

  return chart.getContainer();
})();
```

## 示例

- 怎么指定箭头图标的长度？

有两种指定箭头图标长度的方式，一种是通过填写像素值，比如 `40`，来指定为固定长度；另外一种是通过指定一个百分比，比如 `30%`，来指定参考箭头长度的相对长度。默认值为 `40%`。如下示例：

```ts
chart
  .link()
  // ...
  .style({
    arrowSize: 40,
    // arrowSize: '30%',
  });
```
