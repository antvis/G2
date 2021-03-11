---
title: G2 按需加载
order: 6
---

## 背景

目前全量 G2 3.x 加载之后，大概的包大小在 800kb+，按需加载仅加载一个 Line 图，大概在 450kb 左右。

这对一些对包大小敏感的用户来说非常不友好。因此 G2 4.0 将整个体系模块化，通过提供更灵活的按需机制让用户可以更加细粒度得进行按需引用。

## 可按需引用的模块

- **渲染引擎**

增加一个 [registerEngine](https://www.yuque.com/antv/g2-docs/mquk09) 的 API，然后按需引入 SVG 和 Canvas 能力。

- **Geometry**

通过 `registerGeometry` 的方式 load 图形。可以分成 line、Interval、point 等多个。

- **Shape**

通过 registerShape 的方式加载每个 Geometry 使用的 shape。

- **ComponentPlugin**

通过 [registerComponentController](https://www.yuque.com/antv/g2-docs/qw7hzb) 的方式 load 组件及其 Controller。可以分成为 axis、legend、tooltip、annotation 等多个。

- **Theme**

通过 registerTheme 的方式加载主题。可以分成为 antv、dark 两类主题。默认至少选择一个主题。

- **Facet**

通过 registerFacet 的方式加载分面。可以分成为 rect、tree、circle 等多个。

- **Action、Interaction**

通过 registerAction 的方式加载交互反馈。 通过 registerInteraction 的方式加载交互行为。

- **Animation**

通过 registerAnimation 的方式加载动画函数。

- **Geometry Label**

通过 registerGeometryLabel 的方式加载每个 Geometry 类型对应的文本类型。

- **Coordinate**

通过引入  @antv/coord/lib/factory，然后调用 registerCoordinate 的方式加载 coordinate。可以分成为 rect、polar、helix 三个。（这个好像并不能节省多少大小）

- **Adjust**

通过引入  @antv/adjust/lib/factory，然后调用 registerAdjust 的方式加载 adjust。可以分成为 stack、dodge、jitter、symmetric 四个。

## 使用

比如 g2plot 绘制一个折线图，怎么样让这个包大小最小。

```typescript
// 使用 G2/core 壳子
import { Chart, registerGeometry, registerComponentController, registerEngine } from '@antv/g2/lib/core';
import Line from '@antv/g2/lib/geometry/line';
import Axis from '@antv/g2/lib/chart/controller/axis';
import Tooltip from '@antv/g2/lib/chart/controller/tooltip';
import * as CanvasEngine from '@antv/g-canvas';

// 按需注入
registerEngine('canvas', CanvasEngine);
registerGeometry('line', Line);
registerComponentController('axis', Axis);
registerComponentController('tooltip', Tooltip);

// 创建折线图，后面的代码没有任何区别
const chart = new Chart({
  container: 'container',
  width: 600,
  height: 500,
  renderer: 'canvas',
});

chart.data(data);
chart.line().positon('x*y');
chart.render();
```

具体可以参考 G2：[src/index.ts](https://github.com/antvis/G2/blob/master/src/index.ts)。
