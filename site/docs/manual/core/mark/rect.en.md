---
title: rect
order: 23
---

## Overview

`rect` is a core chart element used to draw rectangular marks. It implements different visualization requirements by defining the starting point, ending point, width, height, and other graphic properties (such as color and style) of rectangles. `rect` can dynamically adjust the position, size, and style of rectangles based on bound data, thus intuitively displaying data distribution, comparison relationships, or density information. `rect` is widely used in scenarios such as bar charts, heatmaps, and matrix charts.

Core functional features of `rect`:

- **Drawing rectangular shapes**: rect is the fundamental unit for building rectangular charts, which can be used to construct bar, block, heatmap and other charts.
  Each rectangular unit displays specific data content by mapping numerical or categorical information from the data.
- **Rich encoding mapping**: Users can freely map data fields to visual attributes such as X-axis, Y-axis, size, color, etc. of rectangles.
  Provides flexible customization capabilities, generating various styles of rectangular graphics through the combination of fields and styles.
- **High extensibility and interactivity**: Supports interactive functions (such as click, highlight, zoom, etc.), enhancing dynamic interaction between graphics and users.
  Suitable for rectangular visualization needs in different fields, such as grid charts (heatmap), data density distribution charts, etc.
- **Seamless integration with G2 ecosystem**: As part of the G2 Mark system, rect can be freely combined with other components (such as line, point, etc.) to meet complex data visualization requirements.

## Getting Started

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'rect',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/athletes.json',
  },
  encode: { x: 'weight', y: 'height', color: 'sex' },
  transform: [{ type: 'bin', opacity: 'count' }],
  style: { inset: 0.5 },
});

chart.render(); // Render chart
```

For more examples, please visit the [Chart Examples](/en/examples) page.

## Configuration

| Property  | Description                                                                                                                                            | Type                    | Default | Required |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- | ------- | -------- |
| encode    | Configure visual channels for `rect` mark, including `x`, `y`, `color`, etc., used to specify relationships between visual element properties and data | [encode](#encode)       | -       | ✓        |
| transform | Configure data transformation operations for `rect` (such as binning, sorting, filtering, etc.).                                                       | [transform](#transform) | -       |          |
| style     | Configure graphic styles for `rect`                                                                                                                    | [style](#style)         | -       |          |

### encode

Configure visual channels for `rect` mark, an important configuration that defines the mapping relationship between data fields and visual properties, determining how data is transformed into visual representation.

| Property | Description                                                                                                                                                                  | Type                             | Default | Required |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ------- | -------- |
| color    | Bind the `color` property channel of `rect` mark. If a data field is mapped to the color channel, the data will be grouped and split into multiple areas of different colors | [encode](/en/manual/core/encode) | -       |          |
| shape    | Bind the `shape` property channel of `rect` mark, changing the drawing shape of the graphic mark                                                                             | [encode](/en/manual/core/encode) | 'rect'  |          |

**color**

The color visual channel affects the fill color of `rect` graphic marks (when applying certain hollow shapes, such as hollow, it will change the stroke color of the graphic). When applied to point charts, it generally maps categorical fields and groups the data.

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'rect',
  data: [
    { x: 1, y: 1, type: 'type1' },
    { x: 1, y: 2, type: 'type2' },
    { x: 2, y: 1, type: 'type3' },
    { x: 2, y: 2, type: 'type1' },
  ],
  transform: [{ type: 'bin' }],
  encode: { shape: 'rect', x: 'x', y: 'y', color: 'type' },
  style: { inset: 0.5 },
});

chart.render(); // Render chart
```

**shape**

Through the `shape` property of `encode`, you can specify the geometric shape of cells. Shape determines what shape each cell is rendered as on the canvas. The supported shapes for `shape` mark are as follows:

| Shape  | Description      |
| ------ | ---------------- |
| rect   | Rectangle        |
| hollow | Hollow rectangle |

```js | ob {  inject: true, pin: false }
const { Chart } = G2;
const chart = new Chart({
  container: 'container',
});
const container = chart.getContainer();
const shapeMap = [
  {
    shape: 'rect',
    label: 'Rectangle',
  },
  {
    shape: 'hollow',
    label: 'Hollow Rectangle',
  },
];

chart.options({
  type: 'rect',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/athletes.json',
  },
  encode: { shape: 'rect', x: 'weight', y: 'height', color: 'sex' },
  transform: [{ type: 'bin', opacity: 'count' }],
  style: { inset: 0.5 },
});

const handleSetShape = (shape) => {
  // Set the selected coordinate system
  chart.options({
    encode: { shape },
  });
  chart.render(); // Re-render chart
};

// Insert Encode-Color selector
const selectorContainer = document.createElement('div');
selectorContainer.textContent = 'Select Shape ';
const selector = document.createElement('select');
selector.innerHTML = shapeMap.map(
  (shape, index) =>
    `<option value="${shape.shape}" ${index === 0 ? 'selected' : ''}>${
      shape.label
    }</option>`,
);
selector.onchange = (e) => {
  handleSetShape(e.target.value);
};
selectorContainer.appendChild(selector);
container.insertBefore(selectorContainer, container.childNodes[0]);

chart.render();
```

For more `encode` configurations, please check the [encode](/en/manual/core/encode) introduction page.

### transform

`transform` is a core configuration item for data transformation, allowing preprocessing of raw data before it's bound to graphic marks. By processing data, it generates structured data more suitable for visualization, thus more clearly expressing data distribution, density, or statistical characteristics.

Common transformation types include:

- **bin**: Bin continuous data to generate histogram rectangles
- **stackY**: Stack rectangles vertically, automatically calculating stacked height for each category

```js | ob { pin: false, inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'rect',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/athletes.json',
  },
  encode: { x: 'weight', color: 'sex' },
  transform: [
    { type: 'binX', y: 'count' },
    { type: 'stackY', orderBy: 'series' },
  ],
});

chart.render();
```

For more `transform` configurations, please check the [transform](/en/manual/core/transform/overview) introduction page.

### style

`style` is used to set the appearance styles of chart elements, including fill color, border style, shadow effects, etc.

| Property          | Description                                                                                                                                                              | Type                                                               | Default   |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ | --------- |
| radius            | Border radius for all four corners of the rectangle                                                                                                                      | number \| (datum, index, data, column) => number                   | `0`       |
| radiusTopLeft     | Border radius for top-left corner                                                                                                                                        | number \| (datum, index, data, column) => number                   | `0`       |
| radiusTopRight    | Border radius for top-right corner                                                                                                                                       | number \| (datum, index, data, column) => number                   | `0`       |
| radiusBottomRight | Border radius for bottom-right corner                                                                                                                                    | number \| (datum, index, data, column) => number                   | `0`       |
| radiusBottomLeft  | Border radius for bottom-left corner                                                                                                                                     | number \| (datum, index, data, column) => number                   | `0`       |
| inset             | Inner padding for all four directions of the rectangle                                                                                                                   | number \| (datum, index, data, column) => number                   | `0`       |
| insetLeft         | Left inner spacing                                                                                                                                                       | number \| (datum, index, data, column) => number                   | `0`       |
| insetRight        | Right inner spacing                                                                                                                                                      | number \| (datum, index, data, column) => number                   | `0`       |
| insetBottom       | Bottom inner spacing                                                                                                                                                     | number \| (datum, index, data, column) => number                   | `0`       |
| insetTop          | Top inner spacing                                                                                                                                                        | number \| (datum, index, data, column) => number                   | `0`       |
| fill              | Fill color of the graphic                                                                                                                                                | number \| (datum, index, data, column) => string                   | -         |
| fillOpacity       | Fill opacity of the graphic                                                                                                                                              | number \| (datum, index, data, column) => number                   | -         |
| stroke            | Stroke of the graphic                                                                                                                                                    | number \| (datum, index, data, column) => string                   | -         |
| strokeOpacity     | Stroke opacity                                                                                                                                                           | number \| (datum, index, data, column) => number                   | -         |
| lineWidth         | Width of the graphic stroke                                                                                                                                              | number \| (datum, index, data, column) => number                   | -         |
| lineDash          | Dashed line configuration for stroke. First value is the length of each dash segment, second value is the gap distance. Setting lineDash to [0, 0] results in no stroke. | [number,number] \|(datum, index, data, column) => [number, number] | -         |
| opacity           | Overall opacity of the graphic                                                                                                                                           | number \| (datum, index, data, column) => number                   | -         |
| shadowColor       | Shadow color of the graphic                                                                                                                                              | number \| (datum, index, data, column) => string                   | -         |
| shadowBlur        | Gaussian blur coefficient for the graphic shadow                                                                                                                         | number \| (datum, index, data, column) => number                   | -         |
| shadowOffsetX     | Horizontal distance of shadow from the graphic                                                                                                                           | number \| (datum, index, data, column) => number                   | -         |
| shadowOffsetY     | Vertical distance of shadow from the graphic                                                                                                                             | number \| (datum, index, data, column) => number                   | -         |
| cursor            | Mouse cursor style. Same as CSS cursor style, default 'default'.                                                                                                         | number \| (datum, index, data, column) => string                   | 'default' |

Try it out

```js | ob {. inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .rect()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/athletes.json',
  })
  .encode('x', 'weight')
  .encode('color', 'sex')
  .transform({ type: 'binX', y: 'count' })
  .transform({ type: 'stackY', orderBy: 'series' })
  .style('inset', 0.5);

chart.render();

```

For more `style` configurations, please check the [style](/en/manual/core/style) introduction page.
