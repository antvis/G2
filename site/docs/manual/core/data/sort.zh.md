---
title: sort
order: 2
---

## 概述

对数据按照指定的 callback 进行排序。类似于 [Array.prototype.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)，G2 实现 `sort` 的时候有两个改动点：

1. JavaScript 中的 sort 函数是会修改原始数组的，在 G2 中改成了 immutable 的写法，防止修改原数组。
2. 如果传入的数据不是数组，那么不会对数据进行任何处理，比如在绘制一些关系图的时候，`data` 一般是 `object` 类型，这个时候，sort 功能失效，返回原数据。 

## 使用方式

`sort` 用于对数据排序，例如在饼图、排行榜条形图中，需要按照数据从大到小排列，便于更好的看清楚 TOP N 的数据项。

```ts
const data = [
  { a: 1, b: 2, c: 3 },
  { a: 4, b: 5, c: 6 },
];

chart.options({
  data: {
    type: 'inline',
    value: data,
    transform: [
      {
        type: 'sort',
        callback: (a, b) => b.a - a.a,
      },
    ],
  }
});
```

上述例子处理之后，数据变成为：

```js
[
  { a: 4, b: 5, c: 6 },
  { a: 1, b: 2, c: 3 },
];
```

注意：`sort` 数据变换是在 `data.transform` 中的，在 data 配置简写的情况下是无法配置 transform 的。

## 配置项

| 属性     | 描述                                               | 类型                         | 默认值        |
| -------- | -------------------------------------------------- | ---------------------------- | ------------- |
| callback | Array.sort 的 comparator，返回 1，0，-1 代表 > = < | `(a: any, b: any) => number` | `(a, b) => 0` |
