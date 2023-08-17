import { CameraType, Canvas } from '@antv/g';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { Plugin as ThreeDPlugin, DirectionalLight } from '@antv/g-plugin-3d';
import { Plugin as ControlPlugin } from '@antv/g-plugin-control';
import { Chart } from '../../../src/api';

export function chartRender3dScatterPlotPerspective(context) {
  const { container } = context;

  // Create a WebGL renderer.
  const renderer = new WebGLRenderer();
  renderer.registerPlugin(new ThreeDPlugin());
  renderer.registerPlugin(new ControlPlugin());

  const canvas = new Canvas({
    container,
    width: 640,
    height: 480,
    renderer,
  });

  const camera = canvas.getCamera();
  camera.setPerspective(0.1, 5000, 45, 500 / 500);
  camera.setType(CameraType.ORBITING);
  // TODO: infer by depth in layout process.
  canvas.document.documentElement.translate(0, 0, -200);

  // Add a directional light into scene.
  const light = new DirectionalLight({
    style: {
      intensity: 3,
      fill: 'white',
      direction: [-1, 0, 1],
    },
  });
  canvas.appendChild(light);

  const chart = new Chart({ theme: 'classic', container, canvas });
  chart.options({
    width: 500,
    height: 500,
    depth: 400,
    type: 'point3D',
    padding: 'auto',
    data: {
      type: 'fetch',
      value: 'data/cars2.csv',
    },
    encode: {
      x: 'Horsepower',
      y: 'Miles_per_Gallon',
      z: 'Weight_in_lbs',
      size: 'Origin',
      color: 'Cylinders',
      shape: 'cube',
    },
    scale: {
      x: { nice: true },
      y: { nice: true },
      z: { nice: true },
    },
    coordinate: { type: 'cartesian3D' },
    axis: {
      x: { gridLineWidth: 3 },
      y: { gridLineWidth: 3, titleBillboardRotation: -Math.PI / 2 },
      z: { gridLineWidth: 3 },
    },
    legend: false,
  });

  const finished = chart.render();

  return { finished };
}

chartRender3dScatterPlotPerspective.skip = true;
