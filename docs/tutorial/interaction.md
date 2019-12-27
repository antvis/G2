---
title: 交互
order: 10
---

## 使用交互

G2 4.0 所有的交互都不再内置，需要在 Chart/View 上声明，以 tooltip 为例：

```typescript
chart.interaction('tooltip');
```

### 接口定义

#### 交互的接口定义：

- interaction(name, [cfg])

  - name: 交互的名称，例如 ：`tooltip`, `legend-active` 等，详情查看下面的 [内置的交互列表](#内置的交互列表)
  - cfg: 交互的配置项，可空，所有内置的交互可以覆盖默认交互的各个环节，每个环节都是一个数组，并非每个环节都是必须的，详情可以查看各个交互的详细定义：

    - showEnable：标识交互可以发生
    - start: 交互开始
    - processing: 交互持续
    - end: 交互结束
    - rollback: 回滚

    ```js
    chart.interaction('tooltip', {
      start: [{ trigger: 'plot:click', action: 'tooltip:show' }],
    });
    ```

#### 交互环节的定义

每个环节的定义示例：

```js
start: [{ trigger: 'plot:mousedown', action: 'actionName:method' }];
```

- trigger: 交互环节的触发，包括触发对象和触发事件 'element:eventName'
- action: 响应，包括 Action 和 Action 的方法
  除此之外，还支持
- isEnable(context): boolean 是否可以触发的回调函数，context 的定义参考：[交互上下文](#交互上下文)
- callback(context): 交互阶段执行后的回调函数

以 tooltip 为例，tooltip 交互的定义为：

```js
// 注册 tooltip 的 interaction
registerInteraction('tooltip', {
  start: [{ trigger: 'plot:mousemove', action: 'tooltip:show' }],
  end: [{ trigger: 'plot:mouseleave', action: 'tooltip:hide' }],
});
```

### 内置的交互列表

这里列出每个内置的交互和其定义，使用到的 trigger 和 Action 在下文中查找

#### tooltip

控制 Tooltip 的显示隐藏，其定义：

```js
// 注册 tooltip 的 interaction
registerInteraction('tooltip', {
  start: [{ trigger: 'plot:mousemove', action: 'tooltip:show' }],
  end: [{ trigger: 'plot:mouseleave', action: 'tooltip:hide' }],
});
```

- 触发对象 plot，图表的绘图区域
- action 是 tooltip

#### active-region

鼠标在画布上移动时对应位置的分类出现背景框

```js
// 出现背景框
registerInteraction('active-region', {
  start: [{ trigger: 'plot:mousemove', action: 'active-region:show' }],
  end: [{ trigger: 'plot:mouseleave', action: 'active-region:hide' }],
});
```

- 触发对象 plot，图表的绘图区域
- action 是 active-region

#### element-active

鼠标移入图表元素（柱状图的柱子、点图的点等）时触发 active

```js
// 移动到 elment 上 active
registerInteraction('element-active', {
  start: [{ trigger: 'element:mouseenter', action: 'element-active:active' }],
  end: [{ trigger: 'element:mouseleave', action: 'element-active:reset' }],
});
```

- 触发对象是图表元素 Element
- action 是 element-active

#### element-selected

点击选中图表元素、再次点击取消，允许多选

```js
// 点击选中，允许取消
registerInteraction('element-selected', {
  start: [{ trigger: 'element:click', action: 'element-seleted:toggle' }],
});
```

#### element-single-selected

单选图表元素，下次点击允许取消

```js
// 点击选中，允许取消
registerInteraction('element-single-selected', {
  start: [{ trigger: 'element:click', action: 'element-single-seleted:toggle' }],
});
```

#### pie-selected

饼图的点击选中，仅单选，允许取消

```js
// 饼图的选中
registerInteraction('pie-selected', {
  start: [
    {
      trigger: 'interval:click',
      isEnable(context) {
        const coord = context.view.getCoordinate();
        return coord.type === 'theta';
      },
      action: 'element-seleted:toggle',
    },
  ],
});
```

- 触发对象是图表元素 interval, 'interval' 是 element 在 interval 的 geometry 下的别名
- action 是 element-seleted

#### element-highlight

图表元素的高亮

```js
// 点击选中，允许取消
registerInteraction('element-highlight', {
  start: [{ trigger: 'element:mouseenter', action: 'element-highlight:highlight' }],
  end: [{ trigger: 'element:mouseleave', action: 'element-highlight:reset' }],
});
```

- 触发对象是图表元素 element
- action 是 element-seleted

#### legend-filter

分类图例的数据过滤

```js
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

#### legend-visible-filter

分类图例的图形过滤，点击图例对应的图形隐藏/显示

```js
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

#### continuous-filter

连续图例的数据过滤

```js
// 筛选数据
registerInteraction('continuous-filter', {
  start: [{ trigger: 'legend:valuechanged', action: 'data-filter:filter' }],
});
```

- 触发的对象：图例 legend
- 触发事件：valuechanged
- action 是数据过滤的 data-filter

#### continuous-visible-filter

```js
// 筛选数据
registerInteraction('continuous-visible-filter', {
  start: [{ trigger: 'legend:valuechanged', action: 'element-filter:filter' }],
});
```

#### legend-active

图例项 active，对应的图表元素也 active

```js
// legend hover，element active
registerInteraction('legend-active', {
  start: [{ trigger: 'legend-item:mouseenter', action: ['list-active:active', 'element-active:active'] }],
  end: [{ trigger: 'legend-item:mouseleave', action: ['list-active:reset', 'element-active:reset'] }],
});
```

#### legend-highlight

图例项高亮，对应的图表元素也高亮

```js
// legend hover，element active
registerInteraction('legend-highlight', {
  start: [{ trigger: 'legend-item:mouseenter', action: ['list-highlight:highlight', 'element-highlight:highlight'] }],
  end: [{ trigger: 'legend-item:mouseleave', action: ['list-highlight:reset', 'element-highlight:reset'] }],
});
```

#### axis-label-highlight

坐标轴文本高亮，对应的图表元素也高亮

```js
// legend hover，element active
registerInteraction('axis-label-highlight', {
  start: [{ trigger: 'axis-label:mouseenter', action: ['list-highlight:highlight', 'element-highlight:highlight'] }],
  end: [{ trigger: 'axis-label:mouseleave', action: ['list-highlight:reset', 'element-highlight:reset'] }],
});
```

#### element-list-highlight

鼠标触发图表元素高亮，同时对应的列表组件（图例、坐标轴文本）都高亮

```js
// legend hover，element active
registerInteraction('element-list-highlight', {
  start: [{ trigger: 'element:mouseenter', action: ['list-highlight:highlight', 'element-highlight:highlight'] }],
  end: [{ trigger: 'element:mouseleave', action: ['list-highlight:reset', 'element-highlight:reset'] }],
});
```

#### element-brush

框选过滤图形

```js
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

- 触发对象都是 plot
- 相关的 Action 有 cursor, brush, rect-mask

#### element-brsh-x

把上面 brush Action 换成 brush-x 即成为新的交互，仅框选 x 轴相关的数据

#### element-brsh-y

把上面 brush Action 换成 brush-y 即成为新的交互，仅框选 y 轴相关的数据

## 自定义交互

所有内置的交互都是通过自定义交互的代码实现的，G2 住的交互的接口定义为：

```js
G2.registerInteraction(name, InteractionClass | InteractionSteps);
```

G2 提供了两种注册自定交互的方式

- 基于 Interaction 基类继承自己的 Interaction 类，所以上面接口的第二个方式是一个继承 Interaction 的类
- 通过交互语法组合交互，上面接口第二个方法提供的时[交互环节的定义](#交互环节的定义)

### 使用类继承的方式

为了兼容 G2 3.x 的交互定义方式，在 G2 4.0 中我们依然保留了类继承的方式来实现交互，首先我们来看 Interaction 类的定义：

```js
/*
 * 交互的基类
 */
class Interaction {
  /** view 或者 chart */
  protected view: View;
  /** 配置项 */
  protected cfg: LooseObject;
  constructor(view: View, cfg: LooseObject) {
    this.view = view;
    this.cfg = cfg;
  }

  public init() {
    this.initEvents();
  }

  protected initEvents() {}

  protected clearEvents() {}

  public destroy() {
    this.clearEvents();
  }
}
```

继承 Interaction 时一般仅需要绑定事件、移除事件

```js
import { Interaction } from G2;
class MyInteraction extends Interaction {
  protected initEvents() {
    const view = this.view;
    view.on('mousedown', ev => this.onMouseDown)
  }

  onMouseDown = ev => {
    // do any thing
  }

  protected clearEvents() {
    const view = this.view;
    view.off('mousedown', ev => this.onMouseDown)
  }
}

G2.registerInteraction('my-interaction', MyInteraction);
```

### 使用交互语法组合

由于交互都是有多个交互环节构成，所以在这种方式下，你进需要组合你需要的交互环节，在每个环节中指定 trigger 和 Action 即可，我们以两个 Interaction 来说明

- 允许对 tooltip 进行锁定的交互
- 鼠标移动到坐标轴文本上，对应的图表元素高亮

#### 允许锁定的 tooltip

我们可以参考默认 tooltip 的实现， 有两个环节 start 和 end

```js
// 注册 tooltip 的 interaction
registerInteraction('tooltip', {
  start: [{ trigger: 'plot:mousemove', action: 'tooltip:show' }],
  end: [{ trigger: 'plot:mouseleave', action: 'tooltip:hide' }],
});
```

但是允许锁定 tooltip 则需要增加两个环节

- 锁定 tooltip
- 解除 tooltip 的锁定

```js
// 注册 tooltip 的 interaction
registerInteraction('locked-tooltip', {
  start: [{ trigger: 'plot:mousemove', action: 'tooltip:show' }],
  processing: [
    {
      trigger: 'plot:click',
      isEnable(context) {
        return !context.view.isTooltipLocked();
      },
      action: (context) => {
        context.view.lockTooltip();
      },
    },
    {
      trigger: 'plot:click',
      isEnable(context) {
        return context.view.isTooltipLocked();
      },
      action: (context) => {
        context.view.unlockTooltip();
      },
    },
  ],
  end: [{ trigger: 'plot:mouseleave', action: 'tooltip:hide' }],
});
```

#### active 坐标轴文本

这个交互我们可以分拆为两个环节：

- 鼠标移动进入坐标轴文本，对应的坐标轴文本 active，对应的 element active
- 鼠标移动出坐标轴文本， 对应的坐标轴文本取消 active，对应的 element 取消 active

通过上面的分析，我们可以发现

- 触发对象是 axis-label，事件是 'mouseenter' 和 'mouseleave'
- 相关的 Action 是坐标轴文本 active 和图表元素 Element active 的 Action
  查找 [支持的 Action] 我们可以发现，这两个 Action 分别为:
- list-highlight: 列表组件 axis 和 component 的列表项 a ctive
- element-highlight：图表元素 active

最终的交互语法是：

```js
registerInteraction('axis-label-highlight', {
  start: [{ trigger: 'axis-label:mouseenter', action: ['list-active:active', 'element-active:active'] }],
  end: [{ trigger: 'axis-label:mouseleave', action: ['list-active:reset', 'element-active:reset'] }],
});
```

### 交互上下文

交互的各个环节之间需要一些上下文，反馈 Action 也需要了解触发 Trigger 的一些信息，这些信息除了在内置的 Action 中使用外，可以在 isEnable 和 callback 中使用，G2 4.0 提供了 InteractionContext 类来实现这些功能，其定义为：

```js
/** 交互上下文的接口定义 */
export interface IInteractionContext extends LooseObject {
  /** 事件对象 */
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
  isInView();
  /**
   * 是否在组件的包围盒内
   * @param name 组件名，可省略
   */
  isInComponent(name?: string);
  /**
   * 销毁
   */
  destroy();
}
```

- cache 方法可以缓存信息
- isInView 和 isInComponent 判定是否在 View 或者 Component 内部，经常在 isEnable 方法中使用

## 支持的 Action

上面的交互语法中，我们使用大量的 Action，每个 Action 都是对某个触发的响应，G2 提供几个大类别的 Action

- 鼠标的 Action
- Chart/View 上的 Action
- 图表元素 Element 的 Action
- 组件的 Action
- 数据操作的 Action
- 辅助交互图形的 Action

### 鼠标的 Action

鼠标的 Action 只有一个： cursor

#### cursor

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

### Chart/View 的 Action

暂未实现

### Element 的 Action

图表元素 Element 的 Action 大都与状态相关，支持的 Action 有：

- element-active
- element-single-active
- element-range-active
- element-selected
- element-single-selected
- element-range-selected
- pie-selected
- element-highlight
- element-single-highlight
- element-range-highlight
- element-filter

Element 的 Action 可以响应的触发源：

- 直接在图表元素 Element 上的事件，例如：element:mousedown, element:mouseenter 等
- 来自组件的事件， 例如： legend-item:mouseenter

#### element-active

用于设置和取消图表元素的 active，支持多个元素一起 active 有以下方法：

- active() 设置当前触发事件相关元素的 active
- toggle() 设置/取消当前触发事件相关元素的 active
- reset() 取消当前触发事件相关元素的 active
- clear() 取消所有元素的 active

#### element-single-active

用于设置和取消图表元素的 active，只允许单个元素 active 有以下方法：

- active() 设置当前触发事件相关元素的 active
- toggle() 设置/取消当前触发事件相关元素的 active
- reset() 取消当前触发事件相关元素的 active

#### element-selected

用于设置和取消图表元素的 selected，支持多个元素一起 selected 有以下方法：

- selected() 设置当前触发事件相关元素的 selected
- toggle() 设置/取消当前触发事件相关元素的 selected
- reset() 取消当前触发事件相关元素的 selected
- clear() 取消所有元素的 selected

#### element-single-selected

用于设置和取消图表元素的 selected ，只允许单个元素 selected 有以下方法：

- selected() 设置当前触发事件相关元素的 selected
- toggle() 设置/取消当前触发事件相关元素的 selected
- reset() 取消当前触发事件相关元素的 selected

#### pie-selected

仅用于饼图的 selected ，因为饼图的选中需要沿着圆心向外平移，所以单独实现

- selected() 设置当前触发事件相关元素的 selected
- toggle() 设置/取消当前触发事件相关元素的 selected
- reset() 取消当前触发事件相关元素的 selected
- clear() 清除 selected

#### element-highlight

用于设置和取消图表元素的 highlight，支持多个元素一起 highlight 有以下方法：

- highlight() 设置当前触发事件相关元素的 highlight
- toggle() 设置/取消当前触发事件相关元素的 highlight
- reset() 取消当前触发事件相关元素的 highlight
- clear() 取消所有元素的 highlight

#### element-single-highlight

用于设置和取消图表元素的 highlight ，只允许单个元素 highlight 有以下方法：

- highlight() 设置当前触发事件相关元素的 highlight
- toggle() 设置/取消当前触发事件相关元素的 highlight
- reset() 取消当前触发事件相关元素的 highlight

#### element-filter

图表元素的过滤，支持来自图例（分类和连续）、坐标轴文本的触发，有以下方法：

- filter() 过滤
- clear() 取消过滤

### 数据操作的 Action

当前仅提供了数据过滤的 Action：

- data-filter
- brush
- brush-x
- brush-y

#### data-filter

数据过滤的触发同 element-filter 一样支持图例和坐标文本的事件，但仅支持一个 filter 方法

- filter()

#### brush

数据的范围过滤，同时支持 x，y 的过滤，需要理解范围过滤的周期：

- start() 指定范围过滤的起始位置
- filter() 过滤
- end() 结束过滤
  如果未指定 start() 无法进行 filter()，如果不结束 end() 则容易引起错误，看一个框选过滤的示例:

```js
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

#### brush-x

数据的范围过滤，仅支持 x 坐标轴范围的过滤，同样有三个方法：

- start() 指定范围过滤的起始位置
- filter() 过滤
- end() 结束过滤

#### brush-y

数据的范围过滤，仅支持 y 坐标轴范围的过滤，同样有三个方法：

- start() 指定范围过滤的起始位置
- filter() 过滤
- end() 结束过滤

### 组件 Action

组件允许的交互都需要通过 Action 来体现，目前支持的 Action 有：

- tooltip
- list-active
- list-highlight
- list-unchecked
- list-selected

#### tooltip

显示隐藏 tooltip 的 Action 提供了两个方法：

- show()
- hide()

#### list-active

分类图例项和坐标轴文本高亮的 Action，有下面几个方法：

- active() 设置 active
- reset() 取消 active
- toggle() 设置或者取消 active
- clear() 取消所有的 active

#### list-highlight

分类图例项和坐标轴文本高亮的 highlight , 有下面几个方法：

- highlight() 设置 highlight
- reset() 取消 highlight
- toggle() 设置或者取消 highlight
- clear() 取消所有的 highlight

#### list-unchecked

由于图例项和坐标轴文本默认状态都是 checked ，所以我们实现了 list-unchecked 的 Action，支持的方法：

- unchecked() 设置 unchecked
- reset() 取消 unchecked
- toggle() 设置或者取消 unchecked
- clear() 取消所有的 unchecked

#### list-selected

分类图例项和坐标轴文本高亮的 selected , 有下面几个方法：

- selected() 设置 selected
- reset() 取消 selected
- toggle() 设置或者取消 selected
- clear() 取消所有的 selected

### 辅助交互的 Action

在交互过程中辅助出现的图形，目前仅实现了两种：

- active-region
- mask 遮罩层，内置了几种 mask
  - rect-mask
  - circle-mask
  - path-mask

#### active-region

鼠标在画布上移动是，对应的区域出现背景框，有两个方法：

- show() 显示背景框
- hide() 隐藏背景框

#### rect-mask

在画布上进行框选，出现矩形的遮罩层：

- start() 开始框选
- show() 显示遮罩层
- resize() 改变大小
- hide() 隐藏遮罩层
- end() 结束框选

#### circle-mask

在画布上进行框选，出现圆形的遮罩层,有以下方法：

- start() 开始框选
- show() 显示遮罩层
- resize() 改变大小
- hide() 隐藏遮罩层
- end() 结束框选

#### circle-mask

在画布上进行框选，在多个点上形成 path，有以下方法

- start() 开始框选
- show() 显示遮罩层
- addPoint() 添加一个点
- hide() 隐藏遮罩层
- end() 结束框选

## 自定义 Action

自定义 Action 有两个步骤：

- 实现 Action 的继承类
- 注册 Action

### 继承 Action

Action 的接口定义非常简单：

```js
/** 交互反馈的定义 */
export interface IAction {
  /**
   * 交互 action (反馈)的名称
   */
  name: string;
  /**
   * 上下文
   */
  context: IInteractionContext;
  /**
   * 销毁函数
   */
  destroy();
}
```

- name 名称即在交互组合中使用的名称
- destroy 方法销毁在 Action 实现中的资源（图形、数组等）

自定义 Action 时可以基于 [Action 的基类](https://github.com/antvis/G2/blob/4.x/src/interaction/action/base.ts) 继承，也可以基于现有的任何 Action 继承，Action 中的每个方法代表一个反馈行为，实现为无参数的函数，我们来看一下 cursor Action 的实现：

```js
/**
 * 鼠标形状的 Action
 */
class CursorAction extends Action {
  private setCursor(cursor) {
    const view = this.context.view;
    view.getCanvas().setCursor(cursor);
  }

  /**
   * 默认光标（通常是一个箭头）
   */
  public default() {
    this.setCursor('default');
  }

  /** 光标呈现为指示链接的指针（一只手） */
  public pointer() {
    this.setCursor('pointer');
  }
  /** 此光标指示某对象可被移动。 */
  public move() {
    this.setCursor('move');
  }
  /** 光标呈现为十字线。 */
  public crosshair() {
    this.setCursor('crosshair');
  }
  /** 此光标指示程序正忙（通常是一只表或沙漏）。 */
  public wait() {
    this.setCursor('wait');
  }

  /** 此光标指示可用的帮助（通常是一个问号或一个气球）。 */
  public help() {
    this.setCursor('help');
  }

  /** 此光标指示文本。 */
  public text() {
    this.setCursor('text');
  }

  /**
   * 此光标指示矩形框的边缘可被向右（东）移动。
   */
  public eResize() {
    this.setCursor('e-resize');
  }

  /**
   * 此光标指示矩形框的边缘可被向左（西）移动。
   */
  public wResize() {
    this.setCursor('w-resize');
  }

  /**
   * 此光标指示矩形框的边缘可被向上（北）移动。
   */
  public nResize() {
    this.setCursor('n-resize');
  }

  /**
   * 此光标指示矩形框的边缘可被向下（南）移动。
   */
  public sResize() {
    this.setCursor('s-resize');
  }
  /**
   * 光标指示可移动的方向 右上方（东北）
   */
  public neResize() {
    this.setCursor('ne-resize');
  }
  /**
   * 光标指示可移动的方向 左上方（西北）
   */
  public nwResize() {
    this.setCursor('nw-resize');
  }
  /**
   * 光标指示可移动的方向右下方（东南）
   */
  public seResize() {
    this.setCursor('se-resize');
  }
  /**
   * 光标指示可移动的方向左下方（西南）
   */
  public swResize() {
    this.setCursor('sw-resize');
  }

  /**
   * 光标指示可以在上下方向移动
   */
  public nsResize() {
    this.setCursor('ns-resize');
  }
  /**
   * 光标指示可以在左右方向移动
   */
  public ewResize() {
    this.setCursor('ew-resize');
  }
}
```

### 注册 Action

G2 提供了 registerAction 的接口用于注册 Action

```js
G2.registerAction('cursor', CursorAction);
```
