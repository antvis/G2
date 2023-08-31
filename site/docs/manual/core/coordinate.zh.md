---
title: 坐标系（Coordinate）
order: 6.5
---

G2 中**坐标系（Coordinate）** 会执行一系列点转换。在 G2 中，标记的位置通道 x 和 y 会经过比例尺的映射到 `[0, 1]` 的范围，这之后会使用坐标系将点转换为画布坐标，从而改变标记的空间展示形式。

坐标系可以设置在 View 层级：

```js
({
  type: 'view',
  coordinate: { type: 'polar' },
});
```

```js
// API
chart.coordinate({ type: 'polar' });
```

也可以设置在 Mark 层级：

```js
({
  type: 'interval',
  coordinate: { type: 'polar' },
});
```

```js
// API
chart.interval().coordinate({ type: 'polar' });
```

## 视图坐标系

每一个视图只能拥有一个坐标系。坐标系除了本身的属性之外，还包含一系列**坐标系变换（Coordinate Transform）**。

```js
({
  type: 'polar', // 类型
  innerRadius: 0.6, // 本身的属性
  outerRadius: 0.8,
  transform: [{ type: 'transpose' }], // 坐标系变换
});
```

## 标记坐标系

标记层级的坐标系拥有冒泡性。标记层级的坐标系会和视图的坐标系进行合并，并且第一个标记的坐标系优先级最高。

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

这个特性有利于封装和坐标系相关的复合标记，比如饼图：

```js | ob
(() => {
  function Pie({ encode = {}, ...rest } = {}) {
    const { value, ...restEncode } = encode;
    return {
      ...rest,
      type: 'interval',
      coordinate: { type: 'theta' }, // 封装坐标系
      transform: [{ type: 'stackY' }],
      encode: {
        ...restEncode,
        y: value,
      },
    };
  }

  const chart = new G2.Chart();

  chart.options({
    type: Pie, // 使用该复合 Mark
    data: [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ],
    encode: { value: 'sold', color: 'genre' },
  });

  chart.render();

  return chart.getContainer();
})();
```

## 常见坐标系

默认的坐标系是笛卡尔坐标系，除此之外，还有一类坐标系是把图表转换到极坐标系下，用于绘制一系列“圆”形的图，这类坐标系被称为**径向坐标系（Radial Coordinate）**。

### Polar

比如可以使用 interval 标记和 polar 坐标系变换绘制玫瑰图。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .coordinate({ type: 'polar' })
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

  chart.render();

  return chart.getContainer();
})();
```

### Theta

也可以使用 interval 标记和 theta 坐标系来绘制饼图。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .coordinate({ type: 'theta' })
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

  chart.render();

  return chart.getContainer();
})();
```

### Radial

还可以使用 interval 标记和 radial 坐标系来绘制玉珏图。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .coordinate({ type: 'radial', endAngle: Math.PI })
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

  chart.render();

  return chart.getContainer();
})();
```

### Parallel

除了前面的比较基础的坐标系变换之外，还有一些稍微复杂一点的坐标系变换，比如平行坐标系 parallel。

```js | ob
(() => {
  const axis = {
    zIndex: 1,
    titlePosition: 'right',
    line: true,
    labelStroke: '#fff',
    labelStrokeWidth: 5,
    labelFontSize: 10,
    labelStrokeLineJoin: 'round',
    titleStroke: '#fff',
    titleFontSize: 10,
    titleStrokeWidth: 5,
    titleStrokeLineJoin: 'round',
    titleTransform: 'translate(-50%, 0) rotate(-90)',
    lineStroke: 'black',
    tickStroke: 'black',
    lineStrokeWidth: 1,
  };

  const chart = new G2.Chart();

  chart
    .line()
    .data({
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/cars3.json',
    })
    .coordinate({ type: 'parallel' }) // 指定平行坐标系变换
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
    .axis('position7', axis)
    .interaction('tooltip', { series: false });

  chart.render();

  return chart.getContainer();
})();
```

## 坐标系变换

上面的坐标系都可以和坐标系变换结合使用。

### Transpose

比较常用的一种变换是转置变换 transpose，主要用来改变图表的方向。比如绘制水平的条形图。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .coordinate({ transform: [{ type: 'transpose' }] }) // 指定 transpose
    .data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ])
    .encode('x', 'genre')
    .encode('y', 'sold');

  chart.render();

  return chart.getContainer();
})();
```

### Fisheye

还有一种鱼眼坐标系变换，用于设置图表焦点，下面是使用方式。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .point()
    .data({
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
    })
    .encode('x', 'GDP')
    .encode('y', 'LifeExpectancy')
    .encode('size', 'Population')
    .encode('color', 'continent')
    .encode('shape', 'point')
    .scale('size', { type: 'log', range: [4, 20] })
    .axis('x', { labelFormatter: '~s' })
    .style('fillOpacity', 0.3)
    .style('lineWidth', 1)
    .legend(false)
    .interaction('fisheye');

  chart.render();

  return chart.getContainer();
})();
```

## 3D 坐标系

目前我们仅支持 `cartesian3D` 坐标系：

```ts
chart.coordinate({ type: 'cartesian3D' });
```
