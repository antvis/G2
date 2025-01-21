---
title: dodgeX
order: 1
---

生成 series 通道值为 color 通道的值，根据 series 通道实现分组效果。

## 开始使用

<img alt="dodgeX" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*FrshQpaS4f0AAAAAAAAAAAAADmJ7AQ/original" width="600" />

在对应的 mark 中有 transform 方法可以使用数据的变换。

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  paddingLeft: 50,
});

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  })
  .transform({ type: 'sortX', by: 'y', reverse: true, slice: 6 })
  .transform({ type: 'dodgeX' })
  .encode('x', 'state')
  .encode('y', 'population')
  .encode('color', 'age')
  .axis('y', { labelFormatter: '~s' });

chart.render();
```

## 选项

| 属性               | 描述                                           | 类型                     | 默认值                 |
|-------------------|------------------------------------------------|-------------------------|-----------------------|
| groupBy           | 按照哪个通道分组数据                              | `string` \| `string[]`  | `x`                   |  
| reverse           | 是否逆序                                        | `boolean`               | `false`               |
| orderBy           | 排序方式                                        | `TransformOrder`        | `() => null`          |
| padding           | 分组数据之间的间距（0 ~ 1）                       | `number`                | `0`                |

```ts
type Primitive = number | string | boolean | Date;

type TransformOrder =
  | 'value'
  | 'sum'
  | 'series'
  | 'maxIndex'
  | string[]
  | null
  | ((data: Record<string, Primitive>) => Primitive);
```

## FAQ

- 怎么设置分组柱形图，柱子之间的间距？

使用 `dodgeX` 的 paddig 配置。

```ts
chart
  .interval()
  .transform({ type: 'dodgeX', padding: 0.5 }) // <----
  .encode('x', 'state')
  .encode('y', 'population')
  .encode('color', 'age');
```
