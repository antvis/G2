---
title: 布局（Layout）
order: 6.1
---

G2 中**布局（Layout）** 用于指定一些有特定布局函数标记的布局方法的参数，比如 Snakey, WordCloud, ForceGraph 等。

```js
({
  type: 'sankey',
  layout: {
    nodeAlign: 'center',
    nodePadding: 0.03,
  },
});
```

```js
// API
chart.sankey().layout({ nodeAlign: 'center', nodePadding: 0.03 });
```
