---
title: "fadeOut"
description: "通过逐渐降低图形透明度实现淡出动画。"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/manual/core/animate/fade-out/"
version: "5.4.8"
---

[资料索引](/llms.txt)

`fadeOut` 是渐现动画，影响 `opacity` 透明度属性。

## 开始使用

<img alt="fadeOut" src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*s4Y4S5JJ6WEAAAAAAAAAAABkARQnAQ" width="400" />

```ts
chart.options({
  type: 'interval',
  /* ... */
  animate: { exit: { type: 'fadeOut' } },
});
```
