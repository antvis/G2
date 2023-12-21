---
title: Mark
order: 4
---

There is **no concept of chart** in G2, but the mark is used as the basic visual component unit. Any chart is composed of multiple marks. Unlike traditional drawing systems, marks provide the ability to draw abstract data.

Marks can be declared as top-level types as follows:

```js
({
  type: 'interval',
  encode: {
    x: 'name',
    y: 'value',
  },
});
```

It can also be placed inside a view and add multiple marks to the view:

```js
({
  type: 'view',
  children: [{ type: 'line' }, { type: 'point' }],
});
```

The API is used as follows:

```js
const chart = new Chart();

chart.interval();
```

```js
// multiple marks
const chart = new Chart();

chart.line();

chart.point();
```

## First-Class Citizen

Marks are the leaf nodes in the view tree and are the "first-class citizens" in G2: the most important concept in G2, a mark is composed of the following core concepts:

- [**data**](/manual/core/data) - visual data
- [**encode**](/manual/core/encode) - encoding information
- [**scale**](/manual/core/encode) - mapping rules
- [**transform**](/manual/core/transform) - transformation channel values
- [**layout**](/manual/core/layout) - configuration of layout algorithms
- [**coordinate**](/manual/core/coordinate) - transformation of coordinate systems
- [**style**](/manual/core/style) - visual styles
- [**viewStyle**](/manual/core/style) - visual styles of the view
- [**animate**](/manual/core/animate) - animation properties
- [**state**](/manual/core/state) - style of state
- [**label**](/manual/core/label) - data labels
- [**title**](/manual/core/title) - chart title
- [**axis**](/manual/core/axis) - coordinate axes
- [**legend**](/manual/core/legend) - legend
- [**tooltip**](/manual/core/tooltip) - prompt information
- [**scrollbar**](/manual/core/scrollbar) - scrollbar
- [**slider**](/manual/core/slider) - drag axis
- [**interaction**](/manual/core/interaction) - interaction
- [**theme**](/manual/core/theme) - theme

```js
({
  type: 'mark',
  data: [],
  encode: {},
  scale: {},
  transform: [],
  layout: {},
  coordinate: {},
  style: {},
  viewStyle: {},
  animate: {},
  state: {},
  label: {},
  title: {},
  axis: {},
  legend: {},
  tooltip: {},
  scrollbar: {},
  slider: {},
  interaction: {},
  theme: {},
});
```

## Template

Marks are templates that generate a series of **data-driven** graphics, each graph corresponds to one or more **data items** (Data Item). For example, in the scatter plot below, there is only one point mark, and this mark generates multiple circles.

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
    .encode('x', 'height')
    .encode('y', 'weight')
    .encode('color', 'gender');

  chart.render();

  return chart.getContainer();
})();
```

In the line chart below, a line corresponds to multiple data items.

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .line()
    .data({
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/indices.json',
    })
    .transform({ type: 'normalizeY', basis: 'first', groupBy: 'color' })
    .encode('x', (d) => new Date(d.Date))
    .encode('y', 'Close')
    .encode('color', 'Symbol')
    .axis('y', { title: '↑ Change in price (%)' });

  chart.render();

  return chart.getContainer();
})();
```

## Stackable

G2's marks can be layered, in other words: multiple marks can be added to one view. In the following example, two marks, a line and a point, are added to the chart:

```js | ob
(() => {
  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];

  const chart = new G2.Chart();

  chart.line().data(data).encode('x', 'year').encode('y', 'value');

  chart.point().data(data).encode('x', 'year').encode('y', 'value');

  chart.render();

  return chart.getContainer();
})();
```

## Composable

Marks in G2 can be composed into one mark through a mechanism and then used, for example, the point line chart above:


```js | ob
(() => {
  // Define a composite mark
  function PointLine({ encode, data } = {}) {
    return [
      { type: 'line', data, encode },
      { type: 'point', data, encode },
    ];
  }

  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];

  const chart = new G2.Chart();

  // Use the composite mark in Options
  chart.mark(PointLine).data(data).encode('x', 'year').encode('y', 'value');

  // Use the composite mark in Spec
  chart.options({
    type: PointLine,
    data,
    encode: { x: 'year', y: 'value' },
  });

  chart.render();

  return chart.getContainer();
})();
```

The composability feature of marks provides a simple yet powerful way to extend the capabilities of G2. G2 also uses this mechanism to implement some rather complex marks, such as Sankey diagrams: using two Polygon marks for composition.

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

## Can be used as a mark

**Annotation** is mainly used to annotate the places that need attention in the visualized chart. In G2, annotation is also a mark. In other words, some marks can also be used for annotation, such as Text, Images and others.

### Transform

Since annotation is also a mark, it can also perform transformation. For example, the Select transform below.

The Select mark transformation provides the ability to select a shape from a set of shapes. For example, in the example below, the country with the largest GDP in each continent is marked.

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/1ecf85d2-8279-46a1-898d-d2e1814617f9.json',
  });

  chart
    .point()
    .encode('x', 'GDP')
    .encode('y', 'LifeExpectancy')
    .encode('color', 'Continent');

  chart
    .text()
    // Group graphics by series, that is, by Continent
    // Select by x channel, select the maximum, that is, the country with the highest GDP
    .transform({ type: 'select', channel: 'x', selector: 'max' })
    .encode('text', 'Country')
    .encode('x', 'GDP')
    .encode('y', 'LifeExpectancy')
    .encode('series', 'Continent')
    .style('textAlign', 'end');

  chart.render();

  return chart.getContainer();
})();
```

For simple text marks that do not need to be grouped, you can use data marks, otherwise, you can consider the above method.

### Positioning

For annotations, one issue is to position them in the right place. Currently, there are three positioning methods:

- Data-driven positioning
- Absolute positioning
- Relative positioning

### Data-driven Positioning

In G2, you can specify data-driven positioning through `mark.data`. For example, if you want to annotate the safe daily intake of sugar and fat, you can do it as follows.

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .point()
    .data([
      { x: 95, y: 95, z: 13.8, name: 'BE', country: 'Belgium' },
      { x: 86.5, y: 102.9, z: 14.7, name: 'DE', country: 'Germany' },
      { x: 80.8, y: 91.5, z: 15.8, name: 'FI', country: 'Finland' },
      { x: 80.4, y: 102.5, z: 12, name: 'NL', country: 'Netherlands' },
      { x: 80.3, y: 86.1, z: 11.8, name: 'SE', country: 'Sweden' },
      { x: 78.4, y: 70.1, z: 16.6, name: 'ES', country: 'Spain' },
      { x: 74.2, y: 68.5, z: 14.5, name: 'FR', country: 'France' },
      { x: 73.5, y: 83.1, z: 10, name: 'NO', country: 'Norway' },
      { x: 71, y: 93.2, z: 24.7, name: 'UK', country: 'United Kingdom' },
      { x: 69.2, y: 57.6, z: 10.4, name: 'IT', country: 'Italy' },
      { x: 68.6, y: 20, z: 16, name: 'RU', country: 'Russia' },
      { x: 65.5, y: 126.4, z: 35.3, name: 'US', country: 'United States' },
      { x: 65.4, y: 50.8, z: 28.5, name: 'HU', country: 'Hungary' },
      { x: 63.4, y: 51.8, z: 15.4, name: 'PT', country: 'Portugal' },
      { x: 64, y: 82.9, z: 31.3, name: 'NZ', country: 'New Zealand' },
    ])
    .encode('x', 'x')
    .encode('y', 'y')
    .encode('size', 'z')
    .encode('shape', 'point')
    .scale('x', { nice: true })
    .scale('y', { nice: true, domainMax: 165, zero: true })
    .scale('size', { range: [10, 40] })
    .style('stroke', '#1890ff')
    .style('fillOpacity', 0.3)
    .style('fill', '#1890ff')
    .label({
      text: 'name',
      position: 'inside',
      fill: '#1890ff',
      stroke: '#fff',
    })
    .legend(false);

  chart
    .lineY()
    .data([50])
    .style('stroke', '#000')
    .style('strokeOpacity', 0.45)
    .style('lineDash', [3, 3])
    .label({
      text: 'Safe sugar intake 50g/day',
      position: 'right',
      textBaseline: 'bottom',
      fill: '#000',
      fillOpacity: 0.45,
      background: true,
      backgroundFill: '#000',
      backgroundOpacity: 0.15,
    });

  chart
    .lineX()
    .data([65])
    .style('stroke', '#000')
    .style('strokeOpacity', 0.45)
    .style('lineDash', [3, 3])
    .label({
      text: 'Safe fat intake 65g/day',
      position: 'top-left',
      textBaseline: 'bottom',
      fill: '#000',
      fillOpacity: 0.45,
      background: true,
      backgroundFill: '#000',
      backgroundOpacity: 0.15,
    });

  chart.render();

  return chart.getContainer();
})();
```

### Absolute Positioning

In addition to data-driven positioning, G2 also provides non-data-driven positioning methods. You can specify the x and y attributes through `mark.style`, and x and y have the following two types.


- **Percentage**：The percentage of the content area.
- **Number**：Coordinates in pixels.

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .coordinate({ type: 'theta', innerRadius: 0.5 })
    .transform({ type: 'stackY' })
    .data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ])
    .encode('y', 'sold')
    .encode('color', 'genre');

  // Absolute positioning
  chart.text().style({
    x: 290, // Pixel coordinates
    y: 200, // Pixel coordinates
    text: 'hello',
    textAlign: 'center',
    fontSize: 60,
    textBaseline: 'middle',
  });
  chart.render();

  return chart.getContainer();
})();
```

### Relative Positioning

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .coordinate({ type: 'theta', innerRadius: 0.5 })
    .transform({ type: 'stackY' })
    .data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ])
    .encode('y', 'sold')
    .encode('color', 'genre');

  // Relative positioning
  chart.text().style({
    x: '50%', // percentage
    y: '50%', // percentage
    text: 'hello',
    textAlign: 'center',
    fontSize: 60,
    textBaseline: 'middle',
  });
  chart.render();

  return chart.getContainer();
})();
```
