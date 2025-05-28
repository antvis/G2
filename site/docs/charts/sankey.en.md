---
title: Sankey Diagram
order: 22
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*dACBR7ANcfEAAAAAAAAAAAAADmJ7AQ/original'
category: ['flow']
similar: ['tree', 'chord', 'network']
---

<img alt="Sankey Diagram" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*dACBR7ANcfEAAAAAAAAAAAAADmJ7AQ/original" width=600/>

## Introduction to Sankey Diagrams

A Sankey diagram is a specialized flow diagram used to depict the flow of values from one set of nodes to another. Key characteristics of Sankey diagrams include: the total width of all incoming flows equals the total width of all outgoing flows, maintaining flow conservation; internal flows are represented by links whose width is proportional to the flow quantity they represent; nodes have varying widths representing the total flow volume at that particular state.

Sankey diagrams are commonly used for visualizing energy flows, material composition analysis, financial fund flows, website user behavior analysis, and other flow-based data. They can clearly display the flow paths and distribution of resources or information within a system, helping to identify major flow patterns and bottlenecks.

**Chinese Name**: 桑基图

## Components of Sankey Diagrams

### Basic Sankey Diagram

<img alt="basic-sankey" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*dACBR7ANcfEAAAAAAAAAAAAADmJ7AQ/original" width=600 />

| Chart Type           | Basic Sankey Diagram                                                                |
| -------------------- | ----------------------------------------------------------------------------------- |
| Suitable Data        | Flow data: containing source nodes, target nodes, and flow values                  |
| Function             | Display flow relationships and quantities between different nodes                   |
| Data-Visual Mapping  | Source nodes mapped to left positions<br>Target nodes mapped to right positions<br>Flow values mapped to link widths |
| Suitable Scenarios   | Energy flow analysis, fund flow tracking, user path analysis                       |

---

### Multi-layer Sankey Diagram

Multi-layer Sankey diagrams can display more complex flow relationships where nodes can simultaneously serve as both source and target nodes, forming multi-layered flow networks.

| Chart Type           | Multi-layer Sankey Diagram                                                         |
| -------------------- | ----------------------------------------------------------------------------------- |
| Suitable Data        | Complex flow data: multi-level node relationships with intermediate transformation nodes |
| Function             | Display complex multi-level flow relationships within systems                      |
| Data-Visual Mapping  | Nodes automatically layered based on dependencies<br>Flow values determine link widths<br>Colors distinguish different flow types |
| Suitable Scenarios   | Complex energy transformation systems, multi-step business process analysis       |

## Use Cases for Sankey Diagrams

### Suitable Scenarios

Example 1: **Energy Flow Analysis**

The following diagram shows an energy flow Sankey chart, displaying the complete process from primary energy sources to final consumption.

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'sankey',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/energy.json',
    transform: [
      {
        type: 'custom',
        callback: (data) => ({ links: data }),
      },
    ],
  },
  layout: {
    nodeAlign: 'center',
    nodePadding: 0.03,
  },
  style: {
    labelSpacing: 3,
    labelFontWeight: 'bold',
    nodeStrokeWidth: 1.2,
    linkFillOpacity: 0.4,
  },
});

chart.render();
```

**Explanation**:

- `source` field maps to starting nodes, representing energy sources
- `target` field maps to destination nodes, representing energy destinations
- `value` field maps to link width, representing flow quantity
- Color coding distinguishes different types of energy flows

Example 2: **User Path Analysis**

Sankey diagrams can effectively show user behavior paths within websites or applications, helping analyze user drop-off points and conversion funnels.

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const data = {
  links: [
    { source: 'Homepage', target: 'Product Page', value: 1000 },
    { source: 'Homepage', target: 'About Us', value: 300 },
    { source: 'Homepage', target: 'Contact', value: 200 },
    { source: 'Product Page', target: 'Shopping Cart', value: 600 },
    { source: 'Product Page', target: 'Product Details', value: 400 },
    { source: 'Shopping Cart', target: 'Checkout', value: 450 },
    { source: 'Shopping Cart', target: 'Continue Shopping', value: 150 },
    { source: 'Checkout', target: 'Payment Success', value: 380 },
    { source: 'Checkout', target: 'Abandon Payment', value: 70 },
    { source: 'Product Details', target: 'Shopping Cart', value: 200 },
    { source: 'Product Details', target: 'Go Back', value: 200 },
  ]
};

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'sankey',
  autoFit: true,
  data: { value: data },
  layout: {
    nodeAlign: 'justify',
    nodePadding: 0.05,
  },
  style: {
    labelSpacing: 5,
    labelFontSize: 12,
    nodeStrokeWidth: 2,
    linkFillOpacity: 0.6,
  },
  scale: {
    color: {
      range: ['#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1'],
    },
  },
});

chart.render();
```

**Explanation**:
- Shows the complete user journey from homepage to final conversion
- Link width represents user flow volume
- Clearly identifies key user drop-off points

Example 3: **Budget Flow Analysis**

Sankey diagrams are particularly suitable for displaying budget allocation, cost analysis, and other financial flow relationships.

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const budgetData = {
  links: [
    { source: 'Total Budget', target: 'R&D Department', value: 5000000 },
    { source: 'Total Budget', target: 'Marketing Department', value: 3000000 },
    { source: 'Total Budget', target: 'Operations Department', value: 2000000 },
    { source: 'R&D Department', target: 'Product Development', value: 3000000 },
    { source: 'R&D Department', target: 'Technology Research', value: 2000000 },
    { source: 'Marketing Department', target: 'Advertising', value: 2000000 },
    { source: 'Marketing Department', target: 'Brand Building', value: 1000000 },
    { source: 'Operations Department', target: 'Personnel Costs', value: 1200000 },
    { source: 'Operations Department', target: 'Office Costs', value: 800000 },
    { source: 'Product Development', target: 'Mobile App', value: 1800000 },
    { source: 'Product Development', target: 'Web Platform', value: 1200000 },
    { source: 'Advertising', target: 'Online Ads', value: 1500000 },
    { source: 'Advertising', target: 'Offline Promotion', value: 500000 },
  ]
};

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'sankey',
  autoFit: true,
  data: { value: budgetData },
  layout: {
    nodeAlign: 'center',
    nodePadding: 0.08,
  },
  style: {
    labelSpacing: 8,
    labelFontSize: 11,
    nodeStrokeWidth: 1.5,
    linkFillOpacity: 0.5,
  },
  scale: {
    color: {
      range: ['#096dd9', '#36cfc9', '#52c41a', '#faad14', '#ff7a45'],
    },
  },
});

chart.render();
```

**Explanation**:
- Clearly shows budget allocation paths from overall to specific projects
- Flow width intuitively represents fund allocation proportions
- Color coding helps distinguish different budget category levels

### Unsuitable Scenarios

Example 1: **Not suitable for simple categorical comparisons**

When data is primarily used for comparing values across different categories rather than showing flow relationships, Sankey diagrams are not the best choice. In such cases, bar charts or pie charts would be more intuitive.

Example 2: **Not suitable for overly complex network relationships**

When there are too many nodes (over 30) or overly complex flow relationships, Sankey diagrams may become difficult to read. In such cases, consider using network graphs or hierarchical diagrams.

## Extensions for Sankey Diagrams

### Custom Node Alignment

Different node alignment methods can be used to optimize the layout of Sankey diagrams.

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'sankey',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/energy.json',
    transform: [
      {
        type: 'custom',
        callback: (data) => ({ links: data.slice(0, 20) }), // Use partial data for demonstration
      },
    ],
  },
  layout: {
    nodeAlign: 'left', // Options: 'left', 'right', 'center', 'justify'
    nodePadding: 0.05,
    nodeWidth: 0.02,
  },
  style: {
    labelSpacing: 5,
    labelFontWeight: 'bold',
    nodeStrokeWidth: 2,
    linkFillOpacity: 0.3,
  },
});

chart.render();
```

**Explanation**:
- `nodeAlign: 'left'` aligns all nodes to the left
- `nodePadding` controls spacing between nodes
- `nodeWidth` controls the width of nodes

### Custom Color Mapping

Colors can be customized based on node type or flow direction.

```js | ob { autoMount: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'sankey',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/energy.json',
    transform: [
      {
        type: 'custom',
        callback: (data) => ({ links: data }),
      },
    ],
  },
  layout: {
    nodeAlign: 'justify',
    nodePadding: 0.03,
  },
  encode: {
    color: (d, idx) => {
      // Assign colors based on first letter of node name
      const firstChar = d.key?.charAt(0).toLowerCase() || '';
      if (firstChar <= 'f') return '#1890ff';
      if (firstChar <= 'n') return '#52c41a';
      if (firstChar <= 's') return '#faad14';
      return '#f5222d';
    },
  },
  style: {
    labelSpacing: 3,
    labelFontWeight: 'bold',
    nodeStrokeWidth: 1,
    linkFillOpacity: 0.6,
  },
});

chart.render();
```

**Explanation**:
- Use `encode.color` to define custom color mapping functions
- Colors can be dynamically assigned based on node properties, flow size, and other factors

## Comparison with Other Charts

### Sankey Diagrams vs [Tree Charts](/en/charts/tree)

- Sankey diagrams focus on flow distribution and direction between nodes
- Tree charts focus on hierarchical structure and categorical relationships
- Link width in Sankey diagrams is meaningful (represents flow), while connections in tree charts primarily represent relationships

### Sankey Diagrams vs [Chord Diagrams](/en/charts/chord)

- Sankey diagrams show directed flow relationships, emphasizing flow direction
- Chord diagrams primarily show undirected associative relationships, emphasizing relationship strength
- Sankey diagrams are suitable for process analysis, chord diagrams for relationship network analysis

### Sankey Diagrams vs [Network Graphs](/en/charts/network)

- Sankey diagrams have clear hierarchical structure and flow direction
- Network graphs can have arbitrary node distribution with more complex relationships
- Sankey diagrams are suitable for linear processes, network graphs for complex network relationships

## Similar Charts

<code src="./demos/list-card.tsx"></code>

## Categories

<code src="./demos/list-category.tsx"></code>