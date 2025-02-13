---
title: surface3D
order: 4
---

主要用于绘制 3D 曲面图。

## 开始使用

首先需要使用 [@antv/g-webgl](https://g.antv.antgroup.com/api/renderer/webgl) 作为渲染器并注册以下两个插件：

- [g-plugin-3d](https://g.antv.antgroup.com/plugins/3d) 提供 3D 场景下的几何、材质和光照
- [g-plugin-control](https://g.antv.antgroup.com/plugins/control) 提供 3D 场景下的相机交互

然后设置 z 通道、scale 和 z 坐标轴。无需在场景中添加光源。

```js | ob
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

  // We set the width/height to 100;
  const size = 100;
  const points = [];
  for (let i = 0; i <= 2 * size; ++i) {
    const theta = (Math.PI * (i - size)) / size;
    for (let j = 0; j <= 2 * size; ++j) {
      var phi = (Math.PI * (j - size)) / size;

      const x = (10.0 + Math.cos(theta)) * Math.cos(phi);
      const y = (10.0 + Math.cos(theta)) * Math.sin(phi);

      points.push({
        x: i,
        y: j,
        z: Math.sin(theta) * x * y,
      });
    }
  }

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
    camera.setPerspective(0.1, 2000, 45, 500 / 500);
    camera.rotate(30, 30, 0);
    camera.dolly(60);
    camera.setType(g.CameraType.ORBITING);
  });

  return chart.getContainer();
})();
```

更多的案例，可以查看[图表示例](/examples)页面。
