---
title: heatmap
order: 9
---

## Overview

`heatmap` is a visualization chart that maps the density or value magnitude of two-dimensional data through color intensity, excelling at revealing data distribution patterns, clustering characteristics, and outliers.
`heatmap` maps two categorical/continuous fields (such as x, y) to coordinate axis, and a third numerical field (such as value) to a color gradient (such as color: 'value'), forming a grid of colored blocks in a matrix.
`heatmap` can define color scales, with cool colors (such as blue) representing low values and warm colors (such as red) representing high values, intuitively showing the magnitude or frequency distribution of values.

Typical applications include:

- Correlation analysis: For example, used to display correlation matrices between variables, quickly identifying strongly correlated or weakly correlated variables through color intensity.
- Density analysis: Display the density distribution of two-dimensional data, commonly used to observe hotspot areas, such as analyzing population clustering distribution in geospatial data.
- Time series and category analysis: Combine time (such as hours, days, weeks) with categorical data to analyze temporal patterns or classification distributions.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'heatmap', // Mark type is heatmap
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/heatmap.json',
  },
  encode: { x: 'g', y: 'l', color: 'tmp' }, // Data encoding configuration, x-axis is 'g', y-axis is 'l', color is 'tmp'
  style: { opacity: 0 }, // Heatmap opacity is 0
  tooltip: false,
});

chart.render();
```

For more examples, you can check the [Chart Examples - Heatmap](/en/examples#general-heatmap) page.

## Options

| Property | Description                                                                                                                                                    | Type              | Default | Required |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------- | -------- |
| encode   | Configure the visual channels of the `heatmap` mark, including `x`, `y`, `color`, etc., to specify the relationship between visual element properties and data | [encode](#encode) | -       | ✓        |
| style    | Configure the `heatmap` graphics style                                                                                                                         | [style](#style)   | -       |          |

### encode

Configure the visual channels of the `heatmap` mark, defining the important configuration of the mapping relationship between data fields and visual properties, which determines how data is transformed into visual representation.

| Property | Description                                                                                                                                                                         | Type                             | Default | Required |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ------- | -------- |
| x        | Bind the `x` property channel of the `heatmap` mark, generally a time or ordinal nominal field in `data`                                                                            | [encode](/en/manual/core/encode) | -       | ✓        |
| y        | Bind the `y` property channel of the `heatmap` mark, generally a numerical or array field in `data`                                                                                 | [encode](/en/manual/core/encode) | -       | ✓        |
| color    | Bind the `color` property channel of the `heatmap` mark. If a data field is mapped to the color channel, the data will be grouped and split into multiple areas of different colors | [encode](/en/manual/core/encode) | -       |          |

For more `encode` configuration, you can check the [encode](/en/manual/core/encode) introduction page.

### style

| Property           | Description                                                                                                                                                                                          | Type                                              | Default     | Required |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ----------- | -------- |
| gradient           | Gradient color configuration corresponding to the graphics                                                                                                                                           | `string` \| `Array<[number, string]>`             | -           |          |
| opacity            | Transparency of the heatmap. If set, it will override `maxOpacity` and `minOpacity` configuration, range 0 ~ 1                                                                                       | `number`                                          | `0.6`       |          |
| maxOpacity         | Maximum transparency value of heatmap pixels, effective when `opacity = 0`, range 0 ~ 1                                                                                                              | `number`                                          | `1`         |          |
| minOpacity         | Minimum transparency value of heatmap pixels, effective when `opacity = 0`, range 0 ~ 1                                                                                                              | `number`                                          | `0`         |          |
| blur               | Blur factor of the heatmap, range 0 ~ 1, the larger the value, the smoother the graphics                                                                                                             | `number`                                          | `0.85`      |          |
| useGradientOpacity | Fill color of the graphics                                                                                                                                                                           | `boolean`                                         | `false`     |          |
| fill               | Fill color of the graphics                                                                                                                                                                           | `string` \| `Function<string>`                    | -           |          |
| fillOpacity        | Fill transparency of the graphics                                                                                                                                                                    | `number` \| `Function<number>`                    | -           |          |
| stroke             | Stroke of the graphics                                                                                                                                                                               | `string` \| `Function<string>`                    | -           |          |
| strokeOpacity      | Stroke transparency                                                                                                                                                                                  | `number` \| `Function<number>`                    | -           |          |
| lineWidth          | Width of the graphics stroke                                                                                                                                                                         | `number` \| `Function<number>`                    | -           |          |
| lineDash           | Dash configuration of the stroke. The first value is the length of each segment of the dash, and the second value is the distance between segments. Setting lineDash to [0, 0] results in no stroke. | `[number,number]` \| `Function<[number, number]>` | -           |          |
| shadowColor        | Shadow color of the graphics                                                                                                                                                                         | `string` \| `Function<string>`                    | -           |          |
| shadowBlur         | Gaussian blur coefficient of the graphics shadow                                                                                                                                                     | `number` \| `Function<number>`                    | -           |          |
| shadowOffsetX      | Set the horizontal distance of the shadow from the graphics                                                                                                                                          | `number` \| `Function<number>`                    | -           |          |
| shadowOffsetY      | Set the vertical distance of the shadow from the graphics                                                                                                                                            | `number` \| `Function<number>`                    | -           |          |
| cursor             | Mouse style. Same as CSS mouse style, default 'default'.                                                                                                                                             | `string` \| `Function<string>`                    | `'default'` |          |

Regarding the `gradient` configuration, here's an example, which is also the default built-in gradient color in G2:

```ts
const gradient = [
  [0.25, 'rgb(0,0,255)'],
  [0.55, 'rgb(0,255,0)'],
  [0.85, 'yellow'],
  [1.0, 'rgb(255,0,0)'],
];

const gradient =
  '0.25:rgb(0,0,255) 0.55:rgb(0,255,0) 0.85:yellow 1.0:rgb(255,0,0)';
```

For more `style` configuration, you can check the [style](/en/manual/core/style) introduction page.

Give it a try:

```js | ob { inject: true }
import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/diamond.json',
});

chart.scale('x', { nice: true, domainMin: -0.5 });
chart.scale('y', { nice: true, domainMin: -2000 });
chart.scale('color', { nice: true });

chart
  .heatmap()
  .data({
    transform: [
      {
        type: 'custom',
        callback: (data) => {
          const dv = new DataSet.View().source(data);
          dv.transform({
            type: 'kernel-smooth.density',
            fields: ['carat', 'price'],
            as: ['carat', 'price', 'density'],
          });
          return dv.rows;
        },
      },
    ],
  })
  .encode('x', 'carat')
  .encode('y', 'price')
  .encode('color', 'density')
  .style({
    opacity: 0.3,
    gradient: [
      [0, 'white'],
      [0.2, 'blue'],
      [0.4, 'cyan'],
      [0.6, 'lime'],
      [0.8, 'yellow'],
      [0.9, 'red'],
    ],
  });

chart.point().encode('x', 'carat').encode('y', 'price');

chart.render();

```

## Examples

- You can create a container view to render both heatmap and map simultaneously, intuitively presenting data differences in geographical locations

```js | ob { inject: true }
const { Chart } = G2;
const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  padding: 0,
  axis: false,
  children: [
    {
      type: 'image',
      style: {
        src: 'https://gw.alipayobjects.com/zos/rmsportal/NeUTMwKtPcPxIFNTWZOZ.png',
        x: '50%',
        y: '50%',
        width: '100%',
        height: '100%',
      },
      tooltip: false,
    },
    {
      type: 'heatmap',
      data: {
        type: 'fetch',
        value: 'https://assets.antv.antgroup.com/g2/heatmap.json',
      },
      encode: { x: 'g', y: 'l', color: 'tmp' },
      style: { opacity: 0 },
      tooltip: false,
    },
  ],
});

chart.render();
```
