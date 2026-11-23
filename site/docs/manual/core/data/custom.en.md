---
title: custom
order: 2
---

Custom data processing logic that allows users to define their own operation methods.

`custom` is a transform in `data.transform`, not a connector replacing `inline` or `fetch`. Its callback receives the previous step’s data and returns the next step’s data. Do not assign the callback directly to an ordinary mark’s `data`.

## Getting Started

```ts
const data = [
  { a: 1, b: 2, c: 3 },
  { a: 4, b: 5, c: 6 },
];

chart.options({
  type: 'view',
  data: {
    type: 'inline',
    value: data,
    transform: [
      {
        type: 'custom',
        callback: (data) => data.map((d) => ({ ...d, sum: d.a + d.b + d.c })),
      },
    ],
  },
});
```

## Options

| Property | Description                | Type                     | Default |
| -------- | -------------------------- | ------------------------ | ------- |
| callback | Custom processing function | `(data: any[]) => any[]` |         |
