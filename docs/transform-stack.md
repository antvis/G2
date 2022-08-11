# Stack

The **stack** transform group marks into series by color or series channel, and then produce new y channel for each series by specified order, say to form vertical "stacks" by specified channels. The built-in order is as followed:

- _sum_ - order stacks by ascending total value of corresponding series
- _value_ - order stacks by ascending values of y channel
- _series_ - order stacks by nature alphabetical order of series or color channel
- _maxIndex_ - order stacks by the index of their max value of corresponding series
- _a function_ - order stacks by the specified function of data
- _an array_ - order stacks by the specified array of fields
- _null_ - respect input order

The _reverse_ option reverse any of the above orders. And the _y_ option control wether using the ceil (_y_) or floor (_y1_) of stacked y channel as the new y channel.

## Stacked Interval

```js
(() => {
  const chart = new G2.Chart({});

  chart
    .interval()
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/0afdce89-c103-479d-91f4-6cf604bcf200.json',
    })
    .encode('x', 'date')
    .encode('y', 'deaths')
    .encode('color', 'cause')
    .scale('x', {
      guide: {
        formatter: (d) =>
          `${new Date(d).toLocaleString('en', { month: 'narrow' })}`,
      },
    })
    .scale('y', { guide: { formatter: (d) => `${+d / 1000}k` } });

  return chart.render().node();
})();
```

## Stacked Area

```js
(() => {
  const chart = new G2.Chart();

  chart
    .area()
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/e58c9758-0a09-4527-aa90-fbf175b45925.json',
    })
    .transform({ type: 'stackY', orderBy: 'series' })
    .encode('x', (d) => new Date(d.date))
    .encode('y', 'unemployed')
    .encode('color', 'industry')
    .encode('shape', 'smoothArea')
    .scale('x', { field: 'Date', utc: true })
    .scale('y', { guide: { formatter: (d) => `${+d / 1000}k` } })
    .scale('color', {
      guide: { size: 72, autoWrap: true, maxRows: 3, cols: 6 },
    });

  return chart.render().node();
})();
```

## Order By Sum

```js
(() => {
  const chart = new G2.Chart();

  chart
    .area()
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/e58c9758-0a09-4527-aa90-fbf175b45925.json',
    })
    .transform({ type: 'stackY', orderBy: 'sum' })
    .encode('x', (d) => new Date(d.date))
    .encode('y', 'unemployed')
    .encode('color', 'industry')
    .encode('shape', 'smoothArea')
    .scale('x', { field: 'Date', utc: true })
    .scale('y', { guide: { formatter: (d) => `${+d / 1000}k` } })
    .scale('color', {
      guide: { size: 72, autoWrap: true, maxRows: 3, cols: 6 },
    });

  return chart.render().node();
})();
```

## Order By Value

```js
(() => {
  const chart = new G2.Chart();

  chart
    .area()
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/e58c9758-0a09-4527-aa90-fbf175b45925.json',
    })
    .transform({ type: 'stackY', orderBy: 'value' })
    .encode('x', (d) => new Date(d.date))
    .encode('y', 'unemployed')
    .encode('color', 'industry')
    .encode('shape', 'smoothArea')
    .scale('x', { field: 'Date', utc: true })
    .scale('y', { guide: { formatter: (d) => `${+d / 1000}k` } })
    .scale('color', {
      guide: { size: 72, autoWrap: true, maxRows: 3, cols: 6 },
    });

  return chart.render().node();
})();
```

Replace _orderBy_ option with `d => d.unemployed` (function order) or `['unemployed']` (fields order)will result in same output.

## Order By Max Index

```js
(() => {
  const chart = new G2.Chart();
  const xy = (node) =>
    node
      .encode('x', (d) => new Date(d.year))
      .encode('y', 'revenue')
      .encode('series', 'format');

  chart.transform({
    type: 'fetch',
    url: 'https://gw.alipayobjects.com/os/bmw-prod/f38a8ad0-6e1f-4bb3-894c-7db50781fdec.json',
  });

  chart
    .area()
    .transform({ type: 'stackY', orderBy: 'maxIndex', reverse: true })
    .call(xy)
    .encode('color', 'group')
    .encode('shape', 'smoothArea')
    .scale('y', { guide: { formatter: (d) => `${+d / 1000}k` } });

  chart
    .line()
    .transform({ type: 'stackY', orderBy: 'maxIndex', reverse: true, y: 'y1' })
    .call(xy)
    .encode('shape', 'smooth')
    .style('stroke', 'white');

  return chart.render().node();
})();
```

## Stacked Point

```js
(() => {
  const chart = new G2.Chart({ height: 360 });

  chart
    .point()
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/88c601cd-c1ff-4c9b-90d5-740d0b710b7e.json',
    })
    .transform({ type: 'stackY' })
    .encode('x', (d) => 2021 - d.birth)
    .encode('y', (d) => (d.gender === 'M' ? 1 : -1))
    .encode('color', 'gender')
    .scale('color', { field: 'Gender' })
    .scale('x', { field: 'Age →', nice: true })
    .scale('y', {
      field: '← Women · Men →',
      guide: {
        formatter: (d) => `${Math.abs(+d)}`,
        title: { style: { textAlign: 'center' } },
      },
    });

  chart.annotationLineY().data([0]).encode('y', 0).style('stroke', 'black');

  return chart.render().node();
})();
```
