---
title: 概览
order: 1
---

## 概述

G2 中 **主题（Theme）** 是一组预定义的样式配置，用于控制图表的整体外观，包括颜色、字体、边距等视觉属性。主题系统使得图表能够保持一致的视觉风格，同时提供了灵活的自定义能力，以满足不同场景下的设计需求。

主题在 G2 中的作用主要体现在以下几个方面：

1. **统一视觉风格**：为图表提供一致的视觉语言，使得多个图表在同一应用中能够保持风格统一
2. **适应不同场景**：提供明暗两种基础主题，适应不同的应用背景和使用环境
3. **简化配置**：通过预设的样式配置，减少重复的样式定义工作
4. **增强可读性**：通过精心设计的颜色方案和布局，提升图表的可读性和美观度

G2 的主题系统支持多层级配置，可以在视图层级或标记层级进行设置，并且支持局部覆盖和完全自定义。

### 主题层级

G2 的主题可以在不同层级进行配置：

1. **视图层级**：应用于整个图表或视图

   ```js
   chart.options({
     theme: { type: 'dark' },
   });

   // 或使用API形式
   chart.theme({ type: 'dark' });
   ```

2. **标记层级**：应用于特定的图形标记

   ```js
   chart.options({
     type: 'interval',
     theme: { color: 'steelblue' },
   });

   // 或使用API形式
   chart.interval().theme({ color: 'steelblue' });
   ```

当同时存在多个层级的主题配置时，标记层级的配置会覆盖视图层级的配置。

### 内置主题

G2 内置了多种主题，可以通过 `type` 属性进行切换：

| 主题名称      | 描述         | 适用场景                             |
| ------------- | ------------ | ------------------------------------ |
| `light`       | 默认亮色主题 | 适用于浅色背景的应用界面             |
| `dark`        | 暗色主题     | 适用于深色背景的应用界面             |
| `classic`     | 经典主题     | 基于亮色主题的变体，使用经典配色方案 |
| `classicDark` | 经典暗色主题 | 基于暗色主题的变体，使用经典配色方案 |
| `academy`     | 学术主题     | 适用于学术论文、报告等场景           |

使用内置主题的方式如下：

```js
// Spec形式
chart.options({
  theme: { type: 'dark' },
});

// API形式
chart.theme({ type: 'classicDark' });
```

## 配置项

主题配置项可以分为基础配置、视图配置、组件配置和标记配置四个部分。

| 属性       | 描述                       | 类型                                                                   | 默认值     | 必选 |
| ---------- | -------------------------- | ---------------------------------------------------------------------- | ---------- | ---- |
| type       | 指定使用的主题类型         | `'light'` \| `'dark'` \| `'classic'` \| `'classicDark'` \| `'academy'` | `'light'`  |      |
| padding    | 图表内边距                 | `'auto'` \| `number`                                                   | `'auto'`   |      |
| margin     | 图表外边距                 | `number`                                                               | `16`       |      |
| inset      | 图表内部图形与坐标轴的间距 | `'auto'` \| `number`                                                   | `'auto'`   |      |
| color      | 默认颜色                   | `string`                                                               | 取决于主题 |      |
| size       | 默认大小                   | `number`                                                               | `1`        |      |
| category10 | 分类颜色方案（10 色）      | `string` \| `string[]`                                                 | 取决于主题 |      |
| category20 | 分类颜色方案（20 色）      | `string` \| `string[]`                                                 | 取决于主题 |      |
| view       | 视图区域配置               | [view](#view)                                                          | -          |      |
| enter      | 入场动画配置               | [animation](#animation)                                                | -          |      |
| update     | 更新动画配置               | [animation](#animation)                                                | -          |      |
| exit       | 退场动画配置               | [animation](#animation)                                                | -          |      |

### view

视图区域配置项。

| 属性        | 描述                 | 类型     | 默认值          | 必选 |
| ----------- | -------------------- | -------- | --------------- | ---- |
| viewFill    | 整个视图区域的填充色 | `string` | `'transparent'` |      |
| plotFill    | 绘图区域的填充色     | `string` | `'transparent'` |      |
| mainFill    | 主区域的填充色       | `string` | `'transparent'` |      |
| contentFill | 内容区域的填充色     | `string` | `'transparent'` |      |

### animation

动画配置项。

| 属性     | 描述                 | 类型                                                  | 默认值   | 必选 |
| -------- | -------------------- | ----------------------------------------------------- | -------- | ---- |
| duration | 动画持续时间（毫秒） | `number`                                              | `300`    |      |
| fill     | 动画填充模式         | `'none'` \| `'forwards'` \| `'backwards'` \| `'both'` | `'both'` |      |
| delay    | 动画延迟时间（毫秒） | `number`                                              | `0`      |      |

## 自定义主题

G2 提供了两种自定义主题的方式：局部覆盖和完全自定义。

### 局部覆盖

最简单的自定义方式是在使用主题时覆盖部分配置项：

```js
// Spec形式
chart.options({
  theme: {
    type: 'light', // 基于light主题
    color: 'steelblue', // 覆盖默认颜色
    margin: 20, // 覆盖默认外边距
  },
});

// API形式
chart.theme({
  type: 'dark', // 基于dark主题
  category10: ['#ff0000', '#00ff00', '#0000ff'], // 自定义颜色方案
});
```

这种方式适合只需要调整少量样式的场景，简单直接。

### 完全自定义

对于需要完全控制主题的场景，可以创建自定义主题函数，然后注册并使用：

```js
// 1. 定义主题函数
function CustomTheme() {
  // 可以基于现有主题进行修改
  const light = G2.Light();

  // 返回修改后的主题配置
  return {
    ...light,
    color: '#3366cc',
    category10: [
      '#3366cc',
      '#dc3912',
      '#ff9900',
      '#109618',
      '#990099',
      '#0099c6',
      '#dd4477',
      '#66aa00',
      '#b82e2e',
      '#316395',
    ],
    // 其他自定义配置...
  };
}

// 2. 注册主题
G2.register('theme.custom', CustomTheme);

// 3. 使用自定义主题
chart.options({
  theme: { type: 'custom' },
});
```

这种方式适合需要全面控制主题样式的场景，提供了最大的灵活性。

## 示例

### 使用内置主题

下面的示例展示了如何使用内置的暗色主题：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  theme: {
    type: 'dark',
    view: {
      viewFill: '#1f1f1f', // 设置暗色背景
    },
  },
  type: 'interval',
  data: [
    { genre: '运动', sold: 275 },
    { genre: '策略', sold: 115 },
    { genre: '角色扮演', sold: 120 },
    { genre: '动作', sold: 350 },
    { genre: '模拟', sold: 150 },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
});

chart.render();
```

### 自定义颜色

下面的示例展示了如何自定义默认颜色：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  theme: { color: '#8a2be2' }, // 设置默认颜色为紫色
  type: 'line',
  data: [
    { year: '2018', value: 30 },
    { year: '2019', value: 40 },
    { year: '2020', value: 45 },
    { year: '2021', value: 50 },
    { year: '2022', value: 56 },
    { year: '2023', value: 70 },
  ],
  encode: {
    x: 'year',
    y: 'value',
  },
});

chart.render();
```

### 自定义颜色方案

下面的示例展示了如何自定义分类颜色方案：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  theme: {
    // 自定义分类颜色方案
    category10: [
      '#ff9999',
      '#99ff99',
      '#9999ff',
      '#ffff99',
      '#ff99ff',
      '#99ffff',
      '#ffcc99',
      '#99ccff',
      '#ff9966',
      '#66ff99',
    ],
  },
  type: 'interval',
  data: [
    { category: 'A', value: 10 },
    { category: 'B', value: 20 },
    { category: 'C', value: 15 },
    { category: 'D', value: 25 },
    { category: 'E', value: 18 },
  ],
  encode: {
    x: 'category',
    y: 'value',
    color: 'category',
  },
});

chart.render();
```

### 自定义视图区域样式

下面的示例展示了如何自定义视图区域的样式：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  theme: {
    view: {
      viewFill: '#f5f5f5', // 设置视图背景色
      plotFill: '#ffffff', // 设置绘图区背景色
    },
  },
  type: 'point',
  data: [
    { x: 1, y: 4 },
    { x: 2, y: 5 },
    { x: 3, y: 7 },
    { x: 4, y: 3 },
    { x: 5, y: 6 },
    { x: 6, y: 8 },
    { x: 7, y: 5 },
    { x: 8, y: 9 },
    { x: 9, y: 6 },
  ],
  encode: {
    x: 'x',
    y: 'y',
    shape: 'point',
    size: 10,
  },
});

chart.render();
```

更多主题相关的示例，可以查看[图表示例 - 主题](/examples#style-theme)页面。
