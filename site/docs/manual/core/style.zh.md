---
title: 样式（Style）
order: 9
---

G2 中**样式（Style）** 主要用来控制标记和视图的视觉样式。

## 配置方式

标记可以设置自己的样式，也可以设置视图的样式：

```js
({
  type: 'interval',
  style: {
    // 自己的样式
    stroke: 'black',
    strokeWidth: 2,
  },
  viewStyle: {
    // 视图的样式
    viewFill: 'red',
    contentFill: 'yellow',
  },
});
```

```js
// API
// 第一种方式
chart
  .interval()
  .style('stroke', 'black')
  .style('strokeWidth', 2)
  .viewStyle('viewFill', 'red')
  .viewStyle('contentFill', 'yellow');

// 第二种方式
chart
  .interval()
  .style({
    stroke: 'black',
    strokeWidth: 2,
  })
  .viewStyle({
    viewFill: 'red',
    contentFill: 'yellow',
  });
```

视图可以设置自己的样式：

```js
({
  type: 'view',
  style: {
    viewFill: 'red',
    contentFill: 'yellow',
  },
});
```

```js
// API
// 第一种方式
chart.style('viewFill', 'red').style('contentFill', 'yellow');

// 第二种方式
chart.style({
  viewFill: 'red',
  contentFill: 'yellow',
});
```

### 标记样式

标记的视觉属性除了可以通过 `mark.encode` 去设置之外，还可以通过 `mark.style` 去设置。两者的区别主要有两点：

- `mark.encode` 设置的通道会特殊一点，要么是该标记独有的，比如 image 的 src 通道；要么就是有一些特殊逻辑，比如 x 通道会影响 x 方向坐标轴的生成。
- `mark.encode` 更倾向于去设置和数据有关的通道，但是 `mark.style` 更倾向于去设置和数据无关的通道。虽然 `mark.style` 也同样支持回调去设置数据驱动的通道。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
    })
    .encode('x', 'letter')
    .encode('y', 'frequency')
    .style('fill', 'steelblue') // 设置和数据无关的通道
    .style('strokeWidth', (d) => (d.frequency > 0.1 ? 2 : 1)) // 设置和数据有关的通道
    .style('stroke', (d) => (d.frequency > 0.1 ? 'red' : 'black'))
    .axis('y', { labelFormatter: '.0%' });

  chart.render();

  return chart.getContainer();
})();
```

### 视图样式

而各个区域的样式可以通过 `${name}${Style}` 的形式去设置，其中 `Style` 是 G 的矩形支持的所有样式，比如 `fill`，`stroke` 等，注意首字母要大写，变成驼峰形式。

- **view${Style}** - 设置视图区域的样式
- **plot${Style}** - 设置绘制区域的样式
- **main${Style}** - 设置主区域的样式
- **content${Style}** - 设置内容区域的样式

比如下图中给各个区域染色：

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'view',
    height: 280,
    inset: 10,
    marginTop: 30,
    marginLeft: 40,
    marginBottom: 10,
    marginRight: 20,
    style: {
      // 设置视图样式
      viewFill: '#4e79a7',
      plotFill: '#f28e2c',
      mainFill: '#e15759',
      contentFill: '#76b7b2',
    },
    children: [
      {
        type: 'point',
        data: {
          type: 'fetch',
          value: 'https://assets.antv.antgroup.com/g2/commits.json',
        },
        encode: {
          x: (d) => new Date(d.time).getUTCHours(),
          y: (d) => new Date(d.time).getUTCDay(),
          size: 'count',
          shape: 'point',
        },
        transform: [{ type: 'group', size: 'sum' }, { type: 'sortY' }],
        scale: { y: { type: 'point' } },
        style: { shape: 'point', fill: '#59a14f' },
        axis: {
          x: { title: 'time (hours)', tickCount: 24 },
          y: { title: 'time (day)', grid: true },
        },
        legend: false,
      },
    ],
  });

  chart.render();

  return chart.getContainer();
})();
```

## 绘图属性

G2 使用 [G](https://g.antv.antgroup.com/) 作为绘图引擎，一些图形的样式配置，如折线图的`line.style`，柱状图的`interval.style`等，还有部分组件的样式配置，如`label.style`， `axis.line${style}`等，都是直接透传 G 的绘图属性。

为了方便用户使用，在这里对 G2 常用的绘图属性进行简单的介绍：

### 配置图形样式

| 属性          | 描述                                                                                                         | 类型            | 默认值    | 必选 |
| ------------- | ------------------------------------------------------------------------------------------------------------ | --------------- | --------- | ---- |
| fill          | 图形的填充色                                                                                                 | string          |           |      |
| fillOpacity   | 图形的填充透明度                                                                                             | number          |           |      |
| stroke        | 图形的描边                                                                                                   | string          |           |      |
| strokeOpacity | 描边透明度                                                                                                   | number          |           |      |
| lineWidth     | 图形描边的宽度                                                                                               | number          |           |      |
| lineDash      | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 | [number,number] |           |      |
| opacity       | 图形的整体透明度                                                                                             | number          |           |      |
| shadowColor   | 图形阴影颜色                                                                                                 | string          |           |      |
| shadowBlur    | 图形阴影的高斯模糊系数                                                                                       | number          |           |      |
| shadowOffsetX | 设置阴影距图形的水平距离                                                                                     | number          |           |      |
| shadowOffsetY | 设置阴影距图形的垂直距离                                                                                     | number          |           |      |
| cursor        | 鼠标样式。同 css 的鼠标样式                                                                                  | string          | `default` |      |

接下来，试试使用全量图形样式配置基础柱状图的 `interval` 的图形样式，在下面的代码编辑器里修改属性试试效果：

<Playground path="style/graphic/demo/mark.ts" rid="mark-style"></playground>

### 配置线的样式

| 属性名        | 介绍                                                                                                   | 类型            | 默认值    | 必选 |
| ------------- | ------------------------------------------------------------------------------------------------------ | --------------- | --------- | ---- |
| stroke        | 线的颜色                                                                                               | string          |           |      |
| strokeOpacity | 线的透明度                                                                                             | number          |           |      |
| lineWidth     | 线宽                                                                                                   | number          |           |      |
| lineDash      | 虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 | [number,number] |           |      |
| opacity       | 整体透明度                                                                                             | number          |           |      |
| shadowColor   | 阴影颜色                                                                                               | string          |           |      |
| shadowBlur    | 高斯模糊系数                                                                                           | number          |           |      |
| shadowOffsetX | 设置阴影距图形的水平距离                                                                               | number          |           |      |
| shadowOffsetY | 设置阴影距图形的垂直距离                                                                               | number          |           |      |
| cursor        | 鼠标样式。同 css 的鼠标样式                                                                            | string          | `default` |      |

接下来，试试使用全量线的样式配置基础折线图的 `line` 的样式，在下面的代码编辑器里修改属性试试效果：

<Playground path="style/graphic/demo/line.ts" rid="line-style"></playground>

类似的，我们也可以以相同的方式来配置坐标轴的网格线。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'line',
    data: [
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 7 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 },
    ],
    encode: { x: 'year', y: 'value' },
    scale: { x: { range: [0, 1] }, y: { domainMin: 0, nice: true } },
    axis: {
      y: {
        grid: true,
        gridStroke: 'red',
        gridStrokeOpacity: 0.5,
        gridLineWidth: 2,
        gridLineDash: [2, 4],
      },
    },
  });

  chart.render();

  return chart.getContainer();
})();
```

### 配置文字样式

| 属性名        | 介绍                                                                                                         | 类型                                                       | 默认值    | 必选 |
| ------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- | --------- | ---- |
| fontSize      | 文字大小                                                                                                     | number                                                     |           |      |
| fontFamily    | 文字字体                                                                                                     | string                                                     |           |      |
| fontWeight    | 字体粗细                                                                                                     | number                                                     |           |      |
| lineHeight    | 文字的行高                                                                                                   | number                                                     |           |      |
| textAlign     | 设置文本内容的当前对齐方式                                                                                   | `center` \| `end` \| `left` \| `right` \| `start`          | `start`   |      |
| textBaseline  | 设置在绘制文本时使用的当前文本基线                                                                           | `top` \| `middle` \| `bottom` \| `alphabetic` \| `hanging` | `bottom`  |      |
| fill          | 文字的填充色                                                                                                 | string                                                     |           |      |
| fillOpacity   | 文字的填充透明度                                                                                             | number                                                     |           |      |
| stroke        | 文字的描边                                                                                                   | string                                                     |           |      |
| lineWidth     | 文字描边的宽度                                                                                               | number                                                     |           |      |
| lineDash      | 描边的虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。 | [number,number]                                            |           |      |
| strokeOpacity | 描边透明度                                                                                                   | number                                                     |           |      |
| opacity       | 文字的整体透明度                                                                                             | number                                                     |           |      |
| shadowColor   | 文字阴影颜色                                                                                                 | string                                                     |           |      |
| shadowBlur    | 文字阴影的高斯模糊系数                                                                                       | number                                                     |           |      |
| shadowOffsetX | 设置阴影距文字的水平距离                                                                                     | number                                                     |           |      |
| shadowOffsetY | 设置阴影距文字的垂直距离                                                                                     | number                                                     |           |      |
| cursor        | 鼠标样式。同 css 的鼠标样式                                                                                  | string                                                     | `default` |      |

接下来，试试使用全量文字的样式配置水波图的中心文字的样式，在下面的代码编辑器里修改属性试试效果：

<Playground path="style/graphic/demo/text.ts" rid="text-style"></playground>

类似的，我们也可以以相同的方式来配置标题的文字样式。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'line',
    data: [
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 7 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 },
    ],
    encode: { x: 'year', y: 'value' },
    scale: { x: { range: [0, 1] }, y: { domainMin: 0, nice: true } },
    title: {
      size: 30,
      title: "我是一个标题 I'am a title",
      align: 'center',
      spacing: 4,

      // 绘图属性
      titleFontSize: 30,
      titleFontFamily: 'sans-serif',
      titleFontWeight: 500,
      titleLineHeight: 30,
      titleTextAlign: 'center',
      titleTextBaseline: 'middle',
      titleFill: '#fff',
      titleFillOpacity: 0.9,
      titleStroke: 'yellow',
      titleStrokeOpacity: 0.9,
      titleLineWidth: 1,
      titleLineDash: [1, 2],
      titleOpacity: 1,
      titleShadowColor: '#d3d3d3',
      titleShadowBlur: 10,
      titleShadowOffsetX: 10,
      titleShadowOffsetY: 10,
      titleCursor: 'pointer',
    },
  });

  chart.render();

  return chart.getContainer();
})();
```

### 配置线性渐变

<img alt="加载失败" src="https://gw.alipayobjects.com/zos/rmsportal/ieWkhtoHOijxweuNFWdz.png" width="600">

> 说明：`l`  表示使用线性渐变，绿色的字体为可变量，由用户自己填写。

```js
// 使用渐变色描边，渐变角度为 0，渐变的起始点颜色 #ffffff，中点的渐变色为 #7ec2f3，结束的渐变色为 #1890ff
stroke: 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff';
// 当然，下面这种写法也是可以的
stroke: 'linear-gradient(270deg, #ffffff 0%, #7ec2f3 50%, #1890ff 100%)';
```

接下来，试试配置面积图的填充颜色为线性渐变色，在下面的代码编辑器里修改属性试试效果：

<Playground path="style/graphic/demo/area.ts" rid="area-style"></playground>

也可以通过配置 `color` 通道的比例尺来实现一个渐变色仪表盘，在下面的代码编辑器里修改属性试试效果：

<Playground path="style/graphic/demo/gauge.ts" rid="gauge-style"></playground>

### 配置环形渐变

<img alt="加载失败" src="https://gw.alipayobjects.com/zos/rmsportal/qnvmbtSBGxQlcuVOWkdu.png" width="600">

> 说明：`r`  表示使用放射状渐变，绿色的字体为可变量，由用户自己填写，开始圆的 x y r 值均为相对值，0 至 1 范围。

```ts
// 使用渐变色填充，渐变起始圆的圆心坐标为被填充物体的包围盒中心点，半径为(包围盒对角线长度 / 2) 的 0.1 倍，渐变的起始点颜色 #ffffff，中点的渐变色为 #7ec2f3，结束的渐变色为 #1890ff
fill: 'r(0.5, 0.5, 0.1) 0:#ffffff 1:#1890ff';
```

接下来，试试配置条形图的填充颜色为环形渐变色，在下面的代码编辑器里修改属性试试效果：

<Playground path="style/graphic/demo/radial-gradient.ts" rid="radial-gradient-style"></playground>

### 配置纹理

用特定的纹理填充图形。纹理内容可以直接是图片或者  Data URLs。

<img alt="加载失败" src="https://gw.alipayobjects.com/zos/rmsportal/NjtjUimlJtmvXljsETAJ.png" width="600">

> 说明：`p`  表示使用纹理，绿色的字体为可变量，由用户自己填写。

- `a`: 该模式在水平和垂直方向重复；<br />
- `x`: 该模式只在水平方向重复；<br />
- `y`: 该模式只在垂直方向重复；<br />
- `n`: 该模式只显示一次（不重复）。<br />

```ts
style: {
  fill: 'p(a)https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*58XjQY1tO7gAAAAAAAAAAABkARQnAQ',
}
```

接下来，试试配置条形图的填充颜色为纹理，在下面的代码编辑器里修改属性试试效果：

<Playground path="style/graphic/demo/pattern.ts" rid="pattern"></playground>

除此之外，G2 提供了 `内置纹理`、 `G API 自定义纹理` 等多种方式来设置纹理，详情见 [设置纹理](/manual/extra-topics/pattern)。
