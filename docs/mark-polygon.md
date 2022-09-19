# Polygon

## Voronoi

```js
(() => {
  const width = 800;
  const height = 600;
  const layout = (data) => {
    return d3
      .voronoi()
      .x((d) => d.x)
      .y((d) => d.y)
      .extent([
        [0, 0],
        [width, height],
      ])
      .polygons(data)
      .map((p) =>
        Object.assign({}, p, {
          x: p.map((pi) => pi[0]),
          y: p.map((pi) => pi[1]),
        }),
      );
  };
  const chart = new G2.Chart({
    width,
    height,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  });

  chart
    .polygon()
    .data({
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/voronoi.json',
      transform: [
        {
          type: 'custom',
          callback: layout,
        },
      ],
    })
    .encode('x', 'x')
    .encode('y', 'y')
    .encode('color', (d) => d.data.value)
    .encode('title', '') // @todo Maybe should be infer internal.
    .encode('tooltip', (d) => d.data.value)
    .scale('x', { guide: null })
    .scale('y', { guide: null })
    .scale('tooltip', { field: 'value' })
    .style('stroke', '#fff')
    .style('fillOpacity', 0.65);

  return chart.render().node();
})();
```

## Treemap

```js
(() => {
  const width = 640;
  const height = 480;
  const padding = 3;
  const layout = (data) => {
    const root = d3.hierarchy(data);
    root.count();
    d3.treemap().size([width, height]).padding(padding)(root);
    return root
      .descendants()
      .map((d) =>
        Object.assign(d, {
          x: [d.x0, d.x1, d.x1, d.x0],
          y: [d.y0, d.y0, d.y1, d.y1],
        }),
      )
      .filter((d) => d.height === 0);
  };
  const name = (d) => {
    const { name } = d.data;
    return name.length > 5 ? name.slice(0, 4) + '...' : name;
  };
  const chart = new G2.Chart({
    width,
    height,
    paddingLeft: padding,
    paddingBottom: padding,
    paddingRight: padding,
  });

  chart.data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/bmw-prod/5155ef81-db23-49f3-b72b-d436a219d289.json',
    transform: [{ type: 'custom', callback: layout }],
  });

  chart
    .polygon()
    .encode('x', 'x')
    .encode('y', 'y')
    .encode('size', 'r')
    .encode('color', (d) => d.parent.data.name)
    .encode('tooltip', (d) => d.parent.data.name)
    .encode('title', '')
    .scale('x', { domain: [0, width], guide: null })
    .scale('y', { domain: [0, height], guide: null, range: [0, 1] })
    .scale('color', {
      field: '学派',
      guide: { size: 72, autoWrap: true, maxRows: 3, cols: 6 },
    })
    .scale('size', { type: 'identity' })
    .scale('tooltip', { field: '流派' });

  chart
    .text()
    .data({
      transform: [
        { type: 'filterBy', fields: ['height'], callback: (d) => d === 0 },
      ],
    })
    .encode('x', (d) => d.x[0])
    .encode('y', (d) => d.y[0])
    .encode('text', name)
    .style('dy', '15px')
    .style('dx', '5px')
    .style('fill', 'black')
    .style('fontSize', 12);

  return chart.render().node();
})();
```

## Dependance

```js | dom "pin: false"
d3 = (async () => {
  const { voronoi } = await genji.require('d3-voronoi');
  const { hierarchy, treemap } = await genji.require('d3-hierarchy');
  return { voronoi, hierarchy, treemap };
})();
```
