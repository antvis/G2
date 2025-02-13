---
title: 颜色映射（Color）
order: 18
---

颜色在可视化中起着非常重要的作用。它可以帮助我们更好地理解数据、突出显示关键信息、增强视觉吸引力和提高可读性。在可视化中颜色通常具有以下作用：

- **区分数据类别**：区分不同的数据类别。例如，在柱状图中，我们可以使用不同的颜色表示不同的产品类别，以便更容易地识别和比较它们。
- **表示数据的数量**：表示数据的数量。例如，在热力图中，我们可以使用颜色的深浅来表示数据的大小，深色表示较大的值，浅色表示较小的值。
- **突出显示关键信息**：突出显示关键信息。例如，在折线图中，我们可以使用鲜艳的颜色表示关注的数据点，以便更容易地找到它们。
- **增强视觉吸引力**：使可视化更具吸引力。使用鲜艳的颜色和有趣的配色方案可以让可视化更加生动和有趣。
- **提高可读性**：提高可视化的可读性。例如，在地图上，我们可以使用不同的颜色表示不同的地理区域，以便更容易地识别和理解它们。

设置数据无关的颜色，通过 `mark.style(fill, color)` 或者 `mark.style(stroke, color)` 即可，如果希望设置数据驱动的颜色，可以使用以下方式来设置颜色：

- 编码：`mark.encode`
- 样式：`mark.style`

## 编码

通过 `mark.encode` 去设置数据驱动的颜色是最常见的方式，同时通过颜色比例尺去配置最后的视觉展示。

- `scale.identity`：恒等映射
- `scale.range`：自定义色板
- `scale.palette`：内置的色板
- `scale.relations`：自定义映射关系

### Identity

当设置颜色比例尺为恒等比例尺（Identity）的时候，color 通道的数据会被作为视觉数据绘制到最后的可视化中，但是不会去生成比例尺。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data([
      { genre: 'Sports', sold: 275, color: 'red' },
      { genre: 'Strategy', sold: 115, color: 'blue' },
      { genre: 'Action', sold: 120, color: 'green' },
      { genre: 'Shooter', sold: 350, color: 'red' },
      { genre: 'Other', sold: 150, color: 'black' },
    ])
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'color')
    .scale('color', { type: 'identity' }); // 设置该比例尺为恒等映射

  chart.render();

  return chart.getContainer();
})();
```

### Range

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
    })
    .encode('x', 'letter')
    .encode('y', 'frequency')
    .encode('color', 'letter')
    .axis('y', { labelFormatter: '.0%' })
    .scale('color', {
      type: 'ordinal',
      range: ['#7593ed', '#95e3b0', '#6c7893', '#e7c450', '#7460eb'],
    });

  chart.render();

  return chart.getContainer();
})();
```

### Palette

G2 中可以通过设置 `scale.palette` 去指定色板。这个色板可以是离散的：

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
    })
    .encode('x', 'letter')
    .encode('y', 'frequency')
    .encode('color', 'letter')
    .axis('y', { labelFormatter: '.0%' })
    .scale('color', { palette: 'tableau10' });

  chart.render();

  return chart.getContainer();
})();
```

同时也可以是连续的：

```js | ob
(() => {
  const chart = new G2.Chart({
    height: 320,
  });

  chart
    .cell()
    .data({
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/seattle-weather.json',
    })
    .transform({ type: 'group', color: 'max' })
    .encode('x', (d) => new Date(d.date).getUTCDate())
    .encode('y', (d) => new Date(d.date).getUTCMonth())
    .encode('color', 'temp_max')
    .scale('color', { palette: 'rainbow' });

  chart.render();

  return chart.getContainer();
})();
```

#### 内置色板

G2 提供了一些内置的色板，可以直接使用，并支持 [d3-scale-chromatic](https://github.com/d3/d3-scale-chromatic)的色板。

**离散色板**

##### accent

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#7fc97f"></div><div style="background:#beaed4"></div><div style="background:#fdc086"></div><div style="background:#ffff99"></div><div style="background:#386cb0"></div><div style="background:#f0027f"></div><div style="background:#bf5b17"></div><div style="background:#666666"></div></div>

##### blues

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#f7fbff"></div><div style="background:#deebf7"></div><div style="background:#c6dbef"></div><div style="background:#9ecae1"></div><div style="background:#6baed6"></div><div style="background:#4292c6"></div><div style="background:#2171b5"></div><div style="background:#08519c"></div><div style="background:#08306b"></div></div>

##### brBG

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#543005"></div><div style="background:#8c510a"></div><div style="background:#bf812d"></div><div style="background:#dfc27d"></div><div style="background:#f6e8c3"></div><div style="background:#f5f5f5"></div><div style="background:#c7eae5"></div><div style="background:#80cdc1"></div><div style="background:#35978f"></div><div style="background:#01665e"></div><div style="background:#003c30"></div></div>

##### buGn

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#f7fcfd"></div><div style="background:#e5f5f9"></div><div style="background:#ccece6"></div><div style="background:#99d8c9"></div><div style="background:#66c2a4"></div><div style="background:#41ae76"></div><div style="background:#238b45"></div><div style="background:#006d2c"></div><div style="background:#00441b"></div></div>

##### buPu

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#f7fcfd"></div><div style="background:#e0ecf4"></div><div style="background:#bfd3e6"></div><div style="background:#9ebcda"></div><div style="background:#8c96c6"></div><div style="background:#8c6bb1"></div><div style="background:#88419d"></div><div style="background:#810f7c"></div><div style="background:#4d004b"></div></div>

##### category10

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#1f77b4"></div><div style="background:#ff7f0e"></div><div style="background:#2ca02c"></div><div style="background:#d62728"></div><div style="background:#9467bd"></div><div style="background:#8c564b"></div><div style="background:#e377c2"></div><div style="background:#7f7f7f"></div><div style="background:#bcbd22"></div><div style="background:#17becf"></div></div>

##### dark2

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#1b9e77"></div><div style="background:#d95f02"></div><div style="background:#7570b3"></div><div style="background:#e7298a"></div><div style="background:#66a61e"></div><div style="background:#e6ab02"></div><div style="background:#a6761d"></div><div style="background:#666666"></div></div>

##### gnBu

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#f7fcf0"></div><div style="background:#e0f3db"></div><div style="background:#ccebc5"></div><div style="background:#a8ddb5"></div><div style="background:#7bccc4"></div><div style="background:#4eb3d3"></div><div style="background:#2b8cbe"></div><div style="background:#0868ac"></div><div style="background:#084081"></div></div>

##### greens

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#f7fcf5"></div><div style="background:#e5f5e0"></div><div style="background:#c7e9c0"></div><div style="background:#a1d99b"></div><div style="background:#74c476"></div><div style="background:#41ab5d"></div><div style="background:#238b45"></div><div style="background:#006d2c"></div><div style="background:#00441b"></div></div>

##### greys

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#ffffff"></div><div style="background:#f0f0f0"></div><div style="background:#d9d9d9"></div><div style="background:#bdbdbd"></div><div style="background:#969696"></div><div style="background:#737373"></div><div style="background:#525252"></div><div style="background:#252525"></div><div style="background:#000000"></div></div>

##### oranges

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#fff5eb"></div><div style="background:#fee6ce"></div><div style="background:#fdd0a2"></div><div style="background:#fdae6b"></div><div style="background:#fd8d3c"></div><div style="background:#f16913"></div><div style="background:#d94801"></div><div style="background:#a63603"></div><div style="background:#7f2704"></div></div>

##### orRd

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#fff7ec"></div><div style="background:#fee8c8"></div><div style="background:#fdd49e"></div><div style="background:#fdbb84"></div><div style="background:#fc8d59"></div><div style="background:#ef6548"></div><div style="background:#d7301f"></div><div style="background:#b30000"></div><div style="background:#7f0000"></div></div>

##### paired

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#a6cee3"></div><div style="background:#1f78b4"></div><div style="background:#b2df8a"></div><div style="background:#33a02c"></div><div style="background:#fb9a99"></div><div style="background:#e31a1c"></div><div style="background:#fdbf6f"></div><div style="background:#ff7f00"></div><div style="background:#cab2d6"></div><div style="background:#6a3d9a"></div><div style="background:#ffff99"></div><div style="background:#b15928"></div></div>

##### pastel1

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#fbb4ae"></div><div style="background:#b3cde3"></div><div style="background:#ccebc5"></div><div style="background:#decbe4"></div><div style="background:#fed9a6"></div><div style="background:#ffffcc"></div><div style="background:#e5d8bd"></div><div style="background:#fddaec"></div><div style="background:#f2f2f2"></div></div>

##### pastel2

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#b3e2cd"></div><div style="background:#fdcdac"></div><div style="background:#cbd5e8"></div><div style="background:#f4cae4"></div><div style="background:#e6f5c9"></div><div style="background:#fff2ae"></div><div style="background:#f1e2cc"></div><div style="background:#cccccc"></div></div>

##### piYG

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#8e0152"></div><div style="background:#c51b7d"></div><div style="background:#de77ae"></div><div style="background:#f1b6da"></div><div style="background:#fde0ef"></div><div style="background:#f7f7f7"></div><div style="background:#e6f5d0"></div><div style="background:#b8e186"></div><div style="background:#7fbc41"></div><div style="background:#4d9221"></div><div style="background:#276419"></div></div>

##### pRGn

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#40004b"></div><div style="background:#762a83"></div><div style="background:#9970ab"></div><div style="background:#c2a5cf"></div><div style="background:#e7d4e8"></div><div style="background:#f7f7f7"></div><div style="background:#d9f0d3"></div><div style="background:#a6dba0"></div><div style="background:#5aae61"></div><div style="background:#1b7837"></div><div style="background:#00441b"></div></div>

##### puBu

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#fff7fb"></div><div style="background:#ece7f2"></div><div style="background:#d0d1e6"></div><div style="background:#a6bddb"></div><div style="background:#74a9cf"></div><div style="background:#3690c0"></div><div style="background:#0570b0"></div><div style="background:#045a8d"></div><div style="background:#023858"></div></div>

##### puBuGn

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#fff7fb"></div><div style="background:#ece2f0"></div><div style="background:#d0d1e6"></div><div style="background:#a6bddb"></div><div style="background:#67a9cf"></div><div style="background:#3690c0"></div><div style="background:#02818a"></div><div style="background:#016c59"></div><div style="background:#014636"></div></div>

##### puOr

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#2d004b"></div><div style="background:#542788"></div><div style="background:#8073ac"></div><div style="background:#b2abd2"></div><div style="background:#d8daeb"></div><div style="background:#f7f7f7"></div><div style="background:#fee0b6"></div><div style="background:#fdb863"></div><div style="background:#e08214"></div><div style="background:#b35806"></div><div style="background:#7f3b08"></div></div>

##### puRd

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#f7f4f9"></div><div style="background:#e7e1ef"></div><div style="background:#d4b9da"></div><div style="background:#c994c7"></div><div style="background:#df65b0"></div><div style="background:#e7298a"></div><div style="background:#ce1256"></div><div style="background:#980043"></div><div style="background:#67001f"></div></div>

##### purples

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#fcfbfd"></div><div style="background:#efedf5"></div><div style="background:#dadaeb"></div><div style="background:#bcbddc"></div><div style="background:#9e9ac8"></div><div style="background:#807dba"></div><div style="background:#6a51a3"></div><div style="background:#54278f"></div><div style="background:#3f007d"></div></div>

##### rdBu

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#67001f"></div><div style="background:#b2182b"></div><div style="background:#d6604d"></div><div style="background:#f4a582"></div><div style="background:#fddbc7"></div><div style="background:#f7f7f7"></div><div style="background:#d1e5f0"></div><div style="background:#92c5de"></div><div style="background:#4393c3"></div><div style="background:#2166ac"></div><div style="background:#053061"></div></div>

##### rdGy

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#67001f"></div><div style="background:#b2182b"></div><div style="background:#d6604d"></div><div style="background:#f4a582"></div><div style="background:#fddbc7"></div><div style="background:#ffffff"></div><div style="background:#e0e0e0"></div><div style="background:#bababa"></div><div style="background:#878787"></div><div style="background:#4d4d4d"></div><div style="background:#1a1a1a"></div></div>

##### rdPu

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#fff7f3"></div><div style="background:#fde0dd"></div><div style="background:#fcc5c0"></div><div style="background:#fa9fb5"></div><div style="background:#f768a1"></div><div style="background:#dd3497"></div><div style="background:#ae017e"></div><div style="background:#7a0177"></div><div style="background:#49006a"></div></div>

##### rdYlBu

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#a50026"></div><div style="background:#d73027"></div><div style="background:#f46d43"></div><div style="background:#fdae61"></div><div style="background:#fee090"></div><div style="background:#ffffbf"></div><div style="background:#e0f3f8"></div><div style="background:#abd9e9"></div><div style="background:#74add1"></div><div style="background:#4575b4"></div><div style="background:#313695"></div></div>

##### rdYlGn

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#a50026"></div><div style="background:#d73027"></div><div style="background:#f46d43"></div><div style="background:#fdae61"></div><div style="background:#fee08b"></div><div style="background:#ffffbf"></div><div style="background:#d9ef8b"></div><div style="background:#a6d96a"></div><div style="background:#66bd63"></div><div style="background:#1a9850"></div><div style="background:#006837"></div></div>

##### reds

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#fff5f0"></div><div style="background:#fee0d2"></div><div style="background:#fcbba1"></div><div style="background:#fc9272"></div><div style="background:#fb6a4a"></div><div style="background:#ef3b2c"></div><div style="background:#cb181d"></div><div style="background:#a50f15"></div><div style="background:#67000d"></div></div>

##### set1

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#e41a1c"></div><div style="background:#377eb8"></div><div style="background:#4daf4a"></div><div style="background:#984ea3"></div><div style="background:#ff7f00"></div><div style="background:#ffff33"></div><div style="background:#a65628"></div><div style="background:#f781bf"></div><div style="background:#999999"></div></div>

##### set2

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#66c2a5"></div><div style="background:#fc8d62"></div><div style="background:#8da0cb"></div><div style="background:#e78ac3"></div><div style="background:#a6d854"></div><div style="background:#ffd92f"></div><div style="background:#e5c494"></div><div style="background:#b3b3b3"></div></div>

##### set3

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#8dd3c7"></div><div style="background:#ffffb3"></div><div style="background:#bebada"></div><div style="background:#fb8072"></div><div style="background:#80b1d3"></div><div style="background:#fdb462"></div><div style="background:#b3de69"></div><div style="background:#fccde5"></div><div style="background:#d9d9d9"></div><div style="background:#bc80bd"></div><div style="background:#ccebc5"></div><div style="background:#ffed6f"></div></div>

##### spectral

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#9e0142"></div><div style="background:#d53e4f"></div><div style="background:#f46d43"></div><div style="background:#fdae61"></div><div style="background:#fee08b"></div><div style="background:#ffffbf"></div><div style="background:#e6f598"></div><div style="background:#abdda4"></div><div style="background:#66c2a5"></div><div style="background:#3288bd"></div><div style="background:#5e4fa2"></div></div>

##### tableau10

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#4e79a7"></div><div style="background:#f28e2c"></div><div style="background:#e15759"></div><div style="background:#76b7b2"></div><div style="background:#59a14f"></div><div style="background:#edc949"></div><div style="background:#af7aa1"></div><div style="background:#ff9da7"></div><div style="background:#9c755f"></div><div style="background:#bab0ab"></div></div>

##### ylGn

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#ffffe5"></div><div style="background:#f7fcb9"></div><div style="background:#d9f0a3"></div><div style="background:#addd8e"></div><div style="background:#78c679"></div><div style="background:#41ab5d"></div><div style="background:#238443"></div><div style="background:#006837"></div><div style="background:#004529"></div></div>

##### ylGnBu

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#ffffd9"></div><div style="background:#edf8b1"></div><div style="background:#c7e9b4"></div><div style="background:#7fcdbb"></div><div style="background:#41b6c4"></div><div style="background:#1d91c0"></div><div style="background:#225ea8"></div><div style="background:#253494"></div><div style="background:#081d58"></div></div>

##### ylOrBr

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#ffffe5"></div><div style="background:#fff7bc"></div><div style="background:#fee391"></div><div style="background:#fec44f"></div><div style="background:#fe9929"></div><div style="background:#ec7014"></div><div style="background:#cc4c02"></div><div style="background:#993404"></div><div style="background:#662506"></div></div>

##### ylOrRd

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:#ffffcc"></div><div style="background:#ffeda0"></div><div style="background:#fed976"></div><div style="background:#feb24c"></div><div style="background:#fd8d3c"></div><div style="background:#fc4e2a"></div><div style="background:#e31a1c"></div><div style="background:#bd0026"></div><div style="background:#800026"></div></div>

**连续色板**

##### blues

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,rgb(247, 251, 255) 0%,rgb(236, 244, 252) 5.2631578947368425%,rgb(226, 238, 248) 10.526315789473685%,rgb(216, 231, 245) 15.789473684210526%,rgb(205, 224, 241) 21.05263157894737%,rgb(192, 217, 237) 26.31578947368421%,rgb(176, 210, 232) 31.57894736842105%,rgb(159, 201, 226) 36.8421052631579%,rgb(139, 191, 221) 42.10526315789474%,rgb(119, 180, 216) 47.36842105263158%,rgb(99, 168, 210) 52.63157894736842%,rgb(82, 156, 204) 57.89473684210526%,rgb(65, 144, 197) 63.1578947368421%,rgb(51, 130, 190) 68.42105263157895%,rgb(37, 117, 182) 73.6842105263158%,rgb(26, 103, 173) 78.94736842105263%,rgb(16, 89, 161) 84.21052631578948%,rgb(10, 76, 146) 89.47368421052632%,rgb(8, 62, 127) 94.73684210526316%,rgb(8, 48, 107) 100%)"></div></div>

##### brBG

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,rgb(84, 48, 5) 0%,rgb(113, 66, 8) 5.2631578947368425%,rgb(142, 86, 16) 10.526315789473685%,rgb(169, 110, 32) 15.789473684210526%,rgb(192, 138, 59) 21.05263157894737%,rgb(211, 169, 95) 26.31578947368421%,rgb(226, 197, 135) 31.57894736842105%,rgb(237, 219, 172) 36.8421052631579%,rgb(244, 233, 204) 42.10526315789474%,rgb(242, 240, 227) 47.36842105263158%,rgb(230, 240, 236) 52.63157894736842%,rgb(207, 235, 231) 57.89473684210526%,rgb(175, 224, 216) 63.1578947368421%,rgb(139, 207, 197) 68.42105263157895%,rgb(100, 184, 174) 73.6842105263158%,rgb(64, 157, 148) 78.94736842105263%,rgb(32, 131, 122) 84.21052631578948%,rgb(11, 106, 97) 89.47368421052632%,rgb(2, 82, 72) 94.73684210526316%,rgb(0, 60, 48) 100%)"></div></div>

##### buGn

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,rgb(247, 252, 253) 0%,rgb(239, 249, 251) 5.2631578947368425%,rgb(231, 246, 248) 10.526315789473685%,rgb(222, 242, 243) 15.789473684210526%,rgb(210, 238, 235) 21.05263157894737%,rgb(196, 233, 226) 26.31578947368421%,rgb(177, 225, 214) 31.57894736842105%,rgb(156, 217, 201) 36.8421052631579%,rgb(134, 208, 187) 42.10526315789474%,rgb(114, 199, 171) 47.36842105263158%,rgb(95, 190, 154) 52.63157894736842%,rgb(79, 181, 135) 57.89473684210526%,rgb(64, 170, 115) 63.1578947368421%,rgb(51, 157, 95) 68.42105263157895%,rgb(38, 143, 77) 73.6842105263158%,rgb(24, 130, 62) 78.94736842105263%,rgb(12, 116, 51) 84.21052631578948%,rgb(3, 101, 42) 89.47368421052632%,rgb(0, 85, 34) 94.73684210526316%,rgb(0, 68, 27) 100%)"></div></div>

##### buPu

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,rgb(247, 252, 253) 0%,rgb(237, 245, 249) 5.2631578947368425%,rgb(227, 238, 245) 10.526315789473685%,rgb(215, 229, 240) 15.789473684210526%,rgb(201, 219, 235) 21.05263157894737%,rgb(188, 209, 229) 26.31578947368421%,rgb(174, 199, 224) 31.57894736842105%,rgb(162, 187, 217) 36.8421052631579%,rgb(152, 173, 210) 42.10526315789474%,rgb(145, 158, 202) 47.36842105263158%,rgb(141, 141, 193) 52.63157894736842%,rgb(140, 123, 185) 57.89473684210526%,rgb(139, 105, 176) 63.1578947368421%,rgb(138, 87, 167) 68.42105263157895%,rgb(136, 68, 158) 73.6842105263158%,rgb(133, 49, 146) 78.94736842105263%,rgb(128, 30, 132) 84.21052631578948%,rgb(116, 16, 115) 89.47368421052632%,rgb(98, 7, 95) 94.73684210526316%,rgb(77, 0, 75) 100%)"></div></div>

##### cividis

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,rgb(0, 32, 81) 0%,rgb(0, 42, 98) 5.2631578947368425%,rgb(11, 51, 107) 10.526315789473685%,rgb(28, 60, 110) 15.789473684210526%,rgb(47, 70, 110) 21.05263157894737%,rgb(65, 79, 110) 26.31578947368421%,rgb(82, 89, 110) 31.57894736842105%,rgb(97, 99, 111) 36.8421052631579%,rgb(110, 109, 113) 42.10526315789474%,rgb(122, 119, 115) 47.36842105263158%,rgb(133, 129, 118) 52.63157894736842%,rgb(144, 139, 120) 57.89473684210526%,rgb(155, 150, 120) 63.1578947368421%,rgb(169, 161, 119) 68.42105263157895%,rgb(183, 172, 114) 73.6842105263158%,rgb(199, 183, 107) 78.94736842105263%,rgb(216, 195, 98) 84.21052631578948%,rgb(232, 208, 87) 89.47368421052632%,rgb(246, 221, 77) 94.73684210526316%,rgb(253, 234, 69) 100%)"></div></div>

##### cool

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,rgb(110, 64, 170) 0%,rgb(104, 74, 187) 5.2631578947368425%,rgb(95, 86, 201) 10.526315789473685%,rgb(85, 99, 213) 15.789473684210526%,rgb(74, 113, 221) 21.05263157894737%,rgb(62, 129, 225) 26.31578947368421%,rgb(51, 145, 225) 31.57894736842105%,rgb(41, 161, 221) 36.8421052631579%,rgb(32, 177, 212) 42.10526315789474%,rgb(27, 192, 201) 47.36842105263158%,rgb(25, 206, 186) 52.63157894736842%,rgb(27, 218, 170) 57.89473684210526%,rgb(34, 229, 153) 63.1578947368421%,rgb(44, 237, 135) 68.42105263157895%,rgb(59, 242, 119) 73.6842105263158%,rgb(78, 246, 105) 78.94736842105263%,rgb(100, 247, 95) 84.21052631578948%,rgb(124, 246, 88) 89.47368421052632%,rgb(150, 243, 87) 94.73684210526316%,rgb(175, 240, 91) 100%)"></div></div>

##### cubehelixDefault

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,rgb(0, 0, 0) 0%,rgb(19, 9, 24) 5.2631578947368425%,rgb(26, 23, 50) 10.526315789473685%,rgb(25, 42, 71) 15.789473684210526%,rgb(21, 65, 78) 21.05263157894737%,rgb(23, 88, 74) 26.31578947368421%,rgb(36, 107, 61) 31.57894736842105%,rgb(63, 118, 50) 36.8421052631579%,rgb(100, 122, 48) 42.10526315789474%,rgb(141, 122, 60) 47.36842105263158%,rgb(177, 121, 89) 52.63157894736842%,rgb(202, 123, 129) 57.89473684210526%,rgb(212, 133, 172) 63.1578947368421%,rgb(210, 150, 209) 68.42105263157895%,rgb(201, 173, 233) 73.6842105263158%,rgb(194, 197, 243) 78.94736842105263%,rgb(195, 219, 242) 84.21052631578948%,rgb(208, 236, 239) 89.47368421052632%,rgb(230, 247, 241) 94.73684210526316%,rgb(255, 255, 255) 100%)"></div></div>

##### gnBu

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,rgb(247, 252, 240) 0%,rgb(237, 248, 231) 5.2631578947368425%,rgb(228, 245, 222) 10.526315789473685%,rgb(219, 241, 213) 15.789473684210526%,rgb(209, 237, 204) 21.05263157894737%,rgb(198, 233, 196) 26.31578947368421%,rgb(185, 227, 189) 31.57894736842105%,rgb(169, 221, 186) 36.8421052631579%,rgb(151, 215, 188) 42.10526315789474%,rgb(132, 207, 193) 47.36842105263158%,rgb(114, 198, 199) 52.63157894736842%,rgb(95, 188, 204) 57.89473684210526%,rgb(78, 175, 205) 63.1578947368421%,rgb(62, 160, 200) 68.42105263157895%,rgb(47, 144, 193) 73.6842105263158%,rgb(32, 129, 184) 78.94736842105263%,rgb(20, 113, 175) 84.21052631578948%,rgb(11, 97, 163) 89.47368421052632%,rgb(8, 81, 147) 94.73684210526316%,rgb(8, 64, 129) 100%)"></div></div>

##### greens

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,rgb(247, 252, 245) 0%,rgb(239, 249, 236) 5.2631578947368425%,rgb(231, 246, 226) 10.526315789473685%,rgb(220, 241, 215) 15.789473684210526%,rgb(208, 237, 202) 21.05263157894737%,rgb(194, 231, 188) 26.31578947368421%,rgb(179, 224, 172) 31.57894736842105%,rgb(162, 217, 157) 36.8421052631579%,rgb(144, 209, 141) 42.10526315789474%,rgb(125, 200, 127) 47.36842105263158%,rgb(105, 190, 114) 52.63157894736842%,rgb(85, 180, 102) 57.89473684210526%,rgb(66, 168, 92) 63.1578947368421%,rgb(51, 156, 82) 68.42105263157895%,rgb(38, 143, 71) 73.6842105263158%,rgb(24, 130, 61) 78.94736842105263%,rgb(12, 116, 51) 84.21052631578948%,rgb(3, 101, 42) 89.47368421052632%,rgb(0, 85, 34) 94.73684210526316%,rgb(0, 68, 27) 100%)"></div></div>

##### greys

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,rgb(255, 255, 255) 0%,rgb(249, 249, 249) 5.2631578947368425%,rgb(242, 242, 242) 10.526315789473685%,rgb(233, 233, 233) 15.789473684210526%,rgb(224, 224, 224) 21.05263157894737%,rgb(213, 213, 213) 26.31578947368421%,rgb(202, 202, 202) 31.57894736842105%,rgb(189, 189, 189) 36.8421052631579%,rgb(174, 174, 174) 42.10526315789474%,rgb(159, 159, 159) 47.36842105263158%,rgb(143, 143, 143) 52.63157894736842%,rgb(128, 128, 128) 57.89473684210526%,rgb(114, 114, 114) 63.1578947368421%,rgb(99, 99, 99) 68.42105263157895%,rgb(84, 84, 84) 73.6842105263158%,rgb(67, 67, 67) 78.94736842105263%,rgb(49, 49, 49) 84.21052631578948%,rgb(32, 32, 32) 89.47368421052632%,rgb(16, 16, 16) 94.73684210526316%,rgb(0, 0, 0) 100%)"></div></div>

##### inferno

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,#000004 0%,#08051d 5.2631578947368425%,#180c3c 10.526315789473685%,#2f0a5b 15.789473684210526%,#450a69 21.05263157894737%,#5c126e 26.31578947368421%,#71196e 31.57894736842105%,#87216b 36.8421052631579%,#9b2964 42.10526315789474%,#b1325a 47.36842105263158%,#c43c4e 52.63157894736842%,#d74b3f 57.89473684210526%,#e55c30 63.1578947368421%,#f1711f 68.42105263157895%,#f8870e 73.6842105263158%,#fca108 78.94736842105263%,#fbba1f 84.21052631578948%,#f6d543 89.47368421052632%,#f1ed71 94.73684210526316%,#fcffa4 100%)"></div></div>

##### magma

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,#000004 0%,#07061c 5.2631578947368425%,#150e38 10.526315789473685%,#29115a 15.789473684210526%,#3f0f72 21.05263157894737%,#56147d 26.31578947368421%,#6a1c81 31.57894736842105%,#802582 36.8421052631579%,#942c80 42.10526315789474%,#ab337c 47.36842105263158%,#c03a76 52.63157894736842%,#d6456c 57.89473684210526%,#e85362 63.1578947368421%,#f4695c 68.42105263157895%,#fa815f 73.6842105263158%,#fd9b6b 78.94736842105263%,#feb47b 84.21052631578948%,#fecd90 89.47368421052632%,#fde5a7 94.73684210526316%,#fcfdbf 100%)"></div></div>

##### oranges

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,rgb(255, 245, 235) 0%,rgb(255, 239, 223) 5.2631578947368425%,rgb(254, 232, 209) 10.526315789473685%,rgb(254, 224, 193) 15.789473684210526%,rgb(253, 214, 175) 21.05263157894737%,rgb(253, 203, 155) 26.31578947368421%,rgb(253, 190, 133) 31.57894736842105%,rgb(253, 176, 111) 36.8421052631579%,rgb(253, 162, 90) 42.10526315789474%,rgb(252, 148, 70) 47.36842105263158%,rgb(249, 133, 52) 52.63157894736842%,rgb(245, 118, 35) 57.89473684210526%,rgb(238, 104, 21) 63.1578947368421%,rgb(229, 90, 11) 68.42105263157895%,rgb(216, 77, 5) 73.6842105263158%,rgb(200, 67, 3) 78.94736842105263%,rgb(180, 59, 2) 84.21052631578948%,rgb(161, 52, 3) 89.47368421052632%,rgb(144, 45, 4) 94.73684210526316%,rgb(127, 39, 4) 100%)"></div></div>

##### orRd

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,rgb(255, 247, 236) 0%,rgb(255, 241, 221) 5.2631578947368425%,rgb(254, 234, 205) 10.526315789473685%,rgb(254, 226, 189) 15.789473684210526%,rgb(253, 218, 172) 21.05263157894737%,rgb(253, 209, 157) 26.31578947368421%,rgb(253, 198, 144) 31.57894736842105%,rgb(253, 185, 131) 36.8421052631579%,rgb(252, 169, 116) 42.10526315789474%,rgb(251, 151, 100) 47.36842105263158%,rgb(248, 133, 88) 52.63157894736842%,rgb(243, 115, 77) 57.89473684210526%,rgb(236, 96, 66) 63.1578947368421%,rgb(227, 76, 52) 68.42105263157895%,rgb(216, 54, 37) 73.6842105263158%,rgb(203, 33, 22) 78.94736842105263%,rgb(187, 16, 10) 84.21052631578948%,rgb(169, 5, 3) 89.47368421052632%,rgb(149, 1, 0) 94.73684210526316%,rgb(127, 0, 0) 100%)"></div></div>

##### piYG

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,rgb(142, 1, 82) 0%,rgb(170, 16, 105) 5.2631578947368425%,rgb(194, 41, 128) 10.526315789473685%,rgb(211, 80, 153) 15.789473684210526%,rgb(223, 122, 178) 21.05263157894737%,rgb(234, 158, 201) 26.31578947368421%,rgb(242, 187, 219) 31.57894736842105%,rgb(248, 210, 232) 36.8421052631579%,rgb(250, 227, 240) 42.10526315789474%,rgb(248, 239, 242) 47.36842105263158%,rgb(242, 245, 233) 52.63157894736842%,rgb(231, 244, 213) 57.89473684210526%,rgb(214, 238, 183) 63.1578947368421%,rgb(190, 226, 146) 68.42105263157895%,rgb(163, 211, 109) 73.6842105263158%,rgb(134, 191, 77) 78.94736842105263%,rgb(106, 170, 53) 84.21052631578948%,rgb(81, 148, 38) 89.47368421052632%,rgb(59, 124, 30) 94.73684210526316%,rgb(39, 100, 25) 100%)"></div></div>

##### plasma

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,#0d0887 0%,#2c0594 5.2631578947368425%,#43039e 10.526315789473685%,#5901a5 15.789473684210526%,#6e00a8 21.05263157894737%,#8305a7 26.31578947368421%,#9511a1 31.57894736842105%,#a72197 36.8421052631579%,#b6308b 42.10526315789474%,#c5407e 47.36842105263158%,#d14e72 52.63157894736842%,#dd5e66 57.89473684210526%,#e76e5b 63.1578947368421%,#f07f4f 68.42105263157895%,#f79044 73.6842105263158%,#fca338 78.94736842105263%,#feb72d 84.21052631578948%,#fccd25 89.47368421052632%,#f7e225 94.73684210526316%,#f0f921 100%)"></div></div>

##### pRGn

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,rgb(64, 0, 75) 0%,rgb(92, 23, 104) 5.2631578947368425%,rgb(117, 50, 131) 10.526315789473685%,rgb(138, 82, 154) 15.789473684210526%,rgb(158, 116, 174) 21.05263157894737%,rgb(179, 145, 193) 26.31578947368421%,rgb(199, 172, 210) 31.57894736842105%,rgb(218, 196, 224) 36.8421052631579%,rgb(233, 218, 234) 42.10526315789474%,rgb(240, 235, 240) 47.36842105263158%,rgb(236, 242, 234) 52.63157894736842%,rgb(222, 240, 217) 57.89473684210526%,rgb(200, 232, 194) 63.1578947368421%,rgb(172, 220, 167) 68.42105263157895%,rgb(137, 201, 136) 73.6842105263158%,rgb(100, 178, 106) 78.94736842105263%,rgb(64, 151, 80) 84.21052631578948%,rgb(35, 123, 59) 89.47368421052632%,rgb(15, 95, 42) 94.73684210526316%,rgb(0, 68, 27) 100%)"></div></div>

##### puBu

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,rgb(255, 247, 251) 0%,rgb(247, 240, 247) 5.2631578947368425%,rgb(238, 233, 243) 10.526315789473685%,rgb(228, 225, 239) 15.789473684210526%,rgb(216, 216, 234) 21.05263157894737%,rgb(202, 207, 229) 26.31578947368421%,rgb(185, 199, 224) 31.57894736842105%,rgb(167, 190, 219) 36.8421052631579%,rgb(147, 182, 215) 42.10526315789474%,rgb(126, 173, 209) 47.36842105263158%,rgb(102, 163, 204) 52.63157894736842%,rgb(77, 153, 197) 57.89473684210526%,rgb(53, 141, 191) 63.1578947368421%,rgb(32, 129, 184) 68.42105263157895%,rgb(16, 117, 175) 73.6842105263158%,rgb(7, 106, 164) 78.94736842105263%,rgb(4, 95, 149) 84.21052631578948%,rgb(4, 83, 131) 89.47368421052632%,rgb(3, 70, 110) 94.73684210526316%,rgb(2, 56, 88) 100%)"></div></div>

##### puBuGn

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,rgb(255, 247, 251) 0%,rgb(247, 238, 246) 5.2631578947368425%,rgb(238, 230, 242) 10.526315789473685%,rgb(228, 222, 237) 15.789473684210526%,rgb(216, 214, 233) 21.05263157894737%,rgb(202, 207, 229) 26.31578947368421%,rgb(185, 198, 224) 31.57894736842105%,rgb(165, 190, 219) 36.8421052631579%,rgb(142, 182, 215) 42.10526315789474%,rgb(117, 173, 209) 47.36842105263158%,rgb(94, 163, 204) 52.63157894736842%,rgb(72, 154, 196) 57.89473684210526%,rgb(51, 145, 184) 63.1578947368421%,rgb(30, 137, 166) 68.42105263157895%,rgb(14, 130, 144) 73.6842105263158%,rgb(4, 122, 123) 78.94736842105263%,rgb(1, 112, 103) 84.21052631578948%,rgb(1, 100, 85) 89.47368421052632%,rgb(1, 86, 69) 94.73684210526316%,rgb(1, 70, 54) 100%)"></div></div>

##### puOr

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,rgb(45, 0, 75) 0%,rgb(66, 21, 106) 5.2631578947368425%,rgb(87, 48, 134) 10.526315789473685%,rgb(110, 83, 157) 15.789473684210526%,rgb(134, 119, 176) 21.05263157894737%,rgb(159, 150, 195) 26.31578947368421%,rgb(183, 178, 213) 31.57894736842105%,rgb(204, 202, 226) 36.8421052631579%,rgb(222, 223, 236) 42.10526315789474%,rgb(237, 236, 239) 47.36842105263158%,rgb(247, 237, 225) 52.63157894736842%,rgb(252, 227, 194) 57.89473684210526%,rgb(253, 210, 155) 63.1578947368421%,rgb(250, 189, 112) 68.42105263157895%,rgb(241, 164, 71) 73.6842105263158%,rgb(225, 137, 36) 78.94736842105263%,rgb(204, 113, 16) 84.21052631578948%,rgb(180, 92, 9) 89.47368421052632%,rgb(154, 75, 7) 94.73684210526316%,rgb(127, 59, 8) 100%)"></div></div>

##### puRd

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,rgb(247, 244, 249) 0%,rgb(240, 236, 245) 5.2631578947368425%,rgb(233, 226, 239) 10.526315789473685%,rgb(226, 213, 233) 15.789473684210526%,rgb(218, 198, 225) 21.05263157894737%,rgb(212, 181, 216) 26.31578947368421%,rgb(207, 165, 208) 31.57894736842105%,rgb(206, 149, 199) 36.8421052631579%,rgb(210, 130, 190) 42.10526315789474%,rgb(217, 110, 180) 47.36842105263158%,rgb(223, 87, 167) 52.63157894736842%,rgb(227, 65, 151) 57.89473684210526%,rgb(225, 45, 133) 63.1578947368421%,rgb(218, 31, 114) 68.42105263157895%,rgb(205, 21, 95) 73.6842105263158%,rgb(187, 13, 82) 78.94736842105263%,rgb(166, 6, 71) 84.21052631578948%,rgb(145, 2, 60) 89.47368421052632%,rgb(124, 0, 46) 94.73684210526316%,rgb(103, 0, 31) 100%)"></div></div>

##### purples

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,rgb(252, 251, 253) 0%,rgb(246, 245, 250) 5.2631578947368425%,rgb(240, 239, 246) 10.526315789473685%,rgb(233, 232, 242) 15.789473684210526%,rgb(224, 223, 238) 21.05263157894737%,rgb(214, 214, 233) 26.31578947368421%,rgb(202, 202, 227) 31.57894736842105%,rgb(190, 190, 220) 36.8421052631579%,rgb(177, 176, 212) 42.10526315789474%,rgb(164, 162, 205) 47.36842105263158%,rgb(152, 148, 198) 52.63157894736842%,rgb(139, 135, 191) 57.89473684210526%,rgb(128, 121, 184) 63.1578947368421%,rgb(118, 104, 175) 68.42105263157895%,rgb(108, 86, 166) 73.6842105263158%,rgb(99, 68, 157) 78.94736842105263%,rgb(90, 50, 148) 84.21052631578948%,rgb(81, 33, 140) 89.47368421052632%,rgb(72, 16, 133) 94.73684210526316%,rgb(63, 0, 125) 100%)"></div></div>

##### rainbow

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,rgb(110, 64, 170) 0%,rgb(152, 61, 179) 5.2631578947368425%,rgb(195, 61, 173) 10.526315789473685%,rgb(233, 66, 154) 15.789473684210526%,rgb(255, 79, 124) 21.05263157894737%,rgb(255, 100, 91) 26.31578947368421%,rgb(255, 129, 63) 31.57894736842105%,rgb(242, 162, 47) 36.8421052631579%,rgb(214, 197, 50) 42.10526315789474%,rgb(186, 227, 73) 47.36842105263158%,rgb(150, 243, 87) 52.63157894736842%,rgb(100, 247, 95) 57.89473684210526%,rgb(59, 242, 119) 63.1578947368421%,rgb(34, 229, 153) 68.42105263157895%,rgb(25, 206, 186) 73.6842105263158%,rgb(32, 177, 212) 78.94736842105263%,rgb(51, 145, 225) 84.21052631578948%,rgb(74, 113, 221) 89.47368421052632%,rgb(95, 86, 201) 94.73684210526316%,rgb(110, 64, 170) 100%)"></div></div>

##### rdBu

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,rgb(103, 0, 31) 0%,rgb(142, 14, 38) 5.2631578947368425%,rgb(174, 35, 48) 10.526315789473685%,rgb(198, 66, 64) 15.789473684210526%,rgb(216, 103, 85) 21.05263157894737%,rgb(232, 139, 111) 26.31578947368421%,rgb(243, 172, 142) 31.57894736842105%,rgb(249, 200, 176) 36.8421052631579%,rgb(250, 223, 207) 42.10526315789474%,rgb(246, 236, 231) 47.36842105263158%,rgb(235, 239, 241) 52.63157894736842%,rgb(215, 232, 240) 57.89473684210526%,rgb(188, 218, 234) 63.1578947368421%,rgb(154, 200, 224) 68.42105263157895%,rgb(117, 178, 212) 73.6842105263158%,rgb(81, 153, 198) 78.94736842105263%,rgb(54, 128, 185) 84.21052631578948%,rgb(36, 103, 166) 89.47368421052632%,rgb(20, 76, 135) 94.73684210526316%,rgb(5, 48, 97) 100%)"></div></div>

##### rdGy

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,rgb(103, 0, 31) 0%,rgb(142, 14, 38) 5.2631578947368425%,rgb(174, 35, 48) 10.526315789473685%,rgb(198, 66, 64) 15.789473684210526%,rgb(216, 103, 85) 21.05263157894737%,rgb(232, 139, 111) 26.31578947368421%,rgb(243, 172, 142) 31.57894736842105%,rgb(250, 201, 177) 36.8421052631579%,rgb(253, 225, 210) 42.10526315789474%,rgb(252, 241, 234) 47.36842105263158%,rgb(245, 242, 241) 52.63157894736842%,rgb(230, 230, 230) 57.89473684210526%,rgb(212, 212, 212) 63.1578947368421%,rgb(191, 191, 191) 68.42105263157895%,rgb(167, 167, 167) 73.6842105263158%,rgb(140, 140, 140) 78.94736842105263%,rgb(110, 110, 110) 84.21052631578948%,rgb(81, 81, 81) 89.47368421052632%,rgb(53, 53, 53) 94.73684210526316%,rgb(26, 26, 26) 100%)"></div></div>

##### rdPu

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,rgb(255, 247, 243) 0%,rgb(254, 237, 234) 5.2631578947368425%,rgb(253, 227, 224) 10.526315789473685%,rgb(253, 217, 213) 15.789473684210526%,rgb(252, 205, 202) 21.05263157894737%,rgb(252, 192, 193) 26.31578947368421%,rgb(251, 176, 186) 31.57894736842105%,rgb(250, 159, 180) 36.8421052631579%,rgb(249, 138, 173) 42.10526315789474%,rgb(246, 116, 166) 47.36842105263158%,rgb(240, 93, 160) 52.63157894736842%,rgb(230, 71, 154) 57.89473684210526%,rgb(216, 49, 148) 63.1578947368421%,rgb(198, 29, 139) 68.42105263157895%,rgb(178, 12, 131) 73.6842105263158%,rgb(157, 4, 125) 78.94736842105263%,rgb(136, 1, 120) 84.21052631578948%,rgb(115, 1, 116) 89.47368421052632%,rgb(94, 0, 111) 94.73684210526316%,rgb(73, 0, 106) 100%)"></div></div>

##### rdYlBu

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,rgb(165, 0, 38) 0%,rgb(191, 26, 39) 5.2631578947368425%,rgb(214, 53, 44) 10.526315789473685%,rgb(231, 84, 56) 15.789473684210526%,rgb(243, 116, 70) 21.05263157894737%,rgb(249, 149, 87) 26.31578947368421%,rgb(252, 180, 106) 31.57894736842105%,rgb(254, 207, 129) 36.8421052631579%,rgb(254, 229, 154) 42.10526315789474%,rgb(253, 244, 179) 47.36842105263158%,rgb(245, 249, 206) 52.63157894736842%,rgb(229, 244, 230) 57.89473684210526%,rgb(206, 234, 239) 63.1578947368421%,rgb(179, 219, 234) 68.42105263157895%,rgb(151, 200, 224) 73.6842105263158%,rgb(123, 176, 211) 78.94736842105263%,rgb(97, 149, 197) 84.21052631578948%,rgb(75, 119, 181) 89.47368421052632%,rgb(60, 87, 165) 94.73684210526316%,rgb(49, 54, 149) 100%)"></div></div>

##### rdYlGn

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,rgb(165, 0, 38) 0%,rgb(191, 26, 39) 5.2631578947368425%,rgb(214, 53, 44) 10.526315789473685%,rgb(231, 84, 56) 15.789473684210526%,rgb(243, 116, 70) 21.05263157894737%,rgb(249, 149, 86) 26.31578947368421%,rgb(252, 180, 105) 31.57894736842105%,rgb(254, 207, 126) 36.8421052631579%,rgb(254, 229, 151) 42.10526315789474%,rgb(252, 244, 170) 47.36842105263158%,rgb(242, 248, 170) 52.63157894736842%,rgb(224, 242, 151) 57.89473684210526%,rgb(200, 232, 130) 63.1578947368421%,rgb(173, 220, 114) 68.42105263157895%,rgb(142, 206, 104) 73.6842105263158%,rgb(107, 191, 98) 78.94736842105263%,rgb(70, 173, 91) 84.21052631578948%,rgb(37, 152, 80) 89.47368421052632%,rgb(15, 129, 68) 94.73684210526316%,rgb(0, 104, 55) 100%)"></div></div>

##### reds

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,rgb(255, 245, 240) 0%,rgb(255, 236, 227) 5.2631578947368425%,rgb(254, 226, 213) 10.526315789473685%,rgb(253, 213, 196) 15.789473684210526%,rgb(253, 198, 176) 21.05263157894737%,rgb(252, 182, 156) 26.31578947368421%,rgb(252, 165, 136) 31.57894736842105%,rgb(252, 148, 117) 36.8421052631579%,rgb(251, 131, 100) 42.10526315789474%,rgb(250, 114, 83) 47.36842105263158%,rgb(248, 96, 69) 52.63157894736842%,rgb(242, 77, 56) 57.89473684210526%,rgb(234, 59, 45) 63.1578947368421%,rgb(221, 43, 37) 68.42105263157895%,rgb(207, 31, 31) 73.6842105263158%,rgb(191, 23, 27) 78.94736842105263%,rgb(173, 17, 23) 84.21052631578948%,rgb(153, 12, 20) 89.47368421052632%,rgb(129, 6, 16) 94.73684210526316%,rgb(103, 0, 13) 100%)"></div></div>

##### sinebow

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,rgb(255, 64, 64) 0%,rgb(248, 103, 31) 5.2631578947368425%,rgb(228, 145, 9) 10.526315789473685%,rgb(197, 185, 0) 15.789473684210526%,rgb(159, 219, 5) 21.05263157894737%,rgb(117, 243, 23) 26.31578947368421%,rgb(76, 254, 52) 31.57894736842105%,rgb(41, 252, 89) 36.8421052631579%,rgb(15, 236, 131) 42.10526315789474%,rgb(2, 209, 172) 47.36842105263158%,rgb(2, 172, 209) 52.63157894736842%,rgb(15, 131, 236) 57.89473684210526%,rgb(41, 89, 252) 63.1578947368421%,rgb(76, 52, 254) 68.42105263157895%,rgb(117, 23, 243) 73.6842105263158%,rgb(159, 5, 219) 78.94736842105263%,rgb(197, 0, 185) 84.21052631578948%,rgb(228, 9, 145) 89.47368421052632%,rgb(248, 31, 103) 94.73684210526316%,rgb(255, 64, 64) 100%)"></div></div>

##### spectral

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,rgb(158, 1, 66) 0%,rgb(186, 33, 72) 5.2631578947368425%,rgb(211, 62, 75) 10.526315789473685%,rgb(230, 90, 73) 15.789473684210526%,rgb(242, 118, 75) 21.05263157894737%,rgb(249, 150, 87) 26.31578947368421%,rgb(252, 180, 105) 31.57894736842105%,rgb(254, 207, 126) 36.8421052631579%,rgb(254, 229, 151) 42.10526315789474%,rgb(253, 244, 171) 47.36842105263158%,rgb(247, 250, 175) 52.63157894736842%,rgb(232, 246, 164) 57.89473684210526%,rgb(210, 237, 158) 63.1578947368421%,rgb(179, 224, 161) 68.42105263157895%,rgb(145, 211, 164) 73.6842105263158%,rgb(111, 193, 168) 78.94736842105263%,rgb(82, 169, 175) 84.21052631578948%,rgb(66, 139, 181) 89.47368421052632%,rgb(73, 109, 175) 94.73684210526316%,rgb(94, 79, 162) 100%)"></div></div>

##### turbo

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,rgb(35, 23, 27) 0%,rgb(71, 56, 158) 5.2631578947368425%,rgb(73, 92, 225) 10.526315789473685%,rgb(59, 129, 248) 15.789473684210526%,rgb(44, 164, 242) 21.05263157894737%,rgb(37, 196, 218) 26.31578947368421%,rgb(42, 222, 186) 31.57894736842105%,rgb(60, 241, 151) 36.8421052631579%,rgb(90, 251, 119) 42.10526315789474%,rgb(128, 253, 92) 47.36842105263158%,rgb(169, 246, 71) 52.63157894736842%,rgb(208, 230, 55) 57.89473684210526%,rgb(240, 205, 44) 63.1578947368421%,rgb(255, 175, 37) 68.42105263157895%,rgb(255, 139, 31) 73.6842105263158%,rgb(250, 102, 25) 78.94736842105263%,rgb(224, 66, 18) 84.21052631578948%,rgb(190, 36, 9) 89.47368421052632%,rgb(158, 16, 1) 94.73684210526316%,rgb(144, 12, 0) 100%)"></div></div>

##### viridis

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,#440154 0%,#481467 5.2631578947368425%,#482576 10.526315789473685%,#453781 15.789473684210526%,#404688 21.05263157894737%,#39558c 26.31578947368421%,#33638d 31.57894736842105%,#2d718e 36.8421052631579%,#287d8e 42.10526315789474%,#238a8d 47.36842105263158%,#1f968b 52.63157894736842%,#20a386 57.89473684210526%,#29af7f 63.1578947368421%,#3dbc74 68.42105263157895%,#56c667 73.6842105263158%,#75d054 78.94736842105263%,#95d840 84.21052631578948%,#bade28 89.47368421052632%,#dde318 94.73684210526316%,#fde725 100%)"></div></div>

##### warm

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,rgb(110, 64, 170) 0%,rgb(131, 62, 176) 5.2631578947368425%,rgb(152, 61, 179) 10.526315789473685%,rgb(174, 60, 178) 15.789473684210526%,rgb(195, 61, 173) 21.05263157894737%,rgb(215, 62, 165) 26.31578947368421%,rgb(233, 66, 154) 31.57894736842105%,rgb(247, 71, 140) 36.8421052631579%,rgb(255, 79, 124) 42.10526315789474%,rgb(255, 88, 108) 47.36842105263158%,rgb(255, 100, 91) 52.63157894736842%,rgb(255, 114, 76) 57.89473684210526%,rgb(255, 129, 63) 63.1578947368421%,rgb(254, 145, 53) 68.42105263157895%,rgb(242, 162, 47) 73.6842105263158%,rgb(229, 180, 46) 78.94736842105263%,rgb(214, 197, 50) 84.21052631578948%,rgb(200, 213, 59) 89.47368421052632%,rgb(186, 227, 73) 94.73684210526316%,rgb(175, 240, 91) 100%)"></div></div>

##### ylGn

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,rgb(255, 255, 229) 0%,rgb(251, 254, 211) 5.2631578947368425%,rgb(246, 252, 194) 10.526315789473685%,rgb(238, 248, 181) 15.789473684210526%,rgb(226, 243, 170) 21.05263157894737%,rgb(211, 237, 161) 26.31578947368421%,rgb(193, 230, 152) 31.57894736842105%,rgb(174, 221, 143) 36.8421052631579%,rgb(153, 212, 134) 42.10526315789474%,rgb(131, 203, 125) 47.36842105263158%,rgb(108, 192, 115) 52.63157894736842%,rgb(86, 180, 103) 57.89473684210526%,rgb(67, 167, 92) 63.1578947368421%,rgb(51, 152, 81) 68.42105263157895%,rgb(38, 137, 71) 73.6842105263158%,rgb(24, 124, 64) 78.94736842105263%,rgb(12, 111, 58) 84.21052631578948%,rgb(3, 98, 53) 89.47368421052632%,rgb(0, 84, 47) 94.73684210526316%,rgb(0, 69, 41) 100%)"></div></div>

##### ylGnBu

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,rgb(255, 255, 217) 0%,rgb(247, 252, 201) 5.2631578947368425%,rgb(238, 248, 188) 10.526315789473685%,rgb(226, 243, 181) 15.789473684210526%,rgb(209, 237, 179) 21.05263157894737%,rgb(187, 229, 181) 26.31578947368421%,rgb(161, 218, 184) 31.57894736842105%,rgb(132, 207, 187) 36.8421052631579%,rgb(105, 197, 190) 42.10526315789474%,rgb(80, 186, 193) 47.36842105263158%,rgb(60, 173, 194) 52.63157894736842%,rgb(44, 158, 193) 57.89473684210526%,rgb(35, 140, 188) 63.1578947368421%,rgb(32, 121, 180) 68.42105263157895%,rgb(33, 100, 171) 73.6842105263158%,rgb(35, 81, 162) 78.94736842105263%,rgb(34, 64, 151) 84.21052631578948%,rgb(29, 50, 135) 89.47368421052632%,rgb(20, 39, 113) 94.73684210526316%,rgb(8, 29, 88) 100%)"></div></div>

##### ylOrBr

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,rgb(255, 255, 229) 0%,rgb(255, 251, 212) 5.2631578947368425%,rgb(255, 247, 194) 10.526315789473685%,rgb(255, 241, 176) 15.789473684210526%,rgb(254, 233, 157) 21.05263157894737%,rgb(254, 222, 135) 26.31578947368421%,rgb(254, 210, 111) 31.57894736842105%,rgb(254, 196, 86) 36.8421052631579%,rgb(254, 180, 66) 42.10526315789474%,rgb(253, 162, 50) 47.36842105263158%,rgb(249, 145, 38) 52.63157894736842%,rgb(242, 127, 28) 57.89473684210526%,rgb(232, 111, 19) 63.1578947368421%,rgb(220, 95, 12) 68.42105263157895%,rgb(205, 81, 6) 73.6842105263158%,rgb(187, 69, 4) 78.94736842105263%,rgb(166, 59, 4) 84.21052631578948%,rgb(145, 51, 4) 89.47368421052632%,rgb(123, 43, 5) 94.73684210526316%,rgb(102, 37, 6) 100%)"></div></div>

##### ylOrRd

<div style="display:flex;width:600px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,rgb(255, 255, 204) 0%,rgb(255, 247, 185) 5.2631578947368425%,rgb(255, 240, 167) 10.526315789473685%,rgb(255, 232, 149) 15.789473684210526%,rgb(254, 222, 131) 21.05263157894737%,rgb(254, 211, 114) 26.31578947368421%,rgb(254, 196, 97) 31.57894736842105%,rgb(254, 180, 82) 36.8421052631579%,rgb(254, 164, 71) 42.10526315789474%,rgb(253, 147, 63) 47.36842105263158%,rgb(253, 126, 56) 52.63157894736842%,rgb(251, 101, 49) 57.89473684210526%,rgb(247, 77, 42) 63.1578947368421%,rgb(239, 54, 36) 68.42105263157895%,rgb(228, 35, 32) 73.6842105263158%,rgb(214, 19, 32) 78.94736842105263%,rgb(197, 9, 35) 84.21052631578948%,rgb(177, 3, 37) 89.47368421052632%,rgb(153, 0, 38) 94.73684210526316%,rgb(128, 0, 38) 100%)"></div></div>

#### 自定义色板

如果内置的色板不能满足你的要求，也可以试试自定义色板，以下是一个简单的例子，展示了如何自定义注册色板和使用。

```js | ob
(() => {
  G2.register('palette.custom', customPalette);
  const chart = new G2.Chart();

  function customPalette() {
    return ['#FFB3BA', '#98FF98', '#89CFF0', '#FFF9B1', '#D1A3FF'];
  }

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
    })
    .encode('x', 'letter')
    .encode('y', 'frequency')
    .encode('color', 'letter')
    .axis('y', { labelFormatter: '.0%' })
    .scale('color', { palette: 'custom' }); // 指定自定义色板

  chart.render();

  return chart.getContainer();
})();
```

### Relations

可以通过 `scale.relations` 去指定一系列映射规则，这个优先级别会高于 domain 到 range 的默认映射方式。比如对于 color 通道来讲，如果希望特定的值映射为特定的颜色，或者处理异常值，这个配置会很有用。

```js
chart.interval().scale('color', {
  relations: [
    ['dog', 'red'], // dog 恒等映射为红色
    [(d) => d === undefined, 'grey'], // 如果是值为 undefined，那么为灰色
  ],
});
```

## 样式

通过 `mark.style` 来设置颜色，这里设置的颜色比 `encode.color` 的优先级更高，同时不会生成图例。

```js | ob
(() => {
  const chart = new G2.Chart();

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
    })
    .encode('x', 'letter')
    .encode('y', 'frequency')
    .style('fill', (datum, index, data) => {
      const { frequency } = datum;
      if (frequency > 0.1) return '#3376cd';
      if (frequency > 0.05) return '#f4bb51';
      return '#b43a29';
    });

  chart.render();

  return chart.getContainer();
})();
```
