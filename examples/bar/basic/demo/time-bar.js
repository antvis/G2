const data = [
  { task: 'task0', startTime: '2018-04-18 01:17:12', endTime: '2018-04-18 01:19:10', status: 0 },
  { task: 'task1', startTime: '2018-04-18 01:18:15', endTime: '2018-04-18 01:19:20', status: 0 },
  { task: 'task2', startTime: '2018-04-18 02:11:32', endTime: '2018-04-18 02:18:50', status: 0 },
  { task: 'task3', startTime: '2018-04-18 02:18:50', endTime: '2018-04-18 03:16:38', status: 0 },
  { task: 'task4', startTime: '2018-04-18 02:19:48', endTime: '2018-04-18 02:21:57', status: 0 },
  { task: 'task5', startTime: '2018-04-18 03:16:38', endTime: '2018-04-18 03:19:38', status: 1 },
  { task: 'task6', startTime: '2018-04-18 03:19:38', endTime: '2018-04-18 03:27:49', status: 0 },
  { task: 'task7', startTime: '2018-04-18 07:29:37', endTime: '2018-04-18 07:33:01', status: 0 },
  { task: 'task8', startTime: '2018-04-18 03:27:49', endTime: '2018-04-18 04:26:05', status: 0 },
  { task: 'task9', startTime: '2018-04-18 04:26:05', endTime: '2018-04-18 06:06:36', status: 0 },
  { task: 'task10', startTime: '2018-04-18 06:06:36', endTime: '2018-04-18 06:15:15', status: 0 },
  { task: 'task11', startTime: '2018-04-18 03:27:49', endTime: '2018-04-18 03:34:50', status: 0 }
];

const values = [ '运行成功', '运行失败' ];
data.forEach(function(obj) {
  obj.range = [ obj.startTime, obj.endTime ];
  obj.status = values[obj.status];
});

const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500
});
chart.source(data);

chart.coord().transpose().scale(1, -1);
chart.interval().position('task*range').color('status', [ '#2FC25B', '#F04864' ]);
chart.render();
