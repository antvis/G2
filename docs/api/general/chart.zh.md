---
title: 绘制图表 - Chart
order: 0
redirect_from:
  - /zh/docs/api
---

`markdown:docs/common/style.md`

创建 Chart 图表对象。

```sign
new Chart(params: ChartCfg) => View;
```

### ChartCfg.container

<description> _string | HTMLElement_ **required** </description>

指定 chart 绘制的 DOM，可以传入 DOM id，也可以直接传入 dom 实例。

### ChartCfg.autoFit

<description> _boolean_ **optional** _default:_ `false`</description>

图表是否自适应容器宽高，默认为 `false`，用户需要手动设置 width 和 height。当 `autoFit: true` 时，会自动取图表容器的宽高，如果用户设置了 height，那么会以用户设置的 height 为准。

### ChartCfg.width

<description> _number_ **optional** </description>

图表宽度。

### ChartCfg.height

<description>_number_ **optional** </description>

图表高度。

### ChartCfg.padding

<description> _'auto' | number | number[]_ **optional** _default:_ `'auto'`</description>

设置图表的内边距，使用方式参考 CSS 盒模型。

```js
const chart = new G2.Chart({
  container: 'c1',
  width: 1000,
  height: 500,
  padding: [20, 20, 95, 80], // 上，右，下，左
});
```

<img src='https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*pYwiQrdXGJ8AAAAAAAAAAABkARQnAQ' alt='padding' width='400'/>

### ChartCfg.appendPadding

<description> _'auto' | number | number[]_ **optional**</description>

图表的内边距会在图表的 padding 的基础上加上 appendPadding，使用方式参考 CSS 盒模型。

### ChartCfg.defaultInteractions

<description> _string[]_ **optional**
_default:_ `['tooltip', 'legend-filter', 'legend-active', 'continuous-filter', 'ellipsis-text']`</description>

配置图表默认交互，仅支持字符串形式。G2 默认支持的交互有 `'tooltip', 'legend-filter', 'legend-active', 'continuous-filter', 'ellipsis-text'`，除了这些，还可以通过 `registerAction` 自定义交互类型。

| 默认交互          | 描述                                                                          | 效果展示                                                                                                |
| ----------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| tooltip           | 鼠标在 chart 上移动时显示提示信息                                             | <img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*UMsFRZwIDvMAAAAAAAAAAABkARQnAQ">       |
| legend-active     | 鼠标移动到图例选项时，图例项高亮，对应的图形高亮                              | <img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*fjkTR70h9YAAAAAAAAAAAABkARQnAQ">       |
| legend-filter     | 分类图例的勾选                                                                | <img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*qKwJTbpJLyUAAAAAAAAAAABkARQnAQ">       |
| continuous-filter | 连续图例的过滤                                                                | <img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*pe97RKJM_XAAAAAAAAAAAABkARQnAQ">       |
| ellipsis-text     | 当文本过长被省略时，鼠标 hover 到文本时会自动展示 Tooltip，显示出完整的文本名 | ![ellipsis-text](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*_zCnRJywLkcAAAAAAAAAAAAAARQnAQ) |

### ChartCfg.limitInPlot

<description> _boolean_ **optional** </description>

是否对超出坐标系范围的 Geometry 进行剪切。

<!--
### ChartCfg.localRefresh
<description> _boolean_  **optional**  _default:_ `true`</description>
是否开启局部刷新，默认开启。

局部刷新目前用起来有很多 bug，建议先不暴露。
-->

### ChartCfg.pixelRatio

<description> _number_ **optional** _default:_ `window.devicePixelRatio`</description>

设置设备像素比，默认取浏览器的值 `window.devicePixelRatio`。

### ChartCfg.renderer

<description> _'canvas' | 'svg'_ **optional** _default:_ `'canvas'`</description>

指定渲染引擎，默认使用 canvas。

### ChartCfg.theme

<description> _ThemObject | string_ **optional**</description>

<!-- FIXME 写更详细的 theme 配置项 -->

配置主题，目前 g2 默认有 `dark` 主题模式，如需要自定义配置，可以先通过 `registerTheme` 注册主题，再设置主题 key。

```ts
registerTheme('customTheme', {
  defaultColor: 'red',
});

const chart = new G2.Chart({
  container: 'container',
  theme: 'customTheme',
});
```

### ChartCfg.visible

<description> _boolean_ **optional** _default:_ `true`</description>

chart 是否可见，默认为 true，设置为 false 则会隐藏。
