# Link

## Basic Link

```js
G2.render({
  type: 'link',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/antfincdn/SM13%24lHuYH/metros.json',
    },
  ],
  encode: {
    x: ['POP_1980', 'POP_2015'],
    y: ['R90_10_1980', 'R90_10_2015'],
    color: (d) => d.R90_10_2015 - d.R90_10_1980,
  },
  scale: {
    x: {
      type: 'log',
      guide: { formatter: (d) => `${d / 1000}k`, label: { autoHide: true } },
    },
    color: { guide: null },
  },
  style: {
    arrow: { size: 6 },
  },
});
```

## Graph Edge

```js
(() => {
  const flatten = (data) => {
    const root = d3.hierarchy(data);
    return {
      links: root.links(),
      nodes: root.descendants(),
    };
  };
  // @see https://bl.ocks.org/mbostock/1667139
  // compute a static force layout
  const layout = (data) => {
    const { links, nodes } = data;
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(0)
          .strength(1),
      )
      .force('charge', d3.forceManyBody().strength(-50))
      .force('x', d3.forceX())
      .force('y', d3.forceY())
      .stop();
    const n = Math.ceil(
      Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay()),
    );
    for (let i = 0; i < n; ++i) simulation.tick();
    return data;
  };
  const links = (d) => d.links;
  const nodes = (d) => d.nodes;
  return G2.render({
    type: 'view',
    transform: [
      {
        type: 'fetch',
        url: 'https://gw.alipayobjects.com/os/bmw-prod/233673d6-9c84-4ba2-98be-992fb1b34593.json',
      },
      { type: 'connector', callback: flatten },
      { type: 'connector', callback: layout },
    ],
    children: [
      {
        type: 'link',
        transform: [{ type: 'connector', callback: links }],
        encode: {
          x: (d) => d.source.x,
          y: (d) => d.source.y,
          x1: (d) => d.target.x,
          y1: (d) => d.target.y,
        },
        scale: {
          x: { guide: null },
          y: { guide: null },
        },
        style: {
          stroke: '#ddd',
        },
      },
      {
        type: 'point',
        transform: [{ type: 'connector', callback: nodes }],
        scale: {
          tooltip: { field: '名字' },
        },
        encode: {
          x: 'x',
          y: 'y',
          size: 10,
          color: (d) => d.data.type,
          title: (d) => d.data.type,
          tooltip: (d) => d.data.name,
        },
      },
    ],
  });
})();
```

## Dependance

```js | dom "pin: false"
d3 = (async () => {
  const { hierarchy } = await genji.require('d3-hierarchy');
  const { forceSimulation, forceLink, forceManyBody, forceX, forceY } =
    await genji.require('d3-force');
  return {
    hierarchy,
    forceSimulation,
    forceLink,
    forceManyBody,
    forceX,
    forceY,
  };
})();
```
