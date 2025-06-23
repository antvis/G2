---
title: map
order: 2
---

Process data with mapping operations. Similar to [Array.prototype.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

## Getting Started

```ts
const data = [
  { a: 1, b: 2, c: 3 },
  { a: 4, b: 5, c: 6 },
];

chart
  .data({
    type: 'inline',
    value: data,
    transform: [
      {
        type: 'map',
        callback: (datum, idx) => { ...datum, idx },
      },
    ],
  });
```

After the above example is processed, the data becomes:

```js
[
  { a: 1, b: 2, c: 3, idx: 0 },
  { a: 4, b: 5, c: 6, idx: 1 },
];
```

## Options

| Property | Description                                                 | Type                  | Default    |
| -------- | ----------------------------------------------------------- | --------------------- | ---------- |
| callback | Function that takes current data and returns processed data | `(datum: any) => any` | `(d) => d` |
