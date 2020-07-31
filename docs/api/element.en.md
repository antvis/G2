---
title: Element
order: 2
---

# Element

Element 图形元素。<br />
<br />定义：在 G2 中，我们会将数据通过图形语法映射成不同的图形，比如点图，数据集中的每条数据会对应一个点，柱状图每条数据对应一个柱子，线图则是一组数据对应一条折线，Element 即一条/一组数据对应的图形元素，它代表一条数据或者一个数据集，在图形层面，它可以是单个 Shape 也可以是多个 Shape，我们称之为图形元素。<br />

<a name="24d67862"></a>

## 属性

<a name="animate"></a>

### animate

<br />• **animate**: _AnimateOption | boolean_<br />
<br />shape 的动画配置<br />

<a name="container"></a>

### container

<br />• **container**: _IGroup_<br />
<br />shape 容器<br />

<a name="destroyed"></a>

### destroyed

<br />• **destroyed**: _boolean_ = false<br />
<br />标识对象是否已销毁<br />

<a name="geometry"></a>

### geometry

<br />• **geometry**: _[Geometry](geometry)_<br />
<br />element 对应的 Geometry 实例<br />

<a name="labelShape"></a>

### labelShape

<br />• **labelShape**: _IGroup[]_<br />
<br />保存 shape 对应的 label<br />

<a name="shape"></a>

### shape

<br />• **shape**: _IShape | IGroup_<br />
<br />最后创建的图形对象<br />

<a name="shapeFactory"></a>

### shapeFactory

<br />• **shapeFactory**: _ShapeFactory_<br />
<br />用于创建各种 shape 的工厂对象<br />

<a name="visible"></a>

### visible

<br />• **visible**: _boolean_<br />
<br />是否可见<br />

<a name="ea340b9d"></a>

## 方法

<a name="changeVisible"></a>

### changeVisible

<br />▸ **changeVisible**(`visible`: boolean): _void_<br />
<br />显示或者隐藏 element。<br />
<br />**Parameters:**

| 属性名    | 类型    | 描述       |
| --------- | ------- | ---------- |
| `visible` | boolean | 是否可见。 |

<br />**Returns:** _void_<br />

<a name="clearStates"></a>

### clearStates

<br />▸ **clearStates**(): _void_<br />
<br />清空状量态，恢复至初始状态。<br />
<br />**Returns:** _void_<br />

<a name="destroy"></a>

### destroy

<br />▸ **destroy**(): _void_<br />
<br />销毁 element 实例。<br />
<br />**Returns:** _void_<br />

<a name="getBBox"></a>

### getBBox

<br />▸ **getBBox**(): _BBox_<br />
<br />返回 Element 元素整体的 bbox，包含文本及文本连线（有的话）。<br />
<br />**Returns:** _BBox_<br />
<br />整体包围盒。<br />

<a name="getData"></a>

### getData

<br />▸ **getData**(): _object_<br />
<br />获取 Element 对应的原始数据。<br />
<br />**Returns:** _object_<br />

<a name="getModel"></a>

### getModel

<br />▸ **getModel**(): _ShapeInfo_<br />
<br />获取 Element 对应的图形绘制数据。<br />
<br />**Returns:** _ShapeInfo_<br />
<br />图形绘制数据。<br />

<a name="getStates"></a>

### getStates

<br />▸ **getStates**(): _string[]_<br />
<br />获取当前 Element 上所有的状态。<br />
<br />**Returns:** _string[]_<br />

<a name="hasState"></a>

### hasState

<br />▸ **hasState**(`stateName`): _boolean_<br />
<br />查询当前 Element 上是否已设置 `stateName` 对应的状态。<br />
<br />**Parameters:**

| 属性名      | 类型   | 描述       |
| ----------- | ------ | ---------- |
| `stateName` | string | 状态名称。 |

<br />**Returns:** _boolean_<br />

<a name="hide"></a>

### hide

<br />▸ **hide**(): _void_<br />
<br />隐藏。<br />
<br />**Returns:** _void_<br />

<a name="setState"></a>

### setState

<br />▸ **setState**(`stateName`, `stateStatus`): _void_<br />
<br />设置 Element 的状态。<br />
<br />目前 Element 开放三种状态：<br />

1. active
1. selected
1. inactive

<br />这三种状态相互独立，可以进行叠加。<br />
<br />这三种状态的样式可在 Theme 主题中或者通过 `geometry.state()` 接口进行配置。<br />

```typescript
// 激活 active 状态
setState('active', true);
```

<br />**Parameters:**

| 属性名        | 类型    | 描述         |
| ------------- | ------- | ------------ |
| `stateName`   | string  | 状态名       |
| `stateStatus` | boolean | 是否开启状态 |

<br />**Returns:** _void_<br />

<a name="show"></a>

### show

<br />▸ **show**(): _void_<br />
<br />显示。<br />
<br />**Returns:** _void_
