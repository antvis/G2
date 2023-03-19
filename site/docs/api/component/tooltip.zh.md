---
title: tooltip
order: 1
---

## 开始使用

提示（Tooltip）可以提供关于数据点的额外信息，帮助用户更好地理解和解释可视化。

<img alt="tooltip" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*PWNATqmXI28AAAAAAAAAAAAADmJ7AQ/original" width="600" />

如果想要关闭 Tooltip，可以将 Tooltip 的属性设置为 `false`: `mark.tooltip(false);`

## 内置 Tooltip 样式

<img alt="built-in-tooltip" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*r95yTqow_1EAAAAAAAAAAAAADmJ7AQ/original" width="600" />

```js
chart
  .line()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/indices.json',
  })
  .encode('x', (d) => new Date(d.Date))
  .encode('y', 'Close')
  .encode('color', 'Symbol')
  .encode('key', 'Symbol')
  .scale('y', { type: 'log' });

chart.interaction('tooltip', {
  // 设置 Tooltip 的位置，为 'auto' 时会自动调整 Tooltip 使其不会超出图表区域
  position: 'auto',
});
```

## 自定义 Tooltip

<img alt="custom-tooltip" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*WcxIS4inFuoAAAAAAAAAAAAADmJ7AQ/original" width="600" />

```tsx
import React from 'react';
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
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
  render: (event, { title, items }) => (
    <div>Your custom render content here.</div>
  ),
});

chart.render();
```

## 选项

| 属性     | 描述                                                                          | 类型                              | 默认值         |
| -------- | ----------------------------------------------------------------------------- | --------------------------------- | -------------- |
| title    | 标题，支持一段文本或 innerHTML 字符串                                         | `string`                          | \-             |
| items    | 定义每一个提示项的配置                                                        | `TooltipItem`                     | \-             |
| render   | 自定义 Tooltip 渲染内容                                                       | `()=> string      \| HTMLElement` | \-             |
| position | Tooltip 相对于指针的位置，为 'auto' 时会自动调整 Tooltip 使其不会超出图表区域 | `TooltipPosition`                 | 'right-bottom' |

<!-- | enterable | 指针是否可以进入`提示` 区域 | `boolean` | false | -->

```ts
type Item =
  | string
  | {
      name?: string;
      color?: string;
      channel?: string;
      field?: string;
      value?: string;
      // 格式化 tooltip item 的值（支持 d3-format 对应的字符串）
      valueFormatter?: string | ((d: any) => string);
    };
type TooltipItem = null | Item;

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

## 用法示例

**指定 items**

```js
// 单个字段
mark.tooltip('a');

// 单个 transform
mark.tooltip((d) => (d.value > 100 ? d.name : d.age));

// 完整信息
mark.tooltip({ name: 'name', color: 'red', value: 'color' });

// 多个字断
mark.tooltip(['a', 'b']);
```

**指定 title**

```js
mark.tooltip({
  title: 'name', // 字段
});

mark.tooltip({
  title: (d) => (d.value > 100 ? d.name : d.age), // transform
});
```
