# Point

## Basic Point

```js
(() => {
  const chart = new G2.Chart();

  chart
    .point()
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
    })
    .encode('x', 'height')
    .encode('y', 'weight')
    .encode('color', 'gender')
    .encode('shape', 'hollowPoint');

  return chart.render().node();
})();
```

## One Dimension

```js
(() => {
  const chart = new G2.Chart({ height: 120 });

  chart
    .point()
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
    })
    .encode('x', 'height')
    .encode('shape', 'hollowPoint')
    .scale('y', { guide: null });

  return chart.render().node();
})();
```

## Size Channel

```js | dom
(() => {
  const chart = new G2.Chart();

  chart
    .point()
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
    })
    .encode('x', 'GDP')
    .encode('y', 'LifeExpectancy')
    .encode('size', 'Population')
    .encode('color', 'continent')
    .scale('size', { type: 'log', range: [4, 20] })
    .style('fillOpacity', 0.3)
    .style('lineWidth', 1);

  return chart.render().node();
})();
```

## Circle Pack

```js
(() => {
  const width = 780;
  const height = 780;
  const padding = 5;
  const layout = (data) => {
    const root = d3.hierarchy(data);
    root.count();
    d3.pack().size([width, height]).padding(padding)(root);
    return root.descendants();
  };
  const name = (d) => {
    const { name } = d.data;
    return name.length > 4 ? name.slice(0, 3) + '...' : name;
  };
  const chart = new G2.Chart({
    width,
    height,
    paddingLeft: padding,
    paddingTop: padding,
    paddingBottom: padding,
    paddingRight: padding,
  });
  const xy = (node) => node.encode('x', 'x').encode('y', 'y');

  chart
    .transform({
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/5155ef81-db23-49f3-b72b-d436a219d289.json',
    })
    .transform({ type: 'connector', callback: layout });

  chart
    .point()
    .call(xy)
    .encode('size', 'r')
    .encode('color', 'height')
    .scale('x', { domain: [0, width], guide: null })
    .scale('y', { domain: [0, height], guide: null })
    .scale('color', { guide: null, range: ['#30a14e', '#40c463', '#9be9a8'] })
    .scale('size', { type: 'identity' });

  chart
    .text()
    .transform({
      type: 'filterBy',
      fields: ['height'],
      callback: (d) => d === 0,
    })
    .call(xy)
    .encode('text', name)
    .style('textAnchor', 'middle')
    .style('fill', 'black');

  return chart.render().node();
})();
```

## Dependance

```js | dom "pin: false"
d3 = (async () => {
  const { hierarchy, pack } = await genji.require('d3-hierarchy');
  return { hierarchy, pack };
})();
```
