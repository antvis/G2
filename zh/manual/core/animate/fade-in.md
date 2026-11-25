---
title: "fadeIn"
description: "通过逐渐增加图形透明度实现淡入动画。"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/manual/core/animate/fade-in/"
version: "5.4.8"
---

[资料索引](/llms.txt)

`fadeIn` 是渐现动画，影响 `opacity` 透明度属性。

## 开始使用

<img alt="fadeIn" src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*LTRRRL8JwfQAAAAAAAAAAABkARQnAQ" width="400" />

```ts
chart.options({
  type: 'interval',
  /* ... */
  animate: { enter: { type: 'fadeIn' } },
});
```
