---
title: Data Label
order: 7.6
---

## Overview

In G2, **Data Labels** are one of the means to add annotations to charts, providing content annotation for the current group of data. They include elements such as data points, connector lines, and text values, which are selected based on different chart types. Through concise text descriptions, they reduce misunderstandings, make charts easier to interpret, and emphasize key data or trends, guiding attention to important information.

### Elements

Includes connector lines and text value elements, which are selected based on different chart types.

<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*r7UMTKWF6QIAAAAAAAAAAAAAemJ7AQ/original' />

Among them, pie charts, donut charts, rose charts, etc., can use connector line elements to connect label text elements and mark graphics.

<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*EdDfQKwBJp0AAAAAAAAAAAAAemJ7AQ/original' width='40%' />

### Usage/Configuration

#### Adding to Mark

```js
chart.options({
  type: 'interval',
  labels: [
    { text: 'genre' }, // Specify the bound field
    {
      text: 'sold', // Specify the bound field
      fill: '#fff', // Specify style
    },
  ],
});
```

#### At View Level

You can configure `labelTransform` at the `view` level to declare label transformations

- API approach

```js
// First method
chart
  .labelTransform({ type: 'overlapHide' })
  .labelTransform({ type: 'contrastReverse' });

// Second method
chart.labelTransform([{ type: 'overlapHide' }, { type: 'contrastReverse' }]);
```

- Spec configuration

```js
({
  type: 'view',
  labelTransform: [{ type: 'overlapHide' }, { type: 'contrastReverse' }],
});
```

## Mark Labels

Each mark can have multiple labels. Here's a simple example:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  height: 300,
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold' },
  labels: [
    { text: 'genre', style: { dy: -15 } },
    { text: 'sold', style: { fill: '#fff', dy: 5 } },
  ],
});

chart.render();
```

## Configuration Options

| Property   | Description                                                                                                                                                      | Type                             | Default Value                 | Required |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ----------------------------- | -------- |
| dx         | Label text horizontal offset, can also be configured through style.dx                                                                                            | number                           | 0                             |          |
| dy         | Label text vertical offset, can also be configured through style.dy                                                                                              | number                           | 0                             |          |
| offset     | Label offset distance, can also be configured through style.offset                                                                                               | number                           | -                             |          |
| text       | Label data channel, similar to mark's `x` channel, corresponds to text element, can use callback to customize `string` text                                      | string \| Function               | -                             |          |
| innerHTML  | Similar to `text` configuration, when both are configured, `text` becomes ineffective, can use callback to customize `string` text or `HTMLElement` complex html | string \| Function               | -                             |          |
| formatter  | Label text formatting                                                                                                                                            | _string_ \| _Function\<string\>_ | -                             |          |
| render     | Same configuration type as `innerHTML`                                                                                                                           | string \| Function               | -                             |          |
| selector   | Label selector, can retain or hide labels                                                                                                                        | [selector](#selector)            | `{type: 'cartesian' }`        |          |
| transform  | Label transformation, used to optimize label display, solving label overlap and color visibility issues                                                          | [transform](#transform)          | -                             |          |
| position   | Label position relative to graphics, not label direction                                                                                                         | [position](#position)            | -                             |          |
| style      | Label style configuration                                                                                                                                        | [style](#style)                  | -                             |          |
| background | Whether to show background color                                                                                                                                 | _boolean_                        | See [background](#background) |          |
| connector  | Whether to show connector lines, used in non-Cartesian coordinate systems like pie and donut charts                                                              | _boolean_                        | See [connector](#connector)   |          |

### text & innerHTML

`label` text element content configuration

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  height: 340,
  insetTop: 20,
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold' },
  labels: [
    { text: 'sold', style: { dy: -30 } }, // text maps to field sold
    { text: ({ genre }) => genre, style: { dy: -20 } }, // text custom return string type
    {
      innerHTML: 'genre',
      dx: 20,
      dy: 10,
      style: { fill: '#fff', color: '#333', fontSize: 10 },
    }, // innerHTML maps to field genre Note: background color might be black sometimes, need to configure fill background color. color is text color, HTMLElement itself can also configure styles
    {
      // innerHTML custom return HTMLElement type data
      innerHTML: ({ genre, sold }) =>
        `<div style="padding:0 4px;border-radius: 10px;background: #f5f5f5;border: 2px solid #5ea9e6;font-size: 11px;">${genre}:${sold}</div>`,
      dx: 10,
      dy: 50,
      style: { fill: 'rgba(0,0,0,0)', color: '#333' },
    },
  ],
});

chart.render();
```

You can also try configuring HTMLElement with `render`, the parameters differ from innerHTML, but the return is consistent.

```ts
type RenderFunc = (text: string, datum: object, index: number, {channel: Record<string, Channel>}) => String | HTMLElement;
```

### selector

`label` selector

For marks that correspond to multiple data items per graphic, we can use `selector` to choose which marks to retain. Currently supported values are:

- `first` - First one
- `last` - Last one
- `function` - Custom selector

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  autoFit: true,
  height: 300,
  insetLeft: 40,
  insetRight: 40,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/indices.json',
  },
  encode: { x: (d) => new Date(d.Date), y: 'Close', color: 'Symbol' },
  scale: { y: { type: 'log' } },
  axis: { y: { title: '↑ Change in price (%)' } },
  labels: [
    {
      text: ({ Symbol }) => `first ${Symbol}`,
      selector: 'first', // First in mark graphics
      fontSize: 13,
      style: { fill: 'blue', fontWeight: 600, dx: -50 },
    },
    {
      text: ({ Symbol }) => `last ${Symbol}`,
      selector: 'last', // Last in mark graphics
      fontSize: 13,
      style: { fill: 'red', fontWeight: 600 },
    },
    {
      text: ({ Symbol }) => `custom ${Symbol}`,
      selector: (v) => {
        // Custom filtering, returns all label arrays containing coordinates and other info. Need to return this info, can filter and process.
        return v.filter(({ bounds }) => {
          const bound = bounds[0];
          return (
            // Filter labels in chart coordinates x:[200,200.5] y:[200,350]
            bound[0] > 200 &&
            bound[0] < 200.5 &&
            bound[1] > 200 &&
            bound[1] < 350
          );
        });
      },
      fontSize: 13,
      style: { fill: '#ac1ce6', fontWeight: 600 },
    },
  ],
});

chart.render();
```

### transform

`label` transformation

When label display doesn't meet expectations, such as overlapping or unclear colors, we can use **Label Transform** to optimize label display. It can also be configured directly at the view level to process labels for the entire view.

Currently supported label transformations:

| type            | Description                                                                                                      |
| --------------- | ---------------------------------------------------------------------------------------------------------------- |
| overlapDodgeY   | Adjusts overlapping labels in the y direction to prevent label overlap                                           |
| contrastReverse | When label color has low contrast on graphic background, selects optimal contrast color from specified palette   |
| overflowStroke  | In case of overflow, select a color with the best contrast from the specified color palette to stroke            |
| overflowHide    | Hides labels when they don't fit on the graphic                                                                  |
| overlapHide     | Hides overlapping labels, by default keeps the first one and hides subsequent ones                               |
| exceedAdjust    | Automatically detects and corrects label overflow, moving labels in reverse direction when they exceed view area |

Different transformation types target different label issues. Understanding the differences between each `transform` label transformation is essential.

#### overlapDodgeY

Targets chaotic situations caused by crowded overlapping labels, adjusting overlapping labels in the y direction.

##### Problem Case

```js | ob {  pin: false, inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  autoFit: true,
  height: 300,
  insetLeft: 40,
  insetRight: 40,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/cb99c4ab-e0a3-4c76-9586-fe7fa2ff1a8c.csv',
  },
  encode: {
    x: (d) => new Date(d.date).getFullYear(),
    y: 'price',
    color: 'symbol',
  },
  transform: [{ type: 'groupX', y: 'mean' }],
  labels: [{ text: 'price' }],
});
chart.render();
```

##### Configuring `overlapDodgeY` Label Transform

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  autoFit: true,
  height: 300,
  insetLeft: 40,
  insetRight: 40,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/cb99c4ab-e0a3-4c76-9586-fe7fa2ff1a8c.csv',
  },
  encode: {
    x: (d) => new Date(d.date).getFullYear(),
    y: 'price',
    color: 'symbol',
  },
  transform: [{ type: 'groupX', y: 'mean' }],
  labels: [{ text: 'price', transform: [{ type: 'overlapDodgeY' }] }],
});

chart.render();
```

| Property      | Description                                                                                      | Type     | Default | Required |
| ------------- | ------------------------------------------------------------------------------------------------ | -------- | ------- | -------- |
| maxIterations | Maximum number of iterations for position adjustment                                              | _number_ | `10`    |          |
| padding       | Expected spacing between labels after adjustment                                                  | _number_ | `1`     |          |
| maxError      | Maximum error, the difference between actual spacing and expected spacing padding                 | _number_ | `0.1`   |          |

#### contrastReverse

`contrastReverse` selects optimal contrast color from a specified palette when label color has low [color contrast](https://webaim.org/resources/contrastchecker/) on graphic background. Addresses issues where graphic color and `label` color are similar, making labels hard to see, mostly occurring in multi-colored bar charts (mark interval) where colors vary and manual `label` color changes are difficult.

##### Problem Case

When some graphic colors are close to label colors, visibility issues occur.

```js | ob {  pin: false, inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  height: 300,
  data: [
    { genre: 'Sports', sold: 40 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold', color: 'genre' },
  scale: {
    color: { range: ['#ff0000', '#f0d2fc', '#2b00ff', '#ff8000', '#064501'] },
  },
  labels: [{ text: 'genre' }],
});

chart.render();
```

##### Configuring `contrastReverse` Label Transform

Optimizes color for unclear `label` text.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  height: 300,
  data: [
    { genre: 'Sports', sold: 40 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold', color: 'genre' },
  scale: {
    color: { range: ['#ff0000', '#f0d2fc', '#2b00ff', '#ff8000', '#064501'] },
  },
  labels: [{ text: 'genre', transform: [{ type: 'contrastReverse' }] }],
});

chart.render();
```

| Property  | Description                                                                                       | Type       | Default            | Required |
| --------- | ------------------------------------------------------------------------------------------------- | ---------- | ------------------ | -------- |
| threshold | Color contrast threshold between label and background graphic, colors recommended above threshold | `number`   | `4.5`              |          |
| palette   | Alternative color palette for contrast improvement algorithm                                      | `string[]` | `['#000', '#fff']` |          |

#### overflowStroke

`overflowStroke` selects an optimal contrast color from a specified palette to add stroke to the label. Similar to the principle of white text with black border, it addresses the issue where label color blends with the background when labels overflow elements, making them hard to read.

##### Problem Case

In the following example, the label color has good contrast with the graphic background, but readability becomes very poor when overflowing.

```js | ob {  pin: false, inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  width: 200,
  type: 'interval',
  scale: {
    color: { range: ['#222'] },
  },
  autoFit: true,
  data: [
    { letter: 'A', frequency: 8167 },
    { letter: 'B', frequency: 1492 },
    { letter: 'C', frequency: 2782 },
    { letter: 'D', frequency: 4253 },
    { letter: 'E', frequency: 2702 },
    { letter: 'H', frequency: 6094 },
    { letter: 'I', frequency: 2288 },
  ],
  encode: { x: 'letter', y: 'frequency', color: () => 'bar' },
  labels: [
    {
      text: 'frequency',
      transform: [
        {
          type: 'contrastReverse',
        },
      ],
    },
  ],
});

chart.render();
```

##### Configuring `overflowStroke` for Stroke Optimization

Optimizes stroke for unclear `label` text.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  width: 200,
  type: 'interval',
  scale: {
    color: { range: ['#222'] },
  },
  autoFit: true,
  data: [
    { letter: 'A', frequency: 8167 },
    { letter: 'B', frequency: 1492 },
    { letter: 'C', frequency: 2782 },
    { letter: 'D', frequency: 4253 },
    { letter: 'E', frequency: 2702 },
    { letter: 'H', frequency: 6094 },
    { letter: 'I', frequency: 2288 },
  ],
  encode: { x: 'letter', y: 'frequency', color: () => 'bar' },
  labels: [
    {
      text: 'frequency',
      transform: [
        {
          type: 'contrastReverse',
        },
        {
          type: 'overflowStroke',
        },
      ],
    },
  ],
});

chart.render();
```

| Property  | Description                                                                    | Type       | Default            | Required |
| --------- | ------------------------------------------------------------------------------ | ---------- | ------------------ | -------- |
| threshold | Overflow threshold, the larger the threshold, the less likely it is to trigger | `number`   | 2                  |          |
| palette   | Alternative color palette for contrast improvement algorithm                   | `string[]` | `['#000', '#fff']` |          |

#### overflowHide

`overflowHide` hides labels when they don't fit on the graphic. The difference from `overlapDodgeY`:

- `overlapDodgeY` addresses `label` to `label` overlap, multiple `label` overlaps causing blur.
- `overflowHide` addresses `label` to `mark` graphic relationship, multiple small graphics causing blur.

##### Problem Case

When a chart has multiple small graphics, if each small graphic has a mapped `label`, overlap and chart blur occur. Examples include sunburst charts, treemap charts, etc.

<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*PTxzSqaZKtwAAAAAAAAAAAAAemJ7AQ/original' width='50%' />
<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*LeNnSZqTtlYAAAAAAAAAAAAAemJ7AQ/original' width='50%' />

##### Configuring `overflowHide` Label Transform

Hides `label` text that exceeds corresponding graphics. Note: Some special charts have built-in `label` configuration and can be configured at the view level.

Try this:

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
  .label({
    text: 'name',
    transform: [
      {
        type: 'overflowHide',
      },
    ],
  });

chart.render();
```

#### overlapHide

`overlapHide` hides overlapping labels, by default keeps the first one and hides subsequent ones. The difference from `overlapDodgeY` is that `overlapHide` hides rather than moves.

##### Problem Case

When some graphic colors are close to label colors, visibility issues occur.

```js | ob {  pin: false, inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  autoFit: true,
  height: 300,
  insetLeft: 40,
  insetRight: 40,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/cb99c4ab-e0a3-4c76-9586-fe7fa2ff1a8c.csv',
  },
  encode: {
    x: (d) => new Date(d.date).getFullYear(),
    y: 'price',
    color: 'symbol',
  },
  transform: [{ type: 'groupX', y: 'mean' }],
  labels: [{ text: 'price' }],
});
chart.render();
```

##### Configuring `overlapHide` Label Transform

Optimizes unclear `label` colors.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  autoFit: true,
  height: 300,
  insetLeft: 40,
  insetRight: 40,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/cb99c4ab-e0a3-4c76-9586-fe7fa2ff1a8c.csv',
  },
  encode: {
    x: (d) => new Date(d.date).getFullYear(),
    y: 'price',
    color: 'symbol',
  },
  transform: [{ type: 'groupX', y: 'mean' }],
  labels: [{ text: 'price', transform: [{ type: 'overlapHide' }] }],
});

chart.render();
```

#### exceedAdjust

`exceedAdjust` automatically detects and corrects label overflow, moving labels in the reverse direction when they exceed the specified area.

##### Configuration Options

| Property | Description                                                          | Type               | Default |
| -------- | -------------------------------------------------------------------- | ------------------ | ------- |
| bounds   | Specify boundary region type for detection, supported from `5.3.4`   | `'view' \| 'main'` | `'view'` |
| offsetX  | Additional X-axis offset when auto-adjusting position                | `number`           | `0`     |
| offsetY  | Additional Y-axis offset when auto-adjusting position                | `number`           | `0`     |

- `'view'`: Detects if labels exceed the entire view area (including margin and padding)
- `'main'`: Detects if labels exceed the main area (excluding margin and padding)
- `'offsetX'`: Additional X-axis offset when triggering auto-adjustment, left boundary shifts right, right boundary shifts left
- `'offsetY'`: Additional Y-axis offset when triggering auto-adjustment, top boundary shifts down, bottom boundary shifts up

##### Problem Case

`label` text exceeds the chart, and the exceeded portion gets clipped.

```js | ob {  pin: false, inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  autoFit: true,
  height: 300,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/cb99c4ab-e0a3-4c76-9586-fe7fa2ff1a8c.csv',
  },
  encode: {
    x: (d) => new Date(d.date).getFullYear(),
    y: 'price',
    color: 'symbol',
  },
  transform: [{ type: 'groupX', y: 'mean' }],
  labels: [{ text: 'price' }],
});
chart.render();
```

##### Configuring `exceedAdjust` Label Transform - Default View Boundary

Optimizes direction for `label` text exceeding the view, with default boundary as view area.

<img alt="chart-component" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*tFaaTbBg-_cAAAAAAAAAAAAAemJ7AQ/original" width=900/>

```js | ob { inject: true, pin: false }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const data = [
  {
    date: '2025-07-01',
    price: 600,
    showLabel: 1,
    tooltip: 'Lowest Price ¥600',
  },
  {
    date: '2025-07-02',
    price: 660,
  },
  {
    date: '2025-07-03',
    price: 778,
  },
  {
    date: '2025-07-04',
    price: 780,
  },
  {
    date: '2025-07-05',
    price: 810,
  },
  {
    date: '2025-07-06',
    price: 815,
  },
  {
    date: '2025-07-07',
    price: 778,
  },
  {
    date: '2025-07-08',
    price: 778,
  },
  {
    date: '2025-07-09',
    price: 778,
  },
  {
    date: '2025-07-10',
    price: 778,
  },
  {
    date: '2025-07-11',
    price: 890,
  },
  {
    date: '2025-07-12',
    price: 814,
  },
  {
    date: '2025-07-13',
    price: 890,
  },
  {
    date: '2025-07-14',
    price: 820,
  },
  {
    date: '2025-07-15',
    price: 790,
  },
  {
    date: '2025-07-16',
    price: 810,
  },
  {
    date: '2025-07-17',
    price: 790,
  },
  {
    date: '2025-07-18',
    price: 860,
  },
  {
    date: '2025-07-19',
    price: 780,
  },
  {
    date: '2025-07-20',
    price: 860,
  },
  {
    date: '2025-07-21',
    price: 860,
  },
  {
    date: '2025-07-22',
    price: 860,
  },
  {
    date: '2025-07-23',
    price: 860,
  },
  {
    date: '2025-07-24',
    price: 860,
  },
  {
    date: '2025-07-25',
    price: 860,
  },
  {
    date: '2025-07-26',
    price: 860,
  },
  {
    date: '2025-07-27',
    price: 860,
  },
  {
    date: '2025-07-28',
    price: 860,
  },
  {
    date: '2025-07-29',
    price: 860,
  },
  {
    date: '2025-07-30',
    price: 860,
  },
  {
    date: '2025-07-31',
    price: 860,
  },
  {
    date: '2025-08-01',
    price: 860,
  },
  {
    date: '2025-08-02',
    price: 860,
  },
  {
    date: '2025-08-03',
    price: 860,
  },
  {
    date: '2025-08-04',
    price: 860,
  },
  {
    date: '2025-08-05',
    price: 860,
  },
  {
    date: '2025-08-06',
    price: 860,
  },
  {
    date: '2025-08-07',
    price: 860,
  },
  {
    date: '2025-08-08',
    price: 860,
  },
  {
    date: '2025-08-09',
    price: 860,
  },
  {
    date: '2025-08-10',
    price: 860,
  },
  {
    date: '2025-08-11',
    price: 860,
  },
  {
    date: '2025-08-12',
    price: 860,
  },
  {
    date: '2025-08-13',
    price: 860,
  },
  {
    date: '2025-08-14',
    price: 860,
  },
  {
    date: '2025-08-15',
    price: 860,
  },
  {
    date: '2025-08-16',
    price: 740,
  },
  {
    date: '2025-08-17',
    price: 740,
  },
  {
    date: '2025-08-18',
    price: 740,
  },
  {
    date: '2025-08-19',
    price: 740,
  },
  {
    date: '2025-08-20',
    price: 740,
  },
  {
    date: '2025-08-21',
    price: 740,
  },
  {
    date: '2025-08-22',
    price: 740,
  },
  {
    date: '2025-08-23',
    price: 740,
  },
  {
    date: '2025-08-24',
    price: 740,
  },
  {
    date: '2025-08-25',
    price: 740,
  },
  {
    date: '2025-08-26',
    price: 740,
  },
  {
    date: '2025-08-27',
    price: 740,
  },
  {
    date: '2025-08-28',
    price: 740,
  },
  {
    date: '2025-08-29',
    price: 740,
  },
  {
    date: '2025-08-30',
    price: 740,
  },
  {
    date: '2025-08-31',
    price: 740,
    showLabel: 1,
    tooltip: 'Highest Price ¥740',
  },
];
const result = (data.filter((item) => item.showLabel) || []).map((item) => {
  return {
    type: 'lineX',
    data: [item],
    encode: {
      x: 'date',
      y: 'price',
      color: 'linear-gradient(-90deg, #1677FF5B 0%,#1677FF 100%)',
    },
    style: {
      lineWidth: 3,
      lineDash: [3, 3],
    },
    labels: item.tooltip
      ? [
          {
            text: 'tooltip',
            fill: '#000000',
            fillOpacity: 1,
            fontSize: 22,
            fontWeight: 500,
            lineHeight: 30,
            textAlign: 'center',
            background: true,
            backgroundFill: '#ffffff',
            backgroundRadius: 24,
            backgroundOpacity: 1,
            backgroundPadding: [10, 16],
            backgroundRadius: 10,
            backgroundShadowColor: 'rgba(42,102,187,0.17)',
            backgroundShadowBlur: 22,
            transform: [{ type: 'exceedAdjust' }], // Default view boundary
          },
        ]
      : [],
  };
});

chart.options({
  width: 654,
  height: 310,
  type: 'view',
  margin: 20,
  marginLeft: 10,
  insetLeft: 24,
  insetRight: 24,
  insetBottom: 24,
  animate: false,
  axis: {
    x: {
      title: '',
      size: 16,
      line: true,
      lineLineWidth: 1.5,
      lineStroke: '#DEE3EB',
      tick: false,
      labelFontSize: 22,
      labelFill: '#545C67',
      labelFontWeight: 500,
      labelDy: 8,
      labelFormatter: (str) => {
        if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
          const [year, month, day] = str.split('-');
          return `${+month}/${+day}`;
        }
        return str;
      },
      tickFilter: (d, index) => {
        if (data[index]?.showLabel) {
          return true;
        }
        return false;
      },
    },
    y: {
      title: '',
      tick: false,
      line: true,
      lineStroke: '#DEE3EB',
      lineLineWidth: 1.5,
      labelDx: -8,
      labelFontSize: 22,
      labelFill: '#545C67',
      labelFontWeight: 500,
      grid: false,
    },
  },
  scale: {
    y: {
      type: 'linear',
      tickCount: 5,
      domain: [600, 860],
      nice: true,
    },
  },
  children: [
    {
      type: 'area',
      data: data,
      encode: {
        x: 'date',
        y: 'price',
        shape: 'smooth',
      },
      style: {
        fill: `linear-gradient(-90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 50%,rgba(105, 168, 255, 0.61) 100%)`,
      },
    },
    {
      type: 'line',
      data: data,
      encode: {
        x: 'date',
        y: 'price',
        shape: 'smooth',
      },
      style: {
        stroke:
          'linear-gradient(0deg, #91BDFF 0%, #1777FF 24.148%, #1777FF 75.172%,#1677FF32 100%)',
        lineWidth: 6,
      },
    },
    ...result,
  ],
});

chart.render();
```

As you can see, when the area is set to the view area, it will still cover the axis tick labels. In this case, you need to modify the bounds parameter.

##### Configuring `exceedAdjust` Label Transform - Main Boundary

Using `bounds: 'main'` configuration, only adjusts when labels exceed the main area (excluding margin and padding).

```js | ob { inject: true, pin: false }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const data = [
  {
    date: '2025-07-01',
    price: 600,
    showLabel: 1,
    tooltip: 'Lowest Price ¥600',
  },
  {
    date: '2025-07-02',
    price: 660,
  },
  {
    date: '2025-07-03',
    price: 778,
  },
  {
    date: '2025-07-04',
    price: 780,
  },
  {
    date: '2025-07-05',
    price: 810,
  },
  {
    date: '2025-07-06',
    price: 815,
  },
  {
    date: '2025-07-07',
    price: 778,
  },
  {
    date: '2025-07-08',
    price: 778,
  },
  {
    date: '2025-07-09',
    price: 778,
  },
  {
    date: '2025-07-10',
    price: 778,
  },
  {
    date: '2025-07-11',
    price: 890,
  },
  {
    date: '2025-07-12',
    price: 814,
  },
  {
    date: '2025-07-13',
    price: 890,
  },
  {
    date: '2025-07-14',
    price: 820,
  },
  {
    date: '2025-07-15',
    price: 790,
  },
  {
    date: '2025-07-16',
    price: 810,
  },
  {
    date: '2025-07-17',
    price: 790,
  },
  {
    date: '2025-07-18',
    price: 860,
  },
  {
    date: '2025-07-19',
    price: 780,
  },
  {
    date: '2025-07-20',
    price: 860,
  },
  {
    date: '2025-07-21',
    price: 860,
  },
  {
    date: '2025-07-22',
    price: 860,
  },
  {
    date: '2025-07-23',
    price: 860,
  },
  {
    date: '2025-07-24',
    price: 860,
  },
  {
    date: '2025-07-25',
    price: 860,
  },
  {
    date: '2025-07-26',
    price: 860,
  },
  {
    date: '2025-07-27',
    price: 860,
  },
  {
    date: '2025-07-28',
    price: 860,
  },
  {
    date: '2025-07-29',
    price: 860,
  },
  {
    date: '2025-07-30',
    price: 860,
  },
  {
    date: '2025-07-31',
    price: 860,
  },
  {
    date: '2025-08-01',
    price: 860,
  },
  {
    date: '2025-08-02',
    price: 860,
  },
  {
    date: '2025-08-03',
    price: 860,
  },
  {
    date: '2025-08-04',
    price: 860,
  },
  {
    date: '2025-08-05',
    price: 860,
  },
  {
    date: '2025-08-06',
    price: 860,
  },
  {
    date: '2025-08-07',
    price: 860,
  },
  {
    date: '2025-08-08',
    price: 860,
  },
  {
    date: '2025-08-09',
    price: 860,
  },
  {
    date: '2025-08-10',
    price: 860,
  },
  {
    date: '2025-08-11',
    price: 860,
  },
  {
    date: '2025-08-12',
    price: 860,
  },
  {
    date: '2025-08-13',
    price: 860,
  },
  {
    date: '2025-08-14',
    price: 860,
  },
  {
    date: '2025-08-15',
    price: 860,
  },
  {
    date: '2025-08-16',
    price: 740,
  },
  {
    date: '2025-08-17',
    price: 740,
  },
  {
    date: '2025-08-18',
    price: 740,
  },
  {
    date: '2025-08-19',
    price: 740,
  },
  {
    date: '2025-08-20',
    price: 740,
  },
  {
    date: '2025-08-21',
    price: 740,
  },
  {
    date: '2025-08-22',
    price: 740,
  },
  {
    date: '2025-08-23',
    price: 740,
  },
  {
    date: '2025-08-24',
    price: 740,
  },
  {
    date: '2025-08-25',
    price: 740,
  },
  {
    date: '2025-08-26',
    price: 740,
  },
  {
    date: '2025-08-27',
    price: 740,
  },
  {
    date: '2025-08-28',
    price: 740,
  },
  {
    date: '2025-08-29',
    price: 740,
  },
  {
    date: '2025-08-30',
    price: 740,
  },
  {
    date: '2025-08-31',
    price: 740,
    showLabel: 1,
    tooltip: 'Highest Price ¥740',
  },
];
const result = (data.filter((item) => item.showLabel) || []).map((item) => {
  return {
    type: 'lineX',
    data: [item],
    encode: {
      x: 'date',
      y: 'price',
      color: 'linear-gradient(-90deg, #1677FF5B 0%,#1677FF 100%)',
    },
    style: {
      lineWidth: 3,
      lineDash: [3, 3],
    },
    labels: item.tooltip
      ? [
          {
            text: 'tooltip',
            fill: '#000000',
            fillOpacity: 1,
            fontSize: 22,
            fontWeight: 500,
            lineHeight: 30,
            textAlign: 'center',
            background: true,
            backgroundFill: '#ffffff',
            backgroundRadius: 24,
            backgroundOpacity: 1,
            backgroundPadding: [10, 16],
            backgroundRadius: 10,
            backgroundShadowColor: 'rgba(42,102,187,0.17)',
            backgroundShadowBlur: 22,
            transform: [{ type: 'exceedAdjust', bounds: 'main', offsetX: 25 }], // Boundary configured as main area, with horizontal offset of 25
          },
        ]
      : [],
  };
});

chart.options({
  width: 654,
  height: 310,
  type: 'view',
  margin: 20,
  marginLeft: 10,
  insetLeft: 24,
  insetRight: 24,
  insetBottom: 24,
  animate: false,
  axis: {
    x: {
      title: '',
      size: 16,
      line: true,
      lineLineWidth: 1.5,
      lineStroke: '#DEE3EB',
      tick: false,
      labelFontSize: 22,
      labelFill: '#545C67',
      labelFontWeight: 500,
      labelDy: 8,
      labelFormatter: (str) => {
        if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
          const [year, month, day] = str.split('-');
          return `${+month}/${+day}`;
        }
        return str;
      },
      tickFilter: (d, index) => {
        if (data[index]?.showLabel) {
          return true;
        }
        return false;
      },
    },
    y: {
      title: '',
      tick: false,
      line: true,
      lineStroke: '#DEE3EB',
      lineLineWidth: 1.5,
      labelDx: -8,
      labelFontSize: 22,
      labelFill: '#545C67',
      labelFontWeight: 500,
      grid: false,
    },
  },
  scale: {
    y: {
      type: 'linear',
      tickCount: 5,
      domain: [600, 860],
      nice: true,
    },
  },
  children: [
    {
      type: 'area',
      data: data,
      encode: {
        x: 'date',
        y: 'price',
        shape: 'smooth',
      },
      style: {
        fill: `linear-gradient(-90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 50%,rgba(105, 168, 255, 0.61) 100%)`,
      },
    },
    {
      type: 'line',
      data: data,
      encode: {
        x: 'date',
        y: 'price',
        shape: 'smooth',
      },
      style: {
        stroke:
          'linear-gradient(0deg, #91BDFF 0%, #1777FF 24.148%, #1777FF 75.172%,#1677FF32 100%)',
        lineWidth: 6,
      },
    },
    ...result,
  ],
});

chart.render();
```

### position

#### In Cartesian Coordinate System

Supports 9 positions: `top`, `left`, `right`, `bottom`, `top-left`, `top-right`, `bottom-left`, `bottom-right`, `inside`.

```js | ob { inject: true }
const { Chart, ChartEvent } = G2;
const chart = new Chart({
  container: 'container',
});
const container = chart.getContainer();

chart.options({
  height: 300,
  type: 'cell',
  data: [
    { x: 'x-a', y: 'y-a', data: 1 },
    { x: 'x-a', y: 'y-b', data: 3 },
    { x: 'x-a', y: 'y-c', data: 2 },
    { x: 'x-b', y: 'y-a', data: 8 },
    { x: 'x-b', y: 'y-b', data: 5 },
    { x: 'x-b', y: 'y-c', data: 6 },
    { x: 'x-c', y: 'y-a', data: 7 },
    { x: 'x-c', y: 'y-b', data: 4 },
    { x: 'x-c', y: 'y-c', data: 9 },
  ],
  legend: false,
  axis: false,
  encode: {
    x: 'x', // Encode x axis
    y: 'y', // Encode y axis
    color: 'data', // Use data field from data
  },
  labels: [
    {
      text: 'data',
      style: { fontSize: 16, stroke: '#fff', lineWidth: 2 },
    },
  ],
  style: {
    inset: 5,
    lineWidth: 10,
  },
});

// Insert Encode-Color selector
const selectorContainer = document.createElement('div');
selectorContainer.textContent = 'position: ';
const selector = document.createElement('select');
selector.innerHTML = [
  'top',
  'left',
  'right',
  'bottom',
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
  'inside',
].reduce((v, position) => {
  return `${v}<option value="${position}" ${
    position === 'top' ? 'selected' : ''
  }>${position}</option>`;
}, '');

selector.onchange = (e) => {
  chart.options({
    labels: [
      {
        text: 'data',
        position: e.target.value,
        style: { fontSize: 16, stroke: '#fff', lineWidth: 2 },
      },
    ],
  });
  chart.render(); // Re-render chart
};
selectorContainer.appendChild(selector);
container.insertBefore(selectorContainer, container.childNodes[0]);

chart.render();
```

#### In Non-Cartesian Coordinate Systems

Supports `outside`, `inside` two types. See [Pie Chart/Donut Chart](/en/examples/general/pie/#donut-base).

| position   | Usage                                                                 | Before Usage                                                                                                        | After Usage                                                                                                 |
| ---------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `spider`   | Adjusts labels to align along coordinate axis edges, for polar coordinate system | ![without-spider](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*zadTTJI2nOEAAAAAAAAAAAAADmJ7AQ/original)   | ![spider](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*gC20SLxWVicAAAAAAAAAAAAADmJ7AQ/original)   |
| `surround` | Adjusts labels to surround coordinate system in a circle, for rose charts in polar coordinate system | ![without-surround](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Cx8zT7vT5bUAAAAAAAAAAAAADmJ7AQ/original) | ![surround](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*lRJqTLldgRYAAAAAAAAAAAAADmJ7AQ/original) |

Additionally, provides special `area` for area charts, see [Area Chart Special Labels](/en/examples/general/area/#label). For radial type charts, adds `spider` and `surround` types.

| position | Usage                                                                           | Before Usage                                                                                                 | After Usage                                                                                         |
| -------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| `area`   | Displays area chart labels in the center of area regions with certain rotation | <img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Gs-7SIFA2YIAAAAAAAAAAAAAemJ7AQ/original' /> | ![area](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ZIamS4KwErEAAAAAAAAAAAAADmJ7AQ/original) |

### style

`style` label style configuration, internally processed, can configure styles directly in configuration options. For specific style configuration, see [Text Style Configuration](#text-style-configuration), [connector line styles](#connector), [background styles](#background).

```js
({
  labels: [
    {
      style: {
        fontSize: 20,
        fontWeight: 600,
        lineHeight: 30,
        textAlign: 'center',
        connectorStroke: '#000',
        connectorLineWidth: 2,
        backgroundFill: '#f5f5f5',
        backgroundRadius: 4,
      },
    },
  ],
});
```

### Text Style Configuration

Label **text style** configuration, inherits from `G` engine's `Text`, all styles are applicable.

| Property      | Description                                                                                                                                                           | Type                                                | Default   | Required |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | --------- | -------- |
| fontSize      | Label text size                                                                                                                                                       | _number_ \| _Function<number>_                      | -         |          |
| fontFamily    | Label text font family                                                                                                                                                | _string_ \| _Function<string>_                      | -         |          |
| fontWeight    | Label text weight                                                                                                                                                     | _number_ \| _Function<number>_                      | -         |          |
| lineHeight    | Label text line height                                                                                                                                                | _number_ \| _Function<number>_                      | -         |          |
| textAlign     | Sets horizontal alignment of label text content, supported properties: `center` \| `end` \| `left` \| `right` \| `start`, default is `start`                       | _string_ \| _Function<string>_                      | `start`   |          |
| textBaseline  | Sets vertical baseline when drawing label text, supported properties: `top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging`. Default is `bottom`               | _string_ \| _Function<string>_                      | `bottom`  |          |
| fill          | Label text fill color                                                                                                                                                 | _string_ \| _Function<string>_                      | -         |          |
| fillOpacity   | Label text fill opacity                                                                                                                                               | _number_ \| _Function<number>_                      | -         |          |
| stroke        | Label text stroke                                                                                                                                                     | _string_ \| _Function<string>_                      | -         |          |
| strokeOpacity | Label text stroke opacity                                                                                                                                             | _number_ \| _Function<number>_                      | -         |          |
| lineWidth     | Label text stroke width                                                                                                                                               | _number_ \| _Function<number>_                      | -         |          |
| lineDash      | Label text stroke dash configuration, first value is dash segment length, second value is gap distance. Setting lineDash to [0, 0] results in no stroke.          | _\[number,number\]_ \| _Function<[number, number]>_ | -         |          |
| opacity       | Label text overall opacity                                                                                                                                            | _number_ \| _Function<number>_                      | -         |          |
| shadowColor   | Label text shadow color                                                                                                                                               | _string_ \| _Function<string>_                      | -         |          |
| shadowBlur    | Label text shadow Gaussian blur coefficient                                                                                                                           | _number_ \| _Function<number>_                      | -         |          |
| shadowOffsetX | Label text shadow horizontal offset                                                                                                                                   | _number_ \| _Function<number>_                      | -         |          |
| shadowOffsetY | Label text shadow vertical offset                                                                                                                                     | _number_ \| _Function<number>_                      | -         |          |
| cursor        | Mouse cursor style. Same as CSS cursor style, default 'default'.                                                                                                     | _string_ \| _Function<string>_                      | `default` |          |
| dx            | Label text horizontal offset                                                                                                                                          | _number_ \| _Function<number>_                      | 0         |          |
| dy            | Label text vertical offset                                                                                                                                            | _number_ \| _Function<number>_                      | 0         |          |

```js
({
  labels: [
    {
      fill: '#000',
      fontSize: 20,
      lineHeight: 30,
      fontWeight: 600,
      textAlign: 'center',
      textBaseline: 'middle',
      fontFamily: 'sans-serif',
      opacity: 0.9,
      cursor: 'pointer',
      lineDash: [3, 4],
      lineWidth: 2,
      stroke: '#fff',
      strokeOpacity: 0.4,
      shadowOffsetX: 10,
      shadowOffsetY: 10,
      shadowColor: '#000',
      shadowBlur: 2,
    },
  ],
});
```

### connector

Label **connector line style** configuration, format: `connector${style}`, e.g.: `connectorStroke` represents connector line color. Requires position `spider`, `surround` to have connector elements.

| Parameter              | Description                                                                                                                                                    | Type                | Default   | Required |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | --------- | -------- |
| connectorStroke        | Connector line color                                                                                                                                           | _string_            | -         |          |
| connectorStrokeOpacity | Connector line opacity                                                                                                                                         | _number_            | -         |          |
| connectorLineWidth     | Connector line stroke width                                                                                                                                    | _number_            | -         |          |
| connectorLineDash      | Connector line dash configuration, first value is dash segment length, second value is gap distance. Setting lineDash to [0,0] results in no stroke.        | _\[number,number\]_ | -         |          |
| connectorOpacity       | Connector line overall opacity                                                                                                                                 | _number_            | -         |          |
| connectorShadowColor   | Connector line shadow color                                                                                                                                    | _string_            | -         |          |
| connectorShadowBlur    | Connector line shadow Gaussian blur coefficient                                                                                                                | _number_            | -         |          |
| connectorShadowOffsetX | Connector line shadow horizontal offset                                                                                                                        | _number_            | -         |          |
| connectorShadowOffsetY | Connector line shadow vertical offset                                                                                                                          | _number_            | -         |          |
| connectorCursor        | Mouse cursor style. Same as CSS cursor style                                                                                                                   | _string_            | `default` |          |
| connectorDistance      | Distance between connector line and text                                                                                                                       | _number_            | -         |          |

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  width: 500,
  height: 400,
  data: [
    { id: 'c', value: 526 },
    { id: 'sass', value: 220 },
    { id: 'php', value: 325 },
    { id: 'elixir', value: 561 },
  ],
  encode: { y: 'value', color: 'id' },
  transform: [{ type: 'stackY' }],
  coordinate: { type: 'theta', innerRadius: 0.25, outerRadius: 0.8 },
  legend: false,
  labels: [
    {
      text: 'id',
      position: 'spider',
      fontWeight: 'bold',
      fontSize: 14,
      textBaseline: 'bottom',
      textAlign: (d) => (['c', 'sass'].includes(d.id) ? 'end' : 'start'),
      connectorDistance: 5, // Distance between text and connector line
      connectorStroke: '#0649f2',
      connectorLineWidth: 1,
      connectorLineDash: [3, 4],
      connectorOpacity: 0.8,
    },
  ],
});

chart.render();
```

### background

Label **text background box style** configuration, format: `background${style}`, e.g.: `backgroundFill` represents background box fill color.

| Parameter               | Description                                                                                                                                                     | Type                | Default   | Required |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | --------- | -------- |
| backgroundFill          | Background box fill color                                                                                                                                       | _string_            | -         |          |
| backgroundFillOpacity   | Background box fill opacity                                                                                                                                     | _number_            | -         |          |
| backgroundStroke        | Background box stroke                                                                                                                                           | _string_            | -         |          |
| backgroundStrokeOpacity | Background box stroke opacity                                                                                                                                   | _number_            | -         |          |
| backgroundLineWidth     | Background box stroke width                                                                                                                                     | _number_            | -         |          |
| backgroundLineDash      | Background box stroke dash configuration, first value is dash segment length, second value is gap distance. Setting lineDash to [0,0] results in no stroke.  | _\[number,number\]_ | -         |          |
| backgroundOpacity       | Background box overall opacity                                                                                                                                  | _number_            | -         |          |
| backgroundShadowColor   | Background box shadow color                                                                                                                                     | _string_            | -         |          |
| backgroundShadowBlur    | Background box shadow Gaussian blur coefficient                                                                                                                 | _number_            | -         |          |
| backgroundShadowOffsetX | Background box shadow horizontal offset                                                                                                                         | _number_            | -         |          |
| backgroundShadowOffsetY | Background box shadow vertical offset                                                                                                                           | _number_            | -         |          |
| backgroundCursor        | Mouse cursor style. Same as CSS cursor style                                                                                                                   | _string_            | `default` |          |
| backgroundRadius        | Background box border radius                                                                                                                                     | _number_            | -         |          |
| backgroundPadding       | Background box padding                                                                                                                                          | _number[]_          | -         |          |

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  width: 500,
  height: 400,
  data: [
    { id: 'c', value: 526 },
    { id: 'sass', value: 220 },
    { id: 'php', value: 325 },
    { id: 'elixir', value: 561 },
  ],
  encode: { y: 'value', color: 'id' },
  transform: [{ type: 'stackY' }],
  coordinate: { type: 'theta', innerRadius: 0.25, outerRadius: 0.8 },
  legend: false,
  labels: [
    {
      text: 'value',
      fill: '#0700fa', // Text style
      background: true, // Background display
      backgroundFill: '#fff',
      backgroundRadius: 4,
      backgroundPadding: [10, 10, 10, 10],
      backgroundOpacity: 0.4,
      backgroundStroke: '#000',
      backgroundLineDash: [3, 4],
      backgroundLineWidth: 1,
    },
  ],
});

chart.render();
```
