import { CameraType } from '@antv/g';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { Plugin as ThreeDPlugin, DirectionalLight } from '@antv/g-plugin-3d';
import { Plugin as ControlPlugin } from '@antv/g-plugin-control';
import { threedlib } from '@antv/g2-extension-3d';
import { Runtime, extend } from '../../../src/api';
import { corelib } from '../../../src/lib';

export function chart3d(context) {
  const { container } = context;

  // Create a WebGL renderer.
  const renderer = new WebGLRenderer();
  renderer.registerPlugin(new ThreeDPlugin());
  renderer.registerPlugin(new ControlPlugin());

  const Chart = extend(Runtime, { ...corelib(), ...threedlib() });
  const chart = new Chart({
    container,
    renderer,
    depth: 400,
  });

  chart
    .point3D()
    .data({
      type: 'fetch',
      value: 'data/cars2.csv',
    })
    .encode('x', 'Horsepower')
    .encode('y', 'Miles_per_Gallon')
    .encode('z', 'Weight_in_lbs')
    .encode('size', 'Origin')
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

  const finished = chart.render().then(() => {
    const { canvas } = chart.getContext();
    const camera = canvas!.getCamera();
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
    // @ts-ignore
    canvas!.appendChild(light);
  });

  return { finished };
}

chart3d.skip = true;
