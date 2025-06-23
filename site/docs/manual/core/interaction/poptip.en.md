---
title: poptip
order: 19
---

## Overview

poptip is an interaction type in G2 that displays concise tooltip information when users interact with chart elements. It provides a lightweight way to show detailed information about data points without interfering with the user's overall chart browsing experience. Compared to full tooltip, poptip is more concise and typically only displays the most basic information.

## Usage

To enable poptip interaction, simply add `interaction: 'poptip'` in the chart configuration or use the `chart.interaction('poptip', true)` method.

```javascript
chart.options({
  // Other configurations...
  interaction: { poptip: true },
});
```

Or use method call:

```javascript
chart.interaction('poptip', true);
```

## Configuration Level

poptip interaction configuration can be set under the `interaction` property in the chart's `options` object:

```javascript
chart.options({
  // Other chart configurations...
  interaction: {
    poptip: {
      // poptip configuration options
      offsetX: 10,
      offsetY: 10,
      // tip style configuration
      tipBackgroundColor: 'rgba(0, 0, 0, 0.75)',
      tipColor: '#fff',
    },
  },
});
```

## Configuration Options

poptip interaction supports the following configuration options:

| Property | Description                                             | Type     | Default | Required |
| -------- | ------------------------------------------------------- | -------- | ------- | -------- |
| offsetX  | X-direction offset of tooltip relative to trigger point | `number` | `8`     |          |
| offsetY  | Y-direction offset of tooltip relative to trigger point | `number` | `8`     |          |

### Style Configuration Options

poptip style configuration options need to be prefixed with `tip`:

| Property           | Description              | Type     | Default                                                                                             | Required |
| ------------------ | ------------------------ | -------- | --------------------------------------------------------------------------------------------------- | -------- |
| tipBackgroundColor | Tooltip background color | `string` | `'rgba(0,0,0,0.75)'`                                                                                |          |
| tipColor           | Text color               | `string` | `'#fff'`                                                                                            |          |
| tipWidth           | Tooltip width            | `string` | `'max-content'`                                                                                     |          |
| tipPadding         | Tooltip padding          | `string` | `'1px 4px'`                                                                                         |          |
| tipFontSize        | Text font size           | `string` | `'12px'`                                                                                            |          |
| tipBorderRadius    | Tooltip border radius    | `string` | `'2.5px'`                                                                                           |          |
| tipBoxShadow       | Tooltip shadow           | `string` | `'0 3px 6px -4px rgba(0,0,0,0.12), 0 6px 16px 0 rgba(0,0,0,0.08), 0 9px 28px 8px rgba(0,0,0,0.05)'` |          |

## Events

poptip interaction triggers the following events:

| Event Name  | Description                 | Callback Parameters      |
| ----------- | --------------------------- | ------------------------ |
| poptip:show | Triggered when poptip shows | `{ data, target, x, y }` |
| poptip:hide | Triggered when poptip hides | `{ target }`             |

You can listen to these events in the following way:

```javascript
chart.on('poptip:show', (event) => {
  console.log('Poptip shown:', event.data);
});

chart.on('poptip:hide', (event) => {
  console.log('Poptip hidden');
});
```

## Examples

### Example 1: Treemap

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*wAQiRpx1jcMAAAAAAAAAAAAADmJ7AQ/original">

### Example 2: Scatter Plot

```js | ob {  pin : false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

// Generate mock data
const generateScatterData = () => {
  const data = [];
  const groups = ['Group A', 'Group B', 'Group C', 'Group D'];
  const centers = [
    [3, 3],
    [7, 7],
    [3, 7],
    [7, 3],
  ];

  groups.forEach((group, i) => {
    const [centerX, centerY] = centers[i];
    for (let j = 0; j < 30; j++) {
      // Generate random scatter points around center
      const x = centerX + (Math.random() - 0.5) * 4;
      const y = centerY + (Math.random() - 0.5) * 4;
      const size = Math.random() * 20 + 5;
      data.push({
        x,
        y,
        size,
        group,
        id: `${group}-${j}`,
        value: Math.round(x * y),
      });
    }
  });
  return data;
};

const data = generateScatterData();

chart.options({
  type: 'point',
  data,
  encode: {
    x: 'x',
    y: 'y',
    color: 'group',
    size: 'size',
    shape: 'circle',
  },
  scale: {
    x: {
      nice: true,
      domain: [0, 10],
    },
    y: {
      nice: true,
      domain: [0, 10],
    },
    size: {
      domain: [5, 25],
    },
    color: {
      palette: 'category10',
    },
  },
  style: {
    fillOpacity: 0.65,
    stroke: '#fff',
    lineWidth: 1,
  },
  axis: {
    x: {
      title: 'X Axis',
      grid: true,
    },
    y: {
      title: 'Y Axis',
      grid: true,
    },
  },
  legend: {
    color: {
      position: 'top',
      flipPage: false,
      maxItemWidth: 80,
      itemMarginBottom: 8,
      layout: 'horizontal',
    },
  },
  animate: {
    enter: {
      type: 'fadeIn',
      duration: 800,
      delay: (d, i) => i * 10,
    },
  },
});

chart.render();

chart.interaction('poptip', {
  offsetX: 15,
  offsetY: 15,
  tipBackgroundColor: 'rgba(0, 0, 0, 0.85)',
  tipBorderRadius: '6px',
  tipPadding: '10px 12px',
  tipFontSize: '12px',
  tipColor: '#fff',
  tipBoxShadow: '0 3px 6px -4px rgba(0, 0, 0, 0.48)',
});

chart.on('element:mouseenter', (event) => {
  const { element } = event;
  element.style.fillOpacity = 1;
  element.style.stroke = '#000';
  element.style.lineWidth = 2;
  chart.render();
});

chart.on('element:mouseleave', (event) => {
  const { element } = event;
  element.style.fillOpacity = 0.65;
  element.style.stroke = '#fff';
  element.style.lineWidth = 1;
  chart.render();
});
```

### Example 3: Rose Chart

```js | ob {  pin : false , inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

// Simplified dataset
const data = [
  { category: 'Category A', value: 27 },
  { category: 'Category B', value: 25 },
  { category: 'Category C', value: 23 },
  { category: 'Category D', value: 21 },
  { category: 'Category E', value: 19 },
  { category: 'Category F', value: 17 },
  { category: 'Category G', value: 12 },
  { category: 'Category H', value: 10 },
  { category: 'Category I', value: 6 },
];

chart.options({
  type: 'interval',
  data,
  coordinate: {
    type: 'polar',
    innerRadius: 0.2,
    endAngle: Math.PI * 2,
  },
  encode: {
    x: 'category',
    y: 'value',
    color: 'category',
  },
  transform: [
    {
      type: 'stackY',
    },
  ],
  scale: {
    color: {
      palette: 'spectral',
    },
  },
  style: {
    stroke: '#fff',
    lineWidth: 1,
  },
  legend: {
    color: {
      position: 'right',
    },
  },
  animate: {
    enter: {
      type: 'fadeIn',
      duration: 800,
    },
  },
});

chart.render();

chart.interaction('poptip', true);

chart.on('element:mouseenter', (event) => {
  const { element } = event;
  element.style.fillOpacity = 1;
  element.style.stroke = '#000';
  element.style.lineWidth = 2;
  chart.render();
});

chart.on('element:mouseleave', (event) => {
  const { element } = event;
  element.style.fillOpacity = 0.85;
  element.style.stroke = '#fff';
  element.style.lineWidth = 1;
  chart.render();
});
```
