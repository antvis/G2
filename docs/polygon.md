# Polygon

## Voronoi

```js | dom
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
  return G2.render({
    type: 'polygon',
    width,
    height,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    transform: [
      {
        type: 'fetch',
        url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/voronoi.json',
      },
      {
        type: 'connector',
        callback: layout,
      },
    ],
    scale: {
      y: { guide: null },
      x: { guide: null },
      color: { type: 'ordinal', guide: null },
      tooltip: { field: 'value' },
    },
    encode: {
      x: 'x',
      y: 'y',
      color: (d) => d.data.value,
      title: '', // @todo Maybe should be infer internal.
      tooltip: (d) => d.data.value,
    },
    style: {
      stroke: '#fff',
      fillOpacity: 0.65,
    },
  });
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
  return G2.render({
    type: 'view',
    width,
    height,
    paddingTop: 72,
    paddingLeft: padding,
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
        type: 'polygon',
        scale: {
          x: { domain: [0, width], guide: null },
          y: { domain: [0, height], guide: null, range: [0, 1] },
          size: { type: 'identity' },
          color: {
            field: '学派',
            guide: { size: 72, autoWrap: true, maxRows: 3, cols: 6 },
          },
          tooltip: { field: '学派' },
        },
        encode: {
          color: (d) => d.parent.data.name,
          size: 'r',
          x: 'x',
          y: 'y',
          title: '',
          tooltip: (d) => d.parent.data.name,
        },
        style: {
          stroke: 'black',
        },
      },
      {
        type: 'text',
        transform: [
          { type: 'filterBy', fields: ['height'], callback: (d) => d === 0 },
        ],
        encode: {
          x: (d) => d.x[0],
          y: (d) => d.y[0],
          text: name,
        },
        style: {
          dy: '15px',
          dx: '5px',
          fill: 'black',
          fontSize: 12,
        },
      },
    ],
  });
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
