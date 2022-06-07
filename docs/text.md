# Text

## WordCloud

**Basic WordCloud.**

```js | dom
G2.render({
  type: 'text',
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  paddingBottom: 0,
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/d345d2d7-a35d-4d27-af92-4982b3e6b213.json',
    },
    {
      type:
        () =>
        ({ data }) => ({
          data: data.flatMap((d) =>
            d.words.map(({ weight, word }) => ({
              value: weight,
              text: word,
              name: d.name,
            })),
          ),
        }),
    },
    {
      type: 'wordCloud',
      size: [640, 480],
      timeInterval: 5000,
      padding: 0,
      rotate: () => ~~(Math.random() * 2) * 90,
      fontSize: (d) => d.value * 2,
    },
  ],
  scale: {
    x: { guide: null },
    y: { guide: null, range: [0, 1] },
    color: { guide: null },
    fontSize: { type: 'identity' },
    rotate: { type: 'identity' },
  },
  encode: {
    x: 'x',
    y: 'y',
    text: 'text',
    color: 'black',
    rotate: 'rotate',
    fontSize: 'size',
    tooltip: 'name',
  },
  style: {
    textAlign: 'center',
    textBaseline: 'alphabetic',
    fontFamily: 'Verdana',
    fontWeight: 'normal',
  },
});
```

## Image WordCloud

```js | dom
G2.render({
  type: 'text',
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  paddingBottom: 0,
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/antv-keywords.json',
    },
    {
      type: 'wordCloud',
      size: [640, 480],
      timeInterval: 5000,
      padding: 0,
      text: (d) => d.name,
      fontSize: [8, 32],
      spiral: 'rectangular',
      font: 'Verdana',
      imageMask:
        'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*07tdTIOmvlYAAAAAAAAAAABkARQnAQ',
    },
  ],
  scale: {
    x: { guide: null },
    y: { guide: null, range: [0, 1] },
    color: { guide: null },
    fontSize: { type: 'identity' },
    rotate: { type: 'identity' },
  },
  encode: {
    x: 'x',
    y: 'y',
    text: 'text',
    color: 'name',
    rotate: 'rotate',
    fontSize: 'size',
    tooltip: 'name',
  },
  style: {
    textAlign: 'center',
    textBaseline: 'alphabetic',
    fontFamily: 'Verdana',
    fontWeight: 'normal',
  },
});
```
