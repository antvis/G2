# 向量（Vector）

Vector 图形是将数据映射成为`箭头`的样式去可视化展示，通过控制箭头的位置、大小、颜色、角度等信息，去可视化一些向量场数据。它具备有以下视觉通道：

- `x`、`y`： 确定箭头的位置，定位锚点为箭头中心
- `color`：箭头的颜色
- `size`：箭头的长度
- `rotate`：箭头的旋转角度，起始角度为直角坐标系中的 `右边`，旋转方向为 `顺时针`

Vector 图形标记会将数据通过上述通道映射成向量数据：`[start, end]`。


![](https://gw.alipayobjects.com/zos/antfincdn/c9nPWlX5Au/vector.png)

## 开始（Get Started）

```js | table "pin: false"
data = genji.fetchJSON(
  'https://gw.alipayobjects.com/os/antfincdn/F5VcgnqRku/wind.json',
);
```

```js
(() => {
  const chart = new G2.Chart({
    width: 800,
    height: 600,
  });

  chart
    .vector()
    .data(data)
    .encode('x', 'longitude')
    .encode('y', 'latitude')
    .encode('rotate', ({ u, v }) => (Math.atan2(v, u) * 180) / Math.PI)
    .encode('size', ({ u, v }) => Math.hypot(v, u))
    .encode('color', ({ u, v }) => Math.hypot(v, u))
    .scale('color', { guide: null })
    .scale('size', { range: [6, 20] })
    .animate('enter', { type: null });

  return chart.render().node();
})();
```


## API

`Vector` 对应的 shape 图形有以下：

| shape | 描述    | 示例 |
|-------|--------|------|
| vector  | 向量图形，一般是：箭头 | ![](https://gw.alipayobjects.com/zos/antfincdn/lmyyvRSApY/a490f7fc-fcba-44f0-baaa-894f8f442c53.png)  |



## FAQ

- 怎么指定箭头头标的长度？

有两种指定箭头头标长度的方式，通过填写像素值指定为固定长度，通过指定一个百分比，可以指定参考箭头长度的相对长度。如下示例：

```ts
chart
  .vector()
  .shape('vector')
  .style({
    arrow: { size: 40 },
    // arrow: { size: '30%' },
  });
```