---
title: surface3D
order: 4
---

Primarily used for drawing 3D surface charts.

## Getting Started

First, you need to use [@antv/g-webgl](https://g.antv.antgroup.com/api/renderer/webgl) as the renderer and register the following two plugins:

- [g-plugin-3d](https://g.antv.antgroup.com/plugins/3d) provides geometry, materials, and lighting for 3D scenes
- [g-plugin-control](https://g.antv.antgroup.com/plugins/control) provides camera interaction for 3D scenes

Then set up the z channel, scale, and z-axis. No need to add light sources to the scene.

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

// We set the width/height to 100;
const size = 100;
const points = [];
for (let i = 0; i <= 2 * size; ++i) {
  const theta = (Math.PI * (i - size)) / size;
  for (let j = 0; j <= 2 * size; ++j) {
    var phi = (Math.PI * (j - size)) / size;

    const x = (10.0 + Math.cos(theta)) * Math.cos(phi);
    const y = (10.0 + Math.cos(theta)) * Math.sin(phi);

    points.push({
      x: i,
      y: j,
      z: Math.sin(theta) * x * y,
    });
  }
}

chart
  .surface3D()
  .data(points)
  .encode('x', 'x')
  .encode('y', 'y')
  .encode('z', 'z')
  .coordinate({ type: 'cartesian3D' })
  .scale('x', { nice: true })
  .scale('y', { nice: true })
  .scale('z', { nice: true })
  .legend(false)
  .axis('x', { gridLineWidth: 1 })
  .axis('y', { gridLineWidth: 1, titleBillboardRotation: -Math.PI / 2 })
  .axis('z', { gridLineWidth: 1 });

chart.render().then(() => {
  const { canvas } = chart.getContext();
  const camera = canvas.getCamera();
  camera.setPerspective(0.1, 2000, 45, 500 / 500);
  camera.rotate(30, 30, 0);
  camera.dolly(60);
  camera.setType(CameraType.ORBITING);
});
```

For more examples, please visit the [Examples](/en/examples) page.
