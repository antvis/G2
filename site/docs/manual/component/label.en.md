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
| overflowHide    | Hides labels when they don't fit on the graphic                                                                  |
| overlapHide     | Hides overlapping labels, by default keeps the first one and hides subsequent ones                               |
| exceedAdjust    | Automatically detects and corrects label overflow, moving labels in reverse direction when they exceed view area |

Different transformation types target different label issues. Understanding the differences between each `transform` label transformation is essential.

#### overlapDodgeY

Targets chaotic situations caused by crowded overlapping labels, adjusting overlapping labels in the y direction.

##### Problem Case

```js | ob {  pin: false, inject true }
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

##### Configure `overlapDodgeY` Label Transformation

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

| Property      | Description                                                               | Type     | Default Value | Required |
| ------------- | ------------------------------------------------------------------------- | -------- | ------------- | -------- |
| maxIterations | Maximum iterations for position adjustment                                | _number_ | `10`          |          |
| padding       | Expected spacing between labels after adjustment                          | _number_ | `1`           |          |
| maxError      | Maximum error, the difference between actual and expected spacing padding | _number_ | `0.1`         |          |

#### contrastReverse

`contrastReverse` selects an optimal contrast color from a specified palette when label color has low [color contrast](https://webaim.org/resources/contrastchecker/) on the graphic background. Targets issues where graphic colors and `label` colors are similar making them hard to see, commonly occurring in multi-colored bar charts (mark interval) where colors vary and manual `label` color changes are difficult.

##### Problem Case

When some graphic colors are close to label colors, visibility issues occur.

```js | ob {  pin: false, inject true }
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

##### Configure `contrastReverse` Label Transformation

Optimizes unclear `label` colors.

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

| Property  | Description                                                                                                         | Type   | Default Value      | Required |
| --------- | ------------------------------------------------------------------------------------------------------------------- | ------ | ------------------ | -------- |
| threshold | Color contrast threshold between label and background graphic, colors are recommended only when exceeding threshold | `Type` | `4.5`              |          |
| palette   | Alternative color palette in contrast enhancement algorithm                                                         | `Type` | `['#000', '#fff']` |          |

#### overflowHide

`overflowHide` hides labels when they don't fit on the graphic. The difference from `overlapDodgeY`:

- `overlapDodgeY` targets between `label` and `label`, handling multiple `label` overlaps causing blur.
- `overflowHide` targets between `label` and `mark` graphics, handling multiple small graphics causing blur.

##### Problem Case

When a chart consists of many small graphics, if each small graphic maps to a `label`, overlapping and unclear charts occur. Examples include sunburst charts, treemap charts, etc.

<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*PTxzSqaZKtwAAAAAAAAAAAAAemJ7AQ/original' width='50%' />
<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*LeNnSZqTtlYAAAAAAAAAAAAAemJ7AQ/original' width='50%' />

##### Configure `overflowHide` Label Transformation

Hides `label` that exceeds corresponding graphics. Note: Some special charts have built-in `label` configuration and can be configured at the view level.

Try this:

<Playground path="style/general/sunburst/demo/sunburst-label.ts" rid="sunburst-label"></playground>

#### overlapHide

`overlapHide` hides overlapping labels, by default keeping the first one and hiding subsequent ones. The difference from `overlapDodgeY` is that `overlapHide` hides rather than moves.

##### Problem Case

When some graphic colors are close to label colors, visibility issues occur.

```js | ob {  pin: false, inject true }
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

##### Configure `overlapHide` Label Transformation

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

`exceedAdjust` automatically detects and corrects label overflow, moving labels in the reverse direction when they exceed the view area.

##### Problem Case

`label` will exceed the chart, and the exceeding part will be cut off.

```js | ob {  pin: false, inject true }
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

##### Configure `exceedAdjust` Label Transformation

Optimizes direction for `label` that exceeds the view.

```js | ob { inject: true }
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
  labels: [{ text: 'price', transform: [{ type: 'exceedAdjust' }] }],
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

Supports 2 types: `outside`, `inside`. See [Pie/Donut Charts](/en/examples/general/pie/#donut-base).

| position   | Purpose                                                                                                      | Before Use                                                                                                          | After Use                                                                                                   |
| ---------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `spider`   | Adjusts labels to align along coordinate axis edges, suitable for polar coordinate systems                   | ![without-spider](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*zadTTJI2nOEAAAAAAAAAAAAADmJ7AQ/original)   | ![spider](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*gC20SLxWVicAAAAAAAAAAAAADmJ7AQ/original)   |
| `surround` | Adjusts labels to surround coordinate system in circle, suitable for rose charts in polar coordinate systems | ![without-surround](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Cx8zT7vT5bUAAAAAAAAAAAAADmJ7AQ/original) | ![surround](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*lRJqTLldgRYAAAAAAAAAAAAADmJ7AQ/original) |

Additionally, a special `area` is provided for area charts, see [Special Area Chart Labels](/en/examples/general/area/#label). For radial type charts, `spider` and `surround` types are added.

| position | Purpose                                                                               | Before Use                                                                                                   | After Use                                                                                               |
| -------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| `area`   | Displays area chart labels in the center of area regions with certain rotation angles | <img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Gs-7SIFA2YIAAAAAAAAAAAAAemJ7AQ/original' /> | ![area](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ZIamS4KwErEAAAAAAAAAAAAADmJ7AQ/original) |

### style

`style` label style configuration. Internal processing is done, so styles can be configured directly in configuration options. For specific style configurations, refer to [Text Style Configuration](#text-style-configuration), [Connector Line Style](#connector), [Background Style](#background).

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

Label **text style** configuration, inherited from G engine's `Text`, all its styles are universal.

| Property      | Description                                                                                                                            | Type                                                | Default Value | Required |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ------------- | -------- |
| fontSize      | Label text font size                                                                                                                   | _number_ \| _Function<number>_                      | -             |          |
| fontFamily    | Label text font family                                                                                                                 | _string_ \| _Function<string>_                      | -             |          |
| fontWeight    | Label text font weight                                                                                                                 | _number_ \| _Function<number>_                      | -             |          |
| lineHeight    | Label text line height                                                                                                                 | _number_ \| _Function<number>_                      | -             |          |
| textAlign     | Label text horizontal alignment, supports: `center` \| `end` \| `left` \| `right` \| `start`, default is `start`                       | _string_ \| _Function<string>_                      | `start`       |          |
| textBaseline  | Label text vertical baseline, supports: `top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging`, default is `bottom`                | _string_ \| _Function<string>_                      | `bottom`      |          |
| fill          | Label text fill color                                                                                                                  | _string_ \| _Function<string>_                      | -             |          |
| fillOpacity   | Label text fill opacity                                                                                                                | _number_ \| _Function<number>_                      | -             |          |
| stroke        | Label text stroke                                                                                                                      | _string_ \| _Function<string>_                      | -             |          |
| strokeOpacity | Label text stroke opacity                                                                                                              | _number_ \| _Function<number>_                      | -             |          |
| lineWidth     | Label text stroke width                                                                                                                | _number_ \| _Function<number>_                      | -             |          |
| lineDash      | Label text stroke dash configuration, first value is segment length, second is gap distance. Setting lineDash to [0, 0] removes stroke | _\[number,number\]_ \| _Function<[number, number]>_ | -             |          |
| opacity       | Label text overall opacity                                                                                                             | _number_ \| _Function<number>_                      | -             |          |
| shadowColor   | Label text shadow color                                                                                                                | _string_ \| _Function<string>_                      | -             |          |
| shadowBlur    | Label text shadow blur coefficient                                                                                                     | _number_ \| _Function<number>_                      | -             |          |
| shadowOffsetX | Label text shadow horizontal offset                                                                                                    | _number_ \| _Function<number>_                      | -             |          |
| shadowOffsetY | Label text shadow vertical offset                                                                                                      | _number_ \| _Function<number>_                      | -             |          |
| cursor        | Mouse cursor style. Same as CSS cursor style, default 'default'                                                                        | _string_ \| _Function<string>_                      | `default`     |          |
| dx            | Label text horizontal offset                                                                                                           | _number_ \| _Function<number>_                      | 0             |          |
| dy            | Label text vertical offset                                                                                                             | _number_ \| _Function<number>_                      | 0             |          |

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

Label **connector line style** configuration, format: `connector${style}`, e.g., `connectorStroke` represents connector line color. Requires position `spider`, `surround` to have connector elements.

| Parameter              | Description                                                                                                                        | Type                | Default Value | Required |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ------------- | -------- |
| connectorStroke        | Connector line color                                                                                                               | _string_            | -             |          |
| connectorStrokeOpacity | Connector line opacity                                                                                                             | _number_            | -             |          |
| connectorLineWidth     | Connector line stroke width                                                                                                        | _number_            | -             |          |
| connectorLineDash      | Connector line dash configuration, first value is segment length, second is gap distance. Setting lineDash to [0,0] removes stroke | _\[number,number\]_ | -             |          |
| connectorOpacity       | Connector line overall opacity                                                                                                     | _number_            | -             |          |
| connectorShadowColor   | Connector line shadow color                                                                                                        | _string_            | -             |          |
| connectorShadowBlur    | Connector line shadow blur coefficient                                                                                             | _number_            | -             |          |
| connectorShadowOffsetX | Connector line shadow horizontal offset                                                                                            | _number_            | -             |          |
| connectorShadowOffsetY | Connector line shadow vertical offset                                                                                              | _number_            | -             |          |
| connectorCursor        | Mouse cursor style. Same as CSS cursor style                                                                                       | _string_            | `default`     |          |
| connectorDistance      | Distance between connector line and text                                                                                           | _number_            | -             |          |

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

Label **text background box style** configuration, format: `background${style}`, e.g., `backgroundFill` represents background box fill color.

| Parameter               | Description                                                                                                                               | Type                | Default Value | Required |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ------------- | -------- |
| backgroundFill          | Background box fill color                                                                                                                 | _string_            | -             |          |
| backgroundFillOpacity   | Background box fill opacity                                                                                                               | _number_            | -             |          |
| backgroundStroke        | Background box stroke                                                                                                                     | _string_            | -             |          |
| backgroundStrokeOpacity | Background box stroke opacity                                                                                                             | _number_            | -             |          |
| backgroundLineWidth     | Background box stroke width                                                                                                               | _number_            | -             |          |
| backgroundLineDash      | Background box stroke dash configuration, first value is segment length, second is gap distance. Setting lineDash to [0,0] removes stroke | _\[number,number\]_ | -             |          |
| backgroundOpacity       | Background box overall opacity                                                                                                            | _number_            | -             |          |
| backgroundShadowColor   | Background box shadow color                                                                                                               | _string_            | -             |          |
| backgroundShadowBlur    | Background box shadow blur coefficient                                                                                                    | _number_            | -             |          |
| backgroundShadowOffsetX | Background box shadow horizontal offset                                                                                                   | _number_            | -             |          |
| backgroundShadowOffsetY | Background box shadow vertical offset                                                                                                     | _number_            | -             |          |
| backgroundCursor        | Mouse cursor style. Same as CSS cursor style                                                                                              | _string_            | `default`     |          |
| backgroundRadius        | Background box border radius                                                                                                              | _number_            | -             |          |
| backgroundPadding       | Background box inner padding                                                                                                              | _number[]_          | -             |          |

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
