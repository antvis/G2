---
title: View
order: 3
---

## Overview

In G2, a **View** is the core component unit of charts, used to host and organize multiple marks, and to uniformly manage data, coordinate systems, interactions, styles, etc. Each view has independent data, coordinate system, and interaction configurations, and serves as the smallest unit for applying interactions and styles. Through proper view decomposition, complex visualization layouts such as multi-layer, faceted, and nested compositions can be achieved.

Views not only support flexible data and encoding configurations but can also inherit and override configurations passed from parent levels (such as composite views, facets, etc.), enabling flexible composition and reuse.

---

## Use Cases

- Basic rendering of single charts (such as bar charts, line charts, etc.)
- Multi-layer overlay (such as bar chart + line chart, scatter plot + heatmap, etc.)
- Complex layouts like facets, small multiples, dashboards
- Independent management of local interactions, local styles, and local data
- Zoned application of advanced features like themes, animations, and states

---

## Configuration Options

Views support rich configuration options covering data, encoding, coordinates, styles, interactions, and other aspects. The configuration options are essentially the same as the top-level Chart, commonly used as follows:

| Configuration | Description                          | Type         | Scope/Inheritance                |
| ------------- | ------------------------------------ | ------------ | -------------------------------- |
| data          | Data source                          | array/object | view and all its children        |
| encode        | Mapping from data to visual channels | object       | view and all its children        |
| scale         | Scales for visual channels           | object       | Inheritable/Override (view/mark) |
| transform     | Data transformation                  | array        | Inheritable/Override (view/mark) |
| coordinate    | Coordinate system configuration      | object       | Inheritable/Override (view/mark) |
| style         | View area styles                     | object       | This view only                   |
| axis          | Axis configuration                   | object       | Inheritable/Override (view/mark) |
| legend        | Legend configuration                 | object       | Inheritable/Override (view/mark) |
| tooltip       | Tooltip configuration                | object       | This view only                   |
| interaction   | Interaction configuration            | object       | Inheritable/Override (view/mark) |
| theme         | Theme configuration                  | object       | Inheritable/Override             |
| children      | Child marks or views                 | array        | This view only                   |

**Notes:**

- Configurations like `data`, `encode`, `scale`, `axis`, `legend`, `transform`, `coordinate`, `interaction` set at the view level will automatically apply to all children (marks), and can be individually overridden at the mark level.
- Others like `style`, `tooltip` only apply to the current view.

**Complete configuration example:**

```js
({
  type: 'view',
  data: [
    { type: 'A', value: 30 },
    { type: 'B', value: 50 },
    { type: 'C', value: 20 },
  ],
  encode: { x: 'type', y: 'value' },
  scale: { y: { nice: true } },
  coordinate: { type: 'rect' },
  style: { viewFill: '#f5f5f5' },
  axis: { y: { grid: true } },
  legend: { color: { position: 'top' } },
  tooltip: {
    title: { field: 'type' },
    items: [{ field: 'value' }],
  },
  interaction: { elementHighlight: true },
  theme: { color: ['#5B8FF9', '#5AD8A6', '#5D7092'] },
  children: [
    { type: 'interval' },
    { type: 'line', style: { stroke: '#faad14' } },
  ],
});
```

---

## Configuration Methods

### 1. Declarative Configuration

Directly declare views and their child elements in options:

```js
({
  type: 'view',
  data: [...],
  encode: {...},
  children: [
    { type: 'interval', encode: {...} },
    { type: 'line', encode: {...} },
  ],
});
```

### 2. API Chaining

Create views and add marks through API:

```js
const chart = new G2.Chart();
const view = chart.view({ data: [...] });
view.interval().encode('x', 'type').encode('y', 'value');
view.line().encode('x', 'type').encode('y', 'value');
chart.render();
```

### 3. Composite Views and Facets

Views can serve as child nodes of composite nodes (such as facets, spatial layouts):

```js
const facet = chart.facetRect();
facet.view().interval().encode('x', 'type').encode('y', 'value');
facet.view().line().encode('x', 'type').encode('y', 'value');
```

---

## Views and Styles

Views support setting styles for their own area (such as background color, borders, etc.) and can provide unified style management for child marks. For details, see [Style](/en/manual/core/style).

```js
({
  type: 'view',
  style: {
    viewFill: '#e6f7ff',
    plotFill: '#fffbe6',
    mainFill: '#fff',
    contentFill: '#f0f5ff',
  },
  children: [{ type: 'interval', style: { fill: '#5B8FF9' } }],
});
```
