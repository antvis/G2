---
title: G2 配置项总览
order: 1
---

本文档详细展示了 G2 的完整配置体系，涵盖了所有可用的配置选项和层级关系。

## 图表初始化配置

在创建图表实例时，可以通过 `new Chart(params)` 传入以下配置项：

| 配置项 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| **container** | `string \| HTMLElement` | - | 指定图表绘制的 DOM，可以传入 DOM id 或 DOM 实例 |
| **autoFit** | `boolean` | `false` | 图表是否自适应容器宽高 |
| **clip** | `boolean` | `false` | 是否隐藏超出绘制区域的图形 |
| **width** | `number` | `640` | 图表宽度 |
| **height** | `number` | `480` | 图表高度 |
| **depth** | `number` | `0` | 图表深度，在 3D 图表中使用 |
| **padding** | `'auto' \| number` | `'auto'` | 图表内边距，使用方式参考 CSS 盒模型 |
| **margin** | `number` | `16` | 图表外边距，使用方式参考 CSS 盒模型 |
| **inset** | `number` | `0` | 图表呼吸范围宽度 |
| **renderer** | `Canvas \| SVG \| WebGL` | `Canvas` | 指定渲染引擎 |
| **theme** | `'classic' \| 'classicDark' \| 'academy' \| customTheme` | - | 配置图表主题 |
| **plugins** | `any[]` | - | 指定渲染时使用的插件 |

**示例：**

```javascript
const chart = new Chart({
  container: 'container',     // DOM 容器
  autoFit: true,              // 自适应容器大小
  clip: true,                 // 裁剪超出区域
  padding: 20,                // 内边距
  margin: 16,                 // 外边距
  theme: 'classicDark',       // 深色主题
  plugins: [new Plugin()]     // 插件
});
```

## 图表配置

创建图表实例后，可以通过以下两种方式进行配置：

### 方式一：API 链式调用
```javascript
chart
  .data(data)
  .encode('x', 'field1')
  .encode('y', 'field2')
  .scale('x', { type: 'band' })
  .axis('x', { title: 'X轴标题' });
```

### 方式二：options 方法传入 spec 配置
```javascript
chart.options({
  type: 'interval',
  data: data,
  encode: { x: 'field1', y: 'field2' },
  scale: { x: { type: 'band' } },
  axis: { x: { title: 'X轴标题' } }
});
```

以下是完整的图表配置项层级关系：

<Tree />

