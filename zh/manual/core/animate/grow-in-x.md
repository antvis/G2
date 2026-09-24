---
title: "growInX"
description: "growInX"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/manual/core/animate/grow-in-x/"
version: "5.4.8"
---

`growInX` 是容器沿着 x 方向放大的矩阵动画，多用于 G.Group 容器类进行动画。影响图形的 `transform.scale` 属性。

## 开始使用

<img alt="growInX" src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*vhRVSLxDqU8AAAAAAAAAAABkARQnAQ" width="400" />

```ts
chart.options({
  type: 'interval',
  /* ... */
  animate: { enter: { type: 'growInX' } },
});
```
