---
title: 绘制 3D 图表
order: 1
---

以 3D 散点图为例，创建图表需要以下步骤：

- 创建 WebGL 渲染器和插件
- 扩展 threedlib
- 设置 z 通道、比例尺和坐标轴
- 在场景中设置相机
- 添加光源
- 添加自定义图例
- 使用相机交互与动画

## 创建 WebGL 渲染器和插件

首先安装依赖：

```bash
$ npm install @antv/g-webgl @antv/g-plugin-3d @antv/g-plugin-control --save
```

然后使用 [@antv/g-webgl](https://g.antv.antgroup.com/api/renderer/webgl) 作为渲染器并注册以下两个插件：

- [g-plugin-3d](https://g.antv.antgroup.com/plugins/3d) 提供 3D 场景下的几何、材质和光照
- [g-plugin-control](https://g.antv.antgroup.com/plugins/control) 提供 3D 场景下的相机交互

```ts
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { Plugin as ThreeDPlugin, DirectionalLight } from '@antv/g-plugin-3d';
import { Plugin as ControlPlugin } from '@antv/g-plugin-control';

const renderer = new WebGLRenderer();
renderer.registerPlugin(new ThreeDPlugin());
renderer.registerPlugin(new ControlPlugin());
```

## 扩展 threedlib

由于 3D 相关的功能代码体积巨大，我们将其分离到 [threedlib](/manual/extra-topics/bundle#g2threedlib) 中，在运行时扩展它并自定义 Chart 对象：

```ts
import { Runtime, corelib, extend } from '@antv/g2';
import { threedlib } from '@antv/g2-extension-3d';

const Chart = extend(Runtime, { ...corelib(), ...threedlib() });
```

## 设置 z 通道、比例尺和坐标轴

在创建 Chart 时通过 `depth` 指定深度：

```ts
const chart = new Chart({
  container: 'container',
  renderer,
  depth: 400,
});
```

我们使用 [point3D](/manual/extra-topics/three-dimensional/point-threed) Mark 并选择 cube 作为 shape 进行绘制。
随后设置 z 通道、比例尺和坐标轴。

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

## 设置相机

在 3D 场景中我们可以使用正交或者透视投影，在首次渲染完成后可以从 Chart 上下文中获取相机。随后可以使用 G 提供的[相机 API](https://g.antv.antgroup.com/api/camera/intro) 完成投影模式、相机类型的设置。在下面的例子中，我们使用了透视投影，

```ts
chart.render().then(() => {
  const { canvas } = chart.getContext();
  const camera = canvas.getCamera(); // 获取相机

  camera.setPerspective(0.1, 5000, 45, 500 / 500);
  camera.setType(CameraType.ORBITING);
});
```

效果如下：

```js | ob { pin: false }
(() => {
  const renderer = new gWebgl.Renderer();
  renderer.registerPlugin(new gPluginControl.Plugin());
  renderer.registerPlugin(new gPlugin3d.Plugin());

  const Chart = G2.extend(G2.Runtime, {
    ...G2.corelib(),
    ...g2Extension3d.threedlib(),
  });

  // 初始化图表实例
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

我们还可以让相机固定视点进行一定角度的旋转，这里使用了 [rotate](https://g.antv.antgroup.com/api/camera/action#rotate)：

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

  // 初始化图表实例
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

## 添加光源

材质需要配合光源呈现出某种“立体感”。这里我们使用 G 提供的[平行光源](https://g.antv.antgroup.com/api/3d/light)：

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

我们可以通过 `intensity` 增大光源的强度：

```js | ob { pin: false }
(() => {
  const renderer = new gWebgl.Renderer();
  renderer.registerPlugin(new gPluginControl.Plugin());
  renderer.registerPlugin(new gPlugin3d.Plugin());

  const Chart = G2.extend(G2.Runtime, {
    ...G2.corelib(),
    ...g2Extension3d.threedlib(),
  });

  // 初始化图表实例
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

## 添加自定义图例

你可能注意到在上面的例子中我们刻意关闭了图例：

```ts
chart.legend(false);
```

这是由于 3D 场景中的图形都会受到相机影响，但像图例这样的 HUD 组件更适合独立绘制。参考[自定义图例](/manual/component/legend#自定义图例legend)，我们可以使用 HTML 自定义图例：

```js | ob { pin: false }
(() => {
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

  const renderer = new gWebgl.Renderer();
  renderer.registerPlugin(new gPluginControl.Plugin());
  renderer.registerPlugin(new gPlugin3d.Plugin());

  const Chart = G2.extend(G2.Runtime, {
    ...G2.corelib(),
    ...g2Extension3d.threedlib(),
  });

  // 初始化图表实例
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

## 使用相机交互与动画

3D 场景下的交互和 2D 场景有很大的不同，[g-plugin-control](https://g.antv.antgroup.com/plugins/control) 提供了 3D 场景下基于相机的交互。当我们拖拽画布时，会控制相机绕视点进行旋转操作，而鼠标滚轮的缩放会让相机进行 dolly 操作。需要注意的是缩放操作在正交投影下是没有效果的，但旋转操作依然有效。

当用户经过了一番相机操作，有时想回到初始状态，例如 [plot.ly](https://plotly.com/javascript/3d-line-plots/) 在操作工具栏中就提供了 “Reset camera to default” 按钮。使用 G 提供的[相机动画 API](https://g.antv.antgroup.com/api/camera/animation)，我们可以实现在任意相机位置间平滑过渡：

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

  const renderer = new gWebgl.Renderer();
  renderer.registerPlugin(new gPluginControl.Plugin());
  renderer.registerPlugin(new gPlugin3d.Plugin());

  const Chart = G2.extend(G2.Runtime, {
    ...G2.corelib(),
    ...g2Extension3d.threedlib(),
  });

  // 初始化图表实例
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
