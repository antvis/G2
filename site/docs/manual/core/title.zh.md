---
title: 标题（Title）
order: 7
---

G2 中**标题（Title）** 用于指定图表的标题。

标题可以在 Mark 层级配置：

```js
({
  type: 'interval',
  title: {
    title: 'hello',
    subtitle: 'world',
  },
});
```

```js
// API
chart.interval().title({
  title: 'hello',
  subtitle: 'world',
});
```

标题也可以在 View 层级配置：

```js
({
  type: 'view',
  title: {
    title: 'hello',
    subtitle: 'world',
  },
});
```

```js
// API
chart.title({ title: 'hello', subtitle: 'world' });
```

更多配置项，可以参考文档 [title](/spec/component/title)。
