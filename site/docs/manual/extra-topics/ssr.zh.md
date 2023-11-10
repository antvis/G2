---
title: 服务端渲染（SSR）
order: 12
---

服务端渲染（SSR）是指在非浏览器环境渲染出图表，比如在 Node.js、Python、Java、PHP 等后端语言环境中，一般在后端语言中，最终出来的是一张没有交互和动画的图片。一般使用的场景如下：

- 后端预渲成图片，提高页面打开的速度
- 脚本批处理，便于传播
- 服务端可视化服务
- 生成图片进行截图对比，用于代码单测
- ...

## 在 Node.js 中使用

在 Node.js 生态中，以下库实现了浏览器环境中常见的渲染 API：

- [node-canvas](https://github.com/Automattic/node-canvas) 提供了基于 Cairo 的 Canvas2D API 实现
- [jsdom](https://github.com/jsdom/jsdom) 提供了 DOM API 实现

基于它们创建对应的渲染器，就可以让 G2 渲染得到 PNG 或者 SVG 结果。下面我们分别介绍基于这两种实现的示例代码。

### jsdom

[在线示例](https://stackblitz.com/edit/stackblitz-starters-6zfeng?file=index.js)

首先使用 JSDOM 创建一个容器 `container`，后续图表将渲染到这里，另外保存 `window` 和 `document` 对象供后续使用：

```js
const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>`);
const { document } = window;
const container = document.createElement('div');
```

然后创建一个 SVG 渲染器，移除掉依赖 DOM API 的插件后创建画布：

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
  container, // 使用上一步创建的容器
  document,
  offscreenCanvas: offscreenNodeCanvas,
  requestAnimationFrame: window.requestAnimationFrame,
  cancelAnimationFrame: window.cancelAnimationFrame,
});
```

接着正常创建 G2 Chart，传入之前创建的画布和容器，详见参考文档[开始使用](/manual/introduction/getting-started)：

```js
const { Chart } = require('@antv/g2');

const chart = new Chart({
  width,
  height,
  canvas: gCanvas,
  container,
});
```

最后渲染图表，从 JSDOM 中获取渲染结果并序列化成 SVG 字符串，随后可以选择保存成本地文件，这里示例代码就直接输出到控制台了：

```js
const xmlserializer = require('xmlserializer');

(async () => {
  await chart.render();

  const svg = xmlserializer.serializeToString(container.childNodes[0]);
  console.log(svg); // '<svg>...</svg>

  chart.destroy();
})();
```

值得一提的是目前在 G2 的集成测试中，由于 SVG 具有良好的跨平台兼容性，我们也使用了该技术用于[截图比对](https://github.com/antvis/G2/tree/v5/__tests__/integration/snapshots/static)。

### node-canvas

[在线示例](https://stackblitz.com/edit/stackblitz-starters-evrvef?file=index.js)

基于 jsdom 的方案只能生成 SVG，如果想生成类似 PNG 格式的图片，可以使用 [node-canvas](https://github.com/Automattic/node-canvas) 渲染。

首先创建两个 node-canvas，分别用于渲染场景和度量文本宽度：

```ts
const { createCanvas } = require('canvas');
const nodeCanvas = createCanvas(width, height);
const offscreenNodeCanvas = createCanvas(1, 1);
```

然后创建一个 Canvas 渲染器和画布：

```ts
import { Canvas } from '@antv/g';
import { Renderer } from '@antv/g-canvas';

const renderer = new Renderer();
// 省略移除 DOM 相关插件代码
const gCanvas = new Canvas({
  width,
  height,
  canvas: nodeCanvas,
  renderer,
  offscreenCanvas: offscreenNodeCanvas,
});
```

接下来正常创建 G2 Chart 并渲染，完成后调用 node-canvas 提供的 [createPNGStream](https://github.com/Automattic/node-canvas#canvascreatepngstream) 方法创建一个包含 PNG 编码的 [ReadableStream](https://nodejs.org/api/stream.html#stream_class_stream_readable)。同样也提供了 [createJPEGStream](https://github.com/Automattic/node-canvas#canvascreatejpegstream) 和 [createPDFStream](https://github.com/Automattic/node-canvas#canvascreatepdfstream) 导出 JPEG 和 PDF。

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

## 在其他服务端语言环境中使用

因为 G2 的代码是使用 JavaScript 编写和开发，所以无法直接在 Python、Java、PHP 等语言环境中使用，但是可以在服务中安装 Node.js 环境，然后使用对应的后端语言命令行 API 去驱动上述的 Node.js 代码去执行 SSR。

参考《[python 调用 node js](https://juejin.cn/s/python%20%E8%B0%83%E7%94%A8%20node%20js)》，其他语言类似。
