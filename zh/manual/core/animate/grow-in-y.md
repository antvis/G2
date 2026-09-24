---
title: "growInY"
description: "growInY"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/manual/core/animate/grow-in-y/"
version: "5.4.8"
---

`growInY` 是容器沿着 y 方向放大的矩阵动画，多用于 G.Group 容器类进行动画。影响图形的 `transform.scale` 属性。

## 开始使用

<img alt="growInY" src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*L6mkQa3aG64AAAAAAAAAAABkARQnAQ" width="400" />

```ts
chart.options({
  type: 'interval',
  /* ... */
  animate: { enter: { type: 'growInY' } },
});
```
