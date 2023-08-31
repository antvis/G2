---
title: 比例尺（Scale）
order: 5.5
---

G2 中**比例尺（Scale）** 是可视化很重要的一个抽象：将抽象数据映射为视觉数据，它是抽象数据和视觉数据的桥梁。如果说编码决定了标记的哪些通道需要被可视化，那么比例尺决定了这些通道该如何被可视化。

G2 内部会根据数据类型以及标记的类型，去推断比例尺的类型、定义域和值域，但是仍然可以指定对应配置。比例尺可以配置在 Mark 层级：

```js
({
  type: 'interval',
  scale: {
    x: { padding: 0.5 },
    y: {
      type: 'log', // 指定类型
      domain: [10, 100], // 指定定义域
      range: [0, 1], // 指定值域
    },
  },
});
```

```js
// API
// 第一种方式
chart
  .interval()
  .scale('x', { padding: 0.5 })
  .scale('y', {
    type: 'log', // 指定类型
    domain: [10, 100], // 指定定义域
    range: [0, 1], // 指定值域
  });

// 第二种方式
chart.interval().scale({
  x: { padding: 0.5 },
  y: {
    type: 'log', // 指定类型
    domain: [10, 100], // 指定定义域
    range: [0, 1], // 指定值域
  },
});
```

比例尺也可以配置在 View 层级：

```js
({
  type: 'view',
  scale: {
    x: { padding: 0.5 },
    y: {
      type: 'log', // 指定类型
      domain: [10, 100], // 指定定义域
      range: [0, 1], // 指定值域
    },
  },
});
```

```js
// API 形式
// 第一种方式
chart.scale('x', { padding: 0.5 }).scale('y', {
  type: 'log', // 指定类型
  domain: [10, 100], // 指定定义域
  range: [0, 1], // 指定值域
});

// 第二种方式
chart.scale({
  x: { padding: 0.5 },
  y: {
    type: 'log', // 指定类型
    domain: [10, 100], // 指定定义域
    range: [0, 1], // 指定值域
  },
});
```

## 标记比例尺

标记的每一个通道都绑定了一个比例尺。该比例尺会对该通道绑定的列数据进行转换，将其从数据范围：**定义域（Domain）** 转换到视觉范围：**值域（Range）**。不同类型的比例尺针对不同类型的数据和使用场景。

### 比例尺同步

同一个视图中的标记相同通道的比例尺会默认是同步的：会去同步比例尺的类型，定义域和值域以及其他配置。这意味一个视图中所有的标记都会按照一个同样的尺度去绘制。比如下图中的 LineX 标记虽然没有完整的数据，但是也绘制到了准确的位置，就是因为比例尺同步。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .line()
    .data([
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 7 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 },
    ])
    .encode('x', 'year')
    .encode('y', 'value');

  chart.lineX().data(['1996']).style('stroke', 'red').style('strokeWidth', 2);

  chart.render();

  return chart.getContainer();
})();
```

### 比例尺不同步

如果希望不同步（比如绘制双轴图的时候），就需要设置 `scale.independent` 为 `true`，设置了该属性的比例尺不会和任何比例尺同步。下面的例子中的 interval 和 line 的 y 通道会使用两个不同的比例尺，从而会生成两个不同的坐标轴。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'view',
    data: [
      { time: '10:10', call: 4, waiting: 2, people: 2 },
      { time: '10:15', call: 2, waiting: 6, people: 3 },
      { time: '10:20', call: 13, waiting: 2, people: 5 },
      { time: '10:25', call: 9, waiting: 9, people: 1 },
      { time: '10:30', call: 5, waiting: 2, people: 3 },
      { time: '10:35', call: 8, waiting: 2, people: 1 },
      { time: '10:40', call: 13, waiting: 1, people: 2 },
    ],
    children: [
      {
        type: 'interval',
        encode: { x: 'time', y: 'waiting' },
        axis: { y: { title: 'Waiting', titleFill: '#5B8FF9' } },
      },
      {
        type: 'line',
        encode: { x: 'time', y: 'people', shape: 'smooth' },
        scale: { y: { independent: true } }, // 设置 y 方向比例尺不同步
        style: { stroke: '#fdae6b', lineWidth: 2 },
        axis: {
          y: {
            position: 'right',
            grid: null,
            title: 'People',
            titleFill: '#fdae6b',
          },
        },
      },
    ],
  });

  chart.render();

  return chart.getContainer();
})();
```

如果希望比例尺分组同步，可以声明 `scale.key`，拥有相同 key 的 scale 会同步。比如下面的 Line 和 Point Mark y 通道的比例尺因为 key 都是 line 所以会同步。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'view',
    data: [
      { time: '10:10', call: 4, waiting: 2, people: 2 },
      { time: '10:15', call: 2, waiting: 6, people: 3 },
      { time: '10:20', call: 13, waiting: 2, people: 5 },
      { time: '10:25', call: 9, waiting: 9, people: 1 },
      { time: '10:30', call: 5, waiting: 2, people: 3 },
      { time: '10:35', call: 8, waiting: 2, people: 1 },
      { time: '10:40', call: 13, waiting: 1, people: 2 },
    ],
    children: [
      {
        type: 'interval',
        encode: { x: 'time', y: 'waiting' },
        axis: { y: { title: 'Waiting', titleFill: '#5B8FF9' } },
      },
      {
        type: 'line',
        encode: { x: 'time', y: 'people', shape: 'smooth' },
        scale: { y: { key: 'line' } }, // 设置 key 为 line
        style: { stroke: '#fdae6b', lineWidth: 2 },
        axis: {
          y: {
            position: 'right',
            grid: null,
            title: 'People',
            titleFill: '#fdae6b',
          },
        },
      },
      {
        type: 'point',
        encode: { x: 'time', y: 'people' },
        scale: { y: { key: 'line' } }, // 设置 key 为 line
        style: { stroke: '#fdae6b', lineWidth: 2 },
      },
    ],
  });

  chart.render();

  return chart.getContainer();
})();
```

## 视图比例尺

比例尺会可以配置在视图层级，并且会传递给 `children` 指定的标记，如果该标记对应的通道没有设置比例尺，就设置，否则没有影响。在不绘制多轴图的情况下，比例尺是可以设置在视图层级的。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .data([
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 7 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 },
    ])
    .encode('x', 'year')
    .encode('y', 'value')
    .scale('y', { nice: true }); // 视图层级的比例尺设置

  chart.line();

  chart.point();

  chart.render();

  return chart.getContainer();
})();
```

## 常见比例尺

常见的比例尺一共分为三大类：

- 连续比例尺
- 离散比例尺
- 离散化比例尺

### 连续比例尺

第一种比例尺是连续比例尺，主要针对是连续数据，比较常见的连续比例尺有：Linear，Time，Log 等。比如下面的散点图的 x 和 y 通道都是使用了 linear 比例尺。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .point()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
    })
    .encode('x', 'weight') // weight 是一个连续的数据
    .encode('y', 'height') // height 是一个连续的数据
    .encode('color', 'gender');

  chart.render();

  return chart.getContainer();
})();
```

### 序数比例尺

第二种比例尺是序数比例尺，主要针对离散数据，比较常见的序数比例尺有：ordinal，point 等。比如下面的条形图的 color 通道就是用了 ordinal 比例尺。

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
    .encode('color', 'genre') // genre 是一个离散数据
    .scale('color', {
      // 指定映射后的颜色
      range: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#c564be'],
    });

  chart.render();

  return chart.getContainer();
})();
```

### 离散化比例尺

第三种比例尺是离散化比例尺，该比例尺主要针对连续数据，会将它们离散化之后再映射，比如 threshold，quantize 等。下面的 color 通道就用了 quantile 比例尺。

```js | ob
(() => {
  const chart = new G2.Chart({
    
    height: 240,
  });

  chart
    .cell()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/89c20fe8-0c6f-46c8-b36b-4cb653dba8ed.json',
      transform: [{ type: 'map', callback: (d) => ({ salary: d }) }],
    })
    .scale('color', {
      type: 'quantile',
      // 分成三组，每组对应下面的一个颜色
      range: ['#eee', 'pink', 'red'],
    })
    .encode('y', (_, i) => (i % 5) + 1)
    .encode('x', (_, i) => ((i / 5) | 0) + 1)
    .encode('color', 'salary') // 是连续数据，比例尺按照分位数对数据进行分组
    .style('stroke', '#000')
    .style('inset', 2);

  chart.render();

  return chart.getContainer();
})();
```
