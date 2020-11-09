---
title: 自定义主题
order: 4
---

G2 提供了自定义主题机制以允许用户切换、定义图表主题。包括：

1. 定义全新的主题结构
2. 使用主题样式表，实现主题的快速定制

## 定义全新的主题结构

```typescript
import { registerTheme, Chart } from '@antv/g2';

// Step 1: 注册主题
registerTheme('newTheme', {
  defaultColor: 'red',
  colors10: ['#FF6B3B', '#626681', '#FFC100', '#9FB40F', '#76523B', '#DAD5B5', '#0E8E89', '#E19348', '#F383A2', '#247FEA'],
  colors20: ['#FF6B3B', '#626681', '#FFC100', '#9FB40F', '#76523B', '#DAD5B5', '#0E8E89', '#E19348', '#F383A2', '#247FEA', '#2BCB95', '#B1ABF4', '#1D42C2', '#1D9ED1', '#D64BC0', '#255634', '#8C8C47', '#8CDAE5', '#8E283B', '#791DC9'],
});

// Step 2: 使用
chart.theme('newTheme');
chart.render();
```

## 主题属性

下表列出了组成主题的大配置项上的具体属性：

|      **主题属性**       | **类型** |                                **描述**                                 |
| :---------------------: | :------: | :---------------------------------------------------------------------: |
|     `defaultColor`      |  string  |                                 主题色                                  |
|        `padding`        |  number  |                                number[]                                 | 'auto' | chart padding 配置，默认为 'auto' |
|      `fontFamily`       |  string  |                                图表字体                                 |
|       `colors10`        | string[] |                  分类颜色色板，分类个数小于 10 时使用                   |
|       `colors20`        | string[] |                  分类颜色色板，分类个数大于 10 时使用                   |
|   `columnWidthRatio`    |  number  |                   一般柱状图宽度占比，0 - 1 范围数值                    |
|    `maxColumnWidth`     |  number  |                         柱状图最大宽度，像素值                          |
|    `minColumnWidth`     |  number  |                         柱状图最小宽度，像素值                          |
|    `roseWidthRatio`     |  number  |                     玫瑰图占比，0 - 1 范围数值                      |
| `multiplePieWidthRatio` |  number  |                  多层饼图/环图占比，0 - 1 范围数值                  |
|        `shapes`         |  object  |                   配置每个 geometry 映射的 shape 类型                   |
|         `sizes`         |  number  |                      配置 geometry 映射 size 范围                       |
|      `geometries`       |  object  | 配置每个 Geometry 下每个 shape 的样式，包括默认样式以及各个状态下的样式 |
|      `components`       |  object  |            配置坐标轴，图例，tooltip, annotation 的主题样式             |
|        `labels`         | object   |                    配置 Geometry 下 label 的主题样式                    |
|      `innerLabels`      |  object  |           配置 Geometry 下展示在图形内部的 labels 的主题样式            |
|       `pieLabels`       |  object  |                       配置饼图 labels 的主题样式                        |

关于以上每个属性的结构及内容，详见[G2 主题配置项详解](./dive-into-theme)。

## 内置主题

目前默认的内置主要要两套：`default`，`dark`。

```ts
chart.theme('defualt');    // 默认主题
chart.theme('dark');       // 暗黑主题
```

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*-xWWTaMWrGEAAAAAAAAAAABkARQnAQ" style="width:100%;">
