---
title: sortBy
order: 2
---

Sort data by specified fields. The default sorting method is ascending order.

## Getting Started

```ts
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

chart.data({
  type: 'inline',
  value: data,
  transform: [
    {
      type: 'sortBy',
      fields: ['sold'], // Sort by the sold field
    },
  ],
});
```

When sorting fields exist, you can provide a boolean value for each field to change the sorting method. The default value is true.

```ts
chart.data({
  type: 'inline',
  value: data,
  transform: [
    {
      type: 'sortBy',
      fields: [['sold', false]], // Change sorting to descending order
    },
  ],
});
```

When there are multiple sorting fields, if the previous field is the same, continue comparing the next field.

```ts
const options = {
  fields: [
    ['name', true],
    ['age', false],
  ],
};

const data = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 23 },
  { name: 'Alice', age: 22 },
];
```

This result is sorted by name in ascending order, and when names are the same, sorted by age in descending order.

## Options

| Property | Description       | Type                              | Default |
| -------- | ----------------- | --------------------------------- | ------- |
| fields   | Fields to sort by | `(string \| [string, boolean])[]` | `[]`    |
