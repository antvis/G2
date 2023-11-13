---
title: Color
order: 6
---
Color plays a very important role in visualization. It helps us better understand data, highlight key information, enhance visual appeal and improve readability. And in visualization, color often serves the following purposes:

* **Distinguish data categories**: Distinguish between different data categories. For example, in a bar chart, we can use different colors to represent different product categories to make it easier to identify and compare them.
* **Represents the amount of data**: Represent the amount of data. For example, in a heat map, we can use shades of color to represent the size of the data, with darker colors representing larger values ​​and lighter colors representing smaller values.
* **Highlight key information**: Highlight key information. For example, in a line chart, we can use bright colors to represent data points of interest to make them easier to find.
* **Enhance visual appeal**: Make the visualization more attractive. Using bright colors and interesting color schemes can make visualizations more lively and interesting.
* **Improve readability**: Improve the readability of visualizations. For example, on a map, we can use different colors to represent different geographical areas to make them easier to identify and understand.

Seting data-independent colors via `mark.style(fill, color)` or `mark.style(stroke, color)`. If you want to set data-driven colors, you can use the following methods to set the colors:

* encode: `mark.encode`
* style: `mark.style`

## Encode

Most common way to set data-driven colors is through `mark.encode`, and configure the final visual display through a color scale.

* `scale.identity`: Identity mapping
* `scale.range`: Custom color palette
* `scale.palette`: Built-in color palette
* `scale.relations`: Custom mapping relationship

### Identity

When setting the color scale to the identity scale, the color channel data will be drawn into the final visualization as visual data, but the scale will not be generated.

```js | ob
(() => {
  const chart = new G2.Chart();

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
    .scale('color', { type: 'identity' }); // Setting this scale to identity mapping.

  chart.render();

  return chart.getContainer();
})();
```

### Range

```js | ob
(() => {
  const chart = new G2.Chart();

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

  return chart.getContainer();
})();
```

### Palette

In G2, you can set `scale.palette` to specify swatches. This palette can be discrete:

```js | ob
(() => {
  const chart = new G2.Chart();

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

  return chart.getContainer();
})();
```

It(palette) can also be continuous:

```js | ob
(() => {
  const chart = new G2.Chart({
    
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

  return chart.getContainer();
})();
```

You can refer to this for the current built-in color palette [palette documentation](/spec/palette).

### Relations

Specifying a series of mapping rules through `scale.relations`. This priority will be higher than the default mapping method from domain to range. For example, for the color channel, this configuration is useful if you want specific values ​​to be mapped to specific colors, or to handle outliers.

```js
chart.interval().scale('color', {
  relations: [
    ['dog', 'red'], // dog is identically mapped to red
    [(d) => d === undefined, 'grey'], // If the value is undefined, it is gray
  ],
});
```

## Style

Setting colors through `mark.style`. The color setting here takes higher priority compared to setting `encode.color` and no legend will be generated.

```js | ob
(() => {
  const chart = new G2.Chart();

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

  return chart.getContainer();
})();
```
