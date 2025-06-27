---
title: Bar Chart
order: 2
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*kvZLSLxjnkIAAAAAAAAAAAAADmJ7AQ/original'
category: ['comparison']
similar: ['histogram', 'multi-set-bar', 'stacked-bar', 'radial-bar']
---

## Introduction to Bar Charts

A typical bar chart, also known as a column chart, uses vertical or horizontal bars to display comparisons between different categories. One axis represents the categories being compared, while the other axis denotes the corresponding values.

Unlike [histograms](/en/charts/histogram), bar charts cannot show changes in data across a continuous range. Instead, they represent categorical data and answer the question: "How many are there in each category?"

It’s important to note that bar charts can become cluttered when displaying too many categories, leading to overlapping labels and legibility issues. We'll demonstrate this below.

**English Names**: Column Chart, Bar Chart

## Components of a Bar Chart

### Vertical Bar Chart

<img alt="bar-vertical" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*AubySIbXrHMAAAAAAAAAAAAAemJ7AQ/original" width=600 />

| Chart Type      | Vertical Bar Chart                                                                                                                                                   |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Suitable Data   | A dataset containing one categorical field and one numerical field                                                                                                   |
| Functionality   | Compares the size of numerical values across categories                                                                                                              |
| Data Mapping    | Categorical data maps to the horizontal axis position<br>Numerical data maps to bar height<br>Categorical data can also map to color for better category distinction |
| Data Size Limit | Recommended for no more than 12 data points                                                                                                                          |

---

### Horizontal Bar Chart

<img alt="bar-horizontal" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*0SFtS6e6gYoAAAAAAAAAAAAAemJ7AQ/original" width=600/>

| Chart Type      | Horizontal Bar Chart                                                           |
| --------------- | ------------------------------------------------------------------------------ |
| Suitable Data   | A dataset containing one categorical field and one numerical field             |
| Functionality   | Compares the size of numerical values across categories                        |
| Data Mapping    | Categorical data maps to the vertical axis<br>Numerical data maps to bar width |
| Data Size Limit | Recommended for no more than 30 data points                                    |

---

## Use Cases for Bar Charts

### Appropriate Use Cases

Example 1: **Comparing Categorical Data**

The chart below compares the sales of different game genres.

| Genre    | Sales  |
| -------- | ------ |
| Sports   | 27,500 |
| Strategy | 11,500 |
| Action   | 6,000  |
| Shooter  | 3,500  |
| Other    | 1,500  |

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold', color: 'genre' },
  interaction: [
    {
      type: 'elementHighlight',
      background: true,
      region: true,
    },
  ],
});

chart.render();
```

**Explanation**:

- The `genre` field maps to both position and color, differentiating game categories.
- The `sold` field maps to the bar length to represent sales volume.

---

### Inappropriate Use Cases

Example 1: **Too Many Categories for a Vertical Bar Chart**

When comparing population sizes across provinces, too many categories can cause text overlap issues, making labels harder to read. In such cases, horizontal bar charts are more effective.

| Province | Population |
| -------- | ---------- |
| Beijing  | 19,612,368 |
| Tianjin  | 12,938,693 |
| Hebei    | 71,854,210 |
| ...      | ...        |

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { province: 'Beijing', population: 19612368 },
    { province: 'Tianjin', population: 12938693 },
    { province: 'Hebei', population: 71854210 },
    { province: 'Shanxi', population: 27500000 },
    { province: 'Inner Mongolia', population: 24706291 },
    { province: 'Liaoning', population: 43746323 },
    { province: 'Jilin', population: 27452815 },
    { province: 'Heilongjiang', population: 38313991 },
    { province: 'Shanghai', population: 23019196 },
    { province: 'Jiangsu', population: 78660941 },
    { province: 'Zhejiang', population: 54426891 },
    { province: 'Anhui', population: 59500468 },
    { province: 'Fujian', population: 36894217 },
    { province: 'Jiangxi', population: 44567797 },
    { province: 'Shandong', population: 95792719 },
    { province: 'Henan', population: 94029939 },
    { province: 'Hubei', population: 57237727 },
    { province: 'Hunan', population: 65700762 },
    { province: 'Guangdong', population: 104320459 },
    { province: 'Guangxi', population: 46023761 },
    { province: 'Hainan', population: 8671485 },
    { province: 'Chongqing', population: 28846170 },
    { province: 'Sichuan', population: 80417528 },
    { province: 'Guizhou', population: 34748556 },
    { province: 'Yunnan', population: 45966766 },
    { province: 'Tibet', population: 3002165 },
    { province: 'Shaanxi', population: 37327379 },
    { province: 'Gansu', population: 25575263 },
    { province: 'Qinghai', population: 5626723 },
  ],
  encode: { x: 'province', y: 'population' },
  axis: {
    y: {
      title: null,
    },
    x: {
      title: null,
      labelFontSize: 12,

      size: 100, // Size must be set
      labelAutoEllipsis: {
        suffix: '..',
        minLength: 8,
        maxLength: 12,
      },
      labelAutoWrap: {
        wordWrapWidth: 80,
        maxLines: 2,
        recoverWhenFailed: true,
      },
      labelAutoRotate: {
        optionalAngles: [0, 45, 90], // Attempt to rotate by 0 degrees, 45 degrees, or 90 degrees
        recoverWhenFailed: true, // If rotation fails, revert to the default angle
      },
      labelAutoHide: {
        keepHeader: true, // Retain the first tick label
        keepTail: true, // Retain the last tick label
      },
    },
  },
  interaction: [
    {
      type: 'elementHighlight',
      background: true,
      region: true,
    },
  ],
});

chart.render();
```

Switching to a horizontal bar chart makes labels easier to read, as shown below:

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { province: 'Beijing', population: 19612368 },
    { province: 'Tianjin', population: 12938693 },
    { province: 'Hebei', population: 71854210 },
    { province: 'Shanxi', population: 27500000 },
    { province: 'Inner Mongolia', population: 24706291 },
    { province: 'Liaoning', population: 43746323 },
    { province: 'Jilin', population: 27452815 },
    { province: 'Heilongjiang', population: 38313991 },
    { province: 'Shanghai', population: 23019196 },
    { province: 'Jiangsu', population: 78660941 },
    { province: 'Zhejiang', population: 54426891 },
    { province: 'Anhui', population: 59500468 },
    { province: 'Fujian', population: 36894217 },
    { province: 'Jiangxi', population: 44567797 },
    { province: 'Shandong', population: 95792719 },
    { province: 'Henan', population: 94029939 },
    { province: 'Hubei', population: 57237727 },
    { province: 'Hunan', population: 65700762 },
    { province: 'Guangdong', population: 104320459 },
    { province: 'Guangxi', population: 46023761 },
    { province: 'Hainan', population: 8671485 },
    { province: 'Chongqing', population: 28846170 },
    { province: 'Sichuan', population: 80417528 },
    { province: 'Guizhou', population: 34748556 },
    { province: 'Yunnan', population: 45966766 },
    { province: 'Tibet', population: 3002165 },
    { province: 'Shaanxi', population: 37327379 },
    { province: 'Gansu', population: 25575263 },
    { province: 'Qinghai', population: 5626723 },
  ],
  encode: { x: 'province', y: 'population' },
  coordinate: { transform: [{ type: 'transpose' }] },
  axis: {
    y: {
      title: null,
    },
    x: {
      title: null,
    },
  },
  interaction: [
    {
      type: 'elementHighlight',
      background: true,
      region: true,
    },
  ],
});

chart.render();
```

Example 2: **Not Suitable for Trends**

Bar charts use bar length to compare categorical data but are not effective for showing continuous trends.

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { day: '2015/9/1', share: 10 },
    { day: '2015/9/2', share: 12 },
    { day: '2015/9/3', share: 11 },
    { day: '2015/9/4', share: 15 },
    { day: '2015/9/5', share: 20 },
    { day: '2015/9/6', share: 22 },
    { day: '2015/9/7', share: 21 },
    { day: '2015/9/8', share: 25 },
    { day: '2015/9/9', share: 31 },
    { day: '2015/9/10', share: 32 },
    { day: '2015/9/11', share: 28 },
    { day: '2015/9/12', share: 29 },
    { day: '2015/9/13', share: 40 },
    { day: '2015/9/14', share: 41 },
    { day: '2015/9/15', share: 45 },
    { day: '2015/9/16', share: 50 },
    { day: '2015/9/17', share: 65 },
    { day: '2015/9/18', share: 45 },
    { day: '2015/9/19', share: 50 },
    { day: '2015/9/20', share: 51 },
    { day: '2015/9/21', share: 65 },
    { day: '2015/9/22', share: 60 },
    { day: '2015/9/23', share: 62 },
    { day: '2015/9/24', share: 65 },
    { day: '2015/9/25', share: 45 },
    { day: '2015/9/26', share: 55 },
    { day: '2015/9/27', share: 59 },
    { day: '2015/9/28', share: 52 },
    { day: '2015/9/29', share: 53 },
    { day: '2015/9/30', share: 40 },
  ],
  encode: { x: 'day', y: 'share' },
  axis: {
    y: {
      title: null,
    },
    x: {
      title: null,
    },
  },
  interaction: [
    {
      type: 'elementHighlight',
      background: true,
      region: true,
    },
  ],
});

chart.render();
```

For instance, a bar chart is less ideal for showing daily stock prices for September 2015 compared to a [line chart](/en/charts/line) or [area chart](/en/charts/area).

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'view',
  autoFit: true,
  data: [
    { day: '2015/9/1', share: 10 },
    { day: '2015/9/2', share: 12 },
    { day: '2015/9/3', share: 11 },
    { day: '2015/9/4', share: 15 },
    { day: '2015/9/5', share: 20 },
    { day: '2015/9/6', share: 22 },
    { day: '2015/9/7', share: 21 },
    { day: '2015/9/8', share: 25 },
    { day: '2015/9/9', share: 31 },
    { day: '2015/9/10', share: 32 },
    { day: '2015/9/11', share: 28 },
    { day: '2015/9/12', share: 29 },
    { day: '2015/9/13', share: 40 },
    { day: '2015/9/14', share: 41 },
    { day: '2015/9/15', share: 45 },
    { day: '2015/9/16', share: 50 },
    { day: '2015/9/17', share: 65 },
    { day: '2015/9/18', share: 45 },
    { day: '2015/9/19', share: 50 },
    { day: '2015/9/20', share: 51 },
    { day: '2015/9/21', share: 65 },
    { day: '2015/9/22', share: 60 },
    { day: '2015/9/23', share: 62 },
    { day: '2015/9/24', share: 65 },
    { day: '2015/9/25', share: 45 },
    { day: '2015/9/26', share: 55 },
    { day: '2015/9/27', share: 59 },
    { day: '2015/9/28', share: 52 },
    { day: '2015/9/29', share: 53 },
    { day: '2015/9/30', share: 40 },
  ],
  encode: { x: 'day', y: 'share' },
  axis: {
    y: {
      title: null,
    },
    x: {
      title: null,
      tickFilter: (_, i) => i % 2 !== 0, // Filter the tick marks on the x-axis to display only every other tick.
    },
  },
  children: [
    {
      type: 'area',
      style: {
        opacity: 0.6,
      },
    },
    {
      type: 'line',
      style: {
        lineWidth: 3,
      },
    },
  ],
});

chart.render();
```

## Comparing Bar Charts to Other Charts

### Bar Charts, [Line Charts](/en/charts/line), and [Pie Charts](/en/charts/pie)

- Bar charts are primarily used to compare data (such as size or values) across multiple categories.
- Line charts are mainly used to show trends in continuous data (e.g., time) or ordered categories.
- Pie charts are used to display the proportion of each category relative to the whole.

### Bar Charts and Nightingale Charts (Rose Diagrams)

- A Nightingale chart (rose diagram) compares data using the size of the radius.
- A bar chart compares data based on the length of the bars.

---

## Related Charts

<code src="./demos/list-card.tsx"></code>

---

## Categories

<code src="./demos/list-category.tsx"></code>
