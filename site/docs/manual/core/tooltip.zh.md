---
title: 提示信息
order: 11
---

**提示信息（Tooltip）** 可以提供关于数据点的额外信息，帮助用户更好地理解和解释可视化，在可视化中 Tooltip 通常具有以下作用：

- **显示详细信息**：Tooltip 可以显示有关数据点的详细信息，例如具体数值、百分比或其他相关属性。这有助于用户更深入地了解数据。
- **提高可读性**：在复杂的可视化中，Tooltip 可以帮助用户更容易地识别和理解数据点。例如，在散点图中，当数据点密集时，Tooltip 可以显示特定点的详细信息，而无需将鼠标悬停在每个点上。
- **增强交互性**：Tooltip 可以增强可视化的交互性。用户可以通过悬停或点击数据点来查看更多信息，这使得可视化更加动态和有趣。
- **突出显示关键信息**：Tooltip 可以用来突出显示关键信息。例如，在时间序列图中，您可以使用 Tooltip 显示特定时间点的重要事件或突变。

在 G2 中每个视图有一个 tooltip，其中设置了 tooltip 内容的 Mark 都会展示 tooltip。其中通过 `mark.tooltip` 去指定该 Mark 需要展示的内容，然后通过 `chart.tooltip('interaction', options)` 去指定 tooltip 的展示形式。

<img alt="tooltip" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*PWNATqmXI28AAAAAAAAAAAAADmJ7AQ/original" width="600" />

## 设置提示内容

不同的 mark 有不同的默认提示信息，可以通过 `mark.tooltip(tooltipData)` 去覆盖默认的内容。tooltipData 完整的结构如下：

```js
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

chart
  .interval()
  .data(data)
  .tooltip({
    title: (d) => (d.sold > 150 ? 'high' : 'low'), // 设置 title
    items: [
      'genre', // 第一个 item
      'sold', // 第二个 item
    ],
  });
```

在不需要设置 title 的时候，提供了两种语法糖去设置 tooltip 数据项。

```js
// 依次设置
chart.interval().tooltip('genre').tooltip('sold');

// 一次性设置
chart.interval().tooltip(['genre', 'sold']);
```

其中完整的 title 和 item 结构如下：

```ts
type Item = {
  color?: string; // marker 的颜色
  name?: string; // item 的名字
  value?: string; // item 的值
};
```

可以通过如下的方式去设置它们。

### 字段

它们的值（value）可以通过来自原始数据，通过字符串或者 `item.field` 指定。

```js
chart.tooltip({
  title: 'sold',
  items: ['genre'],
});

// 等价于
chart.tooltip({
  title: { field: 'sold' },
  items: [{ field: 'genre' }],
});
```

### 通道

它们的值（value）可以来自通道值，通过 `item.channel` 指定，常常用于使用 `mark.transform` 生成新通道的图表。

```js
chart.tooltip({
  title: { channel: 'x' },
  items: [{ channel: 'y' }],
});
```

### 格式化

可以通过 `item.valueFormatter` 去指定 title 或者 item 的值（value）的展示，`item.valueFormatter` 可以是一个函数，也可以一个 d3-format 支持的字符串。

```js
chart.tooltip({
  items: [{ channel: 'y', valueFormatter: '.0%' }],
});
```

### 自定义

当然对于 title 和 item 还提供了回调去获得最大的自定义能力。

```js
chart.tooltip({
  items: [
    (d, index, data, column) => ({
      color: d.sold > 150 ? 'red' : 'blue', // 指定 item 的颜色
      name: index === 0 ? d.genre : `${d.genre} ${data[i].genre}`, // 指定 item 的名字
      value: column.y.value[i], // 使用 y 通道的值
    }),
  ],
});
```

## 内置 Tooltip

G2 默认打开 Tooltip 交互 ，如果需要配置 Tooltip 属性，可以通过 `chart.interaction('tooltip', { ... })` 来配置。

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
  // 设置 Tooltip 的位置
  position: 'right',
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

## 关闭 tooltip

如果希望不展示该 Mark 的提示信息，可以通过 `mark.tooltip(false)` 实现。

```js
chart.interval().tooltip(false);
```

如果希望图表没有提示信息交互，可以通过 `chart.interaction` 实现。

```js
mark.interaction('tooltip', false);
```
