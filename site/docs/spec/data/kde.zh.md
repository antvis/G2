---
title: kde
order: 1
---

对指定的数据，进行核密度算法（Kernel Density Estimation）处理，底层使用开源库 [pdfast](https://www.npmjs.com/package/pdfast)。

## 开始使用

```ts
chart.data({
  type: 'inline',
  value: data,
  transform: [
    {
      type: 'kde',
      field: 'y',
      groupBy: ['x', 'species'],
      as: ['y', 'size'],
    },
  ],
});
```

上述例子处理之后，数据会增加 y、size 字段，均为数字数组。

## 选项

| 属性     | 描述                                               | 类型                         | 默认值        |
| -------- | -------------------------------------------------- | ---------------------------- | ------------- |
| field    | 进行核密度算法的数据字段                               | `string`                     |               |
| groupBy  | 对数据进行分组的分组字段，可以指定多个                   | `string[]`                    |              |
| as       | 进行 KDE 处理之后，存储的字段                          | `[number, number]`           | `['y', 'size']` |
| min      | 指定处理范围的最小值                                  | `number`                     | 数据最小值      |
| max      | 指定处理范围的最大值                                   | `number`                    | 数据最小值      |
| size     | 算法最终生成数据的条数                                 | `number`                     | `10`          |
| width    | 确定一个元素左右影响多少点，类似于 bandWidth            |  `number`                    | `2`            |
