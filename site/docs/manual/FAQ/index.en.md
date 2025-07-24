---
title: 'Frequently Asked Questions (FAQ)'
order: 7
---

## Title Cannot Render After Manually Setting Padding

**Problem Description**

When using AntV G2 to draw charts, manually setting `padding` may cause the chart title or other chart components to not display properly or disappear completely.

Related issue: [Title not displayed after setting](https://github.com/antvis/G2/issues/6549)

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'area',
  padding: 20,
  title: {
    align: 'center',
    title: 'This is a chart title.',
    subtitle: 'Displayed are sampled values.',
  },
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
  },
});

chart.render();
```

**Cause Analysis**

G2 automatically calculates the required spacing for all components by default, but once a fixed `padding` value is specified, this automatic adjustment logic is bypassed, potentially causing incomplete component display.

**Solutions**

There are two ways to solve this problem:

1. **Use Default Layout (Recommended)**

Don't manually set `padding`, let G2 automatically calculate the optimal spacing to ensure all components display properly:

```js | ob { inject: true, pin: false }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'area',
  title: {
    align: 'center',
    title: 'This is a chart title.',
    subtitle: 'Displayed are sampled values.',
  },
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
  },
});

chart.render();
```

2. Set Padding Correctly

If you really need to manually set `padding`, please ensure sufficient space is reserved for dynamically generated components:

```js | ob { inject: true, pin: false }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'area',
  paddingTop: 100,
  title: {
    align: 'center',
    title: 'This is a chart title.',
    subtitle: 'Displayed are sampled values.',
  },
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
  },
});

chart.render();
```

You can also pass `paddingTop` when creating the `Chart` instance, which works exactly the same:

```javascript
const chart = new Chart({
  container: 'container',
  paddingTop: 100,
});
```

**Notes**

- When manually setting `padding`, it's recommended to determine appropriate values through debugging
- Consider the space requirements of components like titles and legends
- When specific layout is not required, prioritize using G2's automatic layout functionality

See the detailed documentation on [Chart Layout](/en/manual/core/chart/chart-component#chart-layout).

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

## How to Detect If Mouse Has Left Chart Container

**Problem Description**

In certain interactive scenarios, you need to listen for whether the mouse has moved outside the chart container boundaries to execute corresponding business logic, such as hiding tooltips, resetting highlight states, etc.

**Solution**

You can detect mouse enter and leave states by listening to DOM events on the chart container.

```js | ob { inject: true }
import { Chart, ChartEvent } from '@antv/g2';

const chart = new Chart({ container: 'container', autoFit: true });

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
  viewStyle: {
    viewFill: 'blue',
    viewFillOpacity: 0.3,
  },
});

chart.render();

let containerMouseEntered = false;

chart.on('afterrender', () => {
  // Get chart container DOM element
  const container = chart.getContainer();

  // Create status display panel
  const statusPanel = document.createElement('div');
  statusPanel.id = 'mouse-status-panel';
  statusPanel.style.cssText = `
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 12px;
    border-radius: 6px;
    font-family: monospace;
    font-size: 12px;
    line-height: 1.4;
    z-index: 1000;
    min-width: 220px;
  `;

  // Update status display
  const updateStatus = (isInside, eventInfo = {}) => {
    const status = isInside ? '✅ Mouse inside container' : '❌ Mouse outside container';
    const containerRect = container.getBoundingClientRect();

    statusPanel.innerHTML = `
      <div style="font-weight: bold; margin-bottom: 8px;">${status}</div>
      <div>Container size: ${container.offsetWidth} × ${container.offsetHeight}</div>
      <div>Container position: (${Math.round(containerRect.left)}, ${Math.round(
      containerRect.top,
    )})</div>
      ${
        eventInfo.clientX !== undefined
          ? `<div>Mouse coordinates: (${eventInfo.clientX}, ${eventInfo.clientY})</div>`
          : ''
      }
      ${eventInfo.type ? `<div>Event type: ${eventInfo.type}</div>` : ''}
      <div style="margin-top: 8px; font-size: 11px; opacity: 0.8;">
        Move mouse over the chart to try!
      </div>
    `;
  };

  if (container) {
    // Add status panel to container's parent element
    container.parentElement.style.position = 'relative';
    container.parentElement.appendChild(statusPanel);

    // Initialize display
    updateStatus(false);

    // Listen for mouse entering container
    container.addEventListener('mouseenter', (e) => {
      containerMouseEntered = true;
      updateStatus(true, {
        type: e.type,
        clientX: e.clientX,
        clientY: e.clientY,
      });
    });

    // Listen for mouse moving within container
    container.addEventListener('mousemove', (e) => {
      if (containerMouseEntered) {
        updateStatus(true, {
          type: e.type,
          clientX: e.clientX,
          clientY: e.clientY,
        });
      }
    });

    // Listen for mouse leaving container
    container.addEventListener('mouseleave', (e) => {
      if (containerMouseEntered) {
        containerMouseEntered = false;
        updateStatus(false, {
          type: e.type,
          clientX: e.clientX,
          clientY: e.clientY,
        });
      }
    });
  }
});
```

**Complete Example**

Here's a complete example showing how to control tooltip display and hiding through event triggers. When clicking on an element, the tooltip shows; when clicking on empty area or when the mouse leaves the container, the tooltip hide event is manually triggered.

```js | ob { inject: true }
import { Chart, ChartEvent } from '@antv/g2';

const chart = new Chart({ container: 'container', autoFit: true });

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
  viewStyle: {
    viewFill: 'blue',
    viewFillOpacity: 0.3,
  },
  interaction: {
    tooltip: {
      disableNative: true, // Disable pointerover and pointerout events.
    },
  },
});

chart.render();

let containerMouseEntered = false;

chart.on('afterrender', () => {
  // Get chart container DOM element
  const container = chart.getContainer();

  if (container) {
    // Listen for mouse entering container
    container.addEventListener('mouseenter', (e) => {
      containerMouseEntered = true;
    });

    // Listen for mouse leaving container
    container.addEventListener('mouseleave', (e) => {
      if (containerMouseEntered) {
        containerMouseEntered = false;
        chart.emit('tooltip:hide');
      }
    });
  }
});

chart.on('element:click', ({ data }) => chart.emit('tooltip:show', { data }));
chart.on('plot:click', () => chart.emit('tooltip:hide'));
```

## How to Adjust Legend Component Size and Layout

**Problem Description**

When using G2 to draw charts, the default legend position and size may not meet business requirements. You need precise control over the legend's position, alignment, dimensions, and spacing from the chart.

**Solution**

G2 provides multiple configuration options to precisely control legend size and layout:

**Basic Position Configuration**

Use `position` to set the legend's basic position:

```js
legend: {
  color: {
    position: 'top', // 'top' | 'right' | 'left' | 'bottom'
  }
}
```

**Precise Alignment Configuration**

Use `layout` to configure the legend's precise alignment using Flexbox layout model:

```js
legend: {
  color: {
    position: 'top',
    layout: {
      justifyContent: 'center',    // Main axis alignment: 'flex-start' | 'center' | 'flex-end'
      alignItems: 'flex-start',    // Cross axis alignment: 'flex-start' | 'center' | 'flex-end'
      flexDirection: 'row',        // Main axis direction: 'row' | 'column'
    }
  }
}
```

**Size Control Configuration**

- **size**: Controls legend size on the cross axis (height for horizontal layout, width for vertical layout)
- **length**: Controls legend size on the main axis (width for horizontal layout, height for vertical layout)
- **crossPadding**: Controls distance between legend and chart area

```js
legend: {
  color: {
    size: 80,         // Legend cross axis size
    length: 300,      // Legend main axis length
    crossPadding: 20, // Distance from chart
  }
}
```

**Complete Example**

Here are several common legend layout scenarios:

```js | ob { inject: true, pin: false }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 400,
  width: 600,
});
const container = chart.getContainer();

const data = [
  { genre: 'Sports', sold: 50 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

chart.options({
  type: 'interval',
  data,
  encode: { x: 'genre', y: 'sold', color: 'genre' },
  legend: {
    color: {
      position: 'top',
      layout: {
        justifyContent: 'center', // Horizontal center
        alignItems: 'flex-start',
      },
      size: 60, // Control legend cross axis size
      length: 250, // Control legend main axis length
      crossPadding: 20, // Distance from chart
    },
  },
});

// Create layout selector
const controlPanel = document.createElement('div');
controlPanel.style.cssText = `
  margin-bottom: 16px;
  padding: 16px;
  background: #f5f5f5;
  border-radius: 8px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

// Layout scenario selector
const sceneContainer = document.createElement('div');
sceneContainer.innerHTML = `
  <label style="display: block; margin-bottom: 8px; font-weight: bold;">
    Select layout scenario:
  </label>
`;

const sceneSelect = document.createElement('select');
sceneSelect.style.cssText = 'width: 100%; padding: 4px;';
const scenes = [
  { label: 'Top center (Dashboard style)', value: 'top-center' },
  { label: 'Right vertical center (Detailed chart)', value: 'right-center' },
  { label: 'Bottom left aligned (Space saving)', value: 'bottom-start' },
  { label: 'Left bottom aligned', value: 'left-end' },
  { label: 'Right top aligned (Compact)', value: 'right-start' },
];

sceneSelect.innerHTML = scenes
  .map(
    (scene, index) =>
      `<option value="${scene.value}" ${index === 0 ? 'selected' : ''}>${
        scene.label
      }</option>`,
  )
  .join('');

sceneContainer.appendChild(sceneSelect);

// Size control
const sizeContainer = document.createElement('div');
sizeContainer.innerHTML = `
  <label style="display: block; margin-bottom: 8px; font-weight: bold;">
    Legend size control:
  </label>
  <div style="margin-bottom: 8px;">
    <label>crossPadding (Distance from chart): </label>
    <input type="range" id="crossPadding" min="5" max="50" value="20" style="width: 100%;">
    <span id="crossPaddingValue">20</span>
  </div>
  <div style="margin-bottom: 8px;">
    <label>size (Cross axis size): </label>
    <input type="range" id="size" min="40" max="200" value="60" style="width: 100%;">
    <span id="sizeValue">60</span>
  </div>
  <div>
    <label>length (Main axis length): </label>
    <input type="range" id="length" min="40" max="400" value="250" style="width: 100%;">
    <span id="lengthValue">250</span>
  </div>
`;

controlPanel.appendChild(sceneContainer);
controlPanel.appendChild(sizeContainer);

const updateChart = () => {
  const selectedScene = sceneSelect.value;
  const crossPadding = parseInt(document.getElementById('crossPadding').value);
  const size = parseInt(document.getElementById('size').value);
  const length = parseInt(document.getElementById('length').value);

  let position, justifyContent;

  switch (selectedScene) {
    case 'top-center':
      position = 'top';
      justifyContent = 'center';
      break;
    case 'right-center':
      position = 'right';
      justifyContent = 'center';
      break;
    case 'bottom-start':
      position = 'bottom';
      justifyContent = 'flex-start';
      break;
    case 'left-end':
      position = 'left';
      justifyContent = 'flex-end';
      break;
    case 'right-start':
      position = 'right';
      justifyContent = 'flex-start';
      break;
  }

  chart.options({
    legend: {
      color: {
        position,
        layout: {
          justifyContent,
          alignItems: 'flex-start',
        },
        size,
        length,
        crossPadding,
      },
    },
  });
  chart.render();
};

// Bind events
sceneSelect.addEventListener('change', updateChart);

document.addEventListener('DOMContentLoaded', () => {
  const crossPaddingSlider = document.getElementById('crossPadding');
  const crossPaddingValue = document.getElementById('crossPaddingValue');
  const sizeSlider = document.getElementById('size');
  const sizeValue = document.getElementById('sizeValue');
  const lengthSlider = document.getElementById('length');
  const lengthValue = document.getElementById('lengthValue');

  if (crossPaddingSlider && crossPaddingValue) {
    crossPaddingSlider.addEventListener('input', (e) => {
      crossPaddingValue.textContent = e.target.value;
      updateChart();
    });
  }

  if (sizeSlider && sizeValue) {
    sizeSlider.addEventListener('input', (e) => {
      sizeValue.textContent = e.target.value;
      updateChart();
    });
  }

  if (lengthSlider && lengthValue) {
    lengthSlider.addEventListener('input', (e) => {
      lengthValue.textContent = e.target.value;
      updateChart();
    });
  }
});

// Insert control panel
container.insertBefore(controlPanel, container.firstChild);

// Initial render
chart.render();

// Ensure slider events are properly bound
setTimeout(() => {
  const crossPaddingSlider = document.getElementById('crossPadding');
  const crossPaddingValue = document.getElementById('crossPaddingValue');
  const sizeSlider = document.getElementById('size');
  const sizeValue = document.getElementById('sizeValue');
  const lengthSlider = document.getElementById('length');
  const lengthValue = document.getElementById('lengthValue');

  if (crossPaddingSlider && crossPaddingValue) {
    crossPaddingSlider.addEventListener('input', (e) => {
      crossPaddingValue.textContent = e.target.value;
      updateChart();
    });
  }

  if (sizeSlider && sizeValue) {
    sizeSlider.addEventListener('input', (e) => {
      sizeValue.textContent = e.target.value;
      updateChart();
    });
  }

  if (lengthSlider && lengthValue) {
    lengthSlider.addEventListener('input', (e) => {
      lengthValue.textContent = e.target.value;
      updateChart();
    });
  }
}, 100);
```

See the complete documentation on [Legend Component](/en/manual/component/legend) for more configuration options.

## How to Implement a Line Chart with Prediction Data

**Problem Description**

In data visualization, it's often necessary to draw line charts containing both actual values and predicted values, where the actual value portion is represented by solid lines and the predicted value portion by dashed lines, so users can clearly distinguish between historical data and prediction data.

**Solution**

In G2, one line corresponds to one Mark, and you cannot set different styles within the same line. To achieve mixed solid and dashed line effects, you need to:

**Core Approach**: Group data by type (actual/predicted), use `series` encoding to create multiple line segments, then set different styles for different types of line segments through `style` callback functions.

**Key Configuration**:

1. **Data Grouping**: Ensure connection point data exists in both groups to maintain line continuity
2. **encode Configuration**:
   - `color`: Used for legend grouping, different groups show different colors
   - `series`: Used to create multiple line segments, data points with the same series value will be connected as one line
3. **Style Callback**: Set solid or dashed lines based on data type through `style.lineDash` callback function

**Example Code**

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'view',
  autoFit: true,
  data: [
    // Product A actual data
    {
      year: '2018',
      value: 80,
      product: 'Product A',
      type: 'Actual',
      series: 'Product A-Actual',
    },
    {
      year: '2019',
      value: 95,
      product: 'Product A',
      type: 'Actual',
      series: 'Product A-Actual',
    },
    {
      year: '2020',
      value: 100,
      product: 'Product A',
      type: 'Actual',
      series: 'Product A-Actual',
    },
    {
      year: '2021',
      value: 120,
      product: 'Product A',
      type: 'Actual',
      series: 'Product A-Actual',
    },
    {
      year: '2022',
      value: 110,
      product: 'Product A',
      type: 'Actual',
      series: 'Product A-Actual',
    },
    // Product A prediction data (note 2022 connection point duplication)
    {
      year: '2022',
      value: 110,
      product: 'Product A',
      type: 'Prediction',
      series: 'Product A-Prediction',
    },
    {
      year: '2023',
      value: 125,
      product: 'Product A',
      type: 'Prediction',
      series: 'Product A-Prediction',
    },
    {
      year: '2024',
      value: 140,
      product: 'Product A',
      type: 'Prediction',
      series: 'Product A-Prediction',
    },
    {
      year: '2025',
      value: 160,
      product: 'Product A',
      type: 'Prediction',
      series: 'Product A-Prediction',
    },
    {
      year: '2026',
      value: 180,
      product: 'Product A',
      type: 'Prediction',
      series: 'Product A-Prediction',
    },

    // Product B actual data
    {
      year: '2018',
      value: 60,
      product: 'Product B',
      type: 'Actual',
      series: 'Product B-Actual',
    },
    {
      year: '2019',
      value: 70,
      product: 'Product B',
      type: 'Actual',
      series: 'Product B-Actual',
    },
    {
      year: '2020',
      value: 80,
      product: 'Product B',
      type: 'Actual',
      series: 'Product B-Actual',
    },
    {
      year: '2021',
      value: 90,
      product: 'Product B',
      type: 'Actual',
      series: 'Product B-Actual',
    },
    {
      year: '2022',
      value: 95,
      product: 'Product B',
      type: 'Actual',
      series: 'Product B-Actual',
    },
    // Product B prediction data
    {
      year: '2022',
      value: 95,
      product: 'Product B',
      type: 'Prediction',
      series: 'Product B-Prediction',
    },
    {
      year: '2023',
      value: 100,
      product: 'Product B',
      type: 'Prediction',
      series: 'Product B-Prediction',
    },
    {
      year: '2024',
      value: 110,
      product: 'Product B',
      type: 'Prediction',
      series: 'Product B-Prediction',
    },
    {
      year: '2025',
      value: 125,
      product: 'Product B',
      type: 'Prediction',
      series: 'Product B-Prediction',
    },
    {
      year: '2026',
      value: 145,
      product: 'Product B',
      type: 'Prediction',
      series: 'Product B-Prediction',
    },
  ],
  encode: {
    x: 'year',
    y: 'value',
    color: 'product', // Used for legend grouping (product dimension)
    series: 'series', // Used to create line segments (product-type combination)
  },
  scale: {
    x: { range: [0, 1] },
    y: { nice: true },
  },
  axis: {
    x: { title: 'Year' },
    y: { title: 'Sales (10k yuan)' },
  },
  children: [
    {
      type: 'line',
      encode: { shape: 'smooth' },
      style: {
        lineWidth: 2,
        lineDash: (d) => {
          // Set line type based on data type: prediction data uses dashed line, actual data uses solid line
          return d[0].type === 'Prediction' ? [4, 4] : null;
        },
      },
    },
    {
      type: 'point',
      encode: { shape: 'circle' },
      style: { size: 3 },
    },
  ],
});

chart.render();
```

**Key Points**

1. **Data Structure Design**: Each data item includes `product` (product), `type` (actual/prediction), `series` (line segment identifier) fields

2. **Connection Point Handling**: 2022 data exists in both actual and prediction groups to ensure line continuity

3. **Encoding Configuration**:

   - `color: 'product'`: Group by product, generate legend
   - `series: 'series'`: Group by combination field, create independent line segments

4. **Style Callback**:
   ```js
   style: {
     lineDash: (d) => (d[0].type === 'Prediction' ? [4, 4] : null);
   }
   ```

**Notes**

- `series` encoding determines which data points will be connected as one line
- `color` encoding affects legend display and color mapping
- `d[0]` in style callback function represents the first data point corresponding to the current line segment
- Connection points (such as 2022 in the example) must exist in both groups

## How to Implement Color-Grouped Bar Charts

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const data = [
  { category: 'Frontend Development', type: 'HTML Structure', score: 3.48 },
  { category: 'Frontend Development', type: 'CSS Styling', score: 3.52 },
  { category: 'Frontend Development', type: 'JavaScript Programming', score: 3.31 },
  { category: 'Frontend Development', type: 'React Framework', score: 3.28 },
  { category: 'Backend Development', type: 'Java Programming', score: 3.35 },
  { category: 'Backend Development', type: 'Database Design', score: 3.58 },
  { category: 'Backend Development', type: 'API Development', score: 3.12 },
  { category: 'Backend Development', type: 'Microservice Architecture', score: 3.45 },
  { category: 'Data Analysis', type: 'Python Data Processing', score: 3.42 },
  { category: 'Data Analysis', type: 'SQL Query Optimization', score: 3.33 },
  { category: 'Data Analysis', type: 'Machine Learning Modeling', score: 3.56 },
  { category: 'Data Analysis', type: 'Data Visualization', score: 3.39 },
  { category: 'Product Design', type: 'User Experience Design', score: 3.47 },
  { category: 'Product Design', type: 'Interactive Prototyping', score: 3.24 },
  { category: 'Product Design', type: 'Requirements Analysis', score: 3.51 },
  { category: 'Product Design', type: 'Competitive Analysis', score: 3.38 },
  { category: 'Testing Quality', type: 'Automated Test Scripts', score: 3.44 },
  { category: 'Testing Quality', type: 'Performance Testing', score: 3.29 },
  { category: 'Testing Quality', type: 'Security Vulnerability Scanning', score: 3.36 },
  { category: 'Testing Quality', type: 'Compatibility Verification', score: 3.18 },
  { category: 'DevOps Deployment', type: 'Docker Containerization', score: 3.41 },
  { category: 'DevOps Deployment', type: 'Kubernetes Orchestration', score: 3.33 },
  { category: 'DevOps Deployment', type: 'Monitoring and Alerting', score: 3.27 },
  { category: 'DevOps Deployment', type: 'CI/CD Pipeline', score: 3.49 },
];

chart.options({
  type: 'interval',
  autoFit: true,
  data,
  encode: {
    x: 'type',
    y: 'score',
    color: (d) => d.category,
  },
  coordinate: {
    transform: [
      {
        type: 'transpose',
      },
    ],
  },
  axis: {
    x: { title: false }, // Hide x-axis title
  },
  scale: {
    color: {
      range: ['#BAE7FF', '#80C9FE', '#70E3E3', '#ABF5F5', '#FFB3BA', '#FFDFBA'], // Customize colors here
    },
  },
});

chart.render();
```

## Why State Configuration Doesn't Take Effect

**Problem Description**

When using G2's state management (State) configuration, the configured `active`, `selected`, and other state styles don't take effect, and the chart's interactive effects don't meet expectations.

**Cause Analysis**

When the syntax is correct, State configuration not taking effect usually has the following reasons:

1. **Incorrect configuration hierarchy**: State configuration propagation mechanism has limitations, especially with multiple Marks
2. **Missing interaction plugins**: State needs to work with corresponding interaction plugins to take effect

**Solutions**

1. **Check configuration hierarchy (most common cause)**

With multiple Marks, you must configure State at each Mark level separately:

```js
// ❌ Wrong: With multiple marks, state at view level won't propagate
chart.options({
  type: 'view',
  state: { active: { fill: 'red' } }, // This configuration won't propagate to child marks
  children: [{ type: 'line' }, { type: 'point' }],
});

// ✅ Correct: Configure state at each mark level separately
chart.options({
  type: 'view',
  children: [
    {
      type: 'line',
      state: { active: { stroke: 'red', strokeWidth: 2 } },
    },
    {
      type: 'point',
      state: { active: { fill: 'red', r: 6 } },
    },
  ],
});
```

With single Mark, you can configure at view level:

```js
// ✅ With single mark, state configuration at view level takes effect
chart.options({
  type: 'view',
  state: { active: { fill: 'red' } }, // Will propagate to child mark
  children: [
    { type: 'line' }, // Will inherit state configuration from view
  ],
});
```

Configure directly at Mark level:

```js
// ✅ Configure directly at mark level
chart.options({
  type: 'line',
  state: { active: { stroke: 'red', strokeWidth: 2 } },
});
```

2. **Ensure correct interaction configuration**

State needs to work with interactions to take effect:

```js
chart.options({
  type: 'interval',
  state: {
    active: { fill: 'red' },
    inactive: { fill: '#aaa' },
    selected: { fill: 'orange' },
    unselected: { fill: '#eee' },
  },
  // Must configure corresponding interactions
  interaction: {
    elementHighlight: true, // Enable hover highlight
    elementSelect: true, // Enable click selection
  },
});
```

Common interactions and corresponding states:

| Interaction             | Corresponding State     | Description        |
| ----------------------- | ----------------------- | ------------------ |
| elementHighlight        | active/inactive         | Hover highlight    |
| elementSelect           | selected/unselected     | Click selection    |
| brushHighlight          | active/inactive         | Area brush highlight |
| legendHighlight         | active/inactive         | Legend highlight   |
| elementHighlightByColor | active/inactive         | Highlight by color |
| elementSelectByColor    | selected/unselected     | Select by color    |

3. **Complete configuration example**

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { letter: 'A', frequency: 0.08167 },
    { letter: 'B', frequency: 0.01492 },
    { letter: 'C', frequency: 0.02782 },
  ],
  encode: { x: 'letter', y: 'frequency' },
  state: {
    // On hover: green fill + black stroke
    active: { fill: 'green', stroke: 'black', strokeWidth: 1 },
    // On selection: red fill (overrides active fill) + keeps active stroke
    selected: { fill: 'red' },
  },
  interaction: { elementHighlight: true, elementSelect: true },
});

chart.render();
```

## How to Handle Style Conflicts When Multiple States Take Effect Simultaneously

**Problem Description**

When using G2's state management with both `elementHighlight` and `elementSelect` interactions enabled, multiple states (like `active` and `selected`) may take effect simultaneously, but the style behavior doesn't meet expectations.

**Cause Analysis**

G2 supports multiple states taking effect simultaneously. When the same property is configured by multiple states, the final effective style is selected based on priority. Different states have the following priorities:

```
selected:   3 (highest)
unselected: 3
active:     2
inactive:   2
default:    1 (lowest)
```

**Solutions**

1. **Understand state priority mechanism**

Higher priority states will override properties of the same name in lower priority states:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { letter: 'A', frequency: 0.08167 },
    { letter: 'B', frequency: 0.01492 },
    { letter: 'C', frequency: 0.02782 },
  ],
  encode: { x: 'letter', y: 'frequency' },
  state: {
    // On hover: green fill + black stroke
    active: { fill: 'green', stroke: 'black', strokeWidth: 1 },
    // On selection: red fill (overrides active fill) + keeps active stroke
    selected: { fill: 'red' },
  },
  interaction: { elementHighlight: true, elementSelect: true },
});

chart.render();
```

**Effect explanation**:

- Hover only: Shows green fill + black stroke
- Selection only: Shows red fill
- Hover over selected element: Red fill (selected has higher priority) + black stroke (provided by active)

2. **Properly configure styles for different priorities**

Avoid configuring the same style properties in different priority states, or ensure high priority states provide complete style configuration:

```js
chart.options({
  state: {
    active: {
      stroke: 'blue',
      strokeWidth: 2,
      opacity: 0.8,
    },
    selected: {
      fill: 'orange',
      stroke: 'black',
      strokeWidth: 3,
      // Don't configure opacity, will keep active's opacity effect
    },
  },
});
```

3. **Use dynamic styles for complex scenarios**

For complex state combinations, you can use functions to dynamically calculate styles:

```js
chart.options({
  state: {
    active: {
      fill: (d) => (d.frequency > 0.05 ? 'lightblue' : 'lightgreen'),
    },
    selected: {
      fill: (d) => (d.frequency > 0.05 ? 'darkblue' : 'darkgreen'),
      strokeWidth: 3,
    },
  },
});
```

## How to Prevent Null Values from Showing in Tooltip

**Problem Description**

When using G2 to draw charts in specific business scenarios, data often contains invalid values like `null`, `undefined`, or empty strings. By default, these null values are also displayed in the tooltip, affecting user experience and data readability.

**Solution**

You can use `interaction.tooltip.filter` configuration to filter out these invalid data items, preventing null values from showing in the tooltip.

1. **Basic filter configuration**

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  data: [
    { month: 'Jan', city: 'Tokyo', temperature: null },
    { month: 'Jan', city: 'London', temperature: 3.9 },
    { month: 'Feb', city: 'Tokyo', temperature: 8 },
    { month: 'Feb', city: 'London', temperature: 4.2 },
    { month: 'Mar', city: 'Tokyo', temperature: 9.5 },
    { month: 'Mar', city: 'London', temperature: 5.7 },
  ],
  encode: { x: 'month', y: 'temperature', color: 'city' },
  // Filter null and undefined values
  interaction: {
    tooltip: {
      filter: (d) => d.value !== null && d.value !== undefined,
    },
  },
  children: [
    {
      type: 'line',
      encode: { shape: 'smooth' },
      tooltip: {
        items: [{ channel: 'y' }],
      },
    },
    { type: 'point', encode: { shape: 'point' }, tooltip: false },
  ],
});

chart.render();
```

2. **Filtering for specific value ranges**

Besides filtering null values, you can also filter data in specific value ranges:

```js
// Filter negative values and null values
interaction: {
  tooltip: {
    filter: (d) => d.value !== null && d.value !== undefined && d.value >= 0,
  },
}

// Filter outliers (data outside reasonable range)
interaction: {
  tooltip: {
    filter: (d) => {
      if (d.value === null || d.value === undefined) return false;
      return d.value >= 0 && d.value <= 1000; // Only show values in 0-1000 range
    },
  },
}
```

## How to Display Ellipsis for Long Legend Text with Hover to Show Full Content

**Problem Description**

When using G2 to create charts, legend item text may be very long and cannot be fully displayed due to layout space constraints. We need to implement ellipsis for long text while supporting hover interaction to show the complete content.

**Solution**

G2 provides the `poptip` configuration to solve the problem of long legend text. By configuring `poptip`, you can display complete tooltip information when legend text is truncated and the user hovers over it.

**Key Configuration**

- `itemWidth`: Limit legend item width to trigger text truncation
- `poptip.render`: Customize tooltip content, supports string or `html`
- `poptip.domStyles`: Customize tooltip box styles
- `poptip.position`: Set tooltip position
- `poptip.offset`: Set tooltip offset, recommend setting to [0, positive number] to avoid flickering when triggering `poptip`

**Complete Example**

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 300,
});

chart.options({
  type: 'interval',
  data: [
    { category: 'This is a very long category name A that exceeds the display range', value: 40 },
    { category: 'This is a very long category name B that exceeds the display range', value: 32 },
    { category: 'This is a very long category name C that exceeds the display range', value: 28 },
  ],
  encode: { x: 'category', y: 'value', color: 'category' },
  coordinate: {
    transform: [
      {
        type: 'transpose',
      },
    ],
  },
  legend: {
    color: {
      itemWidth: 120, // Limit width to trigger poptip
      poptip: {
        render: (item) => `Full name: ${item.label}`,
        position: 'top',
        offset: [0, 20],
        domStyles: {
          '.component-poptip': {
            background: 'rgb(114, 128, 191)',
            color: '#fff',
            padding: '12px 16px',
            borderRadius: '8px',
            backdropFilter: 'blur(10px)',
            fontSize: '14px',
            lineHeight: '1.5',
            maxWidth: '280px',
            zIndex: '1000',
          },
          '.component-poptip-arrow': {
            display: 'block',
            borderTopColor: '#667eea',
          },
          '.component-poptip-text': {
            color: '#fff',
            lineHeight: '1.5',
          },
        },
      },
    },
  },
});

chart.render();
```

See the [Legend Component](/en/manual/component/legend#poptip) documentation for more configuration options.
