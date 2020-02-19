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

![tooltip.gif](https://cdn.nlark.com/yuque/0/2020/gif/89796/1581670999391-206e5dfd-48a4-4c6c-a083-5fca82e141e4.gif#align=left&display=inline&height=255&name=tooltip.gif&originHeight=512&originWidth=678&size=176190&status=done&style=none&width=338)![active1.gif](https://cdn.nlark.com/yuque/0/2020/gif/89796/1581671279792-271fc84d-bad8-488e-9b14-efabaa8c92e7.gif#align=left&display=inline&height=276&name=active1.gif&originHeight=534&originWidth=684&size=604946&status=done&style=none&width=353)
![check.gif](https://cdn.nlark.com/yuque/0/2020/gif/89796/1581671347827-e0ea95fa-1ede-4e34-ad16-16bba9dcc90e.gif#align=left&display=inline&height=272&name=check.gif&originHeight=534&originWidth=684&size=968975&status=done&style=none&width=348)![legend-error1.gif](https://cdn.nlark.com/yuque/0/2020/gif/89796/1581671491185-0064d76b-bb08-40a9-917a-2f31b639a4b9.gif#align=left&display=inline&height=252&name=legend-error1.gif&originHeight=512&originWidth=678&size=1226056&status=done&style=none&width=334)

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

添加或者修改交互时的第二个参数 cfg 是来修改已经定义好的交互的行为，G2 4.0 中的交互全部由交互语法组装而成，可以参考 [交互的环节](https://www.yuque.com/antv/g2-v4-docs/interaction-grammar)，我们在这里不对交互语法进行详细的介绍。

```javascript
chart.interaction('tooltip');
chart.interaction('element-active');
chart.interaction('legend-visible-filter');

chart.removeInteraction('element-active');
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
- action 触发的反馈，可以是字符串也可以是数组，是所有内置和用户自定义的 Action，参考 [交互反馈 Action 列表](#rQHCf) 。
  - 字符串由 ’actionName:method‘ 组成
  - 列表时可以使用相同的 action ，也可以使用不同的 action ，例如: ['element-active:clear', 'element-active:active', 'mask:clear']

除了 trigger 和 action 之外还有其他几个属性：

- isEnable(context): 是否可以触发
- callback(context): 触发后执行完所有 action 的方法后会调用回调函数
- once: boolean， 是否在一个环节内仅能执行一次

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

![tooltip.gif](https://cdn.nlark.com/yuque/0/2020/gif/89796/1581670999391-206e5dfd-48a4-4c6c-a083-5fca82e141e4.gif#align=left&display=inline&height=378&name=tooltip.gif&originHeight=512&originWidth=678&size=176190&status=done&style=none&width=501)

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

![region.gif](https://cdn.nlark.com/yuque/0/2020/gif/89796/1581673783631-e7401eea-a3f5-42f1-a018-a3c37644fe2f.gif#align=left&display=inline&height=394&name=region.gif&originHeight=534&originWidth=684&size=245080&status=done&style=none&width=505)

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

![image.png](https://cdn.nlark.com/yuque/0/2020/png/89796/1581674042055-5b476153-1a2e-44f3-bda1-f24858f974ea.png#align=left&display=inline&height=265&name=image.png&originHeight=529&originWidth=679&size=19683&status=done&style=none&width=339.5)![active2.gif](https://cdn.nlark.com/yuque/0/2020/gif/89796/1581674109917-49c0b632-88c9-45a2-bf52-61dd3b4cf3b0.gif#align=left&display=inline&height=266&name=active2.gif&originHeight=534&originWidth=684&size=189068&status=done&style=none&width=341)

### element-selected

点击选中图表元素、再次点击取消，允许多选

```javascript
// 点击选中，允许取消
registerInteraction('element-selected', {
  start: [{ trigger: 'element:click', action: 'element-seleted:toggle' }],
});
```

![selected1.gif](https://cdn.nlark.com/yuque/0/2020/gif/89796/1581932895417-74ca7adb-64cb-41c4-8927-97403bb79b7a.gif#align=left&display=inline&height=357&name=selected1.gif&originHeight=534&originWidth=684&size=750295&status=done&style=none&width=457)

### element-single-selected

单选图表元素，下次点击允许取消

```javascript
// 点击选中，允许取消
registerInteraction('element-single-selected', {
  start: [{ trigger: 'element:click', action: 'element-single-seleted:toggle' }],
});
```

![selected.gif](https://cdn.nlark.com/yuque/0/2020/gif/89796/1581932836159-e27aea1e-5bc7-478b-bae3-3b3e8ada5d95.gif#align=left&display=inline&height=337&name=selected.gif&originHeight=534&originWidth=684&size=454341&status=done&style=none&width=432)

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

![highlight1.gif](https://cdn.nlark.com/yuque/0/2020/gif/89796/1581933309755-c9d02922-ca01-47ac-96b7-8973a359312a.gif#align=left&display=inline&height=332&name=highlight1.gif&originHeight=534&originWidth=684&size=433306&status=done&style=none&width=425)

### element-highlight-by-x

高亮 x 值相同的 element，适用于分组的场景

```javascript
registerInteraction('element-highlight', {
  start: [{ trigger: 'element:mouseenter', action: 'element-highlight-by-x:highlight' }],
  end: [{ trigger: 'element:mouseleave', action: 'element-highlight-by-x:reset' }],
});
```

![highlight2.gif](https://cdn.nlark.com/yuque/0/2020/gif/89796/1581998918628-c94d8e72-6225-470b-910c-7294b84d1212.gif#align=left&display=inline&height=357&name=highlight2.gif&originHeight=534&originWidth=684&size=905333&status=done&style=none&width=457)

### element-highlight-by-color

高亮所有同颜色的 element，适用于层叠的场景

```javascript
registerInteraction('element-highlight', {
  start: [{ trigger: 'element:mouseenter', action: 'element-highlight-by-color:highlight' }],
  end: [{ trigger: 'element:mouseleave', action: 'element-highlight-by-color:reset' }],
});
```

![highlight3.gif](https://cdn.nlark.com/yuque/0/2020/gif/89796/1581998936567-005c7a0b-903b-4118-86af-fb3b56af7894.gif#align=left&display=inline&height=261&name=highlight3.gif&originHeight=534&originWidth=684&size=387858&status=done&style=none&width=334)![highlight4.gif](https://cdn.nlark.com/yuque/0/2020/gif/89796/1581998950236-43ad02b7-4bd6-44f8-8041-cb3f7fdbd47b.gif#align=left&display=inline&height=315&name=highlight4.gif&originHeight=534&originWidth=684&size=192453&status=done&style=none&width=404)

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

![legend-filter.gif](https://cdn.nlark.com/yuque/0/2020/gif/89796/1581933409211-55bcb87d-7a13-43b9-bed8-d3deae46f530.gif#align=left&display=inline&height=375&name=legend-filter.gif&originHeight=534&originWidth=684&size=438419&status=done&style=none&width=480)

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

![legend-filter2.gif](https://cdn.nlark.com/yuque/0/2020/gif/89796/1581933596525-15166500-b373-4f68-b1d1-c1322a0b43cc.gif#align=left&display=inline&height=383&name=legend-filter2.gif&originHeight=534&originWidth=684&size=210440&status=done&style=none&width=490)
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
- 触发事件：valuechanged![legend-error1.gif](https://cdn.nlark.com/yuque/0/2020/gif/89796/1581933664794-80e9b525-496f-4756-aa72-cebb7e2a5328.gif#align=left&display=inline&height=512&name=legend-error1.gif&originHeight=512&originWidth=678&size=1226056&status=done&style=none&width=678)
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

![legend-filter4.gif](https://cdn.nlark.com/yuque/0/2020/gif/89796/1581933889386-3069b630-f607-4b7e-ac96-b39530dd929a.gif#align=left&display=inline&height=365&name=legend-filter4.gif&originHeight=534&originWidth=684&size=252686&status=done&style=none&width=468)
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

![legend-active1.gif](https://cdn.nlark.com/yuque/0/2020/gif/89796/1581934022921-47d5c9a9-0dc6-4ac3-ab4a-bfc34d937234.gif#align=left&display=inline&height=399&name=legend-active1.gif&originHeight=534&originWidth=684&size=463095&status=done&style=none&width=511)

### legend-highlight

图例项高亮，对应的图表元素也高亮

```javascript
// legend hover，element active
registerInteraction('legend-highlight', {
  start: [{ trigger: 'legend-item:mouseenter', action: ['list-highlight:highlight', 'element-highlight:highlight'] }],
  end: [{ trigger: 'legend-item:mouseleave', action: ['list-highlight:reset', 'element-highlight:reset'] }],
});
```

![legend-highlight1.gif](https://cdn.nlark.com/yuque/0/2020/gif/89796/1581934181717-707bfd29-1272-4f97-ba32-a39dd0e832e3.gif#align=left&display=inline&height=361&name=legend-highlight1.gif&originHeight=534&originWidth=684&size=642317&status=done&style=none&width=463)

### axis-label-highlight

坐标轴文本高亮，对应的图表元素也高亮

```javascript
// legend hover，element active
registerInteraction('axis-label-highlight', {
  start: [{ trigger: 'axis-label:mouseenter', action: ['list-highlight:highlight', 'element-highlight:highlight'] }],
  end: [{ trigger: 'axis-label:mouseleave', action: ['list-highlight:reset', 'element-highlight:reset'] }],
});
```

![axis-highlight1.gif](https://cdn.nlark.com/yuque/0/2020/gif/89796/1581935279884-639a1621-2444-44f1-b27c-9fd40346a616.gif#align=left&display=inline&height=407&name=axis-highlight1.gif&originHeight=534&originWidth=684&size=275867&status=done&style=none&width=521)

### element-list-highlight

鼠标触发图表元素高亮，同时对应的列表组件（图例、坐标轴文本）都高亮

```javascript
// legend hover，element active
registerInteraction('element-list-highlight', {
  start: [{ trigger: 'element:mouseenter', action: ['list-highlight:highlight', 'element-highlight:highlight'] }],
  end: [{ trigger: 'element:mouseleave', action: ['list-highlight:reset', 'element-highlight:reset'] }],
});
```

![axis-highlight2.gif](https://cdn.nlark.com/yuque/0/2020/gif/89796/1581935338571-cf47b328-7d4a-4181-8cde-b2ba972706ef.gif#align=left&display=inline&height=422&name=axis-highlight2.gif&originHeight=534&originWidth=684&size=732073&status=done&style=none&width=541)

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
      trigger: 'mousedown',
      isEnable: isPointInView,
      action: ['brush:start', 'rect-mask:start', 'rect-mask:show'],
    },
  ],
  processing: [
    {
      trigger: 'mousemove',
      isEnable: isPointInView,
      action: ['rect-mask:resize'],
    },
  ],
  end: [
    {
      trigger: 'mouseup',
      isEnable: isPointInView,
      action: ['brush:filter', 'brush:end', 'rect-mask:end', 'rect-mask:hide'],
    },
  ],
  rollback: [{ trigger: 'dblclick', action: ['brush:reset'] }],
});
```

- 触发对象都是 plot
- 相关的 Action 有 cursor, brush, rect-mask

![brush1.gif](https://cdn.nlark.com/yuque/0/2020/gif/89796/1581935435388-bc929e72-3af8-462f-91ec-b6756dbdd30e.gif#align=left&display=inline&height=332&name=brush1.gif&originHeight=534&originWidth=684&size=646154&status=done&style=none&width=425)

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
      trigger: 'mouseup',
      isEnable: isPointInView,
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

暂未实现

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

### element-filter

图表元素的过滤，支持来自图例（分类和连续）、坐标轴文本的触发，有以下方法：

- filter() 过滤
- reset() 取消过滤

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
      trigger: 'mousedown',
      isEnable: isPointInView,
      action: ['brush:start', 'rect-mask:start', 'rect-mask:show'],
    },
  ],
  processing: [
    {
      trigger: 'mousemove',
      isEnable: isPointInView,
      action: ['rect-mask:resize'],
    },
  ],
  end: [
    {
      trigger: 'mouseup',
      isEnable: isPointInView,
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

在交互过程中辅助出现的图形，目前仅实现了两种：

- active-region
- mask 遮罩层，内置了几种 mask
  - rect-mask
  - circle-mask
  - path-mask

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

### circle-mask

在画布上进行框选，在多个点上形成 path，有以下方法

- start() 开始框选
- show() 显示遮罩层
- addPoint() 添加一个点
- hide() 隐藏遮罩层
- end() 结束框选

## 更多

本文中仅介绍了如何使用交互，而所有交互都是通过交互语法搭配而成的，需要自定义交互的用户可以参考 [交互语法](https://www.yuque.com/antv/g2-v4-docs/interaction-grammar)  和 [自定义交互](https://www.yuque.com/antv/g2-v4-docs/qsrt5x)
