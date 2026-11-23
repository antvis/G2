---
title: growInY
description: 沿 y 方向缩放图形容器，实现容器内图形整体展开的入场动画。
order: 2
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
