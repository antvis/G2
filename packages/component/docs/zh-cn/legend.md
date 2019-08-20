#  Legend

Legend 图例组件,包含连续图例和分类图例两大类，其中分类图例包括Html实现和Canvas实现。

```ts
import { Legend } from `@antv/guide`;

// todo 创建
```


## 通用的 cfg

```ts
interface LegendCfg {
  readonly id?: string | null; // 组件唯一标识
  readonly type: string; // 图例的类型
  readonly title?: string; // 图例标题
  readonly items?: CommonCfg[]; // 图例项配置, TODO: 确定了分类和连续 item 的配置后再修改
  readonly formatter?: Function; // 文本格式化函数

  readonly canvas?: Canvas; // canvas
  readonly container?: Group | string | HTMLDivElement | null; // 组件的容器

  // 交互属性
  readonly capture?: boolean;

  readonly offsetX?: number;
  readonly offsetY?: number;
  readonly visible?: boolean;
  readonly zIndex?: number;
}
```

## Category
分类图例

### Canvas 版本

``` ts
import { Legend } from '@antv/guide'
const catLegend:Category = new Legend.Canvas({
  items,
  unSelectedColor: '#ccc',
  // layout: 'vertical',
  offsetX: 50,
  offsetY: 50,
  container: canvas,
  title: '测试图例',
  titleDistance: 35,
  allowAllCanceled: false,
  titleStyle: {
    fill: '#000',
    fontSize: 24,
    textAlign: 'start',
    textBaseline: 'top',
  },
  textStyle: {
    fill: '#f80',
    fontSize: 12,
    textAlign: 'start',
    textBaseline: 'top',
  },
  backgroundStyle: {
    fill: '#0aa',
    stroke: '#000',
    strokeWidth: 2,
    x: 0,
    y: 0
  },
  autoWrap: true,
  itemWidth: 60,
  wordSpacing: 2,
  itemMarginBottom: 5,
  backgroundPadding: [ 5, 5, 5, 5],
  itemDistance: 5,
  maxLength: 300,
  formatter: value => {
    return value + '格式化';
  },
});
legend.draw();
 ```

#### CFG 配置项

```ts
export interface CategoryCfg extends LegendCfg {
  readonly unSelectedColor:string; // 取消选中的颜色
  readonly titleStyle:CommonCfg; // 图例标题样式
  readonly textStyle:CommonCfg;  // 图例项目文本样式
  readonly backgroundStyle:CommonCfg; // 背景样式
  readonly titleDistance:number; // 标题和图例项的间距
  readonly allowAllCanceled:boolean; // 图例项是否可以全部取消
  readonly autoWrap:boolean; // 是否自动换行
  readonly clickable:boolean; // 是否可点击
  readonly selectedMode:SelectedMode; // 图例项的选择模式，支持 'multiple'、'single'，默认 'multiple'
  readonly layout: LayoutMode; // 图例布局模式，支持 'vertical', 'horizontal', 默认 horizontal
  readonly itemWidth:number; // 图例项目宽度
  readonly wordSpacing:number; // 图例文本间隔
  readonly itemMarginBottom:number; // 图例项 底部间距
  readonly backgroundPadding:number | number[]; // 背景间距
  readonly maxLength:number; // 图例的最大高度或者宽度
  readonly formatter:Function; // 格式化图例文本
}
```

#### Method

##### constuctor

创建 Legend 实例 `new Legend.Canvas(cfg: CategoryCfg)`

##### draw

绘制图例 `draw()`

``` ts
legend.draw();
```

##### clear
清空图例

```ts
legend.clear();
```

##### destroy
销毁图例

```ts
legend.destroy();
```

##### Event
1. itemhover

鼠标移入图例项

```ts
legend.on('itemhover', (ev) => {});
```

2. itemunhover

鼠标移入出图例项

```ts
legend.on('itemunhover',(ev) => {});
```

3. itemclick

图例项被点击

```ts
legend.on('itemclick', ev =>{})
```

### HTML 版本

```ts
import { Legend } from '@antv/guide';
const legend = new Legend.HTML({
  title: '图例标题',
  items: [{}, {}, {}],
  width: 200,
  height: 300,
});
```

#### CFG 配置项

```ts
{
  title: string, // 可选，图例的标题
  items: [{}, {}, {}], // 必选，图例项内容
  width: number, // 必选，图例的宽度
  height: numebr, // 必选，图例的高度
  layout: string, // 可选，图例的布局，可选值为 'horizontal'、'vertical'，默认值为 'horizontal'
  reversed: boolean, // 可选，图例项是否逆序

  container: string | HTMLELEMENT, // 可选，传入 html legend 挂载的 dom 节点，如果不传入，则默认挂载到 chart 的 dom 下，支持传入 id（如：'#container'） 或者 HTML dom 对象
  containerTpl: string, // 可选，HTML 图例的结构模板
  itemTpl: string | function, // 可选，图例项的结构模板

  clickable: boolean, // 可选，图例项是否允许点击，默认为 true
  hoverable: boolean, // 可选，图例项是否允许 hover，默认为 true
  selectedMode: string, // 可选，图例的选中模式，`clickable` 为 true 时生效，可选值：'single','multiple'，默认值为 `multiple`
  allowAllCanceled: boolean, // 可选，表示是否允许所有图例项被取消选中，默认为 false，即必须保留一个被选中的图例项
  highlight: boolean, // 可选，图例项被 hover 时，是否开启 highlight 效果，默认为 false

  titleStyle: object, // 可选，图例标题 dom 的 css 样式
  listStyle: object, // 可选，图例项容器列表 dom 的 css 样式
  itemStyle: object, // 可选，图例项 dom 的 css 样式
  markerStyle: object, // 可选，图例项 marker dom 的 css 样式
  unSelectedColor: string, // 可选，图例项被取消选中的颜色，默认值为 '#ccc'
  backgroudStyle: object, // 可选，图例容器 dom css 样式

  offsetX: number, // 可选，图例沿 x 方向的偏移量，默认值为 0
  offsetY: number, // 可选，图例沿 y 方向的偏移量，默认值为 0

  prefixClassName: string, // 可选，dom 的 css 样式前缀，默认值为 g2-legend
  pagination: object | false, // 可选，当图例过多超出高度时，自动分页，如果将该属性设置为 false，那么关闭分页功能，默认展示滚动条
}
```

* `containerTpl` HTML 图例的结构模板

默认值为：

```html
`<div class="${prefixClassName}">
  <!-- 图例标题结构，需要按照要求提供 class -->
  <div class="${prefixClassName}-title"></div>
  <!-- 图例项容器结构，需要按照要求提供 class -->
  <ul class="${prefixClassName}-list"></ul>
</div>`
```

说明：如果需要自定义 `containerTpl`，需要按照要求，为对应的 dom 提供 `class` 属性，其中 `prefixClassName` 可由用户自定义，后面的结构需要按照要求定义，因为我们需要根据 dom 的 className 查找对应的元素以应用样式以及进行相应的交互操作。

> TODO: 一张图介绍结构以及对应的 className 结构

* `itemTpl` 图例项的结构模板

默认值:

```js
`<li class="${prefixClassName}-item">
  <!-- maker，按照要求定义 class -->
  <span class="${prefixClassName}-item-marker"></span>
  <!-- text，按照要求定义 class -->
  <span class="${prefixClassName}-item-text"></span>
</li>`
```

说明：如果为按照为相应的 dom 元素定义 className，点击以及 hover 交互将无法生效。

为了满足 marker 以及图例项文本的自定义内容，`itemTpl` 属性支持使用回调函数，根据回调函数提供的参数个性化构建每一个图例项的结构以及内容

```js
/**
 * 构建图例项的 dom string
 * @param  {string} value   图例项的文本内容
 * @param  {string} color   图例项的颜色
 * @param  {boolean} checked 当前图例项的选中状态，true 表示被选中，false 表示未选中
 * @param  {number} index   当前图例的索引值
 * @return {string}         返回图例项的 html dom 字符串
 */
itemTpl(value, color, checked, index) {
  // example
  return `<li class="g2-legend-item"><i class="g2-legend-item-marker"></i>{value}</li>`
}
```

* `pagination` 分页器的样式配置

默认开启分页，默认值为：

```js
{
  activeColor: '#000', // 分页器箭头可点击的颜色
  inactiveColor: '#ccc', // 分页器箭头不可点击的颜色
  arrowSize: 8, // 分页器箭头的大小
  animation: true, // 是否开启滑动动画
}
```

当 `pagination` 设置为 `false`，则表示关闭分页功能。

* `highlight` 是否开启高亮效果

默认为 false，当设置为 true 时，会默认为每一个图例项添加一下 className:
  + `active` 代表当前被 hover 的元素，我们会默认在该图例项 dom 上添加 className: 'active'
  + `inactive` highlight 开启时，未被 hover 的图例项都会默认添加上 className: 'inactive'

由用户自己为对应的 className 定义具体的 css 样式来这是效果，因为内部通过动态修改 dom 的 style 属性的话无法恢复原始状态，而且不能保证样式能够一一对 marker  text 等 dom 都生效，故由用户自己定义样式，内部负责大表和动态增添 className。

#### Methods
* `getWidth()`

获取图例的宽度。

* `getHeight()`

获取图例的高度。

* `moveTo(x: number, y: number)`

将图例移动至 (x, y）坐标点位置.

* `destroy()`

销毁图例。

## Continuous

连续图例
