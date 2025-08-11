---
title: Get Started
order: 1
---

There are currently two ways to use G2:

- Package manager
- CDN

## Package manager

If you use Node-based packaging tools such as Webpack and Rollup, you can install G2 through package managers such as NPM or Yarn.

```bash
# Install via NPM
npm install @antv/g2
```

```bash
# Install via Yarn
yarn add @antv/g2
```

After successful installation, provide a container for G2:

```html
<div id="container"></div>
```

Then enter the following code:

```js
import { Chart } from '@antv/g2';

// Prepare data
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

// Initialize chart instance
const chart = new Chart({
  container: 'container',
});

// Declare visualization
chart
  .interval() // Create an Interval mark
  .data(data) // Bind data
  .encode('x', 'genre') // Encode x channel
  .encode('y', 'sold'); // Encode y channel

// Render visualization
chart.render();
```

## CDN

G2 also provides a UMD version, which can be loaded directly through CDN and used directly. At this time, the `Chart` object can be accessed through the namespace `G2`.

```html
<script src="https://unpkg.com/@antv/g2/dist/g2.min.js"></script>
<script>
  // Prepare data
  const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ];

  // Initialize chart instance
  const chart = new G2.Chart({
    container: 'container',
  });

  // Declare visualization
  chart
    .interval() // Create an Interval mark
    .data(data) // Bind data
    .encode('x', 'genre') // Encode x channel
    .encode('y', 'sold'); // Encode y channel

  // Render visualization
  chart.render();
</script>
```

## The journey begins

No matter which method you use, if you draw a bar chart like the following, it means that everything is going well and the journey of exploring visualization and G2 has officially begun.

```js | ob { pin:false, inject: true }
import { Chart } from '@antv/g2';

// Initialize chart instance

const chart = new Chart({
  container: 'container',
});

chart
  .interval()
  .data([
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ])
  .encode('x', 'genre')
  .encode('y', 'sold');

chart.render();
```

## Using G2 in Frontend Frameworks

<Card title="Using G2 in React" description="G2 provides a complete guide for using in React, including component encapsulation, data binding, state management best practices and example code" href="/en/manual/introduction/use-in-framework#react" width="45%"></Card>
<Card title="Using G2 in Vue" description="G2 provides method guides for using in Vue2 and Vue3, supporting both Options API and Composition API, with complete example code reference" href="/en/manual/introduction/use-in-framework#vue" width="45%"></Card>

## Online Experience with G2

<Card title="Chart Examples" description="Browse over 100+ chart examples covering bar charts, line charts, pie charts, scatter plots and more types. Experience G2's powerful features online without any environment setup" href="/en/examples" cover="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*yzh-S5AM5IEAAAAAAAAAAAAADmJ7AQ/original" width="45%"></Card>
<Card title="Chart Overview" description="Detailed introduction to 40+ chart types, including basic chart knowledge and applicable scenario analysis to help you quickly find the most suitable chart type, the best guide for beginners" href="/en/charts/overview" cover="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*tE0qTZpnRr4AAAAAUZAAAAgAemJ7AQ/original" width="45%"></Card>

## FAQ

<Card title="Frequently Asked Questions" description="Having problems? Check our compiled FAQ and solutions, including installation, configuration, API usage and other troubleshooting answers to quickly solve development issues" href="/en/manual/faq" width="45%"></Card>

## Getting Started with Development

### Basic Knowledge

<Card title="G2 Configuration Overview" description="Detailed display of G2's complete configuration system, covering chart initialization configuration, API chained calls, options method configuration and all available configuration options and hierarchical relationships" href="/en/manual/core/configuration" width="45%"></Card>
<Card title="G2 Chart Composition" description="To better use G2 for data visualization, we need to understand the composition of G2 charts and related concepts, as well as chart layout knowledge" href="/en/manual/core/chart/chart-component" width="45%"></Card>
<Card title="Chart Lifecycle" description="Basic usage and lifecycle management of Chart objects, including creating chart instances, configuring global options, mounting charts, rendering charts, updating charts, and chart cleanup and destruction" href="/en/manual/core/chart/chart-lifecycle" width="45%"></Card>
<Card title="Chart API" description="Complete API reference documentation to easily create visualizations, render charts, get instances, trigger events and more. You can also configure charts through chained API calls" href="/en/manual/api" width="45%"></Card>

### Drawing Graphics

<Card title="Marks" description="The basic units of G2 drawing, including 30+ mark types such as points, lines, areas, text, etc. Any chart can be composed of one or more marks" href="/en/manual/core/mark/overview" width="30%"></Card>
<Card title="Data Configuration and Transform" description="Supports convenient data source configuration with inline arrays, remote URLs, JSON/CSV formats, and multiple data transforms like filter, join, kde for easy data preprocessing before drawing" href="/en/manual/core/data/overview" width="30%"></Card>
<Card title="Encode" description="Maps data properties to visual channels (position, color, size, shape, etc.), serving as the key bridge connecting data and graphics" href="/en/manual/core/encode" width="30%"></Card>

<Card title="View" description="The core building unit of charts, used to carry and organize multiple marks, unified management of data, coordinate systems, interactions, styles and other configurations" href="/en/manual/core/view" width="30%"></Card>
<Card title="Scale" description="The bridge that maps abstract data to visual data, providing linear, logarithmic, time and other types, determining how data is visualized" href="/en/manual/core/scale/overview" width="30%"></Card>
<Card title="Transform" description="Unlike data preprocessing, mark transforms provide drawing-time transformations, including stacking, filtering, aggregation, sorting, grouping, jittering and other transformation methods, supporting complex data analysis and graphic optimization" href="/en/manual/core/transform/overview" width="30%"></Card>

### Configuring Chart Components

<Card title="Axis" description="The ruler of charts, establishing the mapping relationship between data and visual positions. Through ticks, tick labels, grid lines and other elements, it helps users correspond data numbers with chart positions. You can format tick values, adjust tick label positions, etc." cover="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*NlP_QJ0Ux0EAAAAATIAAAAgAemJ7AQ/original" href="/en/manual/component/axis" width="30%"></Card>
<Card title="Legend" description="Auxiliary elements of charts, using color, size, shape to distinguish different data types. It's the visualization of scales corresponding to non-spatial channels (color, opacity, size, shape), supporting data filtering and interaction" cover="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ZYtvSoUX-q4AAAAARFAAAAgAemJ7AQ/original" href="/en/manual/component/legend" width="30%"></Card>
<Card title="Title" description="Specifies the chart title content, showing chart overview information in one sentence. Consists of main title and subtitle, customizable through text style adjustments, no title by default" cover="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*pSo8Q5pctIcAAAAAQ1AAAAgAemJ7AQ/original" href="/en/manual/component/title" width="30%"></Card>

<Card title="Scrollbar" description="Solves the problem of chart information being too dense to display completely. Used when content exceeds the display area, can be bound to x or y channels to control the displayed partial content, disabled by default" cover="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*5fKuRbs5510AAAAAQOAAAAgAemJ7AQ/original" href="/en/manual/component/scrollbar" width="30%"></Card>
<Card title="Slider" description="A component to assist in viewing data, condensing large amounts of data onto one axis. It allows both macro view of data overview and micro view of segments, supporting drag to observe data evolution within a certain range, suitable for large data volume scenarios" cover="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Q3EASpc7jmwAAAAAQ0AAAAgAemJ7AQ/original" href="/en/manual/component/slider" width="30%"></Card>
<Card title="Tooltip" description="One of the core components of chart interaction, dynamically displaying detailed information of data points (values, percentages, etc.), supporting multiple trigger methods like mouse hover, click, touch, enhancing chart interactivity and readability" cover="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*K5iUTrYme5QAAAAAQpAAAAgAemJ7AQ/original" href="/en/manual/component/tooltip" width="30%"></Card>

<Card title="Label" description="Means to add annotations to charts, including data points, connecting lines, text values and other elements. Through concise text explanations, it reduces misunderstandings, emphasizes key data or trends, and guides users to focus on important information" cover="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Xp_XSoMgOFIAAAAAanAAAAgAemJ7AQ/original" href="/en/manual/component/label" width="30%"></Card>

### Layout and Interaction

<Card title="Coordinate" description="Manages spatial position mapping, supporting multiple types like Cartesian coordinates, polar coordinates, 3D coordinates, etc., to achieve different visualization layouts" href="/en/manual/core/coordinate/overview" width="30%"></Card>
<Card title="Interaction" description="Provides 20+ interaction methods, including hover tooltips, brush highlighting, zoom and pan, etc., enhancing data exploration experience" href="/en/manual/core/interaction/overview" width="30%"></Card>
<Card title="Composition" description="Supports multiple combination methods like faceting, repetition, layering, etc., easily building complex layouts like dashboards and small multiples" href="/en/manual/core/composition/overview" width="30%"></Card>

### Styling and Beautification

<Card title="Style" description="Fine control over visual styles of marks and views, supporting rich style properties like fill color, stroke, opacity, font, etc." href="/en/manual/core/style" width="30%"></Card>
<Card title="Color" description="Provides multiple color encoding methods and built-in color palettes, supporting categorical colors, continuous colors, custom palettes and other color schemes" href="/en/manual/core/color" width="30%"></Card>
<Card title="Theme" description="Built-in multiple theme styles like Classic, Academy, etc., supporting theme customization and extension to quickly unify chart visual styles" href="/en/manual/core/theme/overview" width="30%"></Card>

### Advanced Features

<Card title="State" description="Configure styles for chart elements in different states like hover, select, etc., achieving rich interactive feedback effects" href="/en/manual/core/state" width="30%"></Card>
<Card title="Event" description="Listen to chart lifecycle and user interaction events, get click data, rendering status and other information to implement custom interaction logic" href="/en/manual/core/event" width="30%"></Card>
<Card title="Animate" description="Built-in multiple animation types like fadeIn, scaleIn, morphing, etc., supporting fine control of enter, update, exit animations" href="/en/manual/core/animate/overview" width="30%"></Card>
