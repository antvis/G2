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

<img alt="tooltip" width="100%" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*_NcgQbSbuBoAAAAAAAAAAAAAemJ7AQ/original" />

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
({
  type: 'view',
  interaction: { tooltip: false },
});
```

```js
chart.interaction('tooltip', false);
```

尝试一下

<Playground path="style/component/tooltip/demo/tooltip-series.ts" rid="area-style"></playground>

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

**tooltip**

| 属性  | 描述                                                                                                                                              | 类型            | 默认值 | 适用于 |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------ | ------ |
| title | 设置 `tooltip` 的标题内容：如果值为数据字段名，则会展示数据中对应该字段的数值，如果数据中不存在该字段，将该值作为 title。详见[title 配置](#title) | [title](#title) |        |        |
| items | 指定 `tooltip` 中显示的字段，默认不同图表有不同的默认字段列表。配合 channel 配置一起使用，效果更佳。详见[items 配置](#items)                      | [items](#items) |        |        |

**interaction.tooltip**

| 属性                  | 描述                                                                                     | 类型                                                    | 默认值  | 适用于               |
| --------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------- | ------- | -------------------- |
| enterable             | tooltip 是否允许鼠标滑入                                                                 | `boolean`                                               | `false` |                      |
| position              | 设置 tooltip 的固定展示位置，相对于数据点                                                | `'top'` \| `'bottom'` \| `'left'` \| `'right'`          |         |                      |
| crosshairs            | 配置是否显示 crosshairs，详见[crosshairs 配置](#crosshairs)                              | `boolean`                                               | `true`  |                      |
| crosshairsStroke      | 配置 `crosshairs` 显示的颜色                                                             | `string`                                                |         |                      |
| crosshairsStrokeWidth | 配置`crosshairs`十字辅助线的线条宽度                                                     | `number`                                                |         |                      |
| crosshairsLineDash    | 配置 `crosshairs` 虚线的间隔                                                             | `number[]`                                              |         |                      |
| crosshairsXStroke     | 配置 `crosshairs` X 轴显示的颜色                                                         | `string`                                                |         |                      |
| crosshairsYStroke     | 配置 `crosshairs` Y 轴显示的颜色                                                         | `string`                                                |         |                      |
| offset                | 在位置方向上的偏移量                                                                     | `number`                                                |         |                      |
| render                | 自定义渲染`tooltip`内容                                                                  | [render] (#自定义渲染内容)                              |         |                      |
| mount                 | 指定提示框的挂载节点                                                                     | `Function`                                              |         |                      |
| markerType            | markerType 是提示框（Tooltip）配置项中的一个属性，用于控制提示框中标记点（Marker）的样式 | `string`                                                |         |                      |
| bounding              | 控制`Tooltip`提示框的显示边界                                                            | `{x: number, y: number, height: number, width: number}` |         |                      |
| disableNative         | 禁用 pointerover 和 pointerout 事件                                                      | `boolean`                                               |         |                      |
| css                   | 设置 tooltip 样式                                                                        | [css](#设置样式)                                        |         |                      |
| series                | 控制是否跨系列显示统一提示框                                                             | `boolean`                                               |         | 多条折线、多组柱状图 |

### crosshairs

`crosshairs` 是提示框（Tooltip）的辅助线功能，用于在图表中标记当前数据点的精确位置，通常以横向或纵向的参考线形式呈现，帮助用户更直观地定位数据。

```js
chart.options({
  interaction: {
    legendFilter: false,
    elementPointMove: true,
    tooltip: {
      crosshairs: true, // 启用十字辅助线
      crosshairsStroke: 'red', // 辅助线颜色为红色
      crosshairsLineDash: [4, 4], // 辅助线为虚线样式
      markerType: 'hollow', // 提示框标记点为空心
    },
  },
});
```

### title

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

在不需要设置 title 的时候，可以直接声明为一个数组：

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
({
  tooltip: {
    title: { channel: 'x' },
    items: [{ channel: 'y' }],
  },
});
```

- **格式化**

可以通过 `title.valueFormatter` 去指定 title 值（value）的展示，`title.valueFormatter` 可以是一个函数，也可以一个 d3-format 支持的字符串。

```js
({
  tooltip: {
    title: {field: 'sold', valueFormatter: (sold) => sold.toUpperCase()}
    items: [{ channel: 'y', valueFormatter: '.0%' }],
  },
});
```

- **个性化配置**

当然对于 title 还提供了回调去获得最大的个性化配置能力。

```js
({
  tooltip: {
    title: (d, index, data, column) => ({
      value: `<span style="color: #00ff00; font-style: italic;">${d.letter}</span>`,
    }),
    items: [
      (d, index, data, column) => ({
        color: d.sold > 150 ? 'red' : 'blue', // 指定 item 的颜色
        name: index === 0 ? d.genre : `${d.genre} ${data[i].genre}`, // 指定 item 的名字
        value: column.y.value[i], // 使用 y 通道的值
      }),
    ],
  },
});
```

### items

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
      {name： '张三', channel: 'y1'},
      {name： '李四', channel: 'y2'},
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
      {color： 'pink', channel: 'y1'},
      {color： '#f00', channel: 'y2'},
    ],
  },
});
```

### 设置样式

`tooltip` 的 cssStyle 配置项允许通过 CSS 样式直接自定义提示框的外观， 可快速实现提示框的视觉定制，适配不同主题或交互场景需求。

<img alt="tooltip" width="100%" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*J1N_RKY7FtkAAAAAAAAAAAAAemJ7AQ/original" />

```js | ob
(() => {
  const chart = new G2.Chart();

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

  return chart.getContainer();
})();
```

尝试一下

<Playground path="style/component/tooltip/demo/tooltip-style.ts" rid="tooltip-style"></playground>

### 自定义渲染内容

有时候内置的 Tooltip 无法满足需求，这时候可以通过 `mark.interaction.tooltip.render` 或者 `view.interaction.tooltip.render` 的 _render_ 函数来渲染自定义的提示。

该 _render_ 函数接受事件对象 _event_ 和提示数据 _tooltipData_，返回一个 string 或者 DOM 对象。其中 _event_ 是 [@antv/g](https://g.antv.antgroup.com/) 抛出的鼠标对象，_tooltipData_ 是通过 `mark.tooltip` 声明的 title 和 items 数据。如果返回值是一个 string，那么会作为 tooltip 容器的 innerHTML，否则会挂载该返回值。一个提示的 render 函数的定义大概如下：

```js
function render(event, tooltipData) {
  const { title, items } = tooltipData;
  return `<div></div>`;
}
```

下面是一个简单的例子：

```js | ob
(() => {
  const chart = new G2.Chart();

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

  return chart.getContainer();
})();
```

尝试一下

<Playground path="style/component/tooltip/demo/tooltip-custom.ts" rid="tooltip-custom"></playground>

## 案例

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
