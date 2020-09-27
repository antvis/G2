<!--## chart.createView() 创建子 view-->

`markdown:docs/common/style.md`

<div class='custom-api-docs'>

创建子 view。之前的调用方法为 `chart.view()`，将在 V4.1 移除。

G2 的图表 Chart，可以创建多个视图 View，推荐只用 chart - view 两层嵌套。每个 View 同 Chart 一样，拥有自己独立的数据源、坐标系、几何标记、Tooltip 以及图例，你可以这样理解为 Chart 也是一种特殊的 View。

```ts
// highlight-start
(cfg?: Partial<ViewCfg>) => View;
// highlight-end

const view = chart.createView({
  region: {
    start: { x: 0.2, y: 0.2 }, // 指定该视图绘制的起始位置，x y 为 [0 - 1] 范围的数据
    end: { x: 1, y: 1 }, // 指定该视图绘制的结束位置，x y 为 [0 - 1] 范围的数据
  },
  padding: [20, 40], // 指定视图的留白
});
```

`createView` 入参配置项为可选，如果传入配置项，配置项 _ViewCfg_ 为：

### ViewCfg.region

<description> _Region_ **optional** </description>

view 的绘制范围。

`markdown:docs/common/region.md`

### ViewCfg.limitInPlot

<description> _boolean_ **optional** </description>

是否对超出坐标系范围的 Geometry 进行剪切。

### ViewCfg.padding

<description> _'auto' | number | number[]_ **optional** _default:_ `'auto'`</description>

设置图表的内边距，使用方式参考 CSS 盒模型。

### ViewCfg.appendPadding

<description> _'auto' | number | number[]_ **optional**</description>

图表的内边距会在图表的 padding 的基础上加上 appendPadding，使用方式参考 CSS 盒模型。

### ViewCfg.theme

<description> _ThemeObject | string_ **optional**</description>

配置主题，目前 g2 默认有 `dark` 主题模式，如需要自定义配置，可以先通过 `registerTheme` 注册主题，再设置主题 key。

### ViewCfg.visible

<description> _boolean_ **optional** _default:_ `true`</description>

是否可见，默认为 true，设置为 false 则会隐藏。

</div>
