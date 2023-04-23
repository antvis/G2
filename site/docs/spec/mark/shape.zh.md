---
title: shape
order: 1
---

`shape` 是 G2 比较特殊的一个 mark，它通常用来在图表上绘制一个静态的自定义图形，灵活性非常高，当然技术成本也会高一些，需要了解 [G](https://g.antv.antgroup.com/) 的 API 去绘制图形。

## 开始使用

<img alt="shape" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*aIpTRZ-_b9wAAAAAAAAAAAAADmJ7AQ/original" width="600" />

上图中的「数据保密」的徽章图案就是使用 `shape` 绘制。在绘制图形时，可以从图表上下文中获取 [document](https://g.antv.antgroup.com/api/builtin-objects/document) 对象，随后使用 [document.createElement](https://g.antv.antgroup.com/api/builtin-objects/document#createelement) 创建基础图形。在下面的示例中我们创建了一个 [Circle](https://g.antv.antgroup.com/api/basic/circle)。

```ts
import { Chart } from '@antv/g2';

function point(style) {
  const { x, y, fill } = style;

  const {
    canvas: { document },
  } = chart.getContext();

  return document.createElement('circle', {
    style: {
      cx: x,
      cy: y,
      fill,
    },
  });
}

chart.shape().style({
  x: '50%',
  y: '50%',
  fill: 'red',
  render: point,
});

chart.render();
```

可以查看[图表徽章水印](/examples/annotation/shape/#watermark)具体示例。

## 选项

| 属性        | 描述                                                     | 类型                               | 默认值   | -   |
| ----------- | -------------------------------------------------------- | ---------------------------------- | -------- | --- |
| x           | 设置图形的位置 x，支持百分比（`'50%'`）和像素值（`200`） | `number`                           | `string` | -   |
| x           | 设置图形的位置 y，支持百分比（`'50%'`）和像素值（`200`） | `number`                           | `string` | -   |
| render      | 对应的自定义渲染函数，函数需要返回 G 的 DisplayObject    | `(style: object) => DisplayObject` | -        |
| { ...rest } | 自定义图形的额外参数，都会作为 `render` 函数的参数       | `object`                           | -        |
