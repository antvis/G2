---
title: "zoomOut"
description: "zoomOut"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/manual/core/animate/zoom-out/"
version: "5.4.8"
---

`zoomOut` is a zoom-out animation that scales down from the center point of graphics. It affects the `transform.scale` property.

## Getting Started

<img alt="zoomOut" src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*PZ2gTrkV29YAAAAAAAAAAABkARQnAQ" width="400" />

```ts
chart.options({
  type: 'interval',
  /* ... */
  animate: { exit: { type: 'zoomOut' } },
});
```
