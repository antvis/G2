---
title: join
order: 1
---

类似 SQL 的方式，将两份数据连接到一起。

## 开始使用

```ts
const data = [
  { a: 1, b: 2, c: 3 },
  { a: 4, b: 5, c: 6 },
];

const joinData = [
  { c: 1, d: 2, e: 3 },
  { c: 4, d: 5, e: 6 },
];

chart
  .data({
    type: 'inline',
    value: data,
    transform: [
      {
        type: 'join',
        join: joinData,
        on: ['a', 'c'],
        select: ['d', 'e'],
      },
    ],
  });
```

上述例子处理之后，数据变成为：

```js
[
  { a: 1, b: 2, c: 3, d: 2, e: 3 },
  { a: 4, b: 5, c: 6, d: 5, e: 6 },
];
```

## 选项

| 属性 | 描述 | 类型 | 默认值|
| -------------| ----------------------------------------------------------- | -------------------------------| --------------------|
| join         |  需要连接的数据源                                              | `object[]`                     |                     |
| on           |  两个数据源连接的字段                                           | `[string \| ((d: any) => string), string \| ((d: any) => string)]`  |                     |
| select       |  从被连接的数据源中获取指定字段的数据                              | `string[]`                    | `[]`                |
| as           |  为 `select` 出来的字段重命名                                   | `string[]`                    | 不做重命名            |
| unknown      |  如果没有匹配到可连接数据，指定一个默认值                           | `any`                         | `NaN`               |
