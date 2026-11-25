---
title: "Point Keyframe"
language: "en"
canonical: "https://g2.antv.antgroup.com/en/examples/storytelling/storytelling/point-keyframe/"
version: "5.4.8"
---

# Point Keyframe

[Live example](https://g2.antv.antgroup.com/en/examples/storytelling/storytelling/point-keyframe/)

[Resource index](/llms.txt)

Provide a DOM element with `id="container"`. The original example source follows.

## Source

```ts
import { Chart } from '@antv/g2';

fetch(
  'https://gw.alipayobjects.com/os/bmw-prod/fbe4a8c1-ce04-4ba3-912a-0b26d6965333.json',
)
  .then((res) => res.json())
  .then((data) => {
    const chart = new Chart({
      container: 'container',
    });

    chart.options({
      type: 'timingKeyframe',
      direction: 'alternate',
      iterationCount: 4,
      children: [
        {
          type: 'interval',
          data: data,
          transform: [{ type: 'groupX', y: 'mean' }],
          encode: { x: 'gender', y: 'weight', color: 'gender', key: 'gender' },
        },
        {
          type: 'point',
          data: data,
          encode: {
            x: 'height',
            y: 'weight',
            color: 'gender',
            groupKey: 'gender',
            shape: 'point',
          },
        },
      ],
    });

    chart.render();
  });
```
