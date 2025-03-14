---
title: area
order: 2
---

## 概述

面积图（ `area` ）图形标记大部分场景用来绘制我们常见的面积图，是一种随有序变量的变化，反映数值变化的图形，原理与 `line` 相似。而面积图的特点在于，折线与自变量坐标轴之间的区域，会由颜色或者纹理填充。

另外，在数据结构上，`area` 和 `line` 不同的地方在于，`area` 可以设置长度为 `2` 的数组作为 `y` 通道的数据，数组的第一个和第二个元素分别代表面积图的上边界和下边界，通过这种方式来绘制区间面积图，如果没有设置，默认下边界为 `0` 。

面积图也可用于多个系列数据的比较，表达数据的总量和趋势。相较于折线图，面积图不仅可以清晰地反映出数据的趋势变化，也能够强调不同类别的数据间的差距对比。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'area',
    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/aapl.json',
    },
    // 配置视觉通道
    encode: {
      x: (d) => new Date(d.date), // 配置x通道
      y: 'close', // 配置y通道
      shape: 'area', // 配置shape通道，默认为'area'的时候可以不写。可选'area', 'smooth', 'hvh', 'vh', 'hv'
    },
    // 配置样式
    style: {
      fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff', // 配置面积图填充颜色为渐变色
      fillOpacity: 0.9, // 配置area标记的填充透明度为 0.9
    },
    // 配置坐标系
    coordinate: {},
  });

  chart.render();

  return chart.getContainer();
})();
```

更多的案例，可以查看[图表示例 - 面积图](/examples#general-area)页面。

## 配置项

| 属性       | 描述                                                                                               | 类型                      | 默认值                 | 必选 |
| ---------- | -------------------------------------------------------------------------------------------------- | ------------------------- | ---------------------- | ---- |
| encode     | 配置 `area` 标记的视觉通道，包括`x`、`y`、`color`、`shape`等，用于指定视觉元素属性和数据之间的关系 | [encode](#encode)         | -                      | ✓    |
| coordinate | 配置 `area` 标记的坐标系，坐标系会执行一系列点转换，从而改变标记的空间展示形式                     | [coordinate](#coordinate) | `{type: 'cartesian' }` |      |
| style      | 配置 `area` 标记的图形样式                                                                         | [style](#style)           | -                      |      |

### encode

配置 `area` 标记的视觉通道。

| 属性  | 描述                                                                                                                                        | 类型                                        | 默认值 | 必选 |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ------ | ---- |
| x     | 绑定 `area` 标记的 `x` 属性通道，一般是 `data` 中的时间或有序名词字段                                                                       | [encode](/manual/core/encode)               | -      | ✓    |
| y     | 绑定 `area` 标记的 `y` 属性通道，一般是 `data` 中的数值或数组字段                                                                           | [encode](/manual/core/encode)               | -      | ✓    |
| color | 绑定 `area` 标记的 `color` 属性通道，如果将数据字段映射到颜色通道，会对数据进行分组，将数据拆分成多个不同颜色的区域，一般用来配置堆叠面积图 | [encode](/manual/core/encode)               | -      |      |
| shape | 绑定 `area` 标记的 `shape` 属性通道，改变图形标记的绘制形状                                                                                 | `area` \| `smooth` \| `vh` \| `hv` \| `hvh` | `area` |      |

#### x & y

`area` 标记的位置视觉通道需要 `x`, `y` 两个字段的值，支持的数据格式有以下两种：

- `x`, `y` 都是数值（分类、连续），由于面积图表示的数据的趋势，所以尽量避免 `x` 轴对应的字段是无序的分类类型。
- `x` 是数值（分类、连续），`y` 是数组，表示一个区间值

| x 通道绑定的值 | y 通道绑定的值 | 解释                   |
| -------------- | -------------- | ---------------------- |
| 数值           | 数值           | 一般的面积图           |
| 数值           | 数组           | 堆叠面积图和区间面积图 |

#### color

`color` 视觉通道影响 `area` 图形标记包围区域的填充颜色。`area` 标记中单个区域仅能使用一种颜色（或者渐变色），但如果将数据字段映射到颜色通道，会对数据进行分组，将数据拆分成多个区域：

```js | ob { pin: false }
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

配置图形转换`transform`中的 [stackY](/manual/core/transform/stack-y) ，可以对分组的区域进行堆叠，则形成堆叠面积图，避免因为重叠导致的信息模糊：

```js | ob { pin: false }
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

#### shape

`area` 标记的支持的形状如下：

| 形状   | 描述                             | 示例                                                                                                             |
| ------ | -------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| area   | 绘制直线连接的面积图             | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*_nCpS59Cc_MAAAAAAAAAAAAAemJ7AQ/original"></img> |
| smooth | 绘制平滑曲线的面积图             | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7GhERYQPy4UAAAAAAAAAAAAAemJ7AQ/original"></img> |
| vh     | 绘制阶梯面积图，先竖线后横线连接 | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*B893SYRqUUwAAAAAAAAAAAAAemJ7AQ/original"></img> |
| hv     | 绘制阶梯面积图，先横线后竖线连接 | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*A2RnTI55cVoAAAAAAAAAAAAAemJ7AQ/original"></img> |
| hvh    | 绘制阶梯面积图，竖横竖，中点连接 | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*0QEpT47_yGQAAAAAAAAAAAAAemJ7AQ/original"></img> |

### coordinate

`area` 图形标记在不同坐标系下的展示有所差别。根据坐标系或坐标系转换的不同，可以绘制面积、雷达图等多种图表。

| 坐标系或坐标系转换 | 坐标系配置              | 图表     |
| ------------------ | ----------------------- | -------- |
| 直角坐标系         | `{ type: 'cartesian' }` | 面积图等 |
| 极坐标系           | `{ type: 'polar' }`     | 雷达图等 |

在**极坐标系**下面积图需要进行闭合。常用来绘制雷达图等。

```js | ob { pin: false }
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'area',
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
    coordinate: { type: 'polar' }, // 配置坐标系为极坐标系，用于绘制雷达图
    style: { fillOpacity: 0.5 },
    axis: { x: { grid: true }, y: { zIndex: 1, title: false } }, // 配置图表组件 - 坐标轴
    scale: { x: { padding: 0.5, align: 0 }, y: { tickCount: 5 } }, // 配置比例尺，使图表显示效果更好
  });

  chart.render();

  return chart.getContainer();
})();
```

### style

配置 `area` 标记的样式。

| 属性                 | 描述                                                                                                                         | 类型                                                             | 默认值                                                     | 必选 |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------- | ---- |
| connect              | 是否用 `connector` 图形连接空值                                                                                              | boolean                                                          | `false`                                                    |      |
| defined              | 决定数据是否为空值                                                                                                           | (d) => boolean                                                   | `(d) => !Number.isNaN(d) && d !== undefined && d !== null` |      |
| connectFill          | `connector` 图形填充色                                                                                                       | string \| (d, index, data, column) => string                     | -                                                          |      |
| connectFillOpacity   | `connector` 图形填充透明度                                                                                                   | number \| (d, index, data, column) => number                     | -                                                          |      |
| connectStroke        | `connector` 图形的描边                                                                                                       | string \| (d, index, data, column) => string                     | -                                                          |      |
| connectStrokeOpacity | `connector` 图形描边透明度                                                                                                   | number \| (d, index, data, column) => number                     | -                                                          |      |
| connectLineWidth     | `connector` 图形描边的宽度                                                                                                   | number \| (d, index, data, column) => number                     | -                                                          |      |
| connectLineDash      | `connector` 图形描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 | [number,number] \| (d, index, data, column) => [number , number] | -                                                          |      |
| connectOpacity       | `connector` 图形的整体透明度                                                                                                 | number \| (d, index, data, column) => number                     | -                                                          |      |
| connectShadowColor   | `connector` 图形阴影颜色                                                                                                     | string \| (d, index, data, column) => string                     | -                                                          |      |
| connectShadowBlur    | `connector` 图形阴影的高斯模糊系数                                                                                           | number \| (d, index, data, column) => number                     | -                                                          |      |
| connectShadowOffsetX | 设置阴影距`connector` 图形的水平距离                                                                                         | number \| (d, index, data, column) => number                     | -                                                          |      |
| connectShadowOffsetY | 设置阴影距`connector` 图形的垂直距离                                                                                         | number \| (d, index, data, column) => number                     | -                                                          |      |
| connectCursor        | `connector` 图形鼠标样式。同 css 的鼠标样式。                                                                                | string \| (d, index, data, column) => string                     | `default`                                                  |      |
| fill                 | `area` 图形填充色                                                                                                            | string \| (d, index, data, column) => string                     | -                                                          |      |
| fillOpacity          | `area` 图形填充透明度                                                                                                        | number \| (d, index, data, column) => number                     | `0.85`                                                     |      |
| stroke               | `area` 图形的描边                                                                                                            | string \| (d, index, data, column) => string                     | -                                                          |      |
| strokeOpacity        | `area` 图形的描边透明度                                                                                                      | number \| (d, index, data, column) => number                     | -                                                          |      |
| lineWidth            | `area` 图形描边的宽度                                                                                                        | number \| (d, index, data, column) => number                     | `0`                                                        |      |
| lineDash             | `area` 图形描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。     | [number,number] \| (d, index, data, column) => [number , number] | -                                                          |      |
| opacity              | `area` 图形的整体透明度                                                                                                      | number \| (d, index, data, column) => number                     | -                                                          |      |
| shadowColor          | `area` 图形阴影颜色                                                                                                          | string \| (d, index, data, column) => string                     | -                                                          |      |
| shadowBlur           | `area` 图形阴影的高斯模糊系数                                                                                                | number \| (d, index, data, column) => number                     | -                                                          |      |
| shadowOffsetX        | 设置阴影距`area` 图形的水平距离                                                                                              | number \| (d, index, data, column) => number                     | -                                                          |      |
| shadowOffsetY        | 设置阴影距`area` 图形的垂直距离                                                                                              | number \| (d, index, data, column) => number                     | -                                                          |      |
| cursor               | `area` 图形的鼠标样式。同 css 的鼠标样式。                                                                                   | string \| (d, index, data, column) => string                     | `default`                                                  |      |

尝试一下：

<Playground path="general/area/demo/missing-data-area.ts" rid="area-style"></playground>

## 示例

- 使用 connect 功能时，怎么决定什么样的数据为空值？

可以使用 `defined` 配置去决定是否为非空值，默认 NaN、undefined、null 为空值。假设需要数据为 `0` 的时候是空值连接。

```js
chart
  .area()
  // ...
  .style('defined', (v) => v === 0);
```
