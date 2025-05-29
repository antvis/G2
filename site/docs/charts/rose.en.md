---
title: Rose Chart
order: 15
screenshot: 'https://os.alipayobjects.com/rmsportal/nstvbQupOcPOzIw.jpg'
category: ['comparison']
similar: ['radial-bar', 'histogram']
---

<img alt="rose" src="https://os.alipayobjects.com/rmsportal/nstvbQupOcPOzIw.jpg" width=600/>

## Introduction to Rose Chart

The Nightingale Rose Chart (also known as Coxcomb Chart or Polar Area Diagram) was invented by Florence Nightingale during the Crimean War when she submitted a report on soldier casualties.

The Nightingale Rose Chart is essentially a bar chart drawn in polar coordinates, using the radius length of the circular arcs to represent data magnitude (quantity).

- Due to the squared relationship between radius and area, the Nightingale Rose Chart amplifies data proportions, making it especially suitable for comparing values that are similar in magnitude.
- Due to the cyclical nature of circles, rose charts are also suitable for representing time concepts within a cycle, such as days of the week or months.

**Other Names**: Nightingale Rose Chart, Coxcomb Chart, Polar Area Diagram

## Components of Rose Chart

<img alt="rose-structure" src="https://t.alipayobjects.com/images/T1f7djXhBXXXXXXXXX.png" width=600/>

| Chart Type           | Rose Chart                                                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Suitable Data        | List: one categorical data field, one continuous data field                                                                    |
| Function             | Compare numerical values of categorical data                                                                                    |
| Data-Graphics Mapping| Categorical data field maps to position on categorical axis<br>Continuous data field maps to radius axis height<br>Categorical data can also use color to enhance category distinction |
| Suitable Data Count  | No more than 30 data points                                                                                                    |

## Use Cases of Rose Charts

### Suitable Use Cases

Example 1: **Comparing different categories**

The chart below compares manufacturing indices of various countries, with the US as baseline (100). China's manufacturing cost index is 96, meaning that for the same product, if it costs $1 to manufacture in the US, it would cost $0.96 in China. The chart shows that China's manufacturing advantage is no longer prominent.

| country | cost (Manufacturing Index) |
| ------- | -------------------------- |
| China   | 96                         |
| Germany | 121                        |
| USA     | 100                        |
| Japan   | 111                        |
| Korea   | 102                        |
| ...     | ...                        |

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  autoFit: true,
  coordinate: { type: 'polar' },
  data: [
    { country: 'China', cost: 96 },
    { country: 'Germany', cost: 121 },
    { country: 'USA', cost: 100 },
    { country: 'Japan', cost: 111 },
    { country: 'Korea', cost: 102 },
    { country: 'France', cost: 124 },
    { country: 'Italy', cost: 123 },
    { country: 'Netherlands', cost: 111 },
    { country: 'Belgium', cost: 123 },
    { country: 'UK', cost: 109 },
    { country: 'Canada', cost: 115 },
    { country: 'Russia', cost: 99 },
    { country: 'Mexico', cost: 91 },
    { country: 'India', cost: 87 },
    { country: 'Switzerland', cost: 125 },
    { country: 'Australia', cost: 130 },
    { country: 'Spain', cost: 109 },
    { country: 'Brazil', cost: 123 },
    { country: 'Thailand', cost: 91 },
    { country: 'Indonesia', cost: 83 },
    { country: 'Poland', cost: 101 },
    { country: 'Sweden', cost: 116 },
    { country: 'Austria', cost: 111 },
    { country: 'Czech', cost: 107 },
  ],
  encode: { 
    x: 'country', 
    y: 'cost', 
    color: 'country' 
  },
  scale: { 
    y: { nice: true },
    color: { palette: 'category20' }
  },
  axis: {
    y: { labelFormatter: null },
    x: { grid: true }
  },
  interaction: [
    {
      type: 'elementHighlight',
      background: true,
    },
  ],
});

chart.render();
```

### Unsuitable Use Cases

Example 1: **Too few categories**

The chart below shows the number of male and female students in a class. For such scenarios, pie chart is recommended.

| gender | count |
| ------ | ----- |
| Male   | 40    |
| Female | 30    |

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  autoFit: true,
  coordinate: { type: 'polar' },
  data: [
    { gender: 'Male', count: 40 },
    { gender: 'Female', count: 30 },
  ],
  encode: { 
    x: 'gender', 
    y: 'count', 
    color: 'gender' 
  },
  scale: { 
    y: { nice: true, min: 0 }
  },
});

chart.render();
```

Example 2: **Categories with very small values**

Using a rose chart to display population data for different provinces is inappropriate because categories with very small values become extremely difficult to observe in rose charts. Horizontal bar chart is recommended instead.

| province | population  |
| -------- | ----------- |
| Beijing  | 19,612,368  |
| Tianjin  | 12,938,693  |
| Hebei    | 71,854,210  |
| Shanxi   | 27,500,000  |
| ...      | ...         |

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  autoFit: true,
  coordinate: { type: 'polar' },
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
  encode: { 
    x: 'province', 
    y: 'population', 
    color: 'province' 
  },
  scale: { 
    y: { nice: true },
    color: { palette: 'category20' }
  },
  axis: {
    y: { labelFormatter: null },
    x: { 
      labelFormatter: (text) => text.length > 6 ? text.slice(0, 6) + '...' : text,
      labelRotate: Math.PI / 4 
    }
  },
});

chart.render();
```

## Extensions of Rose Charts

### Fan-shaped Rose Chart

By setting the start angle of polar coordinates, you can create fan-shaped Nightingale Rose Charts:

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  autoFit: true,
  coordinate: { 
    type: 'polar',
    startAngle: Math.PI,
    endAngle: Math.PI * (3 / 2)
  },
  data: [
    { country: 'China', cost: 96 },
    { country: 'Germany', cost: 121 },
    { country: 'USA', cost: 100 },
    { country: 'Japan', cost: 111 },
    { country: 'Korea', cost: 102 },
    { country: 'France', cost: 124 },
    { country: 'Italy', cost: 123 },
    { country: 'Netherlands', cost: 111 },
    { country: 'Belgium', cost: 123 },
    { country: 'UK', cost: 109 },
    { country: 'Canada', cost: 115 },
    { country: 'Russia', cost: 99 },
  ],
  encode: { 
    x: 'country', 
    y: 'cost', 
    color: 'country' 
  },
  scale: { 
    y: { nice: true },
    color: { range: ['#fc8f48', '#ffd787'] }
  },
  style: {
    lineWidth: 1,
    stroke: '#fff'
  },
  labels: [
    {
      text: 'cost',
      style: {
        textAlign: 'center',
        fontSize: 10,
        fontWeight: 'bold'
      },
      transform: [{ type: 'overlapDodgeY' }]
    }
  ]
});

chart.render();
```

### Stacked Rose Chart

The Nightingale Rose Chart is implemented by drawing bar charts in polar coordinates. If we extend bar charts to stacked bar charts, we can similarly create stacked rose charts.

The chart below shows refugee data from the past decade, which can be roughly divided into refugees (those who crossed borders), internally displaced persons (those who didn't cross borders), and asylum-seekers (those who haven't yet obtained refugee status).

| year | internally (Internally Displaced) | refugees (Cross-border Refugees) | seekers (Asylum Seekers) |
| ---- | --------------------------------- | -------------------------------- | ------------------------ |
| 2000 | 21.0                              | 16                               | 0.8                      |
| 2001 | 25.0                              | 16                               | 0.8                      |
| ...  | ...                               | ...                              | ...                      |

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  autoFit: true,
  coordinate: { 
    type: 'polar',
    innerRadius: 0.1
  },
  data: [
    { year: '2000', type: 'Internally Displaced', count: 21.0 },
    { year: '2000', type: 'Cross-border Refugees', count: 16 },
    { year: '2000', type: 'Asylum Seekers', count: 0.8 },
    { year: '2001', type: 'Internally Displaced', count: 25.0 },
    { year: '2001', type: 'Cross-border Refugees', count: 16 },
    { year: '2001', type: 'Asylum Seekers', count: 0.8 },
    { year: '2002', type: 'Internally Displaced', count: 25.0 },
    { year: '2002', type: 'Cross-border Refugees', count: 15 },
    { year: '2002', type: 'Asylum Seekers', count: 0.8 },
    { year: '2003', type: 'Internally Displaced', count: 25.0 },
    { year: '2003', type: 'Cross-border Refugees', count: 14 },
    { year: '2003', type: 'Asylum Seekers', count: 0.7 },
    { year: '2004', type: 'Internally Displaced', count: 25.0 },
    { year: '2004', type: 'Cross-border Refugees', count: 14 },
    { year: '2004', type: 'Asylum Seekers', count: 0.7 },
    { year: '2005', type: 'Internally Displaced', count: 24.0 },
    { year: '2005', type: 'Cross-border Refugees', count: 13 },
    { year: '2005', type: 'Asylum Seekers', count: 0.8 },
    { year: '2006', type: 'Internally Displaced', count: 24.0 },
    { year: '2006', type: 'Cross-border Refugees', count: 14 },
    { year: '2006', type: 'Asylum Seekers', count: 0.7 },
    { year: '2007', type: 'Internally Displaced', count: 26.0 },
    { year: '2007', type: 'Cross-border Refugees', count: 16 },
    { year: '2007', type: 'Asylum Seekers', count: 0.7 },
    { year: '2008', type: 'Internally Displaced', count: 26.0 },
    { year: '2008', type: 'Cross-border Refugees', count: 15.2 },
    { year: '2008', type: 'Asylum Seekers', count: 0.8 },
    { year: '2009', type: 'Internally Displaced', count: 27.1 },
    { year: '2009', type: 'Cross-border Refugees', count: 15.2 },
    { year: '2009', type: 'Asylum Seekers', count: 1.0 },
    { year: '2010', type: 'Internally Displaced', count: 27.5 },
    { year: '2010', type: 'Cross-border Refugees', count: 15.4 },
    { year: '2010', type: 'Asylum Seekers', count: 0.8 },
    { year: '2011', type: 'Internally Displaced', count: 26.4 },
    { year: '2011', type: 'Cross-border Refugees', count: 15.2 },
    { year: '2011', type: 'Asylum Seekers', count: 0.9 },
    { year: '2012', type: 'Internally Displaced', count: 28.8 },
    { year: '2012', type: 'Cross-border Refugees', count: 15.4 },
    { year: '2012', type: 'Asylum Seekers', count: 0.9 },
    { year: '2013', type: 'Internally Displaced', count: 33.3 },
    { year: '2013', type: 'Cross-border Refugees', count: 16.7 },
    { year: '2013', type: 'Asylum Seekers', count: 1.2 },
    { year: '2014', type: 'Internally Displaced', count: 38.2 },
    { year: '2014', type: 'Cross-border Refugees', count: 19.5 },
    { year: '2014', type: 'Asylum Seekers', count: 1.8 },
  ],
  encode: { 
    x: 'year', 
    y: 'count',
    color: 'type',
    series: 'type'
  },
  transform: [{ type: 'stackY' }],
  scale: { 
    color: { 
      range: ['rgb(136,186,174)', 'rgb(184,189,61)', 'rgb(107,136,138)'] 
    }
  },
  style: {
    stroke: 'white',
    lineWidth: 1
  }
});

chart.render();
```

## Comparing Rose Charts to Other Charts

### Rose Charts and Bar Charts

- Rose charts are essentially bar charts displayed in polar coordinates
- Bar charts use rectangle height to represent data values
- Rose charts use the radius size of sectors to represent data values

### Rose Charts and Pie Charts

- Rose charts use sector radius to represent data values, while pie charts use sector arc length to represent data values
- Rose charts can display more categories simultaneously than pie charts

## Similar Charts

<code src="./demos/list-card.tsx"></code>

## Categories

<code src="./demos/list-category.tsx"></code>
