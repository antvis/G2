---
title: point3D
order: 1
---

Primarily used for drawing 3D scatter plots, utilizing point granularity to analyze data distribution.

## Getting Started

First, you need to use [@antv/g-webgl](https://g.antv.antgroup.com/api/renderer/webgl) as the renderer and register the following two plugins:

- [g-plugin-3d](https://g.antv.antgroup.com/plugins/3d) provides geometry, materials, and lighting for 3D scenes
- [g-plugin-control](https://g.antv.antgroup.com/plugins/control) provides camera interactions for 3D scenes

Then set the z channel, scale, and z-axis, and finally add light sources to the scene.

```js | ob { inject: true }
import { Runtime, corelib, extend } from '@antv/g2';
import { threedlib } from '@antv/g2-extension-3d';
import { CameraType } from '@antv/g';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { Plugin as ThreeDPlugin, DirectionalLight } from '@antv/g-plugin-3d';
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

chart
  .point3D()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/2c813e2d-2276-40b9-a9af-cf0a0fb7e942.csv',
  })
  .encode('x', 'Horsepower')
  .encode('y', 'Miles_per_Gallon')
  .encode('z', 'Weight_in_lbs')
  .encode('color', 'Cylinders')
  .encode('shape', 'cube')
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

  // Add a directional light into scene.
  const light = new DirectionalLight({
    style: {
      intensity: 3,
      fill: 'white',
      direction: [-1, 0, 1],
    },
  });
  canvas.appendChild(light);
});
```

For more examples, you can visit the [Examples](/en/examples) page.

## Options

Currently, point3D has the following built-in shape graphics, including 3D and 2D:

| Shape              | Description                   | Example |
| ------------------ | ----------------------------- | ------- |
| cube               | Draw cube                     |         |
| sphere             | Draw sphere                   |         |
| hollow             | Draw hollow circle            |         |
| hollowDiamond      | Draw hollow diamond           |         |
| hollowHexagon      | Draw hollow hexagon           |         |
| hollowSquare       | Draw hollow square            |         |
| hollowTriangleDown | Draw hollow downward triangle |         |
| hollowTriangle     | Draw hollow triangle          |         |
| hollowBowtie       | Draw hollow bowtie            |         |
| point              | Draw circle                   |         |
| plus               | Draw plus sign                |         |
| diamond            | Draw diamond                  |         |
| square             | Draw square                   |         |
| triangle           | Draw triangle                 |         |
| triangleDown       | Draw downward triangle        |         |
| hexagon            | Draw hexagon                  |         |
| cross              | Draw cross symbol             |         |
| bowtie             | Draw bowtie                   |         |
| hyphen             | Draw hyphen                   |         |
| line               | Draw vertical line            |         |
| tick               | Draw tick                     |         |

Using sphere shape effect as shown below:

```js | ob {  pin: false , inject: true }
import { Runtime, corelib, extend } from '@antv/g2';
import { threedlib } from '@antv/g2-extension-3d';
import { CameraType } from '@antv/g';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { Plugin as ThreeDPlugin, DirectionalLight } from '@antv/g-plugin-3d';
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

chart
  .point3D()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/2c813e2d-2276-40b9-a9af-cf0a0fb7e942.csv',
  })
  .encode('x', 'Horsepower')
  .encode('y', 'Miles_per_Gallon')
  .encode('z', 'Weight_in_lbs')
  .encode('color', 'Cylinders')
  .encode('shape', 'sphere')
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

  // Add a directional light into scene.
  const light = new DirectionalLight({
    style: {
      intensity: 3,
      fill: 'white',
      direction: [-1, 0, 1],
    },
  });
  canvas.appendChild(light);
});
```

When using 2D shapes, no light source is needed:

```js | ob {  pin: false , inject: true }
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

chart
  .point3D()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/2c813e2d-2276-40b9-a9af-cf0a0fb7e942.csv',
  })
  .encode('x', 'Horsepower')
  .encode('y', 'Miles_per_Gallon')
  .encode('z', 'Weight_in_lbs')
  .encode('color', 'Cylinders')
  .encode('shape', 'triangle')
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

### 3D Shapes

| Property | Description                                                | Type                           | Default Value |
| -------- | ---------------------------------------------------------- | ------------------------------ | ------------- |
| fill     | Fill color of the shape                                    | `string` \| `Function<string>` | -             |
| opacity  | Overall opacity of the shape                               | `number` \| `Function<number>` | -             |
| cursor   | Mouse cursor style. Same as CSS cursor, default 'default'. | `string` \| `Function<string>` | 'default'     |

Other point3D shape configuration options are consistent with `cube`.

### 2D Shapes

| Property      | Description                                                                                                                                                                           | Type                                              | Default Value |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ------------- |
| fill          | Fill color of the shape                                                                                                                                                               | `string` \| `Function<string>`                    | -             |
| fillOpacity   | Fill opacity of the shape                                                                                                                                                             | `number` \| `Function<number>`                    | -             |
| stroke        | Stroke color of the shape                                                                                                                                                             | `string` \| `Function<string>`                    | -             |
| strokeOpacity | Stroke opacity                                                                                                                                                                        | `number` \| `Function<number>`                    | -             |
| lineWidth     | Width of the shape stroke                                                                                                                                                             | `number` \| `Function<number>`                    | -             |
| lineDash      | Dashed line configuration for stroke. First value is the length of each dash segment, second value is the distance between segments. Setting lineDash to [0, 0] results in no stroke. | `[number,number]` \| `Function<[number, number]>` | -             |
| opacity       | Overall opacity of the shape                                                                                                                                                          | `number` \| `Function<number>`                    | -             |
| shadowColor   | Shadow color of the shape                                                                                                                                                             | `string` \| `Function<string>`                    | -             |
| shadowBlur    | Gaussian blur coefficient for the shape shadow                                                                                                                                        | `number` \| `Function<number>`                    | -             |
| shadowOffsetX | Horizontal distance of shadow from the shape                                                                                                                                          | `number` \| `Function<number>`                    | -             |
| shadowOffsetY | Vertical distance of shadow from the shape                                                                                                                                            | `number` \| `Function<number>`                    | -             |
| cursor        | Mouse cursor style. Same as CSS cursor, default 'default'.                                                                                                                            | `string` \| `Function<string>`                    | 'default'     |
