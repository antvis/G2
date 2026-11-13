---
title: "pathIn"
description: "利用线条虚线属性实现沿 SVG 路径逐步绘制的入场动画。"
language: "zh"
canonical: "https://g2.antv.antgroup.com/zh/manual/core/animate/path-in/"
version: "5.4.8"
---

[资料索引](/llms.txt)

`pathIn` 是 SVG Path 路径入场动画。通过影响 `lineDash` 属性来实现。

## 开始使用

<img alt="pathIn" src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*gxZ1RIIMtdIAAAAAAAAAAABkARQnAQ" width="400" />

```ts
chart.options({
  type: 'line',
  /* ... */
  animate: { enter: { type: 'pathIn' } },
});
```
