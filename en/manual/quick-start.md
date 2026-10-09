---
title: "Get Started"
description: "Install AntV G2 with npm or a CDN, create a Chart, configure data and visual encodings with Spec, and render your first chart."
language: "en"
canonical: "https://g2.antv.antgroup.com/en/manual/quick-start/"
version: "5.4.8"
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

// Initialize chart instance and declare visualization
const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data,
  encode: { x: 'genre', y: 'sold' },
});

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

  // Initialize chart instance and declare visualization
  const chart = new G2.Chart({
    container: 'container',
  });

  chart.options({
    type: 'interval',
    data,
    encode: { x: 'genre', y: 'sold' },
  });

  // Render visualization
  chart.render();
</script>
```

## The journey begins

No matter which method you use, if you draw a bar chart like the following, it means that everything is going well and the journey of exploring visualization and G2 has officially begun.



```ts
import { Chart } from '@antv/g2';

// Initialize chart instance and declare visualization
const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold' },
});

chart.render();
```



## Using G2 in Frontend Frameworks



[Using G2 in React](</en/manual/introduction/use-in-framework/#react>) — G2 provides a complete guide for using in React, including component encapsulation, data binding, state management best practices and example code




[Using G2 in Vue](</en/manual/introduction/use-in-framework/#vue>) — G2 provides method guides for using in Vue2 and Vue3, supporting both Options API and Composition API, with complete example code reference



## Online Experience with G2



[Chart Examples](</en/examples/>) — Browse over 100+ chart examples covering bar charts, line charts, pie charts, scatter plots and more types. Experience G2's powerful features online without any environment setup




[Chart Overview](</en/charts/overview/>) — Detailed introduction to 40+ chart types, including basic chart knowledge and applicable scenario analysis to help you quickly find the most suitable chart type, the best guide for beginners



## FAQ



[Frequently Asked Questions](</en/manual/FAQ/>) — Having problems? Check our compiled FAQ and solutions, including installation, configuration, API usage and other troubleshooting answers to quickly solve development issues



## Getting Started with Development

### Basic Knowledge



[G2 Configuration Overview](</en/manual/core/configuration/>) — Detailed display of G2's complete configuration system, covering chart initialization configuration, API chained calls, options method configuration and all available configuration options and hierarchical relationships




[G2 Chart Composition](</en/manual/core/chart/chart-component/>) — To better use G2 for data visualization, we need to understand the composition of G2 charts and related concepts, as well as chart layout knowledge




[Chart Lifecycle](</en/manual/core/chart/chart-lifecycle/>) — Basic usage and lifecycle management of Chart objects, including creating chart instances, configuring global options, mounting charts, rendering charts, updating charts, and chart cleanup and destruction




[Chart API](</en/manual/api/>) — Complete API reference documentation to easily create visualizations, render charts, get instances, trigger events and more. You can also configure charts through chained API calls



### Drawing Graphics



[Marks](</en/manual/core/mark/overview/>) — The basic units of G2 drawing, including 30+ mark types such as points, lines, areas, text, etc. Any chart can be composed of one or more marks




[Data Configuration and Transform](</en/manual/core/data/overview/>) — Supports convenient data source configuration with inline arrays, remote URLs, JSON/CSV formats, and multiple data transforms like filter, join, kde for easy data preprocessing before drawing




[Encode](</en/manual/core/encode/>) — Maps data properties to visual channels (position, color, size, shape, etc.), serving as the key bridge connecting data and graphics





[View](</en/manual/core/view/>) — The core building unit of charts, used to carry and organize multiple marks, unified management of data, coordinate systems, interactions, styles and other configurations




[Scale](</en/manual/core/scale/overview/>) — The bridge that maps abstract data to visual data, providing linear, logarithmic, time and other types, determining how data is visualized




[Transform](</en/manual/core/transform/overview/>) — Unlike data preprocessing, mark transforms provide drawing-time transformations, including stacking, filtering, aggregation, sorting, grouping, jittering and other transformation methods, supporting complex data analysis and graphic optimization



### Configuring Chart Components



[Axis](</en/manual/component/axis/>) — The ruler of charts, establishing the mapping relationship between data and visual positions. Through ticks, tick labels, grid lines and other elements, it helps users correspond data numbers with chart positions. You can format tick values, adjust tick label positions, etc.




[Legend](</en/manual/component/legend/>) — Auxiliary elements of charts, using color, size, shape to distinguish different data types. It's the visualization of scales corresponding to non-spatial channels (color, opacity, size, shape), supporting data filtering and interaction




[Title](</en/manual/component/title/>) — Specifies the chart title content, showing chart overview information in one sentence. Consists of main title and subtitle, customizable through text style adjustments, no title by default





[Scrollbar](</en/manual/component/scrollbar/>) — Solves the problem of chart information being too dense to display completely. Used when content exceeds the display area, can be bound to x or y channels to control the displayed partial content, disabled by default




[Slider](</en/manual/component/slider/>) — A component to assist in viewing data, condensing large amounts of data onto one axis. It allows both macro view of data overview and micro view of segments, supporting drag to observe data evolution within a certain range, suitable for large data volume scenarios




[Tooltip](</en/manual/component/tooltip/>) — One of the core components of chart interaction, dynamically displaying detailed information of data points (values, percentages, etc.), supporting multiple trigger methods like mouse hover, click, touch, enhancing chart interactivity and readability





[Label](</en/manual/component/label/>) — Means to add annotations to charts, including data points, connecting lines, text values and other elements. Through concise text explanations, it reduces misunderstandings, emphasizes key data or trends, and guides users to focus on important information



### Layout and Interaction



[Coordinate](</en/manual/core/coordinate/overview/>) — Manages spatial position mapping, supporting multiple types like Cartesian coordinates, polar coordinates, 3D coordinates, etc., to achieve different visualization layouts




[Interaction](</en/manual/core/interaction/overview/>) — Provides 20+ interaction methods, including hover tooltips, brush highlighting, zoom and pan, etc., enhancing data exploration experience




[Composition](</en/manual/core/composition/overview/>) — Supports multiple combination methods like faceting, repetition, layering, etc., easily building complex layouts like dashboards and small multiples



### Styling and Beautification



[Style](</en/manual/core/style/>) — Fine control over visual styles of marks and views, supporting rich style properties like fill color, stroke, opacity, font, etc.




[Color](</en/manual/core/color/>) — Provides multiple color encoding methods and built-in color palettes, supporting categorical colors, continuous colors, custom palettes and other color schemes




[Theme](</en/manual/core/theme/overview/>) — Built-in multiple theme styles like Classic, Academy, etc., supporting theme customization and extension to quickly unify chart visual styles



### Advanced Features



[State](</en/manual/core/state/>) — Configure styles for chart elements in different states like hover, select, etc., achieving rich interactive feedback effects




[Event](</en/manual/core/event/>) — Listen to chart lifecycle and user interaction events, get click data, rendering status and other information to implement custom interaction logic




[Animate](</en/manual/core/animate/overview/>) — Built-in multiple animation types like fadeIn, scaleIn, morphing, etc., supporting fine control of enter, update, exit animations
