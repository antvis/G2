---
title: G2's complete configuration system
order: 1
---

This document provides a comprehensive overview of G2's complete configuration system, covering all available configuration options and their hierarchical relationships.

## Chart Initialization Configuration

When creating a chart instance, you can pass the following configuration options through `new Chart(params)`:

| Option        | Type                                                     | Default  | Description                                                          |
| ------------- | -------------------------------------------------------- | -------- | -------------------------------------------------------------------- |
| **container** | `string \| HTMLElement`                                  | -        | Specify the DOM for chart rendering, can pass DOM id or DOM instance |
| **autoFit**   | `boolean`                                                | `false`  | Whether the chart auto-fits the container size                       |
| **clip**      | `boolean`                                                | `false`  | Whether to hide graphics outside the drawing area                    |
| **width**     | `number`                                                 | `640`    | Chart width                                                          |
| **height**    | `number`                                                 | `480`    | Chart height                                                         |
| **depth**     | `number`                                                 | `0`      | Chart depth, used in 3D charts                                       |
| **padding**   | `'auto' \| number`                                       | `'auto'` | Chart padding, usage similar to CSS box model                        |
| **margin**    | `number`                                                 | `16`     | Chart margin, usage similar to CSS box model                         |
| **inset**     | `number`                                                 | `0`      | Chart breathing space width                                          |
| **renderer**  | `Canvas \| SVG \| WebGL`                                 | `Canvas` | Specify rendering engine                                             |
| **theme**     | `'classic' \| 'classicDark' \| 'academy' \| customTheme` | -        | Configure chart theme                                                |
| **plugins**   | `any[]`                                                  | -        | Specify plugins used during rendering                                |

**Example:**

```javascript
const chart = new Chart({
  container: 'container', // DOM container
  autoFit: true, // Auto-fit container size
  clip: true, // Clip overflow area
  padding: 20, // Inner padding
  margin: 16, // Outer margin
  theme: 'classicDark', // Dark theme
  plugins: [new Plugin()], // Plugins
});
```

## Chart Configuration

After creating a chart instance, you can configure it in two ways:

### Method 1: API Chaining

```javascript
chart
  .data(data)
  .encode('x', 'field1')
  .encode('y', 'field2')
  .scale('x', { type: 'band' })
  .axis('x', { title: 'X Axis Title' });
```

### Method 2: Using options method with spec configuration

```javascript
chart.options({
  type: 'interval',
  data: data,
  encode: { x: 'field1', y: 'field2' },
  scale: { x: { type: 'band' } },
  axis: { x: { title: 'X Axis Title' } },
});
```

The following is the complete chart configuration hierarchy:

<Tree />
