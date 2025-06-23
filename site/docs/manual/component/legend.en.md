---
title: Legend
order: 7.2
---

## Overview

In G2, **Legend** is an auxiliary element of the chart that uses color, size, and shape to distinguish different data types and is used for data filtering in charts. It can be understood as the visualization of scales corresponding to non-spatial channels (`color`, `opacity`, `size`, `shape`). G2 automatically generates different legends based on the set graphic attribute mappings and data types. When a variable corresponds to multiple graphic attributes, G2 merges the legends to achieve simplification.

The four non-spatial channels `color`, `opacity`, `size`, and `shape` automatically generate different legends when they receive parameters that are determined to be fields from the data source:

| Visual Channel | Description                                |
| -------------- | ------------------------------------------ |
| color          | Generate legend based on different colors  |
| opacity        | Generate legend based on different opacity |
| size           | Generate legend based on different sizes   |
| shape          | Generate legend based on different shapes  |

### Components

<img alt="legend-overview" width=900 src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*lGLWS4QUPscAAAAAAAAAAAAAemJ7AQ/original"/>

### Usage

There are two ways to configure legends:

First, pass a `boolean` to set whether to display the legend.

```js
({
  type: 'interval',
  legend: false; // Hide all legends
})
```

```js
({
  type: 'interval',
  legend: {color: false}; // Hide the legend for the color channel
})
```

Second, pass _legendOption_ to configure the legend as a whole.

```js
({
  type: 'interval',
  legend: {
    color: {},
    size: {},
  },
});
```

### Configuration Levels

Legends can be configured at the Mark level. In G2, each mark has its own legend. If the scales corresponding to marks are synchronized, the legends are also merged.

```js
({
  type: 'interval',
  legend: {
    color: {},
    size: {},
  },
});
```

Legends can also be configured at the View level. Legends have transitivity. Legends declared on a view are passed to the marks declared in `children`. If the mark has a legend for the corresponding channel, they are merged; otherwise, they don't affect each other.

```js
({
  type: 'view',
  legend: {
    color: {},
    size: {},
  },
});
```

## Configuration Options

Legends in G2 are divided into **continuous legends** and **categorical legends**. Due to the different structures of these two types of legends, their configuration options also differ.

Some configuration options are scoped to categorical legends and continuous legends:
<Badge type="success">Categorical Legend</Badge>
<Badge type="warning">Continuous Legend</Badge>

| Property                                                        | Description                                                                           | Type                                                               | Default Value                         | Required |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------- | -------- |
| orientation                                                     | Legend orientation, which is the scroll direction for categorical legends             | `horizontal` \| `vertical`                                         | `horizontal`                          |          |
| position                                                        | Position of the legend                                                                | `top` \| `right` \| `left` \| `bottom`                             | `top`                                 |          |
| layout                                                          | Adjust the flex layout of the legend                                                  | [layout](#layout)                                                  | See [layout](#layout)                 |          |
| size                                                            | Size of the legend                                                                    | number                                                             | -                                     |          |
| width                                                           | Width of the legend                                                                   | number                                                             | -                                     |          |
| crossPadding                                                    | Distance from legend to chart area                                                    | number                                                             | `12`                                  |          |
| order                                                           | Order of legend in layout                                                             | number                                                             | `1`                                   |          |
| title                                                           | Configure legend title                                                                | [title](#title)                                                    | See [title](#title)                   |          |
| cols <Badge type="success">Categorical Legend</Badge>           | Specify the number of legend items displayed per row; empty means no limit on columns | number                                                             | -                                     |          |
| colPadding <Badge type="success">Categorical Legend</Badge>     | Specify horizontal spacing between legend items                                       | number                                                             | `12`                                  |          |
| rowPadding <Badge type="success">Categorical Legend</Badge>     | Specify vertical spacing between legend items                                         | number                                                             | `8`                                   |          |
| maxRows <Badge type="success">Categorical Legend</Badge>        | Specify maximum number of rows for legend                                             | number                                                             | `3`                                   |          |
| maxCols <Badge type="success">Categorical Legend</Badge>        | Specify maximum number of columns for legend                                          | number                                                             | `3`                                   |          |
| itemMarker <Badge type="success">Categorical Legend</Badge>     | Configure legend item marker                                                          | [itemMarker](#itemmarker)                                          | See [itemMarker](#itemmarker)         |          |
| itemLabel <Badge type="success">Categorical Legend</Badge>      | Configure legend item label text                                                      | [itemLabel](#itemlabel)                                            | See [itemLabel](#itemlabel)           |          |
| itemValue <Badge type="success">Categorical Legend</Badge>      | Configure legend item value                                                           | [itemValue](#itemvalue)                                            | See [itemValue](#itemvalue)           |          |
| itemBackground <Badge type="success">Categorical Legend</Badge> | Configure legend item background                                                      | [itemBackground](#itembackground)                                  | See [itemBackground](#itembackground) |          |
| itemWidth <Badge type="success">Categorical Legend</Badge>      | Configure legend item width                                                           | number                                                             | -                                     |          |
| itemSpan <Badge type="success">Categorical Legend</Badge>       | Configure space allocation for legend item marker, label, and value                   | number \| number[]                                                 | `[1, 1, 1]`                           |          |
| itemSpacing <Badge type="success">Categorical Legend</Badge>    | Configure spacing between legend item marker, label, and value                        | number \| number[]                                                 | `[8, 8]`                              |          |
| nav <Badge type="success">Categorical Legend</Badge>            | Configure legend navigator                                                            | [nav](#nav)                                                        | See [nav](#nav)                       |          |
| color <Badge type="warning">Continuous Legend</Badge>           | Configure color band colors for continuous legend                                     | string[] \| [d3-interpolate](https://github.com/d3/d3-interpolate) | -                                     |          |
| block <Badge type="warning">Continuous Legend</Badge>           | Whether continuous legend displays by intervals                                       | boolean                                                            | false                                 |          |
| type <Badge type="warning">Continuous Legend</Badge>            | Configure type of continuous legend                                                   | `size` \|`color`                                                   | `color`                               |          |
| ribbon <Badge type="warning">Continuous Legend</Badge>          | Configure color band of continuous legend                                             | [ribbon](#ribbon)                                                  | See [ribbon](#ribbon)                 |          |
| handle <Badge type="warning">Continuous Legend</Badge>          | Configure slider handle of continuous legend                                          | [handle](#handle)                                                  | See [handle](#handle)                 |          |
| label <Badge type="warning">Continuous Legend</Badge>           | Configure labels/tick values of continuous legend                                     | [label](#label)                                                    | See [label](#label)                   |          |
| indicator <Badge type="warning">Continuous Legend</Badge>       | Configure indicator of continuous legend                                              | [indicator](#indicator)                                            | See [indicator](#indicator)           |          |

### orientation

<description>**optional** _horizontal | vertical_ </description>

Legend orientation, which is the scroll direction for categorical legends. Default is `horizontal`.

### position

<description> **optional** _"top" | "right" | "left" | "bottom"_ </description>

Position of the legend. Default is `top`.

```js | ob {  pin: false }
(() => {
  const positionList = ['top', 'right', 'left', 'bottom'];
  const positionMap = positionList.map((p) => {
    return {
      label: p,
      value: p,
    };
  });

  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    data: [
      { name: 'London', month: 'Jan.', rainfall: 18.9 },
      { name: 'London', month: 'Feb.', rainfall: 28.8 },
      { name: 'London', month: 'Mar.', rainfall: 39.3 },
      { name: 'London', month: 'Apr.', rainfall: 81.4 },
      { name: 'London', month: 'May', rainfall: 47 },
      { name: 'London', month: 'Jun.', rainfall: 20.3 },
      { name: 'London', month: 'Jul.', rainfall: 24 },
      { name: 'London', month: 'Aug.', rainfall: 35.6 },
      { name: 'Berlin', month: 'Jan.', rainfall: 12.4 },
      { name: 'Berlin', month: 'Feb.', rainfall: 23.2 },
      { name: 'Berlin', month: 'Mar.', rainfall: 34.5 },
      { name: 'Berlin', month: 'Apr.', rainfall: 99.7 },
      { name: 'Berlin', month: 'May', rainfall: 52.6 },
      { name: 'Berlin', month: 'Jun.', rainfall: 35.5 },
      { name: 'Berlin', month: 'Jul.', rainfall: 37.4 },
      { name: 'Berlin', month: 'Aug.', rainfall: 42.4 },
    ],
    encode: { x: 'month', y: 'rainfall', color: 'name' },
    transform: [{ type: 'dodgeX' }],
  });

  const handleSetPosition = (position) => {
    chart.options({
      legend: {
        color: {
          position,
        },
      },
    });
    chart.render(); // Re-render the chart
  };

  // Insert Position selector
  const selectorContainer = document.createElement('div');
  selectorContainer.textContent = 'Select legend position ';
  const selector = document.createElement('select');
  selector.innerHTML = positionMap.map(
    (position, index) =>
      `<option value="${position.value}" ${index === 0 ? 'selected' : ''}>${
        position.label
      }</option>`,
  );
  selector.onchange = (e) => {
    handleSetPosition(e.target.value);
  };
  selectorContainer.appendChild(selector);
  const node = chart.getContainer();
  node.insertBefore(selectorContainer, node.childNodes[0]);

  chart.render();

  return node;
})();
```

### layout

<description> _LegendLayoutCfg_ **optional** </description>

The Legend component supports adjusting its position in the canvas through the `layout` property.
Currently supports basic Flex layout, with supported properties including: `justifyContent`, `alignItems`, `flexDirection`. _LegendLayoutCfg_ configuration is as follows:

| Property       | Description          | Type                                   | Default Value                                                  | Required |
| -------------- | -------------------- | -------------------------------------- | -------------------------------------------------------------- | -------- |
| justifyContent | Main axis alignment  | `flex-start` \| `flex-end` \| `center` | `flex-start`                                                   |          |
| alignItems     | Cross axis alignment | `flex-start` \| `flex-end` \| `center` | `flex-start`                                                   |          |
| flexDirection  | Main axis direction  | `row` \| `column`                      | `row` when position is `top` and `bottom`, `column` for others |          |

By configuring the legend's `position` and `layout`, we can flexibly change the legend's position.

```js
// Configure a right-side vertically centered legend

// Step 1: Set position to right

// Step 2: When position is right, the main axis direction flexDirection defaults to column

// Step 3: To achieve vertical centering, we need center alignment in the column direction. Since column is the main axis, configure justifyContent to center
({
  legend: {
    color: {
      position: 'right',
      layout: {
        justifyContent: 'center',
      },
    },
  },
});
```

Try it out:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 350,
});

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 50 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold', color: 'genre' },
  legend: {
    color: {
      // 图例显示位置 可选 top ｜ bottom | right | left
      position: 'top',
      layout: {
        // 主轴对齐方式 可选 flex-start | flex-end | center
        justifyContent: 'flex-start',
        // 交叉轴对齐方式 可选 flex-start | flex-end | center
        alignItems: 'flex-start',
        // 主轴方向 可选 row | column
        flexDirection: 'row',
      },
    },
  },
});

chart.render();
```

### size

<description> _number_ **optional** </description>

Size of the Legend component. Affects the component's size on the cross axis, e.g., for horizontally positioned legends, it affects the overall height. Manual configuration will cause G2's internal calculation logic to fail, requiring you to configure margin, padding, inset, etc. yourself. See [Chart Layout](/en/manual/core/chart/chart-component#chart-layout). Not recommended unless customization is needed.

### width

<description> _number_ **optional** </description>

Width of the Legend component.

### crossPadding

<description> _number_ **optional** </description>

Distance between the Legend component and the chart. Default is `12`.

### order

<description> _number_ **optional** </description>

Sort order of the Legend component during layout. Default is `1`. G2's internal components all have default sort sizes. Smaller values are closer to the chart area. For example, the Title component's default sort is `2`, which is further from the chart area than the Legend component's default sort of `1`.

### title

<description> _LegendTitleCfg_ **optional** </description>

Legend title configuration. _LegendTitleCfg_ configuration is as follows:

| Property           | Description                                                                                                      | Type                                                                                                       | Default Value                                            | Required |
| ------------------ | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | -------- |
| title              | Turn off title or set title content                                                                              | false \| string                                                                                            | true for continuous legend, false for categorical legend |          |
| titleSpacing       | Spacing from title to content area                                                                               | number \| number[]                                                                                         | `4`                                                      |          |
| titleInset         | Title text padding                                                                                               | number \| number[]                                                                                         | `0`                                                      |          |
| titlePosition      | Title position. Can use abbreviations, e.g., `i` for `inner`, `lt` for `left-top`                                | `top` \| `bottom` \|`left` \|`right` \|`left-top` \|`left-bottom` \|`right-top` \|`right-bottom` \|`inner` | -                                                        |          |
| titleFontSize      | Title text size                                                                                                  | number \| (datum, index, data) => number                                                                   | `12`                                                     |          |
| titleFontFamily    | Title text font                                                                                                  | string \| (datum, index, data) => string                                                                   | -                                                        |          |
| titleFontWeight    | Title font weight                                                                                                | number \| (datum, index, data) => number                                                                   | `normal`                                                 |          |
| titleLineHeight    | Title text line height                                                                                           | number \| (datum, index, data) => number                                                                   | -                                                        |          |
| titleTextAlign     | Set title text content alignment                                                                                 | `center` \| `end` \| `left` \| `right` \| `start`                                                          | `start`                                                  |          |
| titleTextBaseline  | Set text baseline used when drawing title text                                                                   | `top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging`                                                 | `bottom`                                                 |          |
| titleFill          | Title font color                                                                                                 | string \| (datum, index, data) => string                                                                   | `#1D2129`                                                |          |
| titleFillOpacity   | Title font color opacity                                                                                         | number \| (datum, index, data) => number                                                                   | `0.65`                                                   |          |
| titleStroke        | Title font stroke color                                                                                          | string \| (datum, index, data) => string                                                                   | -                                                        |          |
| titleStrokeOpacity | Title font stroke color opacity                                                                                  | number \| (datum, index, data) => number                                                                   | -                                                        |          |
| titleLineWidth     | Title font stroke width                                                                                          | number \| (datum, index, data) => number                                                                   | -                                                        |          |
| titleLineDash      | Title font stroke dash configuration. First value is dash length, second is gap distance. [0,0] means no stroke. | [number,number] \| (datum, index, data) => [number , number]                                               | -                                                        |          |
| titleOpacity       | Title text overall opacity                                                                                       | number \| (datum, index, data) => number                                                                   | -                                                        |          |
| titleShadowColor   | Title text shadow color                                                                                          | string \| (datum, index, data) => string                                                                   | -                                                        |          |
| titleShadowBlur    | Title text shadow Gaussian blur coefficient                                                                      | number \| (datum, index, data) => number                                                                   | -                                                        |          |
| titleShadowOffsetX | Set horizontal distance from shadow to title text                                                                | number \| (datum, index, data) => number                                                                   | -                                                        |          |
| titleShadowOffsetY | Set vertical distance from shadow to title text                                                                  | number \| (datum, index, data) => number                                                                   | -                                                        |          |
| titleCursor        | Title mouse style. Same as CSS mouse styles                                                                      | string \| (datum, index, data) => string                                                                   | `default`                                                |          |

When configuring title in the Legend component, it's not configured as an object, but with `title` prefix plus property.

```js
({
  legend: {
    size: {
      title: 'Legend Title',
      titleSpacing: 0,
      titleInset: 0,
      titlePosition: 't',
      titleFontSize: 16,
      titleFontFamily: 'sans-serif',
      titleFontWeight: 500,
      titleLineHeight: 20,
      titleTextAlign: 'center',
      titleTextBaseline: 'middle',
      titleFill: '#000',
      titleFillOpacity: 0.9,
      titleStroke: '#DAF5EC',
      titleStrokeOpacity: 0.9,
      titleLineWidth: 2,
      titleLineDash: [4, 8],
      titleOpacity: 1,
      titleShadowColor: '#d3d3d3',
      titleShadowBlur: 10,
      titleShadowOffsetX: 10,
      titleShadowOffsetY: 10,
      titleCursor: 'pointer',
    },
  },
});
```

Try it out:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container', height: 300 });

chart.options({
  type: 'legends',
  title: '图例标题',
  titleSpacing: 0,
  titleInset: 0,
  titlePosition: 't',
  titleFontSize: 16,
  titleFontFamily: 'sans-serif',
  titleFontWeight: 500,
  titleLineHeight: 20,
  titleTextAlign: 'center',
  titleTextBaseline: 'middle',
  titleFill: '#000',
  titleFillOpacity: 0.9,
  titleStroke: '#DAF5EC',
  titleStrokeOpacity: 0.9,
  titleLineWidth: 2,
  titleLineDash: [4, 8],
  titleOpacity: 1,
  titleShadowColor: '#d3d3d3',
  titleShadowBlur: 10,
  titleShadowOffsetX: 10,
  titleShadowOffsetY: 10,
  titleCursor: 'pointer',
  scale: {
    size: {
      type: 'linear',
      domain: [0, 10],
      range: [0, 100],
    },
  },
});

chart.render();
```

### cols

<description> _number_ **optional** </description>

Applicable to <Badge type="success">Categorical Legend</Badge>. Specify the number of legend items displayed per row; empty means no limit on columns.

Legend layout uses **flow layout** by default.

<img alt="flow layout" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Lb43QoUm8ZEAAAAAAAAAAAAADmJ7AQ/original" width="400" />

When `cols` is specified, **grid layout** is used.

<img alt="grid layout 1" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*IsmYSKexO00AAAAAAAAAAAAADmJ7AQ/original" width="400" />

<img alt="grid layout 2" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Mh1bQbp7jeMAAAAAAAAAAAAADmJ7AQ/original" width="400" />

### colPadding

<description> _number_ **optional** </description>

Applicable to <Badge type="success">Categorical Legend</Badge>. Specify horizontal spacing between legend items. Default is `12`.

### rowPadding

<description> _number_ **optional** </description>

Applicable to <Badge type="success">Categorical Legend</Badge>. Specify vertical spacing between legend items. Default is `8`.

### maxRows

<description> _number_ **optional** </description>

Applicable to <Badge type="success">Categorical Legend</Badge>. Specify maximum number of rows for legend. Default is `3`.

### maxCols

<description> _number_ **optional** </description>

Applicable to <Badge type="success">Categorical Legend</Badge>. Specify maximum number of columns for legend. Default is `3`.

💡 **How do maxRows and maxCols affect legend layout?**

maxRows and maxCols are used to limit the maximum number of rows and columns in legend layout. In the code, this is implemented through `getRows = (rows) => Math.min(rows, maxRows)` and `getCols = (cols) => Math.min(cols, maxCols)`.

| **Parameter** | **Vertical Layout**                          | **Horizontal Layout**                                    |
| ------------- | -------------------------------------------- | -------------------------------------------------------- |
| **maxCols**   | Limits columns, controls legend width        | No direct effect (columns specified by `cols` parameter) |
| **maxRows**   | No direct effect (rows calculated by height) | Limits rows, controls legend height                      |

**Potential Issues**

- **Vertical Layout**: If `maxCols` is too small, it may cause single column rows to exceed `maxHeight`, causing overflow.

- **Horizontal Layout**: If `maxRows` is too small, some items may be truncated.

In this case, you need to appropriately adjust the chart's `margin` and `padding` to ensure the legend has enough space to display.

### itemMarker

<description> _LegendItemMarkerCfg_ **optional** </description>

Applicable to <Badge type="success">Categorical Legend</Badge>. Configure legend item marker. _LegendItemMarkerCfg_ configuration is as follows:

| Property                | Description                                                                                                              | Type                                                         | Default Value             | Required |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------- | -------- |
| itemMarker              | Legend item marker                                                                                                       | _Symbols_ \|(datum, index, data)=>_Symbols_                  | `circle`                  |          |
| itemMarkerSize          | Legend item marker size                                                                                                  | number \| (datum, index, data) => number                     | `8`                       |          |
| itemMarkerFill          | Legend item marker fill color                                                                                            | string \| (datum, index, data) => string                     | -                         |          |
| itemMarkerFillOpacity   | Legend item marker fill opacity                                                                                          | number \| (datum, index, data) => number                     | `1`                       |          |
| itemMarkerStroke        | Legend item marker stroke                                                                                                | string \| (datum, index, data) => string                     | -                         |          |
| itemMarkerStrokeOpacity | Legend item marker stroke opacity                                                                                        | number \| (datum, index, data) => number                     | -                         |          |
| itemMarkerLineWidth     | Legend item marker stroke width                                                                                          | number \| (datum, index, data) => number                     | `4` for line-based shapes |          |
| itemMarkerLineDash      | Legend item marker stroke dash configuration. First value is dash length, second is gap distance. [0,0] means no stroke. | [number,number] \| (datum, index, data) => [number , number] | -                         |          |
| itemMarkerOpacity       | Legend item marker overall opacity                                                                                       | number \| (datum, index, data) => number                     | -                         |          |
| itemMarkerShadowColor   | Legend item marker shadow color                                                                                          | string \| (datum, index, data) => string                     | -                         |          |
| itemMarkerShadowBlur    | Legend item marker shadow Gaussian blur coefficient                                                                      | number \| (datum, index, data) => number                     | -                         |          |
| itemMarkerShadowOffsetX | Set horizontal distance from shadow to legend item marker                                                                | number \| (datum, index, data) => number                     | -                         |          |
| itemMarkerShadowOffsetY | Set vertical distance from shadow to legend item marker                                                                  | number \| (datum, index, data) => number                     | -                         |          |
| itemMarkerCursor        | Legend item marker mouse style. Same as CSS mouse styles.                                                                | string \| (datum, index, data) => string                     | `default`                 |          |

#### Available Symbols Types

| Property           | Description                          |
| ------------------ | ------------------------------------ |
| bowtie             | Shape type: bowtie                   |
| cross              | Shape type: cross                    |
| dash               | Shape type: dash                     |
| diamond            | Shape type: diamond                  |
| dot                | Shape type: dot                      |
| hexagon            | Shape type: hexagon                  |
| hollowBowtie       | Shape type: hollow bowtie            |
| hollowDiamond      | Shape type: hollow diamond           |
| hollowHexagon      | Shape type: hollow hexagon           |
| hollowPoint        | Shape type: hollow point             |
| hollowSquare       | Shape type: hollow square            |
| hollowTriangle     | Shape type: hollow triangle          |
| hollowTriangleDown | Shape type: inverted hollow triangle |
| hv                 | Style type: HV path                  |
| hvh                | Style type: HVH path                 |
| hyphen             | Shape type: hyphen                   |
| line               | Shape type: line                     |
| plus               | Shape type: plus                     |
| point              | Shape type: solid point              |
| rect               | Shape type: rectangle                |
| smooth             | Style type: smooth curve             |
| square             | Shape type: square                   |
| tick               | Shape type: tick                     |
| triangleDown       | Shape type: inverted triangle        |
| triangle           | Shape type: triangle                 |
| vh                 | Style type: VH path                  |
| vhv                | Style type: VHV path                 |

Try it out:

```js | ob {  pin: false }
(() => {
  // Available itemMarker shapes
  const shapeList = [
    'bowtie',
    'cross',
    'dash',
    'diamond',
    'dot',
    'hexagon',
    'hollowBowtie',
    'hollowDiamond',
    'hollowHexagon',
    'hollowPoint',
    'hollowSquare',
    'hollowTriangle',
    'hollowTriangleDown',
    'hv',
    'hvh',
    'hyphen',
    'line',
    'plus',
    'point',
    'rect',
    'smooth',
    'square',
    'tick',
    'triangleDown',
    'triangle',
    'vh',
    'vhv',
  ];
  const shapeMap = shapeList.map((p) => {
    return {
      label: p,
      value: p,
    };
  });

  const chart = new G2.Chart();

  chart.options({
    type: 'legends',
    height: 60,
    itemMarker: 'bowtie',
    scale: {
      color: {
        type: 'ordinal',
        domain: ['a', 'b'],
        range: ['steelblue', 'orange'],
      },
    },
  });

  const handleSetShape = (shape) => {
    chart.options({
      itemMarker: shape,
    });
    chart.render(); // Re-render the chart
  };

  const selectorContainer = document.createElement('div');
  selectorContainer.textContent = 'Select legend item marker shape ';
  const selector = document.createElement('select');
  selector.innerHTML = shapeMap.map(
    (shape, index) =>
      `<option value="${shape.value}" ${index === 0 ? 'selected' : ''}>${
        shape.label
      }</option>`,
  );
  selector.onchange = (e) => {
    handleSetShape(e.target.value);
  };
  selectorContainer.appendChild(selector);
  const node = chart.getContainer();
  node.insertBefore(selectorContainer, node.childNodes[0]);

  chart.render();

  return node;
})();
```

When configuring legend item markers in the Legend component, it's not configured as an object, but with `itemMarker` prefix plus property.

```js
({
  legend: {
    color: {
      itemMarker: 'rect',
      itemMarkerSize: 20,
      itemMarkerFill: '#000',
      itemMarkerFillOpacity: 0.9,
      itemMarkerStroke: '#DAF5EC',
      itemMarkerStrokeOpacity: 0.9,
      itemMarkerLineWidth: 2,
      itemMarkerLineDash: [4, 8],
      itemMarkerOpacity: 1,
      itemMarkerShadowColor: '#d3d3d3',
      itemMarkerShadowBlur: 10,
      itemMarkerShadowOffsetX: 10,
      itemMarkerShadowOffsetY: 10,
      itemMarkerCursor: 'pointer',
    },
  },
});
```

### itemLabel

<description> _LegendItemLabelCfg_ **optional** </description>

Applicable to <Badge type="success">Categorical Legend</Badge>. Configure legend item label. _LegendItemLabelCfg_ configuration is as follows:

| Property               | Description                                                                                                                  | Type                                                         | Default Value | Required |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------- | -------- |
| itemLabelText          | Legend item label content                                                                                                    | string \| (datum, index, data) => string                     | -             |          |
| itemLabelFontSize      | Legend item label text size                                                                                                  | number \| (datum, index, data) => number                     | `12`          |          |
| itemLabelFontFamily    | Legend item label text font                                                                                                  | string \| (datum, index, data) => string                     | -             |          |
| itemLabelFontWeight    | Legend item label font weight                                                                                                | number \| (datum, index, data) => number                     | `normal`      |          |
| itemLabelLineHeight    | Legend item label text line height                                                                                           | number \| (datum, index, data) => number                     | -             |          |
| itemLabelTextAlign     | Set legend item label text content alignment                                                                                 | `center` \| `end` \| `left` \| `right` \| `start`            | `start`       |          |
| itemLabelTextBaseline  | Set text baseline used when drawing legend item label text                                                                   | `top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging`   | `bottom`      |          |
| itemLabelFill          | Legend item label font color                                                                                                 | string \| (datum, index, data) => string                     | `#1D2129`     |          |
| itemLabelFillOpacity   | Legend item label font color opacity                                                                                         | number \| (datum, index, data) => number                     | `0.9`         |          |
| itemLabelStroke        | Legend item label font stroke color                                                                                          | string \| (datum, index, data) => string                     | -             |          |
| itemLabelStrokeOpacity | Legend item label font stroke color opacity                                                                                  | number \| (datum, index, data) => number                     | -             |          |
| itemLabelLineWidth     | Legend item label font stroke width                                                                                          | number \| (datum, index, data) => number                     | -             |          |
| itemLabelLineDash      | Legend item label font stroke dash configuration. First value is dash length, second is gap distance. [0,0] means no stroke. | [number,number] \| (datum, index, data) => [number , number] | -             |          |
| itemLabelOpacity       | Legend item label text overall opacity                                                                                       | number \| (datum, index, data) => number                     | -             |          |
| itemLabelShadowColor   | Legend item label text shadow color                                                                                          | string \| (datum, index, data) => string                     | -             |          |
| itemLabelShadowBlur    | Legend item label text shadow Gaussian blur coefficient                                                                      | number \| (datum, index, data) => number                     | -             |          |
| itemLabelShadowOffsetX | Set horizontal distance from shadow to legend item label text                                                                | number \| (datum, index, data) => number                     | -             |          |
| itemLabelShadowOffsetY | Set vertical distance from shadow to legend item label text                                                                  | number \| (datum, index, data) => number                     | -             |          |
| itemLabelCursor        | Legend item label mouse style. Same as CSS mouse styles                                                                      | string \| (datum, index, data) => string                     | `default`     |          |

When configuring legend item labels in the Legend component, it's not configured as an object, but with `itemLabel` prefix plus property.

```js
({
  legend: {
    color: {
      itemLabelText: 'Legend Item Label',
      itemLabelFontSize: 16,
      itemLabelFontFamily: 'sans-serif',
      itemLabelFontWeight: 500,
      itemLabelLineHeight: 20,
      itemLabelTextAlign: 'center',
      itemLabelTextBaseline: 'middle',
      itemLabelFill: '#000',
      itemLabelFillOpacity: 0.9,
      itemLabelStroke: '#DAF5EC',
      itemLabelStrokeOpacity: 0.9,
      itemLabelLineWidth: 2,
      itemLabelLineDash: [4, 8],
      itemLabelOpacity: 1,
      itemLabelShadowColor: '#d3d3d3',
      itemLabelShadowBlur: 10,
      itemLabelShadowOffsetX: 10,
      itemLabelShadowOffsetY: 10,
      itemLabelCursor: 'pointer',
    },
  },
});
```

### itemValue

<description> _LegendItemValueCfg_ **optional** </description>

Applicable to <Badge type="success">Categorical Legend</Badge>. Configure legend item value. _LegendItemValueCfg_ configuration is as follows:

| Property               | Description                                                                                                                  | Type                                                         | Default Value | Required |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------- | -------- |
| itemValueText          | Legend item value content                                                                                                    | string \| (datum, index, data) => string                     | -             |          |
| itemValueFontSize      | Legend item value text size                                                                                                  | number \| (datum, index, data) => number                     | `12`          |          |
| itemValueFontFamily    | Legend item value text font                                                                                                  | string \| (datum, index, data) => string                     | -             |          |
| itemValueFontWeight    | Legend item value font weight                                                                                                | number \| (datum, index, data) => number                     | `normal`      |          |
| itemValueLineHeight    | Legend item value text line height                                                                                           | number \| (datum, index, data) => number                     | -             |          |
| itemValueTextAlign     | Set legend item value text content alignment                                                                                 | `center` \| `end` \| `left` \| `right` \| `start`            | `start`       |          |
| itemValueTextBaseline  | Set text baseline used when drawing legend item value text                                                                   | `top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging`   | `bottom`      |          |
| itemValueFill          | Legend item value font color                                                                                                 | string \| (datum, index, data) => string                     | `#1D2129`     |          |
| itemValueFillOpacity   | Legend item value font color opacity                                                                                         | number \| (datum, index, data) => number                     | `0.65`        |          |
| itemValueStroke        | Legend item value font stroke color                                                                                          | string \| (datum, index, data) => string                     | -             |          |
| itemValueStrokeOpacity | Legend item value font stroke color opacity                                                                                  | number \| (datum, index, data) => number                     | -             |          |
| itemValueLineWidth     | Legend item value font stroke width                                                                                          | number \| (datum, index, data) => number                     | -             |          |
| itemValueLineDash      | Legend item value font stroke dash configuration. First value is dash length, second is gap distance. [0,0] means no stroke. | [number,number] \| (datum, index, data) => [number , number] | -             |          |
| itemValueOpacity       | Legend item value text overall opacity                                                                                       | number \| (datum, index, data) => number                     | -             |          |
| itemValueShadowColor   | Legend item value text shadow color                                                                                          | string \| (datum, index, data) => string                     | -             |          |
| itemValueShadowBlur    | Legend item value text shadow Gaussian blur coefficient                                                                      | number \| (datum, index, data) => number                     | -             |          |
| itemValueShadowOffsetX | Set horizontal distance from shadow to legend item value text                                                                | number \| (datum, index, data) => number                     | -             |          |
| itemValueShadowOffsetY | Set vertical distance from shadow to legend item value text                                                                  | number \| (datum, index, data) => number                     | -             |          |
| itemValueCursor        | Legend item value mouse style. Same as CSS mouse styles                                                                      | string \| (datum, index, data) => string                     | `default`     |          |

When configuring legend item values in the Legend component, it's not configured as an object, but with `itemValue` prefix plus property.

```js
({
  legend: {
    color: {
      itemValueText: 'Legend Item Value',
      itemValueFontSize: 16,
      itemValueFontFamily: 'sans-serif',
      itemValueFontWeight: 500,
      itemValueLineHeight: 20,
      itemValueTextAlign: 'center',
      itemValueTextBaseline: 'middle',
      itemValueFill: '#000',
      itemValueFillOpacity: 0.9,
      itemValueStroke: '#DAF5EC',
      itemValueStrokeOpacity: 0.9,
      itemValueLineWidth: 2,
      itemValueLineDash: [4, 8],
      itemValueOpacity: 1,
      itemValueShadowColor: '#d3d3d3',
      itemValueShadowBlur: 10,
      itemValueShadowOffsetX: 10,
      itemValueShadowOffsetY: 10,
      itemValueCursor: 'pointer',
    },
  },
});
```

### itemBackground

<description> _LegendItemBackgroundCfg_ **optional** </description>

Applicable to <Badge type="success">Categorical Legend</Badge>. Configure legend item background. _LegendItemBackgroundCfg_ configuration is as follows:

| Property                    | Description                                                                                                                  | Type                                                         | Default Value | Required |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------- | -------- |
| itemBackgroundRadius        | Legend item background border radius                                                                                         | number \| (datum, index, data) => number                     | `0`           |          |
| itemBackgroundFill          | Legend item background fill color                                                                                            | string \| (datum, index, data) => string                     | `transparent` |          |
| itemBackgroundFillOpacity   | Legend item background fill opacity                                                                                          | number \| (datum, index, data) => number                     | -             |          |
| itemBackgroundStroke        | Legend item background stroke                                                                                                | string \| (datum, index, data) => string                     | -             |          |
| itemBackgroundStrokeOpacity | Legend item background stroke opacity                                                                                        | number \| (datum, index, data) => number                     | -             |          |
| itemBackgroundLineWidth     | Legend item background stroke width                                                                                          | number \| (datum, index, data) => number                     | -             |          |
| itemBackgroundLineDash      | Legend item background stroke dash configuration. First value is dash length, second is gap distance. [0,0] means no stroke. | [number,number] \| (datum, index, data) => [number , number] | -             |          |
| itemBackgroundOpacity       | Legend item background overall opacity                                                                                       | number \| (datum, index, data) => number                     | -             |          |
| itemBackgroundShadowColor   | Legend item background shadow color                                                                                          | string \| (datum, index, data) => string                     | -             |          |
| itemBackgroundShadowBlur    | Legend item background shadow Gaussian blur coefficient                                                                      | number \| (datum, index, data) => number                     | -             |          |
| itemBackgroundShadowOffsetX | Set horizontal distance from shadow to legend item background                                                                | number \| (datum, index, data) => number                     | -             |          |
| itemBackgroundShadowOffsetY | Set vertical distance from shadow to legend item background                                                                  | number \| (datum, index, data) => number                     | -             |          |
| itemBackgroundCursor        | Legend item background mouse style. Same as CSS mouse styles.                                                                | string \| (datum, index, data) => string                     | `default`     |          |

When configuring legend item background in the Legend component, it's not configured as an object, but with `itemBackground` prefix plus property.

```js
({
  legend: {
    color: {
      itemBackgroundRadius: 50,
      itemBackgroundFill: '#000',
      itemBackgroundFillOpacity: 0.9,
      itemBackgroundStroke: '#DAF5EC',
      itemBackgroundStrokeOpacity: 0.9,
      itemBackgroundLineWidth: 2,
      itemBackgroundLineDash: [4, 8],
      itemBackgroundOpacity: 1,
      itemBackgroundShadowColor: '#d3d3d3',
      itemBackgroundShadowBlur: 10,
      itemBackgroundShadowOffsetX: 10,
      itemBackgroundShadowOffsetY: 10,
      itemBackgroundCursor: 'pointer',
    },
  },
});
```

Next, let's try combining various properties of `itemMarker`, `itemLabel`, `itemValue`, and `itemBackground` to configure a custom legend:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container', height: 350 });
const shapeList = ['bowtie', 'smooth', 'hv', 'rect', 'hollowPoint'];
const data = [
  { genre: 'Sports', sold: 50 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];
chart.options({
  type: 'interval',
  data,
  encode: { x: 'genre', y: 'sold', color: 'genre' },
  legend: {
    color: {
      size: 100,
      itemWidth: 120,
      // itemMarker
      itemMarker: (d, index) => shapeList[index],
      // itemLabel
      itemLabelFill: 'red',
      // itemValue
      itemValueText: (d, index) => data[index]['sold'],
      // itemBackground
      itemBackgroundFill: (d) => d.color,
      itemBackgroundFillOpacity: 0.2,
    },
  },
});

chart.render();
```

### itemWidth

<description> _number_ **optional** </description>

Applicable to <Badge type="success">Categorical Legend</Badge>. Configure legend item width.

### itemSpan

<description> _number|number[]_ **optional** </description>

Applicable to <Badge type="success">Categorical Legend</Badge>. Configure space allocation for legend item marker, label, and value. Default is `[1, 1, 1]`.

### itemSpacing

<description> _number|number[]_ **optional** </description>

Applicable to <Badge type="success">Categorical Legend</Badge>. Configure spacing between legend item marker, label, and value. Default is `[8, 8]`.

### nav

<description> _LegendNavCfg_ **optional** </description>

Applicable to <Badge type="success">Categorical Legend</Badge>. Configure legend navigator. In grid layout, page capacity = `gridRow` × `gridCol`. If the number of categorical items exceeds this capacity, pagination occurs. In flex layout, page capacity is dynamically calculated and limited by container width and height. When categorical items exceed container height or width, pagination occurs and the navigator component is displayed. _LegendNavCfg_ configuration is as follows:

<img alt="legend-nav" width=300 src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*QkXFSoUuqGYAAAAAAAAAAAAAemJ7AQ/original"/>

| Property                | Description                                                                                                                      | Type                                                                      | Default Value | Required |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------- | -------- |
| navEffect               | Page transition effect                                                                                                           | See [Web Animations API](https://g.antv.antgroup.com/api/animation/waapi) | `linear`      |          |
| navDuration             | Single page transition animation duration                                                                                        | number                                                                    | `200`         |          |
| navOrientation          | Page scroll direction<br>- Horizontal `horizontal`<br>- Vertical `vertical`                                                      | `horizontal` \|`vertical`                                                 | `horizontal`  |          |
| navDefaultPage          | Default page number to display                                                                                                   | number                                                                    | `0`           |          |
| navLoop                 | Whether to enable loop pagination                                                                                                | boolean                                                                   | false         |          |
| navPageWidth            | Navigator page width                                                                                                             | number                                                                    | -             |          |
| navPageHeight           | Navigator page height                                                                                                            | number                                                                    | -             |          |
| navControllerPadding    | Spacing between navigator buttons and page numbers                                                                               | number \| number[]                                                        | `5`           |          |
| navControllerSpacing    | Spacing between navigator buttons and page, can be used to configure spacing between navigator and legend                        | number \| number[]                                                        | `5`           |          |
| navPageNumFontSize      | Navigator page number text size                                                                                                  | number \| (datum, index, data) => number                                  | `12`          |          |
| navPageNumFontFamily    | Navigator page number text font                                                                                                  | string \| (datum, index, data) => string                                  | -             |          |
| navPageNumFontWeight    | Navigator page number font weight                                                                                                | number \| (datum, index, data) => number                                  | `normal`      |          |
| navPageNumLineHeight    | Navigator page number text line height                                                                                           | number \| (datum, index, data) => number                                  | -             |          |
| navPageNumTextAlign     | Set navigator page number text content alignment                                                                                 | `center` \| `end` \| `left` \| `right` \| `start`                         | `start`       |          |
| navPageNumTextBaseline  | Set text baseline used when drawing navigator page number text                                                                   | `top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging`                | `bottom`      |          |
| navPageNumFill          | Navigator page number font color                                                                                                 | string \| (datum, index, data) => string                                  | `#1D2129`     |          |
| navPageNumFillOpacity   | Navigator page number font color opacity                                                                                         | number \| (datum, index, data) => number                                  | `0.45`        |          |
| navPageNumStroke        | Navigator page number font stroke color                                                                                          | string \| (datum, index, data) => string                                  | -             |          |
| navPageNumStrokeOpacity | Navigator page number font stroke color opacity                                                                                  | number \| (datum, index, data) => number                                  | -             |          |
| navPageNumLineWidth     | Navigator page number font stroke width                                                                                          | number \| (datum, index, data) => number                                  | -             |          |
| navPageNumLineDash      | Navigator page number font stroke dash configuration. First value is dash length, second is gap distance. [0,0] means no stroke. | [number,number] \| (datum, index, data) => [number , number]              | -             |          |
| navPageNumOpacity       | Navigator page number text overall opacity                                                                                       | number \| (datum, index, data) => number                                  | -             |          |
| navPageNumShadowColor   | Navigator page number text shadow color                                                                                          | string \| (datum, index, data) => string                                  | -             |          |
| navPageNumShadowBlur    | Navigator page number text shadow Gaussian blur coefficient                                                                      | number \| (datum, index, data) => number                                  | -             |          |
| navPageNumShadowOffsetX | Set horizontal distance from shadow to navigator page number text                                                                | number \| (datum, index, data) => number                                  | -             |          |
| navPageNumShadowOffsetY | Set vertical distance from shadow to navigator page number text                                                                  | number \| (datum, index, data) => number                                  | -             |          |
| navPageNumCursor        | Navigator page number mouse style. Same as CSS mouse styles                                                                      | string \| (datum, index, data) => string                                  | `default`     |          |
| navButtonSize           | Navigator button size                                                                                                            | number \| (datum, index, data) => number                                  | -             |          |
| navButtonFill           | Navigator button fill color                                                                                                      | string \| (datum, index, data) => string                                  | `#1D2129`     |          |
| navButtonFillOpacity    | Navigator button fill opacity                                                                                                    | number \| (datum, index, data) => number                                  | `0.65`        |          |
| navButtonStroke         | Navigator button stroke                                                                                                          | string \| (datum, index, data) => string                                  | -             |          |
| navButtonStrokeOpacity  | Navigator button stroke opacity                                                                                                  | number \| (datum, index, data) => number                                  | -             |          |
| navButtonLineWidth      | Navigator button stroke width                                                                                                    | number \| (datum, index, data) => number                                  | -             |          |
| navButtonLineDash       | Navigator button stroke dash configuration. First value is dash length, second is gap distance. [0,0] means no stroke.           | [number,number] \| (datum, index, data) => [number , number]              | -             |          |
| navButtonOpacity        | Navigator button overall opacity                                                                                                 | number \| (datum, index, data) => number                                  | -             |          |
| navButtonShadowColor    | Navigator button shadow color                                                                                                    | string \| (datum, index, data) => string                                  | -             |          |
| navButtonShadowBlur     | Navigator button shadow Gaussian blur coefficient                                                                                | number \| (datum, index, data) => number                                  | -             |          |
| navButtonShadowOffsetX  | Set horizontal distance from shadow to navigator button                                                                          | number \| (datum, index, data) => number                                  | -             |          |
| navButtonShadowOffsetY  | Set vertical distance from shadow to navigator button                                                                            | number \| (datum, index, data) => number                                  | -             |          |
| navButtonCursor         | Navigator button mouse style. Same as CSS mouse styles.                                                                          | string \| (datum, index, data) => string                                  | `default`     |          |
| navFormatter            | Page number text formatter                                                                                                       | (current: number, total: number) => string                                | -             |          |

When configuring navigator properties in the Legend component, it's not configured as an object, but with `nav` prefix plus property.

```js
({
  legend: {
    color: {
      navEffect: 'cubic-bezier',
      navDuration: 400,
      navOrientation: 'vertical',
      navDefaultPage: 1,
      navLoop: true,
      navPageWidth: 10,
      navPageHeight: 10,
      navControllerPadding: 10,
      navControllerSpacing: 10,

      // Configure navPageNum drawing properties
      navPageNumFontSize: 16,
      navPageNumFontFamily: 'sans-serif',
      navPageNumFontWeight: 500,
      navPageNumLineHeight: 20,
      navPageNumTextAlign: 'center',
      navPageNumTextBaseline: 'middle',
      navPageNumFill: '#000',
      navPageNumFillOpacity: 0.9,
      navPageNumStroke: '#DAF5EC',
      navPageNumStrokeOpacity: 0.9,
      navPageNumLineWidth: 2,
      navPageNumLineDash: [4, 8],
      navPageNumOpacity: 1,
      navPageNumShadowColor: '#d3d3d3',
      navPageNumShadowBlur: 10,
      navPageNumShadowOffsetX: 10,
      navPageNumShadowOffsetY: 10,
      navPageNumCursor: 'pointer',

      // Configure navButton drawing properties
      navButtonFill: '#000',
      navButtonFillOpacity: 0.9,
      navButtonStroke: '#DAF5EC',
      navButtonStrokeOpacity: 0.9,
      navButtonLineWidth: 2,
      navButtonLineDash: [4, 8],
      navButtonOpacity: 1,
      navButtonShadowColor: '#d3d3d3',
      navButtonShadowBlur: 10,
      navButtonShadowOffsetX: 10,
      navButtonShadowOffsetY: 10,
      navButtonCursor: 'pointer',
    },
  },
});
```

Try it out:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container', height: 350 });

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 50 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold', color: 'genre' },
  legend: {
    color: {
      itemWidth: 160,
      navEffect: 'cubic-bezier',
      navDuration: 400,
      navOrientation: 'vertical',
      navDefaultPage: 2,
      navLoop: true,

      //配置navPageNum的绘图属性
      navPageNumFontSize: 16,
      navPageNumFontFamily: 'sans-serif',
      navPageNumFontWeight: 500,
      navPageNumLineHeight: 20,
      navPageNumTextAlign: 'center',
      navPageNumTextBaseline: 'middle',
      navPageNumFill: '#2989FF',
      navPageNumFillOpacity: 0.9,
      navPageNumStroke: '#DAF5EC',
      navPageNumStrokeOpacity: 0.9,
      navPageNumLineWidth: 2,
      navPageNumLineDash: [4, 8],
      navPageNumOpacity: 1,
      navPageNumShadowColor: '#d3d3d3',
      navPageNumShadowBlur: 10,
      navPageNumShadowOffsetX: 10,
      navPageNumShadowOffsetY: 10,
      navPageNumCursor: 'pointer',

      // 配置navButton的绘图属性
      navButtonFill: '#2989FF',
      navButtonFillOpacity: 0.7,
      navButtonStroke: '#DAF5EC',
      navButtonStrokeOpacity: 0.9,
      navButtonLineWidth: 2,
      navButtonLineDash: [4, 8],
      navButtonOpacity: 0.9,
      navButtonShadowColor: '#d3d3d3',
      navButtonShadowBlur: 10,
      navButtonShadowOffsetX: 10,
      navButtonShadowOffsetY: 10,
      navButtonCursor: 'pointer',

      navFormatter: (current, total) => `第${current}页/共${total}页`,
    },
  },
});

chart.render();
```

### color

<description> _string[] | [d3-interpolate](https://github.com/d3/d3-interpolate)_ **optional** </description>

Applicable to <Badge type="warning">Continuous Legend</Badge>. Configure color band colors for continuous legend. When it's an array, colors are taken in order.

### block

<description> _boolean_ **optional** </description>

Applicable to <Badge type="warning">Continuous Legend</Badge>. Whether continuous legend displays by intervals. Default is false.

### type

<description> _size | color_ **optional** </description>

Applicable to <Badge type="warning">Continuous Legend</Badge>. Configure type of continuous legend. Default is `color`.

Combining `block` and `type` properties allows you to configure different styles of continuous legends. Continuous data legends have 4 styles:

- Continuous representation `default`

  <img alt="ribbon-color" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ds9pTqbi4OAAAAAAAAAAAAAADmJ7AQ/original" width="300" />

- Range representation `block=true`

  <img alt="ribbon-color" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*kpDRTJVgkaEAAAAAAAAAAAAADmJ7AQ/original" width="300" />

- Size representation `type='size'`

  <img alt="ribbon-color" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*uHJYTbVSebgAAAAAAAAAAAAADmJ7AQ/original" width="300" />

- Size, range representation `type='size'` `block=true`

  <img alt="ribbon-color" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*MahwS6sQocoAAAAAAAAAAAAADmJ7AQ/original" width="300" />

### ribbon

<description> _LegendRibbonCfg_ **optional** </description>

Applicable to <Badge type="warning">Continuous Legend</Badge>. Configure color band of continuous legend. _LegendRibbonCfg_ configuration is as follows:

| Property            | Description                                                                                                      | Type                                                         | Default Value | Required |
| ------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------- | -------- |
| ribbonSize          | Color band size                                                                                                  | number \| (datum, index, data) => number                     | `12`          |          |
| ribbonFill          | Color band fill color                                                                                            | string \| (datum, index, data) => string                     | `#aaa`        |          |
| ribbonFillOpacity   | Color band fill opacity                                                                                          | number \| (datum, index, data) => number                     | -             |          |
| ribbonStroke        | Color band stroke                                                                                                | string \| (datum, index, data) => string                     | -             |          |
| ribbonStrokeOpacity | Color band stroke opacity                                                                                        | number \| (datum, index, data) => number                     | -             |          |
| ribbonLineWidth     | Color band stroke width                                                                                          | number \| (datum, index, data) => number                     | -             |          |
| ribbonLineDash      | Color band stroke dash configuration. First value is dash length, second is gap distance. [0,0] means no stroke. | [number,number] \| (datum, index, data) => [number , number] | -             |          |
| ribbonOpacity       | Color band overall opacity                                                                                       | number \| (datum, index, data) => number                     | -             |          |
| ribbonShadowColor   | Color band shadow color                                                                                          | string \| (datum, index, data) => string                     | -             |          |
| ribbonShadowBlur    | Color band shadow Gaussian blur coefficient                                                                      | number \| (datum, index, data) => number                     | -             |          |
| ribbonShadowOffsetX | Set horizontal distance from shadow to color band                                                                | number \| (datum, index, data) => number                     | -             |          |
| ribbonShadowOffsetY | Set vertical distance from shadow to color band                                                                  | number \| (datum, index, data) => number                     | -             |          |
| ribbonCursor        | Color band mouse style. Same as CSS mouse styles.                                                                | string \| (datum, index, data) => string                     | `default`     |          |

When configuring color band in the Legend component, it's not configured as an object, but with `ribbon` prefix plus property.

```js
({
  legend: {
    color: {
      ribbonSize: 20,
      ribbonFill: '#000',
      ribbonFillOpacity: 0.9,
      ribbonStroke: '#DAF5EC',
      ribbonStrokeOpacity: 0.9,
      ribbonLineWidth: 2,
      ribbonLineDash: [4, 8],
      ribbonOpacity: 1,
      ribbonShadowColor: '#d3d3d3',
      ribbonShadowBlur: 10,
      ribbonShadowOffsetX: 10,
      ribbonShadowOffsetY: 10,
      ribbonCursor: 'pointer',
    },
  },
});
```

### handle

<description> _LegendHandleCfg_ **optional** </description>

The slider window marks the current value selection range. Through interaction with the slider window, you can select the value range in the view.

 <img alt="slider-window" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*eAnbT6OFQlwAAAAAAAAAAAAADmJ7AQ/original" width="300" />

Applicable to <Badge type="warning">Continuous Legend</Badge>. Configure slider handle of continuous legend. _LegendHandleCfg_ configuration is as follows:

| Property                 | Description                                                                                                             | Type                                                         | Default Value | Required |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------- | -------- |
| handle                   | Whether to display slider handle                                                                                        | boolean                                                      | true          |          |
| handleLabel              | Whether to display slider handle labels                                                                                 | boolean                                                      | false         |          |
| slidable                 | Whether window is slidable                                                                                              | boolean                                                      | true          |          |
| range                    | Default selection range for slider window                                                                               | [number, number]                                             | `[min, max]`  |          |
| step                     | Single slide step size                                                                                                  | number                                                       | `1`           |          |
| handleLabelFontSize      | Handle label text size                                                                                                  | number \| (datum, index, data) => number                     | `12`          |          |
| handleLabelFontFamily    | Handle label text font                                                                                                  | string \| (datum, index, data) => string                     | -             |          |
| handleLabelFontWeight    | Handle label font weight                                                                                                | number \| (datum, index, data) => number                     | `normal`      |          |
| handleLabelLineHeight    | Handle label text line height                                                                                           | number \| (datum, index, data) => number                     | -             |          |
| handleLabelTextAlign     | Set handle label text content alignment                                                                                 | `center` \| `end` \| `left` \| `right` \| `start`            | `start`       |          |
| handleLabelTextBaseline  | Set text baseline used when drawing handle label text                                                                   | `top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging`   | `bottom`      |          |
| handleLabelFill          | Handle label font color                                                                                                 | string \| (datum, index, data) => string                     | `#1D2129`     |          |
| handleLabelFillOpacity   | Handle label font color opacity                                                                                         | number \| (datum, index, data) => number                     | `0.45`        |          |
| handleLabelStroke        | Handle label font stroke color                                                                                          | string \| (datum, index, data) => string                     | -             |          |
| handleLabelStrokeOpacity | Handle label font stroke color opacity                                                                                  | number \| (datum, index, data) => number                     | -             |          |
| handleLabelLineWidth     | Handle label font stroke width                                                                                          | number \| (datum, index, data) => number                     | -             |          |
| handleLabelLineDash      | Handle label font stroke dash configuration. First value is dash length, second is gap distance. [0,0] means no stroke. | [number,number] \| (datum, index, data) => [number , number] | -             |          |
| handleLabelOpacity       | Handle label text overall opacity                                                                                       | number \| (datum, index, data) => number                     | -             |          |
| handleLabelShadowColor   | Handle label text shadow color                                                                                          | string \| (datum, index, data) => string                     | -             |          |
| handleLabelShadowBlur    | Handle label text shadow Gaussian blur coefficient                                                                      | number \| (datum, index, data) => number                     | -             |          |
| handleLabelShadowOffsetX | Set horizontal distance from shadow to handle label text                                                                | number \| (datum, index, data) => number                     | -             |          |
| handleLabelShadowOffsetY | Set vertical distance from shadow to handle label text                                                                  | number \| (datum, index, data) => number                     | -             |          |
| handleLabelCursor        | Handle label mouse style. Same as CSS mouse styles                                                                      | string \| (datum, index, data) => string                     | `default`     |          |
| handleIconSize           | Handle icon size                                                                                                        | number \| (datum, index, data) => number                     | -             |          |
| handleIconFill           | Handle icon fill color                                                                                                  | string \| (datum, index, data) => string                     | `#1D2129`     |          |
| handleIconFillOpacity    | Handle icon fill opacity                                                                                                | number \| (datum, index, data) => number                     | `0.65`        |          |
| handleIconStroke         | Handle icon stroke                                                                                                      | string \| (datum, index, data) => string                     | -             |          |
| handleIconStrokeOpacity  | Handle icon stroke opacity                                                                                              | number \| (datum, index, data) => number                     | -             |          |
| handleIconLineWidth      | Handle icon stroke width                                                                                                | number \| (datum, index, data) => number                     | -             |          |
| handleIconLineDash       | Handle icon stroke dash configuration. First value is dash length, second is gap distance. [0,0] means no stroke.       | [number,number] \| (datum, index, data) => [number , number] | -             |          |
| handleIconOpacity        | Handle icon overall opacity                                                                                             | number \| (datum, index, data) => number                     | -             |          |
| handleIconShadowColor    | Handle icon shadow color                                                                                                | string \| (datum, index, data) => string                     | -             |          |
| handleIconShadowBlur     | Handle icon shadow Gaussian blur coefficient                                                                            | number \| (datum, index, data) => number                     | -             |          |
| handleIconShadowOffsetX  | Set horizontal distance from shadow to handle icon                                                                      | number \| (datum, index, data) => number                     | -             |          |
| handleIconShadowOffsetY  | Set vertical distance from shadow to handle icon                                                                        | number \| (datum, index, data) => number                     | -             |          |
| handleIconCursor         | Handle icon mouse style. Same as CSS mouse styles.                                                                      | string \| (datum, index, data) => string                     | `default`     |          |

When configuring continuous legend slider handle properties in the Legend component, it's not configured as an object, but with `handle` prefix plus property.

```js
({
  legend: {
    color: {
      handle: true,
      handleLabel: true,
      slidable: true,
      range: [0, 1],
      step: 1,
      // Configure handleLabel drawing properties
      handleLabelFontSize: 16,
      handleLabelFontFamily: 'sans-serif',
      handleLabelFontWeight: 500,
      handleLabelLineHeight: 20,
      handleLabelTextAlign: 'center',
      handleLabelTextBaseline: 'middle',
      handleLabelFill: '#000',
      handleLabelFillOpacity: 0.9,
      handleLabelStroke: '#DAF5EC',
      handleLabelStrokeOpacity: 0.9,
      handleLabelLineWidth: 2,
      handleLabelLineDash: [4, 8],
      handleLabelOpacity: 1,
      handleLabelShadowColor: '#d3d3d3',
      handleLabelShadowBlur: 10,
      handleLabelShadowOffsetX: 10,
      handleLabelShadowOffsetY: 10,
      handleLabelCursor: 'pointer',

      handleIconSize: 50,
      // Configure handleIcon drawing properties
      handleIconFill: '#000',
      handleIconFillOpacity: 0.9,
      handleIconStroke: '#DAF5EC',
      handleIconStrokeOpacity: 0.9,
      handleIconLineWidth: 2,
      handleIconLineDash: [4, 8],
      handleIconOpacity: 1,
      handleIconShadowColor: '#d3d3d3',
      handleIconShadowBlur: 10,
      handleIconShadowOffsetX: 10,
      handleIconShadowOffsetY: 10,
      handleIconCursor: 'pointer',
    },
  },
});
```

### label

<description> _LegendLabelCfg_ **optional** </description>

Applicable to <Badge type="warning">Continuous Legend</Badge>. Configure labels/tick values of continuous legend. _LegendLabelCfg_ configuration is as follows:

| Property           | Description                                                                                                                             | Type                                                         | Default Value | Required |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------- | -------- |
| label              | Whether to display continuous legend tick values                                                                                        | boolean                                                      | true          |          |
| labelFormatter     | Continuous legend tick value formatter                                                                                                  | (datum, index, data)=>string                                 | -             |          |
| labelFilter        | Continuous legend tick value filter                                                                                                     | (datum, index, data)=>boolean                                | -             |          |
| labelDirection     | Position of continuous legend tick values relative to color band, refer to `axis direction`                                             | `positive` \| `negative`                                     | `positive`    |          |
| labelSpacing       | Spacing from continuous legend tick values to color band                                                                                | number                                                       | `3`           |          |
| labelAlign         | Continuous legend tick value alignment<br/> - `'value'` align to tick<br/>- `'range'` align to range                                    | `value` \| `range`                                           | `value`       |          |
| labelFontSize      | Continuous legend tick value text size                                                                                                  | number \| (datum, index, data) => number                     | `12`          |          |
| labelFontFamily    | Continuous legend tick value text font                                                                                                  | string \| (datum, index, data) => string                     | -             |          |
| labelFontWeight    | Continuous legend tick value font weight                                                                                                | number \| (datum, index, data) => number                     | `normal`      |          |
| labelLineHeight    | Continuous legend tick value text line height                                                                                           | number \| (datum, index, data) => number                     | -             |          |
| labelTextAlign     | Set continuous legend tick value text content alignment                                                                                 | `center` \| `end` \| `left` \| `right` \| `start`            | `start`       |          |
| labelTextBaseline  | Set text baseline used when drawing continuous legend tick value text                                                                   | `top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging`   | `bottom`      |          |
| labelFill          | Continuous legend tick value font color                                                                                                 | string \| (datum, index, data) => string                     | `#1D2129`     |          |
| labelFillOpacity   | Continuous legend tick value font color opacity                                                                                         | number \| (datum, index, data) => number                     | `0.45`        |          |
| labelStroke        | Continuous legend tick value font stroke color                                                                                          | string \| (datum, index, data) => string                     | -             |          |
| labelStrokeOpacity | Continuous legend tick value font stroke color opacity                                                                                  | number \| (datum, index, data) => number                     | -             |          |
| labelLineWidth     | Continuous legend tick value font stroke width                                                                                          | number \| (datum, index, data) => number                     | -             |          |
| labelLineDash      | Continuous legend tick value font stroke dash configuration. First value is dash length, second is gap distance. [0,0] means no stroke. | [number,number] \| (datum, index, data) => [number , number] | -             |          |
| labelOpacity       | Continuous legend tick value text overall opacity                                                                                       | number \| (datum, index, data) => number                     | -             |          |
| labelShadowColor   | Continuous legend tick value text shadow color                                                                                          | string \| (datum, index, data) => string                     | -             |          |
| labelShadowBlur    | Continuous legend tick value text shadow Gaussian blur coefficient                                                                      | number \| (datum, index, data) => number                     | -             |          |
| labelShadowOffsetX | Set horizontal distance from shadow to continuous legend tick value text                                                                | number \| (datum, index, data) => number                     | -             |          |
| labelShadowOffsetY | Set vertical distance from shadow to continuous legend tick value text                                                                  | number \| (datum, index, data) => number                     | -             |          |
| labelCursor        | Handle label mouse style. Same as CSS mouse styles                                                                                      | string \| (datum, index, data) => string                     | `default`     |          |

**Tick value alignment methods**

- Align to tick

 <img alt="align-tick" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*vN1uQqWZ3K4AAAAAAAAAAAAADmJ7AQ/original" width="300" />

- Align to range

 <img alt="align-range" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*R_C4QJ5JxgMAAAAAAAAAAAAADmJ7AQ/original" width="300" />

When configuring continuous legend labels/tick values properties in the Legend component, it's not configured as an object, but with `label` prefix plus property.

```js
({
  legend: {
    color: {
      label: true,
      labelFormatter: (d) => {},
      labelFilter: (datum, index, data) => {},
      labelDirection: 'positive',
      labelSpacing: 5,
      labelAlign: 'range',
      // Configure continuous legend tick value label drawing properties
      labelFontSize: 16,
      labelFontFamily: 'sans-serif',
      labelFontWeight: 500,
      labelLineHeight: 20,
      labelTextAlign: 'center',
      labelTextBaseline: 'middle',
      labelFill: '#000',
      labelFillOpacity: 0.9,
      labelStroke: '#DAF5EC',
      labelStrokeOpacity: 0.9,
      labelLineWidth: 2,
      labelLineDash: [4, 8],
      labelOpacity: 1,
      labelShadowColor: '#d3d3d3',
      labelShadowBlur: 10,
      labelShadowOffsetX: 10,
      labelShadowOffsetY: 10,
      labelCursor: 'pointer',
    },
  },
});
```

### indicator

<description> _LegendIndicatorCfg_ **optional** </description>

Applicable to <Badge type="warning">Continuous Legend</Badge>. Configure indicator of continuous legend. The indicator is a tooltip component that indicates the value at the current position during interaction with the continuous legend.

<img alt="indicator" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*NiI8Ta84y_MAAAAAAAAAAAAADmJ7AQ/original" height="50" />

_LegendIndicatorCfg_ configuration is as follows:

| Property                         | Description                                                                                                                      | Type                                                         | Default Value | Required |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------- | -------- |
| indicator                        | Whether to display continuous legend value indicator                                                                             | boolean                                                      | false         |          |
| indicatorFormatter               | Value indicator formatter                                                                                                        | (datum, index, data)=>string                                 | -             |          |
| indicatorLabelFontSize           | Value indicator text size                                                                                                        | number \| (datum, index, data) => number                     | -             |          |
| indicatorLabelFontFamily         | Value indicator text font                                                                                                        | string \| (datum, index, data) => string                     | -             |          |
| indicatorLabelFontWeight         | Value indicator font weight                                                                                                      | number \| (datum, index, data) => number                     | -             |          |
| indicatorLabelLineHeight         | Value indicator text line height                                                                                                 | number \| (datum, index, data) => number                     | -             |          |
| indicatorLabelTextAlign          | Set value indicator text content alignment                                                                                       | `center` \| `end` \| `left` \| `right` \| `start`            | `start`       |          |
| indicatorLabelTextBaseline       | Set text baseline used when drawing value indicator text                                                                         | `top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging`   | `bottom`      |          |
| indicatorLabelFill               | Value indicator font color                                                                                                       | string \| (datum, index, data) => string                     | -             |          |
| indicatorLabelFillOpacity        | Value indicator font color opacity                                                                                               | number \| (datum, index, data) => number                     | -             |          |
| indicatorLabelStroke             | Value indicator font stroke color                                                                                                | string \| (datum, index, data) => string                     | -             |          |
| indicatorLabelStrokeOpacity      | Value indicator font stroke color opacity                                                                                        | number \| (datum, index, data) => number                     | -             |          |
| indicatorLabelLineWidth          | Value indicator font stroke width                                                                                                | number \| (datum, index, data) => number                     | -             |          |
| indicatorLabelLineDash           | Value indicator font stroke dash configuration. First value is dash length, second is gap distance. [0,0] means no stroke.       | [number,number] \| (datum, index, data) => [number , number] | -             |          |
| indicatorLabelOpacity            | Value indicator text overall opacity                                                                                             | number \| (datum, index, data) => number                     | -             |          |
| indicatorLabelShadowColor        | Value indicator text shadow color                                                                                                | string \| (datum, index, data) => string                     | -             |          |
| indicatorLabelShadowBlur         | Value indicator text shadow Gaussian blur coefficient                                                                            | number \| (datum, index, data) => number                     | -             |          |
| indicatorLabelShadowOffsetX      | Set horizontal distance from shadow to value indicator text                                                                      | number \| (datum, index, data) => number                     | -             |          |
| indicatorLabelShadowOffsetY      | Set vertical distance from shadow to value indicator text                                                                        | number \| (datum, index, data) => number                     | -             |          |
| indicatorLabelCursor             | Value indicator mouse style. Same as CSS mouse styles                                                                            | string \| (datum, index, data) => string                     | `default`     |          |
| indicatorBackgroundFill          | Value indicator background fill color                                                                                            | string \| (datum, index, data) => string                     | -             |          |
| indicatorBackgroundFillOpacity   | Value indicator background fill opacity                                                                                          | number \| (datum, index, data) => number                     | -             |          |
| indicatorBackgroundStroke        | Value indicator background stroke                                                                                                | string \| (datum, index, data) => string                     | -             |          |
| indicatorBackgroundStrokeOpacity | Value indicator background stroke opacity                                                                                        | number \| (datum, index, data) => number                     | -             |          |
| indicatorBackgroundLineWidth     | Value indicator background stroke width                                                                                          | number \| (datum, index, data) => number                     | -             |          |
| indicatorBackgroundLineDash      | Value indicator background stroke dash configuration. First value is dash length, second is gap distance. [0,0] means no stroke. | [number,number] \| (datum, index, data) => [number , number] | -             |          |
| indicatorBackgroundOpacity       | Value indicator background overall opacity                                                                                       | number \| (datum, index, data) => number                     | -             |          |
| indicatorBackgroundShadowColor   | Value indicator background shadow color                                                                                          | string \| (datum, index, data) => string                     | -             |          |
| indicatorBackgroundShadowBlur    | Value indicator background shadow Gaussian blur coefficient                                                                      | number \| (datum, index, data) => number                     | -             |          |
| indicatorBackgroundShadowOffsetX | Set horizontal distance from shadow to value indicator background                                                                | number \| (datum, index, data) => number                     | -             |          |
| indicatorBackgroundShadowOffsetY | Set vertical distance from shadow to value indicator background                                                                  | number \| (datum, index, data) => number                     | -             |          |
| indicatorBackgroundCursor        | Value indicator background mouse style. Same as CSS mouse styles.                                                                | string \| (datum, index, data) => string                     | `default`     |          |

When configuring value indicator properties in the Legend component, it's not configured as an object, but with `indicator` prefix plus property.

```js
({
  legend: {
    color: {
      indicator: 'true',
      indicatorFormatter: (d) => {},

      // Configure indicatorLabel drawing properties
      indicatorLabelFontSize: 16,
      indicatorLabelFontFamily: 'sans-serif',
      indicatorLabelFontWeight: 500,
      indicatorLabelLineHeight: 20,
      indicatorLabelTextAlign: 'center',
      indicatorLabelTextBaseline: 'middle',
      indicatorLabelFill: '#000',
      indicatorLabelFillOpacity: 0.9,
      indicatorLabelStroke: '#DAF5EC',
      indicatorLabelStrokeOpacity: 0.9,
      indicatorLabelLineWidth: 2,
      indicatorLabelLineDash: [4, 8],
      indicatorLabelOpacity: 1,
      indicatorLabelShadowColor: '#d3d3d3',
      indicatorLabelShadowBlur: 10,
      indicatorLabelShadowOffsetX: 10,
      indicatorLabelShadowOffsetY: 10,
      indicatorLabelCursor: 'pointer',

      // Configure indicatorBackground drawing properties
      indicatorBackgroundFill: '#000',
      indicatorBackgroundFillOpacity: 0.9,
      indicatorBackgroundStroke: '#DAF5EC',
      indicatorBackgroundStrokeOpacity: 0.9,
      indicatorBackgroundLineWidth: 2,
      indicatorBackgroundLineDash: [4, 8],
      indicatorBackgroundOpacity: 1,
      indicatorBackgroundShadowColor: '#d3d3d3',
      indicatorBackgroundShadowBlur: 10,
      indicatorBackgroundShadowOffsetX: 10,
      indicatorBackgroundShadowOffsetY: 10,
      indicatorBackgroundCursor: 'pointer',
    },
  },
});
```

## Events

The Legend component exposes some special events for getting component interaction information.

| Event Type                                                  | Description                                          | Type                                             |
| ----------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------ |
| click <Badge type="success">Categorical Legend</Badge>      | Triggered when clicking legend item                  | `(item:Selection)=>void`                         |
| mouseenter <Badge type="success">Categorical Legend</Badge> | Triggered when mouse enters legend item              | `(item: Selection)=>void`                        |
| mouseleave <Badge type="success">Categorical Legend</Badge> | Triggered when mouse leaves legend item              | `(item:Selection)=>void`                         |
| valuechange <Badge type="warning">Continuous Legend</Badge> | Triggered when slider window selection range changes | `(range: [number, number])=>void`                |
| indicate <Badge type="warning">Continuous Legend</Badge>    | Triggered when indicator value changes               | `(value: number, range: [number, number])=>void` |

Components appear after chart rendering, so component events should be mounted after `afterrender`. Here's an example:

```js
chart.on('afterrender', () => {
  const { canvas } = chart.getContext();
  const { document } = canvas;
  document
    .querySelector('.component')
    .addEventListener('valuechange', (range) => {});
});
```

## Examples

### Default Display of Only Partial Legends on First Chart Render

There's currently no built-in API for this, so you need to manually trigger legendFilter to achieve it.

```js | ob { inject: true }
import { Chart, ChartEvent } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 100 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold', color: 'genre' },
});

chart.render();

chart.on(ChartEvent.AFTER_RENDER, () => {
  chart.emit('legend:filter', {
    data: { channel: 'color', values: ['Sports', 'Strategy', 'Action'] },
  });
});
```

### Custom Legend Item Marker (itemMarker)

In actual development, the built-in legend item markers may not meet your requirements. Don't worry, G2 provides powerful customization features.

#### Custom Symbol

Each symbol can be customized, mainly in three steps:

- Define symbol path.
- Register symbol.
- Use symbol.

First, let's see how to define a symbol path. A symbol path is a function that takes the starting point coordinates x, y and drawing radius, and returns a path.

```js
import { type SymbolFactor } from '@antv/g2';

const triangle: SymbolFactor = (x, y, r) => {
  const diffY = r * Math.sin((1 / 3) * Math.PI);
  return [
    ['M', x - r, y + diffY],
    ['L', x, y - diffY],
    ['L', x + r, y + diffY],
    ['Z'],
  ];
};
triangle.style = ['fill'];
```

Next is registering the symbol, by calling `G2.register('symbol.${symbol}', Symbol)`. Where `symbol` is the symbol name and `Symbol` is the defined symbol path. For example, registering a triangle symbol:

```js
import { register } from '@antv/g2';

register('symbol.customTriangle', triangle);
```

Finally, use the symbol:

```js
legend: {
  color: {
    itemMarker: 'customTriangle';
  }
}
```

#### Using Images

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const logo = [
  [
    'TikTok',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*8IXHQLvx9QkAAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'Kuaishou',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*swueRrrKvbcAAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'Xiaomi',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*79G3TIt3mBoAAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'WeChat',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*_ELBTJLp0dQAAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'Keep',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*JzbKRpFhR14AAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'Chrome',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*xLnYTaZfdh8AAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'QQ',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*AbGNTpA5JLwAAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'Youku',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*UL6lS4jw9lUAAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'Baidu Maps',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*I6nrTITAxcoAAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'Tencent Video',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*zwVvT5OFnuYAAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'Bilibili',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*6jkAQayTiMMAAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'Word',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*FbkXT6K6mVEAAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'Excel',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*CKb-R6ZAFpYAAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'PowerPoint',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*K7-FT4RYRqIAAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'Tencent Meeting',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*xbPXR7snu44AAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'NetEase Cloud Music',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*upKlRJ9QB4cAAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'Safari',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*kjDHRbiW734AAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'Maps',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*tl-2QIB8LKIAAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'Docker',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*iJ4dS49yrJ4AAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'VSCode',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*rR6nRInEcz4AAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'Baidu Netdisk',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*futaTbIAkG4AAAAAAAAAAAAADmJ7AQ/original',
  ],
  [
    'Evernote',
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Skh1S4BfL9oAAAAAAAAAAAAADmJ7AQ/original',
  ],
];

chart
  .interval()
  .data(logo)
  .encode('x', (d) => d[0])
  .encode('y', () => Math.random())
  .encode('color', (d) => d[1])
  .scale('y', { nice: true })
  .legend({
    color: {
      itemMarker: (_, index) => () => {
        const { document } = chart.getContext().canvas;
        const image = document.createElement('image', {
          style: {
            width: 20,
            height: 20,
            transform: `translate(-10, -10)`,
            src: logo[index][1],
          },
        });
        return image;
      },
      itemMarkerSize: 40,
      itemLabelText: (_, index) => logo[index][0],
      maxRows: 1,
    },
  })
  .tooltip(false);

chart.render();
```

### Custom Legend

G2's built-in legends are drawn with canvas or svg. If you want to render legends with HTML, you can customize legends by following these steps:

- Turn off built-in legends and render the chart.
- Wait for chart rendering to complete, then render HTML legend based on scale data.
- Add interactions (if needed).

First, turn off built-in legends and render the chart.

```js
chart.options({ legend: false });
```

Then wait for chart rendering to complete and call `legendColor` to render HTML legend:

```js
chart.render().then(legendColor);
```

In `legendColor`, we first need to draw the legend. The following example draws the legend and adds it in front of the canvas:

```js
function legendColor(chart) {
  const node = chart.getContainer();
  const legend = document.createElement('div');
  node.insertBefore(legend, node.childNodes[0]);

  // ...
}
```

After drawing the legend, we need to draw legend items. This data comes from the corresponding channel's scale: `chart.getScale().color`, and get corresponding names and values through the scale's domain and range.

```js
function legendColor(chart) {
  // ...
  const scale = chart.getScale().color;
  const { domain } = scale.getOptions();
  const items = domain.map(() => {});
  // ...
}
```

After drawing legend items, we should add interactions to each legend item through `item.onclick`, collect currently selected values, and add Filter transforms to the chart declaration based on these values, then re-render the chart. The complete implementation is as follows:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

// Add legend
function legendColor(chart) {
  // Create Legend and mount legend
  const node = chart.getContainer();
  const legend = document.createElement('div');
  legend.style.display = 'flex';
  node.insertBefore(legend, node.childNodes[0]);

  // Create and mount Items
  const { color: scale } = chart.getScale();
  const { domain } = scale.getOptions();
  const items = domain.map((value) => {
    const item = document.createElement('div');
    const color = scale.map(value);
    item.style.marginLeft = '1em';
    item.innerHTML = `
      <span style="
        background-color:${color};
        display:inline-block;
        width:10px;
        height:10px;"
      ></span>
      <span>${value}</span>
      `;
    return item;
  });
  items.forEach((d) => legend.append(d));

  // Listen to events
  const selectedValues = [...domain];
  const options = chart.options();
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const value = domain[i];
    item.style.cursor = 'pointer';
    item.onclick = () => {
      const index = selectedValues.indexOf(value);
      if (index !== -1) {
        selectedValues.splice(index, 1);
        item.style.opacity = 0.5;
      } else {
        selectedValues.push(value);
        item.style.opacity = 1;
      }
      changeColor(selectedValues);
    };
  }

  // Re-render view
  function changeColor(value) {
    const { transform = [] } = options;
    const newTransform = [{ type: 'filter', color: { value } }, ...transform];
    chart.options({
      ...options,
      transform: newTransform, // Specify new transform
      scale: { color: { domain } },
    });
    chart.render(); // Re-render chart
  }
}

// Draw chart
const container = document.createElement('div');

const chart = new Chart({
  container: 'container',
  container,
});

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold', color: 'genre' },
  legend: false,
});

chart.render().then(legendColor);
```
