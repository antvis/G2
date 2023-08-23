---
title: 滚动条（Scrollbar）
order: 7.3
---

G2 中**滚动条（Scrollbar）** 可以用于过滤数据，可以和 x 或者 y 通道绑定的，滚动条默认都是关闭的。

滚动条可以在 Mark 层级配置：

```js
({
  type: 'interval',
  scrollbar: {
    x: {},
    y: {},
  },
});
```

```js
// API
// 第一种方式
chart.interval().scrollbar('x', {}).scrollbar('y', {});

// 第二种方式
chart.interval().scrollbar({
  x: {},
  y: {},
});
```

滚动条也可以在 View 层级配置：

```js
({
  type: 'view',
  scrollbar: {
    x: {},
    y: {},
  },
});
```

## 标记滚动条

在 G2 中，每个标记都有自己的滚动条。如果标记对应的比例尺是同步的，那么滚动条也会合并。

## 视图滚动条

滚动条具有传递性。视图上声明的滚动条会传递给 `children` 声明的标记，如果该标记有对应通道的滚动条，就合并；否则不影响。
