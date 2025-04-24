---
title: Draw 3D Chart
order: 11
---

Taking a 3D scatter plot as an example, creating the chart requires the following steps:

- Create WebGL renderers and plugin.
- Extend threedlib.
- Set z-channel, scale and axes.
- Set up the camera in the scene.
- Add light source.
- Add custom legend.
- Using camera interaction and animation.

## Create WebGL renderers and plugin

First install the dependencies:

```bash
$ npm install @antv/g-webgl @antv/g-plugin-3d @antv/g-plugin-control --save
```

and then use [@antv/g-webgl](https://g.antv.antgroup.com/api/renderer/webgl) as a renderer and register the following two plugins:

- [g-plugin-3d](https://g.antv.antgroup.com/plugins/3d) Provide geometry, materials and lighting in 3D scenes.
- [g-plugin-control](https://g.antv.antgroup.com/plugins/control) Provide camera interaction in 3D scenes.

```ts
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { Plugin as ThreeDPlugin, DirectionalLight } from '@antv/g-plugin-3d';
import { Plugin as ControlPlugin } from '@antv/g-plugin-control';

const renderer = new WebGLRenderer();
renderer.registerPlugin(new ThreeDPlugin());
renderer.registerPlugin(new ControlPlugin());
```

## Extend threedlib

Due to the huge size of 3D-related functional code, we separated it into [threedlib](/manual/extra-topics/bundle#g2threedlib), extend it and customize the Chart object at runtime:

```ts
import { Runtime, corelib, extend } from '@antv/g2';
import { threedlib } from '@antv/g2-extension-3d';

const Chart = extend(Runtime, { ...corelib(), ...threedlib() });
```

## Set z-channel, scale and axes

Using `depth` to specified depth when creating the Chart

```ts
const chart = new Chart({
  container: 'container',
  renderer,
  depth: 400,
});
```

We use [point3D](/manual/extra-topics/three-dimensional/point-threed) mark and select cube as the shape to draw.
Then set the z channel, scale and axes.

```ts
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
  .encode('color', 'Origin')
  .coordinate({ type: 'cartesian3D' })
  .scale('x', { nice: true })
  .scale('y', { nice: true })
  .scale('z', { nice: true })
  .legend(false)
  .axis('x', { gridLineWidth: 2 })
  .axis('y', { gridLineWidth: 2, titleBillboardRotation: -Math.PI / 2 })
  .axis('z', { gridLineWidth: 2 });
```

## Set up camera

In a 3D scene we can use orthographic or perspective projection, and the camera can be get from the Chart context after the first rendering is completed. You can then use the [camera API](https://g.antv.antgroup.com/api/camera/intro) provide by G to complete the settings of projection mode and camera type. In the example below, we use perspective projection,

```ts
chart.render().then(() => {
  const { canvas } = chart.getContext();
  const camera = canvas.getCamera(); // get camera

  camera.setPerspective(0.1, 5000, 45, 500 / 500);
  camera.setType(CameraType.ORBITING);
});
```

The effect is as follows:

```js | ob { pin: false }
(() => {
  const renderer = new gWebgl.Renderer();
  renderer.registerPlugin(new gPluginControl.Plugin());
  renderer.registerPlugin(new gPlugin3d.Plugin());

  const Chart = G2.extend(G2.Runtime, {
    ...G2.corelib(),
    ...g2Extension3d.threedlib(),
  });

  // initialize Chart instance
  const chart = new Chart({
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
    .encode('color', 'Origin')
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
    camera.setType(g.CameraType.ORBITING);

    // Add a directional light into scene.
    const light = new gPlugin3d.DirectionalLight({
      style: {
        intensity: 3,
        fill: 'white',
        direction: [-1, 0, 1],
      },
    });
    canvas.appendChild(light);
  });

  return chart.getContainer();
})();
```

We can also let the camera fix the viewpoint and rotate it at a certain angle. Here we use [rotate](https://g.antv.antgroup.com/api/camera/action#rotate)：

```ts
camera.rotate(-20, -20, 0);
```

```js | ob { pin: false }
(() => {
  const renderer = new gWebgl.Renderer();
  renderer.registerPlugin(new gPluginControl.Plugin());
  renderer.registerPlugin(new gPlugin3d.Plugin());

  const Chart = G2.extend(G2.Runtime, {
    ...G2.corelib(),
    ...g2Extension3d.threedlib(),
  });

  // initialize Chart instance
  const chart = new Chart({
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
    .encode('color', 'Origin')
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
    camera.setType(g.CameraType.ORBITING);
    camera.rotate(-20, -20, 0);

    // Add a directional light into scene.
    const light = new gPlugin3d.DirectionalLight({
      style: {
        intensity: 3,
        fill: 'white',
        direction: [-1, 0, 1],
      },
    });
    canvas.appendChild(light);
  });

  return chart.getContainer();
})();
```

## Add light source

The material needs to match the light source to present a certain "three-dimensional feeling". Here we use what G provides [directional light source](https://g.antv.antgroup.com/api/3d/light)：

```ts
import { DirectionalLight } from '@antv/g-plugin-3d';

const light = new DirectionalLight({
  style: {
    intensity: 3,
    fill: 'white',
    direction: [-1, 0, 1],
  },
});
canvas.appendChild(light);
```

we can use `intensity` to increase the intensity of the light source:

```js | ob { pin: false }
(() => {
  const renderer = new gWebgl.Renderer();
  renderer.registerPlugin(new gPluginControl.Plugin());
  renderer.registerPlugin(new gPlugin3d.Plugin());

  const Chart = G2.extend(G2.Runtime, {
    ...G2.corelib(),
    ...g2Extension3d.threedlib(),
  });

  // initialize Chart instance
  const chart = new Chart({
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
    .encode('color', 'Origin')
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
    camera.setType(g.CameraType.ORBITING);

    // Add a directional light into scene.
    const light = new gPlugin3d.DirectionalLight({
      style: {
        intensity: 5,
        fill: 'white',
        direction: [0, 0, 1],
      },
    });
    canvas.appendChild(light);
  });

  return chart.getContainer();
})();
```

## Add custom legend

You may notice that in the example above we intentionally turned off the legend:

```ts
chart.legend(false);
```

This is because graphics in a 3D scene are all affected by the camera, but HUD components like legends are better suited to being drawn independently. refer to [Custom legend](/manual/component/legend#自定义图例legend), we can customize the legend using HTML:

```js | ob { pin: false }
(() => {
  // add legend
  function legendColor(chart) {
    // create and mound legend
    const node = chart.getContainer();
    const legend = document.createElement('div');
    legend.style.display = 'flex';
    node.insertBefore(legend, node.childNodes[0]);

    // create and mount Items
    const { color: scale } = chart.getScale();
    const { domain } = scale.getOptions();
    const items = domain.map((value) => {
      const item = document.createElement('div');
      const color = scale.map(value);
      item.style.marginLeft = '1em';
      item.innerHTML = `
    <span style="
      background-color:${color};
      display:inline-block;
      width:10px;
      height:10px;"
    ></span>
    <span>${value}</span>
    `;
      return item;
    });
    items.forEach((d) => legend.append(d));

    // event listener
    const selectedValues = [...domain];
    const options = chart.options();
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const value = domain[i];
      item.style.cursor = 'pointer';
      item.onclick = () => {
        const index = selectedValues.indexOf(value);
        if (index !== -1) {
          selectedValues.splice(index, 1);
          item.style.opacity = 0.5;
        } else {
          selectedValues.push(value);
          item.style.opacity = 1;
        }
        changeColor(selectedValues);
      };
    }

    // rerender view
    function changeColor(value) {
      const { transform = [] } = options;
      const newTransform = [{ type: 'filter', color: { value } }, ...transform];
      chart.options({
        ...options,
        transform: newTransform, // set new transform
        scale: { color: { domain } },
      });
      chart.render(); // rerender chart
    }
  }

  const renderer = new gWebgl.Renderer();
  renderer.registerPlugin(new gPluginControl.Plugin());
  renderer.registerPlugin(new gPlugin3d.Plugin());

  const Chart = G2.extend(G2.Runtime, {
    ...G2.corelib(),
    ...g2Extension3d.threedlib(),
  });

  // initialize Chart instance
  const chart = new Chart({
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
    .encode('color', 'Origin')
    .coordinate({ type: 'cartesian3D' })
    .scale('x', { nice: true })
    .scale('y', { nice: true })
    .scale('z', { nice: true })
    .legend(false)
    .axis('x', { gridLineWidth: 2 })
    .axis('y', { gridLineWidth: 2, titleBillboardRotation: -Math.PI / 2 })
    .axis('z', { gridLineWidth: 2 });

  chart.render().then(() => {
    legendColor(chart);

    const { canvas } = chart.getContext();
    const camera = canvas.getCamera();
    camera.setPerspective(0.1, 5000, 45, 500 / 500);
    camera.setType(g.CameraType.ORBITING);

    // Add a directional light into scene.
    const light = new gPlugin3d.DirectionalLight({
      style: {
        intensity: 3,
        fill: 'white',
        direction: [-1, 0, 1],
      },
    });
    canvas.appendChild(light);
  });

  return chart.getContainer();
})();
```

## Using camera interaction and animation

Interaction in 3D scenes is very different from 2D scenes. [g-plugin-control](https://g.antv.antgroup.com/plugins/control) provides camera-based interaction in 3D scenes. When we drag the canvas, the camera will be controlled to rotate around the viewpoint, and the zoom of the mouse wheel will cause the camera to perform a dolly operation. It should be noted that the scaling operation has no effect under orthogonal projection, but the rotation operation is still effective.

When users go through some camera operations, they sometimes want to return to the initial state, for example [plot.ly](https://plotly.com/javascript/3d-line-plots/) provides “Reset camera to default” button in the operation toolbar. Use what G provides [Camera animation API](https://g.antv.antgroup.com/api/camera/animation), we can achieve smooth transition between any camera positions:

```ts
const camera = canvas.getCamera();
camera.createLandmark('default', {
  position: [250, 250, 500],
  focalPoint: [250, 250, 0],
  zoom: 1,
});

button.onclick = () => {
  camera.gotoLandmark('default', {
    duration: 300,
    easing: 'linear',
  });
};
```

```js | ob { pin: false }
(() => {
  function cameraButton(chart) {
    const node = chart.getContainer();
    const button = document.createElement('button');
    button.textContent = 'Reset camera to default';
    node.insertBefore(button, node.childNodes[0]);

    const { canvas } = chart.getContext();
    const camera = canvas.getCamera();
    camera.createLandmark('default', {
      position: [250, 250, 500],
      focalPoint: [250, 250, 0],
      zoom: 1,
    });

    button.onclick = () => {
      camera.gotoLandmark('default', {
        duration: 300,
        easing: 'linear',
      });
    };
  }
  // add legend
  function legendColor(chart) {
    // create and mount legend 并且挂在图例
    const node = chart.getContainer();
    const legend = document.createElement('div');
    legend.style.display = 'flex';
    node.insertBefore(legend, node.childNodes[0]);

    // create and mount Items
    const { color: scale } = chart.getScale();
    const { domain } = scale.getOptions();
    const items = domain.map((value) => {
      const item = document.createElement('div');
      const color = scale.map(value);
      item.style.marginLeft = '1em';
      item.innerHTML = `
    <span style="
      background-color:${color};
      display:inline-block;
      width:10px;
      height:10px;"
    ></span>
    <span>${value}</span>
    `;
      return item;
    });
    items.forEach((d) => legend.append(d));

    // event listeners
    const selectedValues = [...domain];
    const options = chart.options();
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const value = domain[i];
      item.style.cursor = 'pointer';
      item.onclick = () => {
        const index = selectedValues.indexOf(value);
        if (index !== -1) {
          selectedValues.splice(index, 1);
          item.style.opacity = 0.5;
        } else {
          selectedValues.push(value);
          item.style.opacity = 1;
        }
        changeColor(selectedValues);
      };
    }

    // rerender view
    function changeColor(value) {
      const { transform = [] } = options;
      const newTransform = [{ type: 'filter', color: { value } }, ...transform];
      chart.options({
        ...options,
        transform: newTransform, // set new transform
        scale: { color: { domain } },
      });
      chart.render(); // rerender chart
    }
  }

  const renderer = new gWebgl.Renderer();
  renderer.registerPlugin(new gPluginControl.Plugin());
  renderer.registerPlugin(new gPlugin3d.Plugin());

  const Chart = G2.extend(G2.Runtime, {
    ...G2.corelib(),
    ...g2Extension3d.threedlib(),
  });

  // initialize Chart instance
  const chart = new Chart({
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
    .encode('color', 'Origin')
    .coordinate({ type: 'cartesian3D' })
    .scale('x', { nice: true })
    .scale('y', { nice: true })
    .scale('z', { nice: true })
    .legend(false)
    .axis('x', { gridLineWidth: 2 })
    .axis('y', { gridLineWidth: 2, titleBillboardRotation: -Math.PI / 2 })
    .axis('z', { gridLineWidth: 2 });

  chart.render().then(() => {
    legendColor(chart);
    cameraButton(chart);

    const { canvas } = chart.getContext();
    const camera = canvas.getCamera();
    camera.setPerspective(0.1, 5000, 45, 500 / 500);
    camera.setType(g.CameraType.ORBITING);

    // Add a directional light into scene.
    const light = new gPlugin3d.DirectionalLight({
      style: {
        intensity: 3,
        fill: 'white',
        direction: [-1, 0, 1],
      },
    });
    canvas.appendChild(light);
  });

  return chart.getContainer();
})();
```
