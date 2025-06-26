---
title: sample
order: 2
---

For line, column, bar, and scatter plot charts, when the data volume is significantly larger than the screen pixels, enabling some built-in sampling strategies can effectively optimize chart rendering efficiency. This feature is disabled by default, meaning all original data is rendered.

## Getting Started

Here's an example of using `sample`:

<img alt="sample" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Qs_nRauYpbQAAAAAAAAAAAAADmJ7AQ/original" width="600" />

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.data(data);

chart.line().encode('x', 'x').encode('y', 'y').transform({
  type: 'sample',
  thresholds: 500,
  strategy: 'max',
});

chart.render();
```

## Options

| Property   | Description                                          | Type                   | Default  |
| ---------- | ---------------------------------------------------- | ---------------------- | -------- |
| groupBy    | Field for data grouping                              | `string` \| `string[]` | `series` |
| thresholds | Data volume threshold for enabling sampling strategy | `number`               | `2000`   |
| strategy   | Sampling strategy to use                             | `Strategy`             | `median` |

`strategy` has 6 built-in strategies:

- `lttb` - Uses the Largest-Triangle-Three-Bucket algorithm, which can best preserve the trend, shape, and extreme values of the line after sampling.
- `median` - Takes the median of filtered points
- `max` - Takes the maximum value of filtered points
- `min` - Takes the minimum value of filtered points
- `first` - Takes the first value
- `last` - Takes the last value
- `(I: number[], X: number[], Y: number[], thresholds: number) => number[]` - Uses a custom function for sampling

## FAQ

- How to implement a custom sampling strategy?

```ts
function strategy(I: number[], X: number[], Y: number[], thresholds: number) {
  // Sample this group of data here and return an array of data indices
  return [1, 101, 202 /*...*/];
}

chart
  .line()
  .encode('x', 'x')
  .encode('y', 'y')
  .transform([{ type: 'sample', strategy }]);
```
