---
title: 服务端渲染（SSR）
order: 12
---

服务端渲染（SSR）是指在非浏览器环境渲染出图表，比如在 NodeJs、Python、Java、PHP 等后端语言环境中，一般在后端语言中，最终出来的是一张没有交互和动画的图片。一般使用的场景：

- 后端预渲成图片，提高页面打开的速度
- 脚本批处理，便于传播
- 服务端可视化服务
- 生成图片进行截图对比，用于代码单测
- ...


## 原理

G2 可视化引擎的 SSR 原理很简单。G2 能绘制图表的核心是需要有 `Canvas` 的 API，在浏览器中，有浏览器标准的 Canvas 绘图接口，而在 SSR 中，只需要在对应的语言脚本中提供 Canvas 绘图 API 即可。


## 在 NodeJS 中使用

正常在浏览器中使用 G2 的时候，可以参考文档[开始使用](/manual/introduction/getting-started)。

```js | ob {pin:true}
(() => {
  // 初始化图表实例
  const chart = new G2.Chart();

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
    .encode('y', 'sold');

  chart.render();

  return chart.getContainer();
})();
```

而在 NodeJS 中，只需要在创建 Chart 实例的时候，传入对应的构建 `Canvas` 对象的方法即可。整体代码如下，也可以在 G2 的单测中找到对应的代码：

```ts
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { createCanvas } from 'canvas';
import { Canvas } from '@antv/g';
import { Renderer } from '@antv/g-canvas';
import { Plugin as DragAndDropPlugin } from '@antv/g-plugin-dragndrop';
import { Chart } from '../../../src';

function createNodeGCanvas(width: number, height: number): Canvas {
  // Create a node-canvas instead of HTMLCanvasElement
  const nodeCanvas = createCanvas(width, height);
  // A standalone offscreen canvas for text metrics
  const offscreenNodeCanvas = createCanvas(1, 1);

  // Create a renderer, unregister plugin relative to DOM.
  const renderer = new Renderer();
  // Remove html plugin to ssr.
  const htmlRendererPlugin = renderer.getPlugin('html-renderer');
  renderer.unregisterPlugin(htmlRendererPlugin);
  const domInteractionPlugin = renderer.getPlugin('dom-interaction');
  renderer.unregisterPlugin(domInteractionPlugin);
  renderer.registerPlugin(
    new DragAndDropPlugin({ dragstartDistanceThreshold: 10 }),
  );
  return new Canvas({
    width,
    height,
    // @ts-ignore
    canvas: nodeCanvas,
    renderer,
    // @ts-ignore
    offscreenCanvas: offscreenNodeCanvas,
  });
}

function writePNG(nodeCanvas) {
  return new Promise<string>((resolve, reject) => {
    const f = path.join(os.tmpdir(), `${Math.random()}.png`);
    const out = fs.createWriteStream(f);
    const stream = nodeCanvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', () => resolve(f)).on('error', reject);
  });
}

async function renderG2BySSR() {
  const width = 600;
  const height = 400;

  const gCanvas = createNodeGCanvas(width, height);

  // A tabular data to be visualized.
  const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ];

  // Instantiate a new chart.
  const chart = new Chart({
    width,
    height,
    // Set the g canvas with node-canvas.
    canvas: gCanvas,
    // Set the createCanvas function.
    // @ts-ignore
    createCanvas: () => {
      // The width attribute defaults to 300, and the height attribute defaults to 150.
      // @see https://stackoverflow.com/a/12019582
      return createCanvas(width, height) as unknown as HTMLCanvasElement;
    },
  });

  // Specify visualization.
  chart
    .interval()                   // Create an interval mark and add it to the chart.
    .data(data)                   // Bind data for this mark.
    .encode('x', 'genre')         // Assign genre column to x position channel.
    .encode('y', 'sold')          // Assign sold column to y position channel.
    .encode('color', 'genre');    // Assign genre column to color channel.

  // Render visualization.
  await chart.render();

  return writePNG(chart.getContext().canvas?.getConfig().canvas);
}

await renderG2BySSR();
```

