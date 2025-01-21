---
title: inline
order: 1
---

使用内联数据。

## 开始使用

```js
// 完整写法
chart.data({
  type: 'inline',
  value: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
});

// 语法糖
chart.data([
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
]);
```

## 选项

| 属性      | 描述                         | 类型            | 默认值 |
| --------- | ---------------------------- | --------------- | ------ |
| value     | 具体的 object 数组数据       | `object[]`      | `[]`   |
| transform | 针对数据 inline 数据进行变换 | `DataTransform` | `[]`   |
