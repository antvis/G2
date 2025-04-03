---
title: shape
order: 24
---

## 概述

形状图（ `shape` ）图形标记是 G2 中一种特殊的 `Mark` 类型，通常用来在图表上绘制静态的自定义图形，具有较高的灵活性和自由度，`shape` 标记可以用于添加自定义注解、水印、徽章等场景，是实现图表个性化的重要工具。在使用 `shape` 绘制图形时，可以从图表上下文中获取 [document](https://g.antv.antgroup.com/api/builtin-objects/document) 对象，随后使用 [document.createElement](https://g.antv.antgroup.com/api/builtin-objects/document#createelement) 创建完成注册的图形。更复杂的场景，开发者可能需要了解 [G 自定义图形](https://g.antv.antgroup.com/guide/advanced-topics/custom-element) 的相关概念。

例如，有时需要在图表中的特定数据点添加标记来突出重要信息。以下示例展示了如何使用 `shape` 标记在折线图的关键点上添加自定义注解，我们通过创建基础图形 [Circle](https://g.antv.antgroup.com/api/basic/circle) 和基础图形 [Text](https://g.antv.antgroup.com/api/basic/text)，结合 [场景图](https://g.antv.antgroup.com/api/canvas/scenegraph-lifecycle) 能力实现了一个自定义注解。

```js | ob { pin: false }
(() => {
  const chart = new G2.Chart();

  const notes = (style, context) => {
    const { x, y } = style;
    const { document } = context;
    const g = document.createElement('g', {});
    const c1 = document.createElement('circle', {
      style: {
        cx: x,
        cy: y,
        r: 3,
        fill: 'red',
      },
    });
    const c2 = document.createElement('circle', {
      style: {
        cx: x,
        cy: y,
        r: 5,
        lineWidth: 8,
        stroke: 'red',
        opacity: 0.3,
      },
    });
    const text = document.createElement('text', {
      style: {
        x: x + 12,
        y,
        text: '最高降雨量',
        fontSize: 12,
        textAlign: 'left',
        textBaseline: 'middle',
      },
    });
    g.appendChild(c1);
    g.appendChild(c2);
    g.appendChild(text);
    return g;
  };

  chart.options({
    type: 'view',
    autoFit: true,
    children: [
      {
        type: 'line',
        data: [
          { month: 'Jan.', rainfall: 18.9 },
          { month: 'Feb.', rainfall: 28.8 },
          { month: 'Mar.', rainfall: 39.3 },
          { month: 'Apr.', rainfall: 81.4 },
          { month: 'May', rainfall: 47 },
          { month: 'Jun.', rainfall: 20.3 },
        ],
        encode: {
          x: 'month',
          y: 'rainfall',
        },
      },
      {
        type: 'shape',
        data: [{ month: 'Apr.', rainfall: 81.4 }],
        encode: {
          x: 'month',
          y: 'rainfall',
        },
        style: {
          render: (style, context) => notes(style, context),
        },
      },
    ],
  });

  chart.render();

  return chart.getContainer();
})();
```

更多的案例，可以查看[图形标注 - 徽章水印](/examples/annotation/shape#watermark)页面。

## 配置项

| 属性   | 描述                                                                            | 类型              | 默认值 | 必选 |
| ------ | ------------------------------------------------------------------------------- | ----------------- | ------ | ---- |
| encode | 配置 `shape` 标记的视觉通道，包括`x`、`y`，用于指定视觉元素属性和数据之间的关系 | [encode](#encode) | -      |      |
| style  | 配置 `shape` 标记的图形样式，包括`x`、`y`、`render`等                           | [style](#style)   | -      | ✓    |

### encode

配置 `shape` 标记的视觉通道，包括 `x`、`y`，用于指定视觉元素属性和数据之间的关系。
| 属性 | 描述 | 类型 | 默认值 | 必选 |
| ----- | --------------------------- | --------------- | ------ | ---- |
| x | 绑定 `shape` 标记的 `x` 属性通道，一般是 `data` 中的数值或字符，用于设置标记的 `x` 位置 | [encode](/manual/core/encode) | - | 若 [style](#style) 中未配置，则为 ✓ |
| y | 绑定 `shape` 标记的 `y` 属性通道，一般是 `data` 中的数值或字符，用于设置标记的 `y` 位置 | [encode](/manual/core/encode) | - | 若 [style](#style) 中未配置，则为 ✓ |

### style

配置 `shape` 标记的图形样式。
| 属性 | 描述 | 类型 | 默认值 | 必选 |
| ----- | --------------------------- | --------------- | ------ | ---- |
| x | 统一设置 `shape` 标记的 x 位置（相对定位的百分比 \| 绝对定位的像素值），优先级最高 | (string \| number) | - | 若 [encode](#encode) 中未配置，则为 ✓ |
| y | 统一设置 `shape` 标记的 y 位置（相对定位的百分比 \| 绝对定位的像素值），优先级最高 | (string \| number) | - | 若 [encode](#encode) 中未配置，则为 ✓ |
| render | 自定义图形渲染函数，接收样式 style 和 上下文 context 参数，返回 G 的 DisplayObject | (style, context) => DisplayObject | - | ✓ |
| { ...rest } | 自定义图形的额外参数，都会作为 `render` 函数的 style 参数 | `object` | - | |

## 示例

### 水印

在图表中添加水印可以保护数据的安全性和知识产权。以下示例展示了如何使用 `shape` 标记在图表上添加水印。

```js | ob { pin: false }
(() => {
  const chart = new G2.Chart();

  // 定义水印渲染方法
  const watermark = (style, context) => {
    const { document, canvas } = context;
    const { width, height } = canvas.context.config;
    const g = document.createElement('g', {});
    // 创建重复的水印文字
    const spacing = 120; // 水印间距
    for (let x = 0; x < width; x += spacing) {
      for (let y = 0; y < height; y += spacing) {
        const text = document.createElement('text', {
          style: {
            x: x,
            y: y,
            text: 'AntV G2',
            transformOrigin: 'center',
            transform: 'rotate(-30)',
            fontSize: 16,
            fill: '#000',
            textAlign: 'center',
            textBaseline: 'middle',
            fillOpacity: 0.2,
          },
        });
        g.appendChild(text);
      }
    }
    return g;
  };

  chart.options({
    type: 'view',
    autoFit: true,
    children: [
      // 创建饼图
      {
        type: 'interval',
        zIndex: 2,
        data: [
          { item: '分类一', count: 40 },
          { item: '分类二', count: 21 },
          { item: '分类三', count: 17 },
          { item: '分类四', count: 13 },
          { item: '分类五', count: 9 },
        ],
        encode: { y: 'count', color: 'item' },
        transform: [{ type: 'stackY' }],
        coordinate: {
          type: 'theta',
          outerRadius: 0.8,
        },
      },
      // 添加全图水印
      {
        type: 'shape',
        zIndex: 1,
        style: {
          x: 0,
          y: 0,
          render: (style, context) => watermark(style, context),
        },
      },
    ],
  });

  chart.render();

  return chart.getContainer();
})();
```
