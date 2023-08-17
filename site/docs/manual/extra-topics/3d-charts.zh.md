---
title: 3D 图表
order: 11
---

以 3D 散点图为例，创建图表需要以下步骤：

- 创建 WebGL 渲染器和插件
- 设置 z 通道、比例尺和坐标轴
- 在场景中设置相机
- 添加光源
- 使用相机交互

我们暂不支持图例。

## 创建 WebGL 渲染器和插件

首先安装依赖：

```bash
$ npm install @antv/g-webgl @antv/g-plugin-3d @antv/g-plugin-control --save;
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

## 设置 z 通道、比例尺和坐标轴

在创建 Chart 时通过 `depth` 指定深度：

```ts
const chart = new Chart({
  container: 'container',
  theme: 'classic',
  renderer,
  depth: 400,
});
```

我们使用 [point3D](/spec/mark/point3-d) Mark 并选择 cube 作为 shape 进行绘制。
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

<img alt="perspective" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*KNCUQqzw2JsAAAAAAAAAAAAADmJ7AQ/original" width="400" />

我们还可以让相机固定视点进行一定角度的旋转，这里使用了 [rotate](https://g.antv.antgroup.com/api/camera/action#rotate)：

```ts
camera.rotate(-20, -20, 0);
```

<img alt="orthographic" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7MdMQY-QksEAAAAAAAAAAAAADmJ7AQ/original" width="400" />

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

## 使用相机交互

3D 场景下的交互和 2D 场景有很大的不同，[g-plugin-control](https://g.antv.antgroup.com/plugins/control) 提供了 3D 场景下基于相机的交互。当我们拖拽画布时，会控制相机绕视点进行旋转操作，而鼠标滚轮的缩放会让相机进行 dolly 操作：

<img alt="perspective control" src="https://user-images.githubusercontent.com/3608471/261231166-30515059-aba7-49ae-b805-4fa9a5b95a27.gif" width="400" />

需要注意的是缩放操作在正交投影下是没有效果的，但旋转操作依然有效：

<img alt="orthographic control" src="https://user-images.githubusercontent.com/3608471/261231186-7b4be85a-6d05-4abe-98b4-a9b35b9bff0e.gif" width="400" />
