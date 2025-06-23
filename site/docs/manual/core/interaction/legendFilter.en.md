---
title: legendFilter
order: 17
---

## Overview

`legendFilter` is an interaction feature that allows users to filter data displayed in the chart by clicking legend items. The filtering functionality supports two types of legends:

- Categorical legend: for filtering discrete data
- Continuous legend: for filtering continuous data

Through legend filtering, users can dynamically control the data items displayed in the chart, enhancing data exploration and analysis capabilities.

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7_QxQ7n7YEIAAAAAAAAAAAAADmJ7AQ/original" width="640">

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .data(temperatures)
  .encode('x', 'month')
  .encode('y', 'temperature')
  .encode('color', 'city')
  .call((chart) => chart.line())
  .call((chart) => chart.point());

chart.interaction('legendFilter', true);

chart.render();
```

## Usage

Legend filtering functionality is enabled by default when using legends.

```js
({
  type: 'interval',
  legend: {
    color: {},
    size: {},
  },
});
```

You can also manually set whether to enable it in interaction:

```js
({
  type: 'interval',
  legend: {
    color: {},
    size: {},
  },
  interaction: {
    legendFilter: true, // Enable legend filter interaction
  },
});
```

## Configuration Level

Legend filter interaction can be configured at the View level:

```js
chart.interaction('legendFilter', true);
```

## Configuration Options

The current version of the LegendFilter plugin has no configurable parameters. When calling, only the type needs to be specified:

| Property | Description                 | Type   | Default | Required |
| -------- | --------------------------- | ------ | ------- | -------- |
| type     | Interaction type identifier | string | none    | Yes      |

### Complex Type Description

The LegendFilter plugin internally automatically determines whether it's a categorical legend or continuous legend based on the legend type, and handles them differently:

- Categorical legend (className = legend-category): Click behavior is bound to filtering, supporting multi-select, cancel, and reset.
- Continuous legend (className = legend-continuous): Binds valuechange event to listen for slider changes.

The plugin automatically identifies this information through data and structure information injected into legend elements, without requiring manual specification by users.

### legend Component Configuration

For detailed documentation see [Legend component](/en/manual/component/legend)

## Events

### Getting Data

- legend:filter - Triggered when user filters through legend
- legend:reset - Triggered when all legend items are selected (reset state)

```js
chart.on('legend:filter', (e) => {
  const { nativeEvent, data } = e;
  if (!nativeEvent) return;
  console.log(data);
});

chart.on('legend:reset', (e) => {
  const { nativeEvent } = e;
  if (!nativeEvent) return;
  console.log('end');
});
```

### Triggering Interaction

- legend:filter - Trigger legend filtering
- legend:reset - Reset filter state

```js
chart.emit('legend:filter', {
  data: { channel: 'color', values: ['Sports', 'Strategy'] },
});

chart.emit('legend:reset', {});
```

## Examples

Below shows a legendfilter interaction functionality for discrete data.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  autoFit: true,
  height: 300,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/temperatures1.json',
  },
  encode: {
    x: (d) => new Date(d.date),
    y: 'value',
    color: 'condition',
  },
});

chart.render();
```
