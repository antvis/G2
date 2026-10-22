---
title: "growInX"
description: "沿 x 方向缩放图形容器，实现容器内图形整体展开的入场动画。"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/manual/core/animate/grow-in-x/"
version: "5.4.8"
---

[资料索引](/llms.txt)

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
