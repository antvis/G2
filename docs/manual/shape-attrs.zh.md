---
title: 绘图属性速查
order: 8
---

G2 底层使用了 [G](https://g.antv.vision/zh/docs/api/shape/attrs)  绘图引擎。本篇列出了常见的绘图属性，更过关于绘图以及绘图属性的使用请至 [G](https://g.antv.vision/zh/) 中查看。

## 通用属性

| 属性名          | 描述                                                                                                                                                                               |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fill`          | 描述颜色和样式的属性。                                                                                                                                                             |
| `fillOpacity`   | 用于设置图形填充颜色的透明度。                                                                                                                                                     |
| `stroke`        | 描述画笔（绘制图形）颜色或者样式的属性。默认值是 #000 (black)。                                                                                                                    |
| `strokeOpacity` | 用于设置边颜色的透明度。                                                                                                                                                           |
| `shadowColor`   | 描述阴影颜色的属性，参见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowColor)。                                                            |
| `shadowBlur`    | 描述模糊效果程度的属性； 它既不对应像素值也不受当前转换矩阵的影响。 默认值是 0，参见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowBlur)。 |
| `shadowOffsetX` | 描述阴影水平偏移距离的属性，参见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowOffsetX)。                                                  |
| `shadowOffsetY` | 描述阴影垂直偏移距离的属性，参见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowOffsetY)。                                                  |
| `opacity`       | 设置图形和图片透明度的属性。 数值的范围从 0.0 （完全透明）到 1.0 （完全不透明）。                                                                                                  |

## 渐变色

为了方便用户使用，G2 中默认提供对线性渐变、放射状/环形渐变两种渐变色的支持，定义方式如下：

### 线性渐变

![](https://gw.alipayobjects.com/zos/rmsportal/ElBYXdsTZKFflacOBNtp.png#align=left&display=inline&height=142&originHeight=328&originWidth=1384&status=done&style=none&width=600)

> 说明：`l` 表示使用线性渐变，绿色的字体为可变量，由用户自己填写，由一个空格进行间隔。

```javascript
// example
// 使用渐变色描边，渐变角度为 0，渐变的起始点颜色 #ffffff，中点的渐变色为 #7ec2f3，结束的渐变色为 #1890ff
stroke: 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff';
```

### 放射状/环形渐变

![](https://gw.alipayobjects.com/zos/rmsportal/fBFocveoeRaeaCCPTaFo.png#align=left&display=inline&height=144&originHeight=408&originWidth=1702&status=done&style=none&width=600)

> 说明：`r` 表示使用放射状渐变，绿色的字体为可变量，由用户自己填写，开始圆的 x y r 值均为相对值，0 至 1 范围，'r(x,y,r)' 内不可留有空格，颜色之间由一个空格进行间隔。

```javascript
// example
// 使用渐变色填充，渐变起始圆的圆心坐标为被填充物体的包围盒中心点，半径为(包围盒对角线长度 / 2) 的 0.1 倍，渐变的起始点颜色 #ffffff，中点的渐变色为 #7ec2f3，结束的渐变色为 #1890ff
fill: 'r(0.5,0.5,0.1) 0:#ffffff 1:#1890ff';
```

## 线条样式

| 属性名       | 描述                                                                                                                                                                                                                                                                                                                                                                 |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `lineCap`    | Canvas 2D API 指定如何绘制每一条线段末端的属性。有 3 个可能的值，分别是：`butt`, `round` and `square`。默认值是 butt，参见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap).                                                                                                                                                 |
| `lineJoin`   | Canvas 2D API 用来设置 2 个长度不为 0 的相连部分（线段，圆弧，曲线）如何连接在一起的属性（长度为 0 的变形部分，其指定的末端和控制点在同一位置，会被忽略），参见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineJoin).                                                                                                           |
| `lineWidth`  | Canvas 2D API 设置线段厚度的属性（即线段的宽度）。当获取属性值时，它可以返回当前的值（默认值是 1.0 ）。 当给属性赋值时， 0、 负数、 Infinity 和 NaN 都会被忽略；除此之外，都会被赋予一个新值，参见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineWidth).                                                                       |
| `miterLimit` | Canvas 2D API 设置斜接面限制比例的属性。 当获取属性值时， 会返回当前的值（默认值是 10.0 ）。当给属性赋值时， 0、负数、 Infinity 和 NaN 都会被忽略；除此之外都会被赋予一个新值。，参见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit).                                                                                   |
| `lineDash`   | 设置线的虚线样式，可以指定一个数组。一组描述交替绘制线段和间距（坐标空间单位）长度的数字。 如果数组元素的数量是奇数， 数组的元素会被复制并重复。例如， [5, 15, 25] 会变成 [5, 15, 25, 5, 15, 25]。这个属性取决于浏览器是否支持 `setLineDash()` 函数，详情参考 [setLineDash](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/setLineDash)。 |

## 文本属性

| 属性名         | 描述                                                                                                                         |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `textAlign`    | 设置文本内容的当前对齐方式, 支持的属性：center                                                                               |
| `textBaseline` | 设置在绘制文本时使用的当前文本基线, 支持的属性:top                                                                           |
| `fontStyle`    | 规定字体样式。可能的值：'normal', 'italic', 'oblique'                                                                        |
| `fontSize`     | 规定字号，以像素计                                                                                                           |
| `fontFamily`   | 规定字体系列                                                                                                                 |
| `fontWeight`   | 规定字体的粗细。可能的值：'normal', 'bold', 'bolder', 'lighter', '100', '200, '300', '400','500', '600', '700', '800', '900' |
| `fontVariant`  | 规定字体变体。可能的值：'normal', 'small-caps'                                                                               |
| `lineHeight`   | 规定行高，以像素计                                                                                                           |
