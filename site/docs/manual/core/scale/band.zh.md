---
title: band
order: 2
---

## 概述

band 比例尺是一种特殊的分类比例尺，它将离散的定义域（如类别、名称等）映射到连续的数值范围，并为每个类别分配相等宽度的区间（band）。与普通的 [ordinal](/manual/core/scale/ordinal) 比例尺不同，band 比例尺不仅关注点的位置，还关注每个类别占据的区间宽度。

band 比例尺的主要特点：

- 将离散数据（如类别）映射到连续区间
- 为每个类别分配等宽的区间（band）
- 支持设置类别之间的内部间距（paddingInner）和外部间距（paddingOuter）
- 常用于柱状图、条形图等需要表示类别数据的可视化中

在 G2 中，band 比例尺是柱状图（interval 标记）的默认 x 轴比例尺，它能够自动处理类别数据的映射和布局。

## 配置项

| 属性         | 描述                                                                 | 类型                                                   | 默认值      | 必选 |
| ------------ | -------------------------------------------------------------------- | ------------------------------------------------------ | ----------- | ---- |
| domain       | 设置定义域数组，即输入数据的可能值                                   | `number[] \| string[] \| Date[]`                       | `[]`        |      |
| range        | 设置数据映射的值域范围，即输出的范围                                 | `number[]` \| `string[]`                               | `[0, 1]`    |      |
| unknown      | 对于 `undefined`， `NaN`，`null` 空值，返回的数据                    | `any`                                                  | `undefined` |      |
| round        | 输出值是否进行四舍五入                                               | `boolean`                                              | `false`     |      |
| paddingInner | 设置类别之间的内部间距，在 [0, 1] 范围内，值越大间距越大             | `number`                                               | `0`         |      |
| paddingOuter | 设置两端的外部间距，在 [0, 1] 范围内，值越大间距越大                 | `number`                                               | `0`         |      |
| padding      | 同时设置 `paddingInner` 和 `paddingOuter` 的快捷方式                 | `number`                                               | `0`         |      |
| align        | 对齐方式，在 [0, 1] 范围内，0 表示左对齐，0.5 表示居中，1 表示右对齐 | `number`                                               | `0.5`       |      |
| compare      | 对定义域进行映射前的排序函数                                         | `(a: string or number, b: string or number) => number` | `undefined` |      |
| flex         | 设置各类别的宽度分配比例                                             | `number[]`                                             | `[]`        |      |

### band 比例尺的布局原理

band 比例尺将连续的值域范围（range）划分为等宽的区间，每个区间对应定义域中的一个离散值。下图展示了 band 比例尺的布局原理：

```plain
|<------------------------------------------- range ------------------------------------------->|
|             |                   |             |                   |             |             |
|<--step*PO-->|<----bandWidth---->|<--step*PI-->|<----bandWidth---->|<--step*PI-->|<--step*PO-->|
|             | ***************** |             | ***************** |             |             |
|             | ******* A ******* |             | ******* B ******* |             |             |
|             | ***************** |             | ***************** |             |             |
|             |<--------------step------------->|                                               |
|-----------------------------------------------------------------------------------------------|
```

其中：

- **range**: 整个比例尺的值域范围
- **bandWidth**: 每个类别占据的宽度
- **step**: 相邻类别中心点之间的距离
- **step\*PI (paddingInner)**: 类别之间的内部间距
- **step\*PO (paddingOuter)**: 两端的外部间距

## 使用示例

### 基础柱状图

band 比例尺最常见的应用是柱状图，通过设置 `padding` 可以控制柱子之间的间距：

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
  scale: {
    x: {
      type: 'band',
      padding: 0.5, // 设置柱子之间的间距
    },
  },
});

chart.render();
```

### 分组柱状图

在分组柱状图中，band 比例尺与 dodgeX 转换一起使用，可以创建分组效果：

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { month: '1月', value: 86.5, type: '降水量' },
    { month: '2月', value: 86.5, type: '降水量' },
    { month: '3月', value: 86.5, type: '降水量' },
    { month: '4月', value: 86.5, type: '降水量' },
    { month: '5月', value: 86.5, type: '降水量' },
    { month: '6月', value: 86.5, type: '降水量' },
    { month: '1月', value: 30.5, type: '蒸发量' },
    { month: '2月', value: 30.5, type: '蒸发量' },
    { month: '3月', value: 30.5, type: '蒸发量' },
    { month: '4月', value: 30.5, type: '蒸发量' },
    { month: '5月', value: 30.5, type: '蒸发量' },
    { month: '6月', value: 30.5, type: '蒸发量' },
  ],
  encode: {
    x: 'month',
    y: 'value',
    color: 'type',
  },
  transform: [{ type: 'dodgeX' }],
  scale: {
    x: {
      type: 'band',
      padding: 0.2, // 设置组间距
    },
  },
});

chart.render();
```

### 自定义柱宽

使用 `flex` 属性可以为不同类别设置不同的宽度比例：

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { country: 'USA', value: 12394, gdp: 21.4 },
    { country: 'China', value: 9608, gdp: 14.7 },
    { country: 'Japan', value: 4731, gdp: 5.0 },
    { country: 'Germany', value: 3861, gdp: 4.2 },
    { country: 'UK', value: 2678, gdp: 2.9 },
  ],
  encode: {
    x: 'country',
    y: 'value',
    color: 'country',
  },
  scale: {
    x: {
      type: 'band',
      padding: 0.4,
      flex: [2.14, 1.47, 0.5, 0.42, 0.29], // 根据 GDP 设置不同宽度
    },
  },
});

chart.render();
```

### 条形图（横向柱状图）

通过坐标系转置，可以创建条形图，band 比例尺同样适用：

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  coordinate: { transform: [{ type: 'transpose' }] },
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
  scale: {
    x: {
      type: 'band',
      padding: 0.5,
    },
  },
});

chart.render();
```

## 常见问题

### 如何调整柱子的宽度？

可以通过设置 `padding` 属性来调整柱子之间的间距，从而间接调整柱子的宽度。`padding` 值越大，柱子越窄；值越小，柱子越宽。

```js
chart.interval().encode('x', 'type').encode('y', 'sale').scale('x', {
  type: 'band',
  padding: 0.5, // 值范围在 [0, 1] 之间
});
```

### band 比例尺与 point 比例尺的区别是什么？

- **band 比例尺**：为每个类别分配一个区间（带宽），适合柱状图等需要占据宽度的图表
- **point 比例尺**：为每个类别分配一个点，相当于 `bandWidth = 0` 的 band 比例尺，适合散点图等只需要点位置的图表

### 如何设置不同宽度的柱子？

有两种方法：

1. 使用 `flex` 属性为不同类别设置不同的宽度比例
2. 使用 `flexX` 转换，根据指定字段的值自动设置柱宽

```js
// 方法1：使用 flex 属性
chart
  .interval()
  .encode('x', 'country')
  .encode('y', 'value')
  .scale('x', {
    type: 'band',
    flex: [2, 1, 3, 1.5], // 手动设置宽度比例
  });

// 方法2：使用 flexX 转换
chart
  .interval()
  .encode('x', 'country')
  .encode('y', 'value')
  .transform({ type: 'flexX', field: 'gdp' }); // 根据 gdp 字段自动设置宽度
```
