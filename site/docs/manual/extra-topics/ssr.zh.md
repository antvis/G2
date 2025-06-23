---
title: 服务端渲染（SSR）
order: 12
---

服务端渲染 SSR（Server Side Render）是相比于客户端渲染 CSR（Client Side Render），就是指在非浏览器环境渲染出图表，比如在 Node.js、Python、Java、PHP 等后端语言环境中，一般在后端语言中，最终出来的是一张没有交互和动画的图片。一般使用的场景如下：

- 后端预渲成图片，提高页面打开的速度
- 脚本批处理，便于传播
- 服务端可视化服务
- 生成图片进行截图对比，用于代码单测
- ...

## 在 Node.js 中使用

前端数据可视化的开源库，都是基于浏览器 DOM Canvas API 去在做封装和绘图，适用于浏览器环境，如果需要在 Node.js 中绘制出图形，那就需要将开源库中的 DOM Canvas 改成 Node Canvas，在 NodeJS 生态中，有 [node-canvas](https://github.com/Automattic/node-canvas) 提供了基于 Cairo 的 Canvas2D API 实现，和浏览器的 Canvas API 保持一致。

所以基于 `node-canvas`，再结合 AntV 的 G2 在 API 设计上支持传入自定义 Canvas 对象，就可以切换成 NodeJS 的绘图引擎，从而实现服务端渲染出图。

## 基于 node-canvas + G2

[在线示例](https://stackblitz.com/edit/stackblitz-starters-evrvef?file=index.js)，基于 jsdom 的方案只能生成 SVG，如果想生成类似 PNG 格式的图片，可以使用 [node-canvas](https://github.com/Automattic/node-canvas) 渲染。

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

## 使用 G2 SSR 开源项目

我们把上面基于 node-canvas 的 SSR 代码，封装成一个直接可用的库： [@antv/g2-ssr](https://github.com/antvis/g2-extensions/blob/master/ssr/README.md)，不用去额外感知复杂的代码，使用方法很简单，如下：

```ts
import { createChart } from '@antv/g2-ssr';

// 创建 Chart 和配置
const chart = await createChart({
  width: 640,
  height: 480,
  imageType: 'png', // or 'jpeg'
  // 其他的配置透传 G2 Spec，可以参考 G2 的配置文档
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
});

// 导出
chart.exportToFile('chart');
// -> chart.png

chart.toBuffer();
// -> get buffer
```

大概会在 `400ms` 左右生成一张可视化图如下，基本和在浏览器端渲染的没有太大区别。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*XqCnTbkpAkQAAAAAAAAAAAAADmJ7AQ/fmt.webp" width="640" alt="example">

## 在 AI MCP 下使用

基于以上的 AntV SSR 服务端出图的能力，我们开源了面向 AI 大模型场景的 MCP：[mcp-server-chart](https://github.com/antvis/mcp-server-chart)，针对大模型的输出，以及用户的意图，就可以生成对应的可视化图表，目前支持了 15+ 中常用的统计图表、关系图。

<img width="640" alt="mcp-server-chart preview" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ZlzKQKoJzsYAAAAAAAAAAAAAemJ7AQ/fmt.webp" />

## 在其他服务端语言环境中使用

因为 G2 的代码是使用 JavaScript 编写和开发，所以无法直接在 Python、Java、PHP 等语言环境中使用，但是可以在服务中安装 Node.js 环境，然后使用对应的后端语言命令行 API 去驱动上述的 Node.js 代码去执行 SSR。

参考《[python 调用 node js](https://juejin.cn/s/python%20%E8%B0%83%E7%94%A8%20node%20js)》，其他语言类似。
