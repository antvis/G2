# Grid

## Ordinal Grid

```js | dom
G2.render({
  type: 'grid',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/bd287f2c-3e2b-4d0a-8428-6a85211dce33.json',
    },
    {
      type: 'sortBy',
      fields: ['y'],
    },
  ],
  height: 640,
  encode: {
    x: 'x',
    y: 'y',
    color: (d) => `${d.index}`,
  },
  style: {
    stroke: 'black',
    lineWidth: 1,
  },
});
```

## Quantize Grid

```js | dom
G2.render({
  type: 'grid',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/89c20fe8-0c6f-46c8-b36b-4cb653dba8ed.json',
      callback: (d) => ({ salary: d }),
    },
  ],
  width: 900,
  height: 280,
  scale: {
    color: {
      type: 'quantize',
      domain: [10000, 100000],
      range: ['#eee', 'pink', 'red'],
    },
  },
  encode: {
    y: (_, i) => (i % 5) + 1,
    x: (_, i) => ((i / 5) | 0) + 1,
    color: 'salary',
    tooltip: 'salary',
  },
  style: {
    stroke: 'black',
    lineWidth: 1,
  },
});
```

## Flex Grid

```js | dom
G2.render({
  type: 'grid',
  data: [
    { name: 'A', course: 'a' },
    { name: 'A', course: 'b' },
    { name: 'B', course: 'a' },
    { name: 'B', course: 'b' },
  ],
  scale: {
    x: { flex: [2, 1] },
    y: { flex: [1, 2] },
  },
  encode: {
    y: 'name',
    x: 'course',
  },
  style: {
    stroke: 'black',
    lineWidth: 1,
  },
});
```
