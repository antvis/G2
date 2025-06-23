---
title: pow
order: 12
---

## Overview

The `pow` (power scale) is a type of continuous scale, similar to linear scales. The `pow` scale applies an exponential transformation to the input data before mapping it to the output range. Its mapping formula is: `y = x ^ k`

Where `k` is the exponent parameter, which can be any real number. When `k = 1`, the `pow` scale becomes equivalent to a `linear` scale.

The `pow` scale is particularly useful for scenarios where you need to emphasize relative differences between data points, such as:

- When data distribution shows exponential growth/decay characteristics
- When you need to amplify/reduce differences between data points
- When data has a large range but you want to display it more evenly

## Configuration

| Property    | Description                                                            | Type                                                                                      | Default                                                   | Required |
| ----------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------- | -------- |
| type        | Scale type, must be 'pow'                                              | string                                                                                    | None                                                      | ✓        |
| domain      | Domain, representing the original range of input data                  | (number &#124; string)[]                                                                  | [0, 1]                                                    |          |
| range       | Range, representing the visual range after mapping                     | number[]                                                                                  | [0, 1]                                                    |          |
| exponent    | Exponent value, determining the strength of exponential transformation | number                                                                                    | 2                                                         |          |
| nice        | Whether to optimize the domain range                                   | boolean                                                                                   | false                                                     |          |
| clamp       | Whether to limit values outside the domain to the range                | boolean                                                                                   | false                                                     |          |
| round       | Whether to round the output values                                     | boolean                                                                                   | false                                                     |          |
| tickMethod  | Method for calculating ticks                                           | (min: number, max: number, count: number) => number[]                                     | d3Ticks                                                   |          |
| tickCount   | Number of ticks                                                        | number                                                                                    | 5                                                         |          |
| interpolate | Custom interpolator, supports numeric and color values                 | (a: number &#124; string, b: number &#124; string) => (t: number) => number &#124; string | Numbers: linear interpolation; Colors: RGBA interpolation |          |

## Notes

- When `domain` contains negative values, `exponent` must be an integer, otherwise it will produce complex number results
- Excessively large `exponent` values may cause differences between small values to be over-compressed
- When `exponent=1`, consider using `linear` scale for better performance
- `tickMethod` defaults to using `d3.js`'s `d3Ticks` algorithm, which automatically generates aesthetically pleasing and readable tick values (e.g., 0,5,10 instead of 0,3.33,6.66,10)
- When the value to be mapped is invalid, returns `unknown`
- `interpolate` receives two parameters (a,b) representing the range (numbers or colors), and returns an interpolation function (t => value), where t∈[0,1] represents the interpolation ratio. The default implementation automatically selects based on input type: Numbers: uses linear interpolation y = a*(1-t) + b*t; Colors: generates an rgba color value

## Examples

### Linear Scale (exponent=1)

When `exponent=1`, the `pow` scale is equivalent to a linear scale. In this case, data mapping is linear, suitable for displaying evenly distributed data.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const data = [
  { month: 'Jan', sales: 0.1 },
  { month: 'Feb', sales: 0.2 },
  { month: 'Mar', sales: 0.3 },
  { month: 'Apr', sales: 0.4 },
  { month: 'May', sales: 0.5 },
];

chart
  .interval()
  .data(data)
  .encode('x', 'month')
  .encode('y', 'sales')
  .scale('y', {
    type: 'pow',
    domain: [0, 0.5], // Input range
    range: [0, 1], // Output range, [0, 1] means y-axis direction from top to bottom, [1, 0] means y-axis direction from bottom to top
    exponent: 1,
  });

chart.render();
```

### Square Root Scale (exponent=0.5)

When data has a large range, you can use a `pow` scale with `exponent < 1` to compress data differences. Square root scales are suitable for displaying data with large ranges but wanting more even distribution.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const data = [
  { city: 'Beijing', population: 2171 },
  { city: 'Shanghai', population: 2418 },
  { city: 'Guangzhou', population: 1490 },
  { city: 'Shenzhen', population: 1303 },
  { city: 'Hangzhou', population: 1000 },
  { city: 'Chengdu', population: 800 },
  { city: 'Tianjin', population: 600 },
];

chart
  .interval()
  .data(data)
  .encode('x', 'city')
  .encode('y', 'population')
  .scale('x')
  .scale('y', {
    type: 'pow',
    exponent: 0.5,
    nice: true,
  });

chart.render();
```

### Exponential Scale (exponent=2)

When you need to emphasize differences between small values, you can use a `pow` scale with `exponent > 1`. Exponential scales amplify differences between small values, suitable for displaying subtle but important changes.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const data = [
  { day: 'Mon', rate: 0.01 },
  { day: 'Tue', rate: 0.02 },
  { day: 'Wed', rate: 0.05 },
  { day: 'Thu', rate: 0.1 },
  { day: 'Fri', rate: 0.2 },
];

chart
  .interval()
  .data(data)
  .encode('x', 'day')
  .encode('y', 'rate')
  .scale('y', {
    type: 'pow',
    domain: [0, 0.2], // Input range
    range: [1, 0], // Output range, [0, 1] means y-axis direction from top to bottom, [1, 0] means y-axis direction from bottom to top
    exponent: 2,
  });

chart.render();
```

### Custom Interpolation Function

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const data = [
  { time: '2025-01', value: 0.1 },
  { time: '2025-02', value: 0.4 },
  { time: '2025-03', value: 0.9 },
];

chart
  .line()
  .data(data)
  .encode('x', 'time')
  .encode('y', 'value')
  .scale('y', {
    type: 'pow',
    domain: [0, 1],
    range: [0, 1],
    exponent: 1,
    interpolate: (a, b) => (t) => a + (b - a) * t * t, // Quadratic easing interpolation
  });

chart.render();
```
