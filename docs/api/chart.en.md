---
title: Chart 图表
order: 1
---

获取方式： `G2.Chart`。创建 Chart 的方式如下：

```javascript
new G2.Chart({
  container: {string} | {HTMLDivElement},
  width?: {number},
  height?: {number},
  padding?: {object} | {number} | {array},
  background?: {object},
  plotBackground?: {object},
  forceFit?: {boolean},
  animate?: {boolean},
  pixelRatio?: {number},
  data?: {array} | {DataSet.View},
  theme?: {string} | {object},
  renderer?: {string},
});
```

创建一个 chart 实例，返回一个 Chart 对象，建议在单个容器上只初始化一个 Chart 实例。

## 属性

### container

对应图表的 DOM 容器，可以传入该 DOM 的 id 或者直接传入容器的 HTML 节点对象。

```html
<div id="c1"></div>
```

```javascript
const chart = new G2.Chart({
  container: document.getElementById('c1'), // 或直接填 'c1'
  width: 1000,
  height: 500
});
```

> ! 注意：可以使用 `id` 代替 `container`。

### width

指定图表的宽度，单位为 'px'，当 `forceFit: true` 时宽度配置不生效。

### height

指定图表的高度，单位为 'px'。

> 宽和高未指定时，默认为 500px

### padding

设置图表的内边距，支持如下几种设置方式：

1. `padding: [ 20, 30, 20, 30]`

2. `padding: 20`

3. `padding: { top: 20, right: 30, bottom: 20, left: 30 }`

4. `padding: 'auto'`

5. `padding: [20, 'auto', 30, 'auto']`

- 另外也支持设置百分比，如 `padding: [ '20%', '30%' ]`，该百分比相对于整个图表的宽高。

- padding 为数字以及数组类型时使用方法同 CSS 盒模型（上右下左）。

- padding 中存在 'auto'，时会自动计算边框，目前仅考虑 axis 和 legend 占用的边框。

### background

设置图表整体的边框和背景样式，是一个对象，包含如下属性：

```javascript
background: {
  fill: {string}, // 图表背景色
  fillOpacity: {number}, // 图表背景透明度
  stroke: {string}, // 图表边框颜色
  strokeOpacity: {number}, // 图表边框透明度
  opacity: {number}, // 图表整体透明度
  lineWidth: {number}, // 图表边框粗度
  radius: {number} // 图表圆角大小
}
```

### plotBackground

图表绘图区域的边框和背景样式，是一个对象，包含如下属性：

```javascript
plotBackground: {
  fill: {string}, // 图表背景色
  fillOpacity: {number}, // 图表背景透明度
  stroke: {string}, // 图表边框颜色
  strokeOpacity: {number}, // 图表边框透明度
  opacity: {number}, // 图表整体透明度
  lineWidth: {number}, // 图表边框粗度
  radius: {number} // 图表圆角大小
}
```

### forceFit

图表的宽度自适应开关，默认为 false，设置为 true 时表示自动取 dom（实例容器）的宽度。

### animate

图表动画开关，默认为 true，即开启动画。

### pixelRatio

设置设备像素比，默认取浏览器的值 `window.devicePixelRatio`。

### data

设置图表的数据源，`data` 是一个包含 JSON 对象的数组或者 DataSet.View 对象。

建议使用 `chart.source(data)` 设置数据源。

### theme

设置当前图表的主题，可以是字符串 `default` 或者 `dark`（这两个是目前 G2 支持的主题），也可以是一个包含主题配置项的对象，具体设置形式参考 [图表皮肤](/zh/docs/manual/tutorial/theme)。这是“Chart 级别的主题样式配置”。

### renderer

设置当前图表的使用的渲染方案，可以是字符串 `canvas` 或者 `svg`（这两个是目前 G2 支持的渲染引擎）。具体两种渲染引擎的差异可以参考 选择[ Canvas 还是 SVG](/zh/docs/manual/tutorial/renderers)。

全局指定 renderer 的方法：

```javascript
G2.Global.renderer = 'svg';
```

## 方法

### source

#### chart.source(data)

(data: Array|DataSet.View)

为 chart 装载数据，返回 chart 对象。

##### 参数

- `data`

数据源数据，标准的 JSON 数组或者 DataSet.View 对象。

#### chart.source(data, scaleConfig)

(data: Array|DataSet.View, scaleConfig?: object)

##### 参数

- `data`

数据源数据，标准的 JSON 数组或者 DataSet.View 对象。

- `scaleConfig`

可选，用于数据字段的列定义，如设置数据的类型，显示别名，时间类型的展示格式等，不同的数字类型的配置项不同，详情可配置属性参考 [Scale](/zh/docs/api/scale)。

##### 示例

```javascript
const data = [
  { type: 0, value: 1 },
  { type: 1, value: 2 },
  { type: 2, value: 3 },
  { type: 2, value: 3, color: '#f80' },
];

chart.source(data, {
  type: {
    type: 'cat', // 声明 type 字段为分类类型
    values: [ 'A', 'B', 'C' ] // 重新显示的值
    alias: '类型' // 设置属性的别名
  }
});
```

### scale

#### chart.scale('field', scaleConfig)

(field: string, scaleConfig: object)

为指定的数据字段进行列定义，返回 chart 实例。

! 注意：如数据属性 field 在 `chart.source()` 和 `chart.scale()` 中均有定义，那么 `chart.scale()` 中的配置会覆盖 `chart.source()` 中的配置。

##### 参数

- `field`

设置列定义的数据字段名。

- `scaleConfig`

列定义配置，对象类型，可配置的属性如下：

```javascript
{
  type: {string}, // 指定数据类型，可声明的类型为：identity、linear、cat、time、timeCat、log、pow
  alias: {string}, // 数据字段的别名
  formatter: {function}, // 格式化文本内容
  range: {array}, // 输出数据的范围，默认[ 0, 1 ]，格式为 [ min, max ]，min 和 max 均为 0 至 1 范围的数据。
  tickCount: {number}, // 设置坐标轴上刻度点的个数
  ticks: {array}, // 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示
  sync: {boolean} // 当 chart 存在不同数据源的 view 时，用于统一相同数据属性的值域范围
}
```

!注意：除了以上属性外，不同的 type 还对应有各自的可配置属性，详见 [Scale 度量 API](/zh/docs/api/scale);

##### 示例

```javascript
const data = [
  { x: 0, y: 1 },
  { x: 1, y: 2 },
  { x: 2, y: 3 }
];

// 为 x 字段设置列定义
chart.scale('x', {
  type: 'cat', // 声明 type 字段为分类类型
  values: [ 'A', 'B', 'C' ] // 重新显示的值
  alias: '类型' // 设置属性的别名
});
```

#### chart.scale(scaleConfig)

(scaleConfig: object)

为一个或者多个数据字段进行列定义配置。

##### 参数

- `scaleConfig`

列定义配置，对象类型，可配置的属性如下：

```javascript
{
  type: {string}, // 指定数据类型，可声明的类型为：identity、linear、cat、time、timeCat、log、pow
  alias: {string}, // 数据字段的别名
  formatter: {function}, // 格式化文本内容
  range: {array}, // 输出数据的范围，默认[ 0, 1 ]，格式为 [ min, max ]，min 和 max 均为 0 至 1 范围的数据。
  tickCount: {number}, // 设置坐标轴上刻度点的个数
  ticks: {array}, // 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示
  sync: {boolean} // 当 chart 存在不同数据源的 view 时，用于统一相同数据属性的值域范围
}
```

##### 示例

```javascript
const data = [
  { x: 0, y: 1 },
  { x: 1, y: 2 },
  { x: 2, y: 3 }
];

// 为多个字段设置列定义
chart.scale({
  x: {
    type: 'cat', // 声明 type 字段为分类类型
    values: [ 'A', 'B', 'C' ] // 重新显示的值
    alias: '类型' // 设置属性的别名
  },
  y: {
    type: 'cat'
  }
});
```

### coord

(type: string, coordConfig ?: object)

设置坐标系类型，同时允许进行各种坐标系变换，默认为笛卡尔坐标系。

> ! 注意：该方法不返回 `chart` 实例，而是同 Coord 坐标系对应的一个控制类对象，用于进行坐标系的各种变换。

#### 参数

- `type`: string

坐标系的类型，具体包括：

| type | 说明 |
| --- | --- |
| `rect` | 默认类型，直角坐标系，由 x, y 两个垂直的维度构成。 |
| `polar` | 极坐标系，由角度和半径 2 个维度构成。 |
| `theta` | 一种半径固定的极坐标系，常用于饼图。 |
| `helix` | 螺旋坐标系，常用于周期性数据。 |

- coordConfig: object

可选配置项，是一个对象类型，仅适用于极坐标类型，包括 `polar`、`theta`、`helix`。

可配置的属性如下：

```javascript
chart.coord('polar', {
  radius: 0.5, // 设置半径，值范围为 0 至 1
  innerRadius: 0.3, // 空心圆的半径，值范围为 0 至 1
  startAngle: -1 * Math.PI / 2, // 极坐标的起始角度，单位为弧度
  endAngle: 3 * Math.PI / 2 // 极坐标的结束角度，单位为弧度
});
```

#### 坐标系变换

`chart.coord().<action>()`

支持的变换操作如下：

- `rotate(angle)`: 坐标系旋转，angle 表示旋转的度数，单位为角度。

- `scale(sx, sy)`: 坐标系缩放，sx 代表 x 方向缩放比例，sy 代表 y 方向缩放比例，单位为数值。

- `reflect('' | 'x' | 'y')`: 坐标系转置，将 x 或者 y 的起始、结束值倒置。

- `transpose()`: 将坐标系 x 轴和 y 轴转置。

上述操作均可支持链式调用，如下：

```javascript
chart.coord().rotate(70).scale(1.5, 1.5).reflect('xy').transpose();
```

### axis

坐标轴配置，该方法返回 chart 对象。

#### chart.axis(false)

关闭所有坐标轴。

#### chart.axis('field', false)

不展示 `field` 字段对应的坐标轴。

##### 参数

- `field`

数据源中的数据属性名称。

#### chart.axis('field', axisConfig)

(field: string, axisConfig: object)

为字段 `field` 对应的坐标轴进行配置。

```javascript
// 示例：配置 x 对应坐标轴线的颜色
chart.axis('x', {
  line: {
    stroke: '#ff8800'
  }
});
```

##### 参数

- `field`

坐标轴对应的数据字段名。

- axisConfig

一个对象类型，用于设置坐标轴配置信息，可配置属性如下：

1. `position`: string

设置坐标轴的显示位置，可设置的值包含 `top`、`bottom`、`left`、`right`，即上下左右四个位置。

1. `line`: object |null

设置坐标轴线的样式，包括线的颜色、粗细等。如果该属性值为 `null` 则表示不展示坐标轴线。

```javascript
line: {
  stroke: {string}, // 坐标轴线的颜色
  strokeOpacity: {number}, // 坐标轴线的透明度，数值范围为 0 - 1
  lineDash: {array}, // 设置虚线的样式，如 [2, 3]第一个用来表示实线的像素，第二个用来表示空白的像素。如果提供了奇数个值，则这个值的数列重复一次，从而变成偶数个值
  lineWidth: {number} // 设置坐标轴线的粗细
}
```

1. `label`: object | null

设置坐标轴文本的样式。如果该属性值为 `null` 则表示不展示坐标轴文本。

```javascript
label: {
  offset: {number}, // 数值，设置坐标轴文本 label 距离坐标轴线的距离
  offsetX: {number}, // 在 offset 的基础上 x 方向的偏移量
  offsetY: {number}, // 在 offset 的基础上 y 方向的偏移量
  // 设置文本的显示样式，还可以是个回调函数，回调函数的参数为该坐标轴对应字段的数值
  rotate: 30, // 注意，旋转角度的配置不再在 textStyle 里配置
  textStyle: {
    textAlign: 'center', // 文本对齐方向，可取值为： start center end
    fill: '#404040', // 文本的颜色
    fontSize: '12', // 文本大小
    fontWeight: 'bold', // 文本粗细
    textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
  } | (text) => {
    // text: 坐标轴对应字段的数值
  },
  autoRotate: {boolean}, // 文本是否需要自动旋转，默认为 true
  /**
   * 用于格式化坐标轴上显示的文本信息的回调函数
   * @param  {string} text  文本值
   * @param  {object} item  该文本值对应的原始数据记录
   * @param  {number} index 索引值
   * @return {string}       返回格式化后的文本值
   */
  formatter(text, item, index) {},
  /**
   * 当且仅当 `useHtml` 为 true 时生效
   * 使用 html 渲染文本
   *
   * @param  {string} text  文本值
   * @param  {object} item  该文本值对应的原始数据记录
   * @param  {number} index 索引值
   * @return {string}       返回 html 字符串
   */
  htmlTemplate(text, item, index) {}
}
```

- textStyle 的更详细的配置项 [绘图属性](/zh/docs/api/graphics)

1. `title`: object | null

设置坐标轴标题的显示样式。如果该属性值为 `null` 则表示不展示坐标轴标题。

**在 G2 的默认主题中，坐标轴标题是不展示的。**

通过 `title: true` 渲染坐标轴标题。通过以下配置对标题进行个性化配置：

```javascript
title: {
  autoRotate: {boolean}, // 是否需要自动旋转，默认为 true
  offset: {number}, // 数值，设置坐标轴标题距离坐标轴线的距离
  // 设置标题的文本样式
  textStyle: {
    textAlign: 'center', // 文本对齐方向，可取值为： start middle end
    fill: '#404040', // 文本的颜色
    fontSize: '12', // 文本大小
    fontWeight: 'bold', // 文本粗细
    rotate: 30, // 文本旋转角度，以角度为单位，仅当 autoRotate 为 false 时生效
    textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
  },
  position: 'start' | 'center' | 'end' // 标题的显示位置（相对于坐标轴线），可取值为 start center end
}
```

- textStyle 的更详细的配置项 [绘图属性](/zh/docs/api/graphics)

1. `tickLine`: object | null

设置坐标轴的刻度线。如果该属性值为 `null` 则表示不展示。

```javascript
tickLine: {
  lineWidth: 1, // 刻度线宽
  stroke: '#ccc', // 刻度线的颜色
  strokeOpacity: 0.5, // 刻度线颜色的透明度
  length: 5, // 刻度线的长度，可以为负值（表示反方向渲染）
  alignWithLabel:true//设为负值则显示为category数据类型特有的样式
}
```

- alignWithLabel的用法详情见教程 [axis](/zh/docs/manual/tutorial/axis)

1. `subTickCount`: number

设置每两个刻度之间次刻度线的个数，默认为 0，即不展示次刻度线。

```javascript
subTickCount: 2 // 设置次刻度线的个数，数值类型
```

1. `subTickLine`: object

设置次刻度线的样式，仅当 subTickCount 不为 0 时生效。

```javascript
subTickLine: {
  lineWidth: 1, // 次刻度线宽
  stroke: '#ddd', // 次刻度线颜色
  strokeOpacity: 0.5, // 次刻度线颜色的透明度
  length: 3 // 次刻度线的长度，可以为负值（表示反方向渲染）
}
```

1. `grid`: object | null

设置坐标轴网格线的样式，网格线与坐标轴线垂直。如果该属性值为 `null` 则表示不展示。

```javascript
grid: {
  align: 'center', // 声明网格顶点从两个刻度中间开始，默认从刻度点开始
  type: 'line' | 'polygon', // 声明网格的类型，line 表示线，polygon 表示矩形框
  // 当网格类型 type 为 line 时，使用 lineStyle 设置样式
  lineStyle: {
    stroke: '#d9d9d9', // 网格线的颜色
    lineWidth: 1, // 网格线的粗细
    lineDash: [4, 4 ] // 网格线的虚线配置，第一个参数描述虚线的实部占多少像素，第二个参数描述虚线的虚部占多少像素
  },
  hightLightZero: true, // 默认不高亮0轴
  zeroLineStyle: { // 当且仅当 highLightZero 为 true 时生效
    stroke: '#595959',
    lineDash: [ 0, 0 ]
  },
  alternateColor: '#ccc' | [ '#f80', '#ccc' ], // 当网格类型 type 为 polygon 时，使用 alternateColor 为网格设置交替的颜色，指定一个值则先渲染奇数层，两个值则交替渲染
  hideFirstLine: true | false, // 是否隐藏第一条网格线，默认为 false
  hideLastLine: true | false // 是否隐藏最后一条网格线，默认为 false
}
```

- lineStyle 的更详细的配置项[ 绘图属性](/zh/docs/api/graphics)

### legend

配置图表图例。

#### chart.legend(false)

不显示所有的图例。

#### chart.legend(field, false)

不显示 `field` 字段对应的图例。

#### chart.legend(field, legendConfig)

(field: string|true, legendConfig: object)

为数据字段 field 对应的图例进行配置，如下所示：

```javascript
chart.legend('gender', {
  position: 'right'
});
```

##### 参数

- `field`: string | true

图例对应的字段名。如果值为 `true`，表示该配置对所有的图例生效。

- `legendConfig`: object

是一个对象，该对象可配置的属性如下：

1. `position`: string

设置图例的显示位置，可设置的值为 12 个：`left-top`,`left-center`,`left-bottom`,`right-top`,`right-center`,`right-bottom`,`top-left`,`top-center`,`top-right`,`bottom-left`,`bottom-center`,`bottom-right`。也可使用`bottom`,`top`,`left`,`right`设置位置，此时对应的值分别为`bottom-center`,`top-center`,`left-bottom`,`right-bottom`。默认为 `bottom-center`。

1. `layout`: string

用于设置各个图例项的排列方式，可设置值包括：`vertical`、`horizontal`，分别表示垂直和水平排布。

1. `title`: object | null

图例标题的显示样式设置，如果值为 null，表示不展示图例标题，默认不展示。

```javascript
title: {
  textAlign: 'center', // 文本对齐方向，可取值为： start middle end
  fill: '#404040', // 文本的颜色
  fontSize: '12', // 文本大小
  fontWeight: 'bold', // 文本粗细
  rotate: 30, // 文本旋转角度，以角度为单位，仅当 autoRotate 为 false 时生效
  textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
}
```

1. `offsetX`: number

图例 x 方向的偏移值，数值类型，数值单位为 'px'，默认值为 0。

1. `offsetY`: number

图例 Y 方向的偏移值，数值类型，数值单位为 'px'，默认值为 0。

1. `itemGap`: number

**针对分类类型的图例**，表示图例每项之间的间距，如果是水平排布则为左右间距，如果是竖直排布则为上下间距。

1. `itemMarginBottom`: number

**针对分类类型的图例**，表示各个图例项垂直方向的间距。

1. `itemWidth`: number

针**对分类类型的图例**，设置图例项的宽度，当图例有很多图例项，并且用户想要这些图例项能垂直对齐时，此时这个属性可帮用户实现此效果。

![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*nDFpSoK-q_cAAAAAAAAAAABkARQnAQ)

```javascript
const data = [{country:'中国',cost:96},{country:'德国',cost:121},{country:'美国',cost:100},{country:'日本',cost:111},{country:'韩国',cost:102},{country:'法国',cost:124},{country:'意大利',cost:123},{country:'荷兰',cost:111},{country:'比利时',cost:123},{country:'英国',cost:109},{country:'加拿大',cost:115},{country:'俄罗斯',cost:99},{country:'墨西哥',cost:91},{country:'印度',cost:87},{country:'瑞士',cost:125},{country:'澳大利亚',cost:130},{country:'西班牙',cost:109},{country:'巴西',cost:123},{country:'泰国',cost:91},{country:'印尼',cost:83},{country:'波兰',cost:101},{country:'瑞典',cost:116},{country:'奥地利',cost:111},{country:'捷克',cost:107}];
const chart = new G2.Chart({
  container: 'c1',
  forceFit: true,
  height: 500,
  padding: [ 10, 40, 130, 40 ]
});
chart.source(data, {
  'cost': {
    min: 0
  }
});
chart.coord('polar', {
  radius: 0.6
});
chart.axis('cost', {
  label: null,
  tickLine: null,
  line: {
    stroke: '#E9E9E9',
    lineDash: [ 3, 3 ]
  }
});
chart.axis('country', {
  grid: {
    align: 'center'
  },
  tickLine: null,
  label: {
    Offset: 10,
    textStyle: {
      textAlign: 'center' // 设置坐标轴 label 的文本对齐方向
    }
  }
});
chart.legend('country', {
  itemWidth: 50 // 设置图例项的宽度，使其在垂直方向上能够排列整齐
});
chart.interval()
  .position('country*cost')
  .color('country')
  .label('cost', {
    offset: -15,
    textStyle: {
      textAlign: 'center',
      fontSize: 11,
      shadowBlur: 2,
      shadowColor: 'rgba(0, 0, 0, .45)'
    }
  })
  .style({
    lineWidth: 1,
    stroke: '#fff'
  });
chart.render();
```

1. `unCheckColor`: string

**针对分类类型的图例**，用于取消选中的图例文本颜色。

1. `background`: object

**针对分类类型的图例**，用于设置图例的背景样式。

```javascript
background: {
  fill: '#000',
  fillOpacity: 0.3
}
```

1. `allowAllCanceled`: boolean

**针对分类类型的图例**，表示是否允许所有图例项被取消选中，默认为 false，即必须保留一个被选中的图例项。

1. `itemFormatter`: function

回调函数，用于格式化图例每项的文本显示。

```javascript
itemFormatter(val) {
  return val; // val 为每个图例项的文本值
}
```

1. `marker`: string | function

用于设置图例的 marker 样式，默认按照 geom 的类型显示。

- 当为 string 类型时，即表示使用 G2 默认提供的类型，支持的类型如下。其中只有一部分支持 HTML 版本的分类图例：

| **type** | **样式** | **是否支持 HTML** |
| :---: | :---: | :---: |
| 'circle' | ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*JMXTSrJ8C5EAAAAAAAAAAABkARQnAQ) | 是 |
| 'square' | ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*TjaMQbS6dOEAAAAAAAAAAABkARQnAQ) | 是 |
| 'bowtie' | ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*sySwT7tOwq4AAAAAAAAAAABkARQnAQ) | 否 |
| 'diamond' | ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*3fjORIEQExcAAAAAAAAAAABkARQnAQ) | 否 |
| 'hexagon' | ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*TkmrRZ7IYzAAAAAAAAAAAABkARQnAQ) | 否 |
| 'triangle' | ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*R0OCS6z_FuUAAAAAAAAAAABkARQnAQ) | 否 |
| 'triangle-down' | ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*ieFFTadrXS0AAAAAAAAAAABkARQnAQ) | 否 |
| 'cross' | ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*kKyZQKEop80AAAAAAAAAAABkARQnAQ) | 否 |
| 'tick' | ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*VMP6SYj4DiAAAAAAAAAAAABkARQnAQ) | 否 |
| 'plus' | ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*z4-OQY5NNV4AAAAAAAAAAABkARQnAQ) | 否 |
| 'hyphen' | ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*JX6QRoleT_gAAAAAAAAAAABkARQnAQ) | 否 |
| 'line' | ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*yPZ8TI--rm8AAAAAAAAAAABkARQnAQ) | 否 |
| hollowCircle | ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*6dPmQL7ko4MAAAAAAAAAAABkARQnAQ) | 否 |
| 'hollowSquare' | ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*2sfDR48-z60AAAAAAAAAAABkARQnAQ) | 否 |
| 'hollowBowtie' | ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*vAYUT4s9dkwAAAAAAAAAAABkARQnAQ) | 否 |
| 'hollowDiamond' | ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*h1pTTLjppRQAAAAAAAAAAABkARQnAQ) | 否 |
| 'hollowHexagon' | ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*II28TZCn_IIAAAAAAAAAAABkARQnAQ) | 否 |
| 'hollowTriangle' | ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*wf_AQaNchFcAAAAAAAAAAABkARQnAQ) | 否 |
| 'hollowTriangle-down' | ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*b3TVR5DomK0AAAAAAAAAAABkARQnAQ) | 否 |

- 非 HTML 版本的分类图例的 marker 也支持自定义 shape，使用方式如下，

```javascript
/**
 * 自定义 marker 形状
 * @param  {number} x   该 marker 的横轴坐标
 * @param  {number} y   该 marker 的纵轴坐标
 * @param  {number} r   该 marker 的半径大小
 * @return {null}
 */
marker(x, y, r) {}
```

以下代码绘制了如图所示的 marker ：![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*16DPRJ5G1PYAAAAAAAAAAABkARQnAQ)

```javascript
marker(x, y, r) {
  return [
    [ 'M', x - r, y ],
    [ 'L', x + r, y ]
  ];
}
```

1. `textStyle`: object

用于设置图例项的文本样式。

```javascript
textStyle: {
  textAlign: 'center', // 文本对齐方向，可取值为： start middle end
  fill: '#404040', // 文本的颜色
  fontSize: '12', // 文本大小
  fontWeight: 'bold', // 文本粗细
  rotate: 30, // 文本旋转角度，以角度为单位，仅当 autoRotate 为 false 时生效
  textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
}
```

1. `attachLast`:boolean

**针对分类类型的图例**，是否启用尾部跟随图例 (tail-legend)，尾部跟随图例自动跟随 geom 的最后一个数据点，适用的图表类型为`line`、`stackLine`、`area`、`stackArea`。 默认为 false ，即不启用。

1. `clickable`: boolean

**针对分类类型的图例**，设置图例项是否允许点击，默认为 true，即允许点击。

1. `selectedMode`: string

**针对分类类型图例**，当 clickable 为 true 时该配置项生效，用于设置图例的选中交互模式，可配置的属性：

- `selectedMode: 'single'`：表示开启单选模式；

- `selectedMode: 'multiple'`：表示开启多选模式，默认为 `'multiple'`。

```javascript
/**
 * 自定义图例项鼠标 hover 事件，hoverable 为 false 不生效
 * @param  {object} ev 事件对象
 * @return {null}
 */
onHover: ev => {}
```

1. `onClick`: function

**针对分类类型的图例**，用于自定义鼠标点击图例项的交互，当 `clickable` 为 false 不生效。

```javascript
/**
 * 自定义图例项点击事件， clickable 为 false 不生效
 * @param  {object} ev 事件对象
 * @return {null}
 */
onClick: ev => {}
```

1. `useHtml`: boolean

**针对分类类型图例**，用于开启是否使用 HTML 渲染图例，默认为 false，true 表示使用 HTML 渲染图例。这种情况下不要使用 'legend-item:click' 建议使用  `onClick`

```javascript
chart.legend({
    useHtml: true,
    onClick: (e) => {
      console.log('e',e)
    }
  })
```

1. `flipPage`: boolean

**针对 HTML 版本的分类类型图例，即 useHtml 为 true 时**。指定是否使用翻页的方式来交互超出容器的图例项。默认为 false ，即不使用翻页方式，而使用滚轮滚动的交互方式。

1. `container`: string

**当 `useHtml` 为 true 时生效**，用于指定生成图例的 dom 容器，那么该值必须为 dom 容器的 id 值为分类类型的话，则支持传入索引值。

1. `containerTpl`: string

**当 `useHtml` 为 true 时生效**，用于指定图例容器的模板，默认值如下：

```javascript
containerTpl: '<div class="g2-legend" style="position:absolute;top:20px;right:60px;width:auto;">'
  + '<h4 class="g2-legend-title"></h4>'
  + '<ul class="g2-legend-list" style="list-style-type:none;margin:0;padding:0;"></ul>'
  + '</div>';
```

如默认结构不满足需求，可以自定义该模板，但是**自定义模板时必须包含各个 dom 节点的 class**，样式可以自定义。

1. `itemTpl`: string

**当 `useHtml` 为 true 时生效**，用于指定生成图例的图例项 HTML 模板，默认值如下：

1. `itemTpl`: string
当 `useHtml` 为 true 时生效。HTML 版本的分类图例的图例项 HTML 模版。默认为：

```javascript
itemTpl: '<li class="g2-legend-list-item item-{index} {checked}" data-color="{originColor}" data-value="{originValue}">' +
      '<i class="g2-legend-marker" style="background-color:{color};"></i>' +
      '<span class="g2-legend-text">{value}</span></li>'
```

! 注意：自定义模板时必须包含各个 dom 节点的 class，样式可以自定义。

1. `slidable`: boolean

**针对连续图例**，用于设置连续图例是否允许滑动，默认为 true，即开启滑动操作。

1. `width`: number

**针对连续图例**，用于设置图例的宽度。

1. `height`: number

**针对连续图例**，用于设置图例的高度。

1. `hoverable`: boolean

**针对分类图例**，设置是否开启鼠标 hover 至图例的交互效果，默认为 true，即开启动画。

1. `onHover`: function

用于自定义鼠标 hover 图例项的交互，当 `hoverable` 为 false 不生效。

1. `reactive`: boolean

设置是否开启鼠标 hover 图表元素时，图例对应项的高亮效果。默认为 false，即不开启动画。

1. `isSegment`: boolean

**针对连续的颜色图例**，设置图例样式是否为分块颜色模式，默认为 false，即非分块颜色模式，为渐变颜色模式。

1. `sizeType`: string

**针对连续的大小图例**，设置图例是否是针对节点大小映射的样式。可选 'circle' | 'normal' | null, 默认为 null，即针对除节点以外的其他元素的大小映射。
当 sizeType 为 'circle' 时的样式：![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*N-wyQYQc37gAAAAAAAAAAABkARQnAQ)

当 sizeType 为 'normal' 或 null 时的样式：![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*L0lET6N2AMcAAAAAAAAAAABkARQnAQ)

1. `custom`: boolean

默认为 false，当 `custom` 为 true，表示不使用默认生成的图例，允许用户自定义非 HTML 版本的分类类型图例，包括具体的图例项以及 click、hover 交互。

自定义图例时需要用户自己声明具体的图例项 `items` （该属性是一个对象数组，数组中每一项为一个对象类型，结构为：
`{ value: '', marker: { fill: 'red' } }`) 以及图例项的 hover 和 click 事件。

具体使用如下：

```javascript
// 自定义图例
chart.legend({
  custom: true,
  items: [
    {
      value: 'waiting', // 图例项的文本内容
      marker: {
        symbol: 'circle',  // 该图例项 marker 的形状，参见 marker 参数的说明
        fill: '#3182bd'  // 该图例项 marker 的填充颜色
      }
    },
    {
      value: 'call',
      marker: {
        symbol: 'square',  // 该图例项 marker 的形状，参见 marker 参数的说明
        fill: '#99d8c9'  // 该图例项 marker 的填充颜色
      }
    },
    {
      value: 'people',
      fill: '#fdae6b',
      marker: {
        symbol: 'line',  // 该图例项 marker 的形状，参见 marker 参数的说明
        stroke: '#fdae6b',  // 该图例项 marker 的填充颜色
        radius: 6
      }
    }
  ],
  onHover: ev => {}, // 自定义 hover 事件
  onClick: ev => {}, // 自定义 click 事件
});
// 为特定的字段自定义图例
chart.legend('field', {
  custom: true,
  items: [
    {
      value: 'waiting', // 图例项的文本内容
      marker: {
        symbol: 'circle',  // 该图例项 marker 的形状，参见 marker 参数的说明
        fill: '#3182bd'  // 该图例项 marker 的填充颜色
      }
    },
    {
      value: 'call',
      marker: {
        symbol: 'square',  // 该图例项 marker 的形状，参见 marker 参数的说明
        fill: '#99d8c9'  // 该图例项 marker 的填充颜色
      }
    },
    {
      value: 'people',
      fill: '#fdae6b',
      marker: {
        symbol: 'line',  // 该图例项 marker 的形状，参见 marker 参数的说明
        stroke: '#fdae6b',  // 该图例项 marker 的填充颜色
        radius: 6
      }
    }
  ],
  onHover: ev => {}, // 自定义 hover 事件
  onClick: ev => {}, // 自定义 click 事件
});
```

具体示例：

```javascript
const data = [
  { time: '10:10', call: 4, waiting: 2, people: 2 },
  { time: '10:15', call: 2, waiting: 6, people: 3 },
  { time: '10:20', call: 13, waiting: 2, people: 5 },
  { time: '10:25', call: 9, waiting: 9, people: 1 },
  { time: '10:30', call: 5, waiting: 2, people: 3 },
  { time: '10:35', call: 8, waiting: 2, people: 1 },
  { time: '10:40', call: 13, waiting: 1, people: 2 }
];
const chart = new G2.Chart({
  container: 'c2',
  forceFit: true,
  height: 400
});
chart.source(data, {
  call: {
    min: 0
  },
  people: {
    min: 0
  },
  waiting: {
    min: 0
  }
});
chart.legend({
  custom: true,
  allowAllCanceled: true,
  items: [
    { value: 'waiting', marker: {symbol: 'square', fill: '#3182bd', radius: 5} },
    { value: 'call', marker: {symbol: 'hyphen', stroke: '#99d8c9', radius: 5, lineWidth: 3} },
    { value: 'people', marker: {symbol: 'hyphen', stroke: '#fdae6b', radius: 5, lineWidth: 3} }
  ],
  onClick: ev => {
    const item = ev.item;
    const value = item.value;
    const checked = ev.checked;
    const geoms = chart.getAllGeoms();
    for (let i = 0; i < geoms.length; i++) {
      const geom = geoms[i];
      if (geom.getYScale().field === value) {
        if (checked) {
          geom.show();
        } else {
          geom.hide();
        }
      }
    }
  }
});
chart.axis('waiting', false);
chart.axis('call', false);
chart.axis('people', false);
chart.interval()
  .position('time*waiting')
  .color('#3182bd');
chart.line()
  .position('time*call')
  .color('#99d8c9')
  .size(3)
  .shape('smooth');
chart.line()
  .position('time*people')
  .color('#fdae6b')
  .size(3)
  .shape('smooth');
chart.point()
  .position('time*people')
  .color('#fdae6b')
  .size(3)
  .shape('circle');
chart.render();
```

### tooltip

图表的 tooltip 配置，G2 图表的 tooltip 使用 html 渲染。

#### chart.tooltip(false)

关闭 tooltip 功能。

#### chart.tooltip(tooltipConfig)

(tooltipConfig: object)

配置 tooltip，该方法也可以如下调用：

```javascript
chart.tooltip(true, {
  showTitle: false,
  inPlot: false
});
```

##### 参数

- tooltipConfig: object

是一个对象类型，支持的属性如下：

1. `triggerOn`: string

tooltip 的触发方式，可配置的值为：'mousemove'、'click'、'none'，默认为 `mousemove`。

- 'mousemove': 鼠标移动触发；

- 'click': 鼠标点击出发；

- 'none': 不触发 tooltip，用户通过 `chart.showTooltip()` 和 `chart.hideTooltip()` 来控制 tooltip 的显示和隐藏。

1. `showTitle`: boolean

是否展示提示信息的标题，默认为 true，即展示，通过设置为 false 来隐藏标题。

1. `title`: string

设置 tooltip 的标题展示的数据字段，设置该字段后，该标题即会展示该字段对应的数值。`showTitle` 为 false 时，该设置不生效。

1. `crosshairs`: object

是一个对象类型，用于设置 tooltip 的辅助线或者辅助框。

默认我们为 geom 为 ‘line’, ‘area’, ‘path’, ‘areaStack’ 开启了垂直辅助线；geom 为‘interval’ 默认会展示矩形背景框。如下图所示：![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*82wzS7ZmYP4AAAAAAAAAAABkARQnAQ)

该属性可支持的配置如下：

```javascript
crosshairs: {
  type: 'rect' | 'x' | 'y' | 'cross',
  rectStyle: {
    // 图形样式
    fill: {string}, // 填充的颜色
    stroke: {string}, // 边框的颜色
    strokeOpacity: {number}, // 边框颜色的透明度，数值为 0 - 1 范围
    fillOpacity: {number}, // 填充的颜色透明度，数值为 0 - 1 范围
    lineWidth: {number}, // 边框的粗细
    lineDash: {number} | {array} // 线的虚线样式
  }, // type 为 'rect' 时，设置 'rect' 辅助框的样式
  lineStyle: {
    // 图形属性
  }, // type 为 'x', 'y', 'cross' 时，辅助线的样式
}
```

- style 的更详细的配置项 [绘图属性](/zh/docs/api/graphics)

> crosshairs.type 说明： `rect` 表示矩形框，`x` 表示水平辅助线，`y` 表示垂直辅助线，`cross` 表示十字辅助线。

1. `offset`: number

设置 tooltip 距离鼠标的偏移量。

1. `inPlot`: boolean

设置是否将 tooltip 限定在绘图区域内，默认为 true，即限定在绘图区域内。

1. `follow`: boolean

设置 tooltip 是否跟随鼠标移动。默认为 true，即跟随。

1. `shared`: boolean

设置 tooltip 只展示单条数据。

1. `enterable`: boolean

用于控制是否允许鼠标进入 tooltip，默认为 false，即不允许进入。

1. `position`: string

该属性设置之后，就会在固定位置展示 tooltip，可设置的值为：`left`、`right`、`top`、`bottom`。

1. `hideMarkers`: boolean

对于 line、area、path 这三种几何图形，我们在渲染 tooltip 时会自动渲染 tooltipMarker ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*WAohQIhuy5YAAAAAAAAAAABkARQnAQ)，通过声明该属性值为 `true` 来关闭 tooltipMarker。

1. `containerTpl`: string

tooltip 默认的容器模板，默认值如下：

```javascript
containerTpl: '<div class="g2-tooltip">'
  + '<div class="g2-tooltip-title" style="margin-bottom: 4px;"></div>'
  + '<ul class="g2-tooltip-list"></ul>'
  + '</div>',
```

如默认结构不满足需求，可以自定义该模板，但是**自定义模板时必须包含各个 dom 节点的 class**，样式可以自定义。

1. `itemTpl`: string

tooltip 每项记录的默认模板，默认值如下：

```javascript
itemTpl: '<li data-index={index}>'
  + '<span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>'
  + '{name}: {value}'
  + '</li>'
```

如默认结构不满足需求，可以自定义该模板，但是**自定义模板时必须包含各个 dom 节点的 class**，样式可以自定义。

1. `g2-tooltip`: object

设置 tooltip 容器的 CSS 样式。

1. `g2-tooltip-title`: object

设置 tooltip 标题的 CSS 样式。

1. `g2-tooltip-list`: object

设置 tooltip 列表容器的 CSS 样式。

1. `g2-tooltip-list-item`: object

设置 tooltip 列表容器中每一项的 CSS 样式。

1. `g2-tooltip-marker`: object

设置 tooltip 列表容器中每一项 marker 的 CSS 样式。

除了使用配置上述属性来自定义 tooltip 的样式外，用户也可以直接为 html 定义 CSS 样式。

自定义 html 模板示例<br />![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*WSoXSJVwK-4AAAAAAAAAAABkARQnAQ)

```javascript
const data = [
  { month: '一月', tem: 7, city: "tokyo" },
  { month: '二月', tem: 6.9, city: "tokyo" },
  { month: '三月', tem: 9.5, city: "tokyo" },
  { month: '四月', tem: 14.5, city: "tokyo" },
  { month: '五月', tem: 18.2, city: "tokyo" },
  { month: '六月', tem: 21.5, city: "tokyo" },
  { month: '七月', tem: 25.2, city: "tokyo" },
  { month: '八月', tem: 26.5, city: "tokyo" },
  { month: '九月' , tem: 23.3, city: "tokyo" },
  { month: '十月', tem: 18.3, city: "tokyo" },
  { month: '十一月', tem: 13.9, city: "tokyo" }
];
const chart = new G2.Chart({
  container: 'c3',
  forceFit: true,
  height: 300
});
chart.source(data);
chart.tooltip({
  containerTpl: '<div class="g2-tooltip">'
    + '<p class="g2-tooltip-title"></p>'
    + '<table class="g2-tooltip-list"></table>'
    + '</div>', // tooltip的外层模板
  itemTpl: '<tr class="g2-tooltip-list-item"><td style="color:{color}">{name}</td><td>{value}</td></tr>', // 支持的字段 index,color,name,value
  offset: 50,
  'g2-tooltip': {
    position: 'absolute',
    visibility: 'hidden',
    border : '1px solid #efefef',
    backgroundColor: 'white',
    color: '#000',
    opacity: '0.8',
    padding: '5px 15px',
    'transition': 'top 200ms,left 200ms'
  }, // 设置 tooltip 的 css 样式
  'g2-tooltip-list': {
    margin: '10px'
  }
});
chart.line().position('month*tem');
chart.render();
```

### guide

用于绘制图表的辅助元素，该方法的返回值不为 chart 对象，而是一个 guide 对应的控制类。

#### chart.guide().line(cfg)

绘制辅助线。

```javascript
chart.guide().line({
  top: {boolean}, // 指定 guide 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
  start: {object} | {function} | {array}, // 辅助线起始位置
  end: {object} | {function} | {array}, // 辅助线结束位置
  lineStyle: {object}, // 图形样式配置
  text: {
    position: {string} | {number}, // 文本的显示位置，可取值：'start','center','end', 0 ~ 1 范围的数字, '0%'至'100%'
    autoRotate: {boolean}, // 是否沿线的角度排布，默认为 true
    style: {object}, // 文本图形样式配置
    content: {string}, // 文本的内容
    offsetX: {number}, // x 方向的偏移量
    offsetY: {number} // y 方向的偏移量
  }
});
```

##### 参数

- `top`: boolean

指定 guide 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层。

- `start`: object | array | function

指定辅助线的起始位置，该值的类型如下：

- object: 使用图表 x,y 对应的原始数据例如： { time: '2010-01-01', value: 200 }

- array: 数组来配置位置 [ x, y ]，根据数组中的值的存在以下几种形式：

  1. 对应数据源中的原始数据；

  2. 关键字：'min', 'max', 'median', 'start', 'end'，分别代表数据的最大值、最小值、中间值以及坐标系区间的起始和结束

  3. x，y 都是百分比的形式，如 30%，在绘图区域定位。注意：对于 Y 轴，起始点为 Y 轴上方

  4. 1 和 2 两种类型的数据可以混用，使用百分比形式时 x 和 y 必须都是百分比形式

- function: 回调函数，可以动态得确定辅助元素的位置，应用于数据动态更新，辅助元素的位置根据数据变化的场景

```javascript
chart.guide().line({
    start(xScales, yScales) {
      return []; // 位置信息
    }
  });
```

- `end`: object | array | function

指定辅助线的结束位置，使用同 `start`。

- `lineStyle`: object

用于设置辅助线的显示样式，`style` 的更详细的配置项 [绘图属性](/zh/docs/api/graphics)。

- `text`: object

辅助线可以带文本，该属性使用如下：

```javascript
text: {
  position: 'start' | 'center' | 'end' | '39%' | 0.5, // 文本的显示位置，值除了指定的常量外，还可以是百分比或者小数
  autoRotate: {boolean}, // 指定文本是否沿着线的方向排布，默认为 true，即沿着线排布
  style: {
    fill: 'red',
    fontSize: 12
  }, // 设置文本的显示样式
  content: {string}, // 文本的内容
  offsetX: {number}, // x 方向的偏移量
  offsetY: {number} // y 方向的偏移量
}
```

`style` 的更详细的配置项 [绘图属性](/zh/docs/api/graphics)

#### chart.guide().text(cfg)

绘制辅助文本。

```javascript
chart.guide().text({
  top: {boolean}, // 指定 guide 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
  position: {object} | {function} | {array}, // 文本的起始位置
  content: {string}, // 显示的文本内容
  style: {object}}}, // 文本的图形样式属性
  offsetX: {number}, // x 方向的偏移量
  offsetY: {number} // y 方向偏移量
});
```

##### 参数

- `top`: boolean

指定 guide 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层。

- `position`: object | array | function

指定辅助文本的显示位置，该值的类型如下：

- object: 使用图表 x,y 对应的原始数据例如： { time: '2010-01-01', value: 200 }

- array: 数组来配置位置 [ x, y ]，根据数组中的值的存在以下几种形式：

  1. 对应数据源中的原始数据；

  2. 关键字：'min', 'max', 'median', 'start', 'end'，分别代表数据的最大值、最小值、中间值以及坐标系区间的起始和结束

  3. x，y 都是百分比的形式，如 30%，在绘图区域定位。注意：对于 Y 轴，起始点为 Y 轴上方

  4. 1 和 2 两种类型的数据可以混用，使用百分比形式时 x 和 y 必须都是百分比形式

- function: 回调函数，可以动态得确定辅助元素的位置，应用于数据动态更新，辅助元素的位置根据数据变化的场景

```javascript
chart.guide().text({
    position(xScales, yScales) {
      return []; // 位置信息
    },
    content: '最大值'
  });
```

- `content`: string

辅助文本的显示内容。

- `style`: object

用于设置辅助文本的显示样式，`style` 的更详细的配置项 [绘图属性](/zh/docs/api/graphics)

- `offsetX`: number

设置辅助文本 x 方向的偏移量。

- `offsetY`: number

设置辅助文本 y 方向的偏移量。

#### chart.guide().image(cfg)

辅助图片。

```javascript
chart.guide().image({
  top: {boolean}, // 指定 giude 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
  start: {array} | {function} | {array}, // 图片起始位置
  end: {array} | {function} | {array}, // 图片结束位置
  width: {number}, // 图片的宽度
  height: {number}, // 图片的高度
  src: {string}, // 图片路径
  offsetX: {number}, // x 方向的偏移量
  offsetY: {number} // y 方向偏移量
});
```

##### 参数

- `top`: boolean

指定 guide 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层。

- `start`: object | array | function

指定辅助图片的起始位置，即图片的左上角，该值的类型如下：

- object: 使用图表 x,y 对应的原始数据例如： { time: '2010-01-01', value: 200 }

- array: 数组来配置位置 [ x, y ]，根据数组中的值的存在以下几种形式：

  1. 对应数据源中的原始数据；

  2. 关键字：'min', 'max', 'median', 'start', 'end'，分别代表数据的最大值、最小值、中间值以及坐标系区间的起始和结束

  3. x，y 都是百分比的形式，如 30%，在绘图区域定位。注意：对于 Y 轴，起始点为 Y 轴上方

  4. 1 和 2 两种类型的数据可以混用，使用百分比形式时 x 和 y 必须都是百分比形式

- function: 回调函数，可以动态得确定辅助元素的位置，应用于数据动态更新，辅助元素的位置根据数据变化的场景

```javascript
chart.guide().image({
    start(xScales, yScales) {
      return []; // 位置信息
    }
  });
```

- `end`: object | array | function

**可选**，指定辅助图片的结束位置，即图片的右下角，该属性用法同 `start`。当 `start` 和 `end` 属性同时声明时，图片的宽度和高度即已确定，此时可以不需要指定 `width` 和 `height` 这两个属性。

- `src`: string

指定图片的地址，可以是路径，也可以是 base64 编码。

- `width`: number

**当仅指定了 `start` 属性时使用**，用于设置图片的宽度。

- `height`: number

**当仅指定了 `start` 属性时使用**，用于设置图片的高度。

- `offsetX`: number

设置图片 x 方向的偏移量。

- `offsetY`: number

设置图片 y 方向的偏移量。

#### chart.guide.region(cfg)

辅助背景框。

```javascript
chart.guide().region({
  top: {boolean}, // 指定 giude 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
  start: {object} | {function} | {array}, // 辅助框起始位置
  end: {object} | {function} | {array},// 辅助框结束位置
  style: {object} // 辅助框的图形样式属性
});
```

##### 参数

- `top`: boolean

指定 guide 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层。

- `start`: object | array | function

指定辅助背景框的起始位置，即背景框的左上角，该值的类型如下：

- object: 使用图表 x,y 对应的原始数据例如： { time: '2010-01-01', value: 200 }

- array: 使用数组来配置位置 [ x, y ]，根据数组中的值的存在以下几种形式：

  1. 对应数据源中的原始数据；

  2. 关键字：'min', 'max', 'median', 'start', 'end'，分别代表数据的最大值、最小值、中间值以及坐标系区间的起始和结束

  3. x，y 都是百分比的形式，如 30%，在绘图区域定位。注意：对于 Y 轴，起始点为 Y 轴上方

  4. 1 和 2 两种类型的数据可以混用，使用百分比形式时 x 和 y 必须都是百分比形式

- function: 回调函数，可以动态得确定辅助元素的位置，应用于数据动态更新，辅助元素的位置根据数据变化的场景

```javascript
chart.guide().region({
    start(xScales, yScales) {
      return []; // 位置信息
    }
  });
```

- `end`: object | array | function

指定辅助背景框的结束位置，即背景框的右下角，该属性用法同 `start`。

- `style`: object

用于设置辅助背景框的样式，`style` 的更详细的配置项 [绘图属性](/zh/docs/api/graphics)。

#### chart.guide().html(cfg)

辅助 html。

```javascript
chart.guide().html({
  position: {object} | {function} | {array}, // html 的中心位置
  htmlContent: {string}, // html 代码
  alignX: {string}, // html 水平方向的布局，可取值为 'left'，'middle'，'right'
  alignY: {string}, // html 垂直方向的布局，可取值为 'top'，'middle'，'bottom'
  offsetX: {number},
  offsetY: {number},
  zIndex: {number}
});
```

##### 参数

- `position`: object | function | array

设置 html 的显示位置，该值的类型如下：

- object: 使用图表 x,y 对应的原始数据例如： { time: '2010-01-01', value: 200 }

- array: 使用数组来配置位置 [ x, y ]，根据数组中的值的存在以下几种形式：

  1. 对应数据源中的原始数据；

  2. 关键字：'min', 'max', 'median', 'start', 'end'，分别代表数据的最大值、最小值、中间值以及坐标系区间的起始和结束

  3. x，y 都是百分比的形式，如 30%，在绘图区域定位。注意：对于 Y 轴，起始点为 Y 轴上方

  4. 1 和 2 两种类型的数据可以混用，使用百分比形式时 x 和 y 必须都是百分比形式

- function: 回调函数，可以动态得确定辅助元素的位置，应用于数据动态更新，辅助元素的位置根据数据变化的场景

```javascript
chart.guide().html({
    position(xScales, yScales) {
      return []; // 位置信息
    }
  });
```

- `alignX`: string

html 的水平对齐方式，可取值为： `left`、`middle`、`right`，默认值为 `middle`。

- `alignY`: string

html 的垂直对齐方式，可取值为： `top`、`middle`、`bottom`，默认值为 `middle`。

- `htmlContent`: string

需要显示的 html 内容。

- `zIndex`: number

html 层级。

- `offsetX`: number

设置 html 在 x 方向的偏移量。

- `offsetY`: number

设置 html 在 y 方向的偏移量。

#### chart.guide().arc(cfg)

辅助圆弧。

```javascript
chart.guide().arc({
  top: {boolean}, // 指定 giude 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
  start: {object} | {function} | {array}, // 辅助框起始位置
  end: {object} | {function} | {array},// 辅助框结束位置
  style: {object} // 图形样式属性
});
```

##### 参数

- `top`: boolean

指定 guide 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层。

- `start`: object | array | function

指定辅助圆弧的起始位置，该值的类型如下：

- object: 使用图表 x,y 对应的原始数据例如： { time: '2010-01-01', value: 200 }

- array: 使用数组来配置位置 [ x, y ]，根据数组中的值的存在以下几种形式：

  1. 对应数据源中的原始数据；

  2. 关键字：'min', 'max', 'median', 'start', 'end'，分别代表数据的最大值、最小值、中间值以及坐标系区间的起始和结束

  3. x，y 都是百分比的形式，如 30%，在绘图区域定位。注意：对于 Y 轴，起始点为 Y 轴上方

  4. 1 和 2 两种类型的数据可以混用，使用百分比形式时 x 和 y 必须都是百分比形式

- function: 回调函数，可以动态得确定辅助元素的位置，应用于数据动态更新，辅助元素的位置根据数据变化的场景

```javascript
chart.guide().arc({
    start(xScales, yScales) {
      return []; // 位置信息
    }
  });
```

- `end`: object | array | function

指定辅助圆弧的结束位置，该属性用法同 `start`。

- `style`: object

设置圆弧的显示样式，`style` 的更详细的配置项 [绘图属性](/zh/docs/api/graphics)

#### chart.guide().regionFilter(cfg)

辅助区域过滤，将图表中位于矩形选区中的图形元素提取出来，重新着色。

```javascript
chart.guide().regionFilter({
  top: {boolean}, // 指定 giude 是否绘制在 canvas 最上层，默认为 true, 即绘制在最上层
  start: {object} | {function} | {array}, // 起始位置
  end: {object} | {function} | {array},// 结束位置
  color: {string}, // 染色色值
  apply: {array}, // 可选，设定 regionFilter 只对特定 geom 类型起作用
  style: {object} // 可选，为 regionFilter 区域设定额外的样式
});
```

##### 参数

- `top`: boolean

指定 guide 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层。

- `start`: object | array | function

指定辅助过滤区域的起始位置，即过滤区域的左上角，该值的类型如下：

- object: 使用图表 x,y 对应的原始数据例如： { time: '2010-01-01', value: 200 }

- array: 使用数组来配置位置 [ x, y ]，根据数组中的值的存在以下几种形式：

  1. 对应数据源中的原始数据；

  2. 关键字：'min', 'max', 'median', 'start', 'end'，分别代表数据的最大值、最小值、中间值以及坐标系区间的起始和结束

  3. x，y 都是百分比的形式，如 30%，在绘图区域定位。注意：对于 Y 轴，起始点为 Y 轴上方

  4. 1 和 2 两种类型的数据可以混用，使用百分比形式时 x 和 y 必须都是百分比形式

- function: 回调函数，可以动态得确定辅助元素的位置，应用于数据动态更新，辅助元素的位置根据数据变化的场景

```javascript
chart.guide().regionFilter({
    start(xScales, yScales) {
      return []; // 位置信息
    }
  });
```

- `end`: object | array | function

指定辅助过滤区域的结束位置，即过滤区域的右下角，该属性用法同 `start`。

- `color`: string

指定辅助过滤区域内图形元素重新着色的色值。

- `apply`: array

可选，设定 regionFilter 只对特定 geom 类型起作用，如 `apply: [ 'area' ]`，默认 regionFilter 的作用域为整个图表。

- `style`: object

可选，为过滤区域的图形设置额外的样式，`style` 的更详细的配置项 [绘图属性](/zh/docs/api/graphics)。

#### chart.guide().dataMarker(cfg)

特殊数据标注点，适用于折线图和面积图。

```javascript
chart.guide().dataMarker({
  top: {boolean}, // 指定 giude 是否绘制在 canvas 最上层，默认为 true, 即绘制在最上层
  position: {object} | {function} | {array}, // 标注点起始位置
  content: {string}, // 显示的文本内容
  style: {
    text: {object}, // 设置文本的显示样式
    point:{object}, // 设置标注点的显示样式
    line: {object} // 设置标注线的显示样式
  },// 可选
  display:{
    text: {boolean}, // 是否显示文本
    point: {boolean}, // 是否显示标注点
    line: {boolean} // 是否显示标注线
  },// 可选，是否显示文本/point/line，默认为全部显示
  lineLength: {number}, //可选，line 长度，default 为 20
  direction: {string}, // 可选，朝向，默认为 upward，可选值为 'upward' 或者 'downward'
  autoAdjust: {boolean} // 可选，文本超出绘制区域时，是否自动调节文本方向，默认为 true
});
```

##### 参数

- `top`: boolean

指定 guide 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层。

- `position`: object | array | function

指定特殊数据点标注的位置，该值的类型如下：

- object: 使用图表 x,y 对应的原始数据例如： { time: '2010-01-01', value: 200 }

- array: 使用数组来配置位置 [ x, y ]，根据数组中的值的存在以下几种形式：

  1. 对应数据源中的原始数据；

  2. 关键字：'min', 'max', 'median', 'start', 'end'，分别代表数据的最大值、最小值、中间值以及坐标系区间的起始和结束

  3. x，y 都是百分比的形式，如 30%，在绘图区域定位。注意：对于 Y 轴，起始点为 Y 轴上方

  4. 1 和 2 两种类型的数据可以混用，使用百分比形式时 x 和 y 必须都是百分比形式

- function: 回调函数，可以动态得确定辅助元素的位置，应用于数据动态更新，辅助元素的位置根据数据变化的场景

```javascript
chart.guide().dataMarker({
    position(xScales, yScales) {
      return []; // 位置信息
    }
  });
```

- `content`: string

辅助文本的显示内容。

- `style`: object

用于设置 point/line/text 样式，更详细的配置项 [绘图属性](/zh/docs/api/graphics)

- `display`: object

用于设置是否显示 point/line/text。

- `lineLength`: number

设置 line 的长度，default 为 20。

- `direction`: string

标注点朝向：'upward' | 'downward', default 为 'upward'，即向上。

- `autoAdjust`: Boolean

当文本超出绘制区域时，是否自动调节文本方向，默认为 true，内部会自动调节文本方向。

#### chart.guide().dataRegion(cfg)

特殊数据区间标注，适用于折线图和面积图。

```javascript
chart.guide().dataRegion({
  top: {boolean}, // 指定 giude 是否绘制在 canvas 最上层，默认为 true, 即绘制在最上层
  start: {object} | {function} | {array}, // 标注点起始位置
  end: {object} | {function} | {array}, // 标注点结束位置
  content: {string}, // 显示的文本内容
  style: {
    region: {object}, // 填充区域的显示样式设置
    text: {object} // 文本的显示样式设置
  },// 可选
  lineLength: {number} // 可选，line长度，default为 0
});
```

##### 参数

- `top`: boolean

指定 guide 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层。

- `start`: object | array | function

指定特殊数据区间标注的起始位置，该值的类型如下：

- object: 使用图表 x,y 对应的原始数据例如： { time: '2010-01-01', value: 200 }

- array: 使用数组来配置位置 [ x, y ]，根据数组中的值的存在以下几种形式：

  1. 对应数据源中的原始数据；

  2. 关键字：'min', 'max', 'median', 'start', 'end'，分别代表数据的最大值、最小值、中间值以及坐标系区间的起始和结束

  3. x，y 都是百分比的形式，如 30%，在绘图区域定位。注意：对于 Y 轴，起始点为 Y 轴上方

  4. 1 和 2 两种类型的数据可以混用，使用百分比形式时 x 和 y 必须都是百分比形式

- function: 回调函数，可以动态得确定辅助元素的位置，应用于数据动态更新，辅助元素的位置根据数据变化的场景

```javascript
chart.guide().dataRegion({
    start(xScales, yScales) {
      return []; // 位置信息
    }
  });
```

- `end`: object | array | function

指定特殊数据区间标注的结束位置，该属性用法同 `start`。

- `content`: string

辅助文本的显示内容。

- `style`: object

region/text 的显示样式，更详细的配置项 [绘图属性](/zh/docs/api/graphics)

- `lineLength`: number

line 的长度，default 为 0。

#### chart.guide().clear()

清理所有的 guide ，用于重置 guide。<br />

```javascript
chart.guide().clear();
chart.guide().line({});
chart.repaint();
```

### facet

(type:string, config:object)

用于生成分面。

```javascript
chart.facet(type, {
  fileds: [ 'field1', 'field2', ...],
  showTitle: true, // 显示标题
  autoSetAxis: true, // 自动设置坐标轴的文本，避免重复和遮挡
  padding: 10, // 每个 view 之间的间距
  /**
   * 创建每个分面中的视图
   * @param  {object} view  视图对象
   * @param  {object} facet facet中有行列等信息，常见属性：data rows cols rowIndex colIndex rowField colField
   * @return {null}
   */
  eachView(view, facet) {},
  // 列标题
  colTitle: {
    offsetY: -15,
    style: {
      fontSize: 14,
      textAlign: 'center',
      fill: '#444'
    }
  },
  // 行标题
  rowTitle: {
    offsetX: 15,
    style: {
      fontSize: 14,
      textAlign: 'center',
      rotate: 90,
      fill: '#444'
    }
  }
})
```

#### 参数

- `type`: string

分面类型，现支持的类型为：`rect`, `list`, `tree`, `mirror`, `matrix`。

- `fileds`: string | array

设置分面的字段，用于划分数据集。

- `showTitle`: boolean

是否显示分面的标题，默认为 true，即展示。

- `autoSetAxis`: boolean

是否自动设置坐标轴的文本，避免重复和遮挡，默认为 true，即自动设置。

- `padding`: number | array

设置每个 view 之间的间距。`padding` 是 view 的内部边距，所以不会影响布局。

- `eachView`: function

回调函数，用于绘制每一个分面对应 view。该回调函数的内容如下：

```javascript
/**
 * 创建每个分面中的视图
 * @param  {object} view  视图对象
 * @param  {object} facet facet中有行列等信息，常见属性：data rows cols rowIndex colIndex rowField colField
 * @return {null}
*/
eachView(view, facet) {}
```

- `colTitle`: object | null

分面列标题设置，可设置属性如下，如果属性值为 null，表示不展示列标题

```javascript
colTitle: {
  offsetY: -15, // 列标题垂直方向的偏移
  style: {
    fontSize: 14,
    textAlign: 'center',
    fill: '#444'
  } // 标题文本样式
}
```

- style 的更详细的配置项 [绘图属性](/zh/docs/api/graphics)

- `rowTitle`: object | null

分面行标题设置，可设置属性如下，如果属性值为 null，表示不展示列标题

```javascript
rowTitle: {
  offsetX: -15, // 列标题水平方向的偏移
  style: {
    fontSize: 14,
    textAlign: 'center',
    fill: '#444'
  } // 标题文本样式
}
```

- style 的更详细的配置项 [绘图属性](/zh/docs/api/graphics)

! 注意：`showTitle` 和 `autoSetAxis` 用于控制分面的默认行为；`colTitle` 和 `rowTitle` 是通过 `chart.guild().text()` 来实现的，所以所有 `chart.guild().text()` 的参数都生效。

##### 示例

```html
const data = [
  { gender: '男', count: 40, class: '一班', grade: '一年级' },
  { gender: '女', count: 30, class: '一班', grade: '一年级' },
  { gender: '男', count: 35, class: '二班', grade: '一年级' },
  { gender: '女', count: 45, class: '二班', grade: '一年级' },
  { gender: '男', count: 20, class: '三班', grade: '一年级' },
  { gender: '女', count: 35, class: '三班', grade: '一年级' },
  { gender: '男', count: 30, class: '一班', grade: '二年级' },
  { gender: '女', count: 40, class: '一班', grade: '二年级' },
  { gender: '男', count: 25, class: '二班', grade: '二年级' },
  { gender: '女', count: 32, class: '二班', grade: '二年级' },
  { gender: '男', count: 28, class: '三班', grade: '二年级' },
  { gender: '女', count: 36, class: '三班', grade: '二年级' }
];
const chart = new G2.Chart({
  container: 'c4',
  width: 800,
  height: 400,
  animate: false,
  padding: [ 0, 90, 80, 80 ]
});
chart.source(data);
chart.coord('theta');
chart.tooltip({
  showTitle: false
});
chart.facet('tree', {
  fields: [ 'grade','class' ],
  line: {
    stroke: '#00a3d7'
  },
  lineSmooth: true,
  eachView(view, facet) {
    const data = facet.data;
    const dv = new DataSet.View();
    dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'gender',
      as: 'percent'
    });
    view.source(dv, {
      percent: {
        formatter(val) {
          return (val * 100).toFixed(2) + '%';
        }
      }
    });
    view.intervalStack().position('percent').color('gender');
  }
});
chart.render();
```

### filter

(field:string, callback:function)

过滤数据，如果存在对应的图例，则过滤掉的字段置灰。

#### 参数

- `field`: string

指定过滤的数据字段。

- `callback`: function

回调函数，用于过滤满足条件的数据。使用如下：

```javascript
chart.filter('x', val => {
  // val 参数为 x 字段对应的数据值。
  return val > 20; // 图表将会只渲染数值大于 20 的数值。
});
```

### view

创建视图，返回 view 对象（详见 [View](/zh/docs/api/view)）。

```javascript
chart.view({
  start: { x: 0, y: 0 },
  end: { x: 0.5, y: 0.5 },
  padding: 0,
  animate: true
});
```

#### 参数

- `start`: Object

view 的绘图区域的起始点，结构如下：

```javascript
start: {
  x: 0, // 为 0 - 1 范围的值
  y: 0 // 为 0 - 1 范围的值
}
```

- `end`: Object

view 的绘图区域的结束点，结构如下：

```javascript
end: {
  x: 1, // 为 0 - 1 范围的值
  y: 1 // 为 0 - 1 范围的值
}
```

- `padding`: number | array | object

设置 view 的内边距，支持如下几种设置方式：

1. `padding: [ 20, 30, 20, 30]`

2. `padding: 20`

3. `padding: { top: 20, right: 30, bottom: 20, left: 30 }`

另外也支持设置百分比，如 `padding: [ 20%, 30% ]`，该百分比相对于整个图表的宽高。

padding 为数字以及数组类型时使用方法同 CSS 盒模型。

- `animate`: boolean

是否视图默认带动画，默认为 true，即带动画。

### animate

(enable: boolean)

用于动画的开启关闭。

### forceFit

当父元素宽度变化时，通过调用此方法达到宽度自适应。当然也可以在创建 chart 实例时设置 `forceFit` 属性。

### line

创建线图，返回一个 geom 对象，详见 [Geometry](/zh/docs/api/geometry)。

### point

创建点图图，返回一个 geom 对象，详见 [Geometry](/zh/docs/api/geometry)。

### path

创建路径图，返回一个 geom 对象，详见 [Geometry](/zh/docs/api/geometry)。

### area

创建区域图，返回一个 geom 对象，详见 [Geometry](/zh/docs/api/geometry)。

### interval

创建柱图，返回一个 geom 对象，详见 [Geometry](./geom.html)。

### polygon

创建多边形，返回一个 geom 对象，详见 [Geometry](/zh/docs/api/geometry)。

### schema

创建 K 线、箱型图，返回一个 geom 对象，详见 [Geometry](/zh/docs/api/geometry)。

### edge

创建树图、流程图、关系图，返回一个 geom 对象，详见 [Geometry](/zh/docs/api/geometry)。

### heatmap

创建热力图，返回一个 geom 对象，详见 [Geometry](/zh/docs/api/geometry)。

### render

图表绘制的最后一步，用于将图表渲染至画布。

### clear

清空图表上所有的绘制内容，但是不销毁图表。

### repaint

图表重绘。

### destroy

销毁图表，删除生成的图表对象。

### changeData

(data: array | DataSet.View)

用于修改图表的数据源，注意这里 data 的数据结构需要同原始的数据结构保持一致。

### changeSize

(width: number, height: number)

更改图表的大小。

#### 参数

- `width`: number

图表宽度。

- `height`: number

图表高度。

### changeWidth

(width: number)

更改图表的宽度。

#### 参数

- `width`: number

图表宽度。

### changeHeight

(height: number)

更改图表的高度。

#### 参数

- `height`: number

图表高度。

### getXScale

返回图表 x 轴对应的度量[Scale](/zh/docs/api/coordinate)。

### getYScales

获取图表所有 y 轴的度量[Scale](/zh/docs/api/scale)，以数组的形式返回。

### getXY

(item: object)

获取数据对应在画布空间的坐标。返回的结果为一个对象，格式如下：

```javascript
{
  x: 12, // 画布上的横坐标
  y: 34 // 画布上的纵坐标
}
```

如果传入的数据不在画布空间内，则返回 null。

#### 参数

参数是一个 Object 类型，结构如下：

```javascript
{
  'x 轴对应的字段名': '该字段名对应的数值',
  'y 轴对应的字段名': '该字段名对应的数值'
}
```

##### 代码实例

```javascript
const data = [
  { cut: 'a', price: 1 },
  { cut: 'b', price: 2 },
  { cut: 'c', price: 3 },
  { cut: 'd', price: 4 }
];

chart.getXY({
  cut: 'b',
  price: 2
});
```

### getSnapRecords

(point: object)

获取逼近的点 point 的原始数据集合。

#### 参数

point 的格式如下，表示的是画布坐标：

```javascript
const point= {
  x: 100,
  y: 200
}

chart.on('plotmove', ev => {
  var records = chart.getSnapRecords({x: ev.x, y: ev.y});
  console.log(records);
});
```

返回结果为一个数组。

### getAllGeoms

获取图表中所有的几何标记对象 [geometry](/zh/docs/api/geometry)，返回的结果是一个数组： [geom, geom, ...]。

### changeVisible

(visible: boolean)

显示或者隐藏。

### toDataURL

返回图表的 dataUrl 用于生成图片，返回 dataUrl 路径。

### downloadImage

(name: string)

图表导出功能，通过传入 name 来指定下载图片的文件名。

#### 参数

- `name`: string

图片的名称，如不指定，则默认为 chart.png。

### showTooltip

(point: object)

根据传入的坐标点显示对应的 tooltip 信息，这个方法通常同 [chart.getXY()](/zh/docs/api/chart/#getxy) 配合使用。

point 是一个对象，代表画布上的坐标点，参数格式如下：

```javascript
{
  x: 12, // 画布上的横坐标
  y: 34 // 画布上的纵坐标
}
```

### hideTooltip

隐藏 tooltip，返回 chart 对象。

### getTooltipItems

(point: object)

根据传入的坐标点 point，获取当前坐标点上的 tooltip 信息，point 的格式如下，表示的是画布坐标：

```javascript
const point= {
  x: 100,
  y: 200
}
```

## 事件

在 G2 中，我们将事件分为如下事件：

1. 画布基础事件，如 mousedown click dblclick 等；

```javascript
chart.on('mousedown', ev => {});
chart.on('mousemove', ev => {});
chart.on('mouseleave', ev => {});
chart.on('mouseup', ev => {});
chart.on('click', ev => {});
chart.on('dblclick', ev => {});
chart.on('touchstart', ev => {});
chart.on('touchmove', ev => {});
chart.on('touchend', ev => {});
```

1. 绘图区域事件，如 plotmove plotclick 等；

```javascript
chart.on('plotenter', ev => {});
chart.on('plotmove', ev => {});
chart.on('plotleave', ev => {});
chart.on('plotclick', ev => {});
chart.on('plotdblclick', ev => {});
```

1. tooltip 事件；

```javascript
chart.on('tooltip:show', ev => {}); // tooltip 展示
chart.on('tooltip:hide', ev => {}); // tooltip 隐藏
chart.on('tooltip:change', ev => {}); // tooltip 内容发生变化的时候
```

1. 图形元素事件，即组成图表的各种图形元素；

我们以 『图形元素名』+ 『基础事件名』 的方式来组合图形元素上的事件，帮助用户进行更精准的事件监听，同时也给交互提供了更大的可能性。图形元素事件对象上都会携带 `shape` 属性，即表示当前被触发的图形元素。

```javascript
chart.on('point:click', ev => {});
chart.on('axis-label:click', ev => {});
```

由于我们抛出的图形元素事件是通用的，所以当需要针对某一个具体的图形元素进行事件监听时，我们提供了一个 `appendInfo` 属性，用于帮助用户对特定的图形元素进行事件标识，该属性可用于以下四个接口：

- `chart.axis()`

- `chart.legend()`

- `chart.guide()`

- `geom().label()`

使用方式如下：

```javascript
chart.guide().line({
  top: true,
  start: ['min', 50],
  end: ['max', 50],
  text: {
    content: 'Safe sugar intake 50g/day',
    position: 'end',
    style: {
      textAlign: 'end'
    }
  },
  lineStyle: {
    endArrow: true,
    lineWidth: 10
  },
  appendInfo: {
    id: 'sugar'
  }
});

chart.on('guide-line:click', ev => {
  console.log('guide-line:click', ev.appendInfo); // {id: 'sugar'}
});
chart.on('guide-line-text:click', ev => {
  console.log('guide-line-text:click', ev.appendInfo); // {id: 'sugar'}
});
```

- lineStyle, style 的更详细的配置项 [绘图属性](/zh/docs/api/graphics)

- ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*2vr7RZwsLQ0AAAAAAAAAAABkARQnAQ)

下图展示了图表各个组件的名称：![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*VuEuRqN8JTEAAAAAAAAAAABkARQnAQ)

下图通过监听 `interval:mouseenter` 和 `interval:mouseleave` 事件，定义当鼠标 hover 的交互。

```javascript
const data = [
  { country: 'Lithuania', litres: 501.9 },
  { country: 'Czech Republic', litres: 301.9 },
  { country: 'Ireland', litres: 201.1 },
  { country: 'Germany', litres: 165.8 },
  { country: 'Australia', litres: 139.9 },
  { country: 'Austria', litres: 128.3 },
  { country: 'UK', litres: 99 },
  { country: 'Belgium', litres: 60 },
  { country: 'The Netherlands', litres: 50 }
];

const ds = new DataSet();
const dv = ds.createView()
  .source(data)
  .transform({
    type: 'percent',
    field: 'litres',
    dimension: 'country',
    as: 'percent'
  });

const chart = new G2.Chart({
  container: 'c5',
  forceFit: true,
  height: 400
});
chart.source(dv, {
  percent: {
    formatter: val => {
      val = (val * 100).toFixed(2) + '%';
      return val;
    }
  },
  nice: false
});
chart.coord('theta', {
  innerRadius: 0.3,
  radius: 0.95
});
chart.tooltip({
  showTitle: false
});
chart.intervalStack()
  .position('percent')
  .color('country', [ '#67b7dc', '#84b761', '#fdd400', '#cc4748', '#cd82ad', '#2f4074', '#448e4d', '#b7b83f', '#b9783f' ])
  .label('percent', {
    formatter: (val, item) => {
      return item.point.country + ': ' + val;
    }
  })
  .style({
    lineWidth: 2,
    stroke: '#fff'
  });
chart.render();
const canvas = chart.get('canvas');
chart.on('interval:mouseenter', ev => {
  const shape = ev.shape;
  const coord = chart.get('coord');
  if (!shape.get('selected')) {
    shape.attr('shadowBlur', 40);
    shape.attr('shadowColor', 'rgba(0, 0, 0, 0.3)');
    shape.attr('transform', [
      [ 't', -coord.getCenter().x, -coord.getCenter().y ],
      [ 's', 1.1, 1.1 ],
      [ 't', coord.getCenter().x, coord.getCenter().y ]
    ]);
    canvas.draw();
  }
});
chart.on('interval:mouseleave', ev => {
  const shape = ev.shape;
  if (!shape.get('selected')) {
    shape.attr({
      shadowBlur: null,
      shadowColor: null,
      transform: null
    });
    shape.setTransform(null);
    canvas.draw();
  }
});
```

- style 的更详细的配置项 [绘图属性](/zh/docs/api/graphics)

### 更多

更多的信息可以查看[几何标记](/zh/docs/manual/tutorial/geometry)使用各种具体的图表
