---
title: 样式（Style）
order: 6.6
---

G2 中**样式（Style）** 主要用来控制标记和视图的视觉样式。支持的样式参考 @antv/g 支持的样式。

标记可以设置自己的样式，也可以设置视图的样式：

```js
({
  type: 'interval',
  style: {
    // 自己的样式
    stroke: 'black',
    strokeWidth: 2,
  },
  viewStyle: {
    // 视图的样式
    viewFill: 'red',
    contentFill: 'yellow',
  },
});
```

```js
// API
// 第一种方式
chart
  .interval()
  .style('stroke', 'black')
  .style('strokeWidth', 2)
  .viewStyle('viewFill', 'red')
  .viewStyle('contentFill', 'yellow');

// 第二种方式
chart
  .interval()
  .style({
    stroke: 'black',
    strokeWidth: 2,
  })
  .viewStyle({
    viewFill: 'red',
    contentFill: 'yellow',
  });
```

视图可以设置自己的样式：

```js
({
  type: 'view',
  style: {
    viewFill: 'red',
    contentFill: 'yellow',
  },
});
```

```js
// API
// 第一种方式
chart.style('viewFill', 'red').style('contentFill', 'yellow');

// 第二种方式
chart.style({
  viewFill: 'red',
  contentFill: 'yellow',
});
```

## 标记样式

标记的视觉属性除了可以通过 `mark.encode` 去设置之外，还可以通过 `mark.style` 去设置。两者的区别主要有两点：

- `mark.encode` 设置的通道会特殊一点，要么是该标记独有的，比如 image 的 src 通道；要么就是有一些特殊逻辑，比如 x 通道会影响 x 方向坐标轴的生成。
- `mark.encode` 更倾向于去设置和数据有关的通道，但是 `mark.style` 更倾向于去设置和数据无关的通道。虽然 `mark.style` 也同样支持回调去设置数据驱动的通道。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
    })
    .encode('x', 'letter')
    .encode('y', 'frequency')
    .style('fill', 'steelblue') // 设置和数据无关的通道
    .style('strokeWidth', (d) => (d.frequency > 0.1 ? 2 : 1)) // 设置和数据有关的通道
    .style('stroke', (d) => (d.frequency > 0.1 ? 'red' : 'black'))
    .axis('y', { labelFormatter: '.0%' });

  chart.render();

  return chart.getContainer();
})();
```

## 视图样式

而各个区域的样式可以通过 `${name}${Style}` 的形式去设置，其中 `Style` 是 G 的矩形支持的所有样式，比如 `fill`，`stroke` 等，注意首字母要大写，变成驼峰形式。

- **view${Style}** - 设置视图区域的样式
- **plot${Style}** - 设置绘制区域的样式
- **main${Style}** - 设置主区域的样式
- **content${Style}** - 设置内容区域的样式

比如下图中给各个区域染色：

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'view',
      height: 280,
    inset: 10,
    marginTop: 30,
    marginLeft: 40,
    marginBottom: 10,
    marginRight: 20,
    style: {
      // 设置视图样式
      viewFill: '#4e79a7',
      plotFill: '#f28e2c',
      mainFill: '#e15759',
      contentFill: '#76b7b2',
    },
    children: [
      {
        type: 'point',
        data: {
          type: 'fetch',
          value: 'https://assets.antv.antgroup.com/g2/commits.json',
        },
        encode: {
          x: (d) => new Date(d.time).getUTCHours(),
          y: (d) => new Date(d.time).getUTCDay(),
          size: 'count',
          shape: 'point',
        },
        transform: [{ type: 'group', size: 'sum' }, { type: 'sortY' }],
        scale: { y: { type: 'point' } },
        style: { shape: 'point', fill: '#59a14f' },
        axis: {
          x: { title: 'time (hours)', tickCount: 24 },
          y: { title: 'time (day)', grid: true },
        },
        legend: false,
      },
    ],
  });

  chart.render();

  return chart.getContainer();
})();
```
