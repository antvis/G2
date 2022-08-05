# Text

## Basic Text

```js | dom
G2.render({
  type: 'view',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  children: [
    {
      type: 'interval',
      encode: {
        x: 'genre',
        y: 'sold',
        color: 'genre',
      },
    },
    {
      type: 'text',
      encode: {
        x: 'genre',
        y: 'sold',
        text: 'sold',
      },
      style: {
        fill: 'black',
        textAlign: 'center',
        dy: -5,
      },
    },
  ],
});
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
  return G2.render({
    type: 'text',
    width,
    height,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    transform: [
      {
        type: 'fetch',
        url: 'https://gw.alipayobjects.com/os/bmw-prod/d345d2d7-a35d-4d27-af92-4982b3e6b213.json',
      },
      { type: words },
      { type: layout },
    ],
    scale: {
      x: { domain: [-width / 2, width / 2], guide: null },
      y: { domain: [-height / 2, height / 2], guide: null, range: [0, 1] },
      fontSize: { type: 'identity' },
      rotate: { type: 'identity' },
      tooltip: { field: 'value' },
    },
    encode: {
      x: 'x',
      y: 'y',
      text: 'text',
      color: 'black',
      rotate: 'rotate',
      fontSize: 'size',
      title: 'name',
      tooltip: (d) => d.value.toFixed(2),
    },
    style: {
      textAlign: 'center',
    },
  });
})();
```

## Dependance

```js | dom "pin: false"
cloud = genji.require('d3-cloud');
```
