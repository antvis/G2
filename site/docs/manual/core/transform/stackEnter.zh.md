---
title: stackEnter
order: 1
---

对 enterDuration 和 enterDelay 通道进行堆叠，实现分组动画的效果。

## 开始使用

<img alt="stackEnter" src="https://gw.alipayobjects.com/zos/raptor/1668659773138/stackenter.gif" width="600" />

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .interval()
  .data([
    { type: 'Apple', year: '2001', value: 260 },
    { type: 'Orange', year: '2001', value: 100 },
    { type: 'Banana', year: '2001', value: 90 },
    { type: 'Apple', year: '2002', value: 210 },
    { type: 'Orange', year: '2002', value: 150 },
    { type: 'Banana', year: '2002', value: 30 },
  ])
  .transform({ type: 'stackEnter', groupBy: 'x' })
  .encode('x', 'year')
  .encode('y', 'value')
  .encode('color', 'type')
  .encode('series', 'type')
  .encode('enterDuration', 1000);

chart.render();
```

## 选项

| 属性               | 描述                                           | 类型                               | 默认值                 |
|-------------------|------------------------------------------------|-----------------------------------|-----------------------|
| groupBy           | 选择一个分组通道                                  | `string \| string[]`              | `x`                   |
| orderBy           | 排序的通道                                       | `string`                          | `null`                |  
| reverse           | 是否逆序                                         | `boolean`                         | `y`                   |
| duration          | 动画间隔                                         | `number`                          | `3000`                |
| reducer           | 分组取值方式                                     | `(I: number[], V: any[]) => any`   | `(I, V) => V[I[0]]`   |
