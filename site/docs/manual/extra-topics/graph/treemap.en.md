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

## Data Format

Treemap supports two data formats:

### 1. Hierarchical Structure Data (JSON)

For data that is already in hierarchical structure, it can be used directly without configuring `path`:

```javascript
{
  name: 'Root Node',
  children: [
    {
      name: 'Child Node 1',
      children: [
        { name: 'Leaf Node 1', value: 100 },
        { name: 'Leaf Node 2', value: 200 }
      ]
    },
    { name: 'Child Node 2', value: 300 }
  ]
}
```

### 2. Flattened Data (CSV)

For flattened data that uses path strings to represent hierarchical relationships, **you must configure the `path` function**:

```csv
name,size
flare,
flare.analytics,
flare.analytics.cluster,
flare.analytics.cluster.AgglomerativeCluster,3938
```

For this data format, you must use the `path` configuration:

```javascript
layout: {
  path: (d) => d.name.replace(/\./g, '/'), // Convert dot separation to slash separation
}
```

**Important Note**: Using flattened data without configuring `path` will result in a "multiple roots" error. This is because:

1. D3's stratify expects data to have `id` and `parentId` fields by default to establish hierarchical relationships
2. Flattened data typically only has path strings (like `flare.analytics.cluster`) without explicit parent-child relationship fields
3. Without `path` configuration, D3 cannot recognize the hierarchical structure and treats all records as root nodes
4. When multiple root nodes exist, D3 throws a "multiple roots" error

The role of the `path` configuration is to tell D3 how to parse hierarchical structure from path strings and automatically infer parent-child relationships.

## Options

| Property    | Description                                                                                                                                                      | Type              | Default | Required |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------- | -------- |
| layout      | Layout configuration                                                                                                                                             | `TreemapLayout`   | -       |          |
| encode      | Configure visual channels for `treemap` mark, including `x`, `y`, `color`, `value`, etc., to specify the relationship between visual element properties and data | [encode](#encode) | -       |          |
| style       | Configure graphics style and label style                                                                                                                         | -                 | -       |          |
| labels      | Custom data label configuration                                                                                                                                  | label[]           | []      |          |
| interaction | Configure treemap interactions                                                                                                                                   | `Object`          | -       |          |

### layout

| Property | Description                                                                                                                                                                        | Type                                                                                                                   | Default                       | Required |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------- | -------- |
| tile     | Layout method                                                                                                                                                                      | `'treemapBinary' \| 'treemapDice' \| 'treemapSlice' \| 'treemapSliceDice' \| 'treemapSquarify' \| 'treemapResquarify'` | `'treemapSquarify'`           |          |
| padding  | Outer margin, also includes `paddingInner \| paddingOuter \| paddingTop \| paddingBottom \| paddingRight \| paddingLeft`                                                        | `number`                                                                                                               | 0                             |          |
| sort     | Sorting rule                                                                                                                                                                       | `(a: any, b: any): number`                                                                                             | `(a, b) => b.value - a.value` |          |
| layer    | Render level                                                                                                                                                                       | `number \| (d) => number`                                                                                              | 0                             |          |
| path     | Path conversion function, used to parse hierarchical structure from flattened data. This configuration is required for flattened data using path strings                        | `(d) => string`                                                                                                        | `undefined`                   |          |

### encode

Configure visual channels for the `treemap` mark.

| Property | Description                                                                                                                                                                          | Type                             | Default | Required |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------- | ------- | -------- |
| color    | Bind the `color` property channel of the `treemap` mark. If data fields are mapped to the color channel, data will be grouped and split into multiple graphics with different colors | [encode](/en/manual/core/encode) | -       |          |
| value    | Bind the value channel of the `treemap` mark                                                                                                                                         | [encode](/en/manual/core/encode) | -       |          |

### style

Composite graphic marks need to distinguish graphic configurations through different prefixes.

- `<label>`: Data label prefix, for example: `labelText` sets the text content of the label.

| Property           | Description                                                                                                                                                                    | Type                                                       | Default   | Required |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- | --------- | -------- |
| labelFontSize      | Label text size                                                                                                                                                                | `number`                                                   | 10        |          |
| labelText          | Label text content                                                                                                                                                             | `(d) => last(d.path)`                                      | -         |          |
| labelFontFamily    | Label text font                                                                                                                                                                | string                                                     | -         |          |
| labelFontWeight    | Label text weight                                                                                                                                                              | number                                                     | -         |          |
| labelLineHeight    | Label text line height                                                                                                                                                         | number                                                     | -         |          |
| labelTextAlign     | Set the current alignment of label text content                                                                                                                                | `center` \| `end` \| `left` \| `right` \| `start`          | -         |          |
| labelTextBaseline  | Set the current text baseline used when drawing label text                                                                                                                     | `top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging` |           |          |
| labelFill          | Label text fill color                                                                                                                                                          | string                                                     | -         |          |
| labelFillOpacity   | Label text fill opacity                                                                                                                                                        | number                                                     | -         |          |
| labelStroke        | Label text stroke                                                                                                                                                              | string                                                     | -         |          |
| labelLineWidth     | Label text stroke width                                                                                                                                                        | number                                                     | -         |          |
| labelLineDash      | Label text stroke dash configuration, first value is the length of each dash segment, second value is the distance between segments. Setting labelLineDash to [0,0] has no stroke effect. | `[number,number] `                                         | -         |          |
| labelStrokeOpacity | Label text stroke opacity                                                                                                                                                      | number                                                     | -         |          |
| labelOpacity       | Label text overall opacity                                                                                                                                                     | number                                                     | -         |          |
| labelShadowColor   | Label text shadow color                                                                                                                                                        | string                                                     | -         |          |
| labelShadowBlur    | Label text shadow Gaussian blur coefficient                                                                                                                                    | number                                                     | -         |          |
| labelShadowOffsetX | Label text shadow horizontal offset                                                                                                                                            | number                                                     | -         |          |
| labelShadowOffsetY | Label text shadow vertical offset                                                                                                                                              | number                                                     | -         |          |
| labelCursor        | Label text cursor style                                                                                                                                                        | string                                                     | `default` |          |
| labelDx            | Label text horizontal offset                                                                                                                                                   | number                                                     | -         |          |
| labelDy            | Label text vertical offset                                                                                                                                                     | number                                                     | -         |          |

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
