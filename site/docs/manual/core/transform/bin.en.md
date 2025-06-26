---
title: bin
order: 2
---

## Overview

`bin` is an important function for data processing, whose main purpose is to divide continuous numerical data into discrete intervals (i.e., binning), thereby grouping the data. This operation is commonly used in data analysis and visualization to facilitate statistical analysis or display data distribution.

The core purpose of `bin` is to perform binning operations on raw data according to specified rules, converting continuous data into categorical data with multiple discrete intervals. This is particularly important in data processing and building views like histograms. For example, when you need to generate multiple intervals based on data value ranges and count their frequencies, you can use `bin`.

## Use Cases

- Data binning for counting data frequency by intervals.
- Building histogram views.
- Converting continuous data to discrete data for easier analysis.

The following example shows how to create a binning chart, displaying the distribution of two rating systems' scores across different score intervals, allowing you to intuitively observe which intervals have more ratings and which have fewer.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'rect', // Chart type is rectangle (histogram)
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/movies.json',
  },
  encode: {
    x: 'IMDB Rating', // X-axis encodes IMDB Rating
    y: 'Rotten Tomatoes Rating', // Y-axis encodes Rotten Tomatoes Rating
  },
  transform: [
    {
      type: 'bin', // Data transform type is binning
      color: 'count', // Color encoding represents the number of data points in each bin
    },
  ],
});

chart.render();
```

## Configuration

| Property    | Description                                                  | Type                | Default             |
| ----------- | ------------------------------------------------------------ | ------------------- | ------------------- |
| thresholdsX | Number of bins for x-axis                                    | number              | `d3.thresholdScott` |
| thresholdsY | Number of bins for y-axis                                    | number              | `d3.thresholdScott` |
| [channel]   | Aggregation method for channel data output to specific marks | [channel](#channel) |                     |

### thresholdsX and thresholdsY

`thresholdsX` and `thresholdsY` are two very important configuration options for defining data binning, mainly used in two-dimensional data binning (such as grid charts or heatmaps). They control the binning (interval division) rules or quantities in the X and Y directions respectively, used to divide two-dimensional continuous data into discrete grids.

```js | ob { pin: false, inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
let thresholdsX;
let thresholdsY;
chart.options({
  type: 'rect', // Chart type is rectangle (histogram)
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/movies.json',
  },
  encode: {
    x: 'IMDB Rating', // X-axis encodes IMDB Rating
    y: 'Rotten Tomatoes Rating', // Y-axis encodes Rotten Tomatoes Rating
  },
  transform: [
    {
      type: 'bin', // Data transform type is binning
      color: 'count', // Color encoding represents the number of data points in each bin
    },
  ],
});

// Insert input boxes for thresholdsX and thresholdsY
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

const thresholdsY_Text = document.createElement('span');
thresholdsY_Text.textContent = '　　thresholdsY: ';
const thresholdsY_Input = document.createElement('input');
thresholdsY_Input.setAttribute('type', 'number');
thresholdsY_Input.addEventListener('input', (e) => {
  thresholdsY = e.target.value;
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
container.appendChild(thresholdsY_Text);
container.appendChild(thresholdsY_Input);

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

### Using `bin` + `opacity` to render opacity binning

```js | ob { pin: false, inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'rect',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/movies.json',
  },
  encode: {
    x: 'IMDB Rating',
    y: 'Rotten Tomatoes Rating',
  },
  transform: [
    {
      type: 'bin', // Data transform type is binning
      opacity: 'count', // Opacity encoding represents the number of data points in each bin
      thresholdsX: 10,
      thresholdsY: 10,
    },
  ],
});

chart.render();
```

### Using `bin` + `size` to render size binning

```js | ob { pin: false, inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'point', // Chart type is point
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/movies.json',
  },
  encode: {
    x: 'IMDB Rating',
    y: 'Rotten Tomatoes Rating',
  },
  transform: [
    {
      type: 'bin', // Data transform type is binning
      size: 'count', // Size encoding represents the number of data points in each bin
      thresholdsX: 10,
      thresholdsY: 10,
    },
  ],
});

chart.render();
```
