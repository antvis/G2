# Dodge

The dodge group marks into series by color or series channel, and then produce new series channel for each series by specified order, say to form horizontal "columns" by specified channels. The built-in order is as followed:

- _sum_ - order columns by ascending total value of corresponding series
- _value_ - order columns by ascending values of y channel
- _series_ - order columns by nature alphabetical order of series or color channel
- _maxIndex_ - order columns by the index of their max value of corresponding series
- _a function_ - order columns by the specified function of data
- _an array_ - order columns by the specified array of fields
- _null_ - respect input order

The _reverse_ option reverse any of the above orders.

## Dodged Interval

```js
G2.render({
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/0afdce89-c103-479d-91f4-6cf604bcf200.json',
    },
    { type: 'dodgeX' },
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
  encode: { x: 'date', y: 'deaths', color: 'cause' },
});
```

## Order By Value

```js
G2.render({
  data: [
    { year: '2014', type: 'Sales', sales: 1000 },
    { year: '2015', type: 'Sales', sales: 1170 },
    { year: '2016', type: 'Sales', sales: 660 },
    { year: '2017', type: 'Sales', sales: 1030 },
    { year: '2014', type: 'Expenses', sales: 400 },
    { year: '2015', type: 'Expenses', sales: 460 },
    { year: '2016', type: 'Expenses', sales: 1120 },
    { year: '2017', type: 'Expenses', sales: 540 },
    { year: '2014', type: 'Profit', sales: 300 },
    { year: '2015', type: 'Profit', sales: 300 },
    { year: '2016', type: 'Profit', sales: 300 },
    { year: '2017', type: 'Profit', sales: 350 },
  ],
  paddingLeft: 60,
  transform: [{ type: 'dodgeX', orderBy: 'value', reverse: true }],
  type: 'interval',
  encode: { x: 'year', y: 'sales', color: 'type' },
});
```

## Dodged Schema

```js
G2.render({
  type: 'schema',
  transform: [
    {
      type: 'fetch',
      url: 'https://gw.alipayobjects.com/os/bmw-prod/62fd7bf5-beb5-4791-9b62-6c66fa0204da.json',
    },
    { type: 'dodgeX', paddingInner: 0.3, paddingOuter: 0.1 },
  ],
  encode: {
    x: 'type',
    y: 'bin',
    color: 'Species',
  },
  scale: {
    x: { paddingInner: 0.2, paddingOuter: 0.1 },
    y: { zero: true },
  },
  style: {
    stroke: 'black',
  },
});
```
