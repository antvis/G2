---
title: flexX
order: 1
---

根据指定通道设置 x 比例尺的 flex 属性，实现不等宽矩形的效果。

## 开始使用

<img alt="flexX" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*NfBaTZtrUhoAAAAAAAAAAAAADmJ7AQ/original" width="600" />

在对应的 mark 中有 transform 方法可以使用数据的变换。

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 1000,
  paddingBottom: 100,
});

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/90873879-09d7-4842-a493-03fb560267bc.csv',
  })
  .transform({ type: 'flexX', field: 'gdp' })
  .encode('x', 'country')
  .encode('y', 'value')
  .encode('color', 'country')
  .axis('y', { labelFormatter: '~s' });

chart.render();
```

## 选项

| 属性    | 描述                                        | 类型                                  | 默认值 |
| ------- | ------------------------------------------- | ------------------------------------- | ------ |
| field   | 指定生成权重数组的字段，优先级比 channel 高 | `string` \| `(d: any) => Primitive[]` |        |
| channel | 指定生成权重数组的通道                      | `string`                              | `y`    |
| reducer | 聚合每一组权重的函数                        | `Reducer`                             | `sum`  |

```ts
type Primitive = number | string | boolean | Date;

type Reducer = 'sum' | ((I: number[], V: Primitive[]) => Primitive);
```
