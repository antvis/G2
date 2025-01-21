---
title: point3D
order: 1
---

主要用于绘制 3D 散点图，利用点的粒度来分析数据的分布情况。

## 开始使用

首先需要使用 [@antv/g-webgl](https://g.antv.antgroup.com/api/renderer/webgl) 作为渲染器并注册以下两个插件：

- [g-plugin-3d](https://g.antv.antgroup.com/plugins/3d) 提供 3D 场景下的几何、材质和光照
- [g-plugin-control](https://g.antv.antgroup.com/plugins/control) 提供 3D 场景下的相机交互

然后设置 z 通道、scale 和 z 坐标轴，最后在场景中添加光源。

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

更多的案例，可以查看[图表示例](/examples)页面。

## 选项

目前 point3D 有以下几个内置 shape 图形，包含 3D 和 2D：

| 图形               | 描述               | 示例 |
| ------------------ | ------------------ | ---- |
| cube               | 绘制立方体         |      |
| sphere             | 绘制球体           |      |
| hollow             | 绘制空心圆         |      |
| hollowDiamond      | 绘制空心钻石       |      |
| hollowHexagon      | 绘制空心六边形     |      |
| hollowSquare       | 绘制空心方块       |      |
| hollowTriangleDown | 绘制空心向下三角形 |      |
| hollowTriangle     | 绘制空心三角形     |      |
| hollowBowtie       | 绘制空心蝴蝶结     |      |
| point              | 绘制圆             |      |
| plus               | 绘制加号           |      |
| diamond            | 绘制钻石           |      |
| square             | 绘制方块           |      |
| triangle           | 绘制三角形         |      |
| triangleDown       | 绘制向下三角形     |      |
| hexagon            | 绘制六边形         |      |
| cross              | 绘制交叉符号       |      |
| bowtie             | 绘制蝴蝶结         |      |
| hyphen             | 绘制连字符         |      |
| line               | 绘制竖线           |      |
| tick               | 绘制 tick          |      |

使用球体效果如下：

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
    .encode('color', 'Cylinders')
    .encode('shape', 'sphere')
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

而在使用 2D 图形时，无需添加光源：

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
    .encode('color', 'Cylinders')
    .encode('shape', 'triangle')
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

### 3D 图形

| 属性    | 描述                                          | 类型                           | 默认值    |
| ------- | --------------------------------------------- | ------------------------------ | --------- |
| fill    | 图形的填充色                                  | `string` \| `Function<string>` | -         |
| opacity | 图形的整体透明度                              | `number` \| `Function<number>` | -         |
| cursor  | 鼠标样式。同 css 的鼠标样式，默认 'default'。 | `string` \| `Function<string>` | 'default' |

其他的 point3D 图形配置项和 `cube` 一致。

### 2D 图形

| 属性          | 描述                                                                                                          | 类型                                              | 默认值    |
| ------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | --------- |
| fill          | 图形的填充色                                                                                                  | `string` \| `Function<string>`                    | -         |
| fillOpacity   | 图形的填充透明度                                                                                              | `number` \| `Function<number>`                    | -         |
| stroke        | 图形的描边                                                                                                    | `string` \| `Function<string>`                    | -         |
| strokeOpacity | 描边透明度                                                                                                    | `number` \| `Function<number>`                    | -         |
| lineWidth     | 图形描边的宽度                                                                                                | `number` \| `Function<number>`                    | -         |
| lineDash      | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | `[number,number]` \| `Function<[number, number]>` | -         |
| opacity       | 图形的整体透明度                                                                                              | `number` \| `Function<number>`                    | -         |
| shadowColor   | 图形阴影颜色                                                                                                  | `string` \| `Function<string>`                    | -         |
| shadowBlur    | 图形阴影的高斯模糊系数                                                                                        | `number` \| `Function<number>`                    | -         |
| shadowOffsetX | 设置阴影距图形的水平距离                                                                                      | `number` \| `Function<number>`                    | -         |
| shadowOffsetY | 设置阴影距图形的垂直距离                                                                                      | `number` \| `Function<number>`                    | -         |
| cursor        | 鼠标样式。同 css 的鼠标样式，默认 'default'。                                                                 | `string` \| `Function<string>`                    | 'default' |
