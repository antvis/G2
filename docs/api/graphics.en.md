---
title: Graphic 图形相关
order: 9
---

G2 底层使用的 G 同时支持 Canvas 以及 SVG，因此绘制的所有图形都支持 Canvas 的属性，本章列出常用的属性，详细信息参考[ canvas 属性](http://www.w3school.com.cn/tags/html_ref_canvas.asp)。

## 通用属性

- `fill` 设置用于填充绘画的颜色、渐变或模式；

- `stroke` 设置用于笔触的颜色、渐变或模式；

- `shadowColor` 设置用于阴影的颜色；

- `shadowBlur`  设置用于阴影的模糊级别；

- `shadowOffsetX` 设置阴影距形状的水平距离；

- `shadowOffsetY` 设置阴影距形状的垂直距离；

- `opacity` 设置绘图的当前 alpha 或透明值；

- `globalCompositeOperation` 设置新图像如何绘制到已有的图像上。

> **！注意：**

G2 对图形属性进行了缩写

- fillStyle 缩写为 `fill`；

- stokeStyle 缩写为 `stroke`；

- globalAlpha 缩写为 `opacity`。

## 线条样式

- [lineCap](http://www.w3school.com.cn/tags/canvas_linecap.asp) 设置线条的结束端点样式；

- [lineJoin](http://www.w3school.com.cn/tags/canvas_linejoin.asp)  设置两条线相交时，所创建的拐角形状；

- [lineWidth](http://www.w3school.com.cn/tags/canvas_linewidth.asp) 设置当前的线条宽度；

- [miterLimit](http://www.w3school.com.cn/tags/canvas_miterlimit.asp)  设置最大斜接长度。

> **！注意：**

1. G2 在现有线的样式基础上增加了虚线的支持：

- `lineDash`：设置线的虚线样式，可以指定一个数组。一组描述交替绘制线段和间距（坐标空间单位）长度的数字。 如果数组元素的数量是奇数， 数组的元素会被复制并重复。例如， [5, 15, 25] 会变成 [5, 15, 25, 5, 15, 25]。

这个属性取决于浏览器是否支持 setLineDash 函数，详情参考[setLineDash](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash)。

1. G2 在现有线的基础上增加了首尾箭头的绘制支持：

- `startArrow`: true|boolean，是否渲染起点箭头

- `endArrow`: true|boolean，是否渲染终点箭头

- `arrowAngle`: number，角度，箭头的夹角大小

- `arrowRadius`: number，箭头长度

## 文本属性

- [font](http://www.w3school.com.cn/tags/canvas_font.asp)  设置文本内容的当前字体属性；

- [textAlign](http://www.w3school.com.cn/tags/canvas_textalign.asp) 设置文本内容的当前对齐方式, 支持的属性：center|end|left|right|start；

- [textBaseline](http://www.w3school.com.cn/tags/canvas_textbaseline.asp)  设置在绘制文本时使用的当前文本基线, 支持的属性:top|middle|bottom。

**！注意：**

G2 提供了额外的几个文本属性，便于用户设置字体，具体的含义参考[font 组成](http://www.w3school.com.cn/tags/canvas_font.asp)

- `fontStyle` 对应 font-style；

- `fontVariant` 对应 font-variant；

- `fontWeight` 对应 font-weight；

- `fontSize` 对应 font-size；

- `fontFamily` 对应 font-family；

## 渐变色

G2 中提供了线性渐变、放射状 / 环形渐变两种形式，使用方式如下：

- 线性渐变

- ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*TFaZR4fJGbQAAAAAAAAAAABkARQnAQ)

> 说明：`l` 表示使用线性渐变，绿色的字体为可变量，由用户自己填写。

```javascript
// example
// 使用渐变色描边，渐变角度为 0，渐变的起始点颜色 #ffffff，中点的渐变色为 #7ec2f3，结束的渐变色为 #1890ff
stroke: 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff'
```

- 放射状 / 环形渐变

- ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*pMB-Qb2l19sAAAAAAAAAAABkARQnAQ)

> 说明：`r` 表示使用放射状渐变，绿色的字体为可变量，由用户自己填写，开始圆的 x y r 值均为相对值，0 至 1 范围。

```javascript
// example
// 使用渐变色填充，渐变起始圆的圆心坐标为被填充物体的包围盒中心点，半径为(包围盒对角线长度 / 2) 的 0.1 倍，渐变的起始点颜色 #ffffff，中点的渐变色为 #7ec2f3，结束的渐变色为 #1890ff
fill: 'r(0.5, 0.5, 0.1) 0:#ffffff 1:#1890ff'
```

## 纹理![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*uff-R6uz34QAAAAAAAAAAABkARQnAQ)

> 说明：`p` 表示使用纹理，绿色的字体为可变量，由用户自己填写。

- `a`: 该模式在水平和垂直方向重复；

- `x`: 该模式只在水平方向重复；

- `y`: 该模式只在垂直方向重复；

- `n`: 该模式只显示一次（不重复）。

纹理的内容可以直接是图片或者 [Data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)。

```javascript
// example
// 使用纹理填充，在水平和垂直方向重复图片
fill: 'p(a)https://gw.alipayobjects.com/zos/rmsportal/ibtwzHXSxomqbZCPMLqS.png'
```
