---
title: "morphing"
description: "morphing"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/manual/core/animate/morphing/"
version: "5.4.8"
---

`morphing` is a shape transformation animation between graphics, created through transitions between SVG paths.

## Getting Started

<img alt="morphing" src="https://gw.alipayobjects.com/zos/raptor/1670815385405/animation.gif" width="400" />

```ts
chart.options({
  type: 'area',
  /* ... */
  animate: { enter: { type: 'morphing' } },
});
```
