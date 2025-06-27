---
title: log
order: 2
---

Print the current data in the Data Transform flow to the console for developers to debug the data processing process.

## Getting Started

```ts
const data = [
  { a: 1, b: 2, c: 3 },
  { a: 4, b: 5, c: 6 },
];

chart.data({
  type: 'inline',
  value: data,
  transform: [
    { type: 'slice', start: 1 },
    { type: 'log' },
    { type: 'filter', callback: (d) => d.a < 3 },
  ],
});
```

After adding the `log` above, it will print the data processed by `slice`, and this data will be used as the input for the next transform `filter`.
