---
title: Overview
order: 1
---

**Scale** in G2 is a very important abstraction in visualization: it maps abstract data to visual data, serving as a bridge between abstract data and visual data. If encoding determines which channels of a mark need to be visualized, then scales determine how these channels should be visualized.

## Scale Classification

G2 provides a rich variety of scale types, which can be classified according to data type and use case:

### Classification by Data Type

#### 1. Continuous Scales

Handle `continuous` numerical data while preserving proportional relationships between data points:

- **linear (Linear Scale)**: The most basic continuous scale, using the linear function y = mx + b for mapping
- **log (Logarithmic Scale)**: Uses the logarithmic function y = log<sub>base</sub>(x) + b for mapping, suitable for exponentially growing data with large spans
- **pow (Power Scale)**: Uses the power function y = x<sup>k</sup> + b for mapping, adjustable exponent to emphasize data differences
- **sqrt (Square Root Scale)**: A special case of pow scale (k=0.5), suitable for compressing large numerical differences
- **time (Time Scale)**: A continuous scale specifically for handling time series data, supports automatic calculation of appropriate time intervals (tickInterval) and tick counts, can handle both UTC and local time

For example, both x and y channels in the scatter plot below use `linear` scales.

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'point',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  },
  encode: { x: 'weight', y: 'height', color: 'gender' },
});

chart.render();
```

When we try to change the scales of the x and y channels:

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'point',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  },
  encode: { x: 'weight', y: 'height', color: 'gender' },
  scale: {
    x: {
      type: 'point',
    },
    y: {
      type: 'point',
      range: [1, 0],
    },
  },
});

chart.render();
```

> For dense data, continuous scales are more recommended than categorical scales.

#### 2. Categorical Scales

Handle `discrete` categorical data:

- **ordinal (Ordinal Scale)**: Maps discrete data to discrete value ranges, commonly used for color and shape mapping
- **band (Band Scale)**: Allocates equal-width intervals for each category, commonly used for x-axis in bar charts
- **point (Point Scale)**: A special case of band scale (bandWidth=0), used for point position mapping

For example, the color channel in the bar chart below uses an `ordinal` scale.

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold', color: 'genre' },
  scale: {
    color: { range: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#c564be'] },
  },
});

chart.render();
```

We can see the difference between `band` scale and `point` scale through the following examples:

`point` scale

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});
chart.options({
  type: 'cell',
  height: 640,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/bd287f2c-3e2b-4d0a-8428-6a85211dce33.json',
  },
  encode: { x: 'x', y: 'y', color: 'index' },
  scale: { x: { type: 'point' } },
  style: { stroke: '#000', inset: 2 },
  animate: { enter: { type: 'fadeIn' } },
});

chart.render();
```

`band` scale

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});
chart.options({
  type: 'cell',
  height: 640,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/bd287f2c-3e2b-4d0a-8428-6a85211dce33.json',
  },
  encode: { x: 'x', y: 'y', color: 'index' },
  scale: { x: { type: 'band' } },
  style: { stroke: '#000', inset: 2 },
  animate: { enter: { type: 'fadeIn' } },
});

chart.render();
```

#### 3. Discretizing Scales

`Discretize` `continuous` data into finite categories:

- **quantize (Quantize Scale)**: Segments by equal-width numerical ranges
- **quantile (Quantile Scale)**: Segments by data distribution quantiles, equal data count in each segment
- **threshold (Threshold Scale)**: Segments by manually specified thresholds

The following shows the effect of applying `quantile` scale and `quantize` scale to the same data respectively. The former segments by data distribution quantiles with equal data count in each segment, while the latter segments by equal-width numerical ranges.

`quantile` scale

```js | ob { inject: true, pin:false  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});
chart.options({
  type: 'cell',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/89c20fe8-0c6f-46c8-b36b-4cb653dba8ed.json',
    transform: [
      {
        type: 'map',
        callback: (d) => ({
          salary: d,
        }),
      },
    ],
  },
  encode: {
    y: (_, i) => (i % 5) + 1,
    x: (_, i) => ((i / 5) | 0) + 1,
    color: 'salary',
  },
  scale: { color: { type: 'quantile', range: ['#eee', 'pink', 'red'] } },
  style: { stroke: '#000', inset: 2 },
  animate: { enter: { type: 'fadeIn' } },
  legend: { color: { length: 400, labelFormatter: '.0s' } },
});

chart.render();
```

`quantize` scale

```js | ob { inject: true, pin:false  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});
chart.options({
  type: 'cell',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/89c20fe8-0c6f-46c8-b36b-4cb653dba8ed.json',
    transform: [
      {
        type: 'map',
        callback: (d) => ({
          salary: d,
        }),
      },
    ],
  },
  encode: {
    y: (_, i) => (i % 5) + 1,
    x: (_, i) => ((i / 5) | 0) + 1,
    color: 'salary',
  },
  scale: { color: { type: 'quantize', range: ['#eee', 'pink', 'red'] } },
  style: { stroke: '#000', inset: 2 },
  animate: { enter: { type: 'fadeIn' } },
  legend: { color: { length: 400, labelFormatter: '.0s' } },
});

chart.render();
```

### Classification by Use Case

#### Position Encoding Scales

Mainly used for x, y coordinate axis:

- **linear**: Numerical coordinate axis
- **time**: Time axis
- **band**: Categorical coordinate axis
- **point**: Categorical coordinate axis

#### Visual Attribute Encoding Scales

Mainly used for visual channels like color, size, shape:

- **ordinal**: Color and shape mapping for categorical data
- **linear/log/pow/sqrt**: Color gradients and numerical size mapping for continuous data
- **quantize/quantile/threshold**: Segmented color mapping for continuous data

For example, in a basic bar chart, the x channel scale defaults to `band` for implementing categorical coordinate axis in bar charts, while the y channel scale defaults to `linear`, mapping continuous data from the y channel's corresponding data column to bar lengths with visual properties.

Summary:

| Scale Type    | Data Type   | Mapping Function                         | Main Use              | Use Cases                                                   |
| ------------- | ----------- | ---------------------------------------- | --------------------- | ----------------------------------------------------------- |
| **linear**    | Continuous  | y = mx + b                               | Position, color, size | Basic mapping for numerical data                            |
| **log**       | Continuous  | y = log<sub>base</sub>(x) + b            | Position, color       | Exponentially growing data with large spans                 |
| **pow**       | Continuous  | y = x<sup>k</sup> + b                    | Position, color, size | When data difference intensity needs adjustment             |
| **sqrt**      | Continuous  | y = x<sup>0.5</sup> + b                  | Size, color           | Compressing large value differences (e.g., area mapping)    |
| **time**      | Time data   | Auto-calculated time intervals and ticks | Time axis             | Time series data visualization, supports UTC and local time |
| **ordinal**   | Categorical | One-to-one mapping                       | Color, shape          | Visual attribute mapping for categorical data               |
| **band**      | Categorical | Equal-width interval allocation          | x/y axis position     | Bar charts, column charts                                   |
| **point**     | Categorical | Point position allocation                | x/y axis position     | Point charts, line charts                                   |
| **quantize**  | Continuous  | Equal-width segmentation                 | Color segmentation    | Segmented coloring for evenly distributed data              |
| **quantile**  | Continuous  | Equal-frequency segmentation             | Color segmentation    | Segmented coloring for unevenly distributed data            |
| **threshold** | Continuous  | Custom threshold segmentation            | Color segmentation    | Grouping by specific thresholds (e.g., pass line)           |

## Scale Selection

1. **Numerical Data**

   - Normal distribution → `linear`
   - Exponential growth/large span → `log`
   - Need to emphasize small value differences → `pow` (exponent > 1)
   - Need to compress large value differences → `sqrt` or `pow` (exponent < 1)

2. **Time Data**

   - Time series → `time`

3. **Categorical Data**

   - Color/shape mapping → `ordinal`
   - Bar chart x-axis → `band`
   - Point chart x-axis → `point`

4. **Continuous Data Discretization**
   - Evenly distributed data → `quantize`
   - Unevenly distributed data → `quantile`
   - Clear threshold requirements → `threshold`

## Configuration Options

### Common Continuous Scale Configuration

```js
{
  type: 'linear', // or log, pow, sqrt, time
  domain: [min, max], // Domain
  range: [0, 1], // Range
  unknown: undefined, // Mapping value for unknown values
  tickMethod: (min, max, count) => [1,2,3,4], // Tick calculation method
  round: false, // Whether to round output values
  interpolate: (a, b) => (t) => a * (1 - t) + b * t, // Interpolation method
  nice: true, // Whether to optimize tick display
}
```

### Common Categorical Scale Configuration

```js
{
  type: 'ordinal', // or band, point
  domain: ['A', 'B', 'C'], // Category list
  range: ['red', 'green', 'blue'], // Mapping value list
  unknown: undefined, // Mapping value for unknown values
  compare: (a, b) => a.localeCompare(b), // Sorting method
}
```

### Common Discretizing Scale Configuration

```js
{
  type: 'quantize', // or quantile, threshold
  domain: [0, 100], // Continuous data range
  range: ['low', 'medium', 'high'], // Discrete categories
  unknown: undefined, // Mapping value for unknown values
}
```

## Configuration Levels

G2 internally infers scale type, domain, and range based on data type and mark type, but corresponding configurations can still be specified. Scales can be configured at the Mark level:

```js
({
  type: 'interval',
  scale: {
    x: { padding: 0.5 },
    y: {
      type: 'log', // Specify type
      domain: [10, 100], // Specify domain
      range: [0, 1], // Specify range
    },
  },
});
```

```js
// API
// First approach
chart
  .interval()
  .scale('x', { padding: 0.5 })
  .scale('y', {
    type: 'log', // Specify type
    domain: [10, 100], // Specify domain
    range: [0, 1], // Specify range
  });

// Second approach
chart.interval().scale({
  x: { padding: 0.5 },
  y: {
    type: 'log', // Specify type
    domain: [10, 100], // Specify domain
    range: [0, 1], // Specify range
  },
});
```

Scales can also be configured at the View level:

```js
({
  type: 'view',
  scale: {
    x: { padding: 0.5 },
    y: {
      type: 'log', // Specify type
      domain: [10, 100], // Specify domain
      range: [0, 1], // Specify range
    },
  },
});
```

```js
// API form
// First approach
chart.scale('x', { padding: 0.5 }).scale('y', {
  type: 'log', // Specify type
  domain: [10, 100], // Specify domain
  range: [0, 1], // Specify range
});

// Second approach
chart.scale({
  x: { padding: 0.5 },
  y: {
    type: 'log', // Specify type
    domain: [10, 100], // Specify domain
    range: [0, 1], // Specify range
  },
});
```

## Mark Scales

Each channel of a mark is bound to a scale. This scale transforms the column data bound to that channel, converting it from the data range: **Domain** to the visual range: **Range**. Different types of scales are designed for different types of data and use cases.

### Scale Synchronization

Scales for the same channel across marks in the same view are synchronized by default: they synchronize scale type, domain, range, and other configurations. This means all marks in a view are drawn according to the same scale. For example, in the figure below, although the LineX mark doesn't have complete data, it's still drawn at the accurate position due to scale synchronization.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'line',
      data: [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 13 },
      ],
      encode: { x: 'year', y: 'value' },
    },
    { type: 'lineX', data: ['1996'], style: { stroke: 'red', strokeWidth: 2 } },
  ],
});

chart.render();
```

### Scale Non-Synchronization

If you want to disable synchronization (e.g., when drawing dual-axis charts), you need to set `scale.independent` to `true`. Scales with this property won't synchronize with any other scales. In the example below, the y channels of interval and line will use two different scales, generating two different coordinate axis.

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'view',
  data: [
    { time: '10:10', call: 4, waiting: 2, people: 2 },
    { time: '10:15', call: 2, waiting: 6, people: 3 },
    { time: '10:20', call: 13, waiting: 2, people: 5 },
    { time: '10:25', call: 9, waiting: 9, people: 1 },
    { time: '10:30', call: 5, waiting: 2, people: 3 },
    { time: '10:35', call: 8, waiting: 2, people: 1 },
    { time: '10:40', call: 13, waiting: 1, people: 2 },
  ],
  children: [
    {
      type: 'interval',
      encode: { x: 'time', y: 'waiting' },
      axis: { y: { title: 'Waiting', titleFill: '#5B8FF9' } },
    },
    {
      type: 'line',
      encode: { x: 'time', y: 'people', shape: 'smooth' },
      scale: { y: { independent: true } }, // Set y direction scale non-synchronized
      style: { stroke: '#fdae6b', lineWidth: 2 },
      axis: {
        y: {
          position: 'right',
          grid: null,
          title: 'People',
          titleFill: '#fdae6b',
        },
      },
    },
  ],
});

chart.render();
```

If you want scales to synchronize in groups, you can declare `scale.key`. Scales with the same key will synchronize. For example, below, the y channel scales of Line and Point marks synchronize because their keys are both 'line'.

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'view',
  data: [
    { time: '10:10', call: 4, waiting: 2, people: 2 },
    { time: '10:15', call: 2, waiting: 6, people: 3 },
    { time: '10:20', call: 13, waiting: 2, people: 5 },
    { time: '10:25', call: 9, waiting: 9, people: 1 },
    { time: '10:30', call: 5, waiting: 2, people: 3 },
    { time: '10:35', call: 8, waiting: 2, people: 1 },
    { time: '10:40', call: 13, waiting: 1, people: 2 },
  ],
  children: [
    {
      type: 'interval',
      encode: { x: 'time', y: 'waiting' },
      axis: { y: { title: 'Waiting', titleFill: '#5B8FF9' } },
    },
    {
      type: 'line',
      encode: { x: 'time', y: 'people', shape: 'smooth' },
      scale: { y: { key: 'line' } }, // Set key to 'line'
      style: { stroke: '#fdae6b', lineWidth: 2 },
      axis: {
        y: {
          position: 'right',
          grid: null,
          title: 'People',
          titleFill: '#fdae6b',
        },
      },
    },
    {
      type: 'point',
      encode: { x: 'time', y: 'people' },
      scale: { y: { key: 'line' } }, // Set key to 'line'
      style: { stroke: '#fdae6b', lineWidth: 2 },
    },
  ],
});

chart.render();
```

## View Scales

Scales can be configured at the view level and will be passed to marks specified in `children`. If the corresponding channel of that mark doesn't have a scale set, it will be set; otherwise, there's no effect. When not drawing multi-axis charts, scales can be set at the view level.

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'view',
  data: [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ],
  encode: { x: 'year', y: 'value' },
  scale: { y: { nice: true } },
  children: [{ type: 'line' }, { type: 'point' }],
});

chart.render();
```

## Scale Type Inference

G2 has intelligent scale type inference capabilities. When users don't explicitly specify a scale type, it automatically selects the most suitable scale type based on data characteristics and channel properties. The inference mechanism follows the following priority rules:

### Inference Priority

**1. Explicit specification has highest priority**

If the user explicitly specifies the `type` property in the scale configuration, G2 will directly use that type, skipping all automatic inference logic.

**2. Special data type judgment**

G2 first checks the special properties of data:

- **Object type data**: If data contains strict objects (objects that are not Date, not null, not arrays), use `identity` scale.

```ts
export function isStrictObject(d: any): boolean {
  return (
    typeof d === 'object' &&
    !(d instanceof Date) &&
    d !== null &&
    !Array.isArray(d)
  );
}
```

- **String type range**: When the range parameter is a string, use `linear` scale.
- **Multi-range/domain**: When domain or range array length exceeds 2, infer as categorical scale.

**3. Inference based on domain**

When domain parameter is provided:

- If domain contains strings or boolean values, infer as categorical scale.
- If data contains Date objects, use `time` scale.
- Other cases infer as continuous scale.

**4. Automatic inference based on data values**

When there's no domain parameter, G2 analyzes actual data:

- **Categorical detection**: When data contains strings or boolean values, infer as categorical scale.
- **Time type detection**: When data contains Date objects, use `time` scale.
- **Other cases**: Infer as continuous scale.

### Further Inference

When inferred as categorical scale, G2 further subdivides based on channel names:

- For quantitative channels (x, y, position, channels starting with size), use `point` scale.
- Other channels use `ordinal` scale.

When inferred as continuous scale:

- For non-color channels, use `linear` scale.
- For color channels:
  - Use `linear` scale when range parameter exists.
  - Use `sequential` scale when no range parameter exists. (Sequential scale construction can create a scale that transforms between input and output through interpolation function, used internally during scale processing)

### Example Explanation

```js
// String data → ordinal scale
chart.interval().encode('x', 'category'); // category: ['A', 'B', 'C']

// Numerical data → linear scale
chart.line().encode('y', 'value'); // value: [10, 20, 30]

// Time data → time scale
chart.line().encode('x', 'date'); // date: [new Date('2023-01-01'), ...]

// String data for quantitative channels → point scale
chart.interval().encode('x', 'month'); // month: ['Jan', 'Feb', 'Mar']

// Explicit specification has highest priority
chart.interval().scale('y', { type: 'log' }); // Force use of log scale

// Multi-value range → infer as categorical
chart.point().scale('color', {
  range: ['red', 'green', 'blue', 'yellow'], // 4 values, infer as ordinal
});
```
