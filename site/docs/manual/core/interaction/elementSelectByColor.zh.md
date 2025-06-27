---
title: elementSelectByColor
order: 14
---

## 概述

`elementSelectByColor` 交互的对象是图表元素 element，当点击元素时，选中所有具有相同 color 通道值的元素。

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

<img alt="example" src="https://gw.alipayobjects.com/zos/raptor/1670298582680/element-select-by-color.gif" width="640">

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
  transform: [
    { type: 'stackY' },
    { type: 'sortX', by: 'y', reverse: true, slice: 5 },
  ],
  encode: {
    x: 'state',
    y: 'population',
    color: 'age',
  },
  axis: { y: { labelFormatter: '~s' } },
  state: {
    selected: { fill: 'red', linkFillOpacity: 0.5 },
    unselected: { opacity: 0.5 },
  },
  interaction: {
    elementSelectByColor: {
      link: true,
    },
  },
});

chart.render();
```

## 使用方式

配置 `elementSelectByColor` 交互有两种方式：

第一种，传入 `boolean` 设置是否开启交互。

```js
({
  type: 'interval',
  interaction: { elementSelectByColor: true }, // 采用默认配置
});
```

第二种，传入 [配置项](#配置项) 对交互进行配置。

```js
({
  type: 'interval',
  interaction: {
    elementSelectByColor: {
      link: true,
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
  interaction: { elementSelectByColor: true },
});
```

也可以配置在 View 层级，视图上声明的交互会传递给 `children` 声明的标记，如果该标记有声明对应的交互，就合并；否则不影响。

```ts
({
  type: 'view',
  interaction: { elementSelectByColor: true },
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
| single               | 是否单选，设置为 true 时每次只能选中一个颜色组                                        | `boolean`              | false  |
| multipleSelectHotkey | 多选热键的 code，按住热键后变为多选，设置此属性后`single`无效。不设置时默认为多选模式 | `string` \| `string[]` | -      |
| link                 | 是否展示连接线                                                                        | `boolean`              | false  |

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

### linkStyle

连接样式详见示例[带连接线选择](#带连接线选择)

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
    selected: {
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
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  transform: [
    { type: 'stackY' },
    { type: 'sortX', by: 'y', reverse: true, slice: 5 },
  ],
  encode: {
    x: 'state',
    y: 'population',
    color: 'age',
  },
  axis: { y: { labelFormatter: '~s' } },
  interaction: { elementSelectByColor: true },
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
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  transform: [
    { type: 'stackY' },
    { type: 'sortX', by: 'y', reverse: true, slice: 5 },
  ],
  encode: {
    x: 'state',
    y: 'population',
    color: 'age',
  },
  axis: { y: { labelFormatter: '~s' } },
  state: {
    selected: {
      offset: 10,
      radius: 50,
      fill: (d) => (d.population > 1000000 ? 'red' : '#000'),
      fillOpacity: 0.9,
      stroke: '#DAF5EC',
      strokeOpacity: 0.9,
      lineWidth: 2,
      lineDash: [4, 8],
      opacity: 1,
      shadowColor: '#d3d3d3',
      shadowBlur: 10,
      shadowOffsetX: 10,
      shadowOffsetY: 10,
      cursor: 'pointer',
      backgroundRadius: 50,
      backgroundFill: (d) => (d.population > 1000000 ? 'red' : '#000'),
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
      linkFillOpacity: 0.5,
    },
  },
  interaction: {
    elementSelectByColor: {
      background: true,
      link: true,
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
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  transform: [
    { type: 'stackY' },
    { type: 'sortX', by: 'y', reverse: true, slice: 5 },
  ],
  encode: {
    x: 'state',
    y: 'population',
    color: 'age',
  },
  axis: { y: { labelFormatter: '~s' } },
  interaction: {
    elementSelectByColor: {
      single: true, // 设置为单选模式
      background: true,
      link: true,
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
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  transform: [
    { type: 'stackY' },
    { type: 'sortX', by: 'y', reverse: true, slice: 5 },
  ],
  encode: {
    x: 'state',
    y: 'population',
    color: 'age',
  },
  axis: { y: { labelFormatter: '~s' } },
  state: {
    selected: { fill: 'red', linkFillOpacity: 0.5 },
    unselected: { opacity: 0.5 },
  },
  interaction: {
    elementSelectByColor: {
      multipleSelectHotkey: 'ShiftLeft', // 按住左 Shift 键进入多选模式
      link: true,
    },
  },
});

chart.render();
```
