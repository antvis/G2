---
title: theme
order: 2
---

G2 提供了主题配置，用于设置改变整体的主题色板、几何标记、组件包括坐标轴、图例等的默认样式以及动画属性相关的默认属性。
G2 内置了两套 `light` 和 `dark` 两套主题，同时你也可以自定义主题来进行覆盖。

## 开始使用

1. 通过 `chart.theme()` 接口配置

```ts
chart.theme({
  // 修改默认色
  defaultColor: '#ED6DC6',
});
```

2. 直接指定注册的主题 type

```ts
chart.theme({ type: 'dark' });
chart.render(); // 渲染图表
```

## 选项

G2 主题 token 较多，下面按照通用属性、动画属性、视图容器、图形元素、图表组件等若进行分类介绍

### 通用属性

| 属性              | 描述     | 类型                                     | 默认值       |
| ----------------- | -------- | ---------------------------------------- | ------------ |
| defaultColor      | `string` | 主题色                                   | -            |
| defaultSize       | `number` | ---                                      |
| defaultCategory10 | `string` | 分类颜色色板名称，分类个数小于 10 时使用 | 'category10' |
| defaultCategory20 | `string` | 分类颜色色板名称，分类个数大于 10 时使用 | 'category20' |

### 动画属性

| 属性   | 描述              | 类型         | 默认值 |
| ------ | ----------------- | ------------ | ------ |
| enter  | `KeyframeOptions` | 进场动画配置 | -      |
| update | `KeyframeOptions` | 更新动画配置 |
| exit   | `KeyframeOptions` | 离场动画配置 |        |

`KeyframeOptions` 类型如下。更详细配置见: [G 文档](https://g.antv.antgroup.com/api/animation/waapi#effecttiming)

| 属性     | 描述     | 类型                                                             | 默认值 |
| -------- | -------- | ---------------------------------------------------------------- | ------ |
| duration | `number` | 动画运行时长，以毫秒为单位，默认为 auto，和 0 效果相同。         | 300    |
| delay    | `number` | 开始动画前的延迟，以毫秒为单位，默认值为 0，因此动画会立即开始。 |
| easing   | `string` | 缓动函数                                                         |        |
| fill     | `string` | 离场动画配置                                                     | 'both' |

### 视图容器

在 G2 5.0 中 View 是最小的图表单元，它的视图区域组成如下:

- 视图区域（View Area）-下图中蓝色 + 橙色 + 红色 + 青色部分，样式通过 `view${Style}` 的形式声明。蓝色部分的大小通过 margin 声明，该区域用于固定组件到视图边的距离，类似 4.0 中的 appendPadding。
- 绘制区域（Plot Area）- 下图中橙色 + 红色 + 青色部分，样式通过 `plot${Style}` 的形式声明。橙色部分的大小通过 padding 声明，该区域用于绘制组件。
- 主区域（Main Area）- 下图中红色 + 青色部分，样式通过 `main${Style}` 的形式声明。红色部分的大小通过 inset 声明，用于制造组件和 Mark 之间的呼吸区域（Breathing Room），对于散点图尤其有用。
- 内容区域（Content Area）- 下图中青色部分，青色部分的大小由 view 的大小去掉 margin，padding 以及 inset 得到。样式通过 `content${Style}` 的形式声明。主要用于绘制 Mark。

<img alt="view-area" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*IOiTQ47rrzwAAAAAAAAAAAAADmJ7AQ/original" width="800" />

详细可见 [DEMO](/examples/Theme/theme/#layout-area)

| 属性                 | 描述                 | 类型     | 默认值                                                |
| -------------------- | -------------------- | -------- | ----------------------------------------------------- |
| viewFill             | 视图区域填充色       | `string` | light 主题下为 `transparent`, dark 主题下为 `#141414` |
| viewFillOpacity      | 视图区域填充色透明度 | `number` | -                                                     |
| viewStroke           | 视图区域描边色       | `string` | -                                                     |
| viewStrokeWidth      | 视图区域描边色宽度   | `number` | -                                                     |
| viewStrokeOpacity    | 视图区域描边色透明度 | `number` | -                                                     |
| plotFill             | 绘制区域填充色       | `string` | -                                                     |
| plotFillOpacity      | 绘制区域填充色透明度 | `number` | -                                                     |
| plotStroke           | 绘制区域描边色       | `string` | -                                                     |
| plotStrokeWidth      | 绘制区域描边色宽度   | `number` | -                                                     |
| plotStrokeOpacity    | 绘制区域描边色透明度 | `number` | -                                                     |
| mainFill             | 主区域填充色         | `string` | -                                                     |
| mainFillOpacity      | 主区域填充色透明度   | `number` | -                                                     |
| mainStroke           | 主区域描边色         | `string` | -                                                     |
| mainStrokeWidth      | 主区域描边色宽度     | `number` | -                                                     |
| mainStrokeOpacity    | 主区域描边色透明度   | `number` | -                                                     |
| contentFill          | 内容区域填充色       | `string` | -                                                     |
| contentFillOpacity   | 内容区域填充色透明度 | `number` | -                                                     |
| contentStroke        | 内容区域描边色       | `string` | -                                                     |
| contentStrokeWidth   | 内容区域描边色宽度   | `number` | -                                                     |
| contentStrokeOpacity | 内容区域描边色透明度 | `number` | -                                                     |

### 图形元素

图形元素的主题 token 通过 `mark-shape` 的形式声明，如下表示 line mark, line shape 的主题声明：

```ts
{
  line: {
    line: {
      fill: '',
      strokeOpacity: 1,
      lineWidth: 1,
    },
  }
}
```

目前 G2 内置了 10+ Mark 几何标记图形，同时每种 mark 类型也有关联的 shape 图形。如果 mark 指定的 shape 在主题中没有定义的话，会取 mark 的默认 shape 的主题定义。

| 几何标记 | 默认图形             | 描述                                                                      |
| -------- | -------------------- | ------------------------------------------------------------------------- |
| interval | 默认图形为 interval. | 更多 shape 类型以及 shape 样式定义见: [Interval Mark](/api/mark/interval) |
| line     | 默认图形为 line.     | 更多 shape 类型以及 shape 样式定义见: [Line Mark](/api/mark/line)         |
| point    | 默认图形为 hollow.   | 更多 shape 类型以及 shape 样式定义见: [Point Mark](/api/mark/point)        |
| area     | 默认图形为 area.     | 更多 shape 类型以及 shape 样式定义见: [Area Mark](/api/mark/area)         |
| cell     | 默认图形为 rect.     | 更多 shape 类型以及 shape 样式定义见: [Cell Mark](/api/mark/cell)         |
| text     | 默认图形为 text.     | 更多 shape 类型以及 shape 样式定义见: [Text Mark](/api/mark/text)         |
| image    | 默认图形为 image.    | 更多 shape 类型以及 shape 样式定义见: [Image Mark](/api/mark/image)       |
| link     | 默认图形为 link.     | 更多 shape 类型以及 shape 样式定义见: [Link Mark](/api/mark/link)         |
| box      | 默认图形为 box.      | 更多 shape 类型以及 shape 样式定义见: [Box Mark](/api/mark/box)           |
| polygon  | 默认图形为 polygon.  | 更多 shape 类型以及 shape 样式定义见: [Polygon Mark](/api/mark/polygon)   |
| vector   | 默认图形为 vector.   | 更多 shape 类型以及 shape 样式定义见: [Vector Mark](/api/mark/vector)     |

### 图表组件

目前 G2 内置的图表组件有: axis, legend, continuousLegend, label, innerLabel（position 为 inside 的 label 组件）等，详细主题配置见图表组件 [API](/api/component/overview) 文档.
