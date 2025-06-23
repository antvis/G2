---
title: lineX
order: 13
---

## Overview

The `lineX` and `lineY` marks have similar configurations. The `lineX` mark is used to draw auxiliary lines perpendicular to the x-axis, commonly used for drawing average values or other aggregated data auxiliary lines.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  height: 200,
  children: [
    {
      type: 'rect',
      data: {
        type: 'fetch',
        value: 'https://assets.antv.antgroup.com/g2/unemployment2.json',
      },
      encode: { x: 'rate' },
      transform: [{ type: 'binX', y: 'count' }],
      style: { inset: 0.5 },
    },
    {
      type: 'lineX',
      data: [10.2],
      style: { stroke: '#000', strokeOpacity: 0.45, lineDash: [3, 4] },
      labels: [
        {
          text: 'lineX text',
          position: 'top-left',
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

| Property | Description                                                                                                                                             | Type              | Default | Required |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------- | -------- |
| encode   | Configure the visual channels of the `lineX` mark, including `x`, `color`, etc., to specify the relationship between visual element properties and data | [encode](#encode) | -       | ✓        |
| style    | Configure the graphic style of the `lineX` mark                                                                                                         | [style](#style)   | -       |          |
| labels   | Configure the text configuration of the `lineX` mark                                                                                                    | [labels](#labels) | -       |          |

### encode

Configure the visual channels of the `lineX` mark.

| Property | Description                                                                                                                                                                                                                                                                                                                                          | Type                             | Default | Required |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ------- | -------- |
| x        | Bind the `x` property channel of the `lineX` mark. No `y` property channel is needed, you can directly configure data with data([1,...]), which will be automatically configured to the `x` channel. Or use transforms to calculate the mean or median of the original data to automatically draw average or median lines without manual calculation | [encode](/en/manual/core/encode) | -       | ✓        |
| color    | Bind the `color` property channel of the `lineX` mark. If a data field is mapped to the color channel, the data will be grouped and split into multiple regions with different colors                                                                                                                                                                | [encode](/en/manual/core/encode) | -       |          |

Try it out:

```js | ob {. inject: true }
/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/layer_histogram_global_mean.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/movies.json',
  transform: [
    {
      type: 'filter',
      callback: (d) => d['IMDB Rating'] > 0,
    },
  ],
});

chart
  .rect()
  .transform({ type: 'binX', y: 'count', thresholds: 9 })
  .encode('x', 'IMDB Rating')
  .scale('y', { domainMax: 1000 })
  .style('inset', 1);

chart
  .lineX()
  .transform({ type: 'groupColor', x: 'mean' }) // groupColor 为分组并对指定的通道进行聚合，可以理解为把数据通过 x 通道的数据 取平均值(mean) 变更为一条数据。
  .encode('x', 'IMDB Rating')
  .style('stroke', '#F4664A')
  .style('strokeOpacity', 1)
  .style('lineWidth', 2)
  .style('lineDash', [4, 4]);

chart.render();

```

### style

| Property      | Description                                                                                                                                                                         | Type                                                | Default   | Required |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | --------- | -------- |
| stroke        | Stroke of the graphic                                                                                                                                                               | _string_ \| _Function\<string\>_                    | -         |          |
| strokeOpacity | Stroke opacity                                                                                                                                                                      | _number_ \| _Function\<number\>_                    | -         |          |
| lineWidth     | Width of the graphic stroke                                                                                                                                                         | _number_ \| _Function\<number\>_                    | -         |          |
| lineDash      | Dashed stroke configuration. The first value is the length of each dash segment, the second value is the distance between segments. Setting lineDash to [0, 0] results in no stroke | _[number,number]_ \| _Function\<[number, number]\>_ | -         |          |
| opacity       | Overall opacity of the graphic                                                                                                                                                      | _number_ \| _Function\<number\>_                    | -         |          |
| shadowColor   | Shadow color of the graphic                                                                                                                                                         | _string_ \| _Function\<string\>_                    | -         |          |
| shadowBlur    | Gaussian blur coefficient of the graphic shadow                                                                                                                                     | _number_ \| _Function\<number\>_                    | -         |          |
| shadowOffsetX | Horizontal distance of the shadow from the graphic                                                                                                                                  | _number_ \| _Function\<number\>_                    | -         |          |
| shadowOffsetY | Vertical distance of the shadow from the graphic                                                                                                                                    | _number_ \| _Function\<number\>_                    | -         |          |
| cursor        | Mouse cursor style. Same as CSS cursor style, default 'default'                                                                                                                     | _string_ \| _Function\<string\>_                    | `default` |          |
