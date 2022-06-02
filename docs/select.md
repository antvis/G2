# Select

The select transform groups marks with specified channels, and filter index by specified selector for each series, say to pull a single or multiple values out of each series. The default channel for grouping is _series_, and the built-in selector is as followed:

- _min_
- _max_
- _last_
- _first_
- a _function_

## Select

```js
G2.render({
  type: 'view',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
    },
  ],
  children: [
    {
      type: 'point',
      scale: {
        size: { type: 'log', range: [4, 20] },
        y: { field: 'Life' },
      },
      encode: {
        x: 'GDP',
        y: 'LifeExpectancy',
        size: 'Population',
        color: 'continent',
      },
      style: {
        fillOpacity: 0.3,
        lineWidth: 1,
      },
    },
    {
      type: 'text',
      transform: [{ type: 'select', size: 'max' }],
      encode: {
        x: 'GDP',
        y: 'LifeExpectancy',
        text: 'Country',
        size: 'Population',
      },
      style: {
        fill: 'black',
        stroke: 'none',
        textAlign: 'center',
        textBaseline: 'middle',
      },
    },
  ],
});
```

## SelectX

```js
G2.render({
  type: 'view',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/6a9b4091-2fe1-4649-89f3-f9a211827811.json',
    },
  ],
  paddingLeft: 60,
  paddingRight: 60,
  children: [
    {
      type: 'line',
      scale: { x: { field: 'Date' } },
      encode: {
        x: (d) => new Date(d.Date),
        y: 'Close',
        color: 'Symbol',
      },
    },
    {
      type: 'text',
      transform: [{ type: 'selectX', selector: 'last' }],
      encode: {
        x: (d) => new Date(d.Date),
        y: 'Close',
        series: 'Symbol',
        text: 'Symbol',
      },
      style: {
        fontSize: 10,
        fontWeight: 'normal',
        fill: 'black',
        stroke: 'none',
      },
    },
  ],
});
```

## SelectY

```js
G2.render({
  type: 'view',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/ab55d10f-24da-465a-9eba-87ac4b7a83ec.json',
    },
  ],
  children: [
    {
      type: 'line',
      encode: {
        x: (d) => new Date(d.Date),
        y: 'Close',
      },
    },
    {
      type: 'annotation.lineY',
      transform: [
        {
          type: 'selectY',
          selector: (I, V) => {
            const sum = V.reduce((s, v) => s + v);
            const mean = sum / V.length;
            let mi;
            let mv = Infinity;
            for (const i of I) {
              const d = Math.abs(V[i] - mean);
              if (d < mv) [mv, mi] = [d, i];
            }
            return [mi];
          },
        },
      ],
      encode: {
        y: 'Close',
      },
      style: {
        stroke: 'black',
      },
    },
  ],
});
```
