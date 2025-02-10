---
title: log
order: 2
---

将当前数据变换（Data Transform）流中的片面数据打印到控制台，用于开发者调试数据处理过程。

## 开始使用

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
      { type: 'slice', start: 1 },
      { type: 'log' },
      { type: 'filter', callback: (d) => d.a < 3 },
    ],
  });
```

上述 `log` 加入之后，会打印出经过 `slice` 处理之后的数据，并且这个数据会作为下一个 transform `filter` 的输入。
