---
title: Stem-and-Leaf Plot
order: 2
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*5NHKSLY9WFgAAAAAQsAAAAgAemJ7AQ/original'
category: ['distribution']
similar: ['histogram', 'boxplot', 'scatter-plot']
---

<img alt="stem-leaf" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*5NHKSLY9WFgAAAAAQsAAAAgAemJ7AQ/original" width=600/>

## Introduction to Stem-and-Leaf Plots

A stem-and-leaf plot is a visualization chart used to display data distribution that retains original data information while intuitively showing the distribution shape. The stem-and-leaf plot organizes and displays data by decomposing it into "stems" (higher-order digits) and "leaves" (lower-order digits).

Stem-and-leaf plots differ from [histograms](/en/charts/histogram) in that stem-and-leaf plots preserve the specific values of each data point, while histograms only show the frequency of data falling within intervals. Stem-and-leaf plots are particularly suitable for small to medium-sized datasets, as they can simultaneously display distribution shape, central tendency, and specific values.

When comparing the distribution of two groups of data, back-to-back bilateral stem-and-leaf plots can be used to clearly contrast the distribution characteristics of the two datasets.

**English Name**: Stem-and-Leaf Plot, Stem-and-Leaf Diagram

## Components of Stem-and-Leaf Plots

### Single-Direction Stem-and-Leaf Plot

<img alt="single-stem-leaf" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*wEiHRay-WTUAAAAAQGAAAAgAemJ7AQ/original" width=600 />

| Chart Type           | Single-Direction Stem-and-Leaf Plot                                                                                            |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Suitable Data        | List: A set of continuous numerical data                                                                                       |
| Function             | Display data distribution shape while preserving original data information                                                     |
| Data-to-Visual Mapping | High-order digits of values serve as stems (arranged vertically)<br>Low-order digits of values serve as leaves (arranged horizontally)<br>Each row represents all data with the same stem value |
| Suitable Data Size   | 20-100 data points; other visualization methods are recommended for larger datasets                                           |

---

### Bilateral Stem-and-Leaf Plot

<img alt="dual-stem-leaf" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*5NHKSLY9WFgAAAAAQsAAAAgAemJ7AQ/original" width=600/>

| Chart Type           | Bilateral Stem-and-Leaf Plot                                                                                                        |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Suitable Data        | List: Two sets of continuous numerical data                                                                                      |
| Function             | Compare distribution shapes and characteristics of two datasets                                                                  |
| Data-to-Visual Mapping | Shared stems (arranged vertically in the center)<br>Left group data leaves arranged to the left<br>Right group data leaves arranged to the right<br>Different data groups distinguished by color |
| Suitable Data Size   | 20-50 data points per group                                                                                                     |

**Components:**

1. **Stem**: High-order digits of data, arranged vertically in the center of the chart
2. **Leaf**: Low-order digits of data, arranged horizontally on both sides of the stem
3. **Separator Line**: Vertical line separating left and right data groups
4. **Title/Legend**: Identifies the meaning of different data groups
5. **Data Sorting**: Leaves are typically arranged from small to large

## Application Scenarios for Stem-and-Leaf Plots

### Suitable Scenarios

#### 1. Basic Single-Direction Stem-and-Leaf Plot - Displaying Single Group Data Distribution

Single-direction stem-and-leaf plots are suitable for displaying the distribution of a single group of data, clearly showing central tendency and distribution shape.

Example: **Student Exam Score Distribution**

The chart below shows the mathematics score distribution of a class:

| Student Scores                                                                 |
| ------------------------------------------------------------------------------ |
| 65, 67, 69, 71, 72, 73, 74, 75, 76, 78, 79, 81, 82, 83, 85, 87, 89, 92, 93, 95 |

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

// Single group data
const rawData = [
  65, 67, 69, 71, 72, 73, 74, 75, 76, 78, 79, 81, 82, 83, 85, 87, 89, 92, 93, 95,
];

// Process single-direction stem-and-leaf plot data
function processSingleStemLeaf(data) {
  const stemMap = new Map();

  data.forEach((score) => {
    const stem = Math.floor(score / 10);
    const leaf = score % 10;
    if (!stemMap.has(stem)) {
      stemMap.set(stem, []);
    }
    stemMap.get(stem).push(leaf);
  });

  // Sort leaves
  Array.from(stemMap.values()).forEach((leaves) => {
    leaves.sort((a, b) => a - b);
  });

  const stems = Array.from(stemMap.keys()).sort((a, b) => b - a); // Sort from large to small
  const chartData = [];

  stems.forEach((stem, index) => {
    const yPos = index;
    const leaves = stemMap.get(stem);

    // Add stem
    chartData.push({
      x: 0.4,
      y: yPos,
      text: `${stem}`,
      type: 'stem',
      fill: '#333',
      fontSize: 18,
      fontWeight: 'bold',
    });

    // Add leaves
    leaves.forEach((leaf, i) => {
      chartData.push({
        x: 0.47 + i * 0.04,
        y: yPos,
        text: `${leaf}`,
        type: 'leaf',
        fill: '#1890ff',
        fontSize: 14,
        fontWeight: 'normal',
      });
    });
  });

  return { chartData, maxY: stems.length };
}

const { chartData, maxY } = processSingleStemLeaf(rawData);

chart.options({
  type: 'view',
  data: chartData,
  children: [
    {
      type: 'text',
      encode: {
        x: 'x',
        y: 'y',
        text: 'text',
        fill: 'fill',
        fontSize: 'fontSize',
        fontWeight: 'fontWeight',
      },
      style: {
        textAlign: 'center',
        textBaseline: 'middle',
      },
    },
  ],
  scale: {
    x: { domain: [0, 1], nice: false },
    y: { domain: [-0.5, maxY - 0.5], nice: false },
  },
  axis: false,
});

// Add separator line using lineX method
chart.lineX().data([0.45]).style({
  lineWidth: 1,
  stroke: '#333',
  strokeOpacity: 0.6,
});

chart.render();
```

**Explanation**:

- Stems represent the tens digit of scores (6, 7, 8, 9)
- Leaves represent the ones digit of scores, arranged in ascending order
- The chart shows that scores are mainly concentrated in the 70-80 range

#### 2. Bilateral Stem-and-Leaf Plot - Comparing Two Group Data Distributions

Bilateral stem-and-leaf plots are particularly suitable for comparing distribution differences between two groups of data, intuitively showing the relative positions and distribution characteristics of both groups.

Example: **Comparing Exam Score Distributions of Two Classes**

The chart below shows a comparison of exam score distributions between Class A and Class B:

| Data Group | Score Range |
| ---------- | ----------- |
| Class A    | 45-78       |
| Class B    | 43-82       |

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const rawData = {
  left: [
    45, 47, 48, 52, 53, 55, 56, 57, 59, 62, 63, 64, 65, 66, 67, 68, 69, 71, 72,
    73, 74, 75, 76, 77, 78,
  ],
  right: [
    43, 44, 46, 51, 54, 55, 58, 59, 61, 62, 63, 64, 65, 66, 67, 68, 72, 73, 74,
    75, 76, 77, 79, 82,
  ],
};

// Process bilateral stem-and-leaf plot data
function processDualStemLeaf(data) {
  const stemMap = new Map();

  ['left', 'right'].forEach((side) => {
    data[side].forEach((score) => {
      const stem = Math.floor(score / 10);
      const leaf = score % 10;
      if (!stemMap.has(stem)) {
        stemMap.set(stem, { left: [], right: [] });
      }
      stemMap.get(stem)[side].push(leaf);
    });
  });

  // Sort
  Array.from(stemMap.values()).forEach((group) => {
    group.left.sort((a, b) => b - a); // Left side descending
    group.right.sort((a, b) => a - b); // Right side ascending
  });

  const stems = Array.from(stemMap.keys()).sort((a, b) => b - a); // Stems from large to small
  const chartData = [];

  stems.forEach((stem, index) => {
    const yPos = index;
    const { left, right } = stemMap.get(stem);

    // Add stem
    chartData.push({
      x: 0.5,
      y: yPos,
      text: `${stem}`,
      type: 'stem',
      fill: '#333',
      fontSize: 18,
      fontWeight: 'bold',
    });

    // Add left leaves (Class A)
    left.forEach((leaf, i) => {
      chartData.push({
        x: 0.45 - (i + 1) * 0.035,
        y: yPos,
        text: `${leaf}`,
        type: 'leaf-left',
        fill: '#1f77b4',
        fontSize: 14,
        fontWeight: 'normal',
      });
    });

    // Add right leaves (Class B)
    right.forEach((leaf, i) => {
      chartData.push({
        x: 0.55 + i * 0.035,
        y: yPos,
        text: `${leaf}`,
        type: 'leaf-right',
        fill: '#ff7f0e',
        fontSize: 14,
        fontWeight: 'normal',
      });
    });
  });

  // Add titles
  chartData.push({
    x: 0.35,
    y: stems.length,
    text: 'Class A',
    type: 'title',
    fill: '#1f77b4',
    fontSize: 16,
    fontWeight: 'bold',
  });

  chartData.push({
    x: 0.65,
    y: stems.length,
    text: 'Class B',
    type: 'title',
    fill: '#ff7f0e',
    fontSize: 16,
    fontWeight: 'bold',
  });

  return { chartData, maxY: stems.length + 1 };
}

const { chartData, maxY } = processDualStemLeaf(rawData);

chart.options({
  type: 'view',
  data: chartData,
  children: [
    {
      type: 'text',
      encode: {
        x: 'x',
        y: 'y',
        text: 'text',
        fill: 'fill',
        fontSize: 'fontSize',
        fontWeight: 'fontWeight',
      },
      style: {
        textAlign: 'center',
        textBaseline: 'middle',
      },
    },
    {
      type: 'lineX',
      data: [{ x: 0.47 }, { x: 0.53 }],
      encode: {
        x: 'x',
      },
      style: {
        lineWidth: 2,
        stroke: '#000',
        strokeOpacity: 0.8,
      },
    },
  ],
  scale: {
    x: { domain: [0, 1], nice: false },
    y: { domain: [-0.5, maxY - 0.5], nice: false },
  },
  axis: false,
});

chart.render();
```

**Explanation**:

- Stems represent the tens digit of scores, shared and displayed in the center
- Left leaves represent Class A students' ones digits, arranged in descending order
- Right leaves represent Class B students' ones digits, arranged in ascending order
- Colors distinguish between the two classes' data
- Clearly compares the score distribution differences between the two classes

#### 3. Grouped Stem-and-Leaf Plot - Displaying Multiple Category Data

When comparing data distributions across multiple categories, grouped stem-and-leaf plots can be used.

Example: **Height Distribution Across Different Age Groups**

The chart below shows height distributions for three age groups: teenagers, adults, and elderly:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const ageGroupData = {
  Teenagers: [155, 158, 160, 162, 165, 167, 168, 170, 172, 175],
  Adults: [160, 163, 165, 168, 170, 172, 175, 177, 180, 182, 185],
  Elderly: [150, 155, 158, 160, 162, 165, 167, 168, 170, 172],
};

// Process grouped stem-and-leaf plot data
function processGroupedStemLeaf(data) {
  const groups = Object.keys(data);
  const colors = ['#1f77b4', '#ff7f0e', '#2ca02c'];
  const chartData = [];
  let currentY = 0;

  groups.forEach((group, groupIndex) => {
    const groupData = data[group];
    const stemMap = new Map();

    // Add group title
    chartData.push({
      x: 0.1,
      y: currentY,
      text: group,
      type: 'group-title',
      fill: colors[groupIndex],
      fontSize: 16,
      fontWeight: 'bold',
    });
    currentY += 0.5;

    // Process data
    groupData.forEach((height) => {
      const stem = Math.floor(height / 10);
      const leaf = height % 10;
      if (!stemMap.has(stem)) {
        stemMap.set(stem, []);
      }
      stemMap.get(stem).push(leaf);
    });

    // Sort leaves
    Array.from(stemMap.values()).forEach((leaves) => {
      leaves.sort((a, b) => a - b);
    });

    const stems = Array.from(stemMap.keys()).sort((a, b) => a - b);

    stems.forEach((stem) => {
      const leaves = stemMap.get(stem);

      // Add stem
      chartData.push({
        x: 0.2,
        y: currentY,
        text: `${stem}`,
        type: 'stem',
        fill: '#333',
        fontSize: 14,
        fontWeight: 'bold',
      });

      // Add leaves
      leaves.forEach((leaf, i) => {
        chartData.push({
          x: 0.27 + i * 0.03,
          y: currentY,
          text: `${leaf}`,
          type: 'leaf',
          fill: colors[groupIndex],
          fontSize: 12,
          fontWeight: 'normal',
        });
      });

      currentY += 1;
    });

    currentY += 0.5; // Space between groups
  });

  return { chartData, maxY: currentY };
}

const { chartData, maxY } = processGroupedStemLeaf(ageGroupData);

chart.options({
  type: 'view',
  data: chartData,
  children: [
    {
      type: 'text',
      encode: {
        x: 'x',
        y: 'y',
        text: 'text',
        fill: 'fill',
        fontSize: 'fontSize',
        fontWeight: 'fontWeight',
      },
      style: {
        textAlign: 'left',
        textBaseline: 'middle',
      },
    },
  ],
  scale: {
    x: { domain: [0, 1], nice: false },
    y: { domain: [0, maxY], nice: false },
  },
  axis: false,
});

// Add separator line using lineX method
chart.lineX().data([0.25]).style({
  lineWidth: 1,
  stroke: '#333',
  strokeOpacity: 0.6,
});

chart.render();
```

**Explanation**:

- Data is grouped and displayed by age group
- Each group uses different colors for distinction
- Clearly compares height distribution characteristics across different age groups
- Suitable for displaying distribution comparisons of multiple category data

### Unsuitable Scenarios

Example 1: **Cases with excessive data volume**

When data volume exceeds 100 points, stem-and-leaf plots become too crowded and difficult to read. In such cases, histograms or box plots are recommended.

Example 2: **Cases with excessive data range**

When data spans a very large range (e.g., from 1 to 10,000), the number of stems becomes excessive, making the chart overly long. It's recommended to group or transform the data appropriately first.

Example 3: **Scenarios requiring precise numerical comparison**

Although stem-and-leaf plots preserve original data, when precise numerical calculations and comparisons are needed, tabular format may be more suitable.

## Comparison with Other Charts

### Stem-and-Leaf Plots vs [Histograms](/en/charts/histogram)

- **Stem-and-Leaf Plots**: Preserve specific values of each data point, showing both distribution shape and data integrity, but only suitable for small to medium-sized datasets
- **Histograms**: Display data distribution through grouped intervals, can handle large amounts of data, but lose specific numerical information of original data

### Stem-and-Leaf Plots vs [Box Plots](/en/charts/boxplot)

- **Stem-and-Leaf Plots**: Show complete data distribution shape and each data point, convenient for identifying data patterns and specific positions of outliers
- **Box Plots**: Display statistical characteristics of data distribution through five-number summary (minimum, Q1, median, Q3, maximum), more concise but with limited information

### Stem-and-Leaf Plots vs [Scatter Plots](/en/charts/scatter-plot)

- **Stem-and-Leaf Plots**: Focus on displaying single variable distribution, organizing data in an orderly manner through stem-leaf structure
- **Scatter Plots**: Display relationships and correlations between two variables, more suitable for exploring association patterns between variables

## Similar Charts

<code src="./demos/list-card.tsx"></code>

## Category

<code src="./demos/list-category.tsx"></code> 
