# Link

## Basic Link

```js
(() => {
  const chart = new G2.Chart();

  chart
    .link()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/antfincdn/SM13%24lHuYH/metros.json',
    })
    .encode('x', ['POP_1980', 'POP_2015'])
    .encode('y', ['R90_10_1980', 'R90_10_2015'])
    .encode('color', (d) => d.R90_10_2015 - d.R90_10_1980)
    .scale('x', {
      type: 'log',
      guide: { formatter: (d) => `${d / 1000}k`, label: { autoHide: true } },
    })
    .scale('color', { guide: null })
    .style('arrow', { size: 6 });

  return chart.render().node();
})();
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
  const chart = new G2.Chart({
    width: 640,
    height: 640,
  });

  chart.data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/233673d6-9c84-4ba2-98be-992fb1b34593.json',
    transform: [
      { type: 'connector', callback: flatten },
      { type: 'connector', callback: layout },
    ],
  });

  chart
    .link()
    .data({
      transform: [{ type: 'connector', callback: links }],
    })
    .encode('x', [(d) => d.source.x, (d) => d.target.x])
    .encode('y', [(d) => d.source.y, (d) => d.target.y])
    .scale('x', { guide: null })
    .scale('y', { guide: null })
    .style('stroke', '#ddd');

  chart
    .point()
    .data({
      transform: [{ type: 'connector', callback: nodes }],
    })
    .encode('x', 'x')
    .encode('y', 'y')
    .encode('size', 10)
    .encode('color', (d) => d.data.type)
    .encode('title', (d) => d.data.type)
    .encode('tooltip', (d) => d.data.name);

  return chart.render().node();
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
