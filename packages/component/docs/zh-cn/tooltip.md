# Tooltip

Tooltip 是提示信息，是指当鼠标悬停在图表上时，以信息框的形式展示相应的数据，如数据的标题、字段、数值等信息。


## 三种类型

Tooltip 分两种类型，分别是：

### htmlTooltip

支持更加灵活的自定义配置，适合较为复杂的、对交互行为和内容定制要求比较高的可视化场景。

```ts
import { Tooltip } from `@antv/guide`;
const tooltip = new Tooltip.Html(tooltipConfig);
```

### canvasTooltip 

使用 G2 底层渲染引擎 G 进行渲染，使用theme中的默认配置，支持基本的样式配置，适合基础可视化场景。如果希望生成包含 tooltip 的图片，也推荐使用 canvasTooltip。

```ts
import { Tooltip } from `@antv/guide`;
const tooltip = new Tooltip.Canvas(tooltipConfig);
```

## Properties

### 通用的 cfg

```ts
interface TooltipCfg extends GuideCfg {
    readonly enterable: boolean;// 是否允许鼠标进入 tooltip，默认为 false，即不允许进入。

    readonly inPlot: boolean;   // 是否将 tooltip 限定在绘图区域内。默认为 true，即限定在绘图区域内。
    
    readonly position: string;  // 在指定的固定位置展示 tooltip，可设置的值为：left、right、top、bottom。
    
    readonly showTitle: boolean;// 是否展示提示信息的标题。默认为 true，即展示，通过设置为 false 来隐藏标题。
        
    readonly offset: number;    // tooltip 距离鼠标的偏移量。
        
    readonly crosshairs: {      // tooltip 的辅助线或者辅助框。
        type: string;           // x/y/cross，x 表示水平辅助线，y 表示垂直辅助线，cross 表示十字辅助线。
        style: {                // 图形样式。
            fill: string;           // 填充的颜色。
            stroke: string;         // 边框的颜色。
            strokeOpacity: number;  // 边框颜色的透明度，数值为 0 - 1 范围。
            fillOpacity: number;    // 填充的颜色透明度，数值为 0 - 1 范围。
            lineWidth: number;      // 边框的粗细。
            lineDash: number | number[]; // 线的虚线样式。
        },          
    },  
}
```

### htmlTooltip 的 cfg

```ts
interface HtmlTooltipCfg extends TooltipCfg {    
    readonly follow: boolean;   // tooltip 是否跟随鼠标移动。默认为 true，即跟随。
    
    readonly containerTpl: string; // 指定图例容器的模板，如默认结构不满足需求，可以自定义该模板，但是自定义模板时必须包含各个 dom 节点的 class，样式可以自定义。
    
    readonly itemTpl: string;      // tooltip 每项记录的默认模板,如默认结构不满足需求，可以自定义该模板，但是自定义模板时必须包含各个 dom 节点的 class，样式可以自定义。
   
    readonly 'g2-tooltip': object;          // tooltip 容器的 CSS 样式。
    readonly 'g2-tooltip-title': object;    // tooltip 标题的 CSS 样式。
    readonly 'g2-tooltip-list': object;     // tooltip 列表容器的 CSS 样式。
    readonly 'g2-tooltip-list-item': object;// tooltip 列表容器中每一项的 CSS 样式。
    readonly 'g2-tooltip-marker': object;   // tooltip 列表容器中每一项 marker 的 CSS 样式。
    readonly 'g2-tooltip-value': object;    // tooltip 列表容器中每一项 value 的 CSS 样式。
    
    readonly htmlContent: (title: string, items: ToolTipContentItem[]) => string | HTMLElement // 返回 html string 或 html element
}
```

htmlContent 示例：

```ts
htmlContent: (title: string, items: ToolTipContentItem[]) => {
    return '<div><ul><li>.....</li></ul></div>'
}
```

```ts
htmlContent: (title: string, items: ToolTipContentItem[]) => {
    const tooltipContent = document.createElement('div');
    // more code here ...
    return tooltipContent;
}
```

其中 `ToolTipContentItem` 为 tooltip 中的记录项：

```
interface ToolTipContentItem {
  title: string;
  name: string;
  value: number;
  color: string;
  size: number;  
}
```

containerTpl 示例：
```javascript
containerTpl: '<div class="g2-tooltip">'
  + '<div class="g2-tooltip-title" style="margin-bottom: 4px;"></div>'
  + '<ul class="g2-tooltip-list"></ul>'
  + '</div>',
```

temTpl 示例：
```javascript
itemTpl: '<li data-index={index}>'
  + '<span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>'
  + '{name}<span class="g2-tooltip-value">{value}</span>'
  + '</li>'
```


### canvasTooltip 的 cfg
```ts
interface CanvasTooltipCfg extends TooltipCfg {
    readonly backgroundStyle: object; // tooltip 背景板的显示样式。
    readonly titleStyle: object; // tooltip 标题的显示样式。
    readonly nameStyle: object;  // tooltip 每一项 name 的显示样式。
    readonly valueStyle: object; // tooltip 每一项 value 的显示样式。
    readonly itemGap: number;    // tooltip 每一项之间的间距。
}
``` 

以上显示样式的详细配置见：https://www.yuque.com/antv/g2-docs/api-graphic。

## Methods

### constructor

创建 Tooltip 实例 `new Tooltip.Html(tooltipConfig)` / `new Tooltip.Canvas(tooltipConfig)` / `new Tooltip.Mini(tooltipConfig)`

### render

绘制 Tooltip `render()`

```ts
tooltip.render();
```

### setContent

设置 tooltip 的 内容。

### isContentChange

判断 tooltip 的内容是否有改变

### setMarkers

设置 marker。

### clearMarkers

清除 marker。

### setPosition

设置 tooltip 的定位坐标。

### show

显示 tooltip。

### hide

隐藏 tooltip。

### clear

清空 tooltip 的内容。

### destroy

销毁 tooltip 的实例。
