---
title: liquid
order: 1
---

水波图

## 开始使用

<img alt="liquid" src="https://mdn.alipayobjects.com/huamei_za7we3/afts/img/A*cHArRaizyBsAAAAAAAAAAAAADo2bAQ/original
" width="600" />

```js
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .liquid()
  .data({
    value: {
      percent: .3,
    },
  })
  .style({
    outline: {
      border: 4,
      distance: 8,
    },
    wave: {
      length: 128,
    },
  });

chart.render();
```

## 选项

| 属性  | 描述                   | 类型        | 默认值 |
| ----- | ---------------------- | ----------- | ------ |
| data  | 数据                   | `GaugeData` | -      |
| style | 配置图形样式和标签样式 | -           | -      |

## data

| 属性    | 描述   | 类型     | 默认值 |
| ------- | ------ | -------- | ------ |
| percent | 百分比 | `number` | -      |


## style

对水波图中的三个部分

- `outline`: 边框已经间距的样式, `border` 外边框宽，`distance` 内空白间距。
- `wave`: 水波的样式, `length` 波长。
- `textStyle`: 文本样式。
- `shapeStyle`: 形状背景样式
- `shape`: 形状配置。

## shape

目前 liquid 有以下几个内置 shape 图形，默认为 `circle`。

| 图形     | 描述 | 示例 |
| -------- | ---- | ---- |
| rect     | 矩形 |      |
| circle   | 圆形 |      |
| pin      | 水滴 |      |
| triangle | 三角 |      |

为自定义 shape 形状提供回调, `(x, y, r, w, h) => string`, 传入参数分别为 x y 中心点坐标， r 图表可画圆最大半径， w h 图表可画宽高。
