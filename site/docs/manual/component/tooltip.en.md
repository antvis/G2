---
title: Tooltip
order: 7.5
---

## Overview

`Tooltip` is one of the core components of chart interaction, used to dynamically display detailed information about data points, helping users quickly understand the values, categories, or other dimensional information in specific areas of the chart. It can dynamically show related data information when the mouse hovers, clicks, or moves to a chart element (such as bars in a bar chart or data points in a line chart).

- **Display detailed information**: Tooltip can show detailed information about data points, such as specific values, percentages, or other related attributes. This helps users understand the data more deeply.
- **Improve readability**: In complex visualizations, Tooltip can help users more easily identify and understand data points. For example, in scatter plots where data points are dense, Tooltip can display detailed information about specific points without having to hover over each point.
- **Enhance interactivity**: Tooltip can enhance the interactivity of visualizations. Users can view more information by hovering or clicking on data points, making the visualization more dynamic and engaging.
- **Highlight key information**: Tooltip can be used to highlight key information. For example, in time series charts, you can use Tooltip to display important events or mutations at specific time points.
- **Support multiple trigger methods**: Can be triggered through mouse hover, click, touch and other events.

### Components

<img alt="tooltip" width=900 src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*_NcgQbSbuBoAAAAAAAAAAAAAemJ7AQ/original" />

### Usage

```js
chart.options({
  type: 'interval',
  tooltip: {
    title: 'name', // Title
    items: ['genre'], // Data items
  },
});
```

And combined with `view.interaction.tooltip` to configure tooltip rendering and additional settings.

```js
chart.options({
  type: 'view',
  interaction: {
    tooltip: { series: true },
  },
});
```

When there is only one mark in the view, configuring tooltip rendering and additional settings through `mark.interaction.tooltip` is also possible.

```js
chart.options({
  type: 'line',
  interaction: {
    tooltip: { series: true },
  },
});
```

If you want to disable tooltip display, you can turn it off with the following configuration.

```js
chart.options({
  type: 'interval',
  tooltip: false,
});
```

If you want the chart to have no tooltip interaction, you can achieve this through `chart.interaction`.

```js
chart.options({
  type: 'view',
  interaction: { tooltip: false },
});
```

Try it out

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

## Configuration Options

Configuration options are divided into two parts

- `tooltip` is a UI component in G2 used to display detailed information about data points. When users hover over a data point in the chart, tooltip displays related information about that data point, such as coordinate values, measure values, etc.

- `interaction.tooltip` is part of G2's interaction mechanism, belonging to the interaction module. It's a built-in interactive behavior used to enhance tooltip functionality, especially in certain specific interactive scenarios (such as dynamically showing or hiding tooltips).

`tooltip` and `interaction.tooltip` are configurations in two different dimensions, but they can be confusing. Here are their core differences:

| Feature        | tooltip                                          | interaction.tooltip                                     |
| -------------- | ------------------------------------------------ | ------------------------------------------------------- |
| Responsibility | Define tooltip content, style and basic behavior | Define tooltip behavior in interactive scenarios        |
| Configuration  | Configured through chart.tooltip()               | Enabled or customized through chart.interaction()       |
| Scope          | Global effect, affects the entire chart          | Bound to specific interactive behaviors                 |
| Typical Use    | Set tooltip fields, styles, content, etc.        | Control dynamic display/hide or other interactive logic |

### tooltip

| Property  | Description                                                                                                                                                                                                      | Type            | Default | Applicable to                |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------- | ---------------------------- |
| title     | Set tooltip title content: If value is a data field name, it will display the value of that field in the data. If the field doesn't exist in the data, use the value as title. See [title configuration](#title) | [title](#title) |         |                              |
| nodeTitle | Set node title attribute for composite chart tooltip titles                                                                                                                                                      | [title](#title) |         | Composite charts like Sankey |
| linkTitle | Set link title attribute for composite chart tooltip titles                                                                                                                                                      | [title](#title) |         | Composite charts like Sankey |
| items     | Specify fields displayed in tooltip. Different charts have different default field lists. Works better when used with channel configuration. See [items configuration](#items)                                   | [items](#items) |         |                              |
| nodeItems | Set node items attribute for composite chart tooltip                                                                                                                                                             | [items](#items) |         | Composite charts like Sankey |
| linkItems | Set link items attribute for composite chart tooltip                                                                                                                                                             | [items](#items) |         | Composite charts like Sankey |

#### title

`title` is a field used to display the main title of the currently hovered data point, typically used to represent the category or contextual information that the data point belongs to.

`title` can be directly written as a fixed string to display, or a method to dynamically get the title from `data`

```js
chart.options({
  type: 'interval',
  tooltip: {
    title: (d) => (d.sold > 150 ? 'high' : 'low'), // Set title
  },
});
```

When you don't need to customize the title, you can directly declare tooltip as an array, in which case the title will use default configuration:

```js
chart.options({
  type: 'interval',
  tooltip: ['genre', 'sold'],
});
```

The complete title structure is as follows:
| Sub-configuration Name | Type | Function Description |
| ---------------------- | ---- | -------------------- |
| channel | `string` | Define the channel for generating title |
| field | `string` | Define the field for generating title |
| value | `string` | Title value |
| valueFormatter | `string` \| `Function` | Format title |

- **Field**

Their values can come from original data, specified by string or `title.field`.

```js
chart.options({
  tooltip: {
    title: 'sold',
    items: ['genre'],
  },
});
```

```js
// Equivalent to
chart.options({
  tooltip: {
    title: { field: 'sold' },
    items: [{ field: 'genre' }],
  },
});
```

- **Channel**

Their values can come from channel values, specified through `title.channel`, often used for charts that generate new channels using `mark.transform`.

```js
chart.options({
  tooltip: {
    title: { channel: 'x' },
    items: [{ channel: 'y' }],
  },
});
```

- **Formatting**

You can specify the display of title value through `title.valueFormatter`. `title.valueFormatter` can be a function or a string supported by d3-format.

```js
chart.options({
  tooltip: {
    title: { field: 'sold', valueFormatter: (sold) => sold.toUpperCase() },
    items: [{ channel: 'y', valueFormatter: '.0%' }],
  },
});
```

- **Personalized Configuration**

Of course, callbacks are also provided for title to achieve maximum personalized configuration capability.

```js
chart.options({
  tooltip: {
    title: (datum, index, data, column) => ({
      value: `<span style="color: #00ff00; font-style: italic;">${datum.letter}</span>`,
      custom: '...',
    }),
    items: [
      (datum, index, data, column) => ({
        color: datum.sold > 150 ? 'red' : 'blue', // Specify item color
        name: index === 0 ? datum.genre : `${datum.genre} ${data[index].genre}`, // Specify item name
        value: column.y.value[index], // Use y channel value
        custom: '...',
      }),
    ],
  },
});
```

The items return value can be used as parameters for `interaction.tooltip.render`, where you can set custom parameters. See [Custom Render Content](#custom-render-content)

**Composite Chart Configuration**

When configuring `tooltip.title` for composite charts, you need to configure nodes and links separately

```js
({
  tooltip: {
    nodeTitle: (d) => d.key,
    linkTitle: (d) => 'link',
  },
});
```

#### items

`items` is a key attribute in tooltip configuration. `items` is an array representing the content of each item in the tooltip. Each item typically corresponds to a data field or a graphical element (such as a bar in a bar chart, a point in a line chart, etc.). By customizing `items`, you can flexibly control the display content of tooltips, including name, value, color and other information.

The complete item structure is as follows:
| Sub-configuration Name | Type | Function Description |
| ---------------------- | ---- | -------------------- |
| color | `string` | Marker color |
| field | `string` | Define the field for generating item |
| name | `string` | Item name |
| value | `string` | Item value |
| channel | `string` | Define the channel for generating item value |
| valueFormatter | `string` \| `Function` | Format item |

**The `value`, `channel`, and `valueFormatter` properties of `items` are configured the same way as `title`. For detailed configuration, please refer to [title](#title)**

**Name**

You can conveniently modify the name of `item` in `tooltip` through `name`, and use `channel` to match the corresponding entry in the chart.

```js
chart.options({
  tooltip: {
    items: [
      { name: 'Zhang San', channel: 'y1' },
      { name: 'Li Si', channel: 'y2' },
    ],
  },
});
```

**Color**

`tooltip` will automatically assign colors to `tooltip` `item` based on chart content, but in practical applications, you may need to specify certain colors according to some rules. In this case, you can configure through the `color` property. Use `channel` to match the corresponding entry in the chart.

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

**Composite Chart Configuration**

When configuring `tooltip.items` for composite charts, you need to configure nodes and links separately

```js
({
  tooltip: {
    nodeItems: [
      (datum, index, data, column) => {
        return {
          color: 'red', // Specify item color
          name: 'Node', // Specify item name
          value: d.key, // Use y channel value
          content: 'Node custom attribute',
        };
      },
    ],
    linkItems: [
      (datum, index, data, column) => {
        return {
          color: 'red', // Specify item color
          name: 'Link', // Specify item name
          value: `${d.source.key}-${d.target.key}`, // Use y channel value
          content: 'Link custom attribute',
        };
      },
    ],
  },
});
```

### interaction.tooltip

| Property      | Description                                                                                                              | Type                                                                                                                   | Default                       | Applicable to                |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ---------------------------- |
| body          | Whether to show tooltip                                                                                                  | `boolean`                                                                                                              | `true`                        |                              |
| bounding      | Control tooltip display boundary, position will be automatically adjusted when exceeded                                  | `{ x: number, y: number, width: number, height: number }`                                                              | Chart area size               |                              |
| css           | Set tooltip CSS styles                                                                                                   | [css](#set-styles)                                                                                                     | -                             |                              |
| crosshairs    | Configure crosshair style                                                                                                | [crosshairs](#crosshairs)                                                                                              | See [crosshairs](#crosshairs) |                              |
| disableNative | Disable native pointerover and pointerout events, needs to be set to true when customizing tooltip interaction           | `boolean`                                                                                                              | `false`                       |                              |
| enterable     | Whether tooltip allows mouse entry                                                                                       | `boolean`                                                                                                              | `false`                       |                              |
| facet         | Whether it's a facet chart tooltip                                                                                       | `boolean`                                                                                                              | `false`                       | Facet composite charts       |
| filter        | Item filter                                                                                                              | `(d: TooltipItemValue) => any`                                                                                         | -                             |                              |
| groupName     | Whether to use groupName                                                                                                 | `boolean`                                                                                                              | `true`                        |                              |
| leading       | Whether to update tooltip at the beginning of time interval                                                              | `boolean`                                                                                                              | `true`                        |                              |
| marker        | Configure marker style                                                                                                   | [marker](#marker)                                                                                                      | See [marker](#marker)         |                              |
| markerType    | Controls marker style when showing tooltip, whether it's hollow or solid. Default is solid, set to `'hollow'` for hollow | `'hollow' \| undefined`                                                                                                | `undefined`                   |                              |
| mount         | Specify tooltip mount node                                                                                               | `string` \| `HTMLElement`                                                                                              | Chart container               |                              |
| position      | Set fixed display position of tooltip relative to data point                                                             | `'top'` \| `'bottom'` \| `'left'` \| `'right'` \| `'top-left'` \| `'top-right'` \| `'bottom-left'` \| `'bottom-right'` | `'right-bottom'`              |                              |
| offset        | Offset in position direction                                                                                             | `[number, number]`                                                                                                     | `[10, 10]`                    |                              |
| render        | [Custom render tooltip content](#custom-render-content)                                                                  | `(event, options) => HTMLElement \| string`                                                                            | -                             |                              |
| series        | Whether it's a series element tooltip                                                                                    | `boolean`                                                                                                              | `false`                       | Multi-line, multi-bar charts |
| shared        | Whether elements with same x share tooltip                                                                               | `boolean`                                                                                                              | `false`                       |                              |
| sort          | Item sorter                                                                                                              | `(d: TooltipItemValue) => any`                                                                                         | -                             |                              |
| trailing      | Whether to update tooltip at the end of time interval                                                                    | `boolean`                                                                                                              | `false`                       |                              |
| wait          | Time interval for tooltip update in milliseconds                                                                         | `number`                                                                                                               | `50`                          |                              |

#### crosshairs

`crosshairs` is an auxiliary line feature for tooltips, used to mark the precise position of current data points in charts. It's mainly used for continuous graphs like line charts and area charts. Usually presented as horizontal or vertical reference lines to help users visually locate data more intuitively.

Additionally, styles set through prefixes `crosshairsX` and `crosshairsY` have higher priority than `crosshairs` and will override the latter.

| Property                 | Description                                                                          | Type            | Default   | Required |
| ------------------------ | ------------------------------------------------------------------------------------ | --------------- | --------- | -------- |
| crosshairs               | Whether to show crosshairs                                                           | boolean         | `true`    |          |
| crosshairsStroke         | Crosshair color                                                                      | string          | -         |          |
| crosshairsStrokeOpacity  | Crosshair transparency                                                               | number          | -         |          |
| crosshairsLineWidth      | Crosshair stroke width                                                               | number          | -         |          |
| crosshairsLineDash       | Crosshair dash configuration, first value is dash segment length, second is interval | [number,number] | -         |          |
| crosshairsOpacity        | Overall crosshair transparency                                                       | number          | -         |          |
| crosshairsShadowColor    | Crosshair shadow color                                                               | string          | -         |          |
| crosshairsShadowBlur     | Crosshair shadow blur coefficient                                                    | number          | -         |          |
| crosshairsShadowOffsetX  | Crosshair shadow horizontal offset                                                   | number          | -         |          |
| crosshairsShadowOffsetY  | Crosshair shadow vertical offset                                                     | number          | -         |          |
| crosshairsCursor         | Crosshair cursor style                                                               | string          | `default` |          |
| crosshairsX              | Whether to show horizontal crosshair                                                 | boolean         | `false`   |          |
| crosshairsXStroke        | Horizontal crosshair color                                                           | string          | -         |          |
| crosshairsXStrokeOpacity | Horizontal crosshair transparency                                                    | number          | -         |          |
| crosshairsXLineWidth     | Horizontal crosshair stroke width                                                    | number          | -         |          |
| crosshairsXLineDash      | Horizontal crosshair dash configuration                                              | [number,number] | -         |          |
| crosshairsXOpacity       | Overall horizontal crosshair transparency                                            | number          | -         |          |
| crosshairsXShadowColor   | Horizontal crosshair shadow color                                                    | string          | -         |          |
| crosshairsXShadowBlur    | Horizontal crosshair shadow blur coefficient                                         | number          | -         |          |
| crosshairsXShadowOffsetX | Horizontal crosshair shadow horizontal offset                                        | number          | -         |          |
| crosshairsXShadowOffsetY | Horizontal crosshair shadow vertical offset                                          | number          | -         |          |
| crosshairsXCursor        | Horizontal crosshair cursor style                                                    | string          | `default` |          |
| crosshairsY              | Whether to show vertical crosshair                                                   | boolean         | `true`    |          |
| crosshairsYStroke        | Vertical crosshair color                                                             | string          | -         |          |
| crosshairsYStrokeOpacity | Vertical crosshair transparency                                                      | number          | -         |          |
| crosshairsYLineWidth     | Vertical crosshair stroke width                                                      | number          | -         |          |
| crosshairsYLineDash      | Vertical crosshair dash configuration                                                | [number,number] | -         |          |
| crosshairsYOpacity       | Overall vertical crosshair transparency                                              | number          | -         |          |
| crosshairsYShadowColor   | Vertical crosshair shadow color                                                      | string          | -         |          |
| crosshairsYShadowBlur    | Vertical crosshair shadow blur coefficient                                           | number          | -         |          |
| crosshairsYShadowOffsetX | Vertical crosshair shadow horizontal offset                                          | number          | -         |          |
| crosshairsYShadowOffsetY | Vertical crosshair shadow vertical offset                                            | number          | -         |          |
| crosshairsYCursor        | Vertical crosshair cursor style                                                      | string          | `default` |          |

```js
chart.options({
  interaction: {
    legendFilter: false,
    elementPointMove: true,
    tooltip: {
      crosshairs: true, // Enable crosshairs
      crosshairsStroke: 'red', // Crosshair color is red
      crosshairsYStroke: 'yellow', // Vertical crosshair color set separately to yellow
      crosshairsLineDash: [4, 4], // Crosshair dashed style
      markerType: 'hollow', // Tooltip marker is hollow
    },
  },
});
```

#### marker

| Property            | Description                                                                              | Type            | Default   | Required |
| ------------------- | ---------------------------------------------------------------------------------------- | --------------- | --------- | -------- |
| marker              | Whether to show marker                                                                   | boolean         | `true`    |          |
| markerFill          | Marker fill color                                                                        | string          | -         |          |
| markerFillOpacity   | Marker fill transparency                                                                 | number          | -         |          |
| markerStroke        | Marker stroke color                                                                      | string          | -         |          |
| markerStrokeOpacity | Marker stroke transparency                                                               | number          | -         |          |
| markerLineWidth     | Marker stroke width                                                                      | number          | -         |          |
| markerLineDash      | Marker stroke dash configuration, first value is dash segment length, second is interval | [number,number] | -         |          |
| markerOpacity       | Overall marker transparency                                                              | number          | -         |          |
| markerShadowColor   | Marker shadow color                                                                      | string          | -         |          |
| markerShadowBlur    | Marker shadow blur coefficient                                                           | number          | -         |          |
| markerShadowOffsetX | Marker shadow horizontal offset                                                          | number          | -         |          |
| markerShadowOffsetY | Marker shadow vertical offset                                                            | number          | -         |          |
| markerCursor        | Marker cursor style                                                                      | string          | `default` |          |

```js
chart.options({
  interaction: {
    tooltip: {
      marker: true,
      markerType: 'hollow', // Tooltip marker is hollow
      markerStroke: 'yellow',
      markerLineWidth: 2,
      markerLineDash: [4, 4],
    },
  },
});
```

#### Set Styles

The `tooltip` cssStyle configuration option allows direct customization of tooltip appearance through CSS styles, enabling quick visual customization of tooltips to adapt to different themes or interaction scenarios.

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

Try it out

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

#### Custom Render Content

Sometimes the built-in Tooltip cannot meet requirements. In this case, you can render custom tooltips through the _render_ function in `mark.interaction.tooltip.render` or `view.interaction.tooltip.render`.

The _render_ function accepts an event object _event_ and tooltip data _tooltipData_, returning a string or DOM object. Where _event_ is a mouse object thrown by [@antv/g](https://g.antv.antgroup.com/), and _tooltipData_ is title and items data declared through `mark.tooltip`. If the return value is a string, it will be used as innerHTML of the tooltip container, otherwise the return value will be mounted. A tooltip render function definition looks like this:

```js
function render(event, tooltipData) {
  const { title, items } = tooltipData;
  return `<div></div>`;
}
```

Here's a simple example:

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
    // render callback method returns innerHTML or DOM
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

## Events

The chart.on() method registers the specified listener to the chart. When the object triggers the specified event, the specified callback function will be executed.

Here's how to configure tooltip show/hide events:

```js
chart.on('tooltip:show', (event) => {
  console.log(event.data.data);
});

chart.on('tooltip:hide', () => {
  console.log('hide');
});
```

Try it out

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

## Examples

### title

```js
mark.tooltip({
  title: 'name', // Field
});

mark.tooltip({
  title: (d) => (d.value > 100 ? d.name : d.age), // Transform
});
```

### item

```js
// Single field
mark.tooltip('a');
mark.tooltip({ field: 'a' });

// Single channel
mark.tooltip({ channel: 'y' });

// Transform
mark.tooltip((d) => (d.value > 100 ? d.name : d.age));

// Formatting
mark.tooltip({ channel: 'y', valueFormatter: (d) => d.toFixed(1) });

// d3-format supported strings
// https://github.com/d3/d3-format
mark.tooltip({ channel: 'y', valueFormatter: '~s' });

// Complete information
mark.tooltip({ name: 'name', color: 'red', value: 'color' });

// Callback
mark.tooltip(
  (
    d, // Each data item
    index, // Index
    data, // Complete data
    column, // Channel
  ) => ({
    value: `${column.y.value[index]} - ${column.y1.value[index]}`,
  }),
);

// Multiple items
mark.tooltip({ channel: 'y' }).tooltip({ channel: 'x' });
```

### title + item

```js
mark.tooltip({
  title: 'a',
  items: [{ channel: 'x' }, { channel: 'y' }],
});
```

### Filter Null Data

When data contains null or undefined values, you can use `interaction.tooltip.filter` to filter out these invalid data points to avoid displaying them in the tooltip.

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
  // Add interaction configuration to filter null values
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

More filtering options:

```js
// Filter only null values
filter: (d) => d.value !== null;

// Filter null, undefined and empty strings
filter: (d) => d.value !== null && d.value !== undefined && d.value !== '';

// Filter all "falsy" values (null, undefined, 0, false, '', etc.)
filter: (d) => Boolean(d.value);

// Filter by name for specific fields (e.g., filter null values only for temperature field)
filter: (d) =>
  d.name !== 'temperature' || (d.value !== null && d.value !== undefined);
```

### How to use additional data from data as parameters for custom render function

The render function provides powerful personalized configuration capabilities. By configuring the return parameters of the `tooltip.render` function, you can customize the input parameters for `interaction.tooltip.render`

```js
chart.options({
  tooltip: {
    items: [
      (datum, index, data, column) => ({
        color: datum.sold > 150 ? 'red' : 'blue', // Specify item color
        name: index === 0 ? datum.genre : `${datum.genre} ${data[index].genre}`, // Specify item name
        value: column.y.value[index], // Use y channel value
        custom1: 'Custom parameter 1',
        custom2: 'Custom parameter 2',
      }),
    ],
  },
  interaction: {
    tooltip: {
      // render callback method returns innerHTML or DOM
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

### Manual Control Show/Hide

For non-series marks like Interval, Point, the control method is as follows:

```js
// Bar charts, point charts, etc.
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
    offsetX: 10, // Position relative to plot area
    offsetY: 20, // Position relative to plot area
    data: {
      data: { genre: 'Sports' }, // Will find matching data from original data
    },
  }),
);
```

For series marks like Line, Area, the control method is as follows:

```js
chart
  .line()
  .data({ type: 'fetch', value: 'data/aapl.csv' })
  .encode('x', 'date')
  .encode('y', 'close');

// Pick based on data
chart.render((chart) =>
  chart.emit('tooltip:show', {
    data: {
      data: { x: new Date('2010-11-16') },
    },
  }),
);

// Pick based on pixels
chart.render((chart) =>
  chart.emit('tooltip:show', {
    offsetX: 200,
    offsetY: 200,
  }),
);
```

Hide method:

```js
chart.emit('tooltip:hide');
```

### Enable/Disable Interaction

```js
chart.emit('tooltip:disable'); // Disable tooltip
chart.emit('tooltip:enable'); // Enable interaction
```

### Set Crosshairs

By default, `crosshairsY` is enabled and `crosshairsX` is disabled. So to enable crosshairs, there are two ways:

1. Set `crosshairs` to `true`.

```js
chart.interaction('tooltip', {
  crosshairs: true, // Enable crosshairs
  crosshairsXStroke: 'red', // Set X-axis crosshair color to 'red'
  crosshairsYStroke: 'blue', // Set Y-axis crosshair color to 'blue'
});
```

2. Set `crosshairsX` to `true`.

```js
chart.interaction('tooltip', {
  crosshairsX: true, // Enable crosshairsX
  crosshairsXStroke: 'red', // Set X-axis crosshair color to 'red'
  crosshairsYStroke: 'blue', // Set Y-axis crosshair color to 'blue'
});
```

`crosshairsX` has higher priority than `crosshairs`.

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*_LFDT7p6hRQAAAAAAAAAAAAADmJ7AQ/original" width="640">

### Set Tooltip Point to Hollow Circle

```js
chart.interaction('tooltip', {
  markerType: 'hollow', // Set tooltip point style to hollow circle
});
```

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*s8KjQLiSyTwAAAAAAAAAAAAADmJ7AQ/original" width="640">

### How to use supplementary attributes from data to implement custom tooltip display for composite charts like Sankey?

Similar to the method for customizing `tooltip` interaction for general `Mark`, first return custom attributes in the chart's `tooltip.render`, then use them in `interaction.render`.

```js
({
  type: 'sankey',
  data: {
    value: {
      nodes: [
        { id: 'a', key: 'Home', des: 'Node custom attribute' },
        { id: 'b', key: 'Page1', des: 'Node custom attribute' },
        { id: 'b_1', key: 'Page1', des: 'Node custom attribute' },
        { id: 'c', key: 'Page2', des: 'Node custom attribute' },
        { id: 'c_1', key: 'Page2', des: 'Node custom attribute' },
        { id: 'd', key: 'Page3', des: 'Node custom attribute' },
        { id: 'd_1', key: 'Page3', des: 'Node custom attribute' },
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
      },
    ],
    linkItems: [
      (datum, index, data, column) => {
        return {
          color: 'red', // Specify item color
          name: 'Link', // Specify item name
          value: `${d.source.key}-${d.target.key}`, // Use y channel value
          content: 'Link custom attribute',
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
