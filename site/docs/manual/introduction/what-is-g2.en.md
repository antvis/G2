---
title: What is G2
order: 1
---

 **G2** It is a concise progressive syntax mainly used for making web-based visualizations. It provides a set of functional style, declarative API and component programming paradigm, hoping to help users quickly complete **dashboard building** 、**data exploration** 、**storytelling** and other diverse needs.

This article will give you a brief introduction to the core concepts of G2:

* **Mark**: Draw data-driven graphics
* **Transform**: Derived data
* **Scale**: Mapping abstract data into visual data
* **Coordinate system**: applies point transformation to the spatial channel
* **View composition (Composition)**: Manage and enhance views
* **Animation**: Data-driven animation and continuous deformation animation
* **Interaction**: Manipulate the view and display detailed information

"Talk is cheap, show me the code", then let's take a look at what visualization effects G2 can make based on the following simple data set.

```js | ob { pin: false }
table({
  url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
});
```

:::info{title=Tips}
In the documentation on the G2 official website, specific code blocks will mount the DOM they return and display them on the web page.

```js
(() => {
  const chart = new G2.Chart();
  // ...
  return chart.getContainer(); // Mount the container for the chart
})();
```

This is the syntax for a specific operating environment on the G2 official website. Please refer to G2 when using it in actual projects.[Get Started](/manual/quick-start)。
:::

## Mark

**Mark** It is the smallest visual unit in G2. All charts in G2 are composed of different markers.

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .point()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
    })
    .encode('x', 'weight')
    .encode('y', 'height')
    .encode('color', 'gender');

  chart.render();

  return chart.getContainer();
})();
```

## Transform

**Transform** will change the display form of data and marks, and is mostly used for data analysis.

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .rect()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
    })
    .encode('x', 'height')
    .encode('color', 'gender')
    .transform({ type: 'binX', y: 'count' })
    .transform({ type: 'stackY' })
    .style('insetLeft', 1);

  chart.render();

  return chart.getContainer();
})();
```

## Scale

**Scale** is used to control the visual style of markup.

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .rect()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
    })
    .encode('x', 'height')
    .encode('color', 'gender')
    .transform({ type: 'binX', y: 'count' })
    .transform({ type: 'stackY' })
    .scale('color', { range: ['steelblue', 'orange'] })
    .scale('y', { nice: true })
    .style('insetLeft', 1);

  chart.render();

  return chart.getContainer();
})();
```

## Coordinate system

**Coordinate System** will change the display format of the chart.

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .rect()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
    })
    .encode('x', 'height')
    .encode('color', 'gender')
    .transform({ type: 'binX', y: 'count' })
    .transform({ type: 'stackY' })
    .scale('color', { range: ['steelblue', 'orange'] })
    .scale('y', { type: 'sqrt', nice: true })
    .coordinate({ type: 'polar' })
    .axis('y', { title: false })
    .style('insetLeft', 1);

  chart.render();

  return chart.getContainer();
})();
```

## View composition (Composition)

**View composition** is used to create multi-view diagrams.

```js | ob
(() => {
  const chart = new G2.Chart({
    paddingLeft: 60,
    
  });

  const facet = chart
    .facetRect()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
    })
    .encode('y', 'gender');

  facet
    .rect()
    .encode('x', 'height')
    .encode('color', 'gender')
    .transform({ type: 'binX', y: 'count' })
    .transform({ type: 'stackY' })
    .scale('y', { nice: true })
    .attr('frame', false)
    .style('insetLeft', 1);

  chart.render();

  return chart.getContainer();
})();
```

## Animation

**Animation** supports group animation and keyframe animation. You can click the run button on the left to see the effect.

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .rect()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
    })
    .encode('x', 'height')
    .encode('color', 'gender')
    .encode('enterDuration', 1000)
    .transform({ type: 'stackEnter', groupBy: ['color'] })
    .transform({ type: 'binX', y: 'count' })
    .transform({ type: 'stackY' })
    .style('insetLeft', 1);

  chart.render();

  return chart.getContainer();
})();
```

```js | ob
(async () => {
  const data = await fetch(
    'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  ).then((res) => res.json());

  const chart = new G2.Chart();

  const keyframe = chart
    .timingKeyframe()
    .attr('direction', 'alternate')
    .attr('iterationCount', 4);

  keyframe
    .interval()
    .attr('padding', 'auto')
    .data(data)
    .encode('x', 'gender')
    .encode('color', 'gender')
    .encode('key', 'gender')
    .transform({ type: 'groupX', y: 'count' });

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

## Interaction

Interactions can explore data on demand.

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .point()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
    })
    .encode('x', 'weight')
    .encode('y', 'height')
    .encode('color', 'gender')
    .encode('shape', 'point')
    .style({
      fillOpacity: 0.7,
      transform: 'scale(1, 1)',
      transformOrigin: 'center center',
    })
    .state('inactive', {
      fill: 'black',
      fillOpacity: 0.5,
      transform: 'scale(0.5, 0.5)',
    })
    .interaction('brushXHighlight', true);

  chart.render();

  return chart.getContainer();
})();
```

## More capabilities

Because G2's marks are composable and provide a mechanism for creating composite marks to extend G2, you can quickly create virtually any visualization. On the [Case page](/examples), you can find more inspiration, and the documentation offers a comprehensive understanding of G2's capabilities.  
