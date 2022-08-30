# Grid

> The last calendar grid has some performance issues, please wait for it to be rendered.

## Ordinal Grid

```js
(() => {
  const chart = new G2.Chart({
    height: 640,
  });

  chart
    .grid()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/bd287f2c-3e2b-4d0a-8428-6a85211dce33.json',
      transform: [
        {
          type: 'sortBy',
          fields: ['y'],
        },
      ],
    })
    .encode('x', 'x')
    .encode('y', 'y')
    .encode('color', (d) => `${d.index}`)
    .style('stroke', 'black')
    .style('lineWidth', 1)
    .animate('enter', { type: null });

  return chart.render().node();
})();
```

## Quantize Grid

```js
(() => {
  const chart = new G2.Chart({
    width: 900,
    height: 280,
  });

  chart
    .grid()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/89c20fe8-0c6f-46c8-b36b-4cb653dba8ed.json',
      callback: (d) => ({ salary: d }),
    })
    .encode('x', (_, i) => ((i / 5) | 0) + 1)
    .encode('y', (_, i) => (i % 5) + 1)
    .encode('color', 'salary')
    .encode('tooltip', 'salary')
    .scale('color', {
      type: 'quantize',
      domain: [10000, 100000],
      range: ['#eee', 'pink', 'red'],
    })
    .style('stroke', 'black')
    .style('lineWidth', 1);

  return chart.render().node();
})();
```

## Flex Grid

```js
(() => {
  const chart = new G2.Chart();

  chart
    .grid()
    .data([
      { name: 'A', course: 'a' },
      { name: 'A', course: 'b' },
      { name: 'B', course: 'a' },
      { name: 'B', course: 'b' },
    ])
    .encode('x', 'name')
    .encode('y', 'course')
    .style('stroke', 'black')
    .style('lineWidth', 1);

  return chart.render().node();
})();
```

## Calendar Grid

> This demo has some performance issues, please wait for it to be rendered.

```js
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
  const chart = new G2.Chart({
    width: 960,
    height: 2024,
    paddingLeft: 20,
    paddingRight: 50,
  });

  const rect = chart
    .rect()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/dcd363de-395c-44bd-b0ad-4b5606977b97.json',
      callback: (d) =>
        Object.assign({}, d, {
          Year: `${new Date(d.Date).getUTCFullYear()}`,
          Month: month(new Date(d.Date)),
          Date: new Date(d.Date),
        }),
      transform: [
        {
          type: 'sortBy',
          fields: ['Year'],
          order: 'DESC',
        },
      ],
    })
    .encode('y', 'Year')
    .encode('x', 'Month');

  rect
    .grid()
    .encode('x', (d) => week(d.Date))
    .encode('y', (d) => day(d.Date))
    .encode('color', 'Volume')
    .scale('x', { domain: [1, 2, 3, 4, 5, 6], paddingOuter: 0, guide: null })
    .scale('y', {
      domain: [0, 1, 2, 3, 4, 5, 6],
      range: [0, 1],
      guide: { formatter: (d) => days[+d] },
    })
    .scale('color', {
      type: 'quantile',
      range: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
      guide: null,
    })
    .frame(false)
    .animate('enter', { type: null });

  return chart.render().node();
})();
```
