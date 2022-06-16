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

  return G2.render({
    type: 'circle',
    encode: {
      position: 'month',
    },
    width: 480,
    height: 480,
    data: mockData,
    children: [
      {
        type: 'interval',
        encode: {
          x: 'name',
          y: 'value',
          color: 'name',
        },
      },
    ],
  });
})();
```
