---
title: bin
order: 1
---

对连续的 x 和 连续的 y 通道进行分箱，并且对通道根据指定的 reducer 进行聚合。

## 开始使用

在对应的 mark 中有 transform 方法可以使用 bin 变换。

```ts
chart
  .point()
  .encode('x', 'x')
  // ...
  .transform({
    type: 'bin',
    /* options */
  });
```

## 选项

| 属性               | 描述                                           | 类型                 | 默认值                 |
|-------------------|------------------------------------------------|---------------------|-----------------------|
| thresholdsX       | 对 x 分箱的数量                                  | `number`            | `d3.thresholdScott`      |  
| thresholdsY       | 对 y 分箱的数量                                  | `number`            | `d3.thresholdScott`      |
| [channel]         | 输出到具体 mark 的 channel 数据的聚合方式          | `Reducer`           |                       |

```ts
type Primitive = number | string | boolean | Date;

type Reducer =
  | 'mean'
  | 'max'
  | 'count'
  | 'min'
  | 'median'
  | 'sum'
  | 'first'
  | 'last'
  | ((I: number[], V: Primitive[]) => Primitive);
```
