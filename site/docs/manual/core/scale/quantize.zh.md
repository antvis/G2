---
title: quantize
order: 1
---

quantize 类似于 [threshold](/spec/scale/threshold)，但是计算切片的方式是基于元素的数据值。

## 开始使用

```ts
chart
  .line()
  .encode('x', 'price')
  .encode('y', 'sale')
  .scale('x', {
    type: 'quantize',
    /* 其他配置项 */
  });
```

## 选项

| 属性 | 描述 | 类型 | 默认值|
| -------------| ----------------------------------------------------------- | -----| -------|
| domain      | 设置数据的定义域范围                                            | `number[]` | `[]` |
| range       | 设置数据映射的值域范围                                           | `any[]` | `[]` |
| unknown     | 对于 `undefined`， `NaN`，`null` 空值，返回的数据                | `any` | `undefined` |
| tickCount   | 设置推荐的 tick 生成数量，tickCount 只是建议值，不会完全按照这个值产生 tick | `number` | `5` |
| tickMethod  | 设置生成 tick 的方法，常用于自定义 tick                           | `(min: number, max: number, count: number) => number[]`      | `wilkinson-extended` |
| nice        | 扩展 domain 范围，让输出的 tick 展示得更加友好                     | `boolean` | `false` |
