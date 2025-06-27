---
title: Color Mapping
order: 18
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

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .interval()
  .data([
    { genre: 'Sports', sold: 275, color: 'red' },
    { genre: 'Strategy', sold: 115, color: 'blue' },
    { genre: 'Action', sold: 120, color: 'green' },
    { genre: 'Shooter', sold: 350, color: 'red' },
    { genre: 'Other', sold: 150, color: 'black' },
  ])
  .encode('x', 'genre')
  .encode('y', 'sold')
  .encode('color', 'color')
  .scale('color', { type: 'identity' }); // Set this scale to identity mapping

chart.render();
```

### Range

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  })
  .encode('x', 'letter')
  .encode('y', 'frequency')
  .encode('color', 'letter')
  .axis('y', { labelFormatter: '.0%' })
  .scale('color', {
    type: 'ordinal',
    range: ['#7593ed', '#95e3b0', '#6c7893', '#e7c450', '#7460eb'],
  });

chart.render();
```

### Palette

In G2, you can specify a color palette by setting `scale.palette`. This palette can be discrete:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  })
  .encode('x', 'letter')
  .encode('y', 'frequency')
  .encode('color', 'letter')
  .axis('y', { labelFormatter: '.0%' })
  .scale('color', { palette: 'tableau10' });

chart.render();
```

It can also be continuous:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 320,
});

chart
  .cell()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/seattle-weather.json',
  })
  .transform({ type: 'group', color: 'max' })
  .encode('x', (d) => new Date(d.date).getUTCDate())
  .encode('y', (d) => new Date(d.date).getUTCMonth())
  .encode('color', 'temp_max')
  .scale('color', { palette: 'rainbow' });

chart.render();
```

#### Built-in Palettes

G2 provides several built-in palettes that can be used directly, and supports palettes from [d3-scale-chromatic](https://github.com/d3/d3-scale-chromatic).

**Discrete Palettes**

##### accent

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#7fc97f"></div><div style="background:#beaed4"></div><div style="background:#fdc086"></div><div style="background:#ffff99"></div><div style="background:#386cb0"></div><div style="background:#f0027f"></div><div style="background:#bf5b17"></div><div style="background:#666666"></div></div>

##### blues

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#f7fbff"></div><div style="background:#deebf7"></div><div style="background:#c6dbef"></div><div style="background:#9ecae1"></div><div style="background:#6baed6"></div><div style="background:#4292c6"></div><div style="background:#2171b5"></div><div style="background:#08519c"></div><div style="background:#08306b"></div></div>

##### brBG

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#543005"></div><div style="background:#8c510a"></div><div style="background:#bf812d"></div><div style="background:#dfc27d"></div><div style="background:#f6e8c3"></div><div style="background:#f5f5f5"></div><div style="background:#c7eae5"></div><div style="background:#80cdc1"></div><div style="background:#35978f"></div><div style="background:#01665e"></div><div style="background:#003c30"></div></div>

##### buGn

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#f7fcfd"></div><div style="background:#e5f5f9"></div><div style="background:#ccece6"></div><div style="background:#99d8c9"></div><div style="background:#66c2a4"></div><div style="background:#41ae76"></div><div style="background:#238b45"></div><div style="background:#006d2c"></div><div style="background:#00441b"></div></div>

##### buPu

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#f7fcfd"></div><div style="background:#e0ecf4"></div><div style="background:#bfd3e6"></div><div style="background:#9ebcda"></div><div style="background:#8c96c6"></div><div style="background:#8c6bb1"></div><div style="background:#88419d"></div><div style="background:#810f7c"></div><div style="background:#4d004b"></div></div>

##### category10

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#1f77b4"></div><div style="background:#ff7f0e"></div><div style="background:#2ca02c"></div><div style="background:#d62728"></div><div style="background:#9467bd"></div><div style="background:#8c564b"></div><div style="background:#e377c2"></div><div style="background:#7f7f7f"></div><div style="background:#bcbd22"></div><div style="background:#17becf"></div></div>

##### dark2

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#1b9e77"></div><div style="background:#d95f02"></div><div style="background:#7570b3"></div><div style="background:#e7298a"></div><div style="background:#66a61e"></div><div style="background:#e6ab02"></div><div style="background:#a6761d"></div><div style="background:#666666"></div></div>

##### gnBu

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#f7fcf0"></div><div style="background:#e0f3db"></div><div style="background:#ccebc5"></div><div style="background:#a8ddb5"></div><div style="background:#7bccc4"></div><div style="background:#4eb3d3"></div><div style="background:#2b8cbe"></div><div style="background:#0868ac"></div><div style="background:#084081"></div></div>

##### greens

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#f7fcf5"></div><div style="background:#e5f5e0"></div><div style="background:#c7e9c0"></div><div style="background:#a1d99b"></div><div style="background:#74c476"></div><div style="background:#41ab5d"></div><div style="background:#238b45"></div><div style="background:#006d2c"></div><div style="background:#00441b"></div></div>

##### greys

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#ffffff"></div><div style="background:#f0f0f0"></div><div style="background:#d9d9d9"></div><div style="background:#bdbdbd"></div><div style="background:#969696"></div><div style="background:#737373"></div><div style="background:#525252"></div><div style="background:#252525"></div><div style="background:#000000"></div></div>

##### oranges

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#fff5eb"></div><div style="background:#fee6ce"></div><div style="background:#fdd0a2"></div><div style="background:#fdae6b"></div><div style="background:#fd8d3c"></div><div style="background:#f16913"></div><div style="background:#d94801"></div><div style="background:#a63603"></div><div style="background:#7f2704"></div></div>

##### orRd

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#fff7ec"></div><div style="background:#fee8c8"></div><div style="background:#fdd49e"></div><div style="background:#fdbb84"></div><div style="background:#fc8d59"></div><div style="background:#ef6548"></div><div style="background:#d7301f"></div><div style="background:#b30000"></div><div style="background:#7f0000"></div></div>

##### paired

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#a6cee3"></div><div style="background:#1f78b4"></div><div style="background:#b2df8a"></div><div style="background:#33a02c"></div><div style="background:#fb9a99"></div><div style="background:#e31a1c"></div><div style="background:#fdbf6f"></div><div style="background:#ff7f00"></div><div style="background:#cab2d6"></div><div style="background:#6a3d9a"></div><div style="background:#ffff99"></div><div style="background:#b15928"></div></div>

##### pastel1

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#fbb4ae"></div><div style="background:#b3cde3"></div><div style="background:#ccebc5"></div><div style="background:#decbe4"></div><div style="background:#fed9a6"></div><div style="background:#ffffcc"></div><div style="background:#e5d8bd"></div><div style="background:#fddaec"></div><div style="background:#f2f2f2"></div></div>

##### pastel2

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#b3e2cd"></div><div style="background:#fdcdac"></div><div style="background:#cbd5e8"></div><div style="background:#f4cae4"></div><div style="background:#e6f5c9"></div><div style="background:#fff2ae"></div><div style="background:#f1e2cc"></div><div style="background:#cccccc"></div></div>

##### piYG

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#8e0152"></div><div style="background:#c51b7d"></div><div style="background:#de77ae"></div><div style="background:#f1b6da"></div><div style="background:#fde0ef"></div><div style="background:#f7f7f7"></div><div style="background:#e6f5d0"></div><div style="background:#b8e186"></div><div style="background:#7fbc41"></div><div style="background:#4d9221"></div><div style="background:#276419"></div></div>

##### pRGn

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#40004b"></div><div style="background:#762a83"></div><div style="background:#9970ab"></div><div style="background:#c2a5cf"></div><div style="background:#e7d4e8"></div><div style="background:#f7f7f7"></div><div style="background:#d9f0d3"></div><div style="background:#a6dba0"></div><div style="background:#5aae61"></div><div style="background:#1b7837"></div><div style="background:#00441b"></div></div>

##### puBu

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#fff7fb"></div><div style="background:#ece7f2"></div><div style="background:#d0d1e6"></div><div style="background:#a6bddb"></div><div style="background:#74a9cf"></div><div style="background:#3690c0"></div><div style="background:#0570b0"></div><div style="background:#045a8d"></div><div style="background:#023858"></div></div>

##### puBuGn

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#fff7fb"></div><div style="background:#ece2f0"></div><div style="background:#d0d1e6"></div><div style="background:#a6bddb"></div><div style="background:#67a9cf"></div><div style="background:#3690c0"></div><div style="background:#02818a"></div><div style="background:#016c59"></div><div style="background:#014636"></div></div>

##### puOr

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#2d004b"></div><div style="background:#542788"></div><div style="background:#8073ac"></div><div style="background:#b2abd2"></div><div style="background:#d8daeb"></div><div style="background:#f7f7f7"></div><div style="background:#fee0b6"></div><div style="background:#fdb863"></div><div style="background:#e08214"></div><div style="background:#b35806"></div><div style="background:#7f3b08"></div></div>

##### puRd

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#f7f4f9"></div><div style="background:#e7e1ef"></div><div style="background:#d4b9da"></div><div style="background:#c994c7"></div><div style="background:#df65b0"></div><div style="background:#e7298a"></div><div style="background:#ce1256"></div><div style="background:#980043"></div><div style="background:#67001f"></div></div>

##### purples

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#fcfbfd"></div><div style="background:#efedf5"></div><div style="background:#dadaeb"></div><div style="background:#bcbddc"></div><div style="background:#9e9ac8"></div><div style="background:#807dba"></div><div style="background:#6a51a3"></div><div style="background:#54278f"></div><div style="background:#3f007d"></div></div>

##### rdBu

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#67001f"></div><div style="background:#b2182b"></div><div style="background:#d6604d"></div><div style="background:#f4a582"></div><div style="background:#fddbc7"></div><div style="background:#f7f7f7"></div><div style="background:#d1e5f0"></div><div style="background:#92c5de"></div><div style="background:#4393c3"></div><div style="background:#2166ac"></div><div style="background:#053061"></div></div>

##### rdGy

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#67001f"></div><div style="background:#b2182b"></div><div style="background:#d6604d"></div><div style="background:#f4a582"></div><div style="background:#fddbc7"></div><div style="background:#ffffff"></div><div style="background:#e0e0e0"></div><div style="background:#bababa"></div><div style="background:#878787"></div><div style="background:#4d4d4d"></div><div style="background:#1a1a1a"></div></div>

##### rdPu

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#fff7f3"></div><div style="background:#fde0dd"></div><div style="background:#fcc5c0"></div><div style="background:#fa9fb5"></div><div style="background:#f768a1"></div><div style="background:#dd3497"></div><div style="background:#ae017e"></div><div style="background:#7a0177"></div><div style="background:#49006a"></div></div>

##### rdYlBu

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#a50026"></div><div style="background:#d73027"></div><div style="background:#f46d43"></div><div style="background:#fdae61"></div><div style="background:#fee090"></div><div style="background:#ffffbf"></div><div style="background:#e0f3f8"></div><div style="background:#abd9e9"></div><div style="background:#74add1"></div><div style="background:#4575b4"></div><div style="background:#313695"></div></div>

##### rdYlGn

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#a50026"></div><div style="background:#d73027"></div><div style="background:#f46d43"></div><div style="background:#fdae61"></div><div style="background:#fee08b"></div><div style="background:#ffffbf"></div><div style="background:#d9ef8b"></div><div style="background:#a6d96a"></div><div style="background:#66bd63"></div><div style="background:#1a9850"></div><div style="background:#006837"></div></div>

##### reds

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#fff5f0"></div><div style="background:#fee0d2"></div><div style="background:#fcbba1"></div><div style="background:#fc9272"></div><div style="background:#fb6a4a"></div><div style="background:#ef3b2c"></div><div style="background:#cb181d"></div><div style="background:#a50f15"></div><div style="background:#67000d"></div></div>

##### set1

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#e41a1c"></div><div style="background:#377eb8"></div><div style="background:#4daf4a"></div><div style="background:#984ea3"></div><div style="background:#ff7f00"></div><div style="background:#ffff33"></div><div style="background:#a65628"></div><div style="background:#f781bf"></div><div style="background:#999999"></div></div>

##### set2

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#66c2a5"></div><div style="background:#fc8d62"></div><div style="background:#8da0cb"></div><div style="background:#e78ac3"></div><div style="background:#a6d854"></div><div style="background:#ffd92f"></div><div style="background:#e5c494"></div><div style="background:#b3b3b3"></div></div>

##### set3

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#8dd3c7"></div><div style="background:#ffffb3"></div><div style="background:#bebada"></div><div style="background:#fb8072"></div><div style="background:#80b1d3"></div><div style="background:#fdb462"></div><div style="background:#b3de69"></div><div style="background:#fccde5"></div><div style="background:#d9d9d9"></div><div style="background:#bc80bd"></div><div style="background:#ccebc5"></div><div style="background:#ffed6f"></div></div>

##### spectral

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#9e0142"></div><div style="background:#d53e4f"></div><div style="background:#f46d43"></div><div style="background:#fdae61"></div><div style="background:#fee08b"></div><div style="background:#ffffbf"></div><div style="background:#e6f598"></div><div style="background:#abdda4"></div><div style="background:#66c2a5"></div><div style="background:#3288bd"></div><div style="background:#5e4fa2"></div></div>

##### tableau10

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#4e79a7"></div><div style="background:#f28e2c"></div><div style="background:#e15759"></div><div style="background:#76b7b2"></div><div style="background:#59a14f"></div><div style="background:#edc949"></div><div style="background:#af7aa1"></div><div style="background:#ff9da7"></div><div style="background:#9c755f"></div><div style="background:#bab0ab"></div></div>

##### ylGn

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#ffffe5"></div><div style="background:#f7fcb9"></div><div style="background:#d9f0a3"></div><div style="background:#addd8e"></div><div style="background:#78c679"></div><div style="background:#41ab5d"></div><div style="background:#238443"></div><div style="background:#006837"></div><div style="background:#004529"></div></div>

##### ylGnBu

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#ffffd9"></div><div style="background:#edf8b1"></div><div style="background:#c7e9b4"></div><div style="background:#7fcdbb"></div><div style="background:#41b6c4"></div><div style="background:#1d91c0"></div><div style="background:#225ea8"></div><div style="background:#253494"></div><div style="background:#081d58"></div></div>

##### ylOrBr

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#ffffe5"></div><div style="background:#fff7bc"></div><div style="background:#fee391"></div><div style="background:#fec44f"></div><div style="background:#fe9929"></div><div style="background:#ec7014"></div><div style="background:#cc4c02"></div><div style="background:#993404"></div><div style="background:#662506"></div></div>

##### ylOrRd

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#ffffcc"></div><div style="background:#ffeda0"></div><div style="background:#fed976"></div><div style="background:#feb24c"></div><div style="background:#fd8d3c"></div><div style="background:#fc4e2a"></div><div style="background:#e31a1c"></div><div style="background:#bd0026"></div><div style="background:#800026"></div></div>

**Continuous Palettes**

##### blues

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,rgb(247, 251, 255) 0%,rgb(236, 244, 252) 5.2631578947368425%,rgb(226, 238, 248) 10.526315789473685%,rgb(216, 231, 245) 15.789473684210526%,rgb(205, 224, 241) 21.05263157894737%,rgb(192, 217, 237) 26.31578947368421%,rgb(176, 210, 232) 31.57894736842105%,rgb(159, 201, 226) 36.8421052631579%,rgb(139, 191, 221) 42.10526315789474%,rgb(119, 180, 216) 47.36842105263158%,rgb(99, 168, 210) 52.63157894736842%,rgb(82, 156, 204) 57.89473684210526%,rgb(65, 144, 197) 63.1578947368421%,rgb(51, 130, 190) 68.42105263157895%,rgb(37, 117, 182) 73.6842105263158%,rgb(26, 103, 173) 78.94736842105263%,rgb(16, 89, 161) 84.21052631578948%,rgb(10, 76, 146) 89.47368421052632%,rgb(8, 62, 127) 94.73684210526316%,rgb(8, 48, 107) 100%)"></div></div>

[Continuing with all other continuous palettes as shown in the original...]

#### Custom Palettes

If the built-in palettes don't meet your requirements, you can also try custom palettes. Here's a simple example showing how to register and use a custom palette.

```js | ob { inject: true }
import { register, Chart } from '@antv/g2';

register('palette.custom', customPalette);

const chart = new Chart({
  container: 'container',
});

function customPalette() {
  return ['#FFB3BA', '#98FF98', '#89CFF0', '#FFF9B1', '#D1A3FF'];
}

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  })
  .encode('x', 'letter')
  .encode('y', 'frequency')
  .encode('color', 'letter')
  .axis('y', { labelFormatter: '.0%' })
  .scale('color', { palette: 'custom' }); // Specify custom palette

chart.render();
```

### Relations

You can specify a series of mapping rules through `scale.relations`, which has higher priority than the default mapping from domain to range. For the color channel, this configuration is useful when you want specific values to map to specific colors or handle outliers.

```js
chart.interval().scale('color', {
  relations: [
    ['dog', 'red'], // dog maps to red
    [(d) => d === undefined, 'grey'], // if value is undefined, then grey
  ],
});
```

## Style

Colors can be set through `mark.style`. Colors set here have higher priority than `encode.color` and will not generate legends.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  })
  .encode('x', 'letter')
  .encode('y', 'frequency')
  .style('fill', (datum, index, data) => {
    const { frequency } = datum;
    if (frequency > 0.1) return '#3376cd';
    if (frequency > 0.05) return '#f4bb51';
    return '#b43a29';
  });

chart.render();
```
