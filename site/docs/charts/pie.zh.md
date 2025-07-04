---
title: 饼图
order: 5
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*xuKWQoLfxjwAAAAAAAAAAAAADmJ7AQ/original'
category: ['proportion']
similar: ['donut-chart', 'rose']
---

<img alt="pie" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*xuKWQoLfxjwAAAAAAAAAAAAADmJ7AQ/original" width=600/>

## 饼图的简介

饼图是一种圆形统计图表，将数据表示为整个圆的各个扇形，用于显示各个类别在总体中的占比关系。每个扇形的角度大小与其所代表的数值成正比，整个饼图代表数据的总和。

饼图特别适合展示分类数据的占比关系，可以直观地展示各个部分在整体中的相对重要性。通过不同颜色的扇形区分各个类别，使得比较各类别的占比变得简单直观。

当类别较少（通常不超过5-7个）且需要强调各部分与整体关系时，饼图是一个很好的选择。对于类别较多的情况，可以考虑将小占比的类别合并为"其他"类别。

**英文名**：Pie Chart

## 饼图的构成

### 基础饼图

<img alt="basic-pie" src="https://t.alipayobjects.com/images/T19QdjXcFaXXXXXXXX.png" width=600 />

| 图表类型         | 基础饼图                                                                          |
| ---------------- | --------------------------------------------------------------------------------- |
| 适合的数据       | 分类数据：一个分类数据字段、一个连续数据字段                                      |
| 功能             | 展示各个类别在总体中的占比关系                                                    |
| 数据与图形的映射 | 分类字段映射到扇形的颜色和标签<br>数值字段映射到扇形的角度大小<br>整个圆表示数据总和 |
| 适合的场景       | 类别数量较少（5-7个以内）的占比展示                                               |

---

## 饼图的应用场景

### 适合的场景

例子 1: **展示市场份额分布**

下图展示了不同浏览器的市场份额占比，清晰地显示了各浏览器在市场中的相对地位。

| browser（浏览器） | value（市场份额） |
| ----------------- | ----------------- |
| Chrome            | 61.04             |
| Safari            | 15.12             |
| Edge              | 10.52             |
| Firefox           | 7.19              |
| Samsung Internet  | 2.98              |
| Opera             | 3.15              |

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { browser: 'Chrome', value: 61.04 },
    { browser: 'Safari', value: 15.12 },
    { browser: 'Edge', value: 10.52 },
    { browser: 'Firefox', value: 7.19 },
    { browser: 'Samsung Internet', value: 2.98 },
    { browser: 'Opera', value: 3.15 },
  ],
  encode: {
    y: 'value',
    color: 'browser',
  },
  transform: [{ type: 'stackY' }],
  coordinate: { type: 'theta' },
  legend: {
    color: {
      position: 'right',
      rowPadding: 5,
    },
  },
});

chart.render();
```

**说明**：
- `browser` 字段映射到颜色，区分不同浏览器
- `value` 字段映射到角度大小，表示市场份额
- 使用 `coordinate: { type: 'theta' }` 将柱状图转换为饼图
- 使用 `transform: [{ type: 'stackY' }]` 堆叠数据

例子 2: **展示预算分配情况**

饼图非常适合展示预算、支出等资源分配情况，让人一目了然地看到各项目的资源占比。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { category: '研发', value: 35 },
    { category: '营销', value: 25 },
    { category: '销售', value: 20 },
    { category: '运营', value: 15 },
    { category: '其他', value: 5 },
  ],
  encode: {
    y: 'value',
    color: 'category',
  },
  transform: [{ type: 'stackY' }],
  coordinate: { type: 'theta', outerRadius: 0.8 },
  scale: {
    color: {
      palette: 'category10',
    },
  },
  legend: {
    color: {
      position: 'right',
      rowPadding: 5,
    },
  },
  labels: [
    {
      text: (d) => `${d.category}: ${d.value}%`,
      position: 'outside',
      connector: true,
    },
  ],
});

chart.render();
```

**说明**：
- 使用外部标签显示类别名称和百分比
- `connector: true` 添加标签连接线
- `outerRadius: 0.8` 调整饼图大小，为标签留出空间


### 不适合的场景

例子 1: **类别过多时不适合使用饼图**

当类别数量超过7个时，饼图会变得难以阅读和比较。下图展示了各个省份的人口占比情况，由于包含的分类过多，很难清晰对比各个省份的人口数据占比情况。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { province: '北京市', population: 19612368 },
    { province: '天津市', population: 12938693 },
    { province: '河北省', population: 71854210 },
    { province: '山西省', population: 27500000 },
    { province: '内蒙古自治区', population: 24706291 },
    { province: '辽宁省', population: 43746323 },
    { province: '吉林省', population: 27452815 },
    { province: '黑龙江省', population: 38313991 },
    { province: '上海市', population: 23019196 },
    { province: '江苏省', population: 78660941 },
    { province: '浙江省', population: 54426891 },
    { province: '安徽省', population: 59500468 },
    { province: '福建省', population: 36894217 },
    { province: '江西省', population: 44567797 },
    { province: '山东省', population: 95792719 },
    { province: '河南省', population: 94029939 },
    { province: '湖北省', population: 57237727 },
    { province: '湖南省', population: 65700762 },
    { province: '广东省', population: 104320459 },
    { province: '广西壮族自治区', population: 46023761 },
    { province: '海南省', population: 8671485 },
    { province: '重庆市', population: 28846170 },
    { province: '四川省', population: 80417528 },
    { province: '贵州省', population: 34748556 },
    { province: '云南省', population: 45966766 },
    { province: '西藏自治区', population: 3002165 },
    { province: '陕西省', population: 37327379 },
    { province: '甘肃省', population: 25575263 },
    { province: '青海省', population: 5626723 },
  ],
  encode: {
    y: 'population',
    color: 'province',
  },
  transform: [{ type: 'stackY' }],
  coordinate: { type: 'theta' },

});

chart.render();
```

**说明**：此种情况下，我们推荐使用[柱状图](/charts/bar)。

例子 2: **各类别占比相近时不适合使用饼图**

下图中游戏公司的不同种类游戏的销售量相近，角度差异很小，难以通过视觉快速区分大小关系。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { genre: 'Sports', sold: 15000 },
    { genre: 'Strategy', sold: 14900 },
    { genre: 'Action', sold: 15050 },
    { genre: 'Shooter', sold: 13000 },
    { genre: 'Other', sold: 13900 },
  ],
  encode: {
    y: 'sold',
    color: 'genre',
  },
  transform: [{ type: 'stackY' }],
  coordinate: { type: 'theta', outerRadius: 0.8 },
  legend: {
    color: {
      position: 'bottom',
      layout: { justifyContent: 'center' },
    },
  },
  labels: [
    {
      text: (d, i, data) => {
        const total = data.reduce((acc, curr) => acc + curr.sold, 0);
        const percent = ((d.sold / total) * 100).toFixed(2);
        return `${percent}%`;
      },
      style: {
        fontSize: 10,
      },
    },
  ],
});

chart.render();
```

**说明**：上图中各个分类的占比都接近20%，差异很小，不太适合使用饼图，此时可以使用[柱状图](/charts/bar)来呈现。


## 饼图的扩展

### 径向扰动散点图

径向扰动散点图将传统的饼图数据映射到极坐标系中的散点，通过添加径向扰动来避免重叠，适合展示分类数据的分布情况。

```js | ob { inject: true  }
import { Chart } from "@antv/g2";

const chart = new Chart({ container: "container" });

chart.options({
  type: "point",
  autoFit: true,
  data: {
    type: "fetch",
    value: "https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json",
  },
  encode: { x: "clarity", color: "clarity" },
  transform: [{ type: "jitter" }],
  coordinate: { type: "polar" },
  legend: false,
});

chart.render();

```

**说明**：
- 数据点按角度分布在圆形区域内，模拟饼图的扇形分布
- 添加径向扰动（随机偏移）避免数据点重叠
- 点的大小映射数值大小，颜色区分类别
- 适合展示分类数据的空间分布和数值关系

## 饼图与其他图表的对比

### 饼图与[环形图](/zh/charts/donut-chart)

- 饼图是最基础的形式，适合简单的占比展示
- 环形图可以在中心显示额外信息，空间利用率更高

### 饼图与[玫瑰图](/zh/charts/rose)

- 饼图展示静态的占比关系，适合某个时间点的数据快照
- 玫瑰图适合展示分类数据的分布情况，特别是当类别数量较多时

## 相似图表

<code src="./demos/list-card.tsx"></code>

## 分类

<code src="./demos/list-category.tsx"></code>