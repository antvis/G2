---
title: Geometry
order: 0
redirect_from:
  - /en/docs/api/geometry
---

Geometry 几何标记基类，主要负责数据到图形属性的映射以及绘制逻辑。<br />

<a name="815e210d"></a>

## 子类

<br />↳ [Point](./point)<br />
<br />↳ [Path](./path)<br />
<br />↳ [Edge](./edge)<br />
<br />↳ [Heatmap](./heatmap)<br />
<br />↳ [Interval](./interval)<br />
<br />↳ [Polygon](./polygon)<br />
<br />↳ [Schema](./schema)<br />

<a name="d3474432"></a>

## 创建方式

```typescript
const line1 = chart.line();
const line2 = chart.line({
  connectNulls: false,
});
const interval1 = view.interval();
const interval2 = view.interval({
  theme: {},
});
```

<br />**参数:**<br />
<br />**说明**：以下为通用属性，各个几何标记拥有不同的配置属性，将在各自章节列出。<br />
<br />• **sortable**? : _boolean_<br />
<br />是否对数据进行排序。<br />
<br />• **theme**? : _object_<br />
<br />主题配置。<br />
<br />• **visible**? : _boolean_<br />
<br />是否可见。<br />

<a name="ea340b9d"></a>

## 方法

<a name="adjust"></a>

### adjust

<br />▸ **adjust**(`adjustCfg`): _Geometry_<br />
<br />**Parameters:**

| 参数名      | 类型                                                 | 描述                                                                                                                                                                                                           |
| ----------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `adjustCfg` | string &#124; string[] &#124; object &#124; object[] | 数据调整配置。<br />1. 可以是字符串：'dodge'<br />2. 也可以进行组合，如 ['dodge', 'stack']<br />3. 也可以设置为对象： { type: 'dodge' }<br />4. 组合形态也可以使用对象数组：[{type: 'dodge'}, {type: 'stack'}] |

<br />设置数据调整方式。G2 目前内置了四种类型：<br />

1. dodge
1. stack
1. symmetric
1. jitter

<br />**Tip**<br />

- 对于 'dodge' 类型，可以额外进行如下属性的配置:

```typescript
geometry.adjust('dodge', {
  marginRatio: 0, // 取 0 到 1 范围的值（相对于每个柱子宽度），用于控制一个分组中柱子之间的间距
  dodgeBy: 'x', // 该属性只对 'dodge' 类型生效，声明以哪个数据字段为分组依据
});
```

- 对于 'stack' 类型，可以额外进行如下属性的配置:

```typescript
geometry.adjust('stack', {
  reverseOrder: false, // 用于控制是否对数据进行反序操作
});
```

<br />**`example`**<br />

```typescript
geometry.adjust('stack');

geometry.adjust({
  type: 'stack',
  reverseOrder: false,
});

// 组合使用 adjust
geometry.adjust(['stack', 'dodge']);

geometry.adjust([{ type: 'stack' }, { type: 'dodge', dodgeBy: 'x' }]);
```

<a name="animate"></a>

### animate

<br />▸ **animate**(`cfg`): _Geometry_<br />
<br />Geometry 动画配置。<br />

- `animate(false)` 关闭动画。
- `animate(true)` 开启动画，默认开启。

<br />我们将动画分为四个场景：<br />

1. appear: 图表第一次加载时的入场动画；
1. enter: 图表绘制完成，发生更新后，产生的新图形的进场动画；
1. update: 图表绘制完成，数据发生变更后，有状态变更的图形的更新动画；
1. leave: 图表绘制完成，数据发生变更后，被销毁图形的销毁动画。

<br />**`example`**<br />

```typescript
animate({
  enter: {
    duration: 1000, // enter 动画执行时间
  },
  leave: false, // 关闭 leave 销毁动画
});
```

<br />**Parameters:**

| 参数名 | 类型                  | 描述     |
| ------ | --------------------- | -------- |
| `cfg`  | object &#124; boolean | 动画配置 |

<br />`cfg` 为对象类型时，其属性结构如下：<br />

```typescript
{
   /** chart 初始化渲染时的入场动画，false/null 表示关闭入场动画。 */
  appear?: {
    /** 动画缓动函数 */
    easing?: string | (data) => string;;
    /** 动画执行函数 */
    animation?: string;
    /** 动画执行时间 */
    duration?: number | (data) => number;
    /** 动画延迟时间 */
    delay?: number | (data) => number;
    /** 动画执行结束后的回调函数 */
    callback?: () => any;
  } | false | null;
  /** chart 发生更新时，新增元素的入场动画，false/null 表示关闭入场动画。 */
  enter?: {
    /** 动画缓动函数 */
    easing?: string | (data) => string;;
    /** 动画执行函数 */
    animation?: string;
    /** 动画执行时间 */
    duration?: number | (data) => number;
    /** 动画延迟时间 */
    delay?: number | (data) => number;
    /** 动画执行结束后的回调函数 */
    callback?: () => any;
  } | false | null;
  /** 更新动画配置，false/null 表示关闭更新动画。 */
  update?: {
    /** 动画缓动函数 */
    easing?: string | (data) => string;;
    /** 动画执行函数 */
    animation?: string;
    /** 动画执行时间 */
    duration?: number | (data) => number;
    /** 动画延迟时间 */
    delay?: number | (data) => number;
    /** 动画执行结束后的回调函数 */
    callback?: () => any;
  } | false | null;
  /** 销毁动画配置，false/null 表示关闭销毁动画。 */
  leave?: {
    /** 动画缓动函数 */
    easing?: string | (data) => string;;
    /** 动画执行函数 */
    animation?: string;
    /** 动画执行时间 */
    duration?: number | (data) => number;
    /** 动画延迟时间 */
    delay?: number | (data) => number;
    /** 动画执行结束后的回调函数 */
    callback?: () => any;
  } | false | null;
}
```

<br />**Returns:** _Geometry_

---

<a name="changeVisible"></a>

### changeVisible

<br />▸ **changeVisible**(`visible`): _void_<br />
<br />显示或者隐藏 geometry。<br />
<br />**Parameters:**

| 参数名    | 类型    | 描述                 |
| --------- | ------- | -------------------- |
| `visible` | boolean | 显示或者隐藏几何标记 |

<br />**Returns:** _void_<br />

<a name="clear"></a>

### clear

<br />▸ **clear**(): _void_<br />
<br />清空当前 Geometry，配置项仍保留，但是内部创建的对象全部清空。<br />

<a name="color"></a>

### color

<br />▸ **color**(`cfg`): _Geometry_<br />
<br />配置 color 通道映射规则。<br />
<br />**`example`**<br />

```typescript
// data: [{ x: 'A', y: 10, color: 'red' }, { x: 'B', y: 30, color: 'yellow' }]
geometry.color({
  fields: ['x'],
  values: ['#1890ff', '#5AD8A6'],
});
```

<br />**Parameters:**

| 参数名 | 类型   | 描述                     |
| ------ | ------ | ------------------------ |
| `cfg`  | object | 映射规则，属性结构如下。 |

```typescript
{
  /** 映射的属性字段。 */
  fields?: string[];
  /** 回调函数。 */
  callback?: (...args) => any;
  /** 指定常量映射规则。 */
  values?: any[];
}
```

<br />▸ **color**(`field`, `cfg`): _Geometry_<br />
<br />**`example`**<br />

```typescript
// data
// [
//   { x: 'A', y: 10, color: 'red' },
//   { x: 'B', y: 30, color: 'yellow' }
// ]

// 使用 '#1890ff' 颜色渲染图形
geometry.color('#1890ff');

// 根据 x 字段的数据值进行颜色的映射，这时候 G2 会在内部调用默认的回调函数，读取默认提供的颜色进行数据值到颜色值的映射。
geometry.color('x');

// 将 'x' 字段的数据值映射至指定的颜色值 colors（可以是字符串也可以是数组），此时用于通常映射分类数据
geometry.color('x', ['#1890ff', '#5AD8A6']);

// 使用回调函数进行颜色值的自定义；可以使用多个字段使用、*号连接
geometry.color('x', (xVal) => {
  if (xVal === 'a') {
    return 'red';
  }
  return 'blue';
});

// 指定颜色的渐变路径，用于映射连续的数据
geometry.color('x', '#BAE7FF-#1890FF-#0050B3');
```

<br />**Parameters:**

| 参数名  | 类型                                                | 描述                                                       |
| ------- | --------------------------------------------------- | ---------------------------------------------------------- |
| `field` | string                                              | 参与颜色映射的数据字段，多个字段使用 '\*' 连接符进行连接。 |
| `cfg?`  | string &#124; string[] &#124; `(...args) => string` | 可选, color 映射规则。                                     |

<br />**Returns:** _Geometry_<br />

<a name="destroy"></a>

### destroy

<br />▸ **destroy**(): _void_<br />
<br />销毁 Geometry 实例。<br />
<br />**Returns:** _void_<br />

<a name="getAdjust"></a>

### getAdjust

<br />▸ **getAdjust**(`adjustType`): _Adjust‹›_<br />
<br />根据 `adjustType` 调整类型获取 Adjust 实例。<br />
<br />**Parameters:**

| 参数名       | 类型   |
| ------------ | ------ |
| `adjustType` | string |

<br />**Returns:** _Adjust‹›_<br />

<a name="getAttribute"></a>

### getAttribute

<br />▸ **getAttribute**(`name`): _Attribute_<br />
<br />根据名字获取图形属性实例。<br />
<br />**Parameters:**

| 参数名 | 类型   |
| ------ | ------ |
| `name` | string |

<br />**Returns:** _Attribute_<br />

<a name="getAttributeValues"></a>

### getAttributeValues

<br />▸ **getAttributeValues**(`attr`, `obj`): _any[]_<br />
<br />获取该数据发生图形映射后对应的 Attribute 图形空间数据。<br />
<br />**Parameters:**

| 参数名 | 类型      | 描述                     |
| ------ | --------- | ------------------------ |
| `attr` | Attribute | Attribute 图形属性实例。 |
| `obj`  | object    | 需要进行映射的原始数据。 |

<br />**Returns:** _any[]_<br />

<a name="getDefaultValue"></a>

### getDefaultValue

<br />▸ **getDefaultValue**(`attrName`): _any_<br />
<br />获取图形属性默认的映射值。<br />
<br />**Parameters:**

| 参数名     | 类型   |
| ---------- | ------ |
| `attrName` | string |

<br />**Returns:** _any_<br />

<a name="getElementsBy"></a>

### getElementsBy

<br />▸ **getElementsBy**(`condition`): _[Element](./element)[]_<br />
<br />根据一定的规则查找 Geometry 的 Elements。<br />

```typescript
getElementsBy((element) => {
  const data = element.getData();

  return data.a === 'a';
});
```

<br />**Parameters:**<br />
<br />▪ **condition**: _function_<br />
<br />定义查找规则的回调函数。<br />
<br />▸ (`element`: [Element](./element)): _boolean_<br />
<br />**Parameters:**

| 参数名    | 类型                 |
| --------- | -------------------- |
| `element` | [Element](./element) |

<br />**Returns:** _[Element](./element)[]_<br />

<a name="getGroupAttributes"></a>

### getGroupAttributes

<br />▸ **getGroupAttributes**(): _Attribute[]_<br />
<br />获取决定分组的图形属性实例。<br />
<br />**Returns:** _Attribute[]_<br />

<a name="getGroupFields"></a>

### getGroupFields

<br />▸ **getGroupFields**(): _string[]_<br />
<br />获取当前配置中的所有分组 & 分类的字段。<br />
<br />**Returns:** _string[]_<br />

<a name="getGroupScales"></a>

### getGroupScales

<br />▸ **getGroupScales**(): _Scale[]_<br />
<br />获取决定分组的图形属性对应的 scale 实例。<br />
<br />**Returns:** _Scale[]_<br />

<a name="getShapes"></a>

### getShapes

<br />▸ **getShapes**(): _IGroup | IShape[]_<br />
<br />获取该 Geometry 下所有生成的 shapes。<br />
<br />**Returns:** _IGroup | IShape[]_<br />

<a name="getXScale"></a>

### getXScale

<br />▸ **getXScale**(): _Scale_<br />
<br />获取 x 轴对应的 scale 实例。<br />
<br />**Returns:** _Scale_<br />

<a name="getXYFields"></a>

### getXYFields

<br />▸ **getXYFields**(): _string[]_<br />
<br />获得图形的 x y 字段。<br />
<br />**Returns:** _string[]_<br />

<a name="getYScale"></a>

### getYScale

<br />▸ **getYScale**(): _Scale_<br />
<br />获取 y 轴对应的 scale 实例。<br />
<br />**Returns:** _Scale_<br />

<a name="hide"></a>

### hide

<br />▸ **hide**(): _void_<br />
<br />隐藏。<br />
<br />**Returns:** _void_<br />

<a name="label"></a>

### label

<br />▸ **label**(`cfg`): _Geometry_<br />
<br />Geometry label 配置。<br />
<br />**`example`**<br />

```typescript
// data: [ {x: 1, y: 2, z: 'a'}, {x: 2, y: 2, z: 'b'} ]
// 在每个图形上显示 z 字段对应的数值
label({
  fields: ['z'],
});

label(false); // 不展示 label

// 在每个图形上显示 x 字段对应的数值，同时配置文本颜色为红色
label('x', {
  style: {
    fill: 'red',
  },
});

// 以 type 类型的 label 渲染每个图形上显示 x 字段对应的数值，同时格式化文本内容
label(
  'x',
  (xValue) => {
    return {
      content: xValue + '%',
    };
  },
  {
    type: 'base', // 声明 label 类型
  }
);
```

<br />**Parameters:**

| 参数名 | 类型                              |
| ------ | --------------------------------- |
| `cfg`  | object &#124; false &#124; string |

<br />当 `cfg` 为对象时，其属性结构如下：<br />

```typescript
{
  /** 映射的字段。 */
  fields?: string[];
  /** 回调函数。 */
  callback?: (...args) => GeometryLabelCfg | null | undefined;;
  cfg?: GeometryLabelCfg;
}
```

<br />`GeometryLabelCfg` 类型定义如下：<br />

````typescript
{
  /**
   * 用于声明渲染的 label 类型。
   * 当用户使用了自定义的 label 类型，需要声明具体的 type 类型，否则会使用默认的 label 类型渲染。
   */
  type?: string;
  /** 相对数据点的偏移距离。 */
  offset?: number;
  /** label 相对于数据点在 X 方向的偏移距离。 */
  offsetX?: number;
  /** label 相对于数据点在 Y 方向的偏移距离。 */
  offsetY?: number;
  /**
   * 展示的文本内容，如果不声明则按照参与映射的第一字段的值进行显示。
   * 当 content 为 IGroup 或者 IShape 类型时，请使用相对定位，即 x 和 y 坐标都设为 0，G2 内部会整体做最后的 label 进行定位的。
   * 示例： https://g2.antv.vision/zh/examples/pie/basic#pie-custome-label
   */
  content?: string | IGroup | IShape | (data: Datum, mappingData: MappingDatum, index: number) => string | IShape | IGroup;
  /** label 文本图形属性样式。 */
  style?: LooseObject;
  /** label 是否自动旋转，默认为 true。 */
  autoRotate?: boolean;
  /**
   * 当且仅当 `autoRotate` 为 false 时生效，用于设置文本的旋转角度，**弧度制**。
   */
  rotate?: number;
  /**
   * 用于设置文本连接线的样式属性，null 表示不展示。
   */
  labelLine?: null | boolean | { style?: object };
  /** 只对极坐标下的文本生效，表示文本是否按照角度进行放射状显示，true 表示开启，false 表示关闭。 */
  labelEmit?: boolean;
  /**
   * 文本布局类型，支持多种布局函数组合使用。
   *
   * 目前提供了三种：'overlap'，'fixedOverlap'，'limitInShape'：
   * 1. overlap: label 防遮挡，为了防止 label 之间相互覆盖，通过尝试向**四周偏移**来剔除放不下的 label。
   * 2. fixed-overlap: 不改变 label 位置的情况下对相互重叠的 label 进行调整。
   * 3. limit-in-shape: 剔除 shape 容纳不了的 label。
   * 4. pie-outer: 饼图 label 防遮挡，为了防止 label 之间相互覆盖，在一定的程度上对相互重叠的 label 进行调整。
   *
   * @example
   * ```ts
   * layout: {
   *   type: 'overlap',
   * },
   * ```
   */
  layout?: {
    /** label 布局类型。 */
    type: string;
    /** 各个布局函数开放给用户的配置。 */
    cfg?: LooseObject;
  } | {
    /** label 布局类型。 */
    type: string;
    /** 各个布局函数开放给用户的配置。 */
    cfg?: LooseObject;
  }[];
  /**
   * 仅当 geometry 为 interval 时生效，指定当前 label 与当前图形的相对位置。
   */
  position?:
    | ((data: Datum, mappingData: MappingDatum, index: number) => 'top' | 'bottom' | 'middle' | 'left' | 'right')
    | 'top' | 'bottom' | 'middle' | 'left' | 'right';
  /** 动画配置。 */
  animate?: {
    /** chart 初始化渲染时的入场动画，false/null 表示关闭入场动画。 */
    appear?: AnimateCfg | false | null;
    /** chart 发生更新时，新增元素的入场动画，false/null 表示关闭入场动画。 */
    enter?: AnimateCfg | false | null;
    /** 更新动画配置，false/null 表示关闭更新动画。 */
    update?: AnimateCfg | false | null;
    /** 销毁动画配置，false/null 表示关闭销毁动画。 */
    leave?: AnimateCfg | false | null;
  } | false | null;
}
````

<br />`AnimateCfg` 配置结构如下：<br />

```typescript
{
  /** 动画缓动函数 */
  readonly easing?: string | (data: Datum) => string;
  /** 动画执行函数 */
  readonly animation?: string;
  /** 动画执行时间 */
  readonly duration?: number | (data: Datum) => number;
  /** 动画延迟时间 */
  readonly delay?: number | (data: Datum) => number;
  /** 动画执行结束后的回调函数 */
  readonly callback?: () => any;
}
```

<br />**Returns:** _Geometry_<br />
<br />label<br />
<br />▸ **label**(`field`, `secondParam`): _Geometry_<br />
<br />**Parameters:**

| 参数名        | 类型                                                                        |
| ------------- | --------------------------------------------------------------------------- |
| `field`       | string                                                                      |
| `secondParam` | GeometryLabelCfg] &#124; `(...args) => GeometryLabelCfg | null | undefined` |

<br />**Returns:** _Geometry_<br />
<br />▸ **label**(`field`, `secondParam`, `thirdParam`): _Geometry_<br />
<br />**Parameters:**

| 参数名        | 类型                                               |
| ------------- | -------------------------------------------------- |
| `field`       | string                                             |
| `secondParam` | `(...args) => GeometryLabelCfg | null | undefined` |
| `thirdParam`  | GeometryLabelCfg                                   |

<br />**Returns:** _Geometry_<br />

<a name="position"></a>

### position

<br />▸ **position**(`cfg`): _Geometry_<br />
<br />配置 position 通道映射规则。<br />
<br />**`example`**<br />

```typescript
// 数据结构: [{ x: 'A', y: 10, color: 'red' }]
geometry.position('x*y');
geometry.position(['x', 'y']);
geometry.position({
  fields: ['x', 'y'],
});
```

<br />**Parameters:**

| 参数名 | 类型                                 | 描述     |
| ------ | ------------------------------------ | -------- |
| `cfg`  | string &#124; string[] &#124; object | 映射规则 |

<br />`cfg` 为对象时，对象结构如下：<br />

```typescript
{
  /** 映射的属性字段。 */
  fields?: string[];
}
```

<br />**Returns:** _Geometry_<br />

<a name="shape"></a>

### shape

<br />▸ **shape**(`cfg`): _Geometry_<br />
<br />配置 shape 通道映射规则。<br />
<br />**`example`**<br />

```typescript
// data: [{ x: 'A', y: 10, color: 'red' }, { x: 'B', y: 30, color: 'yellow' }]
geometry.shape({
  fields: ['x'],
});
```

<br />**Parameters:**

| 参数名 | 类型   | 描述           |
| ------ | ------ | -------------- |
| `cfg`  | object | 映射规则配置。 |

<br />`cfg` 为对象的属性结构如下：<br />

```typescript
{
  /** 映射的属性字段。 */
  fields?: string[];
  /** 回调函数。 */
  callback?: (...args) => any;
  /** 指定常量映射规则。 */
  values?: any[];
}
```

<br />**Returns:** _Geometry_<br />
<br />▸ **shape**(`field`, `cfg`): _Geometry_<br />
<br />**`example`**<br />

```typescript
// data: [{ x: 'A', y: 10, color: 'red' }, { x: 'B', y: 30, color: 'yellow' }]

// 指定常量，将所有数据值映射到固定的 shape
geometry.shape('circle');

// 将指定的字段映射到内置的 shapes 数组中
geometry.shape('x');

// 将指定的字段映射到指定的 shapes 数组中
geometry.shape('x', ['circle', 'diamond', 'square']);

// 使用回调函数获取 shape，用于个性化的 shape 定制，可以根据单个或者多个字段确定
geometry.shape('x', (xVal) => {
  if (xVal === 'a') {
    return 'circle';
  }
  return 'diamond';
});
```

<br />**Parameters:**

| 参数名  | 类型                                          | 描述                                                          |
| ------- | --------------------------------------------- | ------------------------------------------------------------- |
| `field` | string                                        | 参与 shape 映射的数据字段，多个字段使用 '\*' 连接符进行连接。 |
| `cfg?`  | string[] &#124; `(...args) => string | any[]` | Optional, shape 映射规则。                                    |

<br />**Returns:** _Geometry_<br />

<a name="show"></a>

### show

<br />▸ **show**(): _void_<br />
<br />显示。<br />
<br />**Returns:** _void_<br />

<a name="size"></a>

### size

<br />▸ **size**(`cfg`): _Geometry_<br />
<br />配置 size 通道映射规则。<br />
<br />**`example`**<br />

```typescript
// data: [{ x: 'A', y: 10, color: 'red' }, { x: 'B', y: 30, color: 'yellow' }]
geometry.size({
  values: [10],
});
```

<br />**Parameters:**

| 参数名  | 类型   | 描述       |
| ------- | ------ | ---------- |
| `field` | object | 映射规则。 |

<br />`cfg` 为对象的属性结构如下：<br />

```typescript
{
  /** 映射的属性字段。 */
  fields?: string[];
  /** 回调函数。 */
  callback?: (...args) => any;
  /** 指定常量映射规则。 */
  values?: any[];
}
```

<br />**Returns:** _Geometry_<br />
<br />▸ **size**(`field`, `cfg`): _Geometry_<br />
<br />**`example`**<br />

```typescript
// data: [{ x: 'A', y: 10, color: 'red' }, { x: 'B', y: 30, color: 'yellow' }]

// 直接指定像素大小
geometry.size(10);

// 指定映射到 size 的字段，使用内置的默认大小范围为 [1, 10]
geometry.size('x');

// 指定映射到 size 字段外，还提供了 size 的最大值和最小值范围
geometry.size('x', [5, 30]);

// 使用回调函数映射 size，用于个性化的 size 定制，可以使用多个字段进行映射
geometry.size('x', (xVal) => {
  if (xVal === 'a') {
    return 10;
  }
  return 5;
});
```

<br />**Parameters:**

| 参数名  | 类型                                          | 描述                                                         |
| ------- | --------------------------------------------- | ------------------------------------------------------------ |
| `field` | number &#124; string                          | 参与 size 映射的数据字段，多个字段使用 '\*' 连接符进行连接。 |
| `cfg?`  | [number, number] &#124; `(...args) => number` | Optional, size 映射规则                                      |

<br />**Returns:** _Geometry_<br />

<a name="state"></a>

### state

<br />▸ **state**(`cfg`): _Geometry_<br />
<br />设置状态对应的样式。<br />
<br />**`example`**<br />

```typescript
chart.interval().state({
  selected: {
    animate: { duration: 100, easing: 'easeLinear' },
    style: {
      lineWidth: 2,
      stroke: '#000',
    },
  },
});
```

<br />如果图形 shape 是由多个 shape 组成，即为一个 G.Group 对象，那么针对 group 中的每个 shape，我们需要使用下列方式进行状态样式设置：<br />如果我们为 group 中的每个 shape 设置了 'name' 属性(shape.set('name', 'xx'))，则以 'name' 作为 key，否则默认以索引值（即 shape 的 添加顺序）为 key。<br />

```typescript
chart
  .interval()
  .shape('groupShape')
  .state({
    selected: {
      style: {
        0: { lineWidth: 2 },
        1: { fillOpacity: 1 },
      },
    },
  });
```

<br />**Parameters:**

| 参数名 | 类型   | 描述     |
| ------ | ------ | -------- |
| `cfg`  | object | 状态样式 |

<br />`cfg` 对象的属性结构如下：<br />

```typescript
{
  /** 默认状态样式。 */
  default?: {
    /** 状态样式配置。 */
    style?: object | (element: Element) => LooseObject;
  };
  /** active 状态配置。 */
  active?: {
    /** 状态样式配置。 */
    style?: object | (element: Element) => LooseObject;
  };
  /** inactive 状态配置。 */
  inactive?: {
    /** 状态样式配置。 */
    style?: object | (element: Element) => LooseObject;
  };
  /** selected 状态配置。 */
  selected?: {
    /** 状态样式配置。 */
    style?: object | (element: Element) => LooseObject;
  };
}
```

<br />**Returns:** _this_<br />

<a name="style"></a>

### style

<br />▸ **style**(`cfg`): _Geometry_<br />
<br />图形样式配置。<br />
<br />**`example`**<br />

```typescript
// 配置图形样式
style({
  lineWidth: 2,
  stroke: '#1890ff',
});

// 根据具体的数据进行详细配置
style({
  fields: ['x', 'y'], // 数据字段
  callback: (xVal, yVal) => {
    const style = { lineWidth: 2, stroke: '#1890ff' };
    if (xVal === 'a') {
      style.lineDash = [2, 2];
    }
    return style;
  },
});
```

<br />**Parameters:**

| 参数名 | 类型                      | 描述                       |
| ------ | ------------------------- | -------------------------- |
| `cfg`  | StyleOption &#124; object | 配置样式属性或者样式规则。 |

<br />`cfg` 为 StyleOption 类型时，其属性结构如下：<br />

```typescript
{
  /** 映射的字段。 */
  fields?: string[];
  /** 回调函数。 */
  callback?: (...args) => LooseObject;
  /** 图形样式配置。 */
  cfg?: LooseObject;
}
```

<br />**Returns:** _Geometry_<br />
<br />▸ **style**(`field`, `styleFunc`): _Geometry_<br />
<br />**`example`**<br />

```typescript
style('x*y', (xVal, yVal) => {
  const style = { lineWidth: 2, stroke: '#1890ff' };
  if (xVal === 'a') {
    style.lineDash = [2, 2];
  }
  return style;
});
```

<br />**Parameters:**

| 参数名      | 类型                       | 描述                         |
| ----------- | -------------------------- | ---------------------------- |
| `field`     | string                     | 数据字段或者样式配置规则。   |
| `styleFunc` | `(...args) => LooseObject` | Optional, 样式配置回调函数。 |

<br />**Returns:** _Geometry_<br />

<a name="tooltip"></a>

### tooltip

<br />▸ **tooltip**(`cfg`): _Geometry_<br />
<br />配置 Geometry 显示的 tooltip 内容。<br />
<br />`tooltip(false)` 代表关闭 tooltip。<br />`tooltip(true)` 代表开启 tooltip。<br />
<br />Geometry 默认允许 tooltip 展示，我们可以使用以下方法对 tooltip 的展示内容进行配置：<br />
<br />**`example`**<br />

```typescript
// data: [{x: 'a', y: 10}]
tooltip({
  fields: ['x'],
});
```

```typescript
tooltip({
  fields: ['x', 'y'],
});
```

tooltip() 方法同样支持数据映射及回调用法：<br />
<br />**`example`**<br />

```typescript
chart.tooltip({
  itemTpl: '<li>{x}: {y}</li>',
});

chart
  .line()
  .position('x*y')
  .tooltip({
    fields: ['x', 'y'],
    callback: (x, y) => {
      return {
        x,
        y,
      };
    },
  });
```

<br />其返回的值必须为对象，该值中的属性同 chart.tooltip() 的 itemTpl 模板相对应，返回的变量可用于 itemTpl 的字符串模板。<br />
<br />**Parameters:**

| 参数名  | 类型                                 | 描述               |
| ------- | ------------------------------------ | ------------------ |
| `field` | GeometryTooltipOption &#124; boolean | tooltip 配置信息。 |

<br />`field` 为 GeometryTooltipOption 类型时，其结构如下：<br />

```typescript
{
  /** 参与映射的字段。 */
  fields: string[];
  /** 回调函数。 */
  callback?: (...args) => LooseObject;
}
```

<br />**Returns:** _Geometry_<br />
<br />▸ **tooltip**(`field`, `cfg`): _Geometry_<br />
<br />**`example`**<br />

```typescript
// data: [{x: 'a', y: 10}]

// 等同于 tooltip({ fields: [ 'x' ] })
tooltip('x');

// 等同于 tooltip({ fields: [ 'x', 'y' ] })
tooltip('x*y');

// 等同于 tooltip({ fields: [ 'x', 'y' ], callback: (x, y) => { x, y } })
tooltip('x*y', (x, y) => {
  return {
    x,
    y,
  };
});
```

<br />**Parameters:**

| 参数名  | 类型                       | 描述               |
| ------- | -------------------------- | ------------------ |
| `field` | string                     | 参与映射的字段。   |
| `cfg?`  | `(...args) => LooseObject` | Optional, 回调函数 |

<br />**Returns:** _Geometry_
