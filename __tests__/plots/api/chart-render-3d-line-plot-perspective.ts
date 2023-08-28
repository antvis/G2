import { CameraType } from '@antv/g';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { Plugin as ThreeDPlugin } from '@antv/g-plugin-3d';
import { Plugin as ControlPlugin } from '@antv/g-plugin-control';
import { Runtime, extend } from '../../../src/api';
import { corelib, threedlib } from '../../../src/lib';

export function chartRender3dLinePlotPerspective(context) {
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

  /**
   * 3D Spiral
   * @see https://plotly.com/javascript/3d-line-plots/
   */
  const pointCount = 500;
  let r: number;
  const data: { x: number; y: number; z: number }[] = [];

  for (let i = 0; i < pointCount; i++) {
    r = i * (pointCount - i);
    data.push({
      x: r * Math.cos(i / 30),
      y: r * Math.sin(i / 30),
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

  const finished = chart.render().then(() => {
    const { canvas } = chart.getContext();
    const camera = canvas!.getCamera();
    camera.setPerspective(0.1, 5000, 45, 500 / 500);
    camera.setType(CameraType.ORBITING);
  });

  return { finished };
}

chartRender3dLinePlotPerspective.skip = true;
