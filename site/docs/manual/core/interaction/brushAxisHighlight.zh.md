---
title: brushAxisHighlight
order: 2
---

## 概述

`brushAxisHighlight` 交互的对象是坐标轴，通过在坐标轴上框选区域来高亮显示对应的图表元素。这种交互方式特别适合于平行坐标系图表，可以帮助用户快速筛选和分析多维数据。

- **触发**：在坐标轴上进行框选操作。
- **结束**：点击非框选范围的坐标轴区域或双击已有的框选区域。
- **影响状态**：
  - 框选范围内的元素变为 `active` 状态。
  - 框选范围外的元素变为 `inactive` 状态。

交互内置状态：

```js
({
  // 定义 inactive 状态下的元素透明度为0.5
  state: { inactive: { opacity: 0.5 } },
});
```

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*y-afSbt4oroAAAAAAAAAAAAADmJ7AQ/original" width="640">

## 使用方式

配置 `brushAxisHighlight` 交互有两种方式：

第一种，传入 `boolean` 设置是否开启交互。

```js
({
  type: 'line',
  interaction: { brushAxisHighlight: true }, // 采用默认配置
});
```

第二种，传入 [配置项](#配置项) 对交互进行配置。

```js
({
  type: 'line',
  interaction: {
    brushAxisHighlight: {
      maskFill: 'red',
      maskOpacity: 0.8,
    },
  },
});
```

## 配置层级

交互可以配置在 Mark 层级：

```js
({
  type: 'line',
  interaction: { brushAxisHighlight: true },
});
```

也可以配置在 View 层级，视图上声明的交互会传递给 `children` 声明的标记：

```js
({
  type: 'view',
  interaction: { brushAxisHighlight: true },
  children: [
    {
      type: 'line',
      // 继承父级的交互配置
    },
  ],
});
```

## 配置项

| 属性            | 描述                                                                             | 类型                            | 默认值                                                                                          | 必选 |
| --------------- | -------------------------------------------------------------------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------- | ---- |
| reverse         | brush 是否反转，反转后选中区域外的元素会被高亮                                   | `boolean`                       | `false`                                                                                         |      |
| facet           | brush 是否跨分面，控制交互方式                                                   | `boolean`                       | `false`                                                                                         |      |
| selectedHandles | 可以 resize 的手柄方向                                                           | `string[]`                      | `['handle-n','handle-e','handle-s','handle-w','handle-nw','handle-ne','handle-se','handle-sw']` |      |
| brushRegion     | 自定义框选区域，一般不用配置，G2 内部用来配置 brushXHighlight 和 brushYHighlight | `(x, y, x1, y1, extent) => any` | `(x, y, x1, y1) => [x, y, x1, y1]`                                                              |      |
| mask            | 框选区域的蒙版样式                                                               | 对象                            | 详见下方 mask 部分                                                                              |      |
| maskHandle      | 框选区域的手柄样式                                                               | 对象                            | 详见下方 maskHandle 部分                                                                        |      |

### mask

配置框选区域的蒙版的样式。

| 属性              | 描述                                                                   | 类型              | 默认值    | 必选 |
| ----------------- | ---------------------------------------------------------------------- | ----------------- | --------- | ---- |
| maskFill          | 蒙版的填充色                                                           | `string`          | `#777`    |      |
| maskFillOpacity   | 蒙版的填充透明度                                                       | `number`          | `0.3`     |      |
| maskStroke        | 蒙版的描边                                                             | `string`          | `#fff`    |      |
| maskStrokeOpacity | 描边透明度                                                             | `number`          |           |      |
| maskLineWidth     | 蒙版描边的宽度                                                         | `number`          |           |      |
| maskLineDash      | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离 | `[number,number]` |           |      |
| maskOpacity       | 蒙版的整体透明度                                                       | `number`          |           |      |
| maskShadowColor   | 蒙版阴影颜色                                                           | `string`          |           |      |
| maskShadowBlur    | 蒙版阴影的高斯模糊系数                                                 | `number`          |           |      |
| maskShadowOffsetX | 设置阴影距蒙版的水平距离                                               | `number`          |           |      |
| maskShadowOffsetY | 设置阴影距蒙版的垂直距离                                               | `number`          |           |      |
| maskCursor        | 鼠标样式。同 css 的鼠标样式                                            | `string`          | `default` |      |

在配置框选区域的蒙版样式的时候，不是以对象的形式来配置，而是以 `mask`前缀加属性的方式来配置。

```js
({
  interaction: {
    brushAxisHighlight: {
      maskFill: '#000',
      maskFillOpacity: 0.2,
      maskStroke: 'red',
      maskStrokeOpacity: 0.9,
      maskLineWidth: 2,
      maskLineDash: [4, 8],
      maskOpacity: 0.2,
      maskShadowColor: '#d3d3d3',
      maskShadowBlur: 10,
      maskShadowOffsetX: 10,
      maskShadowOffsetY: 10,
      maskCursor: 'pointer',
    },
  },
});
```

### maskHandle

八个方向的 handle 的名字分别如下（按照东南西北命名），按照 `mask[handleName][styleAttribute]` 格式设置对应的属性，也可以通过 `maskHandleSize` 设置宽度。

![custom-style](https://github.com/antvis/G2/assets/49330279/eb2d3951-7990-423c-97f3-e3a38b2baf68)

| 属性                          | 描述                                                                   | 类型                                      | 默认值    | 必选 |
| ----------------------------- | ---------------------------------------------------------------------- | ----------------------------------------- | --------- | ---- |
| mask[handleName]Render        | 自定义蒙版手柄的渲染函数                                               | `(g, options, document) => DisplayObject` |           |      |
| mask[handleName]Size          | 蒙版手柄的宽度                                                         | `string`                                  |           |      |
| mask[handleName]Fill          | 蒙版手柄的填充色                                                       | `string`                                  |           |      |
| mask[handleName]FillOpacity   | 蒙版手柄的填充透明度                                                   | `number`                                  |           |      |
| mask[handleName]Stroke        | 蒙版手柄的描边                                                         | `string`                                  |           |      |
| mask[handleName]StrokeOpacity | 描边透明度                                                             | `number`                                  |           |      |
| mask[handleName]LineWidth     | 蒙版手柄描边的宽度                                                     | `number`                                  |           |      |
| mask[handleName]LineDash      | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离 | `[number,number]`                         |           |      |
| mask[handleName]Opacity       | 蒙版手柄的整体透明度                                                   | `number`                                  |           |      |
| mask[handleName]ShadowColor   | 蒙版手柄阴影颜色                                                       | `string`                                  |           |      |
| mask[handleName]ShadowBlur    | 蒙版手柄阴影的高斯模糊系数                                             | `number`                                  |           |      |
| mask[handleName]ShadowOffsetX | 设置阴影距蒙版手柄的水平距离                                           | `number`                                  |           |      |
| mask[handleName]ShadowOffsetY | 设置阴影距蒙版手柄的垂直距离                                           | `number`                                  |           |      |
| mask[handleName]Cursor        | 鼠标样式。同 css 的鼠标样式                                            | `string`                                  | `default` |      |

## 事件

### 监听事件

支持以下的事件：

- `brushAxis:start` - 开始创建 brush 的时候触发
- `brushAxis:end` - brush 更新大小和位置完成时候触发
- `brushAxis:remove` - brush 移除的时候触发
- `brushAxis:highlight` - brush 改变大小和位置时触发

```js
chart.on('brushAxis:highlight', (event) => {
  const { data, nativeEvent } = event;
  if (nativeEvent) console.log('brushAxis:highlight', data);
});

chart.on('brushAxis:remove', (event) => {
  const { data, nativeEvent } = event;
  if (nativeEvent) console.log('brushAxis:remove', data);
});
```

### 触发交互

支持以下的事件：

- `brushAxis:highlight` - 高亮数据
- `brushAxis:remove` - 移除 brush

```js
chart.emit('brushAxis:highlight', {
  data: { selection: [[20, 30], undefined, [100, 300]] },
});

chart.emit('brushAxis:remove', {});
```

## 示例

### 平行坐标系框选高亮

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const axis = {
  zIndex: 1,
  titlePosition: 'right',
  line: true,
  style: {
    labelStroke: '#fff',
    labelStrokeWidth: 5,
    labelFontSize: 10,
    labelStrokeLineJoin: 'round',
    titleStroke: '#fff',
    titleFontSize: 10,
    titleStrokeWidth: 5,
    titleStrokeLineJoin: 'round',
    titleTransform: 'translate(-50%, 0) rotate(-90)',
    lineStroke: 'black',
    tickStroke: 'black',
    lineStrokeWidth: 1,
  },
};

chart.options({
  type: 'line',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/cars3.json',
  },
  coordinate: { type: 'parallel' },
  encode: {
    position: [
      'economy (mpg)',
      'cylinders',
      'displacement (cc)',
      'power (hp)',
      'weight (lb)',
      '0-60 mph (s)',
      'year',
    ],
    color: 'weight (lb)',
  },
  style: {
    lineWidth: 1.5,
    strokeOpacity: 0.4,
  },
  scale: {
    color: {
      type: 'sequential',
      palette: 'brBG',
      offset: (t) => 1 - t,
    },
  },
  legend: {
    color: {
      length: 400,
      layout: { justifyContent: 'center' },
    },
  },
  state: {
    active: { lineWidth: 5 },
    inactive: { stroke: '#eee', opacity: 0.5 },
  },
  axis: Object.fromEntries(
    Array.from({ length: 7 }, (_, i) => [
      `position${i === 0 ? '' : i}`,
      {
        ...axis,
        title: true,
      },
    ]),
  ),
  interaction: {
    brushAxisHighlight: {
      maskFill: '#000',
      maskFillOpacity: 0.2,
      maskStroke: '#1890ff',
      maskLineWidth: 1,
    },
    tooltip: false,
  },
});

chart.render();
```

### 自定义手柄样式

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'point',
  data: [
    { x: 10, y: 5, category: 'A' },
    { x: 15, y: 8, category: 'A' },
    { x: 20, y: 12, category: 'A' },
    { x: 25, y: 15, category: 'A' },
    { x: 30, y: 10, category: 'B' },
    { x: 35, y: 7, category: 'B' },
    { x: 40, y: 13, category: 'B' },
    { x: 45, y: 18, category: 'B' },
    { x: 50, y: 20, category: 'C' },
    { x: 55, y: 16, category: 'C' },
    { x: 60, y: 9, category: 'C' },
    { x: 65, y: 6, category: 'C' },
  ],
  encode: {
    color: 'category',
    x: 'x',
    y: 'y',
  },
  state: {
    inactive: { stroke: 'gray', opacity: 0.5 },
  },
  interaction: {
    brushAxisHighlight: {
      maskHandleSize: 20,
      maskHandleNFill: 'blue',
      maskHandleEFill: 'red',
      maskHandleSFill: 'green',
      maskHandleWFill: 'yellow',
      maskHandleNWFill: 'black',
      maskHandleNEFill: 'steelblue',
      maskHandleSEFill: 'pink',
      maskHandleSWFill: 'orange',
    },
  },
});

chart.render();
```
