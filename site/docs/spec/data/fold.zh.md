---
title: fold
order: 1
---

将多个字段展开成按照指定的 key value 组织形式。

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
      type: 'fold',
      fields: ['a', 'b'],
      key: 'key',
      value: 'value',
    },
  ],
});
```

上述例子处理之后，数据变成为：

```js
[
  { a: 1, b: 2, c: 3, key: 'a', value: 1 },
  { a: 1, b: 2, c: 3, key: 'b', value: 2 },
  { a: 4, b: 5, c: 6, key: 'a', value: 4 },
  { a: 4, b: 5, c: 6, key: 'b', value: 5 },
];
```

## 选项

| 属性   | 描述                           | 类型       | 默认值  |
| ------ | ------------------------------ | ---------- | ------- |
| fields | 需要展开的字段列表             | `string[]` |         |
| key    | 展开之后，字段枚举值对应字段名 | `string`   | `key`   |
| value  | 展开之后，数据值对应字段名     | `string`   | `value` |
