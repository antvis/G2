# Image

## Basic Image

```js | dom
G2.render({
  type: 'image',
  data: [
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
  ],
  encode: {
    x: 'name',
    y: 'value',
    src: 'url',
  },
  scale: {
    x: { type: 'band' },
    y: { domain: [0, 50] },
  },
});
```

## Image combine with Link

```js | dom
G2.render({
  type: 'view',
  data: [
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
  ],
  scale: {
    x: { type: 'band' },
    y: { domain: [0, 50] },
  },
  children: [
    {
      type: 'link',
      encode: {
        x: ['name', 'name'],
        y: (d) => [0, d.value],
        src: 'url',
      },
      style: {
        stroke: '#dfdfdf'
      }
    },
    {
      type: 'image',
      encode: {
        x: 'name',
        y: 'value',
        src: 'url',
      },
    },
  ],
});
```
