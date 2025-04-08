---
title: sortBy
order: 2
---

对数据按照指定的字段进行排序。默认的排序方式为升序排列。

## 开始使用

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
      fields: ['sold'], // 根据 sold 字段排序
    },
  ],
});
```

当存在排序字段时，你可以为每一个字段提供一个布尔值 boolean 来改变排序方式，默认值为 true。

```ts
chart.data({
  type: 'inline',
  value: data,
  transform: [
    {
      type: 'sortBy',
      fields: [['sold', false]], // 排序方式变为降序
    },
  ],
})
```

当存在多个排序字段时，若前一个字段相同，则继续比较下一个字段。

```ts
const options = {
  fields: [['name', true], ['age', false]],
};

const data = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 23 },
  { name: 'Alice', age: 22 },
];
```

此结果按照 name 升序排列，而当 name 相同时，按照 age 降序排列

## 选项

| 属性   | 描述       | 类型                              | 默认值 |
| ------ | ---------- | --------------------------------- | ------ |
| fields | 排序的字段 | `(string \| [string, boolean])[]` | `[]`   |
