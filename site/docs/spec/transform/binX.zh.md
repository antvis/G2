---
title: binX
order: 1
---

对 x 通道进行分箱，如果希望对 y 通道进行分箱，使用 binX + transpose 坐标系。

## 开始使用

在对应的 mark 中有 transform 方法可以使用 binX 变换。

```ts
chart
  .point()
  .encode('x', 'x')
  // ...
  .transform({
    type: 'binX',
    /* options */
  });
```

## 选项

| 属性               | 描述                                           | 类型                 | 默认值                 |
|-------------------|------------------------------------------------|---------------------|-----------------------|
| thresholds        | 对 x 分箱的数量                                  | `number`            | `d3.thresholdScott`      |  
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
