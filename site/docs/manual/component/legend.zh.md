---
title: 图例（Legend）
order: 7.2
---

G2 中**图例（Legend）** 可以理解为是非空间通道（color，opacity，size，shape）对应比例尺的可视化。

图例可以在 Mark 层级配置：

```js
({
  type: 'interval',
  legend: {
    color: {},
    size: {},
  },
});
```

```js
// API
// 第一种方式
chart.interval().legend('color', {}).legend('size', {});

// 第二种方式
chart.interval().legend({
  color: {},
  size: {},
});
```

图例也可以在 View 层级配置：

```js
({
  type: 'view',
  legend: {
    color: {},
    size: {},
  },
});
```

## 标记图例

在 G2 中，每个标记都有自己的图例。如果标记对应的比例尺是同步的，那么图例也会合并。

## 视图图例

图例具有传递性。视图上声明的图例会传递给 `children` 声明的标记，如果该标记有对应通道的图例，就合并；否则不影响。

## 隐藏图例

隐藏每个通道的图例：

```js
({
  type: 'interval',
  legend: { color: false }, // 隐藏 color 通道的图例
});
```

隐藏多个图例：

```js
({
  type: 'interval',
  legend: false,
});
```
