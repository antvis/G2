---
title: 交互语法
order: 1
---

## 背景

在数据可视化中，交互可以辅助用户更好地观察与了解数据。目前，大多可视化设计者、开发者在定义交互时，一般会为每种交互定义一套确定的流程。例如，在折线图中，当用户移动鼠标到一条折线上时，该折线将会通过某种样式的变化表示反馈，当鼠标离开则恢复原有样式。首先，当前的可视化交互设计中，没有一套统一的流程规范，不规范的交互设计容易出现终端用户不理解、不会用的情况；其次，在一个可视化作品中，每一个交互环节往往是统一的、确定的，这意味着开发者需要针对每一种图表、每一种交互设计都实现一整套交互流程，难以复用；最后，针对多数入门可视化设计者、开发者而言，经验的缺乏将会导致低质量、低效率的交互设计和开发。

## Vega-Lite

### 简介

Vega-Lite: A Grammar of Interactive Graphics 一文基于 Vega（一种图形语法的实现）设计了一套可以快速完成交互式数据可视化的高级语法。它使用「代数」的形式，为分层和多视图显示提供了可视编码规则。用户通过组合选择来指定交互式语义。在 Vega-Lite 中，把「选择 Selection」变成一种抽象的概念，它定义了「输入事件处理 input event processing、兴趣点 points of interest、谓词函数 predicate function for inclusion testing」。Selection 使用输入的数据、定义比例范围、或驱动条件化逻辑来参数化视觉映射。 Vega-Lite 编译器自动综合必要的数据流和事件处理逻辑，用户可以覆盖这些逻辑以进行进一步的自定义。与现有的反应式规范相反，Vega-Lite 选择将交互设计分解为简洁、可枚举的语义单元。

简单来说，Vega-Lite 使用 8 元组表达一个「选择 Selection」：<br />_selection := (name, type, predicate, domain_|_range,
event, init, transforms, resolve)
_

### 缺点

- Selection 不能切换/聚合某些字段或数据；
- 由于 Vega-Lite 系统不支持任意图形，选择框（brush）目前只能是矩形，无法表达更复杂的 brush（例如套索、圆形选择框）；
- 作为高级语法，它们的模型倾向于简洁。默认情况下无法表达高度专业化的技术，例如通过宽松的选择查询时间序列数据。（但是提供了 Selection 公式可以进行扩展）。
- 尚未提供跨视图的标记。例如，使用线段在视觉上链接多个散点图中相同的点（产生类似平行坐标的效果）。

![image.png](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*XKkKTrIxHDcAAAAAAAAAAABkARQnAQ)

另外，Vega-Lite  基于数据映射，通过改变数据映射，通过改变状态量，达到效果。专业的、懂可视化的人去做的。一般人难以理解。Vega-Lite 只能做基于数据交互（只能做现有数据的探索），但有些交互不是数据驱动的。比如 hover 的时候，可以重新走一遍数据映射，但是无法满足交互的中间态的处理。

## G2 交互语法

针对上述现状与问题，我们提出了交互语法，帮助用户增加交互的可能性（自由拼装）、提供交互的质量、加快用户开放交互的速度等。我们希望以用户/人的出发为触发，自然语言可以理解的、符合人的直觉的。希望能够做到任何一句自然语言描述的交互都可以通过我们的交互语法被实现。因此，我们的工作有以下几点贡献：

- 定义一套统一的流程规范，解决不规范的交互设计导致出现终端用户不理解、不会用的问题，提升可视化交互质量；
- 以人的理解为出发，定义一套简洁的交互语法，开发者能够快速搭建交互流程，并且可复用，提升可视化交互搭建效率；
- 针对多数入门可视化设计者、开发者而言，能够通过该语法快速理解、学习可视化的交互。

交互语法将交互过程拆分成多个简单的、原子的环节，这些环节可以通过重新组装，快速地设计和搭建交互流程，从而达到可复用、易用的目的。先看一个基本的使用例子：

<playground path='interaction/element/demo/element-link.ts' rid="interaction-container-1"></playground>

### 交互过程的拆分

我们可以把所有交互拆分成以下几个**环节**，一个交互过程可能包含重复的环节：

- 示能（前置环节）：表示交互可以被触发
- 开始 start：交互开始
- 持续 processing：交互持续
- 结束 end：交互结束
- 暂停 pause：交互暂停
- 回滚 rollback：取消交互，恢复到原始状态

而以上的每一个环节都可以被拆分成两个**原子过程**：

- 触发，交互环节的触发，包括触发对象和触发事件；
  - 对象：被操作或被涉及的图表、图形、元素等对象；
  - 事件：基础交互事件，例如 mouseenter，mousemove，click...。也可以是用户自定义的由基础交互事件复合而成的交互事件。
- 反馈，交互环节的结果，包括反馈对象与结果；
  - 对象：鼠标以及被操作或被涉及的图表、图形、元素等对象；
  - 结果：反馈对象发生的变化，例如鼠标形状变化、被操作对象样式的变化、数据变化等。

#### 示例

框选散点图上的点

- 示能：
  - 触发：
    - 对象：画布；
  - 事件：鼠标移动进画布绘图区域
  - 反馈：
    - 对象：鼠标
    - 结果：形状变成十字
- 开始：
  - 触发
    - 对象：画布
    - 事件：按下鼠标，并滑动鼠标
  - 反馈：
    - 对象：一个遮罩（后文称为 mask）
    - 结果：出现
- 持续 1：
  - 触发
    - 对象：画布
    - 事件：持续滑动鼠标
  - 反馈：
    - 对象：mask
    - 结果：大小随鼠标移动而变化
- 持续 2：
  - 触发
    - 对象：mask
    - 事件：mask 的大小变化
  - 反馈：
    - 对象：被 mask 遮盖到的点
    - 结果：状态变为选中，并有样式变化
- 结束：
  - 触发
    - 对象：画布
    - 事件：鼠标抬起
  - 反馈：
    - 对象：数据，mask
    - 结果：数据过滤，mask 消失
- 回滚：
  - 触发
    - 对象：画布
    - 事件：鼠标双击
  - 反馈：
    - 对象：数据，状态为选中的点
    - 结果：取消数据过滤，状态为选中的节点恢复原始状态和样式

### 上下文

交互语法仅依据触发和反馈依然不够，我们需要考虑触发和反馈之间如何传递信息。除了存储反馈的对象和反馈的对象外，上下文信息还必须具有：

- 当前进行的交互有哪些交互环节，正在执行到哪一步，哪一步已经完成；
- 当前对象、容器的状态。

### 约束

#### 同一交互中环节顺序约束

在一个交互中，可以存在多个相同的环节；而一个环节中也可以同时存在多个触发和反馈。例如，上面的例子中，存在了两个持续环节；结束环节中有两个反馈：数据被过滤，mask 消失。

但交互中，不同环节的发生是遵循一定顺序的。如下图所示的 pipeline，交互持续与结束是在交互开始之后，才能够发生；回滚发生在结束之后。因此，我们需要定义同一交互中的环节顺序约束

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*kH3lSr3T1PIAAAAAAAAAAABkARQnAQ" style="width: 251px;">

#### 不同交互间的冲突约束

由于每个交互有多个交互环节，每个交互环节都独立的触发和反馈。但同样的触发和反馈可能会出现在同一个图表的不同交互中。如下两种情况，我们需要考虑是否存在冲突：<br />**1. 相同的触发，不同的反馈**<br />触发的对象和事件相同时，在不同的交互中会有不同的反馈

- 框选过滤图形交互：触发——鼠标移入 view，反馈——鼠标变成“十字”；触发——拖拽，反馈——出现框选 mask；
- 拖拽 view 交互：触发——鼠标移入 view ，反馈——鼠标变成”手型“，触发——拖拽，反馈—— view 移动。

**2. 不同的触发，相同的反馈**

- 点击 view 的绘图区域交互：触发——点击，反馈——显示临近的图形的 tooltip；
- 在 view 的绘图区域移动交互：触发——移动，反馈——显示临近图形的 tooltip。

因此，我们需要建立冲突约束以解决上述冲突。

#### 触发与反馈搭配约束

每个交互环节中都存在一组 Trigger 和 Action。那么，是否所有的 trigger 和 action 都能组合？如果不能，怎么进行约束？错误搭配的后果是什么？我们需要从下面两个方面考虑如何实际触发与反馈的搭配约束：<br />**<br />**搭配的合理性\*\*<br />我们用几个示例来说明这个问题：

- 鼠标进入 view ，鼠标变成十字形状（合理搭配）
- 鼠标进入 view, legend 的项高亮（不合理搭配）
- 点击图形，图形选中，显示对应的 tooltip，对应的 legend 项高亮（合理搭配）
- 点击图例项，view 上显示 tooltip(不合理搭配）
- 在图例项上 hover，view 上显示 tooltip（合理搭配，但是有些奇怪）
- 鼠标在 view 上移动，临近的图形 active（合理搭配）
- 按下 delete 键，选中的 Element 被移除

**元素之间的关联性**<br />我们从上面的示例可以看到一些关联性：

- view, chart 上的位置同 Element 的图形有关联，一般通过鼠标触发（在上面或者临近）
- Element 的图形同 axis, legend, tooltip 等组件互相关联，一般通过视觉映射通道关联
  - postion 同 axis 关联
  - color 同 legend 关联
  - Element 上的整条记录同 tooltip 关联
- 一些 Trigger 同 view、chart 上的状态量关联

## Specification

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*IZf6R5mKF24AAAAAAAAAAABkARQnAQ" style="width: 199px;">

### 定义

#### 触发 —— Trigger

触发的对象主要有三种：容器（Chart 和 View) 、Element （各类元素）和 组件（e.g. Legend，Axis, etc.），所以在图形语法中我们需要能够标识这三种元素，我们可以使用命名系统来对这三种对象进行命名：

- 图表：chart
- 子视图：view
- 容器的状态量：selectedElements, cursorInfo 等
- Element 名称：interval, line, point, area 等名称
- Element 内部的图形元素的名称： line-label， point-label 等
- 组件的名称：legend, axis, annotation
- 组件的组成部分: legend-item, annotaion-line

一个触发 Trigger 是对象名称与事件名进行组合。使用 `:`  连接对象与事件名，e.g. interval:click

#### 反馈 —— Action

**Action 对象**<br />Action 对触发进行响应，Action 的对象必须与前面的触发关联：

- 可以是前面触发的对象，
- 也可以是位置信息计算出来的对象，
- 还可以是触发对象关联的其他对象

**Action 结果**<br />反馈的结果，无法直接用 name + method 来定义，可以在回调函数中指定，为了组合成交互语法，每个 Action 可以事先定义，在交互语法中直接指定 Action 名称即可。

**Action 定义**<br />action 的定义中需要解决的问题是：

- 如何拿到 action 需要的信息
- 如何区分不同的交互，一个交互的触发 trigger 不应该导致其他交互的响应（Action）

这两个问题本质上是一个交互的**上下文**<br />交互的上下文可以挂载在两类对象上：

- 在 chart、view  设置状态量
- 在一个交互上设置所有交互环节中的 action 都可以共享的信息

#### 上下文 —— Context

从上面的分析我们可以看到 Trigger 和 Action 之间需要上下文，有两种上下文：

- view、chart 上的全局状态量；
- 交互过程中，各个环节需要共享的的信息。

交互的上下文提供了一系列进行判定条件的函数，帮助用户在一个名为 isEnable 的函数中判断是否应该发生触发。例如 tooltip 的 'plot:click' 触发事件需要判定是否发生在绘图区域内。

**view、chart 上的状态量**<br />我们这里枚举一下参与交互的状态量，这些状态量可以自由的定义：

- size：大小
- cursorPoint：鼠标位置
- currentShape, currentElement, currentComponent, currentView 等，根据鼠标位置推导出来的信息
- activeElements, selectedElements， xxxStateElements，跟状态量相关的 Element
- 自定义的状态量

**交互环节中共享的信息**

- 当前交互的 id
- 当前交互执行到的 环节，阶段
- 执行完毕的环节传递给后续环节的信息

以框选过滤为例：

- 在触发时，需要记录触发开始的坐标点
- 在拖拽过程中，需要记录当前点的坐标点，同时计算被框选的图形
- 结束时，取到被框选图形，进行过滤

**context 的接口定义：**

```ts
/** 交互上下文的接口定义 */
export interface IInteractionContext {
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

### 实现

交互语法的实现由三部分组成：

- 定义反馈 Action
- 组装交互
- 使用交互

#### 定义反馈

一个反馈（Action）必须有的信息有：

- 当前交互的上下文
- view/chart 的状态量（响应交互的对象）

首先，我们规定如下格式定义一个作用在名为 'actionTargetName' 的反馈对象的反馈结果函数集合：

```ts
registerAction('actionTargetName', {
  // 根据需要实现反馈逻辑函数
  functionNameA() {},
  functionNameB() {},
  // ...
});
```

##### 实例

我们以**框选**为例，下面是实际的使用效果。

<playground path='interaction/brush/demo/brush-ds-state.ts' rid="interaction-container-2"></playground>

定义多个 Action 反馈：

- 鼠标（反馈对象），其反馈结果有：
  - 移动进入 view 时改变鼠标为表示可拖动的十字形状；
  - 鼠标移出 view 时改变鼠标为默认形状。
- rect-mask（反馈对象），其反馈结果有：
  - 按下鼠标，显示 mask；
  - 拖拽鼠标改变 mask 的范围（resize mask）；
  - 拖拽移动 mask；
  - 点击空白画布清除 mask。
- brush（反馈对象），其反馈结果有：
  - 过滤出选中 mask 范围内的元素；

**鼠标**

```ts
registerAction('cursor', {
  default() {...}, // 鼠标变为默认形状
  crosshair() {...}, // 鼠标变为代表可拖动十字形状
  //... 变为其他形状的函数
});
```

**rect-mask**

```ts
registerAction('rect-mask', {
  start() {...}, // 开始 mask
  show() {...}, // 显示 mask
  resize() {...}, // 改变 mask 大小
  hide() {...}, // 隐藏 mask
  end() {...} // 结束 mask
})
```

**brush**

```ts
registerAction('brush', {
  start() {...}, // 开始过滤
  filter() {...}, // 过滤
  reset() {...}, // 重置、取消过滤
});
```

#### 组装交互

首先，我们定义如下格式定义一个名为 'interactionName' 的交互流程：

```ts
registerInteraction('interactionName', {
  showEnable: [{ trigger: 'eventTargetName1:eventName1', action: 'actionTarget1:actionName1' }],
  closeEnable: [{ trigger: 'eventTargetName2:eventName2', action: 'actionTarget2:actionName2' }],
  start: [{ trigger: 'eventTargetName3:eventName3', action: 'actionTarget3:actionName3' }],
  processing: [
    { trigger: 'eventTargetName4:eventName4', action: 'actionTarget4:actionName4' },
    { trigger: 'eventTargetName5:eventName5', action: 'actionTarget5:actionName5' },
  ],
  end: [{ trigger: 'eventTargetName6:eventName6', action: 'actionTarget6:actionName6' }],
  rollback: [{ trigger: 'eventTargetName7:eventName7', action: 'actionTarget7:actionName7' }],
});
```

##### 实例

使用上述格式，我们使用上一节定义的 Action 来组装名为 名为 '**brush-filter**' 的交互：

```ts
registerInteraction('brush-filter', {
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

#### 使用交互

```ts
// 将 brush-filter 增加到 chart 对象上
chart.interaction('brush-filter');

// 将 brush-filter 从 chart 对象上移除
chart.removeInteraction('brush-filter');
```
