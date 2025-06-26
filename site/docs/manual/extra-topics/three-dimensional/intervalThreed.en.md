---
title: interval3D
order: 3
---

Mainly used for drawing 3D bar charts.

## Getting Started

First, you need to use [@antv/g-webgl](https://g.antv.antgroup.com/api/renderer/webgl) as the renderer and register the following two plugins:

- [g-plugin-3d](https://g.antv.antgroup.com/plugins/3d) provides geometry, materials, and lighting for 3D scenes
- [g-plugin-control](https://g.antv.antgroup.com/plugins/control) provides camera interaction for 3D scenes

Then set the z channel, scale, and z-axis, and finally add a light source to the scene.

```js | ob { inject: true }
import { Runtime, corelib, extend } from '@antv/g2';
import { threedlib } from '@antv/g2-extension-3d';
import { CameraType } from '@antv/g';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { Plugin as ThreeDPlugin, DirectionalLight } from '@antv/g-plugin-3d';
import { Plugin as ControlPlugin } from '@antv/g-plugin-control';

// Create a WebGL renderer.
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

const data = [];
for (let x = 0; x < 5; ++x) {
  for (let z = 0; z < 5; ++z) {
    data.push({
      x: `x-${x}`,
      z: `z-${z}`,
      y: 10 - x - z,
      color: Math.random() < 0.33 ? 0 : Math.random() < 0.67 ? 1 : 2,
    });
  }
}

chart
  .interval3D()
  .data({
    type: 'inline',
    value: data,
  })
  .encode('x', 'x')
  .encode('y', 'y')
  .encode('z', 'z')
  .encode('color', 'color')
  .encode('shape', 'cube')
  .coordinate({ type: 'cartesian3D' })
  .scale('x', { nice: true })
  .scale('y', { nice: true })
  .scale('z', { nice: true })
  .legend(false)
  .axis('x', { gridLineWidth: 2 })
  .axis('y', { gridLineWidth: 2, titleBillboardRotation: -Math.PI / 2 })
  .axis('z', { gridLineWidth: 2 })
  .style('opacity', 0.7);

chart.render().then(() => {
  const { canvas } = chart.getContext();
  const camera = canvas.getCamera();
  camera.setPerspective(0.1, 5000, 50, 1280 / 960);
  camera.setType(CameraType.ORBITING);
  camera.rotate(-20, -20, 0);

  // Add a directional light into scene.
  const light = new DirectionalLight({
    style: {
      intensity: 2.5,
      fill: 'white',
      direction: [-1, 0, 1],
    },
  });
  canvas.appendChild(light);
});
```

For more examples, you can check the [Chart Examples](/en/examples) page.

## Options

Currently, interval3D has the following built-in shape types:

| Shape    | Description   | Example |
| -------- | ------------- | ------- |
| cube     | Draw cube     |         |
| cylinder | Draw cylinder |         |
| cone     | Draw cone     |         |

### cube

| Property | Description                                                          | Type                           | Default Value |
| -------- | -------------------------------------------------------------------- | ------------------------------ | ------------- |
| fill     | Fill color of the shape                                              | `string` \| `Function<string>` | -             |
| opacity  | Overall opacity of the shape                                         | `number` \| `Function<number>` | -             |
| cursor   | Mouse cursor style. Same as CSS cursor style, defaults to 'default'. | `string` \| `Function<string>` | 'default'     |
