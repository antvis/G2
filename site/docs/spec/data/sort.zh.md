---
title: sort
order: 1
---

对数据按照指定的 callback 进行排序。类似于 [Array.prototypo.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)。

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
      type: 'sort',
      callback: (a, b) => b.a - a.a,
    },
  ],
});
```

上述例子处理之后，数据变成为：

```js
[
  { a: 4, b: 5, c: 6 },
  { a: 1, b: 2, c: 3 },
];
```

## 选项

| 属性     | 描述                                               | 类型                         | 默认值        |
| -------- | -------------------------------------------------- | ---------------------------- | ------------- |
| callback | Array.sort 的 comparator，返回 1，0，-1 代表 > = < | `(a: any, b: any) => number` | `(a, b) => 0` |
