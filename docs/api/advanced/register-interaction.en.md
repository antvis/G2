---

title: 自定义交互
order: 5
---## 简介

G2 4.0 最大的一个变化是所有的交互不再内置，全部通过交互语法搭配而成，前面章节介绍了[交互的使用](../tutorial/interaction)  本章介绍如何自定义交互。

## 自定义交互

所有内置的交互都是通过自定义交互的代码实现的，G2 住的交互的接口定义为：

```javascript
G2.registerInteraction(name, InteractionClass | InteractionSteps);
```

G2 提供了两种注册自定交互的方式

- 基于 Interaction 基类继承自己的 Interaction 类，所以上面接口的第二个方式是一个继承 Interaction 的类
- 通过交互语法组合交互

### 使用类继承的方式

为了兼容 G2 3.x 的交互定义方式，在 G2 4.0 中我们依然保留了类继承的方式来实现交互，首先我们来看 Interaction 类的定义：

```javascript
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

```javascript
import { Interaction } from '@antv/g2';
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

在交互语法中一个交互可以由多个交互环节组成，每个交互环节可以有多个触发和反馈，所以在配置交互时可以配置每个环节，每个环节都是数组，都有 trigger 和 action

- showEnable：标识交互可以发生
- start: 交互开始
- processing: 交互持续
- end: 交互结束
- rollback: 回滚

每个交互环节有多个触发和反馈构成，每个触发和反馈是一个对象：

```javascript
{
	trigger: 'eventName',
  action: 'actionName:method' | [] | function(context) {},
  isEnable(context) {}, // 可选
  callback(context) {}, // 可选
  once: false // 可选，默认 false
}
```

其中：

- trigger 触发一个交互环节的事件名，是所有 Chart 支持的事件
- action 触发的反馈，可以是字符串也可以是数组，是所有内置和用户自定义的 Action，参考 [交互反馈 Action 列表](../tutorial/interaction/#交互反馈-action-列表) 。
  - 字符串由 ’actionName:method‘ 组成
  - 列表时可以使用相同的 action ，也可以使用不同的 action ，例如: ['element-active:clear', 'element-active:active', 'mask:clear']

除了 trigger 和 action 之外还有其他几个属性：

- isEnable(context): 是否可以触发
- callback(context): 触发后执行完所有 action 的方法后会调用回调函数
- once: boolean， 是否在一个环节内仅能执行一次

由于交互都是有多个交互环节构成，所以在这种方式下，你进需要组合你需要的交互环节，在每个环节中指定 trigger 和 action 即可，我们以两个 Interaction 来说明

- 允许对 tooltip 进行锁定的交互
- 鼠标移动到坐标轴文本上，对应的图表元素高亮

#### 允许锁定的 tooltip

我们可以参考默认 tooltip 的实现， 有两个环节 start 和 end

```javascript
// 注册 tooltip 的 interaction
registerInteraction('tooltip', {
  start: [{ trigger: 'plot:mousemove', action: 'tooltip:show' }],
  end: [{ trigger: 'plot:mouseleave', action: 'tooltip:hide' }],
});
```

但是允许锁定 tooltip 则需要增加两个环节

- 锁定 tooltip
- 解除 tooltip 的锁定

```javascript
// 注册 tooltip 的 interaction
registerInteraction('locked-tooltip', {
  start: [
    {
      trigger: 'plot:click',
      action: context => {
        const locked = context.view.isTooltipLocked();
        if (locked) {
          context.view.unlockTooltip();
        } else {
          context.view.lockTooltip();
        }
      },
    },
    { trigger: 'plot:mousemove', action: 'tooltip:show' },
  ],
  end: [{ trigger: 'plot:mouseleave', action: 'tooltip:hide' }],
});
```

- context 上的方法在[下面定义](#context-上下文)

使用时需要先取消默认的 tooltip 交互
```js
chart.removeInteraction('tooltip');
chart.interaction('locked-tooltip');
```
<image src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*ySVHQo_rA1gAAAAAAAAAAABkARQnAQ" width="359px"/>

#### active 坐标轴文本

这个交互我们可以分拆为两个环节：

- 鼠标移动进入坐标轴文本，对应的坐标轴文本 active，对应的 element active
- 鼠标移动出坐标轴文本， 对应的坐标轴文本取消 active，对应的 element 取消 active

通过上面的分析，我们可以发现

- 触发对象是 axis-label，事件是 'mouseenter' 和 'mouseleave'
- 相关的 Action 是坐标轴文本 active 和图表元素 Element active 的 Action<br />
  查找 [支持的 Action] 我们可以发现，这两个 Action 分别为:
- list-highlight: 列表组件 axis 和 component 的列表项 a ctive
- element-highlight：图表元素 active

最终的交互语法是：

```javascript
registerInteraction('axis-label-highlight', {
  start: [{ trigger: 'axis-label:mouseenter', action: ['list-active:active', 'element-active:active'] }],
  end: [{ trigger: 'axis-label:mouseleave', action: ['list-active:reset', 'element-active:reset'] }],
});
```

### Context 上下文

context 中有大量函数，可以在组合交互语法和自定 Action 时使用，contex 的定义：

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
- 可以通过 context.event.target 或者 context.getCurrentShape() 获取触发的图形

## 自定义 Action

使用交互语法搭配交互时，需要使用到 Action，你可以从 G2 已经内置的 [Action 列表](../tutorial/interaction/#交互反馈-action-列表)  中选取，也可以选择自定义 Action。<br />自定义 Action 有两个步骤：

- 实现 Action 的继承类
- 注册 Action

### 继承 Action

Action 的接口定义非常简单：

```javascript
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

自定义 Action 时可以基于 [Action 的基类](https://github.com/antvis/G2/blob/master/src/interaction/action/base.ts) 继承，也可以基于现有的任何 Action 继承，Action 中的每个方法代表一个反馈行为，实现为无参数的函数，我们来看一下 cursor Action 的实现：

```javascript
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

```javascript
G2.registerAction('cursor', CursorAction);
```
