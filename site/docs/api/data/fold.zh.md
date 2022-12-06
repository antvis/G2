---
title: fold
order: 1
---

将多个字段打包成按照指定的 key value 组织形式。

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
        type: 'fold',
        fields: ['a', 'b'],
        as: ['key', 'value'],
      },
    ],
  });
```

上述例子处理之后，数据变成为：

```js
[
  { key: 'a', value: 1, c: 3 },
  { key: 'b', value: 2, c: 3 },
  { key: 'a', value: 4, c: 3 },
  { key: 'b', value: 5, c: 3 },
]
```
## 选项

| 属性 | 描述 | 类型 | 默认值|
| -------------| ----------------------------------------------------------- | -----------------------------| --------------------|
| fields       |  需要合并的字段列表                                            | `string[]`                   |                     |
| as           |  需要合并的字段列表                                            | `string[]`                   | `[]`                |
