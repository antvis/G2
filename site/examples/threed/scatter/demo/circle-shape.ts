import { CameraType } from '@antv/g';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { Plugin as ThreeDPlugin } from '@antv/g-plugin-3d';
import { Plugin as ControlPlugin } from '@antv/g-plugin-control';
import { Runtime, corelib, extend } from '@antv/g2';
import { threedlib } from '@antv/g2-extension-3d';

// Create a WebGL renderer.
const renderer = new WebGLRenderer();
renderer.registerPlugin(new ThreeDPlugin());
renderer.registerPlugin(new ControlPlugin());

// Customize our own Chart with threedlib.
const Chart = extend(Runtime, { ...corelib(), ...threedlib() });
const chart = new Chart({
  container: 'container',
  renderer,
  depth: 400, // Define the depth of chart.
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'point3D',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/bmw-prod/2c813e2d-2276-40b9-a9af-cf0a0fb7e942.csv',
      },
      encode: {
        x: 'Horsepower',
        y: 'Miles_per_Gallon',
        z: 'Weight_in_lbs',
        color: 'Origin',
        size: 'Cylinders',
        shape: 'point',
      },
      coordinate: { type: 'cartesian3D' },
      scale: {
        x: { nice: true },
        y: { nice: true },
        z: { nice: true },
      },
      legend: false,
      axis: {
        x: { gridLineWidth: 2 },
        y: { gridLineWidth: 2, titleBillboardRotation: -Math.PI / 2 },
        z: { gridLineWidth: 2 },
      },
      style: {
        lineWidth: 2,
        fillOpacity: 0.6,
      },
    },
  ],
});

chart.render().then(() => {
  const { canvas } = chart.getContext();
  const camera = canvas.getCamera();
  camera.setPerspective(0.1, 5000, 45, 640 / 480);
  camera.setType(CameraType.ORBITING);
});
