---
title: rough
order: 2
---

Compared to regular square graphics, hand-drawn styles can bring a cute and relaxed feeling.

Many chart libraries based on [rough.js](https://roughjs.com) do exactly this, such as [roughViz.js](https://github.com/jwilber/roughViz), [rough-charts](https://beizhedenglong.github.io/rough-charts), and others.

With out-of-the-box rendering plugins, we can easily switch to hand-drawn styles in G2.

## Getting Started

First install [@antv/g-plugin-rough-canvas-renderer](https://g.antv.antgroup.com/plugins/rough-canvas-renderer):

```bash
npm install @antv/g-plugin-rough-canvas-renderer --save
```

Then add it to the plugin list:

```ts
import { Plugin } from '@antv/g-plugin-rough-canvas-renderer';

const chart = new Chart({
  container: 'container',
  plugins: [new Plugin()],
});
```

Just one line of change is needed to complete the style transformation. In this [example](/en/examples/style/rough/#interval), we specify the `'zigzag'` fill style through `fillStyle`, which resembles continuous scribble strokes:

```ts
chart
  .interval()
  .data([
    { month: 'Jan.', profit: 387264, start: 0, end: 387264 },
    //...
  ])
  .encode('x', 'month')
  .encode('y', ['end', 'start'])
  .encode('color', (d) =>
    d.month === 'Total' ? 'Total' : d.profit > 0 ? 'Increase' : 'Decrease',
  )
  .style('strokeWidth', 2)
  .style('fillStyle', 'zigzag'); // Specify fill style

chart.render();
```

The effect is shown below, you can see that the original fill color has become more lively!
<img alt="rough" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*cYjCSLzqBVAAAAAAAAAAAAAADmJ7AQ/original" alt="sketchy barchart" width="500">

Of course, `fillStyle` has many fill methods. The image below shows all currently supported effects. For more options, see the [@antv/g-plugin-rough-canvas-renderer documentation](https://g.antv.antgroup.com/plugins/rough-canvas-renderer#fillstyle):

<img alt="rough" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*vcwuS6mTGBUAAAAAAAAAAAAADmJ7AQ/original" alt="fillStyle in rough.js" width="500">

Finally, choosing a hand-drawn style font can make the overall style more unified. In the [example](/en/examples/style/rough/#interval) above, we chose `'Gaegu'`. You can refer to [how to load external fonts](https://g.antv.antgroup.com/api/basic/text#%E5%8A%A0%E8%BD%BD%E5%AD%97%E4%BD%93).

## FAQ

### How to use with SVG renderer?

G2 uses [g-canvas](https://g.antv.antgroup.com/api/renderer/canvas) as the default renderer. If you switch to [g-svg](https://g.antv.antgroup.com/api/renderer/svg), there's also a corresponding hand-drawn style plugin available: [@antv/plugin-rough-svg-renderer](https://g.antv.antgroup.com/plugins/rough-svg-renderer), with exactly the same usage.

### Applications in accessibility mode

Using `fillStyle` instead of `fill` can achieve pattern-like effects, making it suitable for accessibility scenarios, such as considering color-blind users and black-and-white printing.

In the [example](/en/examples/style/rough/#radial) below, we set both `fill/stroke` to black and use `fillStyle` as the color attribute:

```ts
chart
  .interval()
  //... omitting data, transform, etc.
  .scale('color', {
    range: [
      'hachure',
      'solid',
      'zigzag',
      'cross-hatch',
      'dots',
      'dashed',
      'zigzag-line',
    ],
  })
  .style('fill', 'black')
  .style('stroke', 'black')
  .style('strokeWidth', '4')
  .style('colorAttribute', 'fillStyle');
```

The effect is shown below:

<img alt="rough" src="https://mdn.alipayobjects.com/mdn/huamei_qa8qxu/afts/img/A*kJuuQ47YUicAAAAAAAAAAAAADmJ7AQ" alt="fillStyle in a11y" width="300">
