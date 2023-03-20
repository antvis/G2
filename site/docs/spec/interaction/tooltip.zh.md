---
title: tooltip
---

展示提示信息。

## 开始使用

<img alt="example" src="https://gw.alipayobjects.com/zos/raptor/1669041818314/tooltip1d.gif" width="640">

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  })
  .encode('x', 'letter')
  .encode('y', 'frequency')
  .axis('y', { labelFormatter: '.0%' });

chart.interaction('tooltip');

chart.render();
```

## 选项

| 属性                      | 描述                                                                                                              | 类型               | 默认值 |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------ | ------ |
| wait                      | 提示信息更新的时间间隔，单位为毫秒                                                                                | `number`           | 50     |
| leading                   | 是否在时间间隔开始的时候更新提示信息                                                                              | `boolean`          | true   |
| trailing                  | 是否在时间间隔结束的时候更新提示信息                                                                              | `boolean`          | false  |
| shared                    | 相同 x 的元素是否共享 tooltip                                                                                     | `boolean`          | false  |
| series                    | 是否是系列元素的 tooltip                                                                                          | `boolean`          | -      |
| crosshairs            | 是否暂时指示线                                                                                                    | `boolean`          | -      |
| `crosshairs${StyleAttrs}` | 指示线的样式                                                                                                      | `number \| string` | -      |
| item                      | 自定义 tooltip 的维度信息，参考这个[例子](https://g2.antv.antgroup.com/examples/interaction/interaction/#tooltip-custom) | `Function`         | -      |
