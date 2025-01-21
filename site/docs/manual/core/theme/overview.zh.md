---
title: 概览
order: 1
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

有两种自定义主题的方式，第一种是在 theme 指定希望覆盖某些主题样式：

```js
const theme = {};

// Spec 形式
const options = {
  theme: {
    type: 'light',
    ...theme,
  },
};

// API 形式
chart.theme({ type: 'light', ...theme });
```

下面的例子覆盖了 light 主题的默认颜色：

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
      color: 'red', // 设置默认颜色为红色
    },
  });

  chart.render();

  return chart.getContainer();
})();
```

如果希望自定义所有的主题样式，可以新增一个主题、覆盖默认主题、注册，然后使用。

```js | ob
(() => {
  // 定义主题
  function CustomTheme() {
    const light = G2.Light();
    return { ...light, color: 'red' };
  }

  // 注册主题
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
    theme: { type: 'custom' }, // 使用主题
  });

  chart.render();

  return chart.getContainer();
})();
```

包含的默认主题有：

- `G2.Light`
- `G2.Dark`
- `G2.Classic`
- `G2.ClassicDark`
- `G2.Academy`

完整的主题配置可以参考 [light](https://github.com/antvis/G2/blob/v5/src/theme/light.ts) 主题。
