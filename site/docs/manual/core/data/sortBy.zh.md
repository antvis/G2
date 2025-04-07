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

你可以为`fields`字段提供一个布尔值`Boolean`来改变排序方式，默认值为`true`。

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
      fields: [['sold', false]], // 排序方式变为降序
    },
  ],
})
```

## 选项

| 属性   | 描述       | 类型                              | 默认值 |
| ------ | ---------- | --------------------------------- | ------ |
| fields | 排序的字段 | `(string \| [string, boolean])[]` | `[]`   |
