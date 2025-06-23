---
title: New Version Features
order: 1
---

The name and design philosophy of G2 both derive from the Grammar of Graphics book "[The Grammar of Graphics](https://book.douban.com/subject/10123863/)". The core of this theory is: reject chart classification, and use some basic marks and a series of visualization components (scales, coordinate systems, etc.) to describe a visualization.

Because of this, compared to low-level visualization tools like D3, G2 has lower usage and learning costs, helping to improve development efficiency. Compared to chart template libraries, G2 can create a richer variety of charts, and also changes how G2 users think about charts: charts are no longer an indivisible whole, but can be composed of marks with different purposes. This allows users to spend less time writing code or worrying about whether charts can be implemented, and instead spend more time on "visual thinking in the data world".

Of course, drawing more charts more easily is just our basic task. We hope to convey correct visualization thinking to everyone in this process. Language is the most direct way to convey thinking, so we pay great attention to simplicity and professionalism when designing syntax or APIs. For this reason, we have referenced a large number of academic research results and industrial best practices. Based on the original Grammar of Graphics, we have made enhancements including but not limited to the following aspects:

- Simplified syntax for data exploration
- Added animation syntax
- Added unit visualization syntax
- Added interaction syntax (still in design)
- ...

Simply put: **Using G2, you can not only quickly obtain more professional visualization effects, but also cultivate and improve your visualization thinking ability**.

## Concise Syntax

You can draw a chart with one sentence. In addition to drawing the graphics themselves, it will also add coordinate axis, legends, and even interactive tooltips!

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

// Declare visualization in one sentence
chart
  .point()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
  })
  .encode('x', 'weight')
  .encode('y', 'height')
  .encode('color', 'gender');

chart.render();
```

G2's conciseness comes from its built-in **default values**: you only need to provide the mark type, data, and encoding method, and G2 will automatically infer other parameters for you. It's worth mentioning that one of G2's great advantages is that these default settings can all be adjusted as needed. We hope that G2 can be beautiful and insightful by default, while also allowing you to optimize chart display based on specific scenarios and professional knowledge.

Let's see the following example. Does optimizing axis tick display make the chart more readable? Is changing to the following colors more to your liking?

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .point()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
  })
  .encode('x', 'weight')
  .encode('y', 'height')
  .encode('color', 'gender')
  .scale('x', { nice: true }) // Optimize coordinate tick display
  .scale('y', { nice: true }) // Optimize coordinate tick display
  .scale('color', { range: ['steelblue', 'orange'] }); // Change colors

chart.render();
```

You might think scatter plots are too simple, so let's see how G2 draws a Sankey diagram with one sentence!

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 900,
  height: 600,
});

// Sankey mark
chart
  .sankey()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/energy.json',
    transform: [
      {
        type: 'custom',
        callback: (data) => ({ links: data }),
      },
    ],
  })
  .layout({
    nodeAlign: 'center',
    nodePadding: 0.03,
  })
  .style('labelSpacing', 3)
  .style('labelFontWeight', 'bold')
  .style('nodeStrokeWidth', 1.2)
  .style('linkFillOpacity', 0.4);

chart.render();
```

## Rich Chart Types

G2 can draw rich chart types. In addition to supporting basic line charts, bar charts, pie charts and other charts, it also supports slightly more complex charts such as vector fields and parallel coordinate systems, such as the link chart below:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .link()
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antfincdn/SM13%24lHuYH/metros.json',
  })
  .encode('x', ['POP_1980', 'POP_2015'])
  .encode('y', ['R90_10_1980', 'R90_10_2015'])
  .encode('color', (d) => d.R90_10_2015 - d.R90_10_1980)
  .scale('x', { type: 'log' })
  .style('arrow', true)
  .style('arrowSize', 6)
  .axis('x', { labelFormatter: '~s' })
  .tooltip({ title: { channel: 'color', valueFormatter: '.1f' } })
  .legend(false);

chart.render();
```

The most wonderful thing about G2 is: you can **combine** different charts (more accurately called marks) to get **brand new charts**! For example, we add both Point marks from scatter plots and Link marks from link charts to a chart, and we can get an annotated point-line connection chart.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 180,
});

chart.data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/penguins.json',
  transform: [
    {
      type: 'map',
      callback: (d) => ({ ...d, body_mass_g: +d.body_mass_g }),
    },
  ],
});

// Point mark
chart
  .point()
  .encode('x', 'body_mass_g')
  .encode('y', 'species')
  .style('stroke', '#000')
  .tooltip({ channel: 'x' });

// Link mark
chart
  .link()
  .encode('x', 'body_mass_g')
  .encode('y', 'species')
  .transform({ type: 'groupY', x: 'min', x1: 'max' })
  .style('stroke', '#000')
  .tooltip(false);

// Point mark draws median line
chart
  .point()
  .encode('y', 'species')
  .encode('x', 'body_mass_g')
  .encode('shape', 'line')
  .encode('size', 12)
  .transform({ type: 'groupY', x: 'median' })
  .style('stroke', 'red')
  .tooltip({ channel: 'x' });

chart.render();
```

## Powerful Data Analysis Capabilities

In the data visualization workflow, data processing often takes up a lot of time and also requires a certain learning cost. To simplify this process, shorten data preprocessing time, and standardize common data analysis capabilities, G2 provides a series of **transforms** for aggregating and generating new data.

Let's see how to visualize the weight distribution of athletes after obtaining raw athlete weight data through data transformation:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .rect()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/athletes.json',
  })
  .encode('x', 'weight')
  .transform({ type: 'binX', y: 'count' })
  .style('inset', 0.5);

chart.render();
```

Want to split the chart by gender?

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .rect()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/athletes.json',
  })
  .encode('x', 'weight')
  .encode('color', 'sex') // Add color encoding
  .transform({ type: 'binX', y: 'count' })
  .transform({ type: 'stackY', orderBy: 'series' })
  .style('inset', 0.5);

chart.render();
```

Want to see the distribution of each gender separately through faceting?

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  paddingLeft: 50,
  paddingBottom: 50,
});

const facet = chart.facetRect().encode('y', 'sex').data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/athletes.json',
});

facet
  .rect()
  .encode('x', 'weight')
  .transform({ type: 'binX', y: 'count' })
  .style('inset', 0.5);

chart.render();
```

## Vivid Animation Capabilities

G2 can create data-driven animations to achieve visualization storytelling effects. First, all animation properties (animation type, delay and duration) can be bound to data, such as the data-driven Gantt chart animation below. You can click the run button on the left to see the effect.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .interval()
  .coordinate({ transform: [{ type: 'transpose' }] })
  .data([
    { name: 'event planning', startTime: 1, endTime: 4 },
    { name: 'layout logistics', startTime: 3, endTime: 13 },
    { name: 'select vendors', startTime: 5, endTime: 8 },
    { name: 'hire venue', startTime: 9, endTime: 13 },
    { name: 'hire caterer', startTime: 10, endTime: 14 },
    { name: 'hire event decorators', startTime: 12, endTime: 17 },
    { name: 'rehearsal', startTime: 14, endTime: 16 },
    { name: 'event celebration', startTime: 17, endTime: 18 },
  ])
  .encode('x', 'name')
  .encode('y', ['endTime', 'startTime'])
  .encode('color', 'name')
  .encode('enterDuration', (d) => d.endTime - d.startTime) // Animation duration bound to durationTime
  .encode('enterDelay', 'startTime') // Appearance time bound to startTime
  .scale('enterDuration', { zero: true, range: [0, 3000] }); // Define scale for enterDuration channel, scale determines how these channels should be visualized

chart.render();
```

At the same time, animation channels can be transformed to control the appearance order and timing of data elements. For example, in the rose chart below, each "petal" appears in sequence according to color and order, thanks to the built-in transforms provided by G2. For specific usage, see [stackEnter](/en/manual/core/transform/stack-enter).

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .interval()
  .coordinate({ type: 'polar' })
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/deaths.json',
  })
  .encode('x', 'Month')
  .encode('y', 'Death')
  .encode('color', 'Type')
  .transform({ type: 'stackY' })
  // Appear in sequence
  .transform({ type: 'stackEnter', groupBy: ['color', 'x'], duration: 3000 }) // Try changing groupBy and duration to see what happens
  .scale('y', { type: 'sqrt' })
  .animate('enter', { type: 'waveIn' })
  .axis('y', false);

chart.render();
```

In addition to implementing animation effects within a single view, you can also create continuous morphing animations between different views: graphics are linked together through data association, such as the transition animation between scatter plots and aggregated bar charts below:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

fetch(
  'https://gw.alipayobjects.com/os/bmw-prod/fbe4a8c1-ce04-4ba3-912a-0b26d6965333.json',
)
  .then((res) => res.json())
  .then((data) => {
    const chart = new Chart({
      container: 'container',
      paddingTop: 60,
      paddingLeft: 100,
    });

    // Keyframe container, applies transition animations to views inside
    const keyframe = chart
      .timingKeyframe()
      .attr('direction', 'alternate')
      .attr('iterationCount', 4);

    // First view: scatter plot
    keyframe
      .interval()
      .attr('padding', 'auto')
      .data(data)
      .encode('x', 'gender')
      .encode('color', 'gender')
      .encode('key', 'gender')
      .transform({ type: 'groupX', y: 'count' });

    // Second view: aggregated bar chart
    keyframe
      .point()
      .attr('padding', 'auto')
      .data(data)
      .encode('x', 'weight')
      .encode('y', 'height')
      .encode('color', 'gender')
      .encode('groupKey', 'gender')
      .encode('shape', 'point');

    chart.render();
  });
```

## Customizable Interaction Capabilities

In addition to providing rich built-in interactions, G2 also provides the ability to link different views through `chart.on` and `chart.emit`, such as the "Focus and Context" capability shown below:

```js | ob {  inject: true }
const { Chart } = G2;
const chart = new Chart({
  container: 'container',
});
const container = chart.getContainer();
const focusContainer = document.createElement('div');
const contextContainer = document.createElement('div');
container.append(focusContainer);
container.append(contextContainer);

// Render focus view

const focus = new G2.Chart({
  container: focusContainer,
  height: 360,
  paddingLeft: 50,
});

focus
  .area()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
  })
  .encode('x', 'date')
  .encode('y', 'close')
  .animate(false)
  .axis('x', { grid: false, title: false, tickCount: 5 })
  .axis('y', { grid: false, tickCount: 5 })
  .interaction('tooltip', false)
  .interaction('brushXFilter', true);

focus.render();

// Render context view

const context = new G2.Chart({
  container: contextContainer,
  paddingLeft: 50,
  paddingTop: 0,
  paddingBottom: 0,
  height: 60,
});

context
  .area()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
  })
  .encode('x', 'date')
  .encode('y', 'close')
  .animate(false)
  .axis(false)
  .interaction('tooltip', false)
  .interaction('brushXHighlight', { series: true });

context.render();

// Add event listeners to communicate between different charts
focus.on('brush:filter', (e) => {
  const { nativeEvent } = e;
  if (!nativeEvent) return;
  const { selection } = e.data;
  const { x: scaleX } = focus.getScale();
  const [[x1, x2]] = selection;
  const domainX = scaleX.getOptions().domain;
  if (x1 === domainX[0] && x2 === domainX[1]) {
    context.emit('brush:remove', {});
  } else {
    context.emit('brush:highlight', { data: { selection } });
  }
});

context.on('brush:highlight', (e) => {
  const { nativeEvent, data } = e;
  if (!nativeEvent) return;
  const { selection } = data;
  focus.emit('brush:filter', { data: { selection } });
});

context.on('brush:remove', (e) => {
  const { nativeEvent } = e;
  if (!nativeEvent) return;
  const { x: scaleX, y: scaleY } = context.getScale();
  const selection = [scaleX.getOptions().domain, scaleY.getOptions().domain];
  focus.emit('brush:filter', { data: { selection } });
});
```

## Two API Styles

G2 provides two styles of APIs: **Functional API** and **Options API**. The former declares charts through a series of chained function calls, while the latter declares charts through a JavaScript object. For example, the scatter plot in [Concise Syntax](#concise-syntax) can be declared using the Options API as follows:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

// Declare chart through Options API
chart.options({
  type: 'point',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
  },
  encode: {
    x: 'weight',
    y: 'height',
    color: 'gender',
  },
});

chart.render();
```

You can see that the two produce identical charts! In fact, this is true: the visualization expression capabilities of both APIs are the same. In other words, charts that can be drawn with the Functional API can also be drawn with the Options API, and vice versa. From an implementation perspective, the Functional API is built on top of the Options API and is converted to corresponding JavaScript before rendering.

The choice between the two is more a matter of style: if you are familiar with D3, or prefer functional programming, or are an old G2 user, you can choose the Functional API; if you are just starting to use G2 and getting into visualization, then the Options API is recommended. Of course, if you are building your own chart library based on G2, then the Options API is recommended. However, there is one best practice: use the Options API when initializing charts, and use the Functional API when updating charts.

For more content, please read [Spec and API](/en/manual/introduction/experimental-spec-api).

```js | ob {  inject: true }
const { Chart } = G2;
const chart = new Chart({
  container: 'container',
  height: 150,
  padding: 10,
});
const container = chart.getContainer();

const mock = () => Array.from({ length: 20 }, () => Math.random());

// Initialize chart
// Use Options API
chart.options({
  type: 'interval',
  data: mock(),
  encode: { x: (_, i) => i, y: (d) => d, key: (_, i) => i },
  axis: false,
  tooltip: {
    items: [{ channel: 'y', valueFormatter: '.0%' }],
  },
});

chart.render();

// Update chart
// Use Functional API
const button = document.createElement('button');
button.style.display = 'block';
button.textContent = 'Update Data';
button.onclick = () => {
  const interval = chart.getNodeByType('interval'); // Get interval
  interval.data(mock()); // Update interval data
  chart.render(); // Render chart
};

container.insertBefore(button, container.childNodes[0]);
```

## Composable

G2 provides a simple composite mark mechanism for enhancing charts or customizing charts. For example, compositing Point, Line, and Area.

For more content, please read [Composition](/en/manual/core/composition/overview).

```js | ob { inject: true }
import { Chart } from '@antv/g2';

// Define composite mark
function PointLineArea({ data, encode = {}, style = {} } = {}) {
  const { fillOpacity = 0.1 } = style;
  return [
    {
      type: 'area',
      data,
      encode,
      style: { fillOpacity },
    },
    { type: 'line', data, encode },
    { type: 'point', data, encode },
  ];
}

const chart = new Chart({
  container: 'container',
});

// Use composite mark via API
chart
  .mark(PointLineArea)
  .data([
    { year: '1991', value: 15468 },
    { year: '1992', value: 16100 },
    { year: '1993', value: 15900 },
    { year: '1994', value: 17409 },
    { year: '1995', value: 17000 },
    { year: '1996', value: 31056 },
    { year: '1997', value: 31982 },
    { year: '1998', value: 32040 },
    { year: '1999', value: 33233 },
  ])
  .encode('x', 'year')
  .encode('y', 'value');

// Use composite mark via Spec
chart.options({
  type: PointLineArea,
  data: [
    { year: '1991', value: 15468 },
    { year: '1992', value: 16100 },
    { year: '1993', value: 15900 },
    { year: '1994', value: 17409 },
    { year: '1995', value: 17000 },
    { year: '1996', value: 31056 },
    { year: '1997', value: 31982 },
    { year: '1998', value: 32040 },
    { year: '1999', value: 33233 },
  ],
  encode: { x: 'year', y: 'value' },
});

chart.render();
```

Composite marks make it easier to add chart capabilities based on G2 and simpler to maintain, and some marks within G2 are also implemented based on this approach.

## Extensible

G2's architecture consists of a **Runtime** and a series of **visualization components**. The runtime is mainly responsible for completing data mapping, scale creation and inference, etc., as well as connecting visualization components. Different visualization components have different functions, such as scales for mapping data and shapes for drawing mapped graphics. The following shows how to customize a triangular bar chart:

```js | ob { inject: true }
import { register, Chart } from '@antv/g2';

// Custom triangle shape
register('shape.interval.triangle', (style, context) => {
  const { document } = context;
  return (P, value, defaults) => {
    const { color: defaultColor } = defaults;
    const [p0, p1, p2, p3] = P;
    const pm = [(p0[0] + p1[0]) / 2, p0[1]];
    const { color = defaultColor } = value;
    return document.createElement('polygon', {
      style: {
        ...style,
        fill: color,
        points: [pm, p2, p3],
      },
    });
  };
});

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
  .encode('y', 'sold')
  .encode('color', 'genre')
  .encode('shape', 'triangle'); // Use this shape

chart.render();
```

## Tree Shaking

Visualization components available to G2 Runtime are organized through libraries. A library is essentially a JavaScript object like the following:

```js
const library = {
  'mark.interval': Interval,
  'scale.linear': Linear,
  //...
};
```

So you can achieve tree shaking by modifying the library and using the tree shaking capability of bundling tools, thereby reducing bundle size. For example, if your project only needs to draw some simple charts and doesn't need to draw geographic (GeoPath), graph (ForceGraph) or advanced statistical charts (Sankey), then you can customize your own Chart object as follows:

```js
import { Runtime, corelib, extend } from '@antv/g2';

// Extend Runtime based on corelib
// 1. Add types (if using TypeScript)
// 2. Add marks
const Chart = extend(Runtime, { ...corelib() });

const chart = new Chart({ container: 'container' });

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
  .encode('y', 'sold')
  .encode('color', 'genre');

chart.render();
```

If you want to draw geographic charts, you can do the following:

```js
import { Runtime, corelib, geolib, extend } from '@antv/g2';

// Use capabilities from both libraries
const Chart = extend(Runtime, { ...corelib, ...geolib });

const chart = new Chart({ container: 'container' });

// ...
```
