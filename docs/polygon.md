# Polygon

## Voronoi plot

```js | dom
G2.render({
  type: 'polygon',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/voronoi.json',
    },
    {
      type: 'voronoi',
      fields: ['x', 'y'],
      as: ['width', 'height'],
      extend: [
        [0, 0],
        [800, 600],
      ],
    },
  ],
  encode: {
    x: 'width',
    y: 'height',
    color: 'value',
    // @todo Maybe should be infer internal.
    title: '',
    tooltip: 'value',
  },
  style: {
    stroke: '#fff',
    fillOpacity: 0.65,
  },
  scale: {
    y: {
      guide: {
        title: { rotate: 0, positionX: -8, positionY: -12 },
      },
    },
    color: {
      type: 'ordinal',
      guide: null,
    },
  },
});
```
