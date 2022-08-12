# Jitter

The **jitter** transform produce dy channels for marks (especially for point) with ordinal x and y dimension, say to make them jitter in their own space. It is useful to see the density of distribution for data.

- _Jitter_ - Produce both dx and y channels.
- _JitterY_ - Produce only dy channel, which result in produce dy channel in transpose coordinate.

It also support _padding_ option to specify padding of space.

## Jitter Both

```js
(() => {
  const chart = new G2.Chart();

  chart
    .point()
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
    })
    .transform({ type: 'jitter' })
    .encode('x', 'clarity')
    .encode('color', 'clarity')
    .scale('x', { padding: 0.5 })
    .scale('y', { guide: null })
    .animate('enter', { type: null });

  return chart.render().node();
})();
```

## Jitter In Polar

Specify _paddingX_ and _paddingY_ option for jitter.

```js
(() => {
  const chart = new G2.Chart();

  chart.coordinate({ type: 'polar' });

  chart
    .point()
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
    })
    .transform({ type: 'jitter', paddingX: 0.05, paddingY: 0.05 })
    .encode('x', 'clarity')
    .encode('y', 'cut')
    .encode('color', (d) => `(${d.clarity}, ${d.cut})`)
    .scale('x', { padding: 0.5 })
    .scale('y', { padding: 0.5, guide: null })
    .scale('color', { guide: null });

  return chart.render().node();
})();
```

## JitterY

Specify _padding_ option for jitterY.

```js
(() => {
  const chart = new G2.Chart({ paddingLeft: 90 });

  chart
    .point()
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
    })
    .transform({ type: 'jitterY', padding: 0.1 })
    .encode('x', 'clarity')
    .encode('y', 'cut')
    .encode('shape', 'hyphen')
    .encode('size', 25)
    .scale('x', { padding: 0.5 })
    .scale('y', { padding: 0.5 })
    .scale('color', { guide: null });

  return chart.render().node();
})();
```
