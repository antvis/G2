# Jitter

The **jitter** transform produce dy channels for marks (especially for point) with ordinal x and y dimension, say to make them jitter in their own space. It is useful to see the density of distribution for data.

- _Jitter_ - Produce both dx and y channels.
- _JitterY_ - Produce only dy channel, which result in produce dy channel in transpose coordinate.

It also support _padding_ option to specify padding of space.

## Jitter Both

```js
G2.render({
  type: 'point',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
    },
    { type: 'jitter' },
  ],
  scale: { x: { padding: 0.5 }, y: { guide: null } },
  encode: {
    x: 'clarity',
    color: 'clarity',
  },
});
```

## Jitter In Polar

Specify _paddingX_ and _paddingY_ option for jitter.

```js
G2.render({
  type: 'point',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
    },
    { type: 'jitter', paddingX: 0.05, paddingY: 0.05 },
  ],
  paddingLeft: 90,
  coordinate: [{ type: 'polar' }],
  scale: {
    x: { padding: 0.5 },
    y: { padding: 0.5 },
  },
  encode: {
    x: 'clarity',
    y: 'cut',
    color: (d) => `(${d.clarity}, ${d.cut})`,
  },
});
```

## JitterY

Specify _padding_ option for jitterY.

```js
G2.render({
  type: 'point',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
    },
    { type: 'jitterY', padding: 0.1 },
  ],
  paddingLeft: 90,
  scale: {
    x: { padding: 0.5 },
    y: { padding: 0.5 },
    color: { guide: null },
  },
  encode: {
    x: 'clarity',
    y: 'cut',
    shape: 'hyphen',
    size: 25,
  },
});
```
