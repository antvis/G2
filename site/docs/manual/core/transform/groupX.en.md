---
title: groupX
order: 2
---

`groupX` is a variant of the `group` function family, specifically designed for grouping discrete `x` channels and aggregating channels according to specified Reducers. It is equivalent to [group](/en/manual/core/transform/group) with `channels = ['x']`. The usage and configuration options are the same as the group function. Below, we explain the use cases and configuration options specific to the `groupX` function.

## Options

| Property  | Description                                                 | Type      | Default |
| --------- | ----------------------------------------------------------- | --------- | ------- |
| [channel] | Aggregation method for channel data output to specific mark | `Reducer` |         |

For detailed information about `Reducer`, please refer to the configuration options of the [group](/en/manual/core/transform/group) function.

## Examples

Below, we demonstrate the age distribution of different population groups. We use the `groupX` function to group the data and aggregate the `x` channel, calculating the line length and distribution of `population` for each `state`. Note that the corresponding mark has transform methods available for data transformation.

```js | ob { inject: true }
const { Chart } = G2;
const chart = new Chart({
  container: 'container',
});
chart.coordinate({ transform: [{ type: 'transpose' }] });

chart.data({
  type: 'fetch',
  value:
    'https://gw.alipayobjects.com/os/bmw-prod/b6f2ff26-b232-447d-a613-0df5e30104a0.csv',
});

chart
  .link()
  .scale('y', { formatter: '.0%' })
  .transform({ type: 'groupX', y: 'min', y1: 'max' })
  .encode('x', 'state')
  .encode('y', 'population')
  .style('stroke', '#000');

chart
  .point()
  .scale('color', { palette: 'spectral' })
  .encode('x', 'state')
  .encode('y', 'population')
  .encode('shape', 'point')
  .encode('color', 'age');

chart.render();
```

Explanation:

1. In this example, we first define a set of sales data `data`, including region, age, and population;
2. In the above code, the `transform` method uses a `groupX` type data transformation, grouping data by the `x` channel, with 'y' and 'y1' taking the minimum and maximum values respectively;
3. After grouping, the data is aggregated according to the values of the `x` channel, calculating the line length of `population` for each `state`;
4. Finally, the `encode` method maps the grouped data to the chart's `x` and `y` axis for point rendering.
