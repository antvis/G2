---
title: 标题（Title）
order: 7
---

Title in G2 is used to specify the title of the chart.

Titles can be configured at the level of mark:

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

Titles can also be configured at the level of view:

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

More options about title, see the API document of [title](/spec/component/title).
