---
title: Overview
order: 1
---

## Introduction

In G2, **Theme** is a set of predefined style configurations used to control the overall appearance of charts, including visual attributes such as colors, fonts, and margins. The theme system enables charts to maintain consistent visual style while providing flexible customization capabilities to meet design requirements in different scenarios.

The role of themes in G2 is mainly reflected in the following aspects:

1. **Unified Visual Style**: Provides consistent visual language for charts, ensuring that multiple charts within the same application maintain style consistency
2. **Adaptation to Different Scenarios**: Provides light and dark basic themes to adapt to different application backgrounds and usage environments
3. **Simplified Configuration**: Reduces repetitive style definition work through preset style configurations
4. **Enhanced Readability**: Improves chart readability and aesthetics through carefully designed color schemes and layouts

G2's theme system supports multi-level configuration, can be set at the view level or mark level, and supports partial overrides and complete customization.

### Theme Hierarchy

G2 themes can be configured at different levels:

1. **View Level**: Applied to the entire chart or view

   ```js
   chart.options({
     theme: { type: 'dark' },
   });

   // Or use API form
   chart.theme({ type: 'dark' });
   ```

2. **Mark Level**: Applied to specific graphic marks

   ```js
   chart.options({
     type: 'interval',
     theme: { color: 'steelblue' },
   });

   // Or use API form
   chart.interval().theme({ color: 'steelblue' });
   ```

When multiple levels of theme configuration exist simultaneously, mark-level configuration will override view-level configuration.

### Built-in Themes

G2 has multiple built-in themes that can be switched using the `type` property:

| Theme Name    | Description         | Applicable Scenarios                                       |
| ------------- | ------------------- | ---------------------------------------------------------- |
| `light`       | Default light theme | Suitable for application interfaces with light backgrounds |
| `dark`        | Dark theme          | Suitable for application interfaces with dark backgrounds  |
| `classic`     | Classic theme       | A variant based on light theme with classic color scheme   |
| `classicDark` | Classic dark theme  | A variant based on dark theme with classic color scheme    |
| `academy`     | Academic theme      | Suitable for academic papers, reports and other scenarios  |

How to use built-in themes:

```js
// Spec form
chart.options({
  theme: { type: 'dark' },
});

// API form
chart.theme({ type: 'classicDark' });
```

## Configuration Options

Theme configuration options can be divided into four parts: basic configuration, view configuration, component configuration, and mark configuration.

| Property   | Description                             | Type                                                                   | Default         | Required |
| ---------- | --------------------------------------- | ---------------------------------------------------------------------- | --------------- | -------- |
| type       | Specifies the theme type to use         | `'light'` \| `'dark'` \| `'classic'` \| `'classicDark'` \| `'academy'` | `'light'`       |          |
| padding    | Chart inner padding                     | `'auto'` \| `number`                                                   | `'auto'`        |          |
| margin     | Chart outer margin                      | `number`                                                               | `16`            |          |
| inset      | Spacing between chart graphics and axis | `'auto'` \| `number`                                                   | `'auto'`        |          |
| color      | Default color                           | `string`                                                               | Theme dependent |          |
| size       | Default size                            | `number`                                                               | `1`             |          |
| category10 | Categorical color scheme (10 colors)    | `string` \| `string[]`                                                 | Theme dependent |          |
| category20 | Categorical color scheme (20 colors)    | `string` \| `string[]`                                                 | Theme dependent |          |
| view       | View area configuration                 | [view](#view)                                                          | -               |          |
| enter      | Enter animation configuration           | [animation](#animation)                                                | -               |          |
| update     | Update animation configuration          | [animation](#animation)                                                | -               |          |
| exit       | Exit animation configuration            | [animation](#animation)                                                | -               |          |

### view

View area configuration options.

| Property    | Description                    | Type     | Default         | Required |
| ----------- | ------------------------------ | -------- | --------------- | -------- |
| viewFill    | Fill color of entire view area | `string` | `'transparent'` |          |
| plotFill    | Fill color of plot area        | `string` | `'transparent'` |          |
| mainFill    | Fill color of main area        | `string` | `'transparent'` |          |
| contentFill | Fill color of content area     | `string` | `'transparent'` |          |

### animation

Animation configuration options.

| Property | Description                         | Type                                                  | Default  | Required |
| -------- | ----------------------------------- | ----------------------------------------------------- | -------- | -------- |
| duration | Animation duration (milliseconds)   | `number`                                              | `300`    |          |
| fill     | Animation fill mode                 | `'none'` \| `'forwards'` \| `'backwards'` \| `'both'` | `'both'` |          |
| delay    | Animation delay time (milliseconds) | `number`                                              | `0`      |          |

## Custom Themes

G2 provides two ways to customize themes: partial override and complete customization.

### Partial Override

The simplest customization approach is to override some configuration options when using a theme:

```js
// Spec form
chart.options({
  theme: {
    type: 'light', // Based on light theme
    color: 'steelblue', // Override default color
    margin: 20, // Override default margin
  },
});

// API form
chart.theme({
  type: 'dark', // Based on dark theme
  category10: ['#ff0000', '#00ff00', '#0000ff'], // Custom color scheme
});
```

This approach is suitable for scenarios where only a small amount of style adjustment is needed, simple and direct.

### Complete Customization

For scenarios that require complete control over themes, you can create custom theme functions, then register and use them:

```js
// 1. Define theme function
function CustomTheme() {
  // Can modify based on existing themes
  const light = G2.Light();

  // Return modified theme configuration
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
    // Other custom configurations...
  };
}

// 2. Register theme
G2.register('theme.custom', CustomTheme);

// 3. Use custom theme
chart.options({
  theme: { type: 'custom' },
});
```

This approach is suitable for scenarios that require comprehensive control over theme styles, providing maximum flexibility.

## Examples

### Using Built-in Themes

The following example shows how to use the built-in dark theme:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  theme: {
    type: 'dark',
    view: {
      viewFill: '#1f1f1f', // Set dark background
    },
  },
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'RPG', sold: 120 },
    { genre: 'Action', sold: 350 },
    { genre: 'Simulation', sold: 150 },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
});

chart.render();
```

### Custom Color

The following example shows how to customize the default color:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  theme: { color: '#8a2be2' }, // Set default color to purple
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

### Custom Color Scheme

The following example shows how to customize categorical color schemes:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  theme: {
    // Custom categorical color scheme
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

### Custom View Area Style

The following example shows how to customize view area styles:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  theme: {
    view: {
      viewFill: '#f5f5f5', // Set view background color
      plotFill: '#ffffff', // Set plot area background color
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

For more theme-related examples, you can visit the [Chart Examples - Theme](/en/examples#style-theme) page.
