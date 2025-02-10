---
title: overview
order: 1
---

In G2, **Theme** refers to the default styles of the graphics in a chart.

Themes can be configured at the view level:

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

Themes can also be configured at the mark level:

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

## Switching Themes

G2 provides built-in themes that can be switched using the `type` property.


```js
chart.theme({ type: 'classicDark' }); // use the dark theme
```

## Custom Themes

There are two ways to customize the theme, the first is to specify in theme that you want to override certain theme styles:

```js
const theme = {};

// Spec format
const options = {
  theme: {
    type: 'light',
    ...theme,
  },
};

// API format
chart.theme({ type: 'light', ...theme });
```

The following example overrides the default color of the light theme:

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    data: {
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
    },
    encode: { x: 'letter', y: 'frequency' },
    axis: { y: { labelFormatter: '.0%' } },
    theme: {
      color: 'red', // Set the default color to red
    },
  });

  chart.render();

  return chart.getContainer();
})();
```

If you want to customize all theme styles, you can add a new theme, override the default theme, register it, and then use it.

```js | ob
(() => {
  // define the theme
  function CustomTheme() {
    const light = G2.Light();
    return { ...light, color: 'red' };
  }

  // register the theme
  G2.register('theme.custom', CustomTheme);

  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    data: {
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
    },
    encode: { x: 'letter', y: 'frequency' },
    axis: { y: { labelFormatter: '.0%' } },
    theme: { type: 'custom' }, // use the theme
  });

  chart.render();

  return chart.getContainer();
})();
```

The default themes included are:

- `G2.Light`
- `G2.Dark`
- `G2.Classic`
- `G2.ClassicDark`
- `G2.Academy`

For a complete theme configuration, you can refer to the [light](https://github.com/antvis/G2/blob/v5/src/theme/light.ts) theme.

