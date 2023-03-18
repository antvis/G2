---
title: 提示
order: 11
---

**提示（Tooltip）** 可以提供关于数据点的额外信息，帮助用户更好地理解和解释可视化，在可视化中 Tooltip 通常具有以下作用：

**显示详细信息**：Tooltip 可以显示有关数据点的详细信息，例如具体数值、百分比或其他相关属性。这有助于用户更深入地了解数据。
**提高可读性**：在复杂的可视化中，Tooltip 可以帮助用户更容易地识别和理解数据点。例如，在散点图中，当数据点密集时，Tooltip 可以显示特定点的详细信息，而无需将鼠标悬停在每个点上。
**增强交互性**：Tooltip 可以增强可视化的交互性。用户可以通过悬停或点击数据点来查看更多信息，这使得可视化更加动态和有趣。
**突出显示关键信息**：Tooltip 可以用来突出显示关键信息。例如，在时间序列图中，您可以使用 Tooltip 显示特定时间点的重要事件或突变。

在 G2 中你可以使用内置的 Tooltip，也可以自定义 Tooltip。内置的 Tooltip 会默认开启，当指针经过图表中的图形元素时，会自动显示 Tooltip。

<img alt="tooltip" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*PWNATqmXI28AAAAAAAAAAAAADmJ7AQ/original" width="600" />

如果想要关闭 Tooltip，可以将 Tooltip 的属性设置为 `false`: `mark.tooltip(false);`

## 内置 Tooltip 样式

G2 默认打开 Tooltip ，如果需要配置 Tooltip 属性，可以通过 `chart.interaction('tooltip', { ... })` 来配置。

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

有时候内置的 Tooltip 无法满足需求，这时候可以通过自定义 Tooltip 来实现。

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
