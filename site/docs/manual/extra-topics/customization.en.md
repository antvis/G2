---
title: Customization
order: 8
---
G2 is highly extensible: all visual components can be customized. Here are some common ways to customize visual components.

## Custom Shape (Shape)

Each mark can have a custom shape, and the shape determines the final display form of the mark. There are three main steps to customizing a shape:

* Define shape components.
* Register shape.
* Use shape.

First let's take a look at how to define shape components. A shape component is a function that accepts the style of the shape *style* and context *context* , and the function returns a drawing function *render*. The *style* is the processed options specified through `mark.style`, and *context* contains *document* for creating graphics in [@antv/g](https://g.antv.antgroup.com/).

The *render* function accepts the control points of the graph *P*, mapping value *value* and default value *defaults*, returns the graph of @antv/g. *P* is an array composed of a series of canvas coordinates, *value* is the processed value specified through `mark.encode`, *defaults* is the value specified in the theme for `theme.mark.shape`. The definition of a shape component is roughly as follows:

```js
function ShapeTriangle(style, context) {
  const { document } = context;
  return (P, value, defaults) => {
    return document.createElement('rect', {
      //...
    });
  };
}
```

The next step is to register the shape by calling `G2.register('shape.${mark}.${shape}', Shape)` to complete the registering of the shape. *mark* is the name of the marker, *shape* is the name of the shape, *Shape* is a defined shape component. For example, register a triangle shape for the Interval tag:

```js
import { register } from '@antv/g2';

register('shape.interval.triangle', ShapeTriangle);
```

The last step is to use the shape, which can be passed `mark.encode` specified, or via `mark.style` designation.

```js
({
  type: 'interval',
  encode: { shape: 'triangle' },
  // or
  style: { shape: 'triangle' },
});
```

```js
// API
chart.interval().encode('shape', 'triangle');

// or
chart.interval().style('shape', 'triangle');
```

Below is a complete example showing how to customize the shape.

```js | ob
(() => {
  // Define graphic components
  function ShapeTriangle(style, context) {
    const { document } = context;
    return (P, value, defaults) => {
      const { color: defaultColor } = defaults;
      const [p0, p1, p2, p3] = P;
      const pm = [(p0[0] + p1[0]) / 2, p0[1]];
      const { color = defaultColor } = value;
      return document.createElement('polygon', {
        style: {
          ...style,
          fill: color,
          points: [pm, p2, p3],
        },
      });
    };
  }

  // Register the triangle
  G2.register('shape.interval.triangle', ShapeTriangle);

  // Initialize chart
  const chart = new G2.Chart();

  chart
    .interval()
    .data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ])
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .encode('shape', 'triangle'); // Use this shape

  chart.render();

  return chart.getContainer();
})();
```

## Custom Tips (Tooltip)

Sometimes the built-in Tooltip cannot meet the needs. In this case, you can use *render* function in `mark.interaction.tooltip.render` or `view.interaction.tooltip.render` to render custom prompts.

This *render* function accepts event object *event* and prompt data *tooltipData*, and returns a string or DOM object. *event* is the mouse object thrown by [@antv/g](https://g.antv.antgroup.com/), *tooltipData* is the title and items data declared through `mark.tooltip`. If the return value is a string, it will be used as the innerHTML of the tooltip container, otherwise the return value will be mounted. A hint's render function might look like this:

```js
function render(event, tooltipData) {
  const { title, items } = tooltipData;
  return `<div></div>`;
}
```

Here's a simple example:

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
    })
    .transform([{ type: 'sortX', by: 'y', reverse: true }])
    .encode('x', 'letter')
    .encode('y', 'frequency')
    .interaction('tooltip', {
      // The method of render callback returns innerHTML or DOM element.
      render: (event, { title, items }) => `<div>
      <h3 style="padding:0;margin:0">${title}</h3>
      <ul>${items.map(
        (d) =>
          `<li><span style="color: ${d.color}">${d.name}</span> ${d.value}</li>`,
      )}</ul>
      </div>`,
    });

  chart.render();

  return chart.getContainer();
})();
```

## Custom Legend (Legend)

The built-in legend of G2 is drawn with canvas or svg. If you want to render the legend with HTML, you can customize the legend as follows:

* Turn off the built-in legend and render the chart.
* Wait for chart rendering to complete and render the HTML legend based on the scale data.
* Add interactions if you need.

The first step is to turn off the built-in legend and rendering the chart.

```js
chart.options({ legend: false });
```

Then wait for the chart rendering to complete and call `legendColor` to render HTML legend:

```js
chart.render().then(legendColor);
```

In `legendColor` function, we first need to draw the legend. In the following example, after drawing the legend, it is added to the front of the canvas:

```js
function legendColor(chart) {
  const node = chart.getContainer();
  const legend = document.createElement('div');
  node.insertBefore(legend, node.childNodes[0]);

  // ...
}
```

After drawing the legend, we need to draw the legend items. This data is obtained from the scale of the corresponding channel: `chart.getScale().color`, and obtain the corresponding name and value through the domain and range of scale.

```js
function legendColor(chart) {
  // ...
  const scale = chart.getScale().color;
  const { domain } = scale.getOptions();
  const items = domain.map(() => {});
  // ...
}
```

After drawing the legend items, we should add interaction to each legend item using `item.onclick`, collect the currently selected value, and then apply a Filter transformation to the chart declaration based on this value. Finally, re-render the chart. The complete implementation is as follows:

```js | ob
(() => {
  // Add legend
  function legendColor(chart) {
    // Create a legend and attach it to the chart.
    const node = chart.getContainer();
    const legend = document.createElement('div');
    legend.style.display = 'flex';
    node.insertBefore(legend, node.childNodes[0]);

    // Create and mount items.
    const { color: scale } = chart.getScale();
    const { domain } = scale.getOptions();
    const items = domain.map((value) => {
      const item = document.createElement('div');
      const color = scale.map(value);
      item.style.marginLeft = '1em';
      item.innerHTML = `
      <span style="
        background-color:${color};
        display:inline-block;
        width:10px;
        height:10px;"
      ></span>
      <span>${value}</span>
      `;
      return item;
    });
    items.forEach((d) => legend.append(d));

    // Listening events
    const selectedValues = [...domain];
    const options = chart.options();
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const value = domain[i];
      item.style.cursor = 'pointer';
      item.onclick = () => {
        const index = selectedValues.indexOf(value);
        if (index !== -1) {
          selectedValues.splice(index, 1);
          item.style.opacity = 0.5;
        } else {
          selectedValues.push(value);
          item.style.opacity = 1;
        }
        changeColor(selectedValues);
      };
    }

    // Re-render the view
    function changeColor(value) {
      const { transform = [] } = options;
      const newTransform = [{ type: 'filter', color: { value } }, ...transform];
      chart.options({
        ...options,
        transform: newTransform, // Specify a new transform
        scale: { color: { domain } },
      });
      chart.render(); // Re-render the chart
    }
  }

  // Render the chart
  const container = document.createElement('div');

  const chart = new G2.Chart({
    
    container,
  });

  chart.options({
    type: 'interval',
    data: [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ],
    encode: { x: 'genre', y: 'sold', color: 'genre' },
    legend: false,
  });

  chart.render().then(legendColor);

  return chart.getContainer();
})();
```

## Custom Drag Axis (Slider)

If you don’t want to use G2’s default coordinate axes, you can follow the following steps to customize the drag axis:

* Render the slider after rendering.
* Listen to slider events.

The key to the first step is determining the position and length of the slide  using the coordinate object obtained through `chart.getCoordinate`. In the second step, the key is to use `chart.getScale` to invert the selected range on the scale, and then obtain the selected data range, and finally update the scale's domain.

```js | ob
(() => {
  function sliderX(chart) {
    // Create and mount range
    const container = chart.getContainer();
    const range = document.createElement('input');
    container.append(range);

    // Set the width and other properties of the range based on coordinate
    const coordinate = chart.getCoordinate();
    const { paddingLeft, width } = coordinate.getOptions();
    range.type = 'range';
    range.min = 0;
    range.max = width;
    range.value = width;
    range.style.display = 'block';
    range.style.width = width + 'px';
    range.style.marginLeft = paddingLeft + 'px';

    // Listen to the change event and obtain the filtered domain through scale
    // Update domain and render
    const scale = chart.getScaleByChannel('x');
    const options = chart.options();
    range.onchange = (event) => {
      const value = event.target.value;
      const range = [0, value / width];
      const domain = range.map((d) => scale.invert(d));
      chart.options({
        ...options,
        scale: { x: { domain } },
      });
      chart.render();
    };
  }

  // Render chart
  const container = document.createElement('div');
  const chart = new G2.Chart({ container });

  chart.options({
    type: 'line',
      data: {
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
    },
    encode: { x: 'date', y: 'close' },
  });

  chart.render().then(sliderX);

  return chart.getContainer();
})();
```
