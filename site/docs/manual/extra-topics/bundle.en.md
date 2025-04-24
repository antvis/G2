---
title: Package on demand
order: 9
---

G2 version 5.0.19 publishs the on-demand packaging function. You can leverage the [Tree-Shaking](https://rollupjs.org/introduction/#tree-shaking) capability of bundling tools like [Rollup](https://rollupjs.org/),[Webpack](https://webpack.js.org/) to use G2 features on demand, thereby reducing the packaged size. Although there is still a lot of room for optimization from the results, this function has the following significance:

- Prevent the package size of existing G2 5.0 users from meaninglessly increasing.
- It can more clearly analyze dependencies and organize the overall architecture of G2 5.0.
- Provide an idea for expanding G2 5.0 capabilities.

## Start using

For example, package the following web page, which uses G2 to draw a bar chart:

```html
<html>
  <div id="container"></div>
  <script type="module">
    import { corelib, extend, Runtime } from '@antv/g2';

    //Extend corelib's capabilities based on Runtime
    const Chart = extend(Runtime, corelib());

    //Initialize the expanded chart instance
    const chart = new Chart({
      container: 'container',
    });

    // Declare visualization
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

    // Render visualization
    chart.render();
  </script>
</html>
```

and use Chart object which exposed from `import { Chart } from '@antv/g2'` directly. The bundle package size is compared as follows:

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

It can be seen that the size has been reduced **100kb** about.

## Principle

The architecture of G2 is composed of Runtime + library. Runtime is responsible for the rendering process, and library is a JavaScript object composed of a series of visual components, used to process or draw data at different stages of the entire rendering.

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

Therefore, the size of G2 after packaging is determined by the size of the runtime and the library. The size of the runtime is fixed, but the size of the library can change:**If I only use statistical charts in my project, I will not rely on geography or graph analysis-related capabilities, and the visualization components corresponding to these capabilities do not need to be included in the library I use.**

Based on the above theory, we can control the final package size by controlling the visual components contained in the library.

## User guide

The following is a brief introduction to the APIs related to on-demand packaging.

### G2.Runtime(_options_)

Returns a G2 runtime. This runtime does not contain any Library and requires cooperation with [**G2**.extend](#g2extendruntime-library).

You can use single library, for example using only core capabilities:

```js
import { Runtime, extend, corelib } from '@antv/g2';

const Chart = extend(Runtime, corelib());
```

You can also use multiple libraries at the same time, such as using core and geographic capabilities:

```js
import { Runtime, extend, corelib, geolib } from '@antv/g2';

const Chart = extend(Runtime, {
  ...corelib(),
  ...geolib(),
});
```

### G2.extend(_Runtime_,_library_)

Enhance _Runtime_ according to a specified _library_, including adding types and corresponding Chart APIs.

```js
import { Runtime, extend, corelib } from '@antv/g2';

const Chart = extend(Runtime, corelib());
```

### G2.stdlib()

Returns the standard library, which contains all capabilities of G2 except 3D, that is, all visualization components of [G2.corelib](#g2corelib)，[G2.plotlib](#g2plotlib)，[G2.geolib](#g2geolib), and [G2.graphlib](#g2graphlib). [G2.Chart](/manual/core/chart/how-to-use) is using this library. ([Source code](https://github.com/antvis/G2/blob/v5/src/lib/std.ts)·[Case](https://g2.antv.antgroup.com/examples))

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

Return to the core library, containing only basic mark. You can view the included visual components through the source code. ([Source code](https://github.com/antvis/G2/blob/v5/src/lib/core.ts)·[Case](https://g2.antv.antgroup.com/examples#general-interval))

```js
import { Runtime, extend, corelib } from '@antv/g2';

const Chart = extend(Runtime, corelib());
```

### G2.plotlib()

Return to an advanced statistical analysis library, including some sophisticated statistical tags (Snakey et al.) and transformations (Venn et al.). It cannot be used independently, must be used with [G2.corelib](#g2corelib). You can view the included visual components through the source code. ([Source code](https://github.com/antvis/G2/blob/v5/src/lib/plot.ts)·[Case](https://g2.antv.antgroup.com/zh/examples/graph/hierarchy/#circle-packing))

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

Returns the geographical analysis library, including geographical tags (GeoPath, etc.) and projections (Projection). It cannot be used independently, must be used with [G2.corelib](#g2corelib). You can view the included visual components through the source code. ([Source code](https://github.com/antvis/G2/blob/v5/src/lib/geo.ts)·[Case](https://g2.antv.antgroup.com/examples#geo-geo))

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

Returns a graph analysis library, containing graph markup (ForceGraph, etc.). It cannot be used independently, must be used with [G2.corelib](#g2corelib). You can view the included visual components through the source code. ([Source code](https://github.com/antvis/G2/blob/v5/src/lib/graph.ts)·[Case](https://g2.antv.antgroup.com/examples/graph/network/#forceGraph))

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

Returns the enhanced analysis library, providing enhanced analysis tags (Auto, etc.). This library will depend on [@antv/ava](https://github.com/antvis/AVA), providing capabilities such as automatic chart drawing and automatic annotation. It cannot be used independently, must be used with [G2.corelib](#g2corelib).

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

> Under development, expected to be online by the end of October

Return to the 3D analysis library, providing capabilities for 3D visualization. This library will not be included in [G2.stdlib](#g2stdlib). It cannot be used independently, it needs to be used with [G2.corelib](#g2corelib). [Example](/manual/extra-topics/3d-charts)

```js
import { Runtime, extend, corelib } from '@antv/g2';
import { threedlib } from '@antv/g2-extension-3d';
import { Renderer } from '@antv/g-webgl';

const Chart = extend(Runtime, {
  ...corelib(),
  ...threedlib(),
});

const chart = new Chart({
  renderer: new Renderer(), //Use webgl renderer
  depth: 400, // Set depth
});

chart.point3D();
```

## Future work

At present, the ability to package on demand has been published, but it can be found that the effect is not very obvious, and the size is only reduced by about 10%. By analyzing the following dependency graph (G2 5.0.18 use [G2.stdlib](#g2corelib)) can have the following ideas for further optimization:

- Reduce the size of the runtime: put some capabilities in the library and use them on demand.
- Dependency governance: remove some duplicate dependencies, such as`@antv/util`;Reduce the size of some dependencies`@antv/component`。
- Provide a smaller library than corelib: mark-level on-demand packaging can be achieved.

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Z-bZT5lHPkkAAAAAAAAAAAAADmJ7AQ/original" alt="dep" style="margin-top: 1em"/>

The current thinking for the third idea is: provide `G2.litelib`, mark can be imported on demand.

```js
import { Runtime, extend, litelib, Interval } from '@antv/g2';

const Chart = extend(Runtime, {
  ...litelib,
  'mark.interval': Interval,
});

const chart = new Chart();

chart.interval();
```

Expected `litelib` contains only the basic components needed to draw a visualization, all other components need to be used on demand through `import`, such as using tooltip interaction:

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

If you are interested in related things or have ideas for optimizing the package size of G2 5.0, you can provide relevant [idea](https://github.com/antvis/G2/discussions), or play around in the G2 5.0 [test environment](https://github.com/antvis/G2/tree/v5/scripts/treeshaking)!
