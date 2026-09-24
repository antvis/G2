---
title: "What is G2"
description: "Learn about AntV G2’s visualization grammar, marks, interactions, and animations, and how to compose them into data visualizations."
language: "en"
canonical: "https://g2.antv.antgroup.com/en/manual/introduction/what-is-g2/"
version: "5.4.8"
---

**G2** is a concise and progressive grammar primarily for creating web-based visualizations. It provides a set of functional-style, declarative APIs and a component-based programming paradigm, aiming to help users quickly accomplish diverse needs such as **report building**, **data exploration**, and **storytelling**.

This article will briefly introduce the core concepts of G2:

- **Mark**: Draw data-driven graphics
- **Transform**: Derive data
- **Scale**: Map abstract data to visual data
- **Coordinate**: Apply point transformations to spatial channels
- **Composition**: Manage and enhance views
- **Animation**: Data-driven animations and continuous morphing animations
- **Interaction**: Manipulate views and display detailed information

"Talk is cheap, show me the code" - let's see what visualizations G2 can create based on the simple dataset below.



```ts
import { table } from '@antv/astro-theme-antv/table';

await table(
  {
    url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  },
  document.getElementById('container')!,
);
```



:::info&#123;title=Tip&#125;
In the G2 official documentation, specific code blocks will mount their returned DOM and display it on the webpage.

```js
(() => {
  const chart = new G2.Chart();
  // ...
  return chart.getContainer(); // Mount the chart container
})();
```

This is the syntax for G2's specific runtime environment on the official website. For using G2 in actual projects, please refer to [Quick Start](/en/manual/quick-start/).
:::

## Mark

**Mark** is the smallest visual unit in G2, and all charts in G2 are composed of different marks.



```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'point',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  },
  encode: { x: 'weight', y: 'height', color: 'gender' },
});

chart.render();
```



## Transform

**Transform** changes the presentation of data and marks, mainly used for data analysis.



```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'rect',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  },
  encode: { x: 'height', color: 'gender' },
  transform: [{ type: 'binX', y: 'count' }, { type: 'stackY' }],
  style: { insetLeft: 1 },
});

chart.render();
```



## Scale

**Scale** controls the visual style of marks.



```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'rect',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  },
  encode: { x: 'height', color: 'gender' },
  transform: [{ type: 'binX', y: 'count' }, { type: 'stackY' }],
  scale: { color: { range: ['steelblue', 'orange'] }, y: { nice: true } },
  style: { insetLeft: 1 },
});

chart.render();
```



## Coordinate

**Coordinate** changes the display form of charts.



```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'rect',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  },
  encode: { x: 'height', color: 'gender' },
  transform: [{ type: 'binX', y: 'count' }, { type: 'stackY' }],
  scale: {
    color: { range: ['steelblue', 'orange'] },
    y: { type: 'sqrt', nice: true },
  },
  coordinate: { type: 'polar' },
  axis: { y: { title: false } },
  style: { insetLeft: 1 },
});

chart.render();
```



## Composition

**Composition** is used to create multi-view charts.



```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  paddingLeft: 60,
});

chart.options({
  type: 'facetRect',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  },
  encode: { y: 'gender' },
  children: [
    {
      type: 'rect',
      encode: { x: 'height', color: 'gender' },
      transform: [{ type: 'binX', y: 'count' }, { type: 'stackY' }],
      scale: { y: { nice: true } },
      frame: false,
      style: { insetLeft: 1 },
    },
  ],
});

chart.render();
```



## Animation

**Animation** supports group animations and keyframe animations. You can click the run button on the left to see the effect.



```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'rect',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  },
  encode: { x: 'height', color: 'gender', enterDuration: 1000 },
  transform: [
    { type: 'stackEnter', groupBy: ['color'] },
    { type: 'binX', y: 'count' },
    { type: 'stackY' },
  ],
  style: { insetLeft: 1 },
});

chart.render();
```





```ts
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

    chart.options({
      type: 'timingKeyframe',
      direction: 'alternate',
      iterationCount: 4,
      children: [
        {
          type: 'interval',
          padding: 'auto',
          data,
          encode: { x: 'gender', color: 'gender', key: 'gender' },
          transform: [{ type: 'groupX', y: 'count' }],
        },
        {
          type: 'point',
          padding: 'auto',
          data,
          encode: {
            x: 'weight',
            y: 'height',
            color: 'gender',
            groupKey: 'gender',
            shape: 'point',
          },
        },
      ],
    });

    chart.render();
  });
```



## Interaction

Interaction allows for on-demand data exploration.



```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'point',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  },
  encode: { x: 'weight', y: 'height', color: 'gender', shape: 'point' },
  style: {
    fillOpacity: 0.7,
    transform: 'scale(1, 1)',
    transformOrigin: 'center center',
  },
  state: {
    inactive: {
      fill: 'black',
      fillOpacity: 0.5,
      transform: 'scale(0.5, 0.5)',
    },
  },
  interaction: { brushXHighlight: true },
});

chart.render();
```



## More Capabilities

Because G2's marks are composable and provide **composite mark** mechanisms to extend G2, you can basically quickly draw any visualization. On the [examples page](/en/examples/), you can get more inspiration and learn about G2's full capabilities through the documentation.
