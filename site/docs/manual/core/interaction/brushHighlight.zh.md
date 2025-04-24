---
title: brushHighlight
order: 4
---

## 概述

`brushHighlight` 交互的对象是图表元素 element ，将框选的区域的图表元素高亮显示，支持对框选区域的拖动和 resize。

- 触发：框选元素。

- 结束：单击图表区域。

- 影响状态：

框选范围的元素变为 `active` 状态。

框选范围以外的元素变为 `inactive` 状态。

交互内置状态：

```js
({
  // 定义 inactive 状态下的元素透明度为0.5
  state: { inactive: { opacity: 0.5 } },
});
```

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*wICbS6qdoJMAAAAAAAAAAAAADmJ7AQ/original" width="640">

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'point',
  autoFit: true,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
  },
  encode: { x: 'height', y: 'weight', color: 'gender' },
  state: { inactive: { stroke: 'gray' } },
  interaction: { brushHighlight: true },
});

chart.render();
```

## 使用方式

配置 `brushHighlight` 交互有两种方式

第一种，传入 `boolean` 设置是否开启交互。

```js
({
  type: 'interval',
  interaction: { brushHighlight: true }, // 采用默认配置
});
```

第二种，传入 [配置项](#配置项) 对交互进行配置。

```js
({
  type: 'line',
  interaction: {
    brushHighlight: {
      series: true,
    },
  },
});
```

## 配置层级

交互可以配置在 Mark 层级：

```ts
({
  type: 'interval',
  interaction: { brushHighlight: true },
});
```

也可以配置在 View 层级，视图上声明的交互会传递给 `children` 声明的标记，如果该标记有声明对应的交互，就合并；否则不影响。

```ts
({
  type: 'view',
  interaction: { brushHighlight: true },
});
```

## 配置项

| 属性            | 描述                   | 类型                          | 默认值                                                                                          | 必选 |
| --------------- | ---------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------- | ---- |
| reverse         | brush 是否反转         | boolean                       | false                                                                                           |      |
| series          | brush 作用的是否是系列元素，控制高亮选择元素的模式         | boolean                       | false                                                                                           |      |
| facet           | brush 是否跨分面，控制交互方式             | boolean                       | false                                                                                           |      |
| selectedHandles | 可以 resize 的手柄方向 | string[]                      | `['handle-n','handle-e','handle-s','handle-w','handle-nw','handle-ne','handle-se','handle-sw']` |      |
| brushRegion     | 自定义框选区域，一般不用配置，G2 内部用来配置 brushXHighlight 和 brushYHighlight               | (x, y, x1, y1, extent) => any | `(x, y, x1, y1) => [x, y, x1, y1]`                                                              |      |
| mask            | 框选区域的蒙版样式     | [mask](#mask)                 | 详见 [mask](#mask)                                                                              |      |
| maskHandle      | 框选区域的手柄样式     | [maskHandle](#maskhandle)     | 详见 [maskHandle](#maskhandle)                                                                  |      |

### series

`series` 参数是一个控制刷选高亮模式的关键开关，它决定了如何对图形元素进行视觉反馈。当配置 `series: false`时，更适合散点图、柱状图等离散元素，此时直接修改元素状态（如果是折线图这种连续图形，会改变整条线的状态）；当配置`series: true`时，折线图、面积图等连续图形会局部路径高亮，请根据需要开启或关闭。

- `series: false`

```js | ob { pin: false }
(() => {
  const chart = new G2.Chart();
  const config = {
    type: 'line',
    interaction: { brushHighlight: { series: false } },
    data: [
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 7 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 },
    ],
    encode: { x: 'year', y: 'value' },
    scale: { x: { range: [0, 1] }, y: { domainMin: 0, nice: true } },
    state: { active: { stroke: 'red' } },
    labels: [{ text: 'value', style: { dx: -10, dy: -12 } }],
  };
  chart.options(config);

  chart.render();

  return chart.getContainer();
})();
```

- `series: true`

```js | ob { pin: false }
(() => {
  const chart = new G2.Chart();
  const config = {
    type: 'line',
    interaction: { brushHighlight: { series: true } },
    data: [
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 7 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 },
    ],
    encode: { x: 'year', y: 'value' },
    scale: { x: { range: [0, 1] }, y: { domainMin: 0, nice: true } },
    state: { active: { stroke: 'red' } },
    labels: [{ text: 'value', style: { dx: -10, dy: -12 } }],
  };
  chart.options(config);

  chart.render();

  return chart.getContainer();
})();
```

### mask

配置框选区域的蒙版的样式。

| 属性              | 描述                                                                                                         | 类型            | 默认值    | 必选 |
| ----------------- | ------------------------------------------------------------------------------------------------------------ | --------------- | --------- | ---- |
| maskFill          | 蒙版的填充色                                                                                                 | string          | `#777`    |      |
| maskFillOpacity   | 蒙版的填充透明度                                                                                             | number          | 0.3       |      |
| maskStroke        | 蒙版的描边                                                                                                   | string          | `#fff`    |      |
| maskStrokeOpacity | 描边透明度                                                                                                   | number          |           |      |
| maskLineWidth     | 蒙版描边的宽度                                                                                               | number          |           |      |
| maskLineDash      | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 | [number,number] |           |      |
| maskOpacity       | 蒙版的整体透明度                                                                                             | number          |           |      |
| maskShadowColor   | 蒙版阴影颜色                                                                                                 | string          |           |      |
| maskShadowBlur    | 蒙版阴影的高斯模糊系数                                                                                       | number          |           |      |
| maskShadowOffsetX | 设置阴影距蒙版的水平距离                                                                                     | number          |           |      |
| maskShadowOffsetY | 设置阴影距蒙版的垂直距离                                                                                     | number          |           |      |
| maskCursor        | 鼠标样式。同 css 的鼠标样式                                                                                  | string          | `default` |      |

在配置框选区域的蒙版样式的时候，不是以对象的形式来配置，而是以 `mask`前缀加属性的方式来配置。

```js
({
  interaction: {
    brushHighlight: {
      maskFill: '#000',
      maskFillOpacity: 0.2,
      maskStroke: 'red',
      maskStrokeOpacity: 0.9,
      maskLineWidth: 2,
      maskLineDash: [4, 8],
      maskOpacity: 0.2,
      maskShadowColor: '#d3d3d3',
      maskShadowBlur: 10,
      maskShadowOffsetX: 10,
      maskShadowOffsetY: 10,
      maskCursor: 'pointer',
    },
  },
});
```

### maskHandle

八个方向的 handle 的名字分别如下（按照东南西北命名），按照 `mask[handleName][styleAttribute]` 格式设置对应的属性，也可以通过 `maskHandleSize` 设置宽度。

<img src="https://github.com/antvis/G2/assets/49330279/eb2d3951-7990-423c-97f3-e3a38b2baf68" width=640 alt="custom-style"/>

| 属性                          | 描述                                                                                                         | 类型                                    | 默认值    | 必选 |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------- | --------- | ---- |
| mask[handleName]Render        | 自定义蒙版手柄的渲染函数                                                                                     | (g, options, document) => DisplayObject |           |      |
| mask[handleName]Size          | 蒙版手柄的宽度                                                                                               | string                                  |           |      |
| mask[handleName]Fill          | 蒙版手柄的填充色                                                                                             | string                                  |           |      |
| mask[handleName]FillOpacity   | 蒙版手柄的填充透明度                                                                                         | number                                  |           |      |
| mask[handleName]Stroke        | 蒙版手柄的描边                                                                                               | string                                  |           |      |
| mask[handleName]StrokeOpacity | 描边透明度                                                                                                   | number                                  |           |      |
| mask[handleName]LineWidth     | 蒙版手柄描边的宽度                                                                                           | number                                  |           |      |
| mask[handleName]LineDash      | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 | [number,number]                         |           |      |
| mask[handleName]Opacity       | 蒙版手柄的整体透明度                                                                                         | number                                  |           |      |
| mask[handleName]ShadowColor   | 蒙版手柄阴影颜色                                                                                             | string                                  |           |      |
| mask[handleName]ShadowBlur    | 蒙版手柄阴影的高斯模糊系数                                                                                   | number                                  |           |      |
| mask[handleName]ShadowOffsetX | 设置阴影距蒙版手柄的水平距离                                                                                 | number                                  |           |      |
| mask[handleName]ShadowOffsetY | 设置阴影距蒙版手柄的垂直距离                                                                                 | number                                  |           |      |
| mask[handleName]Cursor        | 鼠标样式。同 css 的鼠标样式                                                                                  | string                                  | `default` |      |

```js
chart.options({
  type: 'point',
  data: {
    type: 'fetch',
    value: 'data/penguins.csv',
  },
  encode: {
    color: 'species',
    x: 'culmen_length_mm',
    y: 'culmen_depth_mm',
  },
  state: {
    inactive: { stroke: 'gray', opacity: 0.5 },
  },
  interaction: {
    brushHighlight: {
      maskHandleNFill: 'blue',
      maskHandleEFill: 'red',
      maskHandleSFill: 'green',
      maskHandleWFill: 'yellow',
      maskHandleNWFill: 'black',
      maskHandleNEFill: 'steelblue',
      maskHandleSEFill: 'pink',
      maskHandleSWFill: 'orange',
    },
  },
});
```

## 事件

### 监听事件

支持以下的事件：

- `brush:start` - 开始创建 brush 的时候触发
- `brush:end` - brush 更新大小和位置完成时候触发
- `brush:remove` - brush 移除的时候触发
- `brush:highlight` - brush 改变大小和位置时触发

```js
chart.on('brush:highlight', (e) => {
  console.log(e.data.selection);
  console.log(e.nativeEvent);
});
```

### 触发交互

支持以下的事件：

- `brush:highlight` - 高亮数据
- `brush:remove` - 移除 brush

```js
chart.emit('brush:remove');
chart.emit('brush:highlight', { data: { selection } });
```

## 示例

### 自定义 Handle

可以通过 `mask[handleName]Render` 指定 handle 的渲染函数，用于渲染自定义的 handle。其中该函数签名如下。

```js
function render(
  g, // 挂载容器
  options, // 样式属性，通过 mask[handleName][styleAttribute] 设置
  document, // 画布 document，用于创建自图形
) {
  // 需要返回创建的图形
}
```

下面是一个创建 path handle 的例子：

```js
function renderPath(group, options, document) {
  // 创建逻辑
  // 如果是第一次渲染，就创建并且挂在图形
  if (!group.handle) {
    // 通过 document.createElement 去新建图形
    const path = document.createElement('path');
    group.handle = path;
    group.appendChild(group.handle);
  }

  // 更新逻辑
  const { handle } = group;
  const { width, height, ...rest } = options;
  if (width === undefined || height === undefined) return handle;
  handle.attr(rest);

  // 返回对应的 value
  return handle;
}
```

<img src="https://github.com/antvis/G2/assets/49330279/d586fabe-4c34-4dfb-bffa-ef1a354b1333" width=640 alt="custom-brush"/>

```js
function createPathRender(path) {
  return (group, options, document) => {
    if (!group.handle) {
      const path = document.createElement('path');
      group.handle = path;
      group.appendChild(group.handle);
    }
    const { handle } = group;
    const { x, y, width, height, ...rest } = options;
    if (width === undefined || height === undefined) return handle;
    handle.style.d = path(x, y, width, height);
    handle.attr(rest);
    return handle;
  };
}

chart.options({
  type: 'point',
  data: {
    type: 'fetch',
    value: 'data/penguins.csv',
  },
  encode: {
    color: 'species',
    x: 'culmen_length_mm',
    y: 'culmen_depth_mm',
  },
  state: {
    inactive: { stroke: 'gray', opacity: 0.5 },
  },
  interaction: {
    brushHighlight: {
      maskHandleSize: 30,
      maskHandleNRender: createPathRender((x, y, width, height) => {
        return `M${x},${y + height / 2}L${x + width / 2},${y - height / 2}L${
          x + width
        },${y + height / 2},Z`;
      }),
      maskHandleERender: createPathRender(
        (x, y, width, height) =>
          `M${x + width / 2},${y}L${x + (width * 3) / 2},${y + height / 2}L${
            x + width / 2
          },${y + height},Z`,
      ),
      maskHandleSRender: createPathRender(
        (x, y, width, height) =>
          `M${x},${y + height / 2}L${x + width / 2},${y + (height / 2) * 3}L${
            x + width
          },${y + height / 2},Z`,
      ),
      maskHandleWRender: createPathRender(
        (x, y, width, height) =>
          `M${x + width / 2},${y}L${x - width},${y + height / 2}L${
            x + width / 2
          },${y + height},Z`,
      ),
      maskHandleNWRender: createPathRender(
        (x, y, width, height) =>
          `M${x},${y}L${x + width},${y + height / 2}L${x + width / 2},${
            y + height
          },Z`,
      ),
      maskHandleNERender: createPathRender(
        (x, y, width, height) =>
          `M${x},${y + height / 2}L${x + width},${y}L${x + width / 2},${
            y + height
          },Z`,
      ),
      maskHandleSERender: createPathRender(
        (x, y, width, height) =>
          `M${x + width / 2},${y}L${x + width},${y + height}L${x},${
            y + height / 2
          },Z`,
      ),
      maskHandleSWRender: createPathRender(
        (x, y, width, height) =>
          `M${x + width / 2},${y}L${x + width},${y + height / 2}L${x},${
            y + height
          },Z`,
      ),
      maskHandleNFill: 'blue',
      maskHandleEFill: 'red',
      maskHandleSFill: 'green',
      maskHandleWFill: 'yellow',
      maskHandleNWFill: 'black',
      maskHandleNEFill: 'steelblue',
      maskHandleSEFill: 'pink',
      maskHandleSWFill: 'orange',
    },
  },
});
```

### 自定义交互状态

有些交互会改变元素状态，我们可以通过配置元素状态的表现来改变交互的效果。

```js | ob
(() => {
  const chart = new G2.Chart();
  chart.options({
    type: 'view',
    autoFit: true,
    interaction: { brushHighlight: { series: true } },
    data: [
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 7 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 },
    ],
    encode: { x: 'year', y: 'value' },
    scale: { x: { range: [0, 1] }, y: { domainMin: 0, nice: true } },
    children: [
      {
        type: 'line',
        labels: [{ text: 'value', style: { dx: -10, dy: -12 } }],
        state: {
          active: {
            lineWidth: 4,
            lineDash: [0, 0],
          },
          inactive: {
            lineDash: [2, 4],
          },
        },
      },
      {
        type: 'point',
        style: { fill: 'white' },
        tooltip: false,
        state: {
          active: {
            fill: 'yellow',
          },
        },
      },
    ],
  });

  chart.render();

  return chart.getContainer();
})();
```
