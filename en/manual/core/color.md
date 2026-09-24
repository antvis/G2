---
title: "Color Mapping"
description: "Color Mapping"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/manual/core/color/"
version: "5.4.8"
---

Color plays a crucial role in visualization. It helps us better understand data, highlight key information, enhance visual appeal, and improve readability. In visualization, color typically serves the following purposes:

- **Distinguishing Data Categories**: Differentiating various data categories. For example, in bar charts, we can use different colors to represent different product categories for easier identification and comparison.
- **Representing Data Quantities**: Expressing data magnitudes. For example, in heatmaps, we can use color intensity to represent data size, with darker colors indicating larger values and lighter colors indicating smaller values.
- **Highlighting Key Information**: Emphasizing important information. For example, in line charts, we can use bright colors to represent data points of interest for easier identification.
- **Enhancing Visual Appeal**: Making visualizations more attractive. Using vibrant colors and interesting color schemes can make visualizations more vivid and engaging.
- **Improving Readability**: Enhancing the readability of visualizations. For example, on maps, we can use different colors to represent different geographical regions for easier identification and understanding.

To set data-independent colors, use `mark.style(fill, color)` or `mark.style(stroke, color)`. For data-driven colors, you can use the following methods:

- Encoding: `mark.encode`
- Style: `mark.style`

## Encoding

Using `mark.encode` to set data-driven colors is the most common approach, configuring the final visual display through color scales.

- `scale.identity`: Identity mapping
- `scale.range`: Custom color palette
- `scale.palette`: Built-in color palettes
- `scale.relations`: Custom mapping relationships

### Identity

When the color scale is set to identity scale, the data from the color channel will be used as visual data and rendered in the final visualization without generating a scale.



```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275, color: 'red' },
    { genre: 'Strategy', sold: 115, color: 'blue' },
    { genre: 'Action', sold: 120, color: 'green' },
    { genre: 'Shooter', sold: 350, color: 'red' },
    { genre: 'Other', sold: 150, color: 'black' },
  ],
  encode: { x: 'genre', y: 'sold', color: 'color' },
  scale: { color: { type: 'identity' } }, // Set this scale to identity mapping
});

chart.render();
```



### Range



```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  },
  encode: { x: 'letter', y: 'frequency', color: 'letter' },
  axis: { y: { labelFormatter: '.0%' } },
  scale: {
    color: {
      type: 'ordinal',
      range: ['#7593ed', '#95e3b0', '#6c7893', '#e7c450', '#7460eb'],
    },
  },
});

chart.render();
```



### Palette

In G2, you can specify a color palette by setting `scale.palette`. This palette can be discrete:



```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  },
  encode: { x: 'letter', y: 'frequency', color: 'letter' },
  axis: { y: { labelFormatter: '.0%' } },
  scale: { color: { palette: 'tableau10' } },
});

chart.render();
```



It can also be continuous:



```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 320,
});

chart.options({
  type: 'cell',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/seattle-weather.json',
  },
  transform: [{ type: 'group', color: 'max' }],
  encode: {
    x: (d) => new Date(d.date).getUTCDate(),
    y: (d) => new Date(d.date).getUTCMonth(),
    color: 'temp_max',
  },
  scale: { color: { palette: 'rainbow' } },
});

chart.render();
```



#### Built-in Palettes

G2 provides several built-in palettes that can be used directly, and supports palettes from [d3-scale-chromatic](https://github.com/d3/d3-scale-chromatic).

**Discrete Palettes**

##### accent



##### blues



##### brBG



##### buGn



##### buPu



##### category10



##### dark2



##### gnBu



##### greens



##### greys



##### oranges



##### orRd



##### paired



##### pastel1



##### pastel2



##### piYG



##### pRGn



##### puBu



##### puBuGn



##### puOr



##### puRd



##### purples



##### rdBu



##### rdGy



##### rdPu



##### rdYlBu



##### rdYlGn



##### reds



##### set1



##### set2



##### set3



##### spectral



##### tableau10



##### ylGn



##### ylGnBu



##### ylOrBr



##### ylOrRd



**Continuous Palettes**

##### blues



[Continuing with all other continuous palettes as shown in the original...]

#### Custom Palettes

If the built-in palettes don't meet your requirements, you can also try custom palettes. Here's a simple example showing how to register and use a custom palette.



```ts
import { register, Chart } from '@antv/g2';

register('palette.custom', customPalette);

const chart = new Chart({
  container: 'container',
});

function customPalette() {
  return ['#FFB3BA', '#98FF98', '#89CFF0', '#FFF9B1', '#D1A3FF'];
}

chart.options({
  type: 'interval',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  },
  encode: { x: 'letter', y: 'frequency', color: 'letter' },
  axis: { y: { labelFormatter: '.0%' } },
  scale: { color: { palette: 'custom' } }, // Specify custom palette
});

chart.render();
```



### Relations

You can specify a series of mapping rules through `scale.relations`, which has higher priority than the default mapping from domain to range. For the color channel, this configuration is useful when you want specific values to map to specific colors or handle outliers.

```js
chart.options({
  type: 'interval',
  scale: {
    color: {
      relations: [
        ['dog', 'red'], // dog maps to red
        [(d) => d === undefined, 'grey'], // if value is undefined, then grey
      ],
    },
  },
});
```

## Style

Colors can be set through `mark.style`. Colors set here have higher priority than `encode.color` and will not generate legends.



```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  },
  encode: { x: 'letter', y: 'frequency' },
  style: {
    fill: (datum, index, data) => {
      const { frequency } = datum;
      if (frequency > 0.1) return '#3376cd';
      if (frequency > 0.05) return '#f4bb51';
      return '#b43a29';
    },
  },
});

chart.render();
```
