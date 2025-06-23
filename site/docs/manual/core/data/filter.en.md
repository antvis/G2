---
title: filter
order: 2
---

Filter data with specified conditions. Similar to [Array.prototype.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter).

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
    {
      type: 'filter',
      callback: (d) => d.a < 3,
    },
  ],
});
```

After the above example is processed, the data becomes:

```js
[{ a: 1, b: 2, c: 3 }];
```

## Options

| Property | Description                                                 | Type                                           | Default                                                    |
| -------- | ----------------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------------------- |
| callback | Function that takes current data and returns processed data | `(d: any, idx: number, arr: any[]) => boolean` | `(d) => d !== undefined && d !== null && !Number.isNaN(d)` |
