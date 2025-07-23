---
title: 提示信息（Tooltip）
order: 7.5
---

## 概述

`Tooltip` 是图表交互的核心组件之一，用于动态展示数据点的详细信息，帮助用户快速理解图表中特定区域的数值、分类或其他维度信息。它能够在鼠标悬停、点击或移动到图表中的某个元素（如柱状图中的柱子、折线图中的数据点）时，动态显示相关的数据信息。

- **显示详细信息**：Tooltip 可以显示有关数据点的详细信息，例如具体数值、百分比或其他相关属性。这有助于用户更深入地了解数据。
- **提高可读性**：在复杂的可视化中，Tooltip 可以帮助用户更容易地识别和理解数据点。例如，在散点图中，当数据点密集时，Tooltip 可以显示特定点的详细信息，而无需将鼠标悬停在每个点上。
- **增强交互性**：Tooltip 可以增强可视化的交互性。用户可以通过悬停或点击数据点来查看更多信息，这使得可视化更加动态和有趣。
- **突出显示关键信息**：Tooltip 可以用来突出显示关键信息。例如，在时间序列图中，您可以使用 Tooltip 显示特定时间点的重要事件或突变。
- **支持多种触发方式**：可以通过鼠标悬停（hover）、点击（click）、触摸（touch）等事件触发显示。

### 构成元素

<img alt="tooltip" width=900 src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*_NcgQbSbuBoAAAAAAAAAAAAAemJ7AQ/original" />

### 使用方式

```js
chart.options({
  type: 'interval',
  tooltip: {
    title: 'name', // 标题
    items: ['genre'], // 数据项
  },
});
```

并且结合 `view.interaction.tooltip` 去配置提示信息的渲染和额外配置。

```js
chart.options({
  type: 'view',
  interaction: {
    tooltip: { series: true },
  },
});
```

当该视图中只有一个标记的时候，通过 `mark.interaction.tooltip` 配置提示信息的渲染和额外配置也是可以的。

```js
chart.options({
  type: 'line',
  interaction: {
    tooltip: { series: true },
  },
});
```

如果希望不展示该 tooltip 的提示信息，可以通过下面的配置关闭。

```js
chart.options({
  type: 'interval',
  tooltip: false,
});
```

如果希望图表没有提示信息交互，可以通过 `chart.interaction` 实现。

```js
chart.options({
  type: 'view',
  interaction: { tooltip: false },
});
```

尝试一下

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .line()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/indices.json',
  })
  .transform({ type: 'normalizeY', basis: 'first', groupBy: 'color' })
  .encode('x', (d) => new Date(d.Date))
  .encode('y', 'Close')
  .encode('color', 'Symbol')
  .axis('y', { title: '↑ Change in price (%)' })
  .tooltip({
    title: (d) => new Date(d.Date).toUTCString(),
    items: [
      (d, i, data, column) => ({
        name: 'Close',
        value: column.y.value[i].toFixed(1),
      }),
    ],
  })
  .label({
    text: 'Symbol',
    selector: 'last',
    fontSize: 10,
  });

chart.render();
```

## 配置项

配置项分为两个部分

- `tooltip` 是 G2 中用于展示数据点的详细信息的一个 UI 组件。当用户将鼠标悬停在图表的某个数据点上时，tooltip 会显示该数据点的相关信息，比如坐标值、度量值等。

- `interaction.tooltip` 是 G2 的交互机制的一部分，属于 interaction（交互）模块。它是一种内置的交互行为，用于增强工具提示的功能，特别是在某些特定的交互场景下（如动态显示或隐藏工具提示）。

`tooltip` 和 `interaction.tooltip` 中的 tooltip 是两个不同维度的配置，但容易混淆。以下是它们的核心区别:

| 特性     | tooltip                            | interaction.tooltip                       |
| -------- | ---------------------------------- | ----------------------------------------- |
| 职责     | 定义工具提示的内容、样式和基本行为 | 定义工具提示在交互场景下的行为            |
| 配置方式 | 通过 chart.tooltip() 配置          | 通过 chart.interaction() 启用或自定义     |
| 作用范围 | 全局生效，影响整个图表             | 与特定交互行为绑定                        |
| 典型用途 | 设置工具提示的字段、样式、内容等   | 控制工具提示的动态显示/隐藏或其他交互逻辑 |

### tooltip

| 属性      | 描述                                                                                                                                            | 类型            | 默认值 | 适用于           |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------ | ---------------- |
| title     | 设置`tooltip`的标题内容：如果值为数据字段名，则会展示数据中对应该字段的数值，如果数据中不存在该字段，将该值作为 title。详见[title 配置](#title) | [title](#title) |        |                  |
| nodeTitle | 设置复合图形`tooltip`标题的节点`title`属性                                                                                                      | [title](#title) |        | 桑基图等复合图形 |
| linkTitle | 设置复合图形`tooltip`标题的弦`title`属性                                                                                                        | [title](#title) |        | 桑基图等复合图形 |
| items     | 指定`tooltip`中显示的字段，默认不同图表有不同的默认字段列表。配合 channel 配置一起使用，效果更佳。详见[items 配置](#items)                      | [items](#items) |        |                  |
| nodeItems | 设置复合图形`tooltip`标题的节点`items`属性                                                                                                      | [items](#items) |        | 桑基图等复合图形 |
| linkItems | 设置复合图形`tooltip`标题的弦`items`属性                                                                                                        | [items](#items) |        | 桑基图等复合图形 |

#### title

`title`是一个用于显示当前悬停数据点的 主标题 的字段，通常用于表示数据点所属的分类或上下文信息。

`title`可以直接写入一个固定显示的字符串，或者一个方法从`data`中动态获取标题

```js
chart.options({
  type: 'interval',
  tooltip: {
    title: (d) => (d.sold > 150 ? 'high' : 'low'), // 设置 title
  },
});
```

在不需要自定义 title 的时候，可以直接声明 tooltip 为一个数组，此时的 title 将会使用默认配置：

```js
chart.options({
  type: 'interval',
  tooltip: ['genre', 'sold'],
});
```

其中完整的 title 结构如下：
| 细分配置项名称 | 类型 | 功能描述 |
| -------------- | ------ | ------------- |
| channel | `string` | 定义生成 title 的通道 |
| field | `string` | 定义生成 title 的的字段 |
| value | `string` | title 的值 |
| valueFormatter | `string` \| `Function` | 格式化 title |

- **字段**

它们的值（value）可以通过来自原始数据，通过字符串或者 `title.field` 指定。

```js
chart.options({
  tooltip: {
    title: 'sold',
    items: ['genre'],
  },
});
```

```js
// 等价于
chart.options({
  tooltip: {
    title: { field: 'sold' },
    items: [{ field: 'genre' }],
  },
});
```

- **通道**

它们的值（value）可以来自通道值，通过 `title.channel` 指定，常常用于使用 `mark.transform` 生成新通道的图表。

```js
chart.options({
  tooltip: {
    title: { channel: 'x' },
    items: [{ channel: 'y' }],
  },
});
```

- **格式化**

可以通过 `title.valueFormatter` 去指定 title 值（value）的展示，`title.valueFormatter` 可以是一个函数，也可以一个 d3-format 支持的字符串。

```js
chart.options({
  tooltip: {
    title: { field: 'sold', valueFormatter: (sold) => sold.toUpperCase() },
    items: [{ channel: 'y', valueFormatter: '.0%' }],
  },
});
```

- **个性化配置**

当然对于 title 还提供了回调去获得最大的个性化配置能力。

```js
chart.options({
  tooltip: {
    title: (datum, index, data, column) => ({
      value: `<span style="color: #00ff00; font-style: italic;">${datum.letter}</span>`,
      custom: '...',
    }),
    items: [
      (datum, index, data, column) => ({
        color: datum.sold > 150 ? 'red' : 'blue', // 指定 item 的颜色
        name: index === 0 ? datum.genre : `${datum.genre} ${data[index].genre}`, // 指定 item 的名字
        value: column.y.value[index], // 使用 y 通道的值
        custom: '...',
      }),
    ],
  },
});
```

items 返回值可用作 `interaction.tooltip.render` 的入参，您可以设置一些自定义参数。详见[自定义渲染内容](#自定义渲染内容)

**复合图形配置**

复合图形在配置`tooltip.title` 时需要分别配置节点与弦

```js
({
  tooltip: {
    nodeTitle: (d) => d.key,
    linkTitle: (d) => 'link',
  },
});
```

#### items

`items` 是 tooltip 配置中的一个关键属性，`items` 是一个数组，表示工具提示中每一项的内容。每一项通常对应于一个数据字段或一个图形元素（例如柱状图的一根柱子、折线图的一个点等）。通过自定义 `items`，可以灵活地控制工具提示的显示内容，包括名称、值、颜色等信息。

其中完整的 title 结构如下：
| 细分配置项名称 | 类型 | 功能描述 |
| -------------- | ------ | ------------- |
| color | `string` | marker 的颜色 |
| field | `string` | 定义生成 item 的的字段 |
| name | `string` | item 的名字 |
| value | `string` | item 的值 |
| channel | `string` | 定义生成 item 的值的通道 |
| valueFormatter | `string` \| `Function`| 格式化 item |

**`items` 的 `value`、`channel`、`valueFormatter`属性的配置方式与`title`一致，详细配置请参考[title](#title)**

**名称**

通过`name`可以便捷的修改`tooltip`中`item`的名字，通过`channel`来匹配图标中对应的条目。

```js
chart.options({
  tooltip: {
    items: [
      { name: '张三', channel: 'y1' },
      { name: '李四', channel: 'y2' },
    ],
  },
});
```

**颜色**

`tooltip`会自动根据图标内容分配`tooltip` `item`的颜色，但是实际应用中，可能需要根据一些规则来指定某些颜色，此时就可以通过`color`属性来配置。通过`channel`来匹配图标中对应的条目。

```js
chart.options({
  tooltip: {
    items: [
      { color: 'pink', channel: 'y1' },
      { color: '#f00', channel: 'y2' },
    ],
  },
});
```

**复合图形配置**

复合图形在配置`tooltip.items` 时需要分别配置节点与弦

```js
({
  tooltip: {
    nodeItems: [
      (datum, index, data, column) => {
        return {
          color: 'red', // 指定 item 的颜色
          name: '节点', // 指定 item 的名字
          value: d.key, // 使用 y 通道的值
          content: '节点自定义属性',
        };
      },
    ],
    linkItems: [
      (datum, index, data, column) => {
        return {
          color: 'red', // 指定 item 的颜色
          name: '连接线', // 指定 item 的名字
          value: `${d.source.key}-${d.target.key}`, // 使用 y 通道的值
          content: '连接线自定义属性',
        };
      },
    ],
  },
});
```

### interaction.tooltip

| 属性          | 描述                                                                                                              | 类型                                                                                                                   | 默认值                         | 适用于               |
| ------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------ | -------------------- |
| body          | 是否展示 tooltip                                                                                                  | `boolean`                                                                                                              | `true`                         |                      |
| bounding      | 控制 tooltip 提示框的显示边界，超出会自动调整位置                                                                 | `{ x: number, y: number, width: number, height: number }`                                                              | 图表区域大小                   |                      |
| css           | 设置 tooltip 的 css 样式                                                                                          | [css](#设置样式)                                                                                                       | -                              |                      |
| crosshairs    | 配置十字辅助线 `crosshairs` 的样式                                                                                | [crosshairs](#crosshairs)                                                                                              | 详见 [crosshairs](#crosshairs) |                      |
| disableNative | 禁用原生的 pointerover 和 pointerout 事件，需要自定义 tooltip 交互的时候需要设置为 true                           | `boolean`                                                                                                              | `false`                        |                      |
| enterable     | tooltip 是否允许鼠标滑入                                                                                          | `boolean`                                                                                                              | `false`                        |                      |
| facet         | 是否是分面图的 tooltip                                                                                            | `boolean`                                                                                                              | `false`                        | 分面复合图表         |
| filter        | item 筛选器                                                                                                       | `(d: TooltipItemValue) => any`                                                                                         | -                              |                      |
| groupName     | 是否使用 groupName                                                                                                | `boolean`                                                                                                              | `true`                         |                      |
| leading       | 是否在时间间隔开始的时候更新提示信息                                                                              | `boolean`                                                                                                              | `true`                         |                      |
| marker        | 配置标记点 `marker` 的样式                                                                                        | [marker](#marker)                                                                                                      | 详见 [marker](#marker)         |                      |
| markerType    | markerType 用于控制显示提示信息时，选中标记点（Marker）的样式是空心还是实心，默认为实心，配置为`'hollow'`则为空心 | `'hollow' \| undefined`                                                                                                | `undefined`                    |                      |
| mount         | 指定提示框的挂载节点                                                                                              | `string` \| `HTMLElement`                                                                                              | 图表容器                       |                      |
| position      | 设置 tooltip 的固定展示位置，相对于数据点                                                                         | `'top'` \| `'bottom'` \| `'left'` \| `'right'` \| `'top-left'` \| `'top-right'` \| `'bottom-left'` \| `'bottom-right'` | `'right-bottom'`               |                      |
| offset        | 在位置方向上的偏移量                                                                                              | `[number, number]`                                                                                                     | `[10, 10]`                     |                      |
| render        | [自定义渲染 tooltip 内容](#自定义渲染内容)                                                                        | `(event, options) => HTMLElement \| string`                                                                            | -                              |                      |
| series        | 是否是系列元素的 tooltip                                                                                          | `boolean`                                                                                                              | `false`                        | 多条折线、多组柱状图 |
| shared        | 相同 x 的元素是否共享 tooltip                                                                                     | `boolean`                                                                                                              | `false`                        |                      |
| sort          | item 排序器                                                                                                       | `(d: TooltipItemValue) => any`                                                                                         | -                              |                      |
| trailing      | 是否在时间间隔结束的时候更新提示信息                                                                              | `boolean`                                                                                                              | `false`                        |                      |
| wait          | 提示信息更新的时间间隔，单位为毫秒                                                                                | `number`                                                                                                               | `50`                           |                      |

#### crosshairs

`crosshairs` 是提示框（Tooltip）的辅助线功能，用于在图表中标记当前数据点的精确位置，主要用于连续图形，例如折线图、面积图。通常以横向或纵向的参考线形式呈现，帮助用户更直观地定位数据。

另外，通过前缀`crosshairsX` 和 `crosshairsY` 设置样式的优先级比 `crosshairs`高，会覆盖后者。

| 属性                     | 描述                                                                         | 类型            | 默认值    | 必选 |
| ------------------------ | ---------------------------------------------------------------------------- | --------------- | --------- | ---- |
| crosshairs               | 是否显示十字辅助线                                                           | boolean         | `true`    |      |
| crosshairsStroke         | 十字辅助线的颜色                                                             | string          | -         |      |
| crosshairsStrokeOpacity  | 十字辅助线的透明度                                                           | number          | -         |      |
| crosshairsLineWidth      | 十字辅助线的描边宽度                                                         | number          | -         |      |
| crosshairsLineDash       | 十字辅助线的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离 | [number,number] | -         |      |
| crosshairsOpacity        | 十字辅助线的整体透明度                                                       | number          | -         |      |
| crosshairsShadowColor    | 十字辅助线的阴影颜色                                                         | string          | -         |      |
| crosshairsShadowBlur     | 十字辅助线的阴影高斯模糊系数                                                 | number          | -         |      |
| crosshairsShadowOffsetX  | 十字辅助线阴影的水平方向偏移量                                               | number          | -         |      |
| crosshairsShadowOffsetY  | 十字辅助线阴影的垂直方向偏移量                                               | number          | -         |      |
| crosshairsCursor         | 十字辅助线的鼠标样式                                                         | string          | `default` |      |
| crosshairsX              | 是否显示水平方向辅助线                                                       | boolean         | `false`   |      |
| crosshairsXStroke        | 水平方向辅助线的颜色                                                         | string          | -         |      |
| crosshairsXStrokeOpacity | 水平方向辅助线的透明度                                                       | number          | -         |      |
| crosshairsXLineWidth     | 水平方向辅助线的描边宽度                                                     | number          | -         |      |
| crosshairsXLineDash      | 水平方向辅助线的虚线配置                                                     | [number,number] | -         |      |
| crosshairsXOpacity       | 水平方向辅助线的整体透明度                                                   | number          | -         |      |
| crosshairsXShadowColor   | 水平方向辅助线的阴影颜色                                                     | string          | -         |      |
| crosshairsXShadowBlur    | 水平方向辅助线的阴影高斯模糊系数                                             | number          | -         |      |
| crosshairsXShadowOffsetX | 水平方向辅助线阴影的水平方向偏移量                                           | number          | -         |      |
| crosshairsXShadowOffsetY | 水平方向辅助线阴影的垂直方向偏移量                                           | number          | -         |      |
| crosshairsXCursor        | 水平方向辅助线的鼠标样式                                                     | string          | `default` |      |
| crosshairsY              | 是否显示垂直方向辅助线                                                       | boolean         | `true`    |      |
| crosshairsYStroke        | 垂直方向辅助线的颜色                                                         | string          | -         |      |
| crosshairsYStrokeOpacity | 垂直方向辅助线的透明度                                                       | number          | -         |      |
| crosshairsYLineWidth     | 垂直方向辅助线的描边宽度                                                     | number          | -         |      |
| crosshairsYLineDash      | 垂直方向辅助线的虚线配置                                                     | [number,number] | -         |      |
| crosshairsYOpacity       | 垂直方向辅助线的整体透明度                                                   | number          | -         |      |
| crosshairsYShadowColor   | 垂直方向辅助线的阴影颜色                                                     | string          | -         |      |
| crosshairsYShadowBlur    | 垂直方向辅助线的阴影高斯模糊系数                                             | number          | -         |      |
| crosshairsYShadowOffsetX | 垂直方向辅助线阴影的水平方向偏移量                                           | number          | -         |      |
| crosshairsYShadowOffsetY | 垂直方向辅助线阴影的垂直方向偏移量                                           | number          | -         |      |
| crosshairsYCursor        | 垂直方向辅助线的鼠标样式                                                     | string          | `default` |      |

```js
chart.options({
  interaction: {
    legendFilter: false,
    elementPointMove: true,
    tooltip: {
      crosshairs: true, // 启用十字辅助线
      crosshairsStroke: 'red', // 辅助线颜色为红色
      crosshairsYStroke: 'yellow', // 垂直方向辅助线颜色单独设置为黄色
      crosshairsLineDash: [4, 4], // 辅助线为虚线样式
      markerType: 'hollow', // 提示框标记点为空心
    },
  },
});
```

#### marker

| 属性                | 描述                                                                         | 类型            | 默认值    | 必选 |
| ------------------- | ---------------------------------------------------------------------------- | --------------- | --------- | ---- |
| marker              | 是否展示标记点                                                               | boolean         | `true`    |      |
| markerFill          | 标记点的填充色                                                               | string          | -         |      |
| markerFillOpacity   | 标记点的填充透明度                                                           | number          | -         |      |
| markerStroke        | 标记点的描边颜色                                                             | string          | -         |      |
| markerStrokeOpacity | 标记点的描边透明度                                                           | number          | -         |      |
| markerLineWidth     | 标记点的描边宽度                                                             | number          | -         |      |
| markerLineDash      | 标记点的描边虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离 | [number,number] | -         |      |
| markerOpacity       | 标记点的整体透明度                                                           | number          | -         |      |
| markerShadowColor   | 标记点的阴影颜色                                                             | string          | -         |      |
| markerShadowBlur    | 标记点的阴影高斯模糊系数                                                     | number          | -         |      |
| markerShadowOffsetX | 标记点阴影的水平方向偏移量                                                   | number          | -         |      |
| markerShadowOffsetY | 标记点阴影的垂直方向偏移量                                                   | number          | -         |      |
| markerCursor        | 标记点的鼠标样式                                                             | string          | `default` |      |

```js
chart.options({
  interaction: {
    tooltip: {
      marker: true,
      markerType: 'hollow', // 提示框标记点为空心
      markerStroke: 'yellow',
      markerLineWidth: 2,
      markerLineDash: [4, 4],
    },
  },
});
```

#### 设置样式

`tooltip` 的 cssStyle 配置项允许通过 CSS 样式直接自定义提示框的外观， 可快速实现提示框的视觉定制，适配不同主题或交互场景需求。

<img alt="tooltip" width=900 src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*J1N_RKY7FtkAAAAAAAAAAAAAemJ7AQ/original" />

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  },
  encode: {
    x: 'state',
    y: 'population',
    color: 'age',
  },
  transform: [
    { type: 'sortX', by: 'y', reverse: true, reducer: 'sum', slice: 6 },
    { type: 'dodgeX' },
  ],
  legend: false,
  interaction: {
    tooltip: {
      shared: true,
      mount: 'body',
      css: {
        '.g2-tooltip': {
          background: '#eee',
          'border-radius': ' 0.25em !important',
        },
        '.g2-tooltip-title': {
          'font-size': '20px',
          'font-weight': 'bold',
          'padding-bottom': '0.25em',
        },
        '.g2-tooltip-list-item': {
          background: '#ccc',
          padding: '0.25em',
          margin: '0.25em',
          'border-radius': '0.25em',
        },
        '.g2-tooltip-list-item-name-label': {
          'font-weight': 'bold',
          'font-size': '16px',
        },
        'g2-tooltip-list-item-marker': {
          'border-radius': '0.25em',
          width: '15px',
          height: '15px',
        },
        '.g2-tooltip-list-item-value': {
          'font-weight': 'bold',
          'font-size': '16px',
        },
      },
    },
  },
});

chart.render();
```

尝试一下

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
    format: 'csv',
  })
  .transform({ type: 'sortX', by: 'y', reverse: true, slice: 6 })
  .transform({ type: 'dodgeX' })
  .encode('x', 'state')
  .encode('y', 'population')
  .encode('color', 'age')
  .scale('y', { nice: true })
  .axis('y', { labelFormatter: '~s' })
  .interaction('tooltip', {
    shared: true,
    css: {
      '.g2-tooltip': {
        background: '#eee',
        'border-radius': ' 0.25em !important',
      },
      '.g2-tooltip-title': {
        'font-size': '20px',
        'font-weight': 'bold',
        'padding-bottom': '0.25em',
      },
      '.g2-tooltip-list-item': {
        background: '#ccc',
        padding: '0.25em',
        margin: '0.25em',
        'border-radius': '0.25em',
      },
      '.g2-tooltip-list-item-name-label': {
        'font-weight': 'bold',
        'font-size': '16px',
      },
      'g2-tooltip-list-item-marker': {
        'border-radius': '0.25em',
        width: '15px',
        height: '15px',
      },
      '.g2-tooltip-list-item-value': {
        'font-weight': 'bold',
        'font-size': '16px',
      },
    },
  });

chart.render();
```

#### 自定义渲染内容

有时候内置的 Tooltip 无法满足需求，这时候可以通过 `mark.interaction.tooltip.render` 或者 `view.interaction.tooltip.render` 的 _render_ 函数来渲染自定义的提示。

该 _render_ 函数接受事件对象 _event_ 和提示数据 _tooltipData_，返回一个 string 或者 DOM 对象。其中 _event_ 是 [@antv/g](https://g.antv.antgroup.com/) 抛出的鼠标对象，_tooltipData_ 是通过 `mark.tooltip` 声明的 title 和 items 数据。如果返回值是一个 string，那么会作为 tooltip 容器的 innerHTML，否则会挂载该返回值。一个提示的 render 函数的定义大概如下：

```js
function render(event, tooltipData) {
  const { title, items } = tooltipData;
  return `<div></div>`;
}
```

下面是一个简单的例子：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  })
  .transform([{ type: 'sortX', by: 'y', reverse: true }])
  .encode('x', 'letter')
  .encode('y', 'frequency')
  .interaction('tooltip', {
    // render 回调方法返回一个innerHTML 或者 DOM
    render: (event, { title, items }) => `<div>
      <h3 style="padding:0;margin:0">${title}</h3>
      <ul>${items.map(
        (d) =>
          `<li><span style="color: ${d.color}">${d.name}</span> ${d.value}</li>`,
      )}</ul>
      </div>`,
  });

chart.render();
```

## 事件

chart.on() 方法将指定的监听器注册到 chart 上，当该对象触发指定的事件时，指定的回调函数就会被执行。

以下是如何配置配置 tooltip 显示隐藏事件的示例：

```js
chart.on('tooltip:show', (event) => {
  console.log(event.data.data);
});

chart.on('tooltip:hide', () => {
  console.log('hide');
});
```

尝试一下

```js | ob { inject: true }
/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/layer_histogram_global_mean.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/movies.json',
  transform: [
    {
      type: 'filter',
      callback: (d) => d['IMDB Rating'] > 0,
    },
  ],
});

chart
  .rect()
  .transform({ type: 'binX', y: 'count', thresholds: 9 })
  .encode('x', 'IMDB Rating')
  .scale('y', { domainMax: 1000 })
  .style('inset', 1);

chart
  .lineX()
  .transform({ type: 'groupColor', x: 'mean' }) // groupColor 为分组并对指定的通道进行聚合，可以理解为把数据通过 x 通道的数据 取平均值(mean) 变更为一条数据。
  .encode('x', 'IMDB Rating')
  .style('stroke', '#F4664A')
  .style('strokeOpacity', 1)
  .style('lineWidth', 2)
  .style('lineDash', [4, 4]);

chart.render();
```

## 示例

### title

```js
mark.tooltip({
  title: 'name', // 字段
});

mark.tooltip({
  title: (d) => (d.value > 100 ? d.name : d.age), // transform
});
```

### item

```js
// 单个字段
mark.tooltip('a');
mark.tooltip({ field: 'a' });

// 单个通道
mark.tooltip({ channel: 'y' });

// transform
mark.tooltip((d) => (d.value > 100 ? d.name : d.age));

// 格式化
mark.tooltip({ channel: 'y', valueFormatter: (d) => d.toFixed(1) });

// d3-format 支持的字符
// https://github.com/d3/d3-format
mark.tooltip({ channel: 'y', valueFormatter: '~s' });

// 完整信息
mark.tooltip({ name: 'name', color: 'red', value: 'color' });

// 回调
mark.tooltip(
  (
    d, // 每一个数据项
    index, // 索引
    data, // 完整数据
    column, // 通道
  ) => ({
    value: `${column.y.value[index]} - ${column.y1.value[index]}`,
  }),
);

// 多个 item
mark.tooltip({ channel: 'y' }).tooltip({ channel: 'x' });
```

### title + item

```js
mark.tooltip({
  title: 'a',
  items: [{ channel: 'x' }, { channel: 'y' }],
});
```

### 过滤空值数据

当数据中存在 null 或 undefined 值时，可以通过 `interaction.tooltip.filter` 来过滤掉这些无效数据，避免在 tooltip 中显示。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  data: [
    { month: 'Jan', city: 'Tokyo', temperature: null },
    { month: 'Jan', city: 'London', temperature: 3.9 },
    { month: 'Feb', city: 'Tokyo', temperature: 8 },
    { month: 'Feb', city: 'London', temperature: 4.2 },
    { month: 'Mar', city: 'Tokyo', temperature: 9.5 },
    { month: 'Mar', city: 'London', temperature: 5.7 },
  ],
  encode: { x: 'month', y: 'temperature', color: 'city' },
  // 添加interaction配置来过滤null值
  interaction: {
    tooltip: {
      filter: (d) => d.value !== null && d.value !== undefined,
    },
  },
  children: [
    {
      type: 'line',
      encode: { shape: 'smooth' },
      tooltip: {
        items: [{ channel: 'y' }],
      },
    },
    { type: 'point', encode: { shape: 'point' }, tooltip: false },
  ],
});

chart.render();
```

更多过滤选项：

```js
// 只过滤null值
filter: (d) => d.value !== null;

// 过滤null、undefined和空字符串
filter: (d) => d.value !== null && d.value !== undefined && d.value !== '';

// 过滤所有"假值"（null, undefined, 0, false, ''等）
filter: (d) => Boolean(d.value);

// 按name过滤特定字段（比如只过滤temperature字段的null值）
filter: (d) =>
  d.name !== 'temperature' || (d.value !== null && d.value !== undefined);
```

### 怎么将 data 中额外的数据作为自定义 render 函数的参数

render 函数提供了强大的个性化配置能力，通过对`tooltip.render`函数返回参数的配置，自定义`interaction.tooltip.render`的入参

```js
chart.options({
  tooltip: {
    items: [
      (datum, index, data, column) => ({
        color: datum.sold > 150 ? 'red' : 'blue', // 指定 item 的颜色
        name: index === 0 ? datum.genre : `${datum.genre} ${data[index].genre}`, // 指定 item 的名字
        value: column.y.value[index], // 使用 y 通道的值
        custom1: '自定义参数1',
        custom2: '自定义参数2',
      }),
    ],
  },
  interaction: {
    tooltip: {
      // render 回调方法返回一个innerHTML 或者 DOM
      render: (event, { title, items }) => {
        return `<div>
          <h3 style="padding:0;margin:0">${title}</h3>
          <ul>${items.map(
            ({ color, name, value, custom1, custom2 }) => '...',
          )}</ul>
        </div>`;
      },
    },
  },
});
```

### 手动控制展示/隐藏

对于 Interval、Point 等非系列 Mark，控制展示的方式如下：

```js
// 条形图、点图等
chart
  .interval()
  .data([
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ])
  .encode('x', 'genre')
  .encode('y', 'sold')
  .encode('color', 'genre');

chart.render().then((chart) =>
  chart.emit('tooltip:show', {
    offsetX: 10, // 相对于 plot 区域的位置
    offsetX: 20, // 相对于 plot 区域的位置
    data: {
      data: { genre: 'Sports' }, // 会找从原始数据里面找到匹配的数据
    },
  }),
);
```

对于 Line、Area 等系列 Mark，控制展示的方式如下：

```js
chart
  .line()
  .data({ type: 'fetch', value: 'data/aapl.csv' })
  .encode('x', 'date')
  .encode('y', 'close');

// 根据数据拾取
chart.render((chart) =>
  chart.emit('tooltip:show', {
    data: {
      data: { x: new Date('2010-11-16') },
    },
  }),
);

// 根据像素拾取
chart.render((chart) =>
  chart.emit('tooltip:show', {
    offsetX: 200,
    offsetY: 200,
  }),
);
```

隐藏的方式如下：

```js
chart.emit('tooltip:hide');
```

### 开始/禁止交互

```js
chart.emit('tooltip:disable'); // 禁用 tooltip
chart.emit('tooltip:enable'); // 启用交互
```

### 设置十字辅助线

默认情况下，`crosshairsY`是开启的，`crosshairsX`是关闭的，所以如果要开启十字辅助线，有以下两种方式。

1. 设置`crosshairs`为`true`。

```js
chart.interaction('tooltip', {
  crosshairs: true, // 开启十字辅助线
  crosshairsXStroke: 'red', // 设置 X 轴辅助线颜色为'red'
  crosshairsYStroke: 'blue', // 设置 Y 轴辅助线颜色为'blue'
});
```

2. 设置`crosshairsX`为`true`。

```js
chart.interaction('tooltip', {
  crosshairsX: true, // 开启crosshairsX辅助线
  crosshairsXStroke: 'red', // 设置 X 轴辅助线颜色为'red'
  crosshairsYStroke: 'blue', // 设置 Y 轴辅助线颜色为'blue'
});
```

`crosshairsX`的优先级大于`crosshairs`的优先级。

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*_LFDT7p6hRQAAAAAAAAAAAAADmJ7AQ/original" width="640">

### 设置提示点为空心圆

```js
chart.interaction('tooltip', {
  markerType: 'hollow', // 设置提示点的样式为空心圆
});
```

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*s8KjQLiSyTwAAAAAAAAAAAAADmJ7AQ/original" width="640">

### 桑基图这种复合图形怎么使用 data 中的补充属性实现自定义 tooltip 的展示？

和一般`Mark`自定义`tooltip`交互的方法类似，先在图形的`tooltip.render`里返回自定义属性，然后在`interaction.render`里使用。

```js
({
  type: 'sankey',
  data: {
    value: {
      nodes: [
        { id: 'a', key: '首页', des: '节点自定义属性' },
        { id: 'b', key: '页面1', des: '节点自定义属性' },
        { id: 'b_1', key: '页面1', des: '节点自定义属性' },
        { id: 'c', key: '页面2', des: '节点自定义属性' },
        { id: 'c_1', key: '页面2', des: '节点自定义属性' },
        { id: 'd', key: '页面3', des: '节点自定义属性' },
        { id: 'd_1', key: '页面3', des: '节点自定义属性' },
      ],
      links: [
        { source: 'a', target: 'b', value: 100 },
        { source: 'b', target: 'c', value: 80 },
        { source: 'b', target: 'd', value: 20 },
        { source: 'c', target: 'b_1', value: 80 },
        { source: 'b_1', target: 'c_1', value: 40 },
        { source: 'b_1', target: 'd_1', value: 40 },
      ],
    },
    transform: [
      {
        type: 'custom',
        callback: (data) => ({
          nodes: data.nodes,
          links: data.links,
        }),
      },
    ],
  },
  tooltip: {
    nodeItems: [
      (datum, index, data, column) => {
        return {
          content: d.des,
        };
        z;
      },
    ],
    linkItems: [
      (datum, index, data, column) => {
        return {
          color: 'red', // 指定 item 的颜色
          name: '连接线', // 指定 item 的名字
          value: `${d.source.key}-${d.target.key}`, // 使用 y 通道的值
          content: '连接线自定义属性',
        };
      },
    ],
  },
  layout: {
    nodeId: (d) => d.id,
    nodeAlign: 'center',
    nodePadding: 0.03,
    iterations: 25,
  },
  style: {
    labelSpacing: 3,
    labelFontWeight: 'bold',
    linkFillOpacity: 0.2,
    linkFill: '#3F96FF',
  },
  interaction: {
    tooltip: {
      render: (e, { items, title }) => {
        return `<div>${items[0].content}</div>`;
      },
    },
  },
});
```
