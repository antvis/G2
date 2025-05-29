---
title: Heatmap
order: 7
screenshot: 'https://os.alipayobjects.com/rmsportal/JeleDrjVnkyfPpS.png'
category: ['distribution', 'comparison']
similar: ['histogram', 'contourline', 'scatter', 'bubble']
---

<img alt="heatmap" src="https://os.alipayobjects.com/rmsportal/JeleDrjVnkyfPpS.png" width=600/>

## Introduction to Heatmaps

A heatmap is a visualization technique that uses color intensity to map the density or magnitude of two-dimensional data, excelling at revealing distribution patterns, clusters, and anomalies. Heatmaps map two categorical or continuous fields (such as x, y) to coordinate axes and a third numerical field (such as value) to a color gradient, forming a grid-like matrix of colored cells. Typically, cool colors (like blue) represent low values and warm colors (like red) represent high values.

Heatmaps are particularly suitable for displaying the distribution characteristics of large amounts of data points. Through color variations, they intuitively reflect density or intensity changes in a dataset, helping to identify patterns and relationships. When displaying multi-dimensional data, heatmaps are more intuitive than bar charts or scatter plots, clearly showing areas of data concentration and sparsity at a glance.

Heatmaps are widely used in geographic spatial analysis, website user behavior research, correlation analysis in scientific research, and many other scenarios.

**Other Names**: Heat Map, Thermal Map

## Components of a Heatmap

### Heatmap with Unsmoothed Boundaries

<img alt="basic-heatmap" src="https://os.alipayobjects.com/rmsportal/dbxsqRSCIYXcEeW.png" width=600 />

| Chart Type       | Heatmap with Unsmoothed Boundaries                                               |
| ---------------- | ----------------------------------------------------------------------------------- |
| Suitable Data    | Three continuous fields                                                            |
| Function         | Observe data distribution patterns                                                 |
| Data-to-Visual Mapping | Two continuous fields mapped to x-axis and y-axis respectively. One continuous metadata mapped to color |
| Suitable Data Volume | More than 30 data points                                                        |

---

### Heatmap with Smoothed Boundaries

<img alt="density-heatmap" src="https://os.alipayobjects.com/rmsportal/XKeijYcqHgbSLHN.png" width=600/>

| Chart Type       | Heatmap with Smoothed Boundaries                                                 |
| ---------------- | ----------------------------------------------------------------------------------- |
| Suitable Data    | Three continuous fields                                                            |
| Function         | Display data distribution patterns, with statistical algorithms to predict data in unknown areas |
| Data-to-Visual Mapping | Two continuous fields mapped to x-axis and y-axis respectively. One continuous metadata mapped to color |
| Suitable Data Volume | More than 30 data points                                                        |

## Use Cases of Heatmaps

### Suitable Use Cases

Example 1: **Suitable for displaying two-dimensional data distribution density**

The heatmap below shows the temperature distribution in a two-dimensional space. Through color variations, you can intuitively see temperature differences across different areas.

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  padding: 0,
});

chart.options({
  type: 'view',
  axis: false,
  children: [
    {
      type: 'image',
      style: {
        src: 'https://gw.alipayobjects.com/zos/rmsportal/NeUTMwKtPcPxIFNTWZOZ.png',
        x: '50%',
        y: '50%',
        width: '100%',
        height: '100%',
      },
      tooltip: false
    },
    {
      type: 'heatmap',
      data: {
        type: 'fetch',
        value: 'https://assets.antv.antgroup.com/g2/heatmap.json',
      },
      encode: { 
        x: 'g', 
        y: 'l', 
        color: 'tmp' 
      },
      style: { 
        opacity: 0 
      },
      tooltip: false
    }
  ]
});

chart.render();
```

**Notes**:
- The `g` field is mapped to the x-axis and the `l` field to the y-axis, representing positions in two-dimensional space
- The `tmp` field is mapped to color, representing the temperature value at each position
- Background image and heat overlay provide an intuitive display of temperature distribution

Example 2: **Suitable for displaying density distribution of scatter data**

Density heatmaps can show concentration areas of scatter data. The example below shows the relationship between carat and price in a diamond dataset.

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';
import DataSet from '@antv/data-set';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/diamond.json',
  },
  scale: {
    x: { nice: true, domainMin: -0.5 },
    y: { nice: true, domainMin: -2000 },
    color: { nice: true },
  },
  children: [
    {
      type: 'heatmap',
      data: {
        transform: [
          {
            type: 'custom',
            callback: (data) => {
              const dv = new DataSet.View().source(data);
              dv.transform({
                type: 'kernel-smooth.density',
                fields: ['carat', 'price'],
                as: ['carat', 'price', 'density'],
              });
              return dv.rows;
            },
          },
        ],
      },
      encode: {
        x: 'carat',
        y: 'price',
        color: 'density',
      },
      style: {
        opacity: 0.3,
        gradient: [
          [0, 'white'],
          [0.2, 'blue'],
          [0.4, 'cyan'],
          [0.6, 'lime'],
          [0.8, 'yellow'],
          [0.9, 'red'],
        ],
      },
    },
    {
      type: 'point',
      encode: {
        x: 'carat',
        y: 'price',
      },
    },
  ],
});

chart.render();
```

**Notes**:
- The `carat` field and `price` field are mapped to the x-axis and y-axis respectively
- Kernel density estimation is used to calculate the density distribution of scatter points
- Density values are mapped to colors, creating a heat effect
- Original scatter data is overlaid, allowing simultaneous observation of data points and density distribution

Example 3: **Suitable for displaying user interaction hot zones**

The example below shows a heatmap of user mouse movement tracks on an interface, used to analyze user focus areas.

```js | ob { autoMount: true  }
import { Chart } from "@antv/g2";

const chart = new Chart({ container: "container" });

chart.options({
  type: "view",
  width: 640,
  height: 480,
  padding: 0,
  data: [
    { x: "0", y: "136", v: 1 },
    { x: "0", y: "280", v: 1 },
    { x: "24", y: "128", v: 1 },
    { x: "80", y: "104", v: 1 },
    { x: "96", y: "152", v: 1 },
    { x: "96", y: "232", v: 1 },
    { x: "104", y: "184", v: 1 },
    { x: "112", y: "216", v: 1 },
    { x: "120", y: "200", v: 7 },
    { x: "120", y: "208", v: 3 },
    { x: "128", y: "112", v: 1 },
    { x: "128", y: "192", v: 1 },
    { x: "128", y: "200", v: 3 },
    { x: "128", y: "208", v: 1 },
    { x: "136", y: "192", v: 1 },
    { x: "136", y: "200", v: 1 },
    { x: "136", y: "208", v: 1 },
    { x: "144", y: "16", v: 1 },
    { x: "144", y: "96", v: 1 },
    { x: "144", y: "144", v: 1 },
    { x: "144", y: "152", v: 3 },
    { x: "144", y: "184", v: 1 },
    { x: "144", y: "200", v: 1 },
    { x: "152", y: "152", v: 1 },
    { x: "152", y: "184", v: 1 },
    { x: "160", y: "184", v: 1 },
    { x: "160", y: "200", v: 1 },
    { x: "168", y: "144", v: 3 },
    { x: "168", y: "200", v: 1 },
    { x: "168", y: "216", v: 1 },
    { x: "176", y: "152", v: 1 },
    { x: "176", y: "168", v: 1 },
    { x: "176", y: "184", v: 1 },
    { x: "176", y: "200", v: 1 },
    { x: "184", y: "144", v: 1 },
    { x: "192", y: "152", v: 1 },
    { x: "192", y: "160", v: 1 },
    { x: "192", y: "200", v: 1 },
    { x: "200", y: "152", v: 1 },
    { x: "200", y: "160", v: 1 },
    { x: "200", y: "216", v: 1 },
    { x: "208", y: "144", v: 1 },
    { x: "208", y: "176", v: 1 },
    { x: "208", y: "224", v: 1 },
    { x: "208", y: "256", v: 1 },
    { x: "216", y: "152", v: 2 },
    { x: "216", y: "200", v: 1 },
    { x: "216", y: "280", v: 1 },
    { x: "224", y: "64", v: 1 },
    { x: "224", y: "144", v: 2 },
    { x: "224", y: "192", v: 1 },
    { x: "224", y: "280", v: 1 },
    { x: "232", y: "152", v: 1 },
    { x: "232", y: "160", v: 1 },
    { x: "232", y: "200", v: 4 },
    { x: "232", y: "280", v: 1 },
    { x: "240", y: "192", v: 1 },
    { x: "240", y: "200", v: 4 },
    { x: "240", y: "216", v: 2 },
    { x: "248", y: "56", v: 1 },
    { x: "248", y: "144", v: 1 },
    { x: "248", y: "152", v: 1 },
    { x: "248", y: "168", v: 1 },
    { x: "248", y: "192", v: 4 },
    { x: "248", y: "200", v: 1 },
    { x: "248", y: "224", v: 3 },
    { x: "256", y: "32", v: 1 },
    { x: "256", y: "144", v: 1 },
    { x: "256", y: "152", v: 2 },
    { x: "256", y: "192", v: 1 },
    { x: "256", y: "232", v: 1 },
    { x: "256", y: "272", v: 1 },
    { x: "264", y: "32", v: 1 },
    { x: "264", y: "144", v: 2 },
    { x: "264", y: "176", v: 1 },
    { x: "264", y: "192", v: 1 },
    { x: "272", y: "136", v: 1 },
    { x: "272", y: "144", v: 4 },
    { x: "272", y: "168", v: 1 },
    { x: "272", y: "184", v: 1 },
    { x: "272", y: "232", v: 1 },
    { x: "272", y: "256", v: 1 },
    { x: "280", y: "128", v: 1 },
    { x: "280", y: "136", v: 2 },
    { x: "280", y: "240", v: 1 },
    { x: "288", y: "128", v: 1 },
    { x: "288", y: "136", v: 3 },
    { x: "288", y: "144", v: 1 },
    { x: "288", y: "160", v: 1 },
    { x: "288", y: "176", v: 1 },
    { x: "288", y: "224", v: 1 },
    { x: "296", y: "120", v: 1 },
    { x: "296", y: "136", v: 1 },
    { x: "296", y: "144", v: 1 },
    { x: "296", y: "232", v: 1 },
    { x: "296", y: "240", v: 1 },
    { x: "304", y: "48", v: 1 },
    { x: "304", y: "120", v: 1 },
    { x: "304", y: "136", v: 2 },
    { x: "304", y: "144", v: 1 },
    { x: "312", y: "112", v: 1 },
    { x: "312", y: "128", v: 2 },
    { x: "312", y: "136", v: 1 },
    { x: "312", y: "144", v: 1 },
    { x: "312", y: "160", v: 1 },
    { x: "312", y: "240", v: 1 },
    { x: "320", y: "120", v: 1 },
    { x: "320", y: "208", v: 1 },
    { x: "320", y: "232", v: 1 },
    { x: "320", y: "248", v: 1 },
    { x: "328", y: "104", v: 1 },
    { x: "328", y: "120", v: 1 },
    { x: "328", y: "152", v: 1 },
    { x: "328", y: "248", v: 2 },
    { x: "336", y: "48", v: 1 },
    { x: "336", y: "104", v: 2 },
    { x: "336", y: "120", v: 1 },
    { x: "336", y: "128", v: 1 },
    { x: "336", y: "240", v: 3 },
    { x: "336", y: "248", v: 1 },
    { x: "344", y: "96", v: 1 },
    { x: "344", y: "104", v: 4 },
    { x: "344", y: "144", v: 1 },
    { x: "344", y: "176", v: 1 },
    { x: "352", y: "48", v: 1 },
    { x: "352", y: "160", v: 1 },
    { x: "360", y: "72", v: 1 },
    { x: "376", y: "64", v: 1 },
    { x: "376", y: "128", v: 1 },
    { x: "384", y: "72", v: 1 },
    { x: "384", y: "104", v: 1 },
    { x: "408", y: "168", v: 1 },
    { x: "440", y: "0", v: 1 },
    { x: "440", y: "144", v: 1 },
    { x: "456", y: "184", v: 1 },
    { x: "472", y: "144", v: 1 },
    { x: "488", y: "192", v: 1 },
    { x: "520", y: "160", v: 1 },
    { x: "544", y: "168", v: 1 },
    { x: "552", y: "168", v: 1 },
    { x: "552", y: "200", v: 1 },
    { x: "560", y: "168", v: 1 },
    { x: "568", y: "176", v: 1 },
    { x: "568", y: "208", v: 1 },
    { x: "576", y: "176", v: 1 },
    { x: "584", y: "216", v: 1 },
    { x: "592", y: "216", v: 1 },
    { x: "592", y: "224", v: 1 },
    { x: "616", y: "192", v: 1 },
  ],
  style: { viewFill: "#4e79a7" },
  axis: false,
  children: [
    {
      type: "heatmap",
      data: [
        { x: "0", y: "136", v: 1 },
        { x: "0", y: "280", v: 1 },
        { x: "24", y: "128", v: 1 },
        { x: "80", y: "104", v: 1 },
        { x: "96", y: "152", v: 1 },
        { x: "96", y: "232", v: 1 },
        { x: "104", y: "184", v: 1 },
        { x: "112", y: "216", v: 1 },
        { x: "120", y: "200", v: 7 },
        { x: "120", y: "208", v: 3 },
        { x: "128", y: "112", v: 1 },
        { x: "128", y: "192", v: 1 },
        { x: "128", y: "200", v: 3 },
        { x: "128", y: "208", v: 1 },
        { x: "136", y: "192", v: 1 },
        { x: "136", y: "200", v: 1 },
        { x: "136", y: "208", v: 1 },
        { x: "144", y: "16", v: 1 },
        { x: "144", y: "96", v: 1 },
        { x: "144", y: "144", v: 1 },
        { x: "144", y: "152", v: 3 },
        { x: "144", y: "184", v: 1 },
        { x: "144", y: "200", v: 1 },
        { x: "152", y: "152", v: 1 },
        { x: "152", y: "184", v: 1 },
        { x: "160", y: "184", v: 1 },
        { x: "160", y: "200", v: 1 },
        { x: "168", y: "144", v: 3 },
        { x: "168", y: "200", v: 1 },
        { x: "168", y: "216", v: 1 },
        { x: "176", y: "152", v: 1 },
        { x: "176", y: "168", v: 1 },
        { x: "176", y: "184", v: 1 },
        { x: "176", y: "200", v: 1 },
        { x: "184", y: "144", v: 1 },
        { x: "192", y: "152", v: 1 },
        { x: "192", y: "160", v: 1 },
        { x: "192", y: "200", v: 1 },
        { x: "200", y: "152", v: 1 },
        { x: "200", y: "160", v: 1 },
        { x: "200", y: "216", v: 1 },
        { x: "208", y: "144", v: 1 },
        { x: "208", y: "176", v: 1 },
        { x: "208", y: "224", v: 1 },
        { x: "208", y: "256", v: 1 },
        { x: "216", y: "152", v: 2 },
        { x: "216", y: "200", v: 1 },
        { x: "216", y: "280", v: 1 },
        { x: "224", y: "64", v: 1 },
        { x: "224", y: "144", v: 2 },
        { x: "224", y: "192", v: 1 },
        { x: "224", y: "280", v: 1 },
        { x: "232", y: "152", v: 1 },
        { x: "232", y: "160", v: 1 },
        { x: "232", y: "200", v: 4 },
        { x: "232", y: "280", v: 1 },
        { x: "240", y: "192", v: 1 },
        { x: "240", y: "200", v: 4 },
        { x: "240", y: "216", v: 2 },
        { x: "248", y: "56", v: 1 },
        { x: "248", y: "144", v: 1 },
        { x: "248", y: "152", v: 1 },
        { x: "248", y: "168", v: 1 },
        { x: "248", y: "192", v: 4 },
        { x: "248", y: "200", v: 1 },
        { x: "248", y: "224", v: 3 },
        { x: "256", y: "32", v: 1 },
        { x: "256", y: "144", v: 1 },
        { x: "256", y: "152", v: 2 },
        { x: "256", y: "192", v: 1 },
        { x: "256", y: "232", v: 1 },
        { x: "256", y: "272", v: 1 },
        { x: "264", y: "32", v: 1 },
        { x: "264", y: "144", v: 2 },
        { x: "264", y: "176", v: 1 },
        { x: "264", y: "192", v: 1 },
        { x: "272", y: "136", v: 1 },
        { x: "272", y: "144", v: 4 },
        { x: "272", y: "168", v: 1 },
        { x: "272", y: "184", v: 1 },
        { x: "272", y: "232", v: 1 },
        { x: "272", y: "256", v: 1 },
        { x: "280", y: "128", v: 1 },
        { x: "280", y: "136", v: 2 },
        { x: "280", y: "240", v: 1 },
        { x: "288", y: "128", v: 1 },
        { x: "288", y: "136", v: 3 },
        { x: "288", y: "144", v: 1 },
        { x: "288", y: "160", v: 1 },
        { x: "288", y: "176", v: 1 },
        { x: "288", y: "224", v: 1 },
        { x: "296", y: "120", v: 1 },
        { x: "296", y: "136", v: 1 },
        { x: "296", y: "144", v: 1 },
        { x: "296", y: "232", v: 1 },
        { x: "296", y: "240", v: 1 },
        { x: "304", y: "48", v: 1 },
        { x: "304", y: "120", v: 1 },
        { x: "304", y: "136", v: 2 },
        { x: "304", y: "144", v: 1 },
        { x: "312", y: "112", v: 1 },
        { x: "312", y: "128", v: 2 },
        { x: "312", y: "136", v: 1 },
        { x: "312", y: "144", v: 1 },
        { x: "312", y: "160", v: 1 },
        { x: "312", y: "240", v: 1 },
        { x: "320", y: "120", v: 1 },
        { x: "320", y: "208", v: 1 },
        { x: "320", y: "232", v: 1 },
        { x: "320", y: "248", v: 1 },
        { x: "328", y: "104", v: 1 },
        { x: "328", y: "120", v: 1 },
        { x: "328", y: "152", v: 1 },
        { x: "328", y: "248", v: 2 },
        { x: "336", y: "48", v: 1 },
        { x: "336", y: "104", v: 2 },
        { x: "336", y: "120", v: 1 },
        { x: "336", y: "128", v: 1 },
        { x: "336", y: "240", v: 3 },
        { x: "336", y: "248", v: 1 },
        { x: "344", y: "96", v: 1 },
        { x: "344", y: "104", v: 4 },
        { x: "344", y: "144", v: 1 },
        { x: "344", y: "176", v: 1 },
        { x: "352", y: "48", v: 1 },
        { x: "352", y: "160", v: 1 },
        { x: "360", y: "72", v: 1 },
        { x: "376", y: "64", v: 1 },
        { x: "376", y: "128", v: 1 },
        { x: "384", y: "72", v: 1 },
        { x: "384", y: "104", v: 1 },
        { x: "408", y: "168", v: 1 },
        { x: "440", y: "0", v: 1 },
        { x: "440", y: "144", v: 1 },
        { x: "456", y: "184", v: 1 },
        { x: "472", y: "144", v: 1 },
        { x: "488", y: "192", v: 1 },
        { x: "520", y: "160", v: 1 },
        { x: "544", y: "168", v: 1 },
        { x: "552", y: "168", v: 1 },
        { x: "552", y: "200", v: 1 },
        { x: "560", y: "168", v: 1 },
        { x: "568", y: "176", v: 1 },
        { x: "568", y: "208", v: 1 },
        { x: "576", y: "176", v: 1 },
        { x: "584", y: "216", v: 1 },
        { x: "592", y: "216", v: 1 },
        { x: "592", y: "224", v: 1 },
        { x: "616", y: "192", v: 1 },
      ],
      encode: { x: "x", y: "y", color: "v" },
      scale: {
        x: { domain: [0, 640] },
        y: { domain: [0, 480], range: [0, 1] },
      },
      style: { opacity: 0 },
      animate: false,
      tooltip: false,
    },
  ],
});

chart.render();
```

**Notes**:
- Simulates user mouse position coordinates `x` and `y` data
- Uses `binX` and `binY` transforms to group and count continuous position data
- Heat effect intuitively reveals dense areas of mouse activity through color intensity
- Can intuitively identify interface areas that users focus on

### Unsuitable Use Cases

Example 1: **Not suitable for precise comparison of specific values**

Heatmaps express value magnitude through color intensity, but human eyes perceive color less precisely than length. If accurate comparison of specific values is needed, bar charts or line charts are better choices.

Example 2: **Not suitable for displaying a small number of discrete data points**

When there are few data points, the density distribution advantage of heatmaps is not obvious. Using scatter plots directly may be clearer and more intuitive.

## Extensions of Heatmaps

### Threshold Heatmap

Threshold heatmaps divide continuous data into discrete color intervals based on preset threshold ranges, suitable for emphasizing data within specific ranges.

```js | ob { autoMount: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'cell',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/salary.json',
  },
  encode: {
    x: 'name',
    y: 'department',
    color: 'salary',
  },
  scale: {
    color: {
      type: 'threshold',
      domain: [7000, 10000, 20000],
      range: ['#C6E48B', '#7BC96F', '#239A3B', '#196127'],
    },
  },
});

chart.render();
```

**Notes**:
- Uses threshold scale to divide continuous data into discrete intervals
- Sets three thresholds at 7000, 10000, and 20000, dividing the data into four intervals
- Each interval is represented by a different color, making it easy to distinguish different salary levels

## Comparing Heatmaps to Other Charts

### Heatmaps and [Scatter Plots](/en/charts/scatter)

- Heatmaps emphasize data density and distribution patterns, intuitively showing data concentration areas through color gradients
- Scatter plots display each individual data point, more suitable for observing the distribution of individual data points and outliers
- Heatmaps are suitable for handling large amounts of data points, while scatter plots may face overlap issues with large data volumes

### Heatmaps and [Bubble Charts](/en/charts/bubble-chart)

- Heatmaps express data density or third-dimension values through color intensity
- Bubble charts express third-dimension values through bubble size while displaying specific data point positions
- Heatmaps are more suitable for showing continuous distributions and density patterns, while bubble charts are better for showing multi-dimensional relationships of discrete data points

### Heatmaps and [Contour Lines](/en/charts/contourline)

- Heatmaps use color intensity to represent value magnitude, providing intuitive visual comparison
- Contour lines connect points of equal value, more suitable for analyzing continuous change trends and gradients
- Heatmaps are better for showing density distribution of discrete data points, while contour lines are better for showing continuous surface change patterns

### Heatmaps and [Histograms](/en/charts/histogram)

- Heatmaps can display data distribution in two-dimensional space, suitable for analyzing relationships between two variables
- Histograms display frequency distribution of a single variable, more suitable for analyzing distribution characteristics of a single variable
- Heatmaps can be seen as an extension of two-dimensional histograms, using color instead of height to represent frequency or density

## Similar Charts

<code src="./demos/list-card.tsx"></code>

## Categories

<code src="./demos/list-category.tsx"></code>