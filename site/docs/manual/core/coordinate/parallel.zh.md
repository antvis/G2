---
title: parallel
order: 2
---

Parallel 是平行坐标系变换，将笛卡尔直角坐标系坐标变换为平行坐标系下的坐标。

## 开始使用

<img alt="parallel-line" src="https://mdn.alipayobjects.com/mdn/huamei_qa8qxu/afts/img/A*SOZOT7Smha0AAAAAAAAAAAAADmJ7AQ" height="600" />

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  width: 720,
  paddingLeft: 60,
});

chart.coordinate({ type: 'parallel' });

chart
  .line()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/96cd81b5-54a4-4fe8-b778-502b2114df58.json',
    callback: (d) => Object.assign(d, { year: new Date(d.year) }),
    transform: [
      {
        type: 'filter',
        callback: (d) => defined(d.Horsepower) && defined(d.Miles_per_Gallon),
      },
    ],
  })
  .encode('position', [
    'Cylinders',
    'Displacement',
    'Weight_in_lbs',
    'Horsepower',
    'Acceleration',
    'Miles_per_Gallon',
    'Year',
  ])
  .encode('color', 'Origin')
  .encode('size', 1.01)
  .style('strokeOpacity', 0.3)
  .scale('position', { nice: true })
  .scale('position1', { nice: true })
  .scale('position2', { nice: true })
  .scale('position3', { nice: true })
  .scale('position4', { nice: true })
  .scale('position5', { nice: true })
  .axis('position', { zIndex: 1 })
  .axis('position1', { zIndex: 1 })
  .axis('position2', { zIndex: 1 })
  .axis('position3', { zIndex: 1 })
  .axis('position4', { zIndex: 1 })
  .axis('position5', { zIndex: 1 });

chart.render();
```
