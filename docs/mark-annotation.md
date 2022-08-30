# Annotation

## Text Annotation

```js
(() => {
  const chart = new G2.Chart({
    height: 300,
    width: 640,
  });

  chart.data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/antvdemo/assets/data/blockchain.json',
    transform: [
      {
        type: 'fold',
        fields: ['blockchain', 'nlp'],
        as: ['type', 'value'],
      },
    ],
  });

  chart
    .line()
    .encode('x', (d) => new Date(d.date))
    .encode('y', 'value')
    .encode('color', 'type')
    .scale('x', { guide: { label: { autoHide: 'greedy', showLast: false } } });

  chart
    .annotationText()
    .data([{ date: '2017-12-17', value: 100 }])
    .encode('x', (d) => new Date(d.date))
    .encode('y', 'value')
    .encode(
      'text',
      (d) => `${d.date}, 受比特币影响，blockchain 搜索热度达到峰值：${d.value}`,
    )
    .style('wordWrap', true)
    .style('wordWrapWidth', 160)
    .style('fill', '#2C3542')
    .style('fillOpacity', 0.65)
    .style('textAlign', 'left')
    .style('dy', 30)
    .style('dx', -174)
    .style('fontSize', 10)
    .style('lineWidth', 0)
    .style('background', {
      fill: '#416180',
      fillOpacity: 0.15,
      radius: 2,
      padding: [2, 4],
    })
    .style('connector', {
      stroke: '#416180',
      strokeOpacity: 0.45,
    });

  return chart.render().node();
})();
```

## Badge Annotation

```js
(() => {
  const chart = new G2.Chart({
    height: 300,
    width: 640,
  });

  chart.data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/antvdemo/assets/data/blockchain.json',
    transform: [
      {
        type: 'fold',
        fields: ['blockchain', 'nlp'],
        as: ['type', 'value'],
      },
    ],
  });

  chart
    .line()
    .encode('x', (d) => new Date(d.date))
    .encode('y', 'value')
    .encode('color', 'type')
    .scale('x', {
      guide: { label: { autoHide: 'greedy', showLast: false } },
    });

  chart
    .annotationText()
    .data([{ date: '2017-12-17', value: 100 }])
    .encode('x', (d) => new Date(d.date))
    .encode('y', 'value')
    // @todo This seems necessary in this example.
    // The text channel should be the content rather
    // specify it in the style again.
    .encode(
      'text',
      (d) => `${d.date}, 受比特币影响，blockchain 搜索热度达到峰值：${d.value}`,
    )
    .encode('shape', 'annotation.badge')
    .style('content', 'top')
    .style('wordWrap', true)
    .style('wordWrapWidth', 160)
    .style('fill', '#6395FA')
    .style('fillOpacity', 0.65)
    .style('textAlign', 'left')
    .style('dy', 30)
    .style('dx', -174)
    .style('fontSize', 10)
    .style('connector', {
      stroke: '#416180',
      strokeOpacity: 0.45,
    });

  return chart.render().node();
})();
```

## Connector Annotation

```js
(() => {
  const chart = new G2.Chart({ height: 300 });

  chart.data([
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 150 },
    { genre: 'Other', sold: 350 },
  ]);

  chart
    .interval()
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre');

  // @todo Maybe a transform to be more concise and readable.
  chart
    .annotationConnector()
    .data([
      { x1: 'Strategy', x2: 'Action', y1: 115, y2: 120 },
      { x1: 'Other', x2: 'Shooter', y1: 350, y2: 150 },
    ])
    .encode('x', ['x1', 'x2'])
    .encode('y', ['y1', 'y2'])
    .style('stroke', '#979797');

  return chart.render().node();
})();
```

## RangeX Annotation

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
    .annotationRangeX()
    .data([{ x1: 0.6, x2: 1 }])
    .encode('x', ['x1', 'x2'])
    .scale('x', { independent: true, guide: null, domain: [0, 1] })
    .style('fill', 'rgba(220,220,220,0.3)');

  chart
    .line()
    .encode('x', (d) => new Date(d.date))
    .encode('y', 'weather')
    .encode('color', 'city');

  return chart.render().node();
})();
```

## RangeY Annotation

```js
(() => {
  const chart = new G2.Chart();

  chart.data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/2e5e34b8-229d-4503-92cb-d415106785cf.json',
  });

  chart
    .annotationRangeY()
    .data([{ 'Mean+stdev': 31.3305571769, 'Mean-stdev': 15.6985885518 }])
    .encode('y', ['Mean-stdev', 'Mean+stdev'])
    .style('fill', 'rgba(220,220,220,0.3)');

  chart.point().encode('x', 'Horsepower').encode('y', 'Miles_per_Gallon');

  return chart.render().node();
})();
```
