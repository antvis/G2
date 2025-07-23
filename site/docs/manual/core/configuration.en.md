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

## Configuration Usage Examples

### Basic Configuration Example

```javascript
// Simple bar chart configuration
const spec = {
  type: 'interval',
  width: 800,
  height: 600,
  autoFit: true,
  data: {
    type: 'inline',
    value: [
      { category: 'A', value: 10 },
      { category: 'B', value: 20 },
      { category: 'C', value: 15 },
    ],
  },
  encode: {
    x: 'category',
    y: 'value',
    color: 'category',
  },
  scale: {
    x: { type: 'band' },
    y: { type: 'linear', nice: true },
  },
  coordinate: { type: 'cartesian' },
  animate: {
    enter: { type: 'growInY', duration: 1000 },
  },
  interaction: {
    tooltip: { type: 'tooltip' },
    elementHighlight: { type: 'elementHighlight' },
  },
  axis: {
    x: { title: 'Category' },
    y: { title: 'Value', grid: true },
  },
  legend: {
    color: { position: 'top' },
  },
  theme: { type: 'classic' },
};
```

### Complex Composition Configuration Example

```javascript
// Multi-view composition configuration
const spec = {
  type: 'view',
  width: 1200,
  height: 800,
  data: {
    /* shared data */
  },
  coordinate: { type: 'cartesian' },
  children: [
    {
      type: 'line',
      encode: { x: 'date', y: 'price', color: 'symbol' },
      transform: [{ type: 'filter', callback: (d) => d.price > 0 }],
      animate: { enter: { type: 'pathIn' } },
      interaction: {
        tooltip: { shared: true },
        brushHighlight: { type: 'brushXHighlight' },
      },
    },
    {
      type: 'point',
      encode: { x: 'date', y: 'volume', size: 'volume' },
      coordinate: { type: 'cartesian' },
      style: { opacity: 0.6 },
    },
  ],
  axis: {
    x: { type: 'axisX', title: 'Time' },
    y: { type: 'axisY', title: 'Price', position: 'left' },
  },
  legend: {
    color: { position: 'right', layout: 'vertical' },
  },
};
```

## Configuration Hierarchy Description

1. **Top-level Configuration (G2Spec)**: Contains basic chart properties and main configuration items
2. **Mark Configuration**: Defines specific visual marks, the core part of charts, including:
   - **Data Configuration**: Data sources and data preprocessing
   - **Mark Transform**: Data transformation and statistical computation
   - **Visual Encoding**: Mapping data to visual channels
   - **Scale Configuration**: Mapping from data range to visual range
   - **Coordinate Configuration**: Chart coordinate system settings
   - **Layout Configuration**: Facet, clip, cartesian coordinate settings
   - **Style Configuration**: Mark style, view style, theme configuration
   - **State Configuration**: Interactive state styles (active, selected, etc.)
   - **Animation Configuration**: Enter, update, exit animation effects
   - **Interaction Configuration**: User interaction behavior settings
   - **Labels Configuration**: Data label display settings
   - **Component Configuration**: Axis, legend, tooltip and other component settings
3. **Composition Configuration**: Used for creating complex multi-view compositions
4. **Component Configuration**: Independent component configurations that can be used separately

Each configuration item supports type checking and intelligent hints to ensure configuration correctness and completeness. Through this hierarchical structure, you can quickly locate and configure any desired chart properties.

## Notes

- Most configuration items are optional, G2 provides reasonable defaults
- Some configuration items have type constraints, please refer to corresponding type definitions
- Configuration items support function forms for dynamic configuration
- Some advanced configurations need to be used with specific data formats
- It's recommended to combine with specific examples to understand and use each configuration item
