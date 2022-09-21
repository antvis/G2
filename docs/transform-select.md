# Select

The select transform groups marks with specified channels, and filter index by specified selector for each series, say to pull a single or multiple values out of each series. The default channel for grouping is _series_, and the built-in selector is as followed:

- _min_
- _max_
- _last_
- _first_
- a _function_

## SelectMax

```js
(() => {
  const chart = new G2.Chart();
  const xysize = (node) =>
    node
      .encode('x', 'GDP')
      .encode('y', 'LifeExpectancy')
      .encode('size', 'Population'); // @todo Remove this for text.

  chart.data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
  });

  chart
    .point()
    .call(xysize)
    .encode('size', 'Population')
    .encode('color', 'continent')
    .scale('size', { type: 'log', range: [4, 20] })
    .style('fillOpacity', 0.3)
    .style('lineWidth', 1);

  chart
    .text()
    .transform({ type: 'select', size: 'max' })
    .call(xysize)
    .encode('text', 'Country')
    .style('fill', 'black')
    .style('stroke', 'none')
    .style('textAlign', 'center')
    .style('textBaseline', 'middle');

  return chart.render().node();
})();
```

## SelectX

```js
(() => {
  const chart = new G2.Chart({ paddingLeft: 60, paddingRight: 60 });
  const xy = (node) =>
    node.encode('x', (d) => new Date(d.Date)).encode('y', 'Close');

  chart.data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/bmw-prod/6a9b4091-2fe1-4649-89f3-f9a211827811.json',
  });

  chart.line().call(xy).encode('color', 'Symbol').scale('x', { field: 'Date' });

  chart
    .text()
    .transform({ type: 'selectX', selector: 'last' })
    .call(xy)
    .encode('series', 'Symbol')
    .encode('text', 'Symbol')
    .style('fontSize', 10)
    .style('fontWeight', 'normal')
    .style('fill', 'black')
    .style('stroke', 'none');

  return chart.render().node();
})();
```

## SelectY

```js
(() => {
  const chart = new G2.Chart();

  chart.data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/bmw-prod/ab55d10f-24da-465a-9eba-87ac4b7a83ec.json',
  });

  chart
    .line()
    .encode('x', (d) => new Date(d.Date))
    .encode('y', 'Close');

  chart
    .lineY()
    .transform({
      type: 'selectY',
      selector: (I, V) => {
        const sum = V.reduce((s, v) => s + v);
        const mean = sum / V.length;
        let mi;
        let mv = Infinity;
        for (const i of I) {
          const d = Math.abs(V[i] - mean);
          if (d < mv) [mv, mi] = [d, i];
        }
        return [mi];
      },
    })
    .encode('y', 'Close')
    .style('stroke', 'black');

  return chart.render().node();
})();
```
