---
title: lineY
order: 13
---

## Overview

The `lineY` and `lineX` marks have similar configurations. The `lineY` mark is used to draw auxiliary lines perpendicular to the y-axis, commonly used for drawing average values or other aggregated data auxiliary lines.

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  height: 200,
  autoFit: true,
  children: [
    {
      type: 'interval',
      data: [
        { year: '1951', sales: 38 },
        { year: '1952', sales: 52 },
        { year: '1956', sales: 61 },
        { year: '1957', sales: 120 },
        { year: '1958', sales: 48 },
        { year: '1959', sales: 38 },
      ],
      encode: { x: 'year', y: 'sales' },
    },
    {
      type: 'lineY',
      data: [100, 59],
      style: {
        stroke: (v) => {
          if (v >= 60) {
            return 'green';
          } else {
            return 'red';
          }
        },
        lineWidth: 2,
      },
      labels: [
        // Text configuration can refer to mark text
        {
          text: (v) => (v >= 60 ? 'lineY divider 1' : 'lineY divider 2'),
          position: 'top-right',
          textBaseline: 'bottom',
          fill: '#000',
          fillOpacity: 0.45,
          background: true,
          backgroundFill: '#000',
          backgroundOpacity: 0.15,
        },
      ],
    },
  ],
});

chart.render();
```

For more examples, you can visit the [Chart Examples - Line Annotation](/en/examples#annotation-line) page.

## Configuration

| Property | Description                                                                                                                              | Type              | Default | Required |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------- | -------- |
| encode   | Configure the visual channels of the `lineY` mark, including `y`, `color`, etc., to specify the relationship between visual element properties and data | [encode](#encode) | -       | ✓        |
| style    | Configure the graphic style of the `lineY` mark                                                                                          | [style](#style)   | -       |          |

### encode

Configure the visual channels of the `lineY` mark.

| Property | Description                                                                                                                                                                                                                                                                                              | Type                          | Default | Required |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------- | -------- |
| y        | Bind the `y` property channel of the `lineY` mark. No `x` property channel is needed, you can directly configure data with data([1,...]), which will be automatically configured to the `y` channel. Or use transforms to calculate the mean or median of the original data to automatically draw average or median lines without manual calculation | [encode](/en/manual/core/encode) | -       |          |
| color    | Bind the `color` property channel of the `lineY` mark. If a data field is mapped to the color channel, the data will be grouped and split into multiple regions with different colors                                                                                                                   | [encode](/en/manual/core/encode) | -       |          |

Try it out:

<Playground path="style/annotation/line/demo/interval-mean-line.ts" rid="lineY-mean"></Playground>

### style

| Property      | Description                                                                                                                                                                          | Type                                                | Default   | Required |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------- | --------- | -------- |
| stroke        | Stroke of the graphic                                                                                                                                                                | _string_ \| _Function\<string\>_                    | -         |          |
| strokeOpacity | Stroke opacity                                                                                                                                                                       | _number_ \| _Function\<number\>_                    | -         |          |
| lineWidth     | Width of the graphic stroke                                                                                                                                                          | _number_ \| _Function\<number\>_                    | -         |          |
| lineDash      | Dashed stroke configuration. The first value is the length of each dash segment, the second value is the distance between segments. Setting lineDash to [0, 0] results in no stroke | _[number,number]_ \| _Function\<[number, number]\>_ | -         |          |
| opacity       | Overall opacity of the graphic                                                                                                                                                       | _number_ \| _Function\<number\>_                    | -         |          |
| shadowColor   | Shadow color of the graphic                                                                                                                                                          | _string_ \| _Function\<string\>_                    | -         |          |
| shadowBlur    | Gaussian blur coefficient of the graphic shadow                                                                                                                                      | _number_ \| _Function\<number\>_                    | -         |          |
| shadowOffsetX | Horizontal distance of the shadow from the graphic                                                                                                                                   | _number_ \| _Function\<number\>_                    | -         |          |
| shadowOffsetY | Vertical distance of the shadow from the graphic                                                                                                                                     | _number_ \| _Function\<number\>_                    | -         |          |
| cursor        | Mouse cursor style. Same as CSS cursor style, default 'default'                                                                                                                     | _string_ \| _Function\<string\>_                    | `default` |          |
