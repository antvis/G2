---
title: fisheye
order: 1
---

鱼眼坐标系变换对输入的维度应用笛卡尔鱼眼效果。

## 开始使用

<img alt="fisheye-scatter" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*K1tqQLDAZt0AAAAAAAAAAAAADmJ7AQ/original" height="600" />

```js
import { Chart } from '@antv/g2';

const chart = new Chart();

chart.coordinate({
  transform: [{ type: 'fisheye', focusX: 0.5, focusY: 0.5 }],
});

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
  .style('fillOpacity', 0.3)
  .style('lineWidth', 1)
  .scale('size', {
    type: 'log',
    range: [4, 20],
  });

chart.render();
```

## 选项

| 参数        | 说明                                  | 类型      | 默认值  |
| ----------- | ------------------------------------- | --------- | ------- |
| focusX      | 鱼眼变换中心点 x 方向位置             | `number`  | `0`     |
| focusY      | 鱼眼变换中心点 y 方向位置             | `number`  | `0`     |
| distortionX | 鱼眼变换 x 方向畸变大小               | `number`  | `2`     |
| distortionY | 鱼眼变换 y 方向畸变大小               | `number`  | `2`     |
| visual      | focusX 和 focusY 的值是否是视觉坐标点 | `boolean` | `false` |
