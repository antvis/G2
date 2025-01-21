---
title: 滑动条（Slider）
order: 7.4
---

G2 中**滑动条（Slider）** 可以用于过滤数据，可以和 x 或者 y 通道绑定的，滑动条默认都是关闭的。

滑动条可以在 Mark 层级配置：

```js
({
  type: 'interval',
  slider: {
    x: {},
    y: {},
  },
});
```

```js
// API
// 第一种方式
chart.interval().slider('x', {}).slider('y', {});

// 第二种方式
chart.interval().slider({
  x: {},
  y: {},
});
```

滑动条也可以在 View 层级配置：

```js
({
  type: 'view',
  slider: {
    x: {},
    y: {},
  },
});
```

## 标记滑动条

在 G2 中，每个标记都有自己的滑动条。如果标记对应的比例尺是同步的，那么滑动条也会合并。

## 视图滑动条

滑动条具有传递性。视图上声明的滑动条会传递给 `children` 声明的标记，如果该标记有对应通道的滑动条，就合并；否则不影响。
