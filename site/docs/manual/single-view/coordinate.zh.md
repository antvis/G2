---
title: 坐标系
order: 8
---

坐标系会执行一系列点转换。在 G2 中，标记的位置通道 x 和 y 会经过比例尺的映射到 `[0, 1]` 的范围，这之后会使用坐标系将点转换为画布坐标，从而改变标记的空间展示形式。

在 G2 中坐标系通过 `chart.coordinate` 去声明，该属性是一个值属性。每一个视图只能拥有一个坐标系，坐标系除了本身的属性之外，还包含一系列坐标系变换。

```js
chart.coordinate({
  type: 'polar', // 类型
  innerRadius: 0.6, // 本身的属性
  outerRadius: 0.8,
  transform: [{ type: 'transpose' }], // 坐标系变换
});
```

## 径向坐标系

默认的坐标系是笛卡尔坐标系，除此之外，还有一类坐标系是把图表转换到极坐标系下，用于绘制一系列“圆”形的图，这类坐标系被称为**径向坐标系（Radial Coordinate）**。

### Polar

比如可以使用 interval 标记和 polar 坐标系变换绘制玫瑰图。

<img alt="radial" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*LZ2TSaewI6kAAAAAAAAAAAAADmJ7AQ/original" width="640px">

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

### Theta

也可以使用 interval 标记和 theta 坐标系来绘制饼图。

<img alt="theta" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*_qI8SZSzadMAAAAAAAAAAAAADmJ7AQ/original" width="640px">

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

### Radial

还可以使用 interval 标记和 radial 坐标系来绘制玉珏图。

<img alt="radial" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*tCBoSavK98UAAAAAAAAAAAAADmJ7AQ/original" width="640px">

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
  .legend('color', false)
  .axis('x', { title: null });
```

## 平行坐标系

除了前面的比较基础的坐标系变换之外，还有一些稍微复杂一点的坐标系变换，比如平行坐标系 parallel。

<img alt="parallel" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*uVKiRqrxogcAAAAAAAAAAAAADmJ7AQ/original" width="640px">

```js
const axis = {
  zIndex: 1,
  style: {
    labelStroke: '#fff',
    labelStrokeWidth: 5,
    labelFontSize: 10,
    labelStrokeLineJoin: 'round',
    titleStroke: '#fff',
    titleFontSize: 10,
    titleStrokeWidth: 5,
    titleStrokeLineJoin: 'round',
    titlePosition: 'right',
    titleTransform: 'translate(-50%, 0) rotate(-90)',
    lineStroke: 'black',
    tickStroke: 'black',
    lineStrokeWidth: 1,
  },
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
  .legend({
    color: { length: 400 },
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

## 坐标系变换

上面的坐标系都可以和坐标系变换结合使用。

### Transpose

比较常用的一种变换是转置变换 transpose，主要用来改变图表的方向。比如绘制水平的条形图。

<img alt="transpose" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*z2dxSKtvMfUAAAAAAAAAAAAADmJ7AQ/original" width="640px">

```js
chart.coordinate({ transform: [{ type: 'transpose' }] }); // 指定 transpose

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

### Fisheye

还有一种鱼眼坐标系变换，用于设置图表焦点，下面是使用方式。

<img alt="interaction" src="https://gw.alipayobjects.com/zos/raptor/1668754097488/intro-interaction.gif" width="640px">

```js
// 声明交互
chart.interaction('fisheye');

chart
  .point()
  .data(data)
  .encode('x', 'GDP')
  .encode('y', 'LifeExpectancy')
  .encode('size', 'Population')
  .encode('color', 'Continent')
  .encode('shape', 'point')
  .scale('size', { type: 'log', range: [4, 20] })
  .axis('x', { labelFormatter: '~s' })
  .style('fillOpacity', 0.3)
  .style('lineWidth', 1);
```

## 冒泡

坐标系拥有冒泡性，chart 实例的坐标系会把它的标记所设置的坐标系覆盖，并且第一个标记所对应的坐标系优先级最高。

```js
chart.coordinate({ type: 'theta' });
chart.line().coordinate({ type: 'polar' });
chart.area().coordinate({ type: 'radial' });
```

和下面的情况等价：

```js
chart.coordinate({ type: 'polar' });
chart.line();
chart.area():
```
