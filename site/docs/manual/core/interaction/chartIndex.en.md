---
title: chartIndex
order: 9
---

## Overview

`chartIndex` is an interactive component used to view the relative trends of line charts compared to a specific time point.

<img alt="example" src="https://gw.alipayobjects.com/zos/raptor/1669041887727/chart-index.gif" width="640">

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  paddingLeft: 50,
});

chart.options({
  type: 'line',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/indices.json',
  },
  encode: {
    x: (d) => new Date(d.Date),
    y: 'Close',
    color: 'Symbol',
    key: 'Symbol',
    title: (d) => d.Date.toLocaleString(),
  },
  axis: {
    y: {
      title: '↑ Change in price (%)',
      labelAutoRotate: false,
    },
  },
  scale: {
    y: {
      type: 'log',
    },
  },
  label: {
    text: 'Symbol',
    selector: 'last',
    style: {
      fontSize: 10,
    },
  },
  interaction: {
    chartIndex: {
      ruleStroke: '#aaa',
      labelDx: 5,
      labelTextAlign: 'center',
      labelStroke: '#fff',
      labelLineWidth: 5,
      labelFormatter: (d) => `${d.toLocaleDateString()}`,
    },
  },
});

chart.render();
```

## Usage

`chartIndex` is configured through [configuration options](#configuration-options):

```js
({
  type: 'line',
  interaction: {
    chartIndex: {},
  },
});
```

## Configuration Level

Interaction can be configured at the Mark level:

```ts
({
  type: 'line',
  interaction: { chartIndex: {} },
});
```

It can also be configured at the View level. Interactions declared on the view will be passed to marks declared in `children`. If the mark has declared the corresponding interaction, they will be merged; otherwise, it won't be affected.

```ts
({
  type: 'view',
  children: [
    {
      type: 'line',
      interaction: { chartIndex: {} },
    },
  ],
});
```

## Configuration Options

| Property           | Description                                                                                                                  | Type                                                       | Default | Required |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ------- | -------- |
| ruleStroke         | Color of the indicator line                                                                                                  | string                                                     | `black` |          |
| ruleLineWidth      | Width of the indicator line                                                                                                  | number                                                     | `1`     |          |
| ruleLineDash       | Dash configuration. First value is dash length, second is gap length. Setting ruleLineDash to [0,0] means no stroke.         | `[number,number]`                                          |         |          |
| ruleStrokeOpacity  | Opacity of the indicator line                                                                                                | number                                                     |         |          |
| ruleOpacity        | Overall opacity                                                                                                              | number                                                     |         |          |
| ruleShadowColor    | Indicator line shadow color                                                                                                  | string                                                     |         |          |
| ruleShadowBlur     | Indicator line Gaussian blur coefficient                                                                                     | number                                                     |         |          |
| ruleShadowOffsetX  | Horizontal distance of shadow from indicator line                                                                            | number                                                     |         |          |
| ruleShadowOffsetY  | Vertical distance of shadow from indicator line                                                                              | number                                                     |         |          |
| labelFontSize      | Text size                                                                                                                    | number                                                     |         |          |
| labelFontFamily    | Text font                                                                                                                    | string                                                     |         |          |
| labelFontWeight    | Font weight                                                                                                                  | number                                                     |         |          |
| labelLineHeight    | Text line height                                                                                                             | number                                                     |         |          |
| labelTextAlign     | Set the current alignment of text content                                                                                    | `center` \| `end` \| `left` \| `right` \| `start`          |         |          |
| labelTextBaseline  | Set the current text baseline used when drawing text                                                                         | `top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging` |         |          |
| labelFill          | Text fill color                                                                                                              | string                                                     |         |          |
| labelFillOpacity   | Text fill opacity                                                                                                            | number                                                     |         |          |
| labelStroke        | Text stroke                                                                                                                  | string                                                     |         |          |
| labelLineWidth     | Text stroke width                                                                                                            | number                                                     |         |          |
| labelLineDash      | Stroke dash configuration. First value is dash length, second is gap length. Setting labelLineDash to [0,0] means no stroke. | `[number,number]`                                          |         |          |
| labelStrokeOpacity | Stroke opacity                                                                                                               | number                                                     |         |          |
| labelOpacity       | Text overall opacity                                                                                                         | number                                                     |         |          |
| labelShadowColor   | Text shadow color                                                                                                            | string                                                     |         |          |
| labelShadowBlur    | Text shadow Gaussian blur coefficient                                                                                        | number                                                     |         |          |
| labelShadowOffsetX | Set horizontal distance of shadow from text                                                                                  | number                                                     |         |          |
| labelShadowOffsetY | Set vertical distance of shadow from text                                                                                    | number                                                     |         |          |
| labelDx            | Text offset in x direction                                                                                                   | number                                                     |         |          |
| labelDy            | Text offset in y direction                                                                                                   | number                                                     |         |          |
| labelFormatter     | Format date                                                                                                                  | `FormatterFunction`                                        |         |          |

## Examples

### Indicator Line and Text

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'line',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/indices.json',
  },
  encode: {
    x: (d) => new Date(d.Date),
    y: 'Close',
    color: 'Symbol',
    key: 'Symbol',
    title: (d) => d.Date.toLocaleString(),
  },
  axis: {
    y: {
      title: '↑ Change in price (%)',
      labelAutoRotate: false,
    },
  },
  scale: {
    y: {
      type: 'log',
    },
  },
  label: {
    text: 'Symbol',
    selector: 'last',
    style: {
      fontSize: 10,
    },
  },
  interaction: {
    tooltip: {
      crosshairs: false, // Disable auxiliary lines
    },
    chartIndex: {
      ruleStroke: 'pink',
      ruleLineWidth: 8,
      ruleLineDash: [4, 8],
      ruleShadowColor: 'green',
      ruleShadowBlur: 5,
      ruleShadowOffsetX: 5,
      ruleShadowOffsetY: 5,
      ruleOpacity: 0.9,
      labelDy: 30,
      labelFontSize: 20,
      labelTextAlign: 'center',
      labelFill: 'red',
      labelStroke: 'yellow',
      labelLineWidth: 2,
      labelFormatter: (d) => `${d.toLocaleDateString()}`,
    },
  },
});

chart.render();
```
