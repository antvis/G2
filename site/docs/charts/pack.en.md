---
title: Pack Chart
order: 2
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*epG0TaxEVTsAAAAAAAAAAAAADmJ7AQ/original'
category: ['relation']
similar: ['treemap', 'sunburst']
---

<img alt="pack" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*epG0TaxEVTsAAAAAAAAAAAAADmJ7AQ/original" width=600/>

## Introduction to Pack Charts

A pack chart is a hierarchical tree structure visualization chart that uses circles (instead of rectangles) to represent the entire hierarchy layer by layer. Each circle represents a node in the hierarchy, with the circle size proportional to its value, and containment relationships are expressed through nested circles.

Pack charts are particularly suitable for displaying data with hierarchical relationships, such as organizational structures, file systems, and software package structures. Compared to traditional tree diagrams, pack charts more intuitively show data containment relationships and numerical proportions through the nesting of circles, enabling users to quickly understand the hierarchical structure of data and the relative importance of each part.

When data has obvious hierarchical structure and needs to simultaneously show containment relationships and numerical sizes, pack charts are an excellent choice. They can both display the overall hierarchical structure and compare the values of each node through circle sizes.

**English Name**: Circle Packing, Pack Chart

## Components of Pack Charts

| Chart Type        | Pack Chart                                                                             |
| ----------------- | -------------------------------------------------------------------------------------- |
| Suitable Data     | Hierarchical data: nested data with tree structure, containing categorical and numerical fields |
| Function          | Display containment relationships and numerical proportions of hierarchical data       |
| Data to Graphics  | Hierarchical relationships mapped to nested circles<br>Numerical values mapped to circle radius<br>Different levels distinguished by color and nesting relationships |
| Suitable Scenarios | Software package structures, organizational charts, file systems, and other data with clear hierarchy and containment relationships |

## Application Scenarios for Pack Charts

### Suitable Scenarios

Example 1: **Displaying Software Package Hierarchy**

The following chart shows the module hierarchy of a software project. Through the pack chart, you can clearly see the size distribution of various modules and sub-modules, helping developers understand the code structure.

```js | ob { inject: true  }
import { Chart } from '@antv/g2';
import { interpolateHcl } from 'd3-interpolate';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
});

chart.options({
  type: 'pack',
  width: 800,
  height: 600,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/flare.json',
  },
  encode: {
    value: 'value',
    color: 'depth',
  },
  scale: {
    color: {
      domain: [0, 5],
      range: ['hsl(152,80%,80%)', 'hsl(228,30%,40%)'],
      interpolate: interpolateHcl,
    },
  },
  style: {
    labelText: (d) => (d.r >= 10 && d.height === 0 ? `${d.data.name}` : ''),
    labelFontSize: 8,
  },
  legend: { color: false },
  tooltip: {
    title: (d) => d.data.name,
    items: [{ field: 'value', name: 'Size' }],
  },
});

chart.render();
```

**Explanation**:

- The `value` field maps to circle size, representing the amount of code in modules
- The `depth` field maps to color, distinguishing different levels
- Label display conditions are set through `labelText`

Example 2: **Displaying Organizational Personnel Distribution**

Pack charts are very suitable for displaying personnel distribution across departments in an organization, allowing managers to see the scale of each department at a glance.

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
});

const orgData = {
  name: 'Company',
  value: 500,
  children: [
    {
      name: 'Technology',
      value: 200,
      children: [
        { name: 'Frontend Team', value: 80 },
        { name: 'Backend Team', value: 90 },
        { name: 'Algorithm Team', value: 30 },
      ],
    },
    {
      name: 'Product',
      value: 120,
      children: [
        { name: 'Product Design', value: 50 },
        { name: 'User Research', value: 30 },
        { name: 'Data Analysis', value: 40 },
      ],
    },
    {
      name: 'Operations',
      value: 100,
      children: [
        { name: 'Marketing', value: 60 },
        { name: 'Customer Service', value: 40 },
      ],
    },
    {
      name: 'Administration',
      value: 80,
      children: [
        { name: 'Human Resources', value: 30 },
        { name: 'Finance', value: 25 },
        { name: 'Legal', value: 25 },
      ],
    },
  ],
};

chart.options({
  type: 'pack',
  width: 700,
  height: 500,
  data: { value: orgData },
  layout: {
    padding: 8,
    sort: (a, b) => b.value - a.value,
  },
  encode: {
    value: 'value',
    color: 'depth',
  },
  scale: {
    color: {
      range: ['#E8F4FD', '#1890FF', '#003A8C'],
    },
  },
  labels: [
    {
      text: (d) => d.data.name,
      position: 'inside',
      fontWeight: (d) => (d.depth <= 1 ? 'bold' : 'normal'),
      fontSize: (d) => Math.max(8, Math.min(14, d.r / 3)),
      background: (d) => d.data.children, // background display
      backgroundFill: '#fff',
      transform: [
        { type: 'contrastReverse' },
        { type: 'overflowStroke' },
        { type: 'overlapDodgeY', padding: 8 },
      ],
    },
  ],
  legend: { color: false },
  tooltip: {
    title: (d) => d.data.name,
    items: [{ field: 'value', name: 'Personnel' }],
  },
});

chart.render();
```

**Explanation**:

- Uses nested data structure to represent organizational hierarchy
- `sort` configuration sorts by numerical value, with larger circles displayed first
- Dynamically adjusts font size through `labelFontSize` to fit circles
- Uses different label colors to distinguish levels

Example 3: **Displaying Investment Portfolio Distribution**

Pack charts can clearly show the proportion relationships of various asset categories and specific investment projects in an investment portfolio.

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
});

const portfolioData = {
  name: 'Investment Portfolio',
  value: 1000000,
  children: [
    {
      name: 'Stocks',
      value: 400000,
      children: [
        { name: 'Tech Stocks', value: 180000 },
        { name: 'Financial Stocks', value: 120000 },
        { name: 'Consumer Stocks', value: 100000 },
      ],
    },
    {
      name: 'Bonds',
      value: 300000,
      children: [
        { name: 'Government Bonds', value: 150000 },
        { name: 'Corporate Bonds', value: 100000 },
        { name: 'Convertible Bonds', value: 50000 },
      ],
    },
    {
      name: 'Funds',
      value: 200000,
      children: [
        { name: 'Equity Funds', value: 80000 },
        { name: 'Bond Funds', value: 70000 },
        { name: 'Hybrid Funds', value: 50000 },
      ],
    },
    {
      name: 'Cash',
      value: 100000,
    },
  ],
};

chart.options({
  type: 'pack',
  width: 600,
  height: 600,
  data: { value: portfolioData },
  layout: {
    padding: 3,
  },
  encode: {
    value: 'value',
    color: (d) => {
      const parentName =
        d.depth === 0 ? 'root' : d.parent?.data?.name || d.data.name;
      return parentName;
    },
  },
  scale: {
    color: {
      range: ['#FFF7E6', '#FFE7BA', '#FFC069', '#FA8C16', '#D46B08'],
    },
  },
  style: {
    labelText: (d) => {
      if (d.height === 0) return d.data.name;
      if (d.depth === 0) return '';
      return d.data.name;
    },
    labelFill: '#fff',
    labelFontWeight: 'bold',
    labelFontSize: (d) => Math.max(8, Math.min(12, d.r / 4)),
    stroke: '#fff',
    strokeWidth: 1,
    fillOpacity: 0.8,
    labelBackground: (d) => d.data.children, // background display
    labelBackgroundFill: '#fff',
    labelTransform: [
      { type: 'contrastReverse' },
      { type: 'overflowStroke' },
      { type: 'overlapDodgeY', padding: 8 },
    ],
  },
  legend: { color: false },
  tooltip: {
    title: (d) => d.data.name,
    items: [
      {
        field: 'value',
        name: 'Amount',
        valueFormatter: (v) => `$${(v / 10000).toFixed(1)}W`,
      },
    ],
  },
});

chart.render();
```

**Explanation**:

- Uses custom color mapping to distinguish different asset categories
- Sets transparency through `fillOpacity` to enhance visual effects
- Customizes `valueFormatter` to format amount display

## Comparison of Pack Charts with Other Charts

### Pack Chart vs [Treemap](/en/charts/treemap)

Pack charts and treemaps can both display hierarchical data, but have different characteristics:

| Comparison Dimension | Pack Chart                                    | Treemap                                   |
| -------------------- | --------------------------------------------- | ----------------------------------------- |
| Visual Form          | Circular nested layout                        | Rectangular nested layout                 |
| Space Utilization    | Circular boundaries, lower utilization       | Rectangular filling, high utilization    |
| Proportion Perception| Area comparison, but circles harder to judge | Area comparison, rectangles easier to judge precisely |
| Hierarchy Display    | Nested circles, intuitive containment        | Nested rectangles, clear containment     |
| Aesthetics           | Circular layout more beautiful and harmonious| Rectangular layout simple and practical  |
| Suitable Scenarios   | Emphasizes visual beauty and overall containment relationships | Emphasizes precise proportion comparison and space efficiency |

### Pack Chart vs [Sunburst Chart](/en/charts/sunburst)

Pack charts and sunburst charts both use circular layouts to display hierarchical data, but with different presentation methods:

| Comparison Dimension | Pack Chart                               | Sunburst Chart                              |
| -------------------- | ---------------------------------------- | ------------------------------------------- |
| Layout Method        | Nested circles, internal containment     | Concentric rings, radial expansion          |
| Value Mapping        | Circle area represents numerical value   | Sector angle represents numerical value     |
| Hierarchical Relationship | Containment relationship through nesting levels | Hierarchical depth through radial distance |
| Central Area         | Root node occupies central circle        | Center available for title or interaction  |
| Interactive Experience | Click node to drill down to sub-levels | Click sector to drill down, supports breadcrumb navigation |
| Suitable Scenarios   | Emphasizes containment relationships and overall structure | Emphasizes hierarchical navigation and proportion allocation |

## Similar Charts

<code src="./demos/list-card.tsx"></code>

## Category

<code src="./demos/list-category.tsx"></code> 
