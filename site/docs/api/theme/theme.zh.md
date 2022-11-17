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

G2 主题 token 较多，下面按照通用属性、动画属性、图形元素、图表组件等进行分类介绍

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
