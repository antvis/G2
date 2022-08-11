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
    return ({ data }) => ({
      data: data.flatMap((d) =>
        d.words.map(({ weight, word }) => ({
          value: weight,
          text: word,
          name: d.name,
        })),
      ),
    });
  };
  const layout = () => {
    return async ({ data }) => {
      return new Promise((resolve) =>
        cloud()
          .size([width, height])
          .words(data)
          .padding(2)
          .rotate(() => ~~(Math.random() * 2) * 90)
          .fontSize((d) => d.value * 2)
          .on('end', (data) => resolve({ data }))
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
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/d345d2d7-a35d-4d27-af92-4982b3e6b213.json',
    })
    .transform({ type: words })
    .transform({ type: layout })
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

## Dependance

```js | dom "pin: false"
cloud = genji.require('d3-cloud');
```
