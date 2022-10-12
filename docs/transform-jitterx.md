# JitterX

**JitterX** 会生成随机 dx 通道对于拥有离散的 x 通道的标识。视觉上会让点在水平空间中随机散开，形成扰动的效果。

## 开始

```js
(() => {
  const chart = new G2.Chart();

  chart
    .point()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/2c813e2d-2276-40b9-a9af-cf0a0fb7e942.csv',
    })
    .transform({ type: 'sortX', by: 'x', reducer: (I, V) => +V[0] })
    .transform({ type: 'jitterX' })
    .encode('y', 'Horsepower')
    .encode('x', 'Cylinders')
    .encode('shape', 'hollow')
    .encode('color', 'Cylinders')
    .scale('x', { type: 'point' })
    .scale('color', { type: 'ordinal' });

  return chart.render().node();
})();
```

## 选项

| 参数     | 说明                                          | 类型           | 默认值      |
| -------- | --------------------------------------------- | -------------- | ----------- |
| paddingX | 水平之间的间隔                                | `number`       | 0           |
| random   | 自定义随机数生成器，需要返回 \[0, 1) 之间的值 | `() => number` | Math.random |
