---
title: tooltip
---

展示提示信息。

## 开始使用

<img alt="example" src="https://gw.alipayobjects.com/zos/raptor/1669041818314/tooltip1d.gif" width="640">

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  })
  .encode('x', 'letter')
  .encode('y', 'frequency')
  .axis('y', { labelFormatter: '.0%' });

chart.interaction('tooltip');

chart.render();
```

## 选项

| 属性                       | 描述                                                              | 类型                                        | 默认值                |
| -------------------------- | ----------------------------------------------------------------- | ------------------------------------------- | --------------------- |
| wait                       | 提示信息更新的时间间隔，单位为毫秒                                | `number`                                    | 50                    |
| leading                    | 是否在时间间隔开始的时候更新提示信息                              | `boolean`                                   | true                  |
| trailing                   | 是否在时间间隔结束的时候更新提示信息                              | `boolean`                                   | false                 |
| shared                     | 相同 x 的元素是否共享 tooltip                                     | `boolean`                                   | false                 |
| series                     | 是否是系列元素的 tooltip                                          | `boolean`                                   | -                     |
| body                       | 是否展示 tooltip                                                  | `boolean`                                   | true                  |
| marker                     | 是否展示 marker                                                   | `boolean`                                   | true                  |
| groupName                  | 是否使用 groupName                                                | `boolean`                                   | true                  |
| position                   | tooltip 位置                                                      | `TooltipPosition`                           | -                     |
| mount                      | tooltip 渲染的 dom 节点                                           | `string` \| `HTMLElement`                   | 图表容器              |
| bounding                   | tooltip 渲染的限制区域，超出会自动调整位置                        | `BBox`                                      | 图表区域大小          |
| offset                     | tooltip 离鼠标的偏离位置                                          | `[number, number]`                          | [10, 10]              |
| crosshairs                 | 是否展示指示线                                                    | `boolean`                                   | -                     |
| crosshairsX                | 是否展示 X 方向指示线                                             | `boolean`                                   | -                     |
| crosshairsY                | 是否展示 Y 方向指示线                                             | `boolean`                                   | -                     |
| `crosshairs${StyleAttrs}`  | 指示线的样式                                                      | `number \| string`                          | -                     |
| `crosshairsX${StyleAttrs}` | X 方向指示线的样式（优先级更高）                                  | `number \| string`                          | -                     |
| `crosshairsY${StyleAttrs}` | Y 方向指示线的样式 （优先级更高）                                 | `number \| string`                          | -                     |
| `marker${StyleAttrs}`      | marker 的样式                                                     | `number \| string`                          | -                     |
| markerType                 | marker 的类型                                                     | `'hollow' \| undefined`                     | undefined             |
| render                     | 自定义 tooltip 渲染函数                                           | `(event, options) => HTMLElement \| string` | -                     |
| sort                       | item 排序器                                                       | `(d: TooltipItemValue) => any`              | -                     |
| filter                     | item 筛选器                                                       | `(d: TooltipItemValue) => any`              | -                     |
| disableNative              | 是否响应原生事件（pointerover 和 pointerout）                     | true                                        | `boolean`             |
| css                        | 设置容器的 [css](/examples/component/tooltip/#tooltip-style) 样式 | -                                           | `Record<string, any>` |

```ts
type TooltipPosition =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

type BBox = { x: number; y: number; width: number; height: number };
```

## 案例

### 自定义 Tooltip

<img alt="custom-tooltip" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*WcxIS4inFuoAAAAAAAAAAAAADmJ7AQ/original" width="600" />

```tsx
import React from 'react';
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  })
  .transform([{ type: 'sortX', by: 'y', reverse: true, slice: 5 }])
  .encode('x', 'letter')
  .encode('y', 'frequency');

chart.interaction('tooltip', {
  // render 回调方法返回一个innerHTML 或者 ReactNode
  render: (event, { title, items }) =>
    `<div>Your custom render content here.</div>`,
});

chart.render();
```

### 获得提示数据

```js
chart.on('tooltip:show', (event) => {
  console.log(event.data.data);
});

chart.on('tooltip:hide', () => {
  console.log('hide');
});
```

### 手动控制展示/隐藏

对于 Interval、Point 等非系列 Mark，控制展示的方式如下：

```js
// 条形图、点图等
chart
  .interval()
  .data([
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ])
  .encode('x', 'genre')
  .encode('y', 'sold')
  .encode('color', 'genre');

chart.render().then((chart) =>
  chart.emit('tooltip:show', {
    offsetX: 10, // 相对于 plot 区域的位置
    offsetX: 20, // 相对于 plot 区域的位置
    data: {
      data: { genre: 'Sports' }, // 会找从原始数据里面找到匹配的数据
    },
  }),
);
```

对于 Line、Area 等系列 Mark，控制展示的方式如下：

```js
chart
  .line()
  .data({ type: 'fetch', value: 'data/aapl.csv' })
  .encode('x', 'date')
  .encode('y', 'close');

// 根据数据拾取
chart.render((chart) =>
  chart.emit('tooltip:show', {
    data: {
      data: { x: new Date('2010-11-16') },
    },
  }),
);

// 根据像素拾取
chart.render((chart) =>
  chart.emit('tooltip:show', {
    offsetX: 200,
    offsetY: 200,
  }),
);
```

隐藏的方式如下：

```js
chart.emit('tooltip:hide');
```

### 开始/禁止交互

```js
chart.emit('tooltip:disable'); // 禁用 tooltip
chart.emit('tooltip:enable'); // 启用交互
```

### 设置十字辅助线

默认情况下，`crossharisY`是开启的，`crosshairsX`是关闭的，所以如果要开启十字辅助线，有以下两种方式。

1. 设置`crosshairs`为`true`。

```js
chart.interaction('tooltip', {
  crosshairs: true, // 开启十字辅助线
  crosshairsXStroke: 'red', // 设置 X 轴辅助线颜色为'red'
  crosshairsYStroke: 'blue', // 设置 Y 轴辅助线颜色为'blue'
});
```

2. 设置`crosshairsX`为`true`。

```js
chart.interaction('tooltip', {
  crosshairsX: true, // 开启crosshairsX辅助线
  crosshairsXStroke: 'red', // 设置 X 轴辅助线颜色为'red'
  crosshairsYStroke: 'blue', // 设置 Y 轴辅助线颜色为'blue'
});
```

`crosshairsX`的优先级大于`crosshairs`的优先级。

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*_LFDT7p6hRQAAAAAAAAAAAAADmJ7AQ/original" width="640">

### 设置提示点为空心圆

```js
chart.interaction('tooltip', {
  markerType: 'hollow', // 设置提示点的样式为空心圆
});
```

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*s8KjQLiSyTwAAAAAAAAAAAAADmJ7AQ/original" width="640">
