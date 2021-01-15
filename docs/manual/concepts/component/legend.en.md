---
title: 图例
order: 2
---

图例（legend）是图表的辅助元素，使用颜色、大小、形状区分不同的数据类型，用于图表中数据的筛选。G2 会根据设置图形属性映射以及数据的类型自动生成不同的图例，当一个变量对应了多个图形属性时，G2 会会对图例进行合并，以达到精简的目的。

- shape, color, size 这三个图形属性如果判断接收的参数是数据源的字段时，会自动生成不同的图例；
- shape 属性，会根据不同的 shape 类型生成图例；
- color 属性，会赋予不同的图例项不同的颜色来区分图形；
- size 属性，在图例上显示图形的大小。

## 图例类型

在 G2 中，根据数据的类型，目前提供了以下两种图例：

1. 分类图例

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*i4FsS4X0-G8AAAAAAAAAAABkARQnAQ" style="width: 80px;">

2. 连续图例

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*1v5vT44hdEYAAAAAAAAAAABkARQnAQ" style="width: 159px;">

## 图例组成

G2 中图例分为连续图例和分类图例两种，由于这两种图例的结构不同，所以配置项也存在差异。

### 分类图例

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*zojvQo4wpn0AAAAAAAAAAABkARQnAQ" style="width: 234px;">

marker 的形状对应使用的几何标记类型，举例来说，如果你使用了 point 这个几何标记，那么你将在图例中得到点，如果你使用了线，那么你将会得到线，如下图所示：

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*bCGoQ6dEt2sAAAAAAAAAAABkARQnAQ" style="width: 302px;">

### 连续图例

<img src="https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*Ko27SpdBNAQAAAAAAAAAAABkARQnAQ" style="width: 266px;">

图例同坐标轴一样，其内容也是由 scale 度量控制的，而渲染的细节，则是由主题控制，G2 同样开放了 `chart.legend()`  接口供用户进行个性化配置。

## 图例配置

通过 `chart.legend()`  接口对图例进行配置，具体的配置详见 [API](/zh/docs/api/general/legend)。

### 隐藏图例

```typescript
chart.legend(false); // 隐藏全部图例
chart.legend('x', false); // 只隐藏 x 维度对应的图例
```

### 更改图例位置

G2 为图例提供了 12 个显示位置，通过 `position`  属性进行配置。

```typescript
chart.legend('x', {
  position: 'bottom',
}); // 只更改 x 维度对应的图例的显示位置
```
