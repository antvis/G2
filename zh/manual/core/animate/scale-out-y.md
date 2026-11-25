---
title: "scaleOutY"
description: "沿 y 方向逐渐缩小单个图形，实现纵向收缩的退场动画。"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/manual/core/animate/scale-out-y/"
version: "5.4.8"
---

[资料索引](/llms.txt)

`scaleOutY` 单个图形沿着 y 方向的消失动画。影响 `transform.scale` 属性。

## 开始使用

<img alt="scaleOutY" src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*L6mkQa3aG64AAAAAAAAAAABkARQnAQ" width="400" />

```ts
chart.options({
  type: 'interval',
  /* ... */
  animate: { exit: { type: 'scaleOutY' } },
});
```
