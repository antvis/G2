---
title: shape
order: 24
---

## Overview

The shape mark is a special `Mark` type in G2, typically used to draw static custom graphics on charts. It has high flexibility and freedom. The `shape` mark can be used for adding custom annotations, watermarks, badges, and other scenarios, making it an important tool for personalizing charts. When using `shape` to draw graphics, you can obtain the [document](https://g.antv.antgroup.com/api/builtin-objects/document) object from the chart context, and then use [document.createElement](https://g.antv.antgroup.com/api/builtin-objects/document#createelement) to create registered graphics. For more complex scenarios, developers may need to understand concepts related to [G custom graphics](https://g.antv.antgroup.com/guide/advanced-topics/custom-element).

For example, sometimes you need to add markers at specific data points in a chart to highlight important information. The following example shows how to use the `shape` mark to add custom annotations at key points on a line chart. We create basic graphics [Circle](https://g.antv.antgroup.com/api/basic/circle) and basic graphics [Text](https://g.antv.antgroup.com/api/basic/text), combined with [scene graph](https://g.antv.antgroup.com/api/canvas/scenegraph-lifecycle) capabilities to implement a custom annotation.

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const notes = (style, context) => {
  const { x, y } = style;
  const { document } = context;
  const g = document.createElement('g', {});
  const c1 = document.createElement('circle', {
    style: {
      cx: x,
      cy: y,
      r: 3,
      fill: 'red',
    },
  });
  const c2 = document.createElement('circle', {
    style: {
      cx: x,
      cy: y,
      r: 5,
      lineWidth: 8,
      stroke: 'red',
      opacity: 0.3,
    },
  });
  const text = document.createElement('text', {
    style: {
      x: x + 12,
      y,
      text: 'Highest Rainfall',
      fontSize: 12,
      textAlign: 'left',
      textBaseline: 'middle',
    },
  });
  g.appendChild(c1);
  g.appendChild(c2);
  g.appendChild(text);
  return g;
};

chart.options({
  type: 'view',
  autoFit: true,
  children: [
    {
      type: 'line',
      data: [
        { month: 'Jan.', rainfall: 18.9 },
        { month: 'Feb.', rainfall: 28.8 },
        { month: 'Mar.', rainfall: 39.3 },
        { month: 'Apr.', rainfall: 81.4 },
        { month: 'May', rainfall: 47 },
        { month: 'Jun.', rainfall: 20.3 },
      ],
      encode: {
        x: 'month',
        y: 'rainfall',
      },
    },
    {
      type: 'shape',
      data: [{ month: 'Apr.', rainfall: 81.4 }],
      encode: {
        x: 'month',
        y: 'rainfall',
      },
      style: {
        render: (style, context) => notes(style, context),
      },
    },
  ],
});

chart.render();
```

For more examples, you can visit the [Graphic Annotation - Badge Watermark](/en/examples/annotation/shape#watermark) page.

## Configuration

| Property | Description                                                                                                                                   | Type              | Default | Required |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------- | -------- |
| encode   | Configure the visual channels of the `shape` mark, including `x`, `y`, to specify the relationship between visual element properties and data | [encode](#encode) | -       |          |
| style    | Configure the graphic style of the `shape` mark, including `x`, `y`, `render`, etc.                                                           | [style](#style)   | -       | ✓        |

### encode

Configure the visual channels of the `shape` mark, including `x`, `y`, to specify the relationship between visual element properties and data.
| Property | Description | Type | Default | Required |
| ----- | --------------------------- | --------------- | ------ | ---- |
| x | Bind the `x` property channel of the `shape` mark, usually a numeric or character value from `data` to set the `x` position of the mark | [encode](/en/manual/core/encode) | - | ✓ if not configured in [style](#style) |
| y | Bind the `y` property channel of the `shape` mark, usually a numeric or character value from `data` to set the `y` position of the mark | [encode](/en/manual/core/encode) | - | ✓ if not configured in [style](#style) |

### style

Configure the graphic style of the `shape` mark.
| Property | Description | Type | Default | Required |
| ----- | --------------------------- | --------------- | ------ | ---- |
| x | Uniformly set the x position of the `shape` mark (relative positioning percentage \| absolute positioning pixel value), highest priority | (string \| number) | - | ✓ if not configured in [encode](#encode) |
| y | Uniformly set the y position of the `shape` mark (relative positioning percentage \| absolute positioning pixel value), highest priority | (string \| number) | - | ✓ if not configured in [encode](#encode) |
| render | Custom graphic rendering function that receives style and context parameters and returns G's DisplayObject | (style, context) => DisplayObject | - | ✓ |
| { ...rest } | Additional parameters for custom graphics, all passed as style parameters to the `render` function | `object` | - | |

## Examples

### Watermark

Adding watermarks to charts can protect data security and intellectual property. The following example shows how to use the `shape` mark to add watermarks to a chart.

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

// Define watermark rendering method
const watermark = (style, context) => {
  const { document, canvas } = context;
  const { width, height } = canvas.context.config;
  const g = document.createElement('g', {});
  // Create repeating watermark text
  const spacing = 120; // Watermark spacing
  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      const text = document.createElement('text', {
        style: {
          x: x,
          y: y,
          text: 'AntV G2',
          transformOrigin: 'center',
          transform: 'rotate(-30)',
          fontSize: 16,
          fill: '#000',
          textAlign: 'center',
          textBaseline: 'middle',
          fillOpacity: 0.2,
        },
      });
      g.appendChild(text);
    }
  }
  return g;
};

chart.options({
  type: 'view',
  autoFit: true,
  children: [
    // Create pie chart
    {
      type: 'interval',
      zIndex: 2,
      data: [
        { item: 'Category 1', count: 40 },
        { item: 'Category 2', count: 21 },
        { item: 'Category 3', count: 17 },
        { item: 'Category 4', count: 13 },
        { item: 'Category 5', count: 9 },
      ],
      encode: { y: 'count', color: 'item' },
      transform: [{ type: 'stackY' }],
      coordinate: {
        type: 'theta',
        outerRadius: 0.8,
      },
    },
    // Add full chart watermark
    {
      type: 'shape',
      zIndex: 1,
      style: {
        x: 0,
        y: 0,
        render: (style, context) => watermark(style, context),
      },
    },
  ],
});

chart.render();
```
