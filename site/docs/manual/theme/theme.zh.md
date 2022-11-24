---
title: 主题
order: 9
---

主题是图表中图形的一些默认样式。 可以通过 `chart.theme()` 去指定主题。

## 切换主题

G2 内置了一些主题，可以通过 `type` 进行切换。

```js
chart.theme({ type: 'dark' }); // 使用暗色主题
```

## 覆盖主题

也可以覆盖当前主题的一些属性。

```js
chart.theme({ defaultColor: 'red' }); // 指定默认样式是红色
```

## 定义主题

当然也可以定义一套新的主题。

```js
// CustomTheme.js
export function CustomTheme() {
  return {
    defaultColor: 'red',
    ...
  }
}
```

直接使用。

```js
import { CustomTheme } from './CustomTheme';

// ...

chart.theme({ type: CustomTheme });
```

注册使用。

```js
import { CustomTheme } from './CustomTheme';

// 注册
register('theme.custom', CustomTheme);

chart.theme({ type: 'custom' });
```
