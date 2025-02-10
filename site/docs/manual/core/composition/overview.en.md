---
title: overview
order: 1
---

In G2, **View Composition** provides the ability to draw multiple charts in a single visualization. G2 defines a **view graph** to describe a **multi-view plot**.

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

The most basic way of view composition is **Space Composition**, which is simply a division of space.

A more common way of composition is `composition.spaceLayer`: overlaying multiple charts together, using scenarios where these views have different coordinate systems, such as the bar and pie charts below.

```js | ob
(() => {
  const chart = new G2.Chart();

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
    .attr('paddingLeft', 300) // Setting position
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

  return chart.getContainer();
})();
```

You can also use `composition.spaceFlex` to arrange views horizontally or vertically.

```js | ob
(() => {
  const chart = new G2.Chart();
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

  return chart.getContainer();
})();
```

Also, these composition methods can be nested, so it's easy to implement a report through a separate statement.

## Facet

**Facet Composition** differs from Space Composition in that it also partitions the data, with each view presenting a subset of the original data.

```js | ob
(() => {
  const chart = new G2.Chart({
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
    // Partition the data based on the 'series' field,
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

  return chart.getContainer();
})();
```

## Repeat

**Repeat Composition** differs from facet in that each view shows the full amount of data, but with repeated encoding to create multiple views.

```js | ob
(() => {
  const chart = new G2.Chart({
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
    // Specify the encodings to be repeated
    // A total of 4 * 4 = 16 views will be generated
    // The x and y encodings of each view are the cross product of the following fields
    .encode('position', [
      'culmen_length_mm',
      'culmen_depth_mm',
      'flipper_length_mm',
      'body_mass_g',
    ]);

  repeatMatrix.point().attr('padding', 'auto').encode('color', 'species');

  chart.render();

  return chart.getContainer();
})();
```

## Time

**Time Composition** manages views in space and is used for animation.

```js | ob
(async () => {
  const data = await fetch(
    'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  ).then((res) => res.json());

  const chart = new G2.Chart();

  // Refer to css animation description
  const keyframe = chart
    .timingKeyframe() // Create container
    .attr('iterationCount', 2)
    .attr('direction', 'alternate') 
    .attr('duration', 1000);

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

  return chart.getContainer();
})();
```

