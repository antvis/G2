# Vector

## Basic Vector

```js | dom
G2.render({
  width: 800,
  height: 600,
  type: 'vector',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/antfincdn/F5VcgnqRku/wind.json',
    },
  ],
  encode: {
    x: 'longitude',
    y: 'latitude',
    rotate: ({ u, v }) => (Math.atan2(v, u) * 180) / Math.PI,
    size: ({ u, v }) => Math.hypot(v, u),
    color: ({ u, v }) => Math.hypot(v, u),
  },
  scale: {
    color: { guide: null },
    size: { range: [6, 20] },
  },
});
```
