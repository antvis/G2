---
title: "scaleOutX"
description: "scaleOutX"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/manual/core/animate/scale-out-x/"
version: "5.4.8"
---

`scaleOutX` 单个图形沿着 x 方向的消失动画。影响 `transform.scale` 属性。

## 开始使用

<img alt="scaleOutX" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*XpI1SbHQADUAAAAAAAAAAAAADmJ7AQ/original" width="400" />

```ts
chart.options({
  type: 'interval',
  /* ... */
  animate: { exit: { type: 'scaleOutX' } },
});
```
