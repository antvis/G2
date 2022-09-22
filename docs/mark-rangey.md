# RangeY

## 开始

```js
(() => {
  const chart = new G2.Chart();

  chart.data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/2e5e34b8-229d-4503-92cb-d415106785cf.json',
  });

  chart
    .rangeY()
    .data([{ 'Mean+stdev': 31.3305571769, 'Mean-stdev': 15.6985885518 }])
    .encode('y', ['Mean-stdev', 'Mean+stdev']);

  chart.point().encode('x', 'Horsepower').encode('y', 'Miles_per_Gallon');

  return chart.render().node();
})();
```
