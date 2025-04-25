---
title: scrollbarFilter
order: 20
---

## 概述

`scrollbarFilter` 是一个默认交互，当设置了 scrollbar 组件后会自动启用。它允许用户通过滚动条来筛选和浏览数据，特别适用于大量数据的可视化场景。滚动条筛选可以应用于 x 轴和 y 轴，帮助用户聚焦于感兴趣的数据区域。

- 触发：拖动滚动条。

- 结束：释放滚动条。

- 影响：更新图表显示的数据范围。


## 使用方式

配置 `scrollbarFilter` 交互有两种方式：

第一种，通过配置 scrollbar 组件自动启用滚动条筛选交互：

```js
({
  scrollbar: {
    x: { ratio: 0.5 }, // x 轴滚动条，显示 50% 的数据
    y: { ratio: 0.3 }, // y 轴滚动条，显示 30% 的数据
  },
});
```

第二种，直接在 interaction 中配置：

```js
({
  scrollbar: {
    x: { ratio: 0.5 },
    y: { ratio: 0.3 },
  },
  interaction: {
    scrollbarFilter: true, // 启用滚动条筛选交互
  },
});
```

## 配置层级

滚动条筛选交互可以配置在 View 层级：

```js
({
  type: 'view',
  scrollbar: {
    x: { ratio: 0.5 },
    y: { ratio: 0.3 },
  },
  interaction: { scrollbarFilter: true },
});
```

## 配置项

滚动条筛选交互支持以下配置项：

| 属性 | 描述 | 类型 | 默认值 | 必选
|-----|-----|-----|-----|-----
| initDomain | 初始化的数据域范围，用于设置滚动条的初始筛选范围 | { x: [number, number], y: [number, number] } | 根据数据自动计算 | 否
| className | 滚动条的 CSS 类名，用于样式定制和DOM选择 | string | 'g2-scrollbar' | 否
| prefix | 事件前缀，用于定义触发的事件名称 | string | 'scrollbar' | 否
| hasState | 是否启用状态管理，控制滚动条筛选时的状态变化 | boolean | true | 否
| setValue | 自定义设置滚动条值的函数 | (component, values) => void | (component, values) => component.setValue(values[0]) | 否
| getInitValues | 自定义获取滚动条初始值的函数 | (scrollbar) => any | 内部默认实现 | 否


### 复杂类型说明

#### initDomain

`initDomain` 是一个对象，包含 x 和 y 两个属性，分别表示 x 轴和 y 轴的初始数据域范围。这个配置项允许您精确控制滚动条初始显示的数据范围。

```javascript
{
  initDomain: {
    x: [minX, maxX], // x 轴的数据域范围
    y: [minY, maxY], // y 轴的数据域范围
  }
}
```

例如，如果您想要 x 轴初始显示从第二个数据点到第五个数据点的范围：

```js
({
  interaction: {
    scrollbarFilter: {
      initDomain: {
        x: [1, 4], // 显示索引为1到4的数据点（第二到第五个）
      }
    }
  }
});
```

#### setValue

`setValue` 是一个函数，用于自定义如何设置滚动条的值。默认实现是 `(component, values) => component.setValue(values[0])`，它将第一个值设置为滚动条的当前值。

如果您需要自定义滚动条的值设置逻辑，可以提供自己的实现：

```javascript
({
  interaction: {
    scrollbarFilter: {
      setValue: (component, values) => {
        // 自定义设置值的逻辑
        component.setValue(values[0]);
        // 可以在这里添加其他操作
      }
    }
  }
});
```

#### getInitValues

`getInitValues` 是一个函数，用于获取滚动条的初始值。默认实现会检查滚动条的值是否为0，如果不是0则返回该值。

您可以自定义这个函数来控制滚动条的初始位置：

```javascript
({
  interaction: {
    scrollbarFilter: {
      getInitValues: (scrollbar) => {
        // 自定义获取初始值的逻辑
        const values = scrollbar.slider.attributes.values;
        // 例如，总是从中间位置开始
        return [values.length / 2];
      }
    }
  }
});
```

### scrollbar 组件配置

除了 scrollbarFilter 交互的配置外，scrollbar 组件本身也有一些重要的配置项，这些配置会影响滚动条筛选的行为：

| 属性 | 描述 | 类型 | 默认值 | 必选
|-----|-----|-----|-----|-----
| ratio | 显示数据的比例，值范围 [0, 1] | number | 1 | 否
| style | 滚动条的样式配置 | ScrollbarStyle | - | 否
| animate | 是否启用动画 | boolean | true | 否

具体文档看[滚动条Scrollbar](https://g2.antv.antgroup.com/manual/component/scrollbar)


## 事件

### 监听事件

滚动条筛选交互支持以下事件：

- `scrollbarX:filter` - 当 x 轴滚动条筛选时触发
- `scrollbarY:filter` - 当 y 轴滚动条筛选时触发


```typescript
chart.on('scrollbarX:filter', (event) => {
  const { data, nativeEvent } = event;
  if (nativeEvent) console.log('scrollbarX:filter', data.selection);
});

chart.on('scrollbarY:filter', (event) => {
  const { data, nativeEvent } = event;
  if (nativeEvent) console.log('scrollbarY:filter', data.selection);
});
```

### 触发交互

可以通过以下方式手动触发滚动条筛选交互：

- `scrollbarX:filter` - 触发 x 轴滚动条筛选
- `scrollbarY:filter` - 触发 y 轴滚动条筛选


```typescript
chart.emit('scrollbarX:filter', {
  data: { selection: [['2001-03'], undefined] },
});

chart.emit('scrollbarY:filter', {
  data: { selection: [undefined, [50, 550]] },
});
```

## 示例

### 基础滚动条筛选
下面的示例展示了如何在柱状图上添加基础的 X 轴滚动条筛选功能：
```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: "interval",
    autoFit: true,
    height: 300,
    data: {
      type: "fetch",
      value:
        "https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv",
    },
    encode: { x: "letter", y: "frequency", y1: 0.000001 },
    scale: { y: { type: "log" } },
    scrollbar: { x: true }, // 启用 X 轴滚动条
  });

  chart.render();

  return chart.getContainer();
})();
```

### 监听滚动条值变化
这个示例展示了如何监听滚动条的 valuechange 事件，获取滚动条滑动前后的值：
```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: "interval",
    autoFit: true,
    height: 300,
    data: {
      type: "fetch",
      value:
        "https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv",
    },
    encode: { x: "letter", y: "frequency", y1: 0.000001 },
    scale: { y: { type: "log" } },
    scrollbar: { x: true },
  });

  // render 渲染图表之后
  chart.on('afterrender', () => {
    const { canvas } = chart.getContext();
    const { document } = canvas;
    document.querySelector('.g2-scrollbar').addEventListener('valuechange', (evt) => {
      console.log('滑动更新前对应数据:', evt.detail.oldValue); 
      console.log('更新后对应数据:', evt.detail.value);
    });
  });

  chart.render();

  return chart.getContainer();
})();
```

### 自定义初始数据域范围
这个示例展示了如何设置滚动条的初始数据域范围，使图表初始显示指定的数据区间：
```js | ob
(() => {
  const chart = new G2.Chart();

  // 准备月份数据
  const data = [
    { month: '1月', value: 3 },
    { month: '2月', value: 4 },
    { month: '3月', value: 3.5 },
    { month: '4月', value: 5 },
    { month: '5月', value: 4.9 },
    { month: '6月', value: 6 },
    { month: '7月', value: 7 },
    { month: '8月', value: 9 },
    { month: '9月', value: 13 },
    { month: '10月', value: 11 },
    { month: '11月', value: 8 },
    { month: '12月', value: 10 }
  ];

  chart.options({
    type: 'line',
    autoFit: true,
    height: 300,
    data: data,
    encode: { x: 'month', y: 'value' },
    scrollbar: {
      x: { ratio: 0.5 } // 显示50%的数据
    }
  });

  chart.render();

  // 在图表渲染后手动设置滚动条位置
  chart.on('afterrender', () => {
    // 手动触发滚动条筛选，显示4月到9月的数据
    chart.emit('scrollbarX:filter', {
      data: { selection: [['4月'], ['9月']] }
    });
    
    console.log('已设置初始数据域范围，显示4月到9月的数据');
  });

  return chart.getContainer();
})();
```
