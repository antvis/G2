---
title: Experimental Spec API
order: 2
---

G2 5.0, like version 4.0, provides a set of imperative Functional APIs to declare charts. For example, the simplest bar chart is declared as follows.

```js | ob
(() => {
  // Initialize chart instance
  const chart = new G2.Chart();

  // Declare visualization
  chart
    .interval() // Create an Interval tag
    .data([
      // Bind data
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ])
    .encode('x', 'genre') // Encode x channel
    .encode('y', 'sold'); // Encode y channel

  // Render visualization
  chart.render();

  return chart.getContainer();
})();
```

In addition to this functional style, G2 5.0 also provides a new API: Spec API. The API declares visualizations through a JavaScript object.

## Start Using

Currently we declare the visualization through `chart.options(spec)`, the following example can achieve the same effect as above.

```js | ob
(() => {
  // Initialize chart instance
  const chart = new G2.Chart();

  // Declare visualization
  chart.options({
    type: 'interval', // Create an Interval tag
    data: [
      // Bind data
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ],
    encode: {
      x: 'genre', // Encode x channel
      y: 'sold', // Encode y channel
    },
  });

  // Render visualization
  chart.render();

  return chart.getContainer();
})();
```

## Compare

It can be found that the initialization of the chart instance and the final rendering of the two APIs are the same, but the way of declaring the visualization in between is different. Next, let's take a brief look at the similarities and differences between the two methods.

The Functional API is implemented based on Spec API. In simple terms, each Chart instance has an options object. Functional API generates this options object through a series of methods, while Spec API directly sets this options object. No matter which form of API it is, G2 will directly render the current options in the end, so the ability of the two to declare visualization is completely equivalent.

In most scenarios, the two are more of a stylistic choice, but there are some differences:

* **Ease of use**: Spec API is superior in terms of ease of use and is more friendly to beginners or users who do not need to understand G2 in depth. JavaScript objects, which are more structural expressions, are naturally easier to understand than function expressions. And it is often a whole, making it easier to copy, paste and "adjust parameters".
* **Flexibility**: The Functional API excels in flexibility and is better suited for users familiar with functional programming and [D3](https://github.com/d3/d3). However, its flexibility does not necessarily result in the ability to create more complex visualizations; it is more about the flexibility in how visualizations are declared. One advantage is that it is easier to organize focus points.

For example, if you want the bars in the bar graph above to appear one by one, you need to add an encode and transform. The first Spec API below looks a little clearer than the second Functional API, but the latter can put animation-related properties (the same focus) together, while the former cannot.

```js
chart.options({
  type: 'interval',
  data,
  encode: {
    x: 'genre',
    y: 'sold',
    enterDuration: 1000,
  },
  transform: [{ type: 'stackEnter' }],
});
```

```js
chart
  .interval()
  .data(data)
  .encode('x', 'genre')
  .encode('y', 'sold')
  // These two are related to animation and can be put together.
  .encode('enterDuration', 1000)
  .transform({ type: 'stackEnter' });
```

## Application Scenarios

Of course, Spec API is not only simple, it also has more application scenarios:

* **Smart Visualization**: Recommendations and error corrections can be made based on Spec.
* **Higher-Level Abstraction**: Transforming the Options corresponding to Spec is easier than direct invocation.
* **Low Code Construction**: You can directly generate a configuration panel based on Spec and build a BI tool.
* **Chart Operations**: Spec can also be regarded as a data structure. If it is a data structure, it can perform a series of operations, such as adding pictures, etc.
* **Server-Side Rendering**: You can directly render the Options corresponding to Spec into images.
* ......

Later, G2 will make a series of tools based on this new set of APIs for everyone to use. If you have ideas, you can discuss and participate here [Build together](https://github.com/antvis/G2/discussions).

## Case

The following uses some cases to show you how to use Spec API.

### Pie Chart

```js | ob
(() => {
  // Initialize chart instance
  const chart = new G2.Chart();

  // Declare visualization
  chart.options({
    type: 'interval',
    height: 640,
    data: {
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/79fd9317-d2af-4bc4-90fa-9d07357398fd.csv',
    },
    transform: [{ type: 'stackY' }],
    coordinate: { type: 'theta' },
    scale: {
      color: { palette: 'spectral', offset: (t) => t * 0.8 + 0.1 },
    },
    legend: false,
    encode: { y: 'value', color: 'name' },
    style: { stroke: 'white' },
    labels: [
      {
        text: 'name',
        radius: 0.8,
        style: { fontSize: 10, fontWeight: 'bold' },
      },
      {
        text: (d, i, data) => (i < data.length - 3 ? d.value : ''),
        radius: 0.8,
        style: { fontSize: 9, dy: 12 },
      },
    ],
    animate: { enter: { type: 'waveIn', duration: 1000 } },
  });

  // Render visualization
  chart.render();

  return chart.getContainer();
})();
```

### Space Composite

```js | ob
(() => {
  // Initialize chart instance
  const chart = new G2.Chart();

  // Declare visualization
  chart.options({
    type: 'spaceFlex',
    width: 900,
    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/seattle-weather.json',
    },
    direction: 'col',
    ratio: [1, 2],
    children: [
      {
        type: 'interval',
        paddingBottom: 0,
        paddingRight: 300,
        transform: [{ type: 'groupX', y: 'max' }],
        axis: { x: false },
        encode: {
          x: (d) => new Date(d.date).getUTCDate(),
          y: 'temp_max',
          color: 'steelblue',
        },
      },
      {
        type: 'spaceFlex',
        ratio: [2, 1],
        children: [
          {
            type: 'cell',
            paddingRight: 0,
            paddingBottom: 50,
            transform: [{ type: 'group', color: 'max' }],
            encode: {
              x: (d) => new Date(d.date).getUTCDate(),
              y: (d) => new Date(d.date).getUTCMonth(),
              color: 'temp_max',
            },
            style: { inset: 0.5 },
            axis: {
              x: { title: 'Date' },
              y: { title: 'Month' },
            },
            scale: { color: { palette: 'gnBu' } },
            legend: false,
          },
          {
            type: 'interval',
            paddingBottom: 50,
            transform: [{ type: 'groupX', y: 'max' }],
            coordinate: { transform: [{ type: 'transpose' }] },
            axis: { x: false },
            encode: {
              x: (d) => new Date(d.date).getUTCMonth(),
              y: 'temp_max',
              color: 'steelblue',
            },
          },
        ],
      },
    ],
  });

  // Render
  chart.render();

  return chart.getContainer();
})();
```
