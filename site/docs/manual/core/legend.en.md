---
title: Legend
order: 7.2
---

In G2, the **Legend** can be understood as the visualization of the non-spatial channel (color, opacity, size, shape) corresponding to the scale.

The legend can be configured at the mark level:

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
// First method
chart.interval().legend('color', {}).legend('size', {});

// Second method
chart.interval().legend({
  color: {},
  size: {},
});
```

Legends can also be configured at the view level:

```js
({
  type: 'view',
  legend: {
    color: {},
    size: {},
  },
});
```

## Mark Legend

In G2, each mark has its own legend. If the scale corresponding to the mark is synchronized, the legends will be merged.

## View Legend

The legend has transitivity. The legend declared on the view will be passed to the `children` declared mark. If the mark has a corresponding channel legend, it will be merged; otherwise, it will not be affected.

## Hide Legend

Hide the legend of each channel:

```js
({
  type: 'interval',
  legend: { color: false }, // Hide the legend of the color channel
});
```

Hide multiple legends:

```js
({
  type: 'interval',
  legend: false,
});
```
