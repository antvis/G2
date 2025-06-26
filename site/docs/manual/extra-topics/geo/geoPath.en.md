---
title: geoPath
order: 1
---

`geoPath` can be used to draw maps in combination with geojson.

## Getting Started

<img alt="geoPath" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*vcI7RqX24U0AAAAAAAAAAAAADmJ7AQ/original" width="600" />

```ts
import { Chart } from '@antv/g2';
import { feature } from 'topojson';

Promise.all([
  fetch('https://assets.antv.antgroup.com/g2/us-10m.json').then((res) =>
    res.json(),
  ),
  fetch('https://assets.antv.antgroup.com/g2/unemployment2.json').then((res) =>
    res.json(),
  ),
]).then((values) => {
  const [us, unemployment] = values;
  const counties = feature(us, us.objects.counties).features;

  const chart = new Chart({
    container: 'container',
  });

  chart
    .geoPath()
    .projection({ type: 'albersUsa' })
    .data({
      value: counties,
      transform: [
        {
          type: 'join',
          join: unemployment,
          on: ['id', 'id'],
          select: ['rate'],
        },
      ],
    })
    .scale('color', {
      type: 'sequential',
      palette: 'ylGnBu',
      unknown: '#fff',
    })
    .encode('color', 'rate');

  chart.render();
});
```

For more examples, please visit the [Chart Examples](/en/examples) page.

## Options

Currently, in addition to the same API and configuration options as common marks, `geoPath` has a special `projection` mapping. G2 currently has all the mappings from [d3-geo](https://github.com/d3/d3-geo) built in.

## FAQ

### How to draw a map of China?

The map is ultimately determined by geojson data, so you need to find a geojson of China's administrative map and apply this data to the current example demo.

```ts
chart
  .geoPath()
  .data(geojson)
  .encode('latitude', 'latitude')
  .encode('longitude', 'longitude')
  .encode('color', 'rate');
  .scale('color', {
    type: 'sequential',
    palette: 'ylGnBu',
    unknown: '#fff',
  });

  chart.render();
```
