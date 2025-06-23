---
title: elementSelectByX
order: 15
---

## 概述

`elementSelectByX` 交互的对象是图表元素 element，当点击元素时，选中所有具有相同 x 通道值的元素。

- 触发：点击元素。

- 结束：再次点击选中的元素。

- 影响状态：

选中的元素变为 `selected` 状态。

其他元素变为 `unselected` 状态。

交互内置状态：

```js
({
  // selected 状态下的元素为1px黑色边框
  state: { selected: { lineWidth: '1', stroke: '#000' } },
});
```

<img alt="example" src="https://gw.alipayobjects.com/zos/raptor/1670298776816/element-select-by-x.gif" width="640">

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container', paddingLeft: 50 });

chart.options({
  type: 'interval',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  transform: [
    { type: 'sortX', by: 'y', reverse: true, slice: 6 },
    { type: 'dodgeX' },
  ],
  encode: { x: 'state', y: 'population', color: 'age' },
  axis: { y: { labelFormatter: '~s' } },
  state: { selected: { fill: 'red' }, unselected: { opacity: 0.5 } },
  interaction: { elementSelectByX: true },
});

chart.render();
```

## 使用方式

配置 `elementSelectByX` 交互有两种方式：

第一种，传入 `boolean` 设置是否开启交互。

```js
({
  type: 'interval',
  interaction: { elementSelectByX: true }, // 采用默认配置
});
```

第二种，传入 [配置项](#配置项) 对交互进行配置。

```js
({
  type: 'line',
  interaction: {
    elementSelectByX: {
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
  interaction: { elementSelectByX: true },
});
```

也可以配置在 View 层级，视图上声明的交互会传递给 `children` 声明的标记，如果该标记有声明对应的交互，就合并；否则不影响。

```ts
({
  type: 'view',
  interaction: { elementSelectByX: true },
});
```

## 配置项

元素选择交互配置有两处：

1. 交互配置
2. 元素选中的样式

### 交互配置

| 属性                 | 描述                                                                                  | 类型                   | 默认值 |
| -------------------- | ------------------------------------------------------------------------------------- | ---------------------- | ------ |
| background           | 是否高亮背景                                                                          | `boolean`              | false  |
| region               | 点击空白区域是否触发选择                                                              | `boolean`              | false  |
| single               | 是否单选，设置为 true 时每次只能选中一个 x 值对应的元素组                             | `boolean`              | false  |
| multipleSelectHotkey | 多选热键的 code，按住热键后变为多选，设置此属性后`single`无效。不设置时默认为多选模式 | `string` \| `string[]` | -      |

### 元素选中样式

元素选中样式，效果见示例[自定义选中](#自定义选中)

| 属性                    | 描述                                                                                                             | 类型                                                         | 默认值        | 必选 |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------- | ---- |
| offset                  | 主方向上的便偏移量                                                                                               | number                                                       | `0`           |      |
| radius                  | 元素圆角                                                                                                         | number \| (datum, index, data) => number                     | `0`           |      |
| fill                    | 元素填充色                                                                                                       | string \| (datum, index, data) => string                     | -             |      |
| fillOpacity             | 元素填充透明度                                                                                                   | number \| (datum, index, data) => number                     | -             |      |
| stroke                  | 元素的描边                                                                                                       | string \| (datum, index, data) => string                     | -             |      |
| strokeOpacity           | 元素描边透明度                                                                                                   | number \| (datum, index, data) => number                     | -             |      |
| lineWidth               | 元素描边的宽度                                                                                                   | number \| (datum, index, data) => number                     | -             |      |
| lineDash                | 元素描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 | [number,number] \| (datum, index, data) => [number , number] | -             |      |
| opacity                 | 元素的整体透明度                                                                                                 | number \| (datum, index, data) => number                     | -             |      |
| shadowColor             | 元素阴影颜色                                                                                                     | string \| (datum, index, data) => string                     | -             |      |
| shadowBlur              | 元素阴影的高斯模糊系数                                                                                           | number \| (datum, index, data) => number                     | -             |      |
| shadowOffsetX           | 设置阴影距元素的水平距离                                                                                         | number \| (datum, index, data) => number                     | -             |      |
| shadowOffsetY           | 设置阴影距元素的垂直距离                                                                                         | number \| (datum, index, data) => number                     | -             |      |
| cursor                  | 元素鼠标样式。同 css 的鼠标样式。                                                                                | string \| (datum, index, data) => string                     | `default`     |      |
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

在 selected 元素中配置背景的时候，不是以对象的形式来配置，而是以 `background`前缀加属性的方式来配置。

```js
({
  state: {
    selected: {
      offset: 10,
      radius: 50,
      fill: '#1890FF',
      fillOpacity: 0.9,
      stroke: '#40A9FF',
      strokeOpacity: 0.9,
      lineWidth: 2,
      lineDash: [4, 8],
      opacity: 1,
      shadowColor: '#1890FF',
      shadowBlur: 10,
      shadowOffsetX: 5,
      shadowOffsetY: 5,
      cursor: 'pointer',
      backgroundRadius: 50,
      backgroundFill: '#E6F7FF',
      backgroundFillOpacity: 0.9,
      backgroundStroke: '#91D5FF',
      backgroundStrokeOpacity: 0.9,
      backgroundLineWidth: 2,
      backgroundLineDash: [4, 8],
      backgroundOpacity: 1,
      backgroundShadowColor: '#91D5FF',
      backgroundShadowBlur: 10,
      backgroundShadowOffsetX: 5,
      backgroundShadowOffsetY: 5,
      backgroundCursor: 'pointer',
    },
  },
});
```

## 事件

### 监听事件

支持以下的事件：

- `element:select` - 元素选中时触发
- `element:unselect` - 元素取消选中时触发

```js
chart.on('element:select', (e) => {
  console.log(e.data.data);
  console.log(e.nativeEvent);
});

chart.on('element:unselect', (e) => {
  console.log(e.nativeEvent);
});
```

### 触发交互

支持以下的事件：

- `element:select` - 选中数据
- `element:unselect` - 取消选中

```js
chart.emit('element:select', {
  data: { data: [{ population: 5038433 }, { population: 3983091 }] },
});

chart.emit('element:unselect', {});
```

## 示例

### 基础选择

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'interval',
  paddingLeft: 50,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  encode: { x: 'state', y: 'population', color: 'age' },
  transform: [
    { type: 'sortX', by: 'y', reverse: true, slice: 6 },
    { type: 'dodgeX' },
  ],
  axis: { y: { labelFormatter: '~s' } },
  interaction: { elementSelectByX: true },
});

chart.render();
```

### 自定义选中

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'interval',
  paddingLeft: 50,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  encode: { x: 'state', y: 'population', color: 'age' },
  transform: [
    { type: 'sortX', by: 'y', reverse: true, slice: 6 },
    { type: 'dodgeX' },
  ],
  axis: { y: { labelFormatter: '~s' } },
  state: {
    selected: {
      offset: 10,
      radius: 50,
      fill: (d) => (d.population > 1000000 ? '#F5222D' : '#1890FF'),
      fillOpacity: 0.9,
      stroke: (d) => (d.population > 1000000 ? '#FF4D4F' : '#40A9FF'),
      strokeOpacity: 0.9,
      lineWidth: 2,
      lineDash: [4, 8],
      opacity: 1,
      shadowColor: (d) => (d.population > 1000000 ? '#F5222D' : '#1890FF'),
      shadowBlur: 10,
      shadowOffsetX: 5,
      shadowOffsetY: 5,
      cursor: 'pointer',
      backgroundRadius: 50,
      backgroundFill: (d) => (d.population > 1000000 ? '#FFF1F0' : '#E6F7FF'),
      backgroundFillOpacity: 0.9,
      backgroundStroke: (d) => (d.population > 1000000 ? '#FFA39E' : '#91D5FF'),
      backgroundStrokeOpacity: 0.9,
      backgroundLineWidth: 2,
      backgroundLineDash: [4, 8],
      backgroundOpacity: 1,
      backgroundShadowColor: (d) =>
        d.population > 1000000 ? '#FFA39E' : '#91D5FF',
      backgroundShadowBlur: 10,
      backgroundShadowOffsetX: 5,
      backgroundShadowOffsetY: 5,
      backgroundCursor: 'pointer',
    },
  },
  interaction: {
    elementSelectByX: {
      background: true,
    },
  },
});

chart.render();
```

### 单选模式

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'interval',
  paddingLeft: 50,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  encode: { x: 'state', y: 'population', color: 'age' },
  transform: [
    { type: 'sortX', by: 'y', reverse: true, slice: 6 },
    { type: 'dodgeX' },
  ],
  axis: { y: { labelFormatter: '~s' } },
  interaction: {
    elementSelectByX: {
      single: true, // 设置为单选模式
      background: true,
    },
  },
});

chart.render();
```

### 多选模式

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'interval',
  paddingLeft: 50,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  encode: { x: 'state', y: 'population', color: 'age' },
  transform: [
    { type: 'sortX', by: 'y', reverse: true, slice: 6 },
    { type: 'dodgeX' },
  ],
  axis: { y: { labelFormatter: '~s' } },
  interaction: {
    elementSelectByX: {
      multipleSelectHotkey: 'ShiftLeft', // 按住左 Shift 键进入多选模式
      background: true,
    },
  },
});

chart.render();
```
