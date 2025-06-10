---
title: spaceFlex
order: 2
---

Uses a CSS flex-like layout method to partition spatial areas, commonly used for multi-chart comparison views.

## Getting Started

Provides a two-level flex container layout canvas.

<img alt="spaceFlex" src="https://mdn.alipayobjects.com/mdn/huamei_qa8qxu/afts/img/A*lLecQJkdPbIAAAAAAAAAAAAADmJ7AQ" width="600" />

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 900,
});

const flex = chart
  .spaceFlex()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/seattle-weather.json',
  })
  .attr('direction', 'col')
  .attr('ratio', [1, 2]);

flex
  .interval()
  .attr('paddingBottom', 0)
  .attr('paddingRight', 300)
  .transform({ type: 'groupX', y: 'max' })
  .axis('x', false)
  .encode('x', (d) => new Date(d.date).getUTCDate())
  .encode('y', 'temp_max')
  .encode('color', 'steelblue');

flex
  .spaceFlex()
  .attr('ratio', [2, 1])
  .call((node) =>
    node
      .cell()
      .attr('paddingRight', 0)
      .attr('paddingBottom', 50)
      .transform({ type: 'group', color: 'max' })
      .encode('x', (d) => new Date(d.date).getUTCDate())
      .encode('y', (d) => new Date(d.date).getUTCMonth())
      .encode('color', 'temp_max')
      .style('inset', 0.5)
      .axis('x', { title: 'Date' })
      .axis('y', { title: 'Month' })
      .legend({ color: false })
      .scale('color', {
        type: 'sequential',
        palette: 'gnBu',
      }),
  )
  .call((node) =>
    node
      .interval()
      .attr('paddingBottom', 50)
      .transform({ type: 'groupX', y: 'max' })
      .coordinate({ transform: [{ type: 'transpose' }] })
      .axis('x', false)
      .encode('x', (d) => new Date(d.date).getUTCMonth())
      .encode('y', 'temp_max')
      .encode('color', 'steelblue'),
  );

chart.render();
```

For more examples, please visit the [Chart Examples](/examples) page.

## Options

Currently, flex mainly provides the two core configurations for space partitioning.

| Property  | Description                                               | Type           | Default    |
| --------- | --------------------------------------------------------- | -------------- | ---------- |
| ratio     | Set the proportion of space occupied by child elements in flex container | `number[]`     | Equal split |
| direction | Set the direction of flex space partitioning             | `col` \| `row` | `row`      |
| data      | Data for the flex container                               | `Data`         |            |

All configurations for `spaceFlex` can be set using the API, for example:

```ts
chart.spaceFlex().attr('ratio', [1, 2, 3]).attr('direction', 'col');
```

## FAQ

- How to use spaceFlex to define complex chart layouts?

SpaceFlex provides proportional horizontal and vertical space partitioning. For complex layouts, theoretically all can be achieved by continuously breaking down container hierarchy structures.
