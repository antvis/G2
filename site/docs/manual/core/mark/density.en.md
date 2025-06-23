---
title: density
order: 7
---

## Overview

`density` is a chart type used to visualize the probability density distribution of continuous variables. Through kernel density estimation [(Kernel Density Estimation, KDE)](/en/manual/core/data/kde), it transforms discrete data points into smooth continuous probability density curves, intuitively reflecting data concentration trends, distribution patterns, and outliers.

The core goal of `density` is to extract overall distribution patterns from scatter or point cloud data and map density information to a continuous area chart or gradient effect. This chart type is commonly used to analyze aggregation areas of large amounts of data points, data concentration hotspots, or probability density of data distribution, such as representing population density in geographic visualization, or showing regional trading frequency in analysis.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'density', // Set chart type as density plot
  data: {
    type: 'fetch', // Specify data type as network fetch
    value: 'https://assets.antv.antgroup.com/g2/species.json', // Set data URL address
    transform: [
      {
        type: 'kde', // Use Kernel Density Estimation (KDE) for data transformation
        field: 'y', // Specify KDE calculation field as 'y'
        groupBy: ['x', 'species'], // Group data by 'x' and 'species' fields
      },
    ],
  },
  encode: {
    x: 'x', // Map 'x' field to x-axis
    y: 'y', // Map 'y' field to y-axis
    color: 'species', // Map 'species' field to color
    size: 'size', // Map 'size' field to graphic size
    series: 'species', // Map 'species' field to series
  },

  tooltip: false, // Disable chart tooltip functionality
});

chart.render();
```

For more examples, please check the [Chart Examples - Violin Plot](/en/examples#general-violin) page.

## Configuration Options

| Property   | Description                                                                                                                                                   | Type                      | Default Value | Required |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ------------- | -------- |
| coordinate | Configure `density` chart coordinate system, supports properties: `cartesian` \| `polar`                                                                      | [coordinate](#coordinate) | `'cartesian'` |          |
| encode     | Configure `density` mark visual channels, including `x`, `y`, `color`, `size`, etc., used to specify relationships between visual element properties and data | [encode](#encode)         | -             | ✓        |
| scale      | Configure `density` mark graphic scaling, including `x`, `y`, `series`, `size`, etc.                                                                          | [scale](#scale)           | -             |          |
| style      | Configure `density` graphic style                                                                                                                             | [style](#style)           | -             |          |

### coordinate

`coordinate` is the core system in data visualization that defines how data maps to graphic space. It determines how data transforms from "numerical domain" to "visual position". Coordinate systems reshape the visual expression of density distribution through different spatial transformation rules.

| Coordinate System | Type          | Chart                   |
| ----------------- | ------------- | ----------------------- |
| Cartesian         | `'cartesian'` | Density plot, etc.      |
| Polar             | `'polar'`     | Polar violin plot, etc. |

```js | ob { inject: true }
const { Chart } = G2;
const chart = new Chart({
  container: 'container',
});
const container = chart.getContainer();
const coordinateMap = [
  {
    coordinate: 'cartesian',
    label: 'Cartesian Coordinate System',
  },
  {
    coordinate: 'polar',
    label: 'Polar Coordinate System',
  },
];

chart.options({
  type: 'density',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/species.json',
    transform: [
      {
        type: 'kde',
        field: 'y',
        groupBy: ['x', 'species'],
      },
    ],
  },
  encode: {
    x: 'x',
    y: 'y',
    color: 'species',
    size: 'size',
    series: 'species',
  },
  coordinate: { type: coordinateMap[0].coordinate },
  tooltip: false,
});

const handleSetCoordinate = (coordinate) => {
  // Set selected coordinate system
  chart.coordinate({
    type: coordinate,
  });
  chart.render(); // Re-render chart
};

// Insert Encode-Color selector
const selectorContainer = document.createElement('div');
selectorContainer.textContent = 'Select Coordinate System ';
const selector = document.createElement('select');
selector.innerHTML = coordinateMap.map(
  (coordinate, index) =>
    `<option value="${coordinate.coordinate}" ${
      index === 0 ? 'selected' : ''
    }>${coordinate.label}</option>`,
);
selector.onchange = (e) => {
  handleSetCoordinate(e.target.value);
};
selectorContainer.appendChild(selector);
container.insertBefore(selectorContainer, container.childNodes[0]);

chart.render();
```

For more `coordinate` configuration, please check the [coordinate](/en/manual/core/coordinate/overview) introduction page.

### encode

Configure `density` mark visual channels, an important configuration that defines the mapping relationships between data fields and visual properties, determining how data transforms into visual representation.

| Property | Description                                                                                                                                                                                                                                                                 | Type                             | Default Value | Required |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ------------- | -------- |
| x        | Bind the `x` property channel of `density` mark, usually a time or ordered categorical field in `data`                                                                                                                                                                      | [encode](/en/manual/core/encode) | -             | ✓        |
| y        | Bind the `y` property channel of `density` mark, usually a numerical or array field in `data`                                                                                                                                                                               | [encode](/en/manual/core/encode) | -             | ✓        |
| color    | Bind the `color` property channel of `density` mark. If a data field is mapped to the color channel, data will be grouped and split into multiple areas with different colors                                                                                               | [encode](/en/manual/core/encode) | -             |          |
| size     | Bind the `size` property channel of `density` mark, used to map data fields to the size property of graphic elements, enhancing data distribution comparison dimensions and information density by adjusting density curve line thickness or filled area visual proportions | [encode](/en/manual/core/encode) | -             | ✓        |
| series   | Bind the `series` property channel of `density` mark, used to map data grouping fields to chart series or categories, classifying data according to a field and generating independent graphic representations for each category                                            | [encode](/en/manual/core/encode) | -             | ✓        |

For more `encode` configuration, please check the [encode](/en/manual/core/encode) introduction page.

### scale

`scale` is used to define how data maps to visual properties (such as color, size, shape, etc.). In `density` usage scenarios, the common role of scale is to provide mapping rules for each visual channel (such as color, size, position, etc.), enabling data points to be accurately presented.

| Property | Description                                                                                                              | Type                                    | Default Value        | Required |
| -------- | ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- | -------------------- | -------- |
| x        | Define mapping rules from data fields to X-axis visual positions                                                         | [scale](/en/manual/core/scale/overview) | `{type: 'band'}`     |          |
| series   | Control mapping rules from categorical fields (series encoding) to visual properties (such as color, line type, symbols) | [scale](/en/manual/core/scale/overview) | `{type: 'band'}`     |          |
| size     | Map data fields to size properties of visual elements (such as density curve width, point area, or region height)        | [scale](/en/manual/core/scale/overview) | `{type: 'identity'}` |          |

For more `scale` configuration, please check the [scale](/en/manual/core/scale/overview) introduction page.

### style

`style` is used to set the appearance style of chart elements, including fill color, border style, shadow effects, etc.

| Property      | Description                                                                                                                                                                                   | Type                                              | Default Value | Required |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ------------- | -------- |
| fill          | Fill color of the graphic                                                                                                                                                                     | `string` \| `Function<string>`                    | -             |          |
| fillOpacity   | Fill opacity of the graphic                                                                                                                                                                   | `number` \| `Function<number>`                    | -             |          |
| stroke        | Stroke of the graphic                                                                                                                                                                         | `string` \| `Function<string>`                    | -             |          |
| strokeOpacity | Stroke opacity                                                                                                                                                                                | `number` \| `Function<number>`                    | -             |          |
| lineWidth     | Width of graphic stroke                                                                                                                                                                       | `number` \| `Function<number>`                    | -             |          |
| lineDash      | Dashed line configuration for stroke. The first value is the length of each dash segment, the second value is the distance between segments. Setting lineDash to [0, 0] results in no stroke. | `[number,number]` \| `Function<[number, number]>` | -             |          |
| opacity       | Overall opacity of the graphic                                                                                                                                                                | `number` \| `Function<number>`                    | -             |          |
| shadowColor   | Shadow color of the graphic                                                                                                                                                                   | `string` \| `Function<string>`                    | -             |          |
| shadowBlur    | Gaussian blur coefficient of graphic shadow                                                                                                                                                   | `number` \| `Function<number>`                    | -             |          |
| shadowOffsetX | Set horizontal distance of shadow from graphic                                                                                                                                                | `number` \| `Function<number>`                    | -             |          |
| shadowOffsetY | Set vertical distance of shadow from graphic                                                                                                                                                  | `number` \| `Function<number>`                    | -             |          |
| cursor        | Mouse cursor style. Same as CSS cursor style, default 'default'.                                                                                                                              | `string` \| `Function<string>`                    | `'default'`   |          |

For more `style` configuration, please check the [style](/en/manual/core/style) introduction page.

Try it out:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/species.json',
  transform: [
    {
      type: 'kde',
      field: 'y',
      groupBy: ['x'],
      size: 20,
    },
  ],
});

chart
  .density()
  .encode('x', 'x')
  .encode('y', 'y')
  .encode('color', 'x')
  .encode('size', 'size')
  .tooltip(false);

chart.render();

```
