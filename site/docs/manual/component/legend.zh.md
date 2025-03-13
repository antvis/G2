---
title: 图例（Legend）
order: 7.2
---

## 概述

G2 中 **图例（Legend）** 是图表的辅助元素，使用颜色、大小、形状区分不同的数据类型，用于图表中数据的筛选。可以理解为是非空间通道（ `color`，`opacity`，`size`，`shape`）对应比例尺的可视化，G2 会根据设置图形属性映射以及数据的类型自动生成不同的图例，当一个变量对应了多个图形属性时，G2 会对图例进行合并，以达到精简的目的。

`color`，`opacity`，`size`，`shape` 这四个非空间通道如果判断接收的参数是数据源的字段时，会自动生成不同的图例：

| 视觉通道 | 解释                     |
| -------- | ------------------------ |
| color    | 根据不同的颜色生成图例   |
| opacity  | 根据不同的透明度生成图例 |
| size     | 根据不同的大小生成图例   |
| shape    | 根据不同的形状生成图例   |

### 构成元素

<img alt="legend-overview" width=900 src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*lGLWS4QUPscAAAAAAAAAAAAAemJ7AQ/original"/>

### 使用方式

配置图例有两种方式

第一种，传入 `boolean` 设置是否显示图例。

```js
({
  type: 'interval',
  legend: false; // 隐藏所有图例
})
```

```js
({
  type: 'interval',
  legend: {color: false}; // 隐藏 color 通道的图例
})
```

第二种，传入 _legendOption_ 对图例进行整体配置。

```js
({
  type: 'interval',
  legend: {
    color: {},
    size: {},
  },
});
```

### 配置层级

图例可以在 Mark 层级配置。在 G2 中，每个标记（Mark）都有自己的图例。如果标记对应的比例尺是同步的，那么图例也会合并。

```js
({
  type: 'interval',
  legend: {
    color: {},
    size: {},
  },
});
```

图例也可以在 View 层级配置。图例具有传递性。视图上声明的图例会传递给 `children` 声明的标记，如果该标记有对应通道的图例，就合并；否则不影响。

```js
({
  type: 'view',
  legend: {
    color: {},
    size: {},
  },
});
```

## 配置项

G2 中图例分为 **连续图例** 和 **分类图例** 两种，由于这两种图例的结构不同，所以配置项也存在差异。

有的配置项作用范围区分分类图例和连续图例：
<Badge type="success">分类图例</Badge>
<Badge type="warning">连续图例</Badge>

### orientation

<description>**optional** _horizontal | vertical_ </description>

图例朝向，对于分类图例来说即滚动方向。

### position

<description> **optional** _"top" | "right" | "left" | "bottom"_ </description>

图例的位置。

```js | ob { pin: false }
(() => {
  const positionList = ['top', 'right', 'left', 'bottom'];
  const positionMap = positionList.map((p) => {
    return {
      label: p,
      value: p,
    };
  });

  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    data: [
      { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
      { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
      { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
      { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
      { name: 'London', 月份: 'May', 月均降雨量: 47 },
      { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
      { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
      { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
      { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
      { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
      { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
      { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
      { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
      { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
      { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
      { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
    ],
    encode: { x: '月份', y: '月均降雨量', color: 'name' },
    transform: [{ type: 'dodgeX' }],
  });

  const handleSetPosition = (position) => {
    // 设置选中的坐标系
    chart.legend({
      color: {
        position,
      },
    });
    chart.render(); // 重新渲染图表
  };

  // 插入Position 选择器
  const selectorContainer = document.createElement('div');
  selectorContainer.textContent = '选择图例位置 ';
  const selector = document.createElement('select');
  selector.innerHTML = positionMap.map(
    (position, index) =>
      `<option value="${position.value}" ${index === 0 ? 'selected' : ''}>${
        position.label
      }</option>`,
  );
  selector.onchange = (e) => {
    handleSetPosition(e.target.value);
  };
  selectorContainer.appendChild(selector);
  const node = chart.getContainer();
  node.insertBefore(selectorContainer, node.childNodes[0]);

  chart.render();

  return node;
})();
```

### layout

<description> _LegendLayoutCfg_ **optional** </description>

Legend 组件支持调整其在画布中的位置，通过 `layout` 属性来设置。
目前支持基本的 Flex 布局方式，支持的属性包括: `justifyContent`, `alignItems`, `flexDirection`。_LegendLayoutCfg_ 配置如下：

| 属性           | 描述         | 类型                                     | 默认值                                                      | 必选 |
| -------------- | ------------ | ---------------------------------------- | ----------------------------------------------------------- | ---- |
| justifyContent | 主轴对齐方式 | `flex-start` \| `flex-end` \| `center`   | `flex-start`                                                |      |
| alignItems     | 交叉轴对齐   | `flex-start` \| `flex-end` \| `center` | `flex-start`                                                |      |
| flexDirection  | 主轴方向     | `row` \| `column`                        | position 为`top`和`bottom`的时候为`row`，其他时候为`column` |      |

通过配置图例的 `position` 和 `layout` ，我们可以很灵活地改变图例的位置。

```js
// 配置一个右侧垂直居中的图例

// 第一步，配置position为right

// 第二步，position为right的时候主轴方向flexDirection默认为column

// 第三步，要实现垂直居中，需要在column方向上对齐方式为center，因为column此时为主轴，所以配置justifyContent为center
({
  legend: {
    color: {
      position: 'right',
      layout: {
        justifyContent: 'center',
      },
    },
  },
});
```

尝试一下：

<Playground path="component/legend/demo/position.ts" rid="legend-position"></playground>

### size

<description> _number_ **optional** </description>

Legend 组件的大小。

### width

<description> _number_ **optional** </description>

Legend 组件的宽度。

### crossPadding

<description> _number_ **optional** </description>

Legend 组件和图表的距离。默认为 `12`。

### order

<description> _number_ **optional** </description>

Legend 组件在布局的时候的排序。默认为 `1`。G2 内部的组件都有默认的排序大小，值越小越靠近图表区域，例如 Title 组件的默认排序是 `2`，就比默认排序为 `1` 的 Legend 组件更远离图表区域。

### cols

<description> _number_ **optional** </description>

适用于 <Badge type="success">分类图例</Badge> 。指定每行显示的图例项数量，为空时表示列数不受限制。

图例布局默认采用**流式布局**。

<img alt="flow layout" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Lb43QoUm8ZEAAAAAAAAAAAAADmJ7AQ/original" width="400" />

当指定 `cols` 之后会采用**网格布局**。

<img alt="grid layout 1" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*IsmYSKexO00AAAAAAAAAAAAADmJ7AQ/original" width="400" />

<img alt="grid layout 2" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Mh1bQbp7jeMAAAAAAAAAAAAADmJ7AQ/original" width="400" />

### gridRow

<description> _number_ **optional** </description>

适用于 <Badge type="success">分类图例</Badge> 。在配置 `cols` 后生效，指定每列显示的图例项数量，为空时表示行数不受限制。

### colPadding

<description> _number_ **optional** </description>

适用于 <Badge type="success">分类图例</Badge> 。在配置 `cols` 后生效，指定图例项之间的横向间隔。默认为 `12`。

### rowPadding

<description> _number_ **optional** </description>

适用于 <Badge type="success">分类图例</Badge> 。在配置 `cols` 后生效，指定图例项之间的纵向间隔。默认为 `8`。
