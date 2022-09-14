# Image

`Image` 标记和 `Point` 标记很类似，都是以 `x`，`y` 数据通道作为位置居中定位，区别在于 `Image` 提供一个特殊的 `src` 数据通道，来指定图片的远程地址或者 base64。


## 快速开始

这里有一个简单的浏览器占比数据，我们对它进行可视化，便于看到不同浏览器的占比对比。

```js | table "pin: false"
data = [
  {
    name: 'Internet Explorer',
    value: 26,
    url: 'https://gw.alipayobjects.com/zos/rmsportal/eOYRaLPOmkieVvjyjTzM.png',
  },
  {
    name: 'Chrome',
    value: 40,
    url: 'https://gw.alipayobjects.com/zos/rmsportal/dWJWRLWfpOEbwCyxmZwu.png',
  },
  {
    name: 'Firefox',
    value: 30,
    url: 'https://gw.alipayobjects.com/zos/rmsportal/ZEPeDluKmAoTioCABBTc.png',
  },
  {
    name: 'Safari',
    value: 24,
    url: 'https://gw.alipayobjects.com/zos/rmsportal/eZYhlLzqWLAYwOHQAXmc.png',
  },
  {
    name: 'Opera',
    value: 15,
    url: 'https://gw.alipayobjects.com/zos/rmsportal/vXiGOWCGZNKuVVpVYQAw.png',
  },
  {
    name: 'Undetectable',
    value: 8,
    url: 'https://gw.alipayobjects.com/zos/rmsportal/NjApYXminrnhBgOXyuaK.png',
  },
];
```

```js
(() => {
  const chart = new G2.Chart();

  chart
    .image()
    .data(data)
    .encode('x', 'name')
    .encode('y', 'value')
    .encode('src', 'url')
    .scale('x', { type: 'band' })
    .scale('y', { zero: true });

  return chart.render().node();
})();
```


## 使用方式

未了让上述可视化图表看起来更好看，我们可以增加一个浏览器图标到 x 轴的连接线。

```js
(() => {
  const chart = new G2.Chart();

  chart.data(data);

  chart
    .link()
    .encode('x', ['name', 'name'])
    .encode('y', (d) => [0, d.value])
    .encode('src', 'url')
    .style('stroke', '#dfdfdf')
    .style('lineDash', [2, 2]);

  chart
    .image()
    .encode('x', 'name')
    .encode('y', 'value')
    .encode('src', 'url')
    .scale('x', { type: 'band' })
    .scale('y', { domain: [0, 50] });

  return chart.render().node();
})();
```

当然，也可以增加一个 `Line` mark 来展示浏览器占比变化的趋势。

```js
(() => {
  const chart = new G2.Chart();

  chart.data(data);

  chart
    .link()
    .encode('x', ['name', 'name'])
    .encode('y', (d) => [0, d.value])
    .encode('src', 'url')
    .style('stroke', '#dfdfdf')
    .style('lineDash', [2, 2]);
  
  chart
    .line()
    .encode('x', 'name')
    .encode('y', 'value')
    .encode('shape', 'smooth')
    .scale('x', { type: 'band' })
    .scale('y', { domain: [0, 50] })
    .style('opacity', 0.5);

  chart
    .image()
    .encode('x', 'name')
    .encode('y', 'value')
    .encode('src', 'url')
    .scale('x', { type: 'band' })
    .scale('y', { domain: [0, 50] });

  return chart.render().node();
})();
```

最后，我们来绘制一个更有意思一点的例子吧！

```js | table "pin: false; maxCount: 3"
dataXO = [
  {
    x: 0,
    y: 0.241,
    type: 'x',
  },
  {
    x: 1,
    y: 0.367,
    type: 'x',
  },
  {
    x: 2,
    y: 0.036,
    type: 'x',
  },
  {
    x: 3,
    y: 0.112,
    type: 'o',
  },
  {
    x: 4,
    y: 0.382,
    type: 'x',
  },
  {
    x: 5,
    y: 0.594,
    type: 'o',
  },
  {
    x: 6,
    y: 0.516,
    type: 'o',
  },
  {
    x: 7,
    y: 0.634,
    type: 'x',
  },
  {
    x: 8,
    y: 0.612,
    type: 'x',
  },
  {
    x: 9,
    y: 0.271,
    type: 'o',
  },
  {
    x: 10,
    y: 0.241,
    type: 'o',
  },
  {
    x: 11,
    y: 0.955,
    type: 'o',
  },
  {
    x: 12,
    y: 0.336,
    type: 'x',
  },
  {
    x: 13,
    y: 0.307,
    type: 'x',
  },
  {
    x: 14,
    y: 0.747,
    type: 'x',
  },
];
```

```js
(() => {
  const x = 'https://gw.alipayobjects.com/zos/antfincdn/xYAYJ3T969/94c968a3f33eac63c63b87b2f0f6cd97e2db624c65646d6839a5eb4d9c1b5543e922befd040cc5d55deaaa1c7e57c0075a186aa25874490616f2652d11f08592.svg';
  const o = 'https://gw.alipayobjects.com/zos/antfincdn/JtFvbgBbjN/3917899b7468c526a5bfe18f94d3cf1cfedf7a7c808976870a866d71d4a322af778ffb34fd3c06783be80ff60b10be3279d5dbc82f07a7201f4978130bc8edd6.svg'

  const chart = new G2.Chart();
  chart
    .image()
    .data(dataXO)
    .encode('x', 'x')
    .encode('y', 'y')
    .encode('size', 'y')
    .encode('src', ({ type }) => type === 'x' ? x : o)
    .scale('x', { type: 'band' })
    .scale('y', { domain: [0, 1] })
    .scale('size', { type: 'linear', range: [12, 32] });

  return chart.render().node();
})();
```


## FAQ

- 图片的 `src` 通道支持哪些数据类型？

最终的绘制都是调用 [G](https://github.com/antvis/g) 去渲染，所以支持的数据类型和 G 的原子 `Image` 图形保持一致，支持：`远程地址`、`base64`、`blob`、`file`。
