---
title: 多边形 polygon
order: 5
---

## 简介

由任意多个点构成的封闭图形是多边形，多边形在 G2 中由以下应用：

- 多个分类数据生成的色块图。
- 连续数据生成的马赛克图。
- 地图等多个点构成的多边形。
- 层次数据生成的填充树图。

![](https://zos.alipayobjects.com/basement/skylark/0ad680ae14791833491503986d17c0/attach/4080/900/image.png#align=left&display=inline&height=499&originHeight=499&originWidth=836&status=done&style=none&width=836)

## 支持的数据格式

由于多边形由多个点构成所以需要多个 x 和多个 y,所以一般来说多边形需要的数据格式是：

- x 是数组，y 是数组

但是由于分类数据不同分类之间都有间隔，所以单个分类数据可以转换成一个范围数据如：

```javascript
const data1 = [{ name1: 'a' }, { name1: 'b' }];

// 数字化
const data2 = [{ name: 0 }, { name: 1 }];

// 转换成多边形需要的数据
const data3 = [{ name: [-0.5, 0.5] }, { name: [0.5, 1.5] }];
```

- x 字段是分类数值，y 字段是分类数值

```javascript
chart.polygon().position('from*to').color('price').label('price', {
  offset: -2,
});
```

from 和 to 字段都是分类类型，多边形会自动转换成一个区间数组。

![](https://zos.alipayobjects.com/basement/skylark/0ad6383d14791834913405347d7559/attach/4080/900/image.png#align=left&display=inline&height=458&originHeight=458&originWidth=902&status=done&style=none&width=902)

## 支持的视觉通道

### 颜色（color)

使用多边形时，经常将连续字段映射到颜色上，也可以使用统计函数计算多边形对应的数据的数量等统计值。

```javascript
// 直接将价格映射到颜色
chart.polygon().position('from*to').color('price');
```

### 大小（size)

多边形由位置的字段决定，x、y 一般都是数组，无法通过 size 属性控制多边形的大小，所以 size 对于多边形来说无意义。但是存在 x，y 是分类类型数值的情形，此时 size 可以控制多边形在分类数值上的宽度或者长度，这时候使用像素值控制多边形的大小不太合适，无法跟其他图标的 size 相统一，所以暂时未在 G2 中支持。

### 形状（shape)

多边形由多边形位置字段 x,y 决定，所以 shape 字段无法控制多边形的形状，仅仅能控制多边形是否填充，所以 G2 的多边形提供了以下几种形状（shape):

- polygon : 默认的多边形形状，颜色填充多边形，无边框。

## 多边形和统计函数

由于输入数据基本都是标准的 JSON，而多边形需要的数据，x 字段，y 字段都是数据，所以需要对数据做一些处理。多边形中常用的统计函数有：

- bin 函数，将连续数据进行封箱处理，将连续数据转换成数组。
  - bin.rect 将数据所在的范围封装成四边形
  - bin.hex 将数据所在的范围封装成六边形
- map 函数，将地图上指定名称的区域，转换成地图上的经纬度数组。
  - map.range(name) 根据地图的区域名称，获取地图所在的范围
- treemap 函数，将数据转换成树图所需要的四边形数组。

##

## 多边形和坐标系

在直角坐标系下多边形的各个边都是直线，在极坐标系下，多边形同半径的边会转换成圆弧，会自动生成很多特殊的图表，下面是一些示例：

![](https://zos.alipayobjects.com/basement/skylark/0ad680ae14791835854894028d17c0/attach/4080/900/image.png#align=left&display=inline&height=304&originHeight=304&originWidth=895&status=done&style=none&width=895)
