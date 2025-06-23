---
title: slice
order: 2
---

Slice data to get a subset. Similar to [Array.prototype.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice).

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
      type: 'slice',
      start: 1,
    },
  ],
});
```

After the above example is processed, the data becomes:

```js
[{ a: 4, b: 5, c: 6 }];
```

## Options

| Property | Description             | Type     | Default          |
| -------- | ----------------------- | -------- | ---------------- |
| start    | Start index for slicing | `number` | `0`              |
| end      | End index for slicing   | `number` | `arr.length - 1` |
