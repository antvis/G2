# RangeX

## 开始

```js
(() => {
  const chart = new G2.Chart({ width: 800 });

  chart.data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/89a884ff-5f4e-48e8-b317-ae5b3b956bf2.json',
    transform: [
      {
        type: 'fold',
        fields: ['New York', 'San Francisco'],
        as: ['city', 'weather'],
      },
    ],
  });

  chart
    .rangeX()
    .data([{ x1: 0.6, x2: 1 }])
    .encode('x', ['x1', 'x2'])
    .scale('x', { independent: true, guide: null, domain: [0, 1] });

  chart
    .line()
    .encode('x', (d) => new Date(d.date))
    .encode('y', 'weather')
    .encode('color', 'city');

  return chart.render().node();
})();
```
