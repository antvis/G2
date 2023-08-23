---
title: 坐标轴（Axis）
order: 7.1
---

G2 中的**坐标轴（Axis）** 可以理解为是空间通道（x，y 和 position）对应比例尺的可视化。

坐标轴可以在 Mark 层级配置：

```js
({
  type: 'interval',
  axis: {
    x: { labelFormatter: '%0' },
    y: { tickCount: 5 },
  },
});
```

```js
// API
// 第一种方式
chart
  .interval()
  .axis('x', { labelFormatter: '%0' })
  .axis('y', { tickCount: 5 });

// 第二种方式
chart.interval().axis({
  x: { labelFormatter: '%0' },
  y: { tickCount: 5 },
});
```

坐标轴也可以在 View 层级配置：

```js
({
  type: 'view',
  axis: {
    x: { labelFormatter: '%0' },
    y: { tickCount: 5 },
  },
});
```

```js
// API
// 第一种方式
chart.axis('x', { labelFormatter: '%0' }).axis('y', { tickCount: 5 });

// 第二种方式
chart.axis({
  x: { labelFormatter: '%0' },
  y: { tickCount: 5 },
});
```

## 标注坐标轴

在 G2 中每个标记都有自己的坐标轴。如果标记对应比例尺是同步的，那么坐标轴也会合并。

## 视图坐标轴

坐标轴具有传递性。视图上声明的坐标轴会传递给 `children` 声明的标记，如果该标记有对应通道的坐标轴，就合并；否则不影响。

## 隐藏坐标轴

隐藏每个通道的坐标轴：

```js
({
  type: 'interval',
  axis: { y: false }, // 隐藏 y 方向坐标轴
});
```

隐藏多个坐标轴：

```js
({
  type: 'interval',
  axis: false,
});
```
