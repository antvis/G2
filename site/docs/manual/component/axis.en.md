---
title: Axis
order: 7.1
---

## Overview

In G2, the **Axis** component serves as the "ruler" of charts, establishing the mapping relationship between data and visual positions. Through scales, labels, grid lines, and other elements, it helps users intuitively understand data distribution and proportions. It enables you to quickly comprehend the position and numerical values in graphics.

Simply put, axis help us correlate data numbers with positions on the chart, making charts easier to understand.

> For example: In a bar chart, the horizontal axis usually represents time, and the vertical axis represents sales. This way, you can see at a glance that "sales were 2 million in March and rose to 3 million in April."

![Axis Usage Diagram](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*gv2RSJ6zZykAAAAAAAAAAAAAemJ7AQ/original)

### Components

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*vMugQZrzeeYAAAAAAAAAAAAAemJ7AQ/original" width="1000px" />

### Usage

Through the overview content above, I believe you now have a clear understanding of axis. So how exactly do you use them? Next, I'll guide you step by step on how to configure axis.

Configuring axis is like building with blocks - just remember a simple core principle: "Use the axis property, configure by direction, change what needs to be changed where it needs to be changed."

**Step 1: Enable Axis (enabled by default)**

G2 automatically generates axis based on your data types. No configuration is needed to see basic axis.

![Enable Axis (enabled by default)](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*gv2RSJ6zZykAAAAAAAAAAAAAemJ7AQ/original)

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

Axis can be configured at the Mark level. In G2, each mark has its own axis. If the marks correspond to synchronized scales, the axis will be merged.

```ts
({
  type: 'interval',
  axis: {
    x: { labelFormatter: '%0' },
    y: { tickCount: 5 },
  },
});
```

Axis can also be configured at the View level. Axis have inheritance properties. Axis declared on views will be passed to marks declared in `children`. If the mark has a corresponding channel axis, they merge; otherwise, it has no effect.

```ts
({
  type: 'view',
  axis: {
    x: { labelFormatter: '%0' },
    y: { tickCount: 5 },
  },
});
```

### Hide Axis

Hide axis for each channel:

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

> Hide multiple axis

```ts
({
  type: 'interval',
  axis: false,
});
```

## Configuration Options

Each axis consists of title, line, tick, label, and grid.

| Property | Description                      | Type                                               | Default Value                | Required |
| -------- | -------------------------------- | -------------------------------------------------- | ---------------------------- | -------- |
| title    | Set axis title text and style    | [title](#title)                                    | -                            |          |
| line     | Set axis line display and style  | [line](#line)                                      | -                            |          |
| tick     | Set axis tick display and style  | [tick](#tick)                                      | -                            |          |
| label    | Set axis label display and style | [label](#label)                                    | -                            |          |
| grid     | Set axis grid display and style  | [grid](#grid)                                      | -                            |          |
| animate  | Set axis animation effects       | `boolean` &#124; [animate](#animate)               | -                            |
| position | Set axis position                | `left` &#124; `right` &#124; `top` &#124; `bottom` | `x: bottom` &#124; `y: left` |          |

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
      size: 100,
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

| Property           | Description                                                              | Type                                                                                                                         | Default Value | Required |
| ------------------ | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ------------- | -------- |
| title              | Turn off title or set title content                                      | `false`&#124;`string` &#124; `number` &#124; [DisplayObject](https://g.antv.antgroup.com/api/basic/display-object)           | -             |          |
| titleSpacing       | Distance from title to axis                                              | `number` &#124; `(datum, index, data) => number`                                                                             | 10            |          |
| titlePosition      | Title position relative to axis, supports abbreviation like 'top' as 't' | `'top'`&#124;`'bottom'`&#124;`'left'`&#124;`'right'`                                                                         | `'lb'`        |          |
| titleFontSize      | Title font size                                                          | `number` &#124; `(datum, index, data) => number`                                                                             | -             |          |
| titleFontWeight    | Title font weight                                                        | `number` &#124; `(datum, index, data) => number`                                                                             | -             |          |
| titleFontFamily    | Title font family                                                        | `string` &#124; `(datum, index, data) => string`                                                                             | -             |          |
| titleLineHeight    | Title line height                                                        | `number` &#124; `(datum, index, data) => number`                                                                             | 1             |          |
| titleTextAlign     | Title text horizontal alignment                                          | `'center'` &#124; `'end'` &#124; `'left'` &#124; `'right'` &#124; `'start'` &#124; `(datum, index, data) => string`          | `'start'`     |          |
| titleTextBaseline  | Title text vertical baseline                                             | `'top'` &#124; `'middle'` &#124; `'bottom'` &#124; `'alphabetic'` &#124; `'hanging'` &#124; `(datum, index, data) => string` | `'middle'`    |          |
| titleFill          | Title text fill color                                                    | `string` &#124; `(datum, index, data) => string`                                                                             | -             |          |
| titleFillOpacity   | Title text fill opacity                                                  | `number` &#124; `(datum, index, data) => number`                                                                             | 1             |          |
| titleStroke        | Title text stroke color                                                  | `string` &#124; `(datum, index, data) => string`                                                                             | `transparent` |          |
| titleStrokeOpacity | Title text stroke opacity                                                | `number` &#124; `(datum, index, data) => number`                                                                             | 1             |          |
| titleLineWidth     | Title text stroke width                                                  | `number` &#124; `(datum, index, data) => number`                                                                             | 0             |          |
| titleLineDash      | Title text stroke dash configuration                                     | `number[]` &#124; `(datum, index, data) => number[]`                                                                         | []            |          |
| titleOpacity       | Title text overall opacity                                               | `number` &#124; `(datum, index, data) => number`                                                                             | 1             |          |
| titleShadowColor   | Title text shadow color                                                  | `string` &#124; `(datum, index, data) => string`                                                                             | `transparent` |          |
| titleShadowBlur    | Title text shadow Gaussian blur coefficient                              | `number` &#124; `(datum, index, data) => number`                                                                             | 0             |          |
| titleShadowOffsetX | Title text shadow horizontal offset                                      | `number` &#124; `(datum, index, data) => number`                                                                             | 0             |          |
| titleShadowOffsetY | Title text shadow vertical offset                                        | `number` &#124; `(datum, index, data) => number`                                                                             | 0             |          |
| titleCursor        | Title text cursor style                                                  | `string` &#124; `(datum, index, data) => string`                                                                             | `default`     |          |
| titleDx            | Title text horizontal offset                                             | `number` &#124; `(datum, index, data) => number`                                                                             | 0             |          |
| titleDy            | Title text vertical offset                                               | `number` &#124; `(datum, index, data) => number`                                                                             | 0             |          |

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
      titlePosition: 'left', // Set y-axis title position
      titleFill: 'steelblue', // Set y-axis title color
      titleFontSize: 16, // Set y-axis title font size
      titleFontWeight: 'bold', // Set y-axis title font weight
      titleFontFamily: 'Arial', // Set y-axis title font family
      titleTextAlign: 'center', // Set y-axis title horizontal alignment
      titleTextBaseline: 'middle', // Set y-axis title vertical baseline
      titleOpacity: 0.9, // Set y-axis title overall opacity
      titleStroke: '#333', // Set y-axis title stroke color
      titleLineWidth: 1, // Set y-axis title stroke width
      titleShadowColor: 'rgba(0,0,0,0.3)', // Set y-axis title shadow color
      titleShadowBlur: 3, // Set y-axis title shadow blur
      titleShadowOffsetX: 2, // Set y-axis title shadow horizontal offset
      titleShadowOffsetY: 2, // Set y-axis title shadow vertical offset
      titleDx: 5, // Set y-axis title horizontal offset
      titleDy: 0, // Set y-axis title vertical offset
      titleCursor: 'pointer', // Set y-axis title cursor style
    },
    // Configure x axis
    x: {
      // Axis title configuration
      title: 'Letter', // Set x-axis title
      titleSpacing: 20, // Set spacing between x-axis title and axis line
      titlePosition: 'bottom', // Set x-axis title position
      titleFontSize: 14, // Set x-axis title font size
      titleFontWeight: 'normal', // Set x-axis title font weight
      titleFill: '#666', // Set x-axis title color
      titleTextAlign: 'center', // Set x-axis title horizontal alignment
      titleOpacity: 1, // Set x-axis title opacity
      titleLineHeight: 1.2, // Set x-axis title line height
      titleFillOpacity: 0.8, // Set x-axis title fill opacity
    },
  },
});
```

### line

| Property          | Description                                                                                                                 | Type                                                                  | Default Value | Required |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------- | -------- |
| line              | Whether to show axis line                                                                                                   | `boolean`                                                             | false         |          |
| arrow             | Whether to show arrow                                                                                                       | `boolean`                                                             | true          |          |
| lineExtension     | Extension lines on both sides of axis                                                                                       | `[number, number]`                                                    | -             |          |
| lineArrow         | Define axis line arrow shape, defaults to arrow shape                                                                       | [DisplayObject](https://g.antv.antgroup.com/api/basic/display-object) | -             |          |
| lineArrowOffset   | Arrow offset length                                                                                                         | `number`                                                              | 15            |          |
| lineArrowSize     | Arrow size                                                                                                                  | `number`                                                              | -             |          |
| lineStroke        | Axis line stroke color                                                                                                      | `string` &#124; `(datum, index, data) => string`                      | -             |          |
| lineStrokeOpacity | Axis line stroke opacity                                                                                                    | `number` &#124; `(datum, index, data) => number`                      | -             |          |
| lineLineWidth     | Axis line stroke width                                                                                                      | `number` &#124; `(datum, index, data) => number`                      | -             |          |
| lineLineDash      | Axis line stroke dash configuration, first value is segment length, second is gap distance. Setting [0, 0] means no stroke. | `[number,number]` &#124; `(datum, index, data) => [number,number]`    | -             |          |
| lineOpacity       | Axis line overall opacity                                                                                                   | `number` &#124; `(datum, index, data) => number`                      | 1             |          |
| lineShadowColor   | Axis line shadow color                                                                                                      | `string` &#124; `(datum, index, data) => string`                      | -             |          |
| lineShadowBlur    | Axis line shadow Gaussian blur coefficient                                                                                  | `number` &#124; `(datum, index, data) => number`                      | -             |          |
| lineShadowOffsetX | Axis line shadow horizontal offset                                                                                          | `number` &#124; `(datum, index, data) => number`                      | -             |          |
| lineShadowOffsetY | Axis line shadow vertical offset                                                                                            | `number` &#124; `(datum, index, data) => number`                      | -             |          |
| lineCursor        | Axis line cursor style                                                                                                      | `string` &#124; `(datum, index, data) => string`                      | `default`     |          |

> Configuration approach

```ts
({
  axis: {
    x: {
      line: true, // Whether to show axis line
      arrow: true, // Whether to show arrow
      lineArrowOffset: 10, // Arrow offset length
      lineArrowSize: 30, // Arrow size
      lineLineWidth: 10, // Axis line stroke width
      lineExtension: [5, 5], // Extension lines on both sides of axis
      lineStroke: '#333', // Axis line stroke color
      lineStrokeOpacity: 0.8, // Axis line stroke opacity
      lineLineDash: [5, 5], // Axis line stroke dash configuration
      lineOpacity: 1, // Axis line overall opacity
      lineShadowColor: 'rgba(0,0,0,0.3)', // Axis line shadow color
      lineShadowBlur: 3, // Axis line shadow Gaussian blur coefficient
      lineShadowOffsetX: 2, // Axis line shadow horizontal offset
      lineShadowOffsetY: 2, // Axis line shadow vertical offset
      lineCursor: 'pointer', // Axis line cursor style
    },
    y: {
      line: true, // Whether to show axis line
      arrow: true, // Whether to show arrow
      lineArrowOffset: 10, // Arrow offset length
      lineArrowSize: 30, // Arrow size
      lineLineWidth: 10, // Axis line stroke width
      lineStroke: '#666', // Axis line stroke color
      lineOpacity: 0.9, // Axis line overall opacity
    },
  },
});
```

### tick

| Property          | Description                                                                                                            | Type                                                                                                                        | Default Value | Required |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------- | -------- |
| tick              | Whether to show ticks                                                                                                  | `boolean`                                                                                                                   | true          |          |
| tickCount         | Set recommended number of ticks to generate; tickCount is only a suggestion                                           | `number`                                                                                                                    | -             |          |
| tickMethod        | Custom tick generation method                                                                                          | `(start: number \| Date, end: number \| Date, tickCount: number) => number[]`                                              | -             |          |
| tickFilter        | Tick filtering                                                                                                         | `(datum, index, data)=>boolean`                                                                                             | -             |          |
| tickFormatter     | Tick formatting, for custom tick styles, callback returns tick direction                                               | [DisplayObject](https://g.antv.antgroup.com/api/basic/display-object) &#124; `(datum, index, data, Vector)=> DisplayObject` | -             |          |
| tickDirection     | Tick direction, `positive` for side axis direction (main axis clockwise 90°), `negative` for negative side axis        | `'positive'` &#124; `'negative'`                                                                                            | `positive`    |          |
| tickLength        | Tick length                                                                                                            | `number`&#124;`(datum, index, data)=>number`                                                                                | 15            |          |
| tickStroke        | Tick stroke color                                                                                                      | `string` &#124; `(datum, index, data, Vector)=>string`                                                                      | -             |          |
| tickStrokeOpacity | Tick stroke opacity                                                                                                    | `number` &#124; `(datum, index, data, Vector)=>number`                                                                      | -             |          |
| tickLineWidth     | Tick stroke width                                                                                                      | `number` &#124; `(datum, index, data, Vector)=>number`                                                                      | -             |          |
| tickLineDash      | Tick stroke dash configuration, first value is segment length, second is gap distance. Setting [0, 0] means no stroke. | `[number,number]` &#124; `(datum, index, data, Vector)=>[number,number]`                                                    | -             |          |
| tickOpacity       | Tick overall opacity                                                                                                   | `number` &#124; `(datum, index, data, Vector)=>number`                                                                      | -             |          |
| tickShadowColor   | Tick shadow color                                                                                                      | `string` &#124; `(datum, index, data, Vector)=>string`                                                                      | -             |          |
| tickShadowBlur    | Tick shadow Gaussian blur coefficient                                                                                  | `number` &#124; `(datum, index, data, Vector)=>number`                                                                      | -             |          |
| tickShadowOffsetX | Tick shadow horizontal offset                                                                                          | `number` &#124; `(datum, index, data, Vector)=>number`                                                                      | -             |          |
| tickShadowOffsetY | Tick shadow vertical offset                                                                                            | `number` &#124; `(datum, index, data, Vector)=>number`                                                                      | -             |          |
| tickCursor        | Tick cursor style                                                                                                      | `string` &#124; `(datum, index, data, Vector)=>string`                                                                      | `default`     |          |

```ts
({
  // Configure axis
  axis: {
    y: {
      tickCount: 10, // Set recommended number of ticks to generate
      tickLength: 20, // Set y-axis tick length
      tickFilter: (_, i) => i % 3 !== 0, // Filter y-axis ticks, show every 3rd tick
      tick: true, // Whether to show ticks
      tickDirection: 'positive', // Tick direction
      tickStroke: '#333', // Tick stroke color
      tickStrokeOpacity: 0.8, // Tick stroke opacity
      tickLineWidth: 2, // Tick stroke width
      tickLineDash: [2, 2], // Tick stroke dash configuration
      tickOpacity: 1, // Tick overall opacity
      tickShadowColor: 'rgba(0,0,0,0.2)', // Tick shadow color
      tickShadowBlur: 2, // Tick shadow Gaussian blur coefficient
      tickShadowOffsetX: 1, // Tick shadow horizontal offset
      tickShadowOffsetY: 1, // Tick shadow vertical offset
      tickCursor: 'crosshair', // Tick cursor style
    },
    x: {
      tick: true, // Whether to show ticks
      tickCount: 8, // Set recommended number of ticks to generate
      tickMethod: (start, end, count) => {
        // Custom tick generation method
        const step = (end - start) / (count - 1);
        return Array.from({ length: count }, (_, i) => start + i * step);
      },
      tickLength: 10, // Tick length
      tickDirection: 'positive', // Tick direction
      tickStroke: '#3366ff', // Tick stroke color
      tickLineWidth: 5, // Tick stroke width
      tickOpacity: 0.9, // Tick overall opacity
      tickFilter: (_, i) => i % 2 === 0, // Filter ticks, show only even index ticks
    },
  },
});
```

### label

| Property           | Description                                                                                                                                                                                                   | Type                                                                                                                       | Default Value | Required |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------- | -------- |
| label              | Whether to show tick labels                                                                                                                                                                                   | `boolean`                                                                                                                  | -             |          |
| labelFontSize      | Label font size                                                                                                                                                                                               | `number` &#124; `(datum, index, data)=>number`                                                                             | -             |          |
| labelFontFamily    | Label font family                                                                                                                                                                                             | `string` &#124; `(datum, index, data)=>string`                                                                             | -             |          |
| labelFontWeight    | Label font weight                                                                                                                                                                                             | `number` &#124;`(datum, index, data)=>number`                                                                              | -             |          |
| labelLineHeight    | Label line height                                                                                                                                                                                             | `number` &#124; `(datum, index, data)=>number`                                                                             | -             |          |
| labelTextAlign     | Label text horizontal alignment                                                                                                                                                                               | `'center'` &#124; `'end'` &#124; `'left'` &#124; `'right'` &#124; `'start'` &#124; `(datum, index, data)=>string`          | `'start'`     |          |
| labelTextBaseline  | Label text vertical baseline                                                                                                                                                                                  | `'top'` &#124; `'middle'` &#124; `'bottom'` &#124; `'alphabetic'` &#124; `'hanging'` &#124; `(datum, index, data)=>string` | `'bottom'`    |          |
| labelAlign         | Label alignment<br/>- 'horizontal' always horizontal<br/> - 'parallel' parallel to axis<br/> - 'perpendicular' perpendicular to axis                                                                          | `'horizontal'` &#124; `'parallel'` &#124; `'perpendicular'`                                                                | `parallel`    |          |
| labelFilter        | Label filtering                                                                                                                                                                                               | `(datum, index, data)=> boolean`                                                                                           | -             |          |
| labelFormatter     | Label formatting, accepts function or [d3-format](https://d3js.org/d3-format) supported string                                                                                                                | `string` \| `(datum, index, array) => string`                                                                              | -             |          |
| transform          | Label transform to avoid text overlap. Supports text ellipsis, overlap hiding, auto rotation                                                                                                                  | `Transform[]`                                                                                                              | -             |          |
| labelTransform     | Label transform shortcuts for local coordinate system transforms including scale, translate, rotate, skew, matrix transforms, see [transform](https://g.antv.antgroup.com/api/basic/display-object#transform) | `string`                                                                                                                   | -             |          |
| labelAutoHide      | Auto hide overlapping labels, effective when size is set                                                                                                                                                      | `boolean` &#124; `HideOverlapCfg`                                                                                          | -             |          |
| labelAutoRotate    | Auto rotate labels, effective when size is set                                                                                                                                                                | `boolean` &#124; `RotateOverlapCfg`                                                                                        | -             |          |
| labelAutoEllipsis  | Auto ellipsis labels, effective when size is set                                                                                                                                                              | `boolean` &#124; `EllipsisOverlapCfg`                                                                                      | -             |          |
| labelAutoWrap      | Auto wrap labels, effective when size is set                                                                                                                                                                  | `boolean` &#124; `WrapOverlapCfg`                                                                                          | -             |          |
| labelDirection     | Label position relative to axis line, refer to `tickDirection`                                                                                                                                                | `'positive'` &#124; `'negative'`                                                                                           | `positive`    |          |
| labelSpacing       | Spacing between label and its corresponding tick                                                                                                                                                              | `number`                                                                                                                   | 0             |          |
| labelFill          | Label text fill color                                                                                                                                                                                         | `string` &#124; `(datum, index, data)=>string`                                                                             | -             |          |
| labelFillOpacity   | Label text fill opacity                                                                                                                                                                                       | `number` &#124; `(datum, index, data)=>number`                                                                             | -             |          |
| labelStroke        | Label text stroke color                                                                                                                                                                                       | `string` &#124; `(datum, index, data)=>string`                                                                             | -             |          |
| labelStrokeOpacity | Label text stroke opacity                                                                                                                                                                                     | `number` &#124; `(datum, index, data)=>number`                                                                             | -             |          |
| labelLineWidth     | Label text stroke width                                                                                                                                                                                       | `number` &#124;`(datum, index, data)=>number`                                                                              | -             |          |
| labelLineDash      | Label text stroke dash configuration, first value is segment length, second is gap distance. Setting [0, 0] means no stroke.                                                                                  | `[number,number]` &#124; `(datum, index, data)=>[number, number]`                                                          | -             |          |
| labelOpacity       | Label text overall opacity                                                                                                                                                                                    | `number` &#124; `(datum, index, data)=>number`                                                                             | -             |          |
| labelShadowColor   | Label text shadow color                                                                                                                                                                                       | `string` &#124; `(datum, index, data)=>string`                                                                             | -             |          |
| labelShadowBlur    | Label text shadow Gaussian blur coefficient                                                                                                                                                                   | `number` &#124; `(datum, index, data)=>number`                                                                             | -             |          |
| labelShadowOffsetX | Label text shadow horizontal offset                                                                                                                                                                           | `number` &#124; `(datum, index, data)=>number`                                                                             | -             |          |
| labelShadowOffsetY | Label text shadow vertical offset                                                                                                                                                                             | `number` &#124; `(datum, index, data)=>number`                                                                             | -             |          |
| labelCursor        | Label text cursor style                                                                                                                                                                                       | `string` &#124; `(datum, index, data)=>string`                                                                             | `default`     |          |
| labelDx            | Label text horizontal offset                                                                                                                                                                                  | `number` &#124; `(datum, index, data)=>number`                                                                             | 0             |          |
| labelDy            | Label text vertical offset                                                                                                                                                                                    | `number` &#124; `(datum, index, data)=>number`                                                                             | 0             |          |

#### labelFormatter

The `labelFormatter` visual channel is used to adjust label formatting.

##### Basic Usage

```js | ob {  pin: false , inject: true }
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

##### D3 Format Strings

G2 supports using [d3-format](https://d3js.org/d3-format) compatible format strings, which is a powerful and standardized numerical formatting specification.

##### Format Syntax

Basic syntax of D3 format: `[[fill]align][sign][symbol][0][width][,][.precision][~][type]`

- **fill**: Fill character, default is space
- **align**: Alignment (`<` left align, `^` center, `>` right align, `=` number right align)
- **sign**: Sign display (`+` always show sign, `-` only show negative sign, `(` negative numbers in parentheses)
- **symbol**: Prefix symbol (`#` base prefix, `$` currency symbol)
- **0**: Zero padding
- **width**: Minimum width
- **,**: Thousands separator
- **precision**: Precision
- **~**: Remove trailing zeros
- **type**: Format type

##### Common Format Types

| Type | Description      | Example       |
| ---- | ---------------- | ------------- |
| `d`  | Integer          | `42`          |
| `f`  | Fixed decimals   | `42.00`       |
| `e`  | Scientific       | `4.2e+1`      |
| `s`  | SI prefix        | `42k`, `1.5M` |
| `%`  | Percentage       | `42%`         |
| `$`  | Currency format  | `$42.00`      |
| `r`  | Significant digits | `42.0`        |
| `g`  | General format   | `42`          |

##### Complete D3-format Reference

```js
// Common numeric formats
'.2f'; // Fixed 2 decimals: 23.45
'.0f'; // Integer: 23
'.1%'; // Percentage: 23.4%
',.0f'; // Thousands separator: 1,234,567

// SI prefix format (recommended for large numbers)
's'; // SI prefix: 1.2M, 3.4k
'.1s'; // 1 decimal SI: 1.2M, 3.4k
'~s'; // Trim trailing zeros SI: 1.2M, 3k
'.0s'; // Integer SI: 1M, 3k

// Currency format
'$,.2f'; // USD: $1,234.56
'$.2s'; // USD SI: $1.23M

// Scientific notation
'.2e'; // Scientific: 1.23e+6
'.2g'; // General format: 1.2e+6 or 1234

// Base formats
'd'; // Decimal integer: 1234
'x'; // Hexadecimal: 4d2
'o'; // Octal: 2322
'b'; // Binary: 10011010010
```

##### Format Examples

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  width: 600,
  height: 400,
  data: [
    { type: 'Revenue', value: 1234567.89 },
    { type: 'Expense', value: -987654.32 },
    { type: 'Profit', value: 246913.57 },
    { type: 'Investment', value: 5000000 },
  ],
  encode: { x: 'type', y: 'value', color: 'type' },
  axis: {
    y: {
      title: 'Amount (USD)',
      // Using d3-format string
      labelFormatter: ',.2s', // Thousands separator + 2 significant digits + SI prefix
    },
    x: {
      title: 'Business Type',
    },
  },
});
chart.render();
```

##### Custom Formatting Functions

Besides using d3-format strings, you can also pass custom functions:

```js
axis: {
  y: {
    labelFormatter: (value, index, data) => {
      // Custom logic
      if (value >= 1000000) {
        return (value / 1000000).toFixed(1) + 'M';
      } else if (value >= 1000) {
        return (value / 1000).toFixed(1) + 'K';
      }
      return value.toString();
    },
  },
}
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

```js | ob {  pin: false , inject: true }
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

```js | ob {  pin: false , inject: true }
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

| Scenario        | Style                                                                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cartesian`     | <img alt="linear-grid" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*i-2xTLMLU3EAAAAAAAAAAAAADmJ7AQ/original" width="200" />  |
| `Polar`         | <img alt="circle-grid" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*gkAKQ4XTErQAAAAAAAAAAAAADmJ7AQ/original" width="100" />  |
| `Polar`         | <img alt="polar-grid" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*4Tv3RIrDWvgAAAAAAAAAAAAADmJ7AQ/original" width="100" />   |
| `Polar` `Radar` | <img alt="polygon-grid" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*gZLeRpTXiRAAAAAAAAAAAAAADmJ7AQ/original" width="100" /> |

| Property          | Description                                                                                                                 | Type                                                              | Default Value | Required |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------- | -------- |
| grid              | Whether to show grid lines                                                                                                  | `boolean`                                                         | false         |          |
| gridFilter        | Grid line filtering                                                                                                         | `(datum, index, data)=> boolean`                                  | -             |          |
| gridLength        | Grid line length. Generally, user configuration is not needed.                                                              | `number` &#124; `(datum, index, data)=> number`                   | 0             |          |
| gridAreaFill      | Grid area fill color                                                                                                        | `string` &#124; `string[]`&#124; `(datum, index, data)=> string`  | -             |          |
| gridStroke        | Grid line stroke color                                                                                                      | `string` &#124; `(datum, index, data)=> string`                   | -             |          |
| gridStrokeOpacity | Grid line stroke opacity                                                                                                    | `number` &#124; `(datum, index, data)=> number`                   | -             |          |
| gridLineWidth     | Grid line stroke width                                                                                                      | `number` &#124; `(datum, index, data)=> number`                   | -             |          |
| gridLineDash      | Grid line stroke dash configuration, first value is segment length, second is gap distance. Setting [0, 0] means no stroke. | `[number,number]` &#124; `(datum, index, data)=> [number,number]` | -             |          |
| gridOpacity       | Grid line overall opacity                                                                                                   | `number` &#124; `(datum, index, data)=> number`                   | -             |          |
| gridShadowColor   | Grid line shadow color                                                                                                      | `string` &#124; `(datum, index, data)=> string`                   | -             |          |
| gridShadowBlur    | Grid line shadow Gaussian blur coefficient                                                                                  | `number` &#124; `(datum, index, data)=> number`                   | -             |          |
| gridShadowOffsetX | Grid line shadow horizontal offset                                                                                          | `number` &#124; `(datum, index, data)=> number`                   | -             |          |
| gridShadowOffsetY | Grid line shadow vertical offset                                                                                            | `number` &#124; `(datum, index, data)=> number`                   | -             |          |
| gridCursor        | Grid line cursor style                                                                                                      | `string` &#124; `(datum, index, data)=> string`                   | `default`     |          |

#### Grid Configuration Examples

##### Basic Grid Lines

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  width: 600,
  height: 400,
  data: [
    { month: 'Jan', sales: 2000 },
    { month: 'Feb', sales: 1500 },
    { month: 'Mar', sales: 3000 },
    { month: 'Apr', sales: 2500 },
    { month: 'May', sales: 4000 },
    { month: 'Jun', sales: 3500 },
  ],
  encode: { x: 'month', y: 'sales', color: 'month' },
  axis: {
    y: {
      title: 'Sales (10k)',
      // Show basic grid lines
      grid: true,
      gridStroke: '#e6e6e6', // Grid line color
      gridLineWidth: 2, // Grid line width
      gridStrokeOpacity: 0.7, // Grid line opacity
      gridLineDash: [0, 0],
    },
    x: {
      title: 'Month',
      // X-axis usually doesn't need grid lines
      grid: false,
    },
  },
});
chart.render();
```

##### Dashed Grid Lines

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  width: 600,
  height: 400,
  data: [
    { time: '9:00', temperature: 18 },
    { time: '12:00', temperature: 24 },
    { time: '15:00', temperature: 28 },
    { time: '18:00', temperature: 22 },
    { time: '21:00', temperature: 20 },
  ],
  encode: { x: 'time', y: 'temperature' },
  style: { stroke: '#5B8FF9', lineWidth: 2 },
  axis: {
    y: {
      title: 'Temperature (°C)',
      grid: true,
      gridStroke: '#d9d9d9',
      gridLineDash: [4, 4], // Dash configuration: 4px solid, 4px gap
      gridStrokeOpacity: 0.8,
    },
    x: {
      title: 'Time',
      grid: true,
      gridStroke: '#f0f0f0',
      gridLineDash: [2, 2], // Finer dashes
      gridStrokeOpacity: 0.6,
    },
  },
});
chart.render();
```

##### Grid Lines with Background Fill

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  width: 600,
  height: 400,
  data: [
    { product: 'Product A', sales: 120 },
    { product: 'Product B', sales: 200 },
    { product: 'Product C', sales: 150 },
    { product: 'Product D', sales: 300 },
    { product: 'Product E', sales: 250 },
  ],
  encode: { x: 'product', y: 'sales', color: 'product' },
  axis: {
    y: {
      title: 'Sales (units)',
      grid: true,
      gridStroke: '#e8e8e8',
      gridLineWidth: 1,
      gridAreaFill: ['#fafafa', '#ffffff'], // Alternating fill colors
      gridOpacity: 0.9,
    },
    x: {
      title: 'Product Type',
      grid: false,
    },
  },
});
chart.render();
```

##### Custom Grid Line Filtering

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'area',
  width: 600,
  height: 400,
  data: [
    { quarter: 'Q1', revenue: 100, expense: 80 },
    { quarter: 'Q2', revenue: 120, expense: 90 },
    { quarter: 'Q3', revenue: 150, expense: 110 },
    { quarter: 'Q4', revenue: 180, expense: 140 },
  ],
  encode: { x: 'quarter', y: 'revenue' },
  style: { fillOpacity: 0.6 },
  axis: {
    y: {
      title: 'Amount (10k)',
      grid: true,
      gridStroke: '#cccccc',
      gridLineWidth: 1,
      // Show only even-indexed grid lines
      gridFilter: (datum, index) => index % 2 === 0,
      gridStrokeOpacity: 0.8,
    },
    x: {
      title: 'Quarter',
      grid: true,
      gridStroke: '#e6e6e6',
      gridLineDash: [3, 3],
      gridStrokeOpacity: 0.5,
    },
  },
});
chart.render();
```

### animate

Supports setting animation effects for updates

| Property | Description                 | Type                            | Default Value | Required |
| -------- | --------------------------- | ------------------------------- | ------------- | -------- |
| animate  | Whether to enable animation | `boolean` &#124; `EffectTiming` | -             |          |

EffectTiming supports the following configurable properties:

| Property | Description                               | Type     | Default Value | Required |
| -------- | ----------------------------------------- | -------- | ------------- | -------- |
| delay    | Delay execution time (ms)                 | `number` | -             |          |
| duration | Animation duration (ms)                   | `number` | -             |          |
| easing   | Animation easing function                 | `Easing` | -             |          |
| endDelay | End delay execution time (ms)             | `number` | -             |          |
| fill     | Animation display effect when not running | `Fill`   | -             |          |

## Events

The axis component itself has no specific event types.

## Examples

```js | ob { inject: true }
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
      titleFontWeight: 500, // Title font weight
      titleSpacing: 15, // Distance from title to axis
      titlePosition: 'bottom', // Title position relative to axis
      titleFontSize: 14, // Title font size
      titleFill: '#333', // Title fill color

      // Grid line configuration
      grid: true, // Whether to show grid lines
      gridLineWidth: 2, // Grid line stroke width
      gridStroke: '#f0f0f0', // Grid line stroke color
      gridStrokeOpacity: 0.8, // Grid line stroke opacity
      gridLineDash: [3, 3], // Grid line stroke dash configuration
      gridOpacity: 0.9, // Grid line overall opacity
      gridAreaFill: ['#fafafa', '#ffffff'], // Grid area fill color
      gridFilter: (_, i) => i % 2 === 0, // Grid line filtering

      // Axis line configuration
      line: true, // Whether to show axis line
      lineLineWidth: 5, // Axis line stroke width
      lineStroke: '#f50', // Axis line stroke color
      arrow: true, // Whether to show arrow
      lineArrowOffset: 8, // Arrow offset length

      // Axis tick configuration
      tick: true, // Whether to show ticks
      tickCount: 8, // Set recommended number of ticks to generate
      tickLineWidth: 5, // Tick stroke width
      tickLength: 10, // Tick length
      tickStroke: '#3366ff', // Tick stroke color
      tickDirection: 'positive', // Tick direction
      tickStrokeOpacity: 0.8, // Tick stroke opacity

      // Axis label configuration
      label: true, // Whether to show tick labels
      labelFontSize: 12, // Label font size
      labelFill: '#009900', // Label fill color
      labelFontWeight: 500, // Label font weight
      labelFontFamily: 'Arial', // Label font family
      labelTextAlign: 'center', // Label text horizontal alignment
      labelTextBaseline: 'middle', // Label text vertical baseline
      labelAlign: 'horizontal', // Label alignment
      labelDirection: 'positive', // Label position relative to axis line
      labelSpacing: 5, // Spacing between label and its corresponding tick
      labelFillOpacity: 0.9, // Label fill opacity
      labelStroke: '#ffffff', // Label stroke color
      labelStrokeOpacity: 0.5, // Label stroke opacity
      labelLineWidth: 1, // Label stroke width
      labelOpacity: 1, // Label overall opacity
      labelDx: 2, // Label horizontal offset
      labelDy: 0, // Label vertical offset
      labelCursor: 'pointer', // Label cursor style
    },
    // Configure y axis
    y: {
      position: 'left', // Set axis position

      // Axis title configuration
      title: 'Y Axis Title', // Axis title content
      titleFontWeight: 500, // Title font weight
      titleSpacing: 20, // Distance from title to axis
      titlePosition: 'left', // Title position relative to axis
      titleFontSize: 14, // Title font size
      titleFill: '#333', // Title fill color

      // Grid line configuration
      grid: true, // Whether to show grid lines
      gridLineWidth: 2, // Grid line stroke width
      gridStroke: '#e6e6e6', // Grid line stroke color
      gridStrokeOpacity: 0.7, // Grid line stroke opacity
      gridLineDash: [5, 5], // Grid line stroke dash configuration
      gridOpacity: 0.8, // Grid line overall opacity

      // Axis line configuration
      line: true, // Whether to show axis line
      lineLineWidth: 5, // Axis line stroke width
      lineStroke: '#f50', // Axis line stroke color
      arrow: false, // Whether to show arrow
      lineOpacity: 1, // Axis line overall opacity

      // Axis tick configuration
      tick: true, // Whether to show ticks
      tickCount: 8, // Set recommended number of ticks to generate
      tickLineWidth: 5, // Tick stroke width
      tickLength: 10, // Tick length
      tickStroke: '#3366ff', // Tick stroke color
      tickDirection: 'negative', // Tick direction
      tickStrokeOpacity: 0.8, // Tick stroke opacity

      // Axis label configuration
      label: true, // Whether to show tick labels
      labelFontSize: 12, // Label font size
      labelFill: '#009900', // Label fill color
      labelFontWeight: 500, // Label font weight
      labelFontFamily: 'Helvetica', // Label font family
      labelTextAlign: 'right', // Label text horizontal alignment
      labelTextBaseline: 'middle', // Label text vertical baseline
      labelAlign: 'perpendicular', // Label alignment
      labelSpacing: 8, // Spacing between label and its corresponding tick
      labelLineHeight: 1.2, // Label line height
      labelFormatter: (d) => `${d}万`, // Label formatting
    },
  },
});

chart.render();
```

For more examples, please visit the [Chart Examples - Axis](/en/examples/component/axis/#axis-x) page.

## Label Formatting Examples

### Example 1: Financial Stock Chart Formatting

Financial data requires precise price display and concise time axis, commonly used for stock prices, fund values, and other scenarios:

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  width: 600,
  height: 400,
  data: [
    { date: '2024-01-01', price: 23.45, volume: 120000 },
    { date: '2024-01-02', price: 24.12, volume: 150000 },
    { date: '2024-01-03', price: 23.89, volume: 98000 },
    { date: '2024-01-04', price: 25.3, volume: 200000 },
    { date: '2024-01-05', price: 24.78, volume: 175000 },
    { date: '2024-01-08', price: 26.15, volume: 220000 },
  ],
  encode: { x: 'date', y: 'price' },
  style: { stroke: '#ff6b35', lineWidth: 2 },
  axis: {
    x: {
      title: 'Trading Date',
      // Time formatting requires custom function
      labelFormatter: (d) => {
        const date = new Date(d);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${month}-${day}`;
      },
      labelFontSize: 11,
    },
    y: {
      title: 'Stock Price ($)',
      // Using d3-format: fixed 2 decimals
      labelFormatter: '.2f', // Equivalent to d.toFixed(2)
      grid: true,
      gridStroke: '#f5f5f5',
      tickCount: 6,
    },
  },
});
chart.render();
```

**D3-format vs Custom Function Comparison:**

```js
// ✅ D3-format (recommended for standard number formats)
labelFormatter: '.2f'; // Fixed 2 decimals: 23.45
labelFormatter: '.1%'; // Percentage: 23.4%
labelFormatter: '$,.2f'; // Currency format: $1,234.56

// ✅ Custom function (complex logic, special requirements)
labelFormatter: (d) => `$${d.toFixed(2)}`; // Dollar symbol
labelFormatter: (d) => {
  /* Complex business logic */
};
```

### Example 2: E-commerce Sales Data Smart Unit Conversion

Sales data usually involves large amounts, requiring automatic conversion to appropriate units for display. Compare d3-format and custom function applications:

#### Using D3-format (International Standard Format)

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  width: 600,
  height: 400,
  data: [
    { category: 'Electronics', sales: 8500000 },
    { category: 'Clothing', sales: 12300000 },
    { category: 'Home & Garden', sales: 6800000 },
    { category: 'Beauty', sales: 15600000 },
    { category: 'Food & Beverage', sales: 9200000 },
  ],
  encode: { x: 'category', y: 'sales', color: 'category' },
  axis: {
    x: {
      title: 'Product Category',
      labelFontSize: 12,
    },
    y: {
      title: 'Sales',
      // Using d3-format: SI prefix format, automatic K/M units
      labelFormatter: '~s', // 8.5M, 12.3M, 6.8M, 15.6M, 9.2M
      grid: true,
      gridStroke: '#e8e8e8',
      tickCount: 5,
    },
  },
});
chart.render();
```

#### Using Custom Function (Localized Format)

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart2 = new Chart({
  container: 'container',
});

chart2.options({
  type: 'interval',
  width: 600,
  height: 400,
  data: [
    { category: 'Electronics', sales: 8500000 },
    { category: 'Clothing', sales: 12300000 },
    { category: 'Home & Garden', sales: 6800000 },
    { category: 'Beauty', sales: 15600000 },
    { category: 'Food & Beverage', sales: 9200000 },
  ],
  encode: { x: 'category', y: 'sales', color: 'category' },
  axis: {
    x: {
      title: 'Product Category',
      labelFontSize: 12,
    },
    y: {
      title: 'Sales',
      // Custom localized unit format
      labelFormatter: (value) => {
        if (value >= 1000000) {
          return `${(value / 1000000).toFixed(1)}M`;
        } else if (value >= 1000) {
          return `${(value / 1000).toFixed(0)}K`;
        } else {
          return value.toString();
        }
      },
      grid: true,
      gridStroke: '#e8e8e8',
      tickCount: 5,
    },
  },
});
chart2.render();
```

### Example 3: User Growth Data International Format

User data typically uses international standard K, M units, D3-format provides a concise implementation:

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'area',
  width: 600,
  height: 400,
  data: [
    { quarter: '2023 Q1', users: 125000 },
    { quarter: '2023 Q2', users: 158000 },
    { quarter: '2023 Q3', users: 234000 },
    { quarter: '2023 Q4', users: 312000 },
    { quarter: '2024 Q1', users: 425000 },
    { quarter: '2024 Q2', users: 586000 },
  ],
  encode: { x: 'quarter', y: 'users' },
  style: {
    fill: 'linear-gradient(270deg, #667eea 0%, #764ba2 100%)',
    fillOpacity: 0.6,
  },
  axis: {
    x: {
      title: 'Quarter',
      // Time string processing requires custom function
      labelFormatter: (d) => {
        return d.replace('2023 ', '').replace('2024 ', '24');
      },
      labelFontSize: 11,
    },
    y: {
      title: 'User Count',
      // Using d3-format: International standard K/M format
      labelFormatter: '.0s', // 125k, 158k, 234k, 312k, 425k, 586k
      grid: true,
      gridStroke: '#f0f0f0',
      gridLineDash: [3, 3],
      tickCount: 6,
    },
  },
});
chart.render();
```

## Long Label Text Handling Solutions

In real business scenarios, you often encounter problems with axis labels being too long, causing overlap or exceeding display bounds. G2 provides four core solutions, each with its optimal use cases:

### Solution Selection Guide

| Solution             | Use Case                                              | Advantages                      | Disadvantages                    | Recommended Business Scenarios         |
| -------------------- | ----------------------------------------------------- | ------------------------------- | -------------------------------- | -------------------------------------- |
| **Ellipsis**         | Varying text lengths, users can get full info elsewhere | Maintains tidiness, stable layout | Information loss                 | Product names, user IDs, filenames    |
| **Rotation**         | Similar text lengths, sufficient space               | Preserves complete info, clear visual | Needs more vertical space, slightly worse readability | Dates/times, region names, category labels |
| **Wrap**             | Medium-length text, sufficient vertical space        | Preserves complete info, easy to read | Takes more vertical space        | Product descriptions, department names |
| **Hide**             | High label density, focus on trends                  | Resolves overlap, keeps key points | Information missing              | Time series, big data visualization   |

### Example 1: E-commerce Product Sales Ranking (Ellipsis Solution)

E-commerce platforms need to display bestselling products, with product names varying from "iPhone" to "Apple iPhone 15 Pro Max 1TB Space Black":

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  width: 650, // Reduce width to trigger ellipsis
  data: [
    { product: 'iPhone 15 Pro Max', sales: 2500 },
    { product: 'Samsung Galaxy S24 Ultra 512GB Phantom Black Edition', sales: 1800 },
    {
      product: 'Apple MacBook Pro 16-inch M3 Max chip 1TB Space Gray',
      sales: 1200,
    },
    { product: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones Midnight Black', sales: 3200 },
    { product: 'Xiaomi 14 Ultra Photography Kit 16GB+1TB White Limited Edition', sales: 2100 },
    { product: 'iPad Pro 12.9-inch M2 chip 1TB WiFi Space Gray', sales: 1600 },
    { product: 'MacBook Air 15-inch M2 chip 512GB Starlight', sales: 1400 },
    { product: 'AirPods Pro 2nd Generation Active Noise Cancellation Wireless Earbuds', sales: 2800 },
  ],
  encode: { x: 'product', y: 'sales', color: 'product' },
  axis: {
    x: {
      title: 'Bestselling Products',
      labelFontSize: 11,
      // Ellipsis solution: suitable for product name scenarios
      size: 100,
      transform: [
        {
          type: 'ellipsis',
          suffix: '...', // Ellipsis symbol
        },
      ],
    },
    y: {
      title: 'Sales (Units)',
      labelFormatter: ',.0f', // Thousands separator format
      grid: true,
      gridStroke: '#f0f0f0',
    },
  },
  tooltip: {
    // Show full product name on hover
    title: (d) => d.product,
    items: [{ field: 'sales', name: 'Sales', formatter: ',.0f' }],
  },
});
chart.render();
```

**Features**

- Maintains chart tidiness, avoids product name overlap
- Users can view full product names through tooltip
- Suitable for scenarios with greatly varying product name lengths

### Example 2: User Activity Time Analysis (Rotation Solution)

Need to display hourly user activity, time labels need to show "YYYY-MM-DD HH:mm" format:

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  width: 600, // Reduce width to trigger rotation
  marginBottom: 30, // Reserve space for rotation
  data: [
    { time: '2024-01-15 08:00', activeUsers: 1200 },
    { time: '2024-01-15 09:00', activeUsers: 1800 },
    { time: '2024-01-15 10:00', activeUsers: 2800 },
    { time: '2024-01-15 11:00', activeUsers: 3200 },
    { time: '2024-01-15 12:00', activeUsers: 4500 },
    { time: '2024-01-15 13:00', activeUsers: 4200 },
    { time: '2024-01-15 14:00', activeUsers: 3200 },
    { time: '2024-01-15 15:00', activeUsers: 3600 },
    { time: '2024-01-15 16:00', activeUsers: 3800 },
    { time: '2024-01-15 17:00', activeUsers: 4800 },
    { time: '2024-01-15 18:00', activeUsers: 5200 },
    { time: '2024-01-15 19:00', activeUsers: 4800 },
    { time: '2024-01-15 20:00', activeUsers: 4100 },
    { time: '2024-01-15 21:00', activeUsers: 3500 },
    { time: '2024-01-15 22:00', activeUsers: 2600 },
    { time: '2024-01-15 23:00', activeUsers: 1900 },
  ],
  encode: { x: 'time', y: 'activeUsers' },
  style: { stroke: '#5B8FF9', lineWidth: 2 },
  axis: {
    x: {
      title: 'Time',
      labelFontSize: 10,
      // Rotation solution: suitable for time labels
      size: 100,
      transform: [
        {
          type: 'rotate',
          optionalAngles: [0, 30, 45, 60, 90], // Try multiple angles
          recoverWhenFailed: true, // Recover to default angle when failed
        },
      ],
    },
    y: {
      title: 'Active Users',
      labelFormatter: ',.0f',
      grid: true,
      gridStroke: '#e6e6e6',
      gridLineDash: [3, 3],
    },
  },
});
chart.render();
```

**Features**

- Preserves complete time information for precise analysis
- Automatically selects best rotation angle to avoid overlap
- Suitable for time series, region names, and other fixed format labels

### Example 3: Department Performance Evaluation (Wrap Solution)

Display quarterly performance by department, department names are medium length and need to be shown completely:

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  width: 800,
  data: [
    { department: 'Marketing Department', score: 85 },
    { department: 'Product Development Center', score: 92 },
    { department: 'Customer Service Department', score: 78 },
    { department: 'Human Resources Management', score: 81 },
    { department: 'Finance and Audit Department', score: 89 },
    { department: 'Strategic Planning Center', score: 87 },
  ],
  encode: { x: 'department', y: 'score', color: 'department' },
  axis: {
    x: {
      title: 'Department',
      labelFontSize: 12,
      // Wrap solution: suitable for department names
      size: 100,
      transform: [
        {
          type: 'wrap',
          wordWrapWidth: 80, // Maximum 80 pixels per line
          maxLines: 2, // Maximum 2 lines
          recoverWhenFailed: true, // Recover to default layout when wrap fails
        },
      ],
    },
    y: {
      title: 'Performance Score',
      grid: true,
      gridStroke: '#f5f5f5',
      domain: [0, 100],
    },
  },
});
chart.render();
```

**Features**

- Preserves complete department names for accurate identification
- Wrap layout maintains good readability
- Suitable for medium-length label text

### Example 4: Stock Price Big Data Trend (Hide Solution)

Display continuous trading day stock price trends, dense data points, focus on trends rather than specific dates:

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

// Generate mock stock data
const generateStockData = () => {
  const data = [];
  let price = 100;
  const startDate = new Date('2024-01-01');

  for (let i = 0; i < 90; i++) {
    // Increase to 90 data points
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    // Random price fluctuation
    price += (Math.random() - 0.5) * 4;
    price = Math.max(80, Math.min(120, price)); // Limit to 80-120 range

    data.push({
      date: currentDate.toISOString().split('T')[0],
      price: Math.round(price * 100) / 100,
    });
  }
  return data;
};

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  width: 700, // Reduce width to increase density
  marginRight: 30, // Reserve space for keeping the last tick value
  data: generateStockData(),
  encode: { x: 'date', y: 'price' },
  style: { stroke: '#722ed1', lineWidth: 1.5 },
  axis: {
    x: {
      title: 'Trading Date',
      labelFontSize: 9,
      // Hide solution: suitable for dense data
      size: 100,
      transform: [
        {
          type: 'hide',
          keepHeader: true, // Keep first date
          keepTail: true, // Keep last date
        },
      ],
    },
    y: {
      title: 'Stock Price ($)',
      labelFormatter: '.2f',
      grid: true,
      gridStroke: '#f0f0f0',
      gridLineDash: [2, 2],
    },
  },
});
chart.render();
```

**Features**

- Solves label overlap problem with dense data points
- Preserves key time nodes at beginning and end
- Emphasizes data trends rather than specific values

### Example 5: Quick Configuration (Recommended)

For simple scenarios, it's recommended to use `labelAutoXXX` series properties:

```js | ob {  pin: false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  width: 650, // Reduce width to trigger transformation effects
  marginBottom: 50, // Reserve space for multiple transformations
  marginRight: 100,
  data: [
    { region: 'Beijing Chaoyang CBD Core Financial Center', revenue: 8500 },
    { region: 'Shanghai Pudong Lujiazui Financial Trade Zone HQ Base', revenue: 9200 },
    { region: 'Shenzhen Nanshan High-tech Industrial Park', revenue: 7800 },
    { region: 'Guangzhou Tianhe Zhujiang New Town International Business Center', revenue: 6900 },
    { region: 'Hangzhou Xihu Internet Innovation Industrial Park', revenue: 5600 },
    { region: 'Chengdu High-tech Software Industrial Park Tech Innovation Zone', revenue: 4800 },
    { region: 'Suzhou Industrial Park Bio-Nano Science Park', revenue: 5200 },
    { region: 'Nanjing Jiangning Future Tech City Innovation Base', revenue: 4500 },
  ],
  encode: { x: 'region', y: 'revenue', color: 'region' },
  axis: {
    x: {
      title: 'Business Region',
      labelFontSize: 10,
      size: 100,
      // Quick configuration, equivalent to transform array
      labelAutoEllipsis: true, // Enable auto ellipsis
      labelAutoRotate: true, // Enable auto rotation
      labelAutoHide: true, // Enable auto hide
      labelAutoWrap: true, // Enable auto wrap
    },
    y: {
      title: 'Revenue (10K)',
      labelFormatter: ',.0f',
      grid: true,
      gridStroke: '#e8e8e8',
    },
  },
});
chart.render();
```
