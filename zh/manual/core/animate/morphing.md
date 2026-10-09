---
title: "morphing"
description: "morphing"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/manual/core/animate/morphing/"
version: "5.4.8"
---

`morphing` 图形之间的形变动画，通过 SVG Path 之间的过渡形成的动画。

## 开始使用

<img alt="morphing" src="https://gw.alipayobjects.com/zos/raptor/1670815385405/animation.gif" width="400" />

```ts
chart.options({
  type: 'area',
  /* ... */
  animate: { enter: { type: 'morphing' } },
});
```
