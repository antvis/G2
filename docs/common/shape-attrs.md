`markdown:docs/common/style.md`

<div class='custom-api-docs'>

### ShapeAttrs.x

<description> _number_ **optional** </description>

x 坐标。

### ShapeAttrs.y

<description> _number_ **optional** </description>

y 坐标。

### ShapeAttrs.r

<description> _number_ **optional** </description>

圆半径。

### ShapeAttrs.stroke

<description> _string_ **optional** </description>

描边颜色。

### ShapeAttrs.strokeOpacity

<description> _number_ **optional** </description>

描边透明度。

### ShapeAttrs.fill

<description> _string_ **optional** </description>

填充颜色。

### ShapeAttrs.fillOpacity

<description> _number_ **optional** </description>

填充透明度。

### ShapeAttrs.opacity

<description> _number_ **optional** </description>

整体透明度。

### ShapeAttrs.lineWidth

<description> _number_ **optional** </description>

线宽。

### ShapeAttrs.lineCap

<description> _'butt' | 'round' | 'square'_ **optional** _default:_ `butt`</description>

指定如何绘制每一条线段末端。

- butt：线段末端以方形结束。
- round：线段末端以圆形结束。
- square：线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

### ShapeAttrs.lineJoin

<description> _'bevel' | 'round' | 'miter'_ **optional** _default:_ `round`</description>

用来设置 2 个长度不为 0 的相连部分（线段，圆弧，曲线）如何连接在一起的属性（长度为 0 的变形部分，其指定的末端和控制点在同一位置，会被忽略）。

- round：通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度。
- bevel：在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角。
- miter：通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。这个设置可以通过 miterLimit 属性看到效果。

<img src='https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*fuV5TaQVPs0AAAAAAAAAAAAAARQnAQ' width='300' alt='line-join'/>

### ShapeAttrs.lineDash

<description> _number[] | null_ **optional**</description>

设置线的虚线样式，可以指定一个数组。一组描述交替绘制线段和间距（坐标空间单位）长度的数字。 如果数组元素的数量是奇数， 数组的元素会被复制并重复。例如， [5, 15, 25] 会变成 [5, 15, 25, 5, 15, 25]。这个属性取决于浏览器是否支持 `setLineDash()` 函数。

### ShapeAttrs.path

<description> _string | object[]_ **optional**</description>

Path 路径。

```js
path: [
	['M', 100, 100],
	['L', 200, 200],
],
```

### ShapeAttrs.points

<description> _object[]_ **optional**</description>

```js
points: [
  [x1, y1],
  [x2, y2],
];
```

### ShapeAttrs.width

<description> _number_ **optional** </description>

宽度。

### ShapeAttrs.height

<description>_number_ **optional** </description>

高度。

### ShapeAttrs.shadowBlur

<description>_number_ **optional** </description>

阴影模糊效果程度。

### ShapeAttrs.shadowColor

<description>_string_ **optional** </description>

阴影颜色。

### ShapeAttrs.shadowOffsetX

<description>_number_ **optional** </description>

阴影 x 方向偏移量。

### ShapeAttrs.shadowOffsetY

<description>_number_ **optional** </description>

阴影 Y 方向偏移量。

### ShapeAttrs.textAlign

<description>_'start' | 'center' | 'end' | 'left' | 'right'_ **optional** </description>

设置文本内容的当前对齐方式。

### ShapeAttrs.textBaseline

<description>_'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom'_ **optional** </description>

设置在绘制文本时使用的当前文本基线。

### ShapeAttrs.fontStyle

<description>_'normal' | 'italic' | 'oblique'_ **optional** </description>

字体样式。

### ShapeAttrs.fontSize

<description>_number_ **optional** </description>

文本字体大小。

### ShapeAttrs.fontFamily

<description> _string_ **optional**</description>

文本字体。

### ShapeAttrs.fontWeight

<description> _'normal' | 'bold' | 'bolder' | 'lighter' | number_ **optional**</description>

文本粗细。

### ShapeAttrs.fontVariant

<description> _'normal' | 'small-caps' | string_ **optional**</description>

字体变体。

### ShapeAttrs.lineHeight

<description>_number_ **optional** </description>

文本行高。

</div>
