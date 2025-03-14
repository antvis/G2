---
title: interval
order: 11
---

## 概述

区间图（ `interval` ）图形标记是一种表示数据上下区间的图表的集合。通常用来绘制柱形图、条形图、饼图等，通过坐标系、比例尺、数据 `Transform` 等的变化，可以产生多种多样的可视化表现样式，例如，将多个并列的类别聚类、形成一组，再在组与组之间进行比较，这种图表叫做 `分组柱状图` 或 `簇状柱形图` 。将类别拆分称多个子类别，形成 `堆叠柱状图`。再如将柱形图与折线图结合起来，共同绘制在一张图上，俗称 `双轴图`，等等。`interval` 是图形语法中，最常用的 `Mark`。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    data: [
      { letter: 'A', frequency: 0.08167 },
      { letter: 'B', frequency: 0.01492 },
      { letter: 'C', frequency: 0.02782 },
      { letter: 'D', frequency: 0.04253 },
      { letter: 'E', frequency: 0.12702 },
      { letter: 'F', frequency: 0.02288 },
      { letter: 'G', frequency: 0.02015 },
      { letter: 'H', frequency: 0.06094 },
      { letter: 'I', frequency: 0.06966 },
      { letter: 'J', frequency: 0.00153 },
      { letter: 'K', frequency: 0.00772 },
      { letter: 'L', frequency: 0.04025 },
      { letter: 'M', frequency: 0.02406 },
      { letter: 'N', frequency: 0.06749 },
      { letter: 'O', frequency: 0.07507 },
      { letter: 'P', frequency: 0.01929 },
      { letter: 'Q', frequency: 0.00095 },
      { letter: 'R', frequency: 0.05987 },
      { letter: 'S', frequency: 0.06327 },
      { letter: 'T', frequency: 0.09056 },
      { letter: 'U', frequency: 0.02758 },
      { letter: 'V', frequency: 0.00978 },
      { letter: 'W', frequency: 0.0236 },
      { letter: 'X', frequency: 0.0015 },
      { letter: 'Y', frequency: 0.01974 },
      { letter: 'Z', frequency: 0.00074 },
    ],
    // 配置视觉通道
    encode: {
      x: 'letter', // 配置x通道
      y: 'frequency', // 配置y通道
      shape: 'rect', // 配置shape通道，默认为'rect'的时候可以不写。可选'rect', 'hollow', 'funnel', 'pyramid'
    },
    style: {
      columnWidthRatio: 0.5, // 配置柱状图宽度占比为0.5
    },
  });

  chart.render();

  return chart.getContainer();
})();
```

更多的案例，可以查看[图表示例 - 条形图](/examples#general-interval)、[图表示例 - 饼图](/examples#general-pie)等页面。

## 配置项

| 属性       | 描述                                                                                                   | 类型                      | 默认值                 | 必选 |
| ---------- | ------------------------------------------------------------------------------------------------------ | ------------------------- | ---------------------- | ---- |
| encode     | 配置 `interval` 标记的视觉通道，包括`x`、`y`、`color`、`shape`等，用于指定视觉元素属性和数据之间的关系 | [encode](#encode)         | -                      | ✓    |
| coordinate | 配置 `interval` 标记的坐标系，坐标系会执行一系列点转换，从而改变标记的空间展示形式                     | [coordinate](#coordinate) | `{type: 'cartesian' }` |      |
| style      | 配置 `interval` 标记的图形样式                                                                         | [style](#style)           | -                      |      |

### encode

配置 `interval` 标记的视觉通道。

| 属性   | 描述                                                                                                                                              | 类型                                        | 默认值 | 必选 |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ------ | ---- |
| x      | 绑定 `interval` 标记的 `x` 属性通道，一般是 `data` 中的有序或者无序字段，在绘制饼图的时候可以为空                                                 | [encode](/manual/core/encode)               | -      | ✓    |
| y      | 绑定 `interval` 标记的 `y` 属性通道，一般是 `data` 中的数值或数组字段                                                                             | [encode](/manual/core/encode)               | -      | ✓    |
| color  | 绑定 `interval` 标记的 `color` 属性通道，如果将数据字段映射到颜色通道，会对数据进行分组，将数据拆分成多个不同颜色的图形，一般用来配置堆叠柱状图等 | [encode](/manual/core/encode)               | -      |      |
| series | 绑定 `interval` 标记的 `series` 属性通道，根据 series 通道实现分组效果                                                                            | [encode](/manual/core/encode)               | -      |
| shape  | 绑定 `interval` 标记的 `shape` 属性通道，改变图形标记的绘制形状                                                                                   | `rect` \| `hollow` \| `funnel` \| `pyramid` | `rect` |      |
|        |

#### x & y

`interval` 标记的位置视觉通道需要 `x`, `y` 两个字段的值，支持的数据格式有以下三种：

- `x`, `y` 都是数值，一般的柱状图、玫瑰图。

```js
{
  type: "interval",
  data: [{ name: "分类一", value: 100 }],
  encode: { x: "name", y: "value" },
}
```

- `x` 是数值，`y` 是数组，区间柱状图、区间玫瑰图、堆叠柱状图、堆叠玫瑰图以及对称的柱状图（漏斗图）。

```js
{
  type: "interval",
  data: [{ name: '分类一', value: [10, 100] },
  { name: '分类二', value: [20, 80] }],
  encode: { x: "name", y: "value" },
}
```

- `x` 为空，`y` 是数值。一般用于绘制饼图时的数据配置，此时的坐标系是 `theta`，在 G2 的内部补齐了 `x`, `y`。

```js
{
  type: "interval",
  data: [
    { item: "分类一", count: 40, },
    { item: "分类二", count: 21, },
    { item: "分类三", count: 17 },
    { item: "分类四", count: 13 },
    { item: "分类五", count: 9 },
  ],
  encode: { y: "count", color: "item" },
  transform: [{ type: "stackY" }], // 配置stackY数据转换，使得饼图的扇区角度和值的大小对应
  coordinate: { type: "theta", }, // 配置theta坐标系，是一种特殊的极坐标系，常用来绘制饼图
}
```

| x 通道绑定的值 | y 通道绑定的值 | 解释                                                   |
| -------------- | -------------- | ------------------------------------------------------ |
| 数值           | 数值           | 常规的柱状图、玫瑰图                                   |
| 数值           | 数组           | 区间柱状图、区间玫瑰图、堆叠柱状图、堆叠玫瑰图、漏斗图 |
| 空             | 数值           | 饼图                                                   |

#### color

`color` 视觉通道影响 `interval` 图形标记的填充颜色。在区间图上应用时一般映射分类字段，对数据进行分组。

```js | ob { pin: false }
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    data: [
      { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
      { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
      { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
      { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
      { name: 'London', 月份: 'May', 月均降雨量: 47 },
      { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
      { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
      { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
      { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
      { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
      { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
      { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
      { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
      { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
      { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
      { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
    ],
    encode: {
      x: '月份',
      y: '月均降雨量',
      color: 'name', // 配置color通道，对数据进行分组
    },
  });

  chart.render();

  return chart.getContainer();
})();
```

但是有些特殊情况下也会映射的连续字段上，对不同区间的数值对应的图形使用不同的颜色：

```js | ob { pin: false }
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    data: [
      { name: 'a1', value: 50 },
      { name: 'a2', value: 60 },
      { name: 'a3', value: 40 },
    ],
    encode: {
      x: 'name',
      y: 'value',
      // color通道也可以传入一个回调函数，根据条件返回不同的值
      color: (d) => (d.value > 50 ? 'high' : 'low'),
    },
  });

  chart.render();

  return chart.getContainer();
})();
```

配置图形转换`transform`中的 [stackY](/manual/core/transform/stack-y) ，可以对分组的区域进行堆叠，则形成堆叠面积图，避免因为重叠导致的信息模糊：

```js | ob { pin: false }
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    data: [
      { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
      { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
      { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
      { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
      { name: 'London', 月份: 'May', 月均降雨量: 47 },
      { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
      { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
      { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
      { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
      { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
      { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
      { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
      { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
      { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
      { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
      { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
    ],
    // 配置视觉通道
    encode: { x: '月份', y: '月均降雨量', color: 'name' },
    transform: [{ type: 'stackY' }], // 按照指定通道分组，对每组的 y 和 y1 通道进行堆叠，实现堆叠效果
  });

  chart.render();

  return chart.getContainer();
})();
```

#### series

`series` 视觉通道将 `interval` 图形标记的数据分成多个系列，一般和 `color` 通道一起配置，也可以通过配置图形转换`transform`中的 [dodgeX](/manual/core/transform/dodge-x) ，生成 `series` 通道值为 `color` 通道的值，根据 `series` 通道实现分组效果：

```js | ob { pin: false }
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    data: [
      { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
      { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
      { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
      { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
      { name: 'London', 月份: 'May', 月均降雨量: 47 },
      { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
      { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
      { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
      { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
      { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
      { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
      { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
      { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
      { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
      { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
      { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
    ],
    // 配置视觉通道
    encode: {
      x: '月份',
      y: '月均降雨量',
      color: 'name', // 配置color通道，对数据进行分组
      series: 'name', // 配置series通道，将数据分成不同系列
    },
    // transform: [{ type: 'dodgeX' }], // 生成 series 通道值为 color 通道的值，根据 series 通道实现分组效果
  });

  chart.render();

  return chart.getContainer();
})();
```

#### shape

`interval` 标记的支持的形状如下：

| 形状    | 描述           | 示例                                                                                                             |
| ------- | -------------- | ---------------------------------------------------------------------------------------------------------------- |
| rect    | 绘制填充的矩形 | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*y3SSRawOBTMAAAAAAAAAAAAAemJ7AQ/original"></img> |
| hollow  | 绘制空心的矩形 | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*qTYkSraMAsQAAAAAAAAAAAAAemJ7AQ/original"></img> |
| funnel  | 绘制漏斗图     | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*5l6BTaPpHPwAAAAAAAAAAAAAemJ7AQ/original"></img> |
| pyramid | 绘制金字塔形状 | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*XeSlSLqQbHQAAAAAAAAAAAAAemJ7AQ/original"></img> |

### coordinate

`interval` 图形标记在不同坐标系下的展示有所差别。根据坐标系或坐标系转换的不同，可以绘制柱状图、条形图、玫瑰图、饼图等多种图表。

| 坐标系或坐标系转换         | 坐标系配置                               | 图表             |
| -------------------------- | ---------------------------------------- | ---------------- |
| 直角坐标系                 | `{ type: 'cartesian' }`                  | 柱状图、直方图等 |
| `transpose` 坐标系转置变换 | `{ transform: [{ type: 'transpose' }] }` | 条形图等         |
| 极坐标系                   | `{ type: 'polar' }`                      | 玫瑰图等         |
| `theta` 坐标系             | `{ type: 'theta' }`                      | 饼图、环图等     |
| `radial` 坐标系            | `{ type: 'radial' }`                     | 玉珏图等         |

在**transpose 坐标系转置变换**后区间图的表现形式为条形图。

```js | ob { pin: false }
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    data: [
      { item: '分类一', count: 40 },
      { item: '分类二', count: 21 },
      { item: '分类三', count: 17 },
      { item: '分类四', count: 13 },
      { item: '分类五', count: 9 },
    ],
    encode: { x: 'item', y: 'count' },
    coordinate: {
      transform: [{ type: 'transpose' }], // 配置transpose坐标系转置变换
    },
  });

  chart.render();

  return chart.getContainer();
})();
```

在**极坐标系**下区间图的表现形式为玫瑰图，使用半径大小对比数据大小。

```js | ob { pin: false }
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    data: {
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
    },
    encode: { x: 'year', color: 'year', y: 'people' },
    transform: [{ type: 'groupX', y: 'sum' }], // 对离散的 x 通道进行分组，并求和
    coordinate: {
      type: 'polar', // // 配置坐标系为极坐标系，用于绘制玫瑰图
    },
    axis: false, // 不显示坐标轴
  });

  chart.render();

  return chart.getContainer();
})();
```

在**theta 坐标系**下区间图的表现形式为饼图，使用弧度大小对比数据大小。

```js | ob { pin: false }
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    data: [
      { item: '分类一', count: 40 },
      { item: '分类二', count: 21 },
      { item: '分类三', count: 17 },
      { item: '分类四', count: 13 },
      { item: '分类五', count: 9 },
    ],
    encode: { y: 'count', color: 'item' },
    transform: [{ type: 'stackY' }], // 配置stackY数据转换，使得饼图的扇区角度和值的大小对应
    coordinate: {
      type: 'theta', // 配置theta坐标系，是一种特殊的极坐标系，常用来绘制饼图
      outerRadius: 0.8, // 极坐标半径，范围 0-1
    },
  });

  chart.render();

  return chart.getContainer();
})();
```

在**radial 坐标系**下区间图的表现形式为玉珏图，同样使用圆弧对比数据大小。

```js | ob { pin: false }
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    data: [
      { question: '问题 1', percent: 0.21 },
      { question: '问题 2', percent: 0.4 },
      { question: '问题 3', percent: 0.49 },
      { question: '问题 4', percent: 0.52 },
      { question: '问题 5', percent: 0.53 },
      { question: '问题 6', percent: 0.84 },
      { question: '问题 7', percent: 1 },
      { question: '问题 8', percent: 1.2 },
    ],
    encode: { x: 'question', y: 'percent', color: 'percent' },
    scale: { color: { range: ['#BAE7FF', '#1890FF'] } }, // 配置color通道的比例尺，使玉珏图的颜色在两个颜色之间平滑地过渡
    coordinate: {
      type: 'radial', // 配置radial坐标系，是一种特殊的极坐标系，常用来绘制玉珏图
      innerRadius: 0.1, // 极坐标内半径，范围 0-1
      endAngle: 3.141592653589793, // 极坐标系结束弧度
    },
    animate: { enter: { type: 'waveIn', duration: 800 } }, // 配置入场动画
    axis: { y: { tickFilter: (d, i) => i !== 0 } }, // 刻度值过滤，y坐标轴0刻度不显示
  });

  chart.render();

  return chart.getContainer();
})();
```

### style

配置 `interval` 标记的样式。

在表格最后增加一列【必选】，并将值设为为空，结果如下：

| 属性                   | 描述                                                                                                                         | 类型                                                             | 默认值                    | 必选 |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------- | ---- |
| columnWidthRatio       | 配置柱状图宽度占比，范围为 `0` - `1`                                                                                         | number \| (d, index, data, column) => number                     | `0.9`                     |      |
| minWidth               | `interval` 图形柱子的最小宽度，单位为像素                                                                                    | number \| (d, index, data, column) => number                     | `- Infinity`              |      |
| maxWidth               | `interval` 图形柱子的最大宽度，单位为像素                                                                                    | number \| (d, index, data, column) => number                     | `Infinity`                |      |
| minHeight              | `interval` 图形柱子的最小高度，单位为像素                                                                                    | number \| (d, index, data, column) => number                     | `- Infinity`              |      |
| radius                 | `interval` 图形外层矩形的四个圆角大小                                                                                        | number \| (d, index, data, column) => number                     | `0`                       |      |
| radiusTopLeft          | `interval` 图形外层矩形左上角的圆角                                                                                          | number \| (d, index, data, column) => number                     | `0`                       |      |
| radiusTopRight         | `interval` 图形外层矩形右上角的圆角                                                                                          | number \| (d, index, data, column) => number                     | `0`                       |      |
| radiusBottomRight      | `interval` 图形外层矩形右下角的圆角                                                                                          | number \| (d, index, data, column) => number                     | `0`                       |      |
| radiusBottomLeft       | `interval` 图形外层矩形左下角的圆角                                                                                          | number \| (d, index, data, column) => number                     | `0`                       |      |
| innerRadius            | `interval` 图形内层矩形的四个圆角大小                                                                                        | number \| (d, index, data, column) => number                     | `0`                       |      |
| innerRadiusTopLeft     | `interval` 图形内层矩形左上角的圆角                                                                                          | number \| (d, index, data, column) => number                     | `0`                       |      |
| innerRadiusTopRight    | `interval` 图形内层矩形右上角的圆角                                                                                          | number \| (d, index, data, column) => number                     | `0`                       |      |
| innerRadiusBottomRight | `interval` 图形内层矩形右下角的圆角                                                                                          | number \| (d, index, data, column) => number                     | `0`                       |      |
| innerRadiusBottomLeft  | `interval` 图形内层矩形左下角的圆角                                                                                          | number \| (d, index, data, column) => number                     | `0`                       |      |
| inset                  | `interval` 图形矩形四个方向的内边距                                                                                          | number \| (d, index, data, column) => number                     | `0`                       |      |
| insetLeft              | `interval` 图形左边的内间距                                                                                                  | number \| (d, index, data, column) => number                     | `0`                       |      |
| insetRight             | `interval` 图形右边的内间距                                                                                                  | number \| (d, index, data, column) => number                     | `0`                       |      |
| insetBottom            | `interval` 图形下面的内间距                                                                                                  | number \| (d, index, data, column) => number                     | `0`                       |      |
| insetTop               | `interval` 图形上面的内间距                                                                                                  | number \| (d, index, data, column) => number                     | `0`                       |      |
| fill                   | `interval` 图形的填充色                                                                                                      | string \| (d, index, data, column) => string                     | `hollow` 为空字符串`'  '` |      |
| fillOpacity            | `interval` 图形的填充透明度                                                                                                  | number \| (d, index, data, column) => number                     | `rect` 为`0.95`           |      |
| stroke                 | `interval` 图形的描边                                                                                                        | string \| (d, index, data, column) => string                     | -                         |      |
| strokeOpacity          | `interval` 图形描边透明度                                                                                                    | number \| (d, index, data, column) => number                     | `hollow` 为`1`            |      |
| lineWidth              | `interval` 图形描边的宽度                                                                                                    | number \| (d, index, data, column) => number                     | `hollow` 为`2`            |      |
| lineDash               | `interval` 图形描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | [number,number] \| (d, index, data, column) => [number , number] | -                         |      |
| opacity                | `interval` 图形的整体透明度                                                                                                  | number \| (d, index, data, column) => number                     | -                         |      |
| shadowColor            | `interval` 图形阴影颜色                                                                                                      | string \| (d, index, data, column) => string                     | -                         |      |
| shadowBlur             | `interval` 图形阴影的高斯模糊系数                                                                                            | number \| (d, index, data, column) => number                     | -                         |      |
| shadowOffsetX          | 设置阴影距`interval` 图形的水平距离                                                                                          | number \| (d, index, data, column) => number                     | -                         |      |
| shadowOffsetY          | 设置阴影距`interval` 图形的垂直距离                                                                                          | number \| (d, index, data, column) => number                     | -                         |      |
| cursor                 | 鼠标样式。同 css 的鼠标样式。                                                                                                | string \| (d, index, data, column) => string                     | `default`                 |      |

尝试一下：

<Playground path="general/interval/demo/interval-style.ts" rid="interval-style"></playground>

## 示例

- 怎么绘制一个对称条形图？

配置 `y` 通道的时候，返回一个回调函数，根据一个分类字段，将 `y` 通道的值区分为正值和负值。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    autoFit: true,
    data: [
      { age: 0, sex: 1, people: 9735380 },
      { age: 0, sex: 2, people: 9310714 },
      { age: 5, sex: 1, people: 10552146 },
      { age: 5, sex: 2, people: 10069564 },
      { age: 10, sex: 1, people: 10563233 },
      { age: 10, sex: 2, people: 10022524 },
      { age: 15, sex: 1, people: 10237419 },
      { age: 15, sex: 2, people: 9692669 },
      { age: 20, sex: 1, people: 9731315 },
      { age: 20, sex: 2, people: 9324244 },
      { age: 25, sex: 1, people: 9659493 },
      { age: 25, sex: 2, people: 9518507 },
      { age: 30, sex: 1, people: 10205879 },
      { age: 30, sex: 2, people: 10119296 },
      { age: 35, sex: 1, people: 11475182 },
      { age: 35, sex: 2, people: 11635647 },
      { age: 40, sex: 1, people: 11320252 },
      { age: 40, sex: 2, people: 11488578 },
      { age: 45, sex: 1, people: 9925006 },
      { age: 45, sex: 2, people: 10261253 },
      { age: 50, sex: 1, people: 8507934 },
      { age: 50, sex: 2, people: 8911133 },
      { age: 55, sex: 1, people: 6459082 },
      { age: 55, sex: 2, people: 6921268 },
      { age: 60, sex: 1, people: 5123399 },
      { age: 60, sex: 2, people: 5668961 },
      { age: 65, sex: 1, people: 4453623 },
      { age: 65, sex: 2, people: 4804784 },
      { age: 70, sex: 1, people: 3792145 },
      { age: 70, sex: 2, people: 5184855 },
      { age: 75, sex: 1, people: 2912655 },
      { age: 75, sex: 2, people: 4355644 },
      { age: 80, sex: 1, people: 1902638 },
      { age: 80, sex: 2, people: 3221898 },
      { age: 85, sex: 1, people: 970357 },
      { age: 85, sex: 2, people: 1981156 },
      { age: 90, sex: 1, people: 336303 },
      { age: 90, sex: 2, people: 1064581 },
    ],
    encode: {
      x: 'age',
      y: (d) => (d.sex === 1 ? -d.people : d.people),
      color: 'sex',
    },
    scale: {
      color: { type: 'ordinal' }, // 将color通道定义域映射到有序离散的值域，通常用于分类的数据
      x: { range: [1, 0] }, // 将x通道比例尺值域反转
    },
    coordinate: { transform: [{ type: 'transpose' }] }, // 配置坐标系转置，绘制条形图
    axis: { y: { labelFormatter: '~s' } }, // 配置y轴刻度值标签格式化
    legend: { color: { labelFormatter: (d) => (d === 1 ? 'Male' : 'Female') } }, // 配置color通道图例标签格式化
    tooltip: {
      items: [
        (d) => ({
          value: d.people,
          name: d.sex === 1 ? 'Male' : 'Female',
        }),
      ],
    }, // 配置tooltip元素
  });

  chart.render();

  return chart.getContainer();
})();
```
