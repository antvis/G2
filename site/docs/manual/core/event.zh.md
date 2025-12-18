---
title: 事件处理（Event）
order: 17
---

G2 对外暴露了一些事件，用于获取图表的生命周期，以及交互信息。G2 导出了一个 `ChartEvent` 类型，用于定义事件的类型。

<img alt="click event" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*z61ZQ5DM5IUAAAAAAAAAAAAADmJ7AQ/original" width="800" />

```js
import { Chart, ChartEvent } from '@antv/g2';

const chart = new Chart({
  container,
  canvas,
});

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
  axis: {
    x: { animate: false },
    y: { animate: false },
  },
});

chart.on('interval:click', (e) => {
  console.log(e.data.data); // 展示点击的数据
});

chart.on('element:click', (e) => {
  console.log(e.data.data); // 展示点击的数据
});

chart.render();
```

## 生命周期事件

如果想要获取图表的生命周期信息，可以通过下面的方式：

```js
chart.on(ChartEvent.AFTER_RENDER, (ev) => {
  console.log(ev);
});
```

G2 目前提供了以下生命周期事件：

| 事件名                          | 说明           |
| ------------------------------- | -------------- |
| `ChartEvent.`BEFORE_RENDER      | 渲染前         |
| `ChartEvent.`BEFORE_PAINT       | 绘制前         |
| `ChartEvent.`AFTER_PAINT        | 绘制后         |
| `ChartEvent.`AFTER_RENDER       | 渲染后         |
| `ChartEvent.`BEFORE_CHANGE_DATA | 更改数据前     |
| `ChartEvent.`AFTER_CHANGE_DATA  | 更改数据后     |
| `ChartEvent.`BEFORE_CLEAR       | 清理画布前     |
| `ChartEvent.`AFTER_CLEAR        | 清理画布后     |
| `ChartEvent.`BEFORE_DESTROY     | 销毁画布前     |
| `ChartEvent.`AFTER_DESTROY      | 销毁画布后     |
| `ChartEvent.`BEFORE_CHANGE_SIZE | 更改画布尺寸前 |
| `ChartEvent.`AFTER_CHANGE_SIZE  | 更改画布尺寸后 |

- **渲染前**：指 G2 着手开始处理数据，进行布局，绘制图形等操作。
- **绘制前**： 指完成数据处理，布局，绘制图形等操作，但是还没有进行绘制。
- **绘制后**： 指 G2 完成所有的绘制操作，但可能存在动画，动画结束后，图表才算真正的渲染完成。
- **渲染后**： 指 G2 完成所有的绘制操作，包括动画。
- **清理画布后**： 容器中的图表已经被清理，但是 G2 实例还存在，可以继续使用。
- **销毁画布后**： G2 实例已经被销毁，无法再使用。

## 交互事件

如果你想要获取图表的交互信息，可以通过下面的方式：

- 监听全局 `element` 事件

```js
chart.on(`element:${ChartEvent.EventType}`, (ev) => {
  console.log(ev);
});
```

- 监听指定 `element` 事件

```js
chart.on(`${markType}:${ChartEvent.EventType}`, (ev) => {
  console.log(ev);
});

// 如，监听柱状图中的柱子的点击事件
chart.on(`interval:${ChartEvent.CLICK}`, (ev) => {
  console.log(ev);
});
```

- 监听 plot 区域事件

```js
chart.on('plot:click', (event) => console.log(event));
```

- 监听全局 component 事件

```js
chart.on('component:click', (event) => console.log(event));
```

- 监听全局 label 事件

```js
chart.on('label:click', (event) => console.log(event));
```

### 点击事件

| 事件名                | 说明 | 回调参数 |
| --------------------- | ---- | -------- |
| `ChartEvent.`CLICK    | 点击 | `Event`  |
| `ChartEvent.`DBLCLICK | 双击 | `Event`  |

### 指针事件

| 事件名                         | 说明                           | 回调参数 |
| ------------------------------ | ------------------------------ | -------- |
| `ChartEvent.`POINTER_TAP       |                                | `Event`  |
| `ChartEvent.`POINTER_DOWN      | 当指针按下时                   | `Event`  |
| `ChartEvent.`POINTER_UP        | 当指针松开时                   | `Event`  |
| `ChartEvent.`POINTER_OVER      | 当指针进入目标元素时           | `Event`  |
| `ChartEvent.`POINTER_OUT       | 当指针离开目标元素时           | `Event`  |
| `ChartEvent.`POINTER_MOVE      | 当指针改变坐标时               | `Event`  |
| `ChartEvent.`POINTER_ENTER     | 当指针进入目标元素或其子元素时 | `Event`  |
| `ChartEvent.`POINTER_LEAVE     | 当指针离开目标元素或其子元素时 | `Event`  |
| `ChartEvent.`POINTER_UPOUTSIDE |                                | `Event`  |

### 拖拽事件

如果希望监听拖拽事件，需要设置 draggable 和 droppable 属性

```js
chart.options({
  type: 'interval',
  style: {
    draggable: true,
    droppable: true,
  },
});
```

| 事件名                  | 说明                         | 回调参数 |
| ----------------------- | ---------------------------- | -------- |
| `ChartEvent.`DRAG_START | 开始拖拽时                   | `Event`  |
| `ChartEvent.`DRAG       | 拖拽过程中                   | `Event`  |
| `ChartEvent.`DRAG_END   | 拖拽完成时                   | `Event`  |
| `ChartEvent.`DRAG_ENTER | 元素被拖拽进入目标元素内时   | `Event`  |
| `ChartEvent.`DRAG_LEAVE | 元素被拖拽离开目标元素时     | `Event`  |
| `ChartEvent.`DRAG_OVER  | 元素被拖拽悬停在目标元素内时 | `Event`  |
| `ChartEvent.`DROP       | 元素被放置到目标元素内时     | `Event`  |

## 通过 className 进行精细化控制

G2 为图表中的各个组件元素提供了标准化的 className，可以通过这些 className 实现更精细化的事件监听和样式控制。

:::warning{title=重要提示}
对于图例、坐标轴等组件的交互事件，**优先推荐使用 G2 提供的高级交互事件**，而不是直接操作 DOM 元素。这样可以获得更稳定、语义更清晰的事件处理机制。相关交互文档：[图例筛选](/manual/core/interaction/legend-filter)、[图例高亮](/manual/core/interaction/legend-highlight)。
:::

### 组件事件监听的推荐方式

对于图例、坐标轴等组件，推荐使用以下方式监听事件：

**方式一：使用高级交互事件（推荐 ⭐⭐⭐⭐⭐）**

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
});

chart.render();

// 推荐：使用高级交互事件
chart.on('legend:filter', (e) => {
  const { nativeEvent, data } = e;
  if (!nativeEvent) return; // 过滤程序触发的事件

  console.log('✅ 图例筛选事件:', data);
  console.log('   - 通道:', data.channel);
  console.log('   - 当前选中值:', data.values);
});

chart.on('legend:reset', (e) => {
  const { nativeEvent } = e;
  if (!nativeEvent) return;
  console.log('✅ 图例重置（全选）');
});
```

**方式二：监听具体子元素事件（适用于简单的自定义交互）**

如果需要自定义交互逻辑，可以监听组件的子元素事件：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
});

chart.render();

// 监听图例标签和标记的点击
const handleLegendClick = (event, source) => {
  // 方式1: 通过父容器获取完整数据(推荐)
  const item = event.target.parentNode.parentNode; // marker/label -> group -> item
  if (item && item.__data__) {
    // 向上查找真正的图例组件 (className 包含 'legend-category')
    let legend = item.parentNode;
    while (legend && !legend.className.includes('legend-category')) {
      legend = legend.parentNode;
      if (!legend) return;
    }

    if (legend && legend.attributes && legend.attributes.data) {
      const { data } = legend.attributes;
      const { index } = item.__data__;
      const itemData = data[index];
      console.log(`✅ 点击了 ${source}:`, itemData); // {id, label, color}
      console.log(`   - ID: ${itemData.id}`);
      console.log(`   - 标签: ${itemData.label}`);
      console.log(`   - 颜色: ${itemData.color}`);
    }
  }

  // 方式2: 从 target.attributes 获取部分信息
  if (source === 'label') {
    console.log('   - 文本:', event.target.attributes.text);
  } else if (source === 'marker') {
    console.log('   - 颜色:', event.target.attributes.fill);
  }
};

chart.on('g2-legend-marker:click', (e) => handleLegendClick(e, 'marker'));
chart.on('g2-legend-label:click', (e) => handleLegendClick(e, 'label'));
```

**方式三:直接操作 Canvas DOM（最灵活，适用于完全定制化的场景）**

仅在需要完全自定义行为时使用：

```js
chart.on('afterrender', () => {
  const { canvas } = chart.getContext();
  const { document } = canvas;
  const items = document.getElementsByClassName('g2-legend-item');

  items.forEach((item) => {
    // 利用事件冒泡:点击子元素会冒泡到容器
    item.addEventListener('click', () => {
      // 向上查找真正的图例组件
      let legend = item.parentNode;
      while (legend && !legend.className.includes('legend-category')) {
        legend = legend.parentNode;
        if (!legend) return;
      }

      if (legend && legend.attributes && legend.attributes.data) {
        const { data } = legend.attributes;
        const { index } = item.__data__;
        const itemData = data[index]; // {id, label, color}
        console.log('图例项数据:', itemData);
      }
    });
  });
});
```

### 过滤特定组件事件

使用 className 可以方便地过滤掉某些组件的事件,避免干扰:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
});

chart.render();

// 监听绘图区点击,但排除图例点击
chart.on('plot:click', (event) => {
  const className = event.target?.className || '';

  // 检查是否点击了图例
  const isLegendClick = className.includes('legend');

  if (isLegendClick) {
    console.log('图例被点击,忽略 plot:click 事件');
    return;
  }

  // 处理绘图区的点击逻辑
  console.log('绘图区被点击', event);
});
```

### 通过 className 控制元素样式

可以通过 className 获取特定元素并动态修改其样式:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
});

chart.render().then(() => {
  const { canvas } = chart.getContext();
  const { document } = canvas;
  const legendItems = document.getElementsByClassName('g2-legend-item');

  // 修改第一个图例项的样式
  if (legendItems.length > 0) {
    const firstItem = legendItems[0];
    const firstMarker = firstItem.getElementsByClassName('g2-legend-marker')[0];
    const firstLabel = firstItem.getElementsByClassName('g2-legend-label')[0];

    // 添加高亮样式
    if (firstLabel) {
      firstLabel.style.fontWeight = 'bold';
      firstLabel.style.fill = 'orange';
      firstLabel.style.shadowColor = '#d3d3d3';
      firstLabel.style.shadowBlur = 10;
      firstLabel.style.shadowOffsetX = 5;
      firstLabel.style.shadowOffsetY = 5;
    }
  }
});
```

### 根据内容查找特定元素

结合 className 和元素属性,可以精确定位到特定的图表元素:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: {
    x: 'genre',
    y: 'sold',
    color: 'genre',
  },
});

chart.render().then(() => {
  const { canvas } = chart.getContext();
  const { document } = canvas;
  const legendItems = document.getElementsByClassName('g2-legend-item');
  const targetText = 'Action';
  let targetItem = null;

  // 遍历所有图例标签,找到目标文本
  for (let i = 0; i < legendItems.length; i++) {
    const labels = legendItems[i].getElementsByClassName('g2-legend-label');
    if (labels.length > 0) {
      const labelText = labels[0].getAttribute('text') || labels[0].textContent;
      if (labelText === targetText) {
        targetItem = legendItems[i];
        break;
      }
    }
  }

  if (targetItem) {
    console.log(`✅ 找到目标图例: "${targetText}"`);
    console.log('   className:', targetItem.className);
    console.log('   可以执行业务逻辑: 例如自动聚焦、高亮显示等');

    // 为目标图例项添加背景色和特殊样式

    console.log(`🎨 为图例 "${targetText}" 添加特殊样式...`);

    // 获取图例项的背景元素
    const background = targetItem.getElementsByClassName(
      'g2-legend-background',
    )[0];
    const label = targetItem.getElementsByClassName('g2-legend-label')[0];
    const marker = targetItem.getElementsByClassName('g2-legend-marker')[0];

    // 修改背景色
    if (background) {
      background.style.fill = '#FFF3E0'; // 浅橙色背景
      background.style.fillOpacity = 0.8;
    }

    // 同时修改标签样式
    if (label) {
      label.style.fill = '#FF6B00'; // 橙色文字
      label.style.fontWeight = 'bold';
    }
  }
});
```

## G2 组件 className 完整列表

### 图例组件 (Legend)

| className                     | 说明                   |
| ----------------------------- | ---------------------- |
| **`g2-legend-title`**         | 图例的标题             |
| **`g2-legend-item`**          | 分类图例项的容器       |
| **`g2-legend-background`**    | 分类图例项的背景       |
| **`g2-legend-marker`**        | 分类图例项的图标       |
| **`g2-legend-label`**         | 分类图例项的标签文字   |
| **`g2-legend-value`**         | 分类图例项的值         |
| **`g2-legend-focus-icon`**    | 分类图例项的聚焦图标   |
| **`g2-legend-ribbon`**        | 连续图例的色带         |
| **`g2-legend-track`**         | 连续图例的滑轨         |
| **`g2-legend-selection`**     | 连续图例的选区         |
| **`g2-legend-handle`**        | 连续图例的滑动手柄     |
| **`g2-legend-handle-marker`** | 连续图例的滑动手柄图标 |
| **`g2-legend-handle-label`**  | 连续图例的标签/刻度值  |

### 坐标轴组件 (Axis)

| className                | 说明           |
| ------------------------ | -------------- |
| **`g2-axis-line`**       | 坐标轴主线     |
| **`g2-axis-tick`**       | 坐标轴刻度线   |
| **`g2-axis-tick-item`**  | 单个刻度线项   |
| **`g2-axis-label`**      | 坐标轴刻度标签 |
| **`g2-axis-label-item`** | 单个标签项     |
| **`g2-axis-title`**      | 坐标轴标题     |
| **`g2-axis-grid`**       | 坐标轴网格线   |

### 为什么容器元素的点击事件不生效？

像 `g2-legend-item`、`g2-axis` 这类组件的最外层元素通常是**容器元素**，背景透明，本身没有可点击的渲染区域。实际的点击事件由其子元素触发，然后通过事件冒泡机制传递到容器。

**图例组件示例：**

- ✅ `g2-legend-marker:click` - 点击标记图标
- ✅ `g2-legend-label:click` - 点击标签文字
- ❌ `g2-legend-item:click` - 容器本身无点击区域

**坐标轴组件示例：**

- ✅ `g2-axis-label:click` - 点击坐标轴标签
- ✅ `g2-axis-title:click` - 点击坐标轴标题
- ✅ `g2-axis-line:click` - 点击坐标轴线
- ❌ `g2-axis:click` - 容器本身无点击区域

**如何获取点击的图例项数据?**

子元素(marker/label)上没有直接存储完整数据,需要通过以下方式获取:

1. **通过父容器获取**(推荐):向上查找到 item 容器,通过 `item.__data__.index` + `legend.attributes.data` 获取完整数据
2. **从 attributes 获取**:label 的 `text` 属性、marker 的 `fill` 属性包含部分信息
3. **使用 DOM 监听**:直接在 item 容器上绑定事件,通过 `item.__data__` 获取数据

**示例:点击 marker 获取对应的 label**

```js
chart.on('g2-legend-marker:click', (e) =>  {
  const item = e.target.parentNode.parentNode;
  if (item && item.__data__) {
    // 向上查找真正的图例组件
    let legend = item.parentNode;
    while (legend && !legend.className.includes('legend-category')) {
      legend = legend.parentNode;
      if (!legend) return;
    }

    if (legend && legend.attributes && legend.attributes.data) {
      const { data } = legend.attributes;
      const { index } = item.__data__;
      const itemData = data[index];
      console.log('点击 marker,对应的 label 是:', itemData.label);
      console.log('完整数据:', itemData); // {id, label, color}
    }
  }
});
```

## 典型案例

详见[交互-事件示例](/examples#interaction-event)
