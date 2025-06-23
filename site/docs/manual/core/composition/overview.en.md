---
title: Overview
order: 1
---

**View Composition** in G2 provides the ability to draw multiple charts in a single visualization. G2 defines a **View Graph** to describe **Multi-View Plots**.

```js
({
  type: 'spaceLayer',
  children: [{ type: 'view' }, { type: 'view' }],
});
```

```js
// API
const layer = chart.spaceLayer();

layer.view();

layer.view();
```

## Space

The most basic view composition method is **Space Composition**, which only divides the space.

A common composition method is `composition.spaceLayer`: overlaying multiple charts. This is used when the views have different coordinate systems, such as the bar chart and pie chart below.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const layer = chart.spaceLayer();

// Bar chart
layer
  .interval()
  .data([
    { genre: 'Shooter', sold: 350 },
    { genre: 'Sports', sold: 275 },
    { genre: 'Other', sold: 150 },
    { genre: 'Action', sold: 120 },
    { genre: 'Strategy', sold: 115 },
  ])
  .encode('x', 'genre')
  .encode('y', 'sold');

// Pie chart
layer
  .interval() // Create an interval
  .attr('paddingLeft', 300) // Set position
  .attr('paddingBottom', 250)
  .coordinate({ type: 'theta' }) // Specify coordinate system
  .transform({ type: 'stackY' })
  .data([
    { genre: 'Shooter', sold: 350 },
    { genre: 'Sports', sold: 275 },
    { genre: 'Other', sold: 150 },
    { genre: 'Action', sold: 120 },
    { genre: 'Strategy', sold: 115 },
  ])
  .encode('y', 'sold')
  .encode('color', 'genre')
  .legend('color', false);

chart.render();
```

You can also use `composition.spaceFlex` to arrange views horizontally or vertically.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
const flex = chart.spaceFlex();

// Bar chart
flex
  .interval()
  .data([
    { genre: 'Shooter', sold: 350 },
    { genre: 'Sports', sold: 275 },
    { genre: 'Other', sold: 150 },
    { genre: 'Action', sold: 120 },
    { genre: 'Strategy', sold: 115 },
  ])
  .encode('x', 'genre')
  .encode('y', 'sold');

// Pie chart
flex
  .interval() // Create an interval
  .coordinate({ type: 'theta' }) // Specify coordinate system
  .transform({ type: 'stackY' })
  .data([
    { genre: 'Shooter', sold: 350 },
    { genre: 'Sports', sold: 275 },
    { genre: 'Other', sold: 150 },
    { genre: 'Action', sold: 120 },
    { genre: 'Strategy', sold: 115 },
  ])
  .encode('y', 'sold')
  .encode('color', 'genre')
  .legend('color', false);

chart.render();
```

These composition methods can be nested, making it easy to implement a dashboard with a single declaration.

## Facet

**Facet Composition** differs from space composition in that it also divides the data, with each view displaying a subset of the original data.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 260,
  width: 800,
  paddingLeft: 40,
  paddingBottom: 50,
});

const facetRect = chart
  .facetRect()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/anscombe.json',
  })
  // Divide the data into subsets by the series field,
  // and arrange them in the x direction
  .encode('x', 'series');

facetRect
  .point()
  .attr('padding', 'auto')
  .attr('inset', 10)
  .encode('x', 'x')
  .encode('y', 'y')
  .style('stroke', '#000');

chart.render();
```

## Repeat

**Repeat Composition** differs from facet in that each view displays the full data, but the encoding is repeated to draw multiple views.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 900,
  height: 900,
  padding: 'auto',
  paddingLeft: 55,
  paddingBottom: 45,
});

const repeatMatrix = chart
  .repeatMatrix()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
    // Data processing
  })
  // Specify the encoding to repeat
  // A total of 4 * 4 = 16 views will be generated
  // The x and y encoding of each view is the cross product of the following fields
  .encode('position', [
    'culmen_length_mm',
    'culmen_depth_mm',
    'flipper_length_mm',
    'body_mass_g',
  ]);

repeatMatrix.point().attr('padding', 'auto').encode('color', 'species');

chart.render();
```

## Timing

**Timing Composition** manages views in space for animation.

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

    // Refer to CSS animation description
    const keyframe = chart
      .timingKeyframe() // Create container
      .attr('iterationCount', 2) // Number of iterations
      .attr('direction', 'alternate') // Direction
      .attr('duration', 1000); // Duration

    keyframe
      .interval()
      .transform({ type: 'groupX', y: 'mean' })
      .data(data)
      .encode('x', 'gender')
      .encode('y', 'weight')
      .encode('color', 'gender')
      .encode('key', 'gender'); // Specify key

    keyframe
      .point()
      .data(data)
      .encode('x', 'height')
      .encode('y', 'weight')
      .encode('color', 'gender')
      .encode('shape', 'point')
      .encode('groupKey', 'gender'); // Specify groupKey

    chart.render();
  });
```
