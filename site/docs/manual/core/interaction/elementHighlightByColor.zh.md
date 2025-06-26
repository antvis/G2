---
title: elementHighlightByColor
order: 11
---

## 概述

`elementHighlightByColor` 交互的对象是图表元素 element，当鼠标悬浮在元素上时，高亮和鼠标悬浮的元素拥有相同 color 通道值的元素。

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

<img alt="example" src="https://gw.alipayobjects.com/zos/raptor/1670297651394/highlight-by-color.gif" width="640">

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'interval',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  encode: { x: 'state', y: 'population', color: 'age' },
  transform: [
    { type: 'stackY' },
    { type: 'sortX', by: 'y', reverse: true, slice: 5 },
  ],
  state: {
    active: { fill: 'red', linkFillOpacity: 0.5 },
    inactive: { opacity: 0.5 },
  },
  axis: { y: { labelFormatter: '~s' } },
  interaction: { elementHighlightByColor: { link: true } },
});

chart.render();
```

## 使用方式

配置 `elementHighlightByColor` 交互有两种方式：

第一种，传入 `boolean` 设置是否开启交互。

```js
({
  type: 'interval',
  interaction: { elementHighlightByColor: true }, // 采用默认配置
});
```

第二种，传入 [配置项](#配置项) 对交互进行配置。

```js
({
  type: 'line',
  interaction: {
    elementHighlightByColor: {
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
  interaction: { elementHighlightByColor: true },
});
```

也可以配置在 View 层级，视图上声明的交互会传递给 `children` 声明的标记，如果该标记有声明对应的交互，就合并；否则不影响。

```ts
({
  type: 'view',
  interaction: { elementHighlightByColor: true },
});
```

## 配置项

元素高亮交互配置有两处：

1. 交互配置
2. 元素高亮的样式

交互配置

| 属性       | 描述                                             | 类型      | 默认值 |
| ---------- | ------------------------------------------------ | --------- | ------ |
| background | 是否高亮背景                                     | `boolean` | false  |
| region     | 鼠标移动到元素空白区域时是否触发高亮(效果见下图) | `boolean` | false  |
| link       | 是否展示连接线                                   | `boolean` | false  |

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*n9wMQZoN2ssAAAAAAAAAAAAAemJ7AQ/original" width="640">

元素高亮样式配置

| 属性       | 描述               | 类型                                | 默认值                                  |
| ---------- | ------------------ | ----------------------------------- | --------------------------------------- |
| offset     | 主方向上的便偏移量 | number                              | `0`                                     |
| background | 是否高亮背景       | [backgroundStyle](#backgroundstyle) | 详见[backgroundstyle](#backgroundstyle) |
| link       | 是否展示连接线     | [linkStyle](#linkstyle)             | 详见[linkStyle](#linkstyle)             |

### backgroundStyle

元素高亮背景样式详见[自定义高亮](https://g2.antv.antgroup.com/manual/core/interaction/element-highlight#自定义高亮)
| 属性 | 描述 | 类型 | 默认值 | 必选 |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------- | ---- |
| backgroundRadius | 背景圆角 | number \| (datum, index, data) => number | `0` | |
| backgroundFill | 背景填充色 | string \| (datum, index, data) => string | `transparent` | |
| backgroundFillOpacity | 背景填充透明度 | number \| (datum, index, data) => number | - | |
| backgroundStroke | 背景的描边 | string \| (datum, index, data) => string | - | |
| backgroundStrokeOpacity | 背景描边透明度 | number \| (datum, index, data) => number | - | |
| backgroundLineWidth | 背景描边的宽度 | number \| (datum, index, data) => number | - | |
| backgroundLineDash | 背景描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 | [number,number] \| (datum, index, data) => [number , number] | - | |
| backgroundOpacity | 背景的整体透明度 | number \| (datum, index, data) => number | - | |
| backgroundShadowColor | 背景阴影颜色 | string \| (datum, index, data) => string | - | |
| backgroundShadowBlur | 背景阴影的高斯模糊系数 | number \| (datum, index, data) => number | - | |
| backgroundShadowOffsetX | 设置阴影距背景的水平距离 | number \| (datum, index, data) => number | - | |
| backgroundShadowOffsetY | 设置阴影距背景的垂直距离 | number \| (datum, index, data) => number | - | |
| backgroundCursor | 背景鼠标样式。同 css 的鼠标样式。 | string \| (datum, index, data) => string | `default` | |

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

### linkStyle

连接样式详见示例[连接线](#带连接线高亮)

| 属性              | 描述                                                                                                               | 类型                                                         | 默认值        | 必选 |
| ----------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ | ------------- | ---- |
| linkRadius        | 连接线圆角                                                                                                         | number \| (datum, index, data) => number                     | `0`           |      |
| linkFill          | 连接线填充色                                                                                                       | string \| (datum, index, data) => string                     | `transparent` |      |
| linkFillOpacity   | 连接线填充透明度                                                                                                   | number \| (datum, index, data) => number                     | -             |      |
| linkStroke        | 连接线的描边                                                                                                       | string \| (datum, index, data) => string                     | -             |      |
| linkStrokeOpacity | 连接线描边透明度                                                                                                   | number \| (datum, index, data) => number                     | -             |      |
| linkLineWidth     | 连接线描边的宽度                                                                                                   | number \| (datum, index, data) => number                     | -             |      |
| linkLineDash      | 连接线描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 | [number,number] \| (datum, index, data) => [number , number] | -             |      |
| linkOpacity       | 连接线的整体透明度                                                                                                 | number \| (datum, index, data) => number                     | -             |      |
| linkShadowColor   | 连接线阴影颜色                                                                                                     | string \| (datum, index, data) => string                     | -             |      |
| linkShadowBlur    | 连接线阴影的高斯模糊系数                                                                                           | number \| (datum, index, data) => number                     | -             |      |
| linkShadowOffsetX | 设置阴影距连接线的水平距离                                                                                         | number \| (datum, index, data) => number                     | -             |      |
| linkShadowOffsetY | 设置阴影距连接线的垂直距离                                                                                         | number \| (datum, index, data) => number                     | -             |      |
| linkCursor        | 连接线鼠标样式。同 css 的鼠标样式。                                                                                | string \| (datum, index, data) => string                     | `default`     |      |

```js
({
  state: {
    active: {
      linkRadius: 50,
      linkFill: '#000',
      linkFillOpacity: 0.9,
      linkStroke: '#DAF5EC',
      linkStrokeOpacity: 0.9,
      linkLineWidth: 2,
      linkLineDash: [4, 8],
      linkOpacity: 1,
      linkShadowColor: '#d3d3d3',
      linkShadowBlur: 10,
      linkShadowOffsetX: 10,
      linkShadowOffsetY: 10,
      linkCursor: 'pointer',
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
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  encode: { x: 'state', y: 'population', color: 'age' },
  transform: [
    { type: 'stackY' },
    { type: 'sortX', by: 'y', reverse: true, slice: 5 },
  ],
  state: {
    active: { fill: 'red', linkFillOpacity: 0.5 },
    inactive: { opacity: 0.5 },
  },
  axis: { y: { labelFormatter: '~s' } },
  interaction: { elementHighlightByColor: true },
});

chart.render();
```

### 带连接线高亮

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'interval',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  encode: { x: 'state', y: 'population', color: 'age' },
  transform: [
    { type: 'stackY' },
    { type: 'sortX', by: 'y', reverse: true, slice: 5 },
  ],
  state: {
    active: {
      fill: 'red',
      linkRadius: 50,
      linkFill: 'green',
      linkFillOpacity: 0.9,
      linkStroke: '#DAF5EC',
      linkStrokeOpacity: 0.9,
      linkLineWidth: 2,
      linkOpacity: 1,
      linkCursor: 'pointer',
    },
    inactive: { opacity: 0.5 },
  },
  axis: { y: { labelFormatter: '~s' } },
  interaction: {
    elementHighlightByColor: { link: true, background: true },
  },
});

chart.render();
```

### transpose

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'interval',
  height: 600,
  transform: [
    { type: 'stackY' },
    { type: 'sortX', by: 'y', reverse: true, slice: 5 },
  ],
  coordinate: { transform: [{ type: 'transpose' }] },
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  legend: false,
  encode: {
    x: 'state',
    y: 'population',
    color: 'age',
  },
  axis: {
    y: { labelFormatter: '~s' },
  },
  scale: {
    x: { paddingInner: 0.2 },
  },
  state: {
    active: {
      linkFill: (d) => (d.state === 'CA' ? 'red' : undefined),
      stroke: '#000',
      lineWidth: 1,
      linkFillOpacity: 0.5,
    },
    inactive: {
      opacity: 0.6,
    },
  },
  interaction: {
    elementHighlightByColor: {
      link: true,
    },
  },
});

chart.render();
```
