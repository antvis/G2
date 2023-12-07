---
title: Size
order: 3
---

Regardless of whether it is a single view plot or a multiple view plot, layout information (chart width and height, etc.) is specified at the top level of the options.

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

The API can be specified when initializing the Chart object:

```js
const chart = new Chart({
  type: 'view',
  width: 640,
  height: 180,
  margin: 10,
  // ...
});
```

It can also be specified via `node.attr`:

```js
chart.interval().attr('padding', 10).attr('margin', 20);

chart.view().attr('padding', 10).attr('margin', 20);

chart.spaceFlex().attr('padding', 10).attr('margin', 20);
```

## Default Width and Height

When width and height are not specified in the declaration options, G2 will use **640px** as the width and **480px** as the height by default.

```js
({ type: 'view' });
```

## Specifying Width and Height

You can also specify the width and height through `options.width` and `options.height`.

```js
({ type: 'view', width: 600, height: 400 });
```

## Container Width and Heigh

If you want the width and height of the chart to be consistent with the container, you can set `options.autoFit` to `true`. Its priority is higher than the specified width and height.

```js
({ type: 'view', autoFit: true });
```

## View Model

The view model in G2 defines how a view is divided. Different areas drawn will draw different things and can be set through different options. Now you can simply think of the view as a diagram. The view model of G2 is as follows:

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

- **View Area**：The blue + orange + red + cyan part in the above figure, where the blue part is called **the margin area**, is mainly used to fix components (axes, legends, etc.) to the border distance.
- **Plot Area**：The orange + red + cyan part in the above figure, the orange part is called **the padding area**, this area is used for drawing components.
- **Main Area**：The red + cyan part in the above figure, where the red part is called **the breathing area**, is used to create a distance between components and marks (graphic elements) to prevent overlap, especially useful for scatter plots.
- **Content Area**：he cyan part in the above figure, is mainly used for drawing marks (graphic elements).

You can set the size of each area with the following configuration:

- **margin** - Set the values of the four directions of the margin, the priority is lower than setting individually
- **marginLeft** - Set the left margin
- **marginTop** - Set the top margin
- **marginRight** - Set the right margin
- **marginBottom** - Set the bottom margin
- **padding** - Set the values of the four directions of the padding, the priority is lower than setting individually
- **paddingLeft** - Set the left padding
- **paddingTop** - Set the top padding
- **paddingRight** - Set the right padding
- **paddingBottom** - Set the bottom padding
- **inset** - Set the values of the four directions of the breathing area, the priority is lower than setting individually
- **insetLeft** - Set the left breathing area
- **insetTop** - Set the top breathing area
- **insetRight** - Set the right breathing area
- **insetBottom** - Set the bottom breathing area

The size of the content area is obtained from the following formula:

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

