---
title: interval3D
order: 3
---

主要用于绘制 3D 条形图。

## 开始使用

首先需要使用 [@antv/g-webgl](https://g.antv.antgroup.com/api/renderer/webgl) 作为渲染器并注册以下两个插件：

- [g-plugin-3d](https://g.antv.antgroup.com/plugins/3d) 提供 3D 场景下的几何、材质和光照
- [g-plugin-control](https://g.antv.antgroup.com/plugins/control) 提供 3D 场景下的相机交互

然后设置 z 通道、scale 和 z 坐标轴，最后在场景中添加光源。

```js | ob
(() => {
  // Create a WebGL renderer.
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

  const data = [];
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
    .style('opacity', 0.7);

  chart.render().then(() => {
    const { canvas } = chart.getContext();
    const camera = canvas.getCamera();
    camera.setPerspective(0.1, 5000, 50, 1280 / 960);
    camera.setType(g.CameraType.ORBITING);
    camera.rotate(-20, -20, 0);

    // Add a directional light into scene.
    const light = new gPlugin3d.DirectionalLight({
      style: {
        intensity: 2.5,
        fill: 'white',
        direction: [-1, 0, 1],
      },
    });
    canvas.appendChild(light);
  });

  return chart.getContainer();
})();
```

更多的案例，可以查看[图表示例](/examples)页面。

## 选项

目前 interval3D 有以下内置 shape 图形：

| 图形     | 描述       | 示例 |
| -------- | ---------- | ---- |
| cube     | 绘制立方体 |      |
| cylinder | 绘制圆柱   |      |
| cone     | 绘制圆锥   |      |

### cube

| 属性    | 描述                                          | 类型                           | 默认值    |
| ------- | --------------------------------------------- | ------------------------------ | --------- |
| fill    | 图形的填充色                                  | `string` \| `Function<string>` | -         |
| opacity | 图形的整体透明度                              | `number` \| `Function<number>` | -         |
| cursor  | 鼠标样式。同 css 的鼠标样式，默认 'default'。 | `string` \| `Function<string>` | 'default' |
