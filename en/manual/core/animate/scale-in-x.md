---
title: "scaleInX"
description: "scaleInX"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/manual/core/animate/scale-in-x/"
version: "5.4.8"
---

`scaleInX` is a growth animation for individual graphics along the x-direction. It affects the `transform.scale` property.

## Getting Started

<img alt="scaleInX" src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*oiaGTLx-dNcAAAAAAAAAAABkARQnAQ" width="400" />

```ts
chart.options({
  type: 'interval',
  /* ... */
  animate: { enter: { type: 'scaleInX' } },
});
```
