# Text

## Basic Text

```js
(() => {
  const chart = new G2.Chart();

  chart.data([
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ]);

  chart
    .interval()
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre');

  chart
    .text()
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('text', 'sold')
    .style('fill', 'black')
    .style('textAlign', 'center')
    .style('dy', -5);

  return chart.render().node();
})();
```

## WordCloud

```js
(() => {
  const width = 640;
  const height = 480;
  const words = () => {
    return (data) =>
      data.flatMap((d) =>
        d.words.map(({ weight, word }) => ({
          value: weight,
          text: word,
          name: d.name,
        })),
      );
  };
  const layout = () => {
    return async (data) => {
      return new Promise((resolve) =>
        cloud()
          .size([width, height])
          .words(data)
          .padding(2)
          .rotate(() => ~~(Math.random() * 2) * 90)
          .fontSize((d) => d.value * 2)
          .on('end', (data) => resolve(data))
          .start(),
      );
    };
  };
  const chart = new G2.Chart({
    width,
    height,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  });

  chart
    .text()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/d345d2d7-a35d-4d27-af92-4982b3e6b213.json',
      transform: [{ type: words }, { type: layout }],
    })
    .encode('x', 'x')
    .encode('y', 'y')
    .encode('text', 'text')
    .encode('color', 'black')
    .encode('rotate', 'rotate')
    .encode('fontSize', 'size')
    .encode('title', 'name')
    .encode('tooltip', (d) => d.value.toFixed(2))
    .style('textAlign', 'center')
    .scale('x', { domain: [-width / 2, width / 2], guide: null })
    .scale('y', {
      domain: [-height / 2, height / 2],
      guide: null,
      range: [0, 1],
    })
    .scale('fontSize', { type: 'identity' })
    .scale('rotate', { type: 'identity' })
    .scale('tooltip', { type: 'identity' });

  return chart.render().node();
})();
```

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
    .text()
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
    .text()
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


## Dependance

```js | dom "pin: false"
cloud = genji.require('d3-cloud');
```
