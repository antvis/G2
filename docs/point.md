# Point

## Basic Point

```js | dom
G2.render({
  type: 'point',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
    },
  ],
  encode: {
    x: 'height',
    y: 'weight',
    color: 'gender',
    shape: 'hollowPoint',
  },
});
```

## One Dimension

```js | dom
G2.render({
  type: 'point',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
    },
  ],
  height: 120,
  scale: { y: { guide: null } },
  encode: {
    x: 'height',
    shape: 'hollowPoint',
  },
});
```

## Size Channel

```js | dom
G2.render({
  type: 'point',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
    },
  ],
  scale: { size: { type: 'log', range: [4, 20] }, y: { field: 'Life' } },
  encode: {
    x: 'GDP',
    y: 'LifeExpectancy',
    size: 'Population',
    color: 'continent',
  },
  style: {
    fillOpacity: 0.3,
    lineWidth: 1,
  },
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
          color: { guide: null, range: ['#30a14e', '#40c463', '#9be9a8'] },
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
          fill: 'black',
        },
      },
    ],
  });
})();
```

## Dependance

```js | dom "pin: false"
d3 = (async () => {
  const { hierarchy, pack } = await genji.require('d3-hierarchy');
  return { hierarchy, pack };
})();
```
