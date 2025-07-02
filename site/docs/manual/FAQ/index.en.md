---
title: 'Frequently Asked Questions (FAQ)'
order: 7
---

## Title Cannot Render After Manually Setting Padding

**Problem Description**

When using AntV G2 to draw charts, manually setting `padding` may cause the chart title to not display properly or disappear completely.

Related issue: [Title not displayed after setting](https://github.com/antvis/G2/issues/6549)

**Cause Analysis**

G2 automatically calculates the required spacing for all components by default, but once a fixed `padding` value is specified, this automatic adjustment logic is bypassed, potentially causing incomplete component display.

**Solutions**

There are two ways to solve this problem:

1. **Use Default Layout (Recommended)**

Let G2 automatically calculate the optimal spacing to ensure all components display properly:

```javascript
chart
  .interval()
  .encode('x', 'category')
  .encode('y', 'value')
  .encode('color', 'type');
```

2. Set Padding Correctly

If you really need to manually set `padding`, please ensure sufficient space is reserved for dynamically generated components:

```javascript
chart
  .padding(50)
  .interval()
  .encode('x', 'category')
  .encode('y', 'value')
  .encode('color', 'type');
```

**Notes**

- When manually setting `padding`, it's recommended to determine appropriate values through debugging
- Consider the space requirements of components like titles and legends
- When specific layout is not required, prioritize using G2's automatic layout functionality

## How to Configure Different Stroke Colors for Stacked Area Charts

**Problem Description**

When drawing stacked area charts or multi-line charts, you need to configure the chart styles. However, when directly specifying stroke colors or stroke opacity in the style, all areas or regions will apply the same style. How do you differentiate styles for different categories?

**Solution**

When configuring mark styles, not only do we support direct configuration like `string` and `number`, but also callback functions like `string | (datum, index, data, column) => string`. We can customize special styles for different filter conditions based on the parameters in the callback function. Note that the `datum` here is the data item corresponding to the mark, which depends on the mark's characteristics [Graphic Template](https://g2.antv.antgroup.com/en/manual/core/mark/overview#graphic-template). Each graphic corresponds to one or more data items. For example, scatter plots have each graphic corresponding to one data item, while area charts have one graphic corresponding to multiple data items, and `datum` will also return multiple data records.

**Examples**

- Stacked area chart with varying stroke colors

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'area',
  data: [
    { country: 'Asia', year: '1750', value: 502 },
    { country: 'Asia', year: '1800', value: 635 },
    { country: 'Asia', year: '1850', value: 809 },
    { country: 'Asia', year: '1900', value: 947 },
    { country: 'Asia', year: '1950', value: 1402 },
    { country: 'Asia', year: '1999', value: 3634 },
    { country: 'Asia', year: '2050', value: 5268 },
    { country: 'Africa', year: '1750', value: 106 },
    { country: 'Africa', year: '1800', value: 107 },
    { country: 'Africa', year: '1850', value: 111 },
    { country: 'Africa', year: '1900', value: 133 },
    { country: 'Africa', year: '1950', value: 221 },
    { country: 'Africa', year: '1999', value: 767 },
    { country: 'Africa', year: '2050', value: 1766 },
    { country: 'Europe', year: '1750', value: 163 },
    { country: 'Europe', year: '1800', value: 203 },
    { country: 'Europe', year: '1850', value: 276 },
    { country: 'Europe', year: '1900', value: 408 },
    { country: 'Europe', year: '1950', value: 547 },
    { country: 'Europe', year: '1999', value: 729 },
    { country: 'Europe', year: '2050', value: 628 },
  ],
  encode: {
    x: 'year',
    y: 'value',
    color: 'country',
  },
  transform: [{ type: 'stackY' }],
  style: {
    fillOpacity: 0.3,
    lineWidth: (datum, index, data, column) =>
      datum[0].country === 'Asia' ? 2 : 0, // Area marks have default stroke width of 0, need to explicitly set lineWidth to show stroke
    stroke: (datum, index, data, column) =>
      datum[0].country === 'Asia' ? 'red' : null,
  },
});

chart.render();
```

- Multi-line chart with differentiated styles

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/c48dbbb1-fccf-4a46-b68f-a3ddb4908b68.json',
  },
  encode: {
    x: 'date',
    y: 'value',
    color: 'type',
  },
  axis: {
    y: {
      labelFormatter: (v) =>
        `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
    },
  },
  scale: { color: { range: ['#30BF78', '#F4664A', '#FAAD14'] } }, // Custom color domain for color channel
  style: {
    lineDash: (datum, index, data, column) => {
      if (datum[0].type === 'register') return [4, 4];
    },
    lineWidth: (datum, index, data, column) => {
      if (datum[0].type !== 'register') return 2;
    },
  },
});

chart.render();
```

- Multi-shape scatter plot

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'point',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/bd73a175-4417-4749-8b88-bc04d955e899.csv',
  },
  encode: {
    x: 'x',
    y: 'y',
    shape: 'category',
    color: 'category',
    size: () => 1,
  },
  legend: {
    size: false,
  },
  scale: {
    shape: { range: ['circle', 'plus', 'diamond'] },
    size: { rangeMin: 5 }, // Set minimum domain for size channel scale to 5
  }, // Define shape domain for shape channel
  transform: [{ type: 'groupX', size: 'sum' }], // Group discrete x channel and map sum to size channel
  style: {
    fillOpacity: (datum, index, data, column) =>
      datum.category !== 'setosa' ? 0.8 : 0,
    stroke: (datum, index, data, column) => {
      if (datum.category !== 'setosa') {
        return '#FADC7C';
      }
    },
    lineWidth: (datum, index, data, column) =>
      datum.category !== 'setosa' ? 1 : 2,
  },
});

chart.render();
```

## Tooltip Shows Too Much Information and Doesn't Disappear When Moving Mouse

**Problem Description**

In business scenarios, tooltip needs to display a lot of information, so `enterable: true` is configured to support scrolling when hovering. However, when moving the mouse, tooltip sometimes doesn't close properly, causing obstruction and lag effects on the chart.

**Cause Analysis and Solutions**

- Obstruction Issue

G2's internal algorithm tries to constrain the tooltip within the chart, but if the chart height is too small, even with automatic tooltip position calculation, it will still overflow the chart.

- Freezing Issue

The chart area is too small, and moving directly from inside the tooltip to outside the chart doesn't trigger the tooltip disappear event, which is bound to the chart.

- Solution

Both issues are caused by the chart area being too small and tooltip taking up too much space (more than half). It's recommended to reduce tooltip area (scrolling is already available) or increase chart area.

## How to Prevent Graphic Marks from Exceeding Maximum or Minimum Scale Values

```js | ob { pin: false, inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  data: [
    { year: '1991', value: 15468 },
    { year: '1992', value: 16100 },
    { year: '1993', value: 15900 },
    { year: '1994', value: 17409 },
    { year: '1995', value: 17000 },
    { year: '1996', value: 31056 },
    { year: '1997', value: 31982 },
    { year: '1998', value: 32040 },
    { year: '1999', value: 33233 },
  ],
  children: [
    {
      type: 'area',
      encode: { x: (d) => d.year, y: 'value', shape: 'area' },
      style: { opacity: 0.2 },
      axis: { y: { labelFormatter: '~s', title: false } },
    },
    { type: 'line', encode: { x: 'year', y: 'value', shape: 'line' } },
  ],
});

chart.render();
```

**Solution**

Configure the `nice` property of the scale that needs adjustment to true, extending the domain range to make the output ticks display more friendly.

```js
({
  scale: {
    y: {
      nice: true,
    },
  },
});
```

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  data: [
    { year: '1991', value: 15468 },
    { year: '1992', value: 16100 },
    { year: '1993', value: 15900 },
    { year: '1994', value: 17409 },
    { year: '1995', value: 17000 },
    { year: '1996', value: 31056 },
    { year: '1997', value: 31982 },
    { year: '1998', value: 32040 },
    { year: '1999', value: 33233 },
  ],
  scale: {
    y: {
      nice: true, // Extend y channel scale domain range to make output ticks display more friendly
    },
  },
  children: [
    {
      type: 'area',
      encode: { x: (d) => d.year, y: 'value', shape: 'area' },
      style: { opacity: 0.2 },
      axis: { y: { labelFormatter: '~s', title: false } },
    },
    { type: 'line', encode: { x: 'year', y: 'value', shape: 'line' } },
  ],
});

chart.render();
```

## How to Invert Chart's Y-Axis So Values Increase from Top to Bottom

**Problem Description**

In business scenarios, you may need the y-axis domain to display opposite to normal coordinate axis, making values increase from top to bottom. In other words, smaller y channel values should appear higher in the chart, suitable for scenarios where smaller numbers represent greater weight, such as rankings.

**Solution**

- Adjust the y channel scale range, which defaults to `[1,0]`. If inversion is needed, adjust to `[0,1]`. For better appearance, you can also adjust the x-axis position accordingly.

Here's an example of a top-to-bottom bar chart. The same principle applies when creating left-to-right bar charts. (Note that bar charts are column charts with transposed coordinate axis, where left-right corresponds to the x-axis)

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { letter: 'A', frequency: 0.08167 },
    { letter: 'B', frequency: 0.01492 },
    { letter: 'C', frequency: 0.02782 },
    { letter: 'D', frequency: 0.04253 },
    { letter: 'E', frequency: 0.12702 },
  ],
  encode: { x: 'letter', y: 'frequency' },
  scale: { y: { range: [0, 1] } },
  axis: { x: { position: 'top' } },
});

chart.render();
```

- For some marks like area charts, when we use the above method to invert, the filled area will also move to the upper half of the chart, which may not meet expectations in certain business scenarios, such as ranking trend charts. In such cases, more customized handling is needed combining `encode.y`, `axis.y.labelFormatter`, and other properties.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  paddingRight: 10,
  data: [
    { month: 'January', rank: 200 },
    { month: 'February', rank: 160 },
    { month: 'March', rank: 100 },
    { month: 'April', rank: 80 },
    { month: 'May', rank: 99 },
    { month: 'June', rank: 36 },
    { month: 'July', rank: 40 },
    { month: 'August', rank: 20 },
    { month: 'September', rank: 12 },
    { month: 'October', rank: 15 },
    { month: 'November', rank: 6 },
    { month: 'December', rank: 1 },
  ],
  scale: {
    y: {
      nice: true,
      tickMethod: () => [0, 50, 100, 170, 199],
    },
  },
  axis: {
    y: {
      labelFormatter: (d) => `Rank ${200 - d}`,
    },
  },
  children: [
    {
      type: 'area',
      encode: { x: (d) => d.month, y: (d) => 200 - d.rank, shape: 'smooth' },
      style: { opacity: 0.2 },
      axis: { y: { labelFormatter: '~s', title: false } },
      style: {
        fill: 'l(270) 0:#ffffff 0.9:#7ec2f3 1:#1890ff',
        fillOpacity: 0.2,
      },
      tooltip: false,
    },
    {
      type: 'line',
      encode: { x: (d) => d.month, y: (d) => 200 - d.rank, shape: 'smooth' },
      interaction: {
        tooltip: {
          render: (event, { title, items }) => `
<div style="display: flex; align-items: center;">
  <span>${title}: Rank </span>
  <h2
    style="
        margin-left: 8px; 
        margin-right: 8px; 
        margin-top:4px;
        font-size: 18px; 
        line-height: 36px; 
        font-weight: 500px"
  >
    ${200 - items[0].value}
  </h2>
</div>
          `,
        },
      },
      style: {
        lineWidth: 2,
      },
    },
  ],
});

chart.render();
```

## How to Adjust Spacing at Both Ends of Line Charts

Below is a simple line chart where you can see the x-axis has obvious `paddingOuter` with a default value of `0.5`.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  viewStyle: {
    contentFill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
  },
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
  labels: [{ text: 'value', style: { dx: -10, dy: -12 } }],
  encode: { x: 'year', y: 'value' },
  scale: { y: { domainMin: 0, nice: true } },
});

chart.render();
```

Point scale is a band scale with constant bandWidth of 0, internally fixing the following properties:

```js
padding: 0.5, // Internal assignment
paddingInner: 1, // Cannot be modified
paddingOuter: 0.5 // Internal assignment
```

If you want to customize the `paddingOuter` value, you can achieve this by modifying `padding`. For example:

```js
(scale: {
  x: {
    type: 'point',
    padding: 0, // Only affects paddingOuter, paddingInner is always 1
  },
});
```

Through configuration, you can make the spacing at both ends of the line chart equal to `0`.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  viewStyle: {
    contentFill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
  },
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
  labels: [{ text: 'value', style: { dx: -10, dy: -12 } }],
  encode: { x: 'year', y: 'value' },
  scale: {
    y: { domainMin: 0, nice: true },
    x: {
      padding: 0,
    },
  },
});

chart.render();
```

## Default Display of Only Partial Legends on First Chart Render

There's currently no built-in API for this, so you need to manually trigger legendFilter to achieve it.

```js | ob { inject: true }
import { Chart, ChartEvent } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 100 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold', color: 'genre' },
});

chart.render();

chart.on(ChartEvent.AFTER_RENDER, () => {
  chart.emit('legend:filter', {
    data: { channel: 'color', values: ['Sports', 'Strategy', 'Action'] },
  });
});
```

You can set `animate: false` to avoid triggering update animations, but there will still be flickering. This will be handled internally through configuration options in the future to achieve better filtering effects.
