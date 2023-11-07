---
title: Set pattern
order: 10
---

Compared with monotonous fill colors, using pattern fills can enrich expressiveness and is also useful in accessibility and black-and-white printing scenarios. To this end, we provide the following three methods, in order from easiest to most difficult in terms of cost:

* Use built-in patterns
* Custom pattern using the G API
* Use other pattern sources

## Use built-in patterns

We have built-in three common pattern in [g-pattern](https://g.antv.antgroup.com/api/css/pattern#g-pattern), and the appearance can be easily adjusted through parameters. This is also the simplest way to use pattern:

* [dots](https://g.antv.antgroup.com/api/css/pattern#dots) Made of dots
* [lines](https://g.antv.antgroup.com/api/css/pattern#lines) Made of straight lines
* [squares](https://g.antv.antgroup.com/api/css/pattern#squares) Made of squares

The usage is as follows, first install the dependencies:

```bash
$ npm install @antv/g-pattern  --save;
```

Then you can use the built-in pattern. In this [Example](/zh/examples/theme/pattern#lines-pattern):

* we used [lines](https://g.antv.antgroup.com/api/css/pattern#lines), set attributes such as background color, transparency, line color, and spacing.
* Through [repetition](https://g.antv.antgroup.com/api/css/pattern#repetition), the tiling mode is specified as horizontal and vertical directions
* Through [transform](https://g.antv.antgroup.com/api/css/pattern#transform), the pattern is rotated 30 degrees clockwise

```js
import { lines } from '@antv/g-pattern';

chart
  //... Omit other imperative calls
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

The effect is as follows:

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Pf4HQJPkQxYAAAAAAAAAAAAADmJ7AQ/original" alt="built-in lines pattern" width="400">

For more detailed parameter meanings and effects, see [Complete g-pattern API](https://g.antv.antgroup.com/api/css/pattern#g-pattern)。

## Definition using G API

When the above built-in pattern do not meet the needs, you can use [G API](https://g.antv.antgroup.com/guide/chapter1) to customize, just like describing the scene.

In this [Example](/zh/examples/theme/pattern/#custom-pattern-with-g-api), we first get [document](https://g.antv.antgroup.com/api/builtin-objects/document) object from context, create a [Rect](https://g.antv.antgroup.com/api/basic/rect) and a [Path](https://g.antv.antgroup.com/api/basic/path) by [document.createElement](https://g.antv.antgroup.com/api/builtin-objects/document#createelement), and using them as pattern sources:

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

The effect is as follows:

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*W33JRoaMGPoAAAAAAAAAAAAADmJ7AQ/original" alt="custom pattern with G API" width="400">

For more usage, please refer to [G API](https://g.antv.antgroup.com/api/css/pattern#rect)。

## Use other sources

Refer to [G API](https://g.antv.antgroup.com/api/css/pattern#image), other available pattern sources include:

* Image URL, e.g.`'http://example.png'`
* HTMLImageElement
* HTMLCanvasElement
* HTMLVideoElement

Among them, image URL, HTMLImageElement, and HTMLVideoElement are all static resources, while HTMLCanvasElement can be used to programmatically generate patterns. The effect is as follows:

<img src="https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*cRmFTItZOtYAAAAAAAAAAAAAARQnAQ" alt="other pattern source" width="400">

In this [Example](/zh/examples/theme/pattern/#custom-pattern-with-canvas), we used `HTMLCanvasElement` with [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) to customize:

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

It is not difficult to see that this programmatic generation method requires the user has deep understanding about [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API), but of course it also has the highest degree of freedom.
