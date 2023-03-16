---
title: 标注
order: 9
---

**标注（Annotation）** 主要用来标注可视化图表中需要注意的地方。在 G2 中，标记也是一种标记，或者说某些标记也也可以用来做标注，比如 text，image 等标记。

## 转换

既然标注也是一种标记，那么它也可以执行转换。比如下面的 select 转换。

select 标记转换提供了从一组图形中选择图形的能力。比如在下面的例子中，标注出了每个大陆 Continent 中，GDP 最大的国家。

<img alt="select" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*qDIQQ7yR078AAAAAAAAAAAAADmJ7AQ/original" width="640px">

```js
chart.data({
  type: 'fetch',
  value:
    'https://gw.alipayobjects.com/os/bmw-prod/1ecf85d2-8279-46a1-898d-d2e1814617f9.json',
});

chart
  .point()
  .encode('x', 'GDP')
  .encode('y', 'LifeExpectancy')
  .encode('color', 'Continent');

chart
  .text()
  // 将图形按照 series 分组，也就是 Continent
  // 通过 x 通道选择，选择其中最大的，也就是 GDP 最大的
  .transform({ type: 'select', channel: 'x', selector: 'max' })
  .encode('text', 'Country')
  .encode('x', 'GDP')
  .encode('y', 'LifeExpectancy')
  .encode('series', 'Continent')
  .style('textAlign', 'end');
```

对于简单的标记，只是文本，不需要分组，使用数据标签就可以，否者可以考虑上面的方式。

## 定位

对于标注来说一个问题就是定位到合适的位置，目前有三种定位方法：

- 数据驱动的定位
- 绝对定位
- 相对定位

### 数据驱动

在 G2 中可以通过 `mark.data` 去指定数据驱动的定位，比如下面的例子中希望标注每天糖和脂肪的安全摄入量，就可以如下实现。

<img alt="data" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*OOG-SKGwGWMAAAAAAAAAAAAADmJ7AQ/original" width="640px">

```js
chart
  .lineY()
  .data([50]) // 标注 50g/day 的线
  .style('stroke', '#54545')
  .label({
    text: 'Safe sugar intake 50g/day',
    position: 'right',
    style: {
      textBaseline: 'bottom',
    },
  });

chart
  .lineX()
  .data([65]) // 标注 65g/day 的线
  .style('stroke', '#54545')
  .label({
    text: 'Safe fat intake 65g/day',
    position: 'top-left',
    style: {
      textBaseline: 'bottom',
    },
  });
```

### 绝对和相对定位

除了数据驱动的定位，G2 也提供了非数据驱动的定位方式。通过 `mark.style` 去指定 x 和 y 属性，x 和 y 拥有下面两种类型。

- **百分比字符串**：内容区域的百分比。
- **数字**：像素为单位的坐标。

<img alt="relative" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*hK5OQr4Kv6YAAAAAAAAAAAAADmJ7AQ/original" width="640px">

```js
chart
  .interval()
  .transform({ type: 'stackY' })
  .data([
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ])
  .encode('y', 'sold')
  .encode('color', 'genre');

// 相对定位
chart.text().style({
  x: '50%', // 百分比
  y: '50%', // 百分比
  text: 'hello',
  textAlign: 'center',
  fontSize: 60,
  textBaseline: 'middle',
});
```

<img alt="absolute" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*QZc2Q4k-4oIAAAAAAAAAAAAADmJ7AQ/original" width="640px">

```js
// 相对定位
chart.text().style({
  x: 290, // 像素坐标
  y: 200, // 像素坐标
  text: 'hello',
  textAlign: 'center',
  fontSize: 60,
  textBaseline: 'middle',
});
```
