# Grid

> The last calendar grid has some performance issues, please wait for it to be rendered.

## Ordinal Grid

```js | dom
G2.render({
  type: 'grid',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/bd287f2c-3e2b-4d0a-8428-6a85211dce33.json',
    },
    {
      type: 'sortBy',
      fields: ['y'],
    },
  ],
  height: 640,
  encode: {
    x: 'x',
    y: 'y',
    color: (d) => `${d.index}`,
  },
  style: {
    stroke: 'black',
    lineWidth: 1,
  },
});
```

## Quantize Grid

```js | dom
G2.render({
  type: 'grid',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/89c20fe8-0c6f-46c8-b36b-4cb653dba8ed.json',
      callback: (d) => ({ salary: d }),
    },
  ],
  width: 900,
  height: 280,
  scale: {
    color: {
      type: 'quantize',
      domain: [10000, 100000],
      range: ['#eee', 'pink', 'red'],
    },
  },
  encode: {
    y: (_, i) => (i % 5) + 1,
    x: (_, i) => ((i / 5) | 0) + 1,
    color: 'salary',
    tooltip: 'salary',
  },
  style: {
    stroke: 'black',
    lineWidth: 1,
  },
});
```

## Flex Grid

```js | dom
G2.render({
  type: 'grid',
  data: [
    { name: 'A', course: 'a' },
    { name: 'A', course: 'b' },
    { name: 'B', course: 'a' },
    { name: 'B', course: 'b' },
  ],
  scale: {
    x: { flex: [2, 1] },
    y: { flex: [1, 2] },
  },
  encode: {
    y: 'name',
    x: 'course',
  },
  style: {
    stroke: 'black',
    lineWidth: 1,
  },
});
```

## Calendar Grid

> This demo has some performance issues, please wait for it to be rendered.

```js | dom
(() => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const week = (date) => {
    const currentDate = date.getDate();
    const newDate = new Date(date);
    const firstDay = new Date(newDate.setDate(1)).getDay();
    return Math.ceil((currentDate + firstDay) / 7);
  };
  const day = (date) => date.getUTCDay();
  const month = (date) => months[date.getUTCMonth()];
  return G2.render({
    type: 'rect',
    width: 960,
    height: 2024,
    paddingLeft: 20,
    paddingRight: 50,
    transform: [
      {
        type: 'fetch',
        url: 'https://gw.alipayobjects.com/os/bmw-prod/dcd363de-395c-44bd-b0ad-4b5606977b97.json',
        callback: (d) =>
          Object.assign({}, d, {
            Year: `${new Date(d.Date).getUTCFullYear()}`,
            Month: month(new Date(d.Date)),
            Date: new Date(d.Date),
          }),
      },
      {
        type: 'sortBy',
        fields: ['Year'],
        order: 'DESC',
      },
    ],
    encode: {
      y: 'Year',
      x: 'Month',
    },
    children: [
      {
        type: 'grid',
        scale: {
          y: {
            domain: [0, 1, 2, 3, 4, 5, 6],
            range: [0, 1],
            guide: { formatter: (d) => days[+d] },
          },
          x: { domain: [1, 2, 3, 4, 5, 6], paddingOuter: 0, guide: null },
          color: {
            type: 'quantile',
            range: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
            guide: null,
          },
        },
        frame: false,
        encode: {
          x: (d) => week(d.Date),
          y: (d) => day(d.Date),
          color: 'Volume',
        },
      },
    ],
  });
})();
```
