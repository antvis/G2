---
title: Quick check of drawing properties
order: 8
---

The bottom layer of G2 uses the [G](https://g.antv.vision/en/docs/api/shape/attrs) drawing engine. This article lists the common drawing attributes. For more information about drawing and the use of drawing attributes, please check in [G](https://g.antv.vision/en/).

## General attributes

| Attribute Name  | Description                                                                                                                                                                                                                                                          |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fill`          | Describe the attributes of color and style.                                                                                                                                                                                                                          |
| `fillStyle`     | with `fill`                                                                                                                                                                                                                                                          |
| `fillOpacity`   | Used to set the transparency of the fill color of the graphic.                                                                                                                                                                                                       |
| `stroke`        | The attribute describing the color or style of the pen (drawing graphics). The default value is #000 (black).                                                                                                                                                        |
| `strokeStyle`   | with `stroke`                                                                                                                                                                                                                                                        |
| `strokeOpacity` | Used to set the transparency of the edge color.                                                                                                                                                                                                                      |
| `shadowColor`   | To describe the properties of the shadow color, see [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowColor).                                                                                                                    |
| `shadowBlur`    | A property describing the degree of blur effect; it neither corresponds to pixel values ​​nor is affected by the current conversion matrix. The default value is 0, see [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowBlur). |
| `shadowOffsetX` | The attribute describing the horizontal offset distance of the shadow, see [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowOffsetX).                                                                                           |
| `shadowOffsetY` | For the attribute describing the vertical offset distance of the shadow, see [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowOffsetY).                                                                                         |
| `opacity`       | Set the properties of graphics and picture transparency. The value ranges from 0.0 (fully transparent) to 1.0 (fully opaque).                                                                                                                                        |

## Gradient

For the convenience of users, G2 provides support for linear gradients and radial/circular gradients by default. The definition methods are as follows:

### Linear gradient

![](https://gw.alipayobjects.com/zos/rmsportal/ElBYXdsTZKFflacOBNtp.png#align=left&display=inline&height=142&originHeight=328&originWidth=1384&status=done&style=none&width=600)

> Note: `l` indicates the use of linear gradient, the green font is variable, filled by the user, separated by a blank.

```javascript
// example
// Use gradient color stroke, gradient angle is 0, gradient starting point color #ffffff, midpoint gradient color #7ec2f3, ending gradient color #1890ff
stroke: 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff';
```

### Radial/circular gradient

![](https://gw.alipayobjects.com/zos/rmsportal/fBFocveoeRaeaCCPTaFo.png#align=left&display=inline&height=144&originHeight=408&originWidth=1702&status=done&style=none&width=600)

> Note: `r` indicates the use of a radial gradient, the green font is variable, which is filled in by the user. The xyr values ​​of the starting circle are all relative values, ranging from 0 to 1, and no spaces are allowed in'r(x,y,r)'. The colors are separated by a space.

```javascript
// example
// Use gradient color to fill, the center coordinate of the starting circle of the gradient is the center point of the bounding box of the filled object, the radius is 0.1 times (the diagonal length of the bounding box / 2), the color of the starting point of the gradient #ffffff , The gradient color at the midpoint is #7ec2f3, and the gradient color at the end is #1890ff
fill: 'r(0.5,0.5,0.1) 0:#ffffff 1:#1890ff';
```

## Line style

| Attribute Name | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `lineCap`      | Canvas 2D API specifies how to draw the attributes of the end of each line segment. There are three possible values are: `butt`, `round` and `square`. The default value is butt, see [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap).                                                                                                                                                                                                                                                                  |
| `lineJoin`     | Canvas 2D API is used to set the properties of how 2 connected parts (line segments, arcs, curves) with a length of 0 are connected together (the deformed part with a length of 0, whose designated end and control point are at the same position, will be Ignore), see [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin).                                                                                                                                                                             |
| `lineWidth`    | Canvas 2D API sets the attribute of the line segment thickness (ie the width of the line segment). When getting the attribute value, it can return the current value (the default value is 1.0). When assigning values ​​to attributes, 0, negative numbers, Infinity and NaN will be ignored; otherwise, they will all be assigned a new value, see [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth).                                                                                                 |
| `miterLimit`   | Canvas 2D API sets the property of the miter surface to limit the ratio. When the property value is obtained, the current value is returned (the default value is 10.0). When assigning a value to a property, 0, negative numbers, Infinity, and NaN are all ignored; all others are assigned a new value. , See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/miterLimit).                                                                                                                                   |
| `lineDash`     | Set the dashed style of the line, you can specify an array. A set of numbers describing the length of alternately drawn line segments and spacing (coordinate space units). If the number of array elements is odd, the array elements will be copied and repeated. For example, [5, 15, 25] will become [5, 15, 25, 5, 15, 25]. This property depends on whether the browser supports the `setLineDash()` function, for details reference [setLineDash](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash). |

## Text attributes

| Attribute Name | Description                                                                                                                                              |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `textAlign`    | Set the current alignment of the text content, supported attributes: center                                                                              |
| `textBaseline` | Set the current text baseline used when drawing text, supported attributes: top                                                                          |
| `fontStyle`    | Specifies the font style. Possible values: 'normal', 'italic', 'oblique'                                                                                 |
| `fontSize`     | Specify font size, in pixels                                                                                                                             |
| `fontFamily`   | Specifies the font family                                                                                                                                |
| `fontWeight`   | Specifies the thickness of the font. Possible values: 'normal', 'bold', 'bolder', 'lighter', '100', '200, '300', '400','500', '600', '700', '800', '900' |
| `fontVariant`  | Specifies font variants. Possible values: 'normal', 'small-caps'                                                                                         |
| `lineHeight`   | Specify line height, in pixels                                                                                                                           |
