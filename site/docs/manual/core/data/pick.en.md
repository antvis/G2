---
title: pick
order: 2
---

Extract a data subset from the data by field.

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
      type: 'pick',
      fields: ['a', 'b'],
    },
  ],
});
```

After the above example is processed, the data becomes:

```js
[
  { a: 1, b: 2 },
  { a: 4, b: 5 },
];
```

## Options

| Property | Description            | Type       | Default |
| -------- | ---------------------- | ---------- | ------- |
| fields   | Data fields to extract | `string[]` |         |
