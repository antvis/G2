---
title: binX
order: 2
---

# Overview

binX is an important function for binning data in the X channel. It is primarily used to divide continuous data into discrete intervals or groups according to specified rules, making the data easier to analyze and suitable for specific visualization scenarios (such as heatmaps, bar charts, grid charts, etc.).

Similar to bin, binX is specifically used for data binning in the X-axis direction, while bin typically handles two-dimensional (X and Y) or single-dimensional data. binX can be applied independently, binning only the data in the X channel without needing to process data in other dimensions.

## Use Cases

- Divide continuous X channel data into multiple discrete intervals: Based on the data range, generate discrete intervals (such as [0-10), [10-20), etc.) by specifying binning rules.
- Transform original data format: Through binning processing, generate new fields (such as specifying output field names) to represent the interval to which the data belongs.
- Facilitate statistical data distribution: Binned data can be directly used for visualization processing (such as counting the frequency or values within each interval).
- Process X channel data dimension independently: When the Y channel does not need binning, binX can bin only the X channel data, flexibly adjusting data processing logic.

To bin the Y channel, use binX + transpose coordinate system.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'rect',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/unemployment2.json',
  },
  encode: { x: 'rate' },
  transform: [{ type: 'binX', y: 'count' }],
});

chart.render();
```

## Configuration Options

| Property   | Description                                            | Type                | Default             |
| ---------- | ------------------------------------------------------ | ------------------- | ------------------- |
| thresholds | Number of bins for x binning                           | number              | `d3.thresholdScott` |
| [channel]  | Aggregation method for outputting data to mark channel | [channel](#channel) |                     |

### thresholdsX

`binX` is a transformation operation specifically designed for binning (discretizing) continuous data in the X-axis direction. By configuring `thresholdsX`, you can explicitly specify the binning boundaries in the X-axis direction, enabling fine-grained control over the data.

```js | ob { pin: false, inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
let thresholdsX;
chart.options({
  type: 'rect', // Chart type is rectangle (histogram)
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/movies.json',
  },
  encode: {
    x: 'IMDB Rating', // X-axis encodes IMDB rating
    y: 'Rotten Tomatoes Rating', // Y-axis encodes Rotten Tomatoes rating
  },
  transform: [
    {
      type: 'bin', // Data transformation type is binning
      color: 'count', // Use color encoding to represent the number of data points in each bin
    },
  ],
});

// Insert thresholdsX input box
const container = document.createElement('div');
const thresholdsX_Text = document.createElement('span');
thresholdsX_Text.textContent = 'thresholdsX: ';
const thresholdsX_Input = document.createElement('input');
thresholdsX_Input.setAttribute('type', 'number');
thresholdsX_Input.addEventListener('input', (e) => {
  thresholdsX = e.target.value;
  chart.options({
    transform: [
      {
        type: 'bin',
        color: 'count',
        thresholdsX,
        thresholdsY,
      },
    ],
  });
  chart.render();
});

container.appendChild(thresholdsX_Text);
container.appendChild(thresholdsX_Input);

const node = chart.getContainer();
node.insertBefore(container, node.childNodes[0]);

chart.render();
```

### channel

Theoretically, `channel` can be set to all channel values. For details, please refer to the [encode](/en/manual/core/encode) documentation. All enumeration values are as follows:

```ts
type Channel =
  | 'x'
  | 'y'
  | 'z'
  | 'x1'
  | 'y1'
  | 'series'
  | 'color'
  | 'opacity'
  | 'shape'
  | 'size'
  | 'key'
  | 'groupKey'
  | 'position'
  | 'series'
  | 'enterType'
  | 'enterEasing'
  | 'enterDuration'
  | 'enterDelay'
  | 'updateType'
  | 'updateEasing'
  | 'updateDuration'
  | 'updateDelay'
  | 'exitType'
  | 'exitEasing'
  | 'exitDuration'
  | 'exitDelay'
  | `position${number}`;
```

## Examples

### Using `bin` + `opacity` to render color-categorized histogram

```js | ob { pin: false, inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'rect',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/athletes.json',
  },
  encode: { x: 'weight', color: 'sex' },
  transform: [
    { type: 'binX', y: 'count' },
    { type: 'stackY', orderBy: 'series' },
  ],
  style: { inset: 0.5 },
});

chart.render();
```

### Poisson Distribution

```js | ob { pin: false, inject: true }
import { Chart } from '@antv/g2';

const random = d3Random.randomPoisson(Math.pow(10, 2.6));

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'rect',
  autoFit: true,
  data: new Array(5000).fill(0).map(random),
  encode: { x: (d) => d },
  transform: [{ type: 'binX', y: 'count' }],
  style: { stroke: 'white' },
  tooltip: {
    title: (d, i, data, column) => ({
      value: `${column.x.value[i]} ~ ${column.x1.value[i]}`,
    }),
  },
});

chart.render();
```
