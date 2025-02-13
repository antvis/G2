---
title: threshold
order: 2
---

threshold 是将连续的值域范围划分为多个切片，并将这些切片映射到一个离散的数据中。

## 开始使用

```ts
chart
  .line()
  .encode('x', 'price')
  .encode('y', 'sale')
  .scale('x', {
    type: 'threshold',
    /* 其他配置项 */
  });
```

## 选项

| 属性 | 描述 | 类型 | 默认值|
| -------------| ----------------------------------------------------------- | -----| -------|
| domain      | 设置数据的定义域范围                                            | `number[]` | `[0.5]` |
| range       | 设置数据映射的值域范围                                           | `any[]` | `[0, 1]` |
| unknown     | 对于 `undefined`， `NaN`，`null` 空值，返回的数据                | `any` | `undefined` |
