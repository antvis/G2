---
title: 按需打包
order: 9
---

G2 5.0.19 版本推出了按需打包的功能。可以借助 [Rollup](https://rollupjs.org/), [Webpack](https://webpack.js.org/) 等打包工具的 [Tree-Shaking](https://rollupjs.org/introduction/#tree-shaking) 能力来按需使用 G2 的特性，从而减少打包后的体积。虽然从结果上看还有不少优化空间，该功能的推出有以下几个意义：

- 防止已有 G2 5.0 用户的包体积无意义的增加。
- 能更清晰地分析依赖和整理 G2 5.0 的总体架构。
- 提供一种对 G2 5.0 能力扩展的思路。

## 开始使用

比如打包如下的一个网页，该网页使用 G2 绘制了一个条形图：

```html
<html>
  <div id="container"></div>
  <script type="module">
    import { corelib, extend, Runtime } from '@antv/g2';

    // 根据 Runtime 扩展 corelib 的能力
    const Chart = extend(Runtime, corelib());

    // 初始化扩展后的图表实例
    const chart = new Chart({
      container: 'container',
    });

    // 声明可视化
    chart.options({
      type: 'interval',
      data: [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ],
      encode: {
        x: 'genre',
        y: 'sold',
      },
    });

    // 渲染可视化
    chart.render();
  </script>
</html>
```

和直接使用 `import { Chart } from '@antv/g2'` 暴露出的 Chart 对象的打包体积相比如下：

```js | ob {pin:false}
(() => {
  const data = [
    { lib: 'Chart', size: 957772, type: 'raw' },
    { lib: 'Chart', size: 288753, type: 'gzip' },
    { lib: 'Runtime', size: 855619, type: 'raw' },
    { lib: 'Runtime', size: 252045, type: 'gzip' },
  ];

  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    data,
    encode: {
      x: 'lib',
      y: 'size',
      color: 'type',
    },
    transform: [{ type: 'dodgeX' }],
    scale: {
      y: { nice: true },
    },
    axis: {
      y: { labelFormatter: (d) => d / 1000 + 'kb' },
      x: { title: false },
    },
    legend: {
      color: { title: false },
    },
    labels: [{ text: (d) => (d.size / 1000).toFixed(2) + 'kb' }],
  });

  chart.render();

  return chart.getContainer();
})();
```

可以发现体积减少了 **100kb** 左右。

## 原理

G2 的架构是由 Runtime + library 构成的。Runtime 负责渲染流程，library 是一个有一系列可视化组件构成的 JavaScript Object，用于在整个渲染的不同阶段处理或者绘制数据。

```js
const library = {
  'mark.interval': Interval,
  'mark.forceGraph': ForceGraph,
  'mark.geoPath': GeoPath,
  'scale.linear': Linear,
  'scale.log': Log,
  //...
};
```

所以打包后 G2 的大小由 Runtime 的大小和 library 共同决定。Runtime 的大小是固定的，但是 library 的大小是可以变化的：**如果我的项目中只用到了统计图表，就不会依赖地理或者图分析相关的能力，这部分能力对应的可视化组件就不用包含在使用的 library 里面。**

基于上面的理论，我们可以通过控制 library 包含的可视化组件来控制最后的包体积。

## 使用指南

下面简单介绍一下和按需打包相关的 API。

### G2.Runtime(_options_)

返回一个 G2 运行时。该运行时不包含任何 Library，需要配合 [**G2**.extend](#g2extendruntime-library) 一起使用。

可以单独使用一个 library，比如只使用核心的能力：

```js
import { Runtime, extend, corelib } from '@antv/g2';

const Chart = extend(Runtime, corelib());
```

也可以同时使用多个 library，比如使用核心和地理能力：

```js
import { Runtime, extend, corelib, geolib } from '@antv/g2';

const Chart = extend(Runtime, {
  ...corelib(),
  ...geolib(),
});
```

### G2.extend(_Runtime_, _library_)

根据指定的 _library_ 对 _Runtime_ 进行增强，包括增加类型和对应的 Chart API。

```js
import { Runtime, extend, corelib } from '@antv/g2';

const Chart = extend(Runtime, corelib());
```

### G2.stdlib()

返回标准库，包含 G2 非 3D 之外的所有能力，也就是包含 [G2.corelib](#g2corelib)，[G2.plotlib](#g2plotlib)，[G2.geolib](#g2geolib)，以及[G2.graphlib](#g2graphlib) 的所有可视化组件。[G2.Chart](/manual/core/chart) 就是使用了这个 library。([源码](https://github.com/antvis/G2/blob/v5/src/lib/std.ts) · [案例](https://g2.antv.antgroup.com/examples))

```js
import { Runtime, extend, stdlib } from '@antv/g2';

const Chart = extend(Runtime, stdlib());

const chart = new Chart();

chart.interval(); // corelib
chart.sankey(); // plotlib
chart.geoPath(); // graphlib
chart.forceGraph(); // graphlib
```

### G2.corelib()

返回核心库，只包含基础的 Mark。可以通过源码看包含的可视化组件。([源码](https://github.com/antvis/G2/blob/v5/src/lib/core.ts) · [案例](https://g2.antv.antgroup.com/examples#general-interval))

```js
import { Runtime, extend, corelib } from '@antv/g2';

const Chart = extend(Runtime, corelib());
```

### G2.plotlib()

返回高级统计分析库，包含一些复杂的统计标记（Snakey 等）和转换（Venn 等）。不能单独使用，需要配合 [G2.corelib](#g2corelib) 使用。可以通过源码看包含的可视化组件。([源码](https://github.com/antvis/G2/blob/v5/src/lib/plot.ts) · [案例](https://g2.antv.antgroup.com/zh/examples/graph/hierarchy/#circle-packing))

```js
import { Runtime, extend, corelib, plotlib } from '@antv/g2';

const Chart = extend(Runtime, {
  ...corelib(),
  ...plotlib(),
});

const chart = new Chart();

chart.sankey();
```

### G2.geolib()

返回地理分析库，包含地理标记（GeoPath 等）和投影（Projection）。不能单独使用，需要配合 [G2.corelib](#g2corelib) 使用。可以通过源码看包含的可视化组件。([源码](https://github.com/antvis/G2/blob/v5/src/lib/geo.ts) · [案例](https://g2.antv.antgroup.com/examples#geo-geo))

```js
import { Runtime, extend, corelib, geolib } from '@antv/g2';

const Chart = extend(Runtime, {
  ...corelib(),
  ...geolib(),
});

const chart = new Chart();

chart.geoPath();
```

### G2.graphlib()

返回图分析库，包含图标记（ForceGraph 等）。不能单独使用，需要配合 [G2.corelib](#g2corelib) 使用。可以通过源码看包含的可视化组件。([源码](https://github.com/antvis/G2/blob/v5/src/lib/graph.ts) · [案例](https://g2.antv.antgroup.com/examples/graph/network/#forceGraph))

```js
import { Runtime, extend, corelib, graphlib } from '@antv/g2';

const Chart = extend(Runtime, {
  ...corelib(),
  ...graphlib(),
});

const chart = new Chart();

chart.forceGraph();
```

### autolib

返回增强分析库，提供增强分析标记（Auto 等）。该 library 会依赖 [@antv/ava](https://github.com/antvis/AVA) ，提供自动绘制图表、自动标注等能力。不能单独使用，需要配合 [G2.corelib](#g2corelib) 使用。

```js
import { Runtime, extend, corelib } from '@antv/g2';
import { autolib } from '@antv/g2-extension-ava';

const Chart = extend(Runtime, {
  ...corelib(),
  ...autolib(),
});

const chart = new Chart();

chart.auto(); // Auto Mark
```

### G2.threedlib()

> 开发中，预计 10 月底上线

返回 3D 分析库，提供 3D 可视化的能力。该 library 不会包含在 [G2.stdlib](#g2stdlib) 里面，同样不能单独使用，需要配合 [G2.corelib](#g2corelib) 使用。[示例](/manual/extra-topics/3d-charts)

```js
import { Runtime, extend, corelib } from '@antv/g2';
import { threedlib } from '@antv/g2-extension-3d';
import { Renderer } from '@antv/g-webgl';

const Chart = extend(Runtime, {
  ...corelib(),
  ...threedlib(),
});

const chart = new Chart({
  renderer: new Renderer(), //使用 webgl 渲染器
  depth: 400, // 设置深度
});

chart.point3D();
```

## 未来工作

目前是推出了按需打包的能力，但是可以发现效果不是很明显，只减少了 10% 左右的大小。通过分析如下 G2 5.0.18 使用 [G2.stdlib](#g2corelib) 依赖图可以有以下几个可以进一步优化思路：

- 减少 Runtime 的体积：把一些能力放在 library 里面可以按需使用。
- 依赖治理：去掉一些重复依赖，比如 `@antv/util`；减少一些依赖的大小 `@antv/component`。
- 提供比 corelib 更小的 library：可以实现 Mark 级别的按需打包。

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Z-bZT5lHPkkAAAAAAAAAAAAADmJ7AQ/original" alt="dep" style="margin-top: 1em"/>

针对第三个方法目前的思路是：提供 `G2.litelib`，可以按需引入 Mark。

```js
import { Runtime, extend, litelib, Interval } from '@antv/g2';

const Chart = extend(Runtime, {
  ...litelib,
  'mark.interval': Interval,
});

const chart = new Chart();

chart.interval();
```

期望中的 `litelib` 只包含绘制一个可视化所需要的基本组件，其余所有的组件都需要通过 `import` 的形式按需使用，比如使用 tooltip 交互：

```js
import { Runtime, extend, litelib, Interval, Tooltip } from '@antv/g2';

const Chart = extend(Runtime, {
  ...litelib,
  'mark.interval': Interval,
  'interaction.tooltip': Tooltip,
});

const chart = new Chart();

chart.options({
  type: 'interval',
  interaction: { tooltip: true }, // 使用 tooltip 交互
});
```

如果大家对相关的东西感兴趣，或者对优化 G2 5.0 的包大小有想法，可以提供相关的[想法](https://github.com/antvis/G2/discussions)或者在 G2 5.0 treeshaking 的[测试环境](https://github.com/antvis/G2/tree/v5/scripts/treeshaking)把玩把玩！
