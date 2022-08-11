# Group

## GroupX

```js
(() => {
  const chart = new G2.Chart({ paddingLeft: 60 });

  chart
    .interval()
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
    })
    .transform({
      type: 'groupX',
      y: 'mean',
    })
    .encode('x', 'clarity')
    .encode('y', 'price')
    .encode('color', 'clarity');

  return chart.render().node();
})();
```
