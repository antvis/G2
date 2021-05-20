---
title: 几何图形 - Geometry
order: 1
---

`markdown:docs/common/style.md`

Geometry 几何标记基类，主要负责数据到图形属性的映射以及绘制逻辑。

<img alt='geometry' width='100%' style='max-width: 800px' src='https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*urWQQJm0Wy8AAAAAAAAAAAAAARQnAQ'/>

### 创建几何图形

#### chart.interval(options)

用于绘制柱状图、直方图、南丁格尔玫瑰图、饼图、条形环图（玉缺图）、漏斗图等。

`markdown:docs/common/geom-base-cfg.md`

#### chart.point(options)

用于绘制点图、折线图中的点等。

`markdown:docs/common/geom-base-cfg.md`

#### chart.line(options)

用于绘制折线图、曲线图、阶梯线图等。

options:

| 参数名       | 类型    | 是否必选 | 默认值 | 描述               |
| ------------ | ------- | -------- | ------ | ------------------ |
| sortable     | boolean |          | -      | 是否对数据进行排序 |
| theme        | object  |          | -      | 主题配置           |
| visible      | boolean |          | -      | 是否可见           |
| connectNulls | boolean |          | -      | 是否连接空值       |

#### chart.area(options)

用于绘制区域图（面积图）、层叠区域图、区间区域图等。

options:

| 参数名       | 类型    | 是否必选 | 默认值 | 描述                          |
| ------------ | ------- | -------- | ------ | ----------------------------- |
| sortable     | boolean |          | -      | 是否对数据进行排序            |
| theme        | object  |          | -      | 主题配置                      |
| visible      | boolean |          | -      | 是否可见                      |
| connectNulls | boolean |          | -      | 是否连接空值                  |
| startOnZero  | boolean |          | -      | 面积图是否从 0 基准线开始填充 |

<img alt='startOnZero-true' width='300' src='https://gw.alipayobjects.com/zos/rmsportal/ZQqwUCczalrKqGgagOVp.png'/>
<img alt='startOnZero-false' width='300' src='https://gw.alipayobjects.com/zos/rmsportal/yPswkaXvUpCYOdhocGwB.png'/>

#### chart.path(options)

用于绘制路径图，地图上的路径等。

options:

| 参数名       | 类型    | 是否必选 | 默认值 | 描述               |
| ------------ | ------- | -------- | ------ | ------------------ |
| sortable     | boolean |          | -      | 是否对数据进行排序 |
| theme        | object  |          | -      | 主题配置           |
| visible      | boolean |          | -      | 是否可见           |
| connectNulls | boolean |          | -      | 是否连接空值       |

#### chart.polygon(options)

用于绘制色块图（像素图）、热力图、地图等。

`markdown:docs/common/geom-base-cfg.md`

#### chart.edge(options)

用于绘制流程图、树、弧长连接图、和弦图、桑基图等。

`markdown:docs/common/geom-base-cfg.md`

#### chart.heatmap(options)

用于绘制热力图。

`markdown:docs/common/geom-base-cfg.md`

#### chart.violin(options)

用于绘制小提琴图。

`markdown:docs/common/geom-base-cfg.md`

#### chart.schema(options)

用于绘制 k 线图，箱型图。

`markdown:docs/common/geom-base-cfg.md`

### Geometry API

#### geom.position()

配置 position 通道映射规则。

示例:

```ts
// 数据结构: [{ x: 'A', y: 10, color: 'red' }]
geometry.position('x*y');
geometry.position(['x', 'y']);
geometry.position({
  fields: ['x', 'y'],
});
```

#### geom.color()

配置 color 通道映射规则。`field` 参与颜色映射的数据字段，多个字段使用 '\*' 连接符进行连接。

示例:

```ts
// data: [{ x: 'A', y: 10, color: 'red' }, { x: 'B', y: 30, color: 'yellow' }]

// 使用 '#1890ff' 颜色渲染图形
geometry.color('#1890ff');

// 根据 x 字段的数据值进行颜色的映射，这时候 G2 会在内部调用默认的回调函数，读取默认提供的颜色进行数据值到颜色值的映射。
geometry.color('x');

// 将 'x' 字段的数据值映射至指定的颜色值 colors（可以是字符串也可以是数组），此时用于通常映射分类数据
geometry.color('x', ['#1890ff', '#5AD8A6']);

// 使用回调函数进行颜色值的自定义；可以使用多个字段使用、*号连接
geometry.color('x', (xVal) => {
  if (xVal === 'a') {
    return 'red';
  }
  return 'blue';
});

// 指定颜色的渐变路径，用于映射连续的数据
geometry.color('x', '#BAE7FF-#1890FF-#0050B3');
```

#### geom.size()

配置 size 通道映射规则。`field` 参与 size 映射的数据字段，多个字段使用 '\*' 连接符进行连接。

示例:

```ts
// data: [{ x: 'A', y: 10, color: 'red' }, { x: 'B', y: 30, color: 'yellow' }]
geometry.size({
  values: [10],
});
```

示例:

```ts
// data: [{ x: 'A', y: 10, color: 'red' }, { x: 'B', y: 30, color: 'yellow' }]

// 直接指定像素大小
geometry.size(10);

// 指定映射到 size 的字段，使用内置的默认大小范围为 [1, 10]
geometry.size('x');

// 指定映射到 size 字段外，还提供了 size 的最大值和最小值范围
geometry.size('x', [5, 30]);

// 使用回调函数映射 size，用于个性化的 size 定制，可以使用多个字段进行映射
geometry.size('x', (xVal) => {
  if (xVal === 'a') {
    return 10;
  }
  return 5;
});
```

#### geom.shape()

配置 shape 通道映射规则。field 参与 shape 映射的数据字段，多个字段使用 '\*' 连接符进行连接。

示例:

```ts
// data: [{ x: 'A', y: 10, color: 'red' }, { x: 'B', y: 30, color: 'yellow' }]
geometry.shape({
  fields: ['x'],
});
```

示例:

```ts
// data: [{ x: 'A', y: 10, color: 'red' }, { x: 'B', y: 30, color: 'yellow' }]

// 指定常量，将所有数据值映射到固定的 shape
geometry.shape('circle');

// 将指定的字段映射到内置的 shapes 数组中
geometry.shape('x');

// 将指定的字段映射到指定的 shapes 数组中
geometry.shape('x', ['circle', 'diamond', 'square']);

// 使用回调函数获取 shape，用于个性化的 shape 定制，可以根据单个或者多个字段确定
geometry.shape('x', (xVal) => {
  if (xVal === 'a') {
    return 'circle';
  }
  return 'diamond';
});
```

#### geom.tooltip()

配置 Geometry 显示的 tooltip 内容。

```sign
tooltip(false); // 代表关闭 tooltip。
tooltip(true); //  代表开启 tooltip。
```

Geometry 默认允许 tooltip 展示，我们可以使用以下方法对 tooltip 的展示内容进行配置：

示例:

```ts
// data: [{x: 'a', y: 10}]
tooltip({
  fields: ['x'],
});
```

![xxx](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*268uQ50if60AAAAAAAAAAABkARQnAQ)

```ts
tooltip({
  fields: ['x', 'y'],
});
```

![xxx](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*A_ujSa8QhtcAAAAAAAAAAABkARQnAQ)

tooltip() 方法同样支持数据映射及回调用法：

示例:

```ts
chart.tooltip({
  itemTpl: '<li>{x}: {y}</li>',
});

chart
  .line()
  .position('x*y')
  .tooltip({
    fields: ['x', 'y'],
    callback: (x, y) => {
      return {
        x,
        y,
      };
    },
  });
```

其返回的值必须为对象，该值中的属性同 chart.tooltip() 的 itemTpl 模板相对应，返回的变量可用于 itemTpl 的字符串模板。

示例:

```ts
// data: [{x: 'a', y: 10}]

// 等同于 tooltip({ fields: [ 'x' ] })
tooltip('x');

// 等同于 tooltip({ fields: [ 'x', 'y' ] })
tooltip('x*y');

// 等同于 tooltip({ fields: [ 'x', 'y' ], callback: (x, y) => { x, y } })
tooltip('x*y', (x, y) => {
  return {
    x,
    y,
  };
});
```

#### geom.style()

图形样式配置。

示例:

```ts
// 配置图形样式
style({
  lineWidth: 2,
  stroke: '#1890ff',
});

// 根据具体的数据进行详细配置
style({
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

示例:

```ts
style('x*y', (xVal, yVal) => {
  const style = { lineWidth: 2, stroke: '#1890ff' };
  if (xVal === 'a') {
    style.lineDash = [2, 2];
  }
  return style;
});
```

#### geom.label()

Geometry label 配置

示例:

```ts
// data: [ {x: 1, y: 2, z: 'a'}, {x: 2, y: 2, z: 'b'} ]
// 在每个图形上显示 z 字段对应的数值
label({
  fields: ['z'],
});

label(false); // 不展示 label

// 在每个图形上显示 x 字段对应的数值，同时配置文本颜色为红色
label('x', {
  style: {
    fill: 'red',
  },
});

// 以 type 类型的 label 渲染每个图形上显示 x 字段对应的数值，同时格式化文本内容
label(
  'x',
  (xValue) => {
    return {
      content: xValue + '%',
    };
  },
  {
    type: 'base', // 声明 label 类型
  }
);
```

#### geom.customInfo()

用于向 shape 中传入自定义的数据。目前可能仅仅可能用于在自定义 shape 的时候，像自定义 shape 中传入自定义的数据，方便实现自定义 shape 的配置能力。

示例:：

```ts
chart.interval().customInfo({ yourData: 'hello, g2!' });
```

然后在自定义 shape 的时候，可以拿到这个信息。

```ts
registerShape('interval', 'your-shape', {
  draw(shapeInfo, container) {
    const { customInfo } = shapeInfo;
    console.log(customInfo); // will log { yourData: 'hello, g2!' }.
  },
});
```

#### geom.state()

设置状态对应的样式。

示例:

```ts
chart.interval().state({
  selected: {
    animate: { duration: 100, easing: 'easeLinear' },
    style: {
      lineWidth: 2,
      stroke: '#000',
    },
  },
});
```

如果图形 shape 是由多个 shape 组成，即为一个 G.Group 对象，那么针对 group 中的每个 shape，我们需要使用下列方式进行状态样式设置：
如果我们为 group 中的每个 shape 设置了 'name' 属性(shape.set('name', 'xx'))，则以 'name' 作为 key，否则默认以索引值（即 shape 的 添加顺序）为 key。

```ts
chart
  .interval()
  .shape('groupShape')
  .state({
    selected: {
      style: {
        0: { lineWidth: 2 },
        1: { fillOpacity: 1 },
      },
    },
  });
```

#### geom.animate()

Geometry 动画配置。

```sign
animate(false); // 关闭动画
animate(true); // 开启动画，默认开启。
```

我们将动画分为四个场景：

1. appear: 图表第一次加载时的入场动画；
2. enter: 图表绘制完成，发生更新后，产生的新图形的进场动画；
3. update: 图表绘制完成，数据发生变更后，有状态变更的图形的更新动画；
4. leave: 图表绘制完成，数据发生变更后，被销毁图形的销毁动画。

示例:

```ts
animate({
  enter: {
    duration: 1000, // enter 动画执行时间
  },
  leave: false, // 关闭 leave 销毁动画
});
```

#### geom.paint()

```sign
geometry.paint(isUpdate: boolean = false)
```

将原始数据映射至图形空间，同时创建图形对象。参数代表着是否重新绘制或更新

#### geom.clear()

清空当前 Geometry，配置项仍保留，但是内部创建的对象全部清空。

#### geom.destroy()

销毁 Geometry 实例。

#### geom.getAttribute()

根据名字获取图形属性实例。可选的图形属性有：`color`, `size`, `position`, `shape` 等

```sign
getAttribute(name: string): Attribute
```

#### geom.getXScale()

获取 x 轴对应的 scale 实例。scale 相关的 api 操作，可以见: [antvis/scale](https://github.com/antvis/scale)

```sign
getXScale(): Scale
```

#### geom.getYScale()

获取 y 轴对应的 scale 实例。scale 相关的 api 操作，可以见: [antvis/scale](https://github.com/antvis/scale)

```sign
getYScale(): Scale
```

#### geom.getXYFields()

获得图形的 x y 字段。

```sign
getXYFields(): [string, string]
```

#### geom.getElementsBy()

根据一定的规则查找 Geometry 的 Elements。

```sign
getElementsBy(condition: (element: Element) => boolean): Element[]
```

示例:

```ts
getElementsBy((element) => {
  const data = element.getData();

  return data.a === 'a';
});
```
