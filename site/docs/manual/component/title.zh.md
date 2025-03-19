---
title: 标题（Title）
order: 7
---

## 概述

G2 中**标题（Title）** 用于指定图表的标题内容，可以用于一句话展示图表的概要信息。图表的标题是比较常用的组件，分成为主标题和副标题两部分组成，均使用一个文本来展示，可以通过调整文本的样式来定制图表标题的样式。

### 使用方式

第一种，传入 `boolean` 设置是否显示图表标题，图表标题默认为隐藏状态。

```js
({
  type: 'interval',
  title: false; // 隐藏图表标题
})
```

第二种，传入 _titleOption_ 对图标表进行整体配置。

```js
({
  type: 'interval',
  title: {
    title: 'hello', // 主标题的文本新秀丽
    subtitle: 'world', // 副标题的文本新秀丽
  },
});
```

标题也可以在 View 层级配置：

```js
({
  type: 'view',
  title: {
    title: 'hello',
    subtitle: 'world',
  },
});
```

## 开始使用

```js | ob
(() => {
  const chart = new G2.Chart();

  chart.options({
    type: 'interval',
    marginTop: 40,
    data: {
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
    },
    encode: {
      x: 'letter',
      y: 'frequency',
    },
    title: {
      align: 'center', // 图表标题的对齐方式
      size: 28, // 图表标题的高度，默认为 36
      spacing: 4, // 主标题和副标题之间的间距

      // 标题
      title: "我是一个标题 I'am a title", // 图表标题的文本
      titleFontSize: 28, // 图表主标题的字体大小
      titleFontFamily: 'sans-serif', // 图表主标题的字体
      titleFontWeight: 600, // 图表主标题的字体粗细
      titleFill: '#fff', // 图表主标题的文字颜色
      titleFillOpacity: 1, // 图表主标题的文字透明度
      titleStroke: '#000', // 图表主标题的文字描边颜色
      titleLineWidth: 2, // 图表主标题的文字描边线宽
      titleStrokeOpacity: 1, // 图表主标题的文字描边透明度

      // 副标题
      subtitle: "我是一个副标题 I'am a subtitle", // 图表副标题的文本
      subtitleFontSize: 16, // 图表副标题的字体大小
      subtitleFontFamily: 'Arial', // 图表副标题的字体
      subtitleFontWeight: 300, // 图表副标题的字体粗细
      subtitleFill: '#2989FF', // 图表副标题的文字颜色
      subtitleFillOpacity: 1, // 图表副标题的文字透明度
      subtitleStroke: '#000', // 图表副标题的文字描边颜色
      subtitleLineWidth: 1, // 图表副标题的文字描边线宽
      subtitleStrokeOpacity: 0.5, // 图表副标题的文字描边透明度
    },
  });

  chart.render();

  return chart.getContainer();
})();
```

标题 title 的设置，最简单的设置方式，就是直接指定一个字符串作为标题，这个时候使用默认的样式和位置。当然也可以使用完整的配置项去做一些灵活的自定义。

## 配置项

| 属性     | 描述                             | 类型                          | 默认值                     |
| -------- | -------------------------------- | ----------------------------- | -------------------------- |
| size     | 图表标题的高度                   | `number`                      | `36`                       |
| align    | 图表标题的对齐方式               | `left` \| `center` \| `right` | `left`                     |
| spacing  | 图表主标题、副标题之间的上下间距 | `number`                      | `2`                        |
| title    | 图表标题的配置项                 | [title](#title)               | 详见 [title](#title)       |
| subtitle | 图表副标题的配置项               | [subtitle](#subtitle)         | 详见 [subtitle](#subtitle) |

### size

<description> _number_ **optional** </description>

用于配置图表标题的空间高度大小，默认为 `36px`，如果配置过小，可能导致标题和图表图形之间重叠。

### align

<description> _string_ **optional** </description>

用于配置图表标题的的左右对齐方式，默认为 `left`，可以选择使用 `left`，`center`，`right`，分别代表着居左对齐、居中对齐、居右对齐。

尝试一下：

```js | ob { pin: false }
(() => {
  const alignList = ['center', 'right', 'left'];
  const alignMap = alignList.map((p) => {
    return {
      label: p,
      value: p,
    };
  });
  const chart = new G2.Chart({
    width: 480,
    height: 160,
  });

  const data = [
    264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513,
    546, 983, 340, 539, 243, 226, 192,
  ];

  chart.options({
    data,
    type: 'interval',
    encode: {
      x: (_, idx) => idx,
      y: (d) => d,
    },
    title: {
      align: 'center',
      title: 'This is a chart title.',
      subtitle: 'Displayed are sampled values.',
    },
    axis: false,
  });
  const handleSetAlign = (align) => {
    chart.title({ align });
    chart.render(); // 重新渲染图表
  };

  const selectorContainer = document.createElement('div');
  selectorContainer.textContent = '选择标题对齐方式 ';
  const selector = document.createElement('select');
  selector.innerHTML = alignMap.map(
    (align, index) =>
      `<option value="${align.value}" ${index === 0 ? 'selected' : ''}>${
        align.label
      }</option>`,
  );
  selector.onchange = (e) => {
    handleSetAlign(e.target.value);
  };
  selectorContainer.appendChild(selector);
  const node = chart.getContainer();
  node.insertBefore(selectorContainer, node.childNodes[0]);
  chart.render();

  return node;
})();
```

### spacing

<description> _number_ **optional** </description>

用于配置图表主标题和副标题之间的间距，默认为 `2px`，合适的间距，可以让图表看起来整体更协调。

### title

图表的标题，具体来说是主标题，可以用以下的配置来定制标题的各种样式。

| 属性               | 描述                | 类型                                             | 默认值      |
| ------------------ | ------------------- | ------------------------------------------------ | ----------- |
| title              | 图表标题文字内容    | `number` \| `(datum, index, data) => number`     | -           |
| titleFontSize      | 图表标题字体大小    | `number` \| `(datum, index, data) => number`     | 14          |
| titleFontFamily    | 图表标题字体类型    | `string` \| `(datum, index, data) => string`     | sans-serif  |
| titleFontWeight    | 图表标题字体粗细    | `string` \| `(datum, index, data) => string`     | normal      |
| titleTextAlign     | 图表标题水平对齐    | `string` \| `(datum, index, data) => string`     | center      |
| titleTextBaseline  | 图表标题垂直基线    | `string` \| `(datum, index, data) => string`     | middle      |
| titleFill          | 图表标题填充颜色    | `string` \| `(datum, index, data) => string`     | #000        |
| titleFillOpacity   | 图表标题填充透明度  | `number` \| `(datum, index, data) => number`     | 1           |
| titleStroke        | 图表标题描边颜色    | `string` \| `(datum, index, data) => string`     | transparent |
| titleStrokeOpacity | 图表标题描边透明度  | `number` \| `(datum, index, data) => number`     | 1           |
| titleLineHeight    | 图表标题行高        | `number` \| `(datum, index, data) => number`     | 14          |
| titleLineWidth     | 图表标题描边宽度    | `number` \| `(datum, index, data) => number`     | 0           |
| titleLineDash      | 图表标题虚线样式    | `number[]` \| `(datum, index, data) => number[]` | []          |
| titleOpacity       | 图表标题整体透明度  | `number` \| `(datum, index, data) => number`     | 1           |
| titleShadowColor   | 图表标题阴影颜色    | `string` \| `(datum, index, data) => string`     | transparent |
| titleShadowBlur    | 图表标题阴影模糊度  | `number` \| `(datum, index, data) => number`     | 0           |
| titleShadowOffsetX | 图表标题阴影 X 偏移 | `number` \| `(datum, index, data) => number`     | 0           |
| titleShadowOffsetY | 图表标题阴影 Y 偏移 | `number` \| `(datum, index, data) => number`     | 0           |
| titleCursor        | 图表标题鼠标样式    | `string` \| `(datum, index, data) => string`     | default     |

### subtitle

图表的副标题，可以用以下的配置来定制副标题的各种样式。

| 属性                  | 描述                  | 类型                                             | 默认值      |
| --------------------- | --------------------- | ------------------------------------------------ | ----------- |
| subtitle              | 图表副标题文本        | `number` \| `(datum, index, data) => number`     | 12          |
| subtitleFontSize      | 图表副标题字体大小    | `number` \| `(datum, index, data) => number`     | 12          |
| subtitleFontFamily    | 图表副标题字体类型    | `string` \| `(datum, index, data) => string`     | sans-serif  |
| subtitleFontWeight    | 图表副标题字体粗细    | `string` \| `(datum, index, data) => string`     | normal      |
| subtitleTextAlign     | 图表副标题水平对齐    | `string` \| `(datum, index, data) => string`     | center      |
| subtitleTextBaseline  | 图表副标题垂直基线    | `string` \| `(datum, index, data) => string`     | middle      |
| subtitleFill          | 图表副标题填充颜色    | `string` \| `(datum, index, data) => string`     | #666        |
| subtitleFillOpacity   | 图表副标题填充透明度  | `number` \| `(datum, index, data) => number`     | 1           |
| subtitleStroke        | 图表副标题描边颜色    | `string` \| `(datum, index, data) => string`     | transparent |
| subtitleStrokeOpacity | 图表副标题描边透明度  | `number` \| `(datum, index, data) => number`     | 1           |
| subtitleLineHeight    | 图表副标题行高        | `number` \| `(datum, index, data) => number`     | 12          |
| subtitleLineWidth     | 图表副标题描边宽度    | `number` \| `(datum, index, data) => number`     | 0           |
| subtitleLineDash      | 图表副标题虚线样式    | `number[]` \| `(datum, index, data) => number[]` | []          |
| subtitleOpacity       | 图表副标题整体透明度  | `number` \| `(datum, index, data) => number`     | 1           |
| subtitleShadowColor   | 图表副标题阴影颜色    | `string` \| `(datum, index, data) => string`     | transparent |
| subtitleShadowBlur    | 图表副标题阴影模糊度  | `number` \| `(datum, index, data) => number`     | 0           |
| subtitleShadowOffsetX | 图表副标题阴影 X 偏移 | `number` \| `(datum, index, data) => number`     | 0           |
| subtitleShadowOffsetY | 图表副标题阴影 Y 偏移 | `number` \| `(datum, index, data) => number`     | 0           |
| subtitleCursor        | 图表副标题鼠标样式    | `string` \| `(datum, index, data) => string`     | default     |

尝试一下：

<Playground path="component/title/demo/title-style.ts" rid="title-style"></playground>
