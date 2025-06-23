---
title: line3D
order: 2
---

Primarily used for drawing 3D line charts.

## Getting Started

First, you need to use [@antv/g-webgl](https://g.antv.antgroup.com/api/renderer/webgl) as the renderer and register the following two plugins:

- [g-plugin-3d](https://g.antv.antgroup.com/plugins/3d) provides geometry, materials, and lighting in 3D scenes
- [g-plugin-control](https://g.antv.antgroup.com/plugins/control) provides camera interaction in 3D scenes

Then set up the z channel, scale, and z-axis. There's no need to add light sources to the scene.

```js | ob { inject: true }
import { Runtime, corelib, extend } from '@antv/g2';
import { threedlib } from '@antv/g2-extension-3d';
import { CameraType } from '@antv/g';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { Plugin as ThreeDPlugin } from '@antv/g-plugin-3d';
import { Plugin as ControlPlugin } from '@antv/g-plugin-control';

const renderer = new WebGLRenderer();
renderer.registerPlugin(new ControlPlugin());
renderer.registerPlugin(new ThreeDPlugin());

const Chart = extend(Runtime, {
  ...corelib(),
  ...threedlib(),
});

// Initialize chart instance
const chart = new Chart({
  container: 'container',
  renderer,
  width: 500,
  height: 500,
  depth: 400,
});

const pointCount = 31;
let r;
const data = [];

for (let i = 0; i < pointCount; i++) {
  r = 10 * Math.cos(i / 10);
  data.push({
    x: r * Math.cos(i),
    y: r * Math.sin(i),
    z: i,
  });
}

chart
  .line3D()
  .data(data)
  .encode('x', 'x')
  .encode('y', 'y')
  .encode('z', 'z')
  .encode('size', 4)
  .coordinate({ type: 'cartesian3D' })
  .scale('x', { nice: true })
  .scale('y', { nice: true })
  .scale('z', { nice: true })
  .legend(false)
  .axis('x', { gridLineWidth: 2 })
  .axis('y', { gridLineWidth: 2, titleBillboardRotation: -Math.PI / 2 })
  .axis('z', { gridLineWidth: 2 });

chart.render().then(() => {
  const { canvas } = chart.getContext();
  const camera = canvas.getCamera();
  camera.setPerspective(0.1, 5000, 45, 500 / 500);
  camera.setType(CameraType.ORBITING);
});
```

For more examples, you can check the [Chart Examples](/examples) page.
