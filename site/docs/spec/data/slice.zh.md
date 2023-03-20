---
title: slice
order: 1
---

对数据进行分片，获得子集。类似于 [Array.prototypo.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)。

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
      {
        type: 'slice',
        start: 1,
      },
    ],
  });
```

上述例子处理之后，数据变成为：

```js
[
  { a: 4, b: 5, c: 6 },
];
```

## 选项

| 属性 | 描述 | 类型 | 默认值|
| -------------| ----------------------------------------------------------- | -----------------------------| --------------------|
| start     |  分片的起始索引                                                  | `number`             | `0`                         |
| end       |  分片的结束索引                                                  | `number`             | `arr.length - 1`            |
