---
title: 标题（Title）
order: 7
---

G2 中**标题（Title）** 用于指定图表的标题。用于一句话概要说明图表要展示的数据，图表的标题是比较常用的组件，支持标题和副标题，以及他们的样式和位置设置。

## 配置方式

标题可以在 Mark 层级配置：

```js
// Functional API
// 第一种方式
chart.interval().title({
  title: 'hello',
  subtitle: 'world',
});
```

```js
// Spec API
// 第二种方式
({
  type: 'interval',
  title: {
    title: 'hello',
    subtitle: 'world',
  },
});
```

标题也可以在 View 层级配置：

```js
// Functional API
// 第一种方式
chart.title({ title: 'hello', subtitle: 'world' });
```

```js
// Spec API
// 第二种方式
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
      size: 28,
      title: "我是一个标题 I'am a title",
      subtitle: "我是一个副标题 I'am a subtitle",
      align: 'center',
      spacing: 4,

      //标题
      titleFontSize: 28,
      titleFontFamily: 'sans-serif',
      titleFontWeight: 600,
      titleFill: '#fff',
      titleFillOpacity: 1,
      titleStroke: '#000',
      titleLineWidth: 2,
      titleStrokeOpacity: 1,

      //副标题
      subtitleFontSize: 16,
      subtitleFontFamily: 'Arial',
      subtitleFontWeight: 300,
      subtitleFill: '#2989FF',
      subtitleFillOpacity: 1,
      subtitleStroke: '#000',
      subtitleLineWidth: 1,
      subtitleStrokeOpacity: 0.5,
    },
  });

  chart.render();

  return chart.getContainer();
})();
```

标题 title 的设置，最简单的设置方式，就是直接指定一个字符串作为标题，这个时候使用默认的样式和位置。当然也可以使用完整的配置项去做一些灵活的自定义。

## 选项

| 属性                  | 描述                         | 类型                          | 默认值 |
| --------------------- | ---------------------------- | ----------------------------- | ------ |
| size                  | 标题的高度                   | `number`                      | `36`   |
| title                 | 标题文本                     | `string`                      | -      |
| subtitle              | 副标题文本                   | `string`                      | -      |
| align                 | 标题的对齐方式               | `left` \| `center` \| `right` | `left` |
| spacing               | 主标题、副标题之间的上下间距 | `number`                      | `2`    |
| titleFontSize         | 标题文字大小                 | `number`                      | -      |
| titleFontFamily       | 标题文字字体                 | `string`                      | -      |
| titleFontWeight       | 标题字体粗细                 | `number`                      | -      |
| titleFill             | 标题字体颜色                 | `string`                      |
| titleFillOpacity      | 标题字体颜色透明度           | `number`                      |
| titleStroke           | 标题字体描边颜色             | `string`                      | -      |
| titleLineWidth        | 标题字体描边宽度            | `number`                      | -      |
| titleStrokeOpacity    | 标题字体描边颜色透明度       | `number`                      | -      |
| subtitleFontSize      | 副标题文字大小               | `number`                      | -      |
| subtitleFontFamily    | 副标题文字字体               | `string`                      | -      |
| subtitleFontWeight    | 副标题字体粗细               | `number`                      | -      |
| subtitleFill          | 副标题字体颜色               | `string`                      |
| subtitleFillOpacity   | 副标题字体颜色透明度         | `number`                      |
| subtitleStroke        | 副标题字体描边颜色           | `string`                      | -      |
| subtitleLineWidth     | 副标题字体描边宽度           | `number`                      | -      |
| subtitleStrokeOpacity | 副标题字体描边颜色透明度     | `number`                      | -      |
