---
title: "zoomIn"
description: "zoomIn"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/manual/core/animate/zoom-in/"
version: "5.4.8"
---

`zoomIn` is a zoom-in animation that scales up from the center point of graphics. It affects the `transform.scale` property.

## Getting Started

<img alt="zoomIn" src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*wc4dQp4E6vkAAAAAAAAAAABkARQnAQ" width="400" />

```ts
chart.options({
  type: 'interval',
  /* ... */
  animate: { enter: { type: 'zoomIn' } },
});
```
