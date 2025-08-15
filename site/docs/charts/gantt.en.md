---
title: Gantt Chart
order: 25
screenshot: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*hyB5RIY-qcMAAAAAAAAAAAAADmJ7AQ/original'
category: ['time', 'comparison', 'trend']
similar: ['bar', 'stacked-bar', 'area']
---

<img alt="gantt" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*hyB5RIY-qcMAAAAAAAAAAAAADmJ7AQ/original" width=600/>

## Introduction to Gantt Charts

A Gantt chart is a project management tool that graphically displays the sequence and duration of specific project activities through an activity list and time scale. The underlying concept of a Gantt chart is simple, basically a bar chart where the horizontal axis represents time, the vertical axis represents activities (projects), and the bars represent the planned and actual activity completion status over the entire period.

Gantt charts display the intrinsic relationships between projects, progress, and other time-related system developments as they progress over time through bar charts. This type of chart vividly expresses the start and end times of various tasks in a project plan and the interrelationships between tasks through task lists and time scales.

Gantt charts are one of the most important tools in project management, widely used in project planning, task scheduling, resource management, and other scenarios.

**English Name**: Gantt Chart

## Components of Gantt Charts

| Chart Type | Basic Gantt Chart |
| ---------------- | ---------------------------------------------------------------------------------------------------------- |
| Suitable Data | Project data: one task name field, one start time field, one end time field |
| Function | Display time scheduling and execution progress of project tasks |
| Data to Graphics Mapping | Task name field maps to vertical axis position<br>Start time and end time fields map to bar start and end positions<br>Task duration maps to bar length |
| Suitable Data Volume | No more than 20 tasks |

## Application Scenarios for Gantt Charts

### Suitable Scenarios

Example 1: **Suitable for Project Progress Management**

The following chart is a Gantt chart for an event planning project, showing the time scheduling and dependencies of different tasks.

| name (Task Name) | startTime (Start Time) | endTime (End Time) |
| ---------------- | --------------------- | ------------------- |
| Event Planning | 1 | 4 |
| Venue Logistics Planning | 3 | 13 |
| Select Vendors | 5 | 8 |
| Venue Rental | 9 | 13 |
| Book Catering Service | 10 | 14 |
| Hire Event Decoration Team | 12 | 17 |
| Rehearsal | 14 | 16 |
| Event Celebration | 17 | 18 |

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
    { name: 'Event Planning', startTime: 1, endTime: 4 },
    { name: 'Venue Logistics Planning', startTime: 3, endTime: 13 },
    { name: 'Select Vendors', startTime: 5, endTime: 8 },
    { name: 'Venue Rental', startTime: 9, endTime: 13 },
    { name: 'Book Catering Service', startTime: 10, endTime: 14 },
    { name: 'Hire Event Decoration Team', startTime: 12, endTime: 17 },
    { name: 'Rehearsal', startTime: 14, endTime: 16 },
    { name: 'Event Celebration', startTime: 17, endTime: 18 },
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
      title: 'Tasks',
    },
    y: {
      title: 'Time (Days)',
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

**Explanation**:

- The `name` field maps to the horizontal axis position to distinguish different tasks
- The `startTime` and `endTime` fields map to the `y` and `y1` channels, representing the start and end times of tasks
- The `color` channel uses task names to distinguish each task with different colors
- Uses `transpose` coordinate transformation to convert the vertical time axis to horizontal

Example 2: **Suitable for Displaying Project Progress with Time-based Animation**

Animation effects can more vividly demonstrate the time sequence and execution process of project tasks.

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
    { name: 'Requirements Analysis', startTime: 1, endTime: 5, phase: 'Planning Phase' },
    { name: 'System Design', startTime: 4, endTime: 10, phase: 'Design Phase' },
    { name: 'Frontend Development', startTime: 8, endTime: 20, phase: 'Development Phase' },
    { name: 'Backend Development', startTime: 10, endTime: 22, phase: 'Development Phase' },
    { name: 'Integration Testing', startTime: 18, endTime: 25, phase: 'Testing Phase' },
    { name: 'System Deployment', startTime: 24, endTime: 28, phase: 'Deployment Phase' },
    { name: 'User Acceptance', startTime: 26, endTime: 30, phase: 'Acceptance Phase' },
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
      title: 'Project Tasks',
    },
    y: {
      title: 'Time (Weeks)',
    },
  },
  legend: {
    color: {
      title: 'Project Phase',
    },
  },
});

chart.render();
```

**Explanation**:

- The `phase` field maps to color to distinguish project phases with different colors
- `enterDuration` and `enterDelay` channels implement time-based animation effects
- Animation duration is proportional to task duration, delay time is proportional to start time

Example 3: **Suitable for Multi-project Comparison Gantt Charts**

When comparing the execution of multiple projects, grouped Gantt charts can be used.

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
    { project: 'Project A', task: 'Design', startTime: 1, endTime: 5 },
    { project: 'Project A', task: 'Development', startTime: 4, endTime: 12 },
    { project: 'Project A', task: 'Testing', startTime: 10, endTime: 15 },
    { project: 'Project B', task: 'Design', startTime: 2, endTime: 6 },
    { project: 'Project B', task: 'Development', startTime: 5, endTime: 14 },
    { project: 'Project B', task: 'Testing', startTime: 12, endTime: 16 },
    { project: 'Project C', task: 'Design', startTime: 3, endTime: 8 },
    { project: 'Project C', task: 'Development', startTime: 7, endTime: 16 },
    { project: 'Project C', task: 'Testing', startTime: 14, endTime: 18 },
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
      title: 'Project Tasks',
      labelTransform: 'rotate(45)',
    },
    y: {
      title: 'Time (Weeks)',
    },
  },
  legend: {
    color: {
      title: 'Project',
    },
  },
});

chart.render();
```

**Explanation**:

- Combines `project` and `task` fields to create unique identifiers
- `series` channel is used to stack different tasks at the same position
- Labels rotated 45 degrees to avoid overlap

Example 4: **Suitable for Gantt Charts with Milestones**

In project management, milestones are important time points that can be highlighted with different markers.

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
        { name: 'Market Research', startTime: 1, endTime: 4, type: 'Task' },
        { name: 'Product Design', startTime: 3, endTime: 8, type: 'Task' },
        { name: 'Technical Development', startTime: 6, endTime: 15, type: 'Task' },
        { name: 'Internal Testing', startTime: 14, endTime: 18, type: 'Task' },
        { name: 'Marketing Promotion', startTime: 17, endTime: 22, type: 'Task' },
        { name: 'Official Launch', startTime: 20, endTime: 24, type: 'Task' },
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
        { name: 'Research Complete', time: 4, milestone: 'Milestone' },
        { name: 'Design Approved', time: 8, milestone: 'Milestone' },
        { name: 'Development Complete', time: 15, milestone: 'Milestone' },
        { name: 'Product Launch', time: 24, milestone: 'Milestone' },
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
      title: 'Project Activities',
    },
    y: {
      title: 'Time (Weeks)',
    },
  },
  legend: {
    color: {
      title: 'Type',
    },
  },
});

chart.render();
```

**Explanation**:

- Uses composite view combining interval and point graphics
- Interval displays task time periods, point displays milestone nodes
- Milestones use diamond shapes for highlighting

### Unsuitable Scenarios

Example 1: **Not suitable for displaying data without clear time dimensions**

Gantt charts are mainly used to display time-related projects or tasks. For categorical comparisons without time dimensions, other chart types like bar charts should be used.

Example 2: **Not suitable for displaying overly fine-grained time data**

When there are too many tasks or the time granularity is too fine, Gantt charts become crowded and difficult to read. Data aggregation or other visualization methods should be considered.

Example 3: **Not suitable for displaying continuous numerical change trends**

Gantt charts mainly display discrete task time periods. For continuous numerical changes, line charts or area charts should be used.

## Extended Usage of Gantt Charts

### Gantt Charts with Progress Display

Colors or fill patterns can be used to show task completion progress.

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
        { name: 'Requirements Analysis', startTime: 1, endTime: 5, progress: 100 },
        { name: 'UI Design', startTime: 3, endTime: 8, progress: 80 },
        { name: 'Frontend Development', startTime: 6, endTime: 15, progress: 60 },
        { name: 'Backend Development', startTime: 8, endTime: 16, progress: 40 },
        { name: 'Testing & Acceptance', startTime: 14, endTime: 18, progress: 0 },
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
        { name: 'Requirements Analysis', startTime: 1, currentTime: 5, progress: 100 },
        { name: 'UI Design', startTime: 3, currentTime: 6.6, progress: 80 },
        { name: 'Frontend Development', startTime: 6, currentTime: 11.4, progress: 60 },
        { name: 'Backend Development', startTime: 8, currentTime: 11.2, progress: 40 },
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
      title: 'Project Tasks',
    },
    y: {
      title: 'Time (Weeks)',
    },
  },
});

chart.render();
```

### Gantt Charts with Dependencies

Lines or arrows can be used to show dependencies between tasks.

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
        { name: 'Task A', startTime: 1, endTime: 5, id: 'A' },
        { name: 'Task B', startTime: 5, endTime: 10, id: 'B' },
        { name: 'Task C', startTime: 8, endTime: 15, id: 'C' },
        { name: 'Task D', startTime: 15, endTime: 20, id: 'D' },
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
        { source: 'Task A', target: 'Task B', x1: 5, x2: 5 },
        { source: 'Task B', target: 'Task C', x1: 10, x2: 8 },
        { source: 'Task C', target: 'Task D', x1: 15, x2: 15 },
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
      title: 'Project Tasks',
    },
    y: {
      title: 'Time (Weeks)',
    },
  },
});

chart.render();
```

### Visual Storytelling

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

## Comparison with Other Charts

### Gantt Charts vs [Bar Charts](/charts/bar)

- Gantt charts are mainly used to display task scheduling and project progress
- Bar charts are mainly used to compare numerical values across different categories

### Gantt Charts vs [Line Charts](/charts/line)

- Gantt charts display task duration and interrelationships
- Line charts mainly display continuous trends of values over time

### Gantt Charts vs [Area Charts](/charts/area)

- Gantt charts use discrete bars to display task time periods
- Area charts use continuous filled areas to display trends of values over time

## Similar Charts

<code src="./demos/list-card.tsx"></code>

## Category

<code src="./demos/list-category.tsx"></code> 
