---
title: Funnel Chart
order: 10
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*bVErS5tN_goAAAAAAAAAAAAADmJ7AQ/original'
category: ['comparison']
similar: ['pyramid']
---


<img alt="funnel" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*bVErS5tN_goAAAAAAAAAAAAADmJ7AQ/original" width=600/>

## Introduction to Funnel Charts

A funnel chart is a specialized visualization used to represent data flow through different stages of a business process. Named after its resemblance to a physical funnel, it displays data quantities across successive stages, typically with a wide top and narrow bottom, reflecting the process of data loss or conversion.

Funnel charts are particularly suited for visualizing conversion rates in business processes, such as sales pipelines, user registration flows, or marketing funnels. Through funnel charts, you can intuitively observe data changes across various stages and identify critical conversion points or bottlenecks.

Each layer in a funnel chart represents a stage in the process, with the width or area of the layer typically proportional to the quantity of data at that stage, clearly reflecting the data loss during the conversion process.

**Other Names**: Funnel Diagram, Sales Funnel

## Components of a Funnel Chart

### Basic Funnel Chart

<img alt="basic-funnel" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*bVErS5tN_goAAAAAAAAAAAAADmJ7AQ/original" width=600 />

| Chart Type      | Basic Funnel Chart                                                                    |
| --------------- | ------------------------------------------------------------------------------------- |
| Suitable Data   | Ordered categorical data: a categorical field for process stages and a value field for each stage |
| Function        | Display data flow and conversion rates across stages of a business process           |
| Data-to-Visual Mapping | Stage field mapped to funnel layers<br>Value field mapped to layer width or area<br>Colors distinguish different stages |
| Suitable Scenarios | Analyzing conversions and identifying loss points in multi-stage processes          |

## Use Cases of Funnel Charts

### Suitable Use Cases

Example 1: **Sales Process Conversion Analysis**

The chart below shows the conversion across different stages of a sales funnel, from initial leads to final deals.

| stage | value |
| ----- | ----- |
| Visits | 8043 |
| Inquiries | 2136 |
| Quotes | 908 |
| Negotiations | 691 |
| Deals | 527 |

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'funnel',
  data: [
    { stage: 'Visits', value: 8043 },
    { stage: 'Inquiries', value: 2136 },
    { stage: 'Quotes', value: 908 },
    { stage: 'Negotiations', value: 691 },
    { stage: 'Deals', value: 527 },
  ],
  encode: {
    y: 'stage',
    value: 'value',
    shape: 'funnel',
  },
  transform: [
    {
      type: 'symmetryY',
      coordinate: 'rect'
    },
  ],
  scale: {
    color: { 
      palette: 'spectral',
    },
  },
  style: {
    labelText: (d) => `${d.stage}: ${d.value}`,
  },
  legend: false,
});

chart.render();
```


**Explanation**:

- The `stage` field is mapped to each layer of the funnel, representing different stages of the sales process
- The `value` field is mapped to the width of each layer, intuitively showing the conversion from the top to the bottom of the funnel
- Through the funnel shape, you can clearly see the conversion rates and loss between stages

Example 2: **Website Traffic Conversion Analysis**

Funnel charts can effectively analyze the conversion of website traffic from visits to final actions, helping identify key points of user drop-off.

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'funnel',
  data: [
    { stage: 'Homepage Visit', value: 100000, percent: '100%' },
    { stage: 'Product Search', value: 60000, percent: '60%' },
    { stage: 'Product Detail View', value: 30000, percent: '30%' },
    { stage: 'Add to Cart', value: 10000, percent: '10%' },
    { stage: 'Completed Purchase', value: 5000, percent: '5%' },
  ],
  encode: {
    y: 'stage',
    value: 'value',
    color: 'stage',
  },
  style: {
    labelText: (d) => `${d.stage}: ${d.percent}`,
    labelPosition: 'right',
  },
  legend: false,
  scale: {
    color: { 
      palette: 'blues',
    },
  },
});

chart.render();
```

**Explanation**:
- Each layer represents a different stage of website traffic conversion
- The width of each layer reflects the number of users at that stage
- By comparing differences between adjacent layers, you can identify major points of user drop-off
- Percentage labels provide intuitive visualization of conversion effectiveness

Example 3: **Comparative Funnel Charts for Different Channels**

When you need to compare conversion effectiveness across different channels or time periods, comparative funnel charts are useful for analysis.

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  data: [
    { stage: 'Visits', value: 8043, category: 'Channel A' },
    { stage: 'Inquiries', value: 2136, category: 'Channel A' },
    { stage: 'Quotes', value: 908, category: 'Channel A' },
    { stage: 'Negotiations', value: 691, category: 'Channel A' },
    { stage: 'Deals', value: 527, category: 'Channel A' },
    { stage: 'Visits', value: 6841, category: 'Channel B' },
    { stage: 'Inquiries', value: 2761, category: 'Channel B' },
    { stage: 'Quotes', value: 1098, category: 'Channel B' },
    { stage: 'Negotiations', value: 624, category: 'Channel B' },
    { stage: 'Deals', value: 487, category: 'Channel B' },
  ],
  axis: false,
  children: [
    {
      type: 'funnel',
      region: { start: { x: 0, y: 0 }, end: { x: 0.48, y: 1 } },
      transform: [{ type: 'filter', callback: (d) => d.category === 'Channel A' }],
      encode: {
        y: 'stage',
        value: 'value',
        color: 'stage',
      },
      scale: {
        color: { palette: 'spectral' },
      },
      style: {
        labelText: (d) => `${d.value}`,
        labelPosition: 'left',
      },
      title: 'Channel A',
    },
    {
      type: 'funnel',
      region: { start: { x: 0.52, y: 0 }, end: { x: 1, y: 1 } },
      transform: [{ type: 'filter', callback: (d) => d.category === 'Channel B' }],
      encode: {
        y: 'stage',
        value: 'value',
        color: 'stage',
      },
      scale: {
        color: { palette: 'spectral' },
      },
      style: {
        labelText: (d) => `${d.value}`,
        labelPosition: 'right',
      },
      title: 'Channel B',
    },
  ],
  legend: false,
});

chart.render();
```

**Explanation**:
- Side-by-side display of conversion funnels for two channels allows for intuitive comparison
- Consistent color coding for corresponding stages facilitates comparison
- You can clearly observe differences in conversion efficiency across channels at various stages

### Unsuitable Use Cases

Example 1: **Not Suitable for Unordered Data or Data Without Clear Hierarchy**

The essence of a funnel chart is to display conversion in an ordered process. If the data has no clear sequence or hierarchical relationship, using a funnel chart can be misleading. For such data, bar charts or pie charts might be more appropriate choices.

Example 2: **Not Suitable for Data with Fluctuating or Increasing Values Across Stages**

Funnel charts typically express a decreasing process from more to less. If there are stages where values increase compared to previous stages (e.g., user numbers increasing due to marketing campaigns), traditional funnel charts may not be suitable, and other chart forms should be considered.

## Extensions of Funnel Charts

### Symmetrical Funnel Chart

Symmetrical funnel charts can more clearly show comparisons between two related processes, or contrasts between positive and negative factors in the same process.

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  data: [
    { stage: 'Acquisition', value: 3800, category: 'Actual' },
    { stage: 'Activation', value: 2600, category: 'Actual' },
    { stage: 'Retention', value: 1800, category: 'Actual' },
    { stage: 'Conversion', value: 1000, category: 'Actual' },
    { stage: 'Acquisition', value: 4000, category: 'Target' },
    { stage: 'Activation', value: 3000, category: 'Target' },
    { stage: 'Retention', value: 2000, category: 'Target' },
    { stage: 'Conversion', value: 1200, category: 'Target' },
  ],
  children: [
    {
      type: 'funnel',
      region: { start: { x: 0, y: 0 }, end: { x: 0.48, y: 1 } },
      transform: [
        { type: 'filter', callback: (d) => d.category === 'Actual' },
        { type: 'sortY', by: 'value', reverse: true },
      ],
      coordinate: { transform: [{ type: 'transpose' }, { type: 'mirror', direction: 'x' }] },
      encode: {
        x: 'stage',
        value: 'value',
        color: 'stage',
      },
      scale: {
        color: { palette: 'spectral' },
      },
      style: {
        labelText: (d) => `${d.value}`,
        labelPosition: 'inside',
      },
      title: 'Actual Conversion',
    },
    {
      type: 'funnel',
      region: { start: { x: 0.52, y: 0 }, end: { x: 1, y: 1 } },
      transform: [
        { type: 'filter', callback: (d) => d.category === 'Target' },
        { type: 'sortY', by: 'value', reverse: true },
      ],
      coordinate: { transform: [{ type: 'transpose' }] },
      encode: {
        x: 'stage',
        value: 'value',
        color: 'stage',
      },
      scale: {
        color: { palette: 'spectral' },
      },
      style: {
        labelText: (d) => `${d.value}`,
        labelPosition: 'inside',
      },
      title: 'Target Conversion',
    },
  ],
  legend: false,
  axis: false,
});

chart.render();
```

**Explanation**:
- Horizontal symmetrical layout shows a comparison between actual conversion and target conversion
- Same color coding and labels on both sides facilitate comparison
- Mirror transformation enables reversed display of the left funnel

### Pyramid Funnel Chart

Pyramid funnel charts are a variant more suitable for displaying hierarchical structures or data like population pyramids.

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'funnel',
  data: [
    { age: '80+', male: -100, female: 150 },
    { age: '70-79', male: -200, female: 260 },
    { age: '60-69', male: -350, female: 380 },
    { age: '50-59', male: -500, female: 520 },
    { age: '40-49', male: -680, female: 700 },
    { age: '30-39', male: -820, female: 850 },
    { age: '20-29', male: -950, female: 1000 },
    { age: '10-19', male: -870, female: 900 },
    { age: '0-9', male: -600, female: 650 },
  ],
  coordinate: { transform: [{ type: 'transpose' }] },
  encode: {
    x: 'age',
    value: (d) => [Math.abs(d.male), d.female],
    color: (d, idx) => idx === 0 ? 'Male' : 'Female',
  },
  scale: {
    color: { range: ['#1890ff', '#f5222d'] },
  },
  style: {
    shape: 'pyramid',
    labelText: (d, idx) => `${idx === 0 ? Math.abs(d.male) : d.female}`,
    labelPosition: 'inside',
  },
  legend: {
    color: { position: 'top' },
  },
  axis: {
    y: { grid: true, title: false },
  },
});

chart.render();
```

**Explanation**:
- Horizontal pyramid shape suitable for population structure and other symmetrical data
- Left and right sides display data for different categories (male/female)
- Different colors distinguish data flows in two directions
- Coordinate axis transposition enables horizontal display

## Comparing Funnel Charts to Other Charts

### Funnel Charts and [Pyramid Charts](/en/charts/pyramid)

- Funnel charts are typically used to show data loss processes, with values decreasing from top to bottom
- Pyramid charts are more commonly used for hierarchical structures or symmetric data comparison between two sides
- Though similar in shape, they have different application scenarios and data characteristics

### Funnel Charts and [Bar Charts](/en/charts/bar)

- Funnel charts emphasize process conversion and the continuous relationship between stages
- Bar charts are better for direct comparison of values between different categories
- When detailed analysis of process conversion is needed, funnel charts provide more intuitive visual effects

### Funnel Charts and [Pie Charts](/en/charts/pie)

- Funnel charts display ordered stages in a process and their relationships
- Pie charts show proportion relationships within a whole, without emphasizing order
- When focusing on conversion between stages rather than simple proportions, funnel charts are the better choice

## Similar Charts

<code src="./demos/list-card.tsx"></code>

## Categories

<code src="./demos/list-category.tsx"></code>