---
title: point3D
order: 1
---

主要用于绘制 3D 散点图，利用点的粒度来分析数据的分布情况。

## 开始使用

<img alt="point3D" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*KNCUQqzw2JsAAAAAAAAAAAAADmJ7AQ/original" width="600" />

首先需要使用 [@antv/g-webgl](https://g.antv.antgroup.com/api/renderer/webgl) 作为渲染器并注册以下两个插件：

- [g-plugin-3d](https://g.antv.antgroup.com/plugins/3d) 提供 3D 场景下的几何、材质和光照
- [g-plugin-control](https://g.antv.antgroup.com/plugins/control) 提供 3D 场景下的相机交互

然后设置 z 通道、scale 和 z 坐标轴，最后在场景中添加光源。

```ts
import { CameraType } from '@antv/g';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { Plugin as ThreeDPlugin, DirectionalLight } from '@antv/g-plugin-3d';
import { Plugin as ControlPlugin } from '@antv/g-plugin-control';
import { Runtime, corelib, threedlib, extend } from '@antv/g2';

const renderer = new WebGLRenderer();
renderer.registerPlugin(new ThreeDPlugin());
renderer.registerPlugin(new ControlPlugin());

const Chart = extend(Runtime, { ...corelib(), ...threedlib() });
const chart = new Chart({
  container: 'container',
  theme: 'classic',
  renderer,
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

chart.render().then(() => {
  const { canvas } = chart.getContext();
  const camera = canvas.getCamera();
  camera.setType(CameraType.ORBITING);

  // Add a directional light into scene.
  const light = new DirectionalLight({
    style: {
      intensity: 3,
      fill: 'white',
      direction: [-1, 0, 1],
    },
  });
  canvas.appendChild(light);
});
```

更多的案例，可以查看[图表示例](/examples)页面。

## 选项

目前 point3D 有以下几个内置 shape 图形：

| 图形   | 描述       | 示例 |
| ------ | ---------- | ---- |
| cube   | 绘制立方体 |      |
| sphere | 绘制球体   |      |

### cube

| 属性    | 描述                                          | 类型                           | 默认值    |
| ------- | --------------------------------------------- | ------------------------------ | --------- |
| fill    | 图形的填充色                                  | `string` \| `Function<string>` | -         |
| opacity | 图形的整体透明度                              | `number` \| `Function<number>` | -         |
| cursor  | 鼠标样式。同 css 的鼠标样式，默认 'default'。 | `string` \| `Function<string>` | 'default' |

其他的 point3D 图形配置项和 `cube` 一致。
