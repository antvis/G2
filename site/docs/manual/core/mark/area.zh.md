---
title: area
order: 2
---

## 简介

`area` 图形标记大部分场景用来绘制我们常见的面积图，是一种随有序变量的变化，反映数值变化的图形，原理与 `line` 相似。而面积图的特点在于，折线与自变量坐标轴之间的区域，会由颜色或者纹理填充。

另外，在数据结构上，`area` 和 `line` 不同的地方在于，`area` 可以设置长度为 `2` 的数组作为 `y` 通道的数据，数组的第一个和第二个元素分别代表面积图的上边界和下边界，通过这种方式来绘制区间面积图，如果没有设置，默认下边界为 `0` 。

面积图也可用于多个系列数据的比较，表达数据的总量和趋势。相较于折线图，面积图不仅可以清晰地反映出数据的趋势变化，也能够强调不同类别的数据间的差距对比。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'area',
    data: [
      { year: '1991', value: 15468 },
      { year: '1992', value: 16100 },
      { year: '1993', value: 16500 },
      { year: '1994', value: 17409 },
      { year: '1995', value: 17000 },
      { year: '1996', value: 31056 },
      { year: '1997', value: 31982 },
      { year: '1998', value: 32040 },
      { year: '1999', value: 33233 },
    ],
    encode: {
      x: 'year', // 配置x通道
      y: 'value', // 配置y通道
      shape: 'area', // 配置shape通道，默认为'area'的时候可以不写。可选'area', 'smooth', 'hvh', 'vh', 'hv'
    },
    style: {
      fillOpacity: 0.3, // 配置area标记的填充透明度为 0.3
    },
  });

  chart.render();

  return chart.getContainer();
})();
```

更多的案例，可以查看[图表示例 - 面积图](/examples#general-area)页面。

## data

| x                  | y    | 解释                   |
| ------------------ | ---- | ---------------------- |
| 时间或有序名词字段 | 数值 | 一般的面积图           |
| 时间或有序名词字段 | 数组 | 层叠面积图和区间面积图 |

## encode

配置 `area` 标记的视觉通道。

| 属性                                     | 描述                                                                                         | 默认值 |
| ---------------------------------------- | -------------------------------------------------------------------------------------------- | ------ |
| x <Badge type="success">Required</Badge> | 绑定 `area` 标记的 `x` 属性通道                                                              | -      |
| y <Badge type="success">Required</Badge> | 绑定 `area` 标记的 `y` 属性通道                                                              | -      |
| color                                    | 绑定 `area` 标记的 `color` 属性通道，一般用来配置堆叠面积图                                  | -      |
| shape                                    | 绑定 `area` 标记的 `shape` 属性通道，支持的属性：`area` \| `smooth` \| `vh` \| `hv` \| `hvh` | `area` |

### color

`area` 标记中单个区域仅能使用一种颜色（或者渐变色），但如果将数据字段映射到颜色通道，会对数据进行分组，将数据拆分成多个区域：

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'area',
    data: [
      { country: 'Asia', year: '1750', value: 502 },
      { country: 'Asia', year: '1800', value: 635 },
      { country: 'Asia', year: '1850', value: 809 },
      { country: 'Asia', year: '1900', value: 947 },
      { country: 'Asia', year: '1950', value: 1402 },
      { country: 'Asia', year: '1999', value: 3634 },
      { country: 'Asia', year: '2050', value: 5268 },
      { country: 'Africa', year: '1750', value: 106 },
      { country: 'Africa', year: '1800', value: 107 },
      { country: 'Africa', year: '1850', value: 111 },
      { country: 'Africa', year: '1900', value: 133 },
      { country: 'Africa', year: '1950', value: 221 },
      { country: 'Africa', year: '1999', value: 767 },
      { country: 'Africa', year: '2050', value: 1766 },
      { country: 'Europe', year: '1750', value: 163 },
      { country: 'Europe', year: '1800', value: 203 },
      { country: 'Europe', year: '1850', value: 276 },
      { country: 'Europe', year: '1900', value: 408 },
      { country: 'Europe', year: '1950', value: 547 },
      { country: 'Europe', year: '1999', value: 729 },
      { country: 'Europe', year: '2050', value: 628 },
    ],
    encode: {
      x: 'year', // 配置x通道
      y: 'value', // 配置y通道
      color: 'country', // 配置color通道
    },
    style: { fillOpacity: 0.3 }, // 配置area标记的填充透明度为 0.3
  });

  chart.render();

  return chart.getContainer();
})();
```

对数据进行堆叠，则形成层叠区域图：

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'area',
    data: [
      { country: 'Asia', year: '1750', value: 502 },
      { country: 'Asia', year: '1800', value: 635 },
      { country: 'Asia', year: '1850', value: 809 },
      { country: 'Asia', year: '1900', value: 947 },
      { country: 'Asia', year: '1950', value: 1402 },
      { country: 'Asia', year: '1999', value: 3634 },
      { country: 'Asia', year: '2050', value: 5268 },
      { country: 'Africa', year: '1750', value: 106 },
      { country: 'Africa', year: '1800', value: 107 },
      { country: 'Africa', year: '1850', value: 111 },
      { country: 'Africa', year: '1900', value: 133 },
      { country: 'Africa', year: '1950', value: 221 },
      { country: 'Africa', year: '1999', value: 767 },
      { country: 'Africa', year: '2050', value: 1766 },
      { country: 'Europe', year: '1750', value: 163 },
      { country: 'Europe', year: '1800', value: 203 },
      { country: 'Europe', year: '1850', value: 276 },
      { country: 'Europe', year: '1900', value: 408 },
      { country: 'Europe', year: '1950', value: 547 },
      { country: 'Europe', year: '1999', value: 729 },
      { country: 'Europe', year: '2050', value: 628 },
    ],
    encode: {
      x: 'year', // 配置x通道
      y: 'value', // 配置y通道
      color: 'country', // 配置color通道
    },
    transform: [{ type: 'stackY' }], // 按照指定通道分组，对每组的 y 和 y1 通道进行堆叠，实现堆叠效果
    style: { fillOpacity: 0.3 }, // 配置area标记的填充透明度为 0.3
  });

  chart.render();

  return chart.getContainer();
})();
```

### shape

`area` 标记的支持的形状如下：

| 形状   | 描述                             | 示例                                                                                                             |
| ------ | -------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| area   | 绘制直线连接的面积图             | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*_nCpS59Cc_MAAAAAAAAAAAAAemJ7AQ/original"></img> |
| smooth | 绘制平滑曲线的面积图             | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7GhERYQPy4UAAAAAAAAAAAAAemJ7AQ/original"></img> |
| vh     | 绘制阶梯面积图，先竖线后横线连接 | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*B893SYRqUUwAAAAAAAAAAAAAemJ7AQ/original"></img> |
| hv     | 绘制阶梯面积图，先横线后竖线连接 | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*A2RnTI55cVoAAAAAAAAAAAAAemJ7AQ/original"></img> |
| hvh    | 绘制阶梯面积图，竖横竖，中点连接 | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*0QEpT47_yGQAAAAAAAAAAAAAemJ7AQ/original"></img> |

## coordinate

`area` 图形标记在直角坐标系和极坐标系下的展示有所差别，在极坐标下线区域图需要进行闭合。常用来绘制雷达图等。

| 坐标系     | 图表     |
| ---------- | -------- |
| 直角坐标系 | 面积图等 |
| 极坐标系   | 雷达图等 |

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'area',
    autoFit: true,
    data: [
      { item: 'Design', type: 'a', score: 70 },
      { item: 'Design', type: 'b', score: 30 },
      { item: 'Development', type: 'a', score: 60 },
      { item: 'Development', type: 'b', score: 70 },
      { item: 'Marketing', type: 'a', score: 50 },
      { item: 'Marketing', type: 'b', score: 60 },
      { item: 'Users', type: 'a', score: 40 },
      { item: 'Users', type: 'b', score: 50 },
      { item: 'Test', type: 'a', score: 60 },
      { item: 'Test', type: 'b', score: 70 },
      { item: 'Language', type: 'a', score: 70 },
      { item: 'Language', type: 'b', score: 50 },
      { item: 'Technology', type: 'a', score: 50 },
      { item: 'Technology', type: 'b', score: 40 },
      { item: 'Support', type: 'a', score: 30 },
      { item: 'Support', type: 'b', score: 40 },
      { item: 'Sales', type: 'a', score: 60 },
      { item: 'Sales', type: 'b', score: 40 },
      { item: 'UX', type: 'a', score: 50 },
      { item: 'UX', type: 'b', score: 60 },
    ],
    encode: { x: 'item', y: 'score', color: 'type' },
    scale: { x: { padding: 0.5, align: 0 }, y: { tickCount: 5 } },
    coordinate: { type: 'polar' },
    style: { fillOpacity: 0.5 },
    axis: { x: { grid: true }, y: { zIndex: 1, title: false } },
    interaction: { tooltip: { crosshairsLineDash: [4, 4] } },
  });

  chart.render();

  return chart.getContainer();
})();
```

## style

配置 `area` 标记的样式。

| 属性                 | 描述                                                                                                                         | 类型                  | 默认值                                                     |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------- | --------------------- | ---------------------------------------------------------- |
| connect              | 是否用 `connector` 图形连接空值                                                                                              | _boolean_             | `false`                                                    |
| defined              | 决定数据是否为空值                                                                                                           | _(d: any) => boolean_ | `(d) => !Number.isNaN(d) && d !== undefined && d !== null` |
| connectFill          | `connector` 图形填充色                                                                                                       | _string_              | -                                                          |
| connectFillOpacity   | `connector` 图形填充透明度                                                                                                   | _number_              | -                                                          |
| connectStroke        | `connector` 图形的描边                                                                                                       | _string_              | -                                                          |
| connectStrokeOpacity | `connector` 图形描边透明度                                                                                                   | _number_              | -                                                          |
| connectLineWidth     | `connector` 图形描边的宽度                                                                                                   | _number_              | -                                                          |
| connectLineDash      | `connector` 图形描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 | _[number,number]_     | -                                                          |
| connectOpacity       | `connector` 图形的整体透明度                                                                                                 | _number_              | -                                                          |
| connectShadowColor   | `connector` 图形阴影颜色                                                                                                     | _string_              | -                                                          |
| connectShadowBlur    | `connector` 图形阴影的高斯模糊系数                                                                                           | _number_              | -                                                          |
| connectShadowOffsetX | 设置阴影距`connector` 图形的水平距离                                                                                         | _number_              | -                                                          |
| connectShadowOffsetY | 设置阴影距`connector` 图形的垂直距离                                                                                         | _number_              | -                                                          |
| connectCursor        | `connector` 图形鼠标样式。同 css 的鼠标样式。                                                                                | _string_              | `default`                                                  |
| fill                 | `area` 图形填充色                                                                                                            | _string_              | -                                                          |
| fillOpacity          | `area` 图形填充透明度                                                                                                        | _number_              | `0.85`                                                     |
| stroke               | `area` 图形的描边                                                                                                            | _string_              | -                                                          |
| strokeOpacity        | `area` 图形的描边透明度                                                                                                      | _number_              | -                                                          |
| lineWidth            | `area` 图形描边的宽度                                                                                                        | _number_              | `0`                                                        |
| lineDash             | `area` 图形描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。     | _[number,number]_     | -                                                          |
| opacity              | `area` 图形的整体透明度                                                                                                      | _number_              | -                                                          |
| shadowColor          | `area` 图形阴影颜色                                                                                                          | _string_              | -                                                          |
| shadowBlur           | `area` 图形阴影的高斯模糊系数                                                                                                | _number_              | -                                                          |
| shadowOffsetX        | 设置阴影距`area` 图形的水平距离                                                                                              | _number_              | -                                                          |
| shadowOffsetY        | 设置阴影距`area` 图形的垂直距离                                                                                              | _number_              | -                                                          |
| cursor               | `area` 图形的鼠标样式。同 css 的鼠标样式。                                                                                   | _string_              | `default`                                                  |

## 常见问题

- 使用 connect 功能时，怎么决定什么样的数据为空值？

可以使用 `defined` 配置去决定是否为非空值，默认 NaN、undefined、null 为空值。假设需要数据为 `0` 的时候是空值连接。

```js
chart
  .area()
  // ...
  .style('defined', (v) => v === 0);
```
