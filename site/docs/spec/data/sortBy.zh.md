---
title: sortBy
order: 1
---

对数据按照指定的字段进行排序。

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

## 选项

| 属性   | 描述       | 类型                              | 默认值 |
| ------ | ---------- | --------------------------------- | ------ |
| fields | 排序的字段 | `(string \| [string, boolean])[]` | `[]`   |
