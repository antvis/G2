---
title: fold
order: 2
---

Unfold multiple fields into a specified key-value organization format.

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
      type: 'fold',
      fields: ['a', 'b'],
      key: 'key',
      value: 'value',
    },
  ],
});
```

After the above example is processed, the data becomes:

```js
[
  { a: 1, b: 2, c: 3, key: 'a', value: 1 },
  { a: 1, b: 2, c: 3, key: 'b', value: 2 },
  { a: 4, b: 5, c: 6, key: 'a', value: 4 },
  { a: 4, b: 5, c: 6, key: 'b', value: 5 },
];
```

## Options

| Property | Description                                           | Type       | Default |
| -------- | ----------------------------------------------------- | ---------- | ------- |
| fields   | List of fields to be unfolded                         | `string[]` |         |
| key      | Field name for the enumeration values after unfolding | `string`   | `key`   |
| value    | Field name for the data values after unfolding        | `string`   | `value` |
