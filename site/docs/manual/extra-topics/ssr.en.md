---
title: Server-side rendering（SSR）
order: 12
---

Server-side rendering (SSR) refers to rendering charts in non-browser environments, such as Node.js, Python, Java, PHP, and other backend languages. Typically, in backend environments, the output is a static image without interaction or animation. The typical usage scenarios are as follows:

* Pre-rendering images on the backend to improve page load speed.
* Script batch processing for easy distribution.
* Server-side visualization service.
* Generate images for screenshot comparisons, used in code unit testing.
* ...

## Used in NodeJS

In the Node.js ecosystem, the following libraries implement common rendering APIs found in the browser environment:

- [Node-canvas](https://github.com/Automattic/node-canvas) it provides an implementation of the Canvas2D API based on Cairo.
- [JSdom](https://github.com/jsdom/jsdom) it offers an implementation of the DOM API.

By creating corresponding renderers based on those, G2 can render PNG or SVG results. Below, we will introduce example code for both implementations separately.

### jsdom

[online example](https://stackblitz.com/edit/stackblitz-starters-6zfeng?file=index.js)

First, use JSDOM to create a container `container` where the chart will be rendered. Additionally, save the `window` and `document` objects for later use:

```js
const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>`);
const { document } = window;
const container = document.createElement('div');
```

Then, create a SVG renderer, remove plugins that depend on the DOM API, and create a canvas:

```js
const { Canvas } = require('@antv/g');
const { Renderer } = require('@antv/g-svg');

const renderer = new Renderer();
const htmlRendererPlugin = renderer.getPlugin('html-renderer');
renderer.unregisterPlugin(htmlRendererPlugin);
const domInteractionPlugin = renderer.getPlugin('dom-interaction');
renderer.unregisterPlugin(domInteractionPlugin);

const gCanvas = new Canvas({
  renderer,
  width,
  height,
  container, // use container created in last step
  document,
  offscreenCanvas: offscreenNodeCanvas,
  requestAnimationFrame: window.requestAnimationFrame,
  cancelAnimationFrame: window.cancelAnimationFrame,
});
```

Then, proceed to create a G2 Chart as usual by providing the previously created canvas and container. For more details, refer to the documentation under [quick start](/manual/quick-start)：

```js
const { Chart } = require('@antv/g2');

const chart = new Chart({
  width,
  height,
  canvas: gCanvas,
  container,
});
```

Finally, render the chart, retrieve the rendering result from JSDOM, serialize it into an SVG string. Afterwards, you can choose to save it as a local file. In this example code, the result is directly output to the console.

```js
const xmlserializer = require('xmlserializer');

(async () => {
  await chart.render();

  const svg = xmlserializer.serializeToString(container.childNodes[0]);
  console.log(svg); // '<svg>...</svg>

  chart.destroy();
})();
```

It is worth mentioning that currently, in G2's integration testing, due to SVG's excellent cross-platform compatibility, we also apply this technology for [screenshot comparisons](https://github.com/antvis/G2/tree/v5/__tests__/integration/snapshots/static).

### node-canvas

[online example](https://stackblitz.com/edit/stackblitz-starters-evrvef?file=index.js)

The solution based on jsdom can only generate SVG. If you want to generate images in formats like PNG, you can use [node-canvas](https://github.com/Automattic/node-canvas).

Firstly, create two node-canvases, one for rendering the scene and the other for measuring text width:

```ts
const { createCanvas } = require('canvas');
const nodeCanvas = createCanvas(width, height);
const offscreenNodeCanvas = createCanvas(1, 1);
```

Then create a canvas renderer and canvas:

```ts
import { Canvas } from '@antv/g';
import { Renderer } from '@antv/g-canvas';

const renderer = new Renderer();
// Omitting the removal of DOM-related plugin code.
const gCanvas = new Canvas({
  width,
  height,
  canvas: nodeCanvas,
  renderer,
  offscreenCanvas: offscreenNodeCanvas,
});
```

Next, create a G2 Chart as usual and render it. After completion, use the [createPNGStream](https://github.com/Automattic/node-canvas#canvascreatepngstream) method provided by node-canvas to create a [ReadableStream](https://nodejs.org/api/stream.html#stream_class_stream_readable) containing the PNG encoding. Similarly, [createJPEGStream](https://github.com/Automattic/node-canvas#canvascreatejpegstream) and [createPDFStream](https://github.com/Automattic/node-canvas#canvascreatepdfstream) are also available for exporting JPEG and PDF, respectively.

```ts
function writePNG(nodeCanvas) {
  return new Promise<string>((resolve, reject) => {
    const f = path.join(os.tmpdir(), `${Math.random()}.png`);
    const out = fs.createWriteStream(f);
    const stream = nodeCanvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', () => resolve(f)).on('error', reject);
  });
}
```

## Use in other server-side locales

Because the code of G2 is written and developed in JavaScript, it cannot be used directly in Python, Java, PHP and other language environments. However, you can install the Node.JS environment in the service and then use the corresponding back-end language command line API to drive the above-mentioned Node.JS code to perform SSR.

Refer to [python calls node js](https://juejin.cn/s/python%20%E8%B0%83%E7%94%A8%20node%20js), other languages ​​are similar.
