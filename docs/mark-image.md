# Image

## Basic Image

```js
(() => {
  const chart = new G2.Chart();

  chart
    .image()
    .data([
      {
        name: 'Internet Explorer',
        value: 26,
        url: 'https://gw.alipayobjects.com/zos/rmsportal/eOYRaLPOmkieVvjyjTzM.png',
      },
      {
        name: 'Chrome',
        value: 40,
        url: 'https://gw.alipayobjects.com/zos/rmsportal/dWJWRLWfpOEbwCyxmZwu.png',
      },
      {
        name: 'Firefox',
        value: 30,
        url: 'https://gw.alipayobjects.com/zos/rmsportal/ZEPeDluKmAoTioCABBTc.png',
      },
      {
        name: 'Safari',
        value: 24,
        url: 'https://gw.alipayobjects.com/zos/rmsportal/eZYhlLzqWLAYwOHQAXmc.png',
      },
      {
        name: 'Opera',
        value: 15,
        url: 'https://gw.alipayobjects.com/zos/rmsportal/vXiGOWCGZNKuVVpVYQAw.png',
      },
      {
        name: 'Undetectable',
        value: 8,
        url: 'https://gw.alipayobjects.com/zos/rmsportal/NjApYXminrnhBgOXyuaK.png',
      },
    ])
    .encode('x', 'name')
    .encode('y', 'value')
    .encode('src', 'url')
    .scale('x', { type: 'band' })
    .scale('y', { domain: [0, 50] });

  return chart.render().node();
})();
```

## Image combine with Link

```js
(() => {
  const chart = new G2.Chart();

  chart.data([
    {
      name: 'Internet Explorer',
      value: 26,
      url: 'https://gw.alipayobjects.com/zos/rmsportal/eOYRaLPOmkieVvjyjTzM.png',
    },
    {
      name: 'Chrome',
      value: 40,
      url: 'https://gw.alipayobjects.com/zos/rmsportal/dWJWRLWfpOEbwCyxmZwu.png',
    },
    {
      name: 'Firefox',
      value: 30,
      url: 'https://gw.alipayobjects.com/zos/rmsportal/ZEPeDluKmAoTioCABBTc.png',
    },
    {
      name: 'Safari',
      value: 24,
      url: 'https://gw.alipayobjects.com/zos/rmsportal/eZYhlLzqWLAYwOHQAXmc.png',
    },
    {
      name: 'Opera',
      value: 15,
      url: 'https://gw.alipayobjects.com/zos/rmsportal/vXiGOWCGZNKuVVpVYQAw.png',
    },
    {
      name: 'Undetectable',
      value: 8,
      url: 'https://gw.alipayobjects.com/zos/rmsportal/NjApYXminrnhBgOXyuaK.png',
    },
  ]);

  chart
    .link()
    .encode('x', ['name', 'name'])
    .encode('y', (d) => [0, d.value])
    .encode('src', 'url')
    .style('stroke', '#dfdfdf');

  chart
    .image()
    .encode('x', 'name')
    .encode('y', 'value')
    .encode('src', 'url')
    .scale('x', { type: 'band' })
    .scale('y', { domain: [0, 50] });

  return chart.render().node();
})();
```
