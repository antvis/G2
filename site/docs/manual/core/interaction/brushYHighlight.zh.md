---
title: brushYHighlight
order: 6
---

## 概述

`brushYHighlight` 是一种特殊的`brushHighlight` 交互。在保留基础高亮功能的同时，将 x 轴框选范围固定为全域（从最小值到最大值），专注于 y 轴方向的数据选区操作。纵向对比分析（如金融产品的收益率对比、实验数据的垂直分布研究），通过消除水平方向干扰提升操作精度。

- 触发：框选元素。

- 结束：单击图表区域。

- 影响状态：

框选范围的元素变为 `active` 状态。

框选范围以外的元素变为 `inactive` 状态。

交互内置状态：

```js
({
  inactive: { opacity: 0.5 },
});
```

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*haMlRIKA7GcAAAAAAAAAAAAADmJ7AQ/original" width="640">

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

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
  interaction: { brushYHighlight: true },
});

chart.render();
```

## 使用方式

配置 `brushYHighlight` 交互有两种方式

第一种，传入 `boolean` 设置是否开启交互。

```js
({
  type: 'interval',
  interaction: { brushYHighlight: true },
});
```

第二种，传入 [配置项](#配置项) 对交互进行配置。

```js
({
  type: 'line',
  interaction: {
    brushYHighlight: {
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
  interaction: { brushYHighlight: true },
});
```

也可以配置在 View 层级，视图上声明的交互会传递给 `children` 声明的标记，如果该标记有声明对应的交互，就合并；否则不影响。

```ts
({
  type: 'view',
  interaction: { brushYHighlight: true },
});
```

## 配置项

| 属性            | 描述                   | 类型                          | 默认值                                                           | 必选 |
| --------------- | ---------------------- | ----------------------------- | ---------------------------------------------------------------- | ---- |
| reverse         | brush 是否反转         | boolean                       | false                                                            |      |
| series          | 是否是系列元素         | boolean                       | false                                                            |      |
| facet           | 是否跨分面             | boolean                       | false                                                            |      |
| selectedHandles | 可以 resize 的手柄方向 | string[]                      | `['handle-n', 'handle-s']`                                       |      |
| brushRegion     | 框选区域               | (x, y, x1, y1, extent) => any | `(x, y, x1, y1,[minX, minY, maxX, maxY]) => [minX, y, maxX, y1]` |      |
| mask            | 框选区域的蒙版样式     | [mask](#mask)                 | 详见 [mask](#mask)                                               |      |
| maskHandle      | 框选区域的手柄样式     | [maskHandle](#maskhandle)     | 详见 [maskHandle](#maskhandle)                                   |      |

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
    brushYHighlight: {
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
