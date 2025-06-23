---
title: cell
order: 5
---

## Overview

`cell` is an abstract representation of a rectangular mark (Rect Shape), primarily used to represent cells in facets or grids. It is the smallest unit for mapping data to visual elements in charts. Specifically, it is a type of area division that typically corresponds to an independent drawing area in different facets, commonly seen in matrix-type charts (such as calendar charts, aggregated heatmaps, etc.).

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'cell',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/seattle-weather.json',
  },
  transform: [{ type: 'group', color: 'max' }], // Apply group transformation to data, grouping by maximum color values
  encode: {
    x: (d) => new Date(d.date).getUTCDate(), // Encode x-axis using the UTC date part of the date field
    y: (d) => new Date(d.date).getUTCMonth(), // Encode y-axis using the UTC month part of the date field
    color: 'temp_max', // Encode color using the temp_max field from data
    shape: 'cell',
  },
  style: { inset: 0.5 }, // Set cell inset to 0.5
  scale: {
    color: {
      type: 'sequential', // Set color scale as sequential scale
      palette: 'gnBu', // Use 'gnBu' color palette
    },
  },
});

chart.render(); // Render the chart
```

For more examples, please check the [Chart Examples](/examples#general-cell) page.

## Configuration

| Property  | Description                                                                                                                                                    | Type                    | Default | Required |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ------- | -------- |
| encode    | Configure visual channels for `cell` marks, including `x`, `y`, `color`, `shape`, etc., to specify the relationship between visual element properties and data | [encode](#encode)       | -       | ✓        |
| scale     | Configure graphic scaling for `cell` marks, including `x`, `y`, `color`, `shape`, etc.                                                                         | [scale](#scale)         | -       |          |
| style     | Configure `cell` graphic styles                                                                                                                                | [style](#style)         | -       |          |
| transform | Configure `cell` data transformation operations (such as binning, sorting, filtering, etc.).                                                                   | [transform](#transform) | -       |          |

### encode

Configure visual channels for `cell` marks.

| Property | Description                                                                                                                                                         | Type                          | Default | Required |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------- | -------- |
| x        | Bind the `x` property channel for `cell` marks, typically a time or ordered categorical field from `data`                                                           | [encode](/manual/core/encode) | -       | ✓        |
| y        | Bind the `y` property channel for `cell` marks, typically a numerical or array field from `data`                                                                    | [encode](/manual/core/encode) | -       | ✓        |
| color    | Bind the `color` property channel for `cell` marks; mapping data fields to color channels will group data, splitting data into multiple areas with different colors | [encode](/manual/core/encode) | -       |          |
| shape    | Bind the `shape` property channel for `cell` marks, changing the drawing shape of graphic marks, supported properties: `cell` \| `hollow`                           | _string_                      | `cell`  |          |

For more `encode` configurations, please check the [encode](/manual/core/encode) introduction page.

#### color

Through the `color` property in `encode`, you can map data fields to color values, automatically adjusting mark colors based on data changes. This is very useful for data visualization as it helps you quickly identify data patterns and trends.

```js | ob { inject: true }
const { Chart } = G2;
const chart = new Chart({
  container: 'container',
});
const container = chart.getContainer();

chart.options({
  type: 'cell',
  data: [
    { x: 'x-a', y: 'y-a', data1: 1, data2: 5 },
    { x: 'x-a', y: 'y-b', data1: 3, data2: 8 },
    { x: 'x-a', y: 'y-c', data1: 2, data2: 6 },
    { x: 'x-b', y: 'y-a', data1: 8, data2: 2 },
    { x: 'x-b', y: 'y-b', data1: 5, data2: 4 },
    { x: 'x-b', y: 'y-c', data1: 6, data2: 9 },
    { x: 'x-c', y: 'y-a', data1: 7, data2: 1 },
    { x: 'x-c', y: 'y-b', data1: 4, data2: 2 },
    { x: 'x-c', y: 'y-c', data1: 9, data2: 3 },
  ],
  encode: {
    x: 'x', // Encode x-axis
    y: 'y', // Encode y-axis
    color: 'data1', // Use data1 field from data
  },
  style: {
    inset: 5,
    lineWidth: 10,
  },
});

// Insert Encode-Color selector
const selectorContainer = document.createElement('div');
selectorContainer.textContent = 'Select field to map to color ';
const selector = document.createElement('select');
selector.innerHTML = `
    <option value="data1" selected>data1</option>
    <option value="data2">data2</option>
  `;

selector.onchange = (e) => {
  chart.options({
    encode: {
      color: e.target.value, // Map color using the selected field
    },
  });
  chart.render(); // Re-render the chart
};
selectorContainer.appendChild(selector);
container.insertBefore(selectorContainer, container.childNodes[0]);

chart.render();
```

#### shape

Through the `shape` property in `encode`, you can specify the geometric shape of cells. Shape determines how each cell is rendered on the canvas. The supported shapes for `shape` marks are as follows:

| Shape  | Description                        | Example                                                                                                          |
| ------ | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| cell   | Fill the entire cell with color    | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*zsXFRKR3ZZkAAAAAAAAAAAAAemJ7AQ/original"></img> |
| hollow | Draw area chart with smooth curves | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*uu_9QavQ-zUAAAAAAAAAAAAAemJ7AQ/original"></img> |

### scale

`scale` is used to define how data maps to visual properties (such as color, size, shape, etc.). In `cell` usage scenarios, the common role of scale is to provide mapping rules for each visual channel (such as color, size, position, etc.), enabling data points to be accurately presented.

| Property  | Description                       | Type                                                 | Default |
| --------- | --------------------------------- | ---------------------------------------------------- | ------- |
| [channel] | Channel mapped to visual property | Record<string, [scale](/manual/core/scale/overview)> | -       |

For more `scale` configurations, please check the [scale](/manual/core/scale/overview) introduction page.

### style

`style` is used to set the appearance styles of chart elements, including fill color, border styles, shadow effects, etc.

| Property          | Description                                                                                                                                                                  | Type                                              | Default                                |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | -------------------------------------- |
| radius            | Border radius size for all four corners of the rectangle                                                                                                                     | `number` \| `Function<number>`                    | 0                                      |
| radiusTopLeft     | Top-left corner radius                                                                                                                                                       | `number` \| `Function<number>`                    | 0                                      |
| radiusTopRight    | Top-right corner radius                                                                                                                                                      | `number` \| `Function<number>`                    | 0                                      |
| radiusBottomRight | Bottom-right corner radius                                                                                                                                                   | `number` \| `Function<number>`                    | 0                                      |
| radiusBottomLeft  | Bottom-left corner radius                                                                                                                                                    | `number` \| `Function<number>`                    | 0                                      |
| inset             | Inset padding for all four directions of the rectangle                                                                                                                       | `number` \| `Function<number>`                    | 0                                      |
| insetLeft         | Left inset padding                                                                                                                                                           | `number` \| `Function<number>`                    | 0                                      |
| insetRight        | Right inset padding                                                                                                                                                          | `number` \| `Function<number>`                    | 0                                      |
| insetBottom       | Bottom inset padding                                                                                                                                                         | `number` \| `Function<number>`                    | 0                                      |
| insetTop          | Top inset padding                                                                                                                                                            | `number` \| `Function<number>`                    | 0                                      |
| fill              | Fill color of the graphic                                                                                                                                                    | `string` \| `Function<string>`                    | Default is '' when `shape` is `hollow` |
| fillOpacity       | Fill opacity of the graphic                                                                                                                                                  | `number` \| `Function<number>`                    | Default is 0.95 when `shape` is `cell` |
| stroke            | Stroke of the graphic                                                                                                                                                        | `string` \| `Function<string>`                    | -                                      |
| strokeOpacity     | Stroke opacity                                                                                                                                                               | `number` \| `Function<number>`                    | Default is 1 when `shape` is `hollow`  |
| lineWidth         | Width of the graphic stroke                                                                                                                                                  | `number` \| `Function<number>`                    | Default is 2 when `shape` is `hollow`  |
| lineDash          | Dashed stroke configuration. First value is the length of each dash segment, second value is the distance between segments. Setting lineDash to [0, 0] results in no stroke. | `[number,number]` \| `Function<[number, number]>` | -                                      |
| opacity           | Overall opacity of the graphic                                                                                                                                               | `number` \| `Function<number>`                    | -                                      |
| shadowColor       | Shadow color of the graphic                                                                                                                                                  | `string` \| `Function<string>`                    | -                                      |
| shadowBlur        | Gaussian blur coefficient of the graphic shadow                                                                                                                              | `number` \| `Function<number>`                    | -                                      |
| shadowOffsetX     | Horizontal distance of shadow from the graphic                                                                                                                               | `number` \| `Function<number>`                    | -                                      |
| shadowOffsetY     | Vertical distance of shadow from the graphic                                                                                                                                 | `number` \| `Function<number>`                    | -                                      |
| cursor            | Mouse cursor style. Same as CSS cursor style, default 'default'.                                                                                                             | `string` \| `Function<string>`                    | 'default'                              |

For more `style` configurations, please check the [style](/manual/core/style) introduction page.

### transform

`transform` is a core configuration item for data transformation, allowing preprocessing of raw data before binding it to graphic marks. By processing data, it generates more structured data suitable for visualization, thereby more clearly expressing data distribution, density, or statistical characteristics.

| Property  | Description                                                  | Type               | Default    |
| --------- | ------------------------------------------------------------ | ------------------ | ---------- |
| type      | Which channels to perform data grouping and aggregation on   | string \| string[] | ['x', 'y'] |
| [channel] | Aggregation method for data output to specific mark channels | Reducer            | -          |

```ts
type Primitive = number | string | boolean | Date;

type Reducer =
  | 'mean'
  | 'max'
  | 'count'
  | 'min'
  | 'median'
  | 'sum'
  | 'first'
  | 'last'
  | ((I: number[], V: Primitive[]) => Primitive);
```

For more `transform` configurations, please check the [transform](/manual/core/transform/overview) introduction page.

Try it out:
