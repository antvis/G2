---
title: Tooltip 提示信息
order: 5
---

## 介绍

提示信息 (tooltip)，是指当鼠标悬停在图表上时，以信息框的形式展示相应的数据，如数据的标题、字段、数值等信息。

### 使用配置项配置 tooltip

```javascript
chart.tooltip(tooltipConfig)
```

(tooltipConfig: object)

```javascript
chart.tooltip(true, {
  showTitle: false,
  inPlot: false
});
```

### tooltip 的渲染方式

目前 tooltip 支持 html 和 canvas 两种渲染方式。html 渲染支持更加灵活的自定义配置，适合较为复杂的、对交互行为和内容定制要求比较高的可视化场景。canvas 渲染使用 G2 默认配置，适合基础可视化场景，如果希望生成包含 tooltip 的图片，也推荐使用 canvas 进行渲染。<br />通过下面的配置项选择渲染模式：

```javascript
chart.tooltip({
    useHtml:true // true or false
});
```

### 关闭 tooltip 功能

```javascript
chart.tooltip(false)
```

## 属性

### 通用属性

- `useHtml`:boolean

是否使用 html 渲染，默认为 true, false 时使用 canvas 渲染

- `type`:string

`default` | `mini`<br />
<br />tooltip 类型，`mini`则启用只显示单个数据值的`miniTooltip`。

- `triggerOn` :boolean

tooltip 的触发方式，可配置的值为：`mousemove`、`click`、`none`，默认为`mousemove`。<br />

  - `mousemove`: 鼠标移动触发；
  - `click`: 鼠标点击出发；
  - `none`: 不触发 tooltip，用户通过`chart.showTooltip()` 和 `chart.hideTooltip()` 来控制 tooltip 的显示和隐藏。

- `inPlot`:boolean

设置是否将 tooltip 限定在绘图区域内，默认为 true，即限定在绘图区域内。

- `position`:string

该属性设置之后，就会在固定位置展示 tooltip，可设置的值为：`left`、`right`、`top`、`bottom`。

- `showTitle`:boolean

是否展示提示信息的标题，默认为 true，即展示，通过设置为 false 来隐藏标题。

- `title`:string

设置 tooltip 的标题展示的数据字段，设置该字段后，该标题即会展示该字段对应的数值。`showTitle` 为 false 时，该设置不生效。

- `shared`:boolean

设置 tooltip 是否只展示单条数据。

- `follow`:boolean

设置 tooltip 是否跟随鼠标移动。默认为 true，即跟随。

- `offset`:number

设置 tooltip 距离鼠标的偏移量。

- `enterable`:boolean

用于控制是否允许鼠标进入 tooltip，默认为 false，即不允许进入。

### 辅助元素属性

- `crosshairs`

crosshairs 是一个对象类型，用于设置 tooltip 的辅助线或者辅助框。<br />
<br />G2 默认为`line`, `area`, `path`, `areaStack`类型的几何图形开启了垂直辅助线，为`interval`类型的几何图形开启了矩形背景辅助框，如下图所示：

| tooltip 垂注辅助线应用于多条曲线图表 | tooltip 矩形背景辅助框应用于柱状图 |
| --- | --- |
| ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*ehqITpZNzJ8AAAAAAAAAAABkARQnAQ) | ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*xy-qQr1TgUAAAAAAAAAAAABkARQnAQ) |

<br />crosshairs支持的配置如下：<br />

  - `type`:string

<br />`rect` | `x` | `y` | `cross`<br />
<br />`rect` 表示矩形框，`x` 表示水平辅助线，`y` 表示垂直辅助线，`cross` 表示十字辅助线。<br />

  - `style`:object

<br />用于控制crosshairs的显示样式，更详细见 [绘图属性](/zh/docs/api/graphics)<br />
<br />crosshairs 完整用法：

```javascript
chart.tooltip({
   crosshairs: {
     type: 'rect' | 'x' | 'y' | 'cross',
     style: {
       // 图形样式
       fill: {string}, // 填充的颜色
       stroke: {string}, // 边框的颜色
       strokeOpacity: {number}, // 边框颜色的透明度，数值为 0 - 1 范围
       fillOpacity: {number}, // 填充的颜色透明度，数值为 0 - 1 范围
       lineWidth: {number}, // 边框的粗细
       lineDash: {number} | {array} // 线的虚线样式
     }
   }
});
```

- `markerGroup`

对于 `line`、`area`、`path` 这三种几何图形，G2在渲染 tooltip 时会自动渲染tooltipMarker![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*WAohQIhuy5YAAAAAAAAAAABkARQnAQ)<br />

  - `hideMarkers`:boolean

<br />设置为true时关闭markerGroup的显示。<br />

### htmlTooltip 属性

`htmlTooltip`是 G2 tooltip 的默认形式，通过设置配置项 useHtml:true 也可以切换为`htmlTooltip`，以下配置项只有在`useHtml`为 true 的时候才能生效。

htmlTooltip 的构成形式分为三种：**default**，即 G2 的默认形式；**模板方法**，用户指定 tooltip 渲染的模板； **完全自定义方法**，用户完全掌控 tooltip 的构成形式。灵活性由低到高。

注意：使用 html 时最外层模板需要添加 'g2-tooltip' 的 className 否则会出现鼠标移动到 tooltip 上时消失的情况。

- `htmlContent`:function

`htmlContent`支持用户获取当前 tooltip 取值，并完全自定义 tooltip，用户可以根据 htmlContent 方法返回的 title 和 items 两个参数定义 tooltip dom 节点的构成和显示方式。<br />
<br />用法：

```javascript
chart.tooltip(
   {
     useHtml:true,
     htmlContent:function(title,items){
        return '<div><ul><li>.....</li></ul></div>'
     }
   }
);
```

- `containerTpl`:string

用于指定图例容器的模板，如默认结构不满足需求，可以自定义该模板，但是自定义模板时必须包含各个 dom 节点的 class，样式可以自定义。<br />
<br />默认值如下：

```javascript
containerTpl: '<div class="g2-tooltip">'
  + '<div class="g2-tooltip-title" style="margin-bottom: 4px;"></div>'
  + '<ul class="g2-tooltip-list"></ul>'
  + '</div>',
```

- `itemTpl`:string

tooltip 每项记录的默认模板，如默认结构不满足需求，可以自定义该模板，但是自定义模板时必须包含各个 dom 节点的 class，样式可以自定义。<br />
<br />默认值如下：

```javascript
itemTpl: '<li data-index={index}>'
  + '<span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>'
  + '{name}<span class="g2-tooltip-value">{value}</span>'
  + '</li>'
```

- `g2-tooltip`:object

设置 tooltip 容器的 CSS 样式。

- `g2-tooltip-title`:object

设置 tooltip 标题的 CSS 样式。

- `g2-tooltip-list`:object

设置 tooltip 列表容器的 CSS 样式。

- `g2-tooltip-list-item`:object

设置 tooltip 列表容器中每一项的 CSS 样式。

- `g2-tooltip-marker`:object

设置 tooltip 列表容器中每一项 marker 的 CSS 样式。

- `g2-tooltip-value`:object

设置 tooltip 列表容器中每一项 value 的 CSS 样式。

- `enterable`:boolean

用于控制是否允许鼠标进入 tooltip，默认为 false，即不允许进入。

### canvasTooltip 属性

通过设置配置项 useHtml:false 可以切换为 canvasTooltip，以下配置项只有在 useHtml 为 false 的时候才能生效。

- `boardStyle`:object

用于控制tooltip背景板的显示样式，更详细见 [绘图属性](/zh/docs/api/graphics)

- `titleStyle`:object

用于控制tooltip标题的显示样式，更详细见 [绘图属性](/zh/docs/api/graphics)

- `nameStyle`:object

用于控制tooltip每一项 name 的显示样式，更详细见 [绘图属性](/zh/docs/api/graphics)

- `valueStyle`:object

用于控制tooltip每一项 value 的显示样式，更详细见 [绘图属性](/zh/docs/api/graphics)

- `itemGap`:number

用于设定 tooltip 每一项之间的间距

### miniTooltip 属性

mini tooltip 是一种极简的 tooltip 形式，只显示单个数据的数值。通过设置配置项 type:mini 切换为 miniTooltip，以下配置项只有在 type 为'mini'的时候才能生效。

- `boardStyle`:object

用于控制tooltip背景板的显示样式，更详细见 [绘图属性](/zh/docs/api/graphics)

- `valueStyle`:object

用于控制tooltip数值value 的显示样式，更详细见 [绘图属性](/zh/docs/api/graphics)

- `triangleWidth`:number

设定 tooltip 三角形装饰的宽度

- `triangleHeight`:number

设定 tooltip 三角形装饰的宽度

## tooltip 属性脑图

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*sLQ1SJiODCsAAAAAAAAAAABkARQnAQ)

## Geometry 中指定 tooltip 字段

除了在 chart 层可以指定 tooltip，也可以在 geometry 上设置 tooltip 显示的内容：

```javascript
chart.line().position('x*y').tooltip('a*b*c'); // 这时候 a,b,c 字段各占一行
chart.line().position('x*y').tooltip('a*b*c', (a,b,c) => {title: a, name: b, value: c});
```

更多的方式参考：[geometry.tooltip()](/zh/docs/api/geometry#tooltip)
