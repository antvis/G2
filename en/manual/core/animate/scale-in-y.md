---
title: "scaleInY"
description: "scaleInY"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/manual/core/animate/scale-in-y/"
version: "5.4.8"
---

`scaleInY` is a growth animation for individual graphics along the y-direction. It affects the `transform.scale` property.

## Getting Started

<img alt="scaleInY" src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*L6mkQa3aG64AAAAAAAAAAABkARQnAQ" width="400" />

```ts
chart.options({
  type: 'interval',
  /* ... */
  animate: { enter: { type: 'scaleInY' } },
});
```
