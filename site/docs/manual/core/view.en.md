---
title: View
order: 3
---

In G2, a **View** is used to draw multiple marks. A view possesses a coordinate system and serves as the smallest unit for applying interactions.

```js
({
  type: 'view',
  children: [{ type: 'interval' }],
});
```

The top-level Chart is, by default, a view:

```js
// Add an Interval to this view
chart.interval();
```

When composite nodes are added to the top-level Chart, views can be declared using `chart.view`:

```js
const spaceFlex = chart.spaceFlex();

const view = spaceFlex.view();

view.line();
view.point();
```

## Core Concepts

- [**data**](/manual/core/data/overview) - Data for visualization
- [**encode**](/manual/core/encode) - Encoding information
- [**scale**](/manual/core/scale/overview) - Mapping rules
- [**transform**](/manual/core/transform/overview) - Transform channel values
- [**coordinate**](/manual/core/coordinate/overview) - Coordinate transformation
- [**style**](/manual/core/style) - Visual style
- [**labelTransform**](/manual/component/label) - Data label transformation
- [**title**](/manual/component/title) - Chart title
- [**axis**](/manual/component/axis) - Axes
- [**legend**](/manual/component/legend) - Legend
- [**scrollbar**](/manual/component/scrollbar) - Scrollbar
- [**slider**](/manual/component/slider) - Drag axis
- [**interaction**](/manual/core/interaction/overview) - Interaction
- [**theme**](/manual/core/theme/overview) - Theme

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
