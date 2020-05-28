---
title: 视觉通道
order: 4
---

## 简介

数据可视化的核心内容是可视化编码，是将数据信息映射成可视化元素的技术。就像数据包含属性和值，可视化编码也由两部分组成：几何标记（图形元素）和视觉通道。

- 数据属性 -> 标记：直观的代表数据的性质分类，通常是几何图形元素，例如：点、线、面、体。
- 数据值 -> 视觉通道：用于表现数据属性的定量信息，包括标记的位置、大小、形状、方向、色调、饱和度、亮度等。

![](https://zos.alipayobjects.com/rmsportal/sUVPnGdAmXpwcfJ.png#align=left&display=inline&height=611&originHeight=611&originWidth=903&status=done&style=none&width=903)

## 视觉通道的类型

人类对视觉通道的识别有两种基本的感知模式。第一种感知模式得到的信息是关于对象本身的特征和位置等，对应视觉通道的定性性质和分类性质；第二种感知模式得到的信息是对象某一属性在数值上的大小，对应视觉通道的定量性质或者定序性质。因此我们将视觉通道分为 2 大类：

- 定性（分类）的视觉通道，如形状、颜色的色调、控件位置。
- 定量（连续、有序）的视觉通道，如直线的长度、区域的面积、空间的体积、斜度、角度、颜色的饱和度和亮度等。

然而两种分类不是绝对的，例如位置信息，既可以区分不同的分类，又可以分辨连续数据的差异。

## 视觉通道的表现力

进行可视化编码时我们需要考虑不同视觉通道的表现力和有效性，主要体现在下面几个方面：

- 准确性，是否能够准确的表达视觉数据之间的变化
- 可辨认性，同一个视觉通道能够编码的分类个数，即可辨识的分类个数上限
- 可分离性，不同视觉通道的编码对象放置到一起，是否容易分辨
- 视觉突出，重要的信息，是否用更加突出的视觉通道进行编码

视觉通道的表现力：![](https://zos.alipayobjects.com/rmsportal/SbFIAczdQaCpyKV.png#align=left&display=inline&height=697&originHeight=697&originWidth=932&status=done&style=none&width=932)

## 数据到视觉通道的映射

数据的字段和可视化通道之间建立对应关系的过程就是可视化编码的过程，可以

- 一个数据字段对应一个视觉通道（1：1)
- 一个数据字段对应多个视觉通道（1：n)
- 多个数据字段对应一个视觉通道（n：1）

我们看下面的示例：

- 班级的学生数

![](https://zos.alipayobjects.com/rmsportal/bIQipBMtMuvLGxe.png#align=left&display=inline&height=405&originHeight=405&originWidth=709&status=done&style=none&width=709)本图存在以下映射关系：

- x 轴上班级映射到位置的`视觉通道`
- y 轴上学生数映射到矩形的`长度`

两个映射都是 1：1 的映射。

```javascript
chart.interval().position('班级*人数');
```

- 不同班级不同的颜色

![](https://zos.alipayobjects.com/rmsportal/oHWeicdztGhaJqT.png#align=left&display=inline&height=400&originHeight=400&originWidth=774&status=done&style=none&width=774)

本图存在以下映射关系：

- x 轴上班级映射到`位置`
- y 轴上学生数映射到矩形的`长度`
- 班级也映射到`颜色`

所以班级的映射存在两个视觉通道 1：n。

```javascript
chart
  .interval()
  .position('班级*人数')
  .color('班级');
```

- 人数和班级共同决定颜色

![](https://zos.alipayobjects.com/rmsportal/rpqzzXemVdFsncz.png#align=left&display=inline&height=405&originHeight=405&originWidth=773&status=done&style=none&width=773)

颜色由班级和学生人数共同决定，规则如下：

- 如果班级等于 '1'或者人数大于 40 则映射成红色
- 其他则映射成绿色

班级和学生人数共同决定了颜色映射，所以此映射是 n：1。

```javascript
chart
  .interval()
  .position('班级*人数')
  .color('班级*人数', (grade, count) => {
    if (grade == '1' || count > 40) {
      return 'red';
    }
    return 'green';
  });
```

##

## G2 视觉通道的设计

### 视觉通道类型

在 G2 中我们实现了如下类型的视觉通道（也称图形属性）：、

- position(位置)，二维坐标系内可以映射到 x,y，三维坐标系可以映射到 x,y,z。
- color（颜色），包含了色调、饱和度和亮度。
- size（大小），不同的图形对大小的定义有所差异。
- shape（形状），图形的形状决定了某个图表类型的表现方式。例如 点图，可以使用圆点、三角形、小的图片表示；线图可以使用折线、曲线、点线等表现形式。

### 语法设计

G2 中的视觉通道作为标记的属性存在，需要支持以下功能：

- 支持 1 ：1，1 : n，n : 1 多种数据和视觉通道的映射。
- 不同的标记决定图形对视觉通道的解析各不相同。

视觉通道在 G2 的语法中这样定义：

`chart.<geom><attr>(dims,[callback])`

- geom，[图表类型](./geometry/overview)，在后面的章节中介绍。
- attr，图表类型的属性，对应视觉通道。
- dims，参与单个视觉通道映射的字段。
- callback，如何解析视觉通道，可以不提供，G2 提供了默认的视觉通道解析方式。

除了 attr(dims,callback)的函数原型外，G2 为了用户的便利性，结合各个视觉通道的特点，也提供了更为便捷的使用方式，在本章后面有详细的介绍。

示例：

```javascript
chart
  .point()
  .position('a*b')
  .color('c');

chart
  .interval()
  .position('a*b')
  .color('c', (c) => {
    if (c) {
      return 'red';
    }
    return 'green';
  });
```

### position

位置是唯一的既可以用于编码分类，又可用于编码定序或者定量的数据属性。在二维平面上有垂直方向和水平方向两个可以分离的视觉通道。所以 position 属性支持的用户输入方式：

- postion('dim')，仅使用一维的水平方向（x 轴）的视觉通道，此时,垂直方向的视觉通道没有数据含义。
- postion('dim1\*dim2')，同时使用水平和垂直 2 个视觉通道。

| 一维点图 | ![](https://zos.alipayobjects.com/rmsportal/EhJdGOdWSPXdXNp.png#align=left&display=inline&height=500&originHeight=500&originWidth=891&status=done&style=none&width=891) |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 二维点图 | ![](https://zos.alipayobjects.com/rmsportal/OOCyVlrQbBXoxWp.png#align=left&display=inline&height=481&originHeight=481&originWidth=992&status=done&style=none&width=992) |

### color

从可视化编码的角度对颜色进行分析，可以将颜色分为亮度、饱和度和色调三个视觉通道，其中前 2 个可以认为是定量和定序的视觉通道，而色调属于定性的视觉通道。而我们在 G2 中我们并不区分这 3 个视觉通道，因此我们认为颜色既是分类又是定量的视觉通道。所以 color 方法有更多的快捷方式：

- color('c')，使用默认的回调函数，读取一个数组中的颜色进行颜色的映射。
- color('c',colors)，指定映射的颜色类型，此时通常映射到分类数据。
- color('c','color1-color2-colorn')，指定颜色的渐变路径，在这个渐变路径映射定量（连续)的数据。
- color('red') 直接指定常量，不进行数据映射。

| 分类数据的颜色映射         | ![](https://zos.alipayobjects.com/rmsportal/HByTteoZSWpfgtY.png#align=left&display=inline&height=505&originHeight=505&originWidth=983&status=done&style=none&width=983) |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 定量（连续）数据的颜色映射 | ![](https://zos.alipayobjects.com/rmsportal/XbhNUSQBaTyACCj.png#align=left&display=inline&height=460&originHeight=460&originWidth=837&status=done&style=none&width=837) |

### size

从可视化的角度分析，大小（size)是一个复杂的视觉通道，对于不同的标记含义不完全一致：

- 对于点来说 size 对应的是点的半径。
- 对于线来说 size 对应的是线的粗细。
- 对于柱状图来说 size 是柱状图的宽度。

size 的快捷方式：

- size(dim) 指定映射到 size 的字段，内置最大和最小（像素大小）。
- size(dim,max,min)，指定映射到 size 字段外，还提供了最大像素和最小像素。
- size(10) 直接指定像素大小。

更多的对 size 的解释可以查看后面章节的各个图表类型中对 size 的解析。

| 点图大小     | ![](https://zos.alipayobjects.com/rmsportal/dPGcvREkAlkEjdE.png#align=left&display=inline&height=448&originHeight=448&originWidth=723&status=done&style=none&width=723) |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 柱状图的大小 | ![](https://zos.alipayobjects.com/rmsportal/yphUobhtWsHexeA.png#align=left&display=inline&height=503&originHeight=503&originWidth=988&status=done&style=none&width=988) |

### shape

不同的图表类型有不同的 shape(形状)，各自的章节中详细介绍。shape 这个视觉通道受其他几个视觉通道影响，比如：shape 可以将 color 映射到填充色上，也可以映射到边框上。shape 方法的使用方式比较简单，常用于映射分类数据：

- shape('dim')，将指定的字段映射到内置的 shapes 数组中。
- shape('dim',shapes)，用户自己提供 shapes 数据，来进行数据映射。
- shape('circle')，指定常量，映射到固定的 shape。

| 点图形状   | ![](https://zos.alipayobjects.com/rmsportal/dvPRCjZYYexnETW.png#align=left&display=inline&height=427&originHeight=427&originWidth=1000&status=done&style=none&width=1000) |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 柱状图形状 | ![](https://zos.alipayobjects.com/rmsportal/egrgZHmbhXtjyiI.png#align=left&display=inline&height=480&originHeight=480&originWidth=974&status=done&style=none&width=974)   |
