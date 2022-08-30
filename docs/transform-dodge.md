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
(() => {
  const chart = new G2.Chart({ paddingLeft: 60 });

  chart
    .interval()
    .data({
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/bmw-prod/0afdce89-c103-479d-91f4-6cf604bcf200.json',
    })
    .transform({ type: 'dodgeX' })
    .encode('x', 'date')
    .encode('y', 'deaths')
    .encode('color', 'cause')
    .scale('x', {
      guide: {
        formatter: (d) =>
          `${new Date(d).toLocaleString('en', { month: 'narrow' })}`,
      },
    })
    .scale('y', { guide: { formatter: (d) => `${+d / 1000}k` } });

  return chart.render().node();
})();
```

## Order By Value

```js
(() => {
  const chart = new G2.Chart({ paddingLeft: 60 });

  chart
    .interval()
    .data([
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
    ])
    .transform({ type: 'dodgeX', orderBy: 'value', reverse: true })
    .encode('x', 'year')
    .encode('y', 'sales')
    .encode('color', 'type');

  return chart.render().node();
})();
```

## Dodged Schema

```js
(() => {
  const chart = new G2.Chart();

  chart
    .schema()
    .data({
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/bmw-prod/62fd7bf5-beb5-4791-9b62-6c66fa0204da.json',
    })
    .transform({ type: 'dodgeX', paddingInner: 0.3, paddingOuter: 0.1 })
    .encode('x', 'type')
    .encode('y', 'bin')
    .encode('color', 'Species')
    .scale('y', { zero: true })
    .style('stroke', 'black');

  return chart.render().node();
})();
```
