# Fisheye

鱼眼坐标系变换对输入的维度应用笛卡尔鱼眼效果。

## 快速开始

```js
(() => {
  const chart = new G2.Chart();

  chart.coordinate({ type: 'fisheye', focusX: 0.5, focusY: 0.5 });

  chart
    .point()
    .data({
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
    })
    .encode('x', 'GDP')
    .encode('y', 'LifeExpectancy')
    .encode('size', 'Population')
    .encode('size', 'Population')
    .encode('color', 'continent')
    .scale('size', { type: 'log', range: [4, 20] })

  return chart.render().node();
})();
```


## API

| 参数          | 说明                              | 类型    | 默认值 |
|--------------|-----------------------------------|--------|--------|
| focusX       | 鱼眼变换中心点 x 方向位置             | number | 0    |
| focusY       | 鱼眼变换中心点 y 方向位置             | number | 0    |
| distortionX  | 鱼眼变换 x 方向畸变大小               | number | 2    |
| distortionY  | 鱼眼变换 y 方向畸变大小               | number | 2      |
| isVisual     | focusX 和 focusY 的值是否是视觉坐标点 | boolean | false  |


## 使用方法

### 相对坐标的鱼眼变换

```js
(() => {
  const chart = new G2.Chart();

  chart.coordinate({ type: 'fisheye', focusX: 0.5, focusY: 0.5 });

  chart
    .point()
    .data({
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
    })
    .encode('x', 'GDP')
    .encode('y', 'LifeExpectancy')
    .encode('size', 'Population')
    .encode('size', 'Population')
    .encode('color', 'continent')
    .scale('size', { type: 'log', range: [4, 20] })

  return chart.render().node();
})();
```

### 实际坐标的鱼眼变换
```js
(() => {
  const chart = new G2.Chart();

  chart.coordinate({ type: 'fisheye', focusX: 50, focusY: 50, isVisual: true });

  chart
    .point()
    .data({
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
    })
    .encode('x', 'GDP')
    .encode('y', 'LifeExpectancy')
    .encode('size', 'Population')
    .encode('size', 'Population')
    .encode('color', 'continent')
    .scale('size', { type: 'log', range: [4, 20] })

  return chart.render().node();
})();
```
