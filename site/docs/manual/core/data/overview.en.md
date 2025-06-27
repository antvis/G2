---
title: Overview
order: 1
---

In G2, **Data** is primarily used to specify the data to be visualized and data transformation (pre-processing).

## Usage Methods

There are three main ways to configure data.

- First method: Set `type: inline`, which defines an inline connector that directly passes in specific data. This is the default data source type in G2.

```js
({
  data: {
    type: 'inline', // Specify inline type
    value: [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ],
  },
});
```

- Second method: Set `type: fetch`, which defines a remote connector that obtains data from remote interfaces, making data sources dynamic. It supports parsing JSON, CSV and other formats, adapts to multi-scenario data integration, and improves development efficiency and interactive experience for applications like dashboards and monitoring systems.

```js
({
  data: {
    type: 'fetch', // Specify fetch type
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json', // Remote address
  },
});
```

- Third method: This is syntactic sugar for the first method. If the data meets the following three conditions, you can directly specify the data value:

1. Inline data
2. Is an array
3. No data transformation

```js
({
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
});
```

## Configuration Levels

Data can be specified at the View level:

```js
({
  type: 'view',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
});
```

Data bound to a view is transitive: it will be passed to marks in `view.children`. If the mark does not have data, its data will be set; otherwise, there is no effect. This means that for marks that share data, you can bind the data to the view.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
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
  children: [
    { type: 'line', encode: { x: 'year', y: 'value' } },
    { type: 'point', encode: { x: 'year', y: 'value' } },
  ],
});
chart.render();
```

Data can also be specified at the Mark level:

```js
({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
});
```

Each mark has its own data, which means we can visualize multiple datasets in one view, such as the following interval annotation chart:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  children: [
    {
      type: 'rangeX',
      data: [
        { year: [new Date('1933'), new Date('1945')], event: 'Nazi Rule' },
        {
          year: [new Date('1948'), new Date('1989')],
          event: 'GDR (East Germany)',
        },
      ],
      encode: { x: 'year', color: 'event' },
      scale: { color: { independent: true, range: ['#FAAD14', '#30BF78'] } },
      style: { fillOpacity: 0.75 },
      tooltip: false,
    },
    {
      type: 'line',
      data: {
        type: 'fetch',
        value: 'https://assets.antv.antgroup.com/g2/year-population.json',
      },
      encode: { x: (d) => new Date(d.year), y: 'population', color: '#333' },
    },
  ],
});

chart.render();
```

## DataTransform

A complete data declaration consists of two parts: **Connector** and **DataTransform**. Connector is the way to get data, specified by `data.type`, and data transform is the pre-processing function, specified by `data.transform`.

```js
({
  data: {
    type: 'fetch', // Specify connector type
    // Specify connector value
    value:
      'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
    transform: [
      // Specify transforms, multiple can be specified
      { type: 'filter', callback: (d) => d.sex === 'gender' },
      {
        type: 'sort',
        callback: (a, b) => b.a - a.a,
      },
    ],
  },
});
```

Currently, G2 has the following built-in data transforms:

| type   | Description                                                                                            | Properties                             |
| ------ | ------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| custom | Custom data processing logic that allows users to define their own operation methods                   | [custom](/en/manual/core/data/custom)  |
| ema    | Calculate exponential moving average for data smoothing                                                | [ema](/en/manual/core/data/ema)        |
| filter | Filter data based on specified conditions                                                              | [filter](/en/manual/core/data/filter)  |
| fold   | Unfold multiple fields into specified key-value organization format for easier processing and analysis | [fold](/en/manual/core/data/fold)      |
| join   | Merge two data tables based on certain conditions to associate corresponding data rows                 | [join](/en/manual/core/data/join)      |
| kde    | Estimate data distribution density, commonly used for probability density analysis                     | [kde](/en/manual/core/data/kde)        |
| log    | Print current data in the data transform flow to console for developers to debug data processing       | [log](/en/manual/core/data/log)        |
| map    | Perform mapping operations on data, converting one type of value to another                            | [map](/en/manual/core/data/map)        |
| pick   | Select specified fields from data for extracting specific information                                  | [pick](/en/manual/core/data/pick)      |
| rename | Rename data fields for easier subsequent processing and reading                                        | [rename](/en/manual/core/data/rename)  |
| slice  | Extract a subset of data, equivalent to data pagination or cropping                                    | [slice](/en/manual/core/data/slice)    |
| sort   | Sort data with support for custom sorting rules                                                        | [sort](/en/manual/core/data/sort)      |
| sortBy | Sort data by a specified field                                                                         | [sortBy](/en/manual/core/data/sort-by) |

## Data Update

Since data is bound to marks, data updating can be a bit complex. Using the following example:

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const interval = chart
  .interval()
  .data([
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ])
  .encode('x', 'genre')
  .encode('y', 'sold');

chart.render();
```

There are several ways to update the interval data in the above example:

- First method: The most basic approach.

```js
// Update the data bound to interval
interval.data(newData);

// Update chart rendering through chart
chart.render();
```

- Second method: Syntactic sugar for the above approach.

```js
// Update interval data and render the chart
interval.changeData(newData);
```

- Third method: Get the interval object through query API, then update data.

```js
chart.getNodesByType('rect')[0].changeData(data);
```

Here's an example of a line chart that updates data in real-time:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

// Format function: Convert timestamp to hh:mm:ss format
function formatTime(timestamp) {
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, '0'); // Pad to two digits
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

const data = [];

chart.options({
  type: 'line',
  data: [],
  encode: {
    x: (d) => formatTime(d.time),
    y: 'temperature',
    color: 'type',
    shape: 'smooth',
    size: 2,
  },
  scale: {
    x: {
      nice: true,
    },
  },
});

chart.render();

setInterval(function () {
  const now = new Date();
  const time = now.getTime();

  const temperature1 = ~~(Math.random() * 5) + 22;
  const temperature2 = ~~(Math.random() * 7) + 17;

  if (data.length >= 200) {
    data.shift();
    data.shift();
  }

  data.push({
    time, // Use formatted time
    temperature: temperature1,
    type: 'Record 1',
  });
  data.push({
    time, // Use formatted time
    temperature: temperature2,
    type: 'Record 2',
  });

  chart.changeData(data);
}, 1000);
```

## Examples

- How to use third-party libraries to draw statistical regression lines?

With the custom data transform capability, we can configure:

```js
({
  data: {
    transform: [
      {
        type: 'custom',
        callback: customFn(), // Custom data processing function
      },
    ],
  },
});
```

The `customFn` here can use external data processing libraries, greatly expanding G2's data processing capabilities. In the following example, we use the third-party library [d3-regression](https://github.com/HarryStevens/d3-regression) to generate linear statistical regression lines:

```js
import { regressionLinear } from 'd3-regression';

node.data({
  // Use D3's regressionLinear to perform linear regression on data
  transform: [
    {
      type: 'custom',
      callback: regressionLinear(),
    },
  ],
});
```

For more statistical regression line examples, see [Data Analysis - Regression Lines](/en/examples#analysis-regression).
