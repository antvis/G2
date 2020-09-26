<!--## geometry方法-->

<!--包括几何图形关于视觉通道映射的方法：position、color、size、shape-->

`markdown:common/style.md`

<div class='custom-api-docs'>

### geometry.position( )

配置位置通道映射规则

```ts
// highlight-start
(cfg: string | string[] | AttributeOption) => Geometry;
// highlight-end
```

`markdown:common/attribute-option.md`

有以下三种配置方式：

第一种，仅使用一维的水平方向（x 轴）的视觉通道，此时,垂直方向的视觉通道没有数据含义。

```ts
geometry.position('dim');
```

第二种，同时使用水平和垂直 2 个视觉通道。

```ts
geometry.position('dim1*dim2');
```

第三种，传入 _AttributeOption_ 进行配置。

```ts
geometry.position({
  fields: ['x', 'y'],
});
```

### geometry.color( )

配置颜色通道映射规则。

```ts
// highlight-start
(field: string, cfg?: string | string[] | ColorAttrCallback) => Geometry
or
(field: AttributeOption) => Geometry
or
(field: AttributeOption | string, cfg?: string | string[] | ColorAttrCallback) => Geometry
// highlight-end

type ColorAttrCallback = (...args: any[]) => string;
```

`markdown:common/attribute-option.md`

有以下五种配置方式：

第一种，使用默认的回调函数，读取一个数组中的颜色进行颜色的映射。

```ts
geometry.color('c');
```

第二种，将指定字段的数据值映射至指定的颜色值 colors（可以是字符串也可以是数组），此时用于通常映射分类数据。

```ts
geometry.color('c', ['#1890ff', '#5AD8A6']);
```

第三种，指定颜色的渐变路径，在这个渐变路径映射定量（连续)的数据。

```ts
geometry.color('c', '#BAE7FF-#1890FF-#0050B3');
```

第四种，直接指定常量，不进行数据映射。

```ts
geometry.color('red');
```

第五种，使用回调函数进行颜色值的自定义，可以使用多个字段使用 \* 号连接。

```ts
geometry.color('x', (xVal) => {
  if (xVal === 'a') {
    return 'red';
  }
  return 'blue';
});
```

### geometry.size( )

配置大小通道映射规则。

```ts
// highlight-start
(field: number | string, cfg?: [number, number] | SizeAttrCallback) => Geometry
or
(field: AttributeOption) => Geometry
or
(field: AttributeOption | number | string, cfg?: [number, number] | SizeAttrCallback) => Geometry
// highlight-end

type SizeAttrCallback = (...args: any[]) => number;
```

`markdown:common/attribute-option.md`

有以下五种配置方式：

第一种，直接指定像素大小。

```ts
geometry.size(10);
```

第二种，指定映射到 size 的字段，使用内置的默认大小范围为 [1, 10]

```ts
geometry.size('x');
```

第三种，指定映射到 size 字段外，还提供了 size 的最大值和最小值范围。

```ts
geometry.size('x', [5, 30]);
```

第四种，使用回调函数映射 size，用于个性化的 size 定制，可以使用多个字段进行映射。

```ts
geometry.size('x', (xVal) => {
  if (xVal === 'a') {
    return 10;
  }
  return 5;
});
```

第五种，通过传入 _AttributeOption_ 配置

```ts
geometry.color({
  fields: ['x'],
  values: ['#1890ff', '#5AD8A6'],
});
```

### geometry.shape( )

配置形状通道映射规则。

```ts
// highlight-start
(field: string, cfg?: string[] | ShapeAttrCallback) => Geometry
or
(field: AttributeOption) => Geometry
or
(field: AttributeOption | string, cfg?: string[] | ShapeAttrCallback) => Geometry
// highlight-end

type ShapeAttrCallback = (...args: any[]) => string | any[];
```

`markdown:common/attribute-option.md`

有五种配置方式：

第一种，指定常量，将所有数据值映射到固定的 shape

```ts
geometry.shape('circle');
```

第二种，将指定的字段映射到内置的 shapes 数组中。

```ts
geometry.shape('dim');
```

第三种，将指定的字段映射到内置的 shapes 数组中。

```ts
geometry.shape('x', ['circle', 'diamond', 'square']);
```

第四种，使用回调函数获取 shape，用于个性化的 shape 定制，可以根据单个或者多个字段确定

```ts
geometry.shape('x', (xVal) => {
  if (xVal === 'a') {
    return 'circle';
  }
  return 'diamond';
});
```

第五种，通过传入 _AttributeOption_ 配置

```ts
geometry.shape({
  fields: ['x'],
  values: ['circle', 'diamond', 'square'],
});
```

不同 Geometry G2 原生支持的 shape 类型如下表，除此之外还可以通过 `registerShape` 自定义形状。

| Geometry     | shape                                                                                                                                                                                                                                                                                             |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| point        | - 内部填充：'circle', 'square', 'bowtie', 'diamond', 'hexagon', 'triangle', 'triangle-down' <br/> - 空心的仅使用边框：'hollow-circle', 'hollow-square', 'hollow-bowtie', 'hollow-diamond', 'hollow-hexagon', 'hollow-triangle', 'hollow-triangle-down', 'cross', 'tick', 'plus', 'hyphen', 'line' |
| path && line | - line 常见的实线 <br/> - dot 点线 <br/> - smooth 平滑的曲线 <br/> - 信号相关的折线图：vh hv hvh vhv                                                                                                                                                                                              |
| area         | - area: 一般的区域图 <br/> - smooth：平滑的区域图 <br/> - line：仅用线包围起区域图的范围，而不使用颜色填充<br/> - smooth-line：平滑线包围器区域图的范围，不使用颜色填充                                                                                                                           |
| interval     | - rect：默认的填充区间图 <br/> - hollow-rect：非填充的仅有边框的区间图<br/> - line：使用线来表示上下区间<br/> - tick：使用多条线来表示数据区间                                                                                                                                                    |
| polygon      | - polygon：默认的多边形形状，颜色填充多边形，无边框 <br/> - square：颜色填充多边形，无边框                                                                                                                                                                                                        |

<!--
这里是之前有的点图的 shape 示例，之后需要替换
![undefined](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/306237/1599209950732-2830a326-d4f9-4dc7-9c8e-f11d806d29f7.png)
-->

### geometry.adjust()

设置数据调整方式。G2 目前内置了四种类型：

1. stack：层叠，将同一个分类的数据值累加起来。以层叠的柱状图为例，x 轴方向的同一个分类下面的数据，按照顺序，将 y 轴对应的值累加，最终将数据调整的不再重叠。
2. dodge：分组散开，将同一个分类的数据进行分组在一个范围内均匀分布，例如分组柱状图。
3. jitter：扰动散开，将数据的位置轻微的调整，使得映射后的图形位置不再重叠。仅适用于分类数据，将分类数据转换成索引值，在索引值 [ -0.5 ,0.5 ] 的范围内进行随机分布。
   <img alt='jitter' src='https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*c_oTS4jAICkAAAAAAAAAAAAAARQnAQ' width='100%' style='max-width: 900px'/>
4. symmetric：数据对称，使得生成的图形居中对齐，例如河流图、漏斗图。
   <img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*igxpSIu_xngAAAAAAAAAAABkARQnAQ" width='100%' style='max-width: 900px'>

有以下三种配置方式：
第一种，传入一种 adjust 类型。

```ts
geometry.adjust('stack');
```

第二种，组合使用 adjust。

```ts
geometry.adjust(['stack', 'dodge']);
```

第三种，通过 _AdjustOption_ 进行配置。

```ts
// highlight-start
(adjustCfg: AdjustOption | AdjustOption[]): Geometry
// highlight-end

geometry.adjust([{ type: 'stack' }, { type: 'dodge', dodgeBy: 'x' }]);
```

_AdjustOption_ 配置如下：

| 参数名       | 类型                                          | 是否必选 | 默认值 | 描述                                                                                          |
| ------------ | --------------------------------------------- | -------- | ------ | --------------------------------------------------------------------------------------------- |
| type         | 'stack' \| 'dodge' \| 'jitter' \| 'symmetric' |          | -      | 数据调整类型                                                                                  |
| marginRatio  | number                                        |          | -      | 只对 'dodge' 生效，取 0 到 1 范围的值（相对于每个柱子宽度），用于控制一个分组中柱子之间的间距 |
| dodgeBy      | string                                        |          | -      | 只对 'dodge' 生效，声明以哪个数据字段为分组依据                                               |
| reverseOrder | boolean                                       |          | -      | 只对 'stack' 生效，用于控制是否对数据进行反序操作                                             |

### geometry.style()

图形样式配置

有以下三种配置方式：
第一种，传入 _ShapeAttrs_ 配置图形样式。点击 [ShapeAttrs](shape) 查看详细样式配置。

```ts
geometry.style({
  lineWidth: 2,
  stroke: '#1890ff',
});
```

第二种，传入 _StyleOption_，根据具体的数据进行详细配置。

```ts
geometry.style({
  fields: ['x', 'y'], // 数据字段
  callback: (xVal, yVal) => {
    const style = { lineWidth: 2, stroke: '#1890ff' };
    if (xVal === 'a') {
      style.lineDash = [2, 2];
    }
    return style;
  },
});
```

`markdown:common/StyleOption.md`

第三种，传入字段和回调函数进行详细的配置，第一个参数传入的字段对应值将以参数的形式传入第二个回调函数中。

```ts
// highlight-start
(field: string, styleFunc: StyleCallback) => Geometry;

type StyleCallback = (...args: any[]) => ShapeAttrs;
// highlight-end

geometry.style('x*y', (xVal, yVal) => {
  const style = { lineWidth: 2, stroke: '#1890ff' };
  if (xVal === 'a') {
    style.lineDash = [2, 2];
  }
  return style;
});
```

点击 [ShapeAttrs](shape) 查看详细样式配置。

### geometry.state()

```ts
// highlight-start
(cfg: StateOption) => Geometry;
// highlight-end
```

设置状态对应的样式。_StateOption_ 配置如下：

```ts
export interface StateOption {
  /** 默认状态样式。 */
  default?: ShapAttrs | (element: Element) => ShapAttrs;
  /** active 状态配置。 */
  active?: ShapAttrs | (element: Element) => ShapAttrs;
  /** inactive 状态配置。 */
  inactive?: ShapAttrs | (element: Element) => ShapAttrs;
  /** selected 状态配置。 */
  selected?: ShapAttrs | (element: Element) => ShapAttrs;
}
```

### geometry.animate()

可以传入 `boolean` 开启或关闭动画，也可以直接传入动画配置 _AnimateOption_。

```ts
// highlight-start
(cfg: AnimateOption | boolean) => Geometry
// highlight-end

geometry.animate(cfg: AnimateOption | boolean) => Geometry;

geometry.animate(false);	// 关闭动画
geometry.animate(true);	// 开启动画，默认开启

geometry.animate({
	enter: {
		duration: 1000, // enter 动画执行时间
	},
	leave: false, // 关闭 leave 销毁动画
});
```

_AnimateOption_ 配置如下：

```ts
export interface AnimateOption {
  /** chart 初始化渲染时的入场动画，false/null 表示关闭入场动画。 */
  appear?: AnimateCfg | false | null;
  /** chart 发生更新时，新增元素的入场动画，false/null 表示关闭入场动画。 */
  enter?: AnimateCfg | false | null;
  /** 更新动画配置，false/null 表示关闭更新动画。 */
  update?: AnimateCfg | false | null;
  /** 销毁动画配置，false/null 表示关闭销毁动画。 */
  leave?: AnimateCfg | false | null;
}

export interface AnimateCfg {
  /** 动画缓动函数 */
  easing?: string | (data: Datum) => string;
  /** 动画执行函数 */
  animation?: string;
  /** 动画执行时间 */
  duration?: number | (data: Datum) => number;
  /** 动画延迟时间 */
  delay?: number | (data: Datum) => number;
  /** 动画执行结束后的回调函数 */
  callback?: () => any;
}
```

### geometry.label()

同 chart.label。

### geometry.tooltip()

同 chart.tooltip。

### geometry.changeVisible()

传入 `boolean`，显示或者隐藏 geometry。

### geometry.clear()

清空当前 Geometry，配置项仍保留，但是内部创建的对象全部清空。

### geometry.destroy()

销毁 Geometry 实例。

### geometry.hide()

隐藏。

### geometry.show()

显示。

</div>
