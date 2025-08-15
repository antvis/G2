---
title: 甘特图
order: 25
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*hyB5RIY-qcMAAAAAAAAAAAAADmJ7AQ/original'
category: ['time', 'comparison', 'trend']
similar: ['bar', 'stacked-bar', 'area']
---

<img alt="gantt" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*hyB5RIY-qcMAAAAAAAAAAAAADmJ7AQ/original" width=600/>

## 甘特图的简介

甘特图是一种项目管理工具，以图示的方式通过活动列表和时间刻度表示出特定项目的顺序与持续时间。甘特图内在思想简单，基本是一条线条图，横轴表示时间，纵轴表示活动（项目），线条表示在整个期间上计划和实际的活动完成情况。

甘特图通过条状图来显示项目、进度和其他时间相关的系统进展的内在关系随着时间进展的情况。这种图表通过任务列表和时间刻度形象地表达了项目计划中各项任务的起止时间以及任务之间的相互关系。

甘特图是项目管理中最重要的工具之一，广泛应用于项目规划、任务调度、资源管理等场景中。

**英文名**：Gantt Chart

## 甘特图的构成

| 图表类型         | 基础甘特图                                                                                                 |
| ---------------- | ---------------------------------------------------------------------------------------------------------- |
| 适合的数据       | 项目数据：一个任务名称字段、一个开始时间字段、一个结束时间字段                                             |
| 功能             | 展示项目任务的时间安排和执行进度                                                                           |
| 数据与图形的映射 | 任务名称字段映射到纵轴的位置<br>开始时间和结束时间字段映射到条形的起止位置<br>任务持续时间映射到条形的长度 |
| 适合的数据条数   | 不超过 20 个任务                                                                                           |

## 甘特图的应用场景

### 适合的场景

例子 1: **适合应用到项目进度管理**

下图是一个活动策划项目的甘特图，展示了不同任务的时间安排和依赖关系。

| name（任务名称） | startTime（开始时间） | endTime（结束时间） |
| ---------------- | --------------------- | ------------------- |
| 活动策划         | 1                     | 4                   |
| 场地物流规划     | 3                     | 13                  |
| 选择供应商       | 5                     | 8                   |
| 租赁场地         | 9                     | 13                  |
| 预定餐饮服务商   | 10                    | 14                  |
| 租赁活动装饰团队 | 12                    | 17                  |
| 彩排             | 14                    | 16                  |
| 活动庆典         | 17                    | 18                  |

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
    { name: '活动策划', startTime: 1, endTime: 4 },
    { name: '场地物流规划', startTime: 3, endTime: 13 },
    { name: '选择供应商', startTime: 5, endTime: 8 },
    { name: '租赁场地', startTime: 9, endTime: 13 },
    { name: '预定餐饮服务商', startTime: 10, endTime: 14 },
    { name: '租赁活动装饰团队', startTime: 12, endTime: 17 },
    { name: '彩排', startTime: 14, endTime: 16 },
    { name: '活动庆典', startTime: 17, endTime: 18 },
  ],
  encode: {
    x: 'name',
    y: 'startTime',
    y1: 'endTime',
    color: 'name',
  },
  coordinate: {
    transform: [{ type: 'transpose' }],
  },
  axis: {
    x: {
      title: '任务',
    },
    y: {
      title: '时间（天）',
    },
  },
  interaction: [
    {
      type: 'elementHighlight',
      background: true,
    },
  ],
});

chart.render();
```

**说明**：

- `name` 字段映射到横轴位置，用于区分不同任务
- `startTime` 和 `endTime` 字段映射到 `y` 和 `y1` 通道，表示任务的起止时间
- `color` 通道使用任务名称，用不同颜色区分各个任务
- 使用 `transpose` 坐标变换，将垂直方向的时间轴转换为水平方向

例子 2: **适合展示带有时序动画的项目进度**

通过动画效果可以更生动地展示项目任务的时间顺序和执行过程。

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
    { name: '需求分析', startTime: 1, endTime: 5, phase: '规划阶段' },
    { name: '系统设计', startTime: 4, endTime: 10, phase: '设计阶段' },
    { name: '前端开发', startTime: 8, endTime: 20, phase: '开发阶段' },
    { name: '后端开发', startTime: 10, endTime: 22, phase: '开发阶段' },
    { name: '集成测试', startTime: 18, endTime: 25, phase: '测试阶段' },
    { name: '系统部署', startTime: 24, endTime: 28, phase: '部署阶段' },
    { name: '用户验收', startTime: 26, endTime: 30, phase: '验收阶段' },
  ],
  encode: {
    x: 'name',
    y: 'startTime',
    y1: 'endTime',
    color: 'phase',
    enterDuration: (d) => (d.endTime - d.startTime) * 200,
    enterDelay: (d) => d.startTime * 100,
  },
  coordinate: {
    transform: [{ type: 'transpose' }],
  },
  scale: {
    enterDuration: {
      range: [0, 5000],
    },
  },
  axis: {
    x: {
      title: '项目任务',
    },
    y: {
      title: '时间（周）',
    },
  },
  legend: {
    color: {
      title: '项目阶段',
    },
  },
});

chart.render();
```

**说明**：

- `phase` 字段映射到颜色，用不同颜色区分项目阶段
- `enterDuration` 和 `enterDelay` 通道实现时序动画效果
- 动画持续时间与任务持续时间成正比，延迟时间与开始时间成正比

例子 3: **适合展示多项目对比的甘特图**

当需要对比多个项目的执行情况时，可以使用分组甘特图。

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
    { project: '项目A', task: '设计', startTime: 1, endTime: 5 },
    { project: '项目A', task: '开发', startTime: 4, endTime: 12 },
    { project: '项目A', task: '测试', startTime: 10, endTime: 15 },
    { project: '项目B', task: '设计', startTime: 2, endTime: 6 },
    { project: '项目B', task: '开发', startTime: 5, endTime: 14 },
    { project: '项目B', task: '测试', startTime: 12, endTime: 16 },
    { project: '项目C', task: '设计', startTime: 3, endTime: 8 },
    { project: '项目C', task: '开发', startTime: 7, endTime: 16 },
    { project: '项目C', task: '测试', startTime: 14, endTime: 18 },
  ],
  encode: {
    x: (d) => `${d.project}-${d.task}`,
    y: 'startTime',
    y1: 'endTime',
    color: 'project',
    series: 'task',
  },
  coordinate: {
    transform: [{ type: 'transpose' }],
  },
  axis: {
    x: {
      title: '项目任务',
      labelTransform: 'rotate(45)',
    },
    y: {
      title: '时间（周）',
    },
  },
  legend: {
    color: {
      title: '项目',
    },
  },
});

chart.render();
```

**说明**：

- 组合 `project` 和 `task` 字段创建唯一的标识符
- `series` 通道用于在同一位置堆叠不同任务
- 标签旋转 45 度以避免重叠

例子 4: **适合展示带有里程碑的甘特图**

在项目管理中，里程碑是重要的时间节点，可以通过不同的标记来突出显示。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'view',
  autoFit: true,
  children: [
    {
      type: 'interval',
      data: [
        { name: '市场调研', startTime: 1, endTime: 4, type: '任务' },
        { name: '产品设计', startTime: 3, endTime: 8, type: '任务' },
        { name: '技术开发', startTime: 6, endTime: 15, type: '任务' },
        { name: '内测试运行', startTime: 14, endTime: 18, type: '任务' },
        { name: '市场推广', startTime: 17, endTime: 22, type: '任务' },
        { name: '正式发布', startTime: 20, endTime: 24, type: '任务' },
      ],
      encode: {
        x: 'name',
        y: 'startTime',
        y1: 'endTime',
        color: 'type',
      },
      coordinate: {
        transform: [{ type: 'transpose' }],
      },
    },
    {
      type: 'point',
      data: [
        { name: '调研完成', time: 4, milestone: '里程碑' },
        { name: '设计确认', time: 8, milestone: '里程碑' },
        { name: '开发完成', time: 15, milestone: '里程碑' },
        { name: '产品发布', time: 24, milestone: '里程碑' },
      ],
      encode: {
        x: 'name',
        y: 'time',
        shape: 'diamond',
        color: 'milestone',
        size: 8,
      },
      coordinate: {
        transform: [{ type: 'transpose' }],
      },
    },
  ],
  axis: {
    x: {
      title: '项目活动',
    },
    y: {
      title: '时间（周）',
    },
  },
  legend: {
    color: {
      title: '类型',
    },
  },
});

chart.render();
```

**说明**：

- 使用复合视图（view）结合 interval 和 point 图形
- interval 展示任务时间段，point 展示里程碑节点
- 里程碑使用钻石形状（diamond）突出显示

### 不适合的场景

例子 1: **不适合展示没有明确时间维度的数据**

甘特图主要用于展示时间相关的项目或任务，对于没有时间维度的分类对比，应该使用柱状图等其他图表类型。

例子 2: **不适合展示过于细粒度的时间数据**

当任务过多或时间粒度过细时，甘特图会变得拥挤难以阅读。此时应该考虑数据聚合或使用其他可视化方式。

例子 3: **不适合展示连续性的数值变化趋势**

甘特图主要展示离散的任务时间段，对于连续性的数值变化应该使用折线图或面积图。

## 甘特图的扩展用法

### 带有进度显示的甘特图

可以通过颜色或填充模式来显示任务的完成进度。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'view',
  autoFit: true,
  children: [
    {
      type: 'interval',
      data: [
        { name: '需求分析', startTime: 1, endTime: 5, progress: 100 },
        { name: 'UI设计', startTime: 3, endTime: 8, progress: 80 },
        { name: '前端开发', startTime: 6, endTime: 15, progress: 60 },
        { name: '后端开发', startTime: 8, endTime: 16, progress: 40 },
        { name: '测试验收', startTime: 14, endTime: 18, progress: 0 },
      ],
      encode: {
        x: 'name',
        y: 'startTime',
        y1: 'endTime',
        color: 'lightgray',
      },
      coordinate: {
        transform: [{ type: 'transpose' }],
      },
      style: {
        fillOpacity: 0.3,
      },
    },
    {
      type: 'interval',
      data: [
        { name: '需求分析', startTime: 1, currentTime: 5, progress: 100 },
        { name: 'UI设计', startTime: 3, currentTime: 6.6, progress: 80 },
        { name: '前端开发', startTime: 6, currentTime: 11.4, progress: 60 },
        { name: '后端开发', startTime: 8, currentTime: 11.2, progress: 40 },
      ],
      encode: {
        x: 'name',
        y: 'startTime',
        y1: 'currentTime',
        color: (d) =>
          d.progress >= 100 ? 'green' : d.progress >= 50 ? 'orange' : 'red',
      },
      coordinate: {
        transform: [{ type: 'transpose' }],
      },
    },
  ],
  axis: {
    x: {
      title: '项目任务',
    },
    y: {
      title: '时间（周）',
    },
  },
});

chart.render();
```

### 带有依赖关系的甘特图

可以通过连线或箭头来显示任务之间的依赖关系。

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'view',
  autoFit: true,
  children: [
    {
      type: 'interval',
      data: [
        { name: '任务A', startTime: 1, endTime: 5, id: 'A' },
        { name: '任务B', startTime: 5, endTime: 10, id: 'B' },
        { name: '任务C', startTime: 8, endTime: 15, id: 'C' },
        { name: '任务D', startTime: 15, endTime: 20, id: 'D' },
      ],
      encode: {
        x: 'name',
        y: 'startTime',
        y1: 'endTime',
        color: 'name',
      },
      coordinate: {
        transform: [{ type: 'transpose' }],
      },
    },
    {
      type: 'link',
      data: [
        { source: '任务A', target: '任务B', x1: 5, x2: 5 },
        { source: '任务B', target: '任务C', x1: 10, x2: 8 },
        { source: '任务C', target: '任务D', x1: 15, x2: 15 },
      ],
      encode: {
        x: 'source',
        y: 'x1',
        x1: 'target',
        y1: 'x2',
      },
      coordinate: {
        transform: [{ type: 'transpose' }],
      },
      style: {
        stroke: '#666',
        strokeWidth: 2,
        lineDash: [4, 4],
      },
    },
  ],
  axis: {
    x: {
      title: '项目任务',
    },
    y: {
      title: '时间（周）',
    },
  },
});

chart.render();
```

### 可视化叙事

```js | ob { inject: true  }
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { name: 'event planning', startTime: 1, endTime: 4 },
    { name: 'layout logistics', startTime: 3, endTime: 13 },
    { name: 'select vendors', startTime: 5, endTime: 8 },
    { name: 'hire venue', startTime: 9, endTime: 13 },
    { name: 'hire caterer', startTime: 10, endTime: 14 },
    { name: 'hire event decorators', startTime: 12, endTime: 17 },
    { name: 'rehearsal', startTime: 14, endTime: 16 },
    { name: 'event celebration', startTime: 17, endTime: 18 },
  ],
  encode: {
    x: 'name',
    y: ['endTime', 'startTime'],
    color: 'name',
    enterDuration: (d) => d.endTime - d.startTime,
    enterDelay: 'startTime',
  },
  scale: { enterDuration: { zero: true, range: [0, 3000] } },
  coordinate: { transform: [{ type: 'transpose' }] },
});

chart.render();
```

## 甘特图与其他图表的对比

### 甘特图和[柱状图](/charts/bar)

- 甘特图主要用于展示任务的时间安排和项目进度
- 柱状图主要用于对比不同类别的数值大小

### 甘特图和[折线图](/charts/line)

- 甘特图展示任务的持续时间和相互关系
- 折线图主要展示数值随时间的连续变化趋势

### 甘特图和[面积图](/charts/area)

- 甘特图使用离散的条形展示任务时间段
- 面积图使用连续的填充区域展示数值随时间的变化趋势

## 相似图表

<code src="./demos/list-card.tsx"></code>

## 分类

<code src="./demos/list-category.tsx"></code>
