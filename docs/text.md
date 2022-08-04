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

## Circle Pack

```js
(() => {
  const width = 780;
  const height = 780;
  const padding = 5;
  const layout = (data) => {
    const root = d3.hierarchy(data);
    root.count();
    d3.pack().size([width, height]).padding(padding)(root);
    return root.descendants();
  };
  const name = (d) => {
    const { name } = d.data;
    return name.length > 4 ? name.slice(0, 3) + '...' : name;
  };
  return G2.render({
    type: 'view',
    width,
    height,
    paddingLeft: padding,
    paddingTop: padding,
    paddingBottom: padding,
    paddingRight: padding,
    transform: [
      {
        type: 'fetch',
        url: 'https://gw.alipayobjects.com/os/bmw-prod/5155ef81-db23-49f3-b72b-d436a219d289.json',
      },
      { type: 'connector', callback: layout },
    ],
    children: [
      {
        type: 'point',
        scale: {
          x: { domain: [0, width], guide: null },
          y: { domain: [0, height], guide: null },
          color: { guide: null },
          size: { type: 'identity' },
        },
        encode: {
          color: 'height',
          size: 'r',
          x: 'x',
          y: 'y',
        },
      },
      {
        type: 'text',
        transform: [
          { type: 'filterBy', fields: ['height'], callback: (d) => d === 0 },
        ],
        encode: {
          x: 'x',
          y: 'y',
          text: name,
        },
        style: {
          textAnchor: 'middle',
          dy: '0.5em',
          fill: 'black',
        },
      },
    ],
  });
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

```js | dom "pin: false"
d3 = (async () => {
  const { hierarchy, pack } = await genji.require('d3-hierarchy');
  return { hierarchy, pack };
})();
```
