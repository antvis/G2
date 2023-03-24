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

| 属性                      | 描述                                 | 类型                                        | 默认值 |
| ------------------------- | ------------------------------------ | ------------------------------------------- | ------ |
| wait                      | 提示信息更新的时间间隔，单位为毫秒   | `number`                                    | 50     |
| leading                   | 是否在时间间隔开始的时候更新提示信息 | `boolean`                                   | true   |
| trailing                  | 是否在时间间隔结束的时候更新提示信息 | `boolean`                                   | false  |
| shared                    | 相同 x 的元素是否共享 tooltip        | `boolean`                                   | false  |
| series                    | 是否是系列元素的 tooltip             | `boolean`                                   | -      |
| body                      | 是否展示 tooltip                     | `boolean`                                   | true   |
| groupName                 | 是否使用 groupName                   | `boolean`                                   | true   |
| position                  | tooltip 位置                         | `TooltipPosition`                           | -      |
| crosshairs                | 是否暂时指示线                       | `boolean`                                   | -      |
| `crosshairs${StyleAttrs}` | 指示线的样式                         | `number \| string`                          | -      |
| render                    | 自定义 tooltip 渲染函数              | `(event, options) => HTMLElement \| string` | -      |
| sort                      | item 排序器                          | `(d: TooltipItemValue) => any`              | -      |
| filter                    | item 筛选器                          | `(d: TooltipItemValue) => any`              | -      |

```ts
type TooltipPosition =
  | 'auto'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';
```

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
