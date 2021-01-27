---
title: 提示 - Tooltip
order: 8
---

`markdown:docs/common/style.md`

配置提示信息有两种方式：

第一种，传入 `boolean` 设置是否显示提示信息

```ts
chart.tooltip(false); // 关闭 tooltip
```

第二种，传入 _TooltipCfg_ 对提示信息进行整体配置

```ts
chart.tooltip({
  position: 'right',
  crosshairs: {
    type: 'y',
  },
});
```

### TooltipCfg.container

<description> _string | HTMLElement_ **optional** </description>

自定义 tooltip 的容器。

### TooltipCfg.containerTpl

<description> _string_ **optional** </description>

用于指定图例容器的模板，自定义模板时必须包含各个 dom 节点的 class。

### TooltipCfg.crosshairs

<description> _TooltipCrosshairs_ **optional** </description>

配置 tooltip 的辅助线，当且仅当 showCrosshairs 为 `true` 时生效。

```ts
interface TooltipCrosshairs {
  type?: 'x' | 'y' | 'xy'; // `x` 表示 x 轴上的辅助线，`y` 表示 y 轴上的辅助线
  follow?: boolean; // 辅助线是否跟随鼠标移动，默认为 false，即定位到数据点
  textBackground?: CrosshairTextBackgroundCfg; // 辅助线文本背景配置
  line?: CrosshairLineCfg; // 辅助线的样式配置
  text?: TooltipCrosshairsText | TooltipCrosshairsTextCallback; // 辅助线文本配置，支持回调
}
```

#### TooltipCfg.crosshairs.type

<description> _'x' | 'y' | 'xy'_ **optional** </description>

`x` 表示 x 轴上的辅助线，`y` 表示 y 轴上的辅助线。

#### TooltipCfg.crosshairs.follow

<description> _boolean_ **optional** _default:_ `false`</description>

辅助线是否跟随鼠标移动，默认为 false，即定位到数据点。

#### TooltipCfg.crosshairs.textBackground

<description> _CrosshairTextBackgroundCfg_ **optional** </description>

辅助线文本背景配置。_CrosshairTextBackgroundCfg_ 配置如下：

| 参数名  | 类型                                         | 是否必选 | 默认值 | 描述               |
| ------- | -------------------------------------------- | -------- | ------ | ------------------ |
| padding | number \| number[];                          |          | -      | 文本背景周围的留白 |
| style   | [ShapeAttrs](/zh/docs/api/shape/shape-attrs) |          | -      | 文本背景的样式     |

#### TooltipCfg.crosshairs.line

<description> _CrosshairLineCfg_ **optional** </description>

辅助线的样式配置。_CrosshairLineCfg_ 配置如下：

| 参数名 | 类型                                         | 是否必选 | 默认值 | 描述         |
| ------ | -------------------------------------------- | -------- | ------ | ------------ |
| style  | [ShapeAttrs](/zh/docs/api/shape/shape-attrs) |          | -      | 辅助线的样式 |

#### TooltipCfg.crosshairs.text

<description> _TooltipCrosshairsText | TooltipCrosshairsTextCallback_ **optional** </description>

辅助线文本配置，支持回调。

回调函数如下：

```ts
type TooltipCrosshairsTextCallback = (
  type: string, // 对应当前 crosshairs 的类型，值为 'x' 或者 'y'
  defaultContent: any, // 对应当前 crosshairs 默认的文本内容
  items: any[], // 对应当前 tooltip 内容框中的数据
  currentPoint: Point // 对应当前坐标点
) => TooltipCrosshairsText;
```

_TooltipCrosshairsText_ 配置如下：

| 参数名     | 类型                                         | 是否必选 | 默认值 | 描述                |
| ---------- | -------------------------------------------- | -------- | ------ | ------------------- |
| content    | string                                       |          | -      | crosshairs 文本内容 |
| autoRotate | boolean                                      |          | -      | 是否自动旋转        |
| style      | [ShapeAttrs](/zh/docs/api/shape/shape-attrs) |          | -      | 文本的配置项        |
| position   | 'start' \| 'end'                             |          | -      | 文本位置            |
| offset     | number                                       |          | -      | 距离线的距离        |

### TooltipCfg.domStyles

<description> _TooltipDomStyles_ **optional** </description>

_TooltipDomStyles_ 是以 dom 节点的 class 为 key 的对象，_CSSProperties_ 为 value 的对象。

```ts
interface TooltipDomStyles {
  'g2-tooltip'?: CSSProperties;
  'g2-tooltip-title'?: CSSProperties;
  'g2-tooltip-list'?: CSSProperties;
  'g2-tooltip-list-item'?: CSSProperties;
  'g2-tooltip-marker'?: CSSProperties;
  'g2-tooltip-value'?: CSSProperties;
  'g2-tooltip-name'?: CSSProperties;
}
```

`markdown:docs/common/tooltip-dom.md`

### TooltipCfg.enterable

<description> _boolean_ **optional** _default:_ `false`</description>

tooltip 是否允许鼠标滑入，默认为 false，不允许。

### TooltipCfg.follow

<description> _boolean_ **optional** _default:_ `true`</description>

设置 tooltip 内容框是否跟随鼠标移动。默认为 true，跟随鼠标移动，false 则固定位置不随鼠标移动。

### TooltipCfg.itemTpl

<description> _string_ **optional** </description>

用于指定图例容器的模板，自定义模板时必须包含各个 dom 节点的 class。

`markdown:docs/common/tooltip-dom.md`

### TooltipCfg.marker

<description> _ShapeAttrs_ **optional** </description>

tooltipMarker 的样式配置。点击 [ShapeAttrs](/zh/docs/api/shape/shape-attrs) 查看详细样式配置。

### TooltipCfg.offset

<description> _number_ **optional** </description>

tooltip 偏移量。

### TooltipCfg.position

<description> _'top' | 'bottom' | 'left' | 'right'_ **optional** </description>

设置 tooltip 的固定展示位置，相对于数据点。

### TooltipCfg.shared

<description> _boolean_ **optional** </description>

true 表示合并当前点对应的所有数据并展示，false 表示只展示离当前点最逼近的数据内容。

### TooltipCfg.showContent

<description> _boolean_ **optional** </description>

是否展示 tooltip 内容框。

### TooltipCfg.showCrosshairs

<description> _boolean_ **optional** </description>

是否显示 tooltips 辅助线。

![2020-02-13 10-02-56.2020-02-13 10_03_18.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*eSlOTp61KbgAAAAAAAAAAABkARQnAQ)

### TooltipCfg.showMarkers

<description> _boolean_ **optional** </description>

是否渲染 tooltipMarkers。

### TooltipCfg.showNil

<description> _boolean_ **optional** </description>

是否显示 tooltip 列表项目中的空值，默认为 `false`，如果设置为 `true`，则会将 null、undefine 显示为空。

### TooltipCfg.showTitle

<description> _boolean_ **optional** </description>

是否展示 tooltip 标题。

### TooltipCfg.title? : string | (title: string, datum: Datum) => string

<description> _string | Function_ **optional** </description>

设置 tooltip 的标题内容：

1. 字符串的时候，如果值为数据字段名，则会展示数据中对应该字段的数值，如果数据中不存在该字段，则直接展示 title 值。
2. 回调方法的时候，第一个参数为默认的 title 字符串，第二个参数为当前的数据记录

```ts
chart.tooltip({
  title: (title, datum) => datum['value'],
});
```

### TooltipCfg.customItems? : (items: TooltipItem[]) => TooltipItem[]

<description> _Function_ **optional** </description>

在渲染 tooltip 之前，对 G2 的 tooltip items 列表项目进行用户自定义处理，默认不做任何处理。可以用来对 tooltip 列表进行过滤、排序、格式化等操作

```ts
chart.tooltip({
  customItems: (items) => {
    return processTooltipItems(items);
  },
});
```