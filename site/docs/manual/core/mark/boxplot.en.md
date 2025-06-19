---
title: boxplot
order: 4
---

## Overview

The `boxplot` mark is used to draw boxplots (also known as box-and-whisker plots), which are statistical charts used to display the distribution of a dataset. Boxplots typically contain the following key statistical values:

- **Minimum**: The smallest value in the dataset (excluding outliers)
- **Lower Quartile (Q1)**: The value at the 25th percentile of the dataset
- **Median (Q2)**: The value at the 50th percentile of the dataset
- **Upper Quartile (Q3)**: The value at the 75th percentile of the dataset
- **Maximum**: The largest value in the dataset (excluding outliers)
- **Outliers**: Data points that fall outside the normal range

Both `boxplot` and [`box`](/en/manual/core/mark/box) marks can be used to draw boxplots, but they have the following differences:

- `boxplot` is a high-level mark with built-in data grouping and statistical aggregation functionality
- `box` is an atomic mark that requires developers to manually specify data for the 5 points

Therefore, `boxplot` is more suitable for frontend data exploration and analysis, while `box` is more suitable for visualization after backend computation and statistics on large datasets.

<img alt="boxplot" width="100%" style="max-width: 400px" src="https://gw.alipayobjects.com/zos/antfincdn/f6WEf%24CrgE/20220913111713.jpg" />

## Configuration

| Property | Description                                                                                 | Type              | Default Value | Required |
| -------- | ------------------------------------------------------------------------------------------- | ----------------- | ------------- | -------- |
| encode   | Configure visual channels for the `boxplot` mark, including `x`, `y`, `color`, `shape`, etc. | [encode](#encode) | -             | ✓        |
| style    | Configure the graphic style of the `boxplot` mark                                           | [style](#style)   | -             |          |
| point    | Whether to show outliers                                                                    | `boolean`         | `true`        |          |

### encode

Configure visual channels for the `boxplot` mark.

| Property | Description                                                                                                                      | Type                          | Default Value | Required |
| -------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------------- | -------- |
| x        | Bind the `x` property channel for the `boxplot` mark, usually a categorical field                                                | [encode](/en/manual/core/encode) | -             | ✓        |
| y        | Bind the `y` property channel for the `boxplot` mark, usually a numeric field used to calculate boxplot statistical values     | [encode](/en/manual/core/encode) | -             | ✓        |
| color    | Bind the `color` property channel for the `boxplot` mark, used to distinguish boxplots of different categories                 | [encode](/en/manual/core/encode) | -             |          |
| shape    | Bind the `shape` property channel for the `boxplot` mark, available values are `box`, `violin`                                 | `'box'` \| `'violin'`         | `'box'`       |          |
| series   | Bind the `series` property channel for the `boxplot` mark, used for grouped display of boxplots                                | [encode](/en/manual/core/encode) | -             |          |

### style

Configure the graphic style of the `boxplot` mark. The `boxplot` consists of two parts: the box and the outlier points. Therefore, style configuration is also divided into two parts, prefixed with `box` and `point` respectively.

#### Box Style

| Property         | Description                                                                                       | Type                                                                    | Default Value | Required |
| ---------------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------- | -------- |
| boxFill          | Fill color of the box                                                                             | `string` \| `(datum, index, data, column) => string`                    | -             |          |
| boxFillOpacity   | Fill opacity of the box                                                                           | `number` \| `(datum, index, data, column) => number`                    | `0.95`        |          |
| boxStroke        | Stroke color of the box                                                                           | `string` \| `(datum, index, data, column) => string`                    | `#000`        |          |
| boxLineWidth     | Width of the box stroke                                                                           | `number` \| `(datum, index, data, column) => number`                    | `1`           |          |
| boxLineDash      | Dash pattern for box stroke, first value is length of each dash segment, second is gap between dashes | `[number,number]` \| `(datum, index, data, column) => [number, number]` | -             |          |
| boxLineOpacity   | Opacity of the box stroke                                                                         | `number` \| `(datum, index, data, column) => number`                    | -             |          |
| boxOpacity       | Overall opacity of the box                                                                        | `number` \| `(datum, index, data, column) => number`                    | -             |          |
| boxShadowColor   | Shadow color of the box                                                                           | `string` \| `(datum, index, data, column) => string`                    | -             |          |
| boxShadowBlur    | Gaussian blur coefficient for the box shadow                                                      | `number` \| `(datum, index, data, column) => number`                    | -             |          |
| boxShadowOffsetX | Horizontal distance of shadow from box                                                            | `number` \| `(datum, index, data, column) => number`                    | -             |          |
| boxShadowOffsetY | Vertical distance of shadow from box                                                              | `number` \| `(datum, index, data, column) => number`                    | -             |          |
| boxCursor        | Mouse cursor style. Same as CSS cursor style                                                      | `string` \| `(datum, index, data, column) => string`                    | `'default'`   |          |

#### Outlier Point Style

| Property           | Description                                | Type                                                                    | Default Value | Required |
| ------------------ | ------------------------------------------ | ----------------------------------------------------------------------- | ------------- | -------- |
| pointFill          | Fill color of outlier points              | `string` \| `(datum, index, data, column) => string`                    | -             |          |
| pointFillOpacity   | Fill opacity of outlier points            | `number` \| `(datum, index, data, column) => number`                    | -             |          |
| pointStroke        | Stroke color of outlier points            | `string` \| `(datum, index, data, column) => string`                    | -             |          |
| pointLineWidth     | Width of outlier point stroke             | `number` \| `(datum, index, data, column) => number`                    | -             |          |
| pointLineDash      | Dash pattern for outlier point stroke     | `[number,number]` \| `(datum, index, data, column) => [number, number]` | -             |          |
| pointStrokeOpacity | Stroke opacity of outlier points          | `number` \| `(datum, index, data, column) => number`                    | -             |          |
| pointOpacity       | Overall opacity of outlier points         | `number` \| `(datum, index, data, column) => number`                    | -             |          |
| pointShadowColor   | Shadow color of outlier points            | `string` \| `(datum, index, data, column) => string`                    | -             |          |
| pointShadowBlur    | Gaussian blur coefficient for point shadow | `number` \| `(datum, index, data, column) => number`                    | -             |          |
| pointShadowOffsetX | Horizontal distance of shadow from point  | `number` \| `(datum, index, data, column) => number`                    | -             |          |
| pointShadowOffsetY | Vertical distance of shadow from point    | `number` \| `(datum, index, data, column) => number`                    | -             |          |
| pointCursor        | Mouse cursor style. Same as CSS cursor style | `string` \| `(datum, index, data, column) => string`                    | `'default'`   |          |

## Examples

### Basic Boxplot

Use the `boxplot` mark to quickly create a boxplot with automatic calculation of statistical values.

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'boxplot',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/morley.json',
  },
  encode: {
    x: 'Expt',
    y: 'Speed',
  },
  style: {
    boxFill: '#aaa',
    pointStroke: '#000',
  },
});

chart.render();
```

### Boxplot Without Outliers

Set `point: false` to hide outliers and show only the box portion.

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'boxplot',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/morley.json',
  },
  encode: {
    x: 'Expt',
    y: 'Speed',
  },
  style: {
    point: false,
  },
});

chart.render();
```

### Grouped Boxplot

Use the `color` and `series` channels to create grouped boxplots.

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'boxplot',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
  },
  encode: {
    x: 'species',
    y: 'flipper_length_mm',
    color: 'sex',
    series: 'sex',
  },
});

chart.render();
```

### Horizontal Boxplot

Create a horizontal boxplot by transposing the coordinate system.

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'boxplot',
  coordinate: { transform: [{ type: 'transpose' }] },
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/morley.json',
    transform: [{ type: 'filter', callback: (d) => d.Expt === 1 }],
  },
  encode: {
    y: 'Speed',
  },
  style: {
    boxFill: '#aaa',
    pointStroke: '#000',
  },
});

chart.render();
```

### Violin Plot

Create a violin-shaped boxplot by setting `shape: 'violin'`.

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'boxplot',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
  },
  encode: {
    x: 'species',
    y: 'flipper_length_mm',
    color: 'species',
    shape: 'violin',
  },
  style: {
    opacity: 0.5,
    strokeOpacity: 0.5,
    point: false,
  },
});

chart.render();
```

## FAQ

### How to draw boxplots with large datasets?

When dealing with large datasets, you can compute outliers and quartile points on the server side, then use the `box` mark to draw boxplots. In this case, using the `box` mark is more efficient than the `boxplot` mark because the `box` mark doesn't require statistical calculations on the frontend.

For detailed usage, please refer to the [box](/en/manual/core/mark/box) mark documentation.
