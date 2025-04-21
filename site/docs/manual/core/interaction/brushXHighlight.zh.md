---
title: brushXHighlight
order: 5
---

## 概述

`brushXHighlight` 是一种特殊的`brushHighlight` 交互。在保留基础高亮功能的同时，将 y 轴框选范围固定为全域（从最小值到最大值），专注于 x 轴方向的数据选区操作。适用于需要横向数据对比的场景（如时间序列分析），通过消除垂直方向干扰提升操作精度。

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

<img alt="example" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*liG4Rq7bzmwAAAAAAAAAAAAADmJ7AQ/original" width="640">

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
  interaction: { brushXHighlight: true },
});

chart.render();
```

## 使用方式

配置 `brushXHighlight` 交互有两种方式

第一种，传入 `boolean` 设置是否开启交互。

```js
({
  type: 'interval',
  interaction: { brushXHighlight: true },
});
```

第二种，传入 [配置项](#配置项) 对交互进行配置。

```js
({
  type: 'line',
  interaction: {
    brushXHighlight: {
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
  interaction: { brushXHighlight: true },
});
```

也可以配置在 View 层级，视图上声明的交互会传递给 `children` 声明的标记，如果该标记有声明对应的交互，就合并；否则不影响。

```ts
({
  type: 'view',
  interaction: { brushXHighlight: true },
});
```

## 配置项

| 属性            | 描述                   | 类型                          | 默认值                                                           | 必选 |
| --------------- | ---------------------- | ----------------------------- | ---------------------------------------------------------------- | ---- |
| reverse         | brush 是否反转         | boolean                       | false                                                            |      |
| series          | 是否是系列元素         | boolean                       | false                                                            |      |
| facet           | 是否跨分面             | boolean                       | false                                                            |      |
| selectedHandles | 可以 resize 的手柄方向 | string[]                      | `['handle-e', 'handle-w']`                                       |      |
| brushRegion     | 框选区域               | (x, y, x1, y1, extent) => any | `(x, y, x1, y1,[minX, minY, maxX, maxY]) => [x, minY, x1, maxY]` |      |
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
    brushXHighlight: {
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

### 多视图图表联动

```js | ob
(() => {
  const container = document.createElement('div');
  const focusContainer = document.createElement('div');
  const contextContainer = document.createElement('div');
  container.append(focusContainer);
  container.append(contextContainer);

  function createPathRender(compute) {
  return (group, options, document) => {
    if (!group.handle) {
      const path = document.createElement('path');
      group.handle = path;
      group.appendChild(group.handle);
    }
    const { handle } = group;
    const { x, y, width, height, ...rest } = options;
    if (width === undefined || height === undefined) return handle;
    handle.attr({ ...compute(x, y, width, height), ...rest });
    return handle;
  };
}

  // 渲染 focus 视图
  const focus = new G2.Chart({
    container: focusContainer,
    height: 360,
    paddingLeft: 50,
  });

  focus
    .area()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
    })
    .encode('x', 'date')
    .encode('y', 'close')
    .animate(false)
    .axis('x', { grid: false, title: false, tickCount: 5 })
    .axis('y', { grid: false, tickCount: 5 })
    .interaction('tooltip', false)
    .interaction('brushXFilter', true);

  focus.render();

  // 渲染 context 视图
  const context = new G2.Chart({
    container: contextContainer,
    paddingLeft: 50,
    paddingTop: 0,
    paddingBottom: 0,
    height: 60,
  });

  context
    .area()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
    })
    .encode('x', 'date')
    .encode('y', 'close')
    .animate(false)
    .axis(false)
    .interaction('tooltip', false)
    .interaction('brushXHighlight', {
      series: true,
      maskOpacity: 0.3,
      maskFill: '#777',
      maskHandleWRender: createPathRender((x, y, width, height) => ({
        d: 'M-0.5,31.5c-2.5,0,-4.5,2,-4.5,4.5v30c0,2.5,2,4.5,4.5,4.5V31.5z',
        transform: `translate(${x + width / 2}, ${y - height / 2})`,
      })),
      maskHandleERender: createPathRender((x, y, width, height) => ({
        d: 'M0.5,31.5c2.5,0,4.5,2,4.5,4.5v30c0,2.5,-2,4.5,-4.5,4.5V31.5z',
        transform: `translate(${x + width / 2}, ${y - height / 2})`,
      })),
      maskHandleEFill: '#D3D8E0',
      maskHandleWFill: '#D3D8E0',
    });

  context.render();

  // 添加事件监听器在不同图表之间交流
  focus.on('brush:filter', (e) => {
    const { nativeEvent } = e;
    if (!nativeEvent) return;
    const { selection } = e.data;
    const { x: scaleX } = focus.getScale();
    const [[x1, x2]] = selection;
    const domainX = scaleX.getOptions().domain;
    if (x1 === domainX[0] && x2 === domainX[1]) {
      context.emit('brush:remove', {});
    } else {
      context.emit('brush:highlight', { data: { selection } });
    }
  });

  context.on('brush:highlight', (e) => {
    const { nativeEvent, data } = e;
    if (!nativeEvent) return;
    const { selection } = data;
    focus.emit('brush:filter', { data: { selection } });
  });

  context.on('brush:remove', (e) => {
    const { nativeEvent } = e;
    if (!nativeEvent) return;
    const { x: scaleX, y: scaleY } = context.getScale();
    const selection = [scaleX.getOptions().domain, scaleY.getOptions().domain];
    focus.emit('brush:filter', { data: { selection } });
  });

  return container;
})();
```
