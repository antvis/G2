---
title: 主题（Theme）
order: 11
---

G2 中**主题（Theme）** 是图表中图形的一些默认样式。

可以在视图层级配置主题：

```js
({
  type: 'view',
  theme: {},
});
```

```js
// API
chart.theme({});
```

也可以在标记层级配置主题：

```js
({
  type: 'interval',
  theme: {},
});
```

```js
// API
chart.interval().theme({});
```

## 切换主题

G2 内置了一些主题，可以通过 `type` 进行切换。

```js
chart.theme({ type: 'classicDark' }); // 使用暗色主题
```

## 自定义主题

> 该功能还没有稳定...
