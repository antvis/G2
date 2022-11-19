# Parallel

Parallel 是平行坐标系变换，将笛卡尔直角坐标系坐标变换为平行坐标系下的坐标。

## 快速开始

```js
(() => {
  const chart = new G2.Chart({
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
    // zIndex of mark is default to 0.
    // zIndex of component is default to -1.
    // Set zIndex to 1 for component to draw above marks.
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

  return chart.render().node();
})();
```
