---
title: 自定义
order: 8
---

G2 中所有的组件都可以自定义，目前只暴露了自定义图形形状的能力。

## 定义组件

```js
import { Polygon } from '@antv/g';

// Triangle
export function Triangle({ document }) {
  return (P, value, coordinate, theme) => {
    // 找到颜色
    const { defaultColor } = theme;
    const { color = defaultColor } = value;

    // 计算三角形的点
    const [p0, p1, p2, p3] = P;
    const pm = [(p0[0] + p1[0]) / 2, p0[1]];

    // 返回 polygon
    return new Polygon({
      style: {
        ...style,
        fill: color,
        points: [pm, p2, p3],
      },
    });
  };
}
```

## 内联使用

第一种是在代码中直接这个函数。

```js
import { Triangle } from './triangle';
import { Chart } from '@antv/g2';

// ...

chart
  .interval()
  .data([
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ])
  .encode('x', 'genre')
  .encode('y', 'sold')
  .style('shape', Triangle); // 直接使用
```

## 注册使用

第一种是通过组册的方式使用。

```js
import { Triangle } from './triangle';
import { Chart, register } from '@antv/g2';

register('shape.triangle', Triangle);

//...

chart
  .interval()
  .data([
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ])
  .encode('x', 'genre')
  .encode('y', 'sold')
  .style('shape', 'triangle'); // 通过注册的名字使用
```
