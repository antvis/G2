---
title: View
order: 4.1
---

The **view** in G2 is used to draw multiple marks. A view has a coordinate system and is the smallest unit of application interaction.

```js
({
  type: 'view',
  children: [{ type: 'interval' }],
});
```

The top-level Chart is a view by default:

```js
// Add an Interval to this view
chart.interval();
```

When the top-level Chart adds a compound node, you can declare the view through `chart.view`:

```js
const spaceFlex = chart.spaceFlex();

const view = spaceFlex.view();

view.line();
view.point();
```

## Core Concepts

- [**data**](/manual/core/data) - Visual data
- [**encode**](/manual/core/encode) - Encoding information
- [**scale**](/manual/core/encode) - Mapping rules
- [**transform**](/manual/core/transform) - Channel value transformation
- [**layout**](/manual/core/layout) - Configuration of layout algorithm
- [**coordinate**](/manual/core/coordinate) - Coordinate system transformation
- [**style**](/manual/core/style) - Visual style
- [**labelTransform**](/manual/core/label) - Data label transformation
- [**title**](/manual/core/title) - Chart title
- [**axis**](/manual/core/axis) - Coordinate axis
- [**legend**](/manual/core/legend) - Legend
- [**scrollbar**](/manual/core/scrollbar) - Scrollbar
- [**slider**](/manual/core/slider) - Drag bar
- [**interaction**](/manual/core/interaction) - Interaction
- [**theme**](/manual/core/theme) - Theme

```js
({
  type: 'view',
  data: [],
  encode: {},
  scale: {},
  transform: [],
  coordinate: {},
  style: {},
  labelTransform: {},
  title: {},
  axis: {},
  legend: {},
  tooltip: {},
  scrollbar: {},
  slider: {},
  interaction: {},
  theme: {},
});
```
