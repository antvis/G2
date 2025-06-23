---
title: rename
order: 2
---

Rename some fields in the data.

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
      type: 'rename',
      a: 'x',
      b: 'y',
    },
  ],
});
```

After the above example is processed, the data becomes:

```js
[
  { x: 1, y: 2, c: 3 },
  { x: 4, y: 5, c: 6 },
];
```

## Options

| Property | Description                                              | Type     | Default |
| -------- | -------------------------------------------------------- | -------- | ------- |
| [key]    | Rename the field [key] in the data to the specified name | `string` |         |
