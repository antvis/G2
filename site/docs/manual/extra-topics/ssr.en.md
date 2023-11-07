---
title: Server-side rendering（SSR）
order: 12
---

Server-side rendering (SSR) refers to rendering charts in a non-browser environment, such as in back-end language environments such as NodeJs, Python, Java, PHP, etc. Generally, in back-end languages, the final result is a chart without interaction and animation. picture of. General usage scenarios:

* The backend pre-renders images to improve page opening speed.
* Script batch processing for easy dissemination
* Server-side visualization service
* Generate pictures for screenshot comparison and use for code single testing
* ...

## Principle

The SSR principle of the G2 visualization engine is simple. The core of G2's ability to draw charts is that it requires `Canvas` API, in the browser, there is the browser standard Canvas drawing interface, and in SSR, you only need to provide the Canvas drawing API in the corresponding language script.

## Used in NodeJS

When using G2 normally in a browser, you can refer to the documentation [start using](/manual/introduction/getting-started), and in NodeJS, you only need to pass in the corresponding method that build `Canvas` object when creat Chart. The overall code is as follows:

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

You can also find the corresponding code in the unit test directory of G2 [**tests**/unit/ssr/index.spec.ts](https://github.com/antvis/G2/tree/v5/__tests__/unit/ssr/index.spec.ts).

## Use in other server-side locales

Because the code of G2 is written and developed in JavaScript, it cannot be used directly in Python, Java, PHP and other language environments. However, you can install the NodeJS environment in the service and then use the corresponding back-end language command line API to drive the above-mentioned NodeJS code to perform SSR.

Refer to [python calls node js](https://juejin.cn/s/python%20%E8%B0%83%E7%94%A8%20node%20js), other languages ​​are similar.
