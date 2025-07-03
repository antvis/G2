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
