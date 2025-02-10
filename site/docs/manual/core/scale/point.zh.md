---
title: point
order: 2
---

point 是一个特殊 [band](/manual/core/scale/band) 比例尺，固定配置 `bandWith = 0`。

## 开始使用

```ts
chart
  .interval()
  .encode('x', 'type')
  .encode('y', 'sale')
  .scale('x', {
    type: 'point',
    /* 其他配置项 */
  });
```

## 选项

| 属性 | 描述 | 类型 | 默认值|
| -------------| ----------------------------------------------------------- | -----| -------|
| domain       | 设置定义域数组 | `number[] \| string[] \| Date[]`              | `[]` |
| range        | 设置数据映射的值域范围                                          | `number[]` \| `string[]` | `[0, 1]` |
| unknown      | 对于 `undefined`， `NaN`，`null` 空值，返回的数据               | `any` | `undefined` |
| round        | 输出值去四舍五入                                               | `boolean` | `false` |
| paddingInner | 设置比例尺的内部间距，在 [0, 1] 范围内                            | `number` | `0` |
| paddingOuter | 设置比例尺的外部间距，在 [0, 1] 范围内                            | `number` | `0` |
| padding      | 同时设置 `paddingInner` 和 `paddingOuter`                     | `number` | `0` |
| align        | 对齐方式，在 [0, 1] 范围内                                      | `number` | `0.5` |
| compare      | 对定义域进行映射前的排序                                         | `(a: string or number, b: string or number) => number`| `undefined`  |

```plain
|<------------------------------------------- range ------------------------------------------->|
|             |                                 |                                 |             |
|<--step*PO-->|<--------------step------------->|<--------------step------------->|<--step*PO-->|
|             |                                 |                                 |             |
|             A                                 B                                 C             |
|-----------------------------------------------------------------------------------------------|
```
