---
title: rough
order: 1
---

相比方方正正的常规图形，手绘风格能带给人可爱轻松之感。

有不少基于 [rough.js](https://roughjs.com) 的图表库就是这么做的，例如 [roughViz.js](https://github.com/jwilber/roughViz)、[rough-charts](https://beizhedenglong.github.io/rough-charts) 等。

借助开箱即用的渲染插件，在 G2 中我们也能轻松完成手绘风格的切换。

## 开始使用

首先安装 [@antv/g-plugin-rough-canvas-renderer](https://g.antv.antgroup.com/plugins/rough-canvas-renderer)：

```bash
npm install @antv/g-plugin-rough-canvas-renderer --save
```

然后在插件列表中引入：

```ts
import { Plugin } from '@antv/g-plugin-rough-canvas-renderer';

const chart = new Chart({
  container: 'container',
  plugins: [new Plugin()],
});
```

仅需要一行改动即可完成风格转换。在该[示例](/examples/style/rough/#interval)中，我们通过 `fillStyle` 指定了 `'zigzag'` 这种类似连续涂鸦笔迹的填充风格：

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
  .style('fillStyle', 'zigzag'); // 指定填充风格

chart.render();
```

效果如下，可以看到原本的填充色活泼了起来！
<img alt="rough" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*cYjCSLzqBVAAAAAAAAAAAAAADmJ7AQ/original" alt="sketchy barchart" width="500">

当然 `fillStyle` 还有很多填充方式，下图展示了目前支持的所有效果。更多选项详见 [@antv/g-plugin-rough-canvas-renderer 文档](https://g.antv.antgroup.com/plugins/rough-canvas-renderer#fillstyle)：

<img alt="rough" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*vcwuS6mTGBUAAAAAAAAAAAAADmJ7AQ/original" alt="fillStyle in rough.js" width="500">

最后，选择一款手绘风格的字体能让整体风格趋于统一。在上面的[示例](/examples/style/rough/#interval)中我们选择了 `'Gaegu'`，可以参考[如何加载外部字体](https://g.antv.antgroup.com/api/basic/text#%E5%8A%A0%E8%BD%BD%E5%AD%97%E4%BD%93)。

## FAQ

### 在 SVG 渲染器如何使用？

G2 使用 [g-canvas](https://g.antv.antgroup.com/api/renderer/canvas) 作为默认渲染器。如果切换到 [g-svg](https://g.antv.antgroup.com/api/renderer/svg)，也有对应的手绘风格插件可以选择：[@antv/plugin-rough-svg-renderer](https://g.antv.antgroup.com/plugins/rough-svg-renderer)，使用方式完全一致。

### 无障碍模式下的应用

使用 `fillStyle` 代替 `fill` 能实现类似 Pattern 的效果，因此在无障碍模式下也有不错的应用场景，例如考虑色弱人士和黑白打印。

在下面的[示例](/zh/examples/style/rough/#radial)中，我们将 `fill/stroke` 都设置和黑色，将 `fillStyle` 作为颜色属性：

```ts
chart
  .interval()
  //... 省略 data, transform 等
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

效果如下：

<img alt="rough" src="https://mdn.alipayobjects.com/mdn/huamei_qa8qxu/afts/img/A*kJuuQ47YUicAAAAAAAAAAAAADmJ7AQ" alt="fillStyle in a11y" width="300">
