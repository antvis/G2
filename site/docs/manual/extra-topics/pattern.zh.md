---
title: 设置纹理
order: 10
---

相比单调的填充色，使用纹理填充能丰富表现力，在无障碍和黑白打印场景下也有不错的应用。为此我们提供了以下三种方式，按使用成本从简到难依次为：

- 使用内置纹理
- 使用 G API 自定义纹理
- 使用其它纹理来源

## 使用内置纹理

我们在 [g-pattern](https://g.antv.antgroup.com/api/css/pattern#g-pattern) 中内置了常见的三种纹理，通过参数可以便捷地调整外观，这也是最简单的一种纹理使用方式：

- [dots](https://g.antv.antgroup.com/api/css/pattern#dots) 由圆点构成
- [lines](https://g.antv.antgroup.com/api/css/pattern#lines) 由直线构成
- [squares](https://g.antv.antgroup.com/api/css/pattern#squares) 由正方形构成

使用方式如下，首先安装依赖：

```bash
$ npm install @antv/g-pattern  --save;
```

然后就可以使用其中的内置纹理了。在该[示例](/zh/examples/style/pattern#lines-pattern)中：

- 我们使用了 [lines](https://g.antv.antgroup.com/api/css/pattern#lines)，设置了背景颜色、透明度、直线颜色以及间距等属性
- 通过 [repetition](https://g.antv.antgroup.com/api/css/pattern#repetition) 指定了平铺方式为水平和垂直方向
- 通过 [transform](https://g.antv.antgroup.com/api/css/pattern#transform) 让纹理顺时针旋转 30 度

```js
import { lines } from '@antv/g-pattern';

chart
  //... 省略其它命令式调用
  .style('fill', (_, idx) => {
    return {
      image: lines({
        backgroundColor: colors[idx],
        backgroundOpacity: 0.65,
        stroke: colors[idx],
        lineWidth: 4,
        spacing: 5,
      }),
      repetition: 'repeat',
      transform: 'rotate(30)',
    };
  });
```

效果如下：

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Pf4HQJPkQxYAAAAAAAAAAAAADmJ7AQ/original" alt="built-in lines pattern" width="400">

更多参数含义及其效果详见 [完整 g-pattern API](https://g.antv.antgroup.com/api/css/pattern#g-pattern)。

## 使用 G API 定义

当上述内置纹理不满足需求时，可以使用 [G API](https://g.antv.antgroup.com/guide/chapter1) 自定义，就像描述场景一样。

在该[示例](/zh/examples/style/pattern/#custom-pattern-with-g-api)中，我们首先从上下文中获取 [document](https://g.antv.antgroup.com/api/builtin-objects/document) 对象，通过 [document.createElement](https://g.antv.antgroup.com/api/builtin-objects/document#createelement) 创建了一个 [Rect](https://g.antv.antgroup.com/api/basic/rect) 和 [Path](https://g.antv.antgroup.com/api/basic/path)，把它们作为纹理来源：

```js
mark.style('fill', ({ value }) => {
  const { document } = chart.getContext().canvas;
  const background = document.createElement('rect', {
    style: {
      width,
      height,
      fill: color,
    },
  });

  const line = document.createElement('path', {
    style: {
      d: `
                M 0 ${-height} L ${width * 2} ${height}
                M ${-width} ${-height} L ${width} ${height}
                M ${-width} 0 L ${width} ${height * 2}`,
      stroke,
      lineWidth: 1,
      strokeOpacity: 0.9,
    },
  });
  background.appendChild(line);

  return {
    image: background,
    repetition: 'repeat',
  };
});
```

效果如下：

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*W33JRoaMGPoAAAAAAAAAAAAADmJ7AQ/original" alt="custom pattern with G API" width="400">

更多用法可参考 [G API](https://g.antv.antgroup.com/api/css/pattern#rect)。

## 使用其它来源

可以参考 [G API](https://g.antv.antgroup.com/api/css/pattern#image)，其它可用的纹理来源包括：

- 图片 URL，例如 `'http://example.png'`
- HTMLImageElement
- HTMLCanvasElement
- HTMLVideoElement

其中图片 URL、HTMLImageElement、HTMLVideoElement 都是静态资源，而 HTMLCanvasElement 可用于程序化生成纹理，效果如下：

<img src="https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*cRmFTItZOtYAAAAAAAAAAAAAARQnAQ" alt="other pattern source" width="400">

在该[示例](/zh/examples/style/pattern/#custom-pattern-with-canvas)中，我们使用了 `HTMLCanvasElement` 配合 [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) 自定义：

```js
// 程序化生成
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');
drawRect(ctx, width, height, color);
drawLinePattern(ctx, stroke, width, height, cross);

// 使用
chart.style('fill', ({ value }) => {
  return { image: canvas, repetition: 'repeat' };
});
```

不难看出，此种程序化生成方式需要使用者对于 [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) 有很深的理解，当然它也拥有最高的自由度。
