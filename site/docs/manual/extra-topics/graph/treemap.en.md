---
title: treemap
order: 1
---

## Overview

Treemap recursively divides space into rectangles based on the associated value of each node, suitable for displaying weighted tree data.
Treemap is suitable for displaying data with hierarchical relationships and can intuitively reflect comparisons between peers. It transforms a tree structure into a state of planar space rectangles. The advantage of treemap is that compared with traditional tree structure diagrams, treemap can make more effective use of space and has the function of displaying proportions.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'treemap',
  data: {
    type: 'custom',
    callback: (data) => ({
      name: 'Chart Types',
      children: [
        {
          name: 'General Charts',
          children: [
            { name: 'Bar Chart', value: 300 },
            { name: 'Line Chart', value: 600 },
            { name: 'Scatter Plot', value: 160 },
            { name: 'Area Chart', value: 160 },
            { name: 'Others', value: 180 },
          ],
        },
        {
          name: 'Data Analysis',
          children: [
            { name: 'Binning', value: 280 },
            { name: 'Grouping', value: 150 },
            { name: 'Regression', value: 210 },
            { name: 'Others', value: 40 },
          ],
        },
      ],
    }),
  },
  layout: {
    tile: 'treemapBinary',
    paddingInner: 1,
  },
  encode: { value: 'value' },
  style: {
    labelFill: '#000',
    labelStroke: '#fff',
    labelLineWidth: 1.5,
    labelFontSize: 14,
    labelPosition: 'top-left',
    labelDx: 5,
    labelDy: 5,
  },
});

chart.render();
```

For more examples, you can check the [Chart Examples - Graph](/en/examples/graph/hierarchy#treemap) page.

## Options

| Property    | Description                                                                                                                                                      | Type              | Default | Required |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------- | -------- |
| layout      | Layout configuration                                                                                                                                             | `TreemapLayout`   | -       |          |
| encode      | Configure visual channels for `treemap` mark, including `x`, `y`, `color`, `value`, etc., to specify the relationship between visual element properties and data | [encode](#encode) | -       |          |
| style       | Configure graphics style and label style                                                                                                                         | -                 | -       |          |
| labels      | Custom data label configuration                                                                                                                                  | label[]           | []      |          |
| interaction | Configure treemap interactions                                                                                                                                   | `Object`          | -       |          |

### layout

| Property | Description                                                                                                              | Type                                                                                                                   | Default                       | Required |
| -------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------- | -------- |
| tile     | Layout method                                                                                                            | `'treemapBinary' \| 'treemapDice' \| 'treemapSlice' \| 'treemapSliceDice' \| 'treemapSquarify' \| 'treemapResquarify'` | `'treemapSquarify'`           |          |
| padding  | Outer margin, also includes `paddingInner \| paddingOuter \| paddingTop \| paddingBottom \| paddingRight \| paddingLeft` | `number`                                                                                                               | 0                             |          |
| sort     | Sorting rule                                                                                                             | `(a: any, b: any): number`                                                                                             | `(a, b) => b.value - a.value` |          |
| layer    | Render level                                                                                                             | `number \| (d) => number`                                                                                              | 0                             |          |
| path     | Render level                                                                                                             | `(d) => d.name`                                                                                                        | 0                             |          |

### encode

Configure visual channels for the `treemap` mark.

| Property | Description                                                                                                                                                                          | Type                             | Default | Required |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------- | ------- | -------- |
| color    | Bind the `color` property channel of the `treemap` mark. If data fields are mapped to the color channel, data will be grouped and split into multiple graphics with different colors | [encode](/en/manual/core/encode) | -       |          |
| value    | Bind the value channel of the `treemap` mark                                                                                                                                         | [encode](/en/manual/core/encode) | -       |          |

### style

Composite graphic marks need to distinguish graphic configurations through different prefixes.

- `<label>`: Data label prefix, for example: `labelText` sets the text content of the label.

| Property           | Description                                                                                                                                                                    | Type                                                       | Default | Required |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- | ------- | -------- |
| labelFontSize      | Label text size                                                                                                                                                                | `number`                                                   | 10      |          |
| labelText          | Label text content                                                                                                                                                             | `(d) => last(d.path)`                                      | -       |          |
| labelFontFamily    | Text font                                                                                                                                                                      | string                                                     | -       |          |
| labelFontWeight    | Font weight                                                                                                                                                                    | number                                                     | -       |          |
| labelLineHeight    | Text line height                                                                                                                                                               | number                                                     | -       |          |
| labelTextAlign     | Set the current alignment of text content                                                                                                                                      | `center` \| `end` \| `left` \| `right` \| `start`          | -       |          |
| labelTextBaseline  | Set the current text baseline used when drawing text                                                                                                                           | `top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging` |         |          |
| labelFill          | Text fill color                                                                                                                                                                | string                                                     | -       |          |
| labelFillOpacity   | Text fill opacity                                                                                                                                                              | number                                                     | -       |          |
| labelStroke        | Text stroke                                                                                                                                                                    | string                                                     | -       |          |
| labelLineWidth     | Text stroke width                                                                                                                                                              | number                                                     | -       |          |
| labelLineDash      | Stroke dash configuration, first value is the length of each dash segment, second value is the distance between segments. Setting labelLineDash to [0,0] has no stroke effect. | `[number,number] `                                         | -       |          |
| labelStrokeOpacity | Stroke opacity                                                                                                                                                                 | number                                                     | -       |          |
| labelOpacity       | Overall text opacity                                                                                                                                                           | number                                                     | -       |          |
| labelShadowColor   | Text shadow color                                                                                                                                                              | string                                                     | -       |          |
| labelShadowBlur    | Text shadow Gaussian blur coefficient                                                                                                                                          | number                                                     | -       |          |
| labelShadowOffsetX | Set the horizontal distance of shadow from text                                                                                                                                | number                                                     | -       |          |
| labelShadowOffsetY | Set the vertical distance of shadow from text                                                                                                                                  | number                                                     | -       |          |

For more styles, please check the [Manual - Core Concepts - Style](/en/manual/core/style) page.

### interaction

Common interactions for treemap are `treemapDrillDown` and `poptip`.

treemapDrillDown is used to implement drill-down interaction for treemap. By clicking on a node in the treemap, you can display that node and its children on the canvas. Configuration is as follows:

| Property           | Description                               | Type     | Default               | Required |
| ------------------ | ----------------------------------------- | -------- | --------------------- | -------- |
| breadCrumbFill     | Breadcrumb fill color                     | `string` | `rgba(0, 0, 0, 0.85)` |          |
| breadCrumbFontSize | Breadcrumb font size                      | `number` | 12                    |          |
| breadCrumbY        | Breadcrumb position on Y axis             | `number` | 12                    |          |
| activeFill         | Fill color of currently active breadcrumb | `number` | `rgba(0, 0, 0, 0.5)`  |          |

```js
chart.options({
  // Other chart configurations...
  interaction: {
    treemapDrillDown: {
      breadCrumbY: 12,
      activeFill: '#873bf4',
    },
  },
});
```

[poptip](/en/manual/core/interaction/poptip) is used to display concise tooltip information during interaction.

```js
chart.options({
  // Other chart configurations...
  interaction: {
    poptip: {
      // poptip configuration options
      offsetX: 10,
      offsetY: 10,
      // tip style configuration
      tipBackgroundColor: 'rgba(0, 0, 0, 0.75)',
      tipColor: '#fff',
    },
  },
});
```

## Example

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'treemap',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/flare-treemap.json',
  },
  layout: {
    path: (d) => d.name.replace(/\./g, '/'),
    tile: 'treemapBinary',
    paddingInner: 1,
  },
  encode: { value: 'size' },
  style: {
    labelText: (d) =>
      d.data.name
        .split('.')
        .pop()
        .split(/(?=[A-Z][a-z])/g)[0],
    labelFill: '#000',
    labelPosition: 'top-left',
    fillOpacity: 0.5,
  },
});

chart.render();
```
