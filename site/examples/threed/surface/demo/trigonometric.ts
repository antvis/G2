import { CameraType } from '@antv/g';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { Plugin as ThreeDPlugin } from '@antv/g-plugin-3d';
import { Plugin as ControlPlugin } from '@antv/g-plugin-control';
import { Runtime, corelib, extend } from '@antv/g2';
import { threedlib } from '@antv/g2-extension-3d';

// We set the width/height to 100;
const size = 100;
const points: { x: number; y: number; z: number }[] = [];
for (let i = 0; i <= 2 * size; ++i) {
  const theta = (Math.PI * (i - size)) / size;
  for (let j = 0; j <= 2 * size; ++j) {
    const phi = (Math.PI * (j - size)) / size;

    const x = (10.0 + Math.cos(theta)) * Math.cos(phi);
    const y = (10.0 + Math.cos(theta)) * Math.sin(phi);

    points.push({
      x: i,
      y: j,
      z: Math.sin(theta) * x * y,
    });
  }
}

// Create a WebGL renderer.
const renderer = new WebGLRenderer();
renderer.registerPlugin(new ThreeDPlugin());
renderer.registerPlugin(new ControlPlugin());

// Customize our own Chart with threedlib.
const Chart = extend(Runtime, { ...corelib(), ...threedlib() });
const chart = new Chart({
  container: 'container',
  renderer,
  width: 600,
  height: 600,
  depth: 400, // Define the depth of chart.
});

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
  // Use perspective projection mode.
  camera.setPerspective(0.1, 2000, 45, 600 / 600);
  camera.rotate(30, 30, 0);
  camera.dolly(60);
  camera.setType(CameraType.ORBITING);
});
