---
title: G2 5.0 Migration Guide
order: 3
---

> The G2 stack team will continue to maintain the v4 version and release patch version fixes for bugs, but will no longer receive new Feature Requests until the end of 2023. The original v4 official website has been migrated to<https://g2-v4.antv.vision/>。

This article is intended to help those already familiar with G24.0 understand the differences between versions 4.0 and 5.0. Readers can choose to read the new document directly instead of reading this article from beginning to end. This article will highlight the changes in the APIs corresponding to various concepts between the two versions.

## Dimension

4.0's padding and appendPadding are an array, 5.0 splits it and modifies appendPadding to margin.

```js
// 4.0
const chart = new Chart({
  width: 600,
  height: 400,
  padding: [10, 20, 30, 40],
  appendPadding: [10, 20, 30, 40],
});

// 5.0
const chart = new Chart({
  width: 600,
  height: 400,
  paddingLeft: 10,
  paddingTop: 20,
  paddingRight: 30,
  paddingBottom: 40,
  marginLeft: 10,
  marginTop: 20,
  marginRight: 30,
  marginBottom: 40,
});
```

## Data

In 4.0, each view is bound to a piece of data, and the markers (front geometry elements) in the view share a piece of data. In 5.0 all markers in each view can have independent data, and scales are synchronized by default.

```js
// 4.0
chart.data(data);
chart.line();
chart.point();

// 5.0
chart.line().data(data1);
chart.line().data(data2);
```

## Encode

5.0 has the following differences from 4.0 in encoding methods:

### Declaration method

4.0 uses top-level APIs such as geometry.position and geometry.color to encode channels. 5.0 uses mark.encode to encode and does not support the \* syntax.

```js
// 4.0
chart.interval().position('name*value').color('genre');

// 5.0
chart
  .interval()
  .encode('x', 'name')
  .encode('y', 'value')
  .encode('color', 'genre');
```

### callback parameters

The callback coded in 4.0 will provide the corresponding fields from the original data. Callbacks coded in 5.0 only provide raw data.

```js
// 4.0
chart.interval().color('name*value', (name, value) => {});

// 5.0
chart
  .interval()
  // Need to deconstruct by yourself
  .encode('color', ({ name, value }) => {});
```

### callback return value

4.0 callback returns visual data. 5.0 callbacks return abstract data by default.

```js
// 4.0
chart.interval().color('name', (name) => (name > 10 ? 'red' : 'yellow'));

// 5.0
chart
  .interval()
  .encode('color', (d) => (d.name > 10 ? 'high' : 'low')) // 抽象数据
  .scale('color', { range: ['red', 'yellow'] }); // 指定值域

// 5.0
chart
  .interval()
  .encode('color', (d) => (d.name > 10 ? 'red' : 'yellow'))
  .scale('color', { type: 'identity' });
```

### color range

4.0 declares the color range via the second parameter of geometry.color, 5.0 specifies via scale.color.

```js
// 4.0
chart.interval().color('name', ['red', 'blue']);
chart.interval().color('name', '#fff-#000');

// 5.0
chart
  .interval()
  .encode('color', 'name') // 离散
  .scale('color', { range: ['red', 'blue'] });

chart
  .interval()
  .encode('color', 'name') //连续
  .scale('color', { range: '#fff-#000' });
```

## Timing channel

4.0 will try to parse the time string, but 5.0 will not try to parse it and needs to be explicitly converted into a Date object.

```js
const data = [
  { year: '2020-10-01', value: 1 },
  { year: '2022-10-01', value: 2 },
  { year: '2023-10-01', value: 3 },
];

// 4.0
chart.line().position('year*value');

// 5.0
chart
  .line()
  .encode('x', (d) => new Date(d.year))
  .encode('y', 'value');
```

## Style

Style callbacks in 4.0 apply to the entire object. Acts on every attribute in 5.0.

```js
// 4.0
chart
  .interval()
  .style('a*b', (a, b) =>
    a + b > 10
      ? { stroke: 'red', strokeWidth: 10 }
      : { stroke: 'black', strokeWidth: 5 },
  );

// 5.0
chart
  .interval()
  .style('stroke', ({ a, b }) => (a + b > 10 ? 'red' : 'black'))
  .style('strokeWidth', ({ a, b }) => (a + b > 10 ? 10 : 5));
```

## Scale

5.0 has the following series of differences from 4.0 when using a scale:

### binding object

The 4.0 scale is bound to the field, and the 5.0 scale is bound to the channel.

```js
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

// 4.0
chart.data(data);
chart.scale('genre', {});
chart.interval().color('genre');

// 5.0
chart
  .interval()
  .data(data)
  .encode('color', 'genre')
  // 设置 color 通道比例尺
  .scale('color', {});
```

### Attributes

Some properties of the scale have changed as follows:

* Domain: values ​​-> domain
* Minimum value of domain: min -> domainMin
* The maximum value of the domain: max -> domainMax

```js
// 4.0
chart.scale('genre', { values: ['a', 'b', 'c'] });

// 5.0
chart.scale('color', { domain: ['a', 'b', 'c'] });
```

### discrete scale

The discrete scales of 4.0 are cat and timeCat. In 5.0, cat becomes band, point and ordinal scales, and timeCat is removed.

```js
// 4.0
chart.scale('genre', { type: 'cat' });

// 5.0
chart
  .interval()
  .encode('x', 'name')
  .encode('color', 'name')
  //The x channel of interval defaults to band scale
  .scale('x', { type: 'band', range: [0.1, 0.9] })
  .scale('color', { type: 'ordinal', range: ['red', 'blue'] });

chart
  .point()
  .encode('x', 'name')
  // point scale
  .scale('point', {});
```

## Coordinate system

The 4.0 coordinate system attribute is in cfg, and the coordinate system transformation is specified through actions; the 5.0 coordinate system attribute is tiled, and the coordinate system transformation is declared through transform.

```js
// 4.0
chart.coordinate({
  type: 'polar',
  cfg: {
    radius: 0.85,
  },
  actions: [['transpose']],
});

// 5.0
chart.coordinate({
  type: 'polar',
  outerRadius: 0.85,
  transform: [{ type: 'transpose' }],
});
```

## Label

4.0 Each element can only declare one tag, and 5.0 each element can declare multiple tags.

```js
// 4.0
chart.interval().label('field', (d) =>
  d > 10
    ? 'red'
    : 'blue'
    ? {
        style: { color: 'red', stroke: 'red' },
      }
    : {
        style: { color: 'black', stroke: 'black' },
      },
);

// 5.0
chart
  .interval()
  .label({
    text: 'field', // 指定内容
    style: {
      color: d > 10 ? 'red' : 'black', // 设置属性
      stroke: d > 10 ? 'red' : 'black',
    },
  })
  .label({ text: (d) => d.value });
```

## Tooltip

In 4.0, you can customize the prompt information through tooltip.containerTpl, and in 5.0, you can customize the prompt information through the render function.

```js
// 4.0
chart.tooltip({ containerTpl: `<div></div>` });

// 5.0
chart.interaction('tooltip', {
  render: () => `<div></div>`,
});
```

## Animation

There is the appear animation in 4.0, and 5.0 merges it into the enter animation.

```js
// 4.0
chart.interval().animate({
  appear: {
    animation: 'fade-in',
    easing: 'easeQuadIn',
    delay: 100,
    duration: 600,
  },
});

// 5.0
chart.interval().animate('enter', {
  type: 'fadeIn',
  easing: 'easeQuadIn',
  delay: 100,
  duration: 600,
});
```

## Interaction

4.0 Pass`chart.removeInteraction(name)`Removed interaction, 5.0 passed`chart.interaction(name, false)`Remove interaction.

```js
// 4.0
chart.removeInteraction('tooltip');

// 5.0
chart.interaction('tooltip', false);
```

## Annotation

In 4.0, the elements in the diagram are divided into geometry elements (Geometry) and annotations (Annotation). In 5.0, both are annotations (Marks).

### Declaration method

In 4.0, annotations are declared through the annotation namespace, and the declaration method in 5.0 is consistent with tags.

```js
// 4.0
chart.annotation().line({});

// 5.0
chart.lineX();
```

### Mark specific values

In 4.0, start and end are used to mark specific values, and in 5.0, transform is used to mark specific values.

```js
// 4.0
chart.annotation().line({
  start: ['min', 'mean'],
  end: ['max', 'mean'],
});

// 5.0
chart
  .lineX()
  .encode('y', 'value')
  //Select the smallest value of the y channel
  .transform({ type: 'selectY', y: 'mean' });
```

## Facet

4.0 facets are declared through the facet namespace, and 5.0 facets are consistent with tags.

```js
// 4.0
chart.facet('rect', {
  fields: ['cut', 'clarity'],
  eachView(view) {
    view
      .point()
      .position('carat*price')
      .color('cut')
      .shape('circle')
      .style({ fillOpacity: 0.3, stroke: null })
      .size(3);
  },
});

// 5.0
chart
  .facetRect()
  .encode('x', 'cut')
  .encode('y', 'clarity')
  .point()
  .encode('x', 'carat')
  .encode('y', 'price')
  .encode('color', 'cut')
  .encode('shape', 'point')
  .encode('size', 3)
  .style('fillOpacity', 0.3)
  .style('stroke', null);
```

<embed src="@/docs/manual/extra-topics/migration-from-g2v4.zh.md"></embed>
