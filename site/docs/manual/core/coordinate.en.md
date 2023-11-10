---
title: 坐标系（Coordinate）
order: 6.5
---

**The Coordinate System** in G2 will perform a series of point transform. In G2, the mark's position channels x and y will be mapped to the range [0,1] through a scale mapping, after that, the coordinate system is used to transform points into canvas coordinates, thereby changing the spatial display of the mark.

The coordinate system be configured at the level of view:

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

It can also be configured at the level of mark:

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

## View Coordinate System

Each view can only have one coordinate system. In addition to its own attributes, the coordinate system also contains a series of **Coordinate Transform**。

```js
({
  type: 'polar', // type
  innerRadius: 0.6, // its own properties
  outerRadius: 0.8,
  transform: [{ type: 'transpose' }], // Coordinate transform
});
```

## Mark Coordinate System

The coordinate system of the level of mark has bubbling properties. The coordinate system of the level of mark will be merged with the coordinate system of the view, and the coordinate system of the first mark has the highest priority.

```js
chart.coordinate({ type: 'theta' });
chart.line().coordinate({ type: 'polar' });
chart.area().coordinate({ type: 'radial' });
```

Equivalent to the following situation:

```js
chart.coordinate({ type: 'polar' });
chart.line();
chart.area():
```

This feature is conducive to encapsulation and coordinate-related composite mark, such as pie charts:

```js | ob
(() => {
  function Pie({ encode = {}, ...rest } = {}) {
    const { value, ...restEncode } = encode;
    return {
      ...rest,
      type: 'interval',
      coordinate: { type: 'theta' }, // Encapsulation coordinate system
      transform: [{ type: 'stackY' }],
      encode: {
        ...restEncode,
        y: value,
      },
    };
  }

  const chart = new G2.Chart();

  chart.options({
    type: Pie, // Use this compound mark
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

## Common Coordinate Systems

The default coordinate system is the Cartesian coordinate system. In addition, there is also a kind of coordinate system that transforms charts to polar coordinate systems and is used to draw a series of "circle" charts. This type of coordinate system is called **Radial Coordinate**。

### Polar

For example, you can use interval mark and polar coordinate transform to draw rose charts.

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

You can also use interval mark and theta coordinate system to draw pie charts.

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

You can also use interval mark and radial coordinate systems to draw radial charts.

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

In addition to the previous relatively basic coordinate transform, there are also some slightly more complex coordinate transform, such as parallel coordinate system.

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
    .coordinate({ type: 'parallel' }) // Specify parallel coordinate transform
    //Specify the data dimension of concern
    //Each data dimension corresponds to an axis
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

## Coordinate Transform

The above coordinate system can be used in combination with the coordinate transform.

### Transpose

One of the more commonly used transform is transpose, which is mainly used to change the direction of the chart. For example, draw horizontal bar charts.

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .coordinate({ transform: [{ type: 'transpose' }] }) // Appoint transpose
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

There is also a fisheye coordinate transform, which is used to set the focus of the chart. Here is how to use it.

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

## 3D Coordinate System

At present, we only support `cartesian3D` coordinate system:

```ts
chart.coordinate({ type: 'cartesian3D' });
```
