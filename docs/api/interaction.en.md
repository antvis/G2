---
title: Interaction
order: 4
---

# Interaction

G2 4.0 后所有的交互都是基于交互语法进行拼装，详细的说明参考 [Interaction 的概念](https://g2.antv.vision/zh/docs/manual/tutorial/interaction) ，这里介绍 Interaction 的使用。<br />你可以通过 Chart 上的两个接口来添加和移除交互：

- chart.interaction(name, [cfg]) 添加或者修改交互
- chart.removeInteraction(name) 移除交互

<a name="ZLdDh"></a>

### 使用 Interaction

<a name="vXvgt"></a>

#### 直接使用

```javascript
chart.interaction('tooltip');
```

<a name="A469K"></a>

#### 覆盖部分交互环节

可以覆盖任何环节的触发和反馈，交互环节参考 [交互语法组合](https://g2.antv.vision/zh/docs/manual/developer/registerinteraction#%E4%BD%BF%E7%94%A8%E4%BA%A4%E4%BA%92%E8%AF%AD%E6%B3%95%E7%BB%84%E5%90%88)

```javascript
chart.interaction('tooltip', {
  start: {
    trigger: 'interval:click',
    action: 'tootip:show',
  },
});
```

<a name="ECXOw"></a>

### 移除 Interaction

```javascript
chart.removeInteraction('tooltip');
```

<a name="d7Eck"></a>

### 内置的 Interaction

为了便于用户的使用，G2 在 Chart 中内置了几种交互：

- tooltip：鼠标在 chart 上移动时显示提示信息
- legend-active：鼠标移动到图例选项时，图例项高亮，对应的图形高亮
- legend-filter：分类图例的勾选
- continuous-filter: 连续图例的过滤

<br />但是一些场景下需要移除掉默认的交互，例如你想要的 legend 勾选不是过滤数据而是过滤图形时，则需要移除掉 legend-filter

```javascript
chart.removeInteraction('legend-filter');
chart.interaction('legend-visible-filter');
```

<a name="d8XJY"></a>

#### 支持的 interaction 列表

每个 interaction 的定义参考 [交互列表](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#%E6%89%80%E6%9C%89%E7%9A%84%E4%BA%A4%E4%BA%92%E5%88%97%E8%A1%A8)

- [tooltip](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#tooltip)
- [active-region](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#active-region)
- [view-zoom](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#view-zoom)
- [element-active](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#element-active)
- [element-selected](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#element-selected)
- [element-single-selected](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#element-single-selected)
- [element-highlight](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#element-highlight)
- [element-highlight-by-x](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#element-highlight-by-x)
- [element-highlight-by-color](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#element-highlight-by-color)
- [legend-filter](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#legend-filter)
- [legend-visible-filter](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#legend-visible-filter)
- [continuous-filter](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#continuous-filter)
- [continuous-visible-filter](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#continuous-visible-filter)
- [legend-active](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#legend-active)
- [legend-highlight](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#legend-highlight)
- [axis-label-highlight](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#axis-label-highlight)
- [element-list-highlight](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#element-list-highlight)
- [brush](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#brush)
- [brush-x](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#brush-x)
- [brush-y](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#brush-y)
- [brush-visible](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#brush-visible)

<a name="00n6v"></a>

#### 支持的 Action

- [鼠标的 Action](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#%E9%BC%A0%E6%A0%87%E7%9A%84-action)
  - [cursor](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#cursor)
- [Chart/View 的 Action](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#chartview-%E7%9A%84-action)
  - [view-move](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#view-move)
  - [scale-translate](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#scale-translate)
  - [scale-zoom](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#scale-zoom)
- [Element 的 Action](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#element-%E7%9A%84-action)
  - [element-active](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#element-active-1)
  - [element-single-active](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#element-single-active)
  - [element-selected](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#element-selected-1)
  - [element-single-selected](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#element-single-selected-1)
  - [element-highlight](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#element-highlight-1)
  - [element-single-highlight](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#element-single-highlight)
  - [element-range-highlight](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#element-range-highlight)
  - [element-sibling-highlight](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#element-sibling-highlight)
  - [element-filter](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#element-filter)
  - [element-link-by-color](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#element-link-by-color)
- [数据操作的 Action](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#%E6%95%B0%E6%8D%AE%E6%93%8D%E4%BD%9C%E7%9A%84-action)
  - [data-filter](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#data-filter)
  - [brush](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#brush-1)
  - [brush-x](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#brush-x-1)
  - [brush-y](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#brush-y-1)
  - [sibling-filter](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#sibling-filter)
  - [sibling-x-filter](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#sibling-x-filter)
  - [sibling-y-filter](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#sibling-y-filter)
- [组件 Action](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#%E7%BB%84%E4%BB%B6-action)
  - [tooltip](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#tooltip-1)
  - [list-active](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#list-active)
  - [list-highlight](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#list-highlight)
  - [legend-item-highlight](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#legend-item-highlight)
  - [axis-label-highlight](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#axis-label-highlight-1)
  - [list-unchecked](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#list-unchecked)
  - [list-selected](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#list-selected)
- [辅助交互的 Action](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#%E8%BE%85%E5%8A%A9%E4%BA%A4%E4%BA%92%E7%9A%84-action)
  - [active-region](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#active-region-1)
  - [rect-mask](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#rect-mask)
  - [circle-mask](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#circle-mask)
  - [path-mask](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#path-mask)
  - [reset-button](https://g2.antv.vision/zh/docs/manual/tutorial/interaction#reset-button)

<a name="fzE6P"></a>

### 注册 Interaction

在 G2 的命名空间上提供了注册的方法：<br />

```javascript
G2.registerInteraction(name, defs);
```

<br />以 tooltip 的交互为例：

```javascript
registerInteraction('tooltip', {
  start: [{ trigger: 'plot:mousemove', action: 'tooltip:show' }],
  end: [{ trigger: 'plot:mouseleave', action: 'tooltip:hide' }],
});
```

<a name="vsKar"></a>

### 更多

更多交互语法的使用参考：

- [图表鼠标高亮  ](https://www.yuque.com/antv/g2-docs/highlight-by-mouse)
- [图表框选交互](https://www.yuque.com/antv/g2-docs/cpz6uv)
- [图表过滤交互](https://www.yuque.com/antv/g2-docs/etpkx3)
- [交互语法中的限流](https://www.yuque.com/antv/g2-docs/rs9sem)
