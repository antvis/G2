---
title: sunburst
order: 16
---

## 概述

旭日图（ `sunburst` ）作为一种强大且直观的数据可视化手段，在多种领域中的应用及其优势与局限。通过环形布局，旭日图有效地展现了数据间的层次关系和比例分配，尤其适用于那些具有明确父子关系的数据集。尽管存在一些限制，但其独特的设计使其成为商业分析、地理学研究等领域不可或缺的工具之一。融合了饼图和树状图的优点，采用圆形分割的方式来展示多层嵌套的信息结构。这种图表不仅能够清晰地反映出不同组别之间的相对大小，还能保持良好的视觉效果。比起树图，具备节省空间、整体情况更加直观等优点。

`sunburst` 通过 `g2ExtensionPlot` 中以 `rect` 为基础实现，内部实现下钻事件、极坐标、数据转化、样式优化等。

```js | ob { inject: true }
import { plotlib } from '@antv/g2-extension-plot';
import { Runtime, corelib, extend } from '@antv/g2';

const Chart = extend(Runtime, { ...corelib(), ...plotlib() });

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'sunburst',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json',
  },
  encode: {
    value: 'sum',
  },
  labels: [
    {
      text: 'name',
      transform: [
        {
          type: 'overflowHide',
        },
      ],
    },
  ],
});

chart.render();
```

更多的案例，可以查看[图表示例 - 旭日图](/examples#general-sunburst) 页面。

## 配置项

| 属性        | 描述                                                                                  | 类型                        | 默认值                | 必选 |
| ----------- | ------------------------------------------------------------------------------------- | --------------------------- | --------------------- | ---- |
| encode      | 配置 `sunburst` 标记的视觉通道，包括 `value` 等，用于指定视觉元素属性和数据之间的关系 | [encode](#encode)           | -                     | ✓    |
| coordinate  | 配置 `sunburst` 标记的坐标系，坐标系会执行一系列点转换，从而改变标记的空间展示形式    | [coordinate](#coordinate)   | `{type: 'polar' }`    |      |
| interaction | 配置 `sunburst` 标记的交互配置，内置了 `drillDown` 下钻配置                           | [interaction](#interaction) | `{ drillDown: true }` |      |
| style       | 配置 `sunburst` 标记的图形样式                                                        | [style](#style)             | -                     |      |

### encode

配置 `sunburst` 标记的视觉通道。

| 属性  | 描述                                                                                                                                                                                                  | 类型                          | 默认值          | 必选 |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | --------------- | ---- |
| value | 绑定 `sunburst` 标记的 `value` 属性通道，用于数据 `data` 中的数值字段                                                                                                                                 | [encode](/manual/core/encode) | -               | ✓    |
| color | 绑定 `sunburst` 标记的 `color` 属性通道，如果将数据字段映射到颜色通道，会对数据进行分组，将数据拆分成多个不同颜色的图形，一般用来配置堆叠柱状图等。内置配置为 `ancestor-node`, 用于区分不同的路径分组 | [encode](/manual/core/encode) | `ancestor-node` |      |

#### value

`sunburst` 标记的位置视觉通道需要 `value` 字段的值，在 `data` 中，会通过字段计算每一个分组中的数值。内部会把树形结构数据，转化为平铺的 `rect` 需要的数据。

```js
{
  type: 'sunburst',
  data: {
    value: {
      name: 'root',
      children: [
        {
          name: '分组1', // 自动计算 value 为 220
          children: [
            { name: '分组1-1', count: 100 },
            { name: '分组1-2', count: '120' },
          ],
        },
        {
          name: '分组2', // 自动计算 value 为 190
          count: 220, // 为了映射合理，不会采用自身的 value
          children: [
            { name: '分组2-1', count: 'aaa' }, // 不符合数值的参数
            { name: '分组2-2', count: '190' },
          ],
        },
      ],
    },
  },
  encode: { value: 'count' },
}
```

树形结构数据内部转化为平铺数据：

```js
{
  data: [
    { 'ancestor-node': '分组1', path: '分组1', value: 220, x: [0, 0.536...], y: [0.333.., 0.666...], depth: 1, ... },
    { 'ancestor-node': '分组2', path: '分组2', value: 190, x: [0.536..., 1], y: [0.333.., 0.666...], depth: 1, ... },
    { 'ancestor-node': '分组1', path: '分组1 / 分组1-2', value: 120, x: [0, 0.292...],y: [0.666..., 1], depth: 2, ... },
    { 'ancestor-node': '分组1', path: '分组1 / 分组1-1', value: 100, ... },
    { 'ancestor-node': '分组2', path: '分组2 / 分组2-2', value: 190, ... },
    { 'ancestor-node': '分组2', path: '分组2 / 分组2-1', value: 0, ... }, // 不符合数值默认为 0
  ],
}
```

#### color

`color` 视觉通道影响 `sunburst` 图形标记的填充颜色。在区间图上应用时一般映射分类字段，对数据进行分组，默认为内置 `ancestor-node` 路径分组。

```js | ob { inject: true }
import { plotlib } from '@antv/g2-extension-plot';
import { Runtime, corelib, extend } from '@antv/g2';

const Chart = extend(Runtime, { ...corelib(), ...plotlib() });

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'sunburst',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json',
  },
  encode: {
    value: 'sum',
    color: 'name',
  },
});

chart.render();
```

尝试使用回调进行分组：

```js | ob { inject: true }
import { Runtime, corelib, extend } from '@antv/g2';

const Chart = extend(Runtime, { ...corelib(), ...g2ExtensionPlot.plotlib() });

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'sunburst',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json',
  },
  encode: {
    value: 'sum',
    color: (data) => {
      const paths = data.path.split(' / ');
      return [paths[0], paths[1]].join('/');
    },
  },
});

chart.render();
```

### coordinate

`sunburst` 默认配置了极坐标:

```js
{
  coordinate: {
    type: 'polar',
    innerRadius: 0.2,
  }
}
```

可外部配置极坐标坐标 `polar` :

```js | ob { inject: true }
import { Runtime, corelib, extend } from '@antv/g2';

const Chart = extend(Runtime, { ...corelib(), ...g2ExtensionPlot.plotlib() });

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'sunburst',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json',
  },
  encode: { value: 'sum' },
  coordinate: {
    type: 'polar',
    innerRadius: 0.3,
    outerRadius: 0.9,
  },
});

chart.render();
```

还原为直角坐标系 `cartesian` :

```js | ob { inject: true }
import { Runtime, corelib, extend } from '@antv/g2';

const Chart = extend(Runtime, { ...corelib(), ...g2ExtensionPlot.plotlib() });

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'sunburst',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json',
  },
  encode: { value: 'sum' },
  coordinate: { type: 'cartesian' },
});

chart.render();
```

### interaction

`sunburst` 默认配置内置了 `drillDown` 交互事件,

```js | ob { inject: true }
import { Runtime, corelib, extend } from '@antv/g2';

const Chart = extend(Runtime, { ...corelib(), ...g2ExtensionPlot.plotlib() });

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'sunburst',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json',
  },
  encode: { value: 'sum' },
  interaction: {
    drillDown: {
      // 面包屑样式
      breadCrumb: {
        rootText: '总名称',
        style: {
          fontSize: '18px',
          fill: '#333',
        },
        active: {
          fill: 'red',
        },
      },
      // 用于下钻后是否维持原来颜色
      isFixedColor: true,
    },
  },
});

chart.render();
```

### style

`style` 用于设置图表元素的外观样式，包括填充颜色、边框样式、阴影效果等。

| 属性              | 描述                                                                                                          | 类型                                                               | 默认值    |
| ----------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | --------- |
| radius            | 矩形的四个圆角大小                                                                                            | number \| (datum, index, data, column) => number                   | `0`       |
| radiusTopLeft     | 左上角的圆角                                                                                                  | number \| (datum, index, data, column) => number                   | `0`       |
| radiusTopRight    | 右上角的圆角                                                                                                  | number \| (datum, index, data, column) => number                   | `0`       |
| radiusBottomRight | 右下角的圆角                                                                                                  | number \| (datum, index, data, column) => number                   | `0`       |
| radiusBottomLeft  | 左下角的圆角                                                                                                  | number \| (datum, index, data, column) => number                   | `0`       |
| inset             | 矩形四个方向的内边距                                                                                          | number \| (datum, index, data, column) => number                   | `0`       |
| insetLeft         | 左边的内间距                                                                                                  | number \| (datum, index, data, column) => number                   | `0`       |
| insetRight        | 右边的内间距                                                                                                  | number \| (datum, index, data, column) => number                   | `0`       |
| insetBottom       | 下面的内间距                                                                                                  | number \| (datum, index, data, column) => number                   | `0`       |
| insetTop          | 上面的内间距                                                                                                  | number \| (datum, index, data, column) => number                   | `0`       |
| fill              | 图形的填充色                                                                                                  | number \| (datum, index, data, column) => string                   | -         |
| fillOpacity       | 图形的填充透明度                                                                                              | number \| (datum, index, data, column) => number                   | -         |
| stroke            | 图形的描边                                                                                                    | number \| (datum, index, data, column) => string                   | -         |
| strokeOpacity     | 描边透明度                                                                                                    | number \| (datum, index, data, column) => number                   | -         |
| lineWidth         | 图形描边的宽度                                                                                                | number \| (datum, index, data, column) => number                   | -         |
| lineDash          | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0, 0]的效果为没有描边。 | [number,number] \|(datum, index, data, column) => [number, number] | -         |
| opacity           | 图形的整体透明度                                                                                              | number \| (datum, index, data, column) => number                   | -         |
| shadowColor       | 图形阴影颜色                                                                                                  | number \| (datum, index, data, column) => string                   | -         |
| shadowBlur        | 图形阴影的高斯模糊系数                                                                                        | number \| (datum, index, data, column) => number                   | -         |
| shadowOffsetX     | 设置阴影距图形的水平距离                                                                                      | number \| (datum, index, data, column) => number                   | -         |
| shadowOffsetY     | 设置阴影距图形的垂直距离                                                                                      | number \| (datum, index, data, column) => number                   | -         |
| cursor            | 鼠标样式。同 css 的鼠标样式，默认 'default'。                                                                 | number \| (datum, index, data, column) => string                   | 'default' |

尝试一下

```js | ob { inject: true }
import { plotlib } from '@antv/g2-extension-plot';
import { Runtime, corelib, extend } from '@antv/g2';

const Chart = extend(Runtime, { ...corelib(), ...plotlib() });

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .sunburst()
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json',
  })
  .encode('value', 'sum')
  .style({
    radius: 8,
    // 内置透明度 fillOpacity ，根据 0.85 ** depth 层级计算,
    fillOpacity: (v) => v['fillOpacity'],
    fill: (v) => {
      if (v['path'] === '类别 3') return 'red';
      if (v['name'] === '类别 2.1.1') return 'red';
    },
  });

chart.render();

```

更多的`style`配置，可以查看 [style](/manual/core/style) 介绍页面。
