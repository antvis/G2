---
title: sunburst
order: 16
---

## Overview

The sunburst chart (`sunburst`) serves as a powerful and intuitive data visualization tool with applications and advantages across various fields. Through its circular layout, the sunburst chart effectively displays hierarchical relationships and proportional allocation between data points, particularly suitable for datasets with clear parent-child relationships. Despite some limitations, its unique design makes it an indispensable tool in business analysis, geographical research, and other fields. Combining the advantages of pie charts and tree diagrams, it uses circular segmentation to display multi-level nested information structures. This chart type not only clearly reflects the relative sizes between different groups but also maintains excellent visual effects. Compared to tree maps, it offers advantages such as space efficiency and more intuitive overall visualization.

`sunburst` is implemented through `g2ExtensionPlot` based on `rect`, with internal implementation of drill-down events, polar coordinates, data transformation, style optimization, and more.

```js | ob { inject: true }
import { plotlib } from '@antv/g2-extension-plot';
import { Runtime, corelib, extend } from '@antv/g2';

const Chart = extend(Runtime, { ...corelib(), ...plotlib() });

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'sunburst',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json',
  },
  encode: {
    value: 'sum',
  },
  labels: [
    {
      text: 'name',
      transform: [
        {
          type: 'overflowHide',
        },
      ],
    },
  ],
});

chart.render();
```

For more examples, please check the [Chart Examples - Sunburst](/en/examples#general-sunburst) page.

## Configuration Options

| Property    | Description                                                                                                                                      | Type                        | Default Value         | Required |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- | --------------------- | -------- |
| encode      | Configure visual channels for `sunburst` mark, including `value`, etc., to specify relationships between visual element properties and data      | [encode](#encode)           | -                     | ✓        |
| coordinate  | Configure coordinate system for `sunburst` mark, which performs a series of point transformations to change the spatial display form of the mark | [coordinate](#coordinate)   | `{type: 'polar' }`    |          |
| interaction | Configure interaction settings for `sunburst` mark, with built-in `drillDown` drill-down configuration                                           | [interaction](#interaction) | `{ drillDown: true }` |          |
| style       | Configure graphic styles for `sunburst` mark                                                                                                     | [style](#style)             | -                     |          |

### encode

Configure visual channels for `sunburst` mark.

| Property | Description                                                                                                                                                                                                                                                                                                                  | Type                             | Default Value   | Required |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | --------------- | -------- |
| value    | Bind the `value` property channel of `sunburst` mark, used for numeric fields in data `data`                                                                                                                                                                                                                                 | [encode](/en/manual/core/encode) | -               | ✓        |
| color    | Bind the `color` property channel of `sunburst` mark. If data fields are mapped to color channels, data will be grouped and split into multiple graphics with different colors, generally used for configuring stacked bar charts, etc. Built-in configuration is `ancestor-node`, used to distinguish different path groups | [encode](/en/manual/core/encode) | `ancestor-node` |          |

#### value

The position visual channel of `sunburst` mark requires values from the `value` field. In `data`, values in each group are calculated through fields. Internally, tree structure data is transformed into flattened data required by `rect`.

```js
{
  type: 'sunburst',
  data: {
    value: {
      name: 'root',
      children: [
        {
          name: 'Group 1', // Automatically calculated value as 220
          children: [
            { name: 'Group 1-1', count: 100 },
            { name: 'Group 1-2', count: '120' },
          ],
        },
        {
          name: 'Group 2', // Automatically calculated value as 190
          count: 220, // For reasonable mapping, own value won't be used
          children: [
            { name: 'Group 2-1', count: 'aaa' }, // Non-numeric parameter
            { name: 'Group 2-2', count: '190' },
          ],
        },
      ],
    },
  },
  encode: { value: 'count' },
}
```

Tree structure data internally transformed to flattened data:

```js
{
  data: [
    { 'ancestor-node': 'Group 1', path: 'Group 1', value: 220, x: [0, 0.536...], y: [0.333.., 0.666...], depth: 1, ... },
    { 'ancestor-node': 'Group 2', path: 'Group 2', value: 190, x: [0.536..., 1], y: [0.333.., 0.666...], depth: 1, ... },
    { 'ancestor-node': 'Group 1', path: 'Group 1 / Group 1-2', value: 120, x: [0, 0.292...],y: [0.666..., 1], depth: 2, ... },
    { 'ancestor-node': 'Group 1', path: 'Group 1 / Group 1-1', value: 100, ... },
    { 'ancestor-node': 'Group 2', path: 'Group 2 / Group 2-2', value: 190, ... },
    { 'ancestor-node': 'Group 2', path: 'Group 2 / Group 2-1', value: 0, ... }, // Non-numeric defaults to 0
  ],
}
```

#### color

The `color` visual channel affects the fill color of `sunburst` graphic marks. When applied to interval charts, it generally maps categorical fields to group data, defaulting to the built-in `ancestor-node` path grouping.

```js | ob { inject: true }
import { plotlib } from '@antv/g2-extension-plot';
import { Runtime, corelib, extend } from '@antv/g2';

const Chart = extend(Runtime, { ...corelib(), ...plotlib() });

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'sunburst',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json',
  },
  encode: {
    value: 'sum',
    color: 'name',
  },
});

chart.render();
```

Try using callback for grouping:

```js | ob { inject: true }
import { Runtime, corelib, extend } from '@antv/g2';

const Chart = extend(Runtime, { ...corelib(), ...g2ExtensionPlot.plotlib() });

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'sunburst',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json',
  },
  encode: {
    value: 'sum',
    color: (data) => {
      const paths = data.path.split(' / ');
      return [paths[0], paths[1]].join('/');
    },
  },
});

chart.render();
```

### coordinate

`sunburst` has polar coordinates configured by default:

```js
{
  coordinate: {
    type: 'polar',
    innerRadius: 0.2,
  }
}
```

External configuration of polar coordinate `polar`:

```js | ob { inject: true }
import { Runtime, corelib, extend } from '@antv/g2';

const Chart = extend(Runtime, { ...corelib(), ...g2ExtensionPlot.plotlib() });

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'sunburst',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json',
  },
  encode: { value: 'sum' },
  coordinate: {
    type: 'polar',
    innerRadius: 0.3,
    outerRadius: 0.9,
  },
});

chart.render();
```

Restore to Cartesian coordinate system `cartesian`:

```js | ob { inject: true }
import { Runtime, corelib, extend } from '@antv/g2';

const Chart = extend(Runtime, { ...corelib(), ...g2ExtensionPlot.plotlib() });

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'sunburst',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json',
  },
  encode: { value: 'sum' },
  coordinate: { type: 'cartesian' },
});

chart.render();
```

### interaction

`sunburst` has built-in `drillDown` interaction events configured by default:

```js | ob { inject: true }
import { Runtime, corelib, extend } from '@antv/g2';

const Chart = extend(Runtime, { ...corelib(), ...g2ExtensionPlot.plotlib() });

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'sunburst',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json',
  },
  encode: { value: 'sum' },
  interaction: {
    drillDown: {
      // Breadcrumb style
      breadCrumb: {
        rootText: 'Total Name',
        style: {
          fontSize: '18px',
          fill: '#333',
        },
        active: {
          fill: 'red',
        },
      },
      // Whether to maintain original color after drill-down
      isFixedColor: true,
    },
  },
});

chart.render();
```

### style

`style` is used to set the appearance style of chart elements, including fill color, border style, shadow effects, etc.

| Property          | Description                                                                                                                                                                                   | Type                                                               | Default Value |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------- |
| radius            | Corner radius size for all four corners of the rectangle                                                                                                                                      | number \| (datum, index, data, column) => number                   | `0`           |
| radiusTopLeft     | Top-left corner radius                                                                                                                                                                        | number \| (datum, index, data, column) => number                   | `0`           |
| radiusTopRight    | Top-right corner radius                                                                                                                                                                       | number \| (datum, index, data, column) => number                   | `0`           |
| radiusBottomRight | Bottom-right corner radius                                                                                                                                                                    | number \| (datum, index, data, column) => number                   | `0`           |
| radiusBottomLeft  | Bottom-left corner radius                                                                                                                                                                     | number \| (datum, index, data, column) => number                   | `0`           |
| inset             | Inner padding in all four directions of the rectangle                                                                                                                                         | number \| (datum, index, data, column) => number                   | `0`           |
| insetLeft         | Left inner spacing                                                                                                                                                                            | number \| (datum, index, data, column) => number                   | `0`           |
| insetRight        | Right inner spacing                                                                                                                                                                           | number \| (datum, index, data, column) => number                   | `0`           |
| insetBottom       | Bottom inner spacing                                                                                                                                                                          | number \| (datum, index, data, column) => number                   | `0`           |
| insetTop          | Top inner spacing                                                                                                                                                                             | number \| (datum, index, data, column) => number                   | `0`           |
| fill              | Fill color of the graphic                                                                                                                                                                     | number \| (datum, index, data, column) => string                   | -             |
| fillOpacity       | Fill opacity of the graphic                                                                                                                                                                   | number \| (datum, index, data, column) => number                   | -             |
| stroke            | Stroke of the graphic                                                                                                                                                                         | number \| (datum, index, data, column) => string                   | -             |
| strokeOpacity     | Stroke opacity                                                                                                                                                                                | number \| (datum, index, data, column) => number                   | -             |
| lineWidth         | Width of the graphic stroke                                                                                                                                                                   | number \| (datum, index, data, column) => number                   | -             |
| lineDash          | Dashed line configuration for stroke. First value is the length of each dash segment, second value is the spacing distance between segments. Setting lineDash to [0, 0] results in no stroke. | [number,number] \|(datum, index, data, column) => [number, number] | -             |
| opacity           | Overall opacity of the graphic                                                                                                                                                                | number \| (datum, index, data, column) => number                   | -             |
| shadowColor       | Shadow color of the graphic                                                                                                                                                                   | number \| (datum, index, data, column) => string                   | -             |
| shadowBlur        | Gaussian blur coefficient for graphic shadow                                                                                                                                                  | number \| (datum, index, data, column) => number                   | -             |
| shadowOffsetX     | Sets the horizontal distance of shadow from the graphic                                                                                                                                       | number \| (datum, index, data, column) => number                   | -             |
| shadowOffsetY     | Sets the vertical distance of shadow from the graphic                                                                                                                                         | number \| (datum, index, data, column) => number                   | -             |
| cursor            | Mouse cursor style. Same as CSS cursor style, defaults to 'default'.                                                                                                                          | number \| (datum, index, data, column) => string                   | 'default'     |

Try it out

```js | ob { inject: true }
import { plotlib } from '@antv/g2-extension-plot';
import { Runtime, corelib, extend } from '@antv/g2';

const Chart = extend(Runtime, { ...corelib(), ...plotlib() });

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .sunburst()
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json',
  })
  .encode('value', 'sum')
  .style({
    radius: 8,
    // 内置透明度 fillOpacity ，根据 0.85 ** depth 层级计算,
    fillOpacity: (v) => v['fillOpacity'],
    fill: (v) => {
      if (v['path'] === '类别 3') return 'red';
      if (v['name'] === '类别 2.1.1') return 'red';
    },
  });

chart.render();

```

For more `style` configurations, please check the [style](/en/manual/core/style) introduction page.
