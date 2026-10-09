---
title: "zoomIn"
description: "zoomIn"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/manual/core/animate/zoom-in/"
version: "5.4.8"
---

`zoomIn` 沿着图形中心点的放大动画。影响 `transform.scale` 属性。

## 开始使用

<img alt="zoomIn" src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*wc4dQp4E6vkAAAAAAAAAAABkARQnAQ" width="400" />

```ts
chart.options({
  type: 'interval',
  /* ... */
  animate: { enter: { type: 'zoomIn' } },
});
```
