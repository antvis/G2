# Transform

- <a href="#fetch">Fetch</a>
- <a href="#sortby">SortBy</a>
- <a href="#filterby">FilterBy</a>
- <a href="#pick">Pick</a>
- <a href="#rename">Rename</a>
- <a href="#subset">Subset</a>
- <a href="#sankey">Sankey</a>
- <a href="#wordcloud">WordCloud</a>
- <a href="#multiple">Multiple</a>
- <a href="#custom">Custom</a>

## Fetch

```js | dom
G2.render({
  type: 'interval',
  // fetch
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/ce45e3d7-ba78-4a08-b411-28df40ef9b7f.json',
    },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
  },
});
```

## SortBy

```js | dom
G2.render({
  type: 'interval',
  // sortBy
  transform: [{ type: 'sortBy', fields: ['sold'] }],
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
  },
});
```

## FilterBy

```js | dom
G2.render({
  type: 'line',
  width: 720,
  paddingLeft: 80,
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/96cd81b5-54a4-4fe8-b778-502b2114df58.json',
      callback: ({ Year, ...rest }) => ({
        Year: new Date(Year),
        ...rest,
      }),
    },
    {
      type: 'filterBy',
      // Filter data with defined Horsepower and Miles_per_Gallon.
      fields: ['Horsepower', 'Miles_per_Gallon'],
    },
  ],
  coordinate: [{ type: 'parallel' }],
  scale: {
    // zIndex of mark is default to 0.
    // zIndex of component is default to -1.
    // Set zIndex to 1 for component to draw above marks.
    'position[1]': { nice: true, guide: { zIndex: 1 } },
    'position[2]': { nice: true, guide: { zIndex: 1 } },
    'position[3]': { nice: true, guide: { zIndex: 1 } },
    'position[4]': { nice: true, guide: { zIndex: 1 } },
    'position[5]': { nice: true, guide: { zIndex: 1 } },
    'position[6]': { nice: true, guide: { zIndex: 1 } },
  },
  encode: {
    position: [
      'Cylinders',
      'Displacement',
      'Weight_in_lbs',
      'Horsepower',
      'Acceleration',
      'Miles_per_Gallon',
      'Year',
    ],
    color: 'Origin',
    size: 1.01,
  },
  style: {
    strokeOpacity: 0.3,
  },
});
```

## Pick

> TO ADD

## Rename

> TO ADD

## Subset

> TO ADD

## Sankey

> TO ADD

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
      type: () => (data) =>
        data.flatMap((d) =>
          d.words.map(({ weight, word }) => ({
            value: weight,
            text: word,
            name: d.name,
          })),
        ),
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

**WordCloud with imageMask.**

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

## Multiple

```js | dom
G2.render({
  type: 'interval',
  // fetch and sortBy
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/ce45e3d7-ba78-4a08-b411-28df40ef9b7f.json',
    },
    { type: 'sortBy', fields: ['sold'] },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
  },
});
```

## Custom

```js | dom
(() => {
  const Percentage = ({ field }) => {
    return (data) => {
      const sum = data.reduce((total, d) => total + d[field], 0);
      return data.map(({ [field]: val, ...rest }) => ({
        ...rest,
        [field]: val / sum,
      }));
    };
  };
  return G2.render({
    type: 'interval',
    transform: [
      // transform to percentage
      {
        type: Percentage,
        field: 'sold',
      },
    ],
    data: [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ],
    encode: {
      x: 'genre',
      y: 'sold',
    },
  });
})();
```

```js
(() => {
  const Percentage = ({ field }) => {
    return (data) => {
      const sum = data.reduce((total, d) => total + d[field], 0);
      return data.map(({ [field]: val, ...rest }) => ({
        ...rest,
        [field]: val / sum,
      }));
    };
  };
  const context = {
    library: { ...G2.createLibrary(), 'transform.percentage': Percentage },
  };
  return G2.render(
    {
      type: 'interval',
      transform: [{ type: 'percentage', field: 'sold' }],
      data: [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ],
      encode: {
        x: 'genre',
        y: 'sold',
      },
    },
    context,
  );
})();
```
