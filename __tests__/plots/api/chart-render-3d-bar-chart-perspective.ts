import { CameraType } from '@antv/g';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { Plugin as ThreeDPlugin, DirectionalLight } from '@antv/g-plugin-3d';
import { Plugin as ControlPlugin } from '@antv/g-plugin-control';
import { Runtime, extend } from '../../../src/api';
import { corelib, threedlib } from '../../../src/lib';

export function chartRender3dBarChartPerspective(context) {
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

  const data: { x: string; z: string; y: number; color: number }[] = [];
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
    .style('opacity', 0.7)
    .style('cursor', 'pointer');

  const finished = chart.render().then(() => {
    const { canvas } = chart.getContext();
    const camera = canvas!.getCamera();
    camera.setPerspective(0.1, 5000, 80, 1280 / 960);
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
    canvas!.appendChild(light);
  });

  return { finished };
}

chartRender3dBarChartPerspective.skip = true;
