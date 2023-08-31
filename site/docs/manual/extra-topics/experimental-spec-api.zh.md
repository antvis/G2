---
title: Spec 和 API
order: 2
---

G2 5.0 和 4.0 版本一样，提供了一套命令式的 Functional API 去声明图表，比如如下声明一个最简单的条形图。

```js | ob
(() => {
  // 初始化图表实例
  const chart = new G2.Chart();

  // 声明可视化
  chart
    .interval() // 创建一个 Interval 标记
    .data([
      // 绑定数据
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ])
    .encode('x', 'genre') // 编码 x 通道
    .encode('y', 'sold'); // 编码 y 通道

  // 渲染可视化
  chart.render();

  return chart.getContainer();
})();
```

除了这套函数式风格之外，G2 5.0 还提供了一套全新的 API：Spec API。该 API 通过一个 JavaScript 对象去声明可视化。

## 开始使用

目前我们通过 `chart.options(spec)` 去声明可视化，下面的例子可以得到和上面一样的效果。

```js | ob
(() => {
  // 初始化图表实例
  const chart = new G2.Chart();

  // 声明可视化
  chart.options({
    type: 'interval', // 创建一个 Interval 标记
    data: [
      // 绑定数据
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ],
    encode: {
      x: 'genre', // 编码 x 通道
      y: 'sold', // 编码 y 通道
    },
  });

  // 渲染可视化
  chart.render();

  return chart.getContainer();
})();
```

## 比较

可以发现，两种 API 初始化图表实例和最后渲染是一致的，但是中间声明可视化的方式却不同，接下来我们就来简单看看两者的异同。

Functional API 是基于 Spec API 实现的：简单来讲，每一个 Chart 实例都有一个 options，Functional API 是通过一系列方法去生成这个 options，而 Spec API 是直接设置这个 options。不论是哪种形式的 API，G2 最后都是直接渲染当前的 options，所以两者声明可视化的能力是完全等价。

在大部分场景下，两者更多只是一个风格上的选择，但是也有一些差别：

- **易用性**：Spec API 从易用性上讲更胜一筹，对初学者或者不需要深入了解 G2 的用户更友好。JavaScript 对象这种结构型更强的表达，会天然比函数表达更易懂一点。并且其往往是一个整体，更容易复制、粘贴和“调参”。
- **灵活性**：Functional API 优势在灵活性，更适合对函数式、[D3](https://github.com/d3/d3) 更加熟悉的用户。但是它的灵活性并不是体现在能绘制出更加复杂的可视化，而是体现在声明可视化的形式会更加灵活。其中有一个优点就是更容易去组织关注点。

比如希望上面条形图中的条依次出现，那么就需要增加一个 encode 和 transform。下面第一种 Spec API 看上去会比第二种 Functional API 更清晰一点，但是后者可以把和动画相关的属性（相同的关注点）放在一起，而前者就不行。

```js
chart.options({
  type: 'interval',
  data,
  encode: {
    x: 'genre',
    y: 'sold',
    enterDuration: 1000,
  },
  transform: [{ type: 'stackEnter' }],
});
```

```js
chart
  .interval()
  .data(data)
  .encode('x', 'genre')
  .encode('y', 'sold')
  // 这两个都和动画有关，可以放在一起。
  .encode('enterDuration', 1000)
  .transform({ type: 'stackEnter' });
```

## 应用场景

当然 Spec API 不仅仅有简单这一个特点，它还有更多的应用场景：

- **智能可视化**：可以基于 Spec 进行推荐和纠错等。
- **上层封装**：转换 Spec 对应的 Options 会比直接调用更容易。
- **低代码搭建**：可以基于 Spec 直接生成配置面板，搭建一个 BI 工具。
- **图表运算**：Spec 也可以看做一种数据结构，如果是数据结构，就可以做一系列运算，比如图片相加等。
- **服务端渲染**：可以直接把 Spec 对应的 Options 渲染成图片。
- ......

后面 G2 围绕基于这一套新的 API 做一系列工具供大家使用，如果大家有想法也可以在这里讨论参与[共建](https://github.com/antvis/G2/discussions)。

## 案例

下面通过一些案例给大家展示一下 Spec API 的使用方法。

### 饼图

```js | ob
(() => {
  // 初始化图表实例
  const chart = new G2.Chart();

  // 声明可视化
  chart.options({
    type: 'interval',
    height: 640,
    data: {
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/79fd9317-d2af-4bc4-90fa-9d07357398fd.csv',
    },
    transform: [{ type: 'stackY' }],
    coordinate: { type: 'theta' },
    scale: {
      color: { palette: 'spectral', offset: (t) => t * 0.8 + 0.1 },
    },
    legend: false,
    encode: { y: 'value', color: 'name' },
    style: { stroke: 'white' },
    labels: [
      {
        text: 'name',
        radius: 0.8,
        style: { fontSize: 10, fontWeight: 'bold' },
      },
      {
        text: (d, i, data) => (i < data.length - 3 ? d.value : ''),
        radius: 0.8,
        style: { fontSize: 9, dy: 12 },
      },
    ],
    animate: { enter: { type: 'waveIn', duration: 1000 } },
  });

  // 渲染可视化
  chart.render();

  return chart.getContainer();
})();
```

### 空间复合

```js | ob
(() => {
  // 初始化图表实例
  const chart = new G2.Chart();

  // 声明可视化
  chart.options({
    type: 'spaceFlex',
    width: 900,
    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/seattle-weather.json',
    },
    direction: 'col',
    ratio: [1, 2],
    children: [
      {
        type: 'interval',
        paddingBottom: 0,
        paddingRight: 300,
        transform: [{ type: 'groupX', y: 'max' }],
        axis: { x: false },
        encode: {
          x: (d) => new Date(d.date).getUTCDate(),
          y: 'temp_max',
          color: 'steelblue',
        },
      },
      {
        type: 'spaceFlex',
        ratio: [2, 1],
        children: [
          {
            type: 'cell',
            paddingRight: 0,
            paddingBottom: 50,
            transform: [{ type: 'group', color: 'max' }],
            encode: {
              x: (d) => new Date(d.date).getUTCDate(),
              y: (d) => new Date(d.date).getUTCMonth(),
              color: 'temp_max',
            },
            style: { inset: 0.5 },
            axis: {
              x: { title: 'Date' },
              y: { title: 'Month' },
            },
            scale: { color: { palette: 'gnBu' } },
            legend: false,
          },
          {
            type: 'interval',
            paddingBottom: 50,
            transform: [{ type: 'groupX', y: 'max' }],
            coordinate: { transform: [{ type: 'transpose' }] },
            axis: { x: false },
            encode: {
              x: (d) => new Date(d.date).getUTCMonth(),
              y: 'temp_max',
              color: 'steelblue',
            },
          },
        ],
      },
    ],
  });

  // 渲染可视化
  chart.render();

  return chart.getContainer();
})();
```
