---
title: liquid
order: 16
---

## 概述

`liquid` 图形标记可用于绘制各种 水波图（涟漪图或波形图）,通过模拟水面上波纹扩散的动态过程，从视觉上的波动传达信息或增强用户体验。常用于 UI 设计、数据可视化或动画效果中。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  height: 300,
  type: 'liquid',
  data: 0.3, // [0, 1]
  // 配置样式
  style: {
    outlineBorder: 4, // 外部边宽
    outlineDistance: 8, // 水波运动时间
    waveLength: 128, // 水波长度
  },
  // 配置坐标系
  coordinate: {},
});

chart.render();
```

更多的案例，可以查看[图表示例 - 水波图](/examples#general-Liquid)页面。

## 配置项

| 属性  | 描述                         | 类型            | 默认值 | 必选 |
| ----- | ---------------------------- | --------------- | ------ | ---- |
| style | 配置 `liquid` 标记的图形样式 | [style](#style) | -      |      |

### style

配置 `liquid` 标记的样式。

| 属性            | 描述     | 类型     | 默认值   | 必选 |
| --------------- | -------- | -------- | -------- | ---- |
| shape           | 形状     | _number_ | `circle` |      |
| stroke          | 边框颜色 | _string_ | -        |      |
| fill            | 水波颜色 | _string_ | -        |      |
| outlineBorder   | 边框宽度 | _number_ | `2`      |      |
| outlineDistance | 内间距   | _number_ | `0`      |      |
| waveLength      | 波长     | _number_ | `192`    |      |
| waveCount       | 波数     | _number_ | `3`      |      |
| backgroundFill  | 背景颜色 | _string_ | -        |      |
| contentText     | 文本内容 | _string_ | -        |      |
| contentFill     | 文本颜色 | _string_ | -        |      |
| contentFontSize | 文本大小 | _string_ | -        |      |

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'liquid',
  data: 0.75,
  style: {
    fill: 'pink', // 水波颜色
    stroke: 'red', // 描边颜色
    backgroundFill: '#f5f5f5', // 背景颜色
    // outline 为描边样式
    outlineBorder: 10, // 外部边宽
    outlineDistance: 10, // 水波运动时间
    // wave为水波配置
    waveLength: 188, // 水波长度
    waveCount: 6, // 波数 会自动 从 1 ~ 0.2 分配透明度
    // content 为中心文本配置
    contentText: 'center text',
    contentFill: '#000',
    contentStroke: '#fff',
    contentFontSize: 32,
    contentLineWidth: 3,
  },
  // 配置坐标系
  coordinate: {},
});

chart.render();
```

#### shape

`liquid` 标记内置支持的形状如下：

| 形状     | 描述 | 示例                                                                                                             |
| -------- | ---- | ---------------------------------------------------------------------------------------------------------------- |
| rect     | 矩形 | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*yhm7SorCPUsAAAAAAAAAAAAAemJ7AQ/original"></img> |
| circle   | 圆形 | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*kMifQItNCRsAAAAAAAAAAAAAemJ7AQ/original"></img> |
| pin      | 水滴 | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*bAhUQZX4aYQAAAAAAAAAAAAAemJ7AQ/original"></img> |
| triangle | 三角 | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ApfoS7lBxv8AAAAAAAAAAAAAemJ7AQ/original"></img> |

如果需要自定义形状，可以通过自定义 shape 提供实现。 其中， 回调 `(x, y, r, w, h) => string`, 传入参数分别为 x y 中心点坐标， r 图表可画圆最大半径， w h 图表可画宽高，从而画出想要的形状，需要对 svg 或者 canvas 有一定理解。

尝试自己画一下：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'liquid',
  data: 0.3,
  style: {
    shape: (x, y, r) => {
      const path = [];
      const w = r * 2;

      for (let i = 0; i < 5; i++) {
        path.push([
          i === 0 ? 'M' : 'L',
          (Math.cos(((18 + i * 72) * Math.PI) / 180) * w) / 2 + x,
          (-Math.sin(((18 + i * 72) * Math.PI) / 180) * w) / 2 + y,
        ]);
        path.push([
          'L',
          (Math.cos(((54 + i * 72) * Math.PI) / 180) * w) / 4 + x,
          (-Math.sin(((54 + i * 72) * Math.PI) / 180) * w) / 4 + y,
        ]);
      }
      path.push(['Z']);
      return path;
    },
    outlineBorder: 4,
    outlineDistance: 8,
    waveLength: 128,
  },
});

chart.render();
```

## 示例

### 不同形状的水波图

除了内置的 `circle`、`rect`、`pin`、`triangle` 形状外，还可以通过自定义 shape 函数绘制更多形状。

#### 三角形水波图

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'liquid',
  data: 0.65,
  style: {
    shape: 'triangle',
    fill: '#1890ff',
    outlineBorder: 4,
    outlineDistance: 8,
    waveLength: 128,
    contentFill: '#000',
    contentStroke: '#fff',
    contentFontSize: 32,
    contentLineWidth: 3,
  },
});

chart.render();
```

#### 矩形水波图

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'liquid',
  data: 0.45,
  style: {
    shape: 'rect',
    fill: '#52c41a',
    outlineBorder: 4,
    outlineDistance: 8,
    waveLength: 128,
  },
});

chart.render();
```

#### 爱心水波图

通过自定义 shape 函数绘制爱心形状：

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'liquid',
  data: 0.75,
  style: {
    shape: (x, y, r) => {
      const path = [];
      const size = r * 1.2;

      // 爱心路径
      path.push(['M', x, y - size / 4]);
      path.push([
        'C',
        x,
        y - size / 2,
        x - size / 2,
        y - size / 2,
        x - size / 2,
        y - size / 4,
      ]);
      path.push([
        'C',
        x - size / 2,
        y,
        x - size / 4,
        y + size / 8,
        x,
        y + size / 2,
      ]);
      path.push([
        'C',
        x + size / 4,
        y + size / 8,
        x + size / 2,
        y,
        x + size / 2,
        y - size / 4,
      ]);
      path.push([
        'C',
        x + size / 2,
        y - size / 2,
        x,
        y - size / 2,
        x,
        y - size / 4,
      ]);
      path.push(['Z']);

      return path;
    },
    backgroundFill: '#f4bcea',
    fill: '#ff4d4f',
    outlineBorder: 4,
    outlineDistance: 8,
    waveLength: 128,
  },
});

chart.render();
```

### 根据值变化颜色的水波图

可以根据数据值的大小动态设置颜色，例如低于 30% 显示红色（警告），30%-80% 显示橙色（正常），80% 以上显示绿色（优秀）。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

let currentValue = 0;

// 根据值确定颜色和状态文本
function getColorAndStatus(value) {
  if (value < 0.3) {
    return { color: '#ff4d4f', status: '警告' }; // 红色 - 警告
  } else if (value < 0.8) {
    return { color: '#faad14', status: '正常' }; // 橙色 - 正常
  } else {
    return { color: '#52c41a', status: '优秀' }; // 绿色 - 优秀
  }
}

// 更新图表
function updateChart(value) {
  const { color, status } = getColorAndStatus(value);

  chart.options({
    type: 'liquid',
    data: value,
    style: {
      fill: color,
      outlineBorder: 4,
      outlineDistance: 8,
      waveLength: 128,
      waveCount: 3,
      contentText: `${status}\n${Math.round(value * 100)}%`,
      contentFill: '#000',
      contentFontSize: 18,
      contentFontWeight: 'bold',
    },
  });

  chart.render();
}

// 初始渲染
updateChart(currentValue);

// 定时更新值，从 0% 到 100%
const timer = setInterval(() => {
  currentValue += 0.01; // 每次增加 1%

  if (currentValue >= 1) {
    currentValue = 1;
    clearInterval(timer); // 达到 100% 后停止
  }

  updateChart(currentValue);
}, 100); // 每 100ms 更新一次
```

### 进度或完成度展示

水波图非常适合展示任务完成进度、目标达成率等场景，通过直观的水位高度表示完成百分比。使用**圆形**形状配合渐变色，营造流动感。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const container = document.getElementById('container');
container.innerHTML = '';

// 模拟不同任务的完成度
const tasks = [
  { name: '项目A', progress: 0.88 },
  { name: '项目B', progress: 0.62 },
  { name: '项目C', progress: 0.35 },
];

tasks.forEach((task) => {
  const div = document.createElement('div');
  div.style.display = 'inline-block';
  div.style.width = '200px';
  div.style.height = '200px';
  div.style.margin = '10px';
  container.appendChild(div);

  const chart = new Chart({
    container: div,
    autoFit: true,
  });

  chart.options({
    type: 'liquid',
    data: task.progress,
    style: {
      shape: 'circle', // 使用圆形
      fill: 'l(270) 0:#e3f2fd 1:#1890ff', // 垂直线性渐变
      backgroundFill: '#f5f5f5',
      outlineBorder: 4,
      outlineDistance: 8,
      waveLength: 128,
      waveCount: 3,
      // 文字样式
      contentText: `${task.name}\n${Math.round(task.progress * 100)}%`,
      contentFill: '#000',
      contentFontSize: 18,
      contentFontWeight: 'bold',
      contentTextBaseline: 'middle',
    },
  });

  chart.render();
});
```

### 存储容量或资源使用率

展示磁盘使用率、内存占用、流量使用等资源类指标。使用**圆形**形状配合警示色渐变和描边，突出监控告警。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const container = document.getElementById('container');
container.innerHTML = '';

// 模拟服务器资源使用情况
const resources = [
  { type: 'CPU', usage: 0.72, unit: '%' },
  { type: '内存', usage: 0.85, unit: 'GB' },
  { type: '磁盘', usage: 0.45, unit: 'TB' },
];

resources.forEach((resource) => {
  const div = document.createElement('div');
  div.style.display = 'inline-block';
  div.style.width = '200px';
  div.style.height = '200px';
  div.style.margin = '10px';
  container.appendChild(div);

  // 根据使用率设置渐变颜色和描边
  let fillColor, strokeColor;
  if (resource.usage > 0.8) {
    fillColor = 'l(270) 0:#fff1f0 1:#ff4d4f'; // 红色渐变 - 警告
    strokeColor = '#cf1322';
  } else if (resource.usage > 0.6) {
    fillColor = 'l(270) 0:#fffbe6 1:#faad14'; // 橙色渐变 - 注意
    strokeColor = '#d48806';
  } else {
    fillColor = 'l(270) 0:#f6ffed 1:#52c41a'; // 绿色渐变 - 正常
    strokeColor = '#389e0d';
  }

  const chart = new Chart({
    container: div,
    autoFit: true,
  });

  chart.options({
    type: 'liquid',
    data: resource.usage,
    style: {
      shape: 'circle',
      fill: fillColor,
      stroke: strokeColor,
      strokeOpacity: 0.8,
      backgroundFill: '#fafafa',
      outlineBorder: 3,
      outlineDistance: 6,
      waveLength: 120,
      waveCount: 4,
      // 文字样式
      contentText: `${resource.type}\n${Math.round(resource.usage * 100)}${
        resource.unit
      }`,
      contentFill: '#000',
      contentFontSize: 16,
      contentFontWeight: '600',
      contentStroke: '#fff',
      contentLineWidth: 2,
    },
  });

  chart.render();
});
```

### 得分或评分展示

用于展示考试成绩、用户评分、满意度调查等场景。使用**水滴形**配合环形渐变，增强视觉吸引力。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

// 模拟考试成绩：85分（满分100）
const score = 85;
const percentage = score / 100;

chart.options({
  type: 'liquid',
  data: percentage,
  style: {
    shape: 'pin', // 使用水滴形状
    fill: 'r(0.5, 0.5, 0.8) 0:#e6f7ff 0.5:#69c0ff 1:#1890ff', // 环形渐变
    backgroundFill: '#f0f0f0',
    outlineBorder: 5,
    outlineDistance: 10,
    waveLength: 150,
    waveCount: 2,
    // 文字样式
    contentText: `${score}分`,
    contentFill: '#fff',
    contentFontSize: 36,
    contentFontWeight: 'bold',
    contentStroke: '#0050b3',
    contentLineWidth: 1,
    contentShadowColor: 'rgba(0,0,0,0.3)',
    contentShadowBlur: 5,
  },
});

chart.render();
```

### 电池电量或能量指示

模拟电池电量、能源储备等场景。使用**矩形**形状配合水平渐变，更符合电池外观和充电方向。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const container = document.getElementById('container');
container.innerHTML = '';

// 模拟不同设备的电池电量
const batteries = [
  { device: '手机', level: 0.92 },
  { device: '平板', level: 0.58 },
  { device: '手表', level: 0.15 },
];

batteries.forEach((battery) => {
  const div = document.createElement('div');
  div.style.display = 'inline-block';
  div.style.width = '200px';
  div.style.height = '200px';
  div.style.margin = '10px';
  container.appendChild(div);

  // 根据电量设置水平渐变颜色
  let fillColor;
  if (battery.level < 0.2) {
    fillColor = 'l(0) 0:#fff1f0 1:#ff4d4f'; // 红色水平渐变 - 低电量
  } else if (battery.level < 0.5) {
    fillColor = 'l(0) 0:#fffbe6 1:#faad14'; // 橙色水平渐变 - 中等
  } else {
    fillColor = 'l(0) 0:#f6ffed 1:#52c41a'; // 绿色水平渐变 - 充足
  }

  const chart = new Chart({
    container: div,
    autoFit: true,
  });

  chart.options({
    type: 'liquid',
    data: battery.level,
    style: {
      shape: 'rect', // 使用矩形形状
      fill: fillColor,
      backgroundFill: '#fafafa',
      outlineBorder: 4,
      outlineDistance: 8,
      waveLength: 100,
      waveCount: 5,
      // 文字样式
      contentText: `${battery.device}\n${Math.round(battery.level * 100)}%`,
      contentFill: '#000',
      contentFontSize: 18,
      contentFontWeight: '600',
      contentTextAlign: 'center',
      contentOpacity: 0.9,
    },
  });

  chart.render();
});
```

### KPI 指标达成率

在企业管理中，用于展示 KPI 指标完成情况。使用**三角形**形状配合阴影效果，强调目标冲刺感。

```js | ob { inject: true }
import { Chart } from '@antv/g2';

const container = document.getElementById('container');
container.innerHTML = '';

// 模拟季度 KPI 达成情况
const kpis = [
  { quarter: 'Q1', achievement: 1.05, target: '销售额' },
  { quarter: 'Q2', achievement: 0.95, target: '销售额' },
  { quarter: 'Q3', achievement: 0.60, target: '销售额' },
];

kpis.forEach((kpi) => {
  const div = document.createElement('div');
  div.style.display = 'inline-block';
  div.style.width = '200px';
  div.style.height = '200px';
  div.style.margin = '10px';
  container.appendChild(div);

  // 达成率超过100%显示绿色，否则根据达成度显示不同颜色
  let fillColor, shadowColor;
  if (kpi.achievement >= 1.0) {
    fillColor = 'l(270) 0:#f6ffed 0.5:#95de64 1:#52c41a'; // 绿色渐变 - 超额完成
    shadowColor = 'rgba(82, 196, 26, 0.4)';
  } else if (kpi.achievement >= 0.9) {
    fillColor = 'l(270) 0:#e6f7ff 0.5:#69c0ff 1:#1890ff'; // 蓝色渐变 - 接近目标
    shadowColor = 'rgba(24, 144, 255, 0.4)';
  } else {
    fillColor = 'l(270) 0:#fffbe6 0.5:#ffc53d 1:#faad14'; // 橙色渐变 - 需努力
    shadowColor = 'rgba(250, 173, 20, 0.4)';
  }

  const chart = new Chart({
    container: div,
    autoFit: true,
  });

  chart.options({
    type: 'liquid',
    data: Math.min(kpi.achievement, 1), // 限制最大值为1以保持视觉效果
    style: {
      shape: 'triangle', // 使用三角形形状
      fill: fillColor,
      backgroundFill: '#f5f5f5',
      outlineBorder: 4,
      outlineDistance: 10,
      waveLength: 140,
      waveCount: 3,
      // 阴影效果
      shadowColor: shadowColor,
      shadowBlur: 15,
      shadowOffsetX: 0,
      shadowOffsetY: 3,
      // 文字样式
      contentText: `${kpi.quarter}\n${Math.round(kpi.achievement * 100)}%`,
      contentFill: '#000',
      contentFontSize: 20,
      contentFontWeight: 'bold',
      contentStroke: '#fff',
      contentLineWidth: 2,
      contentTextBaseline: 'middle',
    },
  });

  chart.render();
});
```
