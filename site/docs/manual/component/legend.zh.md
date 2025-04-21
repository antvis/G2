---
title: 图例（Legend）
order: 7.2
---

## 概述

G2 中 **图例（Legend）** 是图表的辅助元素，使用颜色、大小、形状区分不同的数据类型，用于图表中数据的筛选。可以理解为是非空间通道（ `color`，`opacity`，`size`，`shape`）对应比例尺的可视化，G2 会根据设置图形属性映射以及数据的类型自动生成不同的图例，当一个变量对应了多个图形属性时，G2 会对图例进行合并，以达到精简的目的。

`color`，`opacity`，`size`，`shape` 这四个非空间通道如果判断接收的参数是数据源的字段时，会自动生成不同的图例：

| 视觉通道 | 解释                     |
| -------- | ------------------------ |
| color    | 根据不同的颜色生成图例   |
| opacity  | 根据不同的透明度生成图例 |
| size     | 根据不同的大小生成图例   |
| shape    | 根据不同的形状生成图例   |

### 构成元素

<img alt="legend-overview" width=900 src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*lGLWS4QUPscAAAAAAAAAAAAAemJ7AQ/original"/>

### 使用方式

配置图例有两种方式

第一种，传入 `boolean` 设置是否显示图例。

```js
({
  type: 'interval',
  legend: false; // 隐藏所有图例
})
```

```js
({
  type: 'interval',
  legend: {color: false}; // 隐藏 color 通道的图例
})
```

第二种，传入 _legendOption_ 对图例进行整体配置。

```js
({
  type: 'interval',
  legend: {
    color: {},
    size: {},
  },
});
```

### 配置层级

图例可以在 Mark 层级配置。在 G2 中，每个标记（Mark）都有自己的图例。如果标记对应的比例尺是同步的，那么图例也会合并。

```js
({
  type: 'interval',
  legend: {
    color: {},
    size: {},
  },
});
```

图例也可以在 View 层级配置。图例具有传递性。视图上声明的图例会传递给 `children` 声明的标记，如果该标记有对应通道的图例，就合并；否则不影响。

```js
({
  type: 'view',
  legend: {
    color: {},
    size: {},
  },
});
```

## 配置项

G2 中图例分为 **连续图例** 和 **分类图例** 两种，由于这两种图例的结构不同，所以配置项也存在差异。

有的配置项作用范围区分分类图例和连续图例：
<Badge type="success">分类图例</Badge>
<Badge type="warning">连续图例</Badge>

| 属性                                                  | 描述                                             | 类型                                                               | 默认值                                | 必选 |
| ----------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------- | ---- |
| orientation                                           | 图例朝向，对于分类图例来说即滚动方向             | `horizontal` \| `vertical`                                         | `horizontal`                          |      |
| position                                              | 图例的位置                                       | `top` \| `right` \| `left` \| `bottom`                             | `top`                                 |      |
| layout                                                | 调整图例的 flex 布局方式                         | [layout](#layout)                                                  | 详见[layout](#layout)                 |
| size                                                  | 图例的尺寸                                       | number                                                             | -                                     |
| width                                                 | 图例的宽度                                       | number                                                             | -                                     |
| crossPadding                                          | 图例到图表区域的距离                             | number                                                             | `12`                                  |
| order                                                 | 图例在布局的时候的排序                           | number                                                             | `1`                                   |
| title                                                 | 配置图例的标题                                   | [title](#title)                                                    | 详见[title](#title)                   |
| cols <Badge type="success">分类图例</Badge>           | 指定每行显示的图例项数量，为空时表示列数不受限制 | number                                                             | -                                     |
| colPadding <Badge type="success">分类图例</Badge>     | 指定图例项之间的横向间隔                         | number                                                             | `12`                                  |
| rowPadding <Badge type="success">分类图例</Badge>     | 指定图例项之间的纵向间隔                         | number                                                             | `8`                                   |
| maxRows <Badge type="success">分类图例</Badge>        | 指定图例最大行数                                 | number                                                             | `3`                                   |
| maxCols <Badge type="success">分类图例</Badge>        | 指定图例最大列数                                 | number                                                             | `3`                                   |
| itemMarker <Badge type="success">分类图例</Badge>     | 配置图例项的图标                                 | [itemMarker](#itemmarker)                                          | 详见[itemMarker](#itemmarker)         |
| itemLabel <Badge type="success">分类图例</Badge>      | 配置图例项的标签文字                             | [itemLabel](#itemlabel)                                            | 详见[itemLabel](#itemlabel)           |
| itemValue <Badge type="success">分类图例</Badge>      | 配置图例项的值                                   | [itemValue](#itemvalue)                                            | 详见[itemValue](#itemvalue)           |
| itemBackground <Badge type="success">分类图例</Badge> | 配置图例项的背景                                 | [itemBackground](#itembackground)                                  | 详见[itemBackground](#itembackground) |
| itemWidth <Badge type="success">分类图例</Badge>      | 配置图例项的宽度                                 | number                                                             | -                                     |
| itemSpan <Badge type="success">分类图例</Badge>       | 配置图例项图标、标签和值的空间划分               | number \| number[]                                                 | `[1, 1, 1]`                           |
| itemSpacing <Badge type="success">分类图例</Badge>    | 配置图例项图标、标签和值之间的间距               | number \| number[]                                                 | `[8, 8]`                              |
| nav <Badge type="success">分类图例</Badge>            | 配置图例的分页器                                 | [nav](#nav)                                                        | 详见[nav](#nav)                       |
| color <Badge type="warning">连续图例</Badge>          | 配置连续图例的色带颜色                           | string[] \| [d3-interpolate](https://github.com/d3/d3-interpolate) | -                                     |
| block <Badge type="warning">连续图例</Badge>          | 连续图例是否按区间显示                           | boolean                                                            | false                                 |
| type <Badge type="warning">连续图例</Badge>           | 配置连续图例的类型                               | `size` \|`color`                                                   | `color`                               |
| ribbon <Badge type="warning">连续图例</Badge>         | 配置连续图例的色带                               | [ribbon](#ribbon)                                                  | 详见[ribbon](#ribbon)                 |
| handle <Badge type="warning">连续图例</Badge>         | 配置连续图例的滑动手柄                           | [handle](#handle)                                                  | 详见[handle](#handle)                 |
| label <Badge type="warning">连续图例</Badge>          | 配置连续图例的标签/刻度值                        | [label](#label)                                                    | 详见[label](#label)                   |
| indicator <Badge type="warning">连续图例</Badge>      | 配置连续图例的指示器                             | [indicator](#indicator)                                            | 详见[indicator](#indicator)           |

### orientation

<description>**optional** _horizontal | vertical_ </description>

图例朝向，对于分类图例来说即滚动方向。默认为 `horizontal`。

### position

<description> **optional** _"top" | "right" | "left" | "bottom"_ </description>

图例的位置。默认为 `top`。

```js | ob { pin: false }
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
      { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
      { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
      { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
      { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
      { name: 'London', 月份: 'May', 月均降雨量: 47 },
      { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
      { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
      { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
      { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
      { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
      { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
      { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
      { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
      { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
      { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
      { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
    ],
    encode: { x: '月份', y: '月均降雨量', color: 'name' },
    transform: [{ type: 'dodgeX' }],
  });

  const handleSetPosition = (position) => {
    chart.legend({
      color: {
        position,
      },
    });
    chart.render(); // 重新渲染图表
  };

  // 插入Position 选择器
  const selectorContainer = document.createElement('div');
  selectorContainer.textContent = '选择图例位置 ';
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

Legend 组件支持调整其在画布中的位置，通过 `layout` 属性来设置。
目前支持基本的 Flex 布局方式，支持的属性包括: `justifyContent`, `alignItems`, `flexDirection`。_LegendLayoutCfg_ 配置如下：

| 属性           | 描述         | 类型                                   | 默认值                                                      | 必选 |
| -------------- | ------------ | -------------------------------------- | ----------------------------------------------------------- | ---- |
| justifyContent | 主轴对齐方式 | `flex-start` \| `flex-end` \| `center` | `flex-start`                                                |      |
| alignItems     | 交叉轴对齐   | `flex-start` \| `flex-end` \| `center` | `flex-start`                                                |      |
| flexDirection  | 主轴方向     | `row` \| `column`                      | position 为`top`和`bottom`的时候为`row`，其他时候为`column` |      |

通过配置图例的 `position` 和 `layout` ，我们可以很灵活地改变图例的位置。

```js
// 配置一个右侧垂直居中的图例

// 第一步，配置position为right

// 第二步，position为right的时候主轴方向flexDirection默认为column

// 第三步，要实现垂直居中，需要在column方向上对齐方式为center，因为column此时为主轴，所以配置justifyContent为center
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

尝试一下：

<Playground path="component/legend/demo/position.ts" rid="legend-position"></playground>

### size

<description> _number_ **optional** </description>

Legend 组件的尺寸。影响组件在交叉轴上的大小，例如水平位置的图例，影响整体高度。手动配置会导致 G2 内部计算逻辑失效，需要自己配置 margin、padding、inset 等大小，详见[图表布局](/manual/core/chart/chart-component#图表布局)。除非需要定制化的场景，否则不建议配置。

### width

<description> _number_ **optional** </description>

Legend 组件的宽度。

### crossPadding

<description> _number_ **optional** </description>

Legend 组件和图表的距离。默认为 `12`。

### order

<description> _number_ **optional** </description>

Legend 组件在布局的时候的排序。默认为 `1`。G2 内部的组件都有默认的排序大小，值越小越靠近图表区域，例如 Title 组件的默认排序是 `2`，就比默认排序为 `1` 的 Legend 组件更远离图表区域。

### title

<description> _LegendTitleCfg_ **optional** </description>

图例标题配置项。_LegendTitleCfg_ 配置如下：

| 属性               | 描述                                                                                                                 | 类型                                                                                                       | 默认值                            | 必选 |
| ------------------ | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------- | ---- |
| title              | 关闭标题或设置标题内容                                                                                               | false \| string                                                                                            | 连续图例为 true，分类图例为 false |      |
| titleSpacing       | 标题到内容区域的间距                                                                                                 | number \| number[]                                                                                         | `4`                               |      |
| titleInset         | 标题文本内边距                                                                                                       | number \| number[]                                                                                         | `0`                               |      |
| titlePosition      | 标题所处位置。可采用简写形式，如`i` 表示`inner`，如`lt` 表示`left-top`                                               | `top` \| `bottom` \|`left` \|`right` \|`left-top` \|`left-bottom` \|`right-top` \|`right-bottom` \|`inner` | -                                 |      |
| titleFontSize      | 标题文字大小                                                                                                         | number \| (datum, index, data) => number                                                                   | `12`                              |      |
| titleFontFamily    | 标题文字字体                                                                                                         | string \| (datum, index, data) => string                                                                   | -                                 |      |
| titleFontWeight    | 标题字体粗细                                                                                                         | number \| (datum, index, data) => number                                                                   | `normal`                          |      |
| titleLineHeight    | 标题文字的行高                                                                                                       | number \| (datum, index, data) => number                                                                   | -                                 |      |
| titleTextAlign     | 设置标题文本内容的当前对齐方式                                                                                       | `center` \| `end` \| `left` \| `right` \| `start`                                                          | `start`                           |      |
| titleTextBaseline  | 设置在绘制标题文本时使用的当前文本基线                                                                               | `top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging`                                                 | `bottom`                          |      |
| titleFill          | 标题字体颜色                                                                                                         | string \| (datum, index, data) => string                                                                   | `#1D2129`                         |      |
| titleFillOpacity   | 标题字体颜色透明度                                                                                                   | number \| (datum, index, data) => number                                                                   | `0.65`                            |      |
| titleStroke        | 标题字体描边颜色                                                                                                     | string \| (datum, index, data) => string                                                                   | -                                 |      |
| titleStrokeOpacity | 标题字体描边颜色透明度                                                                                               | number \| (datum, index, data) => number                                                                   | -                                 |      |
| titleLineWidth     | 标题字体描边的宽度                                                                                                   | number \| (datum, index, data) => number                                                                   | -                                 |      |
| titleLineDash      | 标题字体描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 | [number,number] \| (datum, index, data) => [number , number]                                               | -                                 |      |
| titleOpacity       | 标题文字的整体透明度                                                                                                 | number \| (datum, index, data) => number                                                                   | -                                 |      |
| titleShadowColor   | 标题文字阴影颜色                                                                                                     | string \| (datum, index, data) => string                                                                   | -                                 |      |
| titleShadowBlur    | 标题文字阴影的高斯模糊系数                                                                                           | number \| (datum, index, data) => number                                                                   | -                                 |      |
| titleShadowOffsetX | 设置阴影距标题文字的水平距离                                                                                         | number \| (datum, index, data) => number                                                                   | -                                 |      |
| titleShadowOffsetY | 设置阴影距标题文字的垂直距离                                                                                         | number \| (datum, index, data) => number                                                                   | -                                 |      |
| titleCursor        | 标题鼠标样式。同 css 的鼠标样式                                                                                      | string \| (datum, index, data) => string                                                                   | `default`                         |      |

在 Legend 组件中配置标题的时候，不是以对象的形式来配置，而是以 `title`前缀加属性的方式来配置。

```js
({
  legend: {
    size: {
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
    },
  },
});
```

尝试一下:

<Playground path="component/legend/demo/title.ts" rid="legend-title"></playground>

### cols

<description> _number_ **optional** </description>

适用于 <Badge type="success">分类图例</Badge> 。指定每行显示的图例项数量，为空时表示列数不受限制。

图例布局默认采用**流式布局**。

<img alt="flow layout" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Lb43QoUm8ZEAAAAAAAAAAAAADmJ7AQ/original" width="400" />

当指定 `cols` 之后会采用**网格布局**。

<img alt="grid layout 1" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*IsmYSKexO00AAAAAAAAAAAAADmJ7AQ/original" width="400" />

<img alt="grid layout 2" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Mh1bQbp7jeMAAAAAAAAAAAAADmJ7AQ/original" width="400" />

### colPadding

<description> _number_ **optional** </description>

适用于 <Badge type="success">分类图例</Badge> 。指定图例项之间的横向间隔。默认为 `12`。

### rowPadding

<description> _number_ **optional** </description>

适用于 <Badge type="success">分类图例</Badge> 。指定图例项之间的纵向间隔。默认为 `8`。

### maxRows

<description> _number_ **optional** </description>

适用于 <Badge type="success">分类图例</Badge> 。指定图例最大行数。默认为 `3`。

### maxCols

<description> _number_ **optional** </description>

适用于 <Badge type="success">分类图例</Badge> 。指定图例最大列数。默认为 `3`。

💡 **maxRows 和 maxCols 是怎么作用于图例布局的？**

maxRows 和 maxCols 用于限制图例布局的最大行数和列数。在代码中通过 `getRows = (rows) => Math.min(rows, maxRows)`和 `getCols = (cols) => Math.min(cols, maxCols)`实现行列数限制。

| **参数**    | **垂直布局**                     | **水平布局**                         |
| ----------- | -------------------------------- | ------------------------------------ |
| **maxCols** | 限制列数，控制图例宽度           | 无直接影响（列数由 `cols` 参数指定） |
| **maxRows** | 无直接影响（行数由高度自动计算） | 限制行数，控制图例高度               |

**潜在问题**

- **垂直布局**：若 `maxCols` 过小，可能导致单列行数超过 `maxHeight`，引发溢出。

- **水平布局**：若 `maxRows` 过小，部分项可能被截断。

此时需要适当调整图表的 `margin` 和 `padding`，保证图例有足够的空间展示。

### itemMarker

<description> _LegendItemMarkerCfg_ **optional** </description>

适用于 <Badge type="success">分类图例</Badge> 。配置图例项的图标。_LegendItemMarkerCfg_ 配置如下：

| 属性                    | 描述                                                                                                                   | 类型                                                         | 默认值    | 必选 |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | --------- | ---- |
| itemMarker              | 图例项图标                                                                                                             | _Symbols_ \|(datum, index, data)=>_Symbols_                  | `circle`  |      |
| itemMarkerSize          | 图例项图标大小                                                                                                         | number \| (datum, index, data) => number                     | `8`       |      |
| itemMarkerFill          | 图例项图标填充色                                                                                                       | string \| (datum, index, data) => string                     | -         |      |
| itemMarkerFillOpacity   | 图例项图标填充透明度                                                                                                   | number \| (datum, index, data) => number                     | `1`       |      |
| itemMarkerStroke        | 图例项图标的描边                                                                                                       | string \| (datum, index, data) => string                     | -         |      |
| itemMarkerStrokeOpacity | 图例项图标描边透明度                                                                                                   | number \| (datum, index, data) => number                     | -         |      |
| itemMarkerLineWidth     | 图例项图标描边的宽度                                                                                                   | number \| (datum, index, data) => number                     | -         |      |
| itemMarkerLineDash      | 图例项图标描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 | [number,number] \| (datum, index, data) => [number , number] | -         |      |
| itemMarkerOpacity       | 图例项图标的整体透明度                                                                                                 | number \| (datum, index, data) => number                     | -         |      |
| itemMarkerShadowColor   | 图例项图标阴影颜色                                                                                                     | string \| (datum, index, data) => string                     | -         |      |
| itemMarkerShadowBlur    | 图例项图标阴影的高斯模糊系数                                                                                           | number \| (datum, index, data) => number                     | -         |      |
| itemMarkerShadowOffsetX | 设置阴影距图例项图标的水平距离                                                                                         | number \| (datum, index, data) => number                     | -         |      |
| itemMarkerShadowOffsetY | 设置阴影距图例项图标的垂直距离                                                                                         | number \| (datum, index, data) => number                     | -         |      |
| itemMarkerCursor        | 图例项图标鼠标样式。同 css 的鼠标样式。                                                                                | string \| (datum, index, data) => string                     | `default` |      |

#### Symbols 可选类型

| 属性               | 描述                   |
| ------------------ | ---------------------- |
| bowtie             | 图形类型：蝴蝶结       |
| cross              | 图形类型：十字         |
| dash               | 图形类型：短横线       |
| diamond            | 图形类型：菱形         |
| dot                | 图形类型：点           |
| hexagon            | 图形类型：六边形       |
| hollowBowtie       | 图形类型：空心蝴蝶结   |
| hollowDiamond      | 图形类型：空心菱形     |
| hollowHexagon      | 图形类型：空心六边形   |
| hollowPoint        | 图形类型：空心点       |
| hollowSquare       | 图形类型：空心正方形   |
| hollowTriangle     | 图形类型：空心三角形   |
| hollowTriangleDown | 图形类型：倒空心三角形 |
| hv                 | 样式类型：HV 路径      |
| hvh                | 样式类型：HVH 路径     |
| hyphen             | 图形类型：连字符       |
| line               | 图形类型：直线         |
| plus               | 图形类型：加号         |
| point              | 图形类型：实心点       |
| rect               | 图形类型：矩形         |
| smooth             | 样式类型：平滑曲线     |
| square             | 图形类型：正方形       |
| tick               | 图形类型：刻度线       |
| triangleDown       | 图形类型：倒三角形     |
| triangle           | 图形类型：三角形       |
| vh                 | 样式类型：VH 路径      |
| vhv                | 样式类型：VHV 路径     |

尝试一下：

```js | ob { pin: false }
(() => {
  // 可选的itemMarker形状
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
    chart.render(); // 重新渲染图表
  };

  const selectorContainer = document.createElement('div');
  selectorContainer.textContent = '选择图例项图标的形状 ';
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

在 Legend 组件中配置图例项图标的时候，不是以对象的形式来配置，而是以 `itemMarker`前缀加属性的方式来配置。

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

适用于 <Badge type="success">分类图例</Badge> 。配置图例项的标签。_LegendItemLabelCfg_ 配置如下：

| 属性                   | 描述                                                                                                                       | 类型                                                           | 默认值    | 必选 |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | --------- | ---- |
| itemLabelText          | 图例项标签内容                                                                                                             | string \| (datum, index, data) => string                       | -         |      |
| itemLabelFontSize      | 图例项标签文字大小                                                                                                         | number \| (datum, index, data) => number                       | `12`      |      |
| itemLabelFontFamily    | 图例项标签文字字体                                                                                                         | string \| (datum, index, data) => string                       | -         |      |
| itemLabelFontWeight    | 图例项标签字体粗细                                                                                                         | number \| (datum, index, data) => number                       | `normal`  |      |
| itemLabelLineHeight    | 图例项标签文字的行高                                                                                                       | number \| (datum, index, data) => number                       | -         |      |
| itemLabelTextAlign     | 设置图例项标签文本内容的当前对齐方式                                                                                       | `center` \| `end` \| `left` \| `right` \| `start`              | `start`   |      |
| itemLabelTextBaseline  | 设置在绘制图例项标签文本时使用的当前文本基线                                                                               | `top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging`     | `bottom`  |      |
| itemLabelFill          | 图例项标签字体颜色                                                                                                         | string \| (datum, index, data) => string                       | `#1D2129` |      |
| itemLabelFillOpacity   | 图例项标签字体颜色透明度                                                                                                   | number \| (datum, index, data) => number                       | `0.9`     |      |
| itemLabelStroke        | 图例项标签字体描边颜色                                                                                                     | string \| (datum, index, data) => string                       | -         |      |
| itemLabelStrokeOpacity | 图例项标签字体描边颜色透明度                                                                                               | number \| (datum, index, data) => number                       | -         |      |
| itemLabelLineWidth     | 图例项标签字体描边的宽度                                                                                                   | number \| (datum, index, data) => number                       | -         |      |
| itemLabelLineDash      | 图例项标签字体描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 | [number,number] \| (da tu m, index, data) => [number , number] | -         |      |
| itemLabelOpacity       | 图例项标签文字的整体透明度                                                                                                 | number \| (datum, index, data) => number                       | -         |      |
| itemLabelShadowColor   | 图例项标签文字阴影颜色                                                                                                     | string \| (datum, index, data) => string                       | -         |      |
| itemLabelShadowBlur    | 图例项标签文字阴影的高斯模糊系数                                                                                           | number \| (datum, index, data) => number                       | -         |      |
| itemLabelShadowOffsetX | 设置阴影距图例项标签文字的水平距离                                                                                         | number \| (datum, index, data) => number                       | -         |      |
| itemLabelShadowOffsetY | 设置阴影距图例项标签文字的垂直距离                                                                                         | number \| (datum, index, data) => number                       | -         |      |
| itemLabelCursor        | 图例项标签鼠标样式。同 css 的鼠标样式                                                                                      | string \| (datum, index, data) => string                       | `default` |      |

在 Legend 组件中配置图例项标签的时候，不是以对象的形式来配置，而是以 `itemLabel`前缀加属性的方式来配置。

```js
({
  legend: {
    color: {
      itemLabelText: '图例项标签',
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

适用于 <Badge type="success">分类图例</Badge> 。配置图例项的值。_LegendItemValueCfg_ 配置如下：

| 属性                   | 描述                                                                                                                     | 类型                                                         | 默认值    | 必选 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ | --------- | ---- |
| itemValueText          | 图例项值内容                                                                                                             | string \| (datum, index, data) => string                     | -         |      |
| itemValueFontSize      | 图例项值文字大小                                                                                                         | number \| (datum, index, data) => number                     | `12`      |      |
| itemValueFontFamily    | 图例项值文字字体                                                                                                         | string \| (datum, index, data) => string                     | -         |      |
| itemValueFontWeight    | 图例项值字体粗细                                                                                                         | number \| (datum, index, data) => number                     | `normal`  |      |
| itemValueLineHeight    | 图例项值文字的行高                                                                                                       | number \| (datum, index, data) => number                     | -         |      |
| itemValueTextAlign     | 设置图例项值文本内容的当前对齐方式                                                                                       | `center` \| `end` \| `left` \| `right` \| `start`            | `start`   |      |
| itemValueTextBaseline  | 设置在绘制图例项值文本时使用的当前文本基线                                                                               | `top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging`   | `bottom`  |      |
| itemValueFill          | 图例项值字体颜色                                                                                                         | string \| (datum, index, data) => string                     | `#1D2129` |      |
| itemValueFillOpacity   | 图例项值字体颜色透明度                                                                                                   | number \| (datum, index, data) => number                     | `0.65`    |      |
| itemValueStroke        | 图例项值字体描边颜色                                                                                                     | string \| (datum, index, data) => string                     | -         |      |
| itemValueStrokeOpacity | 图例项值字体描边颜色透明度                                                                                               | number \| (datum, index, data) => number                     | -         |      |
| itemValueLineWidth     | 图例项值字体描边的宽度                                                                                                   | number \| (datum, index, data) => number                     | -         |      |
| itemValueLineDash      | 图例项值字体描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 | [number,number] \| (datum, index, data) => [number , number] | -         |      |
| itemValueOpacity       | 图例项值文字的整体透明度                                                                                                 | number \| (datum, index, data) => number                     | -         |      |
| itemValueShadowColor   | 图例项值文字阴影颜色                                                                                                     | string \| (datum, index, data) => string                     | -         |      |
| itemValueShadowBlur    | 图例项值文字阴影的高斯模糊系数                                                                                           | number \| (datum, index, data) => number                     | -         |      |
| itemValueShadowOffsetX | 设置阴影距图例项值文字的水平距离                                                                                         | number \| (datum, index, data) => number                     | -         |      |
| itemValueShadowOffsetY | 设置阴影距图例项值文字的垂直距离                                                                                         | number \| (datum, index, data) => number                     | -         |      |
| itemValueCursor        | 图例项值鼠标样式。同 css 的鼠标样式                                                                                      | string \| (datum, index, data) => string                     | `default` |      |

在 Legend 组件中配置图例项值的时候，不是以对象的形式来配置，而是以 `itemValue`前缀加属性的方式来配置。

```js
({
  legend: {
    color: {
      itemValueText: '图例项值',
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

适用于 <Badge type="success">分类图例</Badge> 。配置图例项的背景。_LegendItemBackgroundCfg_ 配置如下：

| 属性                        | 描述                                                                                                                   | 类型                                                         | 默认值        | 必选 |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------- | ---- |
| itemBackgroundRadius        | 图例项背景圆角                                                                                                         | number \| (datum, index, data) => number                     | `0`           |      |
| itemBackgroundFill          | 图例项背景填充色                                                                                                       | string \| (datum, index, data) => string                     | `transparent` |      |
| itemBackgroundFillOpacity   | 图例项背景填充透明度                                                                                                   | number \| (datum, index, data) => number                     | -             |      |
| itemBackgroundStroke        | 图例项背景的描边                                                                                                       | string \| (datum, index, data) => string                     | -             |      |
| itemBackgroundStrokeOpacity | 图例项背景描边透明度                                                                                                   | number \| (datum, index, data) => number                     | -             |      |
| itemBackgroundLineWidth     | 图例项背景描边的宽度                                                                                                   | number \| (datum, index, data) => number                     | -             |      |
| itemBackgroundLineDash      | 图例项背景描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 | [number,number] \| (datum, index, data) => [number , number] | -             |      |
| itemBackgroundOpacity       | 图例项背景的整体透明度                                                                                                 | number \| (datum, index, data) => number                     | -             |      |
| itemBackgroundShadowColor   | 图例项背景阴影颜色                                                                                                     | string \| (datum, index, data) => string                     | -             |      |
| itemBackgroundShadowBlur    | 图例项背景阴影的高斯模糊系数                                                                                           | number \| (datum, index, data) => number                     | -             |      |
| itemBackgroundShadowOffsetX | 设置阴影距图例项背景的水平距离                                                                                         | number \| (datum, index, data) => number                     | -             |      |
| itemBackgroundShadowOffsetY | 设置阴影距图例项背景的垂直距离                                                                                         | number \| (datum, index, data) => number                     | -             |      |
| itemBackgroundCursor        | 图例项背景鼠标样式。同 css 的鼠标样式。                                                                                | string \| (datum, index, data) => string                     | `default`     |      |

在 Legend 组件中配置图例项背景的时候，不是以对象的形式来配置，而是以 `itemBackground`前缀加属性的方式来配置。

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

接下来，试试结合 `itemMarker`、`itemLabel`、`itemValue`和`itemBackground`的各种属性，来配置一个自定义的图例吧：

<Playground path="component/legend/demo/item-style.ts" rid="legend-item-style"></playground>

### itemWidth

<description> _number_ **optional** </description>

适用于 <Badge type="success">分类图例</Badge> 。配置图例项的宽度。

### itemSpan

<description> _number|number[]_ **optional** </description>

适用于 <Badge type="success">分类图例</Badge> 。配置图例项图标、标签和值的空间划分。默认为`[1, 1, 1]`。

### itemSpacing

<description> _number|number[]_ **optional** </description>

适用于 <Badge type="success">分类图例</Badge> 。配置图例项图标、标签和值之间的间距。默认为`[8, 8]`。

### nav

<description> _LegendNavCfg_ **optional** </description>

适用于 <Badge type="success">分类图例</Badge> 。配置图例的分页器。在网格布局下，页面容量 = `gridRow` × `gridCol`，如果分类项数量超出此容量，则分页。在弹性布局下，页面容量动态计算，受容器宽度和高度限制。当分类项超过容器高度或宽度时，进行分页，展示分页器组件。_LegendNavCfg_ 配置如下：

<img alt="legend-nav" width=300 src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*QkXFSoUuqGYAAAAAAAAAAAAAemJ7AQ/original"/>

| 属性                    | 描述                                                                                                                       | 类型                                                                       | 默认值       | 必选 |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------ | ---- |
| navEffect               | 翻页显示效果                                                                                                               | 参见 [Web Animations API](https://g.antv.antgroup.com/api/animation/waapi) | `linear`     |      |
| navDuration             | 单次翻页动效时长                                                                                                           | number                                                                     | `200`        |      |
| navOrientation          | 翻页滚动方向<br>- 横向`horizontal`<br>- 纵向`vertical`                                                                     | `horizontal` \|`vertical`                                                  | `horizontal` |      |
| navDefaultPage          | 默认展示页数                                                                                                               | number                                                                     | `0`          |      |
| navLoop                 | 是否启用循环翻页                                                                                                           | boolean                                                                    | false        |      |
| navPageWidth            | 分页器页宽                                                                                                                 | number                                                                     | -            |      |
| navPageHeight           | 分页器页高                                                                                                                 | number                                                                     | -            |      |
| navControllerPadding    | 分页器按钮与分页器数字的间隔                                                                                               | number \| number[]                                                         | `5`          |      |
| navControllerSpacing    | 分页器按钮与页的间隔，可以用来配置分页器与图例的间隔                                                                       | number \| number[]                                                         | `5`          |      |
| navPageNumFontSize      | 分页器数字文字大小                                                                                                         | number \| (datum, index, data) => number                                   | `12`         |      |
| navPageNumFontFamily    | 分页器数字文字字体                                                                                                         | string \| (datum, index, data) => string                                   | -            |      |
| navPageNumFontWeight    | 分页器数字字体粗细                                                                                                         | number \| (datum, index, data) => number                                   | `normal`     |      |
| navPageNumLineHeight    | 分页器数字文字的行高                                                                                                       | number \| (datum, index, data) => number                                   | -            |      |
| navPageNumTextAlign     | 设置分页器数字文本内容的当前对齐方式                                                                                       | `center` \| `end` \| `left` \| `right` \| `start`                          | `start`      |      |
| navPageNumTextBaseline  | 设置在绘制分页器数字文本时使用的当前文本基线                                                                               | `top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging`                 | `bottom`     |      |
| navPageNumFill          | 分页器数字字体颜色                                                                                                         | string \| (datum, index, data) => string                                   | `#1D2129`    |      |
| navPageNumFillOpacity   | 分页器数字字体颜色透明度                                                                                                   | number \| (datum, index, data) => number                                   | `0.45`       |      |
| navPageNumStroke        | 分页器数字字体描边颜色                                                                                                     | string \| (datum, index, data) => string                                   | -            |      |
| navPageNumStrokeOpacity | 分页器数字字体描边颜色透明度                                                                                               | number \| (datum, index, data) => number                                   | -            |      |
| navPageNumLineWidth     | 分页器数字字体描边的宽度                                                                                                   | number \| (datum, index, data) => number                                   | -            |      |
| navPageNumLineDash      | 分页器数字字体描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 | [number,number] \| (datum, index, data) => [number , number]               | -            |      |
| navPageNumOpacity       | 分页器数字文字的整体透明度                                                                                                 | number \| (datum, index, data) => number                                   | -            |      |
| navPageNumShadowColor   | 分页器数字文字阴影颜色                                                                                                     | string \| (datum, index, data) => string                                   | -            |      |
| navPageNumShadowBlur    | 分页器数字文字阴影的高斯模糊系数                                                                                           | number \| (datum, index, data) => number                                   | -            |      |
| navPageNumShadowOffsetX | 设置阴影距分页器数字文字的水平距离                                                                                         | number \| (datum, index, data) => number                                   | -            |      |
| navPageNumShadowOffsetY | 设置阴影距分页器数字文字的垂直距离                                                                                         | number \| (datum, index, data) => number                                   | -            |      |
| navPageNumCursor        | 分页器数字鼠标样式。同 css 的鼠标样式                                                                                      | string \| (datum, index, data) => string                                   | `default`    |      |
| navButtonSize           | 分页器按钮尺寸                                                                                                             | number \| (datum, index, data) => number                                   | -            |      |
| navButtonFill           | 分页器按钮填充色                                                                                                           | string \| (datum, index, data) => string                                   | `#1D2129`    |      |
| navButtonFillOpacity    | 分页器按钮填充透明度                                                                                                       | number \| (datum, index, data) => number                                   | `0.65`       |      |
| navButtonStroke         | 分页器按钮的描边                                                                                                           | string \| (datum, index, data) => string                                   | -            |      |
| navButtonStrokeOpacity  | 分页器按钮描边透明度                                                                                                       | number \| (datum, index, data) => number                                   | -            |      |
| navButtonLineWidth      | 分页器按钮描边的宽度                                                                                                       | number \| (datum, index, data) => number                                   | -            |      |
| navButtonLineDash       | 分页器按钮描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。     | [number,number] \| (datum, index, data) => [number , number]               | -            |      |
| navButtonOpacity        | 分页器按钮的整体透明度                                                                                                     | number \| (datum, index, data) => number                                   | -            |      |
| navButtonShadowColor    | 分页器按钮阴影颜色                                                                                                         | string \| (datum, index, data) => string                                   | -            |      |
| navButtonShadowBlur     | 分页器按钮阴影的高斯模糊系数                                                                                               | number \| (datum, index, data) => number                                   | -            |      |
| navButtonShadowOffsetX  | 设置阴影距分页器按钮的水平距离                                                                                             | number \| (datum, index, data) => number                                   | -            |      |
| navButtonShadowOffsetY  | 设置阴影距分页器按钮的垂直距离                                                                                             | number \| (datum, index, data) => number                                   | -            |      |
| navButtonCursor         | 分页器按钮鼠标样式。同 css 的鼠标样式。                                                                                    | string \| (datum, index, data) => string                                   | `default`    |      |
| navFormatter            | 页码文本格式化                                                                                                             | (current: number, total: number) => string                                 | -            |      |

在 Legend 组件中配置分页器属性的时候，不是以对象的形式来配置，而是以 `nav`前缀加属性的方式来配置。

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

      //配置navPageNum的绘图属性
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

      // 配置navButton的绘图属性
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

尝试一下：

<Playground path="component/legend/demo/nav-style.ts" rid="legend-nav-style"></playground>

### color

<description> _string[] | [d3-interpolate](https://github.com/d3/d3-interpolate)_ **optional** </description>

适用于 <Badge type="warning">连续图例</Badge> 。配置连续图例的色带颜色，为数组时会从中按序取色。

### block

<description> _boolean_ **optional** </description>

适用于 <Badge type="warning">连续图例</Badge> 。连续图例是否按区间显示。默认为 false。

### type

<description> _size | color_ **optional** </description>

适用于 <Badge type="warning">连续图例</Badge> 。配置连续图例的类型。默认为 `color`。

结合 `block` 和 `type` 属性可以配置不同样式的连续图例。连续数据的图例具有 4 种样式，分别为：

- 连续表示 `默认`

  <img alt="ribbon-color" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ds9pTqbi4OAAAAAAAAAAAAAADmJ7AQ/original" width="300" />

- 范围表示 `block=true`

  <img alt="ribbon-color" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*kpDRTJVgkaEAAAAAAAAAAAAADmJ7AQ/original" width="300" />

- 尺寸表示 `type='size'`

  <img alt="ribbon-color" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*uHJYTbVSebgAAAAAAAAAAAAADmJ7AQ/original" width="300" />

- 尺寸、范围表示 `type='size'` `block=true`

  <img alt="ribbon-color" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*MahwS6sQocoAAAAAAAAAAAAADmJ7AQ/original" width="300" />

### ribbon

<description> _LegendRibbonCfg_ **optional** </description>

适用于 <Badge type="warning">连续图例</Badge> 。配置连续图例的色带。_LegendRibbonCfg_ 配置如下：

| 属性                | 描述                                                                                                             | 类型                                                         | 默认值    | 必选 |
| ------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | --------- | ---- |
| ribbonSize          | 色带大小                                                                                                         | number \| (datum, index, data) => number                     | `12`      |      |
| ribbonFill          | 色带填充色                                                                                                       | string \| (datum, index, data) => string                     | `#aaa`    |      |
| ribbonFillOpacity   | 色带填充透明度                                                                                                   | number \| (datum, index, data) => number                     | -         |      |
| ribbonStroke        | 色带的描边                                                                                                       | string \| (datum, index, data) => string                     | -         |      |
| ribbonStrokeOpacity | 色带描边透明度                                                                                                   | number \| (datum, index, data) => number                     | -         |      |
| ribbonLineWidth     | 色带描边的宽度                                                                                                   | number \| (datum, index, data) => number                     | -         |      |
| ribbonLineDash      | 色带描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 | [number,number] \| (datum, index, data) => [number , number] | -         |      |
| ribbonOpacity       | 色带的整体透明度                                                                                                 | number \| (datum, index, data) => number                     | -         |      |
| ribbonShadowColor   | 色带阴影颜色                                                                                                     | string \| (datum, index, data) => string                     | -         |      |
| ribbonShadowBlur    | 色带阴影的高斯模糊系数                                                                                           | number \| (datum, index, data) => number                     | -         |      |
| ribbonShadowOffsetX | 设置阴影距色带的水平距离                                                                                         | number \| (datum, index, data) => number                     | -         |      |
| ribbonShadowOffsetY | 设置阴影距色带的垂直距离                                                                                         | number \| (datum, index, data) => number                     | -         |      |
| ribbonCursor        | 色带鼠标样式。同 css 的鼠标样式。                                                                                | string \| (datum, index, data) => string                     | `default` |      |

在 Legend 组件中配置色带的时候，不是以对象的形式来配置，而是以 `ribbon`前缀加属性的方式来配置。

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

滑动窗口标记了当前的值选取范围，通过与滑动窗口交互能够对视图中的值范围进行选择。

 <img alt="slider-window" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*eAnbT6OFQlwAAAAAAAAAAAAADmJ7AQ/original" width="300" />

适用于 <Badge type="warning">连续图例</Badge> 。配置连续图例的滑动手柄。 _LegendHandleCfg_ 配置如下：

| 属性                     | 描述                                                                                                                     | 类型                                                         | 默认值       | 必选 |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ | ------------ | ---- |
| handle                   | 是否显示滑动手柄                                                                                                         | boolean                                                      | true         |      |
| handleLabel              | 是否显示滑动手柄标签                                                                                                     | boolean                                                      | false        |      |
| slidable                 | 窗口是否可以滑动                                                                                                         | boolean                                                      | true         |      |
| range                    | 滑动窗口默认选择范围                                                                                                     | [number, number]                                             | `[min, max]` |      |
| step                     | 单次滑动步长                                                                                                             | number                                                       | `1`          |      |
| handleLabelFontSize      | 手柄标签文字大小                                                                                                         | number \| (datum, index, data) => number                     | `12`         |      |
| handleLabelFontFamily    | 手柄标签文字字体                                                                                                         | string \| (datum, index, data) => string                     | -            |      |
| handleLabelFontWeight    | 手柄标签字体粗细                                                                                                         | number \| (datum, index, data) => number                     | `normal`     |      |
| handleLabelLineHeight    | 手柄标签文字的行高                                                                                                       | number \| (datum, index, data) => number                     | -            |      |
| handleLabelTextAlign     | 设置手柄标签文本内容的当前对齐方式                                                                                       | `center` \| `end` \| `left` \| `right` \| `start`            | `start`      |      |
| handleLabelTextBaseline  | 设置在绘制手柄标签文本时使用的当前文本基线                                                                               | `top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging`   | `bottom`     |      |
| handleLabelFill          | 手柄标签字体颜色                                                                                                         | string \| (datum, index, data) => string                     | `#1D2129`    |      |
| handleLabelFillOpacity   | 手柄标签字体颜色透明度                                                                                                   | number \| (datum, index, data) => number                     | `0.45`       |      |
| handleLabelStroke        | 手柄标签字体描边颜色                                                                                                     | string \| (datum, index, data) => string                     | -            |      |
| handleLabelStrokeOpacity | 手柄标签字体描边颜色透明度                                                                                               | number \| (datum, index, data) => number                     | -            |      |
| handleLabelLineWidth     | 手柄标签字体描边的宽度                                                                                                   | number \| (datum, index, data) => number                     | -            |      |
| handleLabelLineDash      | 手柄标签字体描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 | [number,number] \| (datum, index, data) => [number , number] | -            |      |
| handleLabelOpacity       | 手柄标签文字的整体透明度                                                                                                 | number \| (datum, index, data) => number                     | -            |      |
| handleLabelShadowColor   | 手柄标签文字阴影颜色                                                                                                     | string \| (datum, index, data) => string                     | -            |      |
| handleLabelShadowBlur    | 手柄标签文字阴影的高斯模糊系数                                                                                           | number \| (datum, index, data) => number                     | -            |      |
| handleLabelShadowOffsetX | 设置阴影距手柄标签文字的水平距离                                                                                         | number \| (datum, index, data) => number                     | -            |      |
| handleLabelShadowOffsetY | 设置阴影距手柄标签文字的垂直距离                                                                                         | number \| (datum, index, data) => number                     | -            |      |
| handleLabelCursor        | 手柄标签鼠标样式。同 css 的鼠标样式                                                                                      | string \| (datum, index, data) => string                     | `default`    |      |
| handleIconSize           | 手柄图标尺寸色                                                                                                           | number \| (datum, index, data) => number                     | -            |      |
| handleIconFill           | 手柄图标填充色                                                                                                           | string \| (datum, index, data) => string                     | `#1D2129`    |      |
| handleIconFillOpacity    | 手柄图标填充透明度                                                                                                       | number \| (datum, index, data) => number                     | `0.65`       |      |
| handleIconStroke         | 手柄图标的描边                                                                                                           | string \| (datum, index, data) => string                     | -            |      |
| handleIconStrokeOpacity  | 手柄图标描边透明度                                                                                                       | number \| (datum, index, data) => number                     | -            |      |
| handleIconLineWidth      | 手柄图标描边的宽度                                                                                                       | number \| (datum, index, data) => number                     | -            |      |
| handleIconLineDash       | 手柄图标描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。     | [number,number] \| (datum, index, data) => [number , number] | -            |      |
| handleIconOpacity        | 手柄图标的整体透明度                                                                                                     | number \| (datum, index, data) => number                     | -            |      |
| handleIconShadowColor    | 手柄图标阴影颜色                                                                                                         | string \| (datum, index, data) => string                     | -            |      |
| handleIconShadowBlur     | 手柄图标阴影的高斯模糊系数                                                                                               | number \| (datum, index, data) => number                     | -            |      |
| handleIconShadowOffsetX  | 设置阴影距手柄图标的水平距离                                                                                             | number \| (datum, index, data) => number                     | -            |      |
| handleIconShadowOffsetY  | 设置阴影距手柄图标的垂直距离                                                                                             | number \| (datum, index, data) => number                     | -            |      |
| handleIconCursor         | 手柄图标鼠标样式。同 css 的鼠标样式。                                                                                    | string \| (datum, index, data) => string                     | `default`    |      |

在 Legend 组件中配置连续图例滑动手柄属性的时候，不是以对象的形式来配置，而是以 `handle`前缀加属性的方式来配置。

```js
({
  legend: {
    color: {
      handle: true,
      handleLabel: true,
      slidable: true,
      range: [0, 1],
      step: 1,
      //配置handleLabel的绘图属性
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
      // 配置handleIcon的绘图属性
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

适用于 <Badge type="warning">连续图例</Badge> 。配置连续图例的标签/刻度值。 _LegendLabelCfg_ 配置如下：

| 属性               | 描述                                                                                                                           | 类型                                                         | 默认值     | 必选 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ | ---------- | ---- |
| label              | 是否显示连续图例的刻度值                                                                                                       | boolean                                                      | true       |      |
| labelFormatter     | 连续图例的刻度值格式化                                                                                                         | (datum, index, data)=>string                                 | -          |      |
| labelFilter        | 连续图例的刻度值过滤                                                                                                           | (datum, index, data)=>boolean                                | -          |      |
| labelDirection     | 连续图例的刻度值位于色带的位置，参考 `axis direction`                                                                          | `positive` \| `negative`                                     | `positive` |      |
| labelSpacing       | 连续图例的刻度值到色带的间距                                                                                                   | number                                                       | `3`        |      |
| labelAlign         | 连续图例的刻度值对齐位置<br/> - `'value'` 对齐到刻度<br/>- `'range'` 对齐到范围                                                | `value` \| `range`                                           | `value`    |      |
| labelFontSize      | 连续图例刻度值文字大小                                                                                                         | number \| (datum, index, data) => number                     | `12`       |      |
| labelFontFamily    | 连续图例刻度值文字字体                                                                                                         | string \| (datum, index, data) => string                     | -          |      |
| labelFontWeight    | 连续图例刻度值字体粗细                                                                                                         | number \| (datum, index, data) => number                     | `normal`   |      |
| labelLineHeight    | 连续图例刻度值文字的行高                                                                                                       | number \| (datum, index, data) => number                     | -          |      |
| labelTextAlign     | 设置连续图例刻度值文本内容的当前对齐方式                                                                                       | `center` \| `end` \| `left` \| `right` \| `start`            | `start`    |      |
| labelTextBaseline  | 设置在绘制连续图例刻度值文本时使用的当前文本基线                                                                               | `top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging`   | `bottom`   |      |
| labelFill          | 连续图例刻度值字体颜色                                                                                                         | string \| (datum, index, data) => string                     | `#1D2129`  |      |
| labelFillOpacity   | 连续图例刻度值字体颜色透明度                                                                                                   | number \| (datum, index, data) => number                     | `0.45`     |      |
| labelStroke        | 连续图例刻度值字体描边颜色                                                                                                     | string \| (datum, index, data) => string                     | -          |      |
| labelStrokeOpacity | 连续图例刻度值字体描边颜色透明度                                                                                               | number \| (datum, index, data) => number                     | -          |      |
| labelLineWidth     | 连续图例刻度值字体描边的宽度                                                                                                   | number \| (datum, index, data) => number                     | -          |      |
| labelLineDash      | 连续图例刻度值字体描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 | [number,number] \| (datum, index, data) => [number , number] | -          |      |
| labelOpacity       | 连续图例刻度值文字的整体透明度                                                                                                 | number \| (datum, index, data) => number                     | -          |      |
| labelShadowColor   | 连续图例刻度值文字阴影颜色                                                                                                     | string \| (datum, index, data) => string                     | -          |      |
| labelShadowBlur    | 连续图例刻度值文字阴影的高斯模糊系数                                                                                           | number \| (datum, index, data) => number                     | -          |      |
| labelShadowOffsetX | 设置阴影距连续图例刻度值文字的水平距离                                                                                         | number \| (datum, index, data) => number                     | -          |      |
| labelShadowOffsetY | 设置阴影距连续图例刻度值文字的垂直距离                                                                                         | number \| (datum, index, data) => number                     | -          |      |
| labelCursor        | 手柄标签鼠标样式。同 css 的鼠标样式                                                                                            | string \| (datum, index, data) => string                     | `default`  |      |

<b>刻度值对齐方式</b>

- 对齐到刻度

 <img alt="align-tick" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*vN1uQqWZ3K4AAAAAAAAAAAAADmJ7AQ/original" width="300" />

- 对齐到范围

 <img alt="align-range" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*R_C4QJ5JxgMAAAAAAAAAAAAADmJ7AQ/original" width="300" />

在 Legend 组件中配置连续图例的标签/刻度值属性的时候，不是以对象的形式来配置，而是以 `label`前缀加属性的方式来配置。

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
      // 配置连续图例的刻度值label的绘图属性
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

适用于 <Badge type="warning">连续图例</Badge> 。配置连续图例的指示器。指示器是在与连续图例交互过程中指示当前所在位置所表示值大小的提示组件。

<img alt="indicator" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*NiI8Ta84y_MAAAAAAAAAAAAADmJ7AQ/original" height="50" />

_LegendIndicatorCfg_ 配置如下：

| 属性                             | 描述                                                                                                                     | 类型                                                         | 默认值    | 必选 |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ | --------- | ---- |
| indicator                        | 是否显示连续图例的刻值指示器                                                                                             | boolean                                                      | false     |      |
| indicatorFormatter               | 值指示器格式化                                                                                                           | (datum, index, data)=>string                                 | -         |      |
| indicatorLabelFontSize           | 值指示器文字大小                                                                                                         | number \| (datum, index, data) => number                     | -         |      |
| indicatorLabelFontFamily         | 值指示器文字字体                                                                                                         | string \| (datum, index, data) => string                     | -         |      |
| indicatorLabelFontWeight         | 值指示器字体粗细                                                                                                         | number \| (datum, index, data) => number                     | -         |      |
| indicatorLabelLineHeight         | 值指示器文字的行高                                                                                                       | number \| (datum, index, data) => number                     | -         |      |
| indicatorLabelTextAlign          | 设置值指示器文本内容的当前对齐方式                                                                                       | `center` \| `end` \| `left` \| `right` \| `start`            | `start`   |      |
| indicatorLabelTextBaseline       | 设置在绘制值指示器文本时使用的当前文本基线                                                                               | `top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging`   | `bottom`  |      |
| indicatorLabelFill               | 值指示器字体颜色                                                                                                         | string \| (datum, index, data) => string                     | -         |      |
| indicatorLabelFillOpacity        | 值指示器字体颜色透明度                                                                                                   | number \| (datum, index, data) => number                     | -         |      |
| indicatorLabelStroke             | 值指示器字体描边颜色                                                                                                     | string \| (datum, index, data) => string                     | -         |      |
| indicatorLabelStrokeOpacity      | 值指示器字体描边颜色透明度                                                                                               | number \| (datum, index, data) => number                     | -         |      |
| indicatorLabelLineWidth          | 值指示器字体描边的宽度                                                                                                   | number \| (datum, index, data) => number                     | -         |      |
| indicatorLabelLineDash           | 值指示器字体描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 | [number,number] \| (datum, index, data) => [number , number] | -         |      |
| indicatorLabelOpacity            | 值指示器文字的整体透明度                                                                                                 | number \| (datum, index, data) => number                     | -         |      |
| indicatorLabelShadowColor        | 值指示器文字阴影颜色                                                                                                     | string \| (datum, index, data) => string                     | -         |      |
| indicatorLabelShadowBlur         | 值指示器文字阴影的高斯模糊系数                                                                                           | number \| (datum, index, data) => number                     | -         |      |
| indicatorLabelShadowOffsetX      | 设置阴影距值指示器文字的水平距离                                                                                         | number \| (datum, index, data) => number                     | -         |      |
| indicatorLabelShadowOffsetY      | 设置阴影距值指示器文字的垂直距离                                                                                         | number \| (datum, index, data) => number                     | -         |      |
| indicatorLabelCursor             | 值指示器鼠标样式。同 css 的鼠标样式                                                                                      | string \| (datum, index, data) => string                     | `default` |      |
| indicatorBackgroundFill          | 值指示器背景填充色                                                                                                       | string \| (datum, index, data) => string                     | -         |      |
| indicatorBackgroundFillOpacity   | 值指示器背景填充透明度                                                                                                   | number \| (datum, index, data) => number                     | -         |      |
| indicatorBackgroundStroke        | 值指示器背景的描边                                                                                                       | string \| (datum, index, data) => string                     | -         |      |
| indicatorBackgroundStrokeOpacity | 值指示器背景描边透明度                                                                                                   | number \| (datum, index, data) => number                     | -         |      |
| indicatorBackgroundLineWidth     | 值指示器背景描边的宽度                                                                                                   | number \| (datum, index, data) => number                     | -         |      |
| indicatorBackgroundLineDash      | 值指示器背景描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 | [number,number] \| (datum, index, data) => [number , number] | -         |      |
| indicatorBackgroundOpacity       | 值指示器背景的整体透明度                                                                                                 | number \| (datum, index, data) => number                     | -         |      |
| indicatorBackgroundShadowColor   | 值指示器背景阴影颜色                                                                                                     | string \| (datum, index, data) => string                     | -         |      |
| indicatorBackgroundShadowBlur    | 值指示器背景阴影的高斯模糊系数                                                                                           | number \| (datum, index, data) => number                     | -         |      |
| indicatorBackgroundShadowOffsetX | 设置阴影距值指示器背景的水平距离                                                                                         | number \| (datum, index, data) => number                     | -         |      |
| indicatorBackgroundShadowOffsetY | 设置阴影距值指示器背景的垂直距离                                                                                         | number \| (datum, index, data) => number                     | -         |      |
| indicatorBackgroundCursor        | 值指示器背景鼠标样式。同 css 的鼠标样式。                                                                                | string \| (datum, index, data) => string                     | `default` |      |

在 Legend 组件中配置值指示器属性的时候，不是以对象的形式来配置，而是以 `indicator`前缀加属性的方式来配置。

```js
({
  legend: {
    color: {
      indicator: 'true',
      indicatorFormatter: (d) => {},

      //配置indicatorLabel的绘图属性
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

      // 配置indicatorBackground的绘图属性
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

## 事件

图例组件对外暴露了一些特殊的事件，用于获取组件的交互信息。

| 事件类型                                           | 描述                       | 类型                                             |
| -------------------------------------------------- | -------------------------- | ------------------------------------------------ |
| click <Badge type="success">分类图例</Badge>       | 点击图例项时触发           | `(item:Selection)=>void`                         |
| mouseenter <Badge type="success">分类图例</Badge>  | 鼠标移入图例项时触发       | `(item: Selection)=>void`                        |
| mouseleave <Badge type="success">分类图例</Badge>  | 鼠标移出图例项时触发       | `(item:Selection)=>void`                         |
| valuechange <Badge type="warning">连续图例</Badge> | 滑动窗口选取范围改变时触发 | `(range: [number, number])=>void`                |
| indicate <Badge type="warning">连续图例</Badge>    | 指示器值改变时触发         | `(value: number, range: [number, number])=>void` |

组件在图表渲染后才会出现，所以要在 `afterrender` 后挂载组件的事件，以下是一个例子：

```js
chart.on('afterrender', () => {
  const { canvas } = chart.getContext();
  const { document } = canvas;
  document
    .querySelector('.component')
    .addEventListener('valuechange', (range) => {});
});
```

## 示例

### 自定义图例项图标（itemMarker）

在具体开发过程中，内置的图例项图标可能无法满足你的要求，不用担心，G2 提供了强大的自定义功能。

#### 自定义符号（Symbol）

每一个符号都可以自定义，主要分为三步：

- 定义符号路径。
- 注册符号。
- 使用符号。

首先我们来看看如何定义符号路径。一个符号路径是一个函数，该函数接受起始点的横向坐标 x、纵向坐标 y 和绘制半径，返回一个路径。

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

接下来就是注册符号，通过调用 `G2.register('symbol.${symbol}', Symbol)` 来完成注册。其中 `symbol` 是符号的名字，`Symbol` 是定义好的符号路径。比如注册一个三角形的符号：

```js
import { register } from '@antv/g2';

register('symbol.customTriangle', triangle);
```

最后就是使用该符号了

```js
legend: {
  color: {
    itemMarker: 'customTriangle';
  }
}
```

#### 使用图片

```js | ob
(() => {
  const chart = new G2.Chart();

  const logo = [
    [
      '抖音',
      'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*8IXHQLvx9QkAAAAAAAAAAAAADmJ7AQ/original',
    ],
    [
      '快手',
      'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*swueRrrKvbcAAAAAAAAAAAAADmJ7AQ/original',
    ],
    [
      '小米',
      'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*79G3TIt3mBoAAAAAAAAAAAAADmJ7AQ/original',
    ],
    [
      '微信',
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
      '优酷',
      'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*UL6lS4jw9lUAAAAAAAAAAAAADmJ7AQ/original',
    ],
    [
      '百度地图',
      'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*I6nrTITAxcoAAAAAAAAAAAAADmJ7AQ/original',
    ],
    [
      '腾讯视频',
      'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*zwVvT5OFnuYAAAAAAAAAAAAADmJ7AQ/original',
    ],
    [
      '哔哩哔哩',
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
      '腾讯会议',
      'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*xbPXR7snu44AAAAAAAAAAAAADmJ7AQ/original',
    ],
    [
      '网易云音乐',
      'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*upKlRJ9QB4cAAAAAAAAAAAAADmJ7AQ/original',
    ],
    [
      'Safari',
      'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*kjDHRbiW734AAAAAAAAAAAAADmJ7AQ/original',
    ],
    [
      '地图',
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
      '百度网盘',
      'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*futaTbIAkG4AAAAAAAAAAAAADmJ7AQ/original',
    ],
    [
      '印象笔记',
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

  return chart.getContainer();
})();
```

### 自定义图例（Legend）

G2 内置的图例是用 canvas 或者 svg 绘制的，如果希望能用 HTML 渲染图例，就可以按照如下几步自定义图例：

- 关闭内置图例并且渲染图表。
- 等待图表渲染完成，根据 scale 数据渲染 HTML 图例。
- 添加交互（如果需要）。

首先是关闭内置图例，同时渲染图表。

```js
chart.options({ legend: false });
```

然后是等待图表渲染完成，并且调用 `legendColor` 渲染 HTML 图例：

```js
chart.render().then(legendColor);
```

在 `legendColor` 里我们首先需要把图例画出来，下面这个例子把图例画出来后，添加到了画布前面：

```js
function legendColor(chart) {
  const node = chart.getContainer();
  const legend = document.createElement('div');
  node.insertBefore(legend, node.childNodes[0]);

  // ...
}
```

画出了图例之后，我们需要绘制图例项，这个数据从对应通道的比例尺获得：`chart.getScale().color`，并且通过 scale 的 domain 和 range 获得对应的名字和值。

```js
function legendColor(chart) {
  // ...
  const scale = chart.getScale().color;
  const { domain } = scale.getOptions();
  const items = domain.map(() => {});
  // ...
}
```

绘制完图例项之后我们就应该给每个图例项通过 `item.onclick` 添加交互，收集当前选中的值，并且根据这个值去给图表的声明添加 Filter 转换，最后重新渲染图表。最后完整的实现如下：

```js | ob
(() => {
  // 添加图例
  function legendColor(chart) {
    // 创建 Legend 并且挂载图例
    const node = chart.getContainer();
    const legend = document.createElement('div');
    legend.style.display = 'flex';
    node.insertBefore(legend, node.childNodes[0]);

    // 创建并挂载 Items
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

    // 监听事件
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

    // 重新渲染视图
    function changeColor(value) {
      const { transform = [] } = options;
      const newTransform = [{ type: 'filter', color: { value } }, ...transform];
      chart.options({
        ...options,
        transform: newTransform, // 指定新的 transform
        scale: { color: { domain } },
      });
      chart.render(); // 重新渲染图表
    }
  }

  // 绘制图表
  const container = document.createElement('div');

  const chart = new G2.Chart({
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

  return chart.getContainer();
})();
```
