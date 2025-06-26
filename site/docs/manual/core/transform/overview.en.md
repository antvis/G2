---
title: Overview
order: 1
---

In G2, **Mark Transform** provides a convenient mechanism for modifying data and mark options, primarily used to support data analysis. The essence of mark transform is a function that can **filter**, **modify**, **aggregate**, and **generate** new channel values, thereby optimizing graphical displays and enhancing data interpretability.

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*1oZjT4cKSh8AAAAAAAAAAAAADmJ7AQ/original" width='25%'/>
<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*DziRQb4LMbAAAAAAAAAAAAAADmJ7AQ/original" width='25%'/>
<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*l6NBRburGGcAAAAAAAAAAAAADmJ7AQ/original" width='25%'/>
<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*TZmeQqK7CZwAAAAAAAAAAAAADmJ7AQ/original" width='25%'/>

## Configuration Levels

Transform is an array, and declared transforms are **executed in order**. Transforms can be configured at the Mark level:

```js
({
  type: 'interval',
  transform: [{ type: 'stackY' }, { type: 'sortX' }],
});
```

Mark transforms modify the data bound to each channel, thereby changing the display form of the chart. For example, the StackY transform stacks the column data bound to the bar chart's y and y1 channels:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { city: 'London', month: 'Jan.', rainfall: 18.9 },
    { city: 'London', month: 'Feb.', rainfall: 28.8 },
    { city: 'London', month: 'Mar.', rainfall: 39.3 },
    { city: 'London', month: 'Apr.', rainfall: 81.4 },
    { city: 'London', month: 'May', rainfall: 47 },
    { city: 'London', month: 'Jun.', rainfall: 20.3 },
    { city: 'London', month: 'Jul.', rainfall: 24 },
    { city: 'London', month: 'Aug.', rainfall: 35.6 },
    { city: 'Berlin', month: 'Jan.', rainfall: 12.4 },
    { city: 'Berlin', month: 'Feb.', rainfall: 23.2 },
    { city: 'Berlin', month: 'Mar.', rainfall: 34.5 },
    { city: 'Berlin', month: 'Apr.', rainfall: 99.7 },
    { city: 'Berlin', month: 'May', rainfall: 52.6 },
    { city: 'Berlin', month: 'Jun.', rainfall: 35.5 },
    { city: 'Berlin', month: 'Jul.', rainfall: 37.4 },
    { city: 'Berlin', month: 'Aug.', rainfall: 42.4 },
  ],
  encode: { x: 'month', y: 'rainfall', color: 'city' },
  transform: [{ type: 'stackY' }],
});

chart.render();
```

Transforms can also be configured at the View level:

```js
({
  type: 'view',
  transform: [{ type: 'stackY' }, { type: 'sortX' }],
});
```

Transforms declared on the view will be passed to the marks declared in `children`. If the mark has no transform, it will be set; otherwise, it has no effect. For example, the following stacked area chart with transform:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  data: [
    { city: 'London', month: 'Jan.', rainfall: 18.9 },
    { city: 'London', month: 'Feb.', rainfall: 28.8 },
    { city: 'London', month: 'Mar.', rainfall: 39.3 },
    { city: 'London', month: 'Apr.', rainfall: 81.4 },
    { city: 'London', month: 'May', rainfall: 47 },
    { city: 'London', month: 'Jun.', rainfall: 20.3 },
    { city: 'London', month: 'Jul.', rainfall: 24 },
    { city: 'London', month: 'Aug.', rainfall: 35.6 },
    { city: 'Berlin', month: 'Jan.', rainfall: 12.4 },
    { city: 'Berlin', month: 'Feb.', rainfall: 23.2 },
    { city: 'Berlin', month: 'Mar.', rainfall: 34.5 },
    { city: 'Berlin', month: 'Apr.', rainfall: 99.7 },
    { city: 'Berlin', month: 'May', rainfall: 52.6 },
    { city: 'Berlin', month: 'Jun.', rainfall: 35.5 },
    { city: 'Berlin', month: 'Jul.', rainfall: 37.4 },
    { city: 'Berlin', month: 'Aug.', rainfall: 42.4 },
  ],
  encode: { x: 'month', y: 'rainfall', color: 'city' },
  transform: [{ type: 'stackY' }], // View-level transform
  children: [
    { type: 'area', style: { fillOpacity: 0.5 } },
    { type: 'line', style: { strokeWidth: 2 }, tooltip: false },
  ],
});

chart.render();
```

## Use Cases

Common transform functions generally have three roles:

- **Prevent overlap**

When mapping data to graphics, it must be achieved through visual encoding. Among all visual channels, position is the most distinguishable channel (x channel, y channel, etc.). However, in certain cases, positions in graphics may overlap, making data analysis difficult. To address this situation, it's usually necessary to perform certain transforms on the original graphics, such as dodgeX, stackY, jitterX, etc.

- **Data aggregation**

Another type of mark transform is mainly used for data aggregation: such as bin and group. Unlike traditional data aggregation, mark aggregation occurs during rendering, not before rendering. This allows us to operate directly on channel values without needing to manipulate abstract raw data. This greatly improves our efficiency in exploring data.

- **Drawing graphic annotations**

In G2, there are no separate dedicated annotation components. Instead, annotation functionality is achieved through flexible mark configuration. Since annotations are also a type of mark, they can also execute mark transforms.

## Preventing Overlap

One function of transforms is to prevent overlap, adjusting data so that graphics don't overlap on the canvas.

💡 **Principles of Data Adjustment**

The purpose of adjusting data is to prevent graphics from obscuring each other, making data understanding clearer. However, we must ensure correct understanding of the data, so the following principles must be followed:

- Cannot change the meaning of data, causing user misunderstanding;
- Data adjustment boundaries must be clear, cannot confuse different categories of data;
- Quantitative (continuous) data can only be accumulated and symmetrized, categorical data can only be adjusted within the current category's range.

For example, in the scatter plot drawn from the following data, points with the same x channel completely overlap, making them difficult to distinguish.

```js | ob {  pin:false, inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'point',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/2c813e2d-2276-40b9-a9af-cf0a0fb7e942.csv',
  },
  encode: {
    y: 'Horsepower',
    x: 'Cylinders',
    shape: 'hollow',
    color: 'Cylinders',
  },
  scale: { x: { type: 'point' }, color: { type: 'ordinal' } },
});

chart.render();
```

You can configure the [jitterX](/en/manual/core/transform/jitter-x) transform to achieve a spreading effect in the x direction within a certain area.

```js | ob {  pin:false, inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'point',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/2c813e2d-2276-40b9-a9af-cf0a0fb7e942.csv',
  },
  encode: {
    y: 'Horsepower',
    x: 'Cylinders',
    shape: 'hollow',
    color: 'Cylinders',
  },
  scale: { x: { type: 'point' }, color: { type: 'ordinal' } },
  transform: [{ type: 'jitterX' }], // Configure jitterX transform to achieve spreading effect in x direction within a certain area
});

chart.render();
```

This situation is also common in bar charts. For example, in the bar chart drawn from the following data, when the x channel is categorical, multiple records under the same category will overlap, making them difficult to distinguish.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { city: 'London', month: 'Jan.', rainfall: 18.9 },
    { city: 'London', month: 'Feb.', rainfall: 28.8 },
    { city: 'London', month: 'Mar.', rainfall: 39.3 },
    { city: 'London', month: 'Apr.', rainfall: 81.4 },
    { city: 'London', month: 'May', rainfall: 47 },
    { city: 'London', month: 'Jun.', rainfall: 20.3 },
    { city: 'London', month: 'Jul.', rainfall: 24 },
    { city: 'London', month: 'Aug.', rainfall: 35.6 },
    { city: 'Berlin', month: 'Jan.', rainfall: 12.4 },
    { city: 'Berlin', month: 'Feb.', rainfall: 23.2 },
    { city: 'Berlin', month: 'Mar.', rainfall: 34.5 },
    { city: 'Berlin', month: 'Apr.', rainfall: 99.7 },
    { city: 'Berlin', month: 'May', rainfall: 52.6 },
    { city: 'Berlin', month: 'Jun.', rainfall: 35.5 },
    { city: 'Berlin', month: 'Jul.', rainfall: 37.4 },
    { city: 'Berlin', month: 'Aug.', rainfall: 42.4 },
  ],
  encode: { x: 'month', y: 'rainfall', color: 'city' },
});

chart.render();
```

At this time, you can declare a [dodgeX](/en/manual/core/transform/dodge-x) to draw a grouped bar chart:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { city: 'London', month: 'Jan.', rainfall: 18.9 },
    { city: 'London', month: 'Feb.', rainfall: 28.8 },
    { city: 'London', month: 'Mar.', rainfall: 39.3 },
    { city: 'London', month: 'Apr.', rainfall: 81.4 },
    { city: 'London', month: 'May', rainfall: 47 },
    { city: 'London', month: 'Jun.', rainfall: 20.3 },
    { city: 'London', month: 'Jul.', rainfall: 24 },
    { city: 'London', month: 'Aug.', rainfall: 35.6 },
    { city: 'Berlin', month: 'Jan.', rainfall: 12.4 },
    { city: 'Berlin', month: 'Feb.', rainfall: 23.2 },
    { city: 'Berlin', month: 'Mar.', rainfall: 34.5 },
    { city: 'Berlin', month: 'Apr.', rainfall: 99.7 },
    { city: 'Berlin', month: 'May', rainfall: 52.6 },
    { city: 'Berlin', month: 'Jun.', rainfall: 35.5 },
    { city: 'Berlin', month: 'Jul.', rainfall: 37.4 },
    { city: 'Berlin', month: 'Aug.', rainfall: 42.4 },
  ],
  encode: { x: 'month', y: 'rainfall', color: 'city' },
  transform: [{ type: 'dodgeX' }], // Configure dodgeX transform to achieve bar chart grouping
});

chart.render();
```

Or declare a [stackY](/en/manual/core/transform/stack-y) to draw a stacked bar chart:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { city: 'London', month: 'Jan.', rainfall: 18.9 },
    { city: 'London', month: 'Feb.', rainfall: 28.8 },
    { city: 'London', month: 'Mar.', rainfall: 39.3 },
    { city: 'London', month: 'Apr.', rainfall: 81.4 },
    { city: 'London', month: 'May', rainfall: 47 },
    { city: 'London', month: 'Jun.', rainfall: 20.3 },
    { city: 'London', month: 'Jul.', rainfall: 24 },
    { city: 'London', month: 'Aug.', rainfall: 35.6 },
    { city: 'Berlin', month: 'Jan.', rainfall: 12.4 },
    { city: 'Berlin', month: 'Feb.', rainfall: 23.2 },
    { city: 'Berlin', month: 'Mar.', rainfall: 34.5 },
    { city: 'Berlin', month: 'Apr.', rainfall: 99.7 },
    { city: 'Berlin', month: 'May', rainfall: 52.6 },
    { city: 'Berlin', month: 'Jun.', rainfall: 35.5 },
    { city: 'Berlin', month: 'Jul.', rainfall: 37.4 },
    { city: 'Berlin', month: 'Aug.', rainfall: 42.4 },
  ],
  encode: { x: 'month', y: 'rainfall', color: 'city' },
  transform: [{ type: 'stackY' }], // Configure stackY transform to achieve bar chart stacking
});

chart.render();
```

The following are the built-in mark transforms in G2 for preventing overlap:

| Transform                                     | Detailed Description                                                                                                      | Example                                                                                                          |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| [diffY](/en/manual/core/transform/diff-y)     | Compares y channel values and generates difference types, typically used for measuring changes between two value sets.    | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*9jOYSrMpSe4AAAAAAAAAAAAADmJ7AQ/original"></img> |
| [dodgeX](/en/manual/core/transform/dodge-x)   | Groups and staggers elements in the x channel direction to avoid overlap and facilitate data point distinction.           | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*JUTiSIaaUgEAAAAAAAAAAAAADmJ7AQ/original"></img> |
| [jitter](/en/manual/core/transform/jitter)    | Randomly generates slight jitter in both x and y channel directions to handle overlapping data points in graphics.        | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*DziRQb4LMbAAAAAAAAAAAAAADmJ7AQ/original"></img> |
| [jitterX](/en/manual/core/transform/jitter-x) | Randomly generates slight jitter in the x channel direction to reduce data point overlap.                                 | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*34m0QZPUjxMAAAAAAAAAAAAADmJ7AQ/original"></img> |
| [jitterY](/en/manual/core/transform/jitter-y) | Randomly generates slight jitter in the y channel direction to reduce data point overlap.                                 | Similar to jitterX but in the y direction                                                                        |
| [pack](/en/manual/core/transform/pack)        | Arranges data points in a compact manner to optimize space utilization, suitable for dense distribution layouts.          | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*TZmeQqK7CZwAAAAAAAAAAAAADmJ7AQ/original"></img> |
| [sample](/en/manual/core/transform/sample)    | Samples data based on certain algorithms to select subsets from original datasets, commonly used for big data processing. | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*68ViRIex2JEAAAAAAAAAAAAADmJ7AQ/original"></img> |
| [stackY](/en/manual/core/transform/stack-y)   | Stacks data in the y channel direction, typically used to show cumulative effects or distribution patterns.               | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*RqV4T4LZxaAAAAAAAAAAAAAADmJ7AQ/original"></img> |

## Data Aggregation

Another type of mark transform is mainly used for data aggregation: such as [bin](/en/manual/core/transform/bin) and [group](/en/manual/core/transform/group). Unlike traditional data aggregation, mark aggregation occurs during rendering, not before rendering. This allows us to operate directly on channel values without needing to manipulate abstract raw data. This greatly improves our efficiency in exploring data.

```js | ob {  pin: false , inject: true }
table({
  url: 'https://assets.antv.antgroup.com/g2/penguins.json',
});
```

The following is a dataset of penguin clusters. We'll use this as a case study to introduce some common data aggregation methods in G2.

First, let's draw a scatter plot as follows, showing the correlation between penguin `culmen_depth_mm` and `culmen_length_mm`.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'point',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
    transform: [
      { type: 'filter', callback: (d) => d.culmen_depth_mm !== null },
    ],
  },
  encode: { x: (d) => +d.culmen_depth_mm, y: (d) => +d.culmen_length_mm },
});

chart.render();
```

However, scatter plots cannot intuitively show the distribution of certain data in penguin populations, such as the specific distribution of `culmen_depth_mm`. At this time, you can use [binX](/en/manual/core/transform/bin-x) to bin the data and conduct further data analysis through histograms.

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
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
    transform: [
      { type: 'filter', callback: (d) => d.culmen_depth_mm !== null },
    ],
  },
  encode: { x: (d) => +d.culmen_depth_mm },
  transform: [{ type: 'binX', y: 'count' }],
  style: { insetLeft: 1 },
});

chart.render();
```

Bin is mainly used to aggregate numerical data, while group is mainly for discrete data. In the above example, if you want to analyze the number of different penguin species on different islands, you can use [groupX](/en/manual/core/transform/group-x) to group the x channel and aggregate the y channel using the count method.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
    transform: [
      { type: 'filter', callback: (d) => d.culmen_depth_mm !== null },
    ],
  },
  encode: { x: 'island', color: 'species' },
  transform: [
    {
      type: 'groupX',
      y: 'count',
    },
    {
      type: 'stackY',
    },
  ],
});

chart.render();
```

If we don't care about specific quantities but want to focus on the proportions of different penguin species, we can use [normalizeY](/en/manual/core/transform/normalize-y) for normalization.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
    transform: [
      { type: 'filter', callback: (d) => d.culmen_depth_mm !== null },
    ],
  },
  encode: { x: 'island', color: 'species' },
  transform: [
    {
      type: 'groupX',
      y: 'count',
    },
    {
      type: 'stackY',
    },
    {
      type: 'normalizeY',
    },
  ],
});

chart.render();
```

The following are the built-in mark transforms in G2 for data aggregation:

| Transform                                           | Detailed Description                                                                                         | Example                                                                                                          |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| [bin](/en/manual/core/transform/bin)                | Groups data into fixed intervals (or bins), typically used for histogram construction.                       | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*oyXhQKobcMMAAAAAAAAAAAAADmJ7AQ/original"></img> |
| [binX](/en/manual/core/transform/bin-x)             | Groups data in the x channel direction, generating a series of intervals (or bins).                          | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*WJFaSp1JLHQAAAAAAAAAAAAADmJ7AQ/original"></img> |
| [flexX](/en/manual/core/transform/flex-x)           | Flexibly arranges data on the x channel for adaptive layouts or special arrangement requirements.            | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*i_DyRJlDdVsAAAAAAAAAAAAADmJ7AQ/original"></img> |
| [group](/en/manual/core/transform/group)            | Groups data based on certain conditions or attributes, dividing data into multiple subsets.                  | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*QXuAQ7COJwcAAAAAAAAAAAAADmJ7AQ/original"></img> |
| [groupColor](/en/manual/core/transform/group-color) | Groups data colors based on data attributes, commonly used for categorical data visualization.               | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*dWoBQ7aVlcQAAAAAAAAAAAAADmJ7AQ/original"></img> |
| [groupX](/en/manual/core/transform/group-x)         | Groups based on x channel data attributes, commonly used for data visualization with categorical dimensions. | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*1oZjT4cKSh8AAAAAAAAAAAAADmJ7AQ/original"></img> |
| [groupY](/en/manual/core/transform/group-y)         | Groups based on y channel data attributes, commonly used for arranging data by category on the y channel.    | <img src="https://mdn.alipayobjects.com/mdn/huamei_qa8qxu/afts/img/A*rWBUQ6_kf8kAAAAAAAAAAAAADmJ7AQ"></img>      |
| [normalizeY](/en/manual/core/transform/normalize-y) | Normalizes data on the y channel, typically adjusting data proportionally for comparison and visualization.  | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Pp6-RJMKJFUAAAAAAAAAAAAADmJ7AQ/original"></img> |
| [select](/en/manual/core/transform/select)          | Filters data subsets based on specified conditions.                                                          | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*oNCJTZ7LYVkAAAAAAAAAAAAAemJ7AQ/original"></img> |
| [selectX](/en/manual/core/transform/select-x)       | Filters based on x channel data, selecting data subsets that meet range or condition criteria.               |                                                                                                                  |
| [selectY](/en/manual/core/transform/select-y)       | Filters based on y channel data, selecting data subsets that meet range or condition criteria.               |                                                                                                                  |
| [sortColor](/en/manual/core/transform/sort-color)   | Sorts data based on color priority to generate ordered visual structures by color.                           |                                                                                                                  |
| [sortX](/en/manual/core/transform/sort-x)           | Sorts data on the x channel to generate visual graphics with sequential relationships.                       |                                                                                                                  |
| [sortY](/en/manual/core/transform/sort-y)           | Sorts data on the y channel to generate visual graphics with sequential relationships.                       |                                                                                                                  |
| [stackEnter](/en/manual/core/transform/stack-enter) | Stacks enterDuration and enterDelay channels to achieve grouped animation effects.                           | <img src="https://gw.alipayobjects.com/zos/raptor/1668659773138/stackenter.gif"></img>                           |
| [symmetryY](/en/manual/core/transform/symmetry-y)   | Generates symmetric distribution in the y channel direction for constructing symmetrical data layouts.       | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*LeTWR4RrSjoAAAAAAAAAAAAADmJ7AQ/original"></img> |

## Drawing Graphic Annotations

As mentioned in the mark documentation, G2 does not provide separate dedicated annotation components. Instead, annotation functionality is achieved through flexible mark configuration. Since annotations are also a type of mark, they can also execute mark transforms.

Annotation data usually maintains consistency with the chart's data source. Based on this data source, annotation content is generated through mark transforms. During annotation construction, **group** can be used to group data by specific categories or attributes, or **select** can be used to filter subsets that meet specific conditions, thereby achieving focused and enhanced processing of key information. This flexible mark transform not only helps effectively construct annotations but also ensures that annotation content accurately fits the data's logic and visual needs, while improving chart readability and expression.

### Group

GroupX is a commonly used mark transform that groups data based on the **x channel** and performs aggregation processing on specified channels. Specifically, it aggregates data according to the grouping dimension of the **x channel** and further processes the data on the **y channel**. For example, it can calculate and take the average value (`mean`) of each group's **y data** as the aggregation result. Finally, the aggregated data is used to draw marks (such as lineY), generating a statistically meaningful average line. This method simplifies the grouping and aggregation process, allowing direct operation on aggregated data during graphic rendering, improving data processing efficiency and visualization expression accuracy.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/seattle-weather.json',
  },
  children: [
    {
      type: 'interval',
      encode: {
        x: (d) => new Date(d.date).getUTCMonth(),
        y: 'precipitation',
      },
      transform: [{ type: 'groupX', y: 'mean' }],
      scale: { y: { tickCount: 5, domainMax: 6 } },
      tooltip: { items: [{ channel: 'y', valueFormatter: '.2f' }] },
    },
    {
      type: 'lineY',
      encode: { y: 'precipitation' },
      transform: [{ type: 'groupX', y: 'mean' }],
      style: {
        stroke: '#F4664A',
        strokeOpacity: 1,
        lineWidth: 2,
        lineDash: [3, 3],
      },
    },
  ],
});

chart.render();
```

Similarly, we can use the groupY transform to draw median lines for histograms.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/movies.json',
    transform: [{ type: 'filter', callback: (d) => d['IMDB Rating'] > 0 }],
  },
  children: [
    {
      type: 'rect',
      encode: { x: 'IMDB Rating' },
      transform: [{ type: 'binX', y: 'count', thresholds: 9 }],
      scale: { y: { domainMax: 1000 } },
      style: { inset: 1 },
    },
    {
      type: 'lineX',
      encode: { x: 'IMDB Rating' },
      transform: [{ type: 'groupY', x: 'median' }],
      style: {
        stroke: '#F4664A',
        strokeOpacity: 1,
        lineWidth: 2,
        lineDash: [4, 4],
      },
    },
  ],
});

chart.render();
```

### Select

In visualization, when you need to highlight certain special positions (such as start points, end points, or maximum values), the select mark transform is a very flexible and efficient choice. Through select transform, you can filter data based on conditions and mark specific positions. The following example demonstrates how to use selectY to filter **line chart** data and mark **peak positions** in the chart:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  data: [
    { month: 'Jan', city: 'Tokyo', temperature: 7 },
    { month: 'Jan', city: 'London', temperature: 3.9 },
    { month: 'Feb', city: 'Tokyo', temperature: 6.9 },
    { month: 'Feb', city: 'London', temperature: 4.2 },
    { month: 'Mar', city: 'Tokyo', temperature: 9.5 },
    { month: 'Mar', city: 'London', temperature: 5.7 },
    { month: 'Apr', city: 'Tokyo', temperature: 14.5 },
    { month: 'Apr', city: 'London', temperature: 8.5 },
    { month: 'May', city: 'Tokyo', temperature: 18.4 },
    { month: 'May', city: 'London', temperature: 11.9 },
    { month: 'Jun', city: 'Tokyo', temperature: 21.5 },
    { month: 'Jun', city: 'London', temperature: 15.2 },
    { month: 'Jul', city: 'Tokyo', temperature: 25.2 },
    { month: 'Jul', city: 'London', temperature: 17 },
    { month: 'Aug', city: 'Tokyo', temperature: 26.5 },
    { month: 'Aug', city: 'London', temperature: 16.6 },
    { month: 'Sep', city: 'Tokyo', temperature: 23.3 },
    { month: 'Sep', city: 'London', temperature: 14.2 },
    { month: 'Oct', city: 'Tokyo', temperature: 18.3 },
    { month: 'Oct', city: 'London', temperature: 10.3 },
    { month: 'Nov', city: 'Tokyo', temperature: 13.9 },
    { month: 'Nov', city: 'London', temperature: 6.6 },
    { month: 'Dec', city: 'Tokyo', temperature: 9.6 },
    { month: 'Dec', city: 'London', temperature: 4.8 },
  ],
  encode: { x: 'month', y: 'temperature', color: 'city' },
  scale: { x: { range: [0, 1] }, y: { nice: true } },
  axis: { y: { labelFormatter: (d) => d + '°C' } },
  children: [
    { type: 'line', encode: { shape: 'smooth' } },
    {
      type: 'text',
      encode: {
        x: 'month',
        y: 'temperature',
        text: (d) => `Peak: ${d.temperature}`,
      },
      transform: [
        {
          type: 'selectY',
          groupBy: 'color',
          selector: 'max',
        },
      ],
      style: {
        fill: 'orange',
        fontSize: 16,
        dy: -15,
      },
      tooltip: false,
    },
    {
      type: 'point',
      encode: { x: 'month', y: 'temperature' },
      transform: [
        {
          type: 'selectY',
          groupBy: 'color',
          selector: 'max',
        },
      ],
      tooltip: false,
    },
  ],
});

chart.render();
```

## Examples

### Using Multiple Transforms Simultaneously

We can also declare multiple transforms simultaneously. For example, in the penguin example above, if we consider one more data dimension: penguin gender, we can continuously declare binX and stackY transforms. Note that transforms in G2 are executed in order, so swapping the order of binX and stackY in the following example would cause an error.

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
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',

    transform: [
      { type: 'filter', callback: (d) => d.culmen_depth_mm !== null },
    ],
  },
  encode: { x: (d) => +d.culmen_depth_mm, color: 'sex' },
  transform: [
    { type: 'binX', y: 'count' }, // Declare binX transform
    { type: 'stackY', orderBy: 'sum', reverse: true }, // Declare stackY transform
  ],
  style: { insetLeft: 1 },
});

chart.render();
```
