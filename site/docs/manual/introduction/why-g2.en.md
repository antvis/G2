---
title: Why G2?
order: 2
---

The name and design concept of G2 comes from Graphic Grammar "[The Grammar of Graphics](https://book.douban.com/subject/10123863/)》. The core of this theory is to reject the classification of charts and use some basic marks and a series of visual components (scale bars, coordinate systems, etc.) to describe a visualization.

Thanks to this, compared to low-level visualization tools like D3, G2 has lower usage and learning costs, which can improve research and development efficiency. Compared with the chart template library, G2 can produce different types of charts, which also changes the way G2 users think about charts: charts are no longer an indivisible whole, but can be combined by tags with different uses. This allows you to spend less time writing code or wondering whether this chart can be realized, and more time "thinking visually in the data world."

Of course, it is only our basic mission to draw more charts more easily. We also hope to convey correct visual thinking to everyone in the process. Language is the most direct way to transmit thinking, so we attach great importance to simplicity and professionalism when designing grammar or API. We refer to many academic research results and best practices in the industry. Based on the original graphics grammar, enhancements including but not limited to the following have been made:

* Simplified syntax for data exploration
* Add animation syntax
* Add syntax for unit visualization
* Add interactive syntax (still under design)
* ...

In simpler terms: **With G2, you can get more visualization effects more professionally and quickly, and gain visual thinking at the same time** .

## concise syntax

You can draw a chart in one sentence, and in addition to drawing the graph itself, you can also add axes, legends, and even interactive prompts!

```js | ob
(() => {
  const chart = new G2.Chart();

  //One sentence statement visualization
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

  return chart.getContainer();
})();
```
G2 simplicity comes from **default value** : You only need to provide the tag type, data and encoding type, and G2 will infer the rest for you. Of course, the great thing about G2 is that the default values ​​can be overridden as needed. We hope that G2 can look good and display insightful information by default, and you can optimize the display of charts based on your specific scenarios and domain knowledge. Will the appeal chart be more readable if the axis tick display is optimized? If you change it to the following color, do you like it better?

```js | ob
(() => {
  const chart = new G2.Chart();

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
    .scale('color', { range: ['steelblue', 'orange'] }); // Change color

  chart.render();

  return chart.getContainer();
})();
```

You may think that a scatter plot is too simple, so let’s see how G2 draws a sankey graph in one sentence!

```js | ob
(() => {
  const chart = new G2.Chart({
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

  return chart.getContainer();
})();
```

## Rich chart types

G2 can draw a variety of chart types. In addition to supporting basic fold and column pie charts, it also supports vector fields, parallel coordinate systems and other slightly more complex charts, such as the following connection chart:

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .link()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/antfincdn/SM13%24lHuYH/metros.json',
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

  return chart.getContainer();
})();
```

The most wonderful thing about G2 is that you can get new charts by combining different charts (more precisely marks)! For example, if we add the point mark of the scatter chart and the link mark of the connection chart to a chart, we can obtain a labeled point-line connection chart.

```js | ob
(() => {
  const chart = new G2.Chart({
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

  // Point Symbol
  chart
    .point()
    .encode('x', 'body_mass_g')
    .encode('y', 'species')
    .style('stroke', '#000')
    .tooltip({ channel: 'x' });

  // Link Symbol
  chart
    .link()
    .encode('x', 'body_mass_g')
    .encode('y', 'species')
    .transform({ type: 'groupY', x: 'min', x1: 'max' })
    .style('stroke', '#000')
    .tooltip(false);

  // Point Symbol
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

  return chart.getContainer();
})();
```

## Strong data analysis capabilities

In the process of visualization, processing data often takes a lot of time, and there is a certain cost of getting started. To simplify this process, reduce data preprocessing time and standardize common data analysis capabilities, G2 provides a series of **Transform** to aggregate and generate new data. For example, the following calculates the task distribution of athletes with different weights:

```js | ob
(() => {
  const chart = new G2.Chart();

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

  return chart.getContainer();
})();
```

Want your chart split by gender?

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .rect()
    .data({
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/athletes.json',
    })
    .encode('x', 'weight')
    .encode('color', 'sex') // Include color coding
    .transform({ type: 'binX', y: 'count' })
    .transform({ type: 'stackY', orderBy: 'series' })
    .style('inset', 0.5);

  chart.render();

  return chart.getContainer();
})();
```

Want to see the distribution of each gender being separated?

```js | ob
(() => {
  const chart = new G2.Chart({
    
    paddingLeft: 50,
    paddingBottom: 50,
  });

  const facet = chart.facetRect().encode('y', 'sex').data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/athletes.json',
  });

  facet
    .rect()
    .data({
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/athletes.json',
    })
    .encode('x', 'weight')
    .transform({ type: 'binX', y: 'count' })
    .style('inset', 0.5);

  chart.render();

  return chart.getContainer();
})();
```

## Vivid animation capabilities

G2 can draw data-driven animations to achieve the effect of visual storytelling. First, all animation properties (animation type, delay and duration) can be bound to data, such as the following data-driven Gantt chart animation:

```js | ob
(() => {
  const chart = new G2.Chart();

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
    .encode('enterDuration', (d) => d.endTime - d.startTime) // Bind animation duration with durationTime.
    .encode('enterDelay', 'startTime') // Bind enterDelay and startTime
    .scale('enterDuration', { zero: true, range: [0, 3000] });

  chart.render();

  return chart.getContainer();
})();
```

At the same time, the animation channel can be converted to control the order and time of appearance of data elements. For example, in the rose picture below, each "petal" appears in sequence:

```js | ob
(() => {
  const chart = new G2.Chart();

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
    // Appear by order
    .transform({ type: 'stackEnter', groupBy: ['color', 'x'], duration: 3000 })
    .scale('y', { type: 'sqrt' })
    .animate('enter', { type: 'waveIn' })
    .axis('y', false);

  chart.render();

  return chart.getContainer();
})();
```

In addition to animation in a certain view, you can also do continuous deformation animation between different views: graphics are related together through data, such as the transition animation of scatter plots and aggregated bars below:

```js | ob
(async () => {
  const data = await fetch(
    'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  ).then((res) => res.json());

  const chart = new G2.Chart();

  // Keyframe container, apply transition animation to the view inside
  const keyframe = chart
    .timingKeyframe()
    .attr('direction', 'alternate')
    .attr('iterationCount', 4);

  // First view: Scatter plot
  keyframe
    .interval()
    .attr('padding', 'auto')
    .data(data)
    .encode('x', 'gender')
    .encode('color', 'gender')
    .encode('key', 'gender')
    .transform({ type: 'groupX', y: 'count' });

  // Second view: Aggregated bar chart
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

  return chart.getContainer();
})();
```

## Customized interaction capabilities

In addition to providing rich built-in interactions, G2 also provides the ability to link different views through `chart.on` and `chart.emit` for interactive coordination.interactions between different views, such as the "Focus and Context" ability shown below:

```js | ob
(() => {
  const container = document.createElement('div');
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

  // Add event listeners for communication between different charts.
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

  return container;
})();
```

## Two API styles

 G2 provides two styles of API: **Functional API** and **Optional API** . The former declares the chart through a series of function chain calls, and the latter declares the chart through a JavaScript object. For example in [concise syntax](<concise syntax>), if you use the optional API, the scatter plot in can be declared as follows:

```js | ob
(() => {
  const chart = new G2.Chart();

  // Declare the chart via the options API
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

  return chart.getContainer();
})();
```

You can find that the charts drawn by the two are exactly the same! In fact, this is indeed true: the visual expression capabilities of the two APIs are the same. In other words, diagrams that can be drawn by the functional API can also be drawn by the optional API, and vice versa. In terms of implementation, the functional API is built on the optional API, which is converted into the corresponding JavaScript and then rendered.

The choice between the two is more of a matter of style: if you are familiar with D3, like functional programming, or are an old user of G2, you can choose the functional API; if you have just started using G2 and are exposed to visualization, then the optional API is recommended API. Of course, if you are packaging your own chart library based on G2, it is recommended to use the optional API. However, there is a best practice: use the option API when initializing the chart, and use the functional API when updating the chart.

```js | ob
(() => {
  const chart = new G2.Chart({
    height: 150,
    padding: 10,
    
  });

  const mock = () => Array.from({ length: 20 }, () => Math.random());

  //Initialize chart
  //Use optional API
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

  //Update chart
  // Use functional API
  const button = document.createElement('button');
  button.style.display = 'block';
  button.textContent = 'Update data';
  button.onclick = () => {
    const interval = chart.getNodeByType('interval'); // Get interval
    interval.data(mock()); // Update interval data
    chart.render(); // Render chart
  };

  const node = chart.getContainer();
  node.insertBefore(button, node.childNodes[0]);
  return node;
})();
```

## Can be combined

G2 provides a simple compound mark mechanism for enhancing charts or customizing charts. For example, composite point, line and area mark, you can use the built-in mark just like any built-in mark.

```js | ob
(() => {
  //Declare composite mark
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

  const chart = new G2.Chart();

  // The usage of composite mark in API
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

  // Using composite mark in Spec
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

  return chart.getContainer();
})();
```

Composite mark makes it easier to add charts based on G2 and simpler to maintain. At the same time, some marks within G2 are also implemented based on this method.

## Scalable

G2 is an architecture built by **Runtime** and a series of **Visual component (Component)** constituted. The runtime is mainly responsible for completing data mapping, creation and inference of scales, etc., as well as cascading visualization components. Different visualization components have different functions, such as Scale for mapping data and Shape for drawing mapped graphics. Here's how to customize a triangular bar chart:

```js | ob
(() => {
  // Customize a triangle shape
  G2.register('shape.interval.triangle', (style, context) => {
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

  const chart = new G2.Chart();

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
    .encode('shape', 'triangle'); // Using this shape

  chart.render();

  return chart.getContainer();
})();
```

## Pack on demand

The visual components available in G2 Runtime are organized through Library. Library is essentially a JavaScript object as follows:

```js
const library = {
  'mark.interval': Interval,
  'scale.linear': Linear,
  //...
};
```

Therefore, on-demand packaging can be achieved by modifying the library and the packaging tool Tree Shaking, thereby reducing the package size. For example, if you only need to draw some simple charts in your project, and do not need to draw geography (GeoPath), graphs (ForceGraph) or advanced statistical charts (Sankey), then you can customize your own Chart object as follows:

```js
import { Runtime, corelib, extend } from '@antv/g2';

//Extend Runtime based on corelib
// 1. Add type (if using TypeScript)
// 2. Add mark
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

If you wish to draw a geographical chart, you can do the following:

```js
import { Runtime, corelib, geolib, extend } from '@antv/g2';

// Ability to use two libs at the same time
const Chart = extend(Runtime, { ...corelib, ...geolib });

const chart = new Chart({ container: 'container' });

// ...
```
