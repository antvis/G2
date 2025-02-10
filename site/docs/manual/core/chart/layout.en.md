---
title: G2 Chart Layout
order: 4
---

Whether for single-view or multi-view charts, layout information (such as chart width and height) is specified at the top level of the options.

```js
const markLevel = {
  type: 'interval',
  width: 640,
  height: 180,
  margin: 10,
};

const viewLevel = {
  type: 'view',
  width: 640,
  height: 180,
  margin: 10,
  // ...
};

const compositionLevel = {
  type: 'spaceFlex',
  width: 640,
  height: 180,
  margin: 10,
};
```

The API allows you to specify these when initializing the Chart object:

```js
const chart = new Chart({
  type: 'view',
  width: 640,
  height: 180,
  margin: 10,
  // ...
});
```

You can also specify them using `node.attr`:

```js
chart.interval().attr('padding', 10).attr('margin', 20);

chart.view().attr('padding', 10).attr('margin', 20);

chart.spaceFlex().attr('padding', 10).attr('margin', 20);
```

### Default Width and Height

If width and height are not specified in the options, G2 defaults to **640px** for width and **480px** for height.

```js
({ type: 'view' });
```

### Specifying Width and Height

You can also specify width and height using `options.width` and `options.height`.

```js
({ type: 'view', width: 600, height: 400 });
```

### Container Width and Height

If you want the chart to match the container's dimensions, set `options.autoFit` to `true`, which takes precedence over specified width and height.

```js
({ type: 'view', autoFit: true });
```

### View Model

In G2, the view model defines how a view is divided, with different regions used for drawing different elements and configured using various options. You can simply think of a view as a chart. Here's the view model in G2:

```js | ob {pin:false}
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'point',
    height: 280,
    marginTop: 30,
    marginLeft: 40,
    marginBottom: 10,
    marginRight: 20,
    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/commits.json',
    },
    encode: {
      x: (d) => new Date(d.time).getUTCHours(),
      y: (d) => new Date(d.time).getUTCDay(),
      size: 'count',
      shape: 'point',
    },
    transform: [{ type: 'group', size: 'sum' }, { type: 'sortY' }],
    scale: { y: { type: 'point' } },
    style: { shape: 'point', fill: '#59a14f' },
    axis: {
      x: { title: 'time (hours)', tickCount: 24 },
      y: { title: 'time (day)', grid: true },
    },
    legend: false,
    inset: 10,
    viewStyle: {
      viewFill: '#4e79a7',
      plotFill: '#f28e2c',
      mainFill: '#e15759',
      contentFill: '#76b7b2',
    },
  });

  chart.render();

  return chart.getContainer();
})();
```

- **View Area**: In the diagram above, the blue, orange, red, and teal areas. The blue area is the **margin area**, primarily used to fix components (axes, legends, etc.) away from the edge.
- **Plot Area**: The orange, red, and teal areas in the diagram. The orange area is the **padding area**, where components are drawn.
- **Main Area**: The red and teal areas in the diagram. The red area is the **inset area**, used to create space between components and marks (graphical elements) to prevent overlap, which is especially useful in scatter plots.
- **Content Area**: The teal area in the diagram, mainly for drawing marks (graphical elements).

You can configure the size of each area with the following options:

- **margin** - Sets the values for the margin on all four sides; lower priority than setting each separately
- **marginLeft** - Sets the left margin
- **marginTop** - Sets the top margin
- **marginRight** - Sets the right margin
- **marginBottom** - Sets the bottom margin
- **padding** - Sets the values for the padding on all four sides; lower priority than setting each separately
- **paddingLeft** - Sets the left padding
- **paddingTop** - Sets the top padding
- **paddingRight** - Sets the right padding
- **paddingBottom** - Sets the bottom padding
- **inset** - Sets the values for the inset on all four sides; lower priority than setting each separately
- **insetLeft** - Sets the left inset
- **insetTop** - Sets the top inset
- **insetRight** - Sets the right inset
- **insetBottom** - Sets the bottom inset

The size of the content area is determined by the following formula:

```js
const contentWidth =
  width -
  paddingLeft -
  paddingRight -
  marginLeft -
  marginRight -
  insetLeft -
  insetRight;

const contentHeight =
  height -
  paddingTop -
  paddingBottom -
  marginTop -
  marginBottom -
  insetTop -
  insetBottom;
```  
