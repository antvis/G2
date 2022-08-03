# Schema

## Box plot

```js | dom
G2.render({
  type: 'schema',
  data: [
    { x: 'Oceania', y: [1, 9, 16, 22, 24] },
    { x: 'East Europe', y: [1, 5, 8, 12, 16] },
    { x: 'Australia', y: [1, 8, 12, 19, 26] },
    { x: 'South America', y: [2, 8, 12, 21, 28] },
    { x: 'North Africa', y: [1, 8, 14, 18, 24] },
    { x: 'North America', y: [3, 10, 17, 28, 30] },
    { x: 'West Europe', y: [1, 7, 10, 17, 22] },
    { x: 'West Africa', y: [1, 6, 8, 13, 16] },
  ],
  encode: {
    x: 'x',
    y: 'y',
    color: 'x',
  },
  scale: {
    x: { paddingInner: 0.6, paddingOuter: 0.3 },
    y: { zero: true },
    color: { guide: null },
  },
  style: {
    stroke: 'black',
  },
});
```
