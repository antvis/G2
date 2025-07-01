---
title: boxplot
order: 4
---

## 概述

`boxplot` 标记用于绘制箱线图（boxplot），又称盒须图、盒式图，是一种用于展示一组数据分布情况的统计图表。箱线图通常包含以下几个关键统计值：

- **最小值**：数据集中的最小值（不包括异常值）
- **下四分位数（Q1）**：数据集中排在 25%位置的值
- **中位数（Q2）**：数据集中排在 50%位置的值
- **上四分位数（Q3）**：数据集中排在 75%位置的值
- **最大值**：数据集中的最大值（不包括异常值）
- **异常值（Outliers）**：超出正常范围的数据点

`boxplot` 和 [`box`](/manual/core/mark/box) 标记都可以用来绘制箱线图，但它们有以下区别：

- `boxplot` 是高阶标记，自带数据分组和数据统计聚合功能
- `box` 是原子标记，需要开发者手动指定 5 个点的数据

因此，`boxplot` 更适合用于前端数据的探索和分析过程，而 `box` 更适用于后端对超大数据进行计算和统计之后的可视化展示。

<img alt="boxplot" width="100%" style="max-width: 400px" src="https://gw.alipayobjects.com/zos/antfincdn/f6WEf%24CrgE/20220913111713.jpg" />

## 配置项

| 属性   | 描述                                                              | 类型              | 默认值 | 必选 |
| ------ | ----------------------------------------------------------------- | ----------------- | ------ | ---- |
| encode | 配置 `boxplot` 标记的视觉通道，包括 `x`、`y`、`color`、`shape` 等 | [encode](#encode) | -      | ✓    |
| style  | 配置 `boxplot` 标记的图形样式                                     | [style](#style)   | -      |      |
| point  | 是否显示异常点                                                    | `boolean`         | `true` |      |

### encode

配置 `boxplot` 标记的视觉通道。

| 属性   | 描述                                                                       | 类型                          | 默认值  | 必选 |
| ------ | -------------------------------------------------------------------------- | ----------------------------- | ------- | ---- |
| x      | 绑定 `boxplot` 标记的 `x` 属性通道，通常是分类字段                         | [encode](/manual/core/encode) | -       | ✓    |
| y      | 绑定 `boxplot` 标记的 `y` 属性通道，通常是数值字段，用于计算箱线图的统计值 | [encode](/manual/core/encode) | -       | ✓    |
| color  | 绑定 `boxplot` 标记的 `color` 属性通道，用于区分不同类别的箱线图           | [encode](/manual/core/encode) | -       |      |
| shape  | 绑定 `boxplot` 标记的 `shape` 属性通道，可选值为 `box`、`violin`           | `'box'` \| `'violin'`         | `'box'` |      |
| series | 绑定 `boxplot` 标记的 `series` 属性通道，用于分组显示箱线图                | [encode](/manual/core/encode) | -       |      |

### style

配置 `boxplot` 标记的图形样式。`boxplot` 由两部分组成：箱体（box）和异常点（point）。因此，样式配置也分为两部分，分别以 `box` 和 `point` 为前缀。

#### 箱体样式

| 属性             | 描述                                                                       | 类型                                                                    | 默认值      | 必选 |
| ---------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------- | ---- |
| boxFill          | 箱体的填充色                                                               | `string` \| `(datum, index, data, column) => string`                    | -           |      |
| boxFillOpacity   | 箱体的填充透明度                                                           | `number` \| `(datum, index, data, column) => number`                    | `0.95`      |      |
| boxStroke        | 箱体的描边颜色                                                             | `string` \| `(datum, index, data, column) => string`                    | `#000`      |      |
| boxLineWidth     | 箱体描边的宽度                                                             | `number` \| `(datum, index, data, column) => number`                    | `1`         |      |
| boxLineDash      | 箱体描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离 | `[number,number]` \| `(datum, index, data, column) => [number, number]` | -           |      |
| boxLineOpacity   | 箱体描边的透明度                                                           | `number` \| `(datum, index, data, column) => number`                    | -           |      |
| boxOpacity       | 箱体的整体透明度                                                           | `number` \| `(datum, index, data, column) => number`                    | -           |      |
| boxShadowColor   | 箱体阴影颜色                                                               | `string` \| `(datum, index, data, column) => string`                    | -           |      |
| boxShadowBlur    | 箱体阴影的高斯模糊系数                                                     | `number` \| `(datum, index, data, column) => number`                    | -           |      |
| boxShadowOffsetX | 设置阴影距箱体的水平距离                                                   | `number` \| `(datum, index, data, column) => number`                    | -           |      |
| boxShadowOffsetY | 设置阴影距箱体的垂直距离                                                   | `number` \| `(datum, index, data, column) => number`                    | -           |      |
| boxCursor        | 鼠标样式。同 CSS 的鼠标样式                                                | `string` \| `(datum, index, data, column) => string`                    | `'default'` |      |

#### 异常点样式

| 属性               | 描述                        | 类型                                                                    | 默认值      | 必选 |
| ------------------ | --------------------------- | ----------------------------------------------------------------------- | ----------- | ---- |
| pointFill          | 异常点的填充色              | `string` \| `(datum, index, data, column) => string`                    | -           |      |
| pointFillOpacity   | 异常点的填充透明度          | `number` \| `(datum, index, data, column) => number`                    | -           |      |
| pointStroke        | 异常点的描边颜色            | `string` \| `(datum, index, data, column) => string`                    | -           |      |
| pointLineWidth     | 异常点描边的宽度            | `number` \| `(datum, index, data, column) => number`                    | -           |      |
| pointLineDash      | 异常点描边的虚线配置        | `[number,number]` \| `(datum, index, data, column) => [number, number]` | -           |      |
| pointStrokeOpacity | 异常点描边的透明度          | `number` \| `(datum, index, data, column) => number`                    | -           |      |
| pointOpacity       | 异常点的整体透明度          | `number` \| `(datum, index, data, column) => number`                    | -           |      |
| pointShadowColor   | 异常点阴影颜色              | `string` \| `(datum, index, data, column) => string`                    | -           |      |
| pointShadowBlur    | 异常点阴影的高斯模糊系数    | `number` \| `(datum, index, data, column) => number`                    | -           |      |
| pointShadowOffsetX | 设置阴影距异常点的水平距离  | `number` \| `(datum, index, data, column) => number`                    | -           |      |
| pointShadowOffsetY | 设置阴影距异常点的垂直距离  | `number` \| `(datum, index, data, column) => number`                    | -           |      |
| pointCursor        | 鼠标样式。同 CSS 的鼠标样式 | `string` \| `(datum, index, data, column) => string`                    | `'default'` |      |

## 示例

### 基础箱线图

使用 `boxplot` 标记可以快速创建箱线图，自动计算数据的统计值。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'boxplot',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/morley.json',
  },
  encode: {
    x: 'Expt',
    y: 'Speed',
  },
  style: {
    boxFill: '#aaa',
    pointStroke: '#000',
  },
});

chart.render();
```

### 无异常点箱线图

通过设置 `point: false` 可以隐藏异常点，只显示箱体部分。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'boxplot',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/morley.json',
  },
  encode: {
    x: 'Expt',
    y: 'Speed',
  },
  style: {
    point: false,
  },
});

chart.render();
```

### 分组箱线图

使用 `color` 和 `series` 通道可以创建分组箱线图。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'boxplot',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
  },
  encode: {
    x: 'species',
    y: 'flipper_length_mm',
    color: 'sex',
    series: 'sex',
  },
});

chart.render();
```

### 横向箱线图

通过坐标系转置可以创建横向箱线图。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'boxplot',
  coordinate: { transform: [{ type: 'transpose' }] },
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/morley.json',
    transform: [{ type: 'filter', callback: (d) => d.Expt === 1 }],
  },
  encode: {
    y: 'Speed',
  },
  style: {
    boxFill: '#aaa',
    pointStroke: '#000',
  },
});

chart.render();
```

### 小提琴图

通过设置 `shape: 'violin'` 可以创建小提琴图形状的箱线图。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'boxplot',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
  },
  encode: {
    x: 'species',
    y: 'flipper_length_mm',
    color: 'species',
    shape: 'violin',
  },
  style: {
    opacity: 0.5,
    strokeOpacity: 0.5,
    point: false,
  },
});

chart.render();
```

### 调整箱体宽度

通过设置 x 轴的 scale 参数可以调整箱体宽度和间距。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'boxplot',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/morley.json',
  },
  encode: {
    x: 'Expt',
    y: 'Speed',
  },
  scale: {
    x: {
      paddingInner: 0.1, // 较小的间距，箱体更宽
      paddingOuter: 0.05,
    },
  },
  style: {
    boxFill: '#4e79a7',
    boxStroke: '#2f4b7c',
    pointFill: '#e15759',
    pointStroke: '#c42e32',
  },
});

chart.render();
```

## 常见问题

### 如何设置箱体宽度？

`boxplot` 标记的箱体宽度由 x 轴的 band scale 控制。可以通过设置 `scale.x` 的 `paddingInner`、`paddingOuter` 或 `padding` 参数来调整箱体宽度：

- **paddingInner**：控制相邻箱体之间的间距，值越大箱体越窄
- **paddingOuter**：控制两端的间距，值越大整体布局越紧凑
- **padding**：同时设置 `paddingInner` 和 `paddingOuter` 的快捷方式

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
// 调整箱体宽度示例
chart.options({
  type: 'boxplot',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/morley.json',
  },
  encode: {
    x: 'Expt',
    y: 'Speed',
  },
  scale: {
    x: {
      paddingInner: 0.3, // 箱体间距，值越大箱体越窄
      paddingOuter: 0.1, // 两端间距
    },
    // 或者使用 padding 同时设置
    // x: { padding: 0.2 }
  },
});

chart.render();
```

对于分组箱线图，还可以通过 `series` 通道的 scale 参数来控制组内箱体的间距：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'boxplot',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
  },
  encode: {
    x: 'species',
    y: 'flipper_length_mm',
    color: 'sex',
    series: 'sex',
  },
  scale: {
    x: { paddingInner: 0.2, paddingOuter: 0.1 }, // 控制组间间距
    series: { paddingInner: 0.1, paddingOuter: 0.05 }, // 控制组内间距
  },
});

chart.render();
```

### 数据量很大，如何绘制箱线图？

当数据量很大时，可以将异常点以及四分位点的数据放到服务端计算，然后使用 `box` 标记绘制箱线图。这种情况下，使用 `box` 标记比 `boxplot` 标记更高效，因为 `box` 标记不需要在前端进行数据统计计算。

详细用法请参考 [box](/manual/core/mark/box) 标记的文档。
