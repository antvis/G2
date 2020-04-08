---
title: 为图表配置交互
order: 15
---

## 简介

G2 4.0 在交互方面做了非常大的调整，所有的交互代码都是插入式的，通过交互语法进行组织。使用交互的方式也非常简单，仅需要设置交互的名称即可。

## 内置的交互

为了便于用户的使用，G2 在 Chart 中内置了几种交互：

- tooltip：鼠标在 chart 上移动时显示提示信息
- legend-active：鼠标移动到图例选项时，图例项高亮，对应的图形高亮
- legend-filter：分类图例的勾选
- continuous-filter: 连续图例的过滤

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*UMsFRZwIDvMAAAAAAAAAAABkARQnAQ" style="width: 339px;">
<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*fjkTR70h9YAAAAAAAAAAAABkARQnAQ" style="width: 339px;">
<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*qKwJTbpJLyUAAAAAAAAAAABkARQnAQ" style="width: 339px;">
<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*pe97RKJM_XAAAAAAAAAAAABkARQnAQ" style="width: 339px;">

可以通过 Chart 上的配置项 defaultInteractions 更改内置的交互

```javascript
new Chart({
  container: 'container',
  width: 500,
  height: 500,
  defaultInteractions: ['tooltip'], // 仅保留 tooltip
});
```

## 配置交互

除了通过 defaultInteractions 来配置交互外，你可以通过 Chart 上的两个接口来添加和移除交互：

- chart.interaction(name, [cfg]) 添加或者修改交互
- chart.removeInteraction(name) 移除交互

添加或者修改交互时的第二个参数 cfg 是来修改已经定义好的交互的行为，G2 4.0 中的交互全部由交互语法组装而成，可以参考 [交互的环节](../concepts/interaction)，我们在这里不对交互语法进行详细的介绍。

```javascript
chart.interaction('tooltip'); // 使用交互
chart.interaction('element-active');
chart.interaction('legend-visible-filter');

chart.removeInteraction('element-active'); // 移除某个交互
```

在交互语法中一个交互可以由多个交互环节组成，每个交互环节可以有多个触发和反馈，所以在配置交互时可以配置每个环节，每个环节都是数组，都有 trigger 和 action

- showEnable：标识交互可以发生
- start: 交互开始
- processing: 交互持续
- end: 交互结束
- rollback: 回滚

## 修改交互的默认交互

我们以修改 tooltip 的交互为例来说明如何修改默认交互的行为，tooltip 交互的原始的配置项是：

```
{
  start: [{ trigger: 'plot:mousemove', action: 'tooltip:show' }],
  end: [{ trigger: 'plot:mouseleave', action: 'tooltip:hide' }],
}
```

我们可以修改 tooltip 的触发，改成点击绘图区域内部时显示 tooltip

```javascript
chart.interaction('tooltip', {
  start: [{ trigger: 'plot:click', action: 'tooltip:show' }],
});
```

其中：

- trigger 触发一个交互环节的事件名，是所有 Chart 支持的事件
- action 触发的反馈，可以是字符串也可以是数组，是所有内置和用户自定义的 Action，参考 [交互反馈 Action 列表](#交互反馈-action-列表) 。
  - 字符串由 ’actionName:method‘ 组成
  - 列表时可以使用相同的 action ，也可以使用不同的 action ，例如: ['element-active:clear', 'element-active:active', 'mask:clear']

除了 trigger 和 action 之外还有其他几个可选属性：

- isEnable(context): 是否可以触发
- callback(context): 触发后执行完所有 action 的方法后会调用回调函数
- once: boolean， 是否在一个环节内仅能执行一次
- debounce: 延迟执行，有两个参数：
  - wait: 等待时间
  - immediate: 是否马上执行
- throttle 增加阈值，控制执行的频率
  - wait: 等待时间
  - leading: 是否马上执行
  - trailing: 执行完毕后再执行一次
    debounce 和 throttle 的机制参考：https://css-tricks.com/debouncing-throttling-explained-examples/

### context 交互的上下文

交互的上下文提供了一系列进行判定条件的函数，帮助用户在 isEnable 中方便的判断，以上面 tooltip 的为示例，如果我们不使用 'plot:click' 事件而仅使用 'click' 事件时需要判定是否在绘图区域内判定：

```javascript
chart.interaction('tooltip', {
  start: [
    {
      trigger: 'click',
      isEnable(context) {
        return context.isInPlot();
      },
      action: 'tooltip:show',
    },
  ],
});
```

context 的接口定义如下：

```javascript
/** 交互上下文的接口定义 */
export interface IInteractionContext extends LooseObject {
  /**
  * 当前触发的事件对象
  */
  event: LooseObject;
  /**
   * 当前的 view
   */
  view: View;
  /** 交互相关的 Actions */
  actions: IAction[];
  /**
   * 缓存属性，用于上下文传递信息
   * @param key 键名
   * @param value 值
   */
  cache(key: string, value?: any);
  /**
   * 获取 action
   * @param name - action 的名称
   * @returns 指定 name 的 Action
   */
  getAction(name): IAction;
  /**
   * 获取当前的点
   * @returns 返回当前的点
   */
  getCurrentPoint(): Point;
  /**
   * 获取当前的图形
   */
  getCurrentShape(): IShape;
  /**
   * 添加 action
   * @param action 指定交互 action
   */
  addAction(action: IAction);
  /**
   * 移除 action
   * @param action 移除的 action
   */
  removeAction(action: IAction);
  /**
   * 事件触发时是否在 view 内部
   */
  isInPlot();
  /**
   * 是否在组件的包围盒内
   * @param name 组件名，可省略
   */
  isInComponent(name?: string);
  /**
   * 是否在指定的图形内
   * @param name shape 的名称
   */
  isInShape(name);
  /**
   * 销毁
   */
  destroy();
}
```

- 可以通过 context.isInPlot() 判定事件触发时，事件发生的位置是否在绘图区域内
- 可以通过 context.isInComponent('legend') 判定是否发生在 legend 的包围盒内
- 可以通过 context.event.target 或者  context.getCurrentShape() 获取触发的图形

## 所有的交互列表

G2 种的所有的交互都是通过  registerInteraction 方法注册的:

```javascript
G2.registerInteraction(name, cfg);
```

我们用这个方法来说明各个交互，同时指出触发的对象和反馈的 Action

### tooltip

控制 Tooltip 的显示隐藏，其定义：

```javascript
// 注册 tooltip 的 interaction
registerInteraction('tooltip', {
  start: [{ trigger: 'plot:mousemove', action: 'tooltip:show' }],
  end: [{ trigger: 'plot:mouseleave', action: 'tooltip:hide' }],
});
```

- 触发对象 plot，图表的绘图区域
- action 是 tooltip

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*kdSLTaAiTB0AAAAAAAAAAABkARQnAQ" style="width: 339px;">

### active-region

鼠标在画布上移动时对应位置的分类出现背景框

```javascript
// 出现背景框
registerInteraction('active-region', {
  start: [{ trigger: 'plot:mousemove', action: 'active-region:show' }],
  end: [{ trigger: 'plot:mouseleave', action: 'active-region:hide' }],
});
```

- 触发对象 plot，图表的绘图区域
- action 是 active-region

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*aSJMTYFmTvUAAAAAAAAAAABkARQnAQ" style="width: 339px;">

### view-zoom

鼠标滚动时，图表内部缩放，由于 mousewheel 触发的非常频繁，所以需要增加 throttle

```js
function isWheelDown(event) {
  event.gEvent.preventDefault();
  return event.gEvent.originalEvent.deltaY > 0;
}
registerInteraction('view-zoom', {
  start: [
    {
      trigger: 'plot:mousewheel',
      isEnable(context) {
        return isWheelDown(context.event);
      },
      action: 'scale-zoom:zoomOut',
      throttle: { wait: 100, leading: true, trailing: false },
    },
    {
      trigger: 'plot:mousewheel',
      isEnable(context) {
        return !isWheelDown(context.event);
      },
      action: 'scale-zoom:zoomIn',
      throttle: { wait: 100, leading: true, trailing: false },
    },
  ],
});
```

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*EqXmQJENnpQAAAAAAAAAAABkARQnAQ" style="width: 339px"/>

### element-active

鼠标移入图表元素（柱状图的柱子、点图的点等）时触发 active

```javascript
// 移动到 elment 上 active
registerInteraction('element-active', {
  start: [{ trigger: 'element:mouseenter', action: 'element-active:active' }],
  end: [{ trigger: 'element:mouseleave', action: 'element-active:reset' }],
});
```

- 触发对象是图表元素 Element
- action 是 element-active

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*qAjhQ5jwuOYAAAAAAAAAAABkARQnAQ" style="width: 339px;">

### element-selected

点击选中图表元素、再次点击取消，允许多选

```javascript
// 点击选中，允许取消
registerInteraction('element-selected', {
  start: [{ trigger: 'element:click', action: 'element-seleted:toggle' }],
});
```

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*yRjfQaYtF-0AAAAAAAAAAABkARQnAQ" style="width: 339px;">

### element-single-selected

单选图表元素，下次点击允许取消

```javascript
// 点击选中，允许取消
registerInteraction('element-single-selected', {
  start: [{ trigger: 'element:click', action: 'element-single-selected:toggle' }],
});
```

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*DDoLT5_cCTQAAAAAAAAAAABkARQnAQ" style="width: 339px;">

### element-highlight

图表元素的高亮，是一部分图表元素高亮，另一部分变暗

```javascript
registerInteraction('element-highlight', {
  start: [{ trigger: 'element:mouseenter', action: 'element-highlight:highlight' }],
  end: [{ trigger: 'element:mouseleave', action: 'element-highlight:reset' }],
});
```

- 触发对象是图表元素 element
- action 是 element-highlight

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*wr2XTJmoHfkAAAAAAAAAAABkARQnAQ" style="width: 339px;">

### element-highlight-by-x

高亮 x 值相同的 element，适用于分组的场景

```javascript
registerInteraction('element-highlight-by-x', {
  start: [{ trigger: 'element:mouseenter', action: 'element-highlight-by-x:highlight' }],
  end: [{ trigger: 'element:mouseleave', action: 'element-highlight-by-x:reset' }],
});
```

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*7eKNRrht53EAAAAAAAAAAABkARQnAQ" style="width: 339px;">

### element-highlight-by-color

高亮所有同颜色的 element，适用于层叠的场景

```javascript
registerInteraction('element-highlight-by-color', {
  start: [{ trigger: 'element:mouseenter', action: 'element-highlight-by-color:highlight' }],
  end: [{ trigger: 'element:mouseleave', action: 'element-highlight-by-color:reset' }],
});
```

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*SbLVQpbiiKsAAAAAAAAAAABkARQnAQ" style="width: 339px;">
<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*Hv3yTJ7QD5kAAAAAAAAAAABkARQnAQ" style="width: 339px;">

### legend-filter

分类图例的数据过滤

```javascript
// 筛选数据
registerInteraction('legend-filter', {
  showEnable: [
    { trigger: 'legend-item:mouseenter', action: 'cursor:pointer' },
    { trigger: 'legend-item:mouseleave', action: 'cursor:default' },
  ],
  start: [
    { trigger: 'legend-item:click', action: 'list-unchecked:toggle' },
    { trigger: 'legend-item:click', action: 'data-filter:filter' },
  ],
});
```

- 触发的对象：图例项 legend-item
- action 有 3 个
  - 鼠标 cursor
  - 列表取消选中：list-unchecked
  - 数据过滤：data-filter

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*6RfZTr4ytVYAAAAAAAAAAABkARQnAQ" style="width: 339px;">

### legend-visible-filter

分类图例的图形过滤，点击图例对应的图形隐藏/显示，这个交互不会引起坐标轴的变化

```javascript
// 筛选图形
registerInteraction('legend-visible-filter', {
  showEnable: [
    { trigger: 'legend-item:mouseenter', action: 'cursor:pointer' },
    { trigger: 'legend-item:mouseleave', action: 'cursor:default' },
  ],
  start: [
    { trigger: 'legend-item:click', action: 'list-unchecked:toggle' },
    { trigger: 'legend-item:click', action: 'element-filter:filter' },
  ],
});
```

- 触发的对象：图例项 legend-item
- action 有 3 个
  - 鼠标 cursor
  - 列表取消选中：list-unchecked
  - 数据过滤：data-filter

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*QH0LR42VJiYAAAAAAAAAAABkARQnAQ" style="width: 339px;">

注意：由于内置了 legend-filter 交互，所以使用该交互时移除掉  legend-filter 交互

```javascript
chart.removeInteraction('legend-filter');
chart.interaction('legend-visible-filter');
```

### continuous-filter

连续图例的数据过滤，数据过滤会导致坐标轴的变化

```javascript
// 筛选数据
registerInteraction('continuous-filter', {
  start: [{ trigger: 'legend:valuechanged', action: 'data-filter:filter' }],
});
```

- 触发的对象：图例 legend
- 触发事件：valuechanged

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*FUwdSJGCL-oAAAAAAAAAAABkARQnAQ" style="width: 339px;">

- action 是数据过滤的 data-filter

### continuous-visible-filter

仅仅过滤图形，而不引起坐标轴的变化

```javascript
// 筛选数据
registerInteraction('continuous-visible-filter', {
  start: [{ trigger: 'legend:valuechanged', action: 'element-filter:filter' }],
});
```

- action 是数据过滤的 element-filter

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*SC02SJHZ_BYAAAAAAAAAAABkARQnAQ" style="width: 339px;">

注意：由于内置了 continuous-filter 交互，所以使用该交互时移除掉  continuous-filter  交互

```javascript
chart.removeInteraction('continuous-filter');
chart.interaction('continuous-visible-filter');
```

### legend-active

图例项 active，对应的图表元素也 active

```javascript
// legend hover，element active
registerInteraction('legend-active', {
  start: [{ trigger: 'legend-item:mouseenter', action: ['list-active:active', 'element-active:active'] }],
  end: [{ trigger: 'legend-item:mouseleave', action: ['list-active:reset', 'element-active:reset'] }],
});
```

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*D1VMTYFFPTcAAAAAAAAAAABkARQnAQ" style="width: 339px;">

### legend-highlight

图例项高亮，对应的图表元素也高亮

```javascript
// legend hover，element active
registerInteraction('legend-highlight', {
  start: [{ trigger: 'legend-item:mouseenter', action: ['list-highlight:highlight', 'element-highlight:highlight'] }],
  end: [{ trigger: 'legend-item:mouseleave', action: ['list-highlight:reset', 'element-highlight:reset'] }],
});
```

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*k_HTQa-iszoAAAAAAAAAAABkARQnAQ" style="width: 339px;">

### axis-label-highlight

坐标轴文本高亮，对应的图表元素也高亮

```javascript
// legend hover，element active
registerInteraction('axis-label-highlight', {
  start: [{ trigger: 'axis-label:mouseenter', action: ['list-highlight:highlight', 'element-highlight:highlight'] }],
  end: [{ trigger: 'axis-label:mouseleave', action: ['list-highlight:reset', 'element-highlight:reset'] }],
});
```

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*_JebQZWT-40AAAAAAAAAAABkARQnAQ" style="width: 339px;">

### element-list-highlight

鼠标触发图表元素高亮，同时对应的列表组件（图例、坐标轴文本）都高亮

```javascript
// legend hover，element active
registerInteraction('element-list-highlight', {
  start: [{ trigger: 'element:mouseenter', action: ['list-highlight:highlight', 'element-highlight:highlight'] }],
  end: [{ trigger: 'element:mouseleave', action: ['list-highlight:reset', 'element-highlight:reset'] }],
});
```

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*7MrDT5qjPAgAAAAAAAAAAABkARQnAQ" style="width: 339px;">

### brush

框选过滤图形

```javascript
registerInteraction('brush', {
  showEnable: [
    { trigger: 'plot:mouseenter', action: 'cursor:crosshair' },
    { trigger: 'plot:mouseleave', action: 'cursor:default' },
  ],
  start: [
    {
      trigger: 'plot:mousedown',
      action: ['brush:start', 'rect-mask:start', 'rect-mask:show'],
    },
  ],
  processing: [
    {
      trigger: 'plot:mousemove',
      action: ['rect-mask:resize'],
    },
  ],
  end: [
    {
      trigger: 'plot:mouseup',
      action: ['brush:filter', 'brush:end', 'rect-mask:end', 'rect-mask:hide'],
    },
  ],
  rollback: [{ trigger: 'dblclick', action: ['brush:reset'] }],
});
```

- 触发对象都是 plot
- 相关的 Action 有 cursor, brush, rect-mask

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*tKSkR6peM2MAAAAAAAAAAABkARQnAQ" style="width: 339px;">

### brush-x

把上面 brush Action 换成 brush-x 即成为新的交互，仅框选 x 轴相关的数据

### brush-y

把上面 brush Action 换成 brush-y 即成为新的交互，仅框选 y 轴相关的数据

### brush-visible

框选过滤时仅仅是过滤图形，而不是过滤数据

```javascript
registerInteraction('brush-visible', {
  showEnable: [
    { trigger: 'plot:mouseenter', action: 'cursor:crosshair' },
    { trigger: 'plot:mouseleave', action: 'cursor:default' },
  ],
  start: [
    {
      trigger: 'plot:mousedown',
      action: ['rect-mask:start', 'rect-mask:show', 'element-range-highlight:start'],
    },
  ],
  processing: [
    {
      trigger: 'plot:mousemove',
      action: ['rect-mask:resize', 'element-range-highlight:highlight'],
    },
    { trigger: 'mask:end', action: ['element-filter:filter'] },
  ],
  end: [
    {
      trigger: 'plot:mouseup',
      action: ['rect-mask:end', 'rect-mask:hide', 'element-range-highlight:end', 'element-range-highlight:clear'],
    },
  ],
  rollback: [
    {
      trigger: 'dblclick',
      action: ['element-filter:clear'],
    },
  ],
});
```

## 交互反馈 Action 列表

上面的交互语法中，我们使用大量的 Action，每个 Action 都是对某个触发的响应，G2 提供几个大类别的 Action

- 鼠标的 Action
- Chart/View 上的 Action
- 图表元素 Element 的 Action
- 组件的 Action
- 数据操作的 Action
- 辅助交互图形的 Action

## 鼠标的 Action

鼠标的 Action 只有一个： cursor

### cursor

鼠标的 Action `cursor` 用于显示各种鼠标的形状，每种形状有一个方法：

- default() 默认的鼠标形状
- pointer() 光标呈现为指示链接的指针（一只手）
- move() 此光标指示某对象可被移动。
- crosshair() 光标呈现为十字线。
- wait() 此光标指示程序正忙（通常是一只表或沙漏）。
- help() 此光标指示可用的帮助（通常是一个问号或一个气球）。
- text() 此光标指示文本。
- eResize() 此光标指示矩形框的边缘可被向右（东）移动。
- wResize() 此光标指示矩形框的边缘可被向左（西）移动。
- nResize() 此光标指示矩形框的边缘可被向上（北）移动。
- sResize() 此光标指示矩形框的边缘可被向下（南）移动。
- neResize() 光标指示可移动的方向 右上方（东北）
- nwResize() 光标指示可移动的方向 左上方（西北）
- seResize() 光标指示可移动的方向右下方（东南）
- swResize() 光标指示可移动的方向左下方（西南）
- nsResize() 光标指示可以在上下方向移动
- ewResize() 光标指示可以在左右方向移动

## Chart/View 的 Action

Chart 和 View 上的 Action 用户控制视图的变化，目前支持的有：

- view-move
- scale-translate
- scale-zoom

### view-move

用于移动 View 的位置，支持以下几个方法：

- start() 开始移动
- end() 结束移动
- move() 移动
- reset() 回滚，恢复初始位置

### scale-translate

通过改变 scale 的位移，改变整个视图的位置变化，可以实现图表内部绘制区域的变化

- start() 开始移动
- end() 结束移动
- translate() 修改 scale 的值
- reset() 回滚，恢复初始状态

### scale-zoom

- zoomIn() 缩小
- zoomOut() 放大
- reset() 恢复

## Element 的 Action

图表元素 Element 的 Action 大都与状态相关，支持的 Action 有：

- element-active
- element-single-active
- element-range-active
- element-selected
- element-single-selected
- element-range-selected
- element-highlight
- element-single-highlight
- element-range-highlight
- element-filter
- element-sibling-filter
- element-sibling-highlight
- element-link-by-color

Element 的 Action 可以响应的触发源：

- 直接在图表元素 Element 上的事件，例如：element:mousedown, element:mouseenter 等
- 来自组件的事件， 例如： 'legend-item:mouseenter'

### element-active

用于设置和取消图表元素的 active，支持多个元素一起 active 有以下方法：

- active() 设置当前触发事件相关元素的 active
- toggle() 设置/取消当前触发事件相关元素的 active
- reset() 取消当前触发事件相关元素的 active
- clear() 取消所有元素的 active

### element-single-active

用于设置和取消图表元素的 active，只允许单个元素 active 有以下方法：

- active() 设置当前触发事件相关元素的 active
- toggle() 设置/取消当前触发事件相关元素的 active
- reset() 取消当前触发事件相关元素的 active

### element-selected

用于设置和取消图表元素的 selected，支持多个元素一起 selected 有以下方法：

- selected() 设置当前触发事件相关元素的 selected
- toggle() 设置/取消当前触发事件相关元素的 selected
- reset() 取消当前触发事件相关元素的 selected
- clear() 取消所有元素的 selected

### element-single-selected

用于设置和取消图表元素的 selected ，只允许单个元素 selected 有以下方法：

- selected() 设置当前触发事件相关元素的 selected
- toggle() 设置/取消当前触发事件相关元素的 selected
- reset() 取消当前触发事件相关元素的 selected

### element-highlight

用于设置和取消图表元素的 highlight，支持多个元素一起 highlight 有以下方法：

- highlight() 设置当前触发事件相关元素的 highlight
- toggle() 设置/取消当前触发事件相关元素的 highlight
- reset() 取消当前触发事件相关元素的 highlight
- clear() 取消所有元素的 highlight

在 element-highlight 的基础上额外增加了两个 action :

- element-highlight-by-x，在 一个 element 上高亮时，同时高亮 x 值相同的 elements
- element-highlight-by-color,  在 一个 element 上高亮时，同时高亮 color 相同的 elements

### element-single-highlight

用于设置和取消图表元素的 highlight ，只允许单个元素 highlight 有以下方法：

- highlight() 设置当前触发事件相关元素的 highlight
- toggle() 设置/取消当前触发事件相关元素的 highlight
- reset() 取消当前触发事件相关元素的 highlight

### element-range-highlight

用于设置和取消图表元素的 highlight ，允许框选 highlight 有以下方法：

- start() 开始框选
- end() 结束框选
- highlight() 高亮框选内部的元素
- clear() 清理框选的元素

`注意`：如果事件由 mask 触发，则可以直接调用 highlight，而不需要 start 和 end

### element-sibling-highlight

图表元素高亮时，对应的其他 view 的图形也同时高亮，这个 Action 是从 element-range-highlight 扩展出来的，可以配合 element-range-highlight 一起使用：

- highlight() 设置当前触发事件相关元素对应的其他 View 上的元素的 highlight
- clear() 取消相关元素的 highlight

### element-filter

图表元素的过滤，支持来自图例（分类和连续）、坐标轴文本的触发，有以下方法：

- filter() 过滤
- reset() 取消过滤

### element-link-by-color

用于连接相同颜色的图表元素，一般用于层叠柱状图，有以下方法：

- link() 连接
- unlink() 取消连接
- clear() 清除所有连接

<image src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*KqE9SpqUKpcAAAAAAAAAAABkARQnAQ" width="359"/>

## 数据操作的 Action

当前仅提供了数据过滤的 Action：

- data-filter
- brush
- brush-x
- brush-y
- sibling-filter
- sibling-x-filter
- sibling-y-filter

### data-filter

数据过滤的触发同 element-filter 一样支持图例和坐标文本的事件，但仅支持一个 filter 方法

- filter() 过滤

### brush

数据的范围过滤，同时支持 x，y 的过滤，需要理解范围过滤的周期:

- start() 指定范围过滤的起始位置
- filter() 过滤
- end() 结束过滤
- reset() 取消当前 brush 导致的过滤

如果未指定 start() 无法进行 filter()，如果不结束 end() 则容易引起错误，看一个框选过滤的示例:

```javascript
registerInteraction('element-brush', {
  showEnable: [
    { trigger: 'plot:mouseenter', action: 'cursor:crosshair' },
    { trigger: 'plot:mouseleave', action: 'cursor:default' },
  ],
  start: [
    {
      trigger: 'plot:mousedown',
      action: ['brush:start', 'rect-mask:start', 'rect-mask:show'],
    },
  ],
  processing: [
    {
      trigger: 'plot:mousemove',
      action: ['rect-mask:resize'],
    },
  ],
  end: [
    {
      trigger: 'plot:mouseup',
      action: ['brush:filter', 'brush:end', 'rect-mask:end', 'rect-mask:hide'],
    },
  ],
  rollback: [{ trigger: 'dblclick', action: ['brush:reset'] }],
});
```

- mousedown 是开始过滤 start()
- mouseup 时对数据进行过滤 filter() ，同时设置结束 end()

如果不设置结束 end ，则用户在外部 mousedown，移动到画布上时 mouseup 会直接触发 filter

### brush-x

数据的范围过滤，仅支持 x 坐标轴范围的过滤，同样有四个方法：

- start() 指定范围过滤的起始位置
- filter() 过滤
- end() 结束过滤
- reset() 取消当前 brush 导致的过滤

### brush-y

数据的范围过滤，仅支持 y 坐标轴范围的过滤，同样有四个方法：

- start() 指定范围过滤的起始位置
- filter() 过滤
- end() 结束过滤
- reset() 取消当前 brush 导致的过滤

### sibling-filter

数据范围过滤，但不在当前的 view 上生效，而在当前的 view 同一层级的其他 views 上生效，用于实现联动过滤

- start() 指定范围过滤的起始位置
- filter() 过滤
- end() 结束过滤
- reset() 取消当前 brush 导致的过滤

### sibling-x-filter

仅作用于 x 轴的过滤

### sibling-y-filter

仅作用于 y 轴的过滤

## 组件 Action

组件允许的交互都需要通过 Action 来体现，目前支持的 Action 有：

- tooltip
- list-active
- list-highlight
- list-unchecked
- list-selected

为了用户使用方面我们还从 list-highlight 中扩展出两个 Action

- legend-item-highlight
- axis-label-highlight

### tooltip

显示隐藏 tooltip 的 Action 提供了两个方法：

- show()
- hide()

### list-active

分类图例项和坐标轴文本高亮的 Action，有下面几个方法：

- active() 设置 active
- reset() 取消 active
- toggle() 设置或者取消 active
- clear() 取消所有的 active

### list-highlight

分类图例项和坐标轴文本高亮的 highlight , 有下面几个方法：

- highlight() 设置 highlight
- reset() 取消 highlight
- toggle() 设置或者取消 highlight
- clear() 取消所有的 highlight

### legend-item-highlight

是从 list-highlight 扩展出来的 Action，在 Element 上触发时仅高亮对应图例的选项，而不会影响坐标轴文本，同样有 4 个方法：

- highlight() 设置 highlight
- reset() 取消 highlight
- toggle() 设置或者取消 highlight
- clear() 取消所有的 highlight

### axis-label-highlight

是从 list-highlight 扩展出来的 Action，在 Element 上触发时仅高亮对应坐标轴文本，而不会影响图例项，同样有 4 个方法：

- highlight() 设置 highlight
- reset() 取消 highlight
- toggle() 设置或者取消 highlight
- clear() 取消所有的 highlight

### list-unchecked

由于图例项和坐标轴文本默认状态都是 checked ，所以我们实现了 list-unchecked 的 Action，支持的方法：

- unchecked() 设置 unchecked
- reset() 取消 unchecked
- toggle() 设置或者取消 unchecked
- clear() 取消所有的 unchecked

### list-selected

分类图例项和坐标轴文本高亮的 selected , 有下面几个方法：

- selected() 设置 selected
- reset() 取消 selected
- toggle() 设置或者取消 selected
- clear() 取消所有的 selected

## 辅助交互的 Action

在交互过程中辅助出现的图形，目前仅实现了几种常见的：

- active-region
- mask 遮罩层，内置了几种 mask
  - rect-mask
  - circle-mask
  - path-mask
- button 按钮
  - reset-button 恢复按钮

### active-region

鼠标在画布上移动是，对应的区域出现背景框，有两个方法：

- show() 显示背景框
- hide() 隐藏背景框

### rect-mask

在画布上进行框选，出现矩形的遮罩层：

- start() 开始框选
- show() 显示遮罩层
- resize() 改变大小
- hide() 隐藏遮罩层
- end() 结束框选

### circle-mask

在画布上进行框选，出现圆形的遮罩层,有以下方法：

- start() 开始框选
- show() 显示遮罩层
- resize() 改变大小
- hide() 隐藏遮罩层
- end() 结束框选

### path-mask

在画布上进行框选，在多个点上形成 path，有以下方法

- start() 开始框选
- show() 显示遮罩层
- addPoint() 添加一个点
- hide() 隐藏遮罩层
- end() 结束框选

### reset-button

在画布右上角出现一个恢复按钮，按钮图形上有 name: 'reset-button'，仅有两个方法：

- show() 显示
- hide() 隐藏

## 更多

本文中仅介绍了如何使用交互，而所有交互都是通过交互语法搭配而成的，需要自定义交互的用户可以参考 [交互语法](../concepts/interaction)  和 [自定义交互](../developer/registerinteraction)。
