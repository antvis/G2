---
title: pack
order: 1
---

Circle Packing is a variant of tree structure diagrams that uses circles (instead of rectangles) to represent the entire hierarchy layer by layer. It is commonly used to describe containment relationships between data.

## Getting Started

<img alt="circle-packing" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*epG0TaxEVTsAAAAAAAAAAAAADmJ7AQ/original
" width="600" />

```js
import { Chart } from '@antv/g2';
import { interpolateHcl } from 'd3-interpolate';

const chart = new Chart({
  container: 'container',
  padding: 20,
});

chart
  .pack()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/flare.json',
  })
  .layout({
    padding: 5,
  })
  .encode('value', 'value')
  .encode('color', 'depth')
  .scale('color', {
    domain: [0, 5],
    range: ['hsl(152,80%,80%)', 'hsl(228,30%,40%)'],
    interpolate: interpolateHcl,
  })
  .style('labelText', (d) =>
    d.r >= 10 && d.height === 0 ? `${d.data.name}` : '',
  )
  .axis(false)
  .legend(false);

chart.render();
```

## Options

| Property | Description                          | Type            | Default Value |
| -------- | ------------------------------------ | --------------- | ------------- |
| layout   | Layout configuration                 | `TreeTransform` | -             |
| style    | Configure graphic styles and labels  | -               | -             |
| labels   | Custom configuration for data labels | label[]         | []            |

### layout

| Property | Description   | Type                 | Default Value                 |
| -------- | ------------- | -------------------- | ----------------------------- |
| sort     | Sorting mode  | `((a, b) => number)` | `(a, b) => b.value - a.value` |
| padding  | Inner spacing | `number`             | 0                             |

### style

Composite graphic marks need to use different prefixes to distinguish graphic configurations.

- `<label>`: Prefix for data labels, for example: `labelText` sets the text of the label.
