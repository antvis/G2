---
title: Scrollbar
order: 7.3
---

In G2, the **Scrollbar** can be used to filter data, and it can be bound with the x or y channel. By default, the scrollbar is turned off.

The scrollbar can be configured at the mark level:

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
// First method
chart.interval().scrollbar('x', {}).scrollbar('y', {});

// Second method
chart.interval().scrollbar({
  x: {},
  y: {},
});
```

The scrollbar can also be configured at the view level:

```js
({
  type: 'view',
  scrollbar: {
    x: {},
    y: {},
  },
});
```

## Mark Scrollbar

In G2, each mark has its own scrollbar. If the scale corresponding to the mark is synchronized, the scrollbars will also merge.

## View Scrollbar

The scrollbar has transitivity. The scrollbar declared on the view will be passed to the `children` declared mark. If this mark has a corresponding channel scrollbar, it will merge; otherwise, it will not effect.