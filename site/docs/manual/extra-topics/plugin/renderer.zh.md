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

> new Renderer({ /_ options _/ });

分三个渲染器分别介绍创建他们的配置项。

### Canvas 渲染器

| 属性                               | 描述                         | 类型      | 默认值  |
| ---------------------------------- | ---------------------------- | --------- | ------- |
| enableDirtyRectangleRendering      | 是否开启“脏矩形”渲染         | `boolean` | `true`  |
| enableDirtyRectangleRenderingDebug | 是否开启“脏矩形”渲染调试模式 | `boolean` | `false` |

### SVG 渲染器

| 属性               | 描述                               | 类型      | 默认值 |
| ------------------ | ---------------------------------- | --------- | ------ |
| outputSVGElementId | 生成 SVGElement 时是否添加 id 属性 | `boolean` | `true` |

### WebGL 渲染器

| 属性    | 描述                           | 类型       | 默认值                 |
| ------- | ------------------------------ | ---------- | ---------------------- |
| targets | 选择渲染环境，并按顺序自动降级 | `string[]` | `['webgl2', 'webgl1']` |

### UMD 使用方式

当需要替换掉内置的 Canvas 渲染器，例如改换成 SVG 时，需要引入特定版本的 G2 UMD 文件。

[在线示例](https://codepen.io/xiaoiver/pen/zYmpbNJ)

首先引入 `@antv/g` 和 `@antv/g-svg` 的 UMD 版本：

```html
<script src="https://unpkg.com/@antv/g"></script>
<script src="https://unpkg.com/@antv/g-svg"></script>
```

然后引入剔除了 `@antv/g` 和 `@antv/g-svg` 的 G2 UMD 版本，我们称之为 lite 版：

```html
<script src="https://unpkg.com/@antv/g2@5.0.5/dist/g2-lite.min.js"></script>
```

在命名空间 `window.G.SVG` 下找到 `Renderer` 并实例化：

```js
const { Chart } = window.G2;

const chart = new Chart({
  container: 'container',
  renderer: new window.G.SVG.Renderer(), // 传入 SVG Renderer
});
```

提供 lite 版主要考虑到：

- 剔除了 `@antv/g` 和内置的 `@antv/g-canvas` 渲染器之后，便于按需替换其他渲染器，不会存在冗余的内置渲染器
- 和其他使用 `@antv/g` 的包使用时，可以共享同一份核心和渲染器代码，节省总体的包体积大小，例如：

```html
<script src="https://unpkg.com/@antv/g"></script>
<script src="https://unpkg.com/@antv/g-svg"></script>
<script src="https://unpkg.com/@antv/g2@5.0.5/dist/g2-lite.min.js"></script>
<script src="https://unpkg.com/@antv/g6-lite"></script>
```
