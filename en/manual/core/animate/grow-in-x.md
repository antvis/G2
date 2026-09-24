---
title: "growInX"
description: "growInX"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/manual/core/animate/grow-in-x/"
version: "5.4.8"
---

`growInX` is a matrix animation where containers scale along the x-direction, commonly used for G.Group container animations. It affects the graphic's `transform.scale` property.

## Getting Started

<img alt="growInX" src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*vhRVSLxDqU8AAAAAAAAAAABkARQnAQ" width="400" />

```ts
chart.options({
  type: 'interval',
  /* ... */
  animate: { enter: { type: 'growInX' } },
});
```
