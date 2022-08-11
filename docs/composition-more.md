# More Composition

## Circle

```js
(() => {
  const M = [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sept.',
    'Oct.',
    'Nov.',
    'Dec.',
  ];
  const N = ['A', 'B', 'C', 'D'];
  const mockData = M.flatMap((month) =>
    N.map((name) => ({
      month,
      name,
      value: Math.random(),
    })),
  );
  const chart = new G2.Chart({
    width: 480,
    height: 480,
  });

  const circle = chart.circle().data(mockData).encode('position', 'month');

  circle
    .interval()
    .encode('x', 'name')
    .encode('y', 'value')
    .encode('color', 'name');

  return chart.render().node();
})();
```
