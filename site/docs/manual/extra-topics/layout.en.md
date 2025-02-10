---
title: 特定标记的布局（Layout）
order: 5.1
---

**Layout** in G2 is used to specify some parameters of layout methods marked by specific layout functions, such as Snakey, WordCloud, ForceGraph, etc.

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
