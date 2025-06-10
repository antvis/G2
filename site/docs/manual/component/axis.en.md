---
title: Axis
order: 7.1
---

## Overview

In G2, the **Axis** component serves as the "ruler" of charts, establishing the mapping relationship between data and visual positions. Through scales, labels, grid lines, and other elements, it helps users intuitively understand data distribution and proportions. It enables you to quickly comprehend the position and numerical values in graphics.

Simply put, axes help us correlate data numbers with positions on the chart, making charts easier to understand.

> For example: In a bar chart, the horizontal axis usually represents time, and the vertical axis represents sales. This way, you can see at a glance that "sales were 2 million in March and rose to 3 million in April."

![Axis Usage Diagram](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*gv2RSJ6zZykAAAAAAAAAAAAAemJ7AQ/original)

### Components

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*vMugQZrzeeYAAAAAAAAAAAAAemJ7AQ/original" width="1000px" />

### Usage

Through the overview content above, I believe you now have a clear understanding of axes. So how exactly do you use them? Next, I'll guide you step by step on how to configure axes.

Configuring axes is like building with blocks - just remember a simple core principle: "Use the axis property, configure by direction, change what needs to be changed where it needs to be changed."

**Step 1: Enable Axes (enabled by default)**

G2 automatically generates axes based on your data types. No configuration is needed to see basic axes.

![Enable Axes (enabled by default)](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*gv2RSJ6zZykAAAAAAAAAAAAAemJ7AQ/original)

```ts
chart.options({
  type: 'interval',
  width: 500,
  height: 300,
  data: [
    { id: 1, month: 'March', sales: 200 },
    { id: 3, month: 'April', sales: 300 },
    { id: 4, month: 'May', sales: 400 },
    { id: 5, month: 'June', sales: 500 },
    { id: 6, month: 'July', sales: 600 },
    { id: 7, month: 'August', sales: 700 },
  ],
  encode: { x: 'month', y: 'sales', color: 'month' },
  // No axis configuration needed for automatic axis generation
  // axis: {},
});
```

**Step 2: Configure by Direction**

> Configure x (horizontal direction) axis

```ts
chart.options({
  type: 'interval',
  width: 500,
  height: 300,
  data: [
    { id: 1, month: 'March', sales: 200 },
    { id: 3, month: 'April', sales: 300 },
    { id: 4, month: 'May', sales: 400 },
    { id: 5, month: 'June', sales: 500 },
    { id: 6, month: 'July', sales: 600 },
    { id: 7, month: 'August', sales: 700 },
  ],
  encode: { x: 'month', y: 'sales', color: 'month' },
  // Configure axis
  axis: {
    // Configure horizontal axis properties
    x: {
      // Configuration parameters and examples can be found below...
    },
  },
});
```

> Configure y (vertical direction) axis

```ts
chart.options({
  type: 'interval',
  width: 500,
  height: 300,
  data: [
    { id: 1, month: 'March', sales: 200 },
    { id: 3, month: 'April', sales: 300 },
    { id: 4, month: 'May', sales: 400 },
    { id: 5, month: 'June', sales: 500 },
    { id: 6, month: 'July', sales: 600 },
    { id: 7, month: 'August', sales: 700 },
  ],
  encode: { x: 'month', y: 'sales', color: 'month' },
  // Configure axis
  axis: {
    // Configure vertical axis properties
    y: {
      // Configuration parameters and examples can be found below...
    },
  },
});
```

### Configuration Levels

Axes can be configured at the Mark level. In G2, each mark has its own axis. If the marks correspond to synchronized scales, the axes will be merged.

```ts
({
  type: 'interval',
  axis: {
    x: { labelFormatter: '%0' },
    y: { tickCount: 5 },
  },
});
```

Axes can also be configured at the View level. Axes have inheritance properties. Axes declared on views will be passed to marks declared in `children`. If the mark has a corresponding channel axis, they merge; otherwise, it has no effect.

```ts
({
  type: 'view',
  axis: {
    x: { labelFormatter: '%0' },
    y: { tickCount: 5 },
  },
});
```

### Hide Axes

Hide axes for each channel:

![Axis hiding demonstration](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Z2JsTKPQxUMAAAAAAAAAAAAAemJ7AQ/original)

> Hide x axis:

```ts
({
  type: 'interval',
  axis: { x: false }, // Hide x horizontal axis
});
```

> Hide y axis:

```ts
({
  type: 'interval',
  axis: { y: false }, // Hide y vertical axis
});
```

> Hide multiple axes

```ts
({
  type: 'interval',
  axis: false,
});
```

## Configuration Options

Each axis consists of title, line, tick, label, and grid.

| Property | Description                     | Type                                               | Default Value                | Required |
| -------- | ------------------------------- | -------------------------------------------------- | ---------------------------- | -------- |
| title    | Set axis title text and style   | [title](#title)                                    | -                            |          |
| line     | Set axis line display and style | [line](#line)                                      | -                            |          |
| tick     | Set axis tick display and style | [tick](#tick)                                      | -                            |          |
| label    | Set axis label display and style| [label](#label)                                    | -                            |          |
| grid     | Set axis grid display and style | [grid](#grid)                                      | -                            |          |
| animate  | Set axis animation effects      | `boolean` &#124; [animate](#animate)               | -                            |
| position | Set axis position               | `left` &#124; `right` &#124; `top` &#124; `bottom` | `x: bottom` &#124; `y: left` |          |

:::warning{title=Note}
Title, line, tick, label, and grid configurations are at the same level, not configured as objects, but through prefix + property approach.
:::

For example, to configure label rotation, it's not configured under a label object, but through the following approach:

```js
({
  axis: {
    x: {
      title: 'X Axis Title',
      labelFontSize: 12,
      labelFormatter: (d) => `2025-${d}`,
      transform: [
        // Rotation
        {
          type: 'rotate',
          optionalAngles: [0, 45, 90], // Try rotating 0°, 45°, 90°
          recoverWhenFailed: true, // Recover to default angle if rotation fails
        },
      ],
    },
  },
});
```

### title

| Property           | Description                                                    | Type                                                                                                               | Default Value | Required |
| ------------------ | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------- | -------- |
| title              | Turn off title or set title content                           | `false`&#124;`string` &#124; `number` &#124; [DisplayObject](https://g.antv.antgroup.com/api/basic/display-object) | -             |          |
| titleSpacing       | Distance from title to axis                                    | `number` &#124; `(datum, index, data) => number`                                                                   | 10            |          |
| titlePosition      | Title position relative to axis, supports abbreviation        | `'top'`&#124;`'bottom'`&#124;`'left'`&#124;`'right'`                                                               | `'lb'`        |          |
| titleFontSize      | Title font size                                                | `number` &#124; `(datum, index, data) => number`                                                                   | -             |          |
| titleFontWeight    | Title font weight                                              | `string` &#124; `(datum, index, data) => string`                                                                   | -             |          |
| titleFontFamily    | Title font family                                              | `number` &#124; `(datum, index, data) => number`                                                                   | -             |          |
| titleStroke        | Title font color                                               | `string` &#124; `(datum, index, data) => string`                                                                   | -             |          |
| titleStrokeOpacity | Title opacity                                                  | `number` &#124; `(datum, index, data) => number`                                                                   | -             |          |
| titleTextBaseline  | Title vertical baseline                                        | `string` &#124; `(datum, index, data) => string`                                                                   | `middle`      |          |
| titleFillOpacity   | Title fill opacity                                             | `number` &#124; `(datum, index, data) => number`                                                                   | 1             |          |
| titleStroke        | Title stroke color                                             | `string` &#124; `(datum, index, data) => string`                                                                   | `transparent` |          |
| titleStrokeOpacity | Title stroke opacity                                           | `number` &#124; `(datum, index, data) => number`                                                                   | 1             |          |
| titleLineHeight    | Title line height                                              | `number` &#124; `(datum, index, data) => number`                                                                   | 1             |          |
| titleLineWidth     | Title stroke width                                             | `number` &#124; `(datum, index, data) => number`                                                                   | 0             |          |
| titleLineDash      | Title dash style                                               | `number[]` &#124; `(datum, index, data) => number[]`                                                               | []            |          |
| titleOpacity       | Title overall opacity                                          | `number` &#124; `(datum, index, data) => number`                                                                   | 1             |          |
| titleShadowColor   | Title shadow color                                             | `string` &#124; `(datum, index, data) => string`                                                                   | `transparent` |          |
| titleShadowBlur    | Title shadow blur                                              | `number` &#124; `(datum, index, data) => number`                                                                   | 0             |          |
| titleShadowOffsetX | Title shadow X offset                                          | `number` &#124; `(datum, index, data) => number`                                                                   | 0             |          |
| titleShadowOffsetY | Title shadow Y offset                                          | `number` &#124; `(datum, index, data) => number`                                                                   | 0             |          |
| titleCursor        | Title cursor style                                             | `string` &#124; `(datum, index, data) => string`                                                                   | `default`     |          |

> Configuration approach

```ts
({
  // Configure axis
  axis: {
    // Configure y axis
    y: {
      // Axis title configuration
      title: 'Frequency', // Set y-axis title
      titleSpacing: 30, // Set spacing between y-axis title and axis line
      titleFill: 'steelblue', // Set y-axis title color
    },
    // Configure x axis
    x: {
      // Axis title configuration
      title: 'Letter', // Set x-axis title
    },
  },
});
```

### line

| Property          | Description                                                                                    | Type                                                                  | Default Value | Required |
| ----------------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------- | -------- |
| line              | Whether to show axis line                                                                      | `boolean`                                                             | false         |          |
| arrow             | Whether to show arrow                                                                          | `boolean`                                                             | true          |          |
| lineExtension     | Extension lines on both sides of axis                                                         | `[number, number]`                                                    | -             |          |
| lineArrow         | Define axis line arrow shape, defaults to arrow shape                                         | [DisplayObject](https://g.antv.antgroup.com/api/basic/display-object) | -             |          |
| lineArrowOffset   | Arrow offset length                                                                            | `number`                                                              | 15            |          |
| lineArrowSize     | Arrow size                                                                                     | `number`                                                              | -             |          |
| lineLineWidth     | Axis line width                                                                                | `number` &#124; `(datum, index, data) => number`                      | -             |          |
| lineLineDash      | Axis line dash configuration, first value is segment length, second is gap distance          | `[number,number]`                                                     | -             |          |
| lineOpacity       | Axis line overall opacity                                                                      | `number`                                                              | 1             |          |
| lineStroke        | Axis line stroke color                                                                         | `string`                                                              | -             |          |
| lineStrokeOpacity | Axis line stroke opacity                                                                       | `number`                                                              | -             |          |

> Configuration approach

```ts
({
  axis: {
    x: {
      line: true, // Whether to show axis line
      arrow: true, // Whether to show arrow
      lineArrowOffset: 10, // Arrow offset length
      lineArrowSize: 30, // Arrow size
      lineLineWidth: 10, // Axis line width
    },
    y: {
      line: true, // Whether to show axis line
      arrow: true, // Whether to show arrow
      lineArrowOffset: 10, // Arrow offset length
      lineArrowSize: 30, // Arrow size
      lineLineWidth: 10, // Axis line width
    },
  },
});
```

### tick

| Property          | Description                                                                                    | Type                                                                                                                        | Default Value | Required |
| ----------------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------- | -------- |
| tick              | Whether to show ticks                                                                          | `boolean`                                                                                                                   | true          |          |
| tickFilter        | Tick filtering                                                                                 | `(datum, index, data)=>boolean`                                                                                             | -             |          |
| tickFormatter     | Tick formatting, for custom tick styles, callback returns tick direction                      | [DisplayObject](https://g.antv.antgroup.com/api/basic/display-object) &#124; `(datum, index, data, Vector)=> DisplayObject` | -             |          |
| tickDirection     | Tick direction, `positive` for side axis direction, `negative` for negative side axis         | `'positive'` &#124; `'negative'`                                                                                            | `positive`    |          |
| tickLength        | Tick length                                                                                    | `number`&#124;`(datum, index, data)=>number`                                                                                | 15            |          |
| tickLineWidth     | Tick line width                                                                                | `number` &#124; `(datum, index, data, Vector)=>number`                                                                      | -             |          |
| tickLineDash      | Tick line dash configuration, first value is segment length, second is gap distance          | `[number,number]` &#124; `(datum, index, data, Vector)=>[number,number]`                                                    | -             |          |
| tickStroke        | Tick line color                                                                                | `string` &#124; `(datum, index, data, Vector)=>string`                                                                      | -             |          |
| tickStrokeOpacity | Tick line opacity                                                                              | `number` &#124; `(datum, index, data, Vector)=>number`                                                                      | -             |          |

```ts
({
  // Configure axis
  axis: {
    y: {
      tickLength: 20, // Set y-axis tick length
      tickFilter: (_, i) => i % 3 !== 0, // Filter y-axis ticks, show every 3rd tick
    },
  },
});
```

### label

| Property           | Description                                                                                    | Type                                                              | Default Value | Required |
| ------------------ | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------- | -------- |
| label              | Whether to show tick labels                                                                    | `boolean`                                                         | -             |          |
| labelFontSize      | Label font size                                                                                | `number` &#124; `(datum, index, data)=>number`                    | -             |          |
| labelOpacity       | Label opacity                                                                                  | `number` &#124; `(datum, index, data)=>number`                    | -             |          |
| labelFontWeight    | Label font weight                                                                              | `number` &#124;`(datum, index, data)=>number`                     | -             |          |
| labelFontFamily    | Label font family                                                                              | `string` &#124; `(datum, index, data)=>string`                    | -             |          |
| labelAlign         | Label alignment<br/>- 'horizontal' always horizontal<br/> - 'parallel' parallel to axis<br/> - 'perpendicular' perpendicular to axis | `'horizontal'` &#124; `'parallel'` &#124; `'perpendicular'`       | `parallel`    |          |
| labelFilter        | Label filtering                                                                                | `(datum, index, data)=> boolean`                                  | -             |          |
| labelFormatter     | Label formatting, accepts function or [d3-format](https://d3js.org/d3-format) supported string | `string` \| `(datum, index, array) => string`                     | -             |          |
| transform          | Label transform to avoid text overlap. Supports text ellipsis, overlap hiding, auto rotation | `Transform[]`                                                     | -             |          |
| labelTransform     | Label transform shortcuts for local coordinate system transforms including scale, translate, rotate, skew, matrix | `string`                                                          | -             |          |
| labelAutoHide      | Auto hide overlapping labels, effective when size is set                                      | `boolean` &#124; `HideOverlapCfg`                                 | -             |          |
| labelAutoRotate    | Auto rotate labels, effective when size is set                                                | `boolean` &#124; `RotateOverlapCfg`                               | -             |          |
| labelAutoEllipsis  | Auto ellipsis labels, effective when size is set                                              | `boolean` &#124; `EllipsisOverlapCfg`                             | -             |          |
| labelAutoWrap      | Auto wrap labels, effective when size is set                                                  | `boolean` &#124; `WrapOverlapCfg`                                 | -             |          |
| labelDirection     | Label position relative to axis line, refer to `tickDirection`                                | `'positive'` &#124; `'negative'`                                  | `positive`    |          |
| labelSpacing       | Spacing between label and its corresponding tick                                               | `number`                                                          | 0             |          |
| labelLineWidth     | Label width                                                                                    | `number` &#124;`(datum, index, data)=>number`                     | -             |          |
| labelLineDash      | Label stroke dash configuration, first value is segment length, second is gap distance       | `[number,number]` &#124; `(datum, index, data)=>[number, number]` | -             |          |
| labelFill          | Label font color                                                                               | `string` &#124; `(datum, index, data)=>string`                    | -             |          |
| labelFillOpacity   | Label text opacity                                                                             | `number` &#124; `(datum, index, data)=>number`                    | -             |          |
| labelStroke        | Label text stroke color                                                                        | `string` &#124; `(datum, index, data)=>string`                    | -             |          |
| labelStrokeOpacity | Label text stroke opacity                                                                      | `number` &#124; `(datum, index, data)=>number`                    | -             |          |

#### labelFormatter

The `labelFormatter` visual channel is used to adjust label formatting.

```js | ob {  pin: false , autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  width: 500,
  height: 300,
  data: [
    { id: 1, month: '03', sales: 200 },
    { id: 3, month: '04', sales: 300 },
    { id: 4, month: '05', sales: 400 },
    { id: 5, month: '06', sales: 500 },
    { id: 6, month: '07', sales: 600 },
    { id: 7, month: '08', sales: 700 },
  ],
  encode: { x: 'month', y: 'sales', color: 'month' },
  axis: {
    y: {
      title: 'Sales',
    },
    x: {
      title: 'Month',
      labelFontSize: 12,
      labelFormatter: (d) => `2025-${d}`, // Label formatting
    },
  },
});
chart.render();
```

#### labelTransform

`labelTransform` is a shortcut provided by G for local coordinate system transforms, consistent with [CSS Transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform).

The following example shows how to configure `labelTransform` to rotate x-axis labels by 90 degrees.

```js
({
  axis: {
    x: {
      title: 'X Axis Title',
      labelFontSize: 12,
      labelFormatter: (d) => `2025-${d}`,
      labelTransform: 'rotate(90)',
    },
  },
});
```

#### transform

To avoid label overlap or exceeding display range, the system provides multiple optimization methods including ellipsis, rotation, hiding, and wrapping.
These features can be configured in two ways:

1. `transform` array (multi-strategy combination)
2. `labelAutoXXX` series properties (single strategy shortcuts) `Recommended`

Both approaches have identical core functionality, differing only in use cases and configuration methods.

> 1. `transform` array (multi-strategy combination)

```js | ob {  pin: false , autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  width: 500,
  height: 500,
  data: [
    { id: 1, label: 'X Axis Label 1', value: 200 },
    { id: 3, label: 'X Axis Label 2', value: 300 },
    { id: 4, label: 'X Axis Label 3', value: 400 },
    { id: 5, label: 'X Axis Label 4', value: 500 },
    { id: 6, label: 'X Axis Label 5', value: 600 },
    { id: 7, label: 'X Axis Label 6', value: 700 },
    { id: 8, label: 'X Axis Label 999', value: 800 },
  ],
  encode: { x: 'label', y: 'value' },
  axis: {
    y: {
      title: 'Y Axis Title',
    },
    x: {
      title: 'X Axis Title',
      labelFontSize: 12,
      labelFormatter: (d) => `2025-${d}`,
      transform: [
        // Ellipsis
        {
          type: 'ellipsis',
          suffix: '..', // Ellipsis suffix (default ...)
          minLength: 8, // No ellipsis if less than 8 characters
          maxLength: 12, // Force ellipsis if more than 12 characters
        },
        // Wrap
        {
          type: 'wrap',
          wordWrapWidth: 80, // Maximum line width 80px
          maxLines: 2, // Maximum 2 lines
          recoverWhenFailed: true, // Recover to default if wrapping fails
        },
        // Rotate
        {
          type: 'rotate',
          optionalAngles: [0, 45, 90], // Try rotating 0°, 45°, 90°
          recoverWhenFailed: true, // Recover to default angle if rotation fails
        },
        // Hide
        {
          type: 'hide',
          keepHeader: true, // Keep first label
          keepTail: true, // Keep last label
        },
      ],
    },
  },
});
chart.render();
```

> 2. Using `labelAutoHide`, `labelAutoRotate`, `labelAutoEllipsis`, `labelAutoWrap` properties (requires `size` setting)

```js | ob {  pin: false , autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  width: 500,
  height: 500,
  data: [
    { id: 1, label: 'X Axis Label 1', value: 200 },
    { id: 3, label: 'X Axis Label 2', value: 300 },
    { id: 4, label: 'X Axis Label 3', value: 400 },
    { id: 5, label: 'X Axis Label 4', value: 500 },
    { id: 6, label: 'X Axis Label 5', value: 600 },
    { id: 7, label: 'X Axis Label 6', value: 700 },
    { id: 8, label: 'X Axis Label 999', value: 800 },
  ],
  encode: { x: 'label', y: 'value' },
  axis: {
    y: {
      title: 'Y Axis Title',
    },
    x: {
      title: 'X Axis Title',
      labelFontSize: 12,
      labelFormatter: (d) => `2025-${d}`,

      size: 100, // Must set size
      labelAutoEllipsis: {
        suffix: '..',
        minLength: 8,
        maxLength: 12,
      },
      labelAutoWrap: {
        wordWrapWidth: 80,
        maxLines: 2,
        recoverWhenFailed: true,
      },
      labelAutoRotate: {
        optionalAngles: [0, 45, 90], // Try rotating 0°, 45°, 90°
        recoverWhenFailed: true, // Recover to default angle if rotation fails
      },
      labelAutoHide: {
        keepHeader: true, // Keep first label
        keepTail: true, // Keep last label
      },
    },
  },
});
chart.render();
```

```ts
export interface Transform {
  /** Extra margin when avoiding label overlap */
  margin?: number[];
}

export interface EllipsisOverlapCfg extends Transform {
  type: 'ellipsis';
  /** Ellipsis replacement character, default is ... */
  suffix?: string;
  /** No ellipsis if text is shorter than this length */
  minLength: string | number;
  /** Always ellipsis if text is shorter than this length */
  maxLength?: string | number;
  /** Step size for each ellipsis operation */
  step?: string | number;
}

export interface RotateOverlapCfg extends Transform {
  type: 'rotate';
  /** Optional rotation angle values */
  optionalAngles: number[];
  /** Whether to recover to default rotation angle when rotation cannot avoid overlap */
  recoverWhenFailed?: boolean;
}

export interface HideOverlapCfg extends Transform {
  type: 'hide';
  /** Ensure first label is not hidden */
  keepHeader?: boolean;
  /** Ensure last label is not hidden */
  keepTail?: boolean;
}

export interface WrapOverlapCfg extends Transform {
  type: 'wrap';
  /** Maximum width per line */
  wordWrapWidth?: number;
  /** Maximum number of lines */
  maxLines?: number;
  recoverWhenFailed?: boolean;
}
```

### grid

Grid lines have different styles in different coordinate systems

| Scenario           | Style                                                                                                                                        |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cartesian`        | <img alt="linear-grid" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*i-2xTLMLU3EAAAAAAAAAAAAADmJ7AQ/original" width="200" />  |
| `Polar`            | <img alt="circle-grid" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*gkAKQ4XTErQAAAAAAAAAAAAADmJ7AQ/original" width="100" />  |
| `Polar`            | <img alt="polar-grid" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*4Tv3RIrDWvgAAAAAAAAAAAAADmJ7AQ/original" width="100" />   |
| `Polar` `Radar`    | <img alt="polygon-grid" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*gZLeRpTXiRAAAAAAAAAAAAAADmJ7AQ/original" width="100" /> |

| Property          | Description                                                                                    | Type                                                             | Default Value | Required |
| ----------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------------- | -------- |
| grid              | Whether to show grid lines                                                                     | `boolean`                                                        | false         |          |
| gridFilter        | Grid line filtering                                                                            | `(datum, index, data)=> boolean`                                 | -             |          |
| gridLength        | Grid line length. Generally, user configuration is not needed.                                | `number` &#124; `(datum, index, data)=> number`                  | 0             |          |
| gridAreaFill      | Grid area color                                                                                | `string` &#124; `string[]`&#124; `(datum, index, data)=> string` | -             |          |
| gridLineWidth     | Grid line width                                                                                | `number`                                                         | -             |          |
| gridLineDash      | Grid line dash configuration, first value is segment length, second is gap distance          | `[number,number]`                                                | -             |          |
| gridStroke        | Grid line color                                                                                | `string`                                                         | -             |          |
| gridStrokeOpacity | Grid line opacity                                                                              | `number`                                                         | -             |          |

### animate

Supports setting animation effects for updates

| Property | Description        | Type                            | Default Value | Required |
| -------- | ------------------ | ------------------------------- | ------------- | -------- |
| animate  | Whether to enable animation | `boolean` &#124; `EffectTiming` | -             |          |

EffectTiming supports the following configurable properties:

| Property | Description                                    | Type     | Default Value | Required |
| -------- | ---------------------------------------------- | -------- | ------------- | -------- |
| delay    | Delay execution time (ms)                      | `number` | -             |          |
| duration | Animation duration (ms)                        | `number` | -             |          |
| easing   | Animation easing function                      | `Easing` | -             |          |
| endDelay | End delay execution time (ms)                  | `number` | -             |          |
| fill     | Animation display effect when not running      | `Fill`   | -             |          |

## Events

The axis component itself has no specific event types.

## Examples

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval', // Set chart type to bar chart
  marginTop: 40, // Set chart top margin in pixels
  data: [
    { id: 1, label: 'X Axis Label 1', value: 200 },
    { id: 3, label: 'X Axis Label 2', value: 300 },
    { id: 4, label: 'X Axis Label 3', value: 400 },
    { id: 5, label: 'X Axis Label 4', value: 500 },
    { id: 6, label: 'X Axis Label 5', value: 600 },
    { id: 7, label: 'X Axis Label 6', value: 700 },
  ],
  // Set data encoding
  encode: { x: 'label', y: 'value' },
  axis: {
    // Configure x axis
    x: {
      position: 'bottom', // Set axis position

      // Axis title configuration
      title: 'X Axis Title', // Axis title content
      titleFontWeight: 500, // Axis title font weight

      // Grid line configuration
      grid: true, // Whether to show grid lines
      gridLineWidth: 2, // Grid line width

      // Axis line configuration
      line: true, // Whether to show axis line
      lineLineWidth: 5, // Axis line width
      lineStroke: '#f50', // Axis line stroke color

      // Axis tick configuration
      tick: true, // Whether to show ticks
      tickLineWidth: 5, // Tick line width
      tickLength: 10, // Tick line length
      tickStroke: '#3366ff', // Tick line color

      // Axis label configuration
      label: true, // Whether to show tick labels
      labelFontSize: 12, // Label font size
      labelFill: '#009900', // Label font color
      labelFontWeight: 500, // Label font weight
    },
    // Configure y axis
    y: {
      position: 'left', // Set axis position

      // Axis title configuration
      title: 'Y Axis Title', // Axis title content
      titleFontWeight: 500, // Axis title font weight

      // Grid line configuration
      grid: true, // Whether to show grid lines
      gridLineWidth: 2, // Grid line width

      // Axis line configuration
      line: true, // Whether to show axis line
      lineLineWidth: 5, // Axis line width
      lineStroke: '#f50', // Axis line stroke color

      // Axis tick configuration
      tick: true, // Whether to show ticks
      tickLineWidth: 5, // Tick line width
      tickLength: 10, // Tick line length
      tickStroke: '#3366ff', // Tick line color

      // Axis label configuration
      label: true, // Whether to show tick labels
      labelFontSize: 12, // Label font size
      labelFill: '#009900', // Label font color
      labelFontWeight: 500, // Label font weight
    },
  },
});

chart.render();
```

For more examples, please visit the [Chart Examples - Axis](/en/examples/component/axis/#axis-x) page.
