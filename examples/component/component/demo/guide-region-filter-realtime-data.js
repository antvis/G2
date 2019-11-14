const data = [];
const now = new Date();
const time = now.getTime();
const value1 = ~~30 + Math.random() * 50;
const direction = Math.random() > 0.5 ? 1 : -1;
const value2 = value1 + Math.random() * 20 * direction;
data.push({
  time,
  value: value2,
  type: 'yesterday'
});
data.push({
  time,
  value: value1,
  type: 'today'
});
const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500,
  padding: [ 10, 100, 50, 50 ]
});
chart.source(data, {
  time: {
    alias: '时间',
    type: 'time',
    mask: 'MM:ss',
    nice: false
  },
  value: {
    alias: '占用率',
    min: 0,
    max: 120
  },
  type: {
    type: 'cat'
  }
});
chart.axis('predict', false);
chart.legend({ attachLast: true });
chart.legend('predict', false);
chart.line()
  .position('time*value')
  .shape('smooth')
  .color('type', [ '#cccccc', '#2593fc' ])
  .size(2)
  .animate({
    update: {
      duration: 0
    }
  });
chart.guide().line({
  top: true,
  start: [ 'min', 60 ],
  end: [ 'max', 60 ],

  lineStyle: {
    stroke: '#F5222D',
    lineWidth: 2
  },
  text: {
    content: '预警线',
    position: 'start',
    offsetX: 20,
    offsetY: -5,
    style: {
      fontSize: 14,
      fill: '#F5222D',
      opacity: 0.5
    }
  }
});
chart.guide().regionFilter({
  top: true,
  start: [ 'min', 60 ],
  end: [ 'max', 100 ],
  color: '#F5222D',
  apply: [ 'line' ]
});
chart.guide().dataMarker({
  top: true,
  content: '当前最大峰值',
  position() {
    const obj = findMax();
    if (obj) {
      return [ obj.time, obj.value ];
    }
    return [ 0, 0 ];
  },
  style: {
    text: { fontSize: 13 },
    point: { stroke: '#606060' }
  },
  lineLength: 50
});
chart.render();
setInterval(function() {
  const now = new Date();
  const time = now.getTime();
  const value1 = ~~30 + Math.random() * 50;
  const direction = (Math.random() > 0.5) ? 1 : -1;
  const value2 = value1 + Math.random() * 20 * direction;
  if (data.length >= 200) {
    data.shift();
    data.shift();
  }
  data.push({
    time,
    value: value2,
    type: 'yesterday'
  });
  data.push({
    time,
    value: value1,
    type: 'today'
  });

  if (data.length > 20) {
    data.shift();
    data.shift();
  }
  chart.changeData(data);
}, 1000);

function findMax() {
  let maxValue = 0;
  let maxObj = null;
  for (let i = 0; i < data.length; i++) {
    const d = data[i];
    if (d.value > maxValue /* && d.type === 'today'*/) {
      maxValue = d.value;
      maxObj = d;
    }
  }
  return maxObj;
}
