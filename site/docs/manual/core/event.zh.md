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

chart.data([
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
]);

chart
  .interval()
  .encode('x', 'genre')
  .encode('y', 'sold')
  .encode('color', 'genre')
  .axis({ x: { animate: false }, y: { animate: false } });

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
chart.interval().style('draggable', true).style('droppable', true);
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

### 监听特定组件元素事件

通过 className 可以精确识别用户点击的元素类型,例如监听图例项的点击事件:

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.data([
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
]);

chart
  .interval()
  .encode('x', 'genre')
  .encode('y', 'sold')
  .encode('color', 'genre');

chart.render().then(() => {
  const { canvas } = chart.getContext();
  const { document } = canvas;
  const legendItems = document.getElementsByClassName('g2-legend-item');
  const legendMarkers = document.getElementsByClassName('g2-legend-marker');
  const legendLabels = document.getElementsByClassName('g2-legend-label');
  const legendData = Array.from(legendItems).map((item) => item.__data__);

  legendLabels.forEach((label, index) => {
    const labelText = label.getAttribute('text') || label.textContent;

    label.addEventListener('click', (event) => {
      const clickedText = label.getAttribute('text') || label.textContent;
      const itemData = legendData[index];

      console.log('\n  🖱️ 图例标签被点击:');
      console.log('    - 标签文本:', clickedText);
      console.log('    - 索引:', index);
      console.log('    - 数据:', itemData);
      console.log('    - className:', label.className);

      // 模拟业务逻辑：根据点击的图例执行操作
      alert(`您点击了图例: ${clickedText}
这里可以触发自定义业务逻辑，比如:
- 跳转到详情页
- 显示更多信息
- 联动其他图表`);
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

chart.data([
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
]);

chart
  .interval()
  .encode('x', 'genre')
  .encode('y', 'sold')
  .encode('color', 'genre');

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

chart.data([
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
]);

chart
  .interval()
  .encode('x', 'genre')
  .encode('y', 'sold')
  .encode('color', 'genre');

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

chart.data([
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
]);

chart
  .interval()
  .encode('x', 'genre')
  .encode('y', 'sold')
  .encode('color', 'genre');

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

### G2 组件 className 完整列表

#### 图例组件 (Legend)

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

#### 坐标轴组件 (Axis)

| className                | 说明           |
| ------------------------ | -------------- |
| **`g2-axis-line`**       | 坐标轴主线     |
| **`g2-axis-tick`**       | 坐标轴刻度线   |
| **`g2-axis-tick-item`**  | 单个刻度线项   |
| **`g2-axis-label`**      | 坐标轴刻度标签 |
| **`g2-axis-label-item`** | 单个标签项     |
| **`g2-axis-title`**      | 坐标轴标题     |
| **`g2-axis-grid`**       | 坐标轴网格线   |

## 典型案例

详见交互-事件[示例](/examples#interaction-event)
