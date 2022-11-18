---
title: 坐标系变换
order: 8
---

坐标系变换是一系列点转换。在 G2 中，标识的位置通道 x 和 y 会经过比例尺的映射到 `[0, 1]` 的范围，这之后会应用坐标系变换，从而改变标识的空间展示形式。

在 G2 中坐标系通过 `chart.coordinate` 去声明，和 `mark.transform` 一样，都是数组属性，所以可以声明多个。

```js
chart
  .coordinate({ type: 'polar' }) // 指定第一个坐标系变换
  .coordinate({ type: 'transpose' }); // 指定第二个坐标系变换
```

## 转置变换

比较常用的一种变换是转置变换 transpose，主要用来改变图表的方向。比如绘制水平的条形图。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*z2dxSKtvMfUAAAAAAAAAAAAADmJ7AQ/original" width="640px">

```js
chart.coordinate({ type: 'transpose' }); // 指定 transpose

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
  .encode('y', 'sold');
```

## 径向变换

另一类变换就是径向变换，这类坐标系变换都是把图表从笛卡尔坐标系转换到极坐标系下，用于绘制一系列“圆”形的图。

比如可以使用 interval 标识和 polar 坐标系变换绘制玫瑰图。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*LZ2TSaewI6kAAAAAAAAAAAAADmJ7AQ/original" width="640px">

```js
chart.coordinate({ type: 'polar' });

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
  .encode('color', 'genre')
  .axis('y', false);
```

也可以使用 interval 标识和 theta 坐标系来绘制饼图。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*_qI8SZSzadMAAAAAAAAAAAAADmJ7AQ/original" width="640px">

```js
chart.coordinate({ type: 'theta' });

chart
  .interval()
  .transform({ type: 'stackY' })
  .data([
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ])
  .encode('y', 'sold')
  .encode('color', 'genre');
```

还可以使用 interval 标识和 radial 坐标系来绘制玉块图。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*tCBoSavK98UAAAAAAAAAAAAADmJ7AQ/original" width="640px">

```js
chart.coordinate({ type: 'radial', endAngle: Math.PI });

chart
  .interval()
  .data([
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Other', sold: 150 },
    { genre: 'Sports', sold: 275 },
    { genre: 'Shooter', sold: 350 },
  ])
  .encode('x', 'genre')
  .encode('y', 'sold')
  .encode('color', 'genre')
  .axis('y', false)
    .legend('color', false);
  .axis('x', { title: null })
```

## 高级变换

除了前面的比较基础的坐标系变换之外，还有一些稍微高级一点的坐标系变换，比如平行坐标系 parallel。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*uVKiRqrxogcAAAAAAAAAAAAADmJ7AQ/original" width="640px">

```js
const axis = {
  zIndex: 1,
  labelStroke: '#fff',
  labelStrokeWidth: 5,
  labelFontSize: 10,
  labelStrokeLineJoin: 'round',
  titleStroke: '#fff',
  titleFontSize: 10,
  titleStrokeWidth: 5,
  titleStrokeLineJoin: 'round',
  lineStroke: 'black',
  tickStroke: 'black',
  lineStrokeWidth: 1,
};

chart.coordinate({ type: 'parallel' }); // 指定平行坐标系变换

chart
  .line()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/cars3.json',
  })
  // 指定关心的数据维度
  // 每一个数据维度都对应一根轴
  .encode('position', [
    'economy (mpg)',
    'cylinders',
    'displacement (cc)',
    'power (hp)',
    'weight (lb)',
    '0-60 mph (s)',
    'year',
  ])
  .encode('color', 'weight (lb)')
  .style('strokeWidth', 1.5)
  .style('strokeOpacity', 0.4)
  .scale('color', {
    type: 'sequential',
    palette: 'brBG',
    offset: (t) => 1 - t,
  })
  .axis('position', axis)
  .axis('position1', axis)
  .axis('position2', axis)
  .axis('position3', axis)
  .axis('position4', axis)
  .axis('position5', axis)
  .axis('position6', axis)
  .axis('position7', axis);
```
