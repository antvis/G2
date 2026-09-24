---
title: "scaleOutX"
description: "scaleOutX"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/manual/core/animate/scale-out-x/"
version: "5.4.8"
---

`scaleOutX` is a disappearing animation for individual graphics along the x-direction. It affects the `transform.scale` property.

## Getting Started

<img alt="scaleOutX" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*XpI1SbHQADUAAAAAAAAAAAAADmJ7AQ/original" width="400" />

```ts
chart.options({
  type: 'interval',
  /* ... */
  animate: { exit: { type: 'scaleOutX' } },
});
```
