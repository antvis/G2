---
title: sort
order: 2
---

## Overview

Sort data according to the specified callback. Similar to [Array.prototype.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort), G2's implementation of `sort` makes two changes:

1. JavaScript's sort function modifies the original array. In G2, we changed it to an immutable approach to prevent modifying the original array.
2. If the passed data is not an array, no processing will be performed on the data. For example, when drawing some relationship graphs, `data` is generally of `object` type, in which case the sort function becomes ineffective and returns the original data.

## Usage

`sort` is used for sorting data, for example in pie charts and ranking bar charts, where data needs to be arranged from large to small to better see the TOP N data items.

```ts
const data = [
  { a: 1, b: 2, c: 3 },
  { a: 4, b: 5, c: 6 },
];

chart.options({
  data: {
    type: 'inline',
    value: data,
    transform: [
      {
        type: 'sort',
        callback: (a, b) => b.a - a.a,
      },
    ],
  },
});
```

After the above example is processed, the data becomes:

```js
[
  { a: 4, b: 5, c: 6 },
  { a: 1, b: 2, c: 3 },
];
```

Note: The `sort` data transform is in `data.transform`. When data configuration is simplified, transform cannot be configured.

## Options

| Property | Description                                                  | Type                         | Default       |
| -------- | ------------------------------------------------------------ | ---------------------------- | ------------- |
| callback | Array.sort comparator, returns 1, 0, -1 representing >, =, < | `(a: any, b: any) => number` | `(a, b) => 0` |
