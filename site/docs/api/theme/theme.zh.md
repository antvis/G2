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

目前 G2 内置了 10+ mark 几何标记图形，同时每种 mark 类型也有关联的 shape 图形。如果 mark 指定的 shape 在主题中没有定义的话，会取 mark 的默认 shape 的主题定义。

| 几何标记                       | 默认图形 |
| ------------------------------ | -------- |
| [interval](/api/mark/interval) | interval |
| [line](/api/mark/line)         | line     |
| [point](/api/mark/point)       | hollow   |
| [area](/api/mark/area)         | area     |
| [cell](/api/mark/cell)         | rect     |
| [text](/api/mark/text)         | text     |
| [image](/api/mark/image)       | image    |
| [link](/api/mark/link)         | link     |
| [box](/api/mark/box)           | box      |
| [polygon](/api/mark/polygon)   | polygon  |
| [vector](/api/mark/vector)     | vector   |

### 坐标轴

axis 主题还支持根据轴位置定义，如下：均继承 axis 通用样式

| 属性       | 描述                                             | 类型      | 默认值 |
| ---------- | ------------------------------------------------ | --------- | ------ |
| axis       | 坐标轴通用主题样式                               | AxisStyle | -      |
| axisTop    | position 为 top 的轴样式                         | AxisStyle | -      |
| axisBottom | position 为 bottom 的轴样式                      | AxisStyle | -      |
| axisLeft   | position 为 left 的轴样式                        | AxisStyle | -      |
| axisRight  | position 为 right 的轴样式                       | AxisStyle | -      |
| axisArcY   | position 为 arcY 的轴样式，通常在 polar 坐标系下 | AxisStyle | -      |

AxisStyle 配置详见 [Axis](/api/component/axis) API。

### 图例

| 属性             | 描述             | 类型        | 默认值 |
| ---------------- | ---------------- | ----------- | ------ |
| legend           | 图例主题样式     | LegendStyle | -      |
| continuousLegend | 连续图例主题样式 | LegendStyle | -      |

LegendStyle 配置详见 [Legend](/api/component/legend) API。

### 标签

| 属性       | 描述                             | 类型       | 默认值 |
| ---------- | -------------------------------- | ---------- | ------ |
| label      | 标签主题样式                     | LabelStyle | -      |
| innerLabel | position 为 inner 的标签主题样式 | LabelStyle | -      |

LabelStyle 配置详见 [Label](/api/label/overview) API。

### 缩略轴

| 属性   | 描述           | 类型        | 默认值 |
| ------ | -------------- | ----------- | ------ |
| slider | 缩略轴主题样式 | SliderStyle | -      |

SliderStyle 配置详见 [Slider](/api/component/slider) API。

<!-- ### 滚动条 -->

<!-- ### 时间条 -->
