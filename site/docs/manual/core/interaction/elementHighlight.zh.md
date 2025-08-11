---
title: elementHighlight
order: 10
---

## 概述

`elementHighlight` 交互的对象是图表元素 element，当鼠标悬浮在元素上时，将该元素高亮显示。

- 触发：鼠标悬浮在元素上。

- 结束：鼠标移出元素。

- 影响状态：

悬浮的元素变为 `active` 状态。

其他元素变为 `inactive` 状态。

交互内置状态：

```js
({
  // active 状态下的元素为1px黑色边框
  state: { active: { lineWidth: '1', stroke: '#000' } },
});
```

<img alt="example" src="https://gw.alipayobjects.com/zos/raptor/1670296745624/element-highlight.gif" width="640">

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'interval',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  },
  encode: { x: 'letter', y: 'frequency' },
  state: { active: { fill: 'orange' }, inactive: { opacity: 0.5 } },
  axis: { y: { labelFormatter: '.0%' } },
  interaction: { elementHighlight: true },
});

chart.render();
```

## 使用方式

配置 `elementHighlight` 交互有两种方式：

第一种，传入 `boolean` 设置是否开启交互。

```js
({
  type: 'interval',
  interaction: { elementHighlight: true }, // 采用默认配置
});
```

第二种，传入 [配置项](#配置项) 对交互进行配置。

```js
({
  type: 'line',
  interaction: {
    elementHighlight: {
      background: true,
    },
  },
});
```

## 配置层级

交互可以配置在 Mark 层级：

```ts
({
  type: 'interval',
  interaction: { elementHighlight: true },
});
```

也可以配置在 View 层级，视图上声明的交互会传递给 `children` 声明的标记，如果该标记有声明对应的交互，就合并；否则不影响。

```ts
({
  type: 'view',
  interaction: { elementHighlight: true },
});
```

## 配置项

元素高亮交互配置有两处：

1. 交互配置
2. 元素高亮的样式

### 交互配置

| 属性       | 描述                                             | 类型      | 默认值 |
| ---------- | ------------------------------------------------ | --------- | ------ |
| background | 是否高亮背景                                     | `boolean` | false  |
| region     | 鼠标移动到元素空白区域时是否触发高亮(效果见下图) | `boolean` | false  |

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*n9wMQZoN2ssAAAAAAAAAAAAAemJ7AQ/original" style="width: 100%">

### 元素高亮样式

元素高亮样式，效果见示例[自定义高亮](#自定义高亮)

| 属性                    | 描述                                                                                                             | 类型                                                         | 默认值        | 必选 |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------- | ---- |
| offset                  | 主方向上的便偏移量                                                                                               | number                                                       | `0`           |      |
| backgroundRadius        | 背景圆角                                                                                                         | number \| (datum, index, data) => number                     | `0`           |      |
| backgroundFill          | 背景填充色                                                                                                       | string \| (datum, index, data) => string                     | `transparent` |      |
| backgroundFillOpacity   | 背景填充透明度                                                                                                   | number \| (datum, index, data) => number                     | -             |      |
| backgroundStroke        | 背景的描边                                                                                                       | string \| (datum, index, data) => string                     | -             |      |
| backgroundStrokeOpacity | 背景描边透明度                                                                                                   | number \| (datum, index, data) => number                     | -             |      |
| backgroundLineWidth     | 背景描边的宽度                                                                                                   | number \| (datum, index, data) => number                     | -             |      |
| backgroundLineDash      | 背景描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 | [number,number] \| (datum, index, data) => [number , number] | -             |      |
| backgroundOpacity       | 背景的整体透明度                                                                                                 | number \| (datum, index, data) => number                     | -             |      |
| backgroundShadowColor   | 背景阴影颜色                                                                                                     | string \| (datum, index, data) => string                     | -             |      |
| backgroundShadowBlur    | 背景阴影的高斯模糊系数                                                                                           | number \| (datum, index, data) => number                     | -             |      |
| backgroundShadowOffsetX | 设置阴影距背景的水平距离                                                                                         | number \| (datum, index, data) => number                     | -             |      |
| backgroundShadowOffsetY | 设置阴影距背景的垂直距离                                                                                         | number \| (datum, index, data) => number                     | -             |      |
| backgroundCursor        | 背景鼠标样式。同 css 的鼠标样式。                                                                                | string \| (datum, index, data) => string                     | `default`     |      |

在 active 元素中配置背景的时候，不是以对象的形式来配置，而是以 `background`前缀加属性的方式来配置。

```js
({
  state: {
    active: {
      backgroundRadius: 50,
      backgroundFill: '#000',
      backgroundFillOpacity: 0.9,
      backgroundStroke: '#DAF5EC',
      backgroundStrokeOpacity: 0.9,
      backgroundLineWidth: 2,
      backgroundLineDash: [4, 8],
      backgroundOpacity: 1,
      backgroundShadowColor: '#d3d3d3',
      backgroundShadowBlur: 10,
      backgroundShadowOffsetX: 10,
      backgroundShadowOffsetY: 10,
      backgroundCursor: 'pointer',
    },
  },
});
```

## 事件

### 监听事件

支持以下的事件：

- `element:highlight` - 元素高亮时触发
- `element:unhighlight` - 元素取消高亮时触发

```js
chart.on('element:highlight', (e) => {
  console.log(e.data.data);
  console.log(e.data.group);
  console.log(e.nativeEvent);
});

chart.on('element:unhighlight', (e) => {
  console.log(e.nativeEvent);
});
```

### 触发交互

支持以下的事件：

- `element:highlight` - 高亮数据
- `element:unhighlight` - 取消高亮

```js
chart.emit('element:highlight', {
  data: { data: { population: 5038433 } },
});

chart.emit('element:unhighlight', {});
```

## 示例

### 基础高亮

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'interval',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  },
  encode: { x: 'letter', y: 'frequency' },
  transform: [{ type: 'sortX', by: 'y', reverse: true, slice: 5 }],
  axis: { y: { labelFormatter: '.0%' } },
  interaction: { elementHighlight: { background: true, region: true } },
});

chart.render();
```

### 自定义高亮

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'interval',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  },
  encode: { x: 'letter', y: 'frequency' },
  transform: [{ type: 'sortX', by: 'y', reverse: true, slice: 5 }],
  axis: { y: { labelFormatter: '.0%' } },
  scale: {
    y: {
      nice: true,
    },
  },
  state: {
    active: {
      offset: 1,
      backgroundRadius: 8,
      backgroundFill: (d) => (d.frequency > 0.1 ? '#EF4444' : '#3B82F6'),
      backgroundFillOpacity: 0.15,
      backgroundStroke: (d) => (d.frequency > 0.1 ? '#EF4444' : '#3B82F6'),
      backgroundStrokeOpacity: 0.8,
      backgroundLineWidth: 2,
      backgroundShadowColor: (d) => (d.frequency > 0.1 ? '#EF4444' : '#3B82F6'),
      backgroundShadowBlur: 8,
      backgroundShadowOffsetX: 0,
      backgroundShadowOffsetY: 2,
      backgroundCursor: 'pointer',
      fill: '#FFFFFF',
      stroke: (d) => (d.frequency > 0.1 ? '#EF4444' : '#3B82F6'),
      strokeWidth: 2,
    },
  },
  interaction: {
    elementHighlight: {
      background: true,
    },
  },
});

chart.render();
```

### 折线图配置背景高亮

**Line Mark 的特点**：

- 每条线对应一个图形元素（Path），包含多个数据点
- 线的 `__data__` 包含所有点的聚合数据，其中 x / y 值通常是第一个数据点的坐标
- 当渲染背景高亮时，`renderBackground` 函数基于第一个数据点的位置计算背景矩形
- 如果 x 轴是序数比例尺（band scale），背景矩形只覆盖第一个数据点对应的带宽范围

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'line',
  state: {
    active: {
      backgroundFill: 'red',
    },
  },
  interaction: {
    elementHighlight: {
      background: true,
    },
  },
  data: [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ],
  encode: { x: 'year', y: 'value' },
  scale: { x: { range: [0, 1] }, y: { domainMin: 0, nice: true } },
});

chart.render();
```

从上面的示例里我们可以看出，背景高亮只显示在线条的起点位置，看起来效果不完整，对于 Line Mark，推荐使用 `stroke`、`strokeWidth` 等样式属性进行高亮，但如果想要实现背景高亮也不是没有办法，这需要结合 G2 中的其他标记，例如 `point`标记。

**Point Mark 的特点**：

- 每个数据点对应一个独立的图形元素（如 Circle）
- 每个点都有自己独立的 `__data__`，包含该点的完整坐标信息
- 背景高亮为每个点单独计算和渲染背景矩形
- 每个点的背景矩形完整覆盖其对应的带宽范围

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data: [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ],
  encode: { x: 'year', y: 'value' },
  scale: { x: { range: [0, 1] }, y: { domainMin: 0, nice: true } },
  children: [
    {
      type: 'line',
      interaction: {
        elementHighlight: false, // 不开启高亮交互
      },
    },
    {
      type: 'point',
      style: { fill: 'white', stroke: '#1890ff', strokeWidth: 2 },
      // Point 使用背景高亮效果更佳
      state: {
        active: {
          backgroundFill: 'red',
          backgroundFillOpacity: 0.3,
          fill: 'red',
          r: 6,
        },
      },
      interaction: {
        elementHighlight: { background: true, region: true },
      },
      tooltip: false, //关闭 point 的tooltip，避免重复显示
    },
  ],
});

chart.render();
```
