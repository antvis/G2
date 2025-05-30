---
title: pick
order: 2
---

从数据中，按照字段抽取一个数据子集。

## 开始使用

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

上述例子处理之后，数据变成为：

```js
[
  { a: 1, b: 2 },
  { a: 4, b: 5 },
];
```

## 选项

| 属性   | 描述           | 类型       | 默认值 |
| ------ | -------------- | ---------- | ------ |
| fields | 抽取的数据字段 | `string[]` |        |
