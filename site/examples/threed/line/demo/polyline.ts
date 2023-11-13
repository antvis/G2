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

/**
 * 3D Line
 * @see https://plotly.com/javascript/3d-line-plots/
 */
const pointCount = 31;
let r;
const data = [];

for (let i = 0; i < pointCount; i++) {
  r = 10 * Math.cos(i / 10);
  data.push({
    x: r * Math.cos(i),
    y: r * Math.sin(i),
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

chart.render().then(() => {
  const { canvas } = chart.getContext();
  const camera = canvas.getCamera();
  // Use perspective projection mode.
  camera.setPerspective(0.1, 5000, 45, 640 / 480);
  camera.setType(CameraType.ORBITING);
});
