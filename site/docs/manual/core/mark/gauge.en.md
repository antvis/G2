---
title: gauge
order: 8
---

## Overview

`gauge` is used to create gauge charts, which are common visualization charts used to display data progress, proportions, or comparisons.

Typical use cases:

- Business metrics: sales achievement rate, user growth progress;
- System monitoring: CPU/memory usage, disk capacity warnings;
- Device gauges: vehicle speedometer, temperature gauge simulation.

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'gauge', // Set the chart type to gauge
  data: {
    value: {
      target: 120, // Target value of the gauge
      total: 400, // Total value of the gauge
      name: 'score', // Name of the gauge data
    },
  },
});

chart.render();
```

## Options

| Property | Description                                                                                                                                                 | Type              | Default | Required |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------- | -------- |
| data     | Define the gauge values, target values and category information, driving pointer position, color mapping and multi-gauge facet display through data binding | [data](#data)     | -       | ✓        |
| encode   | Configure visual channels for `gauge` marks, including `x`, `y`, `color`, etc., to specify the relationship between visual element properties and data      | [encode](#encode) | -       |          |
| scale    | Configure scales for `gauge` marks, including `y`, `size`, etc.                                                                                             | [scale](#scale)   | -       |          |
| style    | Configure graphic styles and label styles                                                                                                                   | [style](#style)   | -       |          |

### data

`data` defines the gauge values, target values and category information, driving pointer position, color mapping and multi-gauge facet display through data binding.

| Property   | Description                                                                                                                                                                                                          | Type       | Default | Required |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------- | -------- |
| target     | Set the target value of the gauge pointer                                                                                                                                                                            | `number`   | -       |          |
| total      | Set the maximum range value of the gauge scale                                                                                                                                                                       | `number`   | -       |          |
| percent    | Set the percentage pointed by the gauge pointer (when `percent` is configured, `target` and `total` values will be invalid, please set `thresholds` in a reasonable range, otherwise it will cause rendering errors) | `number`   | -       |          |
| thresholds | Set the gauge scale threshold intervals                                                                                                                                                                              | `number[]` | -       |          |

For more `data` configuration, you can check the [data](/en/manual/core/data/overview) introduction page.

### encode

Configure visual channels for `gauge` marks, which define the mapping relationship between data fields and visual properties. This is an important configuration that determines how data is transformed into visual representation.

| Property | Description                                                                                                                                                                 | Type                             | Default   | Required |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | --------- | -------- |
| x        | Bind the `x` property channel of `gauge` marks, usually a time or ordinal name field in `data`                                                                              | [encode](/en/manual/core/encode) | `'x'`     |          |
| y        | Bind the `y` property channel of `gauge` marks, usually a numeric or array field in `data`                                                                                  | [encode](/en/manual/core/encode) | `'y'`     |          |
| color    | Bind the `color` property channel of `gauge` marks. If data fields are mapped to color channels, data will be grouped and split into multiple regions with different colors | [encode](/en/manual/core/encode) | `'color'` |          |

For more `encode` configuration, you can check the [encode](/en/manual/core/encode) introduction page.

### scale

`scale` is used to define how data maps to visual properties (such as color, size, shape, etc.).

| Property | Description                                                          | Type                                    | Default                              | Required |
| -------- | -------------------------------------------------------------------- | --------------------------------------- | ------------------------------------ | -------- |
| y        | Define the mapping rules from data fields to Y-axis visual positions | [scale](/en/manual/core/scale/overview) | `{domain: [0, percent ? 1 : total]}` |          |
| color    | Define the color mapping rules for gauge scales                      | [scale](/en/manual/core/scale/overview) | `{range: ['#30BF78', '#D0D0D0']}`    |          |

#### color

The color distribution is related to the data in data. Colors here can be set as gradients for configuring gradient gauge charts.

- With only `target` or `percent`, the `color` parameter `range` can consist of two color parameters. On the gauge scale, these two colors will divide the gauge scale into two segments

```js | ob { pin: false, inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'gauge',
  data: {
    value: {
      target: 120,
      total: 400,
      name: 'score',
    },
  },
  scale: {
    color: { range: ['#FAAD14', 'green'] },
  },
});

chart.render();
```

- When `thresholds` is set, the colors in the `color` parameter `range` should match the length of `thresholds`. The gauge scale will be segmented by the values in `thresholds` and filled with colors from the corresponding positions in the `scale` parameter `color`

```js | ob { pin: false, inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'gauge',
  data: {
    value: {
      target: 120,
      total: 400,
      name: 'score',
      thresholds: [100, 200, 400],
    },
  },
  scale: {
    color: { range: ['#F4664A', '#FAAD14', 'green'] },
  },
});

chart.render();
```

For more `scale` configuration, you can check the [scale](/en/manual/core/scale/overview) introduction page.

### style

`style` is used to set the appearance of chart elements, including fill colors, border styles, shadow effects, etc.

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*L2ajRK5KsBkAAAAAAAAAAAAAemJ7AQ/original" width=600/>

| Property | Description                               | Type                | Default                 | Required |
| -------- | ----------------------------------------- | ------------------- | ----------------------- | -------- |
| arc      | Configure the style of gauge arc          | [arc](#arc)         | See [arc](#arc)         |          |
| pin      | Configure the style of gauge pointer axis | [pin](#pin)         | See [pin](#pin)         |          |
| pointer  | Configure the style of gauge pointer      | [pointer](#pointer) | See [pointer](#pointer) |          |
| text     | Configure the style of gauge center text  | [text](#text)       | See [text](#text)       |          |

Composite graphic marks need to be distinguished by different prefixes to configure graphics.

#### arc

Configure gauge arc styles through the `arc` prefix.

| Property         | Description                        | Type                                                         | Default   | Required |
| ---------------- | ---------------------------------- | ------------------------------------------------------------ | --------- | -------- |
| arcShape         | Gauge arc shape                    | `'rect'` \|`'hollow'`\|`'round'`                             | `'rect'`  |          |
| arcFill          | Gauge arc fill color               | string \| (datum, index, data) => string                     | -         |          |
| arcFillOpacity   | Gauge arc fill opacity             | number \| (datum, index, data) => number                     | -         |          |
| arcStroke        | Gauge arc stroke color             | string \| (datum, index, data) => string                     | -         |          |
| arcStrokeOpacity | Gauge arc stroke opacity           | number \| (datum, index, data) => number                     | -         |          |
| arcLineHeight    | Gauge arc line height              | number \| (datum, index, data) => number                     | -         |          |
| arcLineWidth     | Gauge arc stroke width             | number \| (datum, index, data) => number                     | -         |          |
| arcLineDash      | Gauge arc dash configuration       | [number,number] \| (datum, index, data) => [number , number] | -         |          |
| arcOpacity       | Gauge arc overall opacity          | number \| (datum, index, data) => number                     | -         |          |
| arcShadowColor   | Gauge arc shadow color             | string \| (datum, index, data) => string                     | -         |          |
| arcShadowBlur    | Gauge arc shadow blur factor       | number \| (datum, index, data) => number                     | -         |          |
| arcShadowOffsetX | Gauge arc shadow horizontal offset | number \| (datum, index, data) => number                     | -         |          |
| arcShadowOffsetY | Gauge arc shadow vertical offset   | number \| (datum, index, data) => number                     | -         |          |
| arcCursor        | Gauge arc mouse cursor style       | string \| (datum, index, data) => string                     | `default` |          |

#### pin

Configure gauge pointer axis styles through the `pin` prefix.

| Property         | Description                                 | Type                                                         | Default   | Required |
| ---------------- | ------------------------------------------- | ------------------------------------------------------------ | --------- | -------- |
| pinR             | Gauge pointer axis radius size              | number \| (datum, index, data) => number                     | `10`      |          |
| pinFill          | Gauge pointer axis fill color               | string \| (datum, index, data) => string                     | `'#fff'`  |          |
| pinFillOpacity   | Gauge pointer axis fill opacity             | number \| (datum, index, data) => number                     | -         |          |
| pinStroke        | Gauge pointer axis stroke color             | string \| (datum, index, data) => string                     | -         |          |
| pinStrokeOpacity | Gauge pointer axis stroke opacity           | number \| (datum, index, data) => number                     | -         |          |
| pinLineHeight    | Gauge pointer axis line height              | number \| (datum, index, data) => number                     | -         |          |
| pinLineWidth     | Gauge pointer axis stroke width             | number \| (datum, index, data) => number                     | -         |          |
| pinLineDash      | Gauge pointer axis dash configuration       | [number,number] \| (datum, index, data) => [number , number] | -         |          |
| pinOpacity       | Gauge pointer axis overall opacity          | number \| (datum, index, data) => number                     | -         |          |
| pinShadowColor   | Gauge pointer axis shadow color             | string \| (datum, index, data) => string                     | -         |          |
| pinShadowBlur    | Gauge pointer axis shadow blur factor       | number \| (datum, index, data) => number                     | -         |          |
| pinShadowOffsetX | Gauge pointer axis shadow horizontal offset | number \| (datum, index, data) => number                     | -         |          |
| pinShadowOffsetY | Gauge pointer axis shadow vertical offset   | number \| (datum, index, data) => number                     | -         |          |
| pinCursor        | Gauge pointer axis mouse cursor style       | string \| (datum, index, data) => string                     | `default` |          |

#### pointer

Configure gauge pointer styles through the `pointer` prefix.

| Property             | Description                            | Type                                                             | Default   | Required |
| -------------------- | -------------------------------------- | ---------------------------------------------------------------- | --------- | -------- |
| pointerShape         | Gauge pointer shape                    | `'line'` \|`(points, value, coordinate, theme) => DisplayObject` | `'line'`  |          |
| pointerStroke        | Gauge pointer stroke color             | string \| (datum, index, data) => string                         | -         |          |
| pointerStrokeOpacity | Gauge pointer stroke opacity           | number \| (datum, index, data) => number                         | -         |          |
| pointerLineWidth     | Gauge pointer line width               | number \| (datum, index, data) => number                         | -         |          |
| pointerLineDash      | Gauge pointer dash configuration       | [number,number] \| (datum, index, data) => [number , number]     | -         |          |
| pointerOpacity       | Gauge pointer overall opacity          | number \| (datum, index, data) => number                         | -         |          |
| pointerShadowColor   | Gauge pointer shadow color             | string \| (datum, index, data) => string                         | -         |          |
| pointerShadowBlur    | Gauge pointer shadow blur factor       | number \| (datum, index, data) => number                         | -         |          |
| pointerShadowOffsetX | Gauge pointer shadow horizontal offset | number \| (datum, index, data) => number                         | -         |          |
| pointerShadowOffsetY | Gauge pointer shadow vertical offset   | number \| (datum, index, data) => number                         | -         |          |
| pointerCursor        | Gauge pointer mouse cursor style       | string \| (datum, index, data) => string                         | `default` |          |

#### text

Configure gauge indicator text styles through the `text` prefix.

| Property          | Description                                                                                | Type                                                         | Default   | Required |
| ----------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------ | --------- | -------- |
| textContent       | Set gauge center indicator text content                                                    | string                                                       | -         |          |
| textX             | Gauge center indicator text x-direction offset, can be set as specific value or percentage | number \| string                                             | `50%`     |          |
| textY             | Gauge center indicator text y-direction offset, can be set as specific value or percentage | number \| string                                             | `60%`     |          |
| textFontSize      | Gauge indicator text font size                                                             | number \| (datum, index, data) => number                     | `20`      |          |
| textFontFamily    | Gauge indicator text font family                                                           | string \| (datum, index, data) => string                     | -         |          |
| textFontWeight    | Gauge indicator text font weight                                                           | number \| (datum, index, data) => number                     | `800`     |          |
| textTextAlign     | Gauge indicator text alignment                                                             | `center` \| `end` \| `left` \| `right` \| `start`            | `center`  |          |
| textTextBaseline  | Gauge indicator text baseline alignment                                                    | `top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging`   | `middle`  |          |
| textFill          | Gauge indicator text color                                                                 | string \| (datum, index, data) => string                     | `#888`    |          |
| textFillOpacity   | Gauge indicator text opacity                                                               | number \| (datum, index, data) => number                     | -         |          |
| textStroke        | Gauge indicator text stroke color                                                          | string \| (datum, index, data) => string                     | -         |          |
| textStrokeOpacity | Gauge indicator text stroke opacity                                                        | number \| (datum, index, data) => number                     | -         |          |
| textLineHeight    | Gauge indicator text line height                                                           | number \| (datum, index, data) => number                     | -         |          |
| textLineWidth     | Gauge indicator text stroke width                                                          | number \| (datum, index, data) => number                     | -         |          |
| textLineDash      | Gauge indicator text dash configuration                                                    | [number,number] \| (datum, index, data) => [number , number] | -         |          |
| textOpacity       | Gauge indicator text overall opacity                                                       | number \| (datum, index, data) => number                     | -         |          |
| textShadowColor   | Gauge indicator text shadow color                                                          | string \| (datum, index, data) => string                     | -         |          |
| textShadowBlur    | Gauge indicator text shadow blur                                                           | number \| (datum, index, data) => number                     | -         |          |
| textShadowOffsetX | Gauge indicator text shadow horizontal offset                                              | number \| (datum, index, data) => number                     | -         |          |
| textShadowOffsetY | Gauge indicator text shadow vertical offset                                                | number \| (datum, index, data) => number                     | -         |          |
| textCursor        | Gauge indicator text mouse cursor style                                                    | string \| (datum, index, data) => string                     | `default` |          |

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'gauge',
  data: {
    value: {
      target: 159,
      total: 400,
      name: 'score',
      // thresholds: [200, 400],
    },
  },
  scale: {
    color: {
      range: ['l(0):0:#62CFF4 1:#2C67F2', 'l(0):0:#2C67F2 1:#00008B'],
    },
    y: {
      range: [1, -0.5],
    },
  },
  style: {
    // Configure gauge indicator text style
    textContent: (target, total) => `Ratio: ${(target / total) * 100}%`,
    textFill: '#000',
    textFontSize: 24,
    textfontWeight: 300,
    textX: '35%',
    textY: '75%',
    // Configure gauge pointer style
    pointerStroke: '#c5c5c5',
    pointershadowColor: '#333333',
    pointershadowBlur: 10,
    pointershadowOffsetX: 5,
    pointershadowOffsetY: 5,
    // Configure gauge pointer axis style
    pinStroke: '#d5d5d5',
    pinFill: '#d5d5d5',
    pinlinewidth: 6,
    pinshadowColor: '#333333',
    pinshadowBlur: 30,
    pinshadowOffsetX: 5,
    pinshadowOffsetY: 5,
    // Configure gauge arc style
    arcLineWidth: 2,
    arcStroke: '#fff',
    arcshadowColor: '#333333',
    arcshadowBlur: 30,
    arcshadowOffsetX: 5,
    arcshadowOffsetY: 5,
  },
  legend: false,
});

chart.render();
```

For more `style` configuration, you can check the [style](/en/manual/core/style) introduction page.

Try it out:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 350,
});

chart.options({
  type: 'gauge',
  data: {
    value: { target: 159, total: 400, name: 'score', thresholds: [200, 400] },
  },
  scale: {
    color: { range: ['l(0):0:#37b38e 1:#D9C652', 'l(0):0:#D9C652 1:#f96e3e'] },
  },
  style: {
    textContent: (target, total) => `得分：${target}
占比：${(target / total) * 100}%`,
  },
  legend: false,
});

chart.render();
```

## Examples

### Custom Gauge Pointer Shape

```js | ob { inject: true }
import { Chart } from '@antv/g2';
import { Path } from '@antv/g';

const chart = new Chart({ container: 'container' });

function getOrigin(points) {
  if (points.length === 1) return points[0];
  const [[x0, y0, z0 = 0], [x2, y2, z2 = 0]] = points;
  return [(x0 + x2) / 2, (y0 + y2) / 2, (z0 + z2) / 2];
}
// 自定义指针形状
const customShape = (style) => {
  return (points, value, coordinate, theme) => {
    // 获取几何点中心坐标
    const [x, y] = getOrigin(points);
    const [cx, cy] = coordinate.getCenter();
    // 计算指针方向角度
    const angle = Math.atan2(y - cy, x - cx);
    const length = 100; // 指针长度
    const width = 8; // 指针底部宽度
    // 构造指针三角形路径
    return new Path({
      style: {
        d: [
          ['M', cx + Math.cos(angle) * length, cy + Math.sin(angle) * length], // 顶点
          [
            'L',
            cx + Math.cos(angle + Math.PI / 2) * width,
            cy + Math.sin(angle + Math.PI / 2) * width,
          ], // 底部左点
          [
            'L',
            cx + Math.cos(angle - Math.PI / 2) * width,
            cy + Math.sin(angle - Math.PI / 2) * width,
          ], // 底部右点
          ['Z'], // 闭合路径
        ],
        fill: '#30BF78', // 填充色
      },
    });
  };
};

chart.options({
  type: 'gauge',
  data: {
    value: {
      target: 159,
      total: 424,
      name: 'score',
    },
  },
  style: {
    pointerShape: customShape,
    pinShape: false,
    textContent: (target, total) => {
      return `得分：${target}\n占比：${(target / total) * 100}%`;
    },
  },
});

chart.render();
```
