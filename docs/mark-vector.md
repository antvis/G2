# Vector

## Basic Vector

```js | table "pin: false"
data = genji.fetchJSON(
  'https://gw.alipayobjects.com/os/antfincdn/F5VcgnqRku/wind.json',
);
```

```js
(() => {
  const chart = new G2.Chart({
    width: 800,
    height: 600,
  });

  chart
    .vector()
    .data(data)
    .encode('x', 'longitude')
    .encode('y', 'latitude')
    .encode('rotate', ({ u, v }) => (Math.atan2(v, u) * 180) / Math.PI)
    .encode('size', ({ u, v }) => Math.hypot(v, u))
    .encode('color', ({ u, v }) => Math.hypot(v, u))
    .scale('color', { guide: null })
    .scale('size', { range: [6, 20] })
    .animate('enter', { type: null });

  return chart.render().node();
})();
```
