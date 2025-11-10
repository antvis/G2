---
title: elementHoverScale
order: 11
---

## 概述

`elementHoverScale` 交互的对象是图表元素 element，当鼠标悬浮在元素上时，将该元素放大并添加阴影效果，提供更强的视觉反馈。这个交互特别适用于饼图、环图等需要突出显示单个元素的场景。

- 触发：鼠标悬浮在元素上
- 结束：鼠标移出元素
- 影响状态：悬浮的元素变为 `active` 状态
- 视觉效果：元素放大、提升层级、添加阴影

<img alt="hover-scale-pie" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*oPIvT4UxolEAAAAAU5AAAAgAemJ7AQ/original" width="640">
<img alt="hover-scale-donut" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*WZ0bTbATWVEAAAAAVtAAAAgAemJ7AQ/original" width="640">
<img alt="hover-scale-group" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*vQKWQJmG3tQAAAAAUIAAAAgAemJ7AQ/original" width="640">

## 使用方式

配置 `elementHoverScale` 交互有两种方式：

第一种，传入 `boolean` 设置是否开启交互。

```js
({
  type: 'interval',
  interaction: { elementHoverScale: true }, // 采用默认配置
});
```

第二种，传入 [配置项](#配置项) 对交互进行配置。

```js
({
  type: 'interval',
  interaction: {
    elementHoverScale: {
      scale: 1.1,
      shadow: true,
      shadowColor: 'rgba(0, 0, 0, 0.5)',
    },
  },
});
```

## 配置层级

交互可以配置在 Mark 层级：

```js
({
  type: 'interval',
  interaction: { elementHoverScale: true },
});
```

也可以配置在 View 层级，视图上声明的交互会传递给 `children` 声明的标记，如果该标记有声明对应的交互，就合并；否则不影响。

```js
({
  type: 'view',
  interaction: { elementHoverScale: true },
});
```

## 配置项

| 属性          | 描述                     | 类型       | 默认值                  | 必选 |
| ------------- | ------------------------ | ---------- | ----------------------- | ---- |
| scale         | 缩放比例                 | `number`   | `1.04`                  |      |
| scaleOrigin   | 缩放中心点               | `string`   | `'center center'`       |      |
| shadow        | 是否显示阴影             | `boolean`  | `true`                  |      |
| shadowColor   | 阴影颜色                 | `string`   | `'rgba(0, 0, 0, 0.4)'`  |      |
| shadowBlur    | 阴影模糊度               | `number`   | `10`                    |      |
| shadowOffsetX | 阴影水平偏移             | `number`   | `0`                     |      |
| shadowOffsetY | 阴影垂直偏移             | `number`   | `2`                     |      |
| zIndex        | 悬浮时的层级             | `number`   | `10`                    |      |
| delay         | 鼠标移出后延迟重置的时间 | `number`   | `60` (单位: 毫秒)       |      |
| createGroup   | 自定义分组函数           | `function` | `(d) => d` (按数据分组) |      |

### 配置详解

#### scale

控制元素悬浮时的放大倍数。值为 `1.04` 表示放大到原始大小的 104%。

#### scaleOrigin

设置缩放的中心点，支持以下格式：

- `'center center'` - 从中心点缩放（默认）
- `'top left'` - 从左上角缩放
- `'50% 50%'` - 使用百分比指定

#### shadow

是否在悬浮时添加阴影效果。阴影可以增强视觉层次感。

#### createGroup

自定义分组函数，用于控制哪些元素应该一起响应悬浮效果。默认情况下，每个元素独立响应。

```js
// 示例：按 category 字段分组
createGroup: (data) => data.category;
```

## 事件

### 监听事件

支持以下的事件：

- `element:hoverscale` - 元素悬浮缩放时触发
- `element:unhoverscale` - 元素取消悬浮缩放时触发

```js
chart.on('element:hoverscale', (e) => {
  console.log(e.data.data); // 当前悬浮元素的数据
  console.log(e.data.group); // 同组元素的数据数组
  console.log(e.nativeEvent); // 原生事件
});

chart.on('element:unhoverscale', (e) => {
  console.log(e.nativeEvent);
});
```

### 触发交互

支持以下的事件：

- `element:hoverscale` - 触发元素缩放
- `element:unhoverscale` - 取消元素缩放

```js
chart.emit('element:hoverscale', {
  data: { data: { category: 'A', value: 100 } },
});

chart.emit('element:unhoverscale', {});
```

## 示例

### 饼图悬浮放大

这是 `elementHoverScale` 最常见的应用场景，在饼图中突出显示悬浮的扇区：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  height: 400,
  data: [
    { item: '事例一', count: 40, percent: 0.4 },
    { item: '事例二', count: 21, percent: 0.21 },
    { item: '事例三', count: 17, percent: 0.17 },
    { item: '事例四', count: 13, percent: 0.13 },
    { item: '事例五', count: 9, percent: 0.09 },
  ],
  coordinate: { type: 'theta', outerRadius: 0.8 },
  transform: [{ type: 'stackY' }],
  encode: {
    y: 'percent',
    color: 'item',
  },
  legend: { color: { position: 'bottom' } },
  labels: [
    {
      text: 'item',
      position: 'outside',
      fontSize: 12,
    },
    {
      text: (d) => `${(d.percent * 100).toFixed(0)}%`,
      position: 'inside',
      fontSize: 14,
      fontWeight: 'bold',
      fill: '#fff',
    },
  ],
  interaction: {
    elementHoverScale: true,
  },
});

chart.render();
```

### 环图悬浮效果

环图同样适合使用 `elementHoverScale` 交互：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  height: 400,
  data: [
    { item: '事例一', count: 40, percent: 0.4 },
    { item: '事例二', count: 21, percent: 0.21 },
    { item: '事例三', count: 17, percent: 0.17 },
    { item: '事例四', count: 13, percent: 0.13 },
    { item: '事例五', count: 9, percent: 0.09 },
  ],
  coordinate: { type: 'theta', innerRadius: 0.5, outerRadius: 0.8 },
  transform: [{ type: 'stackY' }],
  encode: {
    y: 'percent',
    color: 'item',
  },
  legend: { color: { position: 'bottom' } },
  labels: [
    {
      text: 'item',
      position: 'spider',
      fontSize: 12,
    },
  ],
  interaction: {
    elementHoverScale: {
      scale: 1.08,
      shadow: true,
      shadowColor: 'rgba(0, 0, 0, 0.5)',
      shadowBlur: 15,
    },
  },
});

chart.render();
```

### 柱状图悬浮效果

柱状图中也可以使用 `elementHoverScale` 来突出显示：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  height: 300,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  },
  encode: { x: 'letter', y: 'frequency' },
  transform: [{ type: 'sortX', by: 'y', reverse: true, slice: 6 }],
  axis: { y: { labelFormatter: '.0%' } },
  interaction: {
    elementHoverScale: {
      scale: 1.05,
      shadow: true,
    },
  },
});

chart.render();
```

### 自定义缩放配置

通过配置项可以完全自定义悬浮效果：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  height: 400,
  data: [
    { category: 'A', value: 27 },
    { category: 'B', value: 25 },
    { category: 'C', value: 18 },
    { category: 'D', value: 15 },
    { category: 'E', value: 10 },
    { category: 'F', value: 5 },
  ],
  coordinate: { type: 'theta', outerRadius: 0.75 },
  transform: [{ type: 'stackY' }],
  encode: { y: 'value', color: 'category' },
  legend: { color: { position: 'right' } },
  style: {
    stroke: '#fff',
    lineWidth: 2,
  },
  interaction: {
    elementHoverScale: {
      scale: 1.15, // 更大的缩放比例
      scaleOrigin: 'center center',
      shadow: true,
      shadowColor: 'rgba(139, 0, 139, 0.6)', // 自定义阴影颜色
      shadowBlur: 20, // 更大的模糊半径
      shadowOffsetX: 5, // 水平偏移
      shadowOffsetY: 5, // 垂直偏移
      zIndex: 20, // 更高的层级
      delay: 100, // 延迟 100ms 恢复
    },
  },
});

chart.render();
```

### 分组悬浮效果

使用 `createGroup` 可以实现多个元素联动的悬浮效果：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const data = [
  { year: '2018', type: 'A', value: 100 },
  { year: '2018', type: 'B', value: 80 },
  { year: '2019', type: 'A', value: 120 },
  { year: '2019', type: 'B', value: 90 },
  { year: '2020', type: 'A', value: 140 },
  { year: '2020', type: 'B', value: 110 },
  { year: '2021', type: 'A', value: 160 },
  { year: '2021', type: 'B', value: 130 },
];

chart.options({
  type: 'interval',
  height: 300,
  data,
  encode: {
    x: 'year',
    y: 'value',
    color: 'type',
  },
  transform: [{ type: 'dodgeX' }],
  interaction: {
    elementHoverScale: {
      scale: 1.08,
      // 按 type 分组，悬浮时同类型的柱子一起放大
      createGroup: (view) => (d) => d.type,
    },
  },
});

chart.render();
```
