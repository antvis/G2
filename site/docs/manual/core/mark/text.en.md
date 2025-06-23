---
title: text
order: 25
---

## Overview

`Text` is a graphic element used to draw text marks in charts. It allows users to directly add textual annotations, labels, or other explanatory content to charts, thereby enhancing the effectiveness and readability of data visualization. `Text` marks have numerous visual mapping channels: `x`, `y`, `color`, `fontSize`, `rotate`, etc. In addition, there are numerous text style-related configurations that can provide stronger expressiveness to text visualization through visual mapping. It is generally used in several scenarios:

- Text visualization
- Data annotation and assistance

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view', // Chart type is 'view'
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  },
  children: [
    // Configure bar chart
    {
      type: 'interval',
      encode: { x: 'letter', y: 'frequency' },
      axis: { y: { labelFormatter: '.0%' } },
    },
    {
      type: 'text', // Child view type is 'text', representing text labels
      encode: { x: 'letter', y: 'frequency', text: 'frequency' }, // Data encoding configuration: x-axis corresponds to 'letter' field, y-axis corresponds to 'frequency' field, text content is the value of 'frequency' field
      style: { fill: 'black', textAlign: 'center', dy: -5 }, // Text style configuration: fill color is black, text horizontally centered, y-direction offset -5 pixels
    },
  ],
});

chart.render();
```

For more examples, please check the [Chart Examples](/examples) page.

## Configuration

| Property | Description                                                                                                                                                    | Type              | Default | Required |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------- | -------- |
| encode   | Configure visual channels for `text` marks, including `x`, `y`, `color`, `shape`, etc., to specify the relationship between visual element properties and data | [encode](#encode) | -       |          |
| style    | Configure `text` graphic styles                                                                                                                                | [style](#style)   | -       |          |
| scale    | Configure graphic scaling for `text` marks, including `text`, `fontSize`, etc.                                                                                 | [scale](#scale)   | -       |          |

### encode

Configure visual channels for `text` marks, an important configuration that defines the mapping relationship between data fields and visual attributes, determining how data is transformed into visual representation.

| Property | Description                                        | Type                          | Default |
| -------- | -------------------------------------------------- | ----------------------------- | ------- |
| x        | Bind the `x` property channel for `text` marks     | [encode](/manual/core/encode) | -       |
| y        | Bind the `y` property channel for `text` marks     | [encode](/manual/core/encode) | -       |
| text     | Bind the `text` property channel for `text` marks  | [encode](/manual/core/encode) | -       |
| shape    | Bind the `shape` property channel for `text` marks | [encode](/manual/core/encode) | -       |

**shape**

Configure the shape of the text container

| Shape | Description                                   | Example                                                                                                                            |
| ----- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| text  | Draw text                                     | <img alt="link" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*goS1QJfB1kIAAAAAAAAAAAAAemJ7AQ/original" width="80" /> |
| badge | Draw text with markers, shaped like a balloon | <img alt="link" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*DZH8Q7GMMsoAAAAAAAAAAAAAemJ7AQ/original" width="80" /> |

For more `encode` configurations, please check the [encode](/manual/core/encode) introduction page.

### scale

`scale` is used to define how data maps to visual properties.

| Property | Description                             | Type                                  | Default            |
| -------- | --------------------------------------- | ------------------------------------- | ------------------ |
| text     | Define text mapping rules               | [scale](/manual/core/scale/overview)> | `{type: identity}` |
| fontSize | Define font size mapping rules for text | [scale](/manual/core/scale/overview)> | `{type: identity}` |
| rotate   | Define rotation mapping rules for text  | [scale](/manual/core/scale/overview)> | `{type: identity}` |

For more `scale` configurations, please check the [scale](/manual/core/scale/overview) introduction page.

### style

`style` is used to set the appearance styles of text, including fill color, border styles, shadow effects, etc.

| Property         | Description                                                                                                                                                                  | Type                                              | Default   |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | --------- |
| shape            | Modify text container graphics, consistent with `shape` property channel configuration in `encode`                                                                           | `string` \| `Function<string>`                    | -         |
| fontSize         | Text size                                                                                                                                                                    | `number` \| `Function<number>`                    | -         |
| fontFamily       | Text font                                                                                                                                                                    | `string` \| `Function<string>`                    | -         |
| fontWeight       | Font weight                                                                                                                                                                  | `number` \| `Function<number>`                    | -         |
| lineHeight       | Line height of text                                                                                                                                                          | `number` \| `Function<number>`                    | -         |
| textAlign        | Set current alignment of text content, supported properties: `center` \| `end` \| `left` \| `right` \| `start`, default is `start`                                           | `string` \| `Function<string>`                    | -         |
| textBaseline     | Set current text baseline used when drawing text, supported properties: `top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging`. Default is `bottom`                      | `string` \| `Function<string>`                    | -         |
| fill             | Fill color of the graphic                                                                                                                                                    | `string` \| `Function<string>`                    | -         |
| fillOpacity      | Fill opacity of the graphic                                                                                                                                                  | `number` \| `Function<number>`                    | -         |
| stroke           | Stroke of the graphic                                                                                                                                                        | `string` \| `Function<string>`                    | -         |
| strokeOpacity    | Stroke opacity                                                                                                                                                               | `number` \| `Function<number>`                    | -         |
| lineWidth        | Width of the graphic stroke                                                                                                                                                  | `number` \| `Function<number>`                    | -         |
| lineDash         | Dashed stroke configuration. First value is the length of each dash segment, second value is the distance between segments. Setting lineDash to [0, 0] results in no stroke. | `[number,number]` \| `Function<[number, number]>` | -         |
| opacity          | Overall opacity of the graphic                                                                                                                                               | `number` \| `Function<number>`                    | -         |
| shadowColor      | Shadow color of the graphic                                                                                                                                                  | `string` \| `Function<string>`                    | -         |
| shadowBlur       | Gaussian blur coefficient of the graphic shadow                                                                                                                              | `number` \| `Function<number>`                    | -         |
| shadowOffsetX    | Horizontal distance of shadow from the graphic                                                                                                                               | `number` \| `Function<number>`                    | -         |
| shadowOffsetY    | Vertical distance of shadow from the graphic                                                                                                                                 | `number` \| `Function<number>`                    | -         |
| cursor           | Mouse cursor style. Same as CSS cursor style, default 'default'.                                                                                                             | `string` \| `Function<string>`                    | 'default' |
| dx               | Offset of text in x direction                                                                                                                                                | `number`                                          | -         |
| dy               | Offset of text in y direction                                                                                                                                                | `number`                                          | -         |
| text             | Text content to be drawn                                                                                                                                                     | `string`                                          | -         |
| x                | X coordinate of text                                                                                                                                                         | `string`                                          | -         |
| y                | Y coordinate of text                                                                                                                                                         | `string`                                          | -         |
| wordWrap         | Whether to enable text wrapping                                                                                                                                              | `boolean`                                         | -         |
| wordWrapWidth    | Maximum width for text wrapping                                                                                                                                              | `number`                                          | -         |
| background       | Background color of text                                                                                                                                                     | `string`                                          | -         |
| backgroundRadius | Border radius of text background                                                                                                                                             | `boolean`                                         | -         |
| mark             | Properties of link markers                                                                                                                                                   | [mark](#mark)                                     | -         |
| transform        | Configure text transformation properties                                                                                                                                     | `string`                                          | -         |
| color            | Text color                                                                                                                                                                   | `string`                                          | -         |

**<span id='mark'>mark</span>**

When `shape` is `badge`, `style` also has the following configurations.

| Property            | Description           | Type     | Default |
| ------------------- | --------------------- | -------- | ------- |
| markerSize          | Marker size           | `number` | 24      |
| markerFill          | Marker fill color     | `string` |         |
| markerFillOpacity   | Marker fill opacity   | `number` |         |
| markerStroke        | Marker stroke color   | `string` |         |
| markerStrokeOpacity | Marker stroke opacity | `number` |         |

For more `style` configurations, please check the [style](/manual/core/style) introduction page.

Try it out:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/antvdemo/assets/data/blockchain.json',
    transform: [
      {
        type: 'fold',
        fields: ['blockchain', 'nlp'],
        key: 'type',
        value: 'value',
      },
    ],
  })
  .axis('x', { labelAutoHide: 'greedy' });

chart
  .line()
  .encode('x', (d) => new Date(d.date))
  .encode('y', 'value')
  .encode('color', 'type');

chart
  .text()
  .data([new Date('2017-12-17'), 100])
  .style({
    text: `2017-12-17, 受比特币影响，blockchain 搜索热度达到峰值：100`,
    wordWrap: true,
    wordWrapWidth: 164,
    dx: -174,
    dy: 30,
    fill: '#2C3542',
    fillOpacity: 0.65,
    fontSize: 10,
    background: true,
    backgroundRadius: 2,
    connector: true,
    startMarker: true,
    startMarkerFill: '#2C3542',
    startMarkerFillOpacity: 0.65,
  })
  .tooltip(false);

chart.render();

```

## Examples

- How to specify arrow icon length?

There are two ways to specify arrow icon length: one is by filling in pixel values, such as `40`, to specify a fixed length; another is by specifying a percentage, such as `30%`, to specify the relative length referring to the arrow length. The default value is `40%`. Example:

```ts
chart
  .vector()
  // ...
  .shape('vector')
  .style({
    arrowSize: 40,
    // arrowSize: '30%',
  });
```

- How to draw peak value markers?

Configure [selectY](/manual/core/transform/select-y) data transformation, set grouping `groupBy: 'color'` to group by color channel, and set maximum value selector `selector: 'max'` to use the max selector for specified data extraction, outputting to the y channel. This way you can draw text marks at the maximum value of each line.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  data: [
    { month: 'Jan', city: 'Tokyo', temperature: 7 },
    { month: 'Jan', city: 'London', temperature: 3.9 },
    { month: 'Feb', city: 'Tokyo', temperature: 6.9 },
    { month: 'Feb', city: 'London', temperature: 4.2 },
    { month: 'Mar', city: 'Tokyo', temperature: 9.5 },
    { month: 'Mar', city: 'London', temperature: 5.7 },
    { month: 'Apr', city: 'Tokyo', temperature: 14.5 },
    { month: 'Apr', city: 'London', temperature: 8.5 },
    { month: 'May', city: 'Tokyo', temperature: 18.4 },
    { month: 'May', city: 'London', temperature: 11.9 },
    { month: 'Jun', city: 'Tokyo', temperature: 21.5 },
    { month: 'Jun', city: 'London', temperature: 15.2 },
    { month: 'Jul', city: 'Tokyo', temperature: 25.2 },
    { month: 'Jul', city: 'London', temperature: 17 },
    { month: 'Aug', city: 'Tokyo', temperature: 26.5 },
    { month: 'Aug', city: 'London', temperature: 16.6 },
    { month: 'Sep', city: 'Tokyo', temperature: 23.3 },
    { month: 'Sep', city: 'London', temperature: 14.2 },
    { month: 'Oct', city: 'Tokyo', temperature: 18.3 },
    { month: 'Oct', city: 'London', temperature: 10.3 },
    { month: 'Nov', city: 'Tokyo', temperature: 13.9 },
    { month: 'Nov', city: 'London', temperature: 6.6 },
    { month: 'Dec', city: 'Tokyo', temperature: 9.6 },
    { month: 'Dec', city: 'London', temperature: 4.8 },
  ],
  encode: { x: 'month', y: 'temperature', color: 'city' },
  scale: { x: { range: [0, 1] }, y: { nice: true } },
  axis: { y: { labelFormatter: (d) => d + '°C' } },
  children: [
    { type: 'line', encode: { shape: 'smooth' } },
    {
      type: 'text',
      encode: {
        x: 'month',
        y: 'temperature',
        text: (d) => `Peak: ${d.temperature}`,
      },
      transform: [
        {
          type: 'selectY',
          groupBy: 'color',
          selector: 'max',
        },
      ],
      style: {
        fill: 'orange',
        fontSize: 16,
        dy: -15,
      },
      tooltip: false,
    },
    {
      type: 'point',
      encode: { x: 'month', y: 'temperature' },
      transform: [
        {
          type: 'selectY',
          groupBy: 'color',
          selector: 'max',
        },
      ],
      tooltip: false,
    },
  ],
});

chart.render();
```
