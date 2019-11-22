---
title: Geometry 几何标记
order: 3
---

语法示例：

```javascript
chart.<geomType>()
  .position()
  .size()
  .color()
  .shape()
  .opacity()
  .adjust()
  .tooltip()
  .label()
  .style()
  .select();
```

几何标记对象，决定创建图表的类型，具体的概念介绍请参见 [Geometry](/zh/docs/manual/tutorial/geometry)。

下面是一条简单的绘制柱状图的语法，声明完使用的 geom 类型之后，就可以进行图形上的各种图形属性映射，下面我们会进行详述。

```javascript
chart.interval().position('x*y').color('x');
```

注意：上述 `chart.interval()` 返回的不是 chart 对象，而是一个 geom 几何标记对象 Geom。

以下是目前 Geom 的基本类型：

| type | 说明 |
| --- | --- |
| `point` | 点，用于点图的构建。 |
| `path` | 路径，无序的点连接而成的一条线。 |
| `line` | 线，点按照 x 轴连接成一条线，构成线图。 |
| `area` | 填充线图跟坐标系之间构成区域图，也可以指定上下范围。 |
| `interval` | 使用矩形或者弧形，用面积来表示大小关系的图形，一般构成柱状图、饼图等图表。 |
| `polygon` | 多边形，可以用于构建热力图、地图等图表类型。 |
| `schema` | k 线图，箱型图。 |
| `edge` | 树图、流程图、关系图。 |
| `heatmap` | 热力图。 |

另外结合对数据的调整方式，G2 还默认提供了如下的类型：

| 类型 | 描述 |
| --- | --- |
| `pointStack` | 层叠点图 |
| `pointJitter` | 扰动点图 |
| `pointDodge` | 分组点图 |
| `intervalStack` | 层叠柱状图 |
| `intervalDodge` | 分组柱状图 |
| `intervalSymmetric` | 对称柱状图 |
| `areaStack` | 层叠区域图 |
| `schemaDodge` | 分组箱型图 |

当然几何标记和数据调整方式的组合不仅仅局限于上述几种，可以通过整合几何标记和数据调整方式来自由创建和组合图表：

```javascript
chart.area().position('x*y').adjust([ 'stack', 'symmetric' ]);
```

> 关于数据调整和几何标记更详细的介绍请阅读 G2 高级教程: [几何标记和数据调整](/zh/docs/manual/advanced/geom-and-adjust)。

Geom 支持的接口可以分为三大类：

1. 数据映射相关的属性函数：`position`, `color`, `shape`, `size`, `opacity`；

2. 显示辅助信息的函数：`style`, `label`, `tooltip`；

3. 额外的控制函数：`adjust`, `select`, `active`，`show`, `hide`。

## 方法

### position

将数据值映射到图形的位置上的方法。

```javascript
line().position('x*y');
line().position([ 'x', 'y' ]);
```

#### position('fieldA*fieldB')

使用 `*` 连接，position 属性会对多个字段进行数据的映射，如：cut_price，x_y 等，用于二维坐标系图表的绘制。

以 chart.point().position('x_y') 为例，point 代表图形，即最后需要生成点图，而 position 代表位置，position('x_y') 代表数据在图形中的位置由 x 和 y 这两个维度的变量决定，x * y 的数据处理结果可以理解为：

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*fqtvRZZ5FiQAAAAAAAAAAABkARQnAQ)

(x1, y1) 这样的数值对，最后就会被转换为画布上对应的坐标点。

另外，也可以以数组格式传入：`chart.geom().position([ 'fieldA', 'fieldB' ])`

### color

将数据值映射到图形的颜色上的方法。

```javascript
line().color('red'); // 常量颜色
line().color('type'); // 对 type 字段进行映射，使用内置的颜色
line().color('type', [ 'red', 'blue' ]) // 指定颜色
line().color('type', (type) => { // 通过回调函数
  if (type === 'a') {
    return 'red';
  }
  return 'blue';
});
line().color('type*value', (type, value) => { //多个参数，通过回调函数
  if (type === 'a' && value > 100) {
    return 'red';
  }
  return 'blue';
});
```

#### color(value)

##### 参数

- `value`: string

只支持接收一个参数，value 可以是：

  - 映射至颜色属性的数据源字段名，如果数据源中不存在这个字段名的话，则按照常量进行解析，这个时候会使用 G2 默认提供的颜色。

  - 也可以直接指定某一个具体的颜色值 color，如 '#fff', 'white' 等。
  - 可以是渐变色，譬如` l(270) 0:#173162 1:#3663a1`

##### 代码示例

```javascript
chart.point().position('x*y').color('x'); // 对 x 字段进行映射，使用内置的颜色
chart.point().position('x*y').color('red'); // 所有点用红色渲染
chart.point().position('x*y').color('l(270) 0:#173162 1:#3663a1'); // 使用渐变色，l 后面传入角度，0 代表起始颜色，1 代表结束颜色
```

#### color(field, colors)

##### 参数

- `field`: string

field 为映射至颜色属性的数据源字段名，也支持指定多个参数。

- `colors`: string | array | function

colors 的参数有以下情况：

  - 如果为空，即未指定颜色的数组，那么使用内置的全局的颜色；

  - 如果需要指定颜色，则需要以数组格式传入，那么分类的颜色按照数组中的颜色确定。对于颜色的分配顺序，会默认按照原始数据源中字段的顺序进行分配；

  - 还支持渐变颜色设置：'color1-color2'，用于指定一个渐变色，数据根据分类或者连续类型，在渐变的颜色区间内取颜色。

```javascript
chart.point().position('x*y').color('z'); // 使用默认的颜色
chart.point().position('x*y').color('z', [ 'red', 'blue' ]); // 使用传入的指定颜色
chart.point().position('x*y').color('z', 'red-blue'); // 使用渐变色
```

  - colors 如果是回调函数，则该回调函数的参数为对应字段的数值，具体使用如下，当 color 映射为多个字段时，参数按照字段声明的顺序传入：

```javascript
chart.point().position('x*y').color('z', (value) => {
  if(value === 1) {
    return 'red'
  }

  return 'blue';
});
```

### shape

将数据值映射到图形的形状上的方法。

```javascript
point.shape('circle'); // 常量
point.shape('type'); // 使用字段映射到形状，使用内置的形状
point.shape('type', [ 'circle', 'diamond', 'square' ]); // 指定形状
point.shape('type', (type) => { // 回调函数
  if(type === 'a') {
    return 'circle';
  }
  return 'square';
});
```

#### shape(shape)

##### 参数

- `shape`: string

只支持接收一个参数，指定几何图像对象绘制的形状。下表列出了不同的 geom 几何图形对象支持的 shape 形状：

| geom 类型 | shape 类型 | 解释 |
| --- | --- | --- |
| point | 'circle', 'square', 'bowtie', 'diamond', 'hexagon', 'triangle', 'triangle-down',<br />'hollowCircle', 'hollowSquare', 'hollowBowtie', 'hollowDiamond',<br />'hollowHexagon', 'hollowTriangle', 'hollowTriangle-down',<br />'cross', 'tick', 'plus', 'hyphen', 'line' | hollow 开头的图形都是空心的。 |
| line | 'line','smooth','dot','dash','spline' | -- |
| area | 'area','smooth','line','smoothLine' | -- |
| interval | 'rect','hollowRect','line','tick' | hollowRect 是空心的矩形，line 和 tick 都是线段 |
| polygon | 'polygon','hollow' | polygon 多边形、hollow 空心多边形。 |
| schema | 'box','candle' | 目前仅支持箱型图、K 线图 |

##### 代码示例

```javascript
chart.point().position('x*y').shape('square'); // 指定所有点的图形是正方形
```

#### shape(field, shapes)

指定多个图形，图形的顺序跟字段的值对应。

##### 参数

- `field`: string

dim 为映射至颜色属性的数据源字段名。

- `shapes`: string | array

shapes 是一个可选参数，如果没有声明会按照 G2 默认为特定 geom 类型配置的形状进行渲染，当然用户也可自己指定渲染的形状，具体的形状已在上面列出，下面是 G2 为特定的几何图形对象提供的 shapes:

```javascript
const shapes = {
  point: [ 'hollowCircle', 'hollowSquare', 'hollowDiamond', 'hollowBowtie', 'hollowTriangle', 'hollowHexagon', 'cross', 'tick', 'plus', 'hyphen', 'line' ],
  line: [ 'line', 'dash', 'dot' ],
  area: [ 'area' ]
};
```

##### 代码示例

```javascript
const defs = {
  'cut': {
    values: [ 'Ideal', 'Premium', 'Very-Good', 'Good', 'Fair' ]
  }
};
chart.source(data, defs);
chart.point().position('carat*price').shape('cut'); // 使用默认的 shapes
chart.point().position('carat*price').shape('cut', [ 'cross', 'tick', 'plus', 'hyphen', 'line' ]); // 使用自定义的 shapes
```

#### shape(field, callback)

通过回调函数设置图形类型。

##### 参数

- `field`: string

field 为映射至颜色属性的数据源字段名。

- `callback`: function

[Function] 回调函数

##### 代码示例

```javascript
chart.point().position('x*y').shape('z', (value) => {
  if (value === 1) {
    return 'circle'
  }
  return 'square';
});
```

### size

将数据值映射到图形的大小上的方法。

```javascript
point.size(10); // 常量
point.size('type'); // 使用字段映射到大小
point.size('type', [ 0, 10 ]); // 使用字段映射到大小，并指定最大值和最小值
point.size('type', (type) => { // 回调函数
  if(type === 'a') {
    return 10;
  }
  return 5;
});
```

#### size(value）

传入数字常量，如 `chart.point().size(20)`。

**注意：** 不同图形的 size 的含义有所差别：

- point 图形的 size 影响点的半径大小；

- line, area, path 中的 size 影响线的粗细；

- interval 的 size 影响柱状图的宽度。

#### size(field)

根据 field 字段的值映射大小，使用默认的`最大值 max:10` 和`最小值 min: 1`。

##### 代码示例

```javascript
chart.point().position('x*y').size('z'); // 使用 z 字段的值来映射大小
```

#### size(field, [min, max])

根据 field 字段的值映射大小，使用声明的最大值 max 和最小值 min。

##### 代码示例

```javascript
chart.point().position('x*y').size('z', [ 10, 100 ]); // 使用 z 字段的值来映射大小，最大值为 100，最小值 10
```

#### size(field, callback)

使用回调函数控制图形大小。

##### 参数

- `callback`: function

回调函数。

##### 代码示例

```javascript
chart.point().position('x*y').size('z', (value) => {
  if(value === 1) {
    return 5;
  }
  return 10;
});
```

### opacity

将数据值映射到图形的透明度上的方法。

```javascript
point.opacity(0.3); // 常量，但是数值范围为 0 - 1
point.opacity('type'); // 使用字段映射到透明度
point.opacity('type', (type) => { // 回调函数
  if(type === 'a') {
    return 1;
  }
  return 0.5;
});
```

#### opacity(value)

直接指定所有图形的透明度，value 为 0 至 1 范围的小数。

##### 代码示例

```javascript
chart.interval().position('x*y').opacity(0.8); // 图形颜色为 0.8 透明度
```

#### opacity(field)

根据 field 字段的值计算透明度。

##### 代码示例

```javascript
chart.interval().position('x*y').opacity('z');
```

#### opacity(field, callback)

通过回调函数设置透明度。

##### 代码示例

```javascript
chart.point().position('x*y').opacity('z', (value) => {
  if(value === 1) {
    return 0.5;
  }
  return 0.8;
});
```

### adjust

声明几何标记对象的数据调整方式，可用于绘制层叠图、扰动图、分组图等。支持单一的数据调整方式也支持各种数据调整方式的组合。

G2 支持的调整类型包括： 'stack', 'dodge', 'jitter', 'symmetric'

```javascript
interval().adjust('stack');
interval().adjust([ 'dodge', 'stack' ]);
interval().adjust([{
  type: 'dodge',
  marginRatio: 0, // 数值范围为 0 至 1，用于调整分组中各个柱子的间距
  dodgeBy: 'xx' // 声明按照 xx 字段进行分组，一般不需要声明
}]);
```

上述已经已经提到我们除了提供一些基本的几何图形对象类型之外，结合数据的调整方式提供了类似 pointStack 的类型，其实这些类型也可以通过参数的形式传入，并且用户还可以对这些数据的调整方式进行组合，创造出新颖多样的图表来。如下代码示例：

```javascript
chart.interval().position('x*y').color('z').adjust('stack');
```

stack 类型支持的参数：

- reverseOrder 控制层叠的顺序，默认是 true

```javascript
chart.interval()
    .position('year*percent')
    .color('country')
  	.adjust({type: 'stack', reverseOrder: false});
```

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*g3MNSp7JxLkAAAAAAAAAAABkARQnAQ)![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*28PNToHAiegAAAAAAAAAAABkARQnAQ)

### label

将数据值映射到图形的文本上的方法。

```javascript
line.label('field'); // 显示某个字段的文本
line.label('x*y*z', (x, y, z) => {
  return; // something
});

line.label('x', {
  offset: 10
  textStyle: {
    fill: 'red'
  }
});
```

- textStyle 的更详细的配置项 [绘图属性](/zh/docs/api/graphics)

#### label(field)

使用默认配置渲染 field 字段对应的文本。

##### 参数

- `field`: String

代表数据源中的数据字段名。

##### 代码示例

```javascript
chart.point().position('x*y').label('x');
```

#### label(field, cfg)

设置全量文本的配置信息。所有配置项可见下文配置项。

```javascript
chart.line().label('x', {
  // 设置文本的显示样式，还可以是个回调函数，回调函数的参数为该坐标轴对应字段的数值
  textStyle: {
    textAlign: 'center', // 文本对齐方向，可取值为： start middle end
    fill: '#404040', // 文本的颜色
    fontSize: '12', // 文本大小
    fontWeight: 'bold', // 文本粗细
    textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
  },
   rotate: 30,
})
```

- textStyle 的更详细的配置项 [绘图属性](/zh/docs/api/graphics)

#### label(field, callback, cfg)

使用回调函数控制文本显示效果。

##### 参数

- `field`: string

代表数据源中的数据字段名。

- `callback`: function

回调函数。可以返回字符串，显示成文本；也可以返回对象，对象中的文本使用 "content" 字段。

- `cfg`: object

该配置用法同 `chart.geom().label(field, cfg)` 中的 cfg 属性。

##### 代码示例

```javascript
chart.polygon()
  .position('children*value')
  .color('type').shape('stroke')
  .label('name*children', (name, children) => {
  	if (children === 0) {
  	// 若children为0，不显示该项
        return null;
  	}
  	// 设置没有子节点的标签为红色，有子节点的为蓝色
    if (!children) {
      // 显示的文本使用 content，如果不设置这个值，会自动设置 label 函数里面的第一个字段
      return { textStyle: { fill: 'red' }，content: name };
    } else {
      return { textStyle: { fill: 'blue' } };
    }
  }, {
    textStyle: {
      fontSize: 12
    }
  });
```

<br />

#### label 配置项

##### 通用属性

###### `useHtml`: boolean

是否使用 html 渲染，默认为`false`。

###### `formatter`: function

对显示文本进行格式化 。

##### 代码示例

```javascript
chart.point().position('x*y').label('x', {
  /**
   * 格式化文本信息
   * @param  {string} text  文本值
   * @param  {object} item  该文本值对应的原始数据记录
   * @param  {number} index 索引值
   * @return {string}       返回格式化后的文本
   */
    formatter: function(text, item, index) {
        return text + item.point.y；     // 设置文本为 x + y
    }
});
```

###### `type`: string

文本布局类型。默认为`'default'`。可选值如下：

- scatter: 按照散点图 label 布局算法对所有 label 进行二次布局。数据过于密集的情况下会剔除放不下的 label。

| 散点图普通 label 布局 | 散点图指定 scatter label 布局 |
| --- | --- |
| ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*6f-BRolsnUMAAAAAAAAAAABkARQnAQ) | ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*aRqHSqjJbqYAAAAAAAAAAABkARQnAQ) |

- treemap: 剔除形状容纳不了的 label。

| treemap 普通布局 | 指定 treemap label 布局 |
| --- | --- |
| ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*Ncv3T5LAGf0AAAAAAAAAAABkARQnAQ) | ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*RxyqRryEEiAAAAAAAAAAAABkARQnAQ) |

- map: label 将会初始定位到地图板块的可视中心，为了防止 label 之间相互覆盖布局，尝试向四周偏移，会剔除放不下的 label。

| map 普通布局 | 指定 map label 布局 |
| --- | --- |
| ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*am1WRpYxbnQAAAAAAAAAAABkARQnAQ) | ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*a_rWR4y6mEQAAAAAAAAAAABkARQnAQ) |

###### `labelLine`: { object | boolean }

配置文本连线。如果值为 false，表示不展示文本线。

##### 代码示例

```javascript
chart.line().label('x', {
    labelLine: {
      lineWidth: 1, // 线的粗细
      stroke: '#ff8800', // 线的颜色
      lineDash: [ 2, 1 ], // 虚线样式
    }
});
```

注：为了更好的视觉效果，布局算法会忽略预设的`textAlign`和`textBaseline`。

##### canvas 专有配置属性

offset: { array | number }

设置坐标轴文本 label 距离坐标轴线的距离，可以是数值或数组。默认为`[0, 20]`。数组可指定当前坐标轴 x,y 方向上的偏移。单个数值指定 y 方向上的偏移

textStyle

设置文本的显示样式，具体请见更详细的配置项 [绘图属性](/zh/docs/api/graphics)

autoRotate: boolean

文本是否需要自动旋转，默认为 true

position：string

仅当 chart 的 geom 为`interval`时有效。指定当前 label 与当前图形的相对位置，可选参数为 middle, top,bottom,left,right。默认为 top。位置效果如下：

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*EJn2R7bsak4AAAAAAAAAAABkARQnAQ)

##### html 专有配置属性

htmlTemplate: function

与`useHtml`配合使用。当 useHtml 为 true 时，指定 html 渲染文本。

##### 代码示例

```javascript
chart.area().label('x', {
       useHtml: true,
       htmlTemplate: (text, item, index) {
           return '<div>' + text + '</div>';
       }
   })
```

### tooltip

将数据值映射到 Tooltip 上。

```javascript
tooltip(false); // 关闭该 geom 上的 tooltip
tooltip('x');
tooltip('x*y');
tooltip('x*y', (x, y) => {})
```

#### tooltip(false)

关闭该 geom 上的 tooltip。

#### tooltip(field)

(field: string)

对应数据源的一个或者多个字段，当有多个时，使用 `*` 来连接。

```javascript
chart.<geom>.tooltip('dim1*dim2...*dimN');
```

这个时候 tooltip 的显示内容如下：

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*aM6mRJ4SBGEAAAAAAAAAAABkARQnAQ)

##### 代码示例

```javascript
const data = [
  { gender: "female", height: 161.2, weight: 51.6 },
  { gender: "female", height: 167.5, weight: 59 },
  { gender: "male", height: 159.5, weight: 49.2 },
  { gender: "male", height: 157, weight: 63 },
  { gender: "female", height: 155.8, weight: 53.6 }
];
const chart = new G2.Chart({
  container: 'c2',
  forceFit: true,
  height: 400
});

chart.source(data, {
  weight: {
    alias: '体重（kg）'
  },
  height: {
    alias: '身高（cm）'
  }
});
chart.tooltip({
  showTitle: false
});
chart.point().position('height*weight')
  .color('gender', [ '#f96a52', '#00a3d7' ])
  .opacity(0.5)
  .shape('circle')
  .tooltip('gender*height*weight');
chart.render();
```

#### tooltip(field, callback)

(field: string, callback: function)

geom.tooltip() 方法支持回调，使用方式如下，其返回的值必须为对象，该值中的属性同 `chart.tooltip()` 的 `itemTpl` 模板相对应，返回的变量可用于 `itemTpl` 的字符串模板：

```javascript
chart.tooltip({
  itemTpl: '<li>{x}: {y}</li>'
});
chart.line()
  .position('x*y')
  .tooltip('x*y', (x, y) => {
    return {
      x,
      y
    };
  );
```

下面是一个实际 demo:

```javascript
const { DataView } = DataSet;
const data = [
  { item: '事例一', count: 40 },
  { item: '事例二', count: 21 },
  { item: '事例三', count: 17 },
  { item: '事例四', count: 13 },
  { item: '事例五', count: 9 }
];
const dv = new DataView();
dv.source(data).transform({
  type: 'percent',
  field: 'count',
  dimension: 'item',
  as: 'percent'
});
const chart = new G2.Chart({
  container: 'c3',
  forceFit: true,
  height: 400,
  padding: [ 80, 100, 80, 80 ]
});
chart.source(dv, {
  percent: {
    formatter: val => {
      val = (val * 100) + '%';
      return val;
    }
  }
});
chart.coord('theta', {
  radius: 0.75
});
chart.tooltip({
  showTitle: false,
  itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
});
chart.intervalStack()
  .position('percent')
  .color('item')
  .label('percent', {
    formatter: (val, item) => {
      return item.point.item + ': ' + val;
    }
  })
  .tooltip('item*percent', (item, percent) => {
    percent = percent * 100 + '%';
    return {
      name: item,
      value: '<span style="color: #1890ff;">' + percent + '</span>'
    };
  })
  .style({
    lineWidth: 1,
    stroke: '#fff'
  });
chart.render();
```

- style 的更详细的配置项 [绘图属性](/zh/docs/api/graphics)

### style

用于配置几何标记显示的图形属性。

```javascript
// 几种使用方式
line().style({ // 统一为所有 shape 设置固定的样式
  lineWidth: 2
});
line().style('a*b', { // 使用回调函数设置属性
  lineWidth: (a, b) => {},
  stroke: 'red'
});
```

- style 的更详细的配置项 [绘图属性](/zh/docs/api/graphics)

### select

开启、关闭以及设置 shape 对于鼠标 click 事件的响应效果， G2 默认仅为饼图开启了选中效果。

```javascript
geom.select(false); // 关闭
geom.select(true); // 打开
geom.select([true], {
  mode: 'single' | 'multiple', // 选中模式，单选、多选
  style: {}, // 选中后 shape 的样式
  cancelable: true | false, // 选中之后是否允许取消选中，默认允许取消选中
  animate: true | false // 选中是否执行动画，默认执行动画
});
```

- select 的更详细的配置项 [绘图属性](/zh/docs/api/graphics)

### active

开启以及关闭 shape 对于鼠标 hover 时的响应效果，G2 默认为各个 shape 内置了 active 效果 。

```javascript
geom.active(false); // 关闭默认响应
geom.active(true); // 开启默认响应

geom.active([true,] {
  highlight: false, // true 是否开启 highlight 效果，开启时没有激活的变灰
  style: {
    fill: 'red'
  }
});
```

- active 的更详细的配置项 [绘图属性](/zh/docs/api/graphics)

### animate

动画配置。

```javascript
geom().animate({
  appear: {
    // 初始入场动画配置
  }
  enter: {
    // 更新时出现动画配置
  },
  leave: {
    // 更新时销毁动画配置
  },
  update: {
    // 更新时改变动画配置
  }
});
```

**更加详细的配置参见 **[G2 Animate API](/zh/docs/api/animate)。

## 其他方法

### show 显示

geometry 显示，如果在创建 geometry 时设置 visible: false

```javascript
const line = chart.line({visible: false}).position('x*y');

line.show();
```

### hide 隐藏

```javascript
const line = chart.line().position('x*y');

line.hide();
```

### setSelected

可以指定原始数据选中对应的图形

```javascript
const data = [{}, {}];
const interval = chart.intervalStack()
    .position('percent')
    .color('item');


chart.render();
interval.setSelected(data[0]);
```
