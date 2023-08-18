import { CameraType } from '@antv/g';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { Plugin as ThreeDPlugin, DirectionalLight } from '@antv/g-plugin-3d';
import { Plugin as ControlPlugin } from '@antv/g-plugin-control';
import { Runtime, extend } from '../../../src/api';
import { corelib, threedlib } from '../../../src/lib';

// 添加图例
function legendColor(chart) {
  // 创建 Legend 并且挂在图例
  const node = chart.getContainer();
  const legend = document.createElement('div');
  legend.style.display = 'flex';
  node.insertBefore(legend, node.childNodes[0]);

  // 创建并挂载 Items
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

  // 监听事件
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

  // 重新渲染视图
  function changeColor(value) {
    const { transform = [] } = options;
    const newTransform = [{ type: 'filter', color: { value } }, ...transform];
    chart.options({
      ...options,
      transform: newTransform, // 指定新的 transform
      scale: { color: { domain } },
    });
    chart.render(); // 重新渲染图表
  }
}

export function chartRender3dScatterPlotLegend(context) {
  const { container } = context;

  // Create a WebGL renderer.
  const renderer = new WebGLRenderer();
  renderer.registerPlugin(new ThreeDPlugin());
  renderer.registerPlugin(new ControlPlugin());

  const Chart = extend(Runtime, { ...corelib(), ...threedlib() });
  const chart = new Chart({
    container,
    theme: 'classic',
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
    .encode('color', 'Origin')
    .coordinate({ type: 'cartesian3D' })
    .scale('x', { nice: true })
    .scale('y', { nice: true })
    .scale('z', { nice: true })
    .legend(false)
    .axis('x', { gridLineWidth: 2 })
    .axis('y', { gridLineWidth: 2, titleBillboardRotation: -Math.PI / 2 })
    .axis('z', { gridLineWidth: 2 });

  const finished = chart.render().then(() => {
    legendColor(chart);

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
    canvas!.appendChild(light);
  });

  return { finished };
}

chartRender3dScatterPlotLegend.skip = true;
