---
title: Multi-set Bar Chart
order: 4
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*kqGUT4wRYrsAAAAAAAAAAAAADmJ7AQ/original'
category: ['comparison']
similar: ['bar', 'stacked-bar', 'histogram']
---

<img alt="multi-set-bar" src="https://os.alipayobjects.com/rmsportal/JKWwZiTPusAHqMg.jpg" width=600/>

## Introduction to Multi-set Bar Charts

A multi-set bar chart, also known as a grouped bar chart or clustered bar chart, is used when you need to display different groups within the same categories on a single axis.

Similar to regular bar charts, it uses the height of bars to map and compare data values. Each group contains bars with different colors or varying transparency to distinguish different categories, with spacing maintained between each group.

Multi-set bar charts are frequently used for comparing data between different groups that all contain the same categorical data.

However, it's important to avoid having too many categories within groups, as this can lead to overcrowded and densely packed bars, significantly affecting chart readability.

**Other Names**: Grouped Bar Chart, Clustered Bar Chart

## Components of Multi-set Bar Charts

<img src="https://os.alipayobjects.com/rmsportal/YzQNmhrLsOTZLfd.png" width=600/>

| Chart Type      | Multi-set Bar Chart                                                                                                                                                                                |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Suitable Data   | A dataset containing two categorical fields and one continuous field                                                                                                                               |
| Functionality   | One categorical field serves as grouping, allowing comparison of data sizes between different categories within the same group, as well as comparison of the same category across different groups |
| Data Mapping    | One categorical field maps to axis positions for grouping, another categorical field is offset within the same group and distinguished by different colors, continuous field maps to bar length    |
| Data Size Limit | No more than 12 groups, with no more than 6 categories per group                                                                                                                                   |

## Use Cases of Multi-set Bar Charts

### Suitable Use Cases

Example 1: **Comparing data of the same category across different groups, and comparing different categories within the same group**

The chart below compares the sales of various game types for "I Am Rich" gaming company across three years: 2001, 2002, and 2003.
The horizontal axis shows different game types, with each game type forming a group in the bar chart, comparing sales numbers for different years within each group.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const data = [
  { year: '2001', genre: 'Sports', sold: 27500 },
  { year: '2001', genre: 'Strategy', sold: 11500 },
  { year: '2001', genre: 'Action', sold: 6000 },
  { year: '2001', genre: 'Shooter', sold: 3500 },
  { year: '2001', genre: 'Other', sold: 1500 },
  { year: '2002', genre: 'Sports', sold: 29500 },
  { year: '2002', genre: 'Strategy', sold: 10500 },
  { year: '2002', genre: 'Action', sold: 8000 },
  { year: '2002', genre: 'Shooter', sold: 4500 },
  { year: '2002', genre: 'Other', sold: 1800 },
  { year: '2003', genre: 'Sports', sold: 30500 },
  { year: '2003', genre: 'Strategy', sold: 12500 },
  { year: '2003', genre: 'Action', sold: 4000 },
  { year: '2003', genre: 'Shooter', sold: 6500 },
  { year: '2003', genre: 'Other', sold: 2000 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 400,
});

chart.options({
  type: 'interval',
  data,
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'year',
  },
  transform: [{ type: 'dodgeX' }],
  axis: {
    y: { title: 'Game Sales' },
    x: { title: 'Game Genre' },
  },
});

chart.render();
```

Explanation:

- `genre` uses the horizontal axis **position** to distinguish different game types
- `year` uses **color** and offset **positions** within the same game type to distinguish sales for different years
- `sold` uses bar **length** to compare sales across different games and years

### Unsuitable Use Cases

Example 1: **Too many groups and categories**

When there are too many groups and categories, it leads to overcrowded and densely packed bars, resulting in poor readability, as shown in the chart below:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

// Complete barley dataset - demonstrating the problem of too many groups
const barleyData = [
  { yield: 27, variety: 'Manchuria', year: 1931, site: 'University Farm' },
  { yield: 48.87, variety: 'Manchuria', year: 1931, site: 'Waseca' },
  { yield: 27.43, variety: 'Manchuria', year: 1931, site: 'Morris' },
  { yield: 39.93, variety: 'Manchuria', year: 1931, site: 'Crookston' },
  { yield: 32.97, variety: 'Manchuria', year: 1931, site: 'Grand Rapids' },
  { yield: 28.97, variety: 'Manchuria', year: 1931, site: 'Duluth' },
  { yield: 43.07, variety: 'Glabron', year: 1931, site: 'University Farm' },
  { yield: 55.2, variety: 'Glabron', year: 1931, site: 'Waseca' },
  { yield: 28.77, variety: 'Glabron', year: 1931, site: 'Morris' },
  { yield: 38.13, variety: 'Glabron', year: 1931, site: 'Crookston' },
  { yield: 29.13, variety: 'Glabron', year: 1931, site: 'Grand Rapids' },
  { yield: 29.67, variety: 'Glabron', year: 1931, site: 'Duluth' },
  { yield: 35.13, variety: 'Svansota', year: 1931, site: 'University Farm' },
  { yield: 47.33, variety: 'Svansota', year: 1931, site: 'Waseca' },
  { yield: 25.77, variety: 'Svansota', year: 1931, site: 'Morris' },
  { yield: 40.47, variety: 'Svansota', year: 1931, site: 'Crookston' },
  { yield: 29.67, variety: 'Svansota', year: 1931, site: 'Grand Rapids' },
  { yield: 25.7, variety: 'Svansota', year: 1931, site: 'Duluth' },
  { yield: 39.9, variety: 'Velvet', year: 1931, site: 'University Farm' },
  { yield: 50.23, variety: 'Velvet', year: 1931, site: 'Waseca' },
  { yield: 26.13, variety: 'Velvet', year: 1931, site: 'Morris' },
  { yield: 41.33, variety: 'Velvet', year: 1931, site: 'Crookston' },
  { yield: 23.03, variety: 'Velvet', year: 1931, site: 'Grand Rapids' },
  { yield: 26.3, variety: 'Velvet', year: 1931, site: 'Duluth' },
  { yield: 36.57, variety: 'Trebi', year: 1931, site: 'University Farm' },
  { yield: 63.83, variety: 'Trebi', year: 1931, site: 'Waseca' },
  { yield: 43.77, variety: 'Trebi', year: 1931, site: 'Morris' },
  { yield: 46.93, variety: 'Trebi', year: 1931, site: 'Crookston' },
  { yield: 29.77, variety: 'Trebi', year: 1931, site: 'Grand Rapids' },
  { yield: 33.93, variety: 'Trebi', year: 1931, site: 'Duluth' },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  paddingLeft: 50,
});

chart.options({
  type: 'interval',
  data: barleyData,
  encode: {
    x: 'site',
    y: 'yield',
    color: 'variety',
  },
  transform: [{ type: 'dodgeX' }],
  axis: {
    x: {
      labelAutoHide: true,
      labelAutoRotate: true,
    },
  },
  tooltip: {
    title: 'site',
  },
});

chart.render();
```

**Optimization Method 1: Show only important data**

Filter or aggregate data to show only the top-ranked or most important groups:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

// Filtered data - showing only top 3 locations to demonstrate optimization effect
const filteredBarleyData = [
  { yield: 27, variety: 'Manchuria', year: 1931, site: 'University Farm' },
  { yield: 48.87, variety: 'Manchuria', year: 1931, site: 'Waseca' },
  { yield: 27.43, variety: 'Manchuria', year: 1931, site: 'Morris' },
  { yield: 43.07, variety: 'Glabron', year: 1931, site: 'University Farm' },
  { yield: 55.2, variety: 'Glabron', year: 1931, site: 'Waseca' },
  { yield: 28.77, variety: 'Glabron', year: 1931, site: 'Morris' },
  { yield: 35.13, variety: 'Svansota', year: 1931, site: 'University Farm' },
  { yield: 47.33, variety: 'Svansota', year: 1931, site: 'Waseca' },
  { yield: 25.77, variety: 'Svansota', year: 1931, site: 'Morris' },
  { yield: 39.9, variety: 'Velvet', year: 1931, site: 'University Farm' },
  { yield: 50.23, variety: 'Velvet', year: 1931, site: 'Waseca' },
  { yield: 26.13, variety: 'Velvet', year: 1931, site: 'Morris' },
  { yield: 36.57, variety: 'Trebi', year: 1931, site: 'University Farm' },
  { yield: 63.83, variety: 'Trebi', year: 1931, site: 'Waseca' },
  { yield: 43.77, variety: 'Trebi', year: 1931, site: 'Morris' },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  paddingLeft: 50,
});

chart.options({
  type: 'interval',
  data: filteredBarleyData,
  encode: {
    x: 'site',
    y: 'yield',
    color: 'variety',
  },
  transform: [{ type: 'dodgeX' }],
  axis: {
    x: {
      labelAutoHide: true,
      labelAutoRotate: true,
    },
  },
  tooltip: {
    title: 'site',
  },
});

chart.render();
```

**Optimization Method 2: Use stacked bar charts**

If you need to display complete data, we recommend using stacked bar charts to reduce chart width and improve readability:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

// Complete barley dataset - demonstrating stacked bar chart optimization effect
const barleyData = [
  { yield: 27, variety: 'Manchuria', year: 1931, site: 'University Farm' },
  { yield: 48.87, variety: 'Manchuria', year: 1931, site: 'Waseca' },
  { yield: 27.43, variety: 'Manchuria', year: 1931, site: 'Morris' },
  { yield: 39.93, variety: 'Manchuria', year: 1931, site: 'Crookston' },
  { yield: 32.97, variety: 'Manchuria', year: 1931, site: 'Grand Rapids' },
  { yield: 28.97, variety: 'Manchuria', year: 1931, site: 'Duluth' },
  { yield: 43.07, variety: 'Glabron', year: 1931, site: 'University Farm' },
  { yield: 55.2, variety: 'Glabron', year: 1931, site: 'Waseca' },
  { yield: 28.77, variety: 'Glabron', year: 1931, site: 'Morris' },
  { yield: 38.13, variety: 'Glabron', year: 1931, site: 'Crookston' },
  { yield: 29.13, variety: 'Glabron', year: 1931, site: 'Grand Rapids' },
  { yield: 29.67, variety: 'Glabron', year: 1931, site: 'Duluth' },
  { yield: 35.13, variety: 'Svansota', year: 1931, site: 'University Farm' },
  { yield: 47.33, variety: 'Svansota', year: 1931, site: 'Waseca' },
  { yield: 25.77, variety: 'Svansota', year: 1931, site: 'Morris' },
  { yield: 40.47, variety: 'Svansota', year: 1931, site: 'Crookston' },
  { yield: 29.67, variety: 'Svansota', year: 1931, site: 'Grand Rapids' },
  { yield: 25.7, variety: 'Svansota', year: 1931, site: 'Duluth' },
  { yield: 39.9, variety: 'Velvet', year: 1931, site: 'University Farm' },
  { yield: 50.23, variety: 'Velvet', year: 1931, site: 'Waseca' },
  { yield: 26.13, variety: 'Velvet', year: 1931, site: 'Morris' },
  { yield: 41.33, variety: 'Velvet', year: 1931, site: 'Crookston' },
  { yield: 23.03, variety: 'Velvet', year: 1931, site: 'Grand Rapids' },
  { yield: 26.3, variety: 'Velvet', year: 1931, site: 'Duluth' },
  { yield: 36.57, variety: 'Trebi', year: 1931, site: 'University Farm' },
  { yield: 63.83, variety: 'Trebi', year: 1931, site: 'Waseca' },
  { yield: 43.77, variety: 'Trebi', year: 1931, site: 'Morris' },
  { yield: 46.93, variety: 'Trebi', year: 1931, site: 'Crookston' },
  { yield: 29.77, variety: 'Trebi', year: 1931, site: 'Grand Rapids' },
  { yield: 33.93, variety: 'Trebi', year: 1931, site: 'Duluth' },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  paddingLeft: 50,
});

chart.options({
  type: 'interval',
  data: barleyData,
  encode: {
    x: 'site',
    y: 'yield',
    color: 'variety',
  },
  transform: [{ type: 'stackY' }],
  axis: {
    x: {
      labelAutoHide: true,
      labelAutoRotate: true,
    },
  },
  tooltip: {
    title: 'site',
  },
});

chart.render();
```

**Optimization Method 3: Use horizontal stacked bar charts**

For large amounts of data, horizontal stacked bar charts are a better choice, making full use of vertical space to display more categories:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

// 完整的barley数据集 - 演示横向堆叠柱状图的优化效果
const barleyData = [
  { yield: 27, variety: 'Manchuria', year: 1931, site: 'University Farm' },
  { yield: 48.87, variety: 'Manchuria', year: 1931, site: 'Waseca' },
  { yield: 27.43, variety: 'Manchuria', year: 1931, site: 'Morris' },
  { yield: 39.93, variety: 'Manchuria', year: 1931, site: 'Crookston' },
  { yield: 32.97, variety: 'Manchuria', year: 1931, site: 'Grand Rapids' },
  { yield: 28.97, variety: 'Manchuria', year: 1931, site: 'Duluth' },
  { yield: 43.07, variety: 'Glabron', year: 1931, site: 'University Farm' },
  { yield: 55.2, variety: 'Glabron', year: 1931, site: 'Waseca' },
  { yield: 28.77, variety: 'Glabron', year: 1931, site: 'Morris' },
  { yield: 38.13, variety: 'Glabron', year: 1931, site: 'Crookston' },
  { yield: 29.13, variety: 'Glabron', year: 1931, site: 'Grand Rapids' },
  { yield: 29.67, variety: 'Glabron', year: 1931, site: 'Duluth' },
  { yield: 35.13, variety: 'Svansota', year: 1931, site: 'University Farm' },
  { yield: 47.33, variety: 'Svansota', year: 1931, site: 'Waseca' },
  { yield: 25.77, variety: 'Svansota', year: 1931, site: 'Morris' },
  { yield: 40.47, variety: 'Svansota', year: 1931, site: 'Crookston' },
  { yield: 29.67, variety: 'Svansota', year: 1931, site: 'Grand Rapids' },
  { yield: 25.7, variety: 'Svansota', year: 1931, site: 'Duluth' },
  { yield: 39.9, variety: 'Velvet', year: 1931, site: 'University Farm' },
  { yield: 50.23, variety: 'Velvet', year: 1931, site: 'Waseca' },
  { yield: 26.13, variety: 'Velvet', year: 1931, site: 'Morris' },
  { yield: 41.33, variety: 'Velvet', year: 1931, site: 'Crookston' },
  { yield: 23.03, variety: 'Velvet', year: 1931, site: 'Grand Rapids' },
  { yield: 26.3, variety: 'Velvet', year: 1931, site: 'Duluth' },
  { yield: 36.57, variety: 'Trebi', year: 1931, site: 'University Farm' },
  { yield: 63.83, variety: 'Trebi', year: 1931, site: 'Waseca' },
  { yield: 43.77, variety: 'Trebi', year: 1931, site: 'Morris' },
  { yield: 46.93, variety: 'Trebi', year: 1931, site: 'Crookston' },
  { yield: 29.77, variety: 'Trebi', year: 1931, site: 'Grand Rapids' },
  { yield: 33.93, variety: 'Trebi', year: 1931, site: 'Duluth' },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 400,
});

chart.options({
  type: 'interval',
  data: barleyData,
  coordinate: {
    transform: [{ type: 'transpose' }],
  },
  encode: {
    x: 'site',
    y: 'yield',
    color: 'variety',
  },
  transform: [{ type: 'stackY' }, { type: 'sortX', by: 'y', reverse: true }],
  axis: {
    y: {
      labelAutoHide: false,
      title: 'Yield (bushels/acre)',
    },
    x: {
      labelAutoHide: false,
    },
  },
  tooltip: {
    title: 'site',
  },
});

chart.render();
```

## Extensions of Multi-set Bar Charts

### Horizontal Multi-set Bar Charts

When group names are long or you need to display more groups, you can use horizontal multi-set bar charts:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const data = [
  { category: 'Sports Games', year: '2001', sold: 27500 },
  { category: 'Strategy Games', year: '2001', sold: 11500 },
  { category: 'Action Games', year: '2001', sold: 6000 },
  { category: 'Shooter Games', year: '2001', sold: 3500 },
  { category: 'Sports Games', year: '2002', sold: 29500 },
  { category: 'Strategy Games', year: '2002', sold: 10500 },
  { category: 'Action Games', year: '2002', sold: 8000 },
  { category: 'Shooter Games', year: '2002', sold: 4500 },
  { category: 'Sports Games', year: '2003', sold: 30500 },
  { category: 'Strategy Games', year: '2003', sold: 12500 },
  { category: 'Action Games', year: '2003', sold: 4000 },
  { category: 'Shooter Games', year: '2003', sold: 6500 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 400,
});

chart.options({
  type: 'interval',
  data,
  coordinate: { transform: [{ type: 'transpose' }] },
  encode: {
    x: 'sold',
    y: 'category',
    color: 'year',
  },
  transform: [{ type: 'dodgeX' }],
  axis: {
    x: { title: 'Game Sales' },
    y: { title: 'Game Type' },
  },
});

chart.render();
```

## Comparing Multi-set Bar Charts to Other Charts

### Multi-set Bar Charts and Regular Bar Charts

- Multi-set bar charts can add an additional dimension for comparing data values of different categories within a group, capable of representing 3 data fields (dimensions), while regular bar charts can only represent 2 data fields (dimensions)
- Multi-set bar charts have more bars, so they can display fewer groups

### Multi-set Bar Charts and Stacked Bar Charts

- Multi-set bar charts can compare data sizes of different categories within the same group, as well as compare data sizes of the same category across different groups, but cannot compare the total amounts of each group
- Stacked bar charts can compare data sizes or proportions of different categories within the same group and can also compare group totals, but are not suitable for comparing data sizes of the same category across different groups

## Similar Charts

<code src="./demos/list-card.tsx"></code>

## Categories

<code src="./demos/list-category.tsx"></code>
