---
title: "scaleInX"
description: "沿 x 方向逐渐放大单个图形，实现横向展开的入场动画。"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/manual/core/animate/scale-in-x/"
version: "5.4.8"
---

[资料索引](/llms.txt)

`scaleInX` 单个图形沿着 x 方向的生长动画。影响 `transform.scale` 属性。

## 开始使用

<img alt="scaleInX" src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*oiaGTLx-dNcAAAAAAAAAAABkARQnAQ" width="400" />

```ts
chart.options({
  type: 'interval',
  /* ... */
  animate: { enter: { type: 'scaleInX' } },
});
```
