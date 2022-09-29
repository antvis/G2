# FlexX

**FlexX** 将标识按照 x 通道进行分组，通过指定的聚合函数和值计算得到每一组的权重，每一组视觉元素的宽度会和对应的权重线性相关。主要用于绘制不等宽的条形图或者马赛克图。

## 开始

```js
(() => {
  const chart = new G2.Chart({
    width: 1000,
    paddingBottom: 100,
  });

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/90873879-09d7-4842-a493-03fb560267bc.csv',
    })
    .transform({ type: 'flexX', field: 'gdp' })
    .encode('x', 'country')
    .encode('y', 'value')
    .encode('color', 'country')
    .scale('y', { formatter: '~s' });

  return chart.render().node();
})();
```

## 选项

| 参数    | 说明                                        | 类型                | 默认值  |
| ------- | ------------------------------------------- | ------------------- | ------- |
| field   | 指定生成权重数组的字段，优先级比 channel 高 | `string`            | -       |
| channel | 指定生成权重数组的通道                      | `string`            | `'y'`   |
| reducer | 聚合每一组权重的函数                        | `'sum' \| Reducer ` | `'sum'` |

## 案例

**FlexX** 结合 **StackY** 以及 **NormalizeY** 可以实现如下马赛克图。

```js
(() => {
  const chart = new G2.Chart({
    width: 900,
    height: 800,
    paddingLeft: 0,
    paddingRight: 0,
  });

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/3041da62-1bf4-4849-aac3-01a387544bf4.csv',
    })
    .transform({ type: 'flexX', reducer: 'sum' })
    .transform({ type: 'stackY' })
    .transform({ type: 'normalizeY' })
    .encode('x', 'market')
    .encode('y', 'value')
    .encode('color', 'segment')
    .scale('y', { guide: null })
    .scale('x', { paddingOuter: 0, paddingInner: 0.01 })
    .label({
      text: 'segment',
      x: 5,
      y: 5,
      textAnchor: 'start',
      textBaseline: 'top',
      fontSize: 10,
      fill: '#fff',
    })
    .label({
      text: 'value',
      x: 5,
      y: 5,
      textAnchor: 'start',
      dy: '1.5em',
      fontSize: 10,
      fill: '#fff',
    });

  return chart.render().node();
})();
```
