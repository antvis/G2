# Annotation

## Text Annotation

```js
G2.render({
  type: 'view',
  height: 300,
  width: 640,
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/blockchain.json',
    },
  ],
  scale: {
    x: { guide: { label: { autoHide: 'greedy', showLast: false } } },
    color: { guide: null },
  },
  children: [
    {
      type: 'line',
      encode: {
        x: (d) => new Date(d.date),
        y: 'blockchain',
        color: '#5B8FF9',
      },
    },
    {
      type: 'line',
      encode: {
        x: (d) => new Date(d.date),
        y: 'nlp',
        color: '#61DDAA',
      },
    },
    {
      type: 'annotation.text',
      data: [{ date: '2017-12-17', blockchain: 100 }],
      encode: {
        x: (d) => new Date(d.date),
        y: 'blockchain',
        text: (d) =>
          `${d.date}, 受比特币影响，blockchain 搜索热度达到峰值：${d.blockchain}`,
      },
      style: {
        wordWrap: true,
        wordWrapWidth: 160,
        fill: '#2C3542',
        fillOpacity: 0.65,
        textAlign: 'left',
        dy: 30,
        dx: -174,
        fontSize: 10,
        lineWidth: 0,
        background: {
          fill: '#416180',
          fillOpacity: 0.15,
          radius: 2,
          padding: [2, 4],
        },
        connector: {
          stroke: '#416180',
          strokeOpacity: 0.45,
        },
      },
    },
  ],
});
```

## Badge Annotation

```js
G2.render({
  type: 'view',
  height: 300,
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/blockchain.json',
    },
  ],
  scale: {
    x: {
      guide: {
        label: { autoHide: 'greedy', showLast: false, style: { fontSize: 10 } },
        title: { style: { fontSize: 10 } },
      },
    },
    y: {
      guide: {
        label: { style: { fontSize: 10 } },
        title: { style: { fontSize: 10 } },
      },
    },
    color: { guide: null },
  },
  children: [
    {
      type: 'line',
      encode: {
        x: (d) => new Date(d.date),
        y: 'blockchain',
        color: '#5B8FF9',
      },
    },
    {
      type: 'line',
      encode: {
        x: (d) => new Date(d.date),
        y: 'nlp',
        color: '#61DDAA',
      },
    },
    {
      type: 'annotation.text',
      data: [{ date: '2017-12-17', blockchain: 100 }],
      encode: {
        x: (d) => new Date(d.date),
        y: 'blockchain',
        text: (d) =>
          `${d.date}, 受比特币影响，blockchain 搜索热度达到峰值：${d.blockchain}`,
        shape: 'annotation.badge',
      },
      style: {
        wordWrap: true,
        wordWrapWidth: 160,
        fill: '#6395FA',
        fillOpacity: 0.65,
        textAlign: 'left',
        content: 'Top',
        dy: 30,
        dx: -174,
        fontSize: 10,
        connector: {
          stroke: '#416180',
          strokeOpacity: 0.45,
        },
      },
    },
  ],
});
```

## Connector Annotation

```js
G2.render(
  {
    type: 'view',
    height: 300,
    data: [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 150 },
      { genre: 'Other', sold: 350 },
    ],
    children: [
      {
        type: 'interval',
        encode: {
          x: 'genre',
          y: 'sold',
          color: 'genre',
        },
      },
      {
        type: 'annotation.connector',
        data: [
          { x1: 'Strategy', x2: 'Action', y1: 115, y2: 120 },
          { x1: 'Other', x2: 'Shooter', y1: 350, y2: 150 },
        ],
        encode: {
          x: ['x1', 'x2'],
          y: ['y1', 'y2'],
        },
        style: {
          stroke: '#979797',
        },
      },
    ],
  },
  {},
);
```

## RangeX Annotation

```js
G2.render({
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/89a884ff-5f4e-48e8-b317-ae5b3b956bf2.json',
    },
    {
      type: 'fold',
      fields: ['New York', 'San Francisco'],
      as: ['city', 'weather'],
    },
  ],
  type: 'view',
  children: [
    {
      type: 'line',
      encode: {
        x: (d) => new Date(d.date),
        y: 'weather',
        color: 'city',
      },
      style: {
        zIndex: 1,
      },
    },
    {
      type: 'annotation.rangeX',
      data: [{ x1: 0.6, x2: 1 }],
      scale: {
        x: { independent: true, guide: null, domain: [0, 1] },
      },
      encode: {
        x: ['x1', 'x2'],
      },
      style: {
        zIndex: 0,
        fill: 'rgba(220,220,220,0.3)',
      },
    },
  ],
});
```

## RangeY Annotation

```js
G2.render({
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/2e5e34b8-229d-4503-92cb-d415106785cf.json',
    },
  ],
  type: 'view',
  children: [
    {
      type: 'point',
      scale: {
        x: { domain: [0, 250] },
        y: { domain: [0, 50] },
      },
      encode: {
        x: 'Horsepower',
        y: 'Miles_per_Gallon',
      },
      style: {
        zIndex: 1,
      },
    },
    {
      type: 'annotation.rangeY',
      data: [{ 'Mean+stdev': 31.3305571769, 'Mean-stdev': 15.6985885518 }],
      encode: {
        y: ['Mean-stdev', 'Mean+stdev'],
      },
      style: {
        zIndex: 0,
        fill: 'rgba(220,220,220,0.3)',
      },
    },
  ],
});
```
