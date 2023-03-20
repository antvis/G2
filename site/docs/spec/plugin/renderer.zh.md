---
title: renderer
order: 1
---

G2 底层基于 AntV [G](https://github.com/antvis/g) 来进行渲染，所以在渲染器能力上继承 G 的能力，目前支持了 Canvas、SVG、WebGL 三大 Web 标准，其中 Canvas 渲染器作为 G2 内置默认的渲染器。更多渲染器可以看 [G 文档](https://g.antv.antgroup.com/api/renderer/intro)。

## 开始使用

```ts
import { Chart } from '@antv/g2';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';

const chart = new Chart({
  container: 'container',
  // 或者选择 WebGLRenderer 渲染器，不设置默认为 CanvasRenderer.
  renderer: new SVGRenderer(),
});
```

当然使用之前，是先使用 npm 或者 yarn 等包管理工具安装他们，当前为了 G2 整体包大小，所以仅仅内置 Canvas 渲染器。具体案例可以参考 [渲染器](https://g2.antv.antgroup.com/examples#plugin-renderer)。

## 选项

G 渲染器的使用都是使用：

> new Renderer({ /* options */ });

分三个渲染器分别介绍创建他们的配置项。

### Canvas 渲染器

| 属性               | 描述                                           | 类型                 | 默认值      |
|-------------------|------------------------------------------------|---------------------|------------|
| enableDirtyRectangleRendering         | 是否开启“脏矩形”渲染          | `boolean`           | `true`     |
| enableDirtyRectangleRenderingDebug    | 是否开启“脏矩形”渲染调试模式   | `boolean`           | `false`     |

### SVG 渲染器

| 属性               | 描述                                           | 类型                 | 默认值      |
|-------------------|------------------------------------------------|---------------------|------------|
| outputSVGElementId      | 生成 SVGElement 时是否添加 id 属性          | `boolean`           | `true`     |

### WebGL 渲染器

| 属性               | 描述                                           | 类型                 | 默认值      |
|-------------------|------------------------------------------------|---------------------|------------|
| targets           | 选择渲染环境，并按顺序自动降级                      | `string[]`         | `['webgl2', 'webgl1']`     |
