---
title: ordinal
order: 1
---

ordinal 是将有序且离散的定义域映射到有序离散的值域，通常用于分类的数据，比如：班级、商品类别等形式的数据。

## 开始使用

linear 比例尺常规用于将数据映射到归一化坐标上。

```ts
chart
  .line()
  .encode('x', 'type')
  .encode('y', 'sale')
  .scale('y', {
    type: 'ordinal',
    /* 其他配置项 */
  });
```

这个例子中会将 y 通道的比例尺设置它的映射方式，从而影响到图形在画布上的位置。

## 选项

| 属性 | 描述 | 类型 | 默认值|
| -------------| ----------------------------------------------------------- | -----| -------|
| domain      | 设置数据的定义域范围                                            | `any[]` | `[]` |
| range       | 设置数据映射的值域范围                                           | `any[]` | `[]` |
| unknown     | 对于 `undefined`， `NaN`，`null` 空值，返回的数据                | `any` | `undefined` |
| compare     | 比较两个值，用于排序的比较器                                      | `(a: number | string, b: number | string) => number`      | `undefined` |

## FAQ

- 柱形图怎么指定柱子的颜色色板？

```ts
chart
  .interval()
  // ...
  .encode('color', 'type')
  .scale('color', {
    type: 'ordinal',
    range: ['red', 'green', 'blue'],
  });
```
