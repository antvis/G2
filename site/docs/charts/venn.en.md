---
title: Venn Diagram
order: 2
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*uJF2T7anbQUAAAAAAAAAAAAADmJ7AQ/original'
category: ['relation']
similar: ['sunburst', 'treemap', 'sankey']
---

<img alt="venn" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*uJF2T7anbQUAAAAAAAAAAAAADmJ7AQ/original" width=600/>

## Introduction to Venn Diagram

A Venn diagram is a chart that uses circles or other closed curves to represent sets and their relationships, invented by British mathematician John Venn in 1880. Venn diagrams use overlapping areas to show the intersection, union, and difference relationships between different sets, making it a classic chart type in data visualization for displaying set relationships.

Venn diagrams are particularly suitable for showing relationships between different data sets, such as overlapping relationships between user groups, intersections of product features, overlapping users in market analysis, etc. Through intuitive circular areas and overlapping parts, they can clearly express complex set logical relationships.

When you need to analyze commonalities and differences between multiple groups or categories, Venn diagrams are a very effective visualization tool. They can help users quickly understand inclusion, intersection, and independent relationships between data.

**Chinese Name**: 韦恩图

## Components of Venn Diagram

### Basic Venn Diagram

<img alt="basic-venn" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*uJF2T7anbQUAAAAAAAAAAAAADmJ7AQ/original" width=600 />

| Chart Type | Basic Venn Diagram |
| ---------------- | ---------------------------------------------------------------------------- |
| Suitable Data | Set data: data containing set names, set sizes, and intersection relationships |
| Function | Display intersection, union, and independent relationships between different sets |
| Data to Graphics Mapping | Set names map to circular areas<br>Set sizes map to circular area<br>Intersection relationships are represented by overlapping areas |
| Suitable Scenarios | Relationship analysis of 2-4 sets, user group analysis, product feature comparison |

---

### Hollow Venn Diagram

<img alt="hollow-venn" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*lAPPSaOWGXYAAAAAAAAAAAAADmJ7AQ/original" width=600/>

| Chart Type | Hollow Venn Diagram |
| ---------------- | ------------------------------------------------------------------------ |
| Suitable Data | Set data: data containing set names, set sizes, and intersection relationships |
| Function | Highlight boundary lines, reduce color interference, more clearly display set boundaries |
| Data to Graphics Mapping | Set names map to circular boundaries<br>Set sizes map to circular area<br>Hollow design highlights structural relationships |
| Suitable Scenarios | Scenarios requiring emphasis on set boundaries, black-and-white print-friendly displays |

## Application Scenarios of Venn Diagram

### Suitable Scenarios

Example 1: **User Group Overlap Analysis**

The following chart shows the overlapping relationships between user groups on different platforms, helping understand user distribution across multiple platforms.

| Description | Sets | Users |
| ------------- | ------------------------ | ------ |
| WeChat only | ['WeChat'] | 1200 |
| Weibo only | ['Weibo'] | 800 |
| TikTok only | ['TikTok'] | 1000 |
| WeChat+Weibo users | ['WeChat', 'Weibo'] | 300 |
| WeChat+TikTok users | ['WeChat', 'TikTok'] | 400 |
| Weibo+TikTok users | ['Weibo', 'TikTok'] | 200 |
| All three platforms | ['WeChat', 'Weibo', 'TikTok'] | 150 |

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'path',
  data: {
    type: 'inline',
    value: [
      { sets: ['WeChat'], size: 1200, label: 'WeChat' },
      { sets: ['Weibo'], size: 800, label: 'Weibo' },
      { sets: ['TikTok'], size: 1000, label: 'TikTok' },
      { sets: ['WeChat', 'Weibo'], size: 300, label: 'WeChat&Weibo' },
      { sets: ['WeChat', 'TikTok'], size: 400, label: 'WeChat&TikTok' },
      { sets: ['Weibo', 'TikTok'], size: 200, label: 'Weibo&TikTok' },
      { sets: ['WeChat', 'Weibo', 'TikTok'], size: 150 },
    ],
    transform: [
      {
        type: 'venn',
      },
    ],
  },
  encode: {
    d: 'path',
    color: 'key',
  },
  labels: [
    {
      position: 'inside',
      text: (d) => d.label || '',
    },
  ],
  style: {
    opacity: (d) => (d.sets.length > 1 ? 0.3 : 0.7),
  },
  state: {
    inactive: { opacity: 0.2 },
    active: { opacity: 0.9 },
  },
  interactions: [{ type: 'elementHighlight' }],
  legend: false,
});

chart.render();
```

**Notes**:

- The `sets` field defines set relationships, using one element for individual sets and multiple elements for intersections
- The `size` field maps to circular area size, representing user count
- The `padding` parameter controls canvas padding to avoid graphic clipping
- Use transparency to distinguish individual sets from intersection areas

Example 2: **Product Feature Comparison Analysis**

Venn diagrams can clearly show the overlap of different product features, helping product managers with feature planning.

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'path',
  data: {
    type: 'inline',
    value: [
      { sets: ['Product A'], size: 25, label: 'A' },
      { sets: ['Product B'], size: 20, label: 'B' },
      { sets: ['Product A', 'Product B'], size: 15, label: 'Common' },
    ],
    transform: [
      {
        type: 'venn',
      },
    ],
  },
  encode: {
    d: 'path',
    color: 'key',
  },
  labels: [
    {
      position: 'inside',
      text: (d) => d.label,
      style: {
        fontSize: 12,
        fontWeight: 'bold',
      },
      transform: [
        {
          type: 'overlapDodgeY',
        },
      ],
    },
  ],
  style: {
    fillOpacity: 0.6,
    stroke: '#fff',
    lineWidth: 2,
  },
  scale: {
    color: {
      range: ['#1890FF', '#52C41A', '#FF7A45'],
    },
  },
  tooltip: {
    items: [
      {
        name: 'Feature Count',
        field: 'size',
      },
      {
        name: 'Set',
        field: 'key',
      },
    ],
  },
  legend: false,
});

chart.render();
```

**Notes**:

- Use custom color schemes to highlight different product characteristics
- Add border lines to enhance visual separation
- Configure detailed tooltip information display

Example 3: **Skill Overlap Analysis**

Show the skill overlap among team members to help with project assignment and team building.

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'path',
  data: {
    type: 'inline',
    value: [
      { sets: ['Frontend'], size: 12, label: 'Frontend' },
      { sets: ['Backend'], size: 15, label: 'Backend' },
      { sets: ['Design'], size: 8, label: 'Design' },
      { sets: ['Frontend', 'Backend'], size: 5, label: 'Full Stack' },
      { sets: ['Frontend', 'Design'], size: 3, label: 'Frontend+Design' },
      { sets: ['Backend', 'Design'], size: 2, label: 'Backend+Design' },
      { sets: ['Frontend', 'Backend', 'Design'], size: 1, label: 'Full Talent' },
    ],
    transform: [
      {
        type: 'venn',
        padding: 15,
      },
    ],
  },
  encode: {
    d: 'path',
    color: 'key',
  },
  labels: [
    {
      position: 'inside',
      text: (d) => `${d.label}\n(${d.size} people)`,
      style: {
        fontSize: 10,
        textAlign: 'center',
      },
      transform: [
        {
          type: 'overlapDodgeY',
        },
      ],
    },
  ],
  style: {
    fillOpacity: 0.5,
  },
  interactions: [{ type: 'elementHighlight' }],
  legend: {
    color: {
      position: 'bottom',
      layout: { justifyContent: 'center' },
    },
  },
});

chart.render();
```

**Notes**:

- Display both skill type and headcount in labels
- Use interactive highlighting effects to enhance user experience
- Appropriate transparency settings for easy viewing of overlapping areas

### Unsuitable Scenarios

Example 1: **Venn diagrams are not suitable when there are too many sets**

When the number of sets exceeds 4, Venn diagrams become overly complex and overlapping relationships are difficult to express clearly.

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

// 5-set Venn diagram - not recommended
chart.options({
  type: 'path',
  data: {
    type: 'inline',
    value: [
      { sets: ['A'], size: 10, label: 'A' },
      { sets: ['B'], size: 10, label: 'B' },
      { sets: ['C'], size: 10, label: 'C' },
      { sets: ['D'], size: 10, label: 'D' },
      { sets: ['E'], size: 10, label: 'E' },
      { sets: ['A', 'B'], size: 3 },
      { sets: ['A', 'C'], size: 3 },
      { sets: ['A', 'D'], size: 3 },
      { sets: ['B', 'C'], size: 3 },
      { sets: ['B', 'D'], size: 3 },
      { sets: ['C', 'D'], size: 3 },
      { sets: ['A', 'B', 'C'], size: 1 },
      { sets: ['A', 'B', 'D'], size: 1 },
      { sets: ['A', 'C', 'D'], size: 1 },
      { sets: ['B', 'C', 'D'], size: 1 },
    ],
    transform: [
      {
        type: 'venn',
        padding: 10,
      },
    ],
  },
  encode: {
    d: 'path',
    color: 'key',
  },
  labels: [
    {
      position: 'inside',
      text: (d) => d.label || '',
    },
  ],
  style: {
    fillOpacity: 0.4,
  },
  legend: false,
});

chart.render();
```

**Notes**: The above chart with 5 sets produces too many overlapping areas, making it visually confusing and difficult to read. In such cases, it's recommended to use [Sunburst Chart](/en/charts/sunburst) or [Sankey Diagram](/en/charts/sankey).

Example 2: **Venn diagrams are not suitable when data differences are extreme**

When set sizes differ extremely, small sets may not be clearly visible.

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'path',
  data: {
    type: 'inline',
    value: [
      { sets: ['Large Enterprise'], size: 10000, label: 'Large Enterprise' },
      { sets: ['Medium Enterprise'], size: 1000, label: 'Medium Enterprise' },
      { sets: ['Small Enterprise'], size: 100, label: 'Small Enterprise' },
      { sets: ['Large Enterprise', 'Medium Enterprise'], size: 200 },
      { sets: ['Medium Enterprise', 'Small Enterprise'], size: 50 },
      { sets: ['Large Enterprise', 'Small Enterprise'], size: 10 },
    ],
    transform: [
      {
        type: 'venn',
        padding: 10,
      },
    ],
  },
  encode: {
    d: 'path',
    color: 'key',
  },
  labels: [
    {
      position: 'inside',
      text: (d) => d.label || '',
    },
  ],
  style: {
    fillOpacity: 0.6,
  },
  legend: false,
});

chart.render();
```

**Notes**: In the above chart, the circular area for small enterprises is too small to display clearly. In this case, it's recommended to use [Treemap](/en/charts/treemap) or normalize the data.

## Extensions of Venn Diagram

### Hollow Venn Diagram

Hollow Venn diagrams remove fill colors and only keep border lines, suitable for scenarios that need to emphasize boundary relationships.

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'path',
  data: {
    type: 'inline',
    value: [
      { sets: ['iOS'], size: 15, label: 'iOS Users' },
      { sets: ['Android'], size: 12, label: 'Android Users' },
      { sets: ['Web'], size: 10, label: 'Web Users' },
      { sets: ['iOS', 'Android'], size: 2, label: 'Dual Platform' },
      { sets: ['iOS', 'Web'], size: 2, label: 'iOS+Web' },
      { sets: ['Android', 'Web'], size: 1, label: 'Android+Web' },
      { sets: ['iOS', 'Android', 'Web'], size: 1 },
    ],
    transform: [
      {
        type: 'venn',
        padding: 10,
      },
    ],
  },
  encode: {
    d: 'path',
    color: 'key',
    shape: 'hollow',
  },
  labels: [
    {
      position: 'inside',
      text: (d) => d.label || '',
      fill: '#000',
      style: {
        fontSize: 11,
      },
    },
  ],
  style: {
    opacity: 0.8,
    lineWidth: 3,
  },
  tooltip: false,
});

chart.render();
```

**Notes**:

- Use `shape: 'hollow'` to create hollow effect
- Suitable for black-and-white printing and scenarios requiring structural emphasis
- Set label color to black to ensure readability

### Custom Styled Venn Diagram

Create more brand-characteristic Venn diagrams through custom colors and styles.

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'path',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/lastfm.json',
    transform: [
      {
        type: 'venn',
        padding: 12,
        sets: 'sets',
        size: 'size',
        as: ['key', 'path'],
      },
    ],
  },
  encode: {
    d: 'path',
    color: 'key',
  },
  labels: [
    {
      position: 'inside',
      text: (d) => d.label || '',
      style: {
        fontSize: 12,
        fontWeight: 'bold',
      },
      transform: [{ type: 'contrastReverse' }],
    },
  ],
  style: {
    opacity: (d) => (d.sets.length > 1 ? 0.4 : 0.7),
    stroke: '#fff',
    lineWidth: 2,
  },
  scale: {
    color: {
      range: ['#667eea', '#764ba2', '#f093fb'],
    },
  },
  state: {
    inactive: { opacity: 0.1 },
    active: { opacity: 0.9 },
  },
  interactions: [{ type: 'elementHighlight' }],
  legend: false,
});

chart.render();
```

**Notes**:

- Use gradient color schemes to enhance visual effects
- Add white borders to enhance area separation
- Interactive state configuration improves user experience

## Comparison of Venn Diagram with Other Charts

### Venn Diagram vs [Sunburst Chart](/en/charts/sunburst)

- Venn diagrams are suitable for showing intersection relationships between sets, emphasizing overlapping parts
- Sunburst charts are suitable for showing hierarchical structures and categorical relationships, emphasizing containment relationships

### Venn Diagram vs [Sankey Diagram](/en/charts/sankey)

- Venn diagrams show static set relationships, suitable for analyzing current status
- Sankey diagrams show flow relationships, suitable for analyzing data flow and conversion

### Venn Diagram vs [Treemap](/en/charts/treemap)

- Venn diagrams emphasize overlapping relationships between sets, suitable for relationship analysis
- Treemaps emphasize hierarchical structure and proportion relationships, suitable for structural analysis

## Similar Charts

<code src="./demos/list-card.tsx"></code>

## Category

<code src="./demos/list-category.tsx"></code> 
