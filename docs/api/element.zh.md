---
title: Element
order: 2
---

Element 图形元素。

定义：在 G2 中，我们会将数据通过图形语法映射成不同的图形，比如点图，数据集中的每条数据会对应一个点，柱状图每条数据对应一个柱子，线图则是一组数据对应一条折线，Element 即一条/一组数据对应的图形元素，它代表一条数据或者一个数据集，在图形层面，它可以是单个 Shape 也可以是多个 Shape，我们称之为图形元素。

<a name="24d67862"></a>

## 属性

<a name="animate"></a>

### animate

• **animate**: _AnimateOption | boolean_

shape 的动画配置

<a name="container"></a>

### container

• **container**: _IGroup_

shape 容器

<a name="destroyed"></a>

### destroyed

• **destroyed**: _boolean_ = false

标识对象是否已销毁

<a name="geometry"></a>

### geometry

• **geometry**: _[Geometry](geometry)_

element 对应的 Geometry 实例

<a name="labelShape"></a>

### labelShape

• **labelShape**: _IGroup[]_

保存 shape 对应的 label

<a name="shape"></a>

### shape

• **shape**: _IShape | IGroup_

最后创建的图形对象

<a name="shapeFactory"></a>

### shapeFactory

• **shapeFactory**: _ShapeFactory_

用于创建各种 shape 的工厂对象

<a name="visible"></a>

### visible

• **visible**: _boolean_

是否可见

<a name="ea340b9d"></a>

## 方法

<a name="changeVisible"></a>

### changeVisible

▸ **changeVisible**(`visible`: boolean): _void_

显示或者隐藏 element。

**Parameters:**

| 属性名    | 类型    | 描述       |
| --------- | ------- | ---------- |
| `visible` | boolean | 是否可见。 |

**Returns:** _void_

<a name="clearStates"></a>

### clearStates

▸ **clearStates**(): _void_

清空状量态，恢复至初始状态。

**Returns:** _void_

<a name="destroy"></a>

### destroy

▸ **destroy**(): _void_

销毁 element 实例。

**Returns:** _void_

<a name="getBBox"></a>

### getBBox

▸ **getBBox**(): _BBox_

返回 Element 元素整体的 bbox，包含文本及文本连线（有的话）。

**Returns:** _BBox_

整体包围盒。

<a name="getData"></a>

### getData

▸ **getData**(): _object_

获取 Element 对应的原始数据。

**Returns:** _object_

<a name="getModel"></a>

### getModel

▸ **getModel**(): _ShapeInfo_

获取 Element 对应的图形绘制数据。

**Returns:** _ShapeInfo_

图形绘制数据。

<a name="getStates"></a>

### getStates

▸ **getStates**(): _string[]_

获取当前 Element 上所有的状态。

**Returns:** _string[]_

<a name="hasState"></a>

### hasState

▸ **hasState**(`stateName`): _boolean_

查询当前 Element 上是否已设置 `stateName` 对应的状态。

**Parameters:**

| 属性名      | 类型   | 描述       |
| ----------- | ------ | ---------- |
| `stateName` | string | 状态名称。 |

**Returns:** _boolean_

<a name="hide"></a>

### hide

▸ **hide**(): _void_

隐藏。

**Returns:** _void_

<a name="setState"></a>

### setState

▸ **setState**(`stateName`, `stateStatus`): _void_

设置 Element 的状态。

目前 Element 开放三种状态：

1. active
1. selected
1. inactive

这三种状态相互独立，可以进行叠加。

这三种状态的样式可在 Theme 主题中或者通过 `geometry.state()` 接口进行配置。

```typescript
// 激活 active 状态
setState('active', true);
```

**Parameters:**

| 属性名        | 类型    | 描述         |
| ------------- | ------- | ------------ |
| `stateName`   | string  | 状态名       |
| `stateStatus` | boolean | 是否开启状态 |

**Returns:** _void_

<a name="show"></a>

### show

▸ **show**(): _void_

显示。

**Returns:** _void_
