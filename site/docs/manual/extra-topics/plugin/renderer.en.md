---
title: renderer
order: 1
---

G2 is built on top of AntV [G](https://github.com/antvis/g) for rendering, so it inherits G's rendering capabilities. Currently, it supports three major Web standards: Canvas, SVG, and WebGL, with Canvas renderer being the built-in default renderer for G2. For more renderers, see [G documentation](https://g.antv.antgroup.com/en/api/renderer/intro).

## Getting Started

```ts
import { Chart } from '@antv/g2';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';

const chart = new Chart({
  container: 'container',
  // Or choose WebGLRenderer, defaults to CanvasRenderer if not specified.
  renderer: new SVGRenderer(),
});
```

Of course, before using them, you need to install them first using npm, yarn, or other package managers. For the overall package size of G2, only the Canvas renderer is built-in. For specific examples, refer to [Renderer](https://g2.antv.antgroup.com/en/examples#renderer-renderer).

## Options

All G renderers are used with:

> new Renderer({ /_ options _/ });

Let's introduce the configuration options for creating each of the three renderers.

### Canvas Renderer

| Property                           | Description                                              | Type      | Default |
| ---------------------------------- | -------------------------------------------------------- | --------- | ------- |
| enableDirtyRectangleRendering      | Whether to enable "dirty rectangle" rendering            | `boolean` | `true`  |
| enableDirtyRectangleRenderingDebug | Whether to enable "dirty rectangle" rendering debug mode | `boolean` | `false` |

### SVG Renderer

| Property           | Description                                            | Type      | Default |
| ------------------ | ------------------------------------------------------ | --------- | ------- |
| outputSVGElementId | Whether to add id attribute when generating SVGElement | `boolean` | `true`  |

### WebGL Renderer

| Property | Description                                              | Type       | Default                |
| -------- | -------------------------------------------------------- | ---------- | ---------------------- |
| targets  | Select rendering environment and auto-downgrade in order | `string[]` | `['webgl2', 'webgl1']` |

### UMD Usage

When you need to replace the built-in Canvas renderer, for example, switching to SVG, you need to include a specific version of the G2 UMD file.

[Online Example](https://codepen.io/xiaoiver/pen/zYmpbNJ)

First, include the UMD versions of `@antv/g` and `@antv/g-svg`:

```html
<script src="https://unpkg.com/@antv/g"></script>
<script src="https://unpkg.com/@antv/g-svg"></script>
```

Then include the G2 UMD version that excludes `@antv/g` and `@antv/g-svg`, which we call the lite version:

```html
<script src="https://unpkg.com/@antv/g2@5.0.5/dist/g2-lite.min.js"></script>
```

Find the `Renderer` in the namespace `window.G.SVG` and instantiate it:

```js
const { Chart } = window.G2;

const chart = new Chart({
  container: 'container',
  renderer: new window.G.SVG.Renderer(), // Pass in SVG Renderer
});
```

The lite version is provided mainly for the following considerations:

- After removing `@antv/g` and the built-in `@antv/g-canvas` renderer, it's convenient to replace other renderers on demand without redundant built-in renderers
- When used with other packages that use `@antv/g`, you can share the same core and renderer code, saving overall package size, for example:

```html
<script src="https://unpkg.com/@antv/g"></script>
<script src="https://unpkg.com/@antv/g-svg"></script>
<script src="https://unpkg.com/@antv/g2@5.0.5/dist/g2-lite.min.js"></script>
<script src="https://unpkg.com/@antv/g6-lite"></script>
```
