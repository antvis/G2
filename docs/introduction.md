# Introduction

![examples](https://gw.alipayobjects.com/mdn/rms_dfc253/afts/img/A*o4YET5i12oMAAAAAAAAAAAAAARQnAQ)

[G2](https://github.com/antvis/G2/tree/v5) is a concise and progressive visualization grammar for **dashboard building**, **data exploration** and **storytelling**. This notebook will give a brief introduction to it and introduce you to some core concepts.

- **Mark** - drawing data-driven geometric elements and static component
- **Transform** - deriving data and mark options
- **Scale** - mapping abstract data to visual data
- **Coordinate** - applying point transformations for spatial position channels
- **Composition** - organizing and enhancing views spatially and temporally
- **Animation** - animating marks with data-driven effects and consistent transitions
- **Interaction** - manipulating views and embedding detailed information with focus and context

In the sprit of "_Talk is cheap, show me the code_", we are going to see what can we make with the simple tabular dataset below using G2.

```js | table
data = genji.fetchJSON(
  'https://gw.alipayobjects.com/os/bmw-prod/1ecf85d2-8279-46a1-898d-d2e1814617f9.json',
);
```

## Mark

Let's begin with a scatterplot of the GDP and the LifeExpectancy of of countries, constructed with [point mark](/mark-point).

G2 doesn't have chart types, it using **mark** as the basic visual building block instead. In most cases, a G2 mark is a template for generating geometric elements from data. Each generated element can either depict a single data item such as interval and point, or a series of data items such line and area.

To control the appearance of mark, we bind columns of data to its visual properties. Each column can either extracting from a data dimension, deriving from existed columns or be an array of constant values. For the below point mark, we assign _GDP_ column to x-position, _LifeExpectancy_ column to x-position, deriving a new column from _Population_ column for color and set shape to _hollowPoint_.

This binding technique is called **encode**. We always say that a visual property encode a abstract data column, and this kind of data-driven property is called **channel**. With the help of encode, not only can marks be positioned in pixels or styling literally, but they can also be drawn with abstract data.

In G2, calling `chart.mark()` to create a new mark and add it to chart. Then calling `mark.encode(channel, column)` to specify its channel and calling `mark.style(property, value)` for its constant property.

```js
(() => {
  const chart = new G2.Chart(); // Instantiate a new chart.

  chart
    .point() // Create and add a point mark to chart.
    .data(data) // Bind abstract dataset for the point mark.
    .encode('x', 'GDP') // X-position encodes GDP column.
    .encode('y', 'LifeExpectancy') // Y-position encodes LifeExpectancy column.
    .encode('color', (d) => (d.Population > 600e6 ? 'High' : 'Low')) // Color encodes column derived from Population column.
    .encode('shape', 'hollowPoint') // Shape encodes constant hollowPoint.
    .style('lineWidth', 2); // LineWidth fixed to 2.

  return chart
    .render() // Nothing will happen before calling render.
    .node(); // Return the container containing the chart.
})();
```

Besides geometric mark, G2 can drawing **static mark** such as [axis](/mark-component#axis) and [legend](/mark-component#legend) as well. Static mark are also called **component** for decoration or guide purpose.

Think of axis and legend as the the visualizations for [scales](/introduction#scale), which can facilitate us comprehending the chart. So it is naturally to configure them in the options of its bind scale. The below example, we title the legend and format labels of x-axis.

```js
(() => {
  const chart = new G2.Chart();

  chart
    .point()
    .data(data)
    .encode('x', 'GDP')
    .encode('y', 'LifeExpectancy')
    .encode('color', (d) => (d.Population > 600e6 ? 'High' : 'Low'))
    .encode('shape', 'hollowPoint')
    .scale('color', { field: 'Population' }) // Title legend.
    .scale('x', { guide: { formatter: (d) => `${d / 1000}k` } }) // Format labels of axisX.
    .style('lineWidth', 2);

  return chart.render().node();
})();
```

## Transform

Then we use [groupX transform](/transform-group) to render a bar chart showing the count of countries for each continent.

Unlike conventional data transform transforming data before plotting, G2 **transform** provide a convenient mechanism for deriving data or even mark options while plotting. Transform is a function that filter, modify, aggregate existed channels or produce new channels, which can both operate in abstract data space such as [stackY](/transform-stack) and operate in screen space such as [pack](/transform-pack).

Transform is born for data exploration, because it frees us for wrestling with the intricacies of manipulating abstract data. By paying more attention to manipulate channels instead, we are able to explore different aspects of data more efficiently and visually. For example as below, we apply groupX transform to group [interval mark](/mark-interval) by x-position channel and produce a new y-position channel storing count for each group.

In G2, calling `mark.transform(transform)` to specify a transform for mark.

```js
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data(data)
    .encode('x', 'Continent')
    .transform({ type: 'groupX', y: 'count' }) // Grouping mark by x-position equals to grouping data by Continent field.
    .scale('x', { field: 'Count' });

  return chart.render().node();
})();
```

Some transform is also helpful for annotating such as [select](/transform-select). Select provides the ability to pulling a single value out of each series or summary each series. Let's go back to the scatterplot above and label the countries with maximum GDP for each continent. It is possible to label the minium, last or first country as well.

```js | select "label:'selector'; options: { labels: ['Maximum', 'Minium', 'Last', 'First'], values: ['max', 'min', 'last', 'first'] }"
selector = 'max'; // Default to max.
```

This example also shows how to draw multiple marks in a single chart. Noticed that annotation is considered as a mark, which means that it is as flexible and powerful as geometries such as point mark mentioned above.

```js
(() => {
  const chart = new G2.Chart();
  const xy = (node) => node.encode('x', 'GDP').encode('y', 'LifeExpectancy');

  chart.data(data);

  chart
    .point()
    .call(xy) // Apply xy function to current point mark, equals to xy(chart.point()).
    .encode('color', (d) => (d.Population > 600e6 ? 'High' : 'Low'))
    .style('fillOpacity', 0.3)
    .style('lineWidth', 1);

  chart
    .annotationText() // Create and add a text annotation to chart.
    .transform({ type: 'select', x: selector }) // Select a shape for each series with specified selector.
    .encode('series', 'Continent') // Series channel will group marks into series.
    .encode('size', 'Population')
    .encode('text', 'Country')
    .call(xy)
    .style('fontSize', 14)
    .style('fill', 'black')
    .style('stroke', 'none')
    .style('fontWeight', 'bold')
    .style('dy', -11);

  return chart.render().node();
})();
```

## Scale

A more complicated take on this data is to focus one more dimension: Population. Here we encode size channel to _Population_ column to get a bubble chart.

Oops! A green circle is so large and the rest of circles are nearly the same size, which makes it no way to compare them. This happens because the values of size channel is non-uniformly distributed, most of values are relatively small to a extreme value. To fix this, set the type of scale for size channel to [log](/scale#log).

```js | select "label:'Scale Type'; options: { labels: ['Linear', 'Log', 'Pow'], values: ['linear', 'log', 'pow'] }"
scale = 'linear'; // Default to linear scale.
```

Here we come to **scale**: a function that map abstract data to visual data. Scale is the bridge between abstract data and visual shapes. If encode define what properties of shape should be visualized, then scale define how to visualize these properties.

Each channel are bind with a scale. It will transform each value for the channel from data domain called **domain** to visual space called **range** by the specified map function. For scaled values of non-spatial position channel, they are ready to be rendered into screen. For example, we specify the type of scale for size channel to _log_, and specify the range to _[4, 20]_.

In G2, calling `mark.scale(channel, options)` to specify scale options for each channel. Although G2 are smart enough to infer type, domain and range for each scale, you can still specify them explicitly, if need.

```js
(() => {
  const chart = new G2.Chart();

  chart
    .point()
    .data(data)
    .encode('x', 'GDP')
    .encode('y', 'LifeExpectancy')
    .encode('color', 'Continent')
    .encode('size', 'Population')
    .scale('size', { type: scale, range: [4, 20] }) // Specify type, range of scale to fix issue above.
    .style('fillOpacity', 0.3)
    .style('lineWidth', 1);

  return chart.render().node();
})();
```

## Coordinate

What if we prefer a horizontal bar chart rather than a vertical bar chart? That's also easy! Simply applying [transpose coordinate transformation](/coordinate#transpose) to the vertical bar chart is OK.

**Coordinate** or better called as coordinate transformation is for applying point transformations for scaled spatial position channels such as x-position and y-position. Coordinate is a powerful mechanism to modify the position or appearance of shapes, which allows you make different charts with slight modification of chart declaration.

Each chart is able to have one or more coordinate transformations at the same time, which will affect all the marks in this chart. For example, the specified transpose coordinate transformation transpose the position for interval mark, axisX and axisY altogether.

In G2, calling `chart.coordinate(coordinate)` to specify a coordinate transformation.

```js
(() => {
  const chart = new G2.Chart({
    paddingLeft: 80,
    paddingBottom: 50,
  });

  chart.coordinate({ type: 'transpose' });

  chart
    .interval()
    .data(data)
    .encode('x', 'Continent')
    .transform({ type: 'groupX', y: 'count' });

  return chart.render().node();
})();
```

Here is an example to using [parallel coordinate transformation](/coordinate#parallel) to draw a [parallel coordinates](https://en.wikipedia.org/wiki/Parallel_coordinates). This example help us explore the pairwise correlation between Continent, LifeExpectancy, Population and GDP columns.

```js
(() => {
  const chart = new G2.Chart({
    paddingLeft: 80,
    height: 400,
  });

  chart.coordinate({ type: 'parallel' }); // Specify parallel coordinate transformation.

  chart
    .line()
    .data(data)
    .encode('position', ['Continent', 'LifeExpectancy', 'Population', 'GDP']) // Position encode multiple data columns, each columns corresponding an axis.
    .encode('color', 'Continent')
    .style('strokeOpacity', 0.8)
    .scale('position0', { guide: { zIndex: 1 } }) // Set the first axis to top.
    .scale('position1', { guide: { zIndex: 1 } }) // Set the second axis to top.
    .scale('position2', {
      guide: { zIndex: 1, formatter: (d) => `${d / 1e6}M` },
    }) // Set the third axis to top and format it.
    .scale('position3', {
      guide: { zIndex: 1, formatter: (d) => `${d / 1e3}K` },
    }); // Set the fourth axis to top and format it.

  return chart.render().node();
})();
```

## Composition

So far we have plotted several charts, including scatterplot, barchart, bubble, etc,. But more strictly speaking, they are called single view visualizations. A **view** is an area with multiple marks, coordinate transformations and [interactions](/introduction#interaction).

For more complex situations, G2 use a **view tree** to describe multi-view displays, which allows you create a whole dashboard with a single specification.

Each node of the view tree has its own data, space and time. In the view tree, a single view plot is called a **view node** and a mark is called a **mark node**. The type of the rest nodes is called **composition node** that divides the data domain, spatial domain and temporal domain for child node.

Spatial composition node always split its space for child spaces and pass the copy of its data, such as [flex node](</composition-spatial#row(flex)>). Here we place the scatterplot and barchart from left to right.

```js
(() => {
  const chart = new G2.Chart({
    width: 800,
    height: 300,
  });
  const flex = chart
    .flex() // Create a flex node and add to chart.
    .data(data); // Bind data and pass it to child.

  flex
    .point() // Create a view with a point mark and add it to the flex node.
    .encode('x', 'GDP')
    .encode('y', 'LifeExpectancy')
    .scale('x', { guide: { formatter: (d) => `${d / 1000}k` } });

  flex
    .interval() // Create a view with a interval mark and add it to the flex node.
    .encode('x', 'Continent')
    .transform({ type: 'groupX', y: 'count' });

  return chart.render().node();
})();
```

Facet composition node produces [small multiples](https://en.wikipedia.org/wiki/Small_multiple) to compare different subsets of the same data, such as [rect node](/composition-rect). In other words, facet composition node will both divide data and space domain for its children. For example, we can mount the scattarplot view to a rect node to visualize countries for each continent separately.

```js
(() => {
  const chart = new G2.Chart({
    width: 800,
    height: 250,
    paddingLeft: 50,
    paddingBottom: 50,
  });

  const rect = chart
    .rect()
    .data(data) // Data will be divided and pass.
    .encode('x', 'Continent'); // Data is grouped by Continent column and space is placed horizontally.

  rect
    .point()
    .encode('x', 'GDP')
    .encode('y', 'LifeExpectancy')
    .scale('x', { guide: { formatter: (d) => `${d / 1000}k` } });

  return chart.render().node();
})();
```

Add pack transform to the faceted scatterplot above, we can get a unit visualization with non-overlapping layout. And you can try `shareData` and `shareSize` options to see the different. And you can use nested rect composition to get a more informative unit visualization for the [Titanic dataset](/composition-unit#nested).

```js | select "pin: false; label: 'ShareData'; options: { labels: ['False', 'True'], values: [0, 1] }"
shareData = false; // Default to false.
```

```js | select "pin: false; label: 'ShareSize'; options: { labels: ['False', 'True'], values: [0, 1] }"
shareSize = false; // Default to false.
```

**Unit visualizations** is a family of visualization that each visual element represent a data item, such as scatterplot, parallel coordinates. They are easier to be interpreted and be tracked during animated transitions and interaction compared to **aggregating visualization**, such as barchart.

```js
(() => {
  const chart = new G2.Chart({
    width: 700,
    height: 300,
  });

  const rect = chart
    .rect()
    .data(data)
    .encode('x', 'Continent')
    .shareData(+shareData) // Coerce to falsy or truthy.
    .shareSize(+shareSize) // Coerce to falsy or truthy.
    .scale('x', { domain: ['Europe', 'Americas', 'Asia', 'Oceania'] }); // Order the views by descending count of countries.

  rect
    .point()
    .adjust({ type: 'pack' }) // Declare by `mark.transform` in the future.
    .encode('title', 'Country')
    .encode('tooltip', ['LifeExpectancy', 'GDP', 'Population']);

  return chart.render().node();
})();
```

We'll leave temporal composition node to the next animation section.

## Animation

**Animation** is an essential part of visualization to attract people's attention and maintain their engagement. In G2, data dimensions can be encoded by animation properties such as duration, delay and easing function. This benefit us to declare [data driven chart animations](/animation#encode-enterdelay-and-enterduration).

We can use [stackEnter transform](/transform-stack-enter) to partition entering marks into hierarchical groups and stacked effects temporally for each group. For example, click the _run_ button in the codeblock to see country bubbles appearing continent by continent.

This example also shows how to group different kinds of declarations with the same concerns by the `mark.call` API.

```js
(() => {
  const chart = new G2.Chart();

  chart
    .point()
    .data(data)
    .call((node) =>
      node // Concerns for static display.
        .encode('x', 'GDP')
        .encode('y', 'LifeExpectancy')
        .encode('size', 'Population')
        .encode('color', 'Continent')
        .scale('size', { type: 'log', range: [4, 20] })
        .style('fillOpacity', 0.3)
        .style('lineWidth', 1),
    )
    .call(
      (node) =>
        node // Concerns for author animations.
          .encode('enterDuration', 1500) // Every mark element should appear in 1.5m originally.
          .transform({ type: 'stackEnter', by: ['color'] }) // Group marks by color channel and modify duration and delay for each group.
          .scale('enter', { type: 'identity' }), // Treat duration and delay as visual data.
    );

  return chart.render().node();
})();
```

Except for data-driven animation, it is possible to author data storytelling or visual narratives by temporal composition node such as [keyframe composition](/composition-keyframe).

For example, we mount some plotted view nodes to a keyframe composition node as below. These views will be rendered in sequence and G2 will apply consistent transitions for marks with connection, which is defined by _key_, _groupKey_ and _key of view_.

```js
(() => {
  const chart = new G2.Chart();
  const keyframe = chart
    .keyframe()
    .iterationCount('infinite')
    .direction('alternate');

  // The first faceted packed scatterplot.
  keyframe
    .rect()
    .data(data)
    .paddingLeft(50)
    .encode('x', 'Continent')
    .scale('x', { domain: ['Europe', 'Americas', 'Asia', 'Oceania'] })
    .scale('color', { guide: null })
    .call((rect) =>
      rect
        .point()
        .class('point')
        .adjust({ type: 'pack' })
        .encode('key', 'Country') // Key mark.
        .encode('color', 'Continent'),
    );

  // The second faceted scatterplot.
  keyframe
    .rect()
    .data(data)
    .paddingLeft(50)
    .encode('x', 'Continent')
    .scale('color', { guide: null })
    .call((rect) =>
      rect
        .point()
        .class('point')
        .encode('x', 'GDP')
        .encode('y', 'LifeExpectancy')
        .encode('key', 'Country') // Key mark.
        .encode('color', 'Continent')
        .scale('x', { guide: { formatter: (d) => `${d / 1000}k` } }),
    );

  // The third scatterplot.
  keyframe
    .point()
    .class('point')
    .paddingLeft(50)
    .data(data)
    .encode('x', 'GDP')
    .encode('y', 'LifeExpectancy')
    .encode('color', 'Continent')
    .encode('key', 'Country') // Key mark.
    .encode('groupKey', 'Continent') // Key group.
    .scale('color', { guide: null });

  // The fourth aggregated barchart.
  keyframe
    .interval()
    .data(data)
    .paddingLeft(50)
    .class('point')
    .encode('x', 'Continent')
    .encode('key', 'Continent') // Key mark.
    .encode('color', 'Continent')
    .transform({ type: 'groupX', y: 'count' })
    .scale('y', { field: 'count' })
    .scale('color', { guide: null });

  return chart.render().node();
})();
```

## Interaction

**Interaction** is another fundamental part of visualization. Well-designed interaction techniques empower users to effectively explore visualized data while providing an engaging experience.

Inspired by [Libra](https://libra-js.github.io/): an instrument-based interaction model for data visualization, we design a visualization grammar to compose rich interactions with a set of carefully-designed and highly-reusable interaction units called **actions**. G2 also maintain a clear separation of concerns between visual representation and interaction, which means you can define your own interaction grammar if you want.

In G2, calling `view.interaction(interaction)` declare a new interaction for the current view. Here we display two built-in interactions [brush](/interaction-brush) and [fisheye](/interaction-more#fisheye) to solve overlapping problems.

```js
(() => {
  const chart = new G2.Chart();

  chart
    .point()
    .data(data)
    .encode('x', 'GDP')
    .encode('y', 'LifeExpectancy')
    .encode('size', 'Population')
    .encode('color', 'Continent')
    .scale('size', { type: 'log', range: [4, 20] })
    .style('fillOpacity', 0.3)
    .style('lineWidth', 1);

  // Declare a brush interaction.
  chart.interaction({ type: 'brush' });

  return chart.render().node();
})();
```

```js
(() => {
  const chart = new G2.Chart();

  chart
    .point()
    .data(data)
    .encode('x', 'GDP')
    .encode('y', 'LifeExpectancy')
    .encode('size', 'Population')
    .encode('color', 'Continent')
    .scale('size', { type: 'log', range: [4, 20] })
    .style('fillOpacity', 0.3)
    .style('lineWidth', 1);

  // Declare a fisheye interaction.
  chart.interaction({ type: 'fisheye' });

  return chart.render().node();
})();
```

## Summary

These are the core concepts of G2 and let's wrap them up!

G2, short for Grammar of Graphics, is inspired by Wilkinson’s Grammar of Graphics originally.

But in the last decade, some theories of GoG are out of date and data visualization tools have evolved tremendously. In order to catch up and satisfy the growing needs for data visualization, we redesign the specification and architecture for G2 by taking [Observable Plot](https://observablehq.com/@observablehq/plot?collection=@observablehq/plot), [Vega-Lite](https://vega.github.io/vega-lite/docs/), [Atom](https://ieeexplore.ieee.org/abstract/document/8233127/), [Canis](http://www.yunhaiwang.net/EuroVis2020/canis/index.html) and [Libra](https://libra-js.github.io/) as references.

The core of GoG is to reject a chart typology, so does G2 in in favor of marks, transforms, scales and coordinates. Not only does this help us create traditional or novel charts, but this also enable us to use vision to think in the world of data. Besides single view chart, we also propose a view tree to construct multiple views easily, such as unit visualization.

Existed general purpose visualization tools such as [D3.js](https://github.com/d3/d3), [Vega](https://vega.github.io/vega/), [Apache ECharts](https://echarts.apache.org/zh/index.html), don't support declarative specifications of data-driven chart animations. So we make data dimensions encodeable by animation properties and design temporal composition node to animate views to fill the gap. This provides us the ability to rapidly create expressive data storytelling or visual narratives.

When it comes to interaction, it is always with less concerned as well as visual representations. Vega introduces high-level abstractions such as streams and signals to simplify the implementation of interactions. Yet it has a steep learning curve and maybe difficult to be specified for complex interaction. Compare to that, G2 only abstract some intuitive action to compose most interactions(hopefully).

What to make G2 better? Come and join us, it is still work in progress!

## References

- [Visualization Analysis & Design](https://www.taylorfrancis.com/books/mono/10.1201/b17511/visualization-analysis-design-tamara-munzner) - Tamara Munzner
- [Observable Plot](https://observablehq.com/@observablehq/plot?collection=@observablehq/plot) - A concise API for exploratory data visualization.
- [Vega-Lite](https://vega.github.io/vega-lite/docs/) - A Visualization Grammar.
- [Libra](https://libra-js.github.io/) - An Instrument-Based Interaction Model for Data Visualization.
- [Atom](https://ieeexplore.ieee.org/abstract/document/8233127/) - A Grammar for Unit Visualizations.
- [Canis](http://www.yunhaiwang.net/EuroVis2020/canis/index.html) - A High-level Language for Data-Driven Chart Animations.
