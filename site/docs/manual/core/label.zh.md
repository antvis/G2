---
title: 数据标签（Label）
order: 6.95
---

G2 中**数据标签（Label）** 是给图表添加标注的手段之一。可以给标记添加多个标签：

```js
({
  type: 'interval',
  labels: [
    {
      text: 'genre', // 指定绑定的字段
      dy: -15, // 指定样式
    },
    {
      text: 'sold', // 指定绑定的字段
      fill: '#fff', // 指定样式
      dy: 5,
    },
  ],
});
```

```js
// API 方式
// 第一种方式
chart
  .interval()
  .label({
    text: 'genre', // 指定绑定的字段
    dy: -15, // 指定样式
  })
  .label({
    text: 'sold', // 指定绑定的字段
    fill: '#fff', // 指定样式
    dy: 5,
  });

// 第二种方式
chart.interval().label([
  {
    text: 'genre', // 指定绑定的字段
    dy: -15, // 指定样式
  },
  {
    text: 'sold', // 指定绑定的字段
    fill: '#fff', // 指定样式
    dy: 5,
  },
]);
```

在 View 层级可以通过 `labelTransform` 声明标签转化：

```js
({
  type: 'view',
  labelTransform: [{ type: 'overlapHide' }, { type: 'contrastReverse' }],
});
```

```js
// API 方式
// 第一种方式
chart
  .labelTransform({ type: 'overlapHide' })
  .labelTransform({ type: 'contrastReverse' });

// 第二种方式
chart.labelTransform([{ type: 'overlapHide' }, { type: 'contrastReverse' }]);
```

## 标记标签

每一个标记都可以有多个标签，一个标签的配置大概如下：

```js
({
  type: 'interval',
  labels: [
    {
      text: 'name', // 绑定的字段或者一个常量字符串
      dy: -2, // @antv/g 支持的样式
      fill: 'red', // @antv/g 支持的样式
      selector: 'last', // 选择器
      transform: [], // 标签转换
    },
  ],
});
```

下面是一个简单的例子：

```js | ob
(() => {
  const chart = new G2.Chart();

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
    // 声明第一个 label
    .label({
      text: 'genre', // 指定绑定的字段
      style: {
        dy: -15, // 指定样式
      },
    })
    // 声明第二个 label
    .label({
      text: 'sold', // 指定绑定的字段
      style: {
        fill: '#fff', // 指定样式
        dy: 5,
      },
    });

  chart.render();

  return chart.getContainer();
})();
```

## 选择器

对于一个图形对应多个数据项的标记来说，我们可以通过 `selector` 去选择需要保留的标记。目前支持的值如下：

- **first** - 第一个
- **last** - 最后一个
- `function` - 自定义选择器

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .line()
    .data({
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/indices.json',
    })
    .transform({ type: 'normalizeY', basis: 'first', groupBy: 'color' })
    .encode('x', (d) => new Date(d.Date))
    .encode('y', 'Close')
    .encode('color', 'Symbol')
    .axis('y', { title: '↑ Change in price (%)' })
    .label({
      text: 'Symbol',
      selector: 'last', // 选择最后一个
      style: {
        fontSize: 10,
      },
    });
  chart.render();

  return chart.getContainer();
})();
```

## 标签转换

当标签的展示不符合预期的时候，比如重叠、颜色不明显，我们可以使用**标签转换（Label Transform）** 来优化标签的展示。

可以发现在下面的例子中，2004 等时间对应的标签已经重合了。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .line()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/cb99c4ab-e0a3-4c76-9586-fe7fa2ff1a8c.csv',
    })
    .transform({ type: 'groupX', y: 'mean' })
    .encode('x', (d) => new Date(d.date).getFullYear())
    .encode('y', 'price')
    .encode('color', 'symbol')
    .label({
      text: 'price',
      fontSize: 10,
    })
    .tooltip({ channel: 'y', valueFormatter: '.1f' });

  chart.render();

  return chart.getContainer();
})();
```

这个时候我们就可以给对应的标签设置标签转换：overlapDodgeY，用于防止标签的 y 方向重叠。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .line()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/cb99c4ab-e0a3-4c76-9586-fe7fa2ff1a8c.csv',
    })
    .transform({ type: 'groupX', y: 'mean' })
    .encode('x', (d) => new Date(d.date).getFullYear())
    .encode('y', 'price')
    .encode('color', 'symbol')
    .label({
      text: 'price',
      transform: [{ type: 'overlapDodgeY' }], // 指定 labelTransform
      fontSize: 10,
    })
    .tooltip({ channel: 'y', valueFormatter: '.1f' });

  chart.render();

  return chart.getContainer();
})();
```

## 视图级别的标签转换

标签转换也能声明到视图层级，对整个视图的标签做处理。

```js
({
  type: 'view',
  labelTransform: [],
});
```
