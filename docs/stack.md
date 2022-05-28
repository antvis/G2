# Stack

The **stack** transform group marks into series by color or series channel, and then produce new y channel for each series by specified order, say to form vertical "stacks" by specified channels. The built-in order is as followed:

- _sum_ - order stacks by ascending total value of corresponding series
- _value_ - order stacks by ascending values of y channel
- _series_ - order stacks by nature alphabetical order of series or color channel
- _maxIndex_ - order stacks by the index of their max value of corresponding series
- _a function_ - order stacks by the specified function of data
- _an array_ - order stacks by the specified array of fields
- _null_ - respect input order

The _reverse_ option reverse any of the above orders. And the _y_ option control wether using the ceil (_y_) or floor (_y1_) of stacked y channel as the new y channel.

## Stacked Interval

```js
G2.render({
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/0afdce89-c103-479d-91f4-6cf604bcf200.json',
    },
  ],
  paddingLeft: 60,
  scale: {
    x: {
      guide: {
        label: {
          formatter: (d) =>
            `${new Date(d.text).toLocaleString('en', { month: 'narrow' })}`,
        },
      },
    },
    y: { guide: { label: { formatter: (d) => `${+d.text / 1000}k` } } },
  },
  type: 'interval',
  encode: { x: 'date', y: 'deaths', color: 'cause', order: 'appearance' },
});
```

## Stacked Area

```js
G2.render({
  type: 'area',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/e58c9758-0a09-4527-aa90-fbf175b45925.json',
    },
    { type: 'stackY', orderBy: 'series' },
  ],
  scale: {
    x: { field: 'Date', utc: true },
    y: { guide: { label: { formatter: (d) => `${+d.text / 1000}k` } } },
  },
  encode: {
    shape: 'smoothArea',
    x: (d) => new Date(d.date),
    y: 'unemployed',
    color: 'industry',
  },
});
```

## Order By Sum

```js
G2.render({
  type: 'area',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/e58c9758-0a09-4527-aa90-fbf175b45925.json',
    },
    { type: 'stackY', orderBy: 'sum' },
  ],
  scale: {
    x: { field: 'Date', utc: true },
    y: { guide: { label: { formatter: (d) => `${+d.text / 1000}k` } } },
  },
  encode: {
    shape: 'smoothArea',
    x: (d) => new Date(d.date),
    y: 'unemployed',
    color: 'industry',
  },
});
```

## Order By Value

```js
G2.render({
  type: 'area',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/e58c9758-0a09-4527-aa90-fbf175b45925.json',
    },
    { type: 'stackY', orderBy: 'value' },
  ],
  scale: {
    x: { field: 'Date', utc: true },
    y: { guide: { label: { formatter: (d) => `${+d.text / 1000}k` } } },
  },
  encode: {
    shape: 'smoothArea',
    x: (d) => new Date(d.date),
    y: 'unemployed',
    color: 'industry',
  },
});
```

Replace _orderBy_ option with `d => d.unemployed` (function order) or `['unemployed']` (fields order)will result in same output.

## Order By Max Index

```js
G2.render({
  type: 'view',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/f38a8ad0-6e1f-4bb3-894c-7db50781fdec.json',
    },
  ],
  children: [
    {
      type: 'area',
      transform: [
        {
          type: 'stackY',
          orderBy: 'maxIndex',
          reverse: true,
        },
      ],
      scale: {
        y: { guide: { label: { formatter: (d) => `${+d.text / 1000}k` } } },
      },
      encode: {
        shape: 'smoothArea',
        x: (d) => new Date(d.year),
        y: 'revenue',
        color: 'group',
        series: 'format',
      },
    },
    {
      type: 'line',
      transform: [
        {
          type: 'stackY',
          orderBy: 'maxIndex',
          reverse: true,
          y: 'y1',
        },
      ],
      encode: {
        shape: 'smooth',
        x: (d) => new Date(d.year),
        y: 'revenue',
        series: 'format',
      },
      style: {
        stroke: 'white',
      },
    },
  ],
});
```

## Stacked Point

```js
G2.render({
  type: 'view',
  height: 360,
  children: [
    {
      type: 'point',
      transform: [
        {
          type: 'fetch',
          url: 'https://gw.alipayobjects.com/os/bmw-prod/88c601cd-c1ff-4c9b-90d5-740d0b710b7e.json',
        },
        { type: 'stackY' },
      ],
      scale: {
        color: { field: 'Gender' },
        x: { field: 'Age →', nice: true },
        y: {
          field: '← Women · Men →',
          guide: { label: { formatter: (d) => `${Math.abs(+d.text)}` } },
        },
      },
      encode: {
        x: (d) => 2021 - d.birth,
        y: (d) => (d.gender === 'M' ? 1 : -1),
        color: 'gender',
      },
    },
    {
      type: 'annotation.lineX',
      data: [0],
      encode: {
        y: 0,
      },
      style: {
        stroke: 'black',
      },
    },
  ],
});
```
