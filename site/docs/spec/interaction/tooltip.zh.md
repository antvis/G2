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
  theme: 'classic',
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

| 属性                      | 描述                                         | 类型                                        | 默认值       |
| ------------------------- | -------------------------------------------- | ------------------------------------------- | ------------ |
| wait                      | 提示信息更新的时间间隔，单位为毫秒           | `number`                                    | 50           |
| leading                   | 是否在时间间隔开始的时候更新提示信息         | `boolean`                                   | true         |
| trailing                  | 是否在时间间隔结束的时候更新提示信息         | `boolean`                                   | false        |
| shared                    | 相同 x 的元素是否共享 tooltip                | `boolean`                                   | false        |
| series                    | 是否是系列元素的 tooltip                     | `boolean`                                   | -            |
| body                      | 是否展示 tooltip                             | `boolean`                                   | true         |
| marker                    | 是否展示 marker                              | `boolean`                                   | true         |
| groupName                 | 是否使用 groupName                           | `boolean`                                   | true         |
| position                  | tooltip 位置                                 | `TooltipPosition`                           | -            |
| mount                     | tooltip 渲染的 dom 节点                      | `string` \| `HTMLElement`                   | 图表容器     |
| bounding                  | tooltip 渲染的限制区域，超出会自动调整位置   | `BBox`                                      | 图表区域大小 |
| crosshairs                | 是否暂时指示线                               | `boolean`                                   | -            |
| `crosshairs${StyleAttrs}` | 指示线的样式                                 | `number \| string`                          | -            |
| `marker${StyleAttrs}`     | marker 的样式                                | `number \| string`                          | -            |
| render                    | 自定义 tooltip 渲染函数                      | `(event, options) => HTMLElement \| string` | -            |
| sort                      | item 排序器                                  | `(d: TooltipItemValue) => any`              | -            |
| filter                    | item 筛选器                                  | `(d: TooltipItemValue) => any`              | -            |
| disableNative             | 是否响应原生事件（pointerover 和 pointerout) | true                                        | `boolean`    |

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
  theme: 'classic',
  theme: 'classic',
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
    data: {
      // 会找从原始数据里面找到匹配的数据
      data: { genre: 'Sports' },
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

chart.render((chart) =>
  chart.emit('tooltip:show', {
    data: {
      data: { x: new Date('2010-11-16') },
    },
  }),
);
```

隐藏的方式如下：

```js
chart.emit('tooltip:hide');
```
