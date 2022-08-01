# Node & Edge

## Chord

```js | dom
G2.render({
  type: 'view',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/antfincdn/agVao%26jU5l/miserables.json',
    },
    { type: 'arc', y: 1, weight: true },
  ],
  coordinate: [{ type: 'polar' }],
  children: [
    {
      type: 'edge',
      transform: [
        {
          type: 'connector',
          callback: (v) => v.edges,
        },
      ],
      encode: {
        x: 'x',
        y: 'y',
        color: 'source',
        shape: 'ribbon',
        // @todo Maybe should be infer internal.
        title: '',
        tooltip: ['source', 'target', 'value'],
      },
      scale: {
        y: { domain: [0, 1], guide: null },
        x: { domain: [0, 1], guide: null },
        color: { type: 'ordinal', guide: null },
      },
      style: {
        opacity: 0.5,
      },
    },
    {
      type: 'node',
      transform: [
        {
          type: 'connector',
          callback: (v) => v.nodes,
        },
      ],
      scale: {
        y: { domain: [0, 1], guide: null },
        x: { domain: [0, 1], guide: null },
        color: { type: 'ordinal', guide: null },
      },
      encode: {
        x: 'x',
        y: 'y',
        size: 'value',
        color: 'name',
        shape: 'polygon',
        // @todo Maybe should be infer internal.
        title: '',
        tooltip: ['name', 'value'],
      },
    },
  ],
});
```
