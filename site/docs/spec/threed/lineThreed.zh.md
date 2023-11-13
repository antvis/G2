---
title: line3D
order: 2
---

主要用于绘制 3D 折线图。

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
    camera.setPerspective(0.1, 5000, 45, 500 / 500);
    camera.setType(g.CameraType.ORBITING);
  });

  return chart.getContainer();
})();
```

更多的案例，可以查看[图表示例](/examples)页面。
