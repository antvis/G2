---
title: 数据标签 - Label
order: 9
---

`markdown:docs/common/style.md`

geometry.label() 是将数据值映射到图形的文本上的方法，共有六种传入方法：

第一种 传入 false，不展示 label

```ts
geometry.label(false);
```

第二种 传入字段名，在每个图形上显示对应的字段对应的数值。

```sign
(field: string) => Geometry;
```

```ts
geometry.label('x');
```

第三种 传入字段名和配置项，配置显示细节

```sign
(field: string, secondParam: GeometryLabelCfg) => Geometry;
```

```ts
// 在每个图形上显示 x 字段对应的数值，同时配置文本颜色为红色
geometry.label('x', {
  style: {
    fill: 'red',
  },
});
```

第四种 通过回调函数返回值做配置

```sign
(field: string, secondParam: LabelCallback) => Geometry;
type LabelCallback = (...args: any[]) => GeometryLabelCfg | null | undefined;
```

```ts
label('x', (xValue) => {
  return {
    content: xValue + '%',
  };
});
```

第五种 传入回调函数配置和配置项。 即调用方法三，和调用方法四的结合。

```sign
(field: string, secondParam: LabelCallback, thirdParam: GeometryLabelCfg) => Geometry;
type LabelCallback = (...args: any[]) => GeometryLabelCfg | null | undefined;
```

第六种 通过 LabelOption 配置

```sign
(option: LabelOption) => Geometry;

interface LabelOption {
  field: string[];
  callback: (...args: any[]) => GeometryLabelCfg | null | undefined;
  cfg: GeometryLabelCfg;
}
```

_**GeometryLabelCfg**_ 配置如下：

### GeometryLabelCfg.type

<description> _string_ **optional** </description>

g2 默认指定 label 类型，其中极坐标默认为 `polar`，theta 坐标系默认为`pie`，geometry 为 interval 或 polygon 时默认为 `interval`，其他为 `base`。
如果需要自定义 label，可以通过 `registerGeometryLabel` 注册，同时通过此配置指定。

### GeometryLabelCfg.offset

<description> _number_ **optional** </description>

相对数据点的偏移距离。

### GeometryLabelCfg.offsetX

<description> _number_ **optional** </description>

相对于数据点在 X 方向的偏移距离。

### GeometryLabelCfg.offsetY

<description> _number_ **optional** </description>

相对于数据点在 Y 方向的偏移距离。

### GeometryLabelCfg.content

<description> _string | IGroup | IShape | GeometryLabelContentCallback_ **optional**</description>

展示的文本内容，默认为参与映射的第一字段的值。

```ts
// 1. string
{
  content: '这是一个标签';
}

// 2 IGroup | IShape
// 示例 https://g2.antv.vision/zh/examples/pie/basic#pie-custome-label

// 3. GeometryLabelContentCallback 回调函数为
type GeometryLabelContentCallback = (data: any, mappingData: MappingDatum, index: number) => string | IGroup | IShape;

{
  content: (data, mappingData, index) => `x: ${data.x}, y: ${data.y}, z: ${data.z}`;
  // 示例数据显示 x: 1, y: 2, z: a 和 x: 2, y: 2, z: b
}
```

### GeometryLabelCfg.style

<description> _IStyle_ **optional**</description>

文本图形属性样式。

### GeometryLabelCfg.autoRotate

<description> _boolean_ **optional** _default:_ `true`</description>

是否自动旋转。

### GeometryLabelCfg.rotate

<description> _number_ **optional**</description>

当且仅当 autoRotate 为 `false` 时生效，用于设置文本的旋转角度。

### GeometryLabelCfg.labelLine

<description> _null | boolean | { style?: object }_ **optional**</description>

用于设置文本连接线的样式属性，`null` 表示不展示。

### GeometryLabelCfg.labelEmit

<description> _boolean_ **optional**</description>

只对极坐标下的文本生效，表示文本是否按照角度进行放射状显示，true 表示开启，false 表示关闭。

### GeometryLabelCfg.layout

<description> _GeometryLabelLayoutCfg | GeometryLabelLayoutCfg[]_ **optional**</description>

文本布局类型，支持多种布局函数组合使用。

```ts
interface GeometryLabelLayoutCfg {
  type: string; //  label 布局类型
  cfg?: { [key: string]: any }; // 各个布局函数开放给用户的配置
}
```

`layout.type` 目前提供了以下三种：

- overlap: label 防遮挡，为了防止 label 之间相互覆盖，通过尝试向四周偏移来剔除放不下的 label。
- fixed-overlap: 不改变 label 位置的情况下对相互重叠的 label 进行调整。
- limit-in-shape: 剔除 shape 容纳不了的 label。

如需要配置其他文本布局，可以通过 `registerGeometryLabelLayout` 注册自定义文本布局，再设置到 `layout.type`。

### GeometryLabelCfg.position

<description> _"top" | "left" | "right" | "bottom" | "middle" | IntervalGeometryLabelPositionCallback_ **optional**</description>

仅当 geometry 为 interval 时生效，指定当前 label 与当前图形的相对位置，默认支持位置包括：top, left, right, bottom, middle。

_**IntervalGeometryLabelPositionCallback**_ 回调函数类型：

```sign
type IntervalGeometryLabelPositionCallback = (
  data: Datum,
  mappingData: MappingDatum,
  index: number
) => 'top' | 'left' | 'right' | 'bottom' | 'middle';
```

```ts
{
  position: (data, mappingData, index) => {
    if (data.x > 0) {
      return 'top';
    }
    return 'bottom';
  };
}
```

### GeometryLabelCfg.animate

<description> _AnimateOption | false | null_ **optional**</description>

配置动画。
