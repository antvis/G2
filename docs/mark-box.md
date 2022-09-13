# Box

Box 图形是用来绘制箱线图（boxplot）又叫盒须图、盒式图，通常用来展示一组数据分散情况的统计图，一般包括几种数据：`最小值`、`下四分位数`、`中位数`、`上四分位数`、`最大值`，另外可以结合 `point` mark 绘制异常点数据。

<img alt="box" width="100%" style="max-width: 400px" src="https://gw.alipayobjects.com/zos/antfincdn/f6WEf%24CrgE/20220913111713.jpg" />

Box 的数据通道和常规图形没有太大差异，唯一的区别在于对于 y 通道对应的数据是一组统计数据的数组，最后会将数据一个为箱线图所需求的所有点集合。

```text
/**
 * Convert value for each channel to box shapes.
 *
 * p0           p2          p1
 *    ──────────┬──────────
 *              │
 *              │
 *              │
 *              │ p3
 * p4 ┌─────────┴──────────┐ p5
 *    │                    │
 *    │                    │
 * p8 ├────────────────────┤ p9
 *    │                    │
 *    │        p10         │
 * p7 └─────────┬──────────┘ p6
 *              │
 *              │
 *              │
 *   ───────────┴───────────
 * p12         p11           p13
 */
 ```


## 快速开始

```js | table "pin: false"
data = [
  { x: 'Oceania', y: [1, 9, 16, 22, 24] },
  { x: 'East Europe', y: [1, 5, 8, 12, 16] },
  { x: 'Australia', y: [1, 8, 12, 19, 26] },
  { x: 'South America', y: [2, 8, 12, 21, 28] },
  { x: 'North Africa', y: [1, 8, 14, 18, 24] },
  { x: 'North America', y: [3, 10, 17, 28, 30] },
  { x: 'West Europe', y: [1, 7, 10, 17, 22] },
  { x: 'West Africa', y: [1, 6, 8, 13, 16] },
];
```

```js
(() => {
  const chart = new G2.Chart({ width: 720 });

  chart
    .box()
    .data(data)
    .encode('x', 'x')
    .encode('y', 'y')
    .encode('color', 'x')
    .scale('x', { paddingInner: 0.6, paddingOuter: 0.3 })
    .scale('y', { zero: true })
    .scale('color', { guide: null })
    .style('stroke', 'black');

  return chart.render().node();
})();
```


## API

`Box` 对应的 shape 图形有以下：

| shape | 描述    | 示例 |
|-------|--------|------|
| box  | 箱线图，又叫盒须图、盒式图 | <img alt="box shape" height="32" src="https://gw.alipayobjects.com/zos/antfincdn/3Yx5VGjRbW/20220913112556.jpg" /> |


## 使用方式

和其他 mark 一样，可以通过指定 `color` 通道，将不同的数据按照颜色分组标记出来。


```js | table "pin: false"
dataWithColor = [
  {
    Species: 'I. setosa',
    type: 'SepalLength',
    value: 5.1,
    bin: [4.3, 4.8, 5, 5.2, 5.8],
  },
  {
    Species: 'I. setosa',
    type: 'SepalWidth',
    value: 3.5,
    bin: [2.3, 3.2, 3.4, 3.7, 4.4],
  },
  {
    Species: 'I. setosa',
    type: 'PetalLength',
    value: 1.4,
    bin: [1, 1.4, 1.5, 1.6, 1.9],
  },
  {
    Species: 'I. setosa',
    type: 'PetalWidth',
    value: 0.2,
    bin: [0.1, 0.2, 0.2, 0.3, 0.6],
  },
  {
    Species: 'I. versicolor',
    type: 'SepalLength',
    value: 7,
    bin: [4.9, 5.6, 5.9, 6.3, 7],
  },
  {
    Species: 'I. versicolor',
    type: 'SepalWidth',
    value: 3.2,
    bin: [2, 2.5, 2.8, 3, 3.4],
  },
  {
    Species: 'I. versicolor',
    type: 'PetalLength',
    value: 4.7,
    bin: [3, 4, 4.35, 4.6, 5.1],
  },
  {
    Species: 'I. versicolor',
    type: 'PetalWidth',
    value: 1.4,
    bin: [1, 1.2, 1.3, 1.5, 1.8],
  },
  {
    Species: 'I. virginica',
    type: 'SepalLength',
    value: 6.3,
    bin: [4.9, 6.2, 6.5, 6.9, 7.9],
  },
  {
    Species: 'I. virginica',
    type: 'SepalWidth',
    value: 3.3,
    bin: [2.2, 2.8, 3, 3.2, 3.8],
  },
  {
    Species: 'I. virginica',
    type: 'PetalLength',
    value: 6,
    bin: [4.5, 5.1, 5.55, 5.9, 6.9],
  },
  {
    Species: 'I. virginica',
    type: 'PetalWidth',
    value: 2.5,
    bin: [1.4, 1.8, 2, 2.3, 2.5],
  },
];
```

```js
(() => {
  const chart = new G2.Chart();

  chart
    .box()
    .data(dataWithColor)
    .encode('x', 'type')
    .encode('y', 'bin')
    .encode('series', 'Species')
    .encode('color', 'Species')
    .scale('x', { paddingInner: 0.2, paddingOuter: 0.1 })
    .scale('y', { zero: true })
    .scale('series', { paddingInner: 0.3, paddingOuter: 0.1 })
    .style('stroke', 'black');

  return chart.render().node();
})();
```

另外，我们也可以在一个 `polar` 坐标系下查看箱线图，自带的 `box` 图形会自动对图形边缘进行平滑处理；也可以增加 `transpose` 让箱线图变成一个横向的。

```js | select "options: { labels: ['polar', 'transpose'], values: ['polar', 'transpose'] }; pin: false"
coordinate = 'polar';
```


```js
(() => {
  const chart = new G2.Chart();

  chart
    .box()
    .data(dataWithColor)
    .encode('x', 'type')
    .encode('y', 'bin')
    .encode('series', 'Species')
    .encode('color', 'Species')
    .scale('x', { paddingInner: 0.2, paddingOuter: 0.1 })
    .scale('y', { zero: true })
    .scale('series', { paddingInner: 0.3, paddingOuter: 0.1 })
    .style('stroke', 'black');

  chart.coordinate({ type: coordinate });

  return chart.render().node();
})();
```


## FAQ

 - 怎么在前端进行数据分散情况的分析？

G2 的 `transform` 可以进行数据的转换，这里就可以实现对数据进行 `最小值`、`下四分位数`、`中位数`、`上四分位数`、`最大值` 的统计，当然也可以调用社区提供的[算法库](https://github.com/antvis/data-set/blob/master/src/transform/aggregate.ts)。

```ts
chart
  .box()
  .data({
    type: 'connector',
    value: [/* your detail data */],
    callback: (data) => {
      // todo: aggregate your data, and return it.
      return data;
    }
  });
```
