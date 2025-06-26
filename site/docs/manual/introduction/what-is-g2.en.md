---
title: What is G2
order: 1
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

```js | ob {  pin: false , inject: true }
table({
  url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
});
```

:::info{title=Tip}
In the G2 official documentation, specific code blocks will mount their returned DOM and display it on the webpage.

```js
(() => {
  const chart = new G2.Chart();
  // ...
  return chart.getContainer(); // Mount the chart container
})();
```

This is the syntax for G2's specific runtime environment on the official website. For using G2 in actual projects, please refer to [Quick Start](/en/manual/quick-start).
:::

## Mark

**Mark** is the smallest visual unit in G2, and all charts in G2 are composed of different marks.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .point()
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  })
  .encode('x', 'weight')
  .encode('y', 'height')
  .encode('color', 'gender');

chart.render();
```

## Transform

**Transform** changes the presentation of data and marks, mainly used for data analysis.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .rect()
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  })
  .encode('x', 'height')
  .encode('color', 'gender')
  .transform({ type: 'binX', y: 'count' })
  .transform({ type: 'stackY' })
  .style('insetLeft', 1);

chart.render();
```

## Scale

**Scale** controls the visual style of marks.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .rect()
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  })
  .encode('x', 'height')
  .encode('color', 'gender')
  .transform({ type: 'binX', y: 'count' })
  .transform({ type: 'stackY' })
  .scale('color', { range: ['steelblue', 'orange'] })
  .scale('y', { nice: true })
  .style('insetLeft', 1);

chart.render();
```

## Coordinate

**Coordinate** changes the display form of charts.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .rect()
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
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
```

## Composition

**Composition** is used to create multi-view charts.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  paddingLeft: 60,
});

const facet = chart
  .facetRect()
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
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
```

## Animation

**Animation** supports group animations and keyframe animations. You can click the run button on the left to see the effect.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .rect()
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  })
  .encode('x', 'height')
  .encode('color', 'gender')
  .encode('enterDuration', 1000)
  .transform({ type: 'stackEnter', groupBy: ['color'] })
  .transform({ type: 'binX', y: 'count' })
  .transform({ type: 'stackY' })
  .style('insetLeft', 1);

chart.render();
```

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
  });
```

## Interaction

Interaction allows for on-demand data exploration.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .point()
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
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
```

## More Capabilities

Because G2's marks are composable and provide **composite mark** mechanisms to extend G2, you can basically quickly draw any visualization. On the [examples page](/en/examples), you can get more inspiration and learn about G2's full capabilities through the documentation.
