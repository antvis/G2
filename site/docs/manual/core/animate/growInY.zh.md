---
title: growInY
order: 1
---

`growInY` 是容器沿着 y 方向放大的矩阵动画，多用于 G.Group 容器类进行动画。影响图形的 `transform.scale` 属性。

## 开始使用

<img alt="growInY" src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*L6mkQa3aG64AAAAAAAAAAABkARQnAQ" width="400" />

```ts
chart
  .interval()
  /* ... */
  .animate('enter', { type: 'growInY' });
```
