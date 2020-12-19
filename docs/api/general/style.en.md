---
title: 图形样式 - Style
order: 10
---

几何图形样式设置，接受一个 [`ShapeAttrs`](../shape/shape-attrs) 参数，也支持指定映射的字段，通过回调函数返回一个 `ShapeAttrs` 绘图属性。

```ts
geometry.style(styleAttrs); // 直接传入一个绘图属性
geometry.style([fields], () => styleAttrs); // 通过回调函数返回一个绘图属性
```

使用示例 1：

```sign
chart.interval().style({ fill: 'red' })
```

使用示例 2：

```sign
chart.interval().style('a', (aVal) => {
  if (a === 1) return { fill: 'red' };
  return { fill: 'blue' };
});
```
